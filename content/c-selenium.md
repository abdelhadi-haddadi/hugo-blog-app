+++
title = "C# Selenium"
date = 2025-08-29T19:51:22.166+01:00
draft = false
description = "C# Selenium tutorial shows how to automate web application tests with Selenium framework in C#. Selenium is a portable framework for testing web applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Selenium

last modified July 5, 2023

 

C# Selenium tutorial shows how to automate web application tests with Selenium
framework in C#. Selenium is a portable framework for testing web applications.

## Selenium

Selenium is a portable framework for testing web applications.
Selenium runs on Windows, Linux, and macOS.

*Selenium WebDriver* is a collection of open source APIs which are used
to automate the testing of a web application. There are specific drivers for
browsers including Chrome, Firefox, Opera, Microsoft Edge. These drivers need to
be dowloaded and placed on the PATH. Selenium WebDriver supports different
programming languages including Python, C#, and Java.

Selenium can be run in a full mode or in a headless mode. In the headless mode,
the browser is not started.

## Selenium drivers

We need to download the drivers for the browsers that we use. For this tutorial,
we have chosen EdgeDriver. The driver is available at 

https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/

## C# install Selenium nuget packages

To work with the Selenium drivers in C# programs, we need to add the necessary
NuGet packages.

$ dotnet add package Selenium.WebDriver

This install the Selenium.WebDriver.

$ dotnet add package DotNetSeleniumExtras.WaitHelpers

Also, we need to install DotNetSeleniumExtras.WaitHelpers for 
expected wait conditions.

## C# Selenium simple example

In the first example, we get a title of a webpage.

Program.cs
  

using OpenQA.Selenium.Edge;

var eo = new EdgeOptions();
eo.AddArgument("headless");

var driver = new EdgeDriver(eo);

try
{
    var url = "http://webcode.me";

    driver.Url = url;
    Console.WriteLine(driver.Title);
}
finally
{
    driver.Quit();
}

The program runs Selenium in a headless mode. It retrieves the website's title.

var eo = new EdgeOptions();
eo.AddArgument("headless");

var driver = new EdgeDriver(eo);

We create an instance of the EdgeDriver. An option is added to 
run Selenium in headless mode.

try
{
    var url = "http://webcode.me";

    driver.Url = url;
    Console.WriteLine(driver.Title);
}
finally
{
    driver.Quit();
}

We navigate to the given URL and get the title. In the end, we quit the driver.

## C# Selenium testing paragraph contents

In the next example, we test the contents of two paragraphs. We use the NUnit
framework.

Tests.cs
  

using NUnit.Framework;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium;

namespace Paragraphs;

public class Tests
{
    private string url = "http://webcode.me";
    private IWebDriver driver;

    [SetUp]
    public void Setup()
    {
        var eo = new EdgeOptions();
        eo.AddArgument("headless");

        driver = new EdgeDriver(eo);
    }

    [Test]
    public void TestParagraphs()
    {
        driver.Url = url;

        var e1 = driver.FindElement(By.CssSelector("body &gt; p:first-child"));
        var e2 = driver.FindElement(By.CssSelector("body &gt; p:nth-child(2)"));

        Assert.That(e1.Text, Does.Contain("Today is a beautiful day."));
        Assert.That(e2.Text, Does.Contain("How are you?"));
    }

    [TearDown]
    public void TearDown() =&gt; driver.Quit();
}

We use the FindElement method to locate the tags. We identify the
paragraph tags with CSS selectors and compare the contents with 
Assert.That assertions.

## C# Selenium click button

In the following example, we click on a button and retrieve the contents of 
the dialog.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Test page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;button id="mybtn" onclick="alert('Hello there!')"&gt;
        Click
    &lt;/button&gt;

&lt;/body&gt;
&lt;/html&gt;

The HTML file contains a button which shows an alert dialog.

Program.cs
  

using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using SeleniumExtras.WaitHelpers;

var driver = new EdgeDriver();

try
{
    var url = "file://C:/Users/Jano/Documents/prog/csharp/selenium/Click/index.html";
    driver.Url = url;

    var button = driver.FindElement(By.Id("mybtn"));
    button.Click();
    Thread.Sleep(1500);

    try {
        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        wait.Until(ExpectedConditions.AlertIsPresent());

        var alert = driver.SwitchTo().Alert();
        var text = alert.Text;
        Console.WriteLine(text);

        alert.Accept();

    } catch (TimeoutException e) {

        Console.WriteLine(e);
    }

}
finally
{
    driver.Quit();
}

We get the HTML file from the local file system. The example is run in full 
browser mode. 

var url = "file://C:/Users/Jano/Documents/prog/csharp/selenium/Click/index.html";
driver.Url = url;

We locate the HTML file.

var button = driver.FindElement(By.Id("mybtn"));
button.Click();
Thread.Sleep(1500);

We find the button and press it with Click. We add some delay with
Thread.Sleep so that we can watch the process.

var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions.AlertIsPresent());

We wait until the alert dialog pops up.

var alert = driver.SwitchTo().Alert();
var text = alert.Text;
Console.WriteLine(text);

We retrieve the alert's text.

## C# Selenium submit form

In the next example, we submit a form and check for the response text.

Tests.cs
  

using NUnit.Framework;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using SeleniumExtras.WaitHelpers;

namespace SubmitForm;

public class Tests
{
    private string url = "http://webcode.me/submit/";
    private IWebDriver driver;

    [SetUp]
    public void Setup()
    {
        var eo = new EdgeOptions();
        eo.AddArgument("headless");

        driver = new EdgeDriver(eo);
    }

    [Test]
    public void Test1()
    {
        driver.Url = url;

        var form = driver.FindElement(By.TagName("form"));
        var name = driver.FindElement(By.Name("name"));
        var message = driver.FindElement(By.Name("message"));

        name.SendKeys("John Doe");
        message.SendKeys("Hello!");

        form.Submit();

        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));
        wait.Until(ExpectedConditions.UrlContains("message.php"));

        var content = driver.FindElement(By.TagName("body")).Text;
        // TestContext.Out.WriteLine(content);

        Assert.That(content, Does.Contain("John Doe says: Hello!"));
    }

    [TearDown]
    public void TearDown() =&gt; driver.Quit();
}

We fill in two input tags and submit a form. We retrieve the response message.

var form = driver.FindElement(By.TagName("form"));
var name = driver.FindElement(By.Name("name"));
var message = driver.FindElement(By.Name("message"));

The three tags are located: one form and two input boxes.

name.SendKeys("John Doe");
message.SendKeys("Hello!");

We set the data into input boxes with SendKeys.

form.Submit();

The form is submitted with Submit.

var content = driver.FindElement(By.TagName("body")).Text;

We get the message from the response.

Assert.That(content, Does.Contain("John Doe says: Hello!"));

The assertion checkes for the expected return value.

## Source

[Welcome to the Selenium .NET API Docs](https://www.selenium.dev/selenium/docs/api/dotnet/)

In this article we have worked with the Selenium web testing framework in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).