+++
title = "Go parse HTML with net/html"
date = 2025-08-29T19:55:31.375+01:00
draft = false
description = "Learn how to parse HTML in Go. Includes examples of using the net/html package."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go parse HTML with net/html

last modified April 11, 2024

In this article we show how to parse HTML in Golang with the net/html
library. The net/html is a supplementary Go networking library.

The Go net/html library has two basic set of APIs to parse HTML: the tokenizer
API and the tree-based node parsing API.

In the tokenizer API, a Token consists of a TokenType
and some Data (tag name for start and end tags, content for text,
comments and doctypes). A tag Token may also contain a slice of
attributes. Tokenization is done by creating a Tokenizer for an
io.Reader.

Parsing is done by calling Parse with an io.Reader,
which returns the root of the parse tree (the document element) as a
*Node. A node consists of a NodeType and some
Data (tag name for element nodes, content for text) and are part of
a tree of Nodes.

$ go get -u golang.org/x/net

We need to install the libraries.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Colour&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    A list of colours
&lt;/p&gt;

&lt;ul&gt;
    &lt;li&gt;red&lt;/li&gt;
    &lt;li&gt;green&lt;/li&gt;
    &lt;li&gt;blue&lt;/li&gt;
    &lt;li&gt;yellow&lt;/li&gt;
    &lt;li&gt;orange&lt;/li&gt;
    &lt;li&gt;brown&lt;/li&gt;
    &lt;li&gt;pink&lt;/li&gt;
&lt;/ul&gt;

&lt;footer&gt;
    A footer
&lt;/footer&gt;

&lt;/body&gt;
&lt;/html&gt;

Some of the examples use this HTML file.

## Go parse HTML list

In the next example, we parse an HTML list using the tokenizer API.

parse_list.go
  

package main

import (
    "fmt"
    "golang.org/x/net/html"
    "io/ioutil"
    "log"
    "strings"
)

func readHtmlFromFile(fileName string) (string, error) {

    bs, err := ioutil.ReadFile(fileName)

    if err != nil {
        return "", err
    }

    return string(bs), nil
}

func parse(text string) (data []string) {

    tkn := html.NewTokenizer(strings.NewReader(text))

    var vals []string

    var isLi bool

    for {

        tt := tkn.Next()

        switch {

        case tt == html.ErrorToken:
            return vals

        case tt == html.StartTagToken:

            t := tkn.Token()
            isLi = t.Data == "li"

        case tt == html.TextToken:

            t := tkn.Token()

            if isLi {
                vals = append(vals, t.Data)
            }

            isLi = false
        }
    }
}

func main() {

    fileName := "index.html"
    text, err := readHtmlFromFile(fileName)

    if err != nil {
        log.Fatal(err)
    }

    data := parse(text)
    fmt.Println(data)
}

The example prints the names of the colours from the list.

tkn := html.NewTokenizer(strings.NewReader(text))

A tokenizer is created with html.NewTokenizer.

for {

    tt := tkn.Next()
...

We go through the tokens in a for loop. The Next function scans the
next token and returns its type.

case tt == html.ErrorToken:
    return vals

We terminate the for loop at the end of the parsing and return the data.

case tt == html.StartTagToken:

    t := tkn.Token()
    isLi = t.Data == "li"

If the token is a starting tag, we get the current token with the
Token function. We set the isLi variable to true
if we encounter the li tag.

case tt == html.TextToken:

    t := tkn.Token()

    if isLi {
        vals = append(vals, t.Data)
    }

    isLi = false

When a token is text data, we add its content to the vals slice
provided the isLi variable is set; i.e. we are parsing text inside
the li tag.

$ go run parse_list.go
[red green blue yellow orange brown pink]

## Go parse HTML table

In the next example, we parse an HTML list.

parse_table.go
  

package main

import (
    "fmt"
    "golang.org/x/net/html"
    "io/ioutil"
    "log"
    "net/http"
    "strings"
)

func getHtmlPage(webPage string) (string, error) {

    resp, err := http.Get(webPage)

    if err != nil {
        return "", err
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {

        return "", err
    }

    return string(body), nil
}

func parseAndShow(text string) {

    tkn := html.NewTokenizer(strings.NewReader(text))

    var isTd bool
    var n int

    for {

        tt := tkn.Next()

        switch {

        case tt == html.ErrorToken:
            return

        case tt == html.StartTagToken:

            t := tkn.Token()
            isTd = t.Data == "td"

        case tt == html.TextToken:

            t := tkn.Token()

            if isTd {

                fmt.Printf("%s ", t.Data)
                n++
            }

            if isTd &amp;&amp; n % 3 == 0 {

                fmt.Println()
            }

            isTd = false
        }
    }
}

func main() {

    webPage := "http://webcode.me/countries.html"
    data, err := getHtmlPage(webPage)

    if err != nil {
        log.Fatal(err)
    }

    parseAndShow(data)
}

We retrieve a webpage and parse its HTML table. We get the data from the
td tags.

$ go run parse_table.go
Id Name Population
1 China 1382050000
2 India 1313210000
3 USA 324666000
4 Indonesia 260581000
5 Brazil 207221000
6 Pakistan 196626000
...

## Go parse HTML list II

In the next example, we parse an HTML list using the parsing API.

parsing.go
  

package main

import (
    "fmt"
    "golang.org/x/net/html"
    "io/ioutil"
    "log"
    "strings"
)

func main() {

    fileName := "index.html"

    bs, err := ioutil.ReadFile(fileName)

    if err != nil {
        log.Fatal(err)
    }

    text := string(bs)

    doc, err := html.Parse(strings.NewReader(text))

    if err != nil {

        log.Fatal(err)
    }

    var data []string

    doTraverse(doc, &amp;data, "li")
    fmt.Println(data)
}

func doTraverse(doc *html.Node, data *[]string, tag string) {

    var traverse func(n *html.Node, tag string) *html.Node

    traverse = func(n *html.Node, tag string) *html.Node {

        for c := n.FirstChild; c != nil; c = c.NextSibling {

            if c.Type == html.TextNode &amp;&amp; c.Parent.Data == tag {

                *data = append(*data, c.Data)
            }

            res := traverse(c, tag)

            if res != nil {

                return res
            }
        }

        return nil
    }

    traverse(doc, tag)
}

We recursively traverse the document to locate all li tags.

doc, err := html.Parse(strings.NewReader(text))

We get the document as a tree from the string with html.Parse.

traverse = func(n *html.Node, tag string) *html.Node {

    for c := n.FirstChild; c != nil; c = c.NextSibling {

        if c.Type == html.TextNode &amp;&amp; c.Parent.Data == tag {

            *data = append(*data, c.Data)
        }

        res := traverse(c, tag)

        if res != nil {

            return res
        }
    }

    return nil
}

We go over the tags of the document via a recursive algorithm. If we deal
with a text node of an li tag, we append its contents to the
data slice.

$ go run parsing.go
[red green blue yellow orange brown pink]

## Go find tag by id

In the following example, we find a tag by its id. There should be
only one unique tag inside an HTML document with a specific  id.
The id. We can get attributes of a tag through the
Attr property.

find_by_id.go
  

package main

import (
    "bytes"
    "fmt"
    "golang.org/x/net/html"
    "io"
    "log"
    "strings"
)

func getAttribute(n *html.Node, key string) (string, bool) {

    for _, attr := range n.Attr {

        if attr.Key == key {
            return attr.Val, true
        }
    }

    return "", false
}

func renderNode(n *html.Node) string {

    var buf bytes.Buffer
    w := io.Writer(&amp;buf)

    err := html.Render(w, n)

    if err != nil {
        return ""
    }

    return buf.String()
}

func checkId(n *html.Node, id string) bool {

    if n.Type == html.ElementNode {

    s, ok := getAttribute(n, "id")

        if ok &amp;&amp; s == id {
            return true
        }
    }

    return false
}

func traverse(n *html.Node, id string) *html.Node {

    if checkId(n, id) {
        return n
    }

    for c := n.FirstChild; c != nil; c = c.NextSibling {

        res := traverse(c, id)

        if res != nil {
            return res
        }
    }

    return nil
}

func getElementById(n *html.Node, id string) *html.Node {

    return traverse(n, id)
}

func main() {

    doc, err := html.Parse(strings.NewReader(data))

    if err != nil {
        log.Fatal(err)
    }

    tag := getElementById(doc, "yellow")
    output := renderNode(tag)

    fmt.Println(output)
}

var data = `&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Colour&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    A list of colours:
&lt;/p&gt;

&lt;ul&gt;
    &lt;li&gt;red&lt;/li&gt;
    &lt;li&gt;green&lt;/li&gt;
    &lt;li&gt;blue&lt;/li&gt;
    &lt;li id="yellow"&gt;yellow&lt;/li&gt;
    &lt;li&gt;orange&lt;/li&gt;
    &lt;li&gt;brown&lt;/li&gt;
    &lt;li&gt;pink&lt;/li&gt;
&lt;/ul&gt;
&lt;/body&gt;
&lt;/html&gt;`

We locate a specific tag and render its HTML. We load HTML data from a
multiline string.

func getAttribute(n *html.Node, key string) (string, bool) {

    for _, attr := range n.Attr {

        if attr.Key == key {
            return attr.Val, true
        }
    }

    return "", false
}

We get the attributes from the Attr property of the tag.

func renderNode(n *html.Node) string {

    var buf bytes.Buffer
    w := io.Writer(&amp;buf)

    err := html.Render(w, n)

    if err != nil {
        return ""
    }

    return buf.String()
}

The html.Render method renders the tag.

$ go run find_by_id.go
&lt;li id="yellow"&gt;yellow&lt;/li&gt;

## Go parse titles concurrently

In the next example, we parse HTML titles from various websites concurrently.
The example uses the tokenizer API.

parse_titles.go
  

package main

import (
    "fmt"
    "golang.org/x/net/html"
    "net/http"
    "sync"
)

var wg sync.WaitGroup

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

    showTitles(urls)
}

func showTitles(urls []string) {

    c := getTitleTags(urls)

    for msg := range c {

        fmt.Println(msg)
    }
}

func getTitleTags(urls []string) chan string {

    c := make(chan string)

    for _, url := range urls {
        wg.Add(1)
        go getTitle(url, c)
    }

    go func() {
        wg.Wait()

        close(c)
    }()

    return c
}

func getTitle(url string, c chan string) {

    defer wg.Done()

    resp, err := http.Get(url)

    if err != nil {
        c &lt;- "failed to fetch data"
        return
    }

    defer resp.Body.Close()

    tkn := html.NewTokenizer(resp.Body)

    var isTitle bool

    for {

        tt := tkn.Next()

        switch {
        case tt == html.ErrorToken:
            return

        case tt == html.StartTagToken:

            t := tkn.Token()

            isTitle = t.Data == "title"

        case tt == html.TextToken:

            t := tkn.Token()

            if isTitle {

                c &lt;- t.Data
                isTitle = false
            }
        }
    }
}

We use goroutines to launch our tasks concurrently. The parsed titles are send
to the caller via a channel. The sync.WaitGroup is used to finish
the program once all tasks have finished.

$ go run parse_titles.go
My html page
Welcome to Python.org
The Perl Programming Language - www.perl.org
Clojure
PHP: Hypertext Preprocessor
Visual Studio Code - Code Editing. Redefined
httpbin.org
Example Domain

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have parsed HTML with Go's net/html library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).