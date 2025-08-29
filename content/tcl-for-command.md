+++
title = "Tcl for Command"
date = 2025-08-29T20:12:59.032+01:00
draft = false
description = "Tcl for command tutorial shows how to create loops in Tcl. Learn for with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl for Command

last modified April 3, 2025

The Tcl for command is used to create loops that execute a block
of code repeatedly. It's one of the primary looping constructs in Tcl. The
command provides initialization, condition, and increment sections.

## Basic Definition

The for command executes a script repeatedly while a condition is
true. It combines initialization, condition checking, and iteration in one
construct.

Syntax: for start test next body. The start script
initializes variables. The test expression determines when to stop.
The next script updates variables after each iteration.

## Basic for Loop

This example shows the simplest usage of for to count from 1 to 5.

basic_for.tcl
  

for {set i 1} {$i &lt;= 5} {incr i} {
    puts "Iteration $i"
}

This creates a loop that initializes i to 1, continues while
i is less than or equal to 5, and increments i after
each iteration. The loop body prints the current iteration number.

## Counting Down

The for loop can count downward by using a negative increment.

count_down.tcl
  

for {set i 5} {$i &gt;= 1} {incr i -1} {
    puts "Countdown: $i"
}

This example counts down from 5 to 1. The incr command with -1
as the second argument decrements the variable. The condition checks when
i is greater than or equal to 1.

## Iterating Over a List

A for loop can iterate over a list by combining it with
llength and lindex.

list_iteration.tcl
  

set colors {red green blue yellow}
for {set i 0} {$i &lt; [llength $colors]} {incr i} {
    puts "Color [expr {$i + 1}]: [lindex $colors $i]"
}

This demonstrates how to process each element in a list. The loop uses the
list length as the termination condition. lindex retrieves each
element by its index position.

## Nested for Loops

for loops can be nested to handle multi-dimensional iterations.

nested_for.tcl
  

for {set i 1} {$i &lt;= 3} {incr i} {
    for {set j 1} {$j &lt;= 3} {incr j} {
        puts "i=$i, j=$j"
    }
}

This shows two nested loops creating a 3x3 grid of combinations. The outer
loop runs three times, and for each iteration, the inner loop also runs three
times. This produces nine total iterations.

## Loop With Multiple Variables

The initialization and increment sections can handle multiple variables.

multi_var.tcl
  

for {set i 1; set j 10} {$i &lt;= 5} {incr i; incr j -2} {
    puts "i=$i, j=$j, sum=[expr {$i + $j}]"
}

This example manages two variables in the loop. i counts up while
j counts down. The initialization and increment sections use
semicolons to separate multiple commands. The loop body calculates their sum.

## Infinite Loop With Break

A for loop can run indefinitely until a break condition.

infinite_loop.tcl
  

set count 0
for {} {1} {incr count} {
    puts "Count: $count"
    if {$count &gt;= 5} {
        break
    }
}

This creates an infinite loop by using 1 (always true) as the condition. The
loop breaks when count reaches 5. This pattern is useful when the
termination condition is complex or determined within the loop body.

## Best Practices

- **Initialization:** Keep initialization code in the start section.

- **Braces:** Use braces {} for expressions to prevent substitution.

- **Complex Logic:** Consider while for complex termination logic.

- **Performance:** Minimize work in the test condition.

- **Readability:** Keep loop bodies short for clarity.

 

This tutorial covered the Tcl for command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).