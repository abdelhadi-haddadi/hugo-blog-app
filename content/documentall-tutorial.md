+++
title = "Document.all tutorial"
date = 2025-08-29T20:01:15.688+01:00
draft = false
description = "Explore the Document.all property in JavaScript for selecting and interacting with all HTML elements, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Document.all tutorial

last modified last modified April 30, 2025

 

In this article we show how to use the all property to select all HTML
elements in JavaScript.

## Document.all

The all property of the Document object returns an
HTMLAllCollection, representing all the elements within the
document. It provides access to the entire contents of the page as a read-only
collection. While this property can be useful for querying document nodes, it is
considered outdated and should be used with caution, as modern best practices
recommend other DOM methods like querySelector or
getElementById for element selection.

In our example we are going to traverse the returned HTMLAllCollection 
with Ramda library. See [Ramda tutorial](/javascript/ramda/) for more information.

## Document.all example

The following example demonstrates the usage of the document's all property.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
        This is simple web document.
    &lt;/p&gt;

    &lt;script&gt;

        let allTags = document.all;

        let nOfTags = R.length(R.keys(allTags));
        console.log(`There are ${nOfTags} tags in the document`);

        console.log('List of tags:');

        R.forEachObjIndexed((value, key) =&gt; {
            console.log(`${key}: ${value.localName}`);
        }, allTags);

    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

In the document, we display the number of the elements and their list.

&lt;script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js"&gt;&lt;/script&gt;

We include the Ramda library.

let allTags = document.all;

The get all tags with document.all.

let nOfTags = R.length(R.keys(allTags));
console.log(`There are ${nOfTags} tags in the document`);

We compute the number of tags and show the message to the console.

R.forEachObjIndexed((value, key) =&gt; {
    console.log(`${key}: ${value.localName}`);
}, allTags);

With Ramda's forEachObjIndexed we go through the collection 
and output all tag names.

## Highlighting Paragraphs with JavaScript

In this example, we demonstrate how to dynamically highlight all p
elements in a webpage using JavaScript. This is done by toggling a CSS class on
paragraph elements when a button is clicked.

highlight.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Highlight Paragraphs&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h1&gt;JavaScript Paragraph Highlighter&lt;/h1&gt;
    &lt;p&gt;This is the first paragraph.&lt;/p&gt;
    &lt;p&gt;This is the second paragraph.&lt;/p&gt;
    &lt;p&gt;And this is the third paragraph.&lt;/p&gt;

    &lt;button id="highlightBtn"&gt;Highlight All Paragraphs&lt;/button&gt;

    &lt;script&gt;
        document.getElementById("highlightBtn").addEventListener("click", function() {
            let paragraphs = document.querySelectorAll("p");
            paragraphs.forEach(p =&gt; p.classList.toggle("highlight"));
        });
    &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The example uses the querySelectorAll method to select all
p elements. When the button is clicked, the JavaScript code applies
a CSS class (.highlight) to each paragraph, changing its background
color and text weight.

&lt;style&gt;
    .highlight {
        background-color: yellow;
        font-weight: bold;
    }
&lt;/style&gt;

The .highlight CSS class defines the highlighting effect, using a
yellow background and bold text styling.

document.getElementById("highlightBtn").addEventListener("click", function() {
    let paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p =&gt; p.classList.toggle("highlight"));
});

This JavaScript snippet *adds an event listener* to the button. When
clicked, it selects all p elements and toggles the highlight class,
effectively turning the highlight effect *on and off* dynamically.

## Source

[Document: all property](https://developer.mozilla.org/en-US/docs/Web/API/Document/all)

In this article we have worked with the document's all property.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)