+++
title = "Go filepath"
date = 2025-08-29T19:55:15.486+01:00
draft = false
description = "Learn how to handle file paths in Go. Includes examples of path manipulation and file system operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go filepath

last modified April 11, 2024

In this article we show how to work with filename paths in Golang. The
utilities are located in the path/filepath package.

The path/filepath package tries to be compatible with the target
operating system-defined file paths.

## Go filepath.Abs, filepath.IsAbs

An absolute path is a full path coming from the from the root directory. A
relative path is defined as the path related to the present working directly.

The filepath.Abs returns an absolute representation of path. The
filepath.IsAbs checks if the given path is an absolute path.

main.go
  

package main

import (
    "fmt"
    "log"
    "path/filepath"
)

func main() {

    fname := "./main.go"
    abs_fname, err := filepath.Abs(fname)

    if err != nil {
        log.Fatal(err)
    }

    if filepath.IsAbs(fname) {
        fmt.Printf("%s - is an absolute path\n", fname)
    } else {
        fmt.Printf("%s - is not an absolute path\n", fname)
    }

    if filepath.IsAbs(abs_fname) {
        fmt.Printf("%s - is an absolute path\n", abs_fname)
    } else {
        fmt.Printf("%s - is not an absolute path\n", abs_fname)
    }

}

The example uses both filepath.Abs and filepath.IsAbs
functions.

$ go run main.go
./main.go - is not an absolute path
/home/jano/Documents/prog/go/filepath/abs/main.go - is an absolute path

## Go filepath.Base, filepath.Dir

The filepath.Base function returns the last element of path and
the filepath.Dir returns all but the last element of path, which is
usually the file directory.

main.go
  

package main

import (
    "fmt"
    "log"
    "path/filepath"
)

func main() {

    p, err := filepath.Abs("./main.go")

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(p)

    fmt.Printf("Base: %s\n", filepath.Base(p))
    fmt.Printf("Dir: %s\n", filepath.Dir(p))
}

The example prints the filename and the directory name main.go
file.

$ go run main.go
/home/jano/Documents/prog/go/filepath/base-dir/main.go
Base: main.go
Dir: /home/jano/Documents/prog/go/filepath/base-dir

## Go filepath.Ext

The filepath.Ext returns the file name extension used by path.

main.go
  

package main

import (
    "fmt"
    "path/filepath"
)

func main() {

    p := "/home/user7/media/aliens.mp4"
    ext := filepath.Ext(p)
    fmt.Println("File extension:", ext)

    p = "./main.go"
    ext = filepath.Ext(p)
    fmt.Println("File extension:", ext)
}

The example returns file extensions of two paths.

$ go run main.go
File extension: .mp4
File extension: .go

## Go filepath.Clean

The filepath.Clean function cleans the filepaths from duplications
and irregularities.

main.go
  

package main

import (
    "fmt"
    "path"
)

func main() {

    paths := []string{
        "home/user7",
        "home//user7",
        "home/user7/.",
        "home/user7/Documents/..",
        "/../home/user7",
        "/../home/Documents/../././/user7",
        "",
    }

    for _, p := range paths {
        fmt.Printf("%q = %q\n", p, path.Clean(p))
    }
}

In the example, we clean a few filepaths.

$ go run main.go
"home/user7" = "home/user7"
"home//user7" = "home/user7"
"home/user7/." = "home/user7"
"home/user7/Documents/.." = "home/user7"
"/../home/user7" = "/home/user7"
"/../home/Documents/../././/user7" = "/home/user7"
"" = "."

## Go filepath.Split, filepath.SplitList

The filepath.Split function splits the given path into a directory
and file name component. The filepath.SplitList function splits a
list of paths joined by the OS-specific line separator.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
    "path/filepath"
)

func main() {

    cwd, err := os.Getwd()

    if err != nil {
        log.Fatal(err)
    }

    dir, file := filepath.Split(cwd)

    fmt.Printf("Directory: %s\n", dir)
    fmt.Printf("File: %s\n", file)

    home, err := os.UserHomeDir()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("-------------------------")

    dir, file = filepath.Split(home)

    fmt.Printf("Directory: %s\n", dir)
    fmt.Printf("File: %s\n", file)

    path_env := os.Getenv("PATH")
    paths := filepath.SplitList(path_env)

    for _, p := range paths {
        fmt.Println(p)
    }
}

In the example, we first split the current working directory and the user home
directory. Then we split the list of paths inside the PATH variable.

## Go filepath.Walk

The filepath.Walk function walks the file tree rooted at root.

func Walk(root string, fn WalkFunc) error

It calls the WalkFunc for each file or directory in the tree, including root.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
    "path/filepath"
)

func main() {

    var files []string

    root := "/home/jano/Documents"

    err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {

        if err != nil {

            fmt.Println(err)
            return nil
        }

        if !info.IsDir() &amp;&amp; filepath.Ext(path) == ".txt" {
            files = append(files, path)
        }

        return nil
    })

    if err != nil {
        log.Fatal(err)
    }

    for _, file := range files {
        fmt.Println(file)
    }
}

In the example, we go through the files inside the Documents directory and
list all text files (files having .txt extension).

## Go filepath.Glob

The filepath.Glob returns the names of all files matching pattern 
or nil if there is no matching file.

func Glob(pattern string) (matches []string, err error)

This is the syntax of the filepath.Glob function.

main.go
  

package main

import (
    "fmt"
    "log"
    "path/filepath"
)

func main() {

    files, err := filepath.Glob("/home/jano/Documents/prog/go/**/**/*.go")

    fmt.Println(len(files))

    if err != nil {
        log.Fatal(err)
    }

    for _, file := range files {

        fmt.Println(file)
    }
}

The example lists all Go files in the given directory. With the **
pattern, the listing is recursive. 

## Go filepath.VolumeName

The filepath.VolumeName function returns leading volume name on 
Windows. On other platforms, it returns an empty string.

main.go
  

package main

import (
    "fmt"
    "log"
    "path/filepath"
)

func main() {

    fname := "./main.go"
    ap, err := filepath.Abs(fname)

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(filepath.VolumeName(ap))
}

The example prints the volume name of the main.go file.

$ go run main.go
C:

## Source

[Go path/filepath package - reference](https://pkg.go.dev/path/filepath)

In this article we have worked filename paths in Go utilizing the
filename/path package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).