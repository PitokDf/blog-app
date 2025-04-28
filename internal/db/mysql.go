package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

func NewMySQL(dsn string) *sql.DB {
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatalf("Error connecting to MySQL: %v", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatalf("Error pinging MySQL: %v", err)
	}

	return db
}
