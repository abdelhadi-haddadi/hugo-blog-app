+++
title = "JavaScript outerHTML"
date = 2025-08-29T19:53:27.487+01:00
draft = false
description = "Learn how to use JavaScript's outerHTML property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript outerHTML

last modified April 2, 2025

In this article, we explore the outerHTML property in JavaScript.
This property is essential for DOM manipulation, allowing developers to access
and modify the complete HTML representation of an element.

## Basic Definition

The outerHTML property gets the serialized HTML fragment describing
the element including its descendants. It can also be set to replace the element
with nodes parsed from the given string.

Unlike innerHTML, which only includes the element's contents,
outerHTML includes the element itself and all its attributes.
Setting outerHTML replaces the entire element in the DOM.

## Basic outerHTML Example

This example demonstrates how to read the outerHTML of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic outerHTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content" class="box"&gt;Hello there!&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('content');
    console.log(element.outerHTML);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with ID "content" and class "box".
The JavaScript code retrieves this element and logs its outerHTML to the console.

The output will show the complete HTML representation of the element including
its attributes and content. This demonstrates how outerHTML provides the full
HTML structure of an element.

## Replacing Elements with outerHTML

This example shows how to completely replace an element by setting its outerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Replacing Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="replaceMe"&gt;This will be replaced&lt;/div&gt;
&lt;button onclick="replaceElement()"&gt;Replace&lt;/button&gt;

&lt;script&gt;
    function replaceElement() {
        const element = document.getElementById('replaceMe');
        element.outerHTML = '&lt;p class="new"&gt;New content here!&lt;/p&gt;';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div element and a button. When the button is clicked, the
replaceElement function replaces the entire div with a new p
element by setting its outerHTML property.

This demonstrates how outerHTML can be used to completely swap out elements in
the DOM. The original element is removed and replaced with the parsed HTML.

## Comparing innerHTML and outerHTML

This example highlights the difference between innerHTML and outerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;innerHTML vs outerHTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="compare" class="container"&gt;
    &lt;span&gt;Sample text&lt;/span&gt;
&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('compare');
    console.log('innerHTML:', element.innerHTML);
    console.log('outerHTML:', element.outerHTML);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we log both innerHTML and outerHTML of the same element to
the console. The output clearly shows the difference between these properties.

innerHTML only shows the content inside the element (the span), while outerHTML
shows the complete element including its class attribute and all its contents.

## Cloning Elements with outerHTML

This example demonstrates how to clone an element using outerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Cloning Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="original" class="box" data-info="important"&gt;Original content&lt;/div&gt;
&lt;div id="cloneContainer"&gt;&lt;/div&gt;
&lt;button onclick="cloneElement()"&gt;Clone&lt;/button&gt;

&lt;script&gt;
    function cloneElement() {
        const original = document.getElementById('original');
        const container = document.getElementById('cloneContainer');
        container.innerHTML = original.outerHTML;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an original div with several attributes and a container div. When
the button is clicked, the original element is cloned by using its outerHTML.

This technique creates an exact copy of the original element including all its
attributes and content. The clone is inserted into the container div.

## Security Considerations with outerHTML

This example demonstrates security considerations when using outerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Security Considerations&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="userContent"&gt;Safe content&lt;/div&gt;
&lt;button onclick="injectContent()"&gt;Inject&lt;/button&gt;

&lt;script&gt;
    function injectContent() {
        // Simulating untrusted user input
        const userInput = '&lt;img src="x" onerror="alert(\'XSS\')"&gt;';
        const element = document.getElementById('userContent');
        
        // UNSAFE: Directly setting outerHTML with untrusted input
        // element.outerHTML = userInput;
        
        // SAFER: Using textContent for plain text
        element.textContent = userInput;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows the potential dangers of setting outerHTML with untrusted
input. The commented-out unsafe code would execute arbitrary JavaScript.

When working with user-provided content, it's safer to use textContent or
properly sanitize the input before using outerHTML to prevent XSS attacks.

## Source

[MDN outerHTML Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)

In this article, we have shown how to use the outerHTML property
in JavaScript. This powerful property allows complete access and modification
of HTML elements in the DOM.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).