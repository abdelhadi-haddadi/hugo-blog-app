+++
title = "JavaScript querySelectorAll"
date = 2025-08-29T19:53:30.848+01:00
draft = false
description = "Learn how to use JavaScript's querySelectorAll method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript querySelectorAll

last modified April 2, 2025

In this article, we explore the querySelectorAll method in
JavaScript. This powerful method allows developers to select multiple DOM
elements using CSS selectors, providing flexibility in element selection.

## Basic Definition

The querySelectorAll method returns a static NodeList representing
a list of elements that match the specified group of selectors. Unlike
getElementById, it can select multiple elements at once.

This method is available on both the document object and individual
elements. It accepts any valid CSS selector as its parameter, making it
extremely versatile for DOM manipulation tasks.

## Basic querySelectorAll

This example demonstrates how to select all elements with a specific class name.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic querySelectorAll&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p class="note"&gt;First note&lt;/p&gt;
&lt;p class="note"&gt;Second note&lt;/p&gt;
&lt;p class="note"&gt;Third note&lt;/p&gt;

&lt;script&gt;
    const notes = document.querySelectorAll('.note');
    notes.forEach(note =&gt; {
        console.log(note.textContent);
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have three paragraph elements with the class "note".
The JavaScript code selects all of them using querySelectorAll and
logs their text content to the console.

The method returns a NodeList, which is an array-like object that can be
iterated using forEach. This demonstrates the fundamental usage of
querySelectorAll to access multiple elements at once.

## Selecting Multiple Element Types

This example shows how to select different types of elements with one call.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Multiple Element Types&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;Section Title&lt;/h2&gt;
&lt;p class="intro"&gt;Introduction text&lt;/p&gt;
&lt;div id="content"&gt;Main content here&lt;/div&gt;

&lt;script&gt;
    const elements = document.querySelectorAll('h2, .intro, #content');
    elements.forEach(el =&gt; {
        el.style.color = 'blue';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we select an h2 element, an element with class "intro", and an element with
ID "content" in one querySelectorAll call. We then change their
text color to blue.

This demonstrates how querySelectorAll can accept multiple
selectors separated by commas, similar to CSS selector syntax. The returned
NodeList contains all matching elements in document order.

## Nested Element Selection

This example demonstrates selecting elements within a specific container.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Nested Selection&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="container"&gt;
    &lt;p&gt;First paragraph&lt;/p&gt;
    &lt;p&gt;Second paragraph&lt;/p&gt;
&lt;/div&gt;
&lt;p&gt;Outside paragraph&lt;/p&gt;

&lt;script&gt;
    const container = document.getElementById('container');
    const innerParagraphs = container.querySelectorAll('p');
    
    innerParagraphs.forEach(p =&gt; {
        p.style.fontWeight = 'bold';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we first select a container div, then use
querySelectorAll on that element to find all paragraph elements
within it. We make these paragraphs bold while leaving the outside one unchanged.

This shows how querySelectorAll can be called on specific elements
to search only within their descendants. This scoped searching is particularly
useful for component-based development.

## Attribute Selectors

This example shows how to use attribute selectors with querySelectorAll.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Attribute Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" placeholder="Username"&gt;
&lt;input type="password" placeholder="Password"&gt;
&lt;input type="submit" value="Login"&gt;

&lt;script&gt;
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input =&gt; {
        input.style.border = '2px solid green';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we select all input elements with type="text" using an attribute selector.
We then add a green border to these specific input fields while leaving others
unaffected.

This demonstrates the power of CSS-style attribute selectors with
querySelectorAll. You can use any CSS attribute selector pattern,
including partial matches like [name^="user"] for names starting
with "user".

## Complex Selectors

This example demonstrates using complex CSS selectors with querySelectorAll.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Complex Selectors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul class="menu"&gt;
    &lt;li&gt;Home&lt;/li&gt;
    &lt;li class="active"&gt;Products&lt;/li&gt;
    &lt;li&gt;Services&lt;/li&gt;
    &lt;li&gt;Contact&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    const items = document.querySelectorAll('ul.menu li:not(.active)');
    items.forEach(item =&gt; {
        item.style.opacity = '0.7';
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we select all list items within a ul.menu that don't have the
"active" class. We then reduce their opacity to make the active item stand out.

This shows how querySelectorAll can handle complex CSS selectors
including combinators, pseudo-classes, and negation. The selector engine
supports nearly all CSS3 selector syntax for powerful element selection.

## Source

[MDN querySelectorAll Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

In this article, we have shown how to use querySelectorAll in
JavaScript. This method is essential for modern DOM manipulation and element
selection in web development, offering CSS selector flexibility.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).