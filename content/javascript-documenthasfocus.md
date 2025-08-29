+++
title = "JavaScript document.hasFocus"
date = 2025-08-29T19:53:10.588+01:00
draft = false
description = "Learn how to use JavaScript's document.hasFocus method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript document.hasFocus

last modified April 2, 2025

In this article, we explore the document.hasFocus() method in
JavaScript. This method checks if the document or any element inside it has
focus, which is useful for improving user experience and accessibility.

## Basic Definition

The document.hasFocus() method returns a Boolean value indicating
whether the document or any element inside it currently has focus. This helps
determine if the user is actively interacting with the page.

When the document has focus, it means the user's attention is on the page. This
is particularly useful for applications that need to pause animations or
notifications when the user switches to another tab or window.

## Basic hasFocus Check

This example demonstrates how to perform a basic focus check on the document.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic hasFocus Check&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="checkFocus()"&gt;Check Focus&lt;/button&gt;
&lt;p id="result"&gt;&lt;/p&gt;

&lt;script&gt;
    function checkFocus() {
        const hasFocus = document.hasFocus();
        document.getElementById('result').textContent = 
            `Document has focus: ${hasFocus}`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, clicking the button calls checkFocus() which
uses document.hasFocus() to check if the document has focus. The
result is displayed in the paragraph element.

This demonstrates the simplest way to use hasFocus(). The method
returns true if the document is focused and false
otherwise.

## Window Focus Event

This example shows how to detect when the window gains or loses focus.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Window Focus Event&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="status"&gt;Window is focused&lt;/p&gt;

&lt;script&gt;
    window.addEventListener('focus', function() {
        document.getElementById('status').textContent = 
            'Window is focused';
    });

    window.addEventListener('blur', function() {
        document.getElementById('status').textContent = 
            'Window lost focus';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the focus and blur events on the window
object to track when the window gains or loses focus. The status is displayed
in a paragraph element.

While not using hasFocus() directly, this shows related focus
management. These events can be combined with hasFocus() for more
complex focus tracking.

## Pausing Animation on Blur

This example demonstrates how to pause an animation when the window loses focus.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pause Animation on Blur&lt;/title&gt;
    &lt;style&gt;
        #box {
            width: 100px;
            height: 100px;
            background-color: red;
            position: relative;
            animation: move 2s infinite alternate;
        }
        @keyframes move {
            from { left: 0; }
            to { left: 200px; }
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;&lt;/div&gt;

&lt;script&gt;
    const box = document.getElementById('box');
    let animationPaused = false;

    window.addEventListener('blur', function() {
        box.style.animationPlayState = 'paused';
        animationPaused = true;
    });

    window.addEventListener('focus', function() {
        if (animationPaused) {
            box.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, a red box animates back and forth. When the window loses focus,
the animation pauses. It resumes when the window regains focus.

This demonstrates a practical use case for focus detection. Pausing animations
when the user isn't looking at the page can improve performance and user
experience.

## Focus-Based Notification

This example shows how to display a notification when the window regains focus.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Focus Notification&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="notification" style="display: none;"&gt;
    Welcome back!
&lt;/div&gt;

&lt;script&gt;
    let lastBlurTime = null;

    window.addEventListener('blur', function() {
        lastBlurTime = new Date();
    });

    window.addEventListener('focus', function() {
        if (lastBlurTime) {
            const timeAway = Math.floor(
                (new Date() - lastBlurTime) / 1000
            );
            const notification = document.getElementById('notification');
            notification.textContent = `Welcome back! You were away for ${timeAway} seconds.`;
            notification.style.display = 'block';
            setTimeout(() =&gt; {
                notification.style.display = 'none';
            }, 3000);
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we track when the window loses focus and display a welcome back message
with the duration of absence when it regains focus. The notification disappears
after 3 seconds.

This shows how focus detection can be used to create user-friendly features.
The example combines blur and focus events with
timing calculations.

## Real-Time Focus Monitoring

This example demonstrates continuous focus monitoring using hasFocus().

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Real-Time Focus Monitor&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="status"&gt;Checking focus...&lt;/p&gt;

&lt;script&gt;
    function updateFocusStatus() {
        const hasFocus = document.hasFocus();
        document.getElementById('status').textContent = 
            `Document ${hasFocus ? 'has' : 'does not have'} focus`;
    }

    // Check focus initially
    updateFocusStatus();

    // Set up periodic checking
    setInterval(updateFocusStatus, 1000);

    // Also update on focus/blur events
    window.addEventListener('focus', updateFocusStatus);
    window.addEventListener('blur', updateFocusStatus);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example continuously monitors document focus status. It checks focus every
second and also updates immediately when focus changes via event listeners.

This demonstrates a comprehensive approach to focus monitoring. The combination
of periodic checks and event listeners ensures accurate and responsive focus
tracking.

## Source

[MDN hasFocus Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus)

In this article, we have shown how to use document.hasFocus()
in JavaScript. This method is valuable for creating responsive web
applications that adapt to user attention.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).