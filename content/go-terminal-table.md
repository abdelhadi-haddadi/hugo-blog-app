+++
title = "Go terminal table"
date = 2025-08-29T19:56:23.340+01:00
draft = false
description = "Learn how to create and format tables in the terminal using Go. Includes examples with the go-pretty package."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go terminal table

last modified April 11, 2024

In this article we show how to create tables in terminal in Go. With the
renaissance of console applications, look for a way to display data in a neatly 
formatted terminal tables.

To create terminal tables in Go, we use the go-pretty package.

## Go simple terminal table

In the first example, we create a simple terminal table.

main.go
  

package main

import (
    "fmt"

    "github.com/jedib0t/go-pretty/v6/table"
)

func main() {

    t := table.NewWriter()
    t.SetCaption("Users")

    t.AppendHeader(table.Row{"#", "Name", "Occupation"})
    t.AppendRow(table.Row{1, "John Doe", "gardener"})
    t.AppendRow(table.Row{2, "Roger Roe", "driver"})
    t.AppendRows([]table.Row{{3, "Paul Smith", "trader"},
        {4, "Lucy Smith", "teacher"}})

    fmt.Println(t.Render())
}

The table has three columns and four rows.

t := table.NewWriter()

We create a new table writer with NewWriter.

t.AppendHeader(table.Row{"#", "Name", "Occupation"})

A table header is created with AppendHeader. We specify three
column names.

t.AppendRow(table.Row{1, "John Doe", "gardener"})

A single row is added with AppendRow.

t.AppendRows([]table.Row{{3, "Paul Smith", "trader"},
    {4, "Lucy Smith", "teacher"}})

Multiple rows can be added at once with AppendRows.

fmt.Println(t.Render())

The table is rendered with Render.

$ go run main.go
+---+------------+------------+
| # | NAME       | OCCUPATION |
+---+------------+------------+
| 1 | John Doe   | gardener   |
| 2 | Roger Roe  | driver     |
| 3 | Paul Smith | trader     |
| 4 | Lucy Smith | teacher    |
+---+------------+------------+
Users

In the next example, we modify a few things.

main.go
  

package main

import (
    "fmt"

    "github.com/jedib0t/go-pretty/v6/table"
    "github.com/jedib0t/go-pretty/v6/text"
)

func main() {

    t := table.NewWriter()
    t.SetTitle("Users")
    t.SetAutoIndex(true)
    t.Style().Format.Header = text.FormatTitle

    t.AppendHeader(table.Row{"Name", "Occupation"})
    t.AppendRow(table.Row{"John Doe", "gardener"})
    t.AppendRow(table.Row{"Roger Roe", "driver"})
    t.AppendRows([]table.Row{{"Paul Smith", "trader"},
        {"Lucy Smith", "teacher"}})

    fmt.Println(t.Render())
}

The example a slightly modified.

t.SetTitle("Users")

Instead of a caption, we set a table title with SetTitle.

t.SetAutoIndex(true)

The SetAutoIndex function creates automatically an index column.

t.Style().Format.Header = text.FormatTitle

We change the format of the column header names. By default, they are rendered 
in uppercase.

$ go run main.go
+-----------------------------+
| Users                       |
+---+------------+------------+
|   | Name       | Occupation |
+---+------------+------------+
| 1 | John Doe   | gardener   |
| 2 | Roger Roe  | driver     |
| 3 | Paul Smith | trader     |
| 4 | Lucy Smith | teacher    |
+---+------------+------------+

## Table footer

A table footer is added with AppendFooter.

main.go
  

package main

import (
    "fmt"

    "github.com/jedib0t/go-pretty/v6/table"
    "github.com/jedib0t/go-pretty/v6/text"
)

type User struct {
    Name       string
    Occupation string
    Salary     int
}

func main() {

    users := []User{{"John Doe", "gardener", 1250}, {"Roger Roe", "driver", 950},
        {"Paul Smith", "trader", 2100}, {"Lucy Smith", "teacher", 880}}

    var total int

    for _, u := range users {
        total += u.Salary
    }

    t := table.NewWriter()
    t.SetCaption("Users")
    t.SetAutoIndex(true)
    t.Style().Format.Header = text.FormatTitle
    t.Style().Format.Footer = text.FormatTitle

    t.AppendHeader(table.Row{"Name", "Occupation", "Salary"})

    for _, u := range users {
        t.AppendRow(table.Row{u.Name, u.Occupation, u.Salary})
    }

    t.AppendFooter(table.Row{"", "Total", total})

    fmt.Println(t.Render())
}

We have a table of users. Each user has three attributes: name, occupation, and 
salary. We add the total salary in the footer of the table.

type User struct {
    Name       string
    Occupation string
    Salary     int
}

We define the User struct.

users := []User{{"John Doe", "gardener", 1250}, {"Roger Roe", "driver", 950},
    {"Paul Smith", "trader", 2100}, {"Lucy Smith", "teacher", 880}}

We define a collection of users.

for _, u := range users {
    total += u.Salary
}

From the collection we calculate the total amount of salaries.

for _, u := range users {
    t.AppendRow(table.Row{u.Name, u.Occupation, u.Salary})
}

We add the data to the table.

t.AppendFooter(table.Row{"", "Total", total})

We add the footer to the table with the AppendFooter function.

$ go run main.go
+---+------------+------------+--------+
|   | Name       | Occupation | Salary |
+---+------------+------------+--------+
| 1 | John Doe   | gardener   |   1250 |
| 2 | Roger Roe  | driver     |    950 |
| 3 | Paul Smith | trader     |   2100 |
| 4 | Lucy Smith | teacher    |    880 |
+---+------------+------------+--------+
|   |            | Total      |   5180 |
+---+------------+------------+--------+
Users

## Write table to file

The rendered table can be easily written to a file.

main.go
  

package main

import (
    "log"
    "os"

    "github.com/jedib0t/go-pretty/v6/table"
    "github.com/jedib0t/go-pretty/v6/text"
)

type User struct {
    Name       string
    Occupation string
    Salary     int
}

func main() {

    f, err := os.Create("data.txt")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    users := []User{{"John Doe", "gardener", 1250}, {"Roger Roe", "driver", 950},
        {"Paul Smith", "trader", 2100}, {"Lucy Smith", "teacher", 880}}

    t := table.NewWriter()
    t.SetCaption("Users")
    t.SetAutoIndex(true)
    t.Style().Format.Header = text.FormatTitle
    t.SetOutputMirror(os.Stdout)

    t.AppendHeader(table.Row{"Name", "Occupation", "Salary"})

    for _, u := range users {
        t.AppendRow(table.Row{u.Name, u.Occupation, u.Salary})
    }

    f.WriteString(t.Render())
}

In the program, we write the table to a file and also to the terminal.

f, err := os.Create("data.txt")

if err != nil {
    log.Fatal(err)
}

defer f.Close()

We create a file where we write our table.

t.SetOutputMirror(os.Stdout)

With SetOutputMirror, we also send the data to the terminal.
In effect, the data is written to the file and mirrored in the console.

f.WriteString(t.Render())

The Render function returns a string which is written to the file 
with WriteString.

## Table styles

The library comes with predefined styles. A style is represented by the
table.Style structure.

main.go
  

package main

import (
    "fmt"

    "github.com/jedib0t/go-pretty/v6/table"
    "github.com/jedib0t/go-pretty/v6/text"
)

type User struct {
    Name       string
    Occupation string
    Salary     int
}

func main() {

    styles := []table.Style{
        table.StyleDefault,
        table.StyleLight,
        table.StyleColoredDark,
        table.StyleColoredBlueWhiteOnBlack,
    }

    users := []User{{"John Doe", "gardener", 1250}, {"Roger Roe", "driver", 950},
        {"Paul Smith", "trader", 2100}, {"Lucy Smith", "teacher", 880}}

    for _, style := range styles {

        t := table.NewWriter()
        t.SetCaption("Users")
        t.AppendHeader(table.Row{"Name", "Occupation", "Salary"})

        for _, u := range users {
            t.AppendRow(table.Row{u.Name, u.Occupation, u.Salary})
        }

        t.SetAutoIndex(true)
        t.SetStyle(style)
        t.Style().Options.SeparateRows = true
        t.Style().Format.Header = text.FormatTitle

        fmt.Println(t.Render())
        fmt.Println()
    }
}

In the example, we output the table in various styles.

styles := []table.Style{
    table.StyleDefault,
    table.StyleLight,
    table.StyleColoredDark,
    table.StyleColoredBlueWhiteOnBlack,
}

We have a collection of built-in styles.

t.SetStyle(style)

A style is applied with SetStyle.

t.Style().Options.SeparateRows = true
t.Style().Format.Header = text.FormatTitle

A style can be modified later via attributes.

## Binance order book

An order book is an electronic list of buy/bid and sell/ask orders for a
specific asset organized by price level. In our example, we show an order book
for the LTC token on Binance.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/adshao/go-binance/v2"
    "github.com/jedib0t/go-pretty/v6/table"
    "github.com/jedib0t/go-pretty/v6/text"
)

func main() {

    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )
    client := binance.NewClient(apiKey, secretKey)

    tickers, err := client.NewDepthService().Symbol("LTCBUSD").Limit(15).
        Do(context.Background())

    if err != nil {
        log.Fatal(err)
    }

    // Bids

    t := table.NewWriter()
    t.SetTitle("LTC")
    t.SetCaption("Bids")
    t.SetAutoIndex(true)
    t.SetStyle(table.StyleColoredGreenWhiteOnBlack)
    t.Style().Format.Header = text.FormatTitle
    t.SetColumnConfigs([]table.ColumnConfig{
        {Number: 1, Align: text.AlignRight},
        {Number: 2, Align: text.AlignRight}})

    t.AppendHeader(table.Row{"Price", "Quatity"})

    for _, bid := range tickers.Bids {

        t.AppendRow(table.Row{bid.Price, bid.Quantity})
    }

    fmt.Println(t.Render())

    fmt.Println()

    // Asks

    t2 := table.NewWriter()
    t2.SetTitle("LTC")
    t2.SetCaption("Asks")
    t2.SetAutoIndex(true)
    t2.SetStyle(table.StyleColoredRedWhiteOnBlack)
    t2.Style().Format.Header = text.FormatTitle
    t2.Style().Format.Row = text.Format(text.AlignRight)
    t2.SetColumnConfigs([]table.ColumnConfig{
        {Number: 1, Align: text.AlignRight},
        {Number: 2, Align: text.AlignRight}})

    t2.AppendHeader(table.Row{"Price", "Quatity"})

    for _, ask := range tickers.Asks {

        t2.AppendRow(table.Row{ask.Price, ask.Quantity})
    }

    fmt.Println(t2.Render())
}

The example creates two tables: one for the buys and one for the sells. 

var (
    apiKey    = os.Getenv("BINANCE_API_KEY")
    secretKey = os.Getenv("BINANCE_SECRET_KEY")
)
client := binance.NewClient(apiKey, secretKey)

We retrieve the data from the Binance exchange. In our account, we set up the 
API and Secret keys.

tickers, err := client.NewDepthService().Symbol("LTCBUSD").Limit(15).
    Do(context.Background())

The order book is retrieved with NewDepthService. We use the
LTCBUSD pair.

// Bids

t := table.NewWriter()
t.SetTitle("LTC")
t.SetCaption("Bids")
t.SetAutoIndex(true)
t.SetStyle(table.StyleColoredGreenWhiteOnBlack)
t.Style().Format.Header = text.FormatTitle
t.SetColumnConfigs([]table.ColumnConfig{
    {Number: 1, Align: text.AlignRight},
    {Number: 2, Align: text.AlignRight}})

These are the bids (buys). Traditionally, they are formatted in green colour. 
Therefore, we have chosen the table.StyleColoredGreenWhiteOnBlack
table style. We have also aligned the data to the right.

t.AppendHeader(table.Row{"Price", "Quatity"})

Each row has two columns: price and quantity.

for _, bid := range tickers.Bids {

    t.AppendRow(table.Row{bid.Price, bid.Quantity})
}

fmt.Println(t.Render())

We loop over the bids and append them to the table. The table is later rendered
to the console.

t2.SetStyle(table.StyleColoredRedWhiteOnBlack)

For the sells, we have chosen the table.StyleColoredRedWhiteOnBlack
style. 

for _, ask := range tickers.Asks {

    t2.AppendRow(table.Row{ask.Price, ask.Quantity})
}

fmt.Println(t2.Render())

We go over the asks, and append them to the second table. The table is rendered 
in the end.

## Source

[Go pretty - Github page](https://github.com/jedib0t/go-pretty)

In this article we have shown how to generate tables in the terminal in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).