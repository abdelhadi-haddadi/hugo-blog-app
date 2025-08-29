+++
title = "JavaScript innerHTML"
date = 2025-08-29T19:53:22.996+01:00
draft = false
description = "Learn how to use JavaScript's innerHTML property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript innerHTML

last modified April 2, 2025

In this article, we explore the innerHTML property in JavaScript.
This property is essential for DOM manipulation, allowing developers to get or
set the HTML content of an element.

## Basic Definition

The innerHTML property gets or sets the HTML or XML markup contained
within an element. It is one of the most powerful properties for dynamic content
updates in JavaScript.

When reading innerHTML, it returns the HTML content as a string.
When setting innerHTML, it completely replaces the element's
content with the parsed HTML string.

## Basic innerHTML Usage

This example demonstrates how to get and set HTML content using innerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic innerHTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;&lt;p&gt;Original content&lt;/p&gt;&lt;/div&gt;
&lt;button onclick="changeContent()"&gt;Change Content&lt;/button&gt;

&lt;script&gt;
    function changeContent() {
        const element = document.getElementById('content');
        console.log(element.innerHTML); // Logs current content
        
        element.innerHTML = '&lt;h2&gt;New Content&lt;/h2&gt;&lt;p&gt;Changed via innerHTML&lt;/p&gt;';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with initial content. The
JavaScript code first logs the current HTML content, then replaces it with
new HTML markup when the button is clicked.

This demonstrates the fundamental usage of innerHTML to access
and modify an element's content. The property can handle complex HTML
structures, not just plain text.

## Creating Dynamic Lists

This example shows how to use innerHTML to dynamically generate list items.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Lists&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="fruitList"&gt;&lt;/ul&gt;
&lt;button onclick="generateList()"&gt;Generate List&lt;/button&gt;

&lt;script&gt;
    function generateList() {
        const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
        const listElement = document.getElementById('fruitList');
        
        let listHTML = '';
        fruits.forEach(fruit =&gt; {
            listHTML += `&lt;li&gt;${fruit}&lt;/li&gt;`;
        });
        
        listElement.innerHTML = listHTML;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we start with an empty unordered list. When the button is clicked, the
generateList function creates HTML for list items from an array
and inserts them using innerHTML.

This demonstrates how innerHTML can efficiently update multiple
elements at once. Building the HTML string first and then setting it once is
more performant than multiple DOM manipulations.

## Security Considerations

This example demonstrates the potential security risks with innerHTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Security Risks&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="userContent"&gt;&lt;/div&gt;
&lt;input type="text" id="userInput" placeholder="Enter some text"&gt;
&lt;button onclick="displayContent()"&gt;Display&lt;/button&gt;

&lt;script&gt;
    function displayContent() {
        const input = document.getElementById('userInput').value;
        const element = document.getElementById('userContent');
        
        // UNSAFE: Potential XSS vulnerability
        element.innerHTML = input;
        
        // SAFER alternative:
        // element.textContent = input;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, user input is directly inserted into the page using
innerHTML. This creates an XSS vulnerability if the input
contains malicious script tags.

Always sanitize user input before using innerHTML, or consider
using textContent when only plain text is needed. This is a
critical security consideration when working with dynamic content.

## Performance Comparison

This example compares innerHTML with DOM manipulation methods.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Performance Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container1"&gt;&lt;/div&gt;
&lt;div id="container2"&gt;&lt;/div&gt;
&lt;button onclick="runTest()"&gt;Run Test&lt;/button&gt;

&lt;script&gt;
    function runTest() {
        const items = Array(1000).fill().map((_, i) =&gt; `Item ${i + 1}`);
        
        // Using innerHTML
        console.time('innerHTML');
        const container1 = document.getElementById('container1');
        container1.innerHTML = items.map(item =&gt; `&lt;div&gt;${item}&lt;/div&gt;`).join('');
        console.timeEnd('innerHTML');
        
        // Using DOM methods
        console.time('DOM');
        const container2 = document.getElementById('container2');
        items.forEach(item =&gt; {
            const div = document.createElement('div');
            div.textContent = item;
            container2.appendChild(div);
        });
        console.timeEnd('DOM');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code compares two approaches to adding 1000 elements: using
innerHTML versus using DOM manipulation methods. The console
timings show the performance difference.

innerHTML is generally faster for bulk operations because it
minimizes reflows and repaints. However, DOM methods provide more control
and are safer when working with user-generated content.

## Combining with Template Literals

This example shows how to use template literals with innerHTML for complex HTML.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Template Literals&lt;/title&gt;
    &lt;style&gt;
        .card {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            width: 200px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="cardContainer"&gt;&lt;/div&gt;
&lt;button onclick="createCard()"&gt;Add Card&lt;/button&gt;

&lt;script&gt;
    function createCard() {
        const container = document.getElementById('cardContainer');
        const title = 'Sample Card';
        const content = 'This card was created using template literals and innerHTML';
        
        container.innerHTML += `
            &lt;div class="card"&gt;
                &lt;h3&gt;${title}&lt;/h3&gt;
                &lt;p&gt;${content}&lt;/p&gt;
                &lt;small&gt;Created: ${new Date().toLocaleTimeString()}&lt;/small&gt;
            &lt;/div&gt;
        `;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use template literals to create a clean, readable way to generate
complex HTML structures. The card template includes dynamic data and is
appended to the container using innerHTML.

Template literals make HTML generation more maintainable by keeping the
structure visible. Note the use of += to append rather than
replace existing content.

## Source

[MDN innerHTML Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

In this article, we have shown how to use the innerHTML property
in JavaScript. This powerful feature enables dynamic content updates but requires
careful use regarding security and performance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).