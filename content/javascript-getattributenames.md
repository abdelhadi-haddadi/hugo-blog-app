+++
title = "JavaScript getAttributeNames"
date = 2025-08-29T19:53:20.773+01:00
draft = false
description = "Learn how to use JavaScript's getAttributeNames method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getAttributeNames

last modified April 2, 2025

In this article, we explore the element.getAttributeNames method in
JavaScript. This method returns an array of all attribute names for an element.
It's useful for inspecting and working with element attributes dynamically.

## Basic Definition

The getAttributeNames method returns an array of strings containing
all attribute names of the specified element. This includes both standard HTML
attributes and custom data attributes.

Unlike accessing attributes individually, this method provides a complete list.
It's particularly useful when you need to examine all attributes of an element
without knowing their names in advance.

## Basic getAttributeNames

This example demonstrates how to get all attribute names from a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getAttributeNames&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content" class="main" data-info="sample"&gt;Example div&lt;/div&gt;

&lt;script&gt;
    const element = document.querySelector('div');
    const attributes = element.getAttributeNames();
    console.log(attributes); // ["id", "class", "data-info"]
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with three attributes. The
JavaScript code retrieves all attribute names using getAttributeNames
and logs them to the console.

The method returns an array containing "id", "class", and "data-info". This
shows how it captures both standard and custom data attributes.

## Working with Form Elements

This example shows how to inspect attributes of form input elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Element Attributes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="username" 
       placeholder="Enter name" required data-validation="strict"&gt;

&lt;script&gt;
    const input = document.getElementById('username');
    const attributes = input.getAttributeNames();
    
    attributes.forEach(attr =&gt; {
        console.log(`${attr}: ${input.getAttribute(attr)}`);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an input element with several attributes. The code gets all attribute
names and then loops through them to log both names and values.

This demonstrates how getAttributeNames can be combined with
getAttribute to inspect all attributes of an element
programmatically.

## Checking for Specific Attributes

This example demonstrates how to check if an element has specific attributes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Attribute Checking&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="submitBtn" disabled data-action="save"&gt;Submit&lt;/button&gt;

&lt;script&gt;
    const button = document.getElementById('submitBtn');
    const attributes = button.getAttributeNames();
    
    console.log('Has disabled attribute:', attributes.includes('disabled'));
    console.log('Has data-action attribute:', attributes.includes('data-action'));
    console.log('Has non-existent attribute:', attributes.includes('aria-label'));
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we check if specific attributes exist on a button element.
The includes method is used on the array returned by
getAttributeNames.

This technique is useful for feature detection or conditional logic based on
an element's attributes. It's more reliable than checking attribute values
directly.

## Dynamic Attribute Inspection

This example shows how to dynamically inspect attributes after they change.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Attributes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="dynamicDiv"&gt;Watch my attributes&lt;/div&gt;
&lt;button onclick="addAttribute()"&gt;Add Attribute&lt;/button&gt;
&lt;button onclick="showAttributes()"&gt;Show Attributes&lt;/button&gt;

&lt;script&gt;
    function addAttribute() {
        const div = document.getElementById('dynamicDiv');
        const count = div.getAttributeNames().length;
        div.setAttribute(`data-attr-${count}`, `value-${count}`);
    }
    
    function showAttributes() {
        const div = document.getElementById('dynamicDiv');
        console.log(div.getAttributeNames());
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div and two buttons. One button adds new attributes to the div,
while the other shows all current attributes.

This demonstrates how getAttributeNames can be used to track
dynamic changes to an element's attributes. The method always returns the
current state of attributes.

## Comparing Elements by Attributes

This example shows how to compare two elements based on their attributes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Attribute Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="box" id="box1" data-color="red"&gt;Box 1&lt;/div&gt;
&lt;div class="box" id="box2" data-color="blue"&gt;Box 2&lt;/div&gt;

&lt;script&gt;
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    
    const box1Attrs = box1.getAttributeNames();
    const box2Attrs = box2.getAttributeNames();
    
    // Check if they have the same attribute names (order doesn't matter)
    const sameAttributes = box1Attrs.length === box2Attrs.length &amp;&amp;
                         box1Attrs.every(attr =&gt; box2Attrs.includes(attr));
    
    console.log('Same attributes:', sameAttributes);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we compare two div elements to see if they have the same set
of attribute names, regardless of values.

This technique can be useful when you need to verify that elements follow a
specific attribute pattern or when implementing custom diffing algorithms.

## Source

[MDN getAttributeNames Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNames)

In this article, we have shown how to use element.getAttributeNames
in JavaScript. This method provides powerful capabilities for working with and
inspecting element attributes in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).