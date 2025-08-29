+++
title = "JavaScript form.submit"
date = 2025-08-29T19:53:36.414+01:00
draft = false
description = "Learn how to use JavaScript's form.submit method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript form.submit

last modified April 2, 2025

In this article, we explore the form.submit method in JavaScript.
This method allows developers to submit HTML forms programmatically, enabling
dynamic form handling and enhanced user experiences.

## Basic Definition

The form.submit() method submits a form programmatically without
requiring a submit button click. It triggers the form's submission process just
as if a submit button was clicked.

This method is useful when you need to submit forms based on certain conditions
or events. It bypasses the need for a physical submit button in the form markup.

## Basic form.submit

This example demonstrates how to submit a simple form programmatically.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic form.submit&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="myForm" action="/submit" method="post"&gt;
    &lt;input type="text" name="username" placeholder="Username"&gt;
&lt;/form&gt;

&lt;button onclick="submitForm()"&gt;Submit Form&lt;/button&gt;

&lt;script&gt;
    function submitForm() {
        const form = document.getElementById('myForm');
        form.submit();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a form with an ID and a separate button. The
JavaScript code retrieves the form using getElementById and calls
submit() on it when the button is clicked.

This demonstrates the fundamental usage of form.submit() to trigger
form submission programmatically. The form will be submitted to the specified
action URL with the POST method.

## Form Submission with Validation

This example shows how to validate form data before submission.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="loginForm" action="/login" method="post"&gt;
    &lt;input type="text" id="username" name="username" placeholder="Username"&gt;
    &lt;input type="password" id="password" name="password" placeholder="Password"&gt;
&lt;/form&gt;

&lt;button onclick="validateAndSubmit()"&gt;Login&lt;/button&gt;
&lt;p id="error" style="color:red"&gt;&lt;/p&gt;

&lt;script&gt;
    function validateAndSubmit() {
        const form = document.getElementById('loginForm');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('error');
        
        if (!username || !password) {
            errorElement.textContent = 'Both fields are required!';
            return;
        }
        
        errorElement.textContent = '';
        form.submit();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a login form with validation. The validateAndSubmit
function checks if both fields are filled before allowing submission.

This demonstrates how form.submit() can be used after validation.
The form only submits when all conditions are met, providing better user
feedback than default form submission.

## Delayed Form Submission

This example demonstrates submitting a form after a delay.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Delayed Submission&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="surveyForm" action="/survey" method="post"&gt;
    &lt;textarea name="feedback" placeholder="Your feedback..."&gt;&lt;/textarea&gt;
&lt;/form&gt;

&lt;button onclick="startCountdown()"&gt;Submit Feedback&lt;/button&gt;
&lt;p id="countdown"&gt;&lt;/p&gt;

&lt;script&gt;
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        let seconds = 5;
        
        countdownElement.textContent = `Submitting in ${seconds} seconds...`;
        
        const interval = setInterval(() =&gt; {
            seconds--;
            countdownElement.textContent = `Submitting in ${seconds} seconds...`;
            
            if (seconds &lt;= 0) {
                clearInterval(interval);
                document.getElementById('surveyForm').submit();
            }
        }, 1000);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the button starts a 5-second countdown before form
submission. The user can see the countdown progress before the form submits.

This shows how form.submit() can be used with timing functions to
create delayed submissions. This pattern is useful for confirmation dialogs or
last-chance editing opportunities.

## Multiple Form Submission

This example shows how to submit multiple forms with a single button.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Forms&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="form1" action="/save1" method="post" target="_blank"&gt;
    &lt;input type="text" name="data1" placeholder="Data for form 1"&gt;
&lt;/form&gt;

&lt;form id="form2" action="/save2" method="post" target="_blank"&gt;
    &lt;input type="text" name="data2" placeholder="Data for form 2"&gt;
&lt;/form&gt;

&lt;button onclick="submitAllForms()"&gt;Save All Data&lt;/button&gt;

&lt;script&gt;
    function submitAllForms() {
        document.getElementById('form1').submit();
        document.getElementById('form2').submit();
        alert('Both forms submitted!');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two separate forms that get submitted simultaneously with one
button click. Each form has its own action URL and will submit independently.

This demonstrates how form.submit() can handle multiple forms.
Note that the forms open in new tabs due to the target="_blank"
attribute, which prevents navigation from the current page.

## AJAX Alternative to form.submit

This example shows an AJAX alternative to traditional form submission.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;AJAX Form Submission&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form id="ajaxForm"&gt;
    &lt;input type="text" name="email" placeholder="Your email"&gt;
    &lt;button type="button" onclick="submitViaAJAX()"&gt;Subscribe&lt;/button&gt;
&lt;/form&gt;

&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    function submitViaAJAX() {
        const form = document.getElementById('ajaxForm');
        const formData = new FormData(form);
        const resultElement = document.getElementById('result');
        
        fetch('/subscribe', {
            method: 'POST',
            body: formData
        })
        .then(response =&gt; response.json())
        .then(data =&gt; {
            resultElement.textContent = data.message;
            resultElement.style.color = 'green';
        })
        .catch(error =&gt; {
            resultElement.textContent = 'Error: ' + error.message;
            resultElement.style.color = 'red';
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example uses the Fetch API to submit form data asynchronously without
page reload. The response is handled with promises to provide user feedback.

While not using form.submit() directly, this demonstrates a modern
alternative. AJAX submissions provide better user experience by avoiding full
page reloads and enabling more dynamic responses.

## Source

[MDN form.submit Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit)

In this article, we have shown how to use form.submit() in
JavaScript. This method is essential for programmatic form handling in web
development, offering flexibility in form submission workflows.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).