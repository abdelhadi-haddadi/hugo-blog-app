+++
title = "HTML Table Types"
date = 2025-08-29T19:57:54.262+01:00
draft = false
description = "HTML Table Types tutorial shows how to create different structural forms of tables in HTML, including horizontal, vertical, nested, and more."
image = ""
imageBig = ""
categories = ["html"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# HTML Table Types

last modified March 3, 2025 

HTML Table Types tutorial shows how to create different structural forms of
tables in HTML, including horizontal, vertical, nested, and more.

## HTML Tables

HTML Tables are used to organize and display data in a grid format.
Introduced in HTML 1.0, tables remain a fundamental part of web development
for structuring data, though CSS is often preferred for layout purposes.

## Table Structures

Tables can be structured in various ways depending on how data is organized.
This tutorial covers horizontal, vertical, nested, and other layouts with examples
rendered below each code snippet.

## HTML Table Types Examples

In the following examples, we explore different table structures with sample data.
Basic CSS is included in the head to ensure visibility.

### 1. Horizontal Table

The standard table layout where each row represents a record and columns represent attributes.

Horizontal Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;th&gt;City&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;John&lt;/td&gt;
        &lt;td&gt;25&lt;/td&gt;
        &lt;td&gt;New York&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Jane&lt;/td&gt;
        &lt;td&gt;30&lt;/td&gt;
        &lt;td&gt;London&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Mike&lt;/td&gt;
        &lt;td&gt;28&lt;/td&gt;
        &lt;td&gt;Paris&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Emma&lt;/td&gt;
        &lt;td&gt;27&lt;/td&gt;
        &lt;td&gt;Tokyo&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Name
        Age
        City
    
    
        John
        25
        New York
    
    
        Jane
        30
        London
    
    
        Mike
        28
        Paris
    
    
        Emma
        27
        Tokyo
    

### 2. Vertical Table

A table where attributes are listed in rows and each column represents a record.

Vertical Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;John&lt;/td&gt;
        &lt;td&gt;Jane&lt;/td&gt;
        &lt;td&gt;Mike&lt;/td&gt;
        &lt;td&gt;Emma&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;25&lt;/td&gt;
        &lt;td&gt;30&lt;/td&gt;
        &lt;td&gt;28&lt;/td&gt;
        &lt;td&gt;27&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;New York&lt;/td&gt;
        &lt;td&gt;London&lt;/td&gt;
        &lt;td&gt;Paris&lt;/td&gt;
        &lt;td&gt;Tokyo&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Name
        John
        Jane
        Mike
        Emma
    
    
        Age
        25
        30
        28
        27
    
    
        City
        New York
        London
        Paris
        Tokyo
    

### 3. Nested Table

A table with another table inside a cell, useful for hierarchical data.

Nested Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Student&lt;/th&gt;
        &lt;td&gt;
            &lt;table&gt;
                &lt;tr&gt;
                    &lt;th&gt;Name&lt;/th&gt;
                    &lt;td&gt;John&lt;/td&gt;
                &lt;/tr&gt;
                &lt;tr&gt;
                    &lt;th&gt;Grades&lt;/th&gt;
                    &lt;td&gt;
                        &lt;table&gt;
                            &lt;tr&gt;
                                &lt;td&gt;Math&lt;/td&gt;
                                &lt;td&gt;85&lt;/td&gt;
                            &lt;/tr&gt;
                            &lt;tr&gt;
                                &lt;td&gt;Science&lt;/td&gt;
                                &lt;td&gt;90&lt;/td&gt;
                            &lt;/tr&gt;
                            &lt;tr&gt;
                                &lt;td&gt;History&lt;/td&gt;
                                &lt;td&gt;88&lt;/td&gt;
                            &lt;/tr&gt;
                            &lt;tr&gt;
                                &lt;td&gt;Art&lt;/td&gt;
                                &lt;td&gt;92&lt;/td&gt;
                            &lt;/tr&gt;
                        &lt;/table&gt;
                    &lt;/td&gt;
                &lt;/tr&gt;
            &lt;/table&gt;
        &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Student
        
            
                
                    Name
                    John
                
                
                    Grades
                    
                        
                            
                                Math
                                85
                            
                            
                                Science
                                90
                            
                            
                                History
                                88
                            
                            
                                Art
                                92
                            
                        
                    
                
            
        
    

### 4. Diagonal Table

A comparison matrix with headers on both axes.

Diagonal Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;&lt;/th&gt;
        &lt;th&gt;Product A&lt;/th&gt;
        &lt;th&gt;Product B&lt;/th&gt;
        &lt;th&gt;Product C&lt;/th&gt;
        &lt;th&gt;Product D&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Feature 1&lt;/th&gt;
        &lt;td&gt;Yes&lt;/td&gt;
        &lt;td&gt;No&lt;/td&gt;
        &lt;td&gt;Yes&lt;/td&gt;
        &lt;td&gt;No&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Feature 2&lt;/th&gt;
        &lt;td&gt;No&lt;/td&gt;
        &lt;td&gt;Yes&lt;/td&gt;
        &lt;td&gt;No&lt;/td&gt;
        &lt;td&gt;Yes&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Feature 3&lt;/th&gt;
        &lt;td&gt;Yes&lt;/td&gt;
        &lt;td&gt;Yes&lt;/td&gt;
        &lt;td&gt;No&lt;/td&gt;
        &lt;td&gt;No&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        
        Product A
        Product B
        Product C
        Product D
    
    
        Feature 1
        Yes
        No
        Yes
        No
    
    
        Feature 2
        No
        Yes
        No
        Yes
    
    
        Feature 3
        Yes
        Yes
        No
        No
    

### 5. Multi-Header Table

A horizontal table with multiple header rows for categorization.

Multi-Header Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th rowspan="2"&gt;ID&lt;/th&gt;
        &lt;th colspan="2"&gt;Personal Info&lt;/th&gt;
        &lt;th colspan="2"&gt;Contact Info&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;th&gt;Email&lt;/th&gt;
        &lt;th&gt;Phone&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;1&lt;/td&gt;
        &lt;td&gt;John&lt;/td&gt;
        &lt;td&gt;25&lt;/td&gt;
        &lt;td&gt;john@example.com&lt;/td&gt;
        &lt;td&gt;123-456&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;2&lt;/td&gt;
        &lt;td&gt;Jane&lt;/td&gt;
        &lt;td&gt;30&lt;/td&gt;
        &lt;td&gt;jane@example.com&lt;/td&gt;
        &lt;td&gt;789-012&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;3&lt;/td&gt;
        &lt;td&gt;Mike&lt;/td&gt;
        &lt;td&gt;28&lt;/td&gt;
        &lt;td&gt;mike@example.com&lt;/td&gt;
        &lt;td&gt;345-678&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        ID
        Personal Info
        Contact Info
    
    
        Name
        Age
        Email
        Phone
    
    
        1
        John
        25
        john@example.com
        123-456
    
    
        2
        Jane
        30
        jane@example.com
        789-012
    
    
        3
        Mike
        28
        mike@example.com
        345-678
    

### 6. Multi-Column Vertical Table

A vertical table with grouped columns.

Multi-Column Vertical Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th colspan="2"&gt;Student 1&lt;/th&gt;
        &lt;th colspan="2"&gt;Student 2&lt;/th&gt;
        &lt;th colspan="2"&gt;Student 3&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;John&lt;/td&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;Jane&lt;/td&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;Mike&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;25&lt;/td&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;30&lt;/td&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;28&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;New York&lt;/td&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;London&lt;/td&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;Paris&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Student 1
        Student 2
        Student 3
    
    
        Name
        John
        Name
        Jane
        Name
        Mike
    
    
        Age
        25
        Age
        30
        Age
        28
    
    
        City
        New York
        City
        London
        City
        Paris
    

### 7. Stacked Table

Multiple independent tables stacked together.

Stacked Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;John&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;New York&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;Jane&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;30&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;London&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;td&gt;Mike&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Age&lt;/th&gt;
        &lt;td&gt;28&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;City&lt;/th&gt;
        &lt;td&gt;Paris&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Name
        John
    
    
        Age
        25
    
    
        City
        New York
    

    
        Name
        Jane
    
    
        Age
        30
    
    
        City
        London
    

    
        Name
        Mike
    
    
        Age
        28
    
    
        City
        Paris
    

### 8. Grid Table

A matrix-like table for schedules or calendars.

Grid Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Time&lt;/th&gt;
        &lt;th&gt;Mon&lt;/th&gt;
        &lt;th&gt;Tue&lt;/th&gt;
        &lt;th&gt;Wed&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;9:00&lt;/th&gt;
        &lt;td&gt;Meeting&lt;/td&gt;
        &lt;td&gt;Free&lt;/td&gt;
        &lt;td&gt;Work&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;10:00&lt;/th&gt;
        &lt;td&gt;Work&lt;/td&gt;
        &lt;td&gt;Work&lt;/td&gt;
        &lt;td&gt;Meeting&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;11:00&lt;/th&gt;
        &lt;td&gt;Free&lt;/td&gt;
        &lt;td&gt;Meeting&lt;/td&gt;
        &lt;td&gt;Free&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Time
        Mon
        Tue
        Wed
    
    
        9:00
        Meeting
        Free
        Work
    
    
        10:00
        Work
        Work
        Meeting
    
    
        11:00
        Free
        Meeting
        Free
    

### 9. Single-Row Table

A table with only one row, often used for layout.

Single-Row Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;td&gt;Item 1&lt;/td&gt;
        &lt;td&gt;Item 2&lt;/td&gt;
        &lt;td&gt;Item 3&lt;/td&gt;
        &lt;td&gt;Item 4&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Item 1
        Item 2
        Item 3
        Item 4
    

### 10. Single-Column Table

A table with only one column, like a list.

Single-Column Table Example
  

&lt;table&gt;
    &lt;tr&gt;
        &lt;td&gt;Name: John&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Age: 25&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;City: New York&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Job: Developer&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

Rendered output:

    
        Name: John
    
    
        Age: 25
    
    
        City: New York
    
    
        Job: Developer
    

In this tutorial, we have explored various structural forms of HTML tables,
demonstrating how to organize data in different layouts with visible examples.

List [all HTML tutorials](/all/#html).