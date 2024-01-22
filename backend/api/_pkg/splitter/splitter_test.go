package splitter

import (
	"slices"
	"testing"
)

func TestSpaces(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "nospace",
			args: args{"nospace"},
			want: []string{"nospace"},
		},
		{
			name: "with single spaces",
			args: args{"with single spaces"},
			want: []string{"with", "single", "spaces"},
		},
		{
			name: "with   long   spaces",
			args: args{"with   long   spaces"},
			want: []string{"with", "long", "spaces"},
		},
		{
			name: " to be trimmed ",
			args: args{" to be trimmed "},
			want: []string{"to", "be", "trimmed"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Spaces(tt.args.s); !slices.Equal(got, tt.want) {
				t.Errorf("Spaces() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCamelCase(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "noncamelcase",
			args: args{"noncamelcase"},
			want: []string{"noncamelcase"},
		},
		{
			name: "lowerCamelCase",
			args: args{"lowerCamelCase"},
			want: []string{"lower", "Camel", "Case"},
		},
		{
			name: "UpperCamelCase",
			args: args{"UpperCamelCase"},
			want: []string{"Upper", "Camel", "Case"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CamelCase(tt.args.s); !slices.Equal(got, tt.want) {
				t.Errorf("CamelCase() = %v, want %v", got, tt.want)
			}
		})
	}
}

// func TestSymbol(t *testing.T) {
// 	type args struct {
// 		s string
// 	}
// 	tests := []struct {
// 		name string
// 		args args
// 		want []string
// 	}{
// 		{
// 			name: `"doublequotes"`,
// 			args: args{`"doublequotes"`},
// 			want: []string{`"`, `doublequotes`, `"`},
// 		},
// 		{
// 			name: `'singlequotes'`,
// 			args: args{`'singlequotes'`},
// 			want: []string{`'`, `singlequotes`, `'`},
// 		},
// 	}
// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			if got := Symbol(tt.args.s); !slices.Equal(got, tt.want) {
// 				t.Errorf("Symbol() = %v, want %v", got, tt.want)
// 			}
// 		})
// 	}
// }
