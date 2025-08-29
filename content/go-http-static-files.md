+++
title = "Go HTTP static files"
date = 2025-08-29T19:55:21.266+01:00
draft = false
description = "Learn how to serve static files in Go. Includes examples of HTTP server and file handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go HTTP static files

last modified April 11, 2024

In this article we show how to set up HTTP servers in Go to serve
static files.

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

The net/http package provides HTTP client and server
implementations and is used to create GET and POST requests. 

Static files are files that do not change. They include CSS files, JavaScript
files and images; also plain HTML files which do not contain template
directives. 

The http.FileServer is used to serve static files. It returns a
handler that serves HTTP requests with the contents of the file system.

## Serving static files

In the first example, we serve HTML files which include an image and a CSS file.

go.mod
main.go
public
├── about.html
├── css
│   └── format.css
├── img
│   └── sid.png
└── index.html

This is the project structure.

public/about.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="css/format.css"&gt;
    &lt;title&gt;About&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h2&gt;About page&lt;/h2&gt;

    &lt;p&gt;
        &lt;a href="/"&gt;Home page&lt;/a&gt;
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

This is the about.html file.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="css/format.css"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;h2&gt;Home page&lt;/h2&gt;

    &lt;p&gt;
        &lt;a href="about.html"&gt;About page&lt;/a&gt;
    &lt;/p&gt;

    &lt;figure&gt;
        &lt;img src="img/sid.png" alt="Sid the sloth"&gt;
        &lt;figcaption&gt;Sid the sloth&lt;/figcaption&gt;
    &lt;/figure&gt;

&lt;/body&gt;

&lt;/html&gt;

This is the index.html page.

public/css/format.css
  

* {
    font-size: medium;
    background-color:#2c2b2b ;
    color: #e6d7d7;
}

This is the CSS file.

main.go
  

package main

import (
    "net/http"
)

func main() {

    fs := http.FileServer(http.Dir("./public"))
    http.Handle("/", fs)

    http.ListenAndServe(":8080", nil)
}

We set up the server. The static files are read from the public
directory.

## Go serve image example

In the following example, we use template files to dynamically generate pages.
Along the template system, we set up serving static files for the CSS file, that 
is included in the template file.

go.mod
main.go
public
└── css
    └── format.css
templates
└── layout.html

This is the project structure.

public/css/format.css
  

table {
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-collapse: collapse;
}

td, th {
    padding: 5px;
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
}

tr:nth-child(2) {
    background-color: #c1f5f7;
}

We have some css code to style the HTML table.

templates/layout.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="public/css/format.css"&gt;
    &lt;title&gt;Users&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;table&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th&gt;User&lt;/th&gt;
                &lt;th&gt;Occupation&lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;

        &lt;tbody&gt;
            {{ range . }}
            &lt;tr&gt;
                &lt;td&gt;{{ .Name }}&lt;/td&gt;
                &lt;td&gt;{{ .Occupation }}&lt;/td&gt;
            &lt;/tr&gt;
            {{ end }}
        &lt;/tbody&gt;
    &lt;/table&gt;

&lt;/body&gt;

&lt;/html&gt;

In the template file, we have directives which merge the passed data into 
the HTML table. The format.css file is included in the template 
and is served as a static resource.

main.go
  

package main

import (
    "html/template"
    "net/http"
    "os"
)

type User struct {
    Name       string
    Occupation string
}

func main() {

    fs := http.FileServer(http.Dir("public"))
    http.Handle("/public/", http.StripPrefix("/public/", fs))

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

        tmpl := template.Must(template.ParseFiles("templates/layout.html"))

        data := []User{
            {Name: "John Doe", Occupation: "gardener"},
            {Name: "Roger Roe", Occupation: "driver"},
            {Name: "Thomas Green", Occupation: "teacher"},
        }

        tmpl.Execute(w, data)
    })

    http.ListenAndServe(":8080", nil)
}

In the code example, we set up serving static files and the template engine.

fs := http.FileServer(http.Dir("public"))
http.Handle("/public/", http.StripPrefix("/public/", fs))

The static resources come from the public directory.

http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

    tmpl := template.Must(template.ParseFiles("templates/layout.html"))

    data := []User{
        {Name: "John Doe", Occupation: "gardener"},
        {Name: "Roger Roe", Occupation: "driver"},
        {Name: "Thomas Green", Occupation: "teacher"},
    }

    tmpl.Execute(w, data)
})

Every resource that is not served from the public directory is 
managed with a template engine. In the anonymous function, we parse the 
layout.html file with template.parseFiles and 
merge it with the data. 

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have showed how to work with static resources in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).