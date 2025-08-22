+++
title = "Angular - Pipes"
date = "2025-08-22"
draft = false
description = "In Angular, pipes are functions that format specified data before displaying it in the View. They help to transform and manage data within interpolation, denoted by {{ | }}. Therefore, pipes are sometimes referred to as filters. It accepts arrays, integers and strings as inputs which are separated b"
image = "/angular/images/angular-pipes.jpg"
imageBig = "/angular/images/angular-pipes.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Pipes

URL: https://www.tutorialspoint.com/angular/angular-pipes.htm

InAngular,pipesare functions that format specified data before displaying it in the View. They help to transform and manage data within interpolation, denoted by{{ | }}. Therefore, pipes are sometimes referred to as filters. It accepts arrays, integers and strings as inputs which are separated by a vertical bar"|"symbol.

Some of the features and uses of Angular pipes are listed below −

To use Angular pipes in your application, embed the pipe directly insidetemplate expression. This is done using Angular's pipe operator which is denoted by a vertical bar character"|".

Thepipe operatoris a binary operator. On the left of this operator, the input value is passed to the transformation function, and the right side operand is the pipe name.

All the built-in pipes in Angular are available in the@angular/commonpackage. Hence, make sure to import the required pipe from this package by specifying the pipe name in the following command −

The syntax to use Angular pipe is as follows −

html-tag-namecan be replaced by any HTML tag,input-valueis the input that will be passed into the pipe on the right side of pipe operator.

Chaining multiple pipes together is also possible. The output of one pipe can be passed as input to another pipe. And, the chained pipes run from left to right.

The syntax to chain Angular pipes is as follows −

Some Angular pipes allow to configure the transformation by passing parameters. To specify a parameter, append the pipe name with a colon (:) followed by the parameter value.

The syntax to add parameters to Angular pipes is shown below −

The following example illustrates how to use theDatePipein your Angular application to format dates.

Step 1:Create apipe-appapplication using the below command:

Step 2:Add the below content inapp.component.htmlfile.

Step 3:Import@angular/commonpackage and create an Date object insideapp.component.tsfile −

Step 4:Start your application using the below command −

It will display the following output on your browser −

Step 5:Let's add date pipe in the HTML file.

Now, you will see the below output on your screen −

Step 6:PassfullDateparameter to the date pipe as shown below −

Step 7:Now, run your application and you can see the below response −

Angular supports a number ofbuilt-in pipes, which are as follows −

1.

It is used to format a given date value.

2.

It converts individual letters of the specified texts into uppercase.

3.

It transforms individual letters of the specified texts into lowercase.

4.

This pipe is used to transform a given number into a currency string.

5.

This pipe formats a number into a string of decimal point number.

6.

It formats specified numbers into a percentage string.

7.

It is used to convert the specified text to a title case.

8.

This built-in pipe is used to transform an object to its corresponding JSON string representation.

9.

Use this pipe to create an array of key-value pairs from a given object or map.

10.

It returns a new sub-string from the specified string.

Acustom pipeis a user-defined pipe that allows developers to perform specific transformations that Angular's built-in pipes can't achieve. The built-in pipes provide limited functionalities like formatting dates, numbers and strings. However, you can achieve more than that using custom pipes. For example, sorting and filtering.

To create a custom pipe, run the following command in Angular CLI −

Now that you have learned the Angular Pipes, let's test your knowledge. Please answer the following questions based on your understanding −

Q. 1- Which of the following Angular pipe formats dates?

A- UpperCasePipe

B- CurrencyPipe

C- PercentPipe

D- DatePipe

DatePipe is a built-in Angular pipe used to format a given date value.

Q. 2- What does the UpperCasePipe do in Angular?

A- It converts individual letters of a text into uppercase

B- It transforms the entire text to lowercase

C- It formats numbers into currency strings

D- It converts text to title case

The UpperCasePipe in Angular converts all characters in a string to uppercase letters.

Q. 3-  How can you chain multiple pipes in Angular?

A- Using || symbol

B- Using & symbol

C- Using | symbol

D- Using @ symbol

You can chain multiple pipes in Angular by using the | symbol. The output of one pipe is passed as input to the next pipe.

![Image](/angular/images/angular-pipes.jpg)
