+++
title = "JavaScript parentNode"
date = 2025-08-29T19:53:28.611+01:00
draft = false
description = "Learn how to use JavaScript's parentNode property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript parentNode

last modified April 2, 2025

In this article, we explore the parentNode property in JavaScript.
This property is essential for DOM traversal, allowing developers to access an
element's direct parent in the document hierarchy.

## Basic Definition

The parentNode property returns the parent node of the specified
element in the DOM tree. Every node in the DOM has a parent, except for the root
document node.

The parent node can be an element node, a document node, or a document fragment
node. If the node has no parent, parentNode returns null.

## Basic parentNode Example

This example demonstrates how to access the parent of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic parentNode&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    &lt;p id="child"&gt;Child element&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    const parent = child.parentNode;
    console.log(parent.id); // Outputs: parent
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element containing a paragraph. The
JavaScript code gets the paragraph element, then accesses its parent using
parentNode.

This demonstrates the fundamental usage of parentNode to navigate
up the DOM tree. The parent element's ID is then logged to the console.

## Changing Parent Element Style

This example shows how to modify the style of a parent element using parentNode.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Parent Style Change&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;button id="myButton"&gt;Change Parent Color&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const button = document.getElementById('myButton');
    button.addEventListener('click', function() {
        const parent = button.parentNode;
        parent.style.backgroundColor = 'lightblue';
        parent.style.padding = '20px';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a button inside a div container. When clicked, the button uses
parentNode to access its parent div and modify its style.

This demonstrates how parentNode can be used in event handlers to
dynamically modify parent elements. The style changes are applied directly to
the parent container.

## Removing a Child from Its Parent

This example demonstrates how to remove an element from its parent using parentNode.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Remove Child&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li id="removeMe"&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="removeItem()"&gt;Remove Item&lt;/button&gt;

&lt;script&gt;
    function removeItem() {
        const item = document.getElementById('removeMe');
        const parent = item.parentNode;
        parent.removeChild(item);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a list with three items. The button triggers a function
that removes the second list item by accessing its parent and calling
removeChild.

This shows how parentNode is often used with removeChild
to delete elements from the DOM. The parent reference is necessary for this
operation.

## Checking Parent Node Type

This example demonstrates how to check the type of a parent node.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Check Parent Type&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="wrapper"&gt;
    &lt;p id="text"&gt;Sample text&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const text = document.getElementById('text');
    const parent = text.parentNode;
    
    if (parent.nodeType === Node.ELEMENT_NODE) {
        console.log('Parent is an element node');
    } else if (parent.nodeType === Node.DOCUMENT_NODE) {
        console.log('Parent is the document node');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we examine the type of a paragraph's parent node using nodeType.
The code checks whether the parent is an element node or document node.

This demonstrates how parentNode can be used with node type checks
to ensure you're working with the expected kind of parent element in your code.

## Traversing Multiple Levels Up

This example shows how to traverse multiple levels up the DOM tree using parentNode.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multi-level Traversal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="grandparent"&gt;
    &lt;div id="parent"&gt;
        &lt;span id="child"&gt;Click me&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    child.addEventListener('click', function() {
        const parent = child.parentNode;
        const grandparent = parent.parentNode;
        
        console.log('Parent ID:', parent.id);
        console.log('Grandparent ID:', grandparent.id);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a nested structure with grandparent, parent, and child
elements. The click handler traverses up two levels using parentNode.

This demonstrates how multiple parentNode calls can navigate up
through the DOM hierarchy. Each call moves up one level in the tree structure.

## Source

[MDN parentNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)

In this article, we have shown how to use the parentNode property
in JavaScript. This property is fundamental for DOM traversal and manipulation
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).