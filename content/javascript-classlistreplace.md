+++
title = "JavaScript classList.replace"
date = 2025-08-29T19:53:17.451+01:00
draft = false
description = "Learn how to use JavaScript's classList.replace method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript classList.replace

last modified April 2, 2025

In this article, we explore the classList.replace method in
JavaScript. This method is essential for dynamically modifying CSS classes
on DOM elements, allowing for flexible styling changes.

## Basic Definition

The classList.replace method replaces an existing class with
a new class on an element. It is part of the DOMTokenList interface
returned by the element.classList property.

The method takes two parameters: the class to replace and the new class
to add. It returns true if the replacement was successful, false otherwise.
The original class must exist for the replacement to work.

## Basic classList.replace

This example demonstrates how to replace a simple CSS class on an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic classList.replace&lt;/title&gt;
    &lt;style&gt;
        .old-style { color: red; }
        .new-style { color: blue; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text" class="old-style"&gt;This text will change color&lt;/p&gt;
&lt;button onclick="replaceClass()"&gt;Replace Class&lt;/button&gt;

&lt;script&gt;
    function replaceClass() {
        const element = document.getElementById('text');
        element.classList.replace('old-style', 'new-style');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a paragraph with the class "old-style".
When the button is clicked, the class is replaced with "new-style".

This demonstrates the fundamental usage of classList.replace.
The text color changes from red to blue when the class is replaced.

## Toggle Between Classes

This example shows how to toggle between two classes using replace.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Toggle Classes&lt;/title&gt;
    &lt;style&gt;
        .day { background-color: white; color: black; }
        .night { background-color: black; color: white; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="theme" class="day"&gt;
    &lt;p&gt;Theme content&lt;/p&gt;
    &lt;button onclick="toggleTheme()"&gt;Toggle Theme&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    function toggleTheme() {
        const theme = document.getElementById('theme');
        if (theme.classList.contains('day')) {
            theme.classList.replace('day', 'night');
        } else {
            theme.classList.replace('night', 'day');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a theme container with day and night classes. The button
toggles between these themes by replacing one class with another.

This demonstrates how classList.replace can be used with
classList.contains to implement theme switching functionality.

## Error Handling

This example demonstrates error handling when replacing non-existent classes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Error Handling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="message" class="active"&gt;Status message&lt;/p&gt;
&lt;button onclick="deactivate()"&gt;Deactivate&lt;/button&gt;

&lt;script&gt;
    function deactivate() {
        const msg = document.getElementById('message');
        const success = msg.classList.replace('active', 'inactive');
        
        if (!success) {
            console.log('Class replacement failed - active class not found');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we attempt to replace the "active" class with "inactive".
The method returns false if the original class doesn't exist.

This shows how to handle cases where class replacement might fail. Checking
the return value helps ensure robust code when dealing with dynamic classes.

## Animation Class Replacement

This example shows how to replace animation classes for smooth transitions.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animation Replacement&lt;/title&gt;
    &lt;style&gt;
        .slide-in { animation: slideIn 0.5s forwards; }
        .slide-out { animation: slideOut 0.5s forwards; }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="panel" class="slide-in"&gt;Content Panel&lt;/div&gt;
&lt;button onclick="toggleSlide()"&gt;Toggle Slide&lt;/button&gt;

&lt;script&gt;
    function toggleSlide() {
        const panel = document.getElementById('panel');
        if (panel.classList.contains('slide-in')) {
            panel.classList.replace('slide-in', 'slide-out');
        } else {
            panel.classList.replace('slide-out', 'slide-in');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a panel with slide animations. The button toggles between
sliding in and sliding out animations by replacing the animation classes.

This demonstrates how classList.replace can create smooth
animations by swapping CSS animation classes dynamically.

## Multiple Class Replacement

This example shows how to replace multiple classes in sequence.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Replacements&lt;/title&gt;
    &lt;style&gt;
        .state-1 { background: lightblue; }
        .state-2 { background: lightgreen; }
        .state-3 { background: lightcoral; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="status" class="state-1"&gt;Process Status&lt;/div&gt;
&lt;button onclick="advanceState()"&gt;Next State&lt;/button&gt;

&lt;script&gt;
    function advanceState() {
        const status = document.getElementById('status');
        
        if (status.classList.contains('state-1')) {
            status.classList.replace('state-1', 'state-2');
        } else if (status.classList.contains('state-2')) {
            status.classList.replace('state-2', 'state-3');
        } else {
            status.classList.replace('state-3', 'state-1');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we cycle through three different states by replacing
classes. Each state has a different background color.

This demonstrates how classList.replace can manage multiple
state changes in a UI component by systematically replacing classes.

## Source

[MDN classList.replace Documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace)

In this article, we have shown how to use classList.replace
in JavaScript. This method is powerful for dynamic class manipulation
and state management in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).