package configs

import (
	"log"

	"github.com/joho/godotenv"
)

func Load() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("❌ Gagal load .env: %v", err)
	}
}
