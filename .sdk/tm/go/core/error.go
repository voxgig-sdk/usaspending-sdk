package core

type UsaspendingError struct {
	IsUsaspendingError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUsaspendingError(code string, msg string, ctx *Context) *UsaspendingError {
	return &UsaspendingError{
		IsUsaspendingError: true,
		Sdk:              "Usaspending",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UsaspendingError) Error() string {
	return e.Msg
}
