+++
title = "JavaScript window.scrollBy"
date = 2025-08-29T19:53:39.786+01:00
draft = false
description = "Learn how to use JavaScript's window.scrollBy method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.scrollBy

last modified April 2, 2025

In this article, we explore the window.scrollBy method in
JavaScript. This method is essential for controlling page scrolling
programmatically, allowing smooth navigation experiences.

## Basic Definition

The window.scrollBy method scrolls the document in the window by
the given amount. It accepts x and y coordinates as parameters to determine
how much to scroll horizontally and vertically.

Unlike window.scrollTo which scrolls to absolute positions,
scrollBy scrolls relative to the current position. This makes it
ideal for incremental scrolling effects.

## Basic scrollBy Example

This example demonstrates the simplest usage of window.scrollBy
to scroll down the page by 100 pixels when a button is clicked.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic scrollBy&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        button { position: fixed; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="scrollDown()"&gt;Scroll Down&lt;/button&gt;

&lt;script&gt;
    function scrollDown() {
        window.scrollBy(0, 100);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a long page and a fixed-position button. When
clicked, it calls scrollDown which uses window.scrollBy
to scroll down by 100 pixels vertically (y-axis).

The first parameter (0) controls horizontal scrolling, while the second (100)
controls vertical scrolling. Negative values would scroll in the opposite
direction.

## Smooth Scrolling Behavior

This example shows how to enable smooth scrolling behavior with
window.scrollBy using the options parameter.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Smooth Scrolling&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        button { position: fixed; top: 20px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="smoothScroll()"&gt;Smooth Scroll&lt;/button&gt;

&lt;script&gt;
    function smoothScroll() {
        window.scrollBy({
            top: 300,
            left: 0,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the object parameter version of scrollBy which allows
for more configuration options. The behavior: 'smooth' property
enables animated scrolling instead of the default instant jump.

This provides a more polished user experience, especially for larger scroll
distances. The animation duration and timing function are browser-dependent.

## Horizontal Scrolling

This example demonstrates horizontal scrolling using window.scrollBy
with a horizontal container.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Horizontal Scrolling&lt;/title&gt;
    &lt;style&gt;
        .container {
            display: flex;
            width: 3000px;
            height: 200px;
            background-color: #f0f0f0;
        }
        .item {
            width: 300px;
            height: 200px;
            margin: 10px;
            background-color: #ccc;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="container"&gt;
    &lt;div class="item"&gt;Item 1&lt;/div&gt;
    &lt;div class="item"&gt;Item 2&lt;/div&gt;
    &lt;div class="item"&gt;Item 3&lt;/div&gt;
    &lt;div class="item"&gt;Item 4&lt;/div&gt;
    &lt;div class="item"&gt;Item 5&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="scrollRight()"&gt;Scroll Right&lt;/button&gt;
&lt;button onclick="scrollLeft()"&gt;Scroll Left&lt;/button&gt;

&lt;script&gt;
    function scrollRight() {
        window.scrollBy(300, 0);
    }
    function scrollLeft() {
        window.scrollBy(-300, 0);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a wide container with several items and two buttons.
The buttons use scrollBy to scroll horizontally by 300 pixels in
either direction.

Positive x-values scroll right, negative scroll left. This technique is useful
for creating horizontal galleries or carousels with custom navigation controls.

## Scroll By Page Height

This example shows how to scroll by the full viewport height using
window.innerHeight with scrollBy.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Height Scrolling&lt;/title&gt;
    &lt;style&gt;
        section {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
        }
        section:nth-child(odd) { background: #f0f0f0; }
        section:nth-child(even) { background: #e0e0e0; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section&gt;Section 1&lt;/section&gt;
&lt;section&gt;Section 2&lt;/section&gt;
&lt;section&gt;Section 3&lt;/section&gt;
&lt;button onclick="scrollPageDown()"&gt;Next Section&lt;/button&gt;

&lt;script&gt;
    function scrollPageDown() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a page with full-viewport-height sections. The button scrolls to
the next section by using window.innerHeight as the scroll amount.

This creates a common "scroll snapping" effect seen in modern single-page
applications. The smooth behavior enhances the user experience between sections.

## Conditional Scrolling

This example demonstrates conditional scrolling that stops when reaching
certain boundaries.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Scrolling&lt;/title&gt;
    &lt;style&gt;
        body { height: 2000px; }
        #progress {
            position: fixed;
            top: 10px;
            right: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="smartScroll()"&gt;Smart Scroll&lt;/button&gt;
&lt;div id="progress"&gt;Scroll Progress: 0%&lt;/div&gt;

&lt;script&gt;
    function smartScroll() {
        const scrollAmount = 100;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        
        if (window.scrollY + scrollAmount &lt;= maxScroll) {
            window.scrollBy(0, scrollAmount);
        } else {
            window.scrollTo(0, maxScroll);
            alert("Reached bottom of page!");
        }
        
        // Update progress indicator
        const progress = Math.round((window.scrollY / maxScroll) * 100);
        document.getElementById('progress').textContent = 
            `Scroll Progress: ${progress}%`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example implements a "smart" scroll that checks if there's enough content
remaining before scrolling. It also updates a progress indicator showing how
far down the page the user has scrolled.

The code calculates the maximum possible scroll position and prevents scrolling
beyond it. When near the bottom, it uses scrollTo for precise
positioning and shows an alert.

## Source

[MDN scrollBy Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy)

In this article, we have explored the window.scrollBy method with
various practical examples. This method is powerful for creating custom scroll
behaviors and enhancing user navigation experiences.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).