+++
title = "Tcl continue Command"
date = 2025-08-29T20:12:54.602+01:00
draft = false
description = "Tcl continue command tutorial shows how to control loops in Tcl. Learn continue with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl continue Command

last modified April 3, 2025

The Tcl continue command is used to skip the current iteration of
a loop. It immediately jumps to the next iteration without executing the
remaining commands in the loop body.

## Basic Definition

The continue command is a loop control command that works with
while, for, and foreach loops. When
executed, it skips to the next iteration.

Syntax: continue. It takes no arguments and has no return value.
It can only be used within the body of a loop.

## Basic continue in while Loop

This example demonstrates the simplest usage of continue in a
while loop to skip even numbers.

basic_continue.tcl
  

set i 0
while {$i &lt; 10} {
    incr i
    if {$i % 2 == 0} {
        continue
    }
    puts "Odd number: $i"
}

The loop prints only odd numbers between 1 and 10. When $i is even,
continue skips the puts command and jumps to the next
iteration.

## continue in for Loop

This example shows continue in a for loop to skip
specific values.

continue_for.tcl
  

for {set i 1} {$i &lt;= 5} {incr i} {
    if {$i == 3} {
        continue
    }
    puts "Processing item $i"
}

The loop processes numbers 1 through 5 but skips number 3 using the
continue command. The output shows all numbers except 3.

## continue in foreach Loop

This example uses continue in a foreach loop to skip
certain elements in a list.

continue_foreach.tcl
  

set fruits {apple banana cherry date elderberry}
foreach fruit $fruits {
    if {[string length $fruit] &gt; 6} {
        continue
    }
    puts "Short fruit name: $fruit"
}

The loop processes each fruit in the list but skips fruits with names longer
than 6 characters. Only shorter fruit names are printed.

## continue with Nested Loops

This example demonstrates how continue affects only the innermost
loop when used in nested loops.

continue_nested.tcl
  

for {set i 1} {$i &lt;= 3} {incr i} {
    puts "Outer loop iteration $i"
    for {set j 1} {$j &lt;= 3} {incr j} {
        if {$j == 2} {
            continue
        }
        puts "  Inner loop value: $j"
    }
}

The outer loop runs three times. The inner loop skips the iteration where
$j equals 2. The continue only affects the inner
loop where it appears.

## continue with Conditional Logic

This example shows continue used with more complex conditional
logic to filter data.

continue_conditional.tcl
  

set numbers {12 7 15 3 20 8 11}
foreach num $numbers {
    if {$num &lt; 10} {
        continue
    }
    if {$num % 2 == 0} {
        puts "$num is even and &gt;= 10"
    } else {
        puts "$num is odd and &gt;= 10"
    }
}

The loop processes numbers in the list but skips any number less than 10.
For numbers 10 or greater, it checks whether they're even or odd and prints
an appropriate message.

## continue in Error Handling

This example demonstrates using continue to handle potential
errors in loop processing.

continue_error.tcl
  

set values {5 0 8 "text" 10}
foreach val $values {
    if {![string is integer $val]} {
        puts "Skipping non-integer value: $val"
        continue
    }
    if {$val == 0} {
        puts "Cannot divide by zero"
        continue
    }
    set result [expr {100 / $val}]
    puts "100 / $val = $result"
}

The loop attempts to divide 100 by each value. It skips non-integer values
and zero values using continue. This prevents errors while
processing the remaining valid values.

## Best Practices

- **Clarity:** Use continue when it makes the code clearer than nested ifs.

- **Early Exit:** Place continue conditions early in the loop body.

- **Comments:** Add comments explaining why you're skipping iterations.

- **Alternatives:** Consider if a different loop structure might be clearer.

- **Performance:** Use continue judiciously as it's not a performance optimization.

 

This tutorial covered the Tcl continue command with practical
examples showing its usage in different loop scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).