+++
title = "Element.classList tutorial"
date = 2025-08-29T19:53:06.135+01:00
draft = false
description = "Element.classList tutorial shows how to read and write attribute classes of an element with classList property in JavaScript."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Element.classList tutorial

last modified August 24, 2023

Element.classList tutorial shows how to read and write attribute classes of an
element with classList property in JavaScript.

## Element.classList

Element.classList is a read-only property that returns a collection
of the class attributes of an element. It is a convenient alternative to
accessing an element's list of classes as a space-delimited string via 
element.className.

To insert the HTML into the document rather than replace the
contents of an element, we use the insertAdjacentHTML method.

## Element.classList example

The following example demonstrates the usage of the elements's classList property.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Element.classList&lt;/title&gt;

    &lt;link rel="stylesheet" href="main.css"&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"&gt;&lt;/script&gt;
    
&lt;/head&gt;
&lt;body&gt;

&lt;div id="mydiv" class="initial"&gt;
&lt;/div&gt;

&lt;button id="pck"&gt;Pick&lt;/button&gt;

&lt;script src="main.js"&gt;&lt;/script&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In the document, we have a div element with a default initial class. 
The Pick button picks randomly another class and puts it into div's list of classes.
It also outputs the current classes of the div.

&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"&gt;&lt;/script&gt;

We include the Lodash library. 

main.css
  

.initial { width: 200px; height: 100px; margin: 10px; padding:5px; border: 1px solid seagreen}
.steelblue { background-color: steelblue }
.lime { background-color: lime }
.olive { background-color: olive }
.sienna { background-color: sienna }
.silver { background-color: silver }
.skyblue { background-color: hsl(197, 71%, 73%) }
.teal { background-color: teal }
.khaki { background-color: khaki }

This is the main.css. We have some background styles which we 
add or remove from the div.

main.js
  

const classes = ['steelblue', 'lime', 'olive', 'sienna', 
    'silver', 'skyblue', 'teal', 'khaki'];

let btnPck = document.getElementById('pck');
let btnLst = document.getElementById('lst');
let myDiv = document.getElementById('mydiv');

btnPck.addEventListener('click', () =&gt; {

    const active = myDiv.classList;
    
    active.forEach(col =&gt; {
        if (_.includes(classes, col)) {
            myDiv.classList.remove(col);
        }
    })

    myDiv.classList.add(_.sample(classes));
    myDiv.innerHTML = myDiv.classList;
});

Clicking on the button we apply a random style to the div element.

const classes = ['steelblue', 'lime', 'olive', 'sienna', 
    'silver', 'skyblue', 'teal', 'khaki'];

We have a list of styles.

const active = myDiv.classList;

We determine the active classes with classList property.

active.forEach(col =&gt; {
    if (_.includes(classes, col)) {
        myDiv.classList.remove(col);
    }
})

We go throught the list of active classes and remove any class that is not 
initial before adding a new one.

myDiv.classList.add(_.sample(classes));

We add a random class to the class list. We use Lodash's _.sample
function to pick a random element.

myDiv.innerHTML = myDiv.classList;

The active classes are displayed in the div element.

In this article we have worked with the element's classList property.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.