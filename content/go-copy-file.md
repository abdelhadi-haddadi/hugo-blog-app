+++
title = "Go copy file"
date = 2025-08-29T19:55:06.186+01:00
draft = false
description = "Learn how to copy files in Go. Includes examples of file operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go copy file

last modified April 29, 2025

This tutorial demonstrates how to copy files in Golang using various methods. We
explore five distinct approaches to copying a file, showcasing different Go
packages and functions. Each method offers unique advantages depending on the
use case, such as simplicity, performance, or fine-grained control.

We utilize functions like ioutil.ReadFile, ioutil.WriteFile,
io.Copy, File.Read, File.Write, and
others from Go's standard library to perform file copying operations
efficiently.

## Copying with ioutil

The first example uses the ioutil package for a straightforward
approach. It reads the entire source file into memory and writes it to the
destination, ideal for small files due to its simplicity and minimal code.

copy_file.go
  

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

The ioutil.ReadFile function reads the entire content of the source
file into a byte slice, handling file opening and closing internally. The
ioutil.WriteFile function writes this byte slice to the destination
file, creating or overwriting it with the specified permissions (0644). This
method is concise but may not be suitable for very large files due to memory
usage.

## Using io.Copy

The second example employs the io.Copy function, which streams data
from the source to the destination file. This method is memory-efficient as it
avoids loading the entire file into memory, making it suitable for large files.

copy_file2.go
  

package main

import (
    "io"
    "log"
    "os"
)

func main() {

    src := "words.txt"
    dst := "words2.txt"

    fin, err := os.Open(src)
    if err != nil {
        log.Fatal(err)
    }
    defer fin.Close()

    fout, err := os.Create(dst)
    if err != nil {
        log.Fatal(err)
    }
    defer fout.Close()

    _, err = io.Copy(fout, fin)

    if err != nil {
        log.Fatal(err)
    }
}

We use os.Open to open the source file and os.Create to
create or truncate the destination file. These return file handles that are
passed to io.Copy, which efficiently streams data in chunks. The
defer statements ensure both files are closed after copying,
preventing resource leaks. This approach balances simplicity and performance.

## Using File.Read and File.Write

The third example uses File.Read and File.Write for
manual control over the copying process. It reads the file in chunks, offering
flexibility to process data during copying, which is useful for custom
transformations or monitoring progress.

copy_file3.go
  

package main

import (
    "io"
    "log"
    "os"
)

func main() {

    src := "words.txt"
    dst := "words2.txt"

    buf := make([]byte, 1024)

    fin, err := os.Open(src)
    if err != nil {
        log.Fatal(err)
    }

    defer fin.Close()

    fout, err := os.Create(dst)
    if err != nil {
        log.Fatal(err)
    }

    defer fout.Close()

    for {

        n, err := fin.Read(buf)
        if err != nil &amp;&amp; err != io.EOF {
            log.Fatal(err)
        }

        if n == 0 {
            break
        }

        if _, err := fout.Write(buf[:n]); err != nil {
            log.Fatal(err)
        }
    }
}

A 1024-byte buffer is created to read chunks of the source file using
File.Read. The loop continues until no bytes are read (n == 0),
indicating the end of the file. Each chunk is written to the destination file
using File.Write. The io.EOF check distinguishes between
read errors and the end of the file. This method provides granular control but
requires more code.

## Using os.ReadFine and os.WriteFile

The fourth example uses os.ReadFile and os.WriteFile,
modern replacements for the deprecated ioutil functions. This
approach is similar to the first example but uses updated APIs, ensuring
compatibility with newer Go versions.

copy_file4.go
  

package main

import (
    "log"
    "os"
)

func main() {

    src := "words.txt"
    dst := "words2.txt"

    data, err := os.ReadFile(src)
    if err != nil {
        log.Fatal(err)
    }

    err = os.WriteFile(dst, data, 0644)
    if err != nil {
        log.Fatal(err)
    }
}

The os.ReadFile function reads the entire source file into a byte
slice, similar to ioutil.ReadFile. The os.WriteFile
function writes this data to the destination file with the specified permissions
(0644). This method is simple and recommended for small files in modern Go
programs, as it uses non-deprecated functions from the os package.

## Copying with io.CopyBuffer

The fifth example combines io.CopyBuffer with a custom buffer,
offering a variation of the second example. It allows explicit control over the
buffer size, which can optimize performance for specific file sizes or hardware.

copy_file5.go
  

package main

import (
    "io"
    "log"
    "os"
)

func main() {

    src := "words.txt"
    dst := "words2.txt"

    buf := make([]byte, 4096)

    fin, err := os.Open(src)
    if err != nil {
        log.Fatal(err)
    }
    defer fin.Close()

    fout, err := os.Create(dst)
    if err != nil {
        log.Fatal(err)
    }
    defer fout.Close()

    _, err = io.CopyBuffer(fout, fin, buf)
    if err != nil {
        log.Fatal(err)
    }
}

We allocate a 4096-byte buffer for copying, larger than the default used by
io.Copy. The io.CopyBuffer function streams data from
the source to the destination file using this buffer. This method is efficient
for large files and allows tuning the buffer size for performance, while
maintaining the simplicity of the streaming approach.

## Source

[Go io package - reference](https://pkg.go.dev/io)

In this article we have copied files in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).