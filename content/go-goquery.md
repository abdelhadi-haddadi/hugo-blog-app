+++
title = "Go goquery"
date = 2025-08-29T19:55:18.978+01:00
draft = false
description = "Learn how to scrape web pages in Go using the goquery library. Includes examples of parsing HTML and extracting data."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go goquery

last modified April 11, 2024

In this article we show how to do web scraping/HTML parsing in Golang with
goquery. The goquery API is similar to jQuery.

The goquery is based on the net/html package and the CSS Selector
library cascadia.

$ go get github.com/PuerkitoBio/goquery

We get the goquery package for our project.

## Go goquery get title

The following example, we get a title of a webpage.

get_title.go
  

package main

import (
    "fmt"
    "github.com/PuerkitoBio/goquery"
    "log"
    "net/http"
)

func main() {

    webPage := "http://webcode.me"
    resp, err := http.Get(webPage)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        log.Fatalf("failed to fetch data: %d %s", resp.StatusCode, resp.Status)
    }

    doc, err := goquery.NewDocumentFromReader(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    title := doc.Find("title").Text()
    fmt.Println(title)
}

We generate a GET request to the specified webpage and retrieve its contents.
From the body of the response, we generate a goquery document. From this
document, we retrieve the title.

title := doc.Find("title").Text()

The Find method returns a set of matched elements. In our case,
it is one title tag. With Text, we get the text
content of the tag.

$ go run get_title.go
My html page

## Go goquery read local file

The following example reads a local HTML file.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;body&gt;
&lt;main&gt;
    &lt;h1&gt;My website&lt;/h1&gt;

    &lt;p&gt;
        I am a Go programmer.
    &lt;/p&gt;

    &lt;p&gt;
        My hobbies are:
    &lt;/p&gt;

    &lt;ul&gt;
        &lt;li&gt;Swimming&lt;/li&gt;
        &lt;li&gt;Tai Chi&lt;/li&gt;
        &lt;li&gt;Running&lt;/li&gt;
        &lt;li&gt;Web development&lt;/li&gt;
        &lt;li&gt;Reading&lt;/li&gt;
        &lt;li&gt;Music&lt;/li&gt;
    &lt;/ul&gt;
&lt;/main&gt;
&lt;/body&gt;

&lt;/html&gt;

This is a simple HTML file.

read_local.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "regexp"
    "strings"

    "github.com/PuerkitoBio/goquery"
)

func main() {

    data, err := ioutil.ReadFile("index.html")

    if err != nil {
        log.Fatal(err)
    }

    doc, err := goquery.NewDocumentFromReader(strings.NewReader(string(data)))

    if err != nil {
        log.Fatal(err)
    }

    text := doc.Find("h1,p").Text()

    re := regexp.MustCompile("\\s{2,}")
    fmt.Println(re.ReplaceAllString(text, "\n"))
}

We get the text contents of two tags.

data, err := ioutil.ReadFile("index.html")

We read the file.

doc, err := goquery.NewDocumentFromReader(strings.NewReader(string(data)))

We generate a new goquery document with NewDocumentFromReader.

text := doc.Find("h1,p").Text()

We get the text contents of two tags: h1 and p.

re := regexp.MustCompile("\\s{2,}")
fmt.Println(re.ReplaceAllString(text, "\n"))

Using a regular expression, we remove excessive white space.

$ go run read_local.go
My website
I am a Go programmer.
My hobbies are:

## Go goquery read from HTML string

In the next example, we process a built-in HTML string.

get_words.go
  

package main

import (
    "fmt"
    "log"
    "strings"

    "github.com/PuerkitoBio/goquery"
)

func main() {

    data := `
&lt;html lang="en"&gt;
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
`

    doc, err := goquery.NewDocumentFromReader(strings.NewReader(data))

    if err != nil {
    log.Fatal(err)
    }

    words := doc.Find("li").Map(func(i int, sel *goquery.Selection) string {
        return fmt.Sprintf("%d: %s", i+1, sel.Text())
    })

    fmt.Println(words)
}

We get the words from the HTML list.

words := doc.Find("li").Map(func(i int, sel *goquery.Selection) string {
    return fmt.Sprintf("%d: %s", i+1, sel.Text())
})

With Find, we get all the li elements. The
Map method is used to build a string that contains the word
and its index in the list.

$ go run get_words.go
[1: dark 2: smart 3: war 4: cloud 5: park 6: cup 7: worm 8: water 9: rock 10: warm]

## Go goquery filter words

The following example filters words.

filter_words.go
  

package main

import (
    "fmt"
    "log"
    "strings"

    "github.com/PuerkitoBio/goquery"
)

func main() {

    data := `
&lt;html lang="en"&gt;
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
`

    doc, err := goquery.NewDocumentFromReader(strings.NewReader(data))

    if err != nil {
        log.Fatal(err)
    }

    f := func(i int, sel *goquery.Selection) bool {
        return strings.HasPrefix(sel.Text(), "w")
    }

    var words []string

    doc.Find("li").FilterFunction(f).Each(func(_ int, sel *goquery.Selection) {
        words = append(words, sel.Text())
    })

    fmt.Println(words)
}

We retrieve all words starting with 'w'.

f := func(i int, sel *goquery.Selection) bool {
    return strings.HasPrefix(sel.Text(), "w")
}

This is a predicate function that returns a boolean true for all words that
begin with 'w'.

doc.Find("li").FilterFunction(f).Each(func(_ int, sel *goquery.Selection) {
    words = append(words, sel.Text())
})

We locate the set of matching tags with Find. We filter the set
with FilterFunction and go over the filtered results with
Each. We add each filtered word to the words slice.

fmt.Println(words)

Finally, we print the slice.

$ go run filter_words.go
[war worm water warm]

## Go goquery union words

With Union, we can combine selections.

union_words.go
  

package main

import (
    "fmt"
    "log"
    "strings"

    "github.com/PuerkitoBio/goquery"
)

func main() {

    data := `
&lt;html lang="en"&gt;
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
`
    doc, err := goquery.NewDocumentFromReader(strings.NewReader(data))

    if err != nil {
        log.Fatal(err)
    }

    var words []string

    sel1 := doc.Find("li:first-child, li:last-child")
    sel2 := doc.Find("li:nth-child(3), li:nth-child(7)")

    sel1.Union(sel2).Each(func(_ int, sel *goquery.Selection) {
        words = append(words, sel.Text())
    })

    fmt.Println(words)
}

The example combines two selections.

sel1 := doc.Find("li:first-child, li:last-child")

The first selection contains the first and the last element.

sel2 := doc.Find("li:nth-child(3), li:nth-child(7)")

The second selection contains the third and the seventh element.

sel1.Union(sel2).Each(func(_ int, sel *goquery.Selection) {
    words = append(words, sel.Text())
})

We combine the two selections with Union.

$ go run union_words.go
[dark warm war worm]

## Go goquery get links

The following example retrieves links from a webpage.

get_links.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
    "strings"

    "github.com/PuerkitoBio/goquery"
)

func getLinks() {

    webPage := "https://golang.org"

    resp, err := http.Get(webPage)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        log.Fatalf("status code error: %d %s", resp.StatusCode, resp.Status)
    }

    doc, err := goquery.NewDocumentFromReader(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    f := func(i int, s *goquery.Selection) bool {

        link, _ := s.Attr("href")
        return strings.HasPrefix(link, "https")
    }

    doc.Find("body a").FilterFunction(f).Each(func(_ int, tag *goquery.Selection) {

        link, _ := tag.Attr("href")
        linkText := tag.Text()
        fmt.Printf("%s %s\n", linkText, link)
    })
}

func main() {
    getLinks()
}

The example retrieves external links to secured web pages.

f := func(i int, s *goquery.Selection) bool {

    link, _ := s.Attr("href")
    return strings.HasPrefix(link, "https")
}

In the predicate function we ensure that the link has the https
prefix.

doc.Find("body a").FilterFunction(f).Each(func(_ int, tag *goquery.Selection) {

    link, _ := tag.Attr("href")
    linkText := tag.Text()
    fmt.Printf("%s %s\n", linkText, link)
})

We find all the anchor tags, filter them, and then print the filtered links
to the console.

## Go goquery StackOverflow questions

We are going to get the latest StackOverflow questions for the Raku tag.

get_qs.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/PuerkitoBio/goquery"
)

func main() {

    webPage := "https://stackoverflow.com/questions/tagged/raku"

    resp, err := http.Get(webPage)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        log.Fatalf("failed to fetch data: %d %s", resp.StatusCode, resp.Status)
    }

    doc, err := goquery.NewDocumentFromReader(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    doc.Find(".question-summary .summary").Each(func(i int, s *goquery.Selection) {

        title := s.Find("h3").Text()
        fmt.Println(i+1, title)
    })
}

In the code example, we print the last fifty titles of the StackOverflow questions on
the Raku programming language.

doc.Find(".question-summary .summary").Each(func(i int, s *goquery.Selection) {

    title := s.Find("h3").Text()
    fmt.Println(i+1, title)
})

We locate the questions and print their titles; the title is in the
h3 tag.

$ go run get_qs.go
1 Raku pop() order of execution
2 Does the `do` keyword run a block or treat it as an expression?
3 Junction ~~ Junction behavior
4 Is there a way to detect whether something is immutable?
5 Optimize without sacrificing usual workflow: arguments, POD etc
6 Find out external command runability
...

## Go goquery get earthquakes

In the next example, we fetch data about earthquakes.

$ go get github.com/olekukonko/tablewriter

We use the tablewriter package to display data in tabular format.

earthquakes.go
  

package main

import (
    "fmt"
    "github.com/PuerkitoBio/goquery"
    "github.com/olekukonko/tablewriter"
    "log"
    "net/http"
    "os"
    "strings"
)

type Earthquake struct {
    Date      string
    Latitude  string
    Longitude string
    Magnitude string
    Depth     string
    Location  string
    IrisId    string
}

var quakes []Earthquake

func fetchQuakes() {

    webPage := "http://ds.iris.edu/seismon/eventlist/index.phtml"

    resp, err := http.Get(webPage)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        log.Fatalf("failed to fetch data: %d %s", resp.StatusCode, resp.Status)
    }

    doc, err := goquery.NewDocumentFromReader(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    doc.Find("tbody tr").Each(func(j int, tr *goquery.Selection) {

        if j &gt;= 10 {
            return
        }

        e := Earthquake{}

        tr.Find("td").Each(func(ix int, td *goquery.Selection) {
            switch ix {
            case 0:
                e.Date = td.Text()
            case 1:
                e.Latitude = td.Text()
            case 2:
                e.Longitude = td.Text()
            case 3:
                e.Magnitude = td.Text()
            case 4:
                e.Depth = td.Text()
            case 5:
                e.Location = strings.TrimSpace(td.Text())
            case 6:
                e.IrisId = td.Text()
            }
        })

        quakes = append(quakes, e)

    })

    table := tablewriter.NewWriter(os.Stdout)
    table.SetHeader([]string{"Date", "Location", "Magnitude", "Longitude",
        "Latitude", "Depth", "IrisId"})
    table.SetCaption(true, "Last ten earthquakes")

    for _, quake := range quakes {

        s := []string{
            quake.Date,
            quake.Location,
            quake.Magnitude,
            quake.Longitude,
            quake.Latitude,
            quake.Depth,
            quake.IrisId,
        }

        table.Append(s)
    }

    table.Render()
}

func main() {

    fetchQuakes()
}

The example retrieves ten latest earthquakes from the Iris database. It prints
the data in a tabular format.

type Earthquake struct {
    Date      string
    Latitude  string
    Longitude string
    Magnitude string
    Depth     string
    Location  string
    IrisId    string
}

The data is grouped in the Earthquake structure.

var quakes []Earthquake

The structures will be stored in the quakes slice.

doc.Find("tbody tr").Each(func(j int, tr *goquery.Selection) {

Locating data is simple; we go for the tr tags inside the
tbody tag.

e := Earthquake{}

tr.Find("td").Each(func(ix int, td *goquery.Selection) {
    switch ix {
    case 0:
        e.Date = td.Text()
    case 1:
        e.Latitude = td.Text()
    case 2:
        e.Longitude = td.Text()
    case 3:
        e.Magnitude = td.Text()
    case 4:
        e.Depth = td.Text()
    case 5:
        e.Location = strings.TrimSpace(td.Text())
    case 6:
        e.IrisId = td.Text()
    }
})

quakes = append(quakes, e)

We create a new Earthquake structure, fill it with table row data
and put the structure into the quakes slice.

table := tablewriter.NewWriter(os.Stdout)
table.SetHeader([]string{"Date", "Location", "Magnitude", "Longitude",
    "Latitude", "Depth", "IrisId"})
table.SetCaption(true, "Last ten earthquakes")

We create a new table for displaying our data. The data will be shown in the
standard output (console). We create a header and a caption for the table.

for _, quake := range quakes {

    s := []string{
        quake.Date,
        quake.Location,
        quake.Magnitude,
        quake.Longitude,
        quake.Latitude,
        quake.Depth,
        quake.IrisId,
    }

    table.Append(s)
}

The table takes a string slice as a parameter; therefore, we transform the
structure into a slice and append the slice to the table with
Append.

table.Render()

In the end, we render the table.

$ go run earthquakes.go
+------------------------+--------------------------------+-----------+-----------+----------+-------+------------+
|          DATE          |            LOCATION            | MAGNITUDE | LONGITUDE | LATITUDE | DEPTH |   IRISID   |
+------------------------+--------------------------------+-----------+-----------+----------+-------+------------+
|  17-AUG-2021 07:54:31  | TONGA ISLANDS                  |      4.9  |  -174.01  |  -17.44  |   45  | &nbsp;&nbsp;11457319 |
|  17-AUG-2021 03:10:50  | SOUTH SANDWICH ISLANDS REGION  |      5.7  |   -24.02  |  -58.04  |   10  | &nbsp;&nbsp;11457233 |
|  17-AUG-2021 02:22:46  | LEYTE, PHILIPPINES             |      4.4  |   125.44  |   10.37  |  228  | &nbsp;&nbsp;11457202 |
|  17-AUG-2021 02:19:28  | CHILE-ARGENTINA BORDER REGION  |      4.5  |   -67.28  |  -24.27  |  183  | &nbsp;&nbsp;11457198 |
|  17-AUG-2021 01:30:26  | WEST CHILE RISE                |      4.9  |   -81.25  |  -44.38  |   10  | &nbsp;&nbsp;11457192 |
|  17-AUG-2021 00:38:38  | AFGHANISTAN-TAJIKISTAN BORD    |      4.4  |    71.13  |   36.72  |  240  | &nbsp;&nbsp;11457214 |
|                        | REG.                           |           |           |          |       |            |
|  16-AUG-2021 23:58:56  | NORTHWESTERN BALKAN REGION     |      4.6  |    16.28  |   45.44  |   10  | &nbsp;&nbsp;11457177 |
|  16-AUG-2021 23:37:25  | SOUTH SANDWICH ISLANDS REGION  |      5.5  |   -26.23  |  -59.56  |   52  | &nbsp;&nbsp;11457169 |
|  16-AUG-2021 20:50:34  | SOUTH SANDWICH ISLANDS REGION  |      5.5  |   -24.90  |  -60.25  |   10  | &nbsp;&nbsp;11457139 |
|  16-AUG-2021 19:17:09  | SOUTH SANDWICH ISLANDS REGION  |      5.1  |   -26.77  |  -60.22  |   35  | &nbsp;&nbsp;11457054 |
+------------------------+--------------------------------+-----------+-----------+----------+-------+------------+
Last ten earthquakes

## Source

[Goquery - Github page](https://github.com/PuerkitoBio/goquery)

In this article we have scraped web/parsed HTML in Go with the goquery
package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).