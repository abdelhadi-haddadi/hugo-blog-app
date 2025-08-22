+++
title = "Angular - Displaying Data"
date = "2025-08-22"
draft = false
description = "This angular tutorial will discuss the various ways to display data, including how to display array data, object data, variables data, etc. A most common question in the minds of users who have just started learning an angular framework is, how do we display data in angular?"
image = "/angular/images/display-data1.jpg"
imageBig = "/angular/images/display-data1.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Displaying Data

URL: https://www.tutorialspoint.com/angular/angular-displaying-data.htm

This angular tutorial will discuss the various ways todisplay data, including how to display array data, object data, variables data, etc. A most common question in the minds of users who have just started learning an angular framework is, how do we display data in angular?

Displaying datain Angular involves accessing the properties of acomponentclass and rendering their values in thetemplate. Angular provides various ways to display these data values (including variables, objects, arrays, etc.) in the template (HTML) using features such as interpolation, property binding, and structural directives.

Let's discuss a few different ways to display data in Angular, with appropriate examples to help you understand each of them clearly.

In Angular,interpolationis one of the most common or basic ways to bind (display) data from your component to the HTML template. It allows you to embed expressions into marked-up text and uses the double curly{{}}as a delimiter.

Following is the syntax ofinterpolationin Angular −

Here, thetemplate_expressioncan be any property (variable) of your component.



In this example, we will create properties (variables) namedtitle(string type),num(number type), andisTrue(boolean type). We will bind (display) them in the template using interpolation −

In theapp.component.ts, declare the properties with some initial values:

In theapp.component.html, bind the declared properties usinginterpolation {{}}−

The displayed data will look like this −

This is another way to display data using Angularproperty bindings. In Angular,bindingis a "technique" to "bind data between the component and the view".

We create an input field and bind the[value] propertyto display the component data (i.e., variable "username") within the input field default when the page is loaded −

In theapp.component.ts, create a variable namedusernamewith the value"user12@gmail.com"−

In theapp.component.html, update the existing code with the code given below −

The output of the above code will look like:

In Angular,structural directivesare built-in directives used to control the appearance and behavior of elements in theDOM. They can dynamically add, remove, or manipulate elements based on certain conditions. Common structural directives are:

In the example below, we will use the structural*ngFordirective to iterate through the object defined in the component and display all data in the template −

In theapp.component.ts, create anarray of objectswith the keysid,name, andageas follows:

In theapp.component.html, use the*ngFordirective to iterate through the object data and display them in the template:

Following is the output of the above code −

Note!In this tutorial, we have learned the various ways to display data in Angular. There are still more methods that you can explore in individual chapters. This tutorial provided a brief introduction to the concept of displaying data in Angular.

![Image](/angular/images/display-data1.jpg)
![Image](/angular/images/display-data2.jpg)
![Image](/angular/images/display-data3.jpg)
