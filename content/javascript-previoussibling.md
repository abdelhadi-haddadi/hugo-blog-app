+++
title = "JavaScript previousSibling"
date = 2025-08-29T19:53:29.734+01:00
draft = false
description = "Learn how to use JavaScript's previousSibling property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript previousSibling

last modified April 2, 2025

In this article, we explore the previousSibling property in
JavaScript. This property is essential for DOM traversal, allowing developers
to access the previous sibling node of an element in the document tree.

## Basic Definition

The previousSibling property returns the previous node in the same
tree level (sibling) of the specified element. This includes all node types,
not just element nodes.

It's important to note that previousSibling returns the immediate
previous sibling node, which might be a text node, comment node, or element
node. Whitespace between elements often creates text nodes.

## Basic previousSibling

This example demonstrates how to access the previous sibling of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic previousSibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First div&lt;/div&gt;
&lt;div id="second"&gt;Second div&lt;/div&gt;

&lt;script&gt;
    const second = document.getElementById('second');
    const previous = second.previousSibling;
    console.log(previous); // Might be a text node
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have two div elements. The JavaScript code retrieves
the second div and then accesses its previous sibling. Note that the result
might be a text node containing whitespace.

This demonstrates the fundamental usage of previousSibling to
navigate the DOM tree. The property returns the node immediately before the
current node in the parent's childNodes list.

## Accessing Element Nodes

This example shows how to specifically access previous element siblings.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Element Siblings&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First div&lt;/div&gt;
&lt;!-- Comment --&gt;
&lt;div id="second"&gt;Second div&lt;/div&gt;

&lt;script&gt;
    const second = document.getElementById('second');
    let previous = second.previousSibling;
    
    // Loop to find the previous element node
    while (previous &amp;&amp; previous.nodeType !== 1) {
        previous = previous.previousSibling;
    }
    
    console.log(previous); // First div element
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two div elements with a comment node between them. The code finds
the second div and then loops through previous siblings until it finds an
element node (nodeType 1).

This demonstrates how to handle cases where non-element nodes exist between
elements. The nodeType check ensures we get an element node.

## Modifying Previous Sibling

This example demonstrates how to modify the previous sibling element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying Sibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;First paragraph&lt;/p&gt;
&lt;p id="target"&gt;Target paragraph&lt;/p&gt;
&lt;button onclick="changePrevious()"&gt;Change Previous&lt;/button&gt;

&lt;script&gt;
    function changePrevious() {
        const target = document.getElementById('target');
        const previous = target.previousElementSibling;
        
        if (previous) {
            previous.style.color = 'red';
            previous.textContent = 'Modified content!';
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have two paragraphs and a button. When clicked, the button
changes the style and content of the previous sibling of the target paragraph.

This shows how previousSibling (or previousElementSibling)
can be used to dynamically modify adjacent elements. The example uses
previousElementSibling to skip non-element nodes.

## Checking Sibling Existence

This example shows how to check if a previous sibling exists before accessing it.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking Siblings&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="first"&gt;First element&lt;/div&gt;

&lt;script&gt;
    const first = document.getElementById('first');
    const previous = first.previousSibling;
    
    if (previous) {
        console.log('Previous sibling exists:', previous);
    } else {
        console.log('No previous sibling');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a single div element. The JavaScript code checks if it has a
previous sibling before attempting to access it, preventing potential errors.

This demonstrates an important safety practice when working with sibling
properties. Always check if the sibling exists before trying to access its
properties or methods.

## Navigating Complex DOM

This example shows how to navigate through multiple sibling nodes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex DOM Navigation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div&gt;First&lt;/div&gt;
&lt;span&gt;Second&lt;/span&gt;
&lt;!-- Comment --&gt;
&lt;p id="start"&gt;Third&lt;/p&gt;
&lt;div&gt;Fourth&lt;/div&gt;

&lt;script&gt;
    const start = document.getElementById('start');
    let node = start;
    let count = 0;
    
    // Count all previous siblings
    while (node = node.previousSibling) {
        count++;
    }
    
    console.log(`Total previous siblings: ${count}`);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have multiple nodes of different types. The JavaScript code
starts from a specific element and counts all previous siblings, regardless of
their type.

This demonstrates how previousSibling can be used to traverse
through all preceding nodes in the DOM tree. The loop continues until there are
no more previous siblings.

## Source

[MDN previousSibling Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)

In this article, we have shown how to use the previousSibling
property in JavaScript. This property is fundamental for DOM traversal and
element navigation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).