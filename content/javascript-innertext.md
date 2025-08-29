+++
title = "JavaScript innerText"
date = 2025-08-29T19:53:23.007+01:00
draft = false
description = "Learn how to use JavaScript's innerText property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript innerText

last modified April 2, 2025

In this article, we explore the innerText property in JavaScript.
This property is essential for working with text content of DOM elements,
providing a simple way to get or set human-readable text.

## Basic Definition

The innerText property represents the rendered text content of a
node and its descendants. It returns only the visible text, ignoring hidden
elements and preserving spacing and line breaks.

Unlike textContent, innerText is aware of styling and
CSS. It won't return text from hidden elements and will respect visual layout
including line breaks caused by CSS.

## Basic innerText Usage

This example demonstrates how to get and set text content using innerText.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic innerText&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;Hello &lt;span&gt;World&lt;/span&gt;!&lt;/div&gt;
&lt;button onclick="showText()"&gt;Show Text&lt;/button&gt;

&lt;script&gt;
    function showText() {
        const element = document.getElementById('content');
        alert(element.innerText);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element containing text and a span. When
the button is clicked, the showText function retrieves the element
and displays its text content using innerText.

The alert will show "Hello World!" because innerText combines all
visible text content, including text within child elements. It preserves the
space between words but ignores HTML tags.

## innerText vs textContent

This example demonstrates the difference between innerText and textContent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;innerText vs textContent&lt;/title&gt;
    &lt;style&gt;
        .hidden { display: none; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="example"&gt;
    Visible text
    &lt;span class="hidden"&gt;Hidden text&lt;/span&gt;
    &lt;div&gt;More text&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('example');
    console.log('innerText:', element.innerText);
    console.log('textContent:', element.textContent);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows a div with both visible and hidden text content. The
JavaScript logs both innerText and textContent values.

innerText will return only "Visible text More text" while
textContent will include the hidden text. Also,
innerText is more performance-heavy as it requires layout
information.

## Setting Text with innerText

This example shows how to set text content using innerText.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Setting Text&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="output"&gt;Original content&lt;/div&gt;
&lt;button onclick="updateText()"&gt;Update Text&lt;/button&gt;

&lt;script&gt;
    function updateText() {
        const output = document.getElementById('output');
        output.innerText = 'New content with\nline breaks';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a div element and a button. When clicked, the button updates the
div's content using innerText with a string containing a newline.

The newline character in the string will be rendered as an actual line break in
the HTML because innerText preserves whitespace and line breaks
when setting content. This differs from HTML parsing behavior.

## innerText with Formatted Content

This example demonstrates how innerText handles formatted content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Formatted Content&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="formatted" style="white-space: pre-wrap;"&gt;
    This    text    has    extra    spaces
    And multiple
    lines
&lt;/div&gt;
&lt;button onclick="showFormattedText()"&gt;Show Text&lt;/button&gt;

&lt;script&gt;
    function showFormattedText() {
        const element = document.getElementById('formatted');
        alert(element.innerText);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows a div with extra spaces and line breaks, styled with
white-space: pre-wrap. The button displays the text using
innerText.

The alert will show the text exactly as rendered, with preserved spaces and line
breaks. This demonstrates how innerText respects the visual
presentation of text, including CSS styling that affects text layout.

## Security Considerations

This example shows why innerText is safer than innerHTML for user content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Security Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="safeOutput"&gt;&lt;/div&gt;
&lt;div id="unsafeOutput"&gt;&lt;/div&gt;
&lt;button onclick="testSecurity()"&gt;Test Security&lt;/button&gt;

&lt;script&gt;
    function testSecurity() {
        const userInput = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
        
        document.getElementById('safeOutput').innerText = userInput;
        document.getElementById('unsafeOutput').innerHTML = userInput;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example compares innerText and innerHTML when
handling potentially malicious user input. The button triggers both methods.

The innerText version will display the script tags as text,
preventing XSS attacks. The innerHTML version would attempt to
execute the script. This shows why innerText is safer for
user-generated content.

## Source

[MDN innerText Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)

In this article, we have shown how to use the innerText property
in JavaScript. This property is essential for safely working with text content
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).