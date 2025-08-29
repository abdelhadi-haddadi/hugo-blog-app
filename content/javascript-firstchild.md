+++
title = "JavaScript firstChild"
date = 2025-08-29T19:53:19.668+01:00
draft = false
description = "Learn how to use JavaScript's firstChild property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript firstChild

last modified April 2, 2025

In this article, we explore the firstChild property in JavaScript.
This property is essential for DOM traversal, allowing developers to access the
first child node of an element.

## Basic Definition

The firstChild property returns the first child node of the
specified element. This includes all node types, not just element nodes.

It's important to note that firstChild can return text nodes,
comment nodes, or element nodes. If the element has no children, it returns
null.

## Accessing First Child Element

This example demonstrates how to access the first child node of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic firstChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const firstChild = container.firstChild;
    console.log(firstChild);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div element with two paragraph children. The
JavaScript code retrieves the first child node using firstChild.

Note that in many cases, this might return a text node containing whitespace
rather than the first paragraph element. This is because whitespace between
tags is considered text nodes.

## Using firstElementChild

This example shows how to get the first child element, ignoring text nodes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;firstElementChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
    &lt;li&gt;Third item&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const firstElement = list.firstElementChild;
    console.log(firstElement.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use firstElementChild instead of firstChild to
directly access the first element child, skipping any text or comment nodes.

This is often more useful when you specifically want to work with element nodes
rather than all node types. The output will be "First item".

## Checking for Child Nodes

This example demonstrates how to safely check for and access the first child.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking firstChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="empty"&gt;&lt;/div&gt;
&lt;div id="content"&gt;Some text&lt;/div&gt;

&lt;script&gt;
    const emptyDiv = document.getElementById('empty');
    const contentDiv = document.getElementById('content');
    
    if (emptyDiv.firstChild) {
        console.log('Empty div has children');
    } else {
        console.log('Empty div has no children');
    }
    
    if (contentDiv.firstChild) {
        console.log('Content:', contentDiv.firstChild.nodeValue);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how to check if an element has any child nodes before
attempting to access firstChild. This prevents errors when working
with potentially empty elements.

The nodeValue property is used to access the text content of text
nodes. For element nodes, this property is null.

## Modifying First Child

This example shows how to modify the first child node of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying firstChild&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="modify"&gt;
    Original text
    &lt;p&gt;Paragraph&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="changeFirstChild()"&gt;Modify&lt;/button&gt;

&lt;script&gt;
    function changeFirstChild() {
        const div = document.getElementById('modify');
        const firstChild = div.firstChild;
        
        if (firstChild.nodeType === Node.TEXT_NODE) {
            firstChild.nodeValue = 'Modified text ';
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with mixed content. The button click handler
finds the first child and modifies it if it's a text node.

We check the nodeType to ensure we're working with a text node
before attempting to modify it. This demonstrates type-safe DOM manipulation.

## Traversing Child Nodes

This example demonstrates using firstChild in node traversal.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Node Traversal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="traverse"&gt;
    &lt;!-- Comment --&gt;
    &lt;span&gt;First span&lt;/span&gt;
    &lt;p&gt;Paragraph&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="traverseNodes()"&gt;Traverse&lt;/button&gt;

&lt;script&gt;
    function traverseNodes() {
        const div = document.getElementById('traverse');
        let currentNode = div.firstChild;
        
        while (currentNode) {
            console.log(currentNode.nodeName, currentNode.nodeType);
            currentNode = currentNode.nextSibling;
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how to traverse all child nodes starting from firstChild.
Each node's name and type are logged to the console.

The traversal uses nextSibling to move to each subsequent node.
This pattern is useful for examining all nodes within an element.

## Source

[MDN firstChild Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)

In this article, we have shown how to use the firstChild property
in JavaScript. This property is fundamental for DOM traversal and node
manipulation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).