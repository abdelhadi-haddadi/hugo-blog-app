+++
title = "Go Base64"
date = 2025-08-29T19:55:00.661+01:00
draft = false
description = "Learn how to encode and decode Base64 in Go. Includes examples of encoding and decoding strings."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Base64

last modified April 11, 2024

In this artile we show how to encode and decode binary data to and from Base64
in Golang.

Encoding is the process of converting data from one form to another. Decoding is
the reverse process.

Base64 encoding schemes are commonly used when we need to store and transfer
binary data over media that are designed to deal with text. For instance,
Base64 encoding is used in email attachments.

In Go, we use the encoding/base64 package for base64 encoding and 
decoding. It implements the base encoding specified by RFC 4648. 

The following is the Base 64 Alphabet.

Value Encoding  Value Encoding  Value Encoding  Value Encoding
0 A                17 R            34 i            51 z
1 B                18 S            35 j            52 0
2 C                19 T            36 k            53 1
3 D                20 U            37 l            54 2
4 E                21 V            38 m            55 3
5 F                22 W            39 n            56 4
6 G                23 X            40 o            57 5
7 H                24 Y            41 p            58 6
8 I                25 Z            42 q            59 7
9 J                26 a            43 r            60 8
10 K               27 b            44 s            61 9
11 L               28 c            45 t            62 +
12 M               29 d            46 u            63 /
13 N               30 e            47 v
14 O               31 f            48 w         (pad) =
15 P               32 g            49 x
16 Q               33 h            50 y

## Go base64.StdEncoding.Encode

The base64.StdEncoding.Encode function encodes the source slice of 
bytes to the destination slice of bytes.

func (*base64.Encoding).Encode(dst []byte, src []byte)

This is the syntax of the function. The destination is the first parameter, the 
source is the second.

main.go
  

package main

import (
    "encoding/base64"
    "fmt"
)

func main() {

    msg := "one 🐘 and three 🐋"
    fmt.Println(msg)

    data := make([]byte, base64.StdEncoding.EncodedLen(len(msg)))
    base64.StdEncoding.Encode(data, []byte(msg))

    fmt.Println(data)
    encoded := string(data)
    fmt.Println(encoded)
}

The program encodes a string to Base64 encoding

msg := "one 🐘 and three 🐋"

We have a string with two emojis.

data := make([]byte, base64.StdEncoding.EncodedLen(len(msg)))

With base64.StdEncoding.EncodedLen function returns the length in
bytes of the base64 encoding of an input buffer.

base64.StdEncoding.Encode(data, []byte(msg))

We encode the data with base64.StdEncoding.Encode.

$ go run main.go
one 🐘 and three 🐋
[98 50 53 108 73 80 67 102 107 74 103 103 89 87 53 ... 115 61]
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=

## Go base64.StdEncoding.Decode

The base64.StdEncoding.Decode function decodes the source slice of 
bytes to the destination slice of bytes.

main.go
  

package main

import (
    "encoding/base64"
    "fmt"
    "log"
)

func main() {

    encoded := "b25lIPCfkJggYW5kIHRocmVlIPCfkIs="
    fmt.Println(encoded)

    data := make([]byte, base64.StdEncoding.DecodedLen(len(encoded)))
    n, err := base64.StdEncoding.Decode(data, []byte(encoded))

    fmt.Println(data)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(data[:n]))
}

The program decodes a Base64 encoded string.

encoded := "b25lIPCfkJggYW5kIHRocmVlIPCfkIs="

This is the encoded string.

data := make([]byte, base64.StdEncoding.DecodedLen(len(encoded)))

We create a destination slice of bytes for a buffer.

n, err := base64.StdEncoding.Decode(data, []byte(encoded))

The data is decoded with base64.StdEncoding.Decode.

$ go run main.go
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=
[111 110 101 32 240 159 144 152 32 97 110 100 ... 240 159 144 139 0]
one 🐘 and three 🐋

## Go Base64 encode/decode string

The base64.StdEncoding.EncodeToString function returns the base64
encoding of a string. The base64.StdEncoding.DecodeString returns
the bytes represented by the Base64 encoded string.

main.go
  

package main

import (
    "encoding/base64"
    "fmt"
    "log"
)

func main() {

    msg := "one 🐘 and three 🐋"

    fmt.Println(msg)

    str := base64.StdEncoding.EncodeToString([]byte(msg))
    fmt.Println(str)

    data, err := base64.StdEncoding.DecodeString(str)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(data)
    fmt.Println(string(data))
}

The program Base64 encodes and decodes a string.

$ go run main.go
one 🐘 and three 🐋
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=
[111 110 101 32 240 159 144 152 32 ... 32 240 159 144 139]
one 🐘 and three 🐋

## Source

[Go encoding/base64 package - reference](https://pkg.go.dev/encoding/base64)

In this article have worked with Base64 encoding in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).