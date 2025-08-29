+++
title = "Go Binance"
date = 2025-08-29T19:55:01.769+01:00
draft = false
description = "Learn how to use the Binance API in Go. Includes examples of fetching cryptocurrency data."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Binance

last modified April 11, 2024

In this article we show how to work with Binance exchange in Go using the 
go-binance package.

The go-binance is an unofficial Golang SDK for binance API. Binance
is a popular cryptocurrency exchange. Binance offers both public and private
APIs. For private APIs, we need to provide the API keys. 

## Golang Binance list of symbols

A symbol is a trading pair. It consists of a base asset and a quote asset. Given
a symbol LTCBUSD, LTC stands for the base asset and BUSD stands for the quote
asset.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/adshao/go-binance/v2"
)

func main() {
    
    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )
 
    client := binance.NewClient(apiKey, secretKey)

    res, err := client.NewExchangeInfoService().Symbols().Do(context.Background())

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(len(res.Symbols))

    for _, e := range res.Symbols {

        fmt.Printf("%s %s %s %s\n", e.Symbol, e.Status, e.BaseAsset, e.QuoteAsset)
    }
}

In the program, we list all the available symbols on Binance.

var (
    apiKey    = os.Getenv("BINANCE_API_KEY")
    secretKey = os.Getenv("BINANCE_SECRET_KEY")
)

client := binance.NewClient(apiKey, secretKey)

We initiate the client. The keys are stored in environment variables.

res, err := client.NewExchangeInfoService().Symbols().Do(context.Background())

We call the NewExchangeInfoService service.

for _, e := range res.Symbols {

    fmt.Printf("%s %s %s %s\n", e.Symbol, e.Status, e.BaseAsset, e.QuoteAsset)
}

We go through the list and print them to the console. We print the symbol name,
status, base and quote assets.

$ go run main.go
2206
ETHBTC TRADING ETH BTC
LTCBTC TRADING LTC BTC
BNBBTC TRADING BNB BTC
NEOBTC TRADING NEO BTC
...

## Golang Binance check balance

In the next example, we look at the asset balances.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strconv"

    "github.com/adshao/go-binance/v2"
)

func main() {

    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )

    client := binance.NewClient(apiKey, secretKey)

    res, err := client.NewGetAccountService().Do(context.Background())

    if err != nil {

        log.Fatal(err)
    }

    for _, e := range res.Balances {

        free, _ := strconv.ParseFloat(e.Free, 32)
        locked, _ := strconv.ParseFloat(e.Locked, 32)

        if free &gt; 0 || locked &gt; 0 {

            fmt.Printf("%-5s %18f %10f\n", e.Asset, free, locked)
        }
    }
}

In the program we check the balances of all assets which are greater than 0.

res, err := client.NewGetAccountService().Do(context.Background())

We call the NewGetAccountService.

for _, e := range res.Balances {

    free, _ := strconv.ParseFloat(e.Free, 32)
    locked, _ := strconv.ParseFloat(e.Locked, 32)

    if free &gt; 0 || locked &gt; 0 {

        fmt.Printf("%-5s %18f %10f\n", e.Asset, free, locked)
    }
}

We go over the balances in a for loop. The free amounts are freely available,
while the locked are currently locked in existing orders.

## Golang Binance list prices

To list current prices, we call the NewListPricesService service.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strconv"

    "github.com/adshao/go-binance/v2"
)

func main() {
    
    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )
    client := binance.NewClient(apiKey, secretKey)

    res, err := client.NewListPricesService().
        Do(context.Background())

    if err != nil {

        log.Fatal(err)
    }

    for _, e := range res {

        price, _ := strconv.ParseFloat(e.Price, 32)
        fmt.Printf("%-14s %20f\n", e.Symbol, price)
    }
}

The example list prices for all symbols.

$ go run main.go
ETHBTC                     0.065500
LTCBTC                     0.003044
BNBBTC                     0.011405
NEOBTC                     0.000350
QTUMETH                    0.001455
EOSETH                     0.000541
SNTETH                     0.000014
BNTETH                     0.000250
...

In the next example, we check for the current price of a specific symbol.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strconv"

    "github.com/adshao/go-binance/v2"
)

func main() {
    
    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )

    client := binance.NewClient(apiKey, secretKey)

    res, err := client.NewListPricesService().Symbol("LTCUSDT").
        Do(context.Background())

    if err != nil {
        log.Fatal(err)
    }

    for _, e := range res {

        price, _ := strconv.ParseFloat(e.Price, 32)
        fmt.Printf("%-14s %20f\n", e.Symbol, price)
    }
}

With the Symbol function, we check the price of the
LTCUSDT pair.

Finally, we check for the price of selected few symbols.

main.go
  

package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strconv"

    "github.com/adshao/go-binance/v2"
)

func main() {
    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )
    client := binance.NewClient(apiKey, secretKey)

    res, err := client.NewListPricesService().Symbols([]string{"LTCBUSD", "LTCUSDT", "LTCBTC", "LTCETH"}).
        Do(context.Background())

    if err != nil {
        log.Fatal(err)
    }

    for _, e := range res {

        price, _ := strconv.ParseFloat(e.Price, 32)
        fmt.Printf("%-14s %20f\n", e.Symbol, price)
    }
}

To list the price of a few symbols, we use the Symbols function.

$ go run main.go
LTCBTC                     0.003042
LTCETH                     0.046490
LTCUSDT                   86.349998
LTCBUSD                   86.370003

## Golang Binance list orders

The NewListOrdersService is used to list executed orders. 

main.go
  

package main

import (
    "context"
    "log"
    "os"
    "time"

    "github.com/adshao/go-binance/v2"
    "github.com/fatih/color"
    "github.com/rodaine/table"
)

func main() {

    var (
        apiKey    = os.Getenv("BINANCE_API_KEY")
        secretKey = os.Getenv("BINANCE_SECRET_KEY")
    )

    client := binance.NewClient(apiKey, secretKey)

    orders, err := client.NewListOrdersService().Symbol("FTMBUSD").
        Do(context.Background())

    if err != nil {

        log.Fatal(err)
    }

    tbl := table.New("Date", "Symbol", "Price", "Qty", "Side", "Type", "Status")
    headerFmt := color.New(color.FgGreen, color.Underline).SprintfFunc()
    columnFmt := color.New(color.FgBlue).SprintfFunc()

    tbl.WithHeaderFormatter(headerFmt).WithFirstColumnFormatter(columnFmt)

    for _, o := range orders {

        t := time.UnixMilli(o.Time)
        tf := t.Format("Jan 2, 2006")

        tbl.AddRow(tf, o.Symbol, o.Price, o.ExecutedQuantity, string(o.Side),
            string(o.Type), string(o.Status))

    }

    tbl.Print()
}

The program lists orders for the FTMBUSD. The data is displayed in a neat table.
The table is created with the rodaine/table package. Colours are 
created with the fatih/color package.

orders, err := client.NewListOrdersService().Symbol("FTMBUSD").
    Do(context.Background())

We call the service for the FTMBUSD symbol.

tbl := table.New("Date", "Symbol", "Price", "Qty", "Side", "Type", "Status")
headerFmt := color.New(color.FgGreen, color.Underline).SprintfFunc()
columnFmt := color.New(color.FgBlue).SprintfFunc()

tbl.WithHeaderFormatter(headerFmt).WithFirstColumnFormatter(columnFmt)

We set up the header columns and their formats.

for _, o := range orders {

    t := time.UnixMilli(o.Time)
    tf := t.Format("Jan 2, 2006")

    tbl.AddRow(tf, o.Symbol, o.Price, o.ExecutedQuantity, string(o.Side),
        string(o.Type), string(o.Status))

}

We go over the fetched orders and add them to the table.

tbl.Print()

Finally, the table is printed to the console.

## Order book

An order book is a list of current buy orders (bids) and sell orders (asks) for
a specific asset. An order book lists buy/sell order prices and the amount of
the units of tokens to buy and sell.

The bids are represented by green numbers, while the asks by red numbers.

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

The program shows the order book for the LTCBUSD symbol on the Binance exchange.
The buys are displayed in a green table and the sells in a red table.
We use the go-pretty package to create the tables.

tickers, err := client.NewDepthService().Symbol("LTCBUSD").Limit(15).
    Do(context.Background())

The order book is retrieved with the NewDepthService. We limit 
the amount of rows to 15.

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

We set up the table for the bids/buys.

for _, bid := range tickers.Bids {

    t.AppendRow(table.Row{bid.Price, bid.Quantity})
}

fmt.Println(t.Render())

We fill the table with data and render it to the console. The bids are accessed 
via the Bids field.

## Source

[Go binance - Github page](https://github.com/adshao/go-binance)

In this article we have worked with the Binance exchange in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).