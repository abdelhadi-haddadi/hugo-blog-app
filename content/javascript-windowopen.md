+++
title = "JavaScript window.open"
date = 2025-08-29T19:53:39.808+01:00
draft = false
description = "Learn how to use JavaScript's window.open method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.open

last modified April 2, 2025

In this article, we explore the window.open method in JavaScript.
This method allows developers to open new browser windows or tabs programmatically.
It's commonly used for popups, external links, and multi-window applications.

## Basic Definition

The window.open method creates a new browser window or tab. It takes
three parameters: URL, window name, and window features. The URL specifies the
page to load, while the name can target specific windows.

Window features control the appearance of the new window. These include size,
toolbars, and scrollbars. Modern browsers often restrict popup windows due to
user experience concerns and security reasons.

## Basic window.open

This example demonstrates the simplest way to open a new browser window.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic window.open&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openWindow()"&gt;Open Window&lt;/button&gt;

&lt;script&gt;
    function openWindow() {
        window.open('https://www.example.com');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code creates a button that opens example.com in a new tab when clicked. The
window.open method is called with just the URL parameter. Most
modern browsers will open this in a new tab rather than a popup window.

The behavior depends on browser settings and user preferences. Some browsers may
block popups by default, requiring user permission. This is a basic example
without any window customization.

## Opening with Window Features

This example shows how to customize the new window's appearance and behavior.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Window with Features&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openCustomWindow()"&gt;Open Custom Window&lt;/button&gt;

&lt;script&gt;
    function openCustomWindow() {
        const features = 'width=600,height=400,menubar=no,toolbar=no';
        window.open('about:blank', 'myWindow', features);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we specify window dimensions (600x400 pixels) and disable the menu and
toolbars. The second parameter names the window 'myWindow', which can be used
for targeting. The URL 'about:blank' opens an empty page.

Window features are specified as a comma-separated string. Common features
include width, height, scrollbars, and resizable. Note that many features are
ignored in modern browsers due to security restrictions.

## Controlling the Opened Window

This example demonstrates how to interact with the newly opened window.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Controlling Window&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openAndControl()"&gt;Open and Control&lt;/button&gt;

&lt;script&gt;
    function openAndControl() {
        const newWindow = window.open('', 'myWindow', 'width=400,height=300');
        
        newWindow.document.write('&lt;h1&gt;Hello from parent!&lt;/h1&gt;');
        newWindow.document.close();
        
        setTimeout(() =&gt; {
            newWindow.close();
        }, 3000);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code opens a window, writes content to it, then closes it after 3 seconds.
The window.open returns a reference to the new window object. This
reference allows manipulation of the new window.

We use document.write to add content and close to
programmatically close the window. Note that many browsers restrict cross-origin
window control for security reasons.

## Opening with Target

This example shows how to use the window name parameter for targeting.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Window Targeting&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openInSameWindow()"&gt;Open in Same Window&lt;/button&gt;
&lt;button onclick="openInNewWindow()"&gt;Open in New Window&lt;/button&gt;

&lt;script&gt;
    function openInSameWindow() {
        window.open('page1.html', 'myTargetWindow');
    }
    
    function openInNewWindow() {
        window.open('page2.html', '_blank');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

The first button opens content in a named target window ('myTargetWindow').
Subsequent calls with the same name will reuse that window. The second button
uses '_blank' to always open in a new window/tab.

Target names follow the same rules as HTML target attributes. Special values
include '_blank', '_self', '_parent', and '_top'. This targeting mechanism is
useful for single-page applications.

## Popup with Communication

This advanced example demonstrates communication between windows.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Window Communication&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openPopup()"&gt;Open Popup&lt;/button&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;script&gt;
    let popupWindow;
    
    function openPopup() {
        popupWindow = window.open('', 'popup', 'width=300,height=200');
        popupWindow.document.write(`
            &lt;h2&gt;Child Window&lt;/h2&gt;
            &lt;button onclick="window.opener.postMessage('Hello parent!', '*')"&gt;
                Send Message
            &lt;/button&gt;
        `);
        
        window.addEventListener('message', (event) =&gt; {
            document.getElementById('message').textContent = 
                `Received: ${event.data}`;
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This creates a parent-child window relationship. The child window can send
messages to the parent using postMessage. The parent listens for
messages with addEventListener.

The postMessage API is the modern, secure way for windows to
communicate. It works across origins when properly configured. Always validate
message origins in production code for security.

## Source

[MDN window.open Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)

In this article, we have explored the window.open method in
JavaScript. This powerful feature enables multi-window applications but should
be used judiciously due to browser restrictions and user experience concerns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).