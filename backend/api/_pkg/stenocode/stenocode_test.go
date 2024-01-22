package stenocode

import (
	"slices"
	"testing"
)

func TestSome(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "normal",
			args: args{"this"},
			want: true,
		},
		{
			name: "typoscript",
			args: args{"typoscript"},
			want: false,
		},
		{
			name: "empty",
			args: args{""},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Some(tt.args.s); got != tt.want {
				t.Errorf("Some() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestFind(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "normal",
			args: args{"this"},
			want: []string{"TH", "TH-RBGS"},
		},
		{
			name: "typoscript",
			args: args{"typoscript"},
			want: []string{},
		},
		{
			name: "empty",
			args: args{""},
			want: []string{},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Find(tt.args.s); !slices.Equal(got, tt.want) {
				t.Errorf("Find() = %v, want %v", got, tt.want)
			}
		})
	}
}
