+++
title = "JavaScript toggleAttribute"
date = 2025-08-29T19:53:36.430+01:00
draft = false
description = "Learn how to use JavaScript's toggleAttribute method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toggleAttribute

last modified April 2, 2025

In this article, we explore the element.toggleAttribute method in
JavaScript. This method provides a convenient way to toggle HTML attributes on
DOM elements, making it useful for dynamic UI changes.

## Basic Definition

The toggleAttribute method toggles a boolean attribute on an
element. If the attribute exists, it removes it; if it doesn't exist, it adds
it. This method simplifies attribute manipulation in JavaScript.

The method takes two parameters: the attribute name and an optional force
boolean. The force parameter determines whether the attribute should be added
(true) or removed (false) regardless of its current state.

## Basic toggleAttribute

This example demonstrates how to toggle the disabled attribute on a button.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic toggleAttribute&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button id="myButton"&gt;Click Me&lt;/button&gt;
&lt;button onclick="toggleButton()"&gt;Toggle Disabled&lt;/button&gt;

&lt;script&gt;
    function toggleButton() {
        const button = document.getElementById('myButton');
        button.toggleAttribute('disabled');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have two buttons. The second button toggles the
disabled state of the first button using toggleAttribute.

This shows the simplest use case of toggleAttribute with a boolean
attribute. The method automatically handles adding or removing the attribute
based on its current state.

## Toggle with Force Parameter

This example shows how to use the force parameter to control the toggle behavior.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Force Parameter&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="checkbox" id="myCheckbox"&gt;
&lt;button onclick="forceCheck()"&gt;Force Check&lt;/button&gt;
&lt;button onclick="forceUncheck()"&gt;Force Uncheck&lt;/button&gt;

&lt;script&gt;
    function forceCheck() {
        const checkbox = document.getElementById('myCheckbox');
        checkbox.toggleAttribute('checked', true);
    }
    
    function forceUncheck() {
        const checkbox = document.getElementById('myCheckbox');
        checkbox.toggleAttribute('checked', false);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a checkbox and two buttons. The first button forces the checked
attribute to be set, while the second forces it to be removed.

This demonstrates how the force parameter overrides the default toggle behavior.
When true, the attribute is always added; when false, it's always removed.

## Toggle Custom Data Attribute

This example demonstrates toggling a custom data attribute on an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Custom Data Attribute&lt;/title&gt;
    &lt;style&gt;
        [data-highlight] {
            background-color: yellow;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text"&gt;This is some sample text.&lt;/p&gt;
&lt;button onclick="toggleHighlight()"&gt;Toggle Highlight&lt;/button&gt;

&lt;script&gt;
    function toggleHighlight() {
        const text = document.getElementById('text');
        text.toggleAttribute('data-highlight');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a paragraph and a button. Clicking the button toggles
a custom data attribute that changes the paragraph's background color.

This shows how toggleAttribute works with non-boolean attributes.
The CSS selector targets elements with the data-highlight attribute to apply
styling.

## Toggle Multiple Attributes

This example shows how to toggle multiple attributes on an element at once.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Attributes&lt;/title&gt;
    &lt;style&gt;
        .hidden {
            display: none;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content" hidden aria-hidden="true"&gt;Secret content!&lt;/div&gt;
&lt;button onclick="toggleContent()"&gt;Toggle Content&lt;/button&gt;

&lt;script&gt;
    function toggleContent() {
        const content = document.getElementById('content');
        content.toggleAttribute('hidden');
        content.toggleAttribute('aria-hidden');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a hidden div and a button. Clicking the button toggles both the
hidden and aria-hidden attributes simultaneously.

This demonstrates how to manage multiple related attributes together. The hidden
attribute controls visibility while aria-hidden ensures proper accessibility.

## Toggle Attribute with Class List

This example combines attribute toggling with class list manipulation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;With Class List&lt;/title&gt;
    &lt;style&gt;
        .active {
            font-weight: bold;
            color: red;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p id="text" aria-current="false"&gt;Sample text with combined effects.&lt;/p&gt;
&lt;button onclick="toggleActive()"&gt;Toggle Active&lt;/button&gt;

&lt;script&gt;
    function toggleActive() {
        const text = document.getElementById('text');
        text.classList.toggle('active');
        text.toggleAttribute('aria-current');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, clicking the button toggles both a CSS class and an ARIA
attribute on a paragraph element.

This shows how toggleAttribute can be used alongside
classList.toggle to create comprehensive UI state changes that
include both styling and semantic attributes.

## Source

[MDN toggleAttribute Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute)

In this article, we have shown how to use element.toggleAttribute
in JavaScript. This method provides a clean way to manage element attributes
dynamically in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).