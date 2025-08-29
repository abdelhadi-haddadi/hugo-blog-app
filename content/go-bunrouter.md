+++
title = "Go bunrouter"
date = 2025-08-29T19:55:03.999+01:00
draft = false
description = "Learn how to use BunRouter in Go. Includes examples of routing in web applications."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go bunrouter

last modified April 11, 2024

In this article we show how to create HTTP routes in Golang with bunrouter.

A route associates an HTTP verb (such as GET, POST, PUT, DELETE) and a URL path
to a handler function. A router is an object which creates routes; i.e. it 
maps an HTTP request to a handler.

The bunrouter is a fast and flexible HTTP router for Go. It supports 
middlewares, grouping routes, and flexible error handling. It is comptatible 
with the built-in net/http API.

## Go bunrouter simple example

In the first example, we set up a simple server with bunrouter.

main.go
  

package main

import (
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

func main() {

    router := bunrouter.New()

    router.GET("/", func(w http.ResponseWriter, req bunrouter.Request) error {

        w.Write([]byte("index"))
        return nil
    })

    log.Println("listening on http://localhost:8080")
    log.Println(http.ListenAndServe(":8080", router))
}

THe server responses with a short message to a GET request.

import (
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

We import the github.com/uptrace/bunrouter package.

router := bunrouter.New()

A new bunrouter is created.

router.GET("/", func(w http.ResponseWriter, req bunrouter.Request) error {

    w.Write([]byte("index"))
    return nil
})

We create a GET route. The anonymous handler function responds with "index"
message.

## Go bunrouter notfound handler

In the next example, we set up the notfound handler. It is used to handle
requests that do not have a route. 

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

func main() {

    router := bunrouter.New(
        bunrouter.WithNotFoundHandler(notFoundHandler),
    )

    router.GET("/hello", func(w http.ResponseWriter, req bunrouter.Request) error {

        fmt.Fprintf(w, "hello")
        return nil
    })

    log.Println("listening on http://localhost:8080")
    log.Println(http.ListenAndServe(":8080", router))
}

func notFoundHandler(w http.ResponseWriter, req bunrouter.Request) error {

    w.WriteHeader(http.StatusNotFound)

    fmt.Fprintf(w, "404 - failed to find %s", req.URL.Path)
    return nil
}

The code is delegated to the notFoundHandler function.

router := bunrouter.New(
    bunrouter.WithNotFoundHandler(notFoundHandler),
)

The notfound handler is registered using WithNotFoundHandler.

func notFoundHandler(w http.ResponseWriter, req bunrouter.Request) error {

    w.WriteHeader(http.StatusNotFound)

    fmt.Fprintf(w, "404 - failed to find %s", req.URL.Path)
    return nil
}

In the notFoundHandler, we set the status code and the error
message.

$ curl localhost:8080/about
404 - failed to find /about

## Method not allowed

The HTTP 405 Method Not Allowed response status code indicates that the server
knows the request method, but the target resource doesn't support this method.

For instance, we have a route that responds to a GET request only. If we send 
a POST request, than the server can respond with 405 Method Not Allowed message.
By default, the bunrouter does nothing in such a case.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

func main() {

    router := bunrouter.New(bunrouter.WithMethodNotAllowedHandler(methodNotAllowedHandler))

    router.GET("/", func(w http.ResponseWriter, req bunrouter.Request) error {

        fmt.Fprintln(w, "index")

        return nil
    })

    log.Println("listening on http://localhost:8080")
    log.Println(http.ListenAndServe(":8080", router))
}

func methodNotAllowedHandler(w http.ResponseWriter, req bunrouter.Request) error {

    w.WriteHeader(http.StatusMethodNotAllowed)

    fmt.Fprintln(w, "405 - method not allowed")
    return nil
}

In the example, we set up the method not allowed handler with
bunrouter.WithMethodNotAllowedHandler function.

$  curl localhost:8080/
index
$ curl localhost:8080/ -d "name=Peter"
405 - method not allowed

## Go bunrouter POST request

The HTTP POST method sends data to the server. It is often used when uploading a
file or when submitting a completed web form. 

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

func main() {

    router := bunrouter.New()

    router.GET("/", func(w http.ResponseWriter, req bunrouter.Request) error {

        fmt.Fprintln(w, "index")

        return nil
    })

    router.POST("/", func(w http.ResponseWriter, req bunrouter.Request) error {

        err := req.ParseForm()

        if err != nil {
            http.Error(w, fmt.Sprint(err), http.StatusUnprocessableEntity)
        }

        fmt.Fprintln(w, req.Form)

        return nil
    })

    log.Println("listening on http://localhost:8080")
    log.Println(http.ListenAndServe(":8080", router))
}

The example processes a POST request.

err := req.ParseForm()

The ParseForm function parses the body of the request and populates 
the Req.Form with any data.

if err != nil {
    http.Error(w, fmt.Sprint(err), http.StatusUnprocessableEntity)
}

In case of an error, we send an error message using the http.Error
function.

## Router groups

The routing functionality may be organized into groups. 

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/uptrace/bunrouter"
)

func main() {

    router := bunrouter.New()

    router.WithGroup("/api/", func(group *bunrouter.Group) {

        group.GET("/index", index)
        group.GET("/hello", hello)

    })

    router.WithGroup("/api2/", func(group *bunrouter.Group) {

        group.GET("/index", index2)
        group.GET("/hello", hello2)

    })

    log.Println("listening on http://localhost:8080")
    log.Println(http.ListenAndServe(":8080", router))
}

func index(w http.ResponseWriter, req bunrouter.Request) error {

    fmt.Fprintln(w, "index")
    return nil
}

func hello(w http.ResponseWriter, req bunrouter.Request) error {

    fmt.Fprintln(w, "hello")
    return nil
}

func index2(w http.ResponseWriter, req bunrouter.Request) error {

    fmt.Fprintln(w, "index2")
    return nil
}

func hello2(w http.ResponseWriter, req bunrouter.Request) error {

    fmt.Fprintln(w, "hello2")
    return nil
}

In the example, we have two groups: /api/ and /api2/.

router.WithGroup("/api/", func(group *bunrouter.Group) {

    group.GET("/index", index)
    group.GET("/hello", hello)

})

A new group is created with WithGroup.

$ curl localhost:8080/api/index
index
$ curl localhost:8080/api/hello
hello
$ curl localhost:8080/api2/hello
hello2
$ curl localhost:8080/api2/index
index2

## Source

[Go bunrouter - Github page](https://github.com/uptrace/bunrouter)

In this article we have worked with the bunrouter. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).