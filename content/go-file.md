+++
title = "Go file"
date = 2025-08-29T19:55:14.359+01:00
draft = false
description = "Learn how to work with files in Go. Includes examples of reading, writing, and managing files."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go file

last modified April 11, 2024

In this article we show how to work with files in Golang. We read files, write
to files, create files, list files, and determine their size and modification
time.

To work with files in Go, we use the os, ioutil, 
and fmt packages.

The os.Stat function returns the FileInfo structure
describing the file. 

## Go check if file exists

In the following example, we check if the given file exists.

main.go
  

package main

import (
    "errors"
    "fmt"
    "os"
)

func main() {

    _, err := os.Stat("words.txt")

    if errors.Is(err, os.ErrNotExist) {

        fmt.Println("file does not exist")
    } else {

        fmt.Println("file exists")
    }
}

We call the os.Stat function on the file. If the function returns 
the os.ErrNotExist error, the file does not exist.

## Go create file

The os.Create function creates or truncates the given file. If the
file already exists, it is truncated. If the file does not exist, it is created
with mode 0666.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

    file, err := os.Create("empty.txt")

    defer file.Close()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("file created")
}

The example creates an empty file.

## Go delete file

The os.Remove deletes the given file.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

    err := os.Remove("words.txt")

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println("file deleted")
}

The example removes a file.

## Go file size

In the following example, we get the file size.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

    fInfo, err := os.Stat("words.txt")

    if err != nil {

        log.Fatal(err)
    }

    fsize := fInfo.Size()

    fmt.Printf("The file size is %d bytes\n", fsize)
}

First, we get the FileInfo structure with os.Stat.
Then we get the size of the file in bytes from the structure with
Size function.

## Go file last modified time

In the following example, we get the last modification time of the given file.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

    fileName := "words.txt"

    fileInfo, err := os.Stat(fileName)

    if err != nil {
        log.Fatal(err)
    }

    mTime := fileInfo.ModTime()

    fmt.Println(mTime)
}

We get the last modification time from the FileInfo structure using 
its ModTime function.

## Go read file

The ioutil.ReadFile reads the file specified as a parameter and
returns the contents. The function reads the whole file in one go; therefore, it 
should not be used for large files.

main.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
)

func main() {

    content, err := ioutil.ReadFile("words.txt")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(content))
}

In the code example, we read the contents of a text file and print it to the
console.

A more appropriate way for a large file is to read it line by line. This way the 
program does not take huge amounts of memory.

main.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
)

func main() {

    f, err := os.Open("words.txt")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    scanner := bufio.NewScanner(f)

    for scanner.Scan() {

        fmt.Println(scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
}

The example reads a text file line by line.

f, err := os.Open("words.txt")

The os.Open function opens the specified file for reading. If
successful, the functions on the returned file can be used for reading; the
associated file descriptor has mode O_RDONLY.

scanner := bufio.NewScanner(f)

The bufio.NewScanner function returns a new Scanner to
read from. 

for scanner.Scan() {

    fmt.Println(scanner.Text())
}

With the Scan function we advance to the next token. We get the 
advancement with the Text function. In the default mode, the 
Scan function advances by lines.

## Go write file

The ioutil.WriteFile function data to the specified file. If the
file does not exist, it creates it; otherwise it truncates it before writing.

main.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
)

func main() {

    fileName := "data.txt"

    val := "old\nfalcon\nsky\ncup\nforest\n"
    data := []byte(val)

    err := ioutil.WriteFile(fileName, data, 0644)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("done")
}

The example writes a few words into a file.

val := "old\nfalcon\nsky\ncup\nforest\n"
data := []byte(val)

We have a string from which we create a slice of bytes.

err := ioutil.WriteFile(fileName, data, 0644)

We write the slice of bytes to the given filename with the 0644 permissions.

In the next example, we write a slice of strings to a file.

main.go
  

package main

import (
    "fmt"
    "log"
    "os"
)

func main() {

    fileName := "data.txt"

    f, err := os.Create(fileName)

    if err != nil {

        log.Fatal(err)
    }

    defer f.Close()

    words := []string{"sky", "falcon", "rock", "hawk"}

    for _, word := range words {

        _, err := f.WriteString(word + "\n")

        if err != nil {
            log.Fatal(err)
        }
    }

    fmt.Println("done")
}

The WriteString method writes a string to the file.

## Go append to file

In order to append to a file, we include the os.O_APPEND flag
to the flags of the os.OpenFile function.

main.go
  

package main

import (
    "log"
    "os"
)

func main() {

    fileName := "words.txt"

    f, err := os.OpenFile(fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    if _, err := f.WriteString("cloud\n"); err != nil {

        log.Fatal(err)
    }
}

The example appends one word to the words.txt file using the
WriteString function.

## Go copy file

The next example copies a file.

main.go
  

package main

import (
    "io/ioutil"
    "log"
)

func main() {

    src := "words.txt"
    dest := "words2.txt"

    bytesRead, err := ioutil.ReadFile(src)

    if err != nil {
        log.Fatal(err)
    }

    err = ioutil.WriteFile(dest, bytesRead, 0644)

    if err != nil {
        log.Fatal(err)
    }
}

In the code example, we read the contents of the source file with 
ioutil.ReadFile and write data to the desitination file with
ioutil.WriteFile.

## Go list files

The filepath.Walk walks the file tree, calling the specified
function for each file or directory in the tree, including root. The function is
recursively walking all subdirectories.

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

    root := "/home/janbodnar/Documents"

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

In the code example, we search for files with .txt extension.

var files []string

The matching files are stored in the files slice.

root := "/home/janbodnar/Documents"

This is the root directory where we start searching.

err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {

The first parameter of the filepath.Walk is the root directory. The
second parameter is the walk function; the function  called by
filepath.Walk to visit each each file or directory.

if err != nil {

    fmt.Println(err)
    return nil
}

Print the error if there is one, but continue searching elsewhere.

if !info.IsDir() &amp;&amp; filepath.Ext(path) == ".txt" {
    files = append(files, path)
}

We append the file to the files slice if the file is not a
directory and it has the .txt extension.

for _, file := range files {
    fmt.Println(file)
}

Finally, we go over the files slice and print all matching files
to the console.

 
## Source

[Go os package - reference](https://pkg.go.dev/os)

In this article we have worked with files in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).