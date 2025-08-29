+++
title = "JavaScript window.prompt"
date = 2025-08-29T19:53:39.792+01:00
draft = false
description = "Learn how to use JavaScript's window.prompt method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.prompt

last modified April 2, 2025

In this article, we explore the window.prompt method in
JavaScript. This method displays a dialog box that prompts the visitor
for input, making it useful for simple user interactions.

## Basic Definition

The window.prompt method displays a dialog with an optional
message prompting the user to input some text. It returns the text entered
by the user, or null if the user cancels the dialog.

The method takes two parameters: a message to display (optional) and a
default value for the input field (also optional). The dialog includes
OK and Cancel buttons.

## Basic window.prompt

This example demonstrates the simplest use of window.prompt to get user input.

script.js
    

const name = window.prompt("What is your name?");
console.log(`Hello, ${name || 'anonymous'}!`);

In this basic example, we display a prompt asking for the user's name. The
returned value is stored in the name variable and then logged to the console.

If the user clicks Cancel or closes the dialog, null is returned. The logical
OR operator provides a fallback value in this case. This shows the fundamental
usage of window.prompt.

## Prompt with Default Value

This example shows how to use the second parameter to provide a default value.

script.js
    

const age = window.prompt("Enter your age:", "30");
if (age !== null) {
    console.log(`You are ${age} years old.`);
} else {
    console.log("Age input was canceled.");
}

Here we provide a default value of "30" for the age input. The user can
either accept this value or enter a different one. We also demonstrate
proper null checking.

This pattern is useful when you want to suggest a likely value to the user
while still allowing them to change it. The default value appears selected
in the input field.

## Number Input Validation

This example demonstrates how to validate numeric input from a prompt.

script.js
    

let number;
do {
    const input = window.prompt("Enter a number between 1 and 100:");
    if (input === null) {
        console.log("Input canceled");
        break;
    }
    number = Number(input);
} while (isNaN(number) || number &lt; 1 || number &gt; 100);

if (number) {
    console.log(`You entered: ${number}`);
}

This code repeatedly prompts the user until they enter a valid number in the
specified range or cancel the prompt. We use Number() to convert the string
input to a number.

The validation checks for NaN (Not a Number) and ensures the number is within
the required range. This shows how to handle user input validation with prompts.

## Conditional Logic Based on Prompt

This example shows how to use prompt input in conditional logic.

script.js
    

const response = window.prompt("Do you like JavaScript? (yes/no)");
if (response === null) {
    console.log("User canceled the question.");
} else if (response.toLowerCase() === "yes") {
    console.log("Great! JavaScript is awesome!");
} else if (response.toLowerCase() === "no") {
    console.log("That's too bad. Maybe you'll change your mind.");
} else {
    console.log("Please answer with 'yes' or 'no'.");
}

Here we ask a yes/no question and respond differently based on the user's
input. We convert the response to lowercase to make the comparison case-
insensitive.

This demonstrates how to use prompt input to drive program logic. The else
branch handles unexpected input, making the code more robust.

## Storing Multiple Prompt Responses

This example shows how to collect and store multiple pieces of information.

script.js
    

const user = {};
user.name = window.prompt("What is your name?");
user.age = window.prompt("What is your age?");
user.email = window.prompt("What is your email?");

if (user.name &amp;&amp; user.age &amp;&amp; user.email) {
    console.log("User profile created:");
    console.log(user);
} else {
    console.log("Profile creation canceled or incomplete.");
}

In this example, we create a user object and populate its properties with
values from multiple prompts. We then check if all required fields were
provided before proceeding.

This pattern is useful for collecting several pieces of information in
sequence. The object structure helps organize the collected data.

## Source

[MDN window.prompt Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)

In this article, we have shown how to use window.prompt
in JavaScript. This method is useful for simple user interactions and
input collection in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).