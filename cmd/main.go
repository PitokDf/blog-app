package main

import (
	"blog-app/configs"
	"blog-app/internal/db"
	"blog-app/internal/repository"
	"blog-app/internal/routes"
	"blog-app/internal/usecase"
	"blog-app/pkg/logger"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	configs.Load() // Load .env
	logger.Init()  // Init logger

	// Koneksi database
	mysqlDB := db.NewMySQL(os.Getenv("MYSQL_DSN"))
	mongoClient := db.NewMongo(os.Getenv("MONGO_URI"))

	// Setup repository & usecase
	artRepo := repository.NewArticleRepo(mysqlDB, mongoClient, "blog_db", "articles")
	artUC := usecase.NewArticleUsecase(artRepo)

	// Setup router
	r := gin.Default()
	routes.SetupRouter(r, artUC)
	r.Run(":8080")
}
