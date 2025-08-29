+++
title = "JavaScript element.children"
date = 2025-08-29T19:53:16.332+01:00
draft = false
description = "Learn how to use JavaScript's element.children property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript element.children

last modified April 2, 2025

In this article, we explore the element.children property in
JavaScript. This property provides access to an element's child elements,
excluding text nodes and comments. It's essential for DOM traversal.

## Basic Definition

The element.children property returns a live HTMLCollection of
child elements of the given element. It only includes element nodes, not text
or comment nodes.

Unlike childNodes, children is more focused as it
only returns element nodes. This makes it ideal for most DOM manipulation
tasks involving element traversal.

## Accessing Child Elements

This example demonstrates how to access child elements of a parent element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Accessing Children&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
    &lt;div&gt;Nested div&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const parent = document.getElementById('parent');
    const children = parent.children;
    
    console.log(children.length); // 3
    console.log(children[0].textContent); // "First paragraph"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we access the children of a div element with ID "parent".
The children property returns an HTMLCollection of the three
child elements.

We can then access individual children by index and work with their properties.
The collection is live, meaning it automatically updates when the DOM changes.

## Iterating Through Children

This example shows how to loop through all child elements of a parent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Iterating Children&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const list = document.getElementById('list');
    
    for (let i = 0; i &lt; list.children.length; i++) {
        list.children[i].style.color = 'blue';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an unordered list with three items. The JavaScript code uses
children to access all list items and changes their text color.

This demonstrates how to use a standard for loop to iterate through children.
We can perform operations on each child element during the iteration.

## Checking for Children

This example demonstrates how to check if an element has any children.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking Children&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;span&gt;Child element&lt;/span&gt;
&lt;/div&gt;
&lt;div id="empty"&gt;&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const emptyDiv = document.getElementById('empty');
    
    console.log(container.children.length &gt; 0); // true
    console.log(emptyDiv.children.length &gt; 0); // false
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check two div elements to see if they contain any child
elements. The children.length property tells us how many child
elements exist.

This technique is useful for conditional logic based on an element's contents.
Remember that children only counts element nodes, not text nodes.

## Converting Children to Array

This example shows how to convert an HTMLCollection of children to an array.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Children to Array&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="gallery"&gt;
    &lt;img src="image1.jpg"&gt;
    &lt;img src="image2.jpg"&gt;
    &lt;img src="image3.jpg"&gt;
&lt;/div&gt;

&lt;script&gt;
    const gallery = document.getElementById('gallery');
    const childrenArray = Array.from(gallery.children);
    
    childrenArray.forEach(img =&gt; {
        console.log(img.src);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we convert the children of a gallery div into a proper array using
Array.from(). This allows us to use array methods like
forEach.

Converting to an array is helpful when you need array methods that aren't
available on HTMLCollection. It also creates a static snapshot of the elements.

## Filtering Children

This example demonstrates how to filter child elements based on criteria.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Filtering Children&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;p class="important"&gt;Important note&lt;/p&gt;
    &lt;p&gt;Regular text&lt;/p&gt;
    &lt;p class="important"&gt;Another important note&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const content = document.getElementById('content');
    const importantNotes = Array.from(content.children)
        .filter(child =&gt; child.classList.contains('important'));
    
    importantNotes.forEach(note =&gt; {
        note.style.fontWeight = 'bold';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we filter child elements to only select those with the
"important" class. We then apply styling to just these filtered elements.

This demonstrates the power of combining children with array
methods for selective DOM manipulation. The filter operation creates a new
array containing only matching elements.

## Source

[MDN element.children Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)

In this article, we have explored the element.children property
in JavaScript. This property is essential for DOM traversal and manipulation,
providing access to an element's child elements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).