+++
title = "Go http client"
date = 2025-08-29T19:55:21.284+01:00
draft = false
description = "Learn how to make HTTP requests in Go. Includes examples of GET, POST, and handling responses."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go http client

last modified April 11, 2024

In this article we show how to create HTTP requests with net/http in
Golang. An http client sends HTTP requests and receives HTTP responses from a
resource identified by an URL. 

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

## Go net/http

The net/http package contains tool to create HTTP clients and
servers. HTTP requests can be easily created with http.Get, 
http.Post, http.PostForm and http.Head 
functions.

To set HTTP settings, such as headers or redirect policy, we create a client in 
the following way: 

client := &amp;http.Client{
    CheckRedirect: redirectPolicyFunc,
}

resp, err := client.Get("http://example.com")

The response body must be closed at the end:

defer resp.Body.Close()

## Go http client status code

HTTP response status codes indicate whether a specific HTTP request has been
successfully completed. The responses have five groups:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

status.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("http://webcode.me")

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(resp.Status)
    fmt.Println(resp.StatusCode)
}

The example creates a GET request to a small website. We get the status code of
the request. 

fmt.Println(resp.Status)
fmt.Println(resp.StatusCode)

The Status gives the status as a string and the
StatusCode as a number.

## Go http client GET request

The following example creates a simple GET request in Go.

get_req.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

We create a GET request to the webcode.me webpage.

resp, err := http.Get("http://webcode.me")

A get request is issued with the Get function.

if err != nil {
    log.Fatal(err)
}

We check for the error.

defer resp.Body.Close()

The client must close the response body when finished.

body, err := ioutil.ReadAll(resp.Body)

We read the content of the body with ReadAll.

fmt.Println(string(body))

We print the received data to the console.

$ go run get_req.go
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="format.css"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
...

## Go http client HEAD request

The HTTP HEAD method requests the headers that are returned if the specified
resource would be requested with an HTTP GET method. 

head_req.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Head("http://webcode.me")

    if err != nil {

        log.Fatal(err)
    }

    for k, v := range resp.Header {

        fmt.Printf("%s %s\n", k, v)
    }
}

The example issues a HEAD request with http.Head and prints all 
the data of the response header.

$ go run head_req.go
Content-Length [394]
Last-Modified [Sun, 23 Jan 2022 10:39:25 GMT]
Connection [keep-alive]
Etag ["61ed305d-18a"]
Accept-Ranges [bytes]
Server [nginx/1.6.2]
Date [Mon, 14 Feb 2022 13:50:22 GMT]
Content-Type [text/html]

## User-Agent header

The User-Agent request header is a string that lets servers and
network peers identify the application, operating system, vendor, and/or version
of the requesting user agent.

user_agent.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "time"
)

func main() {

    c := http.Client{Timeout: time.Duration(3) * time.Second}

    req, err := http.NewRequest("GET", "http://webcode.me/ua.php", nil)

    if err != nil {
        log.Fatal(err)
    }

    req.Header.Add("User-Agent", "Go program")
    resp, err := c.Do(req)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

The example sets a User-Agent header for its GET request. The requested resource
simply returns the client's User-Agent string.

c := http.Client{Timeout: time.Duration(3) * time.Second}

We create the http client with a 3 s timeout.

req, err := http.NewRequest("GET", "http://webcode.me/ua.php", nil)

A new request is created with http.NewRequest.

req.Header.Add("User-Agent", "Go program") 

We add the User-Agent header to the request.

$ go run user_agent.go 
Go program

## Go http.PostForm

The HTTP POST method sends data to the server. 

The http.PostForm issues a POST to the specified URL, with data's
keys and values URL-encoded as the request body. The Content-Type
header is set to application/x-www-form-urlencoded.

post_form.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "net/url"
)

func main() {

    resp, err := http.PostForm("https://httpbin.org/post",
        url.Values{"name": {"John Doe"}, "message": {"Hey!"}})

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

In the example, we send a POST request to https://httpbin.org/post website,
which is an online testing service for developers. 

$ go run post_form.go 
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "message": "Hey!", 
    "name": "John Doe"
  }, 
  "headers": {
    "Accept-Encoding": "gzip", 
    "Content-Length": "28", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "Go-http-client/2.0", 
    "X-Amzn-Trace-Id": "Root=1-620a63eb-5b49f82c137a95e06bad94e3"
  }, 
  "json": null, 
  "origin": "188.167.250.179", 
  "url": "https://httpbin.org/post"
}

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have created GET and POST requests in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).