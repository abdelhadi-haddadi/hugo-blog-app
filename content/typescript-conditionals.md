+++
title = "TypeScript Conditionals"
date = 2025-08-29T20:14:27.087+01:00
draft = false
description = "TypeScript tutorial on conditionals, covering if-else, switch, and ternary operators with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Conditionals

last modified February 24, 2025

Conditionals in TypeScript are used to execute different blocks of code based on
certain conditions. TypeScript supports several types of conditionals, including
if-else, switch, and the ternary operator. This
tutorial covers the basics of conditionals in TypeScript with practical
examples.

Conditionals are control structures that allow you to execute different blocks
of code based on whether a condition is true or false. They are essential for
making decisions in your code and controlling the flow of execution.

## If-Else Statement

This example demonstrates how to use an if-else statement to check
a condition.

if_else.ts
  

let age: number = 18;

if (age &gt;= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}
// Output: You are an adult.

The if-else statement checks if the condition 
age &gt;= 18 is true. If it is, the first block of code is executed;
otherwise, the second block is executed.

## Else-If Statement

This example demonstrates how to use an else-if statement to check
multiple conditions.

else_if.ts
  

let score: number = 85;

if (score &gt;= 90) {
    console.log("Grade: A");
} else if (score &gt;= 80) {
    console.log("Grade: B");
} else if (score &gt;= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: D");
}
// Output: Grade: B

The else-if statement allows you to check multiple conditions in
sequence. The first condition that evaluates to true will execute its
corresponding block of code.

## Ternary Operator

This example demonstrates how to use the ternary operator for a concise
conditional expression.

ternary_operator.ts
  

let isRaining: boolean = true;
let message: string = isRaining ? "Bring an umbrella." : "Enjoy the weather.";

console.log(message);  // Output: Bring an umbrella.

The ternary operator is a shorthand for an if-else statement. It
evaluates a condition and returns one of two values based on whether the
condition is true or false.

## Switch Statement

This example demonstrates how to use a switch statement to handle
multiple cases.

switch_statement.ts
  

let day: number = 3;
let dayName: string;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName);  // Output: Wednesday

The switch statement evaluates an expression and executes the
corresponding case block. The break statement is used to exit the
switch block after a case is matched.

## Nested Conditionals

This example demonstrates how to use nested conditionals to handle complex logic.

nested_conditionals.ts
  

let age: number = 20;
let hasLicense: boolean = true;

if (age &gt;= 18) {
    if (hasLicense) {
        console.log("You can drive.");
    } else {
        console.log("You need a license to drive.");
    }
} else {
    console.log("You are too young to drive.");
}
// Output: You can drive.

Nested conditionals allow you to check multiple conditions within a single block
of code. This is useful for handling complex decision-making logic.

## Logical Operators in Conditionals

This example demonstrates how to use logical operators (&amp;&amp;, 
||) in conditionals.

logical_operators.ts
  

let isLoggedIn: boolean = true;
let isAdmin: boolean = false;

if (isLoggedIn &amp;&amp; isAdmin) {
    console.log("Welcome, Admin!");
} else if (isLoggedIn || isAdmin) {
    console.log("Welcome, User!");
} else {
    console.log("Please log in.");
}
// Output: Welcome, User!

Logical operators allow you to combine multiple conditions in a single
statement. The &amp;&amp; operator requires both conditions to be true,
while the || operator requires at least one condition to be true.

## Best Practices for Using Conditionals

- **Use Descriptive Conditions:** Write clear and descriptive conditions to improve code readability.

- **Avoid Deep Nesting:** Minimize the depth of nested conditionals to keep the code maintainable.

- **Use Switch for Multiple Cases:** Use the switch statement for handling multiple cases instead of multiple else-if statements.

- **Leverage Ternary for Simple Conditions:** Use the ternary operator for simple conditions to make the code more concise.

## Source

[TypeScript Conditionals Documentation](https://www.typescriptlang.org/docs/handbook/control-flow-analysis.html)

In this article, we have explored TypeScript conditionals and demonstrated their
usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).