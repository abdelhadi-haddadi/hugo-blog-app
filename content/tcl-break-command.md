+++
title = "Tcl break Command"
date = 2025-08-29T20:12:52.376+01:00
draft = false
description = "Tcl break command tutorial shows how to exit loops in Tcl. Learn break with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl break Command

last modified April 3, 2025

The Tcl break command is used to exit from loops prematurely. It
terminates the innermost enclosing loop and continues execution after the loop.
The command is essential for controlling loop execution flow.

## Basic Definition

The break command immediately terminates the current loop's
execution. It works with while, for, and foreach
loops. The program continues with the next command after the loop.

Syntax: break. The command takes no arguments and has no return
value. It simply transfers control out of the current loop structure.

## Basic While Loop Break

This example demonstrates using break to exit a while
loop when a condition is met.

basic_break.tcl
  

set count 0
while {1} {
    puts "Count is $count"
    incr count
    if {$count &gt; 5} {
        break
    }
}
puts "Loop exited"

This creates an infinite loop with while {1} that would run forever.
The break command exits the loop when count exceeds 5. The message
after the loop confirms exit.

## For Loop with Break

This example shows break used within a for loop to
exit when finding a specific value.

for_break.tcl
  

for {set i 0} {$i &lt; 10} {incr i} {
    if {$i == 7} {
        puts "Found 7, breaking loop"
        break
    }
    puts "Current value: $i"
}
puts "After loop"

The loop normally runs from 0 to 9, but exits early when i equals 7. The
break command stops the loop immediately, skipping remaining
iterations. Control passes to the statement after the loop.

## Nested Loops with Break

This demonstrates how break only affects the innermost loop when
used in nested loop structures.

nested_break.tcl
  

for {set i 1} {$i &lt;= 3} {incr i} {
    puts "Outer loop: $i"
    for {set j 1} {$j &lt;= 3} {incr j} {
        if {$j == 2} {
            puts "  Breaking inner loop at j=2"
            break
        }
        puts "  Inner loop: $j"
    }
}

The outer loop runs completely, but the inner loop breaks when j equals 2.
The break only affects the inner for loop. The outer
loop continues its normal execution.

## Break in Foreach Loop

This example shows break used with a foreach loop to
stop processing a list when a condition is met.

foreach_break.tcl
  

set colors {red green blue yellow orange}
foreach color $colors {
    if {$color eq "blue"} {
        puts "Found blue, stopping"
        break
    }
    puts "Processing $color"
}
puts "Done"

The loop processes each color in the list until it finds "blue". At that point,
break exits the loop. Colors after "blue" in the list are not
processed. The message after confirms loop exit.

## Break with Conditional Logic

This example combines break with more complex conditional logic to
exit a loop based on multiple factors.

conditional_break.tcl
  

set total 0
while {1} {
    puts -nonewline "Enter a number (0 to exit): "
    flush stdout
    gets stdin num
    if {$num == 0} {
        break
    }
    if {$num &lt; 0} {
        puts "Negative numbers not allowed"
        continue
    }
    set total [expr {$total + $num}]
    puts "Current total: $total"
}
puts "Final total: $total"

This interactive example sums numbers until the user enters 0. The break
exits the loop when 0 is entered. Negative numbers trigger continue
to skip that iteration. The final total displays after loop exit.

## Break in Switch Statement

This example shows how break behaves differently in a switch
statement compared to loops.

switch_break.tcl
  

set value 3
switch $value {
    1 {
        puts "Case 1"
        break
    }
    2 {
        puts "Case 2"
        break
    }
    3 {
        puts "Case 3"
        # No break here
    }
    4 {
        puts "Case 4"
        break
    }
    default {
        puts "Default case"
        break
    }
}
puts "After switch"

In switch, break prevents fall-through to the next
case. Without break, execution continues to the next case. Here,
case 3 has no break, so case 4 would execute if present. The
message after confirms switch completion.

## Best Practices

- **Use Sparingly:** Minimize break usage for clearer code flow.

- **Clear Conditions:** Make break conditions obvious and documented.

- **Avoid Deep Nesting:** Consider restructuring deeply nested loops.

- **Alternative Logic:** Sometimes loop conditions can replace breaks.

- **Comments:** Add comments explaining why break is necessary.

 

This tutorial covered the Tcl break command with practical
examples showing its usage in different loop structures and scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).