+++
title = "Go echarts"
date = 2025-08-29T19:55:10.633+01:00
draft = false
description = "Learn how to create interactive charts in Go using the ECharts library. Includes examples of line, bar, and pie charts."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go echarts

last modified April 11, 2024

In this article we show how to create charts in Golang using the go-echarts
library.

The *go-echarts* is a charting library for Golang. Rather that producing
images, go-echarts utilizes the Apache ECharts JS library to generate charts
inside HTML documents.

With go-echarts it is possible to create interactive charts.

## Line chart

A line chart is a basic type of chart which displays information as a series of
data points connected by line segments. These lines can be either straight or
curved.

line_chart.go
  

package main

import (
    "os"

    "github.com/go-echarts/go-echarts/v2/charts"
    "github.com/go-echarts/go-echarts/v2/opts"
    "github.com/go-echarts/go-echarts/v2/types"
)

func main() {

    sals := []opts.LineData{{Value: 567}, {Value: 612}, {Value: 800},
        {Value: 980}, {Value: 1410}, {Value: 2350}}

    ages := []string{"18", "20", "25", "30", "40", "50"}

    line := charts.NewLine()

    line.SetGlobalOptions(
        charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeWesteros}),
        charts.WithTitleOpts(opts.Title{Title: "Average salary per age",
            Subtitle: "Slovakia"}),
    )

    line.SetXAxis(ages).AddSeries("salaries", sals)

    line.SetSeriesOptions(charts.WithLineChartOpts(
        opts.LineChart{
            Smooth: true,
        }))

    f, _ := os.Create("scatter.html")

    line.Render(f)
}

The example creates a line chart showing average salary per age.

sals := []opts.LineData{{Value: 567}, {Value: 612}, {Value: 800},
    {Value: 980}, {Value: 1410}, {Value: 2350}}

The salaries is a slice of opt.LineData structures. These are
values for the y-axis.

ages := []string{"18", "20", "25", "30", "40", "50"}

These strings are values for the x-axis.

line := charts.NewLine()

A line chart is initiated with charts.NewLine.

line.SetGlobalOptions(
    charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeWesteros}),
    charts.WithTitleOpts(opts.Title{Title: "Average salary per age",
        Subtitle: "Slovakia"}),
)

We initiate chart options; we set the chart theme, title and subtitle.

line.SetXAxis(ages).AddSeries("salaries", sals)

We set the data for the x-axis and y-axis.

line.SetSeriesOptions(charts.WithLineChartOpts(
    opts.LineChart{
        Smooth: true,
    }))

Our lines are smoothed, i.e. we have curves instead of straight lines.

f, _ := os.Create("scatter.html")

We create an HTML file where the chart will be written.

line.Render(f)

The chart is rendered with the Render function.

## Scatter chart

A scatter chart uses dots to represent values for two different numeric
variables, with one variable on each axis, to look for a relationship between
them.

scatter_chart.go
  

package main

import (
    "os"

    "github.com/go-echarts/go-echarts/v2/charts"
    "github.com/go-echarts/go-echarts/v2/opts"
    "github.com/go-echarts/go-echarts/v2/types"
)

func main() {

    temps := []opts.ScatterData{{Value: -7.3}, {Value: -3.4}, {Value: -5.0},
        {Value: -0.9}, {Value: -2.2}, {Value: 4.8}, {Value: 5.1}, {Value: -1.9},
        {Value: 0}, {Value: 2.6}}

    dates := []string{"Jan 1", "Jan 10", "Jan 12", "Jan 20", "Jan 30", "Feb 1",
        "Feb 2", "Feb 5", "Feb 8", "Feb 12"}

    scatter := charts.NewScatter()

    scatter.SetGlobalOptions(
        charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeWesteros}),
        charts.WithTitleOpts(opts.Title{Title: "Temperatures"}),
    )

    scatter.SetXAxis(dates).AddSeries("temps", temps)

    f, _ := os.Create("scatter.html")

    scatter.Render(f)
}

The chart displays temperatures for a series of dates. We use
opts.ScatterData structure to define y values and
charts.NewScatter to create a new scatter chart.

## Bar chart

A bar chart presents grouped data with rectangular bars with lengths
proportional to the values that they represent. We can have 2D and 3D bar charts
and the bars can be plotted vertically or horizontally.

bar_chart.go
  

package main

import (
    "os"

    "github.com/go-echarts/go-echarts/v2/charts"
    "github.com/go-echarts/go-echarts/v2/opts"
    "github.com/go-echarts/go-echarts/v2/types"
)

func main() {

    medals := []opts.BarData{{Value: 46},
        {Value: 38}, {Value: 29},
        {Value: 22}, {Value: 13}, {Value: 11}}

    countries := []string{"USA", "China", "UK", "Russia",
        "South Korea", "Germany"}

    bar := charts.NewBar()

    bar.SetGlobalOptions(
        charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeWesteros}),
        charts.WithTitleOpts(opts.Title{Title: "Olympic Gold medals in London"}))

    bar.SetXAxis(countries)
    bar.AddSeries("medals", medals)

    f, _ := os.Create("bar.html")

    bar.Render(f)
}

The code example uses a bar chart to show the number of Olympic gold medals per
country in London 2012. We use
opts.BarData structure to define y values and
charts.NewBar to create a new bar chart.

## Pie chart

A pie chart is a circular chart which is divided into slices to illustrate
numerical proportion.

pie_chart.go
  

package main

import (
    "os"

    "github.com/go-echarts/go-echarts/v2/charts"
    "github.com/go-echarts/go-echarts/v2/opts"
    "github.com/go-echarts/go-echarts/v2/types"
)

func main() {

    destinations := []opts.PieData{{Name: "Croatia", Value: 22},
        {Name: "Bohemia", Value: 34}, {Name: "Bulgaria", Value: 18},
        {Name: "Spain", Value: 5}, {Name: "Others", Value: 21}}

    pie := charts.NewPie()

    pie.SetGlobalOptions(
        charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeChalk}),
        charts.WithTitleOpts(opts.Title{Title: "Popular destinations"}),
    )

    pie.AddSeries("destinations", destinations)

    f, _ := os.Create("pie.html")

    pie.Render(f)
}

The example displays popular tourist destinations. We use
opts.PieData structure to define y values and
charts.NewPie to create a new pie chart.

## HTTP server generated chart

In the next example, we create a simple HTTP server that generates a chart.

net_chart.go
  

package main

import (
    "fmt"
    "log"
    "math/rand"
    "net/http"

    "github.com/go-echarts/go-echarts/v2/charts"
    "github.com/go-echarts/go-echarts/v2/opts"
    "github.com/go-echarts/go-echarts/v2/types"
)

func randomData() []opts.LineData {

    data := make([]opts.LineData, 0)
    for i := 0; i &lt; 7; i++ {
        data = append(data, opts.LineData{Value: rand.Intn(300)})
    }
    return data
}

func httpserver(w http.ResponseWriter, _ *http.Request) {

    line := charts.NewLine()

    line.SetGlobalOptions(
        charts.WithInitializationOpts(opts.Initialization{Theme: types.ThemeWesteros}),
        charts.WithTitleOpts(opts.Title{
            Title:    "Line charts",
            Subtitle: "Rendered by the http server",
        }))

    line.SetXAxis([]string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}).
        AddSeries("Category A", randomData()).
        AddSeries("Category B", randomData())

    line.SetSeriesOptions(charts.WithLineChartOpts(opts.LineChart{Smooth: true}))
    line.Render(w)
}

func main() {

    http.HandleFunc("/", httpserver)
    fmt.Println("Server started at port 8081")
    log.Fatal(http.ListenAndServe(":8081", nil))
}

The server listens at localhost:8081. It generates a chart
consisting of two curved lines. The data is generated randomly.

## Source

[Go echarts - Github page](https://github.com/go-echarts/go-echarts)

In this article we have created charts in Go with go-echarts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).