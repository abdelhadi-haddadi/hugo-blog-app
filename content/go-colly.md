+++
title = "Go colly"
date = 2025-08-29T19:55:05.096+01:00
draft = false
description = "Learn how to use Colly in Go. Includes examples of web scraping and crawling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go colly

last modified April 11, 2024

In this article we show how to do web scraping and crawling in Golang.

*Colly* is a fast web scraping and crawling framework for Golang. It
can be used for tasks such as data mining, data processing or archiving.

Colly has automatic cookie and session handling. It supports synchronous,
asynchronous and parallel scraping. It supports caching, respects robots.txt
file, and enables distributed scraping.

## Colly Collector

Collector is the main interface to Colly. It manages the network communication
and responsible for the execution of the attached callbacks while a collector
job is running. The collector is started with the Visit function.

Colly is an event-based framework. We put code in the various event handlers.

Colly has the following event handlers:

     - OnRequest - called before a request

     - OnError - called if error occured during the request

     - OnResponseHeaders - called after response headers received

     - OnResponse - called after response received

     - OnHTML - called right after OnResponse if the received content is HTML

     - OnXML - called right after OnHTML if the received content is HTML or XML

     - OnScraped - called after OnXML callbacks

## Go Colly simple example

We start with a simple example.

title.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

func main() {

    c := colly.NewCollector()

    c.OnHTML("title", func(e *colly.HTMLElement) {
        fmt.Println(e.Text)
    })

    c.Visit("http://webcode.me")
}

The program retrieves a website's title.

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

First, we import the library.

c := colly.NewCollector()

A collector is created.

c.OnHTML("title", func(e *colly.HTMLElement) {
     fmt.Println(e.Text)
})

In the OnHTML handler, we register an anonymous function which
is called for each title tag. We print the title's text.

c.Visit("http://webcode.me")

The Visit starts collector's collecting job by creating a request
to the specified URL.

$ go run title.go
My html page

## Go Colly event handlers

We can react to different event handlers.

callbacks.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

func main() {

    c := colly.NewCollector()
    c.UserAgent = "Go program"

    c.OnRequest(func(r *colly.Request) {

        for key, value := range *r.Headers {
            fmt.Printf("%s: %s\n", key, value)
        }

        fmt.Println(r.Method)
    })

    c.OnHTML("title", func(e *colly.HTMLElement) {

        fmt.Println("-----------------------------")

        fmt.Println(e.Text)
    })

    c.OnResponse(func(r *colly.Response) {

        fmt.Println("-----------------------------")

        fmt.Println(r.StatusCode)

        for key, value := range *r.Headers {
            fmt.Printf("%s: %s\n", key, value)
        }
    })

    c.Visit("http://webcode.me")
}

In the code example, we have event handlers for OnRequest,
OnHTML, and OnResponse.

c.OnRequest(func(r *colly.Request) {

    fmt.Println("-----------------------------")

    for key, value := range *r.Headers {
        fmt.Printf("%s: %s\n", key, value)
    }

    fmt.Println(r.Method)
})

In the OnRequest handler, we print the request headers and request
method.

c.OnHTML("title", func(e *colly.HTMLElement) {

    fmt.Println("-----------------------------")

    fmt.Println(e.Text)
})

We process the title tag in the OnHTML handler.

c.OnResponse(func(r *colly.Response) {

    fmt.Println("-----------------------------")

    fmt.Println(r.StatusCode)

    for key, value := range *r.Headers {
        fmt.Printf("%s: %s\n", key, value)
    }
})

Finally, we print the status code of the response and its header values in
the OnResponse handler.

$ go run callbacks.go
User-Agent: [Go program]
GET
-----------------------------
200
Connection: [keep-alive]
Access-Control-Allow-Origin: [*]
Server: [nginx/1.6.2]
Date: [Sun, 23 Jan 2022 14:13:04 GMT]
Content-Type: [text/html]
Last-Modified: [Sun, 23 Jan 2022 10:39:25 GMT]
-----------------------------
My html page

## Go Colly scrape local files

We can scrape files on a local disk.

words.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;List of words&lt;/p&gt;
&lt;ul&gt;
    &lt;li&gt;dark&lt;/li&gt;
    &lt;li&gt;smart&lt;/li&gt;
    &lt;li&gt;war&lt;/li&gt;
    &lt;li&gt;cloud&lt;/li&gt;
    &lt;li&gt;park&lt;/li&gt;
    &lt;li&gt;cup&lt;/li&gt;
    &lt;li&gt;worm&lt;/li&gt;
    &lt;li&gt;water&lt;/li&gt;
    &lt;li&gt;rock&lt;/li&gt;
    &lt;li&gt;warm&lt;/li&gt;
&lt;/ul&gt;
&lt;footer&gt;footer for words&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;

We have this HTML file.

local.go
  

package main

import (
    "fmt"
    "net/http"

    "github.com/gocolly/colly/v2"
)

func main() {

    t := &amp;http.Transport{}
    t.RegisterProtocol("file", http.NewFileTransport(http.Dir(".")))

    c := colly.NewCollector()
    c.WithTransport(t)

    words := []string{}

    c.OnHTML("li", func(e *colly.HTMLElement) {
        words = append(words, e.Text)
    })

    c.Visit("file://./words.html")

    for _, p := range words {
        fmt.Printf("%s\n", p)
    }
}

To scrape local files, we must register a file protocol. We scrape all the
words from the list.

$ go run local.go
dark
smart
war
cloud
park
cup
worm
water
rock
warm

## Top retailers

In the following example, we are going to get the top retailers in the US.

retail.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

func main() {

    c := colly.NewCollector()

    i := 0
    scan := true

    c.OnHTML("#stores-list--section-16266 td.data-cell-0,td.data-cell-1,td.data-cell-2,td.data-cell-3",
        func(e *colly.HTMLElement) {

            if scan {

                fmt.Printf("%s ", e.Text)
            }
            i++

            if i%4 == 0 &amp;&amp; i &lt; 40 {
                fmt.Println()
            }

            if i == 40 {
                scan = false
                fmt.Println()
            }
        })

    c.Visit("https://nrf.com/resources/top-retailers/top-100-retailers/top-100-retailers-2019")
}

The example prints top 10 US retailer for year 2019.

c.OnHTML("#stores-list--section-16266 td.data-cell-0,td.data-cell-1,td.data-cell-2,td.data-cell-3",
    func(e *colly.HTMLElement) {

We have to look at the HTML source and determine which ids or classes to look
for. In our case, we take four columns from the table.

$ go run retail.go
1 Walmart $387.66  Bentonville, AR
2 Amazon.com $120.93  Seattle, WA
3 The Kroger Co. $119.70  Cincinnati, OH
4 Costco $101.43  Issaquah, WA
5 Walgreens Boots Alliance $98.39  Deerfield, IL
6 The Home Depot $97.27  Atlanta, GA
7 CVS Health Corporation $83.79  Woonsocket, RI
8 Target $74.48  Minneapolis, MN
9 Lowe's Companies $64.09  Mooresville, NC
10 Albertsons Companies $59.71  Boise, ID

## Go Colly crawl links

In more complex tasks, we need to crawl links that we find in our documents.

links.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

func main() {

    c := colly.NewCollector()

    c.OnHTML("title", func(e *colly.HTMLElement) {
        fmt.Println(e.Text)
    })

    c.OnHTML("a[href]", func(e *colly.HTMLElement) {

        link := e.Attr("href")
        c.Visit(e.Request.AbsoluteURL(link))
    })

    c.Visit("http://webcode.me/small.html")
}

For our example, we have created a small HTML document that contains three
links. Those three links do not contain additional links. We print the title of
each of the documents.

c.OnHTML("a[href]", func(e *colly.HTMLElement) {

    link := e.Attr("href")
    c.Visit(e.Request.AbsoluteURL(link))
})

In the OnHTML handler, we find all the links, get their
href attributes and visit them.

$ go run links.go
Small
My html page
Something.

## Stackoverflow questions

In the next example, we scrape Stackoverflow questions.

stack.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

type question struct {
    title   string
    excerpt string
}

func main() {

    c := colly.NewCollector()
    qs := []question{}

    c.OnHTML("div.summary", func(e *colly.HTMLElement) {

        q := question{}
        q.title = e.ChildText("a.question-hyperlink")
        q.excerpt = e.ChildText(".excerpt")

        qs = append(qs, q)

    })

    c.OnScraped(func(r *colly.Response) {
        for idx, q := range qs {

            fmt.Println("---------------------------------")
            fmt.Println(idx + 1)
            fmt.Printf("Q: %s \n\n", q.title)
            fmt.Println(q.excerpt)
        }
    })

    c.Visit("https://stackoverflow.com/questions/tagged/perl")
}

The program prints the current Perl questions from the main page.

type question struct {
    title   string
    excerpt string
}

We create a structure that will hold the question title and its excerpt.

qs := []question{}

A slice is created for the questions.

c.OnHTML("div.summary", func(e *colly.HTMLElement) {

    q := question{}
    q.title = e.ChildText("a.question-hyperlink")
    q.excerpt = e.ChildText(".excerpt")

    qs = append(qs, q)

})

We get the data into the structures.

c.OnScraped(func(r *colly.Response) {
    for idx, q := range qs {

        fmt.Println("---------------------------------")
        fmt.Println(idx + 1)
        fmt.Printf("Q: %s \n\n", q.title)
        fmt.Println(q.excerpt)
    }
})

The OnScraped is called after all works is done. At this time
we can go over the slice and print all the scraped data.

## Go Colly async mode

The default mode in which Colly works is synchronous. We enable the asynchronous
mode with the Async function. In asynchronous mode, we need to
call Wait to wait until the collector jobs are finished.

async.go
  

package main

import (
    "fmt"

    "github.com/gocolly/colly/v2"
)

func main() {

    urls := []string{
        "http://webcode.me",
        "https://example.com",
        "http://httpbin.org",
        "https://www.perl.org",
        "https://www.php.net",
        "https://www.python.org",
        "https://code.visualstudio.com",
        "https://clojure.org",
    }

    c := colly.NewCollector(
        colly.Async(),
    )

    c.OnHTML("title", func(e *colly.HTMLElement) {
        fmt.Println(e.Text)
    })

    for _, url := range urls {

        c.Visit(url)
    }

    c.Wait()

}

Notice that each time we run the program we get a different order of the
returned titles.

## Source

[Go Colly - Scraping Framework for Golang](https://go-colly.org/)

In this article we have performed web scraping and crawling in Golang with
Colly.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).