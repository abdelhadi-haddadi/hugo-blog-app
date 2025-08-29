+++
title = "JavaScript scrollLeft"
date = 2025-08-29T19:53:33.046+01:00
draft = false
description = "Learn how to use JavaScript's scrollLeft property effectively with examples and detailed explanations. Master horizontal scrolling in web development with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript scrollLeft

last modified April 2, 2025

In this article, we explore the element.scrollLeft property in
JavaScript. This property is essential for controlling and monitoring horizontal
scrolling of elements in web development.

## Basic Definition

The scrollLeft property gets or sets the number of pixels that an
element's content is scrolled horizontally. When read, it returns how far the
element's content is scrolled from its left edge.

If the element's content isn't scrolled at all, or if the element can't be
scrolled, scrollLeft is 0. The value is always non-negative and
measured in pixels.

## Basic scrollLeft Usage

This example demonstrates how to read the scrollLeft value of a scrollable div.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic scrollLeft&lt;/title&gt;
    &lt;style&gt;
        #scrollable {
            width: 200px;
            height: 100px;
            overflow-x: scroll;
            white-space: nowrap;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="scrollable"&gt;
    This is some very long content that requires horizontal scrolling to view completely.
&lt;/div&gt;
&lt;button onclick="showScroll()"&gt;Show Scroll Position&lt;/button&gt;

&lt;script&gt;
    function showScroll() {
        const div = document.getElementById('scrollable');
        alert(`Current scroll position: ${div.scrollLeft}px`);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a scrollable div with horizontal overflow. The
JavaScript code retrieves the current horizontal scroll position using
scrollLeft when the button is clicked.

This demonstrates the fundamental usage of scrollLeft to monitor
horizontal scrolling. The CSS ensures the div is scrollable with
overflow-x: scroll and white-space: nowrap.

## Setting scrollLeft Value

This example shows how to programmatically scroll an element using scrollLeft.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Setting scrollLeft&lt;/title&gt;
    &lt;style&gt;
        #container {
            width: 300px;
            overflow-x: scroll;
        }
        #content {
            width: 1000px;
            height: 100px;
            background: linear-gradient(to right, red, blue);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="content"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="scrollRight()"&gt;Scroll Right 100px&lt;/button&gt;

&lt;script&gt;
    function scrollRight() {
        const container = document.getElementById('container');
        container.scrollLeft += 100;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a container with horizontally scrollable content. The button
increments the scrollLeft value by 100 pixels each time it's
clicked, creating smooth horizontal scrolling.

This demonstrates how scrollLeft can be both read and written to
control horizontal scrolling position. The gradient background helps visualize
the scrolling effect.

## Scroll Events with scrollLeft

This example demonstrates how to track scrollLeft changes with scroll events.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll Events&lt;/title&gt;
    &lt;style&gt;
        #scroller {
            width: 300px;
            height: 150px;
            overflow-x: scroll;
        }
        #long-content {
            width: 1000px;
            height: 150px;
            background-color: #f0f0f0;
        }
        #position {
            margin-top: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="scroller"&gt;
    &lt;div id="long-content"&gt;Scroll horizontally to see the position update&lt;/div&gt;
&lt;/div&gt;
&lt;div id="position"&gt;Scroll position: 0px&lt;/div&gt;

&lt;script&gt;
    const scroller = document.getElementById('scroller');
    const positionDisplay = document.getElementById('position');
    
    scroller.addEventListener('scroll', function() {
        positionDisplay.textContent = `Scroll position: ${this.scrollLeft}px`;
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we attach a scroll event listener to a scrollable div. Whenever
the user scrolls horizontally, the event handler updates a display with the
current scrollLeft value.

This shows how to monitor horizontal scrolling in real-time. The scroll event
fires repeatedly during scrolling, allowing for dynamic position tracking.

## Smooth Scrolling Animation

This example creates a smooth horizontal scrolling animation using scrollLeft.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Smooth Scrolling&lt;/title&gt;
    &lt;style&gt;
        #gallery {
            width: 400px;
            overflow-x: hidden;
            white-space: nowrap;
            border: 1px solid #ccc;
        }
        .image {
            display: inline-block;
            width: 400px;
            height: 300px;
            background-size: cover;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="gallery"&gt;
    &lt;div class="image" style="background-image: url('image1.jpg')"&gt;&lt;/div&gt;
    &lt;div class="image" style="background-image: url('image2.jpg')"&gt;&lt;/div&gt;
    &lt;div class="image" style="background-image: url('image3.jpg')"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="scrollToNext()"&gt;Next Image&lt;/button&gt;

&lt;script&gt;
    function scrollToNext() {
        const gallery = document.getElementById('gallery');
        const targetScroll = gallery.scrollLeft + 400;
        const duration = 500; // milliseconds
        
        const startTime = performance.now();
        const startScroll = gallery.scrollLeft;
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            gallery.scrollLeft = startScroll + (targetScroll - startScroll) * progress;
            
            if (progress &lt; 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example implements smooth horizontal scrolling between images in a gallery.
When clicking the button, it animates the scrollLeft property to
scroll to the next image.

The animation uses requestAnimationFrame for smooth performance.
The performance.now() method provides precise timing for the
animation calculations.

## Scroll Snap with scrollLeft

This example combines scrollLeft with CSS Scroll Snap for better user experience.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Scroll Snap&lt;/title&gt;
    &lt;style&gt;
        #snap-container {
            width: 300px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            display: flex;
        }
        .snap-item {
            flex: 0 0 300px;
            height: 200px;
            scroll-snap-align: start;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            color: white;
        }
        #controls {
            margin-top: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="snap-container"&gt;
    &lt;div class="snap-item" style="background: red;"&gt;1&lt;/div&gt;
    &lt;div class="snap-item" style="background: green;"&gt;2&lt;/div&gt;
    &lt;div class="snap-item" style="background: blue;"&gt;3&lt;/div&gt;
&lt;/div&gt;
&lt;div id="controls"&gt;
    &lt;button onclick="prevItem()"&gt;Previous&lt;/button&gt;
    &lt;button onclick="nextItem()"&gt;Next&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('snap-container');
    const itemWidth = 300;
    
    function nextItem() {
        container.scrollLeft += itemWidth;
    }
    
    function prevItem() {
        container.scrollLeft -= itemWidth;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a horizontal scroll container with CSS Scroll Snap. The
JavaScript controls scrollLeft to navigate between items while CSS ensures
snapping to each item's edge.

The combination of scrollLeft and Scroll Snap provides a polished user
experience. The buttons increment or decrement scrollLeft by the exact width
of one item, and CSS handles the snapping behavior.

## Source

[MDN scrollLeft Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft)

In this article, we have explored the element.scrollLeft property
in JavaScript. This property is crucial for implementing and controlling
horizontal scrolling in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).