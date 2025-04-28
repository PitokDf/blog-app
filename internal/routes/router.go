package routes

import (
	"blog-app/internal/delivery/http"
	"blog-app/internal/usecase"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine, artUC *usecase.ArticleUsecase) {
	h := http.NewArticleHandler(artUC)
	api := r.Group("/api/v1")

	api.GET("/articles/:id", h.GetByID)
	api.GET("/articles", h.GetAll)
	api.POST("/articles", h.Create)
	api.PUT("/articles/:id", h.Update)
}
