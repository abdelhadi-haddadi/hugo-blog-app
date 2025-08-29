+++
title = "JavaScript if/else statements"
date = 2025-08-29T20:01:22.608+01:00
draft = false
description = "Understand how to use if/else statements in JavaScript for controlling program flow, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript if/else statements

last modified April 16, 2025

In this article we show how to control program flow using the if and
else keywords in JavaScript.

## The if/else keywords

The if statement executes a block of code if a specified condition
is true. The else statement executes a block if the same condition
is false. These are fundamental building blocks for decision-making in programs.

JavaScript evaluates the condition inside parentheses after if. If
the result is truthy, the code block executes. If falsy and an else
exists, that block executes instead. Conditions can be any expression that
returns a boolean value.

The else if construct allows testing multiple conditions in sequence.
Only one block will execute - the first one whose condition evaluates to true.
This provides a way to handle multiple possible cases.

## Basic if statement

The simplest form of conditional execution uses just the if keyword.

main.js
  

const age = 20;

if (age &gt;= 18) {
    console.log("You are an adult");
}

This code checks if the age variable is 18 or greater. If true, it logs a message
to the console. The code block only executes when the condition evaluates to
true. No action occurs if the condition is false.

$ node main.js
You are an adult

## if with else

Adding an else clause provides an alternative execution path.

main.js
  

const temperature = 25;

if (temperature &gt; 30) {
    console.log("It's hot outside");
} else {
    console.log("It's not too hot");
}

Here, one of two messages will always be printed. If temperature exceeds 30, the
first message appears. Otherwise, the second message appears. The else block
executes when the if condition is false.

$ node main.js
It's not too hot

## Multiple conditions with else if

Chain conditions together using else if for more complex logic.

main.js
  

const score = 85;

if (score &gt;= 90) {
    console.log("Grade: A");
} else if (score &gt;= 80) {
    console.log("Grade: B");
} else if (score &gt;= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: D or below");
}

This example demonstrates a grading system. Conditions are checked in order until
one matches. Only the first matching block executes. The final else catches all
remaining cases not covered by previous conditions.

$ node main.js
Grade: B

## Nested if statements

if statements can be nested inside other if statements for complex conditions.

main.js
  

const age = 25;
const hasLicense = true;

if (age &gt;= 18) {
    if (hasLicense) {
        console.log("You can drive");
    } else {
        console.log("You need a license");
    }
} else {
    console.log("You're too young to drive");
}

The outer if checks age, while the inner if checks license status. This structure
allows combining multiple conditions in a logical way. Each condition must be true
for the innermost block to execute.

$ node main.js
You can drive

## Logical operators in conditions

Logical operators like AND (&amp;&amp;) and OR (||) can combine conditions.

main.js
  

const hour = 14;
const isWeekend = false;

if (hour &gt;= 9 &amp;&amp; hour &lt;= 17 &amp;&amp; !isWeekend) {
    console.log("Office is open");
} else {
    console.log("Office is closed");
}

This example checks if current hour is between 9-5 and it's not a weekend. The
&amp;&amp; operator requires all conditions to be true. The !
operator negates the boolean value. Complex conditions become more readable.

$ node main.js
Office is open

## Ternary operator alternative

Simple if/else statements can be written concisely with the ternary operator.

main.js
  

const isMember = true;
const discount = isMember ? 0.1 : 0;

console.log(`Your discount is ${discount * 100}%`);

The ternary operator ? : provides a shorthand for simple conditionals.
If isMember is true, discount is 0.1 (10%), otherwise 0. This is equivalent to
a full if/else statement but more compact for simple cases.

$ node main.js
Your discount is 10%

## Truthy and falsy values

JavaScript conditions evaluate any value, not just booleans, using truthy/falsy rules.

main.js
  

const name = "";
const items = [1, 2, 3];

if (name) {
    console.log(`Hello ${name}`);
} else {
    console.log("Please enter your name");
}

if (items.length) {
    console.log(`You have ${items.length} items`);
}

Empty strings are falsy, while non-empty strings are truthy. Arrays with length &gt; 0
are truthy. Other falsy values include 0, null, undefined, NaN, and false. All
other values are truthy. This behavior is unique to JavaScript.

$ node main.js
Please enter your name
You have 3 items

## Source

[if...else - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

In this article we have demonstrated how to use if/else statements to control
program flow in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)