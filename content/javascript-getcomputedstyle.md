+++
title = "JavaScript getComputedStyle"
date = 2025-08-29T19:53:38.662+01:00
draft = false
description = "Learn how to use JavaScript's getComputedStyle method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getComputedStyle

last modified April 2, 2025

In this article, we explore the window.getComputedStyle method in
JavaScript. This method is essential for accessing computed CSS styles of DOM
elements, including those from stylesheets and inline styles.

## Basic Definition

The window.getComputedStyle method returns an object containing all
CSS properties of an element, computed from both stylesheets and inline styles.
It provides the final values used by the browser to render the element.

Unlike element.style, which only returns inline styles,
getComputedStyle returns all styles affecting the element. This
includes default browser styles and styles from CSS rules.

## Basic getComputedStyle

This example demonstrates how to access computed styles of a simple div element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getComputedStyle&lt;/title&gt;
    &lt;style&gt;
        #myDiv {
            width: 200px;
            height: 100px;
            background-color: lightblue;
            padding: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="myDiv"&gt;Sample Content&lt;/div&gt;

&lt;script&gt;
    const div = document.getElementById('myDiv');
    const styles = window.getComputedStyle(div);
    
    console.log('Background color:', styles.backgroundColor);
    console.log('Width:', styles.width);
    console.log('Height:', styles.height);
    console.log('Padding:', styles.padding);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a styled div element. The JavaScript code uses
getComputedStyle to access all computed CSS properties of the div.

The method returns a CSSStyleDeclaration object containing all
computed styles. We then log several style properties to the console. Note that
values are returned in their computed form (e.g., "rgb(173, 216, 230)").

## Accessing Pseudo-element Styles

This example shows how to access styles of pseudo-elements using getComputedStyle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pseudo-element Styles&lt;/title&gt;
    &lt;style&gt;
        #quote::before {
            content: "“";
            font-size: 2em;
            color: red;
        }
        #quote::after {
            content: "”";
            font-size: 2em;
            color: blue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="quote"&gt;To be or not to be&lt;/p&gt;

&lt;script&gt;
    const quote = document.getElementById('quote');
    
    // Get styles for ::before pseudo-element
    const beforeStyles = window.getComputedStyle(quote, '::before');
    console.log('Before content:', beforeStyles.content);
    console.log('Before color:', beforeStyles.color);
    
    // Get styles for ::after pseudo-element
    const afterStyles = window.getComputedStyle(quote, '::after');
    console.log('After content:', afterStyles.content);
    console.log('After color:', afterStyles.color);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a paragraph with styled ::before and ::after pseudo-elements. The
JavaScript code uses the second parameter of getComputedStyle to
access these pseudo-element styles.

This demonstrates how to inspect styles applied to pseudo-elements, which can't
be accessed through regular DOM methods. The second parameter specifies which
pseudo-element to target.

## Comparing Inline and Computed Styles

This example demonstrates the difference between inline styles and computed styles.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Inline vs Computed Styles&lt;/title&gt;
    &lt;style&gt;
        #compare {
            font-size: 18px;
            color: green;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="compare" style="color: red; font-weight: bold;"&gt;
    Style Comparison
&lt;/div&gt;

&lt;script&gt;
    const div = document.getElementById('compare');
    
    // Inline styles
    console.log('Inline color:', div.style.color);
    console.log('Inline font-size:', div.style.fontSize);
    
    // Computed styles
    const computed = window.getComputedStyle(div);
    console.log('Computed color:', computed.color);
    console.log('Computed font-size:', computed.fontSize);
    console.log('Computed font-weight:', computed.fontWeight);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div with both stylesheet and inline styles. The
JavaScript code compares what's accessible via element.style versus
getComputedStyle.

The key difference is that element.style only shows inline styles,
while getComputedStyle shows all applied styles, including those
from stylesheets. Also note that element.style properties are
camelCased (fontSize), while computed styles are hyphenated (font-size).

## Checking Visibility Status

This example shows how to use getComputedStyle to check if an element is visible.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Checking Visibility&lt;/title&gt;
    &lt;style&gt;
        #hidden {
            display: none;
        }
        #visible {
            visibility: hidden;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="hidden"&gt;This is hidden with display: none&lt;/div&gt;
&lt;div id="visible"&gt;This is hidden with visibility: hidden&lt;/div&gt;
&lt;div id="normal"&gt;This is normally visible&lt;/div&gt;

&lt;script&gt;
    function checkVisibility(id) {
        const el = document.getElementById(id);
        const style = window.getComputedStyle(el);
        
        console.log(`${id} visibility:`, style.visibility);
        console.log(`${id} display:`, style.display);
        console.log(`${id} is visible:`, 
            style.display !== 'none' &amp;&amp; style.visibility !== 'hidden');
    }
    
    checkVisibility('hidden');
    checkVisibility('visible');
    checkVisibility('normal');
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have three divs with different visibility states. The JavaScript function
uses getComputedStyle to check their display and visibility
properties.

This demonstrates how to programmatically determine if an element is visible.
Note that both display: none and visibility: hidden
affect visibility differently, and both need to be checked for a complete
assessment.

## Animating with Computed Styles

This example shows how to use getComputedStyle in animations by reading current
values before animating.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animation with Computed Styles&lt;/title&gt;
    &lt;style&gt;
        #box {
            width: 100px;
            height: 100px;
            background-color: coral;
            position: relative;
            left: 0;
            transition: left 1s ease;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="box"&gt;&lt;/div&gt;
&lt;button onclick="moveBox()"&gt;Move Box&lt;/button&gt;

&lt;script&gt;
    function moveBox() {
        const box = document.getElementById('box');
        const style = window.getComputedStyle(box);
        
        // Get current left position (returns '0px')
        const currentLeft = parseInt(style.left);
        
        // Move to new position based on current position
        box.style.left = `${currentLeft + 100}px`;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a box that moves right when a button is clicked. The
JavaScript uses getComputedStyle to read the current left position
before calculating the new position.

This demonstrates how getComputedStyle can be used in animations
to read current property values. Note that we use parseInt to
convert the 'px' string value to a number for calculations.

## Source

[MDN getComputedStyle Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)

In this article, we have shown how to use window.getComputedStyle
in JavaScript. This method is essential for accessing complete style information
and creating dynamic, style-aware applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).