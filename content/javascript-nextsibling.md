+++
title = "JavaScript nextSibling"
date = 2025-08-29T19:53:25.266+01:00
draft = false
description = "Learn how to use JavaScript's nextSibling property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript nextSibling

last modified April 2, 2025

In this article, we explore the nextSibling property in JavaScript.
This property is essential for DOM traversal, allowing developers to access the
next sibling node of an element in the DOM tree.

## Basic Definition

The nextSibling property returns the node immediately following the
specified node in the parent's childNodes list. This includes all node types,
not just element nodes.

The returned node could be an element node, text node, or comment node. If
there is no next sibling, the property returns null. Whitespace
between elements is often considered text nodes in the DOM.

## Basic nextSibling Usage

This example demonstrates how to access the next sibling of an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic nextSibling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul&gt;
    &lt;li id="first"&gt;First item&lt;/li&gt;
    &lt;li id="second"&gt;Second item&lt;/li&gt;
    &lt;li&gt;Third item&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const firstItem = document.getElementById('first');
    const nextSibling = firstItem.nextSibling;
    console.log(nextSibling); // Might be a text node
    
    const secondItem = firstItem.nextElementSibling;
    console.log(secondItem.id); // "second"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first try to access the next sibling of the first list item.
The direct nextSibling might return a text node due to whitespace.

We then use nextElementSibling which skips non-element nodes and
directly returns the next element sibling. This is often more useful in practice.

## Handling Text Nodes

This example shows how to work with text nodes returned by nextSibling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Text Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p id="para1"&gt;First paragraph&lt;/p&gt;
    Some text between paragraphs
    &lt;p id="para2"&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const para1 = document.getElementById('para1');
    const nextNode = para1.nextSibling;
    
    console.log(nextNode.nodeType); // 3 (text node)
    console.log(nextNode.nodeValue.trim()); // "Some text between paragraphs"
    
    const nextElement = para1.nextElementSibling;
    console.log(nextElement.id); // "para2"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we demonstrate that nextSibling can return text nodes between
elements. We check the nodeType (3 for text nodes) and access its content.

The example also shows how nextElementSibling skips these text nodes
and goes directly to the next element node. Both properties have their uses
depending on your needs.

## Traversing Siblings

This example demonstrates how to traverse through multiple siblings.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Sibling Traversal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li class="item"&gt;Item 1&lt;/li&gt;
    &lt;li class="item"&gt;Item 2&lt;/li&gt;
    &lt;li class="item"&gt;Item 3&lt;/li&gt;
    &lt;li class="item"&gt;Item 4&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const firstItem = document.querySelector('.item');
    let current = firstItem;
    
    while (current) {
        console.log(current.textContent);
        current = current.nextElementSibling;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we start with the first list item and use a while loop to
traverse through all siblings. We use nextElementSibling to skip
any non-element nodes.

This pattern is useful when you need to process all siblings of an element. The
loop continues until nextElementSibling returns null,
indicating no more siblings.

## Modifying Next Sibling

This example shows how to modify the next sibling element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying Sibling&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p id="target"&gt;This will be highlighted&lt;/p&gt;
    &lt;p&gt;Third paragraph&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="highlightNext()"&gt;Highlight Next&lt;/button&gt;

&lt;script&gt;
    function highlightNext() {
        const target = document.getElementById('target');
        const nextPara = target.nextElementSibling;
        
        if (nextPara) {
            nextPara.classList.add('highlight');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a button that highlights the next sibling of our target paragraph.
We use nextElementSibling to get the next paragraph element.

Before applying changes, we check if the sibling exists. This is important to
avoid errors when we reach the last element in a sequence.

## Checking for Last Child

This example demonstrates how to check if an element is the last child.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Last Child Check&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li id="middle"&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const middleItem = document.getElementById('middle');
    const nextSibling = middleItem.nextElementSibling;
    
    if (nextSibling) {
        console.log('Next item:', nextSibling.textContent);
    } else {
        console.log('This is the last item');
    }
    
    const lastItem = document.querySelector('#list li:last-child');
    console.log(lastItem.nextElementSibling === null); // true
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check if an element has a next sibling to determine if it's
the last child. We also demonstrate how to select the last child directly.

This technique is useful when processing lists or menus where you need to handle
the last item differently. The check for null is crucial for robust
code.

## Source

[MDN nextSibling Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)

In this article, we have shown how to use the nextSibling and
nextElementSibling properties in JavaScript. These properties are
essential for DOM traversal and element manipulation in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).