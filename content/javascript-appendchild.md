+++
title = "JavaScript appendChild"
date = 2025-08-29T19:53:14.110+01:00
draft = false
description = "Learn how to use JavaScript's appendChild method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript appendChild

last modified April 2, 2025

In this article, we explore the appendChild method in JavaScript.
This method is essential for DOM manipulation, allowing developers to add new
elements to the document structure dynamically.

## Basic Definition

The appendChild method adds a node to the end of the list of
children of a specified parent node. If the node already exists in the document,
it will be moved to the new position.

This method is commonly used to dynamically create and add elements to the DOM.
It returns the appended child node, which can be useful for chaining operations.

## Basic appendChild Example

This example demonstrates how to create a new element and append it to the body.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic appendChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="container"&gt;&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a new paragraph!';
    container.appendChild(newParagraph);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we first get a reference to the container div. Then we
create a new paragraph element and set its text content. Finally, we append the
new paragraph to the container.

This demonstrates the fundamental usage of appendChild to add new
elements to the DOM. The method adds the new element as the last child of the
parent element.

## Appending Multiple Elements

This example shows how to append multiple elements to a parent node.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul id="shopping-list"&gt;&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('shopping-list');
    const items = ['Apples', 'Bananas', 'Milk', 'Bread'];
    
    items.forEach(item =&gt; {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a shopping list by dynamically adding list items to an unordered
list. We use forEach to iterate through the array of items.

For each item, we create a new li element, set its text content,
and append it to the list. This pattern is common when rendering dynamic lists.

## Moving Existing Elements

This example demonstrates how appendChild can move existing elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Moving Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="source"&gt;
    &lt;p id="movable"&gt;This element will be moved&lt;/p&gt;
&lt;/div&gt;
&lt;div id="destination"&gt;&lt;/div&gt;
&lt;button onclick="moveElement()"&gt;Move Element&lt;/button&gt;

&lt;script&gt;
    function moveElement() {
        const movable = document.getElementById('movable');
        const destination = document.getElementById('destination');
        destination.appendChild(movable);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a paragraph inside a source div. When the button is
clicked, the paragraph is moved to the destination div using
appendChild.

This shows that appendChild doesn't just add new elements - it can
also reposition existing elements within the DOM. The original element is removed
from its current position before being appended to the new parent.

## Appending Complex Structures

This example shows how to build and append more complex DOM structures.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Structures&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="app"&gt;&lt;/div&gt;

&lt;script&gt;
    const app = document.getElementById('app');
    
    const card = document.createElement('div');
    card.className = 'card';
    
    const title = document.createElement('h2');
    title.textContent = 'Product Card';
    
    const description = document.createElement('p');
    description.textContent = 'This is a product description.';
    
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(button);
    app.appendChild(card);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a product card component with multiple nested elements. We first
create the card container, then its child elements, and finally assemble them.

This demonstrates how appendChild can be used to build complex UI
components programmatically. Each element is created and configured before being
appended to its parent.

## Appending Document Fragments

This example demonstrates using DocumentFragment with appendChild for better performance.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Document Fragments&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="calendar"&gt;&lt;/div&gt;

&lt;script&gt;
    const calendar = document.getElementById('calendar');
    const fragment = document.createDocumentFragment();
    
    for (let i = 1; i &lt;= 7; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = `Day ${i}`;
        fragment.appendChild(day);
    }
    
    calendar.appendChild(fragment);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a week calendar by first building the structure in a
DocumentFragment. The fragment acts as a lightweight container for DOM nodes.

Using DocumentFragment is more efficient when appending multiple elements, as it
minimizes reflows and repaints. All elements are added to the DOM in a single
operation when the fragment is appended.

## Source

[MDN appendChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

In this article, we have shown how to use appendChild in JavaScript.
This method is fundamental for dynamic DOM manipulation and element creation in
web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).