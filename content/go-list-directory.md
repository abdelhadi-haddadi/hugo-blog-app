+++
title = "Go list directory"
date = 2025-08-29T19:55:25.763+01:00
draft = false
description = "Learn how to list directory contents in Go. Includes examples of file system operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go list directory

last modified April 11, 2024

Go list directory show how to list directory contents in Golang.

## Directory definition

A directory is a unit in a computer's file system for storing and locating
files. Directories are hierarchically organized into a tree. Directories have
parent-child relationships. A directory is sometimes also called a folder. 

In Go, we can list directories with ioutil.ReadDir, 
filepath.Walk, or filepath.Glob.

## Go list directory with ioutil.ReadDir

The ioutil.ReadDir reads the directory and returns a list of
directory entries sorted by filename. 

func ReadDir(dirname string) ([]os.FileInfo, error)

This is the syntax of the ReadDir function.

read_homedir.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "os"
)

func main() {

    home, err := os.UserHomeDir()

    if err != nil {

        log.Fatal(err)
    }

    files, err := ioutil.ReadDir(home)

    if err != nil {

        log.Fatal(err)
    }

    for _, f := range files {

        fmt.Println(f.Name())
    }
}

The example reads the user home directory contents. The home user directory is 
determined with os.UserHomeDir. The listing is non-recursive.

## Go list files by extension

The filepath.Ext returns the file name extension used by path.

list_files_ext.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "path/filepath"
)

func main() {

    path := "/home/janbodnar/Documents/"

    files, err := ioutil.ReadDir(path)

    if err != nil {

        log.Fatal(err)
    }

    for _, f := range files {

        if filepath.Ext(f.Name()) == ".txt" {

            fmt.Println(f.Name())
        }
    }
}

The example shows all .txt files in the Documents
directory.

## Go list directories

The FileInfo's IsDir can be used to limit the listing 
to only files or directories. 

list_files.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "os"
)

func main() {

    home, err := os.UserHomeDir()

    if err != nil {

        log.Fatal(err)
    }

    files, err := ioutil.ReadDir(home)

    if err != nil {

        log.Fatal(err)
    }

    for _, f := range files {

        if !f.IsDir() {
            fmt.Println(f.Name())
        }
    }
}

The example list only files in the home directory.

## Go list directory with filepath.Glob

The filepath.Glob returns the names of all files matching pattern 
or nil if there is no matching file.

func Glob(pattern string) (matches []string, err error)

This is the syntax of the filepath.Glob function.

globbing.go
  

package main

import (
    "fmt"
    "log"
    "path/filepath"
)

func main() {

    files, err := filepath.Glob("/root/Documents/prog/golang/**/*.go")

    if err != nil {
        log.Fatal(err)
    }

    for _, file := range files {

        fmt.Println(file)
    }
}

The example lists all Go files in the given directory. With the **
pattern, the listing is recursive. 

## Go list directory with filepath.Walk

For recursive directory listings, we can use the filepath.Walk
function.

func Walk(root string, walkFn WalkFunc) error

The function walks the file tree rooted at root, calling walkFn for
each file or directory in the tree, including root. All errors from 
visiting files and directories are filtered by walkFn. 

walking.go
  

package main

import (
    "fmt"
    "log"
    "os"
    "path/filepath"
)

func main() {

    err := filepath.Walk("/home/janbodnar/Documents/prog/golang/",

        func(path string, info os.FileInfo, err error) error {

            if err != nil {
                return err
            }

            fmt.Println(path, info.Size())
            return err
        })

    if err != nil {

        log.Println(err)
    }
}

The example walks recursively the given directory. It outputs each path name and
size. 

## Go directory size

The following example uses the filepath.Walk function to get the 
size of all files in the given directory. The directory sizes are not included.

dirsize.go
  

package main

import (
    "fmt"
    "log"
    "os"
    "path/filepath"
)

func main() {

    var size int64

    path := "/home/janbodnar/Documents/prog/golang/"

    err := filepath.Walk(path, func(_ string, info os.FileInfo, err error) error {

        if err != nil {
            return err
        }

        if !info.IsDir() {

            size += info.Size()
        }

        return err
    })

    if err != nil {

        log.Println(err)
    }

    fmt.Printf("The directory size is: %d\n", size)
}

The example uses the IsDir function to tell a file from a directory. 
The size of a file is determined with the Size function.

## Go list large files

The following example outputs large files with filepath.Walk.

large_files.go
  

package main

import (
    "fmt"
    "log"
    "os"
    "path/filepath"
)

func main() {

    var files []string

    var limit int64 = 1024 * 1024 * 1024

    path := "/home/janbodnar/Downloads/"

    err := filepath.Walk(path, func(path string, info os.FileInfo, err error) error {

        if err != nil {
            return err
        }

        if info.Size() &gt; limit {

            files = append(files, path)
        }

        return err
    })

    if err != nil {
        log.Println(err)
    }

    for _, file := range files {

        fmt.Println(file)
    }
}

In the code example, we list all files that are larger than 1GB in the Downloads
directory.

## Source

[Go path/filepath package - reference](https://pkg.go.dev/path/filepath)

In this article we have listed directory contents in Go. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).