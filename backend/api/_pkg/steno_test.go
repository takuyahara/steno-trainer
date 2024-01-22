package steno

import (
	"reflect"
	"testing"
)

func TestPhase1(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want Text
	}{
		{
			name: "hello",
			args: args{"hello"},
			want: Text{
				Word:     "hello",
				Codes:    []string{},
				Validity: true,
				Remark:   FoundEntirely,
				Detail:   `Word "hello" has found`,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Phase1(tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Phase1() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestPhase11(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []Text
	}{
		{
			name: "hello",
			args: args{"hello"},
			want: []Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
			},
		},
		{
			name: "konnichiwa",
			args: args{"konnichiwa"},
			want: []Text{
				{
					Word:     "konnichiwa",
					Codes:    []string{},
					Validity: false,
					Remark:   NotFoundEntirely,
					Detail:   `Word "konnichiwa" has not found`,
				},
			},
		},
		{
			name: "hello world",
			args: args{"hello world"},
			want: []Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
				{
					Word:     "world",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "world" has found`,
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := phase11(tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("phase11() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestPhase2(t *testing.T) {
	type args struct {
		texts []Text
	}
	type wants struct {
		text Text
		err  error
	}
	tests := []struct {
		name  string
		args  args
		wants wants
	}{
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "this",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "this" has found`,
				},
				{
					Word:     "is",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "is" has found`,
				},
				{
					Word:     "test",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "test" has found`,
				},
			}},
			wants: wants{
				text: Text{
					Word:     "this is",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundMultipleWords,
					Detail:   `Words "this is" have found`,
				},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
				{
					Word:     "world",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "world" has found`,
				},
			}},
			wants: wants{
				text: Text{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
			}},
			wants: wants{
				text: Text{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{}},
			wants: wants{
				text: Text{},
				err:  errEmptyArray,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got1, got2 := phase2(tt.args.texts)
			if !reflect.DeepEqual(got1, tt.wants.text) {
				t.Errorf("phase2() = %v %v, want %v %v", got1, got2, tt.wants.text, tt.wants.err)
			}
			if got2 != tt.wants.err {
				t.Errorf("phase2() = %v %v, want %v %v", got1, got2, tt.wants.text, tt.wants.err)
			}
		})
	}
}

func TestPhase22(t *testing.T) {
	type args struct {
		texts []Text
	}
	type wants struct {
		text []Text
		err  error
	}
	tests := []struct {
		name  string
		args  args
		wants wants
	}{
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "this",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "this" has found`,
				},
				{
					Word:     "is",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "is" has found`,
				},
				{
					Word:     "test",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "test" has found`,
				},
			}},
			wants: wants{
				text: []Text{
					{
						Word:     "this is",
						Codes:    []string{},
						Validity: true,
						Remark:   FoundMultipleWords,
						Detail:   `Words "this is" have found`,
					},
					{
						Word:     "test",
						Codes:    []string{},
						Validity: true,
						Remark:   FoundEntirely,
						Detail:   `Word "test" has found`,
					},
				},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
				{
					Word:     "world",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "world" has found`,
				},
			}},
			wants: wants{
				text: []Text{
					{
						Word:     "hello",
						Codes:    []string{},
						Validity: true,
						Remark:   FoundEntirely,
						Detail:   `Word "hello" has found`,
					},
					{
						Word:     "world",
						Codes:    []string{},
						Validity: true,
						Remark:   FoundEntirely,
						Detail:   `Word "world" has found`,
					},
				},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{
				{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				},
			}},
			wants: wants{
				text: []Text{{
					Word:     "hello",
					Codes:    []string{},
					Validity: true,
					Remark:   FoundEntirely,
					Detail:   `Word "hello" has found`,
				}},
				err: nil,
			},
		},
		{
			name: "hello",
			args: args{[]Text{}},
			wants: wants{
				text: []Text{},
				err:  errEmptyArray,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got1, got2 := phase22(tt.args.texts)
			if !reflect.DeepEqual(got1, tt.wants.text) {
				t.Errorf("phase22() = %v %v, want %v %v", got1, got2, tt.wants.text, tt.wants.err)
			}
			if got2 != tt.wants.err {
				t.Errorf("phase22() = %v %v, want %v %v", got1, got2, tt.wants.text, tt.wants.err)
			}
		})
	}
}
