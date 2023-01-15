package public

type ShellType struct {
	ID   int    `bson:"ID"`
	Name string `bson:"Name"`
	Path string `bson:"Path"`
}

var ShellFiles = []ShellType{}
