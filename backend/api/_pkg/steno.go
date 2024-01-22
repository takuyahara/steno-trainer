package steno

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"regexp"
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
	WordOriginal string   `json:"wordOriginal"`
	Word         string   `json:"word"`
	Codes        []string `json:"codes"`
	Validity     bool     `json:"validity"`
	Remark       Remark   `json:"remark"`
	Detail       string   `json:"detail"`
}

// Check if word exists in dictionary.
func Phase1(s string) Text {
	wordOriginal := s
	word := s
	if isCapital(s) {
		word = strings.ToLower(word[0:1]) + word[1:]
	}
	validity := stenocode.Some(word)
	remark := FoundEntirely
	detail := fmt.Sprintf(`Word "%s" has found`, word)
	if !validity {
		remark = NotFoundEntirely
		detail = fmt.Sprintf(`Word "%s" has not found`, word)
	}
	return Text{
		WordOriginal: wordOriginal,
		Word:         word,
		Codes:        []string{},
		Validity:     validity,
		Remark:       remark,
		Detail:       detail,
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

// Check if words exist in dictionary as a set like "this is".
func phase2(texts []Text) (Text, error) {
	if len(texts) == 0 {
		return Text{}, errEmptyArray
	}
	if !texts[0].Validity {
		return texts[0], nil
	}
	wordsOriginal := []string{texts[0].WordOriginal}
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
		wordsOriginal = append(wordsOriginal, text.WordOriginal)
		words = append(words, text.Word)
	}
	remark := FoundMultipleWords
	detail := fmt.Sprintf(`Words "%s" have found`, strings.Join(words, " "))
	if len(words) <= 1 {
		remark = FoundEntirely
		detail = texts[0].Detail
	}
	return Text{
		WordOriginal: strings.Join(wordsOriginal, " "),
		Word:         strings.Join(words, " "),
		Codes:        []string{},
		Validity:     true,
		Remark:       remark,
		Detail:       detail,
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

// Find symbols.
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
				WordOriginal: t.WordOriginal,
				Word:         word,
				Codes:        []string{},
				Validity:     validity,
				Remark:       remark,
				Detail:       detail,
			})
		}
	}
	return tt
}

// Find codes.
func phase4(texts []Text) []Text {
	tt := make([]Text, 0, len(texts))
	for _, text := range texts {
		var codes []string
		if text.Validity {
			codes = stenocode.Find(text.Word)
		}
		tt = append(tt, Text{
			WordOriginal: text.WordOriginal,
			Word:         text.Word,
			Codes:        codes,
			Validity:     text.Validity,
			Remark:       text.Remark,
			Detail:       text.Detail,
		})
	}
	return tt
}

var reCapital = regexp.MustCompile(`^[A-Z]`)

func isCapital(s string) bool {
	return reCapital.MatchString(s)
}

// Append `KPA*/` on codes if word is capitalized.
func phase5(texts []Text) []Text {
	tt := make([]Text, 0, len(texts))
	for _, text := range texts {
		codes := text.Codes
		if text.Validity {
			if isCapital(text.WordOriginal) {
				for i := range codes {
					codes[i] = "KPA*/" + codes[i]
				}
			}
		}
		tt = append(tt, Text{
			WordOriginal: text.WordOriginal,
			Word:         text.WordOriginal,
			Codes:        codes,
			Validity:     text.Validity,
			Remark:       text.Remark,
			Detail:       text.Detail,
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
	timePhase5 := time.Now()
	p5 := phase5(p4)
	log.Printf("[%s] phase5\n", time.Since(timePhase5))
	log.Printf("[%s] total\n", time.Since(timeTotal))
	return Result{p5}
}
