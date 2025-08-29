+++
title = "JavaScript blur() Method"
date = 2025-08-29T19:53:15.221+01:00
draft = false
description = "Learn how to use JavaScript's blur() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript blur() Method

last modified April 2, 2025

In this article, we explore the blur() method in JavaScript. This
method removes keyboard focus from the current element, which is essential for
creating intuitive user interfaces and form handling.

## Basic Definition

The blur() method removes keyboard focus from the current element.
It is commonly used with form elements like inputs, buttons, and links to
control focus behavior programmatically.

When an element loses focus, it triggers the blur event. This
method is the programmatic equivalent of a user clicking elsewhere on the page.

## Basic blur() Example

This example demonstrates how to remove focus from an input field using blur().

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic blur() Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="myInput" placeholder="Click then blur"&gt;
&lt;button onclick="removeFocus()"&gt;Remove Focus&lt;/button&gt;

&lt;script&gt;
    function removeFocus() {
        const input = document.getElementById('myInput');
        input.blur();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have an input field and a button. When the button is
clicked, the removeFocus function is called, which uses
blur() to remove focus from the input field.

This demonstrates the fundamental usage of blur() to control focus
behavior. The method is called on the element object that currently has focus.

## Form Validation with blur()

This example shows how to use blur() for form validation when leaving a field.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
    &lt;style&gt;
        .error { border: 2px solid red; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="email" id="email" placeholder="Enter email"&gt;
&lt;p id="error" style="color:red"&gt;&lt;/p&gt;

&lt;script&gt;
    const emailInput = document.getElementById('email');
    const errorMsg = document.getElementById('error');
    
    emailInput.addEventListener('blur', function() {
        if (!this.value.includes('@')) {
            this.classList.add('error');
            errorMsg.textContent = 'Please enter a valid email';
        } else {
            this.classList.remove('error');
            errorMsg.textContent = '';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we validate an email input when it loses focus. The blur event
listener checks if the input contains an '@' symbol and shows an error if not.

This demonstrates how blur events can trigger validation. The
actual blur() method would be used to force validation if needed.

## Preventing Focus Stealing

This example demonstrates using blur() to prevent focus stealing by popups.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Prevent Focus Stealing&lt;/title&gt;
    &lt;style&gt;
        #modal { display: none; position: fixed; top: 50%; left: 50%; 
                transform: translate(-50%, -50%); padding: 20px; 
                background: white; border: 1px solid #ccc; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="openModal"&gt;Open Modal&lt;/button&gt;
&lt;div id="modal"&gt;
    &lt;h3&gt;Important Message&lt;/h3&gt;
    &lt;p&gt;Please read this carefully&lt;/p&gt;
    &lt;button id="closeModal"&gt;Close&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const openBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    
    openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        openBtn.blur(); // Remove focus from the triggering button
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the "Open Modal" button shows a modal dialog while
using blur() to remove focus from the button. This prevents the
button from maintaining focus after opening the modal.

This technique improves accessibility by ensuring focus doesn't get "stuck" on
hidden or inactive elements. It's a common pattern in modal implementations.

## Custom Dropdown with blur()

This example shows how to create a custom dropdown that closes on blur.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Dropdown&lt;/title&gt;
    &lt;style&gt;
        .dropdown {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background: #f9f9f9;
            min-width: 160px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
        }
        .dropdown:hover .dropdown-content {
            display: block;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="dropdown" tabindex="0"&gt;
    &lt;button&gt;Select Option&lt;/button&gt;
    &lt;div class="dropdown-content"&gt;
        &lt;a href="#"&gt;Option 1&lt;/a&gt;
        &lt;a href="#"&gt;Option 2&lt;/a&gt;
        &lt;a href="#"&gt;Option 3&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const dropdown = document.querySelector('.dropdown');
    
    dropdown.addEventListener('blur', function() {
        this.querySelector('.dropdown-content').style.display = 'none';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a custom dropdown menu that closes when it loses focus. The
blur event listener hides the dropdown content when focus moves
away from the dropdown container.

This demonstrates how blur events can help manage interactive
components. The tabindex attribute makes the div focusable.

## Focus Management in Single Page Apps

This example shows how to use blur() for better focus management in SPAs.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;SPA Focus Management&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;nav&gt;
    &lt;button id="home"&gt;Home&lt;/button&gt;
    &lt;button id="about"&gt;About&lt;/button&gt;
    &lt;button id="contact"&gt;Contact&lt;/button&gt;
&lt;/nav&gt;
&lt;div id="content"&gt;Home Content&lt;/div&gt;

&lt;script&gt;
    const navButtons = document.querySelectorAll('nav button');
    const contentDiv = document.getElementById('content');
    
    navButtons.forEach(button =&gt; {
        button.addEventListener('click', function() {
            // Remove focus from all nav buttons
            navButtons.forEach(btn =&gt; btn.blur());
            
            // Update content based on clicked button
            contentDiv.textContent = `${this.textContent} Content`;
        });
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this SPA-like example, clicking navigation buttons updates content while
removing focus from all buttons. This prevents focus indicators from remaining
on inactive navigation items.

This technique improves the user experience in single page applications by
cleaning up focus states after navigation actions. It's particularly helpful
for keyboard users.

## Source

[MDN blur() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur)

In this article, we have shown how to use the blur() method in
JavaScript. This method is essential for controlling focus behavior and creating
accessible, user-friendly interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).