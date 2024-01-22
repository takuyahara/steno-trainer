package splitter

import (
	"regexp"
	"strings"
)

var symbols = map[string]string{
	"*":  "{^*^}",
	"\\": "{^\\^}",
	" ":  "{^ ^}",
	";":  "{^;^}",
	"@":  "{^@^}",
	"=":  "{^=^}",
	":":  "{^:^}",
	"[":  "{^[^}",
	"]":  "{^]^}",
	"|":  "{^|^}",
	".":  "{^.^}",
	",":  "{^,^}",
	"-":  "{^-^}",
	"^":  "{^_^}",
	">":  "{^>^}",
	"<":  "{^<^}",
	"/":  "{^/^}",
	`"`:  `{~|"^}`,
	"'":  "{^'}",
}

var reSpaces = regexp.MustCompile(`\s+`)

func Spaces(s string) []string {
	return reSpaces.Split(strings.TrimSpace(s), -1)
}

var reCamelCase = regexp.MustCompile(`([a-z])([A-Z])`)

// https://stackoverflow.com/a/18379358/10942999
func CamelCase(s string) []string {
	// s.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
	return strings.Split(reCamelCase.ReplaceAllString(s, `$1 $2`), " ")
}

// var reSymbol = (func() *regexp.Regexp {
// 	s := make([]string, 0, len(symbols))
// 	for symbol := range symbols {
// 		s = append(s, regexp.QuoteMeta(symbol))
// 	}
// 	ss := "[" + strings.Join(s, "") + "]"
// 	p := fmt.Sprintf("(.*%s)*", ss)
// 	return regexp.MustCompile(p)
// })()

func Symbol(s string) []string {
	return []string{}
	// return reSymbol.FindAllStringSubmatch(s, -1)[1]
}
