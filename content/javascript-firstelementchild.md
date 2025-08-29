+++
title = "JavaScript firstElementChild"
date = 2025-08-29T19:53:19.676+01:00
draft = false
description = "Learn how to use JavaScript's firstElementChild property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript firstElementChild

last modified April 2, 2025

In this article, we explore the firstElementChild property in
JavaScript. This property is essential for DOM traversal, allowing developers
to access the first child element node of a specified parent element.

## Basic Definition

The firstElementChild property returns the first child element of
the specified element. Unlike firstChild, it only considers element
nodes, ignoring text and comment nodes.

This property is read-only and returns null if the parent element
has no child elements. It's part of the Element interface and is widely
supported in modern browsers.

## Basic firstElementChild

This example demonstrates how to access the first child element of a div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic firstElementChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const parent = document.getElementById('parent');
    const firstChild = parent.firstElementChild;
    console.log(firstChild.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with two paragraph children. The
JavaScript code retrieves the first child element using
firstElementChild and logs its text content.

This demonstrates the fundamental usage of firstElementChild to
access the first element node. The property ignores any text nodes or comments
that might appear before the first element.

## firstElementChild vs firstChild

This example shows the difference between firstElementChild and firstChild.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;firstElementChild vs firstChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;!-- This is a comment --&gt;
    &lt;p&gt;Only child element&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    console.log('firstChild:', container.firstChild);
    console.log('firstElementChild:', container.firstElementChild);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div with a comment node before its paragraph child. The script
shows how firstChild returns the comment node while
firstElementChild skips it and returns the paragraph.

This highlights the key difference between these properties when dealing with
mixed content. firstElementChild is often more useful for DOM
traversal as it ignores non-element nodes.

## Checking for Child Elements

This example demonstrates how to check if an element has any child elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking for Child Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="hasChildren"&gt;
    &lt;span&gt;Child element&lt;/span&gt;
&lt;/div&gt;
&lt;div id="noChildren"&gt;&lt;/div&gt;

&lt;script&gt;
    const hasChildren = document.getElementById('hasChildren');
    const noChildren = document.getElementById('noChildren');
    
    console.log('hasChildren:', hasChildren.firstElementChild !== null);
    console.log('noChildren:', noChildren.firstElementChild !== null);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check two divs - one with a child element and one without.
By comparing firstElementChild to null, we can determine if child
elements exist.

This technique is useful for conditional logic based on DOM structure. It's more
reliable than checking childNodes.length when you only care about element nodes.

## Modifying the First Child

This example shows how to modify the first child element of a parent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying First Child&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
    &lt;li&gt;Third item&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="highlightFirst()"&gt;Highlight First&lt;/button&gt;

&lt;script&gt;
    function highlightFirst() {
        const list = document.getElementById('list');
        const firstItem = list.firstElementChild;
        firstItem.style.backgroundColor = 'yellow';
        firstItem.style.fontWeight = 'bold';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an unordered list and a button. When clicked, the button finds the
first list item using firstElementChild and applies styling to it.

This demonstrates practical use of firstElementChild for DOM
manipulation. The property provides direct access to the first child element
for modification without needing to filter through other node types.

## Chaining firstElementChild

This example demonstrates chaining multiple firstElementChild calls.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Chaining firstElementChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="grandparent"&gt;
    &lt;div&gt;
        &lt;p&gt;Nested paragraph&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const grandparent = document.getElementById('grandparent');
    const nestedPara = grandparent.firstElementChild.firstElementChild;
    console.log(nestedPara.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we chain two firstElementChild calls to access a
deeply nested paragraph. The first call gets the child div, the second gets the
paragraph.

This shows how firstElementChild can be used in sequence to traverse
multiple levels of the DOM tree. It's important to check for null at each step
when working with potentially empty elements.

## Source

[MDN firstElementChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild)

In this article, we have shown how to use firstElementChild in
JavaScript. This property is fundamental for DOM traversal and element selection
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).