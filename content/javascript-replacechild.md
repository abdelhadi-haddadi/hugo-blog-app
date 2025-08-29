+++
title = "JavaScript replaceChild"
date = 2025-08-29T19:53:31.969+01:00
draft = false
description = "Learn how to use JavaScript's replaceChild method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript replaceChild

last modified April 2, 2025

In this article, we explore the element.replaceChild method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to replace child elements within a parent element.

## Basic Definition

The replaceChild method replaces a child node within the specified
parent node. It takes two parameters: the new node to insert and the old node
to replace.

The method returns the replaced node. If the new node already exists in the DOM,
it will be moved from its current position to the new position.

## Basic replaceChild Example

This example demonstrates how to replace a simple paragraph element with a new one.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic replaceChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p id="oldPara"&gt;This is the old paragraph.&lt;/p&gt;
&lt;/div&gt;

&lt;button onclick="replaceElement()"&gt;Replace Paragraph&lt;/button&gt;

&lt;script&gt;
    function replaceElement() {
        const container = document.getElementById('container');
        const oldPara = document.getElementById('oldPara');
        
        const newPara = document.createElement('p');
        newPara.textContent = 'This is the new paragraph!';
        
        container.replaceChild(newPara, oldPara);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div containing a paragraph. When the button is
clicked, the function creates a new paragraph and replaces the old one using
replaceChild.

The method requires the parent element (container) to call it, passing the new
node and the old node to be replaced. The old node is removed from the DOM.

## Replacing with Existing Element

This example shows how to replace an element with another existing element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Replace with Existing Element&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p id="para1"&gt;First paragraph&lt;/p&gt;
    &lt;p id="para2"&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;button onclick="swapElements()"&gt;Swap Paragraphs&lt;/button&gt;

&lt;script&gt;
    function swapElements() {
        const container = document.getElementById('container');
        const para1 = document.getElementById('para1');
        const para2 = document.getElementById('para2');
        
        // Create a temporary clone of para1
        const temp = para1.cloneNode(true);
        
        // Replace para1 with para2
        container.replaceChild(para2, para1);
        
        // Replace para2 with the original para1 (from temp)
        container.replaceChild(temp, para2);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two paragraphs inside a container. The button click swaps their
positions using replaceChild with a temporary clone.

This demonstrates that when replacing with existing elements, the original
element is moved rather than copied. The temporary clone helps preserve the
original content during the swap.

## Replacing List Items

This example demonstrates replacing items in an unordered list.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Replacing List Items&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="fruitList"&gt;
    &lt;li id="apple"&gt;Apple&lt;/li&gt;
    &lt;li id="banana"&gt;Banana&lt;/li&gt;
    &lt;li id="cherry"&gt;Cherry&lt;/li&gt;
&lt;/ul&gt;

&lt;button onclick="replaceFruit()"&gt;Replace Banana&lt;/button&gt;

&lt;script&gt;
    function replaceFruit() {
        const list = document.getElementById('fruitList');
        const oldItem = document.getElementById('banana');
        
        const newItem = document.createElement('li');
        newItem.textContent = 'Blueberry';
        newItem.id = 'blueberry';
        
        list.replaceChild(newItem, oldItem);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a list of fruits. Clicking the button replaces the
banana item with a new blueberry item using replaceChild.

This shows how replaceChild can be used with list structures to
dynamically update content while maintaining the overall structure.

## Replacing with Event Listeners

This example shows how to replace an element while preserving event listeners.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Replacing with Event Listeners&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;button id="oldBtn"&gt;Click Me&lt;/button&gt;
&lt;/div&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;button onclick="replaceButton()"&gt;Replace Button&lt;/button&gt;

&lt;script&gt;
    // Add event listener to original button
    document.getElementById('oldBtn').addEventListener('click', function() {
        document.getElementById('message').textContent = 'Old button clicked!';
    });

    function replaceButton() {
        const container = document.getElementById('container');
        const oldBtn = document.getElementById('oldBtn');
        
        // Create new button with same functionality
        const newBtn = document.createElement('button');
        newBtn.textContent = 'New Button';
        newBtn.id = 'newBtn';
        
        // Add event listener to new button
        newBtn.addEventListener('click', function() {
            document.getElementById('message').textContent = 'New button clicked!';
        });
        
        container.replaceChild(newBtn, oldBtn);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a button with a click handler. The replace button creates a new
button with similar functionality and replaces the original using
replaceChild.

This demonstrates that event listeners are not automatically transferred when
replacing elements. New listeners must be attached to the replacement element.

## Replacing with Complex Elements

This example shows how to replace an element with a more complex structure.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Replacing with Complex Elements&lt;/title&gt;
    &lt;style&gt;
        .card {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            width: 200px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;div id="simpleCard" class="card"&gt;
        Simple content card
    &lt;/div&gt;
&lt;/div&gt;

&lt;button onclick="replaceWithComplex()"&gt;Replace with Complex Card&lt;/button&gt;

&lt;script&gt;
    function replaceWithComplex() {
        const content = document.getElementById('content');
        const oldCard = document.getElementById('simpleCard');
        
        // Create complex card element
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = 'complexCard';
        
        // Add complex content
        newCard.innerHTML = `
            &lt;h3&gt;Complex Card&lt;/h3&gt;
            &lt;p&gt;This card has multiple elements inside it.&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Item 1&lt;/li&gt;
                &lt;li&gt;Item 2&lt;/li&gt;
                &lt;li&gt;Item 3&lt;/li&gt;
            &lt;/ul&gt;
        `;
        
        content.replaceChild(newCard, oldCard);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we replace a simple card with a more complex one containing
multiple nested elements using replaceChild.

This demonstrates how replaceChild can handle complex DOM structures
and how innerHTML can be used to quickly create nested elements for replacement.

## Source

[MDN replaceChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild)

In this article, we have shown how to use element.replaceChild
in JavaScript. This method is fundamental for DOM manipulation and dynamic
content updates in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).