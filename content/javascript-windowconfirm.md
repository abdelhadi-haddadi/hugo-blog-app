+++
title = "JavaScript window.confirm"
date = 2025-08-29T19:53:38.688+01:00
draft = false
description = "Learn how to use JavaScript's window.confirm method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.confirm

last modified April 2, 2025

In this article, we explore the window.confirm method in
JavaScript. This method displays a modal dialog with a message and two
buttons: OK and Cancel. It's commonly used to get user confirmation before
proceeding with an action.

## Basic Definition

The window.confirm method displays a dialog box with a specified
message and OK/Cancel buttons. It returns true if the user clicks
OK and false if the user clicks Cancel or closes the dialog.

This method is part of the browser's window object and is available in all
modern browsers. The dialog appearance is determined by the browser and cannot
be customized with CSS or JavaScript.

## Basic Confirmation Dialog

This example demonstrates the simplest usage of window.confirm to get user
confirmation before proceeding with an action.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Confirm&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="confirmAction()"&gt;Delete Item&lt;/button&gt;

&lt;script&gt;
    function confirmAction() {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            console.log('Item deleted');
        } else {
            console.log('Deletion canceled');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, clicking the button triggers a confirmation dialog.
The user's choice determines which message gets logged to the console.

This demonstrates the fundamental usage of window.confirm to get
user confirmation before performing potentially destructive actions like
deletion.

## Confirm Before Navigation

This example shows how to use window.confirm to prevent accidental navigation
away from a page with unsaved changes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Confirm Navigation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;a href="https://example.com" id="externalLink"&gt;Visit External Site&lt;/a&gt;

&lt;script&gt;
    document.getElementById('externalLink').addEventListener('click', function(e) {
        const confirmed = window.confirm('You are about to leave this site. Continue?');
        if (!confirmed) {
            e.preventDefault();
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we attach a click event listener to a link that shows a confirmation
dialog. If the user cancels, we prevent the default navigation behavior.

This pattern is useful for warning users before they navigate away from pages
with important unsaved data or before visiting external sites.

## Confirm Form Submission

This example demonstrates how to use window.confirm to validate form submission.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Confirm Form&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="myForm"&gt;
    &lt;input type="text" name="username" placeholder="Username" required&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    document.getElementById('myForm').addEventListener('submit', function(e) {
        const confirmed = window.confirm('Are you sure you want to submit this form?');
        if (!confirmed) {
            e.preventDefault();
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we intercept the form submission event and show a confirmation
dialog. The form only submits if the user confirms.

This technique is particularly useful for important forms where accidental
submission could have significant consequences, like purchases or registrations.

## Confirm with Custom Actions

This example shows how to perform different actions based on the user's
confirmation choice.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Actions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="handleSubscription()"&gt;Manage Subscription&lt;/button&gt;
&lt;p id="status"&gt;Status: Active&lt;/p&gt;

&lt;script&gt;
    function handleSubscription() {
        const confirmed = window.confirm('Do you want to cancel your subscription?');
        const statusElement = document.getElementById('status');
        
        if (confirmed) {
            statusElement.textContent = 'Status: Canceled';
            console.log('Subscription canceled');
        } else {
            statusElement.textContent = 'Status: Active (kept)';
            console.log('Subscription maintained');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the confirmation result to update the UI differently based on the
user's choice. The status message changes to reflect the subscription state.

This demonstrates how window.confirm can be integrated into more
complex workflows where different outcomes are possible based on user input.

## Chaining Confirms

This example shows how to use multiple confirmation dialogs for a multi-step
process.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Chaining Confirms&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="resetSystem()"&gt;Reset System&lt;/button&gt;

&lt;script&gt;
    function resetSystem() {
        const confirm1 = window.confirm('This will reset all settings. Continue?');
        if (!confirm1) return;
        
        const confirm2 = window.confirm('WARNING: This cannot be undone. Proceed?');
        if (!confirm2) return;
        
        const confirm3 = window.confirm('Final confirmation. Reset now?');
        if (confirm3) {
            console.log('System reset initiated');
        } else {
            console.log('Reset canceled');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we chain multiple confirmation dialogs to ensure the user
really wants to perform a critical system reset. Each step must be confirmed.

This pattern is useful for dangerous operations where you want to add multiple
layers of confirmation to prevent accidental execution.

## Source

[MDN window.confirm Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)

In this article, we have shown how to use window.confirm in
JavaScript. This method is essential for creating simple confirmation dialogs
and improving user experience in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).