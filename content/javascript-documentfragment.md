+++
title = "JavaScript DocumentFragment"
date = 2025-08-29T19:53:08.369+01:00
draft = false
description = "Learn how to use JavaScript's DocumentFragment for efficient DOM manipulation with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript DocumentFragment

last modified April 2, 2025

In this article, we explore the document.createDocumentFragment method in
JavaScript. This powerful tool helps optimize DOM manipulation by creating lightweight
document fragments that can be modified before being added to the main DOM tree.

## Basic Definition

A DocumentFragment is a minimal document object that has no parent. It is
used as a lightweight version of Document that stores a segment of a
document structure comprised of nodes just like a standard document.

The key advantage of DocumentFragment is that changes made to it don't trigger
reflows or repaints until it's appended to the main document. This makes it ideal
for batch DOM operations.

## Basic DocumentFragment Creation

This example demonstrates how to create and use a basic DocumentFragment.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic DocumentFragment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;&lt;/div&gt;

&lt;script&gt;
    const fragment = document.createDocumentFragment();
    const p1 = document.createElement('p');
    p1.textContent = 'First paragraph';
    const p2 = document.createElement('p');
    p2.textContent = 'Second paragraph';
    
    fragment.appendChild(p1);
    fragment.appendChild(p2);
    
    document.getElementById('container').appendChild(fragment);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a DocumentFragment and add two paragraph elements to it.
The fragment is then appended to the container div in a single operation.

This approach is more efficient than adding each paragraph directly to the DOM,
as it minimizes reflows. The fragment acts as a temporary container for our nodes.

## Batch DOM Insertion

This example shows how DocumentFragment can optimize batch insertion of elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Batch Insertion&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;&lt;/ul&gt;
&lt;button onclick="addItems()"&gt;Add Items&lt;/button&gt;

&lt;script&gt;
    function addItems() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 1; i &lt;= 100; i++) {
            const li = document.createElement('li');
            li.textContent = `Item ${i}`;
            fragment.appendChild(li);
        }
        
        document.getElementById('list').appendChild(fragment);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create 100 list items and add them to a DocumentFragment before inserting
them into the DOM all at once. This is much more efficient than adding each item
individually.

Without DocumentFragment, the browser would reflow after each insertion. With it,
we get a single reflow when the fragment is appended to the actual DOM.

## Template Cloning

This example demonstrates using DocumentFragment with template elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Template Cloning&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;template id="productTemplate"&gt;
    &lt;div class="product"&gt;
        &lt;h3&gt;&lt;/h3&gt;
        &lt;p class="price"&gt;&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;div id="products"&gt;&lt;/div&gt;
&lt;button onclick="addProducts()"&gt;Add Products&lt;/button&gt;

&lt;script&gt;
    function addProducts() {
        const template = document.getElementById('productTemplate');
        const fragment = document.createDocumentFragment();
        
        const products = [
            { name: 'Laptop', price: '$999' },
            { name: 'Phone', price: '$699' },
            { name: 'Tablet', price: '$399' }
        ];
        
        products.forEach(product =&gt; {
            const instance = template.content.cloneNode(true);
            instance.querySelector('h3').textContent = product.name;
            instance.querySelector('.price').textContent = product.price;
            fragment.appendChild(instance);
        });
        
        document.getElementById('products').appendChild(fragment);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example combines HTML templates with DocumentFragment for efficient DOM
creation. We clone the template content for each product and add it to the
fragment before insertion.

The template content is itself a DocumentFragment, which we clone and modify
before adding to our main fragment. This pattern is very efficient for
repeating UI elements.

## Moving Existing Nodes

This example shows how to use DocumentFragment to move existing DOM nodes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Moving Nodes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="source"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
    &lt;p&gt;Third paragraph&lt;/p&gt;
&lt;/div&gt;

&lt;div id="destination"&gt;&lt;/div&gt;
&lt;button onclick="moveNodes()"&gt;Move Paragraphs&lt;/button&gt;

&lt;script&gt;
    function moveNodes() {
        const source = document.getElementById('source');
        const fragment = document.createDocumentFragment();
        
        while (source.firstChild) {
            fragment.appendChild(source.firstChild);
        }
        
        document.getElementById('destination').appendChild(fragment);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we move all child nodes from the source div to the destination div using
a DocumentFragment. This is more efficient than moving nodes one by one.

The fragment temporarily holds the nodes during the move operation. This
technique is useful when reorganizing DOM structures without temporary
variables.

## Performance Comparison

This example demonstrates the performance difference between using DocumentFragment
and direct DOM manipulation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Performance Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="testFragment()"&gt;Test Fragment&lt;/button&gt;
&lt;button onclick="testDirect()"&gt;Test Direct&lt;/button&gt;
&lt;div id="results"&gt;&lt;/div&gt;

&lt;script&gt;
    function testFragment() {
        const start = performance.now();
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i &lt; 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            fragment.appendChild(div);
        }
        
        document.body.appendChild(fragment);
        const time = performance.now() - start;
        document.getElementById('results').textContent = 
            `Fragment time: ${time.toFixed(2)}ms`;
    }
    
    function testDirect() {
        const start = performance.now();
        
        for (let i = 0; i &lt; 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            document.body.appendChild(div);
        }
        
        const time = performance.now() - start;
        document.getElementById('results').textContent = 
            `Direct time: ${time.toFixed(2)}ms`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example compares the performance of adding 1000 elements using DocumentFragment
versus adding them directly to the DOM. The fragment method is significantly faster.

The performance difference comes from reduced reflows. Each direct append causes
a reflow, while the fragment approach results in just one reflow at the end.

## Source

[MDN DocumentFragment Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)

In this article, we have shown how to use document.createDocumentFragment
in JavaScript. This technique is essential for optimizing DOM manipulation and
improving web application performance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).