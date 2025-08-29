+++
title = "Tcl if Command"
date = 2025-08-29T20:13:02.418+01:00
draft = false
description = "Tcl if command tutorial shows how to use conditionals in Tcl. Learn if with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl if Command

last modified April 3, 2025

The Tcl if command is used for conditional execution of code. It
evaluates an expression and executes different code blocks based on the result.
This is fundamental for controlling program flow.

## Basic Definition

The if command evaluates a boolean expression. If the expression is
true, it executes the associated body of code. It can include optional elseif
and else clauses for additional conditions.

Syntax: if {expr} {body} ?elseif {expr} {body}? ?else {body}?. The
expression must be enclosed in braces or quotes. The body must be in braces.

## Simple if Statement

This example demonstrates the most basic form of the if command.

simple_if.tcl
  

set x 10
if {$x &gt; 5} {
    puts "x is greater than 5"
}

Here we check if variable x is greater than 5. Since 10 is indeed
greater than 5, the message will be printed. The expression is enclosed in braces
for proper evaluation.

## if with else Clause

This example shows how to use the else clause to handle the false case.

if_else.tcl
  

set age 17
if {$age &gt;= 18} {
    puts "You are an adult"
} else {
    puts "You are a minor"
}

The code checks if a person is an adult based on their age. Since 17 is less than
18, the else block executes, printing "You are a minor". The else
provides an alternative execution path.

## if with elseif Clauses

Multiple conditions can be checked using elseif clauses.

if_elseif.tcl
  

set score 85
if {$score &gt;= 90} {
    puts "Grade: A"
} elseif {$score &gt;= 80} {
    puts "Grade: B"
} elseif {$score &gt;= 70} {
    puts "Grade: C"
} else {
    puts "Grade: F"
}

This example implements a grading system. The conditions are checked in order
until one matches. Here, 85 is between 80 and 90, so "Grade: B" is printed.

## Nested if Statements

if statements can be nested inside other if statements.

nested_if.tcl
  

set x 10
set y 20
if {$x &gt; 5} {
    if {$y &gt; 15} {
        puts "Both conditions are true"
    } else {
        puts "Only x condition is true"
    }
} else {
    puts "x condition is false"
}

This demonstrates nested conditionals. Both conditions must be true to print the
first message. Here both are true, so "Both conditions are true" is printed.

## Logical Operators in if

Logical operators like &amp;&amp; (and), || (or) can combine conditions.

logical_if.tcl
  

set age 25
set has_license 1
if {$age &gt;= 18 &amp;&amp; $has_license} {
    puts "You can drive"
} else {
    puts "You cannot drive"
}

This checks two conditions using the logical AND operator. Both must be true for
the first block to execute. Here both are true, so "You can drive" is printed.

## String Comparison in if

The if command can compare strings using string comparison operators.

string_if.tcl
  

set name "Alice"
if {$name eq "Alice"} {
    puts "Hello Alice"
} elseif {$name eq "Bob"} {
    puts "Hello Bob"
} else {
    puts "Hello stranger"
}

This example compares strings using the eq operator. Since the name
matches "Alice", the first block executes. String comparisons are case-sensitive.

## Best Practices

- **Braces:** Always use braces around expressions and bodies.

- **Indentation:** Indent code blocks for better readability.

- **Complexity:** Avoid deeply nested if statements.

- **Operators:** Use proper comparison operators for types.

- **Comments:** Comment complex conditions for clarity.

 

This tutorial covered the Tcl if command with practical
examples showing its usage in different conditional scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).