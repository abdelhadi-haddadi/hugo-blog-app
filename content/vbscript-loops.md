+++
title = "VBScript Loops"
date = 2025-08-29T20:15:18.780+01:00
draft = false
description = "VBScript loops tutorial shows how to use loops in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Loops

last modified February 19, 2025

In this article, we will learn how to use loops in VBScript. Loops allow you to
execute a block of code repeatedly. We will use WScript.Echo to
output results and run the scripts using cscript.

## For...Next Loop

The For...Next loop is used to execute a block of code a specific
number of times.

for_next_loop.vbs
  

Dim i

For i = 1 To 5
    WScript.Echo "Iteration: " &amp; i
Next

This example uses a For...Next loop to output the iteration number
five times.

## For Each...Next Loop

The For Each...Next loop is used to iterate through each element in
a collection or array.

for_each_loop.vbs
  

Dim fruits(2)
fruits(0) = "Apple"
fruits(1) = "Banana"
fruits(2) = "Cherry"

Dim fruit

For Each fruit In fruits
    WScript.Echo "Fruit: " &amp; fruit
Next

This example iterates through the fruits array and outputs each
element.

## Do While...Loop

The Do While...Loop executes a block of code as long as a condition
is true.

do_while_loop.vbs
  

Dim counter
counter = 1

Do While counter &lt;= 5
    WScript.Echo "Counter: " &amp; counter
    counter = counter + 1
Loop

This example uses a Do While...Loop to output the value of
counter until it reaches 5.

## Do Until...Loop

The Do Until...Loop executes a block of code until a condition
becomes true.

do_until_loop.vbs
  

Dim number
number = 1

Do Until number &gt; 5
    WScript.Echo "Number: " &amp; number
    number = number + 1
Loop

This example uses a Do Until...Loop to output the value of
number until it exceeds 5.

## While...Wend Loop

The While...Wend loop is similar to Do While...Loop
but is less flexible.

The While...Wend loop only allows for a simple conditional check at
the beginning of the loop. This means that it can only exit at the start of the
loop and lacks the ability to control the flow dynamically within the loop.

while_wend_loop.vbs
  

Dim count
count = 1

While count &lt;= 5
    WScript.Echo "Count: " &amp; count
    count = count + 1
Wend

This example uses a While...Wend loop to output the value of
count until it reaches 5.

## Nested Loops

You can nest loops to create more complex iterations.

nested_loops.vbs
  

Dim i, j

For i = 1 To 3
    For j = 1 To 2
        WScript.Echo "i: " &amp; i &amp; ", j: " &amp; j
    Next
Next

This example uses nested For...Next loops to output the values of
i and j.

## Exit Loop

You can exit a loop prematurely using the Exit statement.

exit_loop.vbs
  

Dim k

For k = 1 To 10
    If k = 6 Then
        Exit For
    End If
    WScript.Echo "k: " &amp; k
Next

This example exits the For...Next loop when k equals 6.

## Loop with Step

The Step keyword allows you to specify the increment for a loop.

loop_with_step.vbs
  

Dim m

For m = 1 To 10 Step 2
    WScript.Echo "m: " &amp; m
Next

This example uses a For...Next loop with a Step of 2
to output odd numbers between 1 and 10.

In this article, we explored how to use loops in VBScript. We covered
For...Next, For Each...Next, Do While...Loop,
Do Until...Loop, While...Wend, nested loops, exiting
loops, and loops with Step. Loops are essential for repeating tasks
and iterating through collections or arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).