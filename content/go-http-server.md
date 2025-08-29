+++
title = "Go HTTP server"
date = 2025-08-29T19:55:22.425+01:00
draft = false
description = "Learn how to build HTTP servers in Go. Includes examples of routing and handling requests."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go HTTP server

last modified April 11, 2024

In this article we show how to create simple HTTP servers in Golang.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application
protocol for distributed, collaborative, hypermedia information systems.
HTTP protocol is the foundation of data communication for the World Wide Web.

## Go http

In Go, we use the http package to create GET and POST requests.
The package provides HTTP client and server implementations.

## Go http types

A client sends a request to a server to receive a resource.

type Request struct

A Request represents an HTTP request received by a server, sent by
a client.

type Response struct

Response represents the response from an HTTP request.

type ResponseWriter interface

A ResponseWriter interface is used by an HTTP handler to construct
an HTTP response.

type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}

A Handler responds to an HTTP request. The ServeHTTP
writes reply headers and data to the ResponseWriter and then
returns.

type HandlerFunc func(ResponseWriter, *Request)

The HandlerFunc type is an adapter that allows the use of ordinary
functions as HTTP handlers.

## Go HTTP server Handle

The Handle function registers a handler for the given URL. The goal
of the handler is to create a reply to the client's request.

main.go
  

package main

import (
    "fmt"
    "net/http"
)

type CounterHandler struct {
    counter int
}

func (ct *CounterHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Println(ct.counter)
    ct.counter++
    fmt.Fprintln(w, "Counter:", ct.counter)
}

func main() {

    th := &amp;CounterHandler{counter: 0}
    http.Handle("/count", th)
    http.ListenAndServe(":8080", nil)
}

Each time the URL is visited, a counter is incremented and the value is
returned.

type CounterHandler struct {
    counter int
}

func (ct *CounterHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Println(ct.counter)
    ct.counter++
    fmt.Fprintln(w, "Counter:", ct.counter)
}

CounterHandler contains the counter variable and the 
implementation of the ServeHTTP function. The function increments 
the counter and writes a message to the http.ResponseWriter.

th := &amp;CounterHandler{counter: 0}
http.Handle("/count", th)

CounterHandler is created and registered with Handle.

$ curl localhost:8080/count
Counter: 1
$ curl localhost:8080/count
Counter: 2
$ curl localhost:8080/count
Counter: 3
$ curl localhost:8080/count
Counter: 4

## Go HTTP server HandleFunc

With HandleFunc function, we register a handler function for the
given URL pattern. HandleFunc functions are convenient ways to
create handlers.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", HelloHandler)

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func HelloHandler(w http.ResponseWriter, _ *http.Request) {

    fmt.Fprintf(w, "Hello, there\n")
}

The example creates a simple HTTP server listening on port 8080. Upon sending
a request, the server responds with a "Hello, there" message.

http.HandleFunc("/", HelloHandler)

We map the / pattern to the HelloHandler with
HandleFunc.

log.Fatal(http.ListenAndServe(":8080", nil))

The ListenAndServe listens on the TCP network address and then
handles requests on incoming connections.

func HelloHandler(w http.ResponseWriter, _ *http.Request) {
    fmt.Fprintf(w, "Hello, there\n")
}

The handler responds to an HTTP request. It takes two parameters: the
response writer and the request object.

$ go run main.go

We start the server.

$ curl localhost:8080/
Hello, there

With the curl tool, we generate a request.

## Go HTTP status code

The HTTP response status codes indicate whether a specific HTTP request has been
successfully completed.

The responses are grouped in five classes:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

The status code for the response is written with the WriteHeader
function.

main.go
  

package main

import (
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/status", func(w http.ResponseWriter, _ *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

We send the http.StatusOK for the /status path.

$ curl -I localhost:8080/status
HTTP/1.1 200 OK
Date: Sat, 23 Apr 2022 12:59:52 GMT

## Go HTTP Server not found handler

A 404 error code is returned to the client if the server resource cannot be
found.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/about", func(w http.ResponseWriter, _ *http.Request) {
        fmt.Fprintln(w, "about page")
    })

    http.HandleFunc("/news", func(w http.ResponseWriter, _ *http.Request) {
        fmt.Fprintln(w, "news page")
    })

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

        if r.URL.Path != "/" {
            w.WriteHeader(404)
            w.Write([]byte("404 - not found\n"))
            return
        }

        fmt.Fprintln(w, "home page")
    })

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

In the example, we have three endpoints. For anything other than these three
endpoints, we return a 404 error message.

$ curl localhost:8080/about
about page
$ curl localhost:8080/
home page
$ curl localhost:8080/contact
404 - not found

## Go HTTP server get header

HTTP headers let the client and the server pass additional information with an
HTTP request or response. An HTTP header is a name/value pair, separated by
a colon character.

The *User-Agent* request header is a string that lets servers and network
peers identify the application, operating system, vendor, and/or version of the
requesting user agent.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/ua", func(w http.ResponseWriter, r *http.Request) {

        ua := r.Header.Get("User-Agent")

        fmt.Fprintf(w, "User agent: %s\n", ua)
    })

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

From the Header field, we get the User-Agent
header and return it back to the caller.

client.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("http://localhost:8080/ua")

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

The example creates a simple client in Go, which generates a GET request to
the /ua path.

## Go URL path parameter

We can send data to the server in the URL.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", HelloServer)
    fmt.Println("Server started at port 8080")

    log.Fatal(http.ListenAndServe(":8080", nil))
}

func HelloServer(w http.ResponseWriter, r *http.Request) {

    fmt.Fprintf(w, "Hello, %s!\n", r.URL.Path[1:])
}

In the code example, we get the URL path value with r.URL.Path[1:]
and build a message with the data.

$ curl localhost:8080/John
Hello, John!

We send the name inside the URL path; the server responds with a greeting.

## Go query parameter

A query string is a part of a uniform resource locator (URL) that assigns values
to specified parameters.

A generic URL has the following form:

scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

The query parameters start with the ? character. Multiple query
parameters are separated with &amp; character.

https://example.com/path/page?name=John&amp;occupation=teacher

This is an example of a URL with two query parameters.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", handler)

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {

    keys, ok := r.URL.Query()["name"]

    name := "guest"

    if ok {

        name = keys[0]
    }

    fmt.Fprintf(w, "Hello %s!\n", name)
}

In the code example, we accept a name parameter. We get the parameter
with r.URL.Query()["name"].

$ curl localhost:8080/?name=Peter
Hello Peter!

We send the name as a query parameter; the server responds with a message.

## Go file server 

With http.FileServer, we send files to the client.

public/about.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;About page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;
        About page
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the about.html page.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;
        Home page
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page.

main.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "net/http"
)

func main() {

    fileServer := http.FileServer(http.Dir("./public"))
    http.Handle("/", fileServer)

    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        io.WriteString(w, "Hello there!\n")
    })

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

In the code example, we have a file server and a simple hello handler.

fileServer := http.FileServer(http.Dir("./public"))
http.Handle("/", fileServer)

A file server is registered with Handle; it serves files from
the public directory.

$ curl localhost:8080
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;
        Home page
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;
$ curl localhost:8080/about.html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;About page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;
        About page
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

We request the home page and the about page.

## Go process GET/POST request

In the following example, the servers processes the GET and the POST requests
from a client.

**Note:** In production applications, handling forms with POST
requests requires additional security measures, such as CSRF protection.

form.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Form&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;form method="POST" action="/"&gt;
        &lt;div&gt;
            &lt;label&gt;Name:&lt;/label&gt;&lt;input name="name" type="text"&gt;
        &lt;/div&gt;
        &lt;div&gt;
            &lt;label&gt;Occupation:&lt;/label&gt;&lt;input name="occupation" type="text"&gt;
        &lt;/div&gt;
        &lt;button type="submit" value="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;

&lt;/body&gt;
&lt;/html&gt;

The HTML page presents a simple form.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func process(w http.ResponseWriter, r *http.Request) {

    if r.URL.Path != "/" {
        http.Error(w, "404 not found.", http.StatusNotFound)
        return
    }

    switch r.Method {
    case "GET":

        http.ServeFile(w, r, "form.html")
    case "POST":

        if err := r.ParseForm(); err != nil {
            fmt.Fprintf(w, "ParseForm() err: %v", err)
            return
        }

        name := r.FormValue("name")
        occupation := r.FormValue("occupation")

        fmt.Fprintf(w, "%s is a %s\n", name, occupation)

    default:
        fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
    }
}

func main() {

    http.HandleFunc("/", process)

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

For a GET request, we send a web page with a form. For a POST request, we
process the data from the form.

case "GET":

    http.ServeFile(w, r, "form.html")

If the request is a GET request, we send the form.html to the
client.

case "POST":

    if err := r.ParseForm(); err != nil {
        fmt.Fprintf(w, "ParseForm() err: %v", err)
        return
    }

In case of a POST request, we call the ParseForm function; it
parses the raw query from the URL and updates r.Form.

name := r.FormValue("name")
occupation := r.FormValue("occupation")

fmt.Fprintf(w, "%s is a %s\n", name, occupation)

We get the form values with FormValue and build a message.

## Go HTTP serve image

In the following example, we serve an image.

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

In the code example, we create a simple web server that sends an image to the
client. The image is located in the current working directory.

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

## Go HTTP server template

Go has a built-in template package for generating dynamic HTML content.

layout.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Users&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;table&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Occupation&lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
            {{ range .Users}}
            &lt;tr&gt;
                &lt;td&gt;{{.Name}}&lt;/td&gt;
                &lt;td&gt;{{.Occupation}}&lt;/td&gt;
            &lt;/tr&gt;
            {{ end }}
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;

The output is an HTML file. The data is inserted into HTML table.

main.go
  

package main

import (
    "html/template"
    "log"
    "net/http"
)

type User struct {
    Name       string
    Occupation string
}

type Data struct {
    Users []User
}

func main() {

    tmp := template.Must(template.ParseFiles("layout.html"))

    http.HandleFunc("/users", func(w http.ResponseWriter, _ *http.Request) {

        data := Data{
            Users: []User{
                {Name: "John Doe", Occupation: "gardener"},
                {Name: "Roger Roe", Occupation: "driver"},
                {Name: "Peter Smith", Occupation: "teacher"},
            },
        }
        tmp.Execute(w, data)
    })

    log.Println("Listening...")
    http.ListenAndServe(":8080", nil)
}

The web server returns an HTML page with a table of users for the
/users URL path.

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have created simple HTTP servers in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).