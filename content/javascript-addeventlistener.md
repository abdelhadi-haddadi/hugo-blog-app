+++
title = "JavaScript addEventListener"
date = 2025-08-29T19:53:12.943+01:00
draft = false
description = "Learn how to use JavaScript's addEventListener method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript addEventListener

last modified April 2, 2025

In this article, we explore the addEventListener method in
JavaScript. This method is essential for event handling, allowing developers
to respond to user interactions and other events in web applications.

## Basic Definition

The addEventListener method attaches an event handler to a specified
element. It provides a flexible way to handle events without overwriting
existing event handlers on the same element.

The method takes three parameters: the event type (like 'click'), the function
to execute when the event occurs, and optional parameters for event capturing.
Multiple listeners can be added to the same element for the same event type.

## Basic Click Event

This example demonstrates how to attach a simple click event listener to a button.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic Click Event&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myBtn"&gt;Click Me&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;

&lt;script&gt;
    const button = document.getElementById('myBtn');
    const output = document.getElementById('output');
    
    button.addEventListener('click', function() {
        output.textContent = 'Button was clicked!';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we select a button element using
getElementById. We then attach a click event listener that updates
a paragraph element when the button is clicked.

This demonstrates the fundamental usage of addEventListener to
respond to user interactions. The anonymous function serves as the event handler
that executes when the event occurs.

## Multiple Event Listeners

This example shows how to attach multiple event listeners to the same element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Listeners&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="multiBtn"&gt;Hover or Click&lt;/button&gt;
&lt;p id="log"&gt;&lt;/p&gt;

&lt;script&gt;
    const btn = document.getElementById('multiBtn');
    const log = document.getElementById('log');
    
    function handleClick() {
        log.textContent += 'Button clicked! ';
    }
    
    function handleMouseOver() {
        log.textContent += 'Mouse over! ';
    }
    
    btn.addEventListener('click', handleClick);
    btn.addEventListener('mouseover', handleMouseOver);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we attach two different event listeners to the same button element: one for
click events and one for mouseover events. Each listener calls a separate named
function when triggered.

This demonstrates how addEventListener allows multiple handlers for
different events on the same element. Named functions are used instead of
anonymous functions for better code organization and reusability.

## Event Object

This example demonstrates how to use the event object passed to event handlers.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event Object&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="moveArea" style="width:300px;height:200px;border:1px solid black;"&gt;
    Move your mouse here
&lt;/div&gt;
&lt;p&gt;Coordinates: &lt;span id="coords"&gt;0, 0&lt;/span&gt;&lt;/p&gt;

&lt;script&gt;
    const area = document.getElementById('moveArea');
    const coords = document.getElementById('coords');
    
    area.addEventListener('mousemove', function(event) {
        coords.textContent = `${event.clientX}, ${event.clientY}`;
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we track mouse movement within a div element. The event handler
receives an event object containing information about the mouse position, which
we display in real-time.

This shows how the event object provides detailed information about the event.
The clientX and clientY properties give the mouse
coordinates relative to the viewport.

## Event Propagation

This example demonstrates event propagation (bubbling and capturing phases).

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event Propagation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="outer" style="padding:50px;background-color:lightblue;"&gt;
    &lt;div id="inner" style="padding:50px;background-color:lightgreen;"&gt;
        Click Me
    &lt;/div&gt;
&lt;/div&gt;
&lt;p id="propLog"&gt;&lt;/p&gt;

&lt;script&gt;
    const outer = document.getElementById('outer');
    const inner = document.getElementById('inner');
    const log = document.getElementById('propLog');
    
    outer.addEventListener('click', function() {
        log.textContent += 'Outer div clicked ';
    }, false); // Bubbling phase (default)
    
    inner.addEventListener('click', function() {
        log.textContent += 'Inner div clicked ';
    }, true); // Capturing phase
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows nested div elements with click event listeners. The third
parameter of addEventListener controls whether the handler runs
during the capturing or bubbling phase of event propagation.

When you click the inner div, the outer div's handler (set to bubbling phase)
fires after the inner div's handler (set to capturing phase). This demonstrates
the complete event propagation cycle.

## Removing Event Listeners

This example shows how to remove an event listener using
removeEventListener.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Removing Listeners&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="toggleBtn"&gt;Click Me&lt;/button&gt;
&lt;button id="removeBtn"&gt;Remove Listener&lt;/button&gt;
&lt;p id="status"&gt;Listener is active&lt;/p&gt;

&lt;script&gt;
    const toggleBtn = document.getElementById('toggleBtn');
    const removeBtn = document.getElementById('removeBtn');
    const status = document.getElementById('status');
    
    function handleClick() {
        status.textContent = 'Button was clicked!';
    }
    
    toggleBtn.addEventListener('click', handleClick);
    
    removeBtn.addEventListener('click', function() {
        toggleBtn.removeEventListener('click', handleClick);
        status.textContent = 'Listener was removed';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first add a click event listener to a button. A second
button can then remove this listener using removeEventListener.

This demonstrates that to remove an event listener, you must pass the exact same
function reference that was used when adding it. This is why named functions are
often preferred for event handlers that might need to be removed later.

## Source

[MDN addEventListener Documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

In this article, we have shown how to use addEventListener in
JavaScript. This method is fundamental for event handling and interactive web
development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).