package repository

import "blog-app/internal/domain/models"

type ArticleRepository interface {
	GetByID(id int) (*models.Article, error)
	Update(*models.Article) error
	GetAll() ([]*models.Article, error)
	Create(a *models.Article) (*models.Article, error)
}
