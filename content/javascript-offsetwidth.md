+++
title = "JavaScript offsetWidth"
date = 2025-08-29T19:53:27.501+01:00
draft = false
description = "Learn how to use JavaScript's offsetWidth property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript offsetWidth

last modified April 2, 2025

In this article, we explore the offsetWidth property in JavaScript.
This property is essential for measuring the layout width of elements, including
padding, borders, and scrollbars (if present).

## Basic Definition

The offsetWidth property returns the layout width of an element as
an integer. It includes the element's padding, border, and vertical scrollbar
(if present), but not the margin.

This property is read-only and returns the width in pixels. It's useful when you
need to know the actual space an element occupies on the page, not just its
content width.

## Basic offsetWidth Example

This example demonstrates how to get the offsetWidth of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic offsetWidth&lt;/title&gt;
    &lt;style&gt;
        #box {
            width: 200px;
            padding: 20px;
            border: 5px solid black;
            margin: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;Content here&lt;/div&gt;
&lt;button onclick="showWidth()"&gt;Show Width&lt;/button&gt;

&lt;script&gt;
    function showWidth() {
        const box = document.getElementById('box');
        alert(`offsetWidth: ${box.offsetWidth}px`);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with specified width, padding, border, and margin.
When the button is clicked, it shows the element's offsetWidth in an alert.

The offsetWidth will be 250px (200px width + 20px padding on each side + 5px
border on each side). Note that margin is not included in the calculation.

## Comparing offsetWidth with clientWidth

This example shows the difference between offsetWidth and clientWidth properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;offsetWidth vs clientWidth&lt;/title&gt;
    &lt;style&gt;
        #container {
            width: 300px;
            padding: 15px;
            border: 10px solid blue;
            margin: 20px;
            overflow: auto;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div style="width: 500px; height: 200px;"&gt;Large content&lt;/div&gt;
&lt;/div&gt;
&lt;button onclick="compareWidths()"&gt;Compare Widths&lt;/button&gt;

&lt;script&gt;
    function compareWidths() {
        const container = document.getElementById('container');
        const message = `offsetWidth: ${container.offsetWidth}px\n` +
                       `clientWidth: ${container.clientWidth}px`;
        alert(message);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates the difference between offsetWidth and clientWidth.
The container has padding and border, and contains content that causes scrolling.

offsetWidth includes padding, border, and scrollbar (if visible), while clientWidth
includes only padding and excludes border and scrollbar. The values will differ
based on these calculations.

## Dynamic Width Measurement

This example shows how offsetWidth changes when element styles are modified.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Width Measurement&lt;/title&gt;
    &lt;style&gt;
        #resizable {
            width: 100px;
            padding: 10px;
            border: 2px solid green;
            transition: all 0.3s ease;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="resizable"&gt;Resizable Element&lt;/div&gt;
&lt;button onclick="resizeAndMeasure()"&gt;Resize &amp; Measure&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;

&lt;script&gt;
    function resizeAndMeasure() {
        const element = document.getElementById('resizable');
        const output = document.getElementById('output');
        
        // Randomly resize the element
        const newWidth = Math.floor(Math.random() * 200) + 50;
        element.style.width = `${newWidth}px`;
        
        // Measure after resize
        setTimeout(() =&gt; {
            output.textContent = `Current offsetWidth: ${element.offsetWidth}px`;
        }, 300);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates how offsetWidth reflects dynamic changes to an element's
dimensions. The element is randomly resized when the button is clicked.

We use setTimeout to ensure we measure after the transition completes. The
offsetWidth property always returns the current rendered width of the element.

## Responsive Layout Example

This example shows how to use offsetWidth in responsive design calculations.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Responsive Layout&lt;/title&gt;
    &lt;style&gt;
        #responsive-box {
            width: 80%;
            max-width: 600px;
            margin: 20px auto;
            padding: 15px;
            border: 3px solid #333;
            background-color: #f0f0f0;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="responsive-box"&gt;
    &lt;p&gt;This is a responsive box. Resize your browser window.&lt;/p&gt;
    &lt;p id="size-info"&gt;&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    function updateSizeInfo() {
        const box = document.getElementById('responsive-box');
        const info = document.getElementById('size-info');
        info.textContent = `Current width: ${box.offsetWidth}px`;
    }
    
    // Update on load and resize
    window.addEventListener('load', updateSizeInfo);
    window.addEventListener('resize', updateSizeInfo);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates using offsetWidth to track an element's width in a
responsive layout. The element's width changes based on viewport size.

We attach event listeners for both load and resize events to keep the displayed
width information current. This technique is useful for responsive design debugging.

## Calculating Aspect Ratio

This example shows how to use offsetWidth with offsetHeight to calculate aspect ratio.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Aspect Ratio Calculation&lt;/title&gt;
    &lt;style&gt;
        #aspect-box {
            width: 400px;
            height: 300px;
            padding: 10px;
            border: 2px solid purple;
            resize: both;
            overflow: auto;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="aspect-box"&gt;
    &lt;p&gt;Resize me (CSS resize property enabled)&lt;/p&gt;
    &lt;p id="ratio-info"&gt;&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const box = document.getElementById('aspect-box');
    const info = document.getElementById('ratio-info');
    
    function updateRatio() {
        const ratio = (box.offsetWidth / box.offsetHeight).toFixed(2);
        info.textContent = `Aspect ratio: ${ratio} (${box.offsetWidth}×${box.offsetHeight})`;
    }
    
    // Create a ResizeObserver to track size changes
    const observer = new ResizeObserver(updateRatio);
    observer.observe(box);
    
    // Initial update
    updateRatio();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example demonstrates using both offsetWidth and offsetHeight to calculate
and display an element's aspect ratio. The element is made resizable with CSS.

We use ResizeObserver for efficient tracking of size changes, which is more
performant than listening to resize events for this purpose. The aspect ratio
is calculated and displayed in real-time.

## Source

[MDN offsetWidth Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)

In this article, we have explored the offsetWidth property in JavaScript. This
property is essential for accurate element measurement in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).