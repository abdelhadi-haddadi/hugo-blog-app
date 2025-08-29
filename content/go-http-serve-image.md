+++
title = "Go HTTP serve image"
date = 2025-08-29T19:55:21.276+01:00
draft = false
description = "Learn how to serve images in Go. Includes examples of HTTP server and image handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go HTTP serve image

last modified April 11, 2024

In this article we show how to serve an image from a Golang server.

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

The net/http package provides HTTP client and server
implementations and is used to create GET and POST requests. 

## Go serve image example

In the first example, we simply send an image as a stream of bytes.

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

In the next example, we send the image as an attachment.

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
    w.Header().Set("Content-Disposition", `attachment;filename="sid.png"`)

    w.Write(buf)
}

To send the file as an attachment, we set the Content-Disposition
header. We choose the attachment option and provide the filename.

## Go serve image example II

In the next example, the image is send within an HTML document.

image.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;Sid&lt;/p&gt;
    
    &lt;img src="data/sid.png" alt="Sid the sloth"&gt;
&lt;/body&gt;
&lt;/html&gt;

The image is referenced from the img tag.

main.go
  

package main

import (
    "fmt"
    "net/http"
)

func main() {

    fs := http.FileServer(http.Dir("./data"))
    http.Handle("/data/", http.StripPrefix("/data/", fs))

    http.HandleFunc("/image", func(w http.ResponseWriter, r *http.Request) {

        http.ServeFile(w, r, "image.html")
    })

    fmt.Println("Server started at port 8080")
    http.ListenAndServe(":8080", nil)
}

We serve the image.html file for the /image path.

fs := http.FileServer(http.Dir("./data"))
http.Handle("/data/", http.StripPrefix("/data/", fs))

The file server serves static data from the data subdirectory. URL paths
starting with /data are directed to this subdirectory.

http.HandleFunc("/image", func(w http.ResponseWriter, r *http.Request) {

    http.ServeFile(w, r, "image.html")
})

The HTML file is served with http.ServeFile.

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have served images from a HTTP server in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).