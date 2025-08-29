+++
title = "Tcl while Command"
date = 2025-08-29T20:13:19.261+01:00
draft = false
description = "Tcl while command tutorial shows how to create loops in Tcl. Learn while with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl while Command

last modified April 3, 2025

The Tcl while command creates a loop that executes as long as a
condition remains true. It's a fundamental control structure in Tcl for
repetitive tasks. The loop continues until the condition evaluates to false.

## Basic Definition

The while command evaluates an expression and executes a body of
code repeatedly while the expression is true. The syntax is:
while test body.

The test is a boolean expression. The body contains
Tcl commands to execute. The body must be enclosed in braces or quotes.

## Simple Counter Loop

This example demonstrates a basic while loop that counts from 1 to 5.

basic_while.tcl
  

set count 1
while {$count &lt;= 5} {
    puts "Count is $count"
    incr count
}

The loop starts with count=1 and continues while count ≤ 5. The incr
command increments the counter. Each iteration prints the current count value.

## Summing Numbers

This example calculates the sum of numbers from 1 to 10 using a while loop.

while_sum.tcl
  

set sum 0
set i 1
while {$i &lt;= 10} {
    set sum [expr {$sum + $i}]
    incr i
}
puts "The sum is $sum"

We initialize sum to 0 and i to 1. The loop adds each value of i to sum while
i ≤ 10. After the loop, we print the total sum (which should be 55).

## Reading Until Condition

This example reads input from the user until they enter "quit".

while_input.tcl
  

set input ""
while {$input ne "quit"} {
    puts -nonewline "Enter text (quit to exit): "
    flush stdout
    gets stdin input
    puts "You entered: $input"
}

The loop continues as long as input is not equal to "quit". The gets
command reads user input. flush stdout ensures the prompt appears
immediately.

## Infinite Loop with Break

This shows how to create an infinite loop that can be exited with a break.

while_infinite.tcl
  

set count 0
while {1} {
    incr count
    puts "Iteration $count"
    if {$count &gt;= 5} {
        break
    }
}

The condition {1} is always true, creating an infinite loop. We use
break to exit when count reaches 5. This pattern is useful when the
exit condition is complex or occurs mid-loop.

## Nested While Loops

This example demonstrates nested while loops to create a multiplication table.

while_nested.tcl
  

set i 1
while {$i &lt;= 5} {
    set j 1
    while {$j &lt;= 5} {
        set product [expr {$i * $j}]
        puts -nonewline [format "%4d" $product]
        incr j
    }
    puts ""
    incr i
}

The outer loop controls rows (i), while the inner loop controls columns (j). We
calculate each product and format the output neatly. The result is a 5x5
multiplication table.

## Loop Control with Continue

This example shows how to skip iterations using the continue command.

while_continue.tcl
  

set num 0
while {$num &lt; 10} {
    incr num
    if {$num % 2 == 0} {
        continue
    }
    puts "$num is odd"
}

The loop prints only odd numbers between 1 and 10. When num is even, the
continue command skips the rest of the iteration. This shows
how to selectively process items in a loop.

## Best Practices

- **Braces:** Always use braces for the condition and body.

- **Variables:** Initialize loop variables before the while.

- **Termination:** Ensure the loop will eventually terminate.

- **Complex Conditions:** Use expr for complex conditions.

- **Performance:** Minimize work inside the loop when possible.

 

This tutorial covered the Tcl while command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).