+++
title = "JavaScript document.importNode"
date = 2025-08-29T19:53:11.813+01:00
draft = false
description = "Learn how to use JavaScript's document.importNode method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript document.importNode

last modified April 2, 2025

In this article, we explore the document.importNode method in
JavaScript. This method is essential for working with nodes from external
documents, allowing developers to clone nodes between different documents.

## Basic Definition

The document.importNode method creates a copy of a node from
another document that can be inserted into the current document. This is
particularly useful when working with iframes or XML documents.

The method takes two parameters: the node to import and a boolean indicating
whether to perform a deep clone (including all child nodes) or a shallow clone.

## Basic importNode Example

This example demonstrates how to import a simple paragraph node from one
document to another using iframes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic importNode&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;iframe id="externalFrame" src="external.html" style="display:none"&gt;&lt;/iframe&gt;
&lt;div id="target"&gt;&lt;/div&gt;

&lt;script&gt;
    window.onload = function() {
        const iframe = document.getElementById('externalFrame');
        const externalDoc = iframe.contentDocument || iframe.contentWindow.document;
        const externalNode = externalDoc.getElementById('sourcePara');
        
        const importedNode = document.importNode(externalNode, true);
        document.getElementById('target').appendChild(importedNode);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a hidden iframe loading an external document. When the
page loads, we access the iframe's document, find a paragraph node, import it
using importNode, and append it to our main document.

This demonstrates the fundamental usage of importNode to transfer
nodes between documents. The second parameter (true) ensures a deep clone of
the node and all its children.

## Importing with Shallow Clone

This example shows the difference between deep and shallow cloning when using
importNode.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Shallow Clone&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;iframe id="externalFrame" src="external.html" style="display:none"&gt;&lt;/iframe&gt;
&lt;div id="shallowTarget"&gt;&lt;/div&gt;
&lt;div id="deepTarget"&gt;&lt;/div&gt;

&lt;script&gt;
    window.onload = function() {
        const iframe = document.getElementById('externalFrame');
        const externalDoc = iframe.contentDocument || iframe.contentWindow.document;
        const externalDiv = externalDoc.getElementById('sourceDiv');
        
        // Shallow clone (false)
        const shallowClone = document.importNode(externalDiv, false);
        document.getElementById('shallowTarget').appendChild(shallowClone);
        
        // Deep clone (true)
        const deepClone = document.importNode(externalDiv, true);
        document.getElementById('deepTarget').appendChild(deepClone);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we demonstrate both shallow and deep cloning. The shallow clone (false)
only copies the div element itself without its children, while the deep clone
(true) copies the div and all its nested elements.

This example highlights the importance of the second parameter in
importNode. The choice between shallow and deep cloning depends
on your specific requirements for the node transfer.

## Importing XML Document Nodes

This example demonstrates how to import nodes from an XML document into an HTML
document.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;XML Import&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="xmlContent"&gt;&lt;/div&gt;

&lt;script&gt;
    const parser = new DOMParser();
    const xmlString = `&lt;book&gt;&lt;title&gt;JavaScript Guide&lt;/title&gt;&lt;author&gt;John Doe&lt;/author&gt;&lt;/book&gt;`;
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    const bookNode = xmlDoc.getElementsByTagName('book')[0];
    const importedNode = document.importNode(bookNode, true);
    
    document.getElementById('xmlContent').appendChild(importedNode);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create an XML document using DOMParser, then
import a node from it into our HTML document. The XML structure is preserved
during the import process.

This shows how importNode can be used to transfer content between
different document types. The method works seamlessly with XML documents just
as it does with HTML documents.

## Importing Style Elements

This example demonstrates importing style elements from one document to another.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Style Import&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;iframe id="styleFrame" src="style-doc.html" style="display:none"&gt;&lt;/iframe&gt;
&lt;p id="styledText"&gt;This text will be styled after import.&lt;/p&gt;

&lt;script&gt;
    window.onload = function() {
        const iframe = document.getElementById('styleFrame');
        const externalDoc = iframe.contentDocument || iframe.contentWindow.document;
        const styleNode = externalDoc.getElementsByTagName('style')[0];
        
        const importedStyle = document.importNode(styleNode, true);
        document.head.appendChild(importedStyle);
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we import a style element from an external document and append it to our
main document's head. This allows us to dynamically apply styles from external
sources.

This example shows how importNode can be used with style elements.
The imported styles immediately affect elements in the main document after
appending to the head.

## Importing Complex Structures

This example demonstrates importing a complex DOM structure with event listeners.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Structure&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;iframe id="complexFrame" src="complex-doc.html" style="display:none"&gt;&lt;/iframe&gt;
&lt;div id="complexTarget"&gt;&lt;/div&gt;

&lt;script&gt;
    window.onload = function() {
        const iframe = document.getElementById('complexFrame');
        const externalDoc = iframe.contentDocument || iframe.contentWindow.document;
        const complexNode = externalDoc.getElementById('complexStructure');
        
        const importedNode = document.importNode(complexNode, true);
        document.getElementById('complexTarget').appendChild(importedNode);
        
        // Note: Event listeners from the original node are not copied
        document.getElementById('importedButton').addEventListener('click', function() {
            alert('Button from imported structure clicked!');
        });
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we import a complex DOM structure that includes interactive
elements. Note that event listeners from the original node are not preserved
during import.

This demonstrates that while importNode copies the DOM structure,
it doesn't maintain JavaScript-related properties like event listeners. These
need to be reattached after import if needed.

## Source

[MDN importNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode)

In this article, we have shown how to use document.importNode
in JavaScript. This method is essential for working with nodes from external
documents in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).