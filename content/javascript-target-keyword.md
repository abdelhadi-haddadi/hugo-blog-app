+++
title = "JavaScript target keyword"
date = 2025-08-29T20:01:40.448+01:00
draft = false
description = "Explore the event target property in JavaScript for handling DOM events, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript target keyword

last modified April 16, 2025

In this article we show how to use the target property in JavaScript
events to identify the element that triggered the event.

## The target property

The target property is a reference to the object that dispatched
the event. It is available on the event object passed to event handlers. This
property is read-only and provides access to the element that originated the event.

Unlike this which refers to the element the handler is bound to,
target always refers to the element where the event occurred. This
is particularly useful in event delegation scenarios where events bubble up.

The target property is part of the DOM Event interface and is
supported in all modern browsers. It works with all types of DOM events including
click, mouse, keyboard, and form events.

## Basic click event target

The following example demonstrates the basic usage of the target
property in a click event handler.

index.html
  

&lt;button id="myButton"&gt;Click me&lt;/button&gt;
&lt;script&gt;
document.getElementById('myButton').addEventListener('click', function(event) {
    console.log('Target element:', event.target);
    console.log('Button text:', event.target.textContent);
});
&lt;/script&gt;

When the button is clicked, the event handler logs the target element and its
text content. The event.target refers to the actual button element
that was clicked. This shows how to access properties of the element that
triggered the event.

Target element: &lt;button id="myButton"&gt;Click me&lt;/button&gt;
Button text: Click me

## Target vs currentTarget

This example demonstrates the difference between target and
currentTarget properties.

index.html
  

&lt;div id="container"&gt;
    &lt;button id="innerButton"&gt;Click me&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;
document.getElementById('container').addEventListener('click', function(event) {
    console.log('Target:', event.target.id);
    console.log('CurrentTarget:', event.currentTarget.id);
});
&lt;/script&gt;

When clicking the button, target is the button while
currentTarget is the div. The target is the element that triggered
the event, while currentTarget is the element that the handler is attached to.
This shows event bubbling in action.

Target: innerButton
CurrentTarget: container

## Event delegation with target

The target property is essential for efficient event delegation.

index.html
  

&lt;ul id="itemList"&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
document.getElementById('itemList').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        console.log('Clicked item:', event.target.textContent);
    }
});
&lt;/script&gt;

Instead of attaching handlers to each li, we use one handler on the ul. The
target property identifies which li was clicked. This pattern is
more efficient and works with dynamically added elements.

Clicked item: Item 2

## Getting target attributes

The target property can be used to access element attributes.

index.html
  

&lt;button data-id="123" data-action="delete"&gt;Delete Item&lt;/button&gt;
&lt;script&gt;
document.querySelector('button').addEventListener('click', function(event) {
    const button = event.target;
    console.log('ID:', button.dataset.id);
    console.log('Action:', button.dataset.action);
});
&lt;/script&gt;

This example shows how to access data attributes from the target element. The
dataset property provides access to all data-* attributes. This is
useful for storing metadata on elements for event handling.

ID: 123
Action: delete

## Form input target

The target property is commonly used with form elements.

index.html
  

&lt;form id="myForm"&gt;
    &lt;input type="text" name="username" placeholder="Username"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
&lt;script&gt;
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = event.target.elements.username.value;
    console.log('Username:', username);
});
&lt;/script&gt;

Here we access form input values through the target property. The
elements collection provides access to all form controls. This
shows how to prevent default form submission and handle data manually.

Username: JohnDoe

## Changing target styles

The target property can be used to modify the triggering element.

index.html
  

&lt;style&gt;
.highlight { background-color: yellow; }
&lt;/style&gt;
&lt;div class="boxes"&gt;
    &lt;div class="box"&gt;Box 1&lt;/div&gt;
    &lt;div class="box"&gt;Box 2&lt;/div&gt;
    &lt;div class="box"&gt;Box 3&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
document.querySelector('.boxes').addEventListener('click', function(event) {
    if (event.target.classList.contains('box')) {
        event.target.classList.toggle('highlight');
    }
});
&lt;/script&gt;

Clicking any box toggles its highlight class. The target property
lets us modify the specific element that was clicked. This demonstrates direct
manipulation of the event-originating element.

## Practical use case: dynamic content

Here's a practical example using target with dynamically added content.

index.html
  

&lt;div id="taskList"&gt;
    &lt;button id="addTask"&gt;Add Task&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addTask');

let taskCount = 0;

addButton.addEventListener('click', function() {
    taskCount++;
    const task = document.createElement('div');
    task.className = 'task';
    task.textContent = `Task ${taskCount}`;
    taskList.appendChild(task);
});

taskList.addEventListener('click', function(event) {
    if (event.target.className === 'task') {
        console.log('Completed:', event.target.textContent);
        event.target.style.textDecoration = 'line-through';
    }
});
&lt;/script&gt;

This code adds tasks dynamically and handles clicks on them through event
delegation. The target property identifies clicked tasks even though
they didn't exist when the handler was attached. This pattern works with any
dynamically added elements.

Completed: Task 3

## Source

[Event.target - MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)

In this article we have demonstrated how to use the target property to handle
events in JavaScript effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)