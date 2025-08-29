+++
title = "JavaScript form.reset()"
date = 2025-08-29T19:53:36.407+01:00
draft = false
description = "Learn how to use JavaScript's form.reset() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript form.reset()

last modified April 2, 2025

In this article, we explore the form.reset() method in JavaScript.
This method is essential for form handling, allowing developers to reset form
fields to their default values with a single function call.

## Basic Definition

The reset() method resets all form controls to their initial values.
This method performs the same action as clicking a form's reset button.

When called, it clears all user input and returns form fields to their default
states. This includes text inputs, checkboxes, radio buttons, and select menus.

## Basic form.reset()

This example demonstrates how to reset a simple form using JavaScript.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic form.reset()&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="myForm"&gt;
    &lt;input type="text" value="Default"&gt;
    &lt;input type="checkbox" checked&gt;
    &lt;button type="button" onclick="resetForm()"&gt;Reset Form&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function resetForm() {
        document.getElementById('myForm').reset();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a form with a text input and checkbox. The
JavaScript code resets the form when the button is clicked, returning all
fields to their initial values.

The reset() method is called on the form element, which we access
using getElementById. This demonstrates the simplest usage of form
reset functionality.

## Resetting Specific Form Fields

This example shows how to reset specific fields while leaving others unchanged.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Partial Form Reset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="userForm"&gt;
    &lt;input type="text" id="username" placeholder="Username"&gt;
    &lt;input type="email" id="email" placeholder="Email"&gt;
    &lt;select id="country"&gt;
        &lt;option value=""&gt;Select country&lt;/option&gt;
        &lt;option value="us"&gt;United States&lt;/option&gt;
        &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
    &lt;/select&gt;
    &lt;button type="button" onclick="resetUsername()"&gt;Reset Username&lt;/button&gt;
    &lt;button type="button" onclick="resetForm()"&gt;Reset All&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function resetUsername() {
        document.getElementById('username').value = '';
    }
    
    function resetForm() {
        document.getElementById('userForm').reset();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a form with multiple fields and two reset buttons. One button resets
just the username field, while the other resets the entire form.

This demonstrates the difference between resetting individual fields and using
the reset() method. The full reset returns all fields to their
default values, not necessarily empty.

## Resetting Form After Submission

This example demonstrates resetting a form after successful submission.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Post-Submission Reset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="contactForm" onsubmit="handleSubmit(event)"&gt;
    &lt;input type="text" id="name" placeholder="Your Name" required&gt;
    &lt;textarea id="message" placeholder="Your Message" required&gt;&lt;/textarea&gt;
    &lt;button type="submit"&gt;Send Message&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function handleSubmit(event) {
        event.preventDefault();
        // Simulate form processing
        setTimeout(() =&gt; {
            alert('Form submitted successfully!');
            document.getElementById('contactForm').reset();
        }, 1000);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, the form is reset after a simulated submission process. The
reset() method is called after showing a success message.

This pattern is common in AJAX form submissions where you want to clear the form
after successful server processing but maintain the page state.

## Resetting Form with Default Values

This example shows how reset works with different default values.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Default Values Reset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="settingsForm"&gt;
    &lt;input type="text" value="Admin"&gt;
    &lt;input type="range" min="0" max="100" value="50"&gt;
    &lt;select&gt;
        &lt;option value="light"&gt;Light Theme&lt;/option&gt;
        &lt;option value="dark" selected&gt;Dark Theme&lt;/option&gt;
    &lt;/select&gt;
    &lt;button type="button" onclick="resetSettings()"&gt;Reset to Defaults&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function resetSettings() {
        document.getElementById('settingsForm').reset();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This form contains fields with various default values. The reset button returns
all fields to these predefined defaults, not empty values.

The reset() method respects the original HTML attributes like
value, checked, and selected when
restoring form state.

## Custom Reset Confirmation

This example adds a confirmation dialog before resetting the form.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Confirm Reset&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="surveyForm"&gt;
    &lt;textarea placeholder="Your feedback"&gt;&lt;/textarea&gt;
    &lt;button type="button" onclick="confirmReset()"&gt;Clear Form&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function confirmReset() {
        if (confirm('Are you sure you want to clear all your answers?')) {
            document.getElementById('surveyForm').reset();
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the confirm() dialog to prevent accidental form resets.
The form only resets if the user confirms their intention.

This is a good practice for forms where users might spend significant time
entering data, providing a safeguard against accidental data loss.

## Source

[MDN form.reset() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset)

In this article, we have shown how to use the form.reset() method
in JavaScript. This method is essential for form handling and user experience
in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).