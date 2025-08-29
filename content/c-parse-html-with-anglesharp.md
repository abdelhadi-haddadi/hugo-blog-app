+++
title = "C# parse HTML with AngleSharp"
date = 2025-08-27T23:22:42.478+01:00
draft = false
description = "C# AngleSharp tutorial shows how to parse HTML
in C# with AngleSharp library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# parse HTML with AngleSharp

last modified July 5, 2023

 

C# AngleSharp tutorial shows how to parse HTML in C# with AngleSharp library.

The library can also parse SVG, MathML, or XML.

Document Object Model (DOM) is a standard tree structure, where each
node contains one of the components from an XML structure. Element nodes and
text nodes are the two most common types of nodes. With DOM functions we can
create nodes, remove nodes, change their contents, and traverse the node
hierarchy.

Nodes, elements, and tags are synonyms.

words.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Words&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul&gt;
    &lt;li&gt;sky&lt;/li&gt;
    &lt;li&gt;cup&lt;/li&gt;
    &lt;li&gt;water&lt;/li&gt;
    &lt;li&gt;cloud&lt;/li&gt;
    &lt;li&gt;bear&lt;/li&gt;
    &lt;li&gt;wolf&lt;/li&gt;
&lt;/ul&gt;

&lt;/body&gt;
&lt;/html&gt;

In a few examples, we use this HTML file.

## C# AngleSharp parse HTML string

In the first example, we read a HTML document from a string.

Program.cs
  

using AngleSharp;

var html = @"
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;My Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Heading I&lt;/h1&gt;
&lt;p&gt;Paragraph I&lt;/p&gt;
&lt;p&gt;Paragraph II&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;";

var config = Configuration.Default;
using var context = BrowsingContext.New(config);
using var doc = await context.OpenAsync(req =&gt; req.Content(html));

Console.WriteLine(doc.Title);
Console.WriteLine(doc.Body.InnerHtml.Trim());
Console.WriteLine(doc.FirstChild.NodeName.ToLower());
Console.WriteLine(doc.LastChild.NodeName.ToLower());

We print  the document's title, body, and first and the last child name.

var config = Configuration.Default;
using var context = BrowsingContext.New(config);

To set up AngleSharp, we define a BrowsingContext to which we pass 
a Configuration.

using var doc = await context.OpenAsync(req =&gt; req.Content(html));

The document is loaded with OpenAsync.

Console.WriteLine(doc.Title);

With Title attribute, we get the title of the document.

Console.WriteLine(doc.Body.InnerHtml.Trim());

Through the Body attribute, we get the inner HTML of the document's 
body.

Console.WriteLine(doc.FirstChild.NodeName.ToLower());
Console.WriteLine(doc.LastChild.NodeName.ToLower());

We get the names of the first and last children of the document.

$ dotnet run
My Title
&lt;h1&gt;Heading I&lt;/h1&gt;
&lt;p&gt;Paragraph I&lt;/p&gt;
&lt;p&gt;Paragraph II&lt;/p&gt;
html
html

## C# AngleSharp QuerySelectorAll

The QuerySelectorAll method returns a list of the elements within
the document that match the specified group of selectors.

Program.cs
  

using AngleSharp;
using AngleSharp.Dom;

var html = @"
&lt;html&gt;
&lt;p&gt;words&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;sky&lt;/li&gt;
&lt;li&gt;cup&lt;/li&gt;
&lt;li&gt;rock&lt;/li&gt;
&lt;li&gt;water&lt;/li&gt;
&lt;/ul&gt;
&lt;/html&gt;";

using var context = BrowsingContext.New(Configuration.Default);
using var doc = await context.OpenAsync(req =&gt; req.Content(html));
var els = doc.QuerySelectorAll("li");

foreach (var e in els)
{
    Console.WriteLine(e.Text());
}

In the example, we get all li tags. With the Text
method, we get the content text of the node.

$ dotnet run
sky
cup
rock
water

## C# AngleSharp parse HTML file

In the following example, we load the document from an HTML file.

Program.cs
  

using AngleSharp;

var html = File.ReadAllText(@"/home/janbodnar/Documents/words.html");

var config = Configuration.Default;
using var context = BrowsingContext.New(config);
using var doc = await context.OpenAsync(req =&gt; req.Content(html));

var lis = doc.QuerySelectorAll("li");

foreach (var li in lis)
{
    Console.WriteLine(li.InnerHtml);
}

We read the HTML file into a string with File.ReadAllText. 
Then we select all li tags and print their inner HTML. 
(In this case it is equal to the Text method.)

## C# AngleSharp modify document

In the following example, we load an HTML file and modify it. The modified 
document is written to the disk.

Program.cs
  

using AngleSharp;
using AngleSharp.Text;

var html = File.ReadAllText(@"/home/janbodnar/words.html");

var config = Configuration.Default;
using var context = BrowsingContext.New(config);
using var doc = await context.OpenAsync(req =&gt; req.Content(html));

var wli = doc.CreateElement("li");
wli.TextContent = "smile";

var ul = doc.QuerySelector("ul");
ul.FirstElementChild.Remove();
ul.AppendChild(wli);

var p = doc.CreateElement("p");
p.TextContent = $"New paragraph{Symbols.NoBreakSpace}";
doc.Body.AppendChild(p);

File.WriteAllText("/home/janbodnar/words2.html", doc.ToHtml());

In the example, we add a two elements and remove one element.

var wli = doc.CreateElement("li");
wli.TextContent = "smile";

A new element is created with CreateElement. We set its content 
using the TextContent attribute.

var ul = doc.QuerySelector("ul");
ul.FirstElementChild.Remove();
ul.AppendChild(wli);

We locate the ul element and remove its first child with
Remove. Then we append the newly created element with
AppendChild.

var p = doc.CreateElement("p");
p.TextContent = $"New paragraph{Symbols.NoBreakSpace}";
doc.Body.AppendChild(p);

We also add a paragraph at the end of the body.

File.WriteAllText("/home/janbodnar/words2.html", doc.ToHtml());

The modified document is saved to the disk with WriteAllText.

## C# AngleSharp parse HTML page

In the next example, we load an HTML page from a simple website.

Program.cs
  

using AngleSharp;
using AngleSharp.Dom;

var config = Configuration.Default.WithDefaultLoader();
using var context = BrowsingContext.New(config);

var url = "http://webcode.me";

using var doc = await context.OpenAsync(url);
// var title = doc.QuerySelector("title").InnerHtml;
var title = doc.Title;

Console.WriteLine(title);

var pars = doc.QuerySelectorAll("p");

foreach (var par in pars)
{
    Console.WriteLine(par.Text().Trim());
}

From the page's HTML document, we get its title and the content of the two
paragraphs.

var config = Configuration.Default.WithDefaultLoader();

To enable reading from HTML pages, we call the WithDefaultLoader
method.

$ dotnet run
My html page
Today is a beautiful day. We go swimming and fishing.
Hello there. How are you?

## C# async parsing of HTML pages

In the next example, we asynchronously parse several HTML pages.

Program.cs
  

using AngleSharp;
using AngleSharp.Dom;

var urls = new[] {
    "http://webcode.me", "http://example.com",
    "http://httpbin.org", "https://google.com", 
    "https://www.rust-lang.org/", "https://golang.org/",
    "https://fsharp.org/", "https://clojure.org/",
    "https://www.perl.org/", "https://gnu.org"
};

var config = Configuration.Default.WithDefaultLoader();
using var context = BrowsingContext.New(config);

var docs = new List&lt;Task&lt;IDocument&gt;&gt;();

foreach (var url in urls)
{
    docs.Add(context.OpenAsync(url));
}

Task.WaitAll(docs.ToArray());

foreach (var t in docs)
{
    var res = t.Result;
    Console.WriteLine(res.Title);

    res.Dispose();
}

The example asynchronously loads several web pages and parses their titles.

$ dotnet run
My html page
Example Domain
httpbin.org
Google
Rust Programming Language
The Go Programming Language
F# Software Foundation
Clojure
The Perl Programming Language - www.perl.org
The GNU Operating System and the Free Software Movement

## C# AngleSharp search results

In the next example, we submit a request to the Google search engine and process 
the result. 

Program.cs
  

using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Html.Dom;

using var context = BrowsingContext.New(Configuration.Default.WithDefaultLoader());
using var doc = await context.OpenAsync("https://www.google.com/");
var form = doc.QuerySelector&lt;IHtmlFormElement&gt;("form[action='/search']");

var term = "F# language";

using var res = await form.SubmitAsync(new {q = term});
var links = res.QuerySelectorAll&lt;IHtmlAnchorElement&gt;("a");

foreach (var link in links)
{
    var val = link.Attributes["href"].Value;
    
    if (!val.Contains("google"))
    {
        var rx = new Regex(@"(/url\?q=)([^&amp;]*)(\&amp;)", RegexOptions.Compiled);
        var match = rx.Match(val);

        if (match.Success)
        {
            Console.WriteLine(match.Groups[2]);
        }
    }
}

The example prints all the links that the search engine returns for the given 
search term.

var form = doc.QuerySelector&lt;IHtmlFormElement&gt;("form[action='/search']"); 

We locate the form. 

using var res = await form.SubmitAsync(new {q = term});

The form is submitted with SubmitAsync.

var links = res.QuerySelectorAll&lt;IHtmlAnchorElement&gt;("a");

From the result, we get all the links.

foreach (var link in links)
{
    var val = link.Attributes["href"].Value;
...

We go through the links and get the contents of their href
attribute, which has the link.

if (!val.Contains("google"))

We want to exclude the search engine links, such as links to terms, privacy, and 
similary.

var rx = new Regex(@"(/url\?q=)([^&amp;]*)(\&amp;)", RegexOptions.Compiled);

if (match.Success)
{
    Console.WriteLine(match.Groups[2]);
}

We use a regular expression to process the link. The links we are interested in 
start with the /url?q= prefix. The search engine appends some 
parameters to the links after the &amp; suffix. We divide the regex expression 
into three groups and pick the second one.

$ dotnet run
https://fsharp.org/
https://fsharp.org/learn/
https://fsharp.org/specs/language-spec/
https://fsharp.org/about/
https://fsharp.org/use/windows/
https://docs.microsoft.com/en-us/dotnet/fsharp/what-is-fsharp
https://medium.com/skills-matter/what-is-the-most-underrated-programming-language-fa...
https://www.planetgeek.ch/2020/12/16/c-vs-f/
https://en.wikipedia.org/wiki/F_Sharp_(programming_language)
https://en.wikipedia.org/wiki/F_Sharp_(programming_language)
https://sk.wikipedia.org/wiki/F_Sharp
...

## Source

[AngleSharp Github project](https://github.com/AngleSharp/AngleSharp)

In this article we have parsed HTML documents in C# with AngleSharp.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).