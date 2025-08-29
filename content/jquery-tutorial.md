+++
title = "jQuery tutorial"
date = 2025-08-29T20:15:49.614+01:00
draft = false
description = "This tutorial introduces the jQuery library. We will present the jQuery library, show how to download and include jQuery, explain various jQuery selectors, show how to bind events, show various jQuery effects, an work with asynchronous events."
image = "images/document_source.png"
imageBig = "images/document_source.png"
categories = ["web"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# jQuery tutorial

last modified January 10, 2023

In this tutorial, we are going to learn the basics of jQuery. We will present the jQuery
library, show how to download and include jQuery, explain various jQuery selectors, show
how to bind events, show various jQuery effects, an work with asynchronous events.

When we want to create a website, we need to use specific technologies. HTML creates the structure
of a web page. CSS is responsible for the look of the web page. JavaScript brings dynamicity
to the web page.

HyperText Markup Language (HTML), Cascading Style Sheets (CSS), and JavaScript form a triad 
of cornerstone technologies for the World Wide Web. jQuery is an abstraction of JavaScript;
it makes the work with JavaScript much more easier.

## HTML Document

A website consists of multiple web pages. Each web page is an HTML document.
An HTML document is a textual document whose structure is defined by the
HyperText Markup Language. To create a document structure, we use HTML 
tags such as &lt;div&gt;, &lt;h2&gt;, 
or &lt;body&gt;. HTML documents have a .html or
.htm extension.

![document_source.png](images/document_source.png)

Figure: Source of a simple HTML document

Web browsers allow us to see the HTML source of each of the HTML documents.
A HTML document consists of two parts: head and body. HTML elements are 
organized in a hierarchical structure — HTML tags have their parents, children,
and siblings.

## Document Object Model (DOM)

The Document Object Model (DOM) is a programming interface for HTML documents.
It defines functions for manipulating the document structure, style, and content. 
The DOM represents an HTML document as a tree structure of nodes, wherein each
node is an object representing a part of the document. The nodes are objects
that have properties and methods. These entities can be accessed via JavaScript
and its libraries such as jQuery.

## jQuery

jQuery is a JavaScript library which is used to manipulate DOM.
With jQuery, we can find, select, traverse, and manipulate parts of 
a HTML document. These parts are also called DOM elements.
jQuery is the most popular JavaScript library in use today. It is estimated that
it is used on two-thirds of the top 10 million websites. jQuery was originally
created by John Resig. jQuery is free, open-source software 
licensed under the MIT License.

The principles of developing with jQuery are:

    - Separation of JavaScript and HTML.

    - Brevity and clarity.

    - Elimination of cross-browser incompatibilities.

    - Extensibility.

## Choosing jQuery Library

jQuery library is essentially a small file. In order to use jQuery in our 
projects, we either dowload the file from the project's 
[website](https://jquery.com/download/) or use a 
Content Delivery Network (CDN).

There are several options to choose from. Firstly, there are multiple versions
of jQuery available. The version of the library is mentioned in the name of
the file. There are currently three version branches: 1.x, 2.x, and 3.x. 
For educational purposes, it is best to choose the most recent version of
jQuery library. Then we need to choose between the production and development
version of the library. The production version is compressed and has a 
min word in the name of the library. The compressed or *minified*
versions have their size reduced but otherwise provide the same functionality.
The development versions are human-readable with comments.

jquery-3.1.1.js
jquery-3.1.1.min.js

The first file is a development version of jQuery library version 3.1.1. The 
second file is a production version of jQuery library version 3.1.1.

In addition, there are so called slim versions of the library. The slim versions
have a slim word in the name of the library. They exclude
AJAX functionality, effects, and currently deprecated code.

jquery-3.1.1.slim.js
jquery-3.1.1.slim.min.js

The first file is a slim, development version of jQuery library version 3.1.1.
The second file is a slim, production version of jQuery library version 3.1.1.

In this tutorial, are are going to use a minified version of jQuery 3.1.1.

## Including jQuery in HTML Document

jQuery library can be included in a document by linking to a local copy or to one of 
the versions available from public servers. To include the jQuery library, we use
the &lt;script&gt; tag. The file is included in the head of the document,
or at the bottom, usually before the &lt;/body&gt; tag.

&lt;script src="jquery-3.1.1.min.js"&gt;&lt;/script&gt;

In this case, we include a local copy of the jQuery library.

&lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;  

Here, we include the library from a publicly available repository on code.jquery.com.

There are several well-known public repositories for jQuery; these repositories are also
known as Content Delivery Networks (CDNs). Using CDNs can bring some performance 
benefits.

&lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt; 
&lt;script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.1.1.min.js"&gt;&lt;/script&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"&gt;&lt;/script&gt; 

Here we have jQuery, Google, and Microsoft CDNs.

## Choosing a Text Editor

A good text editor will help us write code efficiently. Text editors
provide syntax highlighting, code completion, automatic indentation and
much more. Text editors that support jQuery include Brackets, Sublime Text, 
Kwrite, Gedit, Notepad++, PSPad, or TextMate.

![brackets.png](images/brackets.png)

Figure: Brackets text editor

The above figure shows a small HTML document utilizing jQuery
in a Brackets text editor. Brackets is a modern text editor for
web development. It is written in JavaScript. It was specifically 
created for web designers and front-end developers.

## When the Document is Ready

When the document is ready, that is, its DOM has been built and
it is safe to manipulate it, jQuery triggers a $(document).ready event. 
We put our jQuery code in the handler of this event.

$(document).ready(function() {
    // jQuery code
});

$(function() { 
    // jQuery code 
});

These are document ready event handlers; both are equivalent. The second one
is the recommended way to create a jQuery document ready event handler.

simple.html
  

&lt;html&gt;
   &lt;head&gt;
      &lt;title&gt;jQuery simple example&lt;/title&gt;         
      &lt;meta charset="utf-8"&gt;  
      &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;          
   &lt;/head&gt;
        
   &lt;body&gt;
       &lt;h2&gt;Simple example&lt;/h2&gt;
       
      &lt;script&gt;
         $(function() { 
             $('body').append("&lt;div&gt;Simple jQuery example&lt;/div&gt;");
         });
      &lt;/script&gt;        
   &lt;/body&gt;
        
&lt;/html&gt;

The example appends a &lt;div&gt; tag at the end of the &lt;body&gt; tag.

$('body').append("&lt;div&gt;Simple jQuery example&lt;/div&gt;");

The $('body') selects the &lt;body&gt; tag in the document.
The append method appends a &lt;div&gt; tag at the end of
the &lt;body&gt; tag.

## Testing and debugging

Browsers contain tools for developers to do testing and debugging. 
The developer console is started with Ctrl + Shift + I
in Opera, Firefox, and Chrome.

![developer_console.png](images/developer_console.png)

Figure: Developer console

In the console window, we can see error messages, output from the console.log method;
it can be used for evaluating JavaScript statements, inspecting and logging objects and properties.
In the above figure, we can see the output of the jQuery html method, which gets the HTML code
of the &lt;body&gt; element. The output is shown in the console window.

&lt;script&gt;
    $(function() { 
        console.log('Document is ready');
    });
&lt;/script&gt;  

The console.log method can be used for debugging output.

![debugger_syntax_error.png](images/debugger_syntax_error.png)

Figure: Syntax error

In the above picture we can see a jQuery syntax error being caught and shown on the developer console window.

## jQuery selectors

jQuery selectors are used to select elements in an HTML document that meet certain criteria. 
The criteria can be their name, id, class name, attributes or a combination of them.

The following is a partial list of available selectors:

    - $("*") — selects all elements

    - $("#first") — selects the element with id="first"

    - $(".intro") — selects all elements with class="intro"

    - $("div") — selects all &lt;div&gt; elements

    - $("h2, div, p") — selects all &lt;h2&gt;, &lt;div&gt;, &lt;p&gt; elements

    - $("li:first") — selects the first &lt;li&gt; element

    - $("li:last") — selects the last &lt;li&gt; element

    - $("li:even") — selects all even &lt;li&gt; elements

    - $("li:odd") — selects all odd &lt;li&gt; elements

    - $(":empty") — selects all elements that are empty

    - $(":focus") — selects the element that currently has focus

In the following example, we are going to work with the :root 
selector, which selects the &lt;html&gt; tag.

root_selector.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
   &lt;head&gt;
      &lt;title&gt;jQuery root selector example&lt;/title&gt;
      &lt;meta charset="utf-8"&gt;        
      &lt;style&gt;          
           .mycol { background-color: gray; border: 1px solid gray }
      &lt;/style&gt;      
         
      &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
  
   &lt;/head&gt;
        
   &lt;body&gt;      
      &lt;p&gt;
          A paragraph.
      &lt;/p&gt;
      
      &lt;script&gt;
         $(function() { 
         
             $(":root").addClass("mycol");
           
         });
      &lt;/script&gt;       
   &lt;/body&gt;
        
&lt;/html&gt;

In the example, the background of the document is changed to gray colour.

$(":root").addClass("mycol");

With the :root selector, we select the root element of the document 
and add a class to it with the addClass method.

selecting_elements.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery selecting elements&lt;/title&gt;
        &lt;meta charset="utf-8"&gt;         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
  
    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;p&gt;Operating systems:&lt;/p&gt;
        
        &lt;ul id="mylist" style="width:150px"&gt;
            &lt;li&gt;Solaris&lt;/li&gt;
            &lt;li&gt;FreeBSD&lt;/li&gt;
            &lt;li&gt;Debian&lt;/li&gt;                      
            &lt;li&gt;NetBSD&lt;/li&gt;           
            &lt;li&gt;Windows&lt;/li&gt;         
            &lt;li&gt;Mac OS X&lt;/li&gt;
        &lt;/ul&gt;
   
        &lt;script&gt;
            $(function() {
    
                $("#mylist").css("border", "1px dashed gray"); 
                $("li:odd").css("color", "blue"); 
            });
        &lt;/script&gt;
    &lt;/body&gt;
        
&lt;/html&gt;

In this example, we have a list of operating systems. The list has a blue
dotted border and its every odd element has a gray background.

$("#mylist").css("border", "1px dotted blue"); 

The $("#mylist") selector selects a tag with id equal to "mylist". 
With the css method, we modify the look of the tag.

$("li:odd").css("background-color", "gray"); 

With the $("li:odd") selector, we select all odd &lt;li&gt; tags
and later modify them with the css method.

![selecting_elements.png](images/selecting_elements.png)

Figure: Selecting document elements

In the figure, we can see a dashed border around the list and a blue text colour of 
every second list element.

## Chaining methods

jQuery allows to chain method calls. A chain of methods is a consecutive
sequence of jQuery method calls on a jQuery object.

chaining.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery chaining methods&lt;/title&gt;
        &lt;meta charset="utf-8"&gt;                   
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
     
        &lt;style&gt;
            .mypanel { width:150px; height:100px; background-color:blue }
        &lt;/style&gt;
  
    &lt;/head&gt;
        
    &lt;body&gt;
        &lt;div class="mypanel"&gt;&lt;/div&gt;
   
        &lt;script&gt;
            $(function() { 
                $(".mypanel").hide(1500).show(1500).hide(1500).show(1500);
            });
        &lt;/script&gt;    
    &lt;/body&gt;    
&lt;/html&gt;

In the example, we have a panel which is shown and hidden twice.
A panel is shown with the show method and hidden
with the hide method.

$(".mypanel").hide(1500).show(1500).hide(1500).show(1500) 

Here we see a chain of four method calls. Each of the calls returns
a jQuery object on which we can call another method.

## Getting and setting content

The text method gets the combined text contents of each 
element in the set of matched elements, including their descendants, 
or sets the text contents of the matched elements.

getting_setting_content.html
  

&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery getting, setting elements&lt;/title&gt;       
        &lt;meta charset="utf-8"&gt;               
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;          
    &lt;/head&gt;
        
    &lt;body&gt;
        &lt;h2&gt;Red car&lt;/h2&gt;
       
        &lt;h3&gt;&lt;/h3&gt;
       
        &lt;script&gt;
            $(function() { 
                var cont = $("h2").text();
                $("h3").text(cont);
            });
        &lt;/script&gt;        
   &lt;/body&gt;
&lt;/html&gt;

In the example, we get the content of the &lt;h2&gt; tag and
set it to the &lt;h3&gt; tag; in other words, we copy the content
from the first element to the second.

var cont = $("h2").text();

With the text method, we get the content of the 
&lt;h2&gt; tag.

$("h3").text(cont);

In this line, we set the previously retrieved content to the
&lt;h3&gt; tag.

## Binding events

The on method plugs an event handler function for one 
or more events to the currently selected set of elements. An event
handler is triggered when an even, such as button click, is launched.

event_binding.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery event binding example&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;   
      
        &lt;style&gt;
            .mypanel { width:150px; height:100px; background-color:maroon }
        &lt;/style&gt;      

    &lt;/head&gt;
        
    &lt;body&gt;      
   
        &lt;button id="btn"&gt;Toggle&lt;/button&gt;
        &lt;br&gt;
        &lt;br&gt;
      
        &lt;div class="mypanel"&gt;&lt;/div&gt;
      
        &lt;script&gt;
             $(function() { 
         
                 $("#btn").on('click', function() {
             
                     $(".mypanel").slideToggle(2000);
                 });
             });
        &lt;/script&gt;    
    &lt;/body&gt;
&lt;/html&gt;

In the example, we bind an event handler to a click event 
on a button element.

&lt;button id="btn"&gt;Toggle&lt;/button&gt;

This is the button that will trigger click events.

&lt;script&gt;
    $(function() { 
    
        $("#btn").on('click', function() {
        
            $(".mypanel").slideToggle(2000);
        });
    });
&lt;/script&gt;

We register a click event for the button element. The event
triggers a function which calls slideToggle method on
a &lt;div&gt; element. The slideToggle method
displays or hides the matched elements with a sliding motion.

## Mousemove events

A mouse move event is triggered when a mouse pointer moves over a document area.
The event handler function receives an event object, which contains data related
to the event type. In our case, it will contain x and y coordinates of the mouse
pointer.

mouse_move_event.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery mousemove event&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;   
      
        &lt;style&gt;
            .mypanel { width:250px; height:200px; background-color:maroon }
        &lt;/style&gt;      

    &lt;/head&gt;
        
    &lt;body&gt;      
   
        &lt;div class="mypanel"&gt;&lt;/div&gt;
      
        &lt;br&gt;
        &lt;div id="log"&gt;&lt;/div&gt;
      
        &lt;script&gt;
             $(function() { 
         
                 $(".mypanel").mousemove(function(e) {
             
                     var msg = "x: " + e.pageX + " y: " + e.pageY;  
             
                     $("#log").text(msg);
                 });
             });
        &lt;/script&gt;    
    &lt;/body&gt;
&lt;/html&gt;

The example shows the x and y coordinates of a mouse pointer if we
position it over the area of a &lt;div&gt; element.

&lt;div class="mypanel"&gt;&lt;/div&gt;

We will listen for mouse move events over the area of this element.

&lt;div id="log"&gt;&lt;/div&gt;

The coordinates will be displayed in this logging &lt;div&gt; element.

$(".mypanel").mousemove(function(e) {

    var msg = "x: " + e.pageX + " y: " + e.pageY;  

    $("#log").text(msg);
});

We bind an event handler to the mouse move event. Inside the event handler, 
we determine the x and y coordinates with the pageX and pageY
properties and update the logging element with the text method.
The mousemove method is a shortcut for the on("mousemove", handler) method.

![mouse_move_event.png](images/mouse_move_event.png)

Figure: Mouse move event

## Event source

An event source is the element that triggered an event. Inside the event handler, 
we can refer to the event source with the $(this) syntax.

event_source.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery event source example&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;   
      
        &lt;style&gt;
            .mybtn { }
        &lt;/style&gt;      

    &lt;/head&gt;
        
    &lt;body&gt;      
   
        &lt;button class="mybtn"&gt;Button 1&lt;/button&gt;
        &lt;button class="mybtn"&gt;Button 2&lt;/button&gt;
        &lt;button class="mybtn"&gt;Button 3&lt;/button&gt;
        &lt;br&gt;
        &lt;br&gt;
      
        &lt;div class="messages"&gt;&lt;/div&gt;
      
        &lt;script&gt;
            $(function() { 
         
                $(".mybtn").on('click', function() {
             
                    var btn_lbl = $(this).text();
             
                    $(".messages").text(btn_lbl + " clicked");
                });
            });
        &lt;/script&gt;    
    &lt;/body&gt;   
&lt;/html&gt;

In the example, we have three buttons. Each of the buttons is 
has the same event handler. When we click on a button, a message
is shown; it tells which button was clicked.

&lt;button class="mybtn"&gt;Button 1&lt;/button&gt;
&lt;button class="mybtn"&gt;Button 2&lt;/button&gt;
&lt;button class="mybtn"&gt;Button 3&lt;/button&gt;

These three buttons have the same event handler.

&lt;script&gt;
    $(function() { 
    
        $(".mybtn").on('click', function() {
        
            var btn_lbl = $(this).text();
        
            $(".messages").text(btn_lbl + " clicked");
        });
    });
&lt;/script&gt; 

A class selector $(".mybtn") chooses all the three buttons.
We attach a click event handler to the buttons. We refer to the event
source with the $(this) construct and determine its label
with the text method. The name of the button is used to 
build a message, which is displayed in the &lt;div&gt; element
below.

![event_source.png](images/event_source.png)

Figure: Event source

In the figure, we can see which button was clicked in the message
shown below the buttons.

## Removing elements

The remove method removes the set of matched elements from the DOM.

remove_element.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery removing element&lt;/title&gt;
            
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
        
        &lt;style&gt;
        
            div { display: flex; align-items: center; justify-content: center; 
                  width:150px; height:80px; margin:3px; border: 1px solid gray 
            }
        
        &lt;/style&gt;

    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;button id="btnf"&gt;Remove first&lt;/button&gt;
        &lt;button id="btnl"&gt;Remove last&lt;/button&gt;     

        &lt;div&gt;Panel 1&lt;/div&gt;
        &lt;div&gt;Panel 2&lt;/div&gt;
        &lt;div&gt;Panel 3&lt;/div&gt;
        &lt;div&gt;Panel 4&lt;/div&gt;
        &lt;div&gt;Panel 5&lt;/div&gt;
        &lt;div&gt;Panel 6&lt;/div&gt;
     
        &lt;script&gt;
            $(function() { 
            
                $('#btnf').click(function() {
        
                    $('div:first').remove();
                });
                
                $('#btnl').click(function() {
        
                    $('div:last').remove();            
                });            
                
            });
        &lt;/script&gt;    
    &lt;/body&gt;        
&lt;/html&gt;

In the example, we have two buttons and six panels. The first button removes the first
panel and the second button the last panel.

$('#btnf').click(function() {

    $('div:first').remove();
});

The div:first selector selects the first &lt;div&gt; 
element and the remove method removes it from the DOM.

## jQuery is() method

The is method checks the current matched set of elements against a selector, 
element, or jQuery object and returns true if at least one of these elements 
matches the given arguments.

condition.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;First jQuery example&lt;/title&gt;
            
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;
        
        &lt;style&gt;
            div { display: flex; align-items: center; text-align: center; width:150px;
                    height:100px; margin:3px; border: 1px solid gray }
        &lt;/style&gt;

    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;div id="pnl1"&gt;Panel 1&lt;/div&gt;

        &lt;div id="pnl2"&gt;Panel 2&lt;/div&gt;

        &lt;div id="pnl3"&gt;Panel 3&lt;/div&gt;

        &lt;div id="pnl4"&gt;Panel 4&lt;/div&gt;      
   
        &lt;script&gt;
            $(function() { $("div").on('click', function() {
            
                    if ($(this).is('#pnl3')) {
                        console.log("Cannot hide panel 3");
                    } else {
                        $(this).hide(2000);
                    }
                });
            });
        &lt;/script&gt;    

    &lt;/body&gt;
&lt;/html&gt;

In the example, we have four panels. Clicking on the panel the panel
starts to vanish. The third panel does not vanish.

&lt;script&gt;
    $(function() { $("div").on('click', function() {
    
            if ($(this).is('#pnl3')) {
                console.log("Cannot hide panel 3");
            } else {
                $(this).hide(2000);
            }
        });
    });
&lt;/script&gt;    

The $(this) syntax refers to the event source, that is, the panel
on which we have clicked. 
With the is method we check if the element is Panel 3;
in case it is Panel 3, we print a message to the console and do 
not hide it. Other panels are hidden with the hide method.

## Effects

In this section, we are going to show some basic jQuery effects.

### jQuery sliding effect

The slideUp method displays the matched elements with a sliding
motion upward and the slideDown method with a sliding down
motion. The first parameter of the methods is duration; it is a string 
or a number determining how long the animation will run. The string can
be either 'slow' or 'fast'; the default value is 400 ms.

sliding.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery sliding example&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
     
        &lt;style&gt;
            .mypanel { width:150px; margin-top:10px; 
                height:100px; background-color:maroon }
        &lt;/style&gt;
  
    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;button id="btnSlideUp"&gt;Slide up&lt;/button&gt;
        &lt;button id="btnSlideDown"&gt;Slide down&lt;/button&gt;
      
        &lt;div class="mypanel"&gt;&lt;/div&gt;
   
        &lt;script&gt;
            $(function() { 
            
                $('#btnSlideUp').click(function() {
        
                    $('.mypanel').slideUp('show');
                });
                
                $('#btnSlideDown').click(function() {
        
                    $('.mypanel').slideDown('show');
                });
            });            
        &lt;/script&gt;    
    &lt;/body&gt;    
&lt;/html&gt;

In the example we have two button. One button will slide up
a panel and the other one will slide down the panel.

$('#btnSlideUp').click(function() {

    $('.mypanel').slideUp('show');
});

The slideUp method animates the chosen element
in a sliding up motion; the element disappears from the window..

$('#btnSlideDown').click(function() {

    $('.mypanel').slideDown('show');
});

The slideDown method animates the element
in a sliding down motion, the element appears on the window.

### The animate() method

The animate method performs a custom animation on a set 
of CSS properties. The first parameter of the method is called properties;
it is an object of CSS properties and values that the animation 
will move toward. The second parameter is duration. 

animation.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery animation example&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
     
        &lt;style&gt;
              .mypanel { position: relative; width:150px; margin-top:10px; 
                  height:100px; background-color:maroon }
        &lt;/style&gt;
  
    &lt;/head&gt;
        
    &lt;body&gt;
        &lt;button id="leftBtn"&gt;«&lt;/button&gt;
        &lt;button id="rightBtn"&gt;»&lt;/button&gt;
      
        &lt;div class="mypanel"&gt;&lt;/div&gt;
   
        &lt;script&gt;
            $(function() { 
            
                $("#rightBtn").click(function() {
                    $(".mypanel").animate({ "left": "+=250px" }, "slow" );
                });
                
                $( "#leftBtn" ).click(function(){
                    $(".mypanel").animate({ "left": "-=250px" }, "slow" );
                });
            });            
        &lt;/script&gt;    
    &lt;/body&gt;        
&lt;/html&gt;

In the example we have two buttons. The first button moves the panel to the left
and the second moves it to the right.

$("#rightBtn").click(function() {
    $(".mypanel").animate({ "left": "+=250px" }, "slow" );
});

This moves the panel slowly to the left by 250 px.

$( "#leftBtn" ).click(function(){
    $(".mypanel").animate({ "left": "-=250px" }, "slow" );
});

This moves the panel slowly to the right by 250 px.

### jQuery fading effects

The fadeIn method displays the matched elements 
by fading them to opaque. The fadeOut method 
hides the matched elements by fading them to transparent.

fading.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery fading example&lt;/title&gt;
         
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;         
     
        &lt;style&gt;
            .mypanel { width:150px; margin-top:10px; 
                height:100px; background-color:maroon }
        &lt;/style&gt;
  
    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;button id="fadeOutBtn"&gt;Fade out&lt;/button&gt;
        &lt;button id="fadeInBtn"&gt;Fade in&lt;/button&gt;
      
        &lt;div class="mypanel"&gt;&lt;/div&gt;
   
        &lt;script&gt;
            $(function() { 
            
                $('#fadeOutBtn').click(function() {
        
                    $('.mypanel').fadeOut('slow');
                });
                
                $('#fadeInBtn').click(function() {
        
                    $('.mypanel').fadeIn('slow');
                });
            });            
        &lt;/script&gt;    
    &lt;/body&gt;    
&lt;/html&gt;

In the example we have two buttons. One button fades in a panel; the second
button fades out the panel.

$('#fadeOutBtn').click(function() {

    $('.mypanel').fadeOut('slow');
});

This function fades out the matched element with the fadeOut 
method.

$('#fadeInBtn').click(function() {

    $('.mypanel').fadeIn('slow');
});

This function fades in the matched element with the fadeIn 
method.

## jQuery $.get() method

The $.get method requests data from a server with an 
HTTP GET request. The request is an asynchronous GET request.

In this section, we create a Java web application. 
Clicking on a button an AJAX GET request is sent to a Java servlet,
which responds with a message.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery GET message&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;button id="btn"&gt;Get message&lt;/button&gt;
        &lt;span id="log"&gt;&lt;/span&gt;

        &lt;script&gt;
            $(function () {
                $("#btn").click(function () {

                    $.get("MyServlet", function (data) {
                        $("#log").text(data);
                    });
                });
            });
        &lt;/script&gt;          
    &lt;/body&gt;
&lt;/html&gt;

We have a button which sends an asynchronous GET request upon being clicked.

$(function () {
    $("#btn").click(function () {

        $.get("MyServlet", function (data) {
            $("#log").text(data);
        });
    });
});

The first parameter of the $.get method is a URL string to 
which the request is sent. The second parameter is a callback function which 
is executed if the request succeeds. Inside the callback function, we set 
the returned data to the logging element.

MyServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/plain;charset=UTF-8");
        
        try (PrintWriter out = response.getWriter()) {
            
            Date date = new Date();
            out.printf("Message from MyServlet: %s", date);
        }        
    }
}

This is a Java servlet that responds with a message. The message contains the 
current date.

![jquery_get.png](images/jquery_get.png)

Figure: jQuery asynchronous GET request

Clicking on a button a message is shown in the logging element next to the button.

## jQuery when() method

The jQuery when method executes callback functions having 
asynchronous events.

showing_hiding.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;jQuery showing/hiding elements&lt;/title&gt;
        &lt;meta charset="utf-8"&gt;                  
        &lt;script src="https://code.jquery.com/jquery-3.1.1.min.js"&gt;&lt;/script&gt;

        &lt;style&gt;
            div { display:flex; align-items:center; text-align:center; width:150px;
                    height:100px; margin:3px; border: 1px solid gray }
        &lt;/style&gt;

    &lt;/head&gt;
        
    &lt;body&gt;
   
        &lt;button id="btn1"&gt;Hide all&lt;/button&gt;

        &lt;div id="pnl1"&gt;Panel 1&lt;/div&gt;
        &lt;div id="pnl2"&gt;Panel 2&lt;/div&gt;
        &lt;div id="pnl3"&gt;Panel 3&lt;/div&gt;
        &lt;div id="pnl4"&gt;Panel 4&lt;/div&gt;   
    
        &lt;script&gt;
            $(function() { $("#btn1").click(function() {
            
                    var task = $("div").toggle(3000);
                    
                    $.when(task).done(function() {
                        if ($("#btn1").text().match("^Hide")) {
                            $("#btn1").text("Show all");
                        } else {
                            $("#btn1").text("Hide all");
                        }
                    });
                });
            });
        &lt;/script&gt;    
    &lt;/body&gt;    
&lt;/html&gt;

In the example, we have a button to hide/show all four panels. 
The process of hiding/showing elements takes up some time. When 
the task is over, the label of the button changes accordingly:
from Hide all to Show all and vice versa.

var task = $("div").toggle(3000);

A new task is created; it will take 3 s to complete.
The toggle method displays or hides the matched elements.

$.when(task).done(function() {

The function is called when the tasked has finished.

if ($("#btn1").text().match("^Hide")) {
    $("#btn1").text("Show all");
} else {
    $("#btn1").text("Hide all");
}

Now, using a regular expression, we change the label of the button.

In this tutorial, we have worked with the jQuery library.

You might also be interested in the following related tutorials: 
[jQuery Autocomplete tutorial](/articles/jqueryautocomplete/),
[Cheerio tutorial](/javascript/cheerio/),
[Using jQuery DatePicker](/articles/jquerydatepicker/), and
[Pyquery tutorial](/python/pyquery/).