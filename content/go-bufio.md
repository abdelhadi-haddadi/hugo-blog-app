+++
title = "Go bufio"
date = 2025-08-29T19:55:02.888+01:00
draft = false
description = "Learn how to use the bufio package in Go. Includes examples of buffered I/O operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go bufio

last modified April 11, 2024

In this article we show how to do buffered input and ouput operations in Golang
using the bufio package.

## The bufio package

The built-in bufio package implements buffered IO operations.
Buffering is a technique which improves the performance of IO operations.

Since system calls are costly, the performance of IO operations is greatly
improved when we accumulate data into a buffer where reading or writing it.
This reduces the number of system calls needed.

type Reader
type Writer
type Scanner

The Reader implements buffering for an io.Reader object. The
Writer implements buffering for an io.Writer object. The
Scanner provides a convenient interface for reading data such as a
file of newline-delimited lines of text.

A new reader is created with bufio.NewReader or
bufio.NewReaderSize.

func NewReader(rd io.Reader) *Reader
func NewReaderSize(rd io.Reader, size int) *Reader

The NewReader function returns a new Reader whose buffer has the
default size. The NewReaderSize returns a new Reader whose buffer
has at least the specified size.

A new writer is created with bufio.NewWriter or
bufio.NewWriterSize.

func NewWriter(w io.Writer) *Writer
func NewWriterSize(w io.Writer, size int) *Writer

The NewWriter function returns a new Writer whose buffer has the
default size. The NewWriterSize returns a new Writer whose buffer
has at least the specified size.

A new scanner is created with bufio.NewScanner.

func NewScanner(r io.Reader) *Scanner

The NewScanner returns a new Scanner to read from r. The split
function defaults to ScanLines.

func (b *Writer) Flush() error

The Flush writes any buffered data to the underlying io.Writer. 

## Go Reader.ReadString

The ReadString reads until the first occurrence of the given
delimiter in the input.

func (b *Reader) ReadString(delim byte) (string, error)

It returns a string containing the data up to and including the delimiter.

main.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
    "strings"
)

func main() {

    fmt.Print("Enter your name: ")

    r := bufio.NewReader(os.Stdin)

    name, err := r.ReadString('\n')

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Hello %s!\n", strings.TrimSpace(name))
}

With ReadString function, we read an input from the user and
produce a message to the console.

r := bufio.NewReader(os.Stdin)

We create a new reader from the standard input.

name, err := r.ReadString('\n')

A string input is read form the user.

$ go run main.go
Enter your name: Jan
Hello Jan!

## Go Writer.WriteString

The WriteString writes a string to the buffer.

func (b *Writer) WriteString(s string) (int, error)

It returns the number of bytes written.

main.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
)

func main() {

    data := []string{"an old falcon", "misty mountains",
        "a wise man", "a rainy morning"}

    f, err := os.Create("words.txt")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    wr := bufio.NewWriter(f)

    for _, line := range data {

        wr.WriteString(line + "\n")
    }

    wr.Flush()

    fmt.Println("data written")
}

The example writes a few strings into a file with
Writer.WriteString.

wr := bufio.NewWriter(f)

A new writer is created. The default buffer size is 4KB. 

for _, line := range data {

    wr.WriteString(line + "\n")
}

In a for loop, we write the data to the buffer. 

wr.Flush()

Since our data is smaller than the default 4KB buffer size, we have to call 
Flush for the data to be actually written to the file.

## Reading file line by line with Scanner

In the next example, we read a file line by line with a Scanner.

words.txt
  

sky
nice
cup
cloud
forest
water
pond
lake
snow

This is the words.txt file.

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

The example reads a small file containing words on each line.

scanner := bufio.NewScanner(f)

A new scanner is created with bufio.NewScanner.

for scanner.Scan() {
    fmt.Println(scanner.Text())
}

The Scan function advances the Scanner to the next token, which
will then be available through the Bytes or Text
method. By default, the function advances by lines. 

$ go run main.go
sky
nice
cup
cloud
forest
water
pond
lake
snow

## Read words from a string

In the following example, we read words from a string using Scanner.

main.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "strings"
)

func main() {

    words := []string{}

    data := "A foggy mountain.\nAn old falcon.\nA wise man."

    sc := bufio.NewScanner(strings.NewReader(data))

    sc.Split(bufio.ScanWords)

    n := 0

    for sc.Scan() {
        words = append(words, sc.Text())
        n++
    }

    if err := sc.Err(); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("# of words: %d\n", n)

    for _, word := range words {

        fmt.Println(word)
    }
}

The strings.NewReader returns a new reader from a string.

sc.Split(bufio.ScanWords)

We tell the scanner to scan by words using Split.

## Go Writer.WriteRune

The WriteRune writes a single rune.

func (b *Writer) WriteRune(r rune) (size int, err error)

It returns the number of bytes written and any error.

main.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
)

func main() {

    runes := "🐜🐬🐄🐘🦂🐫🐑🦍🐯🐞"

    f, err := os.Create("runes.txt")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    wr := bufio.NewWriter(f)

    for _, _rune := range runes {

        wr.WriteRune(_rune)
        wr.WriteRune('\n')
    }

    wr.Flush()

    fmt.Println("runes written")
}

In the example, we read runes from a string and write them to a file; each one 
on a separate line. 

## Go Reader.Read

The Reader.Read function reads data into a slice of bytes.

func (b *Reader) Read(p []byte) (n int, err error)

It returns the number of bytes read.

In the next example we also use the hex package, which implements
hexadecimal encoding and decoding.

main.go
  

package main

import (
    "bufio"
    "encoding/hex"
    "fmt"
    "log"
    "os"
    "io"
)

func main() {

    f, err := os.Open("sid.jpg")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    reader := bufio.NewReader(f)
    buf := make([]byte, 256)

    for {
        _, err := reader.Read(buf)

        if err != nil {

            if err != io.EOF {
                fmt.Println(err)
            }

            break
        }

        fmt.Printf("%s", hex.Dump(buf))
    }
}

In the code example, we read an image and print it in hexadecimal format.

reader := bufio.NewReader(f)

We create a reader with bufio.NewReader.

buf := make([]byte, 256)

We create a custom buffer of 256 bytes.

for {
    _, err := reader.Read(buf)
...

We read the binary data in a for loop.

fmt.Printf("%s", hex.Dump(buf))

The Dump returns a string that contains a hex dump of the given
data.

$ go run main.go
00000000  ff d8 ff e0 00 10 4a 46  49 46 00 01 01 00 00 01  |......JFIF......|
00000010  00 01 00 00 ff e1 00 2f  45 78 69 66 00 00 49 49  |......./Exif..II|
00000020  2a 00 08 00 00 00 01 00  0e 01 02 00 0d 00 00 00  |*...............|
00000030  1a 00 00 00 00 00 00 00  6b 69 6e 6f 70 6f 69 73  |........kinopois|
00000040  6b 2e 72 75 00 ff fe 00  3b 43 52 45 41 54 4f 52  |k.ru....;CREATOR|
00000050  3a 20 67 64 2d 6a 70 65  67 20 76 31 2e 30 20 28  |: gd-jpeg v1.0 (|
00000060  75 73 69 6e 67 20 49 4a  47 20 4a 50 45 47 20 76  |using IJG JPEG v|
00000070  38 30 29 2c 20 71 75 61  6c 69 74 79 20 3d 20 39  |80), quality = 9|
00000080  31 0a ff db 00 43 00 03  02 02 03 02 02 03 03 02  |1....C..........|
00000090  03 03 03 03 03 04 07 05  04 04 04 04 09 06 07 05  |................|
000000a0  07 0a 09 0b 0b 0a 09 0a  0a 0c 0d 11 0e 0c 0c 10  |................|
000000b0  0c 0a 0a 0e 14 0f 10 11  12 13 13 13 0b 0e 14 16  |................|
...

## Source

[Go bufio package - reference](https://pkg.go.dev/bufio)

In this article we have worked with the bufio package in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).