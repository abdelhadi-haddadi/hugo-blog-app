+++
title = "JavaScript document.writeln"
date = 2025-08-29T19:53:12.989+01:00
draft = false
description = "Learn how to use JavaScript's document.writeln method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript document.writeln

last modified April 2, 2025

In this article, we explore the document.writeln method in
JavaScript. This method writes text to a document, followed by a newline
character. It's useful for simple document generation and testing.

## Basic Definition

The document.writeln method writes a string of text to a document
stream, followed by a newline character. It's similar to document.write
but adds the newline at the end.

This method is primarily used during page loading or for simple document
generation. Using it after page load will overwrite the entire document.

## Basic document.writeln

This example demonstrates the basic usage of document.writeln.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic writeln&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    document.writeln('Hello, World!');
    document.writeln('This is a new line.');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we use document.writeln to write two lines
of text to the document. Each call adds a newline character at the end.

The output will appear in the document body with each string on its own line.
This demonstrates the fundamental behavior of writeln.

## Writing HTML Elements

This example shows how to write HTML elements using document.writeln.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Writing HTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    document.writeln('&lt;h1&gt;Welcome&lt;/h1&gt;');
    document.writeln('&lt;p&gt;This is a paragraph.&lt;/p&gt;');
    document.writeln('&lt;ul&gt;');
    document.writeln('  &lt;li&gt;Item 1&lt;/li&gt;');
    document.writeln('  &lt;li&gt;Item 2&lt;/li&gt;');
    document.writeln('&lt;/ul&gt;');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use document.writeln to generate HTML elements. Each call
writes a portion of HTML markup, with newlines separating the elements.

The browser interprets the HTML markup, rendering proper headings, paragraphs,
and lists. This shows how writeln can build document structure.

## Using Variables with writeln

This example demonstrates how to incorporate variables with document.writeln.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Variables with writeln&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    const userName = 'Alice';
    const userAge = 30;
    const currentDate = new Date().toDateString();
    
    document.writeln(`&lt;p&gt;Name: ${userName}&lt;/p&gt;`);
    document.writeln(`&lt;p&gt;Age: ${userAge}&lt;/p&gt;`);
    document.writeln(`&lt;p&gt;Date: ${currentDate}&lt;/p&gt;`);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we store data in variables and use template literals to
incorporate them into our document.writeln calls.

This demonstrates how to dynamically generate content by combining JavaScript
variables with HTML markup. The output shows personalized information.

## Conditional Content Writing

This example shows how to use conditions with document.writeln.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Writing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    const isLoggedIn = true;
    
    document.writeln('&lt;h1&gt;Welcome&lt;/h1&gt;');
    
    if (isLoggedIn) {
        document.writeln('&lt;p&gt;You are logged in.&lt;/p&gt;');
        document.writeln('&lt;button&gt;Logout&lt;/button&gt;');
    } else {
        document.writeln('&lt;p&gt;Please log in.&lt;/p&gt;');
        document.writeln('&lt;button&gt;Login&lt;/button&gt;');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use a conditional statement to determine what content to write to the
document. The output changes based on the isLoggedIn variable.

This demonstrates how document.writeln can be used with JavaScript
logic to create dynamic content during page loading.

## Writing Table Structure

This example demonstrates creating a table with document.writeln.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Table Creation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    document.writeln('&lt;table border="1"&gt;');
    document.writeln('  &lt;tr&gt;');
    document.writeln('    &lt;th&gt;Name&lt;/th&gt;');
    document.writeln('    &lt;th&gt;Age&lt;/th&gt;');
    document.writeln('  &lt;/tr&gt;');
    document.writeln('  &lt;tr&gt;');
    document.writeln('    &lt;td&gt;Alice&lt;/td&gt;');
    document.writeln('    &lt;td&gt;25&lt;/td&gt;');
    document.writeln('  &lt;/tr&gt;');
    document.writeln('  &lt;tr&gt;');
    document.writeln('    &lt;td&gt;Bob&lt;/td&gt;');
    document.writeln('    &lt;td&gt;30&lt;/td&gt;');
    document.writeln('  &lt;/tr&gt;');
    document.writeln('&lt;/table&gt;');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we use multiple document.writeln calls to
construct an HTML table. Each line contributes to the table structure.

The result is a properly formatted table with headers and data rows. This shows
how writeln can be used to create complex HTML structures.

## Source

[MDN document.writeln Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln)

In this article, we have shown how to use document.writeln
in JavaScript. This method is useful for simple document generation
during page loading.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).