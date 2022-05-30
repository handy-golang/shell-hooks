package public

type ShellType struct {
	ID   int    `json:"ID"`
	Name string `json:"Name"`
	Path string `json:"Path"`
}

var ShellFiles = []ShellType{}
