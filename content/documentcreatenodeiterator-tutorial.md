+++
title = "Document.createNodeIterator tutorial"
date = 2025-08-29T19:53:07.246+01:00
draft = false
description = "Document.createNodeIterator tutorial shows how to create a node interator with Document.createNodeIterator() method in JavaScript and iterate over nodes in a document."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Document.createNodeIterator tutorial

last modified August 24, 2023

Document.createNodeIterator tutorial shows how to create a node interator
with Document.createNodeIterator  method in JavaScript and 
iterate over nodes in a document.

## Document.createNodeIterator

Document.createNodeIterator() creates a NodeInterator.
NodeIterator is used to iterate over nodes in a document.

The function has the following synopsis:

let nodeIterator = document.createNodeIterator(root, whatToShow, filter);

The root is the node where the iterator is created. The whatToShow
is a bit mask such as NodeFilter.SHOW_COMMENT or
NodeFilter.SHOW_ELEMENT which determines what types of nodes should
be returned by the NodeIterator.

The filter is an optional parameter; it is a callback function that provides
customized filtering for NodeIterator and TreeWalker.
The filter function accepts a node as its only parameter, and indicates whether
the node is accepted, rejected, or skipped.

## Document.createNodeIterator example

The following example demonstrates the usage of the document's
createNodeIterator function.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document.createNodeIterator&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;h1&gt;Iterating DOM in JavaScript&lt;/h1&gt;

    &lt;p&gt;
        A paragraph.
    &lt;/p&gt;

    &lt;div&gt;
        A generic container with an
        &lt;em&gt;inline&lt;/em&gt; element.
    &lt;/div&gt;

    &lt;ul&gt;
        &lt;li&gt;powerful&lt;/li&gt;
        &lt;li&gt;solid&lt;/li&gt;
        &lt;li&gt;grounded&lt;/li&gt;
    &lt;/ul&gt;

    &lt;script src="main.js"&gt; 
    &lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;

In the example, we have iterate over the document body tag elements and print 
their names to the console. 

main.js
  

window.onload = function () {
    getChildren(document.body);
}

function getChildren(mytag) {

    const nodeIter = document.createNodeIterator(
        mytag,
        NodeFilter.SHOW_ELEMENT,
        (node) =&gt; {
            return NodeFilter.FILTER_ACCEPT;
        }
    );

    let cnode;

    while (cnode = nodeIter.nextNode()) {
        console.log(cnode.tagName.toLowerCase());
    }
}

The JavaScript code creates a node iterator and iterates over elements
of a body tag.

window.onload = function () {
    getChildren(document.body);
}

When the document is fully loaded, we call the getChildren
function and pass it the document's body tag.

const nodeIter = document.createNodeIterator(
    mytag,
    NodeFilter.SHOW_ELEMENT,
    (node) =&gt; {
        return NodeFilter.FILTER_ACCEPT;
    }
);

A node iterator is created with document.createNodeIterator. 
With NodeFilter.SHOW_ELEMENT we tell the iterator to return 
elements. 

while (cnode = nodeIter.nextNode()) {
    console.log(cnode.tagName.toLowerCase());
}

We iterate over the elements in the while loop using the iterator's
nextNode
method. We output the element tag names.

In this article we have iterated over elements of a body tag using a node
iterator.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.