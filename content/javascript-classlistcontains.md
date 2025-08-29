+++
title = "JavaScript classList.contains"
date = 2025-08-29T19:53:16.321+01:00
draft = false
description = "Learn how to use JavaScript's classList.contains method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript classList.contains

last modified April 2, 2025

In this article, we explore the classList.contains method in
JavaScript. This method is essential for checking CSS class presence on DOM
elements, enabling dynamic styling and behavior in web applications.

## Basic Definition

The classList.contains method checks if an element's class list
contains a specified CSS class. It returns true if the class exists
and false if it doesn't.

This method is part of the DOMTokenList interface provided by the
classList property. It's widely used for conditional styling and
state management in modern web applications.

## Basic classList.contains

This example demonstrates how to check if an element has a specific CSS class.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic classList.contains&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content" class="highlight"&gt;Sample content&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('content');
    const hasClass = element.classList.contains('highlight');
    console.log(hasClass); // Output: true
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with the class "highlight". The
JavaScript code checks for this class using classList.contains.

The method returns true because the element has the specified class.
This demonstrates the fundamental usage of classList.contains.

## Conditional Styling

This example shows how to apply styles conditionally based on class presence.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Styling&lt;/title&gt;
    &lt;style&gt;
        .active {
            color: green;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="status"&gt;Account Status: Normal&lt;/p&gt;
&lt;button onclick="toggleStatus()"&gt;Toggle Status&lt;/button&gt;

&lt;script&gt;
    function toggleStatus() {
        const status = document.getElementById('status');
        if (status.classList.contains('active')) {
            status.textContent = 'Account Status: Normal';
            status.classList.remove('active');
        } else {
            status.textContent = 'Account Status: Active';
            status.classList.add('active');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a paragraph showing account status and a toggle button. The
toggleStatus function checks for the 'active' class using
classList.contains.

Depending on the result, it updates the text and toggles the class. This
demonstrates practical use of classList.contains for UI state.

## Form Validation Feedback

This example demonstrates using classList.contains for form validation feedback.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
    &lt;style&gt;
        .error {
            border: 2px solid red;
        }
        .error-message {
            color: red;
            display: none;
        }
        .show {
            display: block;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="username" placeholder="Username"&gt;
&lt;div id="usernameError" class="error-message"&gt;Username is required&lt;/div&gt;
&lt;button onclick="validateForm()"&gt;Submit&lt;/button&gt;

&lt;script&gt;
    function validateForm() {
        const input = document.getElementById('username');
        const error = document.getElementById('usernameError');
        
        if (input.value.trim() === '') {
            input.classList.add('error');
            error.classList.add('show');
        } else {
            input.classList.remove('error');
            error.classList.remove('show');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this form validation example, we check input values and provide visual
feedback. While not directly using contains, it shows the context.

The example demonstrates how class manipulation (add/remove) works with
classList, which often pairs with contains checks.

## Toggle Navigation Menu

This example shows how to use classList.contains for a responsive navigation menu.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Navigation Menu&lt;/title&gt;
    &lt;style&gt;
        nav {
            background: #333;
            padding: 1rem;
        }
        .nav-links {
            display: flex;
            list-style: none;
        }
        .nav-links li {
            margin-right: 1rem;
        }
        .mobile-menu {
            display: none;
        }
        .show-menu {
            display: flex;
            flex-direction: column;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="menuToggle"&gt;Toggle Menu&lt;/button&gt;
&lt;nav id="mainNav"&gt;
    &lt;ul class="nav-links"&gt;
        &lt;li&gt;Home&lt;/li&gt;
        &lt;li&gt;About&lt;/li&gt;
        &lt;li&gt;Contact&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;

&lt;script&gt;
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    
    toggle.addEventListener('click', function() {
        if (nav.classList.contains('mobile-menu')) {
            nav.classList.remove('mobile-menu');
        } else {
            nav.classList.add('mobile-menu');
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This navigation example toggles between mobile and desktop views. The
classList.contains check determines the current state.

Based on the check, it either adds or removes the mobile menu class. This
pattern is common in responsive design implementations.

## Accordion Component

This example creates an accordion component using classList.contains for state.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Accordion&lt;/title&gt;
    &lt;style&gt;
        .accordion-item {
            border: 1px solid #ddd;
            margin-bottom: 5px;
        }
        .accordion-header {
            padding: 10px;
            background: #f5f5f5;
            cursor: pointer;
        }
        .accordion-content {
            padding: 0 10px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .accordion-item.active .accordion-content {
            max-height: 200px;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="accordion-item"&gt;
    &lt;div class="accordion-header"&gt;Section 1&lt;/div&gt;
    &lt;div class="accordion-content"&gt;
        Content for section 1 goes here.
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class="accordion-item"&gt;
    &lt;div class="accordion-header"&gt;Section 2&lt;/div&gt;
    &lt;div class="accordion-content"&gt;
        Content for section 2 goes here.
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header =&gt; {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(el =&gt; {
                el.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This accordion example uses classList.contains to check if an item
is active before toggling its state. It demonstrates component state management.

The code first closes all items, then opens the clicked one if it wasn't
already active. This creates the standard accordion behavior.

## Source

[MDN classList.contains Documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains)

In this article, we have shown how to use classList.contains in
JavaScript. This method is fundamental for class-based DOM manipulation in
modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).