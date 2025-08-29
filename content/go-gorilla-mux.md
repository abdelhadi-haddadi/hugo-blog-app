+++
title = "Go Gorilla Mux"
date = 2025-08-29T19:55:18.961+01:00
draft = false
description = "Learn how to build web applications in Go using the Gorilla Mux router. Includes examples of routing and middleware."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Gorilla Mux

last modified April 11, 2024

In this article we show how to do request routing and dispatching in Golang with
Gorilla Mux.

## Gorilla Mux

Gorilla Mux is an HTTP request multiplexer. It is used for request routing and
dispatching. It is an extension of the standard ServeMux; it 
implements the http.Handler interface.

Gorilla Mux allows to do:

    - Query based, path based, domain based matching

    - Reverse URL generation

    - Variables with optional regular expressions

    - Subrouting

## Gorilla Mux NewRouter

A new router is created with the mux.NewRouter function.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    r.HandleFunc("/hello", func(resp http.ResponseWriter, _ *http.Request) {

        fmt.Fprint(resp, "Hello there!")
    })

    log.Println("Listening...")
    http.ListenAndServe(":8080", r)
}

The example returns a small text message for the /hello path.

r.HandleFunc("/hello", func(resp http.ResponseWriter, _ *http.Request) {

    fmt.Fprint(resp, "Hello there!")
})

The HandleFunc registers a new route with a matcher for the URL
path.

http.ListenAndServe(":8080", r)

We pass the router to the ListenAndServe function.

$ curl localhost:8080/hello
Hello there!

## Gorilla Mux Methods

The Methods function adds a matcher for HTTP methods. It accepts a
sequence of one or more methods to be matched.

main.go
  

package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    r.HandleFunc("/hello", HelloHandler).Methods("HEAD")

    log.Println("Listening...")
    http.ListenAndServe(":8080", r)
}

func HelloHandler(resp http.ResponseWriter, _ *http.Request) {

    resp.WriteHeader(http.StatusOK)
}

In the example, we send http.StatusOK for the HEAD
method. Other methods are not allowed.

$ curl -I localhost:8080/hello
HTTP/1.1 200 OK
Date: Thu, 21 Apr 2022 13:50:21 GMT

## Gorilla Mux query parameters

A *query string* is a part of the URL which can be used to add some data
to the request for the resource. It is often a sequence of key/value pairs. It
goes after the path and begins with the ? character.

main.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    r.HandleFunc("/hello", func(resp http.ResponseWriter, req *http.Request) {

        name := req.URL.Query().Get("name")

        if name == "" {
            name = "guest"
        }

        fmt.Fprintf(resp, "Hello %s!", name)
    })

    log.Println("Listening ...")
    http.ListenAndServe(":8080", r)
}

In the example, we send a name as a query string.

name := req.URL.Query().Get("name")

We get the name value from the request.

$ curl localhost:8080/hello?name=John%20Doe
Hello John Doe!

## Gorilla Mux path variables

Values can be send to the web application via query parameters or path
parameters. They are defined with the format {name} or
{name:pattern}. If a regular expression pattern is not defined, the
matched variable will be anything until the next slash.

Path variables are retrieved from the request with mux.Vars.

main.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    r.HandleFunc("/hello/{name}", func(resp http.ResponseWriter, req *http.Request) {

        vars := mux.Vars(req)
        name := vars["name"]

        fmt.Fprintf(resp, "Hello %s!", name)
    })

    log.Println("Listening ...")
    http.ListenAndServe(":8080", r)
}

In the example, we process a name variable from the URL path.

$ curl localhost:8080/hello/John%20Doe"  
Hello John Doe!

## Gorilla Mux JSON response

In the following example, we send a JSON response.

main.go
  

package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()
    r.HandleFunc("/now", NowHandler)

    log.Println("Listening ...")
    http.ListenAndServe(":8080", r)
}

func NowHandler(resp http.ResponseWriter, _ *http.Request) {

    now := time.Now()

    payload := make(map[string]string)
    payload["now"] = now.Format(time.ANSIC)

    resp.Header().Set("Content-Type", "application/json")
    resp.WriteHeader(http.StatusOK)

    json.NewEncoder(resp).Encode(payload)
}

The application determines the current datetime and sends it as JSON response.

r.HandleFunc("/now", NowHandler)

The /now path is mapped to the NowHandler function.

now := time.Now()

We get the current datetime with time.Now.

payload := make(map[string]string)
payload["now"] = now.Format(time.ANSIC)

We add the formatted datetime to a Go map.

resp.Header().Set("Content-Type", "application/json")
resp.WriteHeader(http.StatusOK)

We set the appropriate header of the response.

json.NewEncoder(resp).Encode(payload)

The encoded payloaded is sent back to the client.

$ curl localhost:8080/now
{"now":"Thu Apr 21 16:11:16 2022"}

## Gorilla Mux subroutes

Subrouting helps us organize our handlers into logical groups.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    s1 := r.PathPrefix("/path1").Subrouter()
    s1.HandleFunc("/", Handler1)

    s2 := r.PathPrefix("/path2").Subrouter()
    s2.HandleFunc("/", Handler2)

    log.Println("Listening ...")
    http.ListenAndServe(":8080", r)
}

func Handler1(resp http.ResponseWriter, _ *http.Request) {

    fmt.Fprint(resp, "Subroute 1")
}

func Handler2(resp http.ResponseWriter, _ *http.Request) {

    fmt.Fprint(resp, "Subroute 2")
}

The example creates two subroutes.

$ curl localhost:8080/path1/
Subroute 1
$ curl localhost:8080/path2/ 
Subroute 2

## Gorilla Mux static files

Static files are files that do not change; they are CSS files, plain HTML files,
JavaScript files and images.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;
        Home page
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is a plain HTML file without template directives.

main.go
  

package main

import (
    "log"
    "net/http"
    "time"

    "github.com/gorilla/mux"
)

func main() {

    r := mux.NewRouter()

    r.PathPrefix("/app/").Handler(http.StripPrefix("/app/", http.FileServer(http.Dir("./public"))))

    log.Println("Listening...")

    srv := &amp;http.Server{
        Handler: r,
        Addr:    "127.0.0.1:8000",
        WriteTimeout: 15 * time.Second,
        ReadTimeout:  15 * time.Second,
    }

    log.Fatal(srv.ListenAndServe())
}

In the example, we serve static files from the public subdirectory 
for the app URL path.

r.PathPrefix("/app/").Handler(http.StripPrefix("/app/", http.FileServer(http.Dir("./public"))))

The http.FileServer serves static data from the public
subdirectory. URL paths starting with /app/ are directed to this subdirectory. 

## Source

[Gorilla mux - Github page](https://github.com/gorilla/mux)

In this article we have showed how to do request routing and dispatching in
Go with Gorilla Mux.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).