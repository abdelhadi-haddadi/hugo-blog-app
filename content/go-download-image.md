+++
title = "Go download image"
date = 2025-08-29T19:55:10.644+01:00
draft = false
description = "Learn how to download images in Go. Includes examples of HTTP requests and file handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go download image

last modified April 11, 2024

In this article we show how to download an image file in Go.

To download an image, we use the net/http and req
packages.

The net/http package provides HTTP client and server
implementations and is used to create GET and POST requests.  The
req is a third-party HTTP client with many convenience functions.

## Go download image example

In the next example, we use the net/http package to download an 
image file.

main.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
)

func main() {

    fname := "favicon.ico"

    f, err := os.Create(fname)

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    url := "http://webcode.me/favicon.ico"
    res, err := http.Get(url)

    if err != nil {
        log.Fatal(err)
    }

    defer res.Body.Close()

    _, err = io.Copy(f, res.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("image downloaded")
}

We download a favicon.

f, err := os.Create(fname)

With os.Create, we create a file where we write the binary data.

url := "http://webcode.me/favicon.ico"
res, err := http.Get(url)

To fetch the image, we generate a GET request with http.Get.

_, err = io.Copy(f, res.Body)

We copy the downloaded data into the file from the body of the response using 
the io.Copy function.

The following is a slightly modified version of the example.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
    "path"
)

func main() {

    url := "http://webcode.me/favicon.ico"

    r, err := http.Get(url)

    if err != nil {
        log.Fatal(err)
    }

    defer r.Body.Close()

    fname := path.Base(url)
    f, err := os.Create(fname)

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    _, err = f.ReadFrom(r.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("image downloaded")
}

We use the ReadFrom function to write the downloaded data into the
newly created file. 

## Go download image with Req

The next example uses the Req package to download an image. 

maing.go
  

package main

import (
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    client := req.C()

    url := "http://webcode.me/favicon.ico"

    _, err := client.R().SetOutputFile("favicon.ico").Get(url)

    if err != nil {
        log.Fatal(err)
    }
}

Using the Req package, our code becomes shorter.

## Download image from a custom server

In the next example, we create a simple web server which sends an image as a
stream of bytes and a client that downloads that image.

main.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {

    handler := http.HandlerFunc(handleRequest)

    http.Handle("/image", handler)

    fmt.Println("Server started at port 8080")
    http.ListenAndServe(":8080", nil)
}

func handleRequest(w http.ResponseWriter, r *http.Request) {

    buf, err := ioutil.ReadFile("sid.png")

    if err != nil {

        log.Fatal(err)
    }

    w.Header().Set("Content-Type", "image/png")
    w.Write(buf)
}

The example creates a simple web server that sends an image to the client. The
image is located in the current working directory.

handler := http.HandlerFunc(handleRequest)

http.Handle("/image", handler)

We map a handler to the /image path.

func handleRequest(w http.ResponseWriter, r *http.Request) {
...

The handler function accepts two parameters: http.ResponseWriter
and http.Request.

buf, err := ioutil.ReadFile("sid.png")

We read the image into the buffer.

w.Header().Set("Content-Type", "image/png")

We set the header. The Content-Type content type is used for PNG
image.

w.Write(buf)

The image data is written to the response body with Write.

The following is the http client. 

main.go
  

package main

import (
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    client := req.C()

    url := "http://localhost:8080/image"

    _, err := client.R().SetOutputFile("sid.png").Get(url)

    if err != nil {
        log.Fatal(err)
    }
}

We use the Req package to get the image from the custom server.

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have showed how to download image files in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).