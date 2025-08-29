+++
title = "JavaScript switch/case statements"
date = 2025-08-29T20:01:40.451+01:00
draft = false
description = "Learn how to use switch/case statements in JavaScript for conditional logic, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript switch/case statements

last modified April 16, 2025

In this article we show how to use the switch and case
keywords to create conditional statements in JavaScript.

## The switch/case statement

The switch statement evaluates an expression and executes code
based on matching cases. It provides an alternative to long if-else chains
when testing a single value against multiple possibilities.

Each case represents a possible match for the switch expression.
When a match is found, the corresponding code block executes until a
break statement is encountered.

The default case executes when no matches are found. While
optional, it's good practice to include a default case for handling
unexpected values.

## Basic switch statement

The following example demonstrates the basic structure of a switch statement.

main.js
  

let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = 'Monday';
        break;
    case 2:
        dayName = 'Tuesday';
        break;
    case 3:
        dayName = 'Wednesday';
        break;
    case 4:
        dayName = 'Thursday';
        break;
    case 5:
        dayName = 'Friday';
        break;
    default:
        dayName = 'Weekend';
}

console.log(dayName);

This code converts a numeric day to its corresponding name. The switch
evaluates the day variable and executes the matching case. Without break
statements, execution would "fall through" to subsequent cases.

$ node main.js
Wednesday

## Fall-through behavior

JavaScript switch statements exhibit fall-through behavior by default.

main.js
  

let grade = 'B';
let message;

switch (grade) {
    case 'A':
    case 'B':
    case 'C':
        message = 'Passing grade';
        break;
    case 'D':
        message = 'Barely passing';
        break;
    case 'F':
        message = 'Failing grade';
        break;
    default:
        message = 'Unknown grade';
}

console.log(message);

Here multiple cases share the same code block. Grades A, B, and C all
result in the same message. This demonstrates intentional fall-through,
which can be useful for grouping related cases together.

$ node main.js
Passing grade

## Strict comparison

Switch statements use strict comparison (===) when matching cases.

main.js
  

let value = '5';

switch (value) {
    case 5:
        console.log('Number 5');
        break;
    case '5':
        console.log('String "5"');
        break;
    default:
        console.log('Unknown value');
}

This example shows that the string '5' doesn't match the number 5 due
to strict type comparison. The switch statement distinguishes between
different data types when evaluating cases.

$ node main.js
String "5"

## Using expressions in cases

Case labels can contain expressions that evaluate to constant values.

main.js
  

let score = 85;
let grade;

switch (true) {
    case score &gt;= 90:
        grade = 'A';
        break;
    case score &gt;= 80:
        grade = 'B';
        break;
    case score &gt;= 70:
        grade = 'C';
        break;
    case score &gt;= 60:
        grade = 'D';
        break;
    default:
        grade = 'F';
}

console.log(grade);

This technique uses boolean expressions in cases by switching on true.
Each case is evaluated until a matching condition is found. It provides
a clean alternative to complex if-else chains for range checking.

$ node main.js
B

## Switch with multiple conditions

Switch statements can handle multiple conditions in a single case.

main.js
  

let fruit = 'apple';
let color;

switch (fruit) {
    case 'apple':
    case 'strawberry':
        color = 'red';
        break;
    case 'banana':
    case 'lemon':
        color = 'yellow';
        break;
    case 'orange':
        color = 'orange';
        break;
    default:
        color = 'unknown';
}

console.log(color);

This example groups fruits by color. Multiple fruits can share the same
color assignment. The switch statement provides a clean way to handle
these grouped conditions without repetitive code.

$ node main.js
red

## Switch vs if-else

Switch statements often provide cleaner code than equivalent if-else chains.

main.js
  

let browser = 'Firefox';

switch (browser) {
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
        console.log('Supported browser');
        break;
    case 'IE':
        console.log('Deprecated browser');
        break;
    default:
        console.log('Unknown browser');
}

The switch version is more readable than a series of if-else statements
when checking multiple exact matches. It clearly shows all possible cases
and their corresponding actions in a structured format.

$ node main.js
Supported browser

## Practical example: command processor

Here's a practical example of using switch to process different commands.

main.js
  

function processCommand(cmd) {
    switch (cmd.toLowerCase()) {
        case 'start':
            console.log('Starting system...');
            break;
        case 'stop':
            console.log('Stopping system...');
            break;
        case 'restart':
            console.log('Restarting system...');
            break;
        case 'status':
            console.log('System status: OK');
            break;
        default:
            console.log(`Unknown command: ${cmd}`);
    }
}

processCommand('START');
processCommand('status');
processCommand('backup');

This command processor demonstrates how switch can handle different input
commands. The toLowerCase() ensures case-insensitive matching. The default
case handles invalid commands gracefully.

$ node main.js
Starting system...
System status: OK
Unknown command: backup

## Source

[switch - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

In this article we have demonstrated how to use the switch and case keywords
to create conditional statements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)