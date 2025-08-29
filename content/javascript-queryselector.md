+++
title = "JavaScript querySelector"
date = 2025-08-29T19:53:29.720+01:00
draft = false
description = "Learn how to use JavaScript's querySelector method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript querySelector

last modified April 2, 2025

In this article, we explore the element.querySelector method in
JavaScript. This powerful method allows developers to find elements using CSS
selectors, providing flexible DOM element selection capabilities.

## Basic Definition

The querySelector method returns the first element that matches a
specified CSS selector within the document or element it's called on. It's part
of modern DOM APIs and works on all modern browsers.

Unlike getElementById, querySelector can find elements
using any CSS selector, including classes, attributes, pseudo-classes, and
complex selector combinations. It returns null if no matches are found.

## Basic querySelector

This example demonstrates how to select an element by its class using querySelector.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic querySelector&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="content"&gt;Hello there!&lt;/div&gt;

&lt;script&gt;
    const element = document.querySelector('.content');
    console.log(element.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we select a div element with the class "content" using
the CSS class selector syntax (.). The method returns the first matching element
which we then log to the console.

This demonstrates the fundamental usage of querySelector with class
selectors. The method is versatile and can be called on any element or document.

## Selecting Nested Elements

This example shows how to use querySelector to find nested elements in the DOM.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p class="message"&gt;This is a message inside the container&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.querySelector('#container');
    const message = container.querySelector('.message');
    console.log(message.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we first select the container div by its ID, then use querySelector on that
element to find a paragraph with class "message". This shows how querySelector
can be scoped to specific parts of the DOM.

Scoping queries to specific containers improves performance and makes code more
maintainable by limiting the search area. This pattern is common in component-based
architectures.

## Attribute Selectors

This example demonstrates using querySelector with attribute selectors.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Attribute Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" data-role="search" placeholder="Search..."&gt;
&lt;button onclick="findInput()"&gt;Find Input&lt;/button&gt;

&lt;script&gt;
    function findInput() {
        const searchInput = document.querySelector('[data-role="search"]');
        searchInput.style.border = '2px solid red';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we use an attribute selector to find an input element with a
specific data-role attribute. When the button is clicked, the input's border
is styled to highlight it.

Attribute selectors are powerful for selecting elements based on custom data
attributes or specific attribute values. They're commonly used in modern web
frameworks and libraries.

## Combining Selectors

This example shows how to combine multiple selectors for more precise targeting.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Combined Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul class="menu"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li class="active"&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const activeItem = document.querySelector('ul.menu li.active');
    activeItem.style.fontWeight = 'bold';
    console.log('Active item:', activeItem.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we combine element, class, and descendant selectors to specifically target
the active menu item. The selector string matches an li with class "active" that
is a descendant of a ul with class "menu".

Combining selectors allows for very precise element targeting without needing to
add excessive IDs or classes. This makes the HTML cleaner while maintaining
specificity in selections.

## Pseudo-class Selectors

This example demonstrates using pseudo-class selectors with querySelector.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pseudo-class Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form&gt;
    &lt;input type="text" required placeholder="Required field"&gt;
    &lt;input type="text" placeholder="Optional field"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    const requiredField = document.querySelector('input:required');
    requiredField.style.backgroundColor = '#fff9e6';
    
    const submitButton = document.querySelector('form button:last-child');
    submitButton.addEventListener('click', () =&gt; {
        alert('Form submitted!');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we use the :required pseudo-class to style required form fields
differently, and the :last-child pseudo-class to target the submit button.
Pseudo-classes provide dynamic selection capabilities.

Pseudo-class selectors are powerful for targeting elements based on their state
or position in the DOM. They're commonly used for form validation and interactive
UI elements.

## Source

[MDN querySelector Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

In this article, we have shown how to use querySelector in JavaScript
with various selector types. This method is essential for modern DOM manipulation
and provides flexible element selection capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).