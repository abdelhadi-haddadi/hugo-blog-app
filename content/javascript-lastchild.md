+++
title = "JavaScript lastChild"
date = 2025-08-29T19:53:24.158+01:00
draft = false
description = "Learn how to use JavaScript's lastChild property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript lastChild

last modified April 2, 2025

In this article, we explore the lastChild property in JavaScript.
This property is essential for DOM traversal, allowing developers to access the
last child node of an element.

## Basic Definition

The lastChild property returns the last child node of the specified
element. This includes all node types, not just element nodes. It's important
to note that whitespace and text nodes are also considered.

If the element has no children, lastChild returns null.
For element-only traversal, consider using lastElementChild instead.

## Basic lastChild Example

This example demonstrates how to access the last child of a parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lastChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
    &lt;li&gt;Last item&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const lastItem = list.lastChild;
    console.log(lastItem); // Might be text node due to whitespace
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a ul element with three li children. The
JavaScript code retrieves the last child using lastChild.

Note that due to potential whitespace, this might return a text node instead
of the last li element. This demonstrates how lastChild considers
all node types.

## Working with lastElementChild

This example shows how to use lastElementChild to get the last
element child specifically.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lastElementChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Middle paragraph&lt;/p&gt;
    &lt;p&gt;Last paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const lastPara = container.lastElementChild;
    lastPara.style.color = 'red';
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div with three paragraph elements. The code uses
lastElementChild to specifically target the last element child.

This property ignores text and comment nodes, making it more predictable when
you only want to work with element nodes. We then change the color of the last
paragraph to red.

## Checking for Children

This example demonstrates how to check if an element has children before
accessing lastChild.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking for Children&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;&lt;/div&gt;
&lt;button onclick="checkChildren()"&gt;Check Children&lt;/button&gt;

&lt;script&gt;
    function checkChildren() {
        const parent = document.getElementById('parent');
        if (parent.hasChildNodes()) {
            console.log('Last child:', parent.lastChild);
        } else {
            console.log('No children found');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have an empty div and a button. When clicked, the function
checks if the div has any children before attempting to access lastChild.

This is a good practice to avoid errors when working with dynamic content where
the presence of children might be uncertain. The hasChildNodes
method helps ensure safe access.

## Removing the Last Child

This example shows how to remove the last child of an element using
lastChild.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Removing Last Child&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="items"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="removeLast()"&gt;Remove Last&lt;/button&gt;

&lt;script&gt;
    function removeLast() {
        const list = document.getElementById('items');
        if (list.lastChild) {
            list.removeChild(list.lastChild);
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a list with three items and a button. When clicked, the function
removes the last child of the list using removeChild with
lastChild as the parameter.

This demonstrates a common use case for lastChild in dynamic list
manipulation. The conditional check ensures we don't attempt to remove a child
when none exist.

## Comparing firstChild and lastChild

This example compares firstChild and lastChild in a
single parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;firstChild vs lastChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="comparison"&gt;
    &lt;span&gt;First span&lt;/span&gt;
    Some text
    &lt;span&gt;Last span&lt;/span&gt;
&lt;/div&gt;
&lt;button onclick="compare()"&gt;Compare&lt;/button&gt;

&lt;script&gt;
    function compare() {
        const div = document.getElementById('comparison');
        console.log('First child:', div.firstChild);
        console.log('Last child:', div.lastChild);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div containing two span elements with text in between.
The function logs both the first and last child nodes when the button is clicked.

This demonstrates how both properties work in the same context and how they might
return different types of nodes (element nodes vs text nodes) depending on the
DOM structure.

## Source

[MDN lastChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)

In this article, we have shown how to use the lastChild property
in JavaScript. This property is fundamental for DOM traversal and manipulation
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).