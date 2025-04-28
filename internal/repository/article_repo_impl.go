package repository

import (
	"blog-app/internal/domain/models"
	"context"
	"database/sql"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type articleRepoImpl struct {
	db   *sql.DB
	coll *mongo.Collection
}

func NewArticleRepo(db *sql.DB, client *mongo.Client, dbName, collName string) ArticleRepository {
	return &articleRepoImpl{
		db:   db,
		coll: client.Database(dbName).Collection(collName),
	}
}

// GetByID fetches Article metadata and content
func (r *articleRepoImpl) GetByID(id int) (*models.Article, error) {
	var art models.Article
	// Fetch metadata from MySQL
	query := `SELECT id, author_id, title, slug,summary, created_at, updated_at FROM posts WHERE id=?`
	if err := r.db.QueryRow(query, id).
		Scan(&art.ID, &art.AuthorID, &art.Title, &art.Slug, &art.Summary, &art.CreatedAt, &art.UpdatedAt); err != nil {
		return nil, err
	}
	// Fetch content from MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var doc struct {
		Content     string `bson:"content"`
		ContentType string `bson:"content_type"`
	}
	if err := r.coll.FindOne(ctx, bson.M{"post_id": id}).Decode(&doc); err == nil {
		art.Content = doc.Content
		art.ContentType = doc.ContentType
	}
	return &art, nil
}

func (r *articleRepoImpl) GetAll() ([]*models.Article, error) {

	rows, err := r.db.Query(`SELECT id, author_id, title, slug,summary, created_at, updated_at FROM posts`)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var articles []*models.Article

	for rows.Next() {
		art := new(models.Article)

		if err := rows.Scan(&art.ID, &art.AuthorID, &art.Title, &art.Slug, &art.Summary, &art.CreatedAt, &art.UpdatedAt); err != nil {
			return nil, err
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

		defer cancel()

		var doc struct {
			Content     string `bson:"content"`
			ContentType string `bson:"content_type"`
		}
		_ = r.coll.FindOne(ctx, bson.M{"post_id": art.ID}).Decode(&doc)
		art.Content = doc.Content
		art.ContentType = doc.ContentType

		articles = append(articles, art)
	}

	return articles, err
}

func (r *articleRepoImpl) Create(a *models.Article) (*models.Article, error) {
	now := time.Now()

	// Menyisipkan data ke tabel 'posts' di MySQL
	res, err := r.db.Exec(
		`INSERT INTO posts (author_id, title, slug, summary, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)`,
		a.AuthorID, a.Title, a.Slug, a.Summary, now, now,
	)
	if err != nil {
		return nil, err
	}

	// Mendapatkan ID dari baris yang baru saja ditambahkan
	newID, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	a.ID = int(newID)
	a.CreatedAt = now
	a.UpdatedAt = now

	// Menyisipkan data ke koleksi 'posts' di MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err = r.coll.InsertOne(ctx, bson.M{
		"post_id":      a.ID,
		"content_type": a.ContentType,
		"content":      a.Content,
		"created_at":   now,
		"updated_at":   now,
	})
	if err != nil {
		return nil, err
	}

	return a, nil
}

func (r *articleRepoImpl) Update(a *models.Article) error {
	_, err := r.db.Exec(
		`UPDATE posts SET title=?, summary=?, updated_at=? WHERE id=?`,
		a.Title, a.Summary, time.Now(), a.ID,
	)
	if err != nil {
		return err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err = r.coll.UpdateOne(
		ctx,
		bson.M{"post_id": a.ID},
		bson.M{"$set": bson.M{"content": a.Content, "updated_at": time.Now()}},
		options.Update().SetUpsert(true),
	)
	return err
}
