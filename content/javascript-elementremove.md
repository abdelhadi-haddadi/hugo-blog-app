+++
title = "JavaScript element.remove()"
date = 2025-08-29T19:53:30.852+01:00
draft = false
description = "Learn how to use JavaScript's element.remove() method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript element.remove()

last modified April 2, 2025

In this article, we explore the element.remove() method in
JavaScript. This method is essential for DOM manipulation, allowing developers
to remove elements from the document tree completely.

## Basic Definition

The element.remove() method removes the element from the DOM it
belongs to. This is a modern and straightforward way to delete elements
compared to older methods like removeChild().

The method doesn't require any parameters and doesn't return any value. Once
called, the element is immediately removed from its parent node in the DOM.

## Basic element.remove()

This example demonstrates how to remove a simple div element from the DOM.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic element.remove()&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="content"&gt;This will be removed&lt;/div&gt;
&lt;button onclick="removeElement()"&gt;Remove Element&lt;/button&gt;

&lt;script&gt;
    function removeElement() {
        const element = document.getElementById('content');
        element.remove();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a div element with the ID "content" and a button.
When the button is clicked, the removeElement function is called.

The function retrieves the element using getElementById and then
calls remove() on it. The element is immediately removed from the
DOM when this method is called.

## Removing Multiple Elements

This example shows how to remove multiple elements with a single function call.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Removing Multiple Elements&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="item"&gt;Item 1&lt;/div&gt;
&lt;div class="item"&gt;Item 2&lt;/div&gt;
&lt;div class="item"&gt;Item 3&lt;/div&gt;
&lt;button onclick="removeItems()"&gt;Remove All Items&lt;/button&gt;

&lt;script&gt;
    function removeItems() {
        const items = document.querySelectorAll('.item');
        items.forEach(item =&gt; item.remove());
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have three div elements with the class "item" and a button. When the
button is clicked, the removeItems function is called.

The function uses querySelectorAll to get all elements with the
class "item", then iterates through them with forEach, calling
remove() on each one. This efficiently removes all matching
elements.

## Removing with Event Delegation

This example demonstrates removing elements using event delegation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Event Delegation Removal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul id="list"&gt;
    &lt;li&gt;Item 1 &lt;button class="remove-btn"&gt;X&lt;/button&gt;&lt;/li&gt;
    &lt;li&gt;Item 2 &lt;button class="remove-btn"&gt;X&lt;/button&gt;&lt;/li&gt;
    &lt;li&gt;Item 3 &lt;button class="remove-btn"&gt;X&lt;/button&gt;&lt;/li&gt;
&lt;/ul&gt;

&lt;script&gt;
    document.getElementById('list').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
        }
    });
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have a list with items that each have a remove button.
Instead of adding event listeners to each button, we use event delegation.

The event listener on the parent ul element checks if the clicked element has
the "remove-btn" class. If so, it removes the parent li element. This is more
efficient than adding listeners to each button individually.

## Removing with Animation

This example shows how to animate an element before removing it from the DOM.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Animated Removal&lt;/title&gt;
    &lt;style&gt;
        .box {
            width: 100px;
            height: 100px;
            background-color: red;
            transition: all 0.5s ease;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div id="animatedBox" class="box"&gt;&lt;/div&gt;
&lt;button onclick="fadeAndRemove()"&gt;Fade and Remove&lt;/button&gt;

&lt;script&gt;
    function fadeAndRemove() {
        const box = document.getElementById('animatedBox');
        box.style.opacity = '0';
        box.style.transform = 'scale(0)';
        
        box.addEventListener('transitionend', () =&gt; {
            box.remove();
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have a red box and a button. When the button is clicked, the box fades
out and shrinks before being removed from the DOM.

The fadeAndRemove function first applies CSS transitions to fade
and shrink the box. It then listens for the transitionend event
before removing the element, creating a smooth visual effect.

## Conditional Removal

This example demonstrates removing elements based on a specific condition.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Conditional Removal&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="message" data-priority="high"&gt;Important message&lt;/div&gt;
&lt;div class="message" data-priority="low"&gt;Regular message&lt;/div&gt;
&lt;div class="message" data-priority="high"&gt;Another important message&lt;/div&gt;
&lt;button onclick="removeLowPriority()"&gt;Remove Low Priority&lt;/button&gt;

&lt;script&gt;
    function removeLowPriority() {
        const messages = document.querySelectorAll('.message');
        messages.forEach(message =&gt; {
            if (message.dataset.priority === 'low') {
                message.remove();
            }
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we have several message divs with different priority levels.
The button triggers removal of only the low priority messages.

The function uses querySelectorAll to get all messages, then checks
each one's data-priority attribute. Only elements with "low"
priority are removed, demonstrating conditional element removal.

## Source

[MDN element.remove() Documentation](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)

In this article, we have shown how to use element.remove() in
JavaScript. This method provides a clean and efficient way to remove elements
from the DOM in modern web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).