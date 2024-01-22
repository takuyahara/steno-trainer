package steno

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"steno/api/_pkg/splitter"
	"steno/api/_pkg/stenocode"
	"strings"
	"time"
)

type Remark int

const (
	FoundEntirely = Remark(iota)
	FoundMultipleWords
	NotFoundEntirely
)

type Text struct {
	Word     string   `json:"word"`
	Codes    []string `json:"codes"`
	Validity bool     `json:"validity"`
	Remark   Remark   `json:"remark"`
	Detail   string   `json:"detail"`
}

func Phase1(word string) Text {
	validity := stenocode.Some(word)
	remark := FoundEntirely
	detail := fmt.Sprintf(`Word "%s" has found`, word)
	if !validity {
		remark = NotFoundEntirely
		detail = fmt.Sprintf(`Word "%s" has not found`, word)
	}
	return Text{
		Word:     word,
		Codes:    []string{},
		Validity: validity,
		Remark:   remark,
		Detail:   detail,
	}
}

func phase11(s string) []Text {
	ss := splitter.Spaces(s)
	t := make([]Text, 0, len(ss))
	for _, sss := range ss {
		t = append(t, Phase1(sss))
	}
	return t
}

var errEmptyArray = errors.New("empty array has passed")

func phase2(texts []Text) (Text, error) {
	if len(texts) == 0 {
		return Text{}, errEmptyArray
	}
	if !texts[0].Validity {
		return texts[0], nil
	}
	words := []string{texts[0].Word}
	for _, text := range texts[1:] {
		if !text.Validity {
			break
		}
		validity := stenocode.Some(
			strings.Join(append(words, text.Word), " "),
		)
		if !validity {
			break
		}
		words = append(words, text.Word)
	}
	remark := FoundMultipleWords
	detail := fmt.Sprintf(`Words "%s" have found`, strings.Join(words, " "))
	if len(words) <= 1 {
		remark = FoundEntirely
		detail = texts[0].Detail
	}
	return Text{
		Word:     strings.Join(words, " "),
		Codes:    []string{},
		Validity: true,
		Remark:   remark,
		Detail:   detail,
	}, nil
}

func phase22(texts []Text) ([]Text, error) {
	if len(texts) == 0 {
		return []Text{}, errEmptyArray
	}
	tt := make([]Text, 0, len(texts)*2)
	for i, l := 0, len(texts); i < l; i++ {
		z, _ := phase2(texts[i:])
		tt = append(tt, z)
		i += len(strings.Split(z.Word, " ")) - 1
	}
	return tt, nil
}

func phase3(texts []Text) []Text {
	tt := make([]Text, 0, len(texts))
	for _, t := range texts {
		if t.Validity {
			tt = append(tt, t)
			continue
		}
		sss := splitter.Symbol(t.Word)
		for _, word := range sss {
			validity := stenocode.Some(word)
			remark := FoundEntirely
			detail := fmt.Sprintf(`Word "%s" has found`, word)
			if !validity {
				remark = NotFoundEntirely
				detail = fmt.Sprintf(`Word "%s" has not found`, word)
			}
			tt = append(tt, Text{
				Word:     word,
				Codes:    []string{},
				Validity: validity,
				Remark:   remark,
				Detail:   detail,
			})
		}
	}
	return tt
}

func phase4(texts []Text) []Text {
	tt := make([]Text, 0, len(texts))
	for _, text := range texts {
		var codes []string
		if text.Validity {
			codes = stenocode.Find(text.Word)
		}
		tt = append(tt, Text{
			Word:     text.Word,
			Codes:    codes,
			Validity: text.Validity,
			Remark:   text.Remark,
			Detail:   text.Detail,
		})
	}
	return tt
}

type Result struct {
	texts []Text
}

type Compressed struct {
	Word  string   `json:"word"`
	Codes []string `json:"codes"`
}

func (r Result) Json() ([]byte, error) {
	return json.Marshal(r.texts)
}

func (r Result) Compress() ([]byte, error) {
	c := make([]Compressed, 0, len(r.texts))
	for _, text := range r.texts {
		c = append(c, Compressed{
			Word:  text.Word,
			Codes: text.Codes,
		})
	}
	return json.Marshal(c)
}

func Find(s string) Result {
	timeTotal := time.Now()
	timePhase1 := time.Now()
	p1 := phase11(s)
	log.Printf("[%s] phase1\n", time.Since(timePhase1))
	timePhase2 := time.Now()
	p2, _ := phase22(p1)
	log.Printf("[%s] phase2\n", time.Since(timePhase2))
	timePhase3 := time.Now()
	p3 := phase3(p2)
	log.Printf("[%s] phase3\n", time.Since(timePhase3))
	timePhase4 := time.Now()
	p4 := phase4(p3)
	log.Printf("[%s] phase4\n", time.Since(timePhase4))
	log.Printf("[%s] total\n", time.Since(timeTotal))
	return Result{p4}
}
