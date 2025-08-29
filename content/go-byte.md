+++
title = "Go byte"
date = 2025-08-29T19:55:04.005+01:00
draft = false
description = "Learn how to work with bytes in Go. Includes examples of byte manipulation and operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go byte

last modified May 3, 2025

In this article we show how to work with bytes in Golang.

In Go, a byte is an unsigned 8-bit integer with a type alias of
uint8. Since it has a numerical range of 0-255, it is commonly used
to represent individual ASCII characters. byte values are
frequently utilized when working with raw binary data or handling textual data
at the character level.

For handling multibyte characters, Go provides the rune type, which
is an alias for int32. Unlike byte, which represents
single-byte values, a rune can store Unicode code points, making it
suitable for processing international text and complex character sets.

To facilitate byte-level manipulations, Go offers the bytes
package, which implements a collection of functions for efficient handling of
byte slices. The bytes package shares similarities with the
strings package but operates on byte slices rather than string
values. This distinction makes it particularly useful for tasks like modifying,
comparing, and searching raw binary data while minimizing unnecessary memory
allocations.

## Go byte example

In the next example, we work with simple bytes.

first.go
  

package main

import "fmt"

func main() {

    var a1 byte = 97
    var a2 byte = 98
    var a3 byte = 99

    fmt.Println(a1)
    fmt.Println(a2)
    fmt.Println(a3)

    fmt.Printf("%c\n", a1)
    fmt.Printf("%c\n", a2)
    fmt.Printf("%c\n", a3)
}

We have three bytes. 

var a1 byte = 97
var a2 byte = 98
var a3 byte = 99

A byte is defined with the byte data type.

fmt.Printf("%c\n", a1)
fmt.Printf("%c\n", a2)
fmt.Printf("%c\n", a3)

With the %c format verb, we print the character representation of 
the byte.

$ go run first.go 
97
98
99
a
b
c

We must explicitly set a variable to the byte type; otherwise, we
get different types.

types.go
  

package main

import (
     "fmt"
     "reflect"
)

func main() {

     var a byte = 97
     var b = 98
     c := 'c'

     fmt.Println(a)
     fmt.Println(b)
     fmt.Println(c)

     fmt.Println("-------------------------")

     fmt.Printf("%c\n", a)
     fmt.Printf("%c\n", b)
     fmt.Printf("%c\n", c)

     fmt.Println("-------------------------")

     fmt.Println(reflect.TypeOf(a))
     fmt.Println(reflect.TypeOf(b))
     fmt.Println(reflect.TypeOf(c))
}

In the code example, we have three variables.

var a byte = 97

The a variable has byte data type.

var b = 98

Because we have not set the data type explicitly, Go set a default
int type.

c := 'c'

Character literals are set to rune type (int32).

$ go run types.go 
97
98
99
-------------------------
a
b
c
-------------------------
uint8
int
int32

## Go string to bytes

In the following example, we convert strings to bytes.

str2bytes.go
  

package main

import (
     "fmt"
)

func main() {

     fmt.Println([]byte("falcon"))
     fmt.Println([]byte("čerešňa"))
}

We convert two strings to bytes with []byte() typecast.

$ go run str2bytes.go 
[102 97 108 99 111 110]
[196 141 101 114 101 197 161 197 136 97]

## Go bytes to string

In the following example, we convert bytes to strings.

bytes2str.go
  

package main

import "fmt"

func main() {

     data := []byte{102, 97, 108, 99, 111, 110}

     fmt.Println(data)
     fmt.Println(string(data))
}

We convert a slice of bytes to a string with the string function.

$ go run bytes2str.go 
[102 97 108 99 111 110]
falcon

## Go count bytes

We count bytes with the len function. To count runes, we use the 
utf8.RuneCountInString function.

counting.go
  

package main

import (
     "fmt"
     "unicode/utf8"
)

func main() {

     msg := "one 🐜"
     n1 := len(msg)
     n2 := utf8.RuneCountInString(msg)

     fmt.Println(n1)
     fmt.Println(n2)
}

We count the number of bytes and runes of the msg string.

$ go run counting.go 
8
5

There are five runes and eight characters. This means that we have one rune
which contains four bytes.

## Go byte read file

Many built-in I/O functions in Go return a slice of bytes.

words.txt
  

falcon
sky
cup
oak
water

We read this text file.

read_file.go
  

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

     fmt.Println(content)
     fmt.Println("-------------")
     fmt.Println(string(content))
}

The ioutil.ReadFile reads the specified file and returns its
contents as a slice of bytes.

$ go run read_file.go 
[102 97 108 99 111 110 10 115 107 121 10 99 117 112 10 111 97 107 10 119 97 116 101 114]
-------------
falcon
sky
cup
oak
water

## Go byte read binary file

In the following example, we read a binary file and output it in a hexadecimal
view.

read_binary.go
  

package main

import (
     "bufio"
     "encoding/hex"
     "fmt"
     "io"
     "log"
     "os"
)

func main() {

     f, err := os.Open("favicon.ico")

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

The hex.Dump function returns a string that contains a hex dump of
the given data. The format of the hex dump matches the output of hexdump
-C Unix command.

$ go run read_binary.go 
00000000  00 00 01 00 01 00 10 10  00 00 00 00 00 00 68 05  |..............h.|
00000010  00 00 16 00 00 00 28 00  00 00 10 00 00 00 20 00  |......(....... .|
00000020  00 00 01 00 08 00 00 00  00 00 00 01 00 00 00 00  |................|
00000030  00 00 00 00 00 00 00 01  00 00 00 00 00 00 00 00  |................|
00000040  00 00 ff ff ff 00 4d 45  3d 00 00 00 00 00 00 00  |......ME=.......|
00000050  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000060  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
...

## Go escaped bytes

Arbitrary character values can be encoded with backslash escapes and used in
string or rune literals. Go supports a common format in which a byte is
represented as \x followed by two hexadecimal values.

escaped_bytes.go
  

package main

import (
     "fmt"
)

func main() {

     fmt.Println("\xF0\x9F\x92\xBF")
     fmt.Println("\xF0\x9F\x8E\xB2")
     fmt.Println("\xF0\x9F\x90\xA8")
     fmt.Println("\xF0\x9F\x90\xA7")
     fmt.Println("\xF0\x9F\x90\xAB")
     fmt.Println("\xF0\x9F\x90\xAC")
}

In the code example we print six emoji characters. These emojis are are specified as 
escaped bytes.

$ go run escaped_bytes.go 
💿
🎲
🐨
🐧
🐫
🐬

## Go bytes functions

The bytes package contains functions for manipulation of byte 
slices.

byte_funs.go
  

package main

import (
     "bytes"
     "fmt"
)

func main() {

     data1 := []byte{102, 97, 108, 99, 111, 110} // falcon
     data2 := []byte{111, 110}                   // on

     if bytes.Contains(data1, data2) {
          fmt.Println("contains")
     } else {
          fmt.Println("does not contain")
     }

     if bytes.Equal([]byte("falcon"), []byte("owl")) {
          fmt.Println("equal")
     } else {
          fmt.Println("not equal")
     }

     data3 := []byte{111, 119, 108, 9, 99, 97, 116, 32, 32, 32, 32, 100, 111,
          103, 32, 112, 105, 103, 32, 32, 32, 32, 98, 101, 97, 114}

     fields := bytes.Fields(data3)
     fmt.Println(fields)

     for _, e := range fields {
          fmt.Printf("%s ", string(e))
     }

     fmt.Println()
}

In the code example, we use Contains, Equal, and
Fields functions.

if bytes.Contains(data1, data2) {
     fmt.Println("contains")
} else {
     fmt.Println("does not contain")
}

With Contains we check if data2 slice is a subslice 
of data1.

if bytes.Equal([]byte("falcon"), []byte("owl")) {
     fmt.Println("equal")
} else {
     fmt.Println("not equal")
}

With Equal we check if two slices are the same length and contain
the same bytes. 

fields := bytes.Fields(data3)

The Fields function splits a byte slice into subslices removing any
space characters, including newlines.

$ go run byte_funs.go 
contains
not equal
[[111 119 108] [99 97 116] [100 111 103] [112 105 103] [98 101 97 114]]
owl cat dog pig bear 

In the next example, we use another three functions.

byte_funs2.go
  

package main

import (
     "bytes"
     "fmt"
)

func main() {

     data := [][]byte{[]byte("an"), []byte("old"), []byte("wolf")}
     joined := bytes.Join(data, []byte(" "))

     fmt.Println(data)
     fmt.Println(joined)
     fmt.Println(string(joined))

     fmt.Println("--------------------------")

     data2 := []byte{102, 97, 108, 99, 111, 110, 32}
     data3 := bytes.Repeat(data2, 3)

     fmt.Println(data3)
     fmt.Println(string(data3))

     fmt.Println("--------------------------")

     data4 := []byte{32, 32, 102, 97, 108, 99, 111, 110, 32, 32, 32}
     data5 := bytes.Trim(data4, " ")

     fmt.Println(data5)
     fmt.Println(string(data5))
}

The example joins byte slices with Join, repeats a byte slice 
with Repeat, and trims byte slices of the specified byte with 
Trim.

$ go run byte_funs2.go 
[[97 110] [111 108 100] [119 111 108 102]]
[97 110 32 111 108 100 32 119 111 108 102]
an old wolf
--------------------------
[102 97 108 99 111 110 32 102 97 108 99 111 110 32 102 97 108 99 111 110 32]
falcon falcon falcon 
--------------------------
[102 97 108 99 111 110]
falcon

## Go bytes.Buffer

The bytes.Buffer is a variable-sized buffer of bytes with Read and
Write methods.

buffer.go
  

package main

import (
     "bytes"
     "fmt"
)

func main() {

     var buf bytes.Buffer

     buf.Write([]byte("a old"))
     buf.WriteByte(32)
     buf.WriteString("cactus")
     buf.WriteByte(32)
     buf.WriteByte(32)
     buf.WriteRune('🌵')

     fmt.Println(buf)
     fmt.Println(buf.String())
}

We build a bytes.Buffer with Write, WriteByte,
WriteString, WriteByte, and WriteRune
methods.

$ go run buffer.go 
{[97 32 111 108 100 32 99 97 99 116 117 115 32 32 240 159 140 181] 0 0}
a old cactus  🌵

## Source

[Go bytes package - reference](https://pkg.go.dev/bytes)

In this article we have worked with bytes in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).