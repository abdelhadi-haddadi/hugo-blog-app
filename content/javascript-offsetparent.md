+++
title = "JavaScript offsetParent"
date = 2025-08-29T19:53:26.381+01:00
draft = false
description = "Learn how to use JavaScript's offsetParent property to understand element positioning in the DOM. This tutorial provides detailed explanations and practical examples."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript offsetParent

last modified April 2, 2025

In this article, we explore the offsetParent property in JavaScript.
This property is crucial for understanding element positioning and layout in the
DOM hierarchy.

## Basic Definition

The offsetParent property returns the nearest ancestor element that
is positioned (not static). If no positioned ancestor exists, it returns the
body element or null for hidden elements.

This property is read-only and helps determine an element's positioning context.
It's essential for calculating accurate element positions relative to their
containers.

## Basic offsetParent Example

This example demonstrates how to access an element's offsetParent property.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic offsetParent&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            width: 300px;
            height: 200px;
            border: 1px solid black;
        }
        #child {
            position: absolute;
            top: 50px;
            left: 50px;
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="child"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    console.log(child.offsetParent.id); // Outputs: container
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a container div with relative positioning and a child
div with absolute positioning. The child's offsetParent is the container div.

This demonstrates how offsetParent identifies the nearest positioned ancestor.
The child's position is calculated relative to its offsetParent (the container).

## offsetParent with No Positioned Ancestor

This example shows offsetParent behavior when no positioned ancestor exists.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;No Positioned Ancestor&lt;/title&gt;
    &lt;style&gt;
        #child {
            margin: 20px;
            width: 100px;
            height: 100px;
            background-color: lightgreen;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="child"&gt;&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    console.log(child.offsetParent.tagName); // Outputs: BODY
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a child div with no positioned ancestors. The offsetParent defaults
to the body element since it's the nearest non-static containing block.

This shows how offsetParent falls back to the body element when no positioned
ancestors exist. The element's position would be relative to the document body.

## offsetParent with Display None

This example demonstrates offsetParent behavior with display:none elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Display None&lt;/title&gt;
    &lt;style&gt;
        #container {
            position: relative;
            width: 300px;
            height: 200px;
            border: 1px solid black;
        }
        #child {
            display: none;
            width: 100px;
            height: 100px;
            background-color: lightcoral;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;div id="child"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const child = document.getElementById('child');
    console.log(child.offsetParent); // Outputs: null
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this case, the child element has display:none. Its offsetParent returns null
because hidden elements don't participate in the layout.

This illustrates an important edge case. Elements that aren't rendered (display:
none or not in DOM) return null for offsetParent, unlike visibility:hidden.

## offsetParent with Fixed Positioning

This example shows offsetParent behavior with fixed-positioned elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Fixed Positioning&lt;/title&gt;
    &lt;style&gt;
        #fixed {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 100px;
            height: 100px;
            background-color: lightyellow;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="fixed"&gt;&lt;/div&gt;

&lt;script&gt;
    const fixed = document.getElementById('fixed');
    console.log(fixed.offsetParent); // Outputs: null in most browsers
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a fixed-positioned element. In most browsers, its offsetParent
returns null because fixed elements are positioned relative to the viewport.

This demonstrates how fixed positioning affects offsetParent. The element is
positioned relative to the viewport, not any ancestor, hence null is returned.

## offsetParent in Nested Structures

This example demonstrates offsetParent in a complex nested structure.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Structure&lt;/title&gt;
    &lt;style&gt;
        .outer {
            position: relative;
            width: 400px;
            height: 300px;
            border: 1px solid black;
        }
        .middle {
            margin: 20px;
            width: 350px;
            height: 250px;
            border: 1px solid blue;
        }
        .inner {
            position: absolute;
            top: 50px;
            left: 50px;
            width: 100px;
            height: 100px;
            background-color: lightpink;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="outer"&gt;
    &lt;div class="middle"&gt;
        &lt;div class="inner"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const inner = document.querySelector('.inner');
    console.log(inner.offsetParent.className); // Outputs: outer
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this nested structure, the inner div has absolute positioning. Its offsetParent
is the outer div, which is the nearest positioned ancestor.

This shows how offsetParent skips non-positioned elements (the middle div) to
find the nearest positioned ancestor. The inner div's position is relative to
the outer div.

## Source

[MDN offsetParent Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)

In this article, we've explored the JavaScript offsetParent property. It's a
powerful tool for understanding element positioning and layout calculations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).