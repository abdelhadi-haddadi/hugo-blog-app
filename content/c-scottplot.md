+++
title = "C# ScottPlot"
date = 2025-08-29T19:51:21.052+01:00
draft = false
description = "C# ScottPlot tutorial shows how to create charts in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ScottPlot

last modified July 5, 2023

 

In this article we show how to generate charts in C# using ScottPlot library.

ScottPlot is an open source library for creating charts in .NET. We
can create various types of charts including scatter charts, line charts, bar
chars, pie chars, or candlestick charts.

$ dotnet add package ScottPlot

We add the library to the project.

## Line chart example

A line chart is a basic type of chart which displays information as a series of
data points connected by line segments. These lines can be either straight or
curved.

Program.cs
  

using ScottPlot;
using System.Drawing;

var plt = new ScottPlot.Plot(600, 400);

double[] xs = DataGen.Consecutive(51);
double[] ys = DataGen.Sin(pointCount:51, offset:10);

plt.AddScatterLines(xs, ys, Color.Red, 3);

plt.SaveFig("lineplot.png");

In the example, we create a simple line chart. We save the chart to a PNG image.

var plt = new ScottPlot.Plot(600, 400);

We create a plottable object of 600x400. 

double[] xs = DataGen.Consecutive(51);

For the x values, we generates an array of numbers with constant spacing using
the DataGen.Consecutive method.

double[] ys = DataGen.Sin(pointCount:51, offset:10);

For the y values, we generate an array of values with the
DataGen.Sin function.

plt.AddScatterLines(xs, ys, Color.Red, 3);

We add the line chart to the plottable with AddScatterLines. 
We provide the x and y values, colour of the line, and width of the line.

plt.SaveFig("lineplot.png");

In the next example, we draw a cos function.

Program.cs
  

using ScottPlot;
using System.Drawing;

var plt = new ScottPlot.Plot(600, 400);

double[] xs = DataGen.Consecutive(100);
double[] ys = DataGen.Cos(pointCount:100, offset:10);

plt.AddScatterLines(xs, ys, Color.Blue, 2, LineStyle.Dash);

plt.SaveFig("lineplot2.png");

The line is blue and its style is dashed.

## Chart title, labels &amp; margins

In the following example, we set a chart title, labels, and margins.

Program.cs
  

using ScottPlot;

var plt = new ScottPlot.Plot(650, 450);

plt.AddSignal(DataGen.Sin(51));
plt.AddSignal(DataGen.Cos(51));

plt.Margins(x: .15, y: .15);
plt.Style(Style.Gray1);
plt.Title("Signal plot");
plt.XLabel("x values");
plt.YLabel("y values");

plt.Layout(top: 30, bottom: 30);

plt.SaveFig("labels.png");

The program draws two charts: a sin and cos functions.

plt.AddSignal(DataGen.Sin(51));
plt.AddSignal(DataGen.Cos(51));

With AddSignal, we generate line charts that are rendered very
fast.

plt.Margins(x: .15, y: .15);

We set the margins with Margins. The data occupies 85% of
horizontal and vertical space.

plt.Style(Style.Gray1);

We set the chart style with Style.

plt.Title("Signal plot");

The title of the chart is set with Title.

plt.XLabel("x values");
plt.YLabel("y values");

We set the x and y labels.

plt.Layout(top: 30, bottom: 30);

We set the padding around the whole chart.

## Time series

A time series is a data set that tracks a sample over time.

Program.cs
  

using ScottPlot;

var plt = new ScottPlot.Plot(600, 400);

var now = DateTime.UtcNow;
var begin = now.AddDays(-30);

DateTime[] myDates = new DateTime[30];

for (int i = 0; i &lt; myDates.Length; i++)
{
    myDates[i] = now.AddDays(i + 1);
}

double[] xs = myDates.Select(x =&gt; x.ToOADate()).ToArray();
double[] ys = DataGen.RandomWalk(myDates.Length);
plt.AddScatter(xs, ys);

plt.XAxis.DateTimeFormat(true);

plt.SaveFig("plot.png");

In the program, we plot a time series data.

var now = DateTime.UtcNow;
var begin = now.AddDays(-30);

We plot data for the last thirty days.

DateTime[] myDates = new DateTime[30];

for (int i = 0; i &lt; myDates.Length; i++)
{
    myDates[i] = now.AddDays(i + 1);
}

We create an array of thirty DateTime values.

double[] xs = myDates.Select(x =&gt; x.ToOADate()).ToArray();

We convert DateTimes to doubles before plotting.

double[] ys = DataGen.RandomWalk(myDates.Length);

We generate an array of random double values with
DataGen.RandomWalk.

plt.AddScatter(xs, ys);

We add the chart to the plottable.

plt.XAxis.DateTimeFormat(true);

We display tick labels using a time format.

## Bar chart example

A bar chart presents grouped data with rectangular bars with lengths
proportional to the values that they represent. The bars can be plotted
vertically or horizontally.

Program.cs
  

using System.Drawing;

var plt = new ScottPlot.Plot(650, 450);

double[] positions = { 0, 1, 2, 3 };
double[] values = { 26, 20, 23, 7 };
string[] labels = { "Product A", "Product B", "Product C", "Product D" };

plt.Title("Sales");

var bar = plt.AddBar(values, positions);
bar.FillColor = Color.SteelBlue;
bar.BorderColor = Color.SteelBlue;

bar.ShowValuesAboveBars = true;
bar.Font.Color = Color.SteelBlue;
bar.Font.Size = 16;
bar.Font.Bold = true;

plt.XTicks(positions, labels);
plt.SetAxisLimits(yMin: 0);

plt.SaveFig("barchart.png");

The program draws sales of four products with a bar chart.

double[] positions = { 0, 1, 2, 3 };
double[] values = { 26, 20, 23, 7 };
string[] labels = { "Product A", "Product B", "Product C", "Product D" };

We define x and y values and the labels.

var bar = plt.AddBar(values, positions);

We create a bar chart with AddBar.

bar.FillColor = Color.SteelBlue;
bar.BorderColor = Color.SteelBlue;

We set the fill and border colours of the bars.

bar.ShowValuesAboveBars = true;

We show values above the bars.

bar.Font.Color = Color.SteelBlue;
bar.Font.Size = 16;
bar.Font.Bold = true;

We modify the font settings.

plt.XTicks(positions, labels);

We set the ticks. If not set manually, they are autogenerated.

plt.SetAxisLimits(yMin: 0);

We set the distance of the start of the y axis.

In the next example, we draw a horizontal bar chart.

Program.cs
  

using ScottPlot;

var plt = new ScottPlot.Plot(650, 450);

double[] positions = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };
double[] values = { 543, 31, 5, 5, 22, 5, 37, 31, 27, 4, 6, 15, 49, 19, 7};

var oprs = new string[] { "Katarakta",
        "PPV /vitrektómia/",
        "Serkláž",
        "Operácia glaukómu",
        "Blefaroplastika",
        "Pterýgium",
        "Chalaseon",
        "Xantelazma",
        "Cysta+tu papil",
        "Entropium, Ektropium",
        "Elektrokoagulácia",
        "Laser sietnice",
        "Jag laser",
        "Iridotómia",
        "Iné",
};

plt.Title("Očné operácie v nemocnici Agel Košice-Šaca za r. 2022");
plt.XLabel("Počet operácií");
plt.YTicks(positions, oprs);

var bar = plt.AddBar(values, positions);
bar.Orientation = Orientation.Horizontal;
plt.YAxis.Layout(padding: 45);

plt.SaveFig("barchart2.png");

The program generates a horizontal bar chart depicting eye surgeries in a
hospital.

var oprs = new string[] { "Katarakta",
    "PPV /vitrektómia/",
    "Serkláž",
    "Operácia glaukómu",
    "Blefaroplastika",
    "Pterýgium",
    "Chalaseon",
    "Xantelazma",
    "Cysta+tu papil",
    "Entropium, Ektropium",
    "Elektrokoagulácia",
    "Laser sietnice",
    "Jag laser",
    "Iridotómia",
    "Iné",
};

These are names of various eye surgeries. We chose a horizontal bar chart
because these names are long for a vertical bar chart.

bar.Orientation = Orientation.Horizontal;

We set the chart orientation to Orientation.Horizontal.

plt.YAxis.Layout(padding: 45);

We make space for the labels.

Finally, we save the chart into a PNG file.

## Source

[ScottPlot cookbook](https://scottplot.net/cookbook/)

In this article we generated charts in C# with the ScottPlot library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).