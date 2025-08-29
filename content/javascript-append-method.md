+++
title = "JavaScript append() Method"
date = 2025-08-29T19:53:14.104+01:00
draft = false
description = "Learn how to use JavaScript's append() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript append() Method

last modified April 2, 2025

In this article, we explore the element.append() method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to add nodes or strings to the end of a parent element's children.

## Basic Definition

The append() method inserts a set of Node objects or strings after
the last child of the parent element. Unlike appendChild(), it can
accept multiple arguments and string values.

The method modifies the DOM directly and returns undefined. It's supported in
all modern browsers but not in Internet Explorer. Strings are inserted as Text
nodes automatically.

## Basic append() Usage

This example demonstrates how to append a simple element to a container.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic append()&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const newDiv = document.createElement('div');
    newDiv.textContent = 'Appended element';
    container.append(newDiv);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we create a div element and append it to the container.
The append() method adds the new div as the last child of the
container.

This demonstrates the fundamental usage of append() to add elements
to the DOM. The method is cleaner than appendChild() for simple
cases and works similarly for element nodes.

## Appending Multiple Elements

This example shows how to append multiple elements at once using append().

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const item1 = document.createElement('li');
    const item2 = document.createElement('li');
    
    item1.textContent = 'First item';
    item2.textContent = 'Second item';
    
    list.append(item1, item2);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create two list items and append them to an unordered list in a single
operation. The append() method accepts multiple arguments.

This demonstrates the advantage of append() over
appendChild() when adding multiple elements. It reduces the number
of DOM operations needed.

## Appending Strings and Elements

This example demonstrates how append() can handle both strings and elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Mixed Content&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;&lt;/div&gt;

&lt;script&gt;
    const content = document.getElementById('content');
    const span = document.createElement('span');
    span.textContent = 'span element';
    
    content.append('Text before ', span, ' and text after');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we append a mix of string text and an element node to a div.
The strings are automatically converted to text nodes.

This shows the flexibility of append() in handling different types
of content. The method maintains the order of arguments in the resulting DOM.

## Appending with Template Literals

This example shows how to use append() with template literals for dynamic content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Template Literals&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="output"&gt;&lt;/div&gt;
&lt;button onclick="addMessage()"&gt;Add Message&lt;/button&gt;

&lt;script&gt;
    function addMessage() {
        const output = document.getElementById('output');
        const username = 'John';
        const count = 3;
        
        output.append(`Hello ${username}! You have ${count} new messages.`);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use a template literal with variables to create dynamic content that gets
appended when the button is clicked. The string is automatically converted.

This demonstrates how append() can work with dynamic content
generation. Template literals provide a clean way to create complex strings.

## Appending to Document Fragments

This example demonstrates using append() with document fragments for performance.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Document Fragment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="results"&gt;&lt;/div&gt;

&lt;script&gt;
    const fragment = document.createDocumentFragment();
    const results = document.getElementById('results');
    
    for (let i = 0; i &lt; 5; i++) {
        const item = document.createElement('div');
        item.textContent = `Item ${i + 1}`;
        fragment.append(item);
    }
    
    results.append(fragment);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create multiple elements within a document fragment before appending
them to the DOM. This minimizes reflows and improves performance.

This shows an advanced use of append() with document fragments.
Fragments are useful when adding multiple elements to the DOM efficiently.

## Source

[MDN append() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)

In this article, we have shown how to use the append() method in
JavaScript. This method is fundamental for DOM manipulation and element addition
in modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).