+++
title = "JavaScript textContent"
date = 2025-08-29T19:53:35.275+01:00
draft = false
description = "Learn how to use JavaScript's textContent property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript textContent

last modified April 2, 2025

In this article, we explore the textContent property in JavaScript.
This property is essential for working with text content in DOM elements,
providing a safe and efficient way to manipulate text.

## Basic Definition

The textContent property gets or sets the text content of a node and
all its descendants. Unlike innerHTML, it doesn't parse HTML tags,
making it safer against XSS attacks.

When getting text content, textContent returns all text within the
element, including hidden elements. When setting text content, any existing
content is completely replaced with the new text.

## Basic textContent Usage

This example demonstrates how to get and set text content using textContent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic textContent&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="demo"&gt;Initial text content&lt;/div&gt;

&lt;script&gt;
    const element = document.getElementById('demo');
    console.log(element.textContent); // "Initial text content"
    
    element.textContent = 'Updated text content';
    console.log(element.textContent); // "Updated text content"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we first get the text content of a div element and log
it to the console. Then we update the text content and log the new value.

This demonstrates the fundamental usage of textContent for both
reading and writing text content. The property works with any HTML element that
can contain text.

## textContent vs innerHTML

This example shows the difference between textContent and innerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;textContent vs innerHTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;Some text &lt;span&gt;with nested elements&lt;/span&gt;&lt;/p&gt;
&lt;/div&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    
    console.log('textContent:', container.textContent);
    console.log('innerHTML:', container.innerHTML);
    
    container.textContent = '&lt;strong&gt;New text&lt;/strong&gt;';
    console.log('After textContent:', container.innerHTML);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we compare how textContent and innerHTML handle
content differently. textContent returns all text, while
innerHTML returns the HTML markup.

When we set content with textContent, HTML tags are treated as
plain text and not parsed. This makes textContent safer for user
input as it prevents XSS attacks.

## textContent with Hidden Elements

This example demonstrates how textContent works with hidden elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;textContent with Hidden Elements&lt;/title&gt;
    &lt;style&gt;
        .hidden { display: none; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;
    Visible text
    &lt;span class="hidden"&gt;Hidden text&lt;/span&gt;
&lt;/div&gt;

&lt;script&gt;
    const content = document.getElementById('content');
    console.log(content.textContent); // "Visible text Hidden text"
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a div containing both visible and hidden text.
textContent retrieves all text content regardless of visibility.

This behavior is different from innerText which only returns
visible text. textContent is more consistent as it always returns
all text content in the DOM tree.

## Clearing Element Content

This example shows how to use textContent to clear element content.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Clearing Content&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="list"&gt;
    &lt;ul&gt;
        &lt;li&gt;Item 1&lt;/li&gt;
        &lt;li&gt;Item 2&lt;/li&gt;
        &lt;li&gt;Item 3&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;button onclick="clearContent()"&gt;Clear Content&lt;/button&gt;

&lt;script&gt;
    function clearContent() {
        const list = document.getElementById('list');
        list.textContent = '';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a list of items and a button. When clicked, the button clears all
content inside the list container using textContent.

Setting textContent to an empty string is an efficient way to
remove all child nodes from an element. It's faster than removing nodes
individually and safer than using innerHTML with empty string.

## Performance Considerations

This example demonstrates the performance benefits of textContent.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Performance Test&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="test"&gt;Initial content&lt;/div&gt;
&lt;button onclick="runTest()"&gt;Run Performance Test&lt;/button&gt;
&lt;div id="results"&gt;&lt;/div&gt;

&lt;script&gt;
    function runTest() {
        const element = document.getElementById('test');
        const results = document.getElementById('results');
        const iterations = 10000;
        
        // Test textContent
        let start = performance.now();
        for (let i = 0; i &lt; iterations; i++) {
            element.textContent = 'textContent ' + i;
        }
        let textContentTime = performance.now() - start;
        
        // Test innerHTML
        start = performance.now();
        for (let i = 0; i &lt; iterations; i++) {
            element.innerHTML = 'innerHTML ' + i;
        }
        let innerHTMLTime = performance.now() - start;
        
        results.innerHTML = `
            &lt;p&gt;textContent: ${textContentTime.toFixed(2)}ms&lt;/p&gt;
            &lt;p&gt;innerHTML: ${innerHTMLTime.toFixed(2)}ms&lt;/p&gt;
        `;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example compares the performance of textContent versus
innerHTML when updating element content repeatedly.
textContent is generally faster as it doesn't parse HTML.

The performance difference becomes more noticeable with frequent updates or
large amounts of content. For simple text updates,
textContent should be preferred for better performance.

## Source

[MDN textContent Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

In this article, we have explored the textContent property in
JavaScript. This property is essential for safe and efficient text manipulation
in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).