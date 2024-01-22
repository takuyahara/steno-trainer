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
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s", result)
}
