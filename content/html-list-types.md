+++
title = "HTML List Types"
date = 2025-08-29T19:57:54.231+01:00
draft = false
description = "HTML List Types tutorial shows how to create different structural forms of lists in HTML, including unordered, ordered, definition, and more."
image = ""
imageBig = ""
categories = ["html"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# HTML List Types

last modified March 3, 2025 

HTML List Types tutorial shows how to create different structural forms of lists
in HTML, including unordered, ordered, definition, and more.

## HTML Lists

HTML Lists are used to organize and display items in a structured format.
Introduced in early HTML, lists are essential for creating menus, outlines, and key-value pairs.

## List Structures

Lists can be structured in various ways depending on the data's purpose.
This tutorial covers different types of lists with examples rendered below each code snippet.

## HTML List Types Examples

In the following examples, we explore different list structures with sample data.
Basic CSS is included in the head for consistent styling.

### 1. Basic Unordered List

A simple list with bullet points, using &lt;ul&gt; for unordered items.

Basic Unordered List Example
  

&lt;ul&gt;
    &lt;li&gt;Apple&lt;/li&gt;
    &lt;li&gt;Banana&lt;/li&gt;
    &lt;li&gt;Orange&lt;/li&gt;
    &lt;li&gt;Grape&lt;/li&gt;
&lt;/ul&gt;

Rendered output:

    - Apple

    - Banana

    - Orange

    - Grape

### 2. Basic Ordered List

A numbered list using &lt;ol&gt; for ordered items.

Basic Ordered List Example
  

&lt;ol&gt;
    &lt;li&gt;First Step&lt;/li&gt;
    &lt;li&gt;Second Step&lt;/li&gt;
    &lt;li&gt;Third Step&lt;/li&gt;
    &lt;li&gt;Fourth Step&lt;/li&gt;
&lt;/ol&gt;

Rendered output:

    1. $1

    2. $1

    3. $1

    4. $1

### 3. Nested Unordered List

An unordered list with sublists, showing hierarchy.

Nested Unordered List Example
  

&lt;ul&gt;
    &lt;li&gt;Fruits
        &lt;ul&gt;
            &lt;li&gt;Apple&lt;/li&gt;
            &lt;li&gt;Banana&lt;/li&gt;
            &lt;li&gt;Orange&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li&gt;Vegetables
        &lt;ul&gt;
            &lt;li&gt;Carrot&lt;/li&gt;
            &lt;li&gt;Broccoli&lt;/li&gt;
            &lt;li&gt;Spinach&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
&lt;/ul&gt;

Rendered output:

    Fruits
        
            - Apple

            - Banana

            - Orange

        

    
    Vegetables
        
            - Carrot

            - Broccoli

            - Spinach

        

    

### 4. Nested Ordered List

An ordered list with numbered sublists, often used for outlines.

Nested Ordered List Example
  

&lt;ol&gt;
    &lt;li&gt;Chapter 1
        &lt;ol&gt;
            &lt;li&gt;Section 1.1&lt;/li&gt;
            &lt;li&gt;Section 1.2&lt;/li&gt;
            &lt;li&gt;Section 1.3&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/li&gt;
    &lt;li&gt;Chapter 2
        &lt;ol&gt;
            &lt;li&gt;Section 2.1&lt;/li&gt;
            &lt;li&gt;Section 2.2&lt;/li&gt;
            &lt;li&gt;Section 2.3&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/li&gt;
&lt;/ol&gt;

Rendered output:

    Chapter 1
        
            1. $1

            2. $1

            3. $1

        

    
    Chapter 2
        
            1. $1

            2. $1

            3. $1

        

    

### 5. Definition List

A list of terms and descriptions using &lt;dl&gt;, &lt;dt&gt;, and &lt;dd&gt;.

Definition List Example
  

&lt;dl&gt;
    &lt;dt&gt;HTML&lt;/dt&gt;
    &lt;dd&gt;HyperText Markup Language&lt;/dd&gt;
    &lt;dt&gt;CSS&lt;/dt&gt;
    &lt;dd&gt;Cascading Style Sheets&lt;/dd&gt;
    &lt;dt&gt;JS&lt;/dt&gt;
    &lt;dd&gt;JavaScript&lt;/dd&gt;
    &lt;dt&gt;PHP&lt;/dt&gt;
    &lt;dd&gt;PHP: Hypertext Preprocessor&lt;/dd&gt;
&lt;/dl&gt;

Rendered output:

    HTML
    HyperText Markup Language
    CSS
    Cascading Style Sheets
    JS
    JavaScript
    PHP
    PHP: Hypertext Preprocessor

### 6. Horizontal Unordered List

An unordered list styled horizontally using CSS.

Horizontal Unordered List Example
  

&lt;ul style="list-style: none; display: flex;"&gt;
    &lt;li&gt;Home&lt;/li&gt;
    &lt;li&gt;About&lt;/li&gt;
    &lt;li&gt;Services&lt;/li&gt;
    &lt;li&gt;Contact&lt;/li&gt;
&lt;/ul&gt;

Rendered output:

    - Home

    - About

    - Services

    - Contact

### 7. Reversed Ordered List

An ordered list counting down using the reversed attribute.

Reversed Ordered List Example
  

&lt;ol reversed&gt;
    &lt;li&gt;Step 4&lt;/li&gt;
    &lt;li&gt;Step 3&lt;/li&gt;
    &lt;li&gt;Step 2&lt;/li&gt;
    &lt;li&gt;Step 1&lt;/li&gt;
&lt;/ol&gt;

Rendered output:

    1. $1

    2. $1

    3. $1

    4. $1

### 8. Custom Marker Ordered List

An ordered list with a custom numbering style using the type attribute.

Custom Marker Ordered List Example
  

&lt;ol type="A"&gt;
    &lt;li&gt;Alpha&lt;/li&gt;
    &lt;li&gt;Beta&lt;/li&gt;
    &lt;li&gt;Gamma&lt;/li&gt;
    &lt;li&gt;Delta&lt;/li&gt;
&lt;/ol&gt;

Rendered output:

    1. $1

    2. $1

    3. $1

    4. $1

### 9. Mixed List (Unordered and Ordered)

A combination of unordered and ordered lists for complex structures.

Mixed List Example
  

&lt;ul&gt;
    &lt;li&gt;Category A
        &lt;ol&gt;
            &lt;li&gt;Item 1&lt;/li&gt;
            &lt;li&gt;Item 2&lt;/li&gt;
            &lt;li&gt;Item 3&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/li&gt;
    &lt;li&gt;Category B
        &lt;ol&gt;
            &lt;li&gt;Item 4&lt;/li&gt;
            &lt;li&gt;Item 5&lt;/li&gt;
            &lt;li&gt;Item 6&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/li&gt;
&lt;/ul&gt;

Rendered output:

    Category A
        
            - Item 1

            - Item 2

            - Item 3

        

    
    Category B
        
            - Item 4

            - Item 5

            - Item 6

        

    

### 10. Definition List with Multiple Descriptions

A definition list where terms have multiple descriptions.

Definition List with Multiple Descriptions Example
  

&lt;dl&gt;
    &lt;dt&gt;Python&lt;/dt&gt;
    &lt;dd&gt;A programming language&lt;/dd&gt;
    &lt;dd&gt;Created by Guido van Rossum&lt;/dd&gt;
    &lt;dt&gt;Java&lt;/dt&gt;
    &lt;dd&gt;A programming language&lt;/dd&gt;
    &lt;dd&gt;Developed by Sun Microsystems&lt;/dd&gt;
&lt;/dl&gt;

Rendered output:

    Python
    A programming language
    Created by Guido van Rossum
    Java
    A programming language
    Developed by Sun Microsystems

In this tutorial, we have explored various structural forms of HTML lists,
demonstrating how to organize items in different layouts with visible examples.

List [all HTML tutorials](/all/#html).