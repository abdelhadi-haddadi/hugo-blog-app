+++
title = "JavaScript window.close"
date = 2025-08-29T19:53:38.694+01:00
draft = false
description = "Learn how to use JavaScript's window.close method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript window.close

last modified April 2, 2025

In this article, we explore the window.close method in
JavaScript. This method allows developers to programmatically close
browser windows or tabs.

## Basic Definition

The window.close method closes the current window or a window
that was opened by JavaScript. This method can only close windows that
were opened by scripts.

For security reasons, browsers restrict closing windows that weren't
created by JavaScript. The method has no effect on windows opened by
users directly.

## Basic window.close

This example demonstrates how to close the current window with a button.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic window.close&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="closeWindow()"&gt;Close Window&lt;/button&gt;

&lt;script&gt;
    function closeWindow() {
        window.close();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a button that triggers the
closeWindow function. The function calls
window.close() to attempt closing the current window.

Note that this will only work if the window was opened by JavaScript.
Most browsers will prevent closing windows opened directly by users.

## Closing a Newly Opened Window

This example shows how to open and then close a window programmatically.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Open and Close Window&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openNewWindow()"&gt;Open Window&lt;/button&gt;
&lt;button onclick="closeNewWindow()"&gt;Close Window&lt;/button&gt;

&lt;script&gt;
    let newWindow;

    function openNewWindow() {
        newWindow = window.open('', '_blank', 'width=400,height=300');
        newWindow.document.write('&lt;h1&gt;New Window&lt;/h1&gt;');
    }

    function closeNewWindow() {
        if (newWindow) {
            newWindow.close();
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we have two buttons - one to open a new window and another to close
it. The window.open method creates a new window, and we store
its reference in the newWindow variable.

The closeNewWindow function checks if the window exists and
then calls close() on the window reference. This will work
because we created the window with JavaScript.

## Closing Window After Delay

This example demonstrates closing a window automatically after a delay.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Delayed Window Close&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This window will close in 5 seconds&lt;/h1&gt;

&lt;script&gt;
    setTimeout(function() {
        window.close();
    }, 5000);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this example, we use setTimeout to schedule the window
closure after 5000 milliseconds (5 seconds). The anonymous function
calls window.close() when the timer expires.

This technique can be useful for temporary notification windows or
after completing specific tasks. Remember it only works for windows
opened by JavaScript.

## Closing Window with Confirmation

This example shows how to ask for confirmation before closing a window.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Confirm Window Close&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="tryCloseWindow()"&gt;Close Window&lt;/button&gt;

&lt;script&gt;
    function tryCloseWindow() {
        if (confirm('Are you sure you want to close this window?')) {
            window.close();
        }
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the confirm dialog to get user confirmation
before attempting to close the window. The confirm function
returns true if the user clicks OK.

This pattern provides a better user experience by preventing accidental
window closures. It's especially useful when the window contains
unsaved data.

## Closing Parent Window from Child

This example demonstrates closing the parent window from a child window.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Parent Window&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="openChildWindow()"&gt;Open Child Window&lt;/button&gt;

&lt;script&gt;
    function openChildWindow() {
        const child = window.open('child.html', '_blank', 'width=400,height=300');
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

child.html
    

```
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Child Window&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="closeParent()"&gt;Close Parent Window&lt;/button&gt;

&lt;script&gt;
    function closeParent() {
        if (window.opener &amp;&amp; !window.opener.closed) {
            window.opener.close();
        }
        window.close();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

```

In this example, the parent window opens a child window. The child window
has a button that attempts to close both itself and its parent.

The window.opener property references the window that opened
the current window. We check if it exists and isn't already closed before
calling close() on it.

## Source

[MDN window.close Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/close)

In this article, we have shown how to use window.close
in JavaScript. This method is useful for managing browser windows
in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).