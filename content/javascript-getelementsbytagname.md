+++
title = "JavaScript getElementsByTagName"
date = 2025-08-29T19:53:21.903+01:00
draft = false
description = "Learn how to use JavaScript's getElementsByTagName method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getElementsByTagName

last modified April 2, 2025

In this article, we explore the getElementsByTagName method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to access elements by their tag name within a specific context.

## Basic Definition

The getElementsByTagName method returns a live HTMLCollection of
elements with the given tag name. It can be called on any element or the
document object to search within that context.

Unlike getElementById, this method returns multiple elements. The
collection is live, meaning it automatically updates when the DOM changes.

## Basic getElementsByTagName

This example demonstrates how to access all paragraph elements in a document.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getElementsByTagName&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;First paragraph&lt;/p&gt;
&lt;p&gt;Second paragraph&lt;/p&gt;
&lt;div&gt;A div element&lt;/div&gt;
&lt;p&gt;Third paragraph&lt;/p&gt;

&lt;script&gt;
    const paragraphs = document.getElementsByTagName('p');
    console.log(paragraphs.length); // Outputs: 3
    console.log(paragraphs[1].textContent); // Outputs: Second paragraph
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we use getElementsByTagName to get all
paragraph elements. The method returns an HTMLCollection that we can access
like an array.

The example shows how to check the number of elements found and how to access
specific elements from the collection by their index position.

## Searching Within a Specific Element

This example shows how to use getElementsByTagName on a specific
element rather than the entire document.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Searching Within Element&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    &lt;p&gt;First paragraph in content&lt;/p&gt;
    &lt;span&gt;A span element&lt;/span&gt;
    &lt;p&gt;Second paragraph in content&lt;/p&gt;
&lt;/div&gt;
&lt;p&gt;Paragraph outside content&lt;/p&gt;

&lt;script&gt;
    const contentDiv = document.getElementById('content');
    const contentParagraphs = contentDiv.getElementsByTagName('p');
    
    console.log(contentParagraphs.length); // Outputs: 2
    contentParagraphs[0].style.color = 'red';
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we first get a reference to a specific div element, then use
getElementsByTagName on that element to find only paragraphs
within it.

This demonstrates how the search scope can be limited to a specific part of
the DOM tree, which is more efficient than searching the entire document.

## Working with the Live Collection

This example demonstrates the live nature of the HTMLCollection returned by
getElementsByTagName.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Live Collection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;
&lt;button onclick="addItem()"&gt;Add Item&lt;/button&gt;

&lt;script&gt;
    const listItems = document.getElementsByTagName('li');
    console.log(listItems.length); // Initially 2
    
    function addItem() {
        const newItem = document.createElement('li');
        newItem.textContent = 'New Item';
        document.getElementById('list').appendChild(newItem);
        console.log(listItems.length); // Increases each click
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how the collection automatically updates when new elements
are added to the DOM. The listItems collection stays current
without needing to requery.

The live nature of the collection can be both useful and potentially
problematic in certain scenarios, especially with performance in large DOMs.

## Iterating Through Elements

This example demonstrates different ways to iterate through the elements
returned by getElementsByTagName.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Iterating Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="item"&gt;Item 1&lt;/div&gt;
&lt;div class="item"&gt;Item 2&lt;/div&gt;
&lt;div class="item"&gt;Item 3&lt;/div&gt;

&lt;script&gt;
    const items = document.getElementsByTagName('div');
    
    // Using a for loop
    for (let i = 0; i &lt; items.length; i++) {
        items[i].style.color = 'blue';
    }
    
    // Using for...of (modern browsers)
    for (const item of items) {
        item.style.fontWeight = 'bold';
    }
    
    // Converting to array (for array methods)
    Array.from(items).forEach(item =&gt; {
        console.log(item.textContent);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three different approaches to working with the collection:
traditional for loop, for...of loop, and converting to an array.

Each method has its use cases. The array conversion is particularly useful
when you want to use array methods like forEach, map,
or filter.

## Combining with Other DOM Methods

This example shows how to combine getElementsByTagName with other
DOM methods for more complex queries.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combining Methods&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="section"&gt;
    &lt;h2&gt;Section 1&lt;/h2&gt;
    &lt;p&gt;Content 1&lt;/p&gt;
&lt;/div&gt;
&lt;div class="section"&gt;
    &lt;h2&gt;Section 2&lt;/h2&gt;
    &lt;p&gt;Content 2&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    // Get all sections
    const sections = document.getElementsByClassName('section');
    
    // For each section, get its h2 and p elements
    for (const section of sections) {
        const heading = section.getElementsByTagName('h2')[0];
        const paragraph = section.getElementsByTagName('p')[0];
        
        console.log(heading.textContent + ': ' + paragraph.textContent);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first get all elements with class "section", then for each
section we find its h2 and p elements using getElementsByTagName.

This demonstrates how DOM methods can be combined to create more specific
queries, allowing you to precisely target the elements you need to work with.

## Source

[MDN getElementsByTagName Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName)

In this article, we have shown how to use getElementsByTagName
in JavaScript. This method is fundamental for DOM manipulation when you need
to work with elements by their tag name.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).