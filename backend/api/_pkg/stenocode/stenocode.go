package stenocode

import (
	_ "embed"
	"regexp"
)

func Some(s string) bool {
	for _, pair := range dictionary {
		word := pair[1]
		if word == s {
			return true
		}
	}
	return false
}

var reNumber = regexp.MustCompile(`[0-9]`)

func Find(s string) []string {
	var found []string
	for _, pair := range dictionary {
		code := pair[0]
		word := pair[1]
		if word == s && !reNumber.MatchString(code) {
			found = append(found, code)
		}
	}
	return found
}
