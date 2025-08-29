+++
title = "Go Fiber"
date = 2025-08-29T19:55:14.376+01:00
draft = false
description = "Learn how to build web applications using the Fiber framework in Go. Includes examples of routing, middleware, and request handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Fiber

last modified April 11, 2024

In this article we show how to create simple web applications in Golang with
Fiber framework.

## About Fiber

Fiber is a simple and fast Go web framework. Fiber focuses on extreme
performance and low memory footprint. It is inspired by popular Express JS 
framework.

## Fiber routes

A route associates an HTTP verb (such as GET, POST, PUT, DELETE) and
a URL path to a handler function. To create routes, we use functions of the
Fiber application object.

app.Get("/", func(c *fiber.Ctx) error {
    ...
})

Here we map the / path sent in a GET request to the handler
function. The function receives a context object as a parameter. It holds
the HTTP request and response.

## Go Fiber status code

The HTTP response status codes indicate whether a specific HTTP request has been
successfully completed.

The responses are grouped in five classes:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

status.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {

        return c.SendStatus(fiber.StatusOK)
    })

    log.Fatal(app.Listen(":3000"))
}

The SendStatus function sets the HTTP status code.

app := fiber.New()

The New function creates a new Fiber named instance.

app.Get("/", func(c *fiber.Ctx) error {

    return c.SendStatus(fiber.StatusOK)
})

The Get function registers a route for HTTP GET methods. We map the
/ path to an anonymous function; the function returns the
fiber.StatusOK code.

## Go Fiber send text message

A text message is sent with the SendString function.

text_message.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/text", func(c *fiber.Ctx) error {

        return c.SendString("Hello there!!")
    })

    log.Fatal(app.Listen(":3000"))
}

When we visit the localhost:3000/text URL, we receive a simple text
message.

$ curl localhost:3000/text
Hello there!!

## Go Fiber headers

The request object also includes the request headers sent from the client.
Request headers are HTTP headers that contain more information about the
resource to be fetched, and about the client requesting the resource. 

Likewise, response headers include meta information from the server.

headers.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {

        return c.SendString("Main page")
    })

    app.Get("/user-agent", func(c *fiber.Ctx) error {

        ua := c.Get("User-Agent")

        return c.SendString(ua)
    })

    log.Fatal(app.Listen(":3000"))
}

The Get function returns the HTTP request header specified by
field. In our case, we return the user agent name.

$ curl localhost:3000/user-agent
curl/7.74.0

## Go Fiber send file

The SendFile function transfers the file at the given path. The
image is displayed in the browser. The Download function transfers
the image; the image is offered as an attachment by browsers.

send_file.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/sid", func(c *fiber.Ctx) error {

        return c.Download("./data/sid.png")
    })

    app.Get("/sid2", func(c *fiber.Ctx) error {

        return c.SendFile("./data/sid.png")
    })

    log.Fatal(app.Listen(":3000"))
}

In the example, we have URL paths for displaying and downloading an image.
The image is stored in the data directory.

## Go Fiber query parameters

Query string is a part of the URL which is used to add some data to the
request for the resource. It is often a sequence of key/value pairs. It follows
the path and starts with the ? character.

query_string.go
  

package main

import (
    "fmt"
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/hello", func(c *fiber.Ctx) error {

        name := c.Query("name")
        age := c.Query("age")

        msg := fmt.Sprintf("%s is %s years old", name, age)
        return c.SendString(msg)
    })

    log.Fatal(app.Listen(":3000"))
}

The application creates and sends a message to the client. It uses the values
from the name and age query parameters. 

name := c.Query("name")
age := c.Query("age")

The Query function returns the query string parameter in the URL.

$ curl "localhost:3000/hello?name=Peter&amp;age=45"
Peter is 45 years old

## Go Fiber path parameters

Values can be send to the web application via query parameters or path
parameters. The path parameter is specified after a colon /:param.

The Params function is used to get the route parameters.

path_params.go
  

package main

import (
    "fmt"
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Get("/say/:name/:age/", func(c *fiber.Ctx) error {

        name := c.Params("name")
        age := c.Params("age")

        msg := fmt.Sprintf("%s is %s years old", name, age)
        return c.SendString(msg)
    })

    log.Fatal(app.Listen(":3000"))
}

The program returns a message to the user, containing the two path parameters
sent. 

app.Get("/say/:name/:age/", func(c *fiber.Ctx) error {

We use the colon to denote a parameter in the path.

$ curl localhost:3000/say/Lucia/32
Lucia is 32 years old

## Go Fiber JSON

JSON is a lightweight data-interchange format. It is easy for humans to read and
machines to parse and generate. Web applications often consume and produce JSON
data. 

The JSON function converts any interface or string to JSON. Array
and slice values encode as JSON arrays.

jsonex.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

type movie struct {
    id    int
    title string
}

func main() {

    app := fiber.New()

    app.Get("/movies", func(c *fiber.Ctx) error {

        movies := map[int]string{1: "Toy story", 2: "The Raid", 3: "Hero",
            4: "Ip Man", 5: "Kung Fu Panda"}

        return c.JSON(movies)
    })

    log.Fatal(app.Listen(":3000"))
}

The example sends movie data in JSON format.

$ curl localhost:3000/movies
{"1":"Toy story","2":"The Raid","3":"Hero","4":"Ip Man","5":"Kung Fu Panda"}

## Go Fiber static files

Static files are files that do not change. They include CSS files, JavaScript
files and images; also HTML files which do not contain template directives.

The Static function creates a file server serving static files.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        This is home page
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page. It is an example of a static HTML file. 

static.go
  

package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Static("/", "./public/index.html")

    log.Fatal(app.Listen(":3000"))
}

The code example displays a simple static HTML file for the home page. 

## Go Fiber template engine

A template engine or template processor is a library designed to combine
templates with a data model to produce documents. Template engines are used to
generate large amounts of emails, in source code preprocessing, or producing
dynamic HTML pages.

It is possible to use several template engines with Fiber, including html, pug, 
handlebars and mustache. The html is the official Go template engine.

views/show_date.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Show date&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is {{ .now }}
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the show_date.html template file. The template consists of
static data and dynamic data.

&lt;p&gt;
    Today is {{ .now }}
&lt;/p&gt;

With the {{.}} syntax, we output the value of the now
variable, which was passed to the template. 

template.go
  

package main

import (
    "log"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/template/html"
)

func main() {

    app := fiber.New(fiber.Config{
        Views: html.New("./views", ".html"),
    })

    app.Get("/now", func(c *fiber.Ctx) error {

        now := time.Now()

        return c.Render("show_date", fiber.Map{
            "now": now.Format("Jan 2, 2006"),
        })
    })

    log.Fatal(app.Listen(":3000"))
}

In the example, we compute the current date and send it to the 
show_date.html template file to be processed. 

app := fiber.New(fiber.Config{
    Views: html.New("./views", ".html"),
})

We configure the directory where we put the template files.

return c.Render("show_date", fiber.Map{
    "now": now.Format("Jan 2, 2006"),
})

The Render function renders a template with data and sends a
text/html response.

## Source

[Go Fiber - Github page](https://github.com/gofiber/fiber)

In this article we have created simple web applications in Golang with Fiber.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).