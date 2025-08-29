+++
title = "JavaScript window.scrollTo"
date = 2025-08-29T19:53:40.957+01:00
draft = false
description = "Learn how to use JavaScript's window.scrollTo method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.scrollTo

last modified April 2, 2025

In this article, we explore the window.scrollTo method in
JavaScript. This method is essential for controlling page scrolling behavior,
allowing developers to programmatically scroll to specific positions.

## Basic Definition

The window.scrollTo method scrolls the window to a particular set
of coordinates in the document. It accepts either x and y coordinates or a
scroll options object for smooth scrolling.

This method is particularly useful for creating custom scrolling experiences,
such as scroll-to-top buttons, navigation to specific sections, or animated
scrolling effects.

## Basic scrollTo with Coordinates

This example demonstrates how to scroll to specific coordinates on the page.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic scrollTo&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        button { position: fixed; bottom: 20px; right: 20px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Scroll Down&lt;/h1&gt;
&lt;div style="height: 1000px;"&gt;&lt;/div&gt;
&lt;button onclick="scrollToTop()"&gt;Scroll To Top&lt;/button&gt;

&lt;script&gt;
    function scrollToTop() {
        window.scrollTo(0, 0);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a long page with a button at the bottom. When
clicked, it uses window.scrollTo(0, 0) to scroll back to the top.

The first parameter is the x-coordinate (horizontal), and the second is the
y-coordinate (vertical). This demonstrates the simplest way to use scrollTo.

## Smooth Scrolling with Options

This example shows how to achieve smooth scrolling using the options parameter.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Smooth Scrolling&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        button { position: fixed; bottom: 20px; right: 20px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Scroll Down&lt;/h1&gt;
&lt;div style="height: 1000px;"&gt;&lt;/div&gt;
&lt;button onclick="smoothScrollToTop()"&gt;Smooth Scroll To Top&lt;/button&gt;

&lt;script&gt;
    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the object parameter version of scrollTo with the
behavior: 'smooth' option. This creates an animated scrolling
effect rather than an instant jump.

The options object provides more control over scrolling behavior. The
behavior property can be 'auto' (default) or 'smooth'.

## Scrolling to a Specific Element

This example demonstrates how to scroll to a specific element on the page.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll to Element&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #target {
            margin-top: 800px;
            padding: 20px;
            background: lightblue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="scrollToElement()"&gt;Scroll to Element&lt;/button&gt;
&lt;div id="target"&gt;This is the target element&lt;/div&gt;

&lt;script&gt;
    function scrollToElement() {
        const element = document.getElementById('target');
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first get the target element using
getElementById, then scroll to its position using its
offsetTop property.

This technique is commonly used for navigation menus that scroll to different
sections of a page. The offsetTop property gives the distance from
the top of the document.

## Horizontal Scrolling

This example shows how to use scrollTo for horizontal scrolling.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Horizontal Scrolling&lt;/title&gt;
    &lt;style&gt;
        .container {
            width: 5000px;
            height: 100vh;
            background: linear-gradient(to right, red, blue);
        }
        button { position: fixed; bottom: 20px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="container"&gt;&lt;/div&gt;
&lt;button onclick="scrollRight()"&gt;Scroll Right&lt;/button&gt;
&lt;button onclick="scrollLeft()" style="right: 20px;"&gt;Scroll Left&lt;/button&gt;

&lt;script&gt;
    function scrollRight() {
        window.scrollTo({
            left: window.scrollX + 500,
            behavior: 'smooth'
        });
    }
    
    function scrollLeft() {
        window.scrollTo({
            left: window.scrollX - 500,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we create a very wide container and buttons to scroll horizontally. The
functions use window.scrollX to get the current position.

This demonstrates how scrollTo can be used for horizontal scrolling by
manipulating the left property. The functions scroll 500 pixels in either
direction from the current position.

## Scroll Position Tracking

This example shows how to track scroll position and scroll to specific points.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll Tracking&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #position { position: fixed; top: 10px; left: 10px; }
        button { position: fixed; bottom: 20px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="position"&gt;Scroll position: 0&lt;/div&gt;
&lt;button onclick="scrollToHalf()"&gt;Scroll to Halfway&lt;/button&gt;

&lt;script&gt;
    window.addEventListener('scroll', function() {
        document.getElementById('position').textContent = 
            `Scroll position: ${window.scrollY}`;
    });
    
    function scrollToHalf() {
        const halfway = document.body.scrollHeight / 2;
        window.scrollTo({
            top: halfway,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example tracks the current scroll position using the scroll event and
displays it. The button scrolls to the halfway point of the document.

The scrollHeight property gives the total height of the document,
allowing us to calculate positions relative to the document size.

## Source

[MDN scrollTo Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)

In this article, we have shown how to use window.scrollTo in
JavaScript. This method is fundamental for creating controlled scrolling
experiences in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).