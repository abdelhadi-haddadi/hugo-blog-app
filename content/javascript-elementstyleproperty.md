+++
title = "JavaScript element.style.property"
date = 2025-08-29T19:53:35.282+01:00
draft = false
description = "Learn how to use JavaScript's element.style.property to modify CSS styles effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript element.style.property

last modified April 2, 2025

In this article, we explore the element.style.property in JavaScript.
This property allows direct manipulation of an element's inline styles, providing
dynamic control over appearance and layout.

## Basic Definition

The element.style property returns a CSSStyleDeclaration
object that represents an element's style attribute. It provides access to all
inline CSS properties of that element.

Properties are accessed and modified using camelCase versions of CSS property
names. For example, background-color becomes
backgroundColor in JavaScript.

Changes made through element.style apply directly to the element's
inline style attribute, overriding any styles from external CSS files or
&lt;style&gt; tags.

## Changing Background Color

This example demonstrates how to change an element's background color using
element.style.backgroundColor.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Background Color Change&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="colorBox" style="width: 200px; height: 200px; border: 1px solid black;"&gt;
    Click to change color
&lt;/div&gt;

&lt;script&gt;
    const box = document.getElementById('colorBox');
    box.addEventListener('click', function() {
        this.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div element that changes its background color when
clicked. The color is generated randomly using hexadecimal notation.

The style.backgroundColor property is set to a new value each time
the element is clicked. Note how the CSS property name is camelCased in
JavaScript.

## Animating Element Position

This example shows how to animate an element's position using
element.style properties.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Position Animation&lt;/title&gt;
    &lt;style&gt;
        #movingBox {
            width: 50px;
            height: 50px;
            background-color: red;
            position: absolute;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="movingBox"&gt;&lt;/div&gt;
&lt;button id="animateBtn"&gt;Start Animation&lt;/button&gt;

&lt;script&gt;
    const box = document.getElementById('movingBox');
    const btn = document.getElementById('animateBtn');
    let pos = 0;
    let animationId;

    btn.addEventListener('click', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            btn.textContent = 'Start Animation';
            return;
        }
        
        btn.textContent = 'Stop Animation';
        animate();
    });

    function animate() {
        pos = (pos + 2) % 400;
        box.style.left = pos + 'px';
        box.style.top = pos + 'px';
        animationId = requestAnimationFrame(animate);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a simple animation where a box moves diagonally across the
screen. The position is updated using style.left and
style.top properties.

The animation uses requestAnimationFrame for smooth performance.
Note how we must include units (px) when setting position values.

## Toggle Visibility

This example demonstrates how to toggle an element's visibility using
element.style.display.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Toggle Visibility&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="toggleBtn"&gt;Toggle Content&lt;/button&gt;
&lt;div id="content" style="padding: 20px; background-color: #f0f0f0; margin-top: 10px;"&gt;
    This content can be shown or hidden.
&lt;/div&gt;

&lt;script&gt;
    const btn = document.getElementById('toggleBtn');
    const content = document.getElementById('content');
    
    btn.addEventListener('click', function() {
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the button toggles the visibility of the content div
by switching its display style property between 'none' and 'block'.

This is a common pattern for showing/hiding elements. The initial state is
determined by checking the current value of style.display.

## Dynamic Font Styling

This example shows how to dynamically change font properties using
element.style.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Font Styling&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="text" style="padding: 20px;"&gt;
    This text will change based on your selections.
&lt;/div&gt;

&lt;select id="fontFamily"&gt;
    &lt;option value="Arial"&gt;Arial&lt;/option&gt;
    &lt;option value="Times New Roman"&gt;Times New Roman&lt;/option&gt;
    &lt;option value="Courier New"&gt;Courier New&lt;/option&gt;
&lt;/select&gt;

&lt;input type="range" id="fontSize" min="10" max="40" value="16"&gt;

&lt;script&gt;
    const text = document.getElementById('text');
    const fontFamily = document.getElementById('fontFamily');
    const fontSize = document.getElementById('fontSize');
    
    fontFamily.addEventListener('change', function() {
        text.style.fontFamily = this.value;
    });
    
    fontSize.addEventListener('input', function() {
        text.style.fontSize = this.value + 'px';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example allows users to change the font family and size of text using form
controls. The changes are applied immediately through style.fontFamily
and style.fontSize.

Note how the font size requires units (px) while the font family accepts string
values directly. Event listeners respond to user input in real-time.

## Complex Style Transformations

This example demonstrates complex style transformations using
element.style.transform.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Transformations&lt;/title&gt;
    &lt;style&gt;
        #transformBox {
            width: 100px;
            height: 100px;
            background-color: #4CAF50;
            margin: 50px auto;
            transition: transform 0.5s ease;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="transformBox"&gt;&lt;/div&gt;
&lt;button id="rotateBtn"&gt;Rotate&lt;/button&gt;
&lt;button id="scaleBtn"&gt;Scale&lt;/button&gt;
&lt;button id="resetBtn"&gt;Reset&lt;/button&gt;

&lt;script&gt;
    const box = document.getElementById('transformBox');
    const rotateBtn = document.getElementById('rotateBtn');
    const scaleBtn = document.getElementById('scaleBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    rotateBtn.addEventListener('click', function() {
        box.style.transform = 'rotate(45deg)';
    });
    
    scaleBtn.addEventListener('click', function() {
        box.style.transform = 'scale(1.5)';
    });
    
    resetBtn.addEventListener('click', function() {
        box.style.transform = 'none';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows how to apply CSS transforms through JavaScript. The box can be
rotated, scaled, or reset to its original state using the buttons.

The transition property in CSS ensures smooth animations between
states. Multiple transforms can be combined in a single string for more complex
effects.

## Source

[MDN HTMLElement.style Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)

In this article, we have explored the element.style.property in
JavaScript. This powerful feature enables dynamic styling of web pages,
allowing for interactive and responsive user interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).