+++
title = "JavaScript nextElementSibling"
date = 2025-08-29T19:53:25.271+01:00
draft = false
description = "Learn how to use JavaScript's nextElementSibling property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript nextElementSibling

last modified April 2, 2025

In this article, we explore the nextElementSibling property in
JavaScript. This property is essential for DOM traversal, allowing developers
to access the next sibling element in the document tree.

## Basic Definition

The nextElementSibling property returns the element immediately
following the specified element in its parent's children list. It only returns
element nodes, skipping any text or comment nodes.

This property is read-only and returns null if there are no more sibling
elements. It's part of the DOM traversal API and works in all modern browsers.

## Basic nextElementSibling

This example demonstrates how to access the next sibling element of a div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic nextElementSibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First Element&lt;/div&gt;
&lt;div id="second"&gt;Second Element&lt;/div&gt;

&lt;script&gt;
    const firstElement = document.getElementById('first');
    const nextSibling = firstElement.nextElementSibling;
    console.log(nextSibling.id); // Outputs: "second"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have two div elements. The JavaScript code gets the
first element by ID, then accesses its next sibling using
nextElementSibling.

This demonstrates the fundamental usage of nextElementSibling to
traverse the DOM. The property returns the next element node in the document
tree, which we can then work with.

## Traversing a List

This example shows how to traverse an unordered list using nextElementSibling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;List Traversal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul&gt;
    &lt;li id="item1"&gt;Item 1&lt;/li&gt;
    &lt;li id="item2"&gt;Item 2&lt;/li&gt;
    &lt;li id="item3"&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const firstItem = document.getElementById('item1');
    const secondItem = firstItem.nextElementSibling;
    const thirdItem = secondItem.nextElementSibling;
    
    console.log(secondItem.id); // Outputs: "item2"
    console.log(thirdItem.id);  // Outputs: "item3"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an unordered list with three items. The JavaScript code starts with
the first item and uses nextElementSibling to access subsequent
items.

This demonstrates how nextElementSibling can be used to traverse
through sibling elements in sequence. Each call moves to the next element in
the DOM tree.

## Style Next Sibling

This example demonstrates how to change the style of the next sibling element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Style Next Sibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="trigger"&gt;Click me to highlight next div&lt;/div&gt;
&lt;div id="target"&gt;This will be highlighted&lt;/div&gt;

&lt;script&gt;
    const trigger = document.getElementById('trigger');
    trigger.addEventListener('click', function() {
        const nextDiv = this.nextElementSibling;
        nextDiv.style.backgroundColor = 'yellow';
        nextDiv.style.padding = '10px';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have two div elements. When the first div is clicked, it
uses nextElementSibling to find and style the next div.

This shows how nextElementSibling can be used in event handlers to
dynamically modify adjacent elements. The property provides quick access to
related elements in the DOM.

## Navigation Menu Example

This example shows a practical use case with a navigation menu.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Navigation Menu&lt;/title&gt;
    &lt;style&gt;
        .active { color: red; font-weight: bold; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;nav&gt;
    &lt;a href="#" id="home"&gt;Home&lt;/a&gt;
    &lt;a href="#" id="about"&gt;About&lt;/a&gt;
    &lt;a href="#" id="contact"&gt;Contact&lt;/a&gt;
&lt;/nav&gt;

&lt;script&gt;
    const aboutLink = document.getElementById('about');
    aboutLink.classList.add('active');
    
    const nextLink = aboutLink.nextElementSibling;
    if (nextLink) {
        nextLink.style.borderLeft = '2px solid red';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a simple navigation menu. The JavaScript code marks the "About"
link as active and then styles its next sibling (the "Contact" link).

This demonstrates a real-world application of nextElementSibling in
navigation menus. The property helps create visual relationships between
adjacent menu items.

## Null Check Example

This example demonstrates the importance of checking for null with nextElementSibling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Null Check&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="last"&gt;This is the last element&lt;/div&gt;

&lt;script&gt;
    const lastElement = document.getElementById('last');
    const nextElement = lastElement.nextElementSibling;
    
    if (nextElement) {
        console.log('Next element exists:', nextElement);
    } else {
        console.log('No next element exists');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a single div element. The JavaScript code attempts to
access its next sibling, which doesn't exist, so nextElementSibling
returns null.

This demonstrates the importance of checking for null when using
nextElementSibling. Always verify the result before attempting to
access properties or methods on the returned value.

## Source

[MDN nextElementSibling Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)

In this article, we have shown how to use nextElementSibling in
JavaScript. This property is fundamental for DOM traversal and element
navigation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).