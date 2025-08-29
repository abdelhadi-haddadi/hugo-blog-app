+++
title = "Tcl elseif Command"
date = 2025-08-29T20:12:55.700+01:00
draft = false
description = "Tcl elseif command tutorial shows how to use conditional branching in Tcl. Learn elseif with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl elseif Command

last modified April 3, 2025

The Tcl elseif command provides additional conditional branching
in if expressions. It allows testing multiple conditions in a
single control structure. This makes code more readable and efficient.

## Basic Definition

The elseif command is used within an if block to
test additional conditions when previous conditions are false. It must appear
after an initial if and before any final else.

Syntax: if {condition1} {body1} elseif {condition2} {body2} else {body3}.
The elseif is optional and multiple can be chained together.

## Simple elseif Example

This example demonstrates basic usage of elseif to check multiple
conditions in sequence.

simple_elseif.tcl
  

set num 15

if {$num &lt; 10} {
    puts "Number is less than 10"
} elseif {$num &lt; 20} {
    puts "Number is between 10 and 20"
} else {
    puts "Number is 20 or greater"
}

The script checks if num is less than 10, between 10-20, or 20+.
Only the first true condition executes its body. Here it prints "between 10-20".

## Multiple elseif Conditions

This example shows how to chain multiple elseif conditions to
handle various cases.

multiple_elseif.tcl
  

set grade 85

if {$grade &gt;= 90} {
    puts "Grade: A"
} elseif {$grade &gt;= 80} {
    puts "Grade: B"
} elseif {$grade &gt;= 70} {
    puts "Grade: C"
} elseif {$grade &gt;= 60} {
    puts "Grade: D"
} else {
    puts "Grade: F"
}

This grading script checks multiple score ranges using elseif.
Conditions are evaluated top to bottom until one matches. Here it prints "Grade: B".

## String Comparison with elseif

elseif can also be used with string comparisons, not just numeric.

string_elseif.tcl
  

set color "blue"

if {$color eq "red"} {
    puts "Color is red"
} elseif {$color eq "green"} {
    puts "Color is green"
} elseif {$color eq "blue"} {
    puts "Color is blue"
} else {
    puts "Unknown color"
}

This script compares string values using the eq operator. The
elseif chain checks each possible color until finding a match.

## Nested if with elseif

elseif can be combined with nested if statements for
more complex logic.

nested_elseif.tcl
  

set age 25
set has_license 1

if {$age &lt; 18} {
    puts "Too young to drive"
} elseif {$age &gt;= 18} {
    if {$has_license} {
        puts "Can drive legally"
    } else {
        puts "Needs to get a license first"
    }
} else {
    puts "Invalid age"
}

This example first checks age, then within the elseif block,
nests another if to check license status. The logic flows clearly.

## Mathematical Conditions with elseif

elseif is useful for mathematical comparisons and calculations.

math_elseif.tcl
  

set x 5
set y 10

if {$x &gt; $y} {
    puts "x is greater than y"
} elseif {$x &lt; $y} {
    puts "x is less than y"
} else {
    puts "x and y are equal"
}

This script compares two numbers using elseif to determine their
relationship. The conditions cover all three possibilities (&gt;, &lt;, =) clearly.

## Complex Conditions with elseif

elseif can handle complex conditions using logical operators.

complex_elseif.tcl
  

set hour 14

if {$hour &lt; 12} {
    puts "Good morning"
} elseif {$hour &gt;= 12 &amp;&amp; $hour &lt; 18} {
    puts "Good afternoon"
} elseif {$hour &gt;= 18 &amp;&amp; $hour &lt; 22} {
    puts "Good evening"
} else {
    puts "Good night"
}

This greeting script uses compound conditions in elseif to check
time ranges. Logical AND (&amp;&amp;) combines conditions for precise
control flow.

## Best Practices

- **Order:** Place most likely conditions first for efficiency.

- **Readability:** Keep conditions simple and clear.

- **Braces:** Always use braces {} for condition expressions.

- **Default:** Include a final else for unhandled cases.

- **Formatting:** Indent consistently for better code structure.

 

This tutorial covered the Tcl elseif command with practical
examples showing its usage in different conditional scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).