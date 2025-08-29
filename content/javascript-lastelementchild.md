+++
title = "JavaScript lastElementChild"
date = 2025-08-29T19:53:24.089+01:00
draft = false
description = "Learn how to use JavaScript's lastElementChild property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript lastElementChild

last modified April 2, 2025

In this article, we explore the lastElementChild property in
JavaScript. This property is essential for DOM traversal, allowing developers
to access the last child element of any parent element efficiently.

## Basic Definition

The lastElementChild property returns the last child element of
the specified element. It only considers element nodes, ignoring text nodes
and comments.

This property is read-only and returns null if the parent element
has no child elements. It provides a convenient way to access the last element
without needing to traverse all child nodes.

## Basic lastElementChild Usage

This example demonstrates how to access the last child element of a div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic lastElementChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
    &lt;p&gt;Last paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const lastChild = container.lastElementChild;
    console.log(lastChild.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div with three paragraph elements. The
JavaScript code retrieves the container div and then accesses its last child
element using lastElementChild.

The console will log "Last paragraph", demonstrating how this property
quickly accesses the final element child. This is more efficient than
using childNodes and checking node types manually.

## Styling the Last Element

This example shows how to style the last child element differently.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Styling Last Element&lt;/title&gt;
    &lt;style&gt;
        .item {
            padding: 10px;
            margin: 5px;
            background-color: #f0f0f0;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li class="item"&gt;Item 1&lt;/li&gt;
    &lt;li class="item"&gt;Item 2&lt;/li&gt;
    &lt;li class="item"&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const lastItem = list.lastElementChild;
    lastItem.style.backgroundColor = '#ffcccc';
    lastItem.style.fontWeight = 'bold';
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an unordered list with three items. The JavaScript code finds
the last list item using lastElementChild and applies special
styling to it.

This demonstrates a common UI pattern where the last element needs different
styling. The lastElementChild property makes this task simple
and efficient.

## Removing the Last Element

This example demonstrates how to remove the last child element from a parent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Removing Last Element&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="gallery"&gt;
    &lt;img src="image1.jpg" alt="Image 1"&gt;
    &lt;img src="image2.jpg" alt="Image 2"&gt;
    &lt;img src="image3.jpg" alt="Image 3"&gt;
&lt;/div&gt;
&lt;button onclick="removeLastImage()"&gt;Remove Last Image&lt;/button&gt;

&lt;script&gt;
    function removeLastImage() {
        const gallery = document.getElementById('gallery');
        const lastImage = gallery.lastElementChild;
        
        if (lastImage) {
            gallery.removeChild(lastImage);
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have an image gallery and a button. When the button is
clicked, the last image is removed using lastElementChild and
removeChild.

The code first checks if a last child exists before attempting removal. This
prevents errors when the gallery is empty. This pattern is useful for dynamic
content management.

## Comparing with lastChild

This example highlights the difference between lastElementChild and lastChild.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;lastElementChild vs lastChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    Some text node
    &lt;p&gt;Paragraph element&lt;/p&gt;
    Another text node
&lt;/div&gt;

&lt;script&gt;
    const content = document.getElementById('content');
    
    console.log('lastChild:', content.lastChild);
    console.log('lastElementChild:', content.lastElementChild);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows a div containing mixed content: text nodes and an element.
The script logs both lastChild and lastElementChild
for comparison.

lastChild returns the last node (including text nodes), while
lastElementChild only returns the last element node. This
distinction is crucial when working with mixed content.

## Dynamic List Management

This example shows how to use lastElementChild with dynamically created elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic List Management&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="taskList"&gt;&lt;/ul&gt;
&lt;input type="text" id="taskInput" placeholder="Enter task"&gt;
&lt;button onclick="addTask()"&gt;Add Task&lt;/button&gt;
&lt;button onclick="completeLastTask()"&gt;Complete Last&lt;/button&gt;

&lt;script&gt;
    function addTask() {
        const input = document.getElementById('taskInput');
        if (input.value.trim() === '') return;
        
        const list = document.getElementById('taskList');
        const newItem = document.createElement('li');
        newItem.textContent = input.value;
        list.appendChild(newItem);
        input.value = '';
    }
    
    function completeLastTask() {
        const list = document.getElementById('taskList');
        const lastTask = list.lastElementChild;
        
        if (lastTask) {
            lastTask.style.textDecoration = 'line-through';
            lastTask.style.color = '#999';
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a simple task manager. Users can add tasks and mark the
last task as complete. The lastElementChild property helps
identify the most recently added task.

The completeLastTask function uses lastElementChild
to find and style the last task. This demonstrates practical use in dynamic
web applications.

## Source

[MDN lastElementChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild)

In this article, we have shown how to use the lastElementChild
property in JavaScript. This property is fundamental for DOM traversal and
element manipulation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).