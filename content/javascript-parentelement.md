+++
title = "JavaScript parentElement"
date = 2025-08-29T19:53:28.607+01:00
draft = false
description = "Learn how to use JavaScript's parentElement property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript parentElement

last modified April 2, 2025

In this article, we explore the parentElement property in
JavaScript. This property is essential for DOM traversal, allowing developers
to access the parent element of any DOM node.

## Basic Definition

The parentElement property returns the parent element of the
specified element. If the element has no parent, or if the parent is not
an element node, it returns null.

This property is read-only and provides a convenient way to navigate upwards
in the DOM tree. It differs from parentNode as it only returns
element nodes.

## Basic parentElement Usage

This example demonstrates how to access the parent element of a simple div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic parentElement&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    &lt;p id="child"&gt;Child element&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    const parent = child.parentElement;
    console.log(parent.id); // Outputs: "parent"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a paragraph element nested inside a div. The
JavaScript code retrieves the child element, then accesses its parent using
parentElement.

This demonstrates the fundamental usage of parentElement to navigate
up the DOM tree. The property returns the immediate parent element of the
selected node.

## Checking for Parent Existence

This example shows how to safely check if an element has a parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Parent Existence Check&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;button id="btn"&gt;Check Parent&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const btn = document.getElementById('btn');
    
    if (btn.parentElement) {
        console.log('Parent exists:', btn.parentElement.id);
    } else {
        console.log('No parent element');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we check if the button element has a parent before trying to access it.
This is a good practice to avoid errors when working with dynamically created
elements.

The parentElement property will be null if the element
has no parent or if the parent is not an element node (like document).

## Modifying Parent Element Style

This example demonstrates how to change the style of a parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Parent Style Modification&lt;/title&gt;
    &lt;style&gt;
        #parentBox {
            padding: 20px;
            border: 1px solid black;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parentBox"&gt;
    &lt;p id="childText"&gt;Click me to change my parent's style&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('childText');
    child.addEventListener('click', function() {
        const parent = child.parentElement;
        parent.style.backgroundColor = 'lightblue';
        parent.style.padding = '30px';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the paragraph element changes its parent's style.
We use parentElement to access the parent div and modify its CSS.

This shows how parentElement can be used in event handlers to
dynamically modify ancestor elements. The style changes are applied to the
immediate parent of the clicked element.

## Removing a Child from Its Parent

This example shows how to remove an element from its parent using parentElement.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Remove Child from Parent&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li id="removeMe"&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="removeItem()"&gt;Remove Item 2&lt;/button&gt;

&lt;script&gt;
    function removeItem() {
        const item = document.getElementById('removeMe');
        item.parentElement.removeChild(item);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a list with three items. The button click handler removes the
second item by accessing its parent and calling removeChild.

This demonstrates a common pattern where parentElement is used to
get a reference to the parent needed to remove a child element from the DOM.

## Traversing Multiple Levels Up

This example shows how to traverse multiple levels up the DOM tree.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multi-level Traversal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="grandparent"&gt;
    &lt;div id="parent"&gt;
        &lt;div id="child"&gt;
            &lt;button id="btn"&gt;Find Grandparent&lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const btn = document.getElementById('btn');
    btn.addEventListener('click', function() {
        const grandparent = btn.parentElement.parentElement;
        console.log('Grandparent ID:', grandparent.id);
        grandparent.style.border = '2px solid red';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the button accesses the grandparent element by
chaining two parentElement calls. It then logs the grandparent's
ID and adds a border to it.

This demonstrates how multiple parentElement calls can traverse
up multiple levels in the DOM tree. Each call moves up one level in the
hierarchy.

## Source

[MDN parentElement Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)

In this article, we have shown how to use the parentElement
property in JavaScript. This property is fundamental for DOM traversal and
element manipulation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).