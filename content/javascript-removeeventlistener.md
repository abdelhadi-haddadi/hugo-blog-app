+++
title = "JavaScript removeEventListener"
date = 2025-08-29T19:53:31.964+01:00
draft = false
description = "Learn how to use JavaScript's removeEventListener method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript removeEventListener

last modified April 2, 2025

In this article, we explore the removeEventListener method in
JavaScript. This method is essential for proper event handling, allowing
developers to clean up event listeners when they're no longer needed.

## Basic Definition

The removeEventListener method removes an event listener previously
registered with addEventListener. It requires the same parameters
used when adding the listener to properly identify and remove it.

For successful removal, the event type, listener function, and options/capture
flag must exactly match those used in addEventListener. Anonymous
functions cannot be removed as they create new function instances each time.

## Basic removeEventListener

This example demonstrates how to add and then remove a simple click event
listener.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic removeEventListener&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myBtn"&gt;Click Me&lt;/button&gt;
&lt;button id="removeBtn"&gt;Remove Listener&lt;/button&gt;

&lt;script&gt;
    const button = document.getElementById('myBtn');
    const removeButton = document.getElementById('removeBtn');
    
    function handleClick() {
        console.log('Button was clicked!');
    }
    
    button.addEventListener('click', handleClick);
    
    removeButton.addEventListener('click', function() {
        button.removeEventListener('click', handleClick);
        console.log('Listener removed!');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first add a click event listener to a button using a named
function. Then we provide a second button that removes this listener when
clicked.

This demonstrates the fundamental usage of removeEventListener. The
same function reference must be used for both adding and removing the listener.

## Removing Anonymous Functions

This example shows why anonymous functions can't be removed and how to work
around this limitation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Anonymous Functions&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myBtn"&gt;Click Me&lt;/button&gt;
&lt;button id="removeBtn"&gt;Try to Remove&lt;/button&gt;

&lt;script&gt;
    const button = document.getElementById('myBtn');
    const removeButton = document.getElementById('removeBtn');
    
    // Adding anonymous function
    button.addEventListener('click', function() {
        console.log('Anonymous function called');
    });
    
    removeButton.addEventListener('click', function() {
        // This won't work!
        button.removeEventListener('click', function() {
            console.log('Anonymous function called');
        });
        console.log('Attempted to remove listener');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we attempt to remove an anonymous function event listener. The removal fails
because the function in removeEventListener is a different instance
from the one used in addEventListener.

This highlights why named functions are preferred when you need to remove
listeners later. Each anonymous function creates a new object in memory.

## Removing with Options

This example demonstrates how to properly remove event listeners that were added
with specific options.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Removing with Options&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="myDiv" style="padding: 20px; background: #eee;"&gt;
    &lt;p&gt;Click anywhere in this box&lt;/p&gt;
&lt;/div&gt;
&lt;button id="removeBtn"&gt;Remove Listener&lt;/button&gt;

&lt;script&gt;
    const div = document.getElementById('myDiv');
    const removeButton = document.getElementById('removeBtn');
    
    function handleClick() {
        console.log('Div was clicked (capturing phase)');
    }
    
    // Add with capture option
    div.addEventListener('click', handleClick, { capture: true });
    
    removeButton.addEventListener('click', function() {
        // Must specify same options for removal
        div.removeEventListener('click', handleClick, { capture: true });
        console.log('Listener with options removed');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we add an event listener with the capture option
set to true. To remove it, we must provide the same options object.

The options parameter must match exactly. If you added with options, you must
remove with the same options. This applies to all options like once
and passive as well.

## Multiple Listeners

This example shows how to manage multiple event listeners and remove them
selectively.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Listeners&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myBtn"&gt;Click Me&lt;/button&gt;
&lt;button id="removeFirstBtn"&gt;Remove First&lt;/button&gt;
&lt;button id="removeSecondBtn"&gt;Remove Second&lt;/button&gt;

&lt;script&gt;
    const button = document.getElementById('myBtn');
    const removeFirstBtn = document.getElementById('removeFirstBtn');
    const removeSecondBtn = document.getElementById('removeSecondBtn');
    
    function firstListener() {
        console.log('First listener called');
    }
    
    function secondListener() {
        console.log('Second listener called');
    }
    
    button.addEventListener('click', firstListener);
    button.addEventListener('click', secondListener);
    
    removeFirstBtn.addEventListener('click', function() {
        button.removeEventListener('click', firstListener);
        console.log('First listener removed');
    });
    
    removeSecondBtn.addEventListener('click', function() {
        button.removeEventListener('click', secondListener);
        console.log('Second listener removed');
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we add two separate click event listeners to the same button. We then
provide buttons to remove each listener individually.

This demonstrates how removeEventListener can target specific
listeners while leaving others intact. Each listener function maintains its
own identity in the event system.

## Once Option Alternative

This example shows how to manually implement the once option
behavior using removeEventListener.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Once Option Alternative&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myBtn"&gt;Click Me Once&lt;/button&gt;

&lt;script&gt;
    const button = document.getElementById('myBtn');
    
    function handleClickOnce(event) {
        console.log('This will only log once');
        event.target.removeEventListener('click', handleClickOnce);
    }
    
    button.addEventListener('click', handleClickOnce);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a self-removing event listener. After the first
click, the listener removes itself from the element.

This pattern is useful when you need more control than the once
option provides, or when supporting older browsers that don't support the
once option.

## Source

[MDN removeEventListener Documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

In this article, we have shown how to use removeEventListener
in JavaScript. Proper listener cleanup is essential for memory management
and preventing unexpected behavior in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).