+++
title = "C# Spectre.Console"
date = 2025-08-29T19:51:25.499+01:00
draft = false
description = "C# Spectre.Console tutorial shows how to create console applications with Spectre.Console library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Spectre.Console

last modified July 5, 2023

 

In this article we show how to create C# console applications using the 
Spectre.Console library.

Spectre.Console is a .NET library for creating console
applications. It supports colours and styles in terminal text. It allows to 
create terminal widgets such as grids, tables or trees. It even has some basic 
charts.

$ dotnet add package Spectre.Console

We add the library to the project.

## Spectre.Console colours

We can write coloured text with AnsiConsole.Markup and 
AnsiConsole.MarkupLine methods.

Program.cs
  

using Spectre.Console;

AnsiConsole.MarkupLine("[steelblue]an old falcon[/]");
AnsiConsole.MarkupLine("[#ff0000]an old falcon[/]");
AnsiConsole.MarkupLine("[rgb(25,0,255)]an old falcon[/]");

AnsiConsole.MarkupLine("[bold gray on blue]an old falcon[/]");
AnsiConsole.MarkupLine("[bold steelblue on white]an old falcon[/]");

The example writes text in different colours.

AnsiConsole.MarkupLine("[steelblue]an old falcon[/]");
AnsiConsole.MarkupLine("[#ff0000]an old falcon[/]");
AnsiConsole.MarkupLine("[rgb(25,0,255)]an old falcon[/]");

The colour of the text can be specified in different ways. We can use names, 
HEX and RGB codes.

AnsiConsole.MarkupLine("[bold gray on blue]an old falcon[/]");
AnsiConsole.MarkupLine("[bold steelblue on white]an old falcon[/]");

We can also change the colour of the background.

## Spectre.Console styles

We have predefined styles, such as bold, italic, and strikethrough.

Program.cs
  

using Spectre.Console;

AnsiConsole.MarkupLine("[dim]an old falcon[/] ");
AnsiConsole.MarkupLine("[italic]an old falcon[/] ");
AnsiConsole.MarkupLine("[bold]an old falcon[/] ");
AnsiConsole.MarkupLine("[underline]an old falcon[/] ");
AnsiConsole.MarkupLine("[bold dim]an old falcon[/] ");
AnsiConsole.MarkupLine("[dim italic]an old falcon[/] ");
AnsiConsole.MarkupLine("[bold italic]an old falcon[/] ");
AnsiConsole.MarkupLine("[dim underline]an old falcon[/] ");
AnsiConsole.MarkupLine("[strikethrough]an old falcon[/] ");
AnsiConsole.MarkupLine("[bold strikethrough]an old falcon[/] ");
AnsiConsole.MarkupLine("[italic strikethrough]an old falcon[/] ");

In the program, we apply various styles on the text.

AnsiConsole.MarkupLine("[italic]an old falcon[/] ");

This line of text is displayed in italics.

AnsiConsole.MarkupLine("[dim italic]an old falcon[/] ");

The styles can be combined.

## Spectre.Console rules

A rule is a horizontal line with an title. The title can be justified. The 
rule is used as a decoration.

Program.cs
  

using Spectre.Console;

var rule = new Rule("[steelblue]Python[/]");
rule.LeftJustified();
AnsiConsole.Write(rule);

AnsiConsole.WriteLine(@"Python is a general-purpose, dynamic, object-oriented
programming language. The design purpose of the Python language
emphasizes programmer productivity and code readability.");

var rule2 = new Rule("[skyblue1]F#[/]");
rule2.Centered();
AnsiConsole.Write(rule2);

AnsiConsole.WriteLine(@"F# is a universal programming language for writing succinct,
robust and performant code.");

var rule3 = new Rule("[indianred]Go[/]");
rule3.RightJustified();
AnsiConsole.Write(rule3);

AnsiConsole.WriteLine(@"Go is an open source programming language that makes it easy to
build simple, reliable, and efficient software. Go is a statically
typed, compiled programming language.");

In the program, we use three rules. 

var rule = new Rule("[steelblue]Python[/]");
rule.LeftJustified();
AnsiConsole.Write(rule);

We create the first blue. The title has steelblue colour and is justified to the 
left.

## Spectre.Console panel

A panel is a widget which organizes text in a rendered box.

Program.cs
  

using Spectre.Console;

var txt1 = @"Python is a general-purpose, dynamic, object-oriented
programming language. The design purpose of the Python language
emphasizes programmer productivity and code readability.";

var header1 = new PanelHeader("Python");
var pnl1 = new Panel(txt1);
pnl1.Header = header1;

AnsiConsole.Write(pnl1);

var txt2 = @"F# is a universal programming language for writing succinct,
robust and performant code.";

var header2 = new PanelHeader("F#");
var pnl2 = new Panel(txt2);
pnl2.Header = header2;

AnsiConsole.Write(pnl2.AsciiBorder().HeaderAlignment(Justify.Center));

The program creates two panels. 

var header1 = new PanelHeader("Python");
var pnl1 = new Panel(txt1);
pnl1.Header = header1;

AnsiConsole.Write(pnl1);

A panel consists of a header and a box.

AnsiConsole.Write(pnl2.AsciiBorder().HeaderAlignment(Justify.Center));

It is possible to modify the panel border and the header alignment.

## Spectre.Console JSon.Text

Spectre.Console can pretty-print JSON data.

$ dotnet add package Spectre.Json.Text

We need to add the Spectre.Json.Text package.

Program.cs
  

using Spectre.Console;
using Spectre.Console.Json;

var client = new HttpClient();
var content = await client.GetStringAsync("http://webcode.me/users.json");

var json = new JsonText(content);

AnsiConsole.Write(
       new Panel(json)
           .Header("Users")
           .Collapse()
           .RoundedBorder()
           .BorderColor(Color.CadetBlue));

In the example, we retrieve JSON data from a web resource and display it in 
a panel.

var client = new HttpClient();
var content = await client.GetStringAsync("http://webcode.me/users.json");

With HttpClient, we retrieve the JSON data.

var json = new JsonText(content);

We pass the data into the JsonText.

AnsiConsole.Write(
  new Panel(json)
      .Header("Users")
      .Collapse()
      .RoundedBorder()
      .BorderColor(Color.CadetBlue));

The JsonText is rendered in a panel. 

## Spectre.Console Grid

A grid is a widget which shows data in a set or columns and rows. There is also
a more complex widget called table.

$ dotnet add package Binance.Net

For this example, we need the Binance.Net library.

Program.cs
  

using Binance.Net.Clients;
using Spectre.Console;

using var client = new BinanceClient();

var ires = await client.SpotApi.ExchangeData.GetTickerAsync("LTCBUSD");
var data = ires.Data;

var grid = new Grid()
       .AddColumn(new GridColumn().NoWrap().PadRight(4))
       .AddColumn()
       .AddRow("Last price", $"{data.LastPrice}")
       .AddRow("Open price", $"{data.OpenPrice}")
       .AddRow("High price", $"{data.HighPrice}")
       .AddRow("Low price", $"{data.LowPrice}")
       .AddRow("Price change", $"{data.PriceChange}")
       .AddRow("Price change (%)", $"{data.PriceChangePercent}");

AnsiConsole.Write(grid);

In the program, we get the ticker data for the LTCBUSD symbol and display it 
in a grid widget.

$ dotnet run
Last price          91.27000000
Open price          91.58000000
High price          92.94000000
Low price           89.89000000
Price change        -0.31000000
Price change (%)    -0.338

## Spectre.Console Table

More complex tabular data can be dispayed in a Table widget.

Program.cs
  

using Binance.Net.Clients;
using Spectre.Console;

using var client = new BinanceClient();

var ires = await client.SpotApi.ExchangeData.GetTickerAsync("LTCBUSD");
var data = ires.Data;

var table = new Table()
          .Border(TableBorder.Ascii)
          .BorderColor(Color.SteelBlue)
          .AddColumn(new TableColumn("OHLC").LeftAligned())
          .AddColumn(new TableColumn("Value").RightAligned())
          .AddRow("Last price", $"{data.LastPrice}")
          .AddRow("Open price", $"{data.OpenPrice}")
          .AddRow("High price", $"{data.HighPrice}")
          .AddRow("Low price", $"{data.LowPrice}")
          .AddRow("Price change", $"{data.PriceChange}")
          .AddRow("Price change (%)", $"{data.PriceChangePercent:0.00000000}");

AnsiConsole.Write(table);

We get the ticker data for the LTCBUSD and dispay it in a table.

$ dotnet run
+--------------------------------+
| OHLC             |       Value |
|------------------+-------------|
| Last price       | 91.42000000 |
| Open price       | 92.22000000 |
| High price       | 92.94000000 |
| Low price        | 89.89000000 |
| Price change     | -0.80000000 |
| Price change (%) | -0.86700000 |
+--------------------------------+

## Source

[https://spectreconsole.net](https://spectreconsole.net/)

In this article we have used Spectre.Console to create console 
applications in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).