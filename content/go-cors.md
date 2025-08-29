+++
title = "Go CORS"
date = 2025-08-29T19:55:06.203+01:00
draft = false
description = "Learn how to handle CORS in Go. Includes examples of cross-origin resource sharing."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go CORS

last modified April 11, 2024

In this article we define CORS and show how to work with CORS in Golang.

## Same-origin policy

Browsers enforce the *same-origin policy* which permits JS scripts in a
web page to access data in other web pages only if both web pages have the same
origin. An origin is defined as a combination of URL scheme, host
name, and port number. The policy helps isolate potentially malicious documents,
reducing possible attack vectors.

## CORS

Cross-Origin Resource Sharing (CORS) is an HTTP-header based process that
defines which origins from which a browser is permitted to load resources.

CORS relaxes the same-origin policy via the usage of HTTP CORS headers.

Request headers:

    - Origin - indicates the server the origin of the request

    - Access-Control-Request-Method - indicates the server which HTTP methods the request implements

    - Access-Control-Request-Headers - indicates the server which headers the request includes

Response headers:

    - Access-Control-Allow-Origin - the origins that the server allows

    - Access-Control-Allow-Methods - comma-separated list of methods that the server allows

    - Access-Control-Allow-Headers - a comma-separated list of headers that the server allows
 
    - Access-Control-Expose-Headers - a comma-separated list of headers that clients are allowed to access from a response

    - Access-Control-Max-Age -  tells the browser how long (in seconds) to cache the response to the preflight request

    - Access-Control-Allow-Credentials

## Go CORS simple example

In the following example, we enable CORS in a Go server application.    

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;script&gt;
        async function doRequest() {
            let url = 'http://localhost:8080/hello';
            let res = await fetch(url);

            if (res.ok) {

                let text = await res.text();

                return text;
            } else {
                return `HTTP error: ${res.status}`;
            }
        }

        doRequest().then(data =&gt; {
            document.getElementById("output").innerText = data;
        });
    &lt;/script&gt;

    &lt;div id="output"&gt;

    &lt;/div&gt;

&lt;/body&gt;

&lt;/html&gt;

In the HTML web page, we use the JS Fetch API to create a GET request. The
script reads the response and sets it into the output div element. To try the
example, load this webpage via a web server such as nginx or use a liveserver 
VS Code extension.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/hello", HelloHandler)

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func HelloHandler(w http.ResponseWriter, _ *http.Request) {

    w.Header().Set("Content-Type", "text/plain; charset=utf-8")
    w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5501")
    w.Header().Set("Access-Control-Max-Age", "15")
    fmt.Fprintf(w, "Hello, there!")
}

Inside the HelloHandler, we set the CORS policy for our server.

log.Fatal(http.ListenAndServe(":8080", nil))

The application runs on localhost on port 8080. To access resources of this
server from other origins, in is necessary to enable them.

w.Header().Set("Content-Type", "text/plain; charset=utf-8")
w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5501")
w.Header().Set("Access-Control-Max-Age", "15")

We enable set the CORS policy for this server. JS scripts from
http://127.0.0.1:5501 origin can access our resources.

## Go CORS handler

The github.com/rs/cors is a third-party package which defines
net/http handler implementing Cross Origin Resource Sharing W3 specification in
Golang.

main.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/rs/cors"
)

func main() {

    mux := http.NewServeMux()

    cors := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{
            http.MethodPost,
            http.MethodGet,
        },
        AllowedHeaders:   []string{"*"},
        AllowCredentials: false,
    })

    mux.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "text/plain; charset=utf-8")
        fmt.Fprintln(w, "Hello there!")
    })

    handler := cors.Handler(mux)
    http.ListenAndServe(":8080", handler)
}

In the example, we use the github.com/rs/cors to implement the CORS
policy for our server. We enable two methods: GET and POST. With *, we allow all
origins.

## Echo CORS example

Go web frameworks, such as Echo, Gin, or Fiber have ready-to-use middlewares 
which enable CORS policies.

main.go
  

package main

import (
    "net/http"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

var (
    words = []string{"kind", "warm", "cup", "coin", "blue"}
)

func getWords(c echo.Context) error {
    return c.JSON(http.StatusOK, words)
}

func main() {

    e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete},
    }))

    e.GET("/api/words", getWords)

    e.Logger.Fatal(e.Start(":8080"))
}

The example uses a CORS middleware in an Echo framework.

## Source

[Go echo web framework](https://echo.labstack.com/)

In this article we have worked with CORS in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).