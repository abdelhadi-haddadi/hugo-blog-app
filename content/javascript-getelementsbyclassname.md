+++
title = "JavaScript getElementsByClassName"
date = 2025-08-29T19:53:21.897+01:00
draft = false
description = "Learn how to use JavaScript's getElementsByClassName method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getElementsByClassName

last modified April 2, 2025

In this article, we explore the getElementsByClassName method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to access elements by their class attribute.

## Basic Definition

The getElementsByClassName method returns a live HTMLCollection of
elements with the specified class name(s). It can be called on the document
object or any DOM element.

Unlike IDs, class names don't need to be unique. Multiple elements can share
the same class name. The method returns all matching elements in document order.

The returned collection is live, meaning it automatically updates when the DOM
changes. You can specify multiple class names separated by spaces.

## Basic getElementsByClassName

This example demonstrates how to access elements with a specific class name.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getElementsByClassName&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="item"&gt;First item&lt;/div&gt;
&lt;div class="item"&gt;Second item&lt;/div&gt;
&lt;div class="item"&gt;Third item&lt;/div&gt;

&lt;script&gt;
    const items = document.getElementsByClassName('item');
    for (let i = 0; i &lt; items.length; i++) {
        console.log(items[i].textContent);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have three div elements with the class "item". The
JavaScript code retrieves all elements with this class using
getElementsByClassName.

The method returns an HTMLCollection, which we iterate through using a for loop.
For each element, we log its text content to the console.

## Multiple Class Names

This example shows how to select elements that have multiple class names.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Class Names&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="box red"&gt;Red Box&lt;/div&gt;
&lt;div class="box blue"&gt;Blue Box&lt;/div&gt;
&lt;div class="box red large"&gt;Large Red Box&lt;/div&gt;

&lt;script&gt;
    const redBoxes = document.getElementsByClassName('red box');
    for (let box of redBoxes) {
        box.style.border = '2px solid black';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have div elements with various class combinations. We use
getElementsByClassName with two class names separated by a space.

This selects only elements that have both "red" and "box" classes. We then add
a black border to each matching element using a for...of loop.

## Scoped to Parent Element

This example demonstrates how to scope the search to a specific parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scoped Search&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div class="item"&gt;Container Item 1&lt;/div&gt;
    &lt;div class="item"&gt;Container Item 2&lt;/div&gt;
&lt;/div&gt;

&lt;div class="item"&gt;Outside Item&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const containerItems = container.getElementsByClassName('item');
    
    console.log('Items in container:', containerItems.length);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first get a reference to a container element using
getElementById. We then call getElementsByClassName
on this container element.

This limits the search to only elements with class "item" that are descendants
of our container. The outside item is not included in the results.

## Modifying Multiple Elements

This example shows how to modify multiple elements returned by getElementsByClassName.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying Multiple Elements&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p class="text"&gt;First paragraph&lt;/p&gt;
&lt;p class="text"&gt;Second paragraph&lt;/p&gt;
&lt;p class="text"&gt;Third paragraph&lt;/p&gt;
&lt;button onclick="highlightText()"&gt;Highlight Text&lt;/button&gt;

&lt;script&gt;
    function highlightText() {
        const paragraphs = document.getElementsByClassName('text');
        for (let p of paragraphs) {
            p.classList.add('highlight');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have multiple paragraphs with class "text". When the button is clicked,
the highlightText function gets all these paragraphs and adds the
"highlight" class to each.

This demonstrates how to apply changes to multiple elements at once. We use
classList.add to add a new class rather than directly manipulating
style properties.

## Live Collection Behavior

This example demonstrates the live nature of the HTMLCollection returned by getElementsByClassName.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Live Collection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="dynamic"&gt;Initial Item&lt;/div&gt;
&lt;button onclick="addItem()"&gt;Add Item&lt;/button&gt;
&lt;button onclick="showCount()"&gt;Show Count&lt;/button&gt;

&lt;script&gt;
    const dynamicItems = document.getElementsByClassName('dynamic');
    
    function addItem() {
        const newItem = document.createElement('div');
        newItem.className = 'dynamic';
        newItem.textContent = 'New Item ' + (dynamicItems.length + 1);
        document.body.appendChild(newItem);
    }
    
    function showCount() {
        alert('Total items: ' + dynamicItems.length);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we store the collection of elements with class "dynamic" in a
variable. The collection automatically updates when new elements are added.

Clicking "Add Item" creates and appends a new div with the same class. Clicking
"Show Count" displays the current length of the collection, which increases with
each added element.

## Source

[MDN getElementsByClassName Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)

In this article, we have shown how to use getElementsByClassName
in JavaScript. This method is fundamental for selecting multiple elements by
class name in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).