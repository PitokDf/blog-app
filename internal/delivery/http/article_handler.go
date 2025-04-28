package http

import (
	"blog-app/internal/domain/models"
	"blog-app/internal/usecase"
	"blog-app/pkg/response"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ArticleHandler struct {
	uc *usecase.ArticleUsecase
}

func NewArticleHandler(uc *usecase.ArticleUsecase) *ArticleHandler {
	return &ArticleHandler{uc: uc}
}

func (h *ArticleHandler) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	art, err := h.uc.GetArticle(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No article found"})
		return
	}
	c.JSON(http.StatusOK, art)
}

func (h *ArticleHandler) GetAll(c *gin.Context) {
	list, err := h.uc.GetAllArticles()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, list)
}

func (h *ArticleHandler) Create(c *gin.Context) {
	var a models.Article

	if err := c.ShouldBindJSON(&a); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := h.uc.CreateArticle(&a)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	response.Success(c, "Berhasil menambahkan data.", id)
	// c.JSON(http.StatusCreated, gin.H{"id": id})
}

func (h *ArticleHandler) Update(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var a models.Article
	if err := c.ShouldBindJSON(&a); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	a.ID = id
	if err := h.uc.UpdateArticle(&a); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, a)
}
