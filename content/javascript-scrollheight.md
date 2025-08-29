+++
title = "JavaScript scrollHeight"
date = 2025-08-29T19:53:33.072+01:00
draft = false
description = "Learn how to use JavaScript's scrollHeight property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript scrollHeight

last modified April 2, 2025

In this article, we explore the scrollHeight property in JavaScript.
This property is essential for measuring the full height of an element's content,
including content not visible due to overflow.

## Basic Definition

The scrollHeight property returns the entire height of an element's
content, including content not visible on the screen due to overflow. It is a
read-only property that includes padding but not margins or borders.

Unlike clientHeight, which only measures the visible portion,
scrollHeight measures all content, whether visible or not. This
makes it useful for detecting overflow and implementing scroll-related features.

## Basic scrollHeight Example

This example demonstrates how to get the scrollHeight of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic scrollHeight&lt;/title&gt;
    &lt;style&gt;
        #content {
            height: 100px;
            overflow-y: scroll;
            border: 1px solid #ccc;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;p&gt;This is some content.&lt;/p&gt;
    &lt;p&gt;More content here.&lt;/p&gt;
    &lt;p&gt;Even more content.&lt;/p&gt;
    &lt;p&gt;Content continues.&lt;/p&gt;
    &lt;p&gt;Final piece of content.&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('content');
    console.log('Scroll height:', element.scrollHeight);
    console.log('Client height:', element.clientHeight);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with fixed height and scrollable overflow. The
JavaScript code logs both the scrollHeight (total content height)
and clientHeight (visible height) to the console.

The difference between these values indicates how much content is hidden and
available for scrolling. This is fundamental for understanding scroll behavior.

## Detecting Content Overflow

This example shows how to use scrollHeight to detect if an element's content
overflows its container.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Detecting Overflow&lt;/title&gt;
    &lt;style&gt;
        #box {
            height: 150px;
            border: 1px solid black;
            padding: 10px;
            overflow-y: auto;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;
    &lt;p&gt;Sample content that may or may not overflow.&lt;/p&gt;
&lt;/div&gt;
&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    const box = document.getElementById('box');
    const result = document.getElementById('result');
    
    if (box.scrollHeight &gt; box.clientHeight) {
        result.textContent = 'Content overflows!';
    } else {
        result.textContent = 'Content fits perfectly.';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we compare scrollHeight with clientHeight to
determine if the content exceeds the container's visible area. The result is
displayed in a paragraph element.

This technique is commonly used to implement custom scroll indicators or to
dynamically adjust container sizes based on content length.

## Scroll to Bottom Functionality

This example demonstrates how to automatically scroll an element to its bottom
using scrollHeight.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll to Bottom&lt;/title&gt;
    &lt;style&gt;
        #chat {
            height: 200px;
            overflow-y: scroll;
            border: 1px solid #ddd;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="chat"&gt;
    &lt;p&gt;Welcome to the chat!&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="addMessage()"&gt;Add Message&lt;/button&gt;

&lt;script&gt;
    function addMessage() {
        const chat = document.getElementById('chat');
        const newMsg = document.createElement('p');
        newMsg.textContent = 'New message at ' + new Date().toLocaleTimeString();
        chat.appendChild(newMsg);
        
        // Scroll to bottom
        chat.scrollTop = chat.scrollHeight;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this chat-like interface, clicking the button adds a new message and
automatically scrolls to the bottom. The scrollTop property is set
to the scrollHeight to achieve this effect.

This pattern is essential for chat applications, log viewers, and any interface
where new content should be immediately visible to users.

## Infinite Scroll Detection

This example shows how to use scrollHeight to implement infinite scroll
functionality.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Infinite Scroll&lt;/title&gt;
    &lt;style&gt;
        #container {
            height: 300px;
            overflow-y: scroll;
            border: 1px solid #ccc;
        }
        .item {
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div class="item"&gt;Item 1&lt;/div&gt;
    &lt;div class="item"&gt;Item 2&lt;/div&gt;
    &lt;div class="item"&gt;Item 3&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    let itemCount = 3;
    
    container.addEventListener('scroll', function() {
        // Check if user scrolled near bottom
        if (container.scrollTop + container.clientHeight &gt;= 
            container.scrollHeight - 50) {
            
            // Add more items
            for (let i = 0; i &lt; 3; i++) {
                itemCount++;
                const newItem = document.createElement('div');
                newItem.className = 'item';
                newItem.textContent = 'Item ' + itemCount;
                container.appendChild(newItem);
            }
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example implements infinite scroll by detecting when the user scrolls near
the bottom (within 50px). When triggered, it adds more items to the container.

The calculation uses scrollTop, clientHeight, and
scrollHeight to determine scroll position. This is a common pattern
in modern web applications.

## Dynamic Content Height Adjustment

This example demonstrates how to use scrollHeight to dynamically adjust an
element's height based on its content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Height&lt;/title&gt;
    &lt;style&gt;
        #resizable {
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #999;
            transition: height 0.3s ease;
        }
        button { margin-top: 10px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="resizable"&gt;
    &lt;p&gt;Initial content.&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="toggleContent()"&gt;Toggle Content&lt;/button&gt;

&lt;script&gt;
    function toggleContent() {
        const box = document.getElementById('resizable');
        
        if (box.innerHTML.includes('Additional')) {
            box.innerHTML = '&lt;p&gt;Initial content.&lt;/p&gt;';
        } else {
            box.innerHTML = '&lt;p&gt;Initial content.&lt;/p&gt;' +
                '&lt;p&gt;Additional content line 1.&lt;/p&gt;' +
                '&lt;p&gt;Additional content line 2.&lt;/p&gt;' +
                '&lt;p&gt;Additional content line 3.&lt;/p&gt;';
        }
        
        // Adjust height to fit content
        box.style.height = box.scrollHeight + 'px';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows a container that adjusts its height to fit its content when
the button is clicked. The scrollHeight is used to determine the
exact height needed for all content.

The transition creates a smooth animation effect. This technique is useful for
collapsible panels, accordions, and other UI elements with variable content.

## Source

[MDN scrollHeight Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)

In this article, we have explored the scrollHeight property in
JavaScript. This property is essential for measuring content height, detecting
overflow, and implementing scroll-related functionality in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).