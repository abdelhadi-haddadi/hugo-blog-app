+++
title = "JavaScript document.write"
date = 2025-08-29T19:53:13.006+01:00
draft = false
description = "Learn how to use JavaScript's document.write method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript document.write

last modified April 2, 2025

In this article, we explore the document.write method in
JavaScript. This method writes directly to the HTML document stream,
allowing developers to output content dynamically.

## Basic Definition

The document.write method writes a string of text to a
document stream opened by document.open. When the document
is loading, this method appends content to the document.

After the document has finished loading, calling document.write
will first clear the entire document before writing. This behavior makes
it generally unsuitable for modern web development practices.

## Basic document.write

This example demonstrates the simplest use of document.write.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic document.write&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    document.write('Hello, World!');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we use document.write to output the
string "Hello, World!" directly into the HTML document. The text appears
where the script tag is placed in the document.

This demonstrates the fundamental usage of document.write to
inject content into a webpage during the initial page load.

## Writing HTML Elements

This example shows how to write HTML elements using document.write.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Writing HTML Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    document.write('&lt;h1&gt;Welcome to My Site&lt;/h1&gt;');
    document.write('&lt;p&gt;This content was generated dynamically.&lt;/p&gt;');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use document.write to output complete HTML elements,
including an h1 heading and a paragraph. The browser renders these as
normal HTML elements.

This demonstrates how document.write can be used to generate
structured content. Note that the HTML strings must be properly formatted.

## Writing After Page Load

This example demonstrates the effect of calling document.write after page load.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;After Page Load&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Original Content&lt;/h1&gt;
&lt;button onclick="writeContent()"&gt;Write Content&lt;/button&gt;

&lt;script&gt;
    function writeContent() {
        document.write('&lt;h1&gt;New Content&lt;/h1&gt;');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the button triggers document.write
after the page has loaded. This clears the entire document and replaces
it with the new content.

This behavior is why document.write is generally avoided in
modern JavaScript. It can unexpectedly wipe out the entire page content.

## Writing Variables

This example shows how to output variable values using document.write.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Writing Variables&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    const userName = 'Alice';
    const userAge = 30;
    
    document.write(`&lt;p&gt;Name: ${userName}&lt;/p&gt;`);
    document.write(`&lt;p&gt;Age: ${userAge}&lt;/p&gt;`);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use template literals to insert variable values into strings that
are then written to the document. The variables userName and
userAge are displayed in paragraph elements.

This demonstrates how document.write can incorporate dynamic
data into the page content during the initial page load.

## Conditional Writing

This example demonstrates conditional content writing with document.write.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Writing&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;script&gt;
    const isMorning = new Date().getHours() &lt; 12;
    
    if (isMorning) {
        document.write('&lt;h2&gt;Good Morning!&lt;/h2&gt;');
    } else {
        document.write('&lt;h2&gt;Good Afternoon!&lt;/h2&gt;');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check the current time and use document.write
to output a different greeting based on whether it's morning or afternoon.

This shows how document.write can be used with conditional
logic to create dynamic content during page load. The greeting changes
based on the time of day.

## Source

[MDN document.write Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/write)

In this article, we have shown how to use document.write
in JavaScript. While useful for simple cases, modern web development
typically prefers DOM manipulation methods for better control.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).