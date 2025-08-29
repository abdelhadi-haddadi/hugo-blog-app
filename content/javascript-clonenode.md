+++
title = "JavaScript cloneNode"
date = 2025-08-29T19:53:18.566+01:00
draft = false
description = "Learn how to use JavaScript's cloneNode method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript cloneNode

last modified April 2, 2025

In this article, we explore the cloneNode method in JavaScript.
This method is essential for DOM manipulation, allowing developers to create
copies of existing DOM elements.

## Basic Definition

The cloneNode method creates a copy of a DOM element. It accepts
one boolean parameter that determines whether to clone all child nodes or not.

When true is passed, it performs a deep clone including all child
nodes. When false, it only clones the element itself without
children. The default value is false.

## Basic cloneNode Example

This example demonstrates how to clone a simple div element and append it.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic cloneNode&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="original"&gt;Original Element&lt;/div&gt;
&lt;button onclick="cloneElement()"&gt;Clone Element&lt;/button&gt;

&lt;script&gt;
    function cloneElement() {
        const original = document.getElementById('original');
        const clone = original.cloneNode(true);
        document.body.appendChild(clone);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with the ID "original". The
JavaScript code clones this element using cloneNode(true) and
appends the clone to the document body.

This demonstrates the fundamental usage of cloneNode to duplicate
elements. The true parameter ensures all child nodes are cloned.

## Shallow vs Deep Cloning

This example shows the difference between shallow and deep cloning.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Shallow vs Deep&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="parent"&gt;
    Parent Element
    &lt;div&gt;Child Element&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="cloneShallow()"&gt;Shallow Clone&lt;/button&gt;
&lt;button onclick="cloneDeep()"&gt;Deep Clone&lt;/button&gt;

&lt;script&gt;
    function cloneShallow() {
        const parent = document.getElementById('parent');
        const clone = parent.cloneNode(false);
        document.body.appendChild(clone);
    }
    
    function cloneDeep() {
        const parent = document.getElementById('parent');
        const clone = parent.cloneNode(true);
        document.body.appendChild(clone);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a parent element with a child element. The cloneShallow
function performs a shallow clone while cloneDeep does a deep clone.

The shallow clone (false) only copies the parent element without
its children. The deep clone (true) copies both the parent and all
its child nodes.

## Cloning with Event Listeners

This example demonstrates how event listeners behave with cloned elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Cloning Events&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="originalBtn"&gt;Original Button&lt;/button&gt;
&lt;button onclick="cloneButton()"&gt;Clone Button&lt;/button&gt;
&lt;div id="output"&gt;&lt;/div&gt;

&lt;script&gt;
    const originalBtn = document.getElementById('originalBtn');
    originalBtn.addEventListener('click', function() {
        document.getElementById('output').textContent = 
            'Original button clicked!';
    });
    
    function cloneButton() {
        const clone = originalBtn.cloneNode(true);
        document.body.appendChild(clone);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a button with an event listener and another button to
clone it. The cloned button won't have the original's event listeners.

This shows that cloneNode only clones the DOM structure and
attributes. Event listeners added with addEventListener are not
copied to the cloned element.

## Cloning Form Elements

This example shows how to clone form elements while preserving their values.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Cloning Forms&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="originalForm"&gt;
    &lt;input type="text" value="Initial value"&gt;
    &lt;input type="checkbox" checked&gt;
&lt;/form&gt;
&lt;button onclick="cloneForm()"&gt;Clone Form&lt;/button&gt;

&lt;script&gt;
    function cloneForm() {
        const form = document.getElementById('originalForm');
        const clone = form.cloneNode(true);
        document.body.appendChild(clone);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a form with a text input and checkbox. The cloneForm
function clones the entire form including its current state.

This demonstrates that cloneNode preserves the current values and
states of form elements when they are cloned. The cloned form will maintain all
attribute values from the original.

## Cloning with Custom Attributes

This example shows how custom data attributes are handled during cloning.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Attributes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="customDiv" data-info="important data"&gt;Element with custom data&lt;/div&gt;
&lt;button onclick="cloneCustom()"&gt;Clone Custom&lt;/button&gt;

&lt;script&gt;
    function cloneCustom() {
        const div = document.getElementById('customDiv');
        const clone = div.cloneNode(true);
        
        // Modify the clone's data attribute
        clone.dataset.info = 'cloned data';
        
        document.body.appendChild(clone);
        
        // Log both elements' data attributes
        console.log('Original:', div.dataset.info);
        console.log('Clone:', clone.dataset.info);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we clone an element with a custom data attribute and then
modify the clone's attribute. Both elements' attributes are logged to console.

This shows that cloneNode copies all attributes, including custom
data attributes. The cloned element is completely independent from the original,
allowing modifications without affecting the source element.

## Source

[MDN cloneNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)

In this article, we have shown how to use the cloneNode method in
JavaScript. This method is powerful for creating copies of DOM elements while
maintaining their structure and attributes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).