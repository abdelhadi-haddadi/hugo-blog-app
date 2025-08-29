+++
title = "JavaScript element.prepend()"
date = 2025-08-29T19:53:28.594+01:00
draft = false
description = "Learn how to use JavaScript's element.prepend() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript element.prepend()

last modified April 2, 2025

In this article, we explore the element.prepend() method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to insert nodes at the beginning of a parent element's child list.

## Basic Definition

The element.prepend() method inserts a set of Node objects or
DOMString objects before the first child of the element. It modifies the DOM
by adding content at the start of the selected element.

Unlike append() which adds content at the end,
prepend() adds content at the beginning. It can accept multiple
arguments and automatically converts strings to Text nodes.

## Basic prepend() Usage

This example demonstrates how to prepend a simple text node to an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic prepend()&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;Existing paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    container.prepend('Prepended text ');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div with an existing paragraph. The JavaScript
code prepends a text string before the paragraph. The string is automatically
converted to a Text node.

This demonstrates the fundamental usage of prepend() to add
content at the beginning of an element. The method is called on the parent
element where we want to insert content.

## Prepending Multiple Elements

This example shows how to prepend multiple elements at once using prepend().

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Prepending Multiple Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Original item&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const newItem1 = document.createElement('li');
    newItem1.textContent = 'First new item';
    
    const newItem2 = document.createElement('li');
    newItem2.textContent = 'Second new item';
    
    list.prepend(newItem1, newItem2);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a ul element with one li item. We create two new li elements and
prepend them both at once. The elements appear in the order they were passed.

This demonstrates how prepend() can accept multiple arguments. The
method inserts them sequentially before any existing children of the parent.

## Prepending with Strings and Elements

This example demonstrates mixing strings and elements when using prepend().

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Mixed prepend&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;p&gt;Original content&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const content = document.getElementById('content');
    const heading = document.createElement('h2');
    heading.textContent = 'New Heading';
    
    content.prepend('Text before heading ', heading, ' Text after heading');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we prepend a combination of text strings and an element. The
strings are converted to Text nodes and inserted along with the heading element.

This shows the flexibility of prepend() in handling different
types of content. The method maintains the order of arguments in the DOM.

## Prepending in Response to Events

This example shows how to use prepend() in an event handler.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event-driven prepend&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="log"&gt;&lt;/div&gt;
&lt;button id="addBtn"&gt;Add Log Entry&lt;/button&gt;

&lt;script&gt;
    const log = document.getElementById('log');
    const btn = document.getElementById('addBtn');
    
    btn.addEventListener('click', () =&gt; {
        const entry = document.createElement('div');
        entry.textContent = `Log entry at ${new Date().toLocaleTimeString()}`;
        log.prepend(entry);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a log container and a button. Each button click prepends a new log
entry with a timestamp. This creates a chronological log with newest entries first.

This demonstrates a practical use case for prepend() where you want
to maintain reverse chronological order. The method is ideal for such scenarios.

## Prepending with DocumentFragment

This example demonstrates using DocumentFragment with prepend() for better performance.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Prepend with DocumentFragment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;Original content&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const fragment = document.createDocumentFragment();
    
    const heading = document.createElement('h1');
    heading.textContent = 'Main Title';
    fragment.appendChild(heading);
    
    const subheading = document.createElement('h2');
    subheading.textContent = 'Subtitle';
    fragment.appendChild(subheading);
    
    container.prepend(fragment);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a DocumentFragment to hold multiple elements before
prepending them all at once. This is more efficient than multiple DOM operations.

DocumentFragment is a lightweight container that doesn't trigger reflows until
its contents are added to the DOM. This makes it ideal for batch operations.

## Source

[MDN Element.prepend() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend)

In this article, we have shown how to use element.prepend()
in JavaScript. This method is powerful for DOM manipulation and element
insertion at the beginning of parent elements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).