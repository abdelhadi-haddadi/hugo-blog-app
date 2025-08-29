+++
title = "JavaScript childNodes"
date = 2025-08-29T19:53:15.216+01:00
draft = false
description = "Learn how to use JavaScript's childNodes property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript childNodes

last modified April 2, 2025

In this article, we explore the childNodes property in JavaScript.
This property is essential for DOM traversal, allowing developers to access all
child nodes of an element, including text nodes and comment nodes.

## Basic Definition

The childNodes property returns a NodeList of child nodes of the
given element. Unlike children, it includes all node types, not
just element nodes.

The NodeList is a live collection, meaning it automatically updates when child
nodes are added or removed. Nodes are indexed starting from 0, similar to arrays.

## Basic childNodes Example

This example demonstrates how to access child nodes of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic childNodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    Text content
    &lt;!-- Comment node --&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const parent = document.getElementById('parent');
    const nodes = parent.childNodes;
    
    console.log('Total child nodes:', nodes.length);
    nodes.forEach((node, index) =&gt; {
        console.log(`Node ${index}:`, node);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with various child nodes. The JavaScript code
retrieves all child nodes using childNodes and logs them to the
console.

The output shows that childNodes includes element nodes, text nodes,
and comment nodes. This demonstrates its comprehensive nature compared to
children which only returns element nodes.

## Filtering Element Nodes

This example shows how to filter only element nodes from the childNodes collection.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Filtering Element Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    const allNodes = list.childNodes;
    const elementNodes = Array.from(allNodes).filter(
        node =&gt; node.nodeType === Node.ELEMENT_NODE
    );
    
    console.log('All nodes:', allNodes.length);
    console.log('Element nodes:', elementNodes.length);
    elementNodes.forEach(node =&gt; {
        console.log(node.textContent);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an unordered list with three items. The code first gets all child
nodes, then filters them to include only element nodes (nodeType 1).

This demonstrates how to work with specific node types from the childNodes
collection. The nodeType property helps identify different types
of nodes in the DOM.

## Counting Text Nodes

This example demonstrates how to count and work with text nodes in childNodes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Counting Text Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    Some text
    &lt;p&gt;Paragraph&lt;/p&gt;
    More text
    &lt;span&gt;Span element&lt;/span&gt;
    Final text
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const textNodes = Array.from(container.childNodes).filter(
        node =&gt; node.nodeType === Node.TEXT_NODE &amp;&amp; 
               node.textContent.trim() !== ''
    );
    
    console.log('Text nodes found:', textNodes.length);
    textNodes.forEach((node, index) =&gt; {
        console.log(`Text node ${index + 1}:`, node.textContent.trim());
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with mixed content including text nodes and
element nodes. The code filters out empty text nodes and counts the remaining.

This shows how to handle text nodes specifically, which are often overlooked
but can be important for precise DOM manipulation and content analysis.

## Modifying Child Nodes

This example shows how to modify child nodes after accessing them.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying Child Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;p class="item"&gt;Original text 1&lt;/p&gt;
    &lt;p class="item"&gt;Original text 2&lt;/p&gt;
    &lt;p class="item"&gt;Original text 3&lt;/p&gt;
&lt;/div&gt;
&lt;button onclick="modifyNodes()"&gt;Modify Nodes&lt;/button&gt;

&lt;script&gt;
    function modifyNodes() {
        const content = document.getElementById('content');
        const nodes = content.childNodes;
        
        Array.from(nodes).forEach((node, index) =&gt; {
            if (node.nodeType === Node.ELEMENT_NODE) {
                node.textContent = `Modified text ${index + 1}`;
                node.style.color = 'red';
            }
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div with paragraph elements and a button. When clicked, the
button modifies both the text content and style of each element node.

This demonstrates practical use of childNodes for batch modifications
of DOM elements. The example also shows how to safely handle only element nodes.

## Checking for Child Nodes

This example demonstrates how to check if an element has child nodes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking for Child Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent1"&gt;
    &lt;p&gt;Child paragraph&lt;/p&gt;
&lt;/div&gt;
&lt;div id="parent2"&gt;&lt;/div&gt;

&lt;script&gt;
    const parent1 = document.getElementById('parent1');
    const parent2 = document.getElementById('parent2');
    
    console.log('Parent1 has child nodes:', parent1.hasChildNodes());
    console.log('Parent2 has child nodes:', parent2.hasChildNodes());
    
    if (parent1.hasChildNodes()) {
        console.log('Parent1 first child:', parent1.firstChild);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have two div elements - one with content and one empty.
The code checks each for child nodes using hasChildNodes().

This shows how to safely check for child nodes before attempting to access them.
The firstChild property is also demonstrated for accessing the first
node directly.

## Source

[MDN childNodes Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)

In this article, we have shown how to use the childNodes property
in JavaScript. This property is fundamental for DOM traversal and manipulation
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).