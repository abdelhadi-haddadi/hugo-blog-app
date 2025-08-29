+++
title = "C# Playwright"
date = 2025-08-29T19:51:14.191+01:00
draft = false
description = "C# PostgreSQL tutorial shows how to automate browsers in C# using Microsoft Playwright library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Playwright

last modified July 5, 2023

 

C# Playwright tutorial shows how to automate browsers in C# using Microsoft
Playwright library.

## Playwright

Playwright is a cross-broser automation library created by Microsoft. It
supports all modern rendering engines including Chromium, WebKit, and Firefox.

Playwright can be used in Node, Python, .NET and JVM.

Playwright allows to use a browser in a headless mode (the default mode), which
works without the UI. This is great for scripting.

Before using Playwright, we need to download support for browsers.

$ dotnet tool update --global PowerShell

We update the PowerShell tool. 

$ playwright.ps1 install

We need to run the script which downloads the DLLs. The script is located in 
bin/Debug/net6.x subdirectory.

$ dotnet add package Microsoft.Playwright

The programming library is installed with the dotnet add package
command.

## C# Playwright get title

In the first example, we get the title of a web page.

Program.cs
  

using Microsoft.Playwright;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();
await page.GotoAsync("http://webcode.me");

var title = await page.TitleAsync();
Console.WriteLine(title);

The example makes an asynchronous request to a website and retrieves its title.

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

We set up the Playwright and the browser engine.

var page = await browser.NewPageAsync();

The NewPageAsync creates a new page in a new browser context.

await page.GotoAsync("http://webcode.me");

We create an asynchronous request to webcode.me using GotoAsync.

var title = await page.TitleAsync();
Console.WriteLine(title);

The website's title is retrieved with TitleAsync.

$ dotnet run
My html page

## C# Playwright headers

The next example adds headers to the request.

Program.cs
  

using Microsoft.Playwright;
using System.Text;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();

var ehds = new Dictionary&lt;string, string&gt;{ {"User-Agent", "C# program" } };
await page.SetExtraHTTPHeadersAsync(ehds);

var resp = await page.GotoAsync("http://webcode.me/ua.php");
var body = await resp!.BodyAsync();

Console.WriteLine(Encoding.UTF8.GetString(body));

We set the User-Agent header to the request.

var ehds = new Dictionary&lt;string, string&gt;{ {"User-Agent", "C# program" } };
await page.SetExtraHTTPHeadersAsync(ehds);

The header value is set with SetExtraHTTPHeadersAsync.

var resp = await page.GotoAsync("http://webcode.me/ua.php");
var body = await resp!.BodyAsync();

Console.WriteLine(Encoding.UTF8.GetString(body));

We go to a PHP resource which returns the user agent name. We retrieve it from 
the response body with BodyAsync.

$ dotnet run
C# program

## C# Playwright create screenshot

The next example creates a screenshot of a web page.

Program.cs
  

using Microsoft.Playwright;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync(new() { Headless = false });

var page = await browser.NewPageAsync();

await page.GotoAsync("http://webcode.me");
await page.ScreenshotAsync(new() { Path = "screenshot.png" });

A screenshot is created with ScreenshotAsync. In addition, we 
run the program in GUI by setting the Headless option to false.

## C# Playwright click on element

The ClickAsync method clicks an element matching the selector.

Program.cs
  

using Microsoft.Playwright;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();

await page.GotoAsync("http://example.com");
await page.ClickAsync("a");

var title = await page.TitleAsync();

Console.WriteLine(title);

In the example, we go to a website and click on its link. The link navigates 
use to another website, whose title we grab and print.

$ dotnet run
IANA-managed Reserved Domains

## C# Playwright finding elements

The QuerySelectorAllAsync method finds all elements matching the
specified selector within the page, while the QuerySelectorAsync 
method finds the first element matching the specified selector.

Program.cs
  

using Microsoft.Playwright;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();

await page.GotoAsync("http://webcode.me");

var es1 = await page.QuerySelectorAllAsync("p");

foreach (var e in es1)
{
    var r = await e.TextContentAsync();
    Console.WriteLine(r);
}

var e2 = await page.QuerySelectorAsync("p");
var r2 = await e2!.TextContentAsync();

Console.WriteLine(r2);

The example selects text content from the webpage paragraphs. The text content 
of an element is retrieved with TextContentAsync.

## C# Playwright monitor requests and responses

The Request event handler is emitted when a page issues a request.
The Respose event handler is emitted when response is received for
a request.

Program.cs
  

using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();

var opts = new BrowserTypeLaunchOptions() { Headless = false };
await using var browser = await playwright.Chromium.LaunchAsync(opts);

var page = await browser.NewPageAsync();
page.Request += (_, req) =&gt; Console.WriteLine($"&gt;&gt; {req.Method} {req.Url}");
page.Response += (_, resp) =&gt; Console.WriteLine($"&lt;&lt; {resp.Status} {resp.Url}");

var url = "http://webcode.me";
await page.GotoAsync(url);

We log a message for each request and response.

$ dotnet run
&gt;&gt; GET http://webcode.me/
&lt;&lt; 200 http://webcode.me/
&gt;&gt; GET http://webcode.me/format.css
&lt;&lt; 200 http://webcode.me/format.css

## Source

[Playwright documentation](https://playwright.dev/dotnet/docs/intro)

In this article we have used Playwright library to automate browsers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).