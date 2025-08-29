+++
title = "Go Req"
date = 2025-08-29T19:55:50.404+01:00
draft = false
description = "Learn how to make HTTP requests in Go. Includes examples of GET and POST requests."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Req

last modified April 11, 2024

In this article we show how to create HTTP requests with Req http client. An http
client sends HTTP requests and receives HTTP responses from a resource
identified by an URL.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

## Req

Req is a third-party HTTP client with plenty of features. It has many
convenience functions for easy configuring, debugging and testing.

## Response status code

HTTP response status codes indicate whether a specific HTTP request has been
successfully completed. There are five groups available:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.Get("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res.Status)
    fmt.Println(res.StatusCode)
}

The example creates a GET request to a small website. We get the status code of
the request. 

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

We import the req package.

res, err := req.Get("http://webcode.me")

We generate a GET request with Get.

fmt.Println(res.Status)
fmt.Println(res.StatusCode)

The Status gives the status as a string and the
StatusCode as a number.

## Go Req DevMode

With DevMode function, we enable the development mode. In this mode 
we the HTTP commands, HTTP headers and the response is automatically printed 
to the console.

main.go
  

package main

import (
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    req.DevMode()

    _, err := req.Get("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }
}

We create a simple GET request in the development mode.

$ go run main.go
2022/05/31 12:39:14.685055 DEBUG [req] HTTP/1.1 GET http://webcode.me
GET / HTTP/1.1
Host: webcode.me
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...
Accept-Encoding: gzip

HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 31 May 2022 10:39:14 GMT
Content-Type: text/html
...

## Go Req GET request

The following example creates a simple GET request in Req.

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.Get("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res)

    bytes, err := res.ToBytes()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(bytes))
}

We create a GET request to the webcode.me.

res, err := req.Get("http://webcode.me")

A get request is issued with the Get function.

if err != nil {
    log.Fatal(err)
}

We check for the error.

fmt.Println(res)

We print the response. 

bytes, err := res.ToBytes()
...
fmt.Println(string(bytes))

Alternatively, we can get the bytes and transform them into string.

## Go Req HEAD request

The HTTP HEAD method requests the headers that are returned if the specified
resource would be requested with an HTTP GET method. 

head_req.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.Head("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }

    for k, v := range res.Header {
        fmt.Printf("%s %s\n", k, v)
    }
}

The example issues a HEAD request with Head and prints all 
key/value pairs from the response header.

$ go run main.go
Connection [keep-alive]
Etag ["61ed305d-18a"]
Content-Type [text/html]
Content-Length [394]
Last-Modified [Sun, 23 Jan 2022 10:39:25 GMT]
Server [nginx/1.6.2]
Date [Tue, 31 May 2022 10:50:54 GMT]
Accept-Ranges [bytes]

## Go Req User-Agent

The User-Agent request header is a string that lets servers and
network peers identify the application, operating system, vendor, and/or version
of the requesting user agent.

user_agent.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.C().SetUserAgent("Go program").
        R().Get("http://webcode.me/ua.php")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res)
}

The example sets a User-Agent header with SetUserAgent. The
requested resource simply returns the client's User-Agent string.

res, err := req.C().SetUserAgent("Go program").
    R().Get("http://webcode.me/ua.php")

The C is a helper function to create a client while the
R is a helper function to create a request.

$ go run main.go 
Go program

## Query parameters

Query parameters are the part of a uniform resource locator (URL) which assigns
values to specified parameters. This is one way of sending data to the
destination server.

http://example.com/api/users?name=John%20Doe&amp;occupation=gardener

The query parameters are specified after the ? character. Multiple fields are
separated with the &amp;. Special characters, such as spaces, are encoded. In
the above string, the space is encoded with the %20
value.

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.C().R().Get("http://localhost:8080/hello?name=Peter")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res)
}

In the example, we add a query paramter (name=Peter) to the request
URL. Alternatively, we could also use the request's SetQueryParam
function.

In order to test the example, we create a simple server with the Echo framework.

main.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/labstack/echo/v4"
)

func main() {

    e := echo.New()

    e.GET("/hello/:name/", func(c echo.Context) error {

        name := c.Param("name")
        msg := fmt.Sprintf("Hello %s!", name)
        return c.String(http.StatusOK, msg)
    })

    e.Logger.Fatal(e.Start(":8080"))
}

The server processes the request, retrieves the query parameter with
Param and returns a message back to the client.

## Path parameters

Values can be send to the server via query parameters or path parameters. The
path parameter is specified directly inside the URL path.

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    res, err := req.C().R().SetPathParam("name", "Peter").
        Get("http://localhost:8080/hello/{name}/")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res)
}

We set the path parameter with SetPathParam.

The following server example processes a request with a path variable.

main.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/labstack/echo/v4"
)

func main() {

    e := echo.New()

    e.GET("/hello/:name/", func(c echo.Context) error {

        name := c.Param("name")
        msg := fmt.Sprintf("Hello %s!", name)
        return c.String(http.StatusOK, msg)
    })

    e.Logger.Fatal(e.Start(":8080"))
}

In the server application, we designate a path variable with a colon character.
We get the variable with Param, build a message and send it to the 
client.

## Download file

The following example downloads a binary file.

main.go
  

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

The SetOutputFile function sets the file that response body will be
downloaded to.

## Upload file

The next example uploads a binary file.

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/imroc/req/v3"
)

func main() {

    client := req.C()

    res, err := client.R().
        SetFile("file", "sid.png").
        Post("http://localhost:8080/upload")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(res.Status)
}

The SetFile function sets up a multipart form from file path to
upload, which read file from filePath automatically to upload.

We create a server to process the request.

main.go
  

package main

import (
    "io"
    "net/http"
    "os"

    "github.com/labstack/echo/v4"
)

func upload(c echo.Context) error {

    file, err := c.FormFile("file")

    if err != nil {
        return err
    }

    src, err := file.Open()

    if err != nil {
        return err
    }

    defer src.Close()

    dst, err := os.Create(file.Filename)

    if err != nil {
        return err
    }

    defer dst.Close()

    if _, err = io.Copy(dst, src); err != nil {
        return err
    }

    return c.HTML(http.StatusOK, "File uploaded")
}

func main() {

    e := echo.New()

    e.POST("/upload", upload)

    e.Logger.Fatal(e.Start(":8080"))
}

The server reads the binary data from the request and writes it to the
filesystem.

## Source

[Go req - Github page](https://github.com/imroc/req)

In this article we have worked with the Req HTTP client.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).