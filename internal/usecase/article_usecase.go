package usecase

import (
	"blog-app/internal/domain/models"
	"blog-app/internal/repository"
)

type ArticleUsecase struct {
	repo repository.ArticleRepository
}

func NewArticleUsecase(r repository.ArticleRepository) *ArticleUsecase {
	return &ArticleUsecase{repo: r}
}

func (uc *ArticleUsecase) GetArticle(id int) (*models.Article, error) {
	return uc.repo.GetByID(id)
}

func (uc *ArticleUsecase) GetAllArticles() ([]*models.Article, error) {
	return uc.repo.GetAll()
}

func (uc *ArticleUsecase) CreateArticle(a *models.Article) (*models.Article, error) {
	return uc.repo.Create(a)
}

func (uc *ArticleUsecase) UpdateArticle(a *models.Article) error {
	return uc.repo.Update(a)
}
