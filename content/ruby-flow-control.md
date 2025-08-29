+++
title = "Ruby flow control"
date = 2025-08-29T20:03:08.966+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover flow control. Conditionals and loops alter the flow of a Ruby program."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../expressions/)
[Next](../arrays/)

# Ruby flow control

last modified October 18, 2023

In this part of the Ruby tutorial, we talk about the flow control. We
define several keywords that enable us to control the flow of a Ruby program.

Conditionals and loops alter the flow of a Ruby program. Conditionals are
keywords that execute a certain statement under a specific condition. Loops are
blocks of program that are executed multiple times. When the program is run, the
statements are executed from the top of the source file to the bottom. One by
one.

## Ruby if statement

The if keyword is used to check if an expression
is true. If it is true, a statement is then executed. The statement can
be a single statement or a compound statement. A compound statement
consists of multiple statements enclosed by the block. A block is code
enclosed by the end keyword. The then keyword
is optional.

if_statement.rb
  

#!/usr/bin/ruby

num = gets.to_i

if num &gt; 0 then

    puts "num variable is positive"
    puts "num variable equals to #{num}"
end

We read a number from a user. If the number is greater than
zero, then we print two messages to the console. If not, nothing
is done.

$ ./if_statement.rb
4
num variable is positive
num variable equals to 4

The condition is met and the message is written to the console.

We can use the else keyword to create a simple branch.
If the expression inside the square brackets following
the if keyword evaluates to false, the statement
following the else keyword is automatically executed.
The block of code is enclosed by the end keyword.

licence.rb
  

#!/usr/bin/ruby

age = 17

if age &gt; 18

    puts "Driving license issued"
else

    puts "Driving license not permitted"
end

We have an age variable.  The boolean expression
evaluates to false and we get "Driving license not permitted"
in the console.

$ ./licence.rb
Driving license not permitted

We can create multiple branches using the elsif keyword.
The elsif keyword tests for another condition if and only if
the previous condition was not met. Note that we can use multiple
elsif keywords in our tests.

branches.rb
  

#!/usr/bin/ruby

print "Enter a number: "

num = gets.to_i

if num &lt; 0

    puts "#{num} is negative"
elsif num == 0

   puts "#{num} is zero"
elsif num &gt; 0

   puts "#{num} is positive"
end

We have a numerical variable and we test it if it is a negative number or
positive or if it equals to zero. Depending on the value read from the user,
we print one of the messages to the console.

## Ruby case statement

The case statement is a selection control flow statement.
It allows the value of a variable or expression to control the flow of program
execution via a multi way branch. It creates multiple branches in a simpler way
than using the combination of if, elsif
statements.

We have a variable or an expression. The case keyword is used
to test a value from the variable or the expression against a list of values.
The list of values is presented with the when keyword.
If the values match, the statement following the when is executed.
There is an optional else statement. It is executed if no other
match is found.

domains.rb
  

#!/usr/bin/ruby

print "Enter top level domain: "

domain = gets.chomp

case domain
    when "us"
        puts "United States"
    when "de"
        puts "Germany"
    when "sk"
        puts "Slovakia"
    when "hu"
        puts "Hungary"
    else
        puts "Unknown"
end

In our program, we have a domain variable. We read a value for the variable
from the command line. We use the when statement to
test for the value of the variable. There are several options. If the value
equals for example to "us", the "United States" string is printed to the console.

domain = gets.chomp

We get an input from the user with the gets method.
The input also includes the newline character. The newline is excluded with the
chomp method.

$ ./domains.rb
Enter top level domain: hu
Hungary

We have entered "hu" string to the console and the program responded with "Hungary".

## Ruby while, until statements

The while statement is a control flow statement
that allows code to be executed repeatedly based on a given boolean condition.
It executes the code while the condition is true.

The while keyword executes the statements inside the
block enclosed by the end keyword. The statements are executed each time
the expression is evaluated to true.

while_statement.rb
  

#!/usr/bin/ruby

i = 0
sum = 0

while i &lt; 10  do
   i = i + 1
   sum = sum + i
end

puts "The sum of 0..9 values is #{sum}"

In the code example, we calculate the sum of values from a range of numbers.

The while loop has three parts: initialization, testing and
updating. Each execution of the statement is called a cycle.

i = 0
sum = 0

We initiate the i and the sum variables. The
i is used as a counter.

while i &lt; 10  do
   ...
end

The expression between the while and do keywords
is the second phase, the testing. Note that the do keyword is
optional. The statements in the body are executed until the expression is
evaluated to false.

i = i + 1

This is the last, third phase of the while loop — the updating. We
increment the counter. Note that improper handling of the while
loops may lead to endless cycles.

$ ./while_statement.rb
The sum of 0..9 values is 55

The until is a control flow statement which executes code
while the condition is false. The loop stops when the condition is
true.

until_statement.rb
  

#!/usr/bin/ruby

hours_left = 12

until hours_left == 0

    if hours_left == 1
        puts "There is #{hours_left} hour left"
    else
        puts "There are #{hours_left} hours left"
    end

    hours_left -= 1
end

In our example, we have a variable hours_left. We
begin a count down. In each loop cycle, we print how many hours
are left there. When the variable equals zero, the loop is stopped.

$ ./until_statement.rb
There are 12 hours left
There are 11 hours left
There are 10 hours left
There are 9 hours left
There are 8 hours left
There are 7 hours left
There are 6 hours left
There are 5 hours left
There are 4 hours left
There are 3 hours left
There are 2 hours left
There is 1 hour left

Running the example we get this outcome.

## Ruby for statement

When the number of cycles is know before the loop is initiated,
we can use the for statement. The for loop is used in
conjunction with ranges. For each element of a range a block of statements is
executed. The statements are enclosed with the end keyword.
The do keyword is optional.

for_loop.rb
  

#!/usr/bin/ruby

for i in 0..9 do

    puts "#{i}"
end

In this example, we print numbers 0..9 to the console. In each of the loops
the i variable holds a value from a range of numbers. The value is printed
to the console. The .. range operator creates a list of numbers,
including the last number.

$ ./for_loop.rb
0
1
2
3
4
5
6
7
8
9

To go through an array of elements using the for loop, we can use
the length method of the array.

for_loop2.rb
  

#!/usr/bin/ruby

planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter",
    "Saturn", "Uranus", "Neptune"]

for i in 0...planets.length

    puts planets[i]
end

In this example, we have an array of planets. We traverse the array
and print each element of the array.

planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter",
    "Saturn", "Uranus", "Neptune"]

This is an array of planets.

for i in 0...planets.length

The length method returns the length of the array.
Since arrays begin with 0, the last index is n-1. The ...
range operator creates a range of numbers, excluding the last high value.

puts planets[i]

We print the element having a specific index in the array.

$ ./for_loop2.rb
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

Running the above Ruby program gives this output.

## Ruby each method

In Ruby, we can use the each method to iterate through items of an
array. It takes two parameters. An element and a block. The element is put
between pipes. It is a placeholder for the item of the current iteration. The
block is the code which is executed on each iteration.

each_method.rb
  

#!/usr/bin/ruby

planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter",
    "Saturn", "Uranus", "Neptune"]

planets.each do |planet|

    puts planet
end

In this example, we go through an array of planets using the
each iterator.

planets.each do |planet|

    puts planet
end

The each iterator is a method which works on the planets
array. The planet is a placeholder for a current item of the iteration.
We could put there any character we wanted. We could use the
{} characters instead of do and end
keywords.

## Ruby break, next statements

The break statement can be used to terminate a block defined by
while, for or case statements.

break_statement.rb
  

#!/usr/bin/ruby

while true

    r = 1 + rand(30)
    print "#{r} "

    if r == 22
        break
    end
end

puts

We define an endless while loop. We use the break
statement to get out of this loop. We choose a random value from 1 to 30.
We print the value. If the value equals to 22, we finish the endless while loop.

while true
   ...
end

This is an endless cycle. The condition for the while loop is always true.
The only way to get out of this endless loop is to break out.

r = 1 + rand(30)
print "#{r} "

We compute a random number from 1 to 30 and print it to the console.

if r == 22
    break
end

If the number equals to 22, we break the loop. The while cycle terminates.

$ ./break_statement.rb
20 14 6 26 30 12 2 10 18 29 28 11 30 26 20 22

We might get something like this.

The next statement is used to skip a part of the loop and continue
with the next iteration of the loop. It can be used in combination with
for and while statements.

In the following example, we print a list of numbers that cannot be divided
by 2 without a remainder.

next_statement.rb
  

#!/usr/bin/ruby

num = 0

while num &lt; 100

    num += 1

    if (num % 2 == 0)
        next
    end

    print "#{num} "
end

puts

We iterate through numbers 1..99 with the while loop.

if (num % 2 == 0)
    next
end

If the expression num % 2 returns 0, the number in question
can be divided by 2. The next statement is executed and
the rest of the cycle is skipped. In our case, the last statement of
the loop is skipped and the number is not printed to the console.
The next iteration is started.

$ ./next_statement.rb
1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35 37 39
41 43 45 47 49 51 53 55 57 59 61 63 65 67 69 71 73 75 77
79 81 83 85 87 89 91 93 95 97 99

This is a sample output of the program.

## Ruby redo statement

The redo statement restarts an iteration of a loop,
without checking the loop condition. The last example will be a more complex one.
It will demonstrate the redo statement and other features as well.

redo_statement.rb
  

#!/usr/bin/ruby

options = ["rock", "scissors", "paper"]

while true

    print &lt;&lt;TEXT
1 - rock
2 - scissors
3 - paper
9 - end game
TEXT

    val = gets.to_i

    r = rand(3) + 1

    if val == 9
        puts "End"
        exit
    end

    if ![1, 2, 3, 9].include?(val)
        puts "Invalid option"
        redo
    end

    computer = options[r-1]
    human = options[val-1]

    puts "I have #{computer}, you have #{human}"

    if val == r
        puts "Tie, next throw"
        redo
    end

    if val == 1 and r == 2
        puts "Rock blunts scissors, you win"

    elsif val == 2 and r == 1
        puts "Rock blunts scissors, you loose"

    elsif val == 2 and r == 3
        puts "Scissors cut paper, you win"

    elsif val == 3 and r == 2
        puts "Scissors cut paper, you loose"

    elsif val == 3 and r == 1
        puts "Paper covers rock, you win"

    elsif val == 1 and r == 3
        puts "Paper covers rock, you loose"

    end
end

We have a simple Rock-paper-scissors game. In this code example,
we utilize the redo statement, conditionals, random numbers,
arrays and user input.

options = ["rock", "scissors", "paper"]

We have all possibilities of the game in the options array.
These three words will be used when printing messages to the console.

    print &lt;&lt;TEXT
1 - rock
2 - scissors
3 - paper
9 - end game
TEXT

We print the menu to the console using the heredoc syntax. The heredoc
starts with &lt;&lt; followed by a string. The same string
closes the construct; it must be left aligned. This allows us
to print multiple lines in one step. This menu is printed each game cycle.

val = gets.to_i

r = rand(3) + 1

In these code lines, we read a value from the terminal. Then we select
randomly a number among 1, 2, and 3. Note that rand(3) returns
a number from 0, 1, and 2. This is why we add 1.

if val == 9
    puts "End"
    exit
end

If the input from the user equals 9, we print 'End' to the terminal
and end the game. The exit method terminates the program.

if ![1, 2, 3, 9].include?(val)
    puts "Invalid option"
    redo
end

In case the user selects a different value than offered in the menu,
we inform about the invalid option and redo the cycle.

computer = options[r-1]
human = options[val-1]

puts "I have #{computer}, you have #{human}"

The numbers are transformed into strings. We print both the user's and the
computer's selection.

if val == r
    puts "Tie, next throw"
    redo
end

If both parties have the same option, there is a tie. We start a new game
cycle. We utilize the redo keyword.

if val == 1 and r == 2
    puts "Rock blunts scissors, you win"

elsif val == 2 and r == 1
    puts "Rock blunts scissors, you loose"
...

Using multiple if, elsif branches, we compare
the selections of the user and the computer. We decide, who is the winner.

$ ./redo_statement.rb
1 - rock
2 - scissors
3 - paper
9 - end game
3
I have paper, you have paper
Tie, next throw
1 - rock
2 - scissors
3 - paper
9 - end game
2
I have rock, you have scissors
Rock blunts scissors, you loose
1 - rock
2 - scissors
3 - paper
9 - end game
1
I have scissors, you have rock
Rock blunts scissors, you win
1 - rock
2 - scissors
3 - paper
9 - end game
9
End

This is a sample output.

In this part of the Ruby tutorial, we were talking about control
flow structures.

[Contents](..)
[Previous](../expressions/)
[Next](../arrays/)