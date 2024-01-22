package handler

import (
	"fmt"
	"log"
	"net/http"
	steno "steno/api/_pkg"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Path[5:]
	log.Println(query)
	result, err := steno.Find(query).Compress()
	if err != nil {
		log.Println(err)
	}
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
	w.Header().Set(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s", result)
}
