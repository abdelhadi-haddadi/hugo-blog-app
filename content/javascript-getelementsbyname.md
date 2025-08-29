+++
title = "JavaScript getElementsByName"
date = 2025-08-29T19:53:09.492+01:00
draft = false
description = "Learn how to use JavaScript's getElementsByName method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript getElementsByName

last modified April 2, 2025

In this article, we explore the document.getElementsByName method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to access elements by their name attribute.

## Basic Definition

The document.getElementsByName method returns a NodeList collection
of elements with the specified name attribute. Unlike IDs, name attributes can
be shared by multiple elements.

This method is particularly useful for working with form elements like radio
buttons and checkboxes that often share the same name. The returned NodeList is
live, meaning it updates automatically when the document changes.

## Basic getElementsByName

This example demonstrates how to access elements by their name attribute.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic getElementsByName&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="text" name="username" value="John"&gt;
&lt;input type="text" name="username" value="Doe"&gt;

&lt;script&gt;
    const elements = document.getElementsByName('username');
    for (let i = 0; i &lt; elements.length; i++) {
        console.log(elements[i].value);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have two input elements with the same name "username".
The JavaScript code retrieves these elements using getElementsByName
and logs their values to the console.

This demonstrates the fundamental usage of getElementsByName to
access multiple elements sharing the same name. The method returns a NodeList
that we can iterate through.

## Working with Radio Buttons

This example shows how to use getElementsByName with radio buttons.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Radio Buttons&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="radio" name="gender" value="male" checked&gt; Male
&lt;input type="radio" name="gender" value="female"&gt; Female
&lt;button onclick="getSelectedGender()"&gt;Get Gender&lt;/button&gt;

&lt;script&gt;
    function getSelectedGender() {
        const genders = document.getElementsByName('gender');
        let selectedValue;
        
        for (let i = 0; i &lt; genders.length; i++) {
            if (genders[i].checked) {
                selectedValue = genders[i].value;
                break;
            }
        }
        
        alert('Selected gender: ' + selectedValue);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have radio buttons for gender selection. When the button is clicked, the
getSelectedGender function uses getElementsByName to
find all radio buttons and determine which one is selected.

This demonstrates how getElementsByName is perfect for working with
radio button groups, which must share the same name to function as a group.

## Modifying Multiple Elements

This example demonstrates how to modify multiple elements at once.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Modifying Elements&lt;/title&gt;
    &lt;style&gt;
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p name="content"&gt;First paragraph&lt;/p&gt;
&lt;p name="content"&gt;Second paragraph&lt;/p&gt;
&lt;p name="content"&gt;Third paragraph&lt;/p&gt;
&lt;button onclick="highlightContent()"&gt;Highlight Content&lt;/button&gt;

&lt;script&gt;
    function highlightContent() {
        const paragraphs = document.getElementsByName('content');
        for (let i = 0; i &lt; paragraphs.length; i++) {
            paragraphs[i].classList.add('highlight');
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have multiple paragraphs with the same name. When the button
is clicked, the highlightContent function adds a CSS class to all
matching elements.

This shows how getElementsByName can be used to apply changes to
multiple elements simultaneously. The NodeList returned is array-like but not an
actual array.

## Form Validation

This example demonstrates form validation using getElementsByName.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input type="checkbox" name="terms"&gt; I agree to terms
&lt;input type="checkbox" name="terms"&gt; I agree to privacy policy
&lt;button onclick="validateForm()"&gt;Submit&lt;/button&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;script&gt;
    function validateForm() {
        const terms = document.getElementsByName('terms');
        const message = document.getElementById('message');
        let allChecked = true;
        
        for (let i = 0; i &lt; terms.length; i++) {
            if (!terms[i].checked) {
                allChecked = false;
                break;
            }
        }
        
        message.textContent = allChecked ? 
            'Form valid!' : 'Please check all boxes!';
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have checkboxes that all need to be checked for form validation. The
validateForm function checks if all boxes are checked using
getElementsByName.

This demonstrates a practical use case for getElementsByName in form
validation scenarios where multiple related inputs need to be checked.

## Dynamic Element Creation

This example shows how to work with dynamically created elements.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Dynamic Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="addItem()"&gt;Add Item&lt;/button&gt;
&lt;button onclick="countItems()"&gt;Count Items&lt;/button&gt;
&lt;div id="container"&gt;&lt;/div&gt;

&lt;script&gt;
    let counter = 1;
    
    function addItem() {
        const container = document.getElementById('container');
        const newItem = document.createElement('div');
        newItem.name = 'dynamic-item';
        newItem.textContent = 'Item ' + counter++;
        container.appendChild(newItem);
    }
    
    function countItems() {
        const items = document.getElementsByName('dynamic-item');
        alert('Total items: ' + items.length);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we dynamically add elements with the same name and then count
them using getElementsByName. This shows how the live NodeList
works.

The NodeList updates automatically as new elements are added, demonstrating the
live nature of collections returned by getElementsByName.

## Source

[MDN getElementsByName Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName)

In this article, we have shown how to use document.getElementsByName
in JavaScript. This method is essential for working with groups of related
elements in web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).