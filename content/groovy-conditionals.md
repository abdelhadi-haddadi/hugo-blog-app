+++
title = "Groovy Conditionals"
date = 2025-08-29T19:56:27.840+01:00
draft = false
description = "Groovy conditionals tutorial covers if statements, switch expressions, ternary operator and more in Groovy."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Conditionals

last modified April 5, 2025

Conditionals allow programs to make decisions based on boolean expressions.
Groovy provides several conditional structures including if/else, switch,
and the ternary operator. These control program flow based on conditions.

## Basic Definition

Conditionals evaluate boolean expressions to determine code execution paths.
Groovy supports standard Java conditionals with additional enhancements.
The main conditional structures are if/else, switch/case, and ?: operator.

Groovy conditionals work with truthy values where non-null/non-zero values
evaluate to true. This differs from Java's strict boolean requirements.

## Simple if Statement

The if statement executes code when a condition is true.

IfExample.groovy
  

def age = 18

if (age &gt;= 18) {
    println "You are an adult"
}

This checks if age is 18 or more. If true, it prints the message. The
condition must evaluate to a boolean value. Groovy allows truthy evaluation.

Curly braces are optional for single statements but recommended for clarity.
The condition must be in parentheses.

$ groovy IfExample.groovy
You are an adult

## if-else Statement

The if-else statement provides an alternative execution path when the
condition is false.

IfElseExample.groovy
  

def temperature = 25

if (temperature &gt; 30) {
    println "It's hot outside"
} else {
    println "It's not too hot"
}

This checks temperature and prints different messages based on the value.
The else block executes when the if condition is false.

The else statement must appear immediately after the if block. Multiple
conditions can be chained with else-if.

$ groovy IfElseExample.groovy
It's not too hot

## if-else-if Ladder

Multiple conditions can be checked using else-if statements.

IfElseIfExample.groovy
  

def score = 85

if (score &gt;= 90) {
    println "Grade A"
} else if (score &gt;= 80) {
    println "Grade B"
} else if (score &gt;= 70) {
    println "Grade C"
} else {
    println "Grade D"
}

This evaluates score against multiple grade thresholds. The first true
condition executes its block, skipping others.

Conditions are evaluated top to bottom. Only one block executes even if
multiple conditions are true.

$ groovy IfElseIfExample.groovy
Grade B

## Ternary Operator

The ternary operator provides a concise way to write simple if-else statements.

TernaryExample.groovy
  

def age = 20
def status = age &gt;= 18 ? "Adult" : "Minor"

println status

This assigns "Adult" if age is 18+, otherwise "Minor". The syntax is
condition ? trueValue : falseValue.

Ternary expressions return a value and can be used in assignments or
method arguments. They're ideal for simple conditions.

$ groovy TernaryExample.groovy
Adult

## Switch Statement

The switch statement compares a value against multiple cases.

SwitchExample.groovy
  

def day = "Wednesday"

switch(day) {
    case "Monday":
        println "Start of work week"
        break
    case "Friday":
        println "Almost weekend"
        break
    default:
        println "Midweek day"
}

This checks the day variable against different cases. The matching case
executes its code block. Default runs if no cases match.

Groovy's switch is more powerful than Java's, supporting various matching
strategies. Break statements prevent fall-through to next cases.

$ groovy SwitchExample.groovy
Midweek day

## Switch with Ranges

Groovy switch supports range matching in case statements.

SwitchRangeExample.groovy
  

def score = 75

switch(score) {
    case 90..100:
        println "Excellent"
        break
    case 75..&lt;90:
        println "Good"
        break
    case 60..&lt;75:
        println "Average"
        break
    default:
        println "Needs improvement"
}

This uses range operators to match score ranges. The .. creates an inclusive
range, while ..&lt; is exclusive on the upper bound.

Range matching simplifies numeric comparisons that would require multiple
conditions with if statements.

$ groovy SwitchRangeExample.groovy
Good

## Switch with Regular Expressions

Groovy switch can match against regular expressions.

SwitchRegexExample.groovy
  

def input = "admin@example.com"

switch(input) {
    case ~/.*@admin\..*/:
        println "Admin email"
        break
    case ~/.*@example\.com/:
        println "Example domain"
        break
    default:
        println "Unknown email"
}

The ~/pattern/ syntax creates a regex matcher. The input is checked against
each pattern until a match is found.

Regex matching in switch statements is unique to Groovy and very powerful
for string pattern matching.

$ groovy SwitchRegexExample.groovy
Admin email

## Switch with Type Checking

Groovy switch can check the type of the input value.

SwitchTypeExample.groovy
  

def value = 3.14

switch(value) {
    case Integer:
        println "Integer number"
        break
    case Float:
        println "Float number"
        break
    case Double:
        println "Double number"
        break
    default:
        println "Unknown type"
}

This checks the runtime type of value against class types. The matching
case executes when the value is an instance of the specified type.

Type checking in switch is useful for polymorphic behavior based on input
types without explicit instanceof checks.

$ groovy SwitchTypeExample.groovy
Double number

## Truthy Evaluation

Groovy evaluates non-boolean values in conditions using truthy rules.

TruthyExample.groovy
  

def name = "John"
def count = 0
def list = []

if (name) println "Name has value"       // true
if (count) println "Count is non-zero"   // false
if (list) println "List has elements"    // false

In Groovy, non-null/non-empty/true values evaluate to true. Zero, empty
collections, null, and false evaluate to false.

This differs from Java where conditions must be strictly boolean. It makes
Groovy code more concise for common checks.

$ groovy TruthyExample.groovy
Name has value

## Elvis Operator

The Elvis operator ?: provides default values for null references.

ElvisExample.groovy
  

def username = null
def displayName = username ?: "Guest"

println "Welcome, $displayName"

This assigns "Guest" if username is null. The syntax is value ?: defaultValue.
It's like a shortened ternary operator for null checks.

The Elvis operator is commonly used to provide fallback values and handle
null safely without verbose if-else blocks.

$ groovy ElvisExample.groovy
Welcome, Guest

## Source

[Groovy Conditionals Documentation](https://groovy-lang.org/semantics.html#_conditional_structures)

This tutorial covered Groovy conditional structures with practical examples.
Conditionals are fundamental for controlling program flow in Groovy.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).