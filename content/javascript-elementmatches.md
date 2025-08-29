+++
title = "JavaScript element.matches()"
date = 2025-08-29T19:53:25.284+01:00
draft = false
description = "Learn how to use JavaScript's element.matches() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript element.matches()

last modified April 2, 2025

In this article, we explore the element.matches() method in
JavaScript. This method checks if an element matches a specific CSS selector,
making it invaluable for DOM traversal and event delegation.

## Basic Definition

The element.matches() method returns a boolean indicating whether
the element would be selected by the specified CSS selector string. It's part of
the Element API and supported in all modern browsers.

This method is particularly useful for event delegation, where you need to check
if an event target matches certain criteria. It accepts any valid CSS selector
as its parameter, including complex selectors.

## Basic element.matches()

This example demonstrates the basic usage of matches() to check element types.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic matches()&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;Hello there!&lt;/div&gt;
&lt;p class="message"&gt;This is a message.&lt;/p&gt;

&lt;script&gt;
    const div = document.getElementById('content');
    const p = document.querySelector('.message');
    
    console.log(div.matches('div')); // true
    console.log(div.matches('#content')); // true
    console.log(p.matches('div.message')); // false
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we check if elements match different selectors. The div
matches both 'div' and '#content' selectors, while the paragraph doesn't match
a non-existent 'div.message' selector.

This demonstrates the fundamental usage of matches() to verify
element-selector relationships. The method returns true only if the element
would be selected by the given CSS selector.

## Event Delegation with matches()

This example shows how to use matches() for efficient event delegation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event Delegation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="menu"&gt;
    &lt;li class="item"&gt;Home&lt;/li&gt;
    &lt;li class="item active"&gt;Products&lt;/li&gt;
    &lt;li class="item"&gt;About&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    document.getElementById('menu').addEventListener('click', function(e) {
        if (e.target.matches('li.item')) {
            console.log('Menu item clicked:', e.target.textContent);
        }
        
        if (e.target.matches('li.active')) {
            console.log('Active item clicked!');
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use event delegation on a menu list. The click handler checks if the
target matches specific selectors using matches(). This approach
is more efficient than attaching handlers to each item individually.

The example shows how matches() enables selective event handling
based on element characteristics. It works with both single and multiple class
selectors.

## Checking Complex Selectors

This example demonstrates matches() with complex CSS selector combinations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="container"&gt;
    &lt;p class="highlight"&gt;Important text&lt;/p&gt;
    &lt;p&gt;Normal text&lt;/p&gt;
    &lt;a href="#" class="btn highlight"&gt;Button&lt;/a&gt;
&lt;/div&gt;

&lt;script&gt;
    const elements = document.querySelectorAll('.container *');
    
    elements.forEach(el =&gt; {
        if (el.matches('p.highlight')) {
            console.log('Highlighted paragraph:', el.textContent);
        }
        
        if (el.matches('a.btn')) {
            console.log('Button element found');
        }
        
        if (el.matches(':not(.highlight)')) {
            console.log('Element without highlight:', el.tagName);
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows matches() working with complex selectors. We
check for elements with multiple classes, specific combinations, and negation
pseudo-classes.

The method handles all CSS selector types, including attribute selectors,
pseudo-classes, and combinators. This makes it powerful for precise element
selection checks.

## Dynamic Class Checking

This example demonstrates using matches() to check for dynamically added classes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Classes&lt;/title&gt;
    &lt;style&gt;
        .active { color: red; }
        .hidden { display: none; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box" class="box"&gt;Sample Content&lt;/div&gt;
&lt;button onclick="toggleClass()"&gt;Toggle Active&lt;/button&gt;
&lt;button onclick="checkStatus()"&gt;Check Status&lt;/button&gt;

&lt;script&gt;
    const box = document.getElementById('box');
    
    function toggleClass() {
        box.classList.toggle('active');
    }
    
    function checkStatus() {
        const isActive = box.matches('.active');
        console.log('Is box active?', isActive);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we toggle a class on an element and use matches() to check
its current state. The method provides a clean way to verify class presence
without directly accessing classList.

This approach is useful when you need to check complex selector conditions
rather than just class presence. It works with any valid CSS selector,
not just class selectors.

## Form Validation with matches()

This example shows how to use matches() for form validation patterns.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="userForm"&gt;
    &lt;input type="text" id="username" 
           pattern="[A-Za-z]{3,}" 
           title="3+ letters" 
           required&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;script&gt;
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('username');
        const message = document.getElementById('message');
        
        if (input.matches(':invalid')) {
            message.textContent = 'Please enter a valid username (3+ letters)';
            message.style.color = 'red';
        } else {
            message.textContent = 'Form submitted successfully!';
            message.style.color = 'green';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this form validation example, we use matches() with the
':invalid' pseudo-class to check input validity. This approach integrates
with HTML5 validation attributes like 'pattern' and 'required'.

The example demonstrates how matches() can work with
pseudo-classes that reflect element state. This provides a declarative
way to check validation status.

## Source

[MDN element.matches() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)

In this article, we have shown how to use element.matches()
in JavaScript. This method is essential for DOM traversal, event delegation,
and selector matching in modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).