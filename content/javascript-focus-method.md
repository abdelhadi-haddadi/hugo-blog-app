+++
title = "JavaScript focus() Method"
date = 2025-08-29T19:53:20.792+01:00
draft = false
description = "Learn how to use JavaScript's focus() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript focus() Method

last modified April 2, 2025

In this article, we explore the element.focus() method in
JavaScript. This method is essential for form handling and user experience,
allowing developers to control focus programmatically.

## Basic Definition

The focus() method sets focus on the specified element, if it can
be focused. This is commonly used with form elements like input, select, and
button elements.

When an element receives focus, it becomes the active element on the page. This
means keyboard events will be directed to this element by default. Not all
elements can receive focus - only interactive elements.

## Basic focus() Example

This example demonstrates how to set focus on an input field when the page loads.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic focus() Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="username" placeholder="Enter your name"&gt;

&lt;script&gt;
    window.onload = function() {
        const input = document.getElementById('username');
        input.focus();
    };
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a text input field. When the page loads, the
JavaScript code uses getElementById to find the input and calls
focus() on it.

This demonstrates the fundamental usage of focus() to improve user
experience by automatically focusing the first input field. The cursor will
appear in the input field immediately.

## Focus After Button Click

This example shows how to move focus to another element after a button click.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Focus After Click&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" id="firstInput" placeholder="First field"&gt;
&lt;button id="myButton"&gt;Click to focus next field&lt;/button&gt;
&lt;input type="text" id="secondInput" placeholder="Second field"&gt;

&lt;script&gt;
    const button = document.getElementById('myButton');
    const secondInput = document.getElementById('secondInput');
    
    button.addEventListener('click', function() {
        secondInput.focus();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two input fields and a button. When the button is clicked, the
event listener moves focus to the second input field using focus().

This demonstrates how focus() can be used to guide users through
form fields in a specific order. It's particularly useful for multi-step forms.

## Focus With Validation

This example demonstrates using focus() to highlight invalid form inputs.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Focus With Validation&lt;/title&gt;
    &lt;style&gt;
        .invalid { border: 2px solid red; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="email" id="email" placeholder="Enter your email"&gt;
&lt;button id="submitBtn"&gt;Submit&lt;/button&gt;

&lt;script&gt;
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    
    submitBtn.addEventListener('click', function() {
        if (!emailInput.value.includes('@')) {
            emailInput.classList.add('invalid');
            emailInput.focus();
            alert('Please enter a valid email address');
        } else {
            alert('Form submitted successfully!');
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we validate an email input when the submit button is clicked.
If the validation fails, we add an 'invalid' class and focus the input field.

This shows how focus() can improve form usability by directing
users to fields that need correction. The visual feedback helps users quickly
identify and fix errors.

## Focus in Modal Dialogs

This example shows how to manage focus when opening a modal dialog.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modal Focus&lt;/title&gt;
    &lt;style&gt;
        .modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: white;
            border: 1px solid #ccc;
            z-index: 100;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="openModal"&gt;Open Modal&lt;/button&gt;

&lt;div class="overlay" id="overlay"&gt;&lt;/div&gt;
&lt;div class="modal" id="modal"&gt;
    &lt;h2&gt;Modal Dialog&lt;/h2&gt;
    &lt;input type="text" id="modalInput"&gt;
    &lt;button id="closeModal"&gt;Close&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const openBtn = document.getElementById('openModal');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    const modalInput = document.getElementById('modalInput');
    
    openBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        modalInput.focus();
    });
    
    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        openBtn.focus();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a modal dialog that appears when a button is clicked. The
focus is automatically moved to an input field inside the modal when it opens.

When the modal closes, focus returns to the original button. This demonstrates
proper focus management for accessibility and keyboard navigation in modal
dialogs.

## Focus Trap for Accessibility

This example shows how to create a focus trap for better accessibility.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Focus Trap&lt;/title&gt;
    &lt;style&gt;
        .modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: white;
            border: 1px solid #ccc;
            z-index: 100;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="openModal"&gt;Open Modal&lt;/button&gt;

&lt;div class="overlay" id="overlay"&gt;&lt;/div&gt;
&lt;div class="modal" id="modal"&gt;
    &lt;h2&gt;Accessible Modal&lt;/h2&gt;
    &lt;input type="text" id="firstField" placeholder="First field"&gt;
    &lt;input type="text" id="secondField" placeholder="Second field"&gt;
    &lt;button id="modalClose"&gt;Close&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const openBtn = document.getElementById('openModal');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modalClose');
    const firstField = document.getElementById('firstField');
    const secondField = document.getElementById('secondField');
    
    let focusableElements;
    let firstFocusable;
    let lastFocusable;
    
    openBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        firstField.focus();
        
        // Get all focusable elements
        focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
    });
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        openBtn.focus();
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This advanced example creates a proper focus trap for modal dialogs. When the
modal is open, the Tab key cycles through only the modal's focusable elements.

This implementation is important for accessibility, ensuring keyboard users
can't accidentally tab out of the modal. The focus is trapped until the modal
is explicitly closed.

## Source

[MDN focus() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)

In this article, we have shown how to use the focus() method in
JavaScript. This method is fundamental for form handling and creating accessible
web interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).