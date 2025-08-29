+++
title = "JavaScript setAttribute"
date = 2025-08-29T19:53:35.288+01:00
draft = false
description = "Learn how to use JavaScript's setAttribute method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript setAttribute

last modified April 2, 2025

In this article, we explore the element.setAttribute method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to add or modify attributes on HTML elements dynamically.

## Basic Definition

The setAttribute method sets the value of an attribute on the
specified element. If the attribute already exists, the value is updated;
otherwise, a new attribute is added with the specified name and value.

This method takes two parameters: the attribute name (string) and the attribute
value (string). It's widely used for modifying element properties like class,
id, style, and custom data attributes.

## Basic setAttribute Example

This example demonstrates how to set a simple attribute on an HTML element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic setAttribute&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="myDiv"&gt;Sample Content&lt;/div&gt;
&lt;button onclick="addClass()"&gt;Add Class&lt;/button&gt;

&lt;script&gt;
    function addClass() {
        const div = document.getElementById('myDiv');
        div.setAttribute('class', 'highlight');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element and a button. When the button is
clicked, the addClass function adds a 'highlight' class to the div
using setAttribute.

This shows the fundamental usage of setAttribute to modify element
attributes. The method works for both standard HTML attributes and custom ones.

## Changing Image Source

This example shows how to dynamically change an image source using setAttribute.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Changing Image Source&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;img id="myImage" src="image1.jpg" alt="Sample Image"&gt;
&lt;button onclick="changeImage()"&gt;Change Image&lt;/button&gt;

&lt;script&gt;
    function changeImage() {
        const img = document.getElementById('myImage');
        img.setAttribute('src', 'image2.jpg');
        img.setAttribute('alt', 'New Image');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have an image element and a button. When clicked, the button changes
both the image source and alt text using setAttribute.

This demonstrates how setAttribute can update multiple attributes
at once. It's particularly useful for dynamic content changes like image
switching.

## Adding Data Attributes

This example demonstrates how to add custom data attributes to elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Data Attributes&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="info"&gt;User Information&lt;/div&gt;
&lt;button onclick="addData()"&gt;Add Data&lt;/button&gt;

&lt;script&gt;
    function addData() {
        const div = document.getElementById('info');
        div.setAttribute('data-user-id', '12345');
        div.setAttribute('data-role', 'admin');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we add custom data attributes to a div element when the button
is clicked. These attributes follow the HTML5 data-* naming convention.

Custom data attributes are useful for storing extra information in HTML elements
that can be accessed later via JavaScript. setAttribute is perfect
for this purpose.

## Disabling a Button

This example shows how to disable a button using setAttribute.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Disabling a Button&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myButton" onclick="disableMe()"&gt;Click to Disable&lt;/button&gt;

&lt;script&gt;
    function disableMe() {
        const btn = document.getElementById('myButton');
        btn.setAttribute('disabled', '');
        btn.textContent = 'Button Disabled';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a button that disables itself when clicked. The
setAttribute method adds the 'disabled' attribute to the button.

Boolean attributes like 'disabled' don't need a value - their presence alone
changes the element's behavior. setAttribute handles these cases
correctly.

## Changing Input Type

This example demonstrates changing an input field's type dynamically.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Changing Input Type&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input id="myInput" type="text" placeholder="Enter password"&gt;
&lt;button onclick="togglePassword()"&gt;Show/Hide Password&lt;/button&gt;

&lt;script&gt;
    function togglePassword() {
        const input = document.getElementById('myInput');
        const currentType = input.getAttribute('type');
        
        if (currentType === 'password') {
            input.setAttribute('type', 'text');
        } else {
            input.setAttribute('type', 'password');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we toggle an input field between text and password types. The
setAttribute method modifies the 'type' attribute based on its
current value.

This demonstrates how setAttribute can be used with
getAttribute to create toggle functionality. It's a common pattern
for password visibility toggles.

## Source

[MDN setAttribute Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

In this article, we have shown how to use element.setAttribute
in JavaScript. This method is fundamental for dynamic attribute manipulation
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).