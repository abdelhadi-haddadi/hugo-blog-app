+++
title = "Julia control flow"
date = 2025-08-29T20:02:18.283+01:00
draft = false
description = "Julia string tutorial shows how to work with strings in Julia. In Julia, a string is a finite sequence of characters."
image = ""
imageBig = ""
categories = ["julia"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Julia control flow

last modified October 20, 2023

In this article we talk about the flow control in Julia.

When a Julia program is run, the code is executed from top to bottom. The flow
of the program can be altered with various keywords, including if/elseif/else,
while and for.

## The if condition

The if keyword is used to check if an expression is true. If it is true, a
statement is then executed. The statement can be a single statement or a
compound statement. A compound statement consists of multiple statements
enclosed by the block. A block is code enclosed by curly brackets.

main.jl
  

r = rand(-5:5)
println(r)

if r &gt; 0
    println("The r variable is positive")
end

A random number is generated. If the number is greater than zero, we print a
message to the terminal.

r = rand(-5:5)

The rand function generates a random integer between -5 .. 5.

if r &gt; 0
  println("The r variable is positive")
end

Using the if keyword, we check if the generated number is greater than zero. The
if keyword is followed by an expression that evaluates to a boolean value. If
the boolean value is true then the block is executed. In our case, the string
*The r variable is positive* is printed to the terminal. If the random
value is negative, nothing is done. The block is terminated with
end keyword.

$ julia simple.jl
-4
$ julia simple.jl
1
The r variable is positive
$ julia simple.jl
4
The r variable is positive

## The else condition

We can use the else keyword to create a simple branch. If the
expression following the if keyword evaluates to false, the block
following the else keyword is automatically executed.

main.jl
  

r = rand(-5:5)

println(r)

if r &gt; 0
    println("The n variable is positive")
else
    print("The r variable is negative or zero")
end

Either the block following the if keyword is executed or the block
following the else keyword.

## The elseif condition

We can create multiple branches using elseif. It tests for another
condition if and only if the previous condition was not met.

Note that we can use multiple elseif keywords in our tests.

main.jl
  

r = rand(-5:5)

println(r)

if r &gt; 0
    println("The r is positive")
elseif r == 0
    println("The r is zero")
else
    println("The r is negative")
end

If the first condition evaluates to true, e.g. the random value is greater than
zero, the first block is executed and the remaining two blocks are skipped. If
the first condition is not met, then the second condition following the
elseif keyword is checked. If the second condition evaluates to
true, the second block is executed. If not, the third block following the else
keyword is executed. The else block is always executed if the previous
conditions were not met.

$ julia main.jl
4
The r is positive
$ julia main.jl
5
The r is positive
$ julia main.jl
0
The r is zero
$ julia main.jl
-1
The r is negative

## The while loop

The while keyword is used to create a cycle. The statements inside
the while loop are executed until the expression evaluates to false.

main.jl
  

vals = [22, 34, 12, 32, 4]

let i = length(vals)

    mysum = 0

    while i != 1

        i -= 1
        mysum = mysum + vals[i]
    end

    println("The sum is: ", mysum)
end

We want to calculate the sum of all values in the vals array. We
utilize the while loop. We determine the length of the list with
length function. The while loop is executed over and over again,
until the i is equal to one. In the body of the loop, we decrement the counter
and calculate the sum of values.

$ julia whilestm.jl
The sum is: 100

## The break keyword

The break keyword is used to interrupt the cycle if needed.

main.jl
  

while true

    r = rand(1:30)
    print("$r ")

    if r == 22
        break
    end
end

println()

In our example, we print random integer numbers. If the number equals to 22, the
cycle is interrupted with the break keyword. The while true creates
an endless cycle. The break is used to jump out of this endless cycle.

$ julia breakstm.jl
15 7 24 27 7 22

## The continue keyword

The continue statement is used to interrupt the current cycle
without jumping out of the whole cycle. It initiates a new cycle.

main.jl
  

let num = 0

    while num &lt; 1000

        num = num + 1

        if num % 2 == 0
            continue
        end

        print("$num ")
    end
end

println()

In the example we print all numbers smaller than 1000 that cannot be divided by
number 2 without a remainder.

if num % 2 == 0
    continue
end

When the number can be divided by 2 without a remainder, we call continue and
the cycle is interrupted and a new one is started. As a consequence, the number
is not printed.

## The for loop

The for/in keywords are used to iterate over a sequence. The
sequence can be a collection, a string, or a range. 

main.jl
  

words = ["sky", "summer", "winter", "war", "rock"]

for word in words
    println(word)
end

println("---------------------------------")

for word = words
    println(word)
end

println("---------------------------------")

word = "falcon"

for e in word
    println(e)
end

println("---------------------------------")

for e in range(1,5)
    println(e)
end

The program uses a for loop to iterate over sequences.

words = ["sky", "summer", "winter", "war", "rock"]

We define an array of words.

for word in words
    println(word)
end

We go over the array element by element with for/in and print each
element to the console.

for word = words
    println(word)
end

Julia has also an alternative syntax: for/=.

word = "falcon"

for e in word
    println(e)
end

Here we iterate over string characters.

for e in range(1,5)
    println(e)
end

We go over a range of values created with range.

$ julia main.jl
sky
summer
winter
war
rock
---------------------------------
sky
summer
winter
war
rock
---------------------------------
f
a
l
c
o
n
---------------------------------
1
2
3
4
5

## Source

[Julia control flow documentation](https://docs.julialang.org/en/v1/manual/control-flow/)

In this article we have worked with program control flow in Julia.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Julia tutorials](/all/#julia).