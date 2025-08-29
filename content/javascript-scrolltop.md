+++
title = "JavaScript scrollTop"
date = 2025-08-29T19:53:34.174+01:00
draft = false
description = "Learn how to use JavaScript's scrollTop property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript scrollTop

last modified April 2, 2025

In this article, we explore the element.scrollTop property in
JavaScript. This property is essential for controlling and monitoring the
vertical scroll position of elements in web pages.

## Basic Definition

The scrollTop property gets or sets the number of pixels that an
element's content is scrolled vertically. When read, it returns the distance
from the element's top to its topmost visible content.

For the document element, document.documentElement.scrollTop
returns the vertical scroll position of the entire page. For other elements,
it returns their internal scroll position.

## Getting Page Scroll Position

This example demonstrates how to get the current scroll position of the page.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Get Page Scroll Position&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="showScroll()"&gt;Show Scroll Position&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;

&lt;script&gt;
    function showScroll() {
        const scrollPosition = document.documentElement.scrollTop || 
                             document.body.scrollTop;
        document.getElementById('output').textContent = 
            `Current scroll position: ${scrollPosition}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a tall page and a button to show the current scroll
position. The showScroll function checks both
document.documentElement.scrollTop and
document.body.scrollTop for cross-browser compatibility.

The OR operator (||) is used because different browsers may use
different elements to track the page scroll position. This is a common pattern
for handling browser inconsistencies.

## Scrolling to a Specific Position

This example shows how to programmatically scroll the page to a specific position.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll to Position&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #target { 
            position: absolute; 
            top: 800px; 
            color: red;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="scrollToTarget()"&gt;Scroll to Target&lt;/button&gt;
&lt;div id="target"&gt;This is the target position&lt;/div&gt;

&lt;script&gt;
    function scrollToTarget() {
        window.scrollTo({
            top: 800,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use window.scrollTo() to scroll the page to a specific
position (800px from the top). The behavior: 'smooth' option
creates a smooth scrolling animation instead of an immediate jump.

While this example uses window.scrollTo, you can also set
element.scrollTop directly to scroll individual elements.
The smooth scrolling behavior is a modern feature that may not work in older
browsers.

## Scrolling an Individual Element

This example demonstrates how to control the scroll position of a scrollable div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scrollable Div&lt;/title&gt;
    &lt;style&gt;
        #scrollable {
            height: 200px;
            width: 300px;
            overflow: auto;
            border: 1px solid #ccc;
        }
        #content {
            height: 1000px;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="scrollable"&gt;
    &lt;div id="content"&gt;Scrollable content...&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="scrollDiv()"&gt;Scroll Div to 300px&lt;/button&gt;

&lt;script&gt;
    function scrollDiv() {
        const div = document.getElementById('scrollable');
        div.scrollTop = 300;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we create a scrollable div with overflow content. The
scrollDiv function sets the scrollTop property
of the div to 300 pixels, scrolling its content downward.

This shows how scrollTop works with individual elements, not just
the entire page. The element must have its overflow property set
to auto or scroll for scrolling to occur.

## Creating a Scroll Indicator

This example creates a visual indicator showing how far the page has been scrolled.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll Indicator&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #progressBar {
            position: fixed;
            top: 0;
            left: 0;
            height: 5px;
            background: red;
            width: 0%;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="progressBar"&gt;&lt;/div&gt;
&lt;h1&gt;Scroll down to see the progress bar in action&lt;/h1&gt;

&lt;script&gt;
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || 
                         document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - 
                      document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = 
            scrolled + '%';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a red progress bar at the top of the page that fills as the
user scrolls down. The scroll event listener calculates the percentage of the
page that has been scrolled and updates the width of the progress bar.

The calculation involves comparing the current scroll position to the total
scrollable height of the page. This creates a visual representation of the
user's progress through the page content.

## Back to Top Button

This example implements a common "back to top" button that appears when the user
scrolls down and smoothly scrolls back to the top when clicked.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Back to Top Button&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #backToTop {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: none;
            padding: 10px;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="backToTop" onclick="scrollToTop()"&gt;↑ Top&lt;/button&gt;

&lt;script&gt;
    window.addEventListener('scroll', function() {
        const btn = document.getElementById('backToTop');
        if (document.documentElement.scrollTop &gt; 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This implementation shows/hides the back-to-top button based on the scroll
position. When clicked, it smoothly scrolls the page back to the top using
window.scrollTo with smooth behavior.

The button is initially hidden with display: none and only appears
when the user scrolls beyond 300 pixels. This prevents the button from being
visible when it's not needed.

## Source

[MDN scrollTop Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)

In this article, we have explored the scrollTop property in
JavaScript. We've seen how it can be used to get and set scroll positions,
create scroll indicators, and implement common UI patterns like back-to-top
buttons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).