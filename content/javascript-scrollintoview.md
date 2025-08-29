+++
title = "JavaScript scrollIntoView"
date = 2025-08-29T19:53:33.066+01:00
draft = false
description = "Learn how to use JavaScript's scrollIntoView method effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["dom"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript scrollIntoView

last modified April 2, 2025

In this article, we explore the element.scrollIntoView method in
JavaScript. This method is essential for creating smooth scrolling effects and
navigating to specific elements on a webpage.

## Basic Definition

The scrollIntoView method scrolls the element's parent container
so the element becomes visible to the user. It's commonly used for navigation,
form validation, and creating smooth scrolling effects.

This method accepts an optional parameter that can control the alignment and
smoothness of the scroll. By default, it aligns the element to the top of the
visible area and performs an instant scroll.

## Basic scrollIntoView

This example demonstrates the simplest way to use scrollIntoView to scroll to
an element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Basic scrollIntoView&lt;/title&gt;
    &lt;style&gt;
        #target {
            margin-top: 1000px;
            background: lightblue;
            padding: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="scrollToElement()"&gt;Scroll to Element&lt;/button&gt;
&lt;div id="target"&gt;Target Element&lt;/div&gt;

&lt;script&gt;
    function scrollToElement() {
        const element = document.getElementById('target');
        element.scrollIntoView();
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this basic example, we have a button and a target element positioned far down
the page. When the button is clicked, the target element is scrolled into view.

The default behavior aligns the element to the top of the viewport. This is the
simplest way to implement scrolling to a specific element on a page.

## Smooth Scrolling

This example shows how to enable smooth scrolling behavior with scrollIntoView.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Smooth Scrolling&lt;/title&gt;
    &lt;style&gt;
        #smoothTarget {
            margin-top: 1500px;
            background: lightgreen;
            padding: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="smoothScroll()"&gt;Smooth Scroll&lt;/button&gt;
&lt;div id="smoothTarget"&gt;Smooth Target&lt;/div&gt;

&lt;script&gt;
    function smoothScroll() {
        const element = document.getElementById('smoothTarget');
        element.scrollIntoView({ behavior: 'smooth' });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Here we use the options parameter with behavior: 'smooth' to create
a smooth scrolling animation. This provides a more pleasant user experience.

The smooth behavior is supported in most modern browsers. For older browsers,
you might need to use a polyfill or alternative scrolling solution.

## Alignment Options

This example demonstrates how to control the alignment of the scrolled element.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Alignment Options&lt;/title&gt;
    &lt;style&gt;
        .box {
            height: 200px;
            margin: 1000px 0;
            padding: 20px;
        }
        #top { background: #ffcccc; }
        #center { background: #ccffcc; }
        #bottom { background: #ccccff; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;button onclick="scrollToTop()"&gt;Align Top&lt;/button&gt;
&lt;button onclick="scrollToCenter()"&gt;Align Center&lt;/button&gt;
&lt;button onclick="scrollToBottom()"&gt;Align Bottom&lt;/button&gt;

&lt;div id="top" class="box"&gt;Top Aligned&lt;/div&gt;
&lt;div id="center" class="box"&gt;Center Aligned&lt;/div&gt;
&lt;div id="bottom" class="box"&gt;Bottom Aligned&lt;/div&gt;

&lt;script&gt;
    function scrollToTop() {
        document.getElementById('top').scrollIntoView({ block: 'start' });
    }
    function scrollToCenter() {
        document.getElementById('center').scrollIntoView({ block: 'center' });
    }
    function scrollToBottom() {
        document.getElementById('bottom').scrollIntoView({ block: 'end' });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example shows three different alignment options: start (top), center, and
end (bottom) of the viewport. Each button demonstrates a different alignment.

The block option controls the vertical alignment, while the
inline option (not shown) would control horizontal alignment.

## Form Validation Scroll

This example shows a practical use case of scrollIntoView in form validation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Form Validation Scroll&lt;/title&gt;
    &lt;style&gt;
        form {
            margin-bottom: 1500px;
        }
        .error {
            color: red;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;form onsubmit="return validateForm()"&gt;
    &lt;h2&gt;Registration Form&lt;/h2&gt;
    
    &lt;div&gt;
        &lt;label for="name"&gt;Name:&lt;/label&gt;
        &lt;input type="text" id="name"&gt;
        &lt;span id="nameError" class="error"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div&gt;
        &lt;label for="email"&gt;Email:&lt;/label&gt;
        &lt;input type="email" id="email"&gt;
        &lt;span id="emailError" class="error"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        let isValid = true;
        
        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            name.focus();
            name.scrollIntoView({ behavior: 'smooth', block: 'center' });
            isValid = false;
        }
        
        if (email.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            if (isValid) {
                email.focus();
                email.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            isValid = false;
        }
        
        return isValid;
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In this form validation example, scrollIntoView is used to scroll to the first
invalid field when validation fails. This improves user experience by showing
where corrections are needed.

We combine focus() with scrollIntoView() to both scroll
to and focus the problematic input field. The smooth behavior makes the scroll
more pleasant.

## Navigation Menu

This example demonstrates using scrollIntoView to create a single-page navigation.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Navigation Menu&lt;/title&gt;
    &lt;style&gt;
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: white;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        nav a {
            margin: 0 10px;
            cursor: pointer;
        }
        section {
            height: 800px;
            padding: 60px 20px 20px;
        }
        #home { background: #f0f0f0; }
        #about { background: #e0e0e0; }
        #services { background: #d0d0d0; }
        #contact { background: #c0c0c0; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;nav&gt;
    &lt;a onclick="scrollToSection('home')"&gt;Home&lt;/a&gt;
    &lt;a onclick="scrollToSection('about')"&gt;About&lt;/a&gt;
    &lt;a onclick="scrollToSection('services')"&gt;Services&lt;/a&gt;
    &lt;a onclick="scrollToSection('contact')"&gt;Contact&lt;/a&gt;
&lt;/nav&gt;

&lt;section id="home"&gt;
    &lt;h2&gt;Home Section&lt;/h2&gt;
&lt;/section&gt;
&lt;section id="about"&gt;
    &lt;h2&gt;About Section&lt;/h2&gt;
&lt;/section&gt;
&lt;section id="services"&gt;
    &lt;h2&gt;Services Section&lt;/h2&gt;
&lt;/section&gt;
&lt;section id="contact"&gt;
    &lt;h2&gt;Contact Section&lt;/h2&gt;
&lt;/section&gt;

&lt;script&gt;
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example creates a single-page navigation menu where clicking a link smoothly
scrolls to the corresponding section. The navigation bar remains fixed at the top.

We use block: 'start' to align sections to the top of the viewport,
just below the fixed navigation. This creates a polished single-page navigation
experience.

## Source

[MDN scrollIntoView Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

In this article, we have explored the scrollIntoView method with
various examples. This powerful method enables smooth scrolling and element
visibility control in modern web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS DOM tutorials](/all/#dom).