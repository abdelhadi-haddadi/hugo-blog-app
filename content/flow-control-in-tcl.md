+++
title = "Flow control in Tcl"
date = 2025-08-29T20:03:14.787+01:00
draft = false
description = "This chapter of the Tcl tutorial covers flow control. It mentions the if, else, while, for, and foreach commands."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../expressions/)
[Next](../strings/)

# Flow control in Tcl

last modified October 18, 2023

In this part of the Tcl tutorial, we talk about the flow control.
We define several commands that enable us to control the flow of 
a Tcl script. 

In Tcl language there are several commands that are used
to alter the flow of a program. When a program is run, its commands 
are executed from the top of the source file to the bottom. One by one. 
This flow can be altered by specific commands. Commands can be executed
multiple times. Some commands are conditional. They
are executed only if a specific condition is met. 

## The if command

The if command has the following general form:

if expr1 ?then? body1 elseif expr2 ?then? body2 elseif ... ?else? ?bodyN?

The if command is used to check if an expression 
is true. If it is true, a body of command(s) is then executed. 
The body is enclosed by curly brackets.

The if command evaluates an expression. The expression must return 
a boolean value. In Tcl, 1, yes, true mean true and 0, no, false mean
false. 

!/usr/bin/tclsh

if yes {
    puts "This message is always shown"
}

In the above example, the body enclosed by { } characters is always 
executed. 

#!/usr/bin/tclsh

if true then {
    puts "This message is always shown"
}

The then command is optional. We can use it if we think, it
will make the code more clear. 

We can use the else command to create a simple branch. 
If the expression inside the square brackets following the if command 
evaluates to false, the command following the else 
command is automatically executed. 

#!/usr/bin/tclsh

set sex female

if {$sex == "male"} {

    puts "It is a boy"
} else {

    puts "It is a girl"
}

We have a sex variable. It has "female" string. The boolean expression 
evaluates to false and we get "It is a girl" in the console.  

$ ./girlboy.tcl 
It is a girl

We can create multiple branches using the elseif command.
The elseif command tests for another condition, if and only if 
the previous condition was not met. Note that we can use multiple 
elseif commands in our tests.

#!/usr/bin/tclsh

# nums.tcl

puts -nonewline "Enter a number: "
flush stdout
set a [gets stdin]

if {$a &lt; 0} {

    puts "the number is negative"
} elseif { $a == 0 } {

    puts "the numer is zero"
} else {

    puts "the number is positive"
}

In the above script we have a prompt to enter a value. We test the value 
if it is a negative number or positive or if it equals to zero. If the first 
expression evaluates to false, the second expression is evaluated. 
If the previous conditions were not met, then the body following the 
else command would be executed.

$ ./nums.tcl 
Enter a number: 2
the number is positive
$ ./nums.tcl 
Enter a number: 0
the numer is zero
$ ./nums.tcl 
Enter a number: -3
the number is negative

Running the example multiple times. 

## The switch command

The switch command matches its string argument against each of the pattern 
arguments in order. As soon as it finds a pattern that matches the string it 
evaluates the following body argument by passing it recursively to the Tcl 
interpreter and returns the result of that evaluation. If the last pattern 
argument is default then it matches anything. If no pattern argument matches 
string and no default is given, then the switch command returns an empty string.

#!/usr/bin/tclsh

# switch_cmd.tcl

puts -nonewline "Select a top level domain name:"
flush stdout

gets stdin domain

switch $domain {

    us { puts "United States" }
    de { puts Germany }
    sk { puts Slovakia }
    hu { puts Hungary }
    default { puts "unknown" }
}

In our script, we prompt for a domain name. There are several options. If the value 
equals for example to us the "United States" string is printed to the console. 
If the value does not match to any given value, the default body is executed and
unknown is printed to the console. 

$ ./switch_cmd.tcl 
Select a top level domain name:sk
Slovakia

We have entered sk string to the console and the program responded with Slovakia.

## The while command

The while command is a control flow command 
that allows code to be executed repeatedly based on a given boolean condition. 

The while command executes the commands inside the
block enclosed by curly brackets. The commands are executed each time 
the expression is evaluated to true. 

#!/usr/bin/tclsh

# whileloop.tcl

set i 0
set sum 0

while { $i &lt; 10 } {

    incr i
    incr sum $i
}

puts $sum

In the code example, we calculate the sum of values from a range of numbers.

The while loop has three parts: initialization, testing, and 
updating. Each execution of the command is called a cycle. 

set i 0

We initiate the i variable. It is used as a counter.

while { $i &lt; 10 } {
...
}

The expression inside the curly brackets following the while
command is the second phase, the testing. The commands in the body are 
executed, until the expression is evaluated to false. 

incr i

The last, third phase of the while loop is the updating. The counter
is incremented. Note that improper handling of the while loops may lead
to endless cycles. 

## The for command

When the number of cycles is know before the loop is initiated, 
we can use the for command. In this construct 
we declare a counter variable, which is automatically increased 
or decreased in value during each repetition of the loop.

#!/usr/bin/tclsh

for {set i 0} {$i &lt; 10} {incr i} {
    puts $i
}

In this example, we print numbers 0..9 to the console. 

for {set i 0} {$i &lt; 10} {incr i} {
    puts $i
}

There are three phases. First, we initiate the counter i to zero.
This phase is done only once. Next comes the condition. If the 
condition is met, the command inside the for block is executed.
Then comes the third phase; the counter is increased. Now we repeat
phases 2 and 3 until the condition is not met and the for loop
is left. In our case, when the counter i is equal to 10, 
the for loop stops executing.

$ ./forloop.tcl 
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

Here we see the output of the forloop.tcl script.

## The foreach command

The foreach command simplifies traversing over 
collections of data. It has no explicit counter. It goes through a list 
element by element and the current value is copied to a variable 
defined in the construct.

#!/usr/bin/tclsh

set planets { Mercury Venus Earth Mars Jupiter Saturn
    Uranus Neptune }

foreach planet $planets {
    puts $planet
}

In this example, we use the foreach command to go
through a list of planets. 

foreach planet $planets {
    puts $planet
}

The usage of the foreach command is straightforward.
The planets is the list that we iterate through. 
The planet is the temporary variable that has the current 
value from the list. The foreach command goes through all the planets 
and prints them to the console. 

$ ./planets.tcl 
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

Running the above Tcl script gives this output.

#!/usr/bin/tclsh

set actresses { Rachel Weiss Scarlett Johansson Jessica Alba \
    Marion Cotillard Jennifer Connelly}

foreach {first second} $actresses {
    puts "$first $second"
}

In this script, we iterate througn pairs of values of a list.

foreach {first second} $actresses {
    puts "$first $second"
}

We pick two values from the list at each iteration. 

$ ./actresses.tcl 
Rachel Weiss
Scarlett Johansson
Jessica Alba
Marion Cotillard
Jennifer Connelly

```
#!/usr/bin/tclsh

foreach i { one two three } item {car coins rocks} {
    puts "$i $item"
}

```

We can iterate over two lists in parallel. 

$ ./parallel.tcl 
one car
two coins
three rocks

## The break and continue commands

The break command can be used to terminate 
a block defined by while, for,
or switch commands.

#!/usr/bin/tclsh

while true {

    set r [expr 1 + round(rand()*30)]
    puts -nonewline "$r "

    if {$r == 22} { break }
}

puts ""

We define an endless while loop. We use the break 
command to get out of this loop. We choose a random value from 1 to 30 and print it. 
If the value equals to 22, we finish the endless while loop. 

set r [expr 1 + round(rand()*30)]

Here we calculate a random number between 1..30. The rand is a built-in
Tcl procedure. It returns a random number from 0 to 0.99999. 
The rand()*30 returns a random number between 0 to 29.99999.
The round procedure rounds the final number.

$ ./breakcommand.tcl 
28 20 8 8 12 22 

We might get something like this.

The continue command is used to skip a
part of the loop and continue with the next iteration of the loop.
It can be used in combination with for and 
while commands. 

In the following example, we print a list of numbers 
that cannot be divided by 2 without a remainder. 

#!/usr/bin/tclsh

set num 0

while { $num &lt; 100 } {

    incr num

    if {$num % 2 == 0} { continue }
 
    puts "$num "
}

puts ""

We iterate through numbers 1..99 with the while loop.

if {$num % 2 == 0} { continue }

If the expression num % 2 returns 0, the number in question can be 
divided by 2. The continue command is executed and the rest of the 
cycle is skipped. In our case, the last command of the loop is skipped and the 
number is not printed to the console. The next iteration is started. 

In this part of the Tcl tutorial, we were talking about control 
flow structures. 

[Contents](..) 
[Previous](../expressions/)
[Next](../strings/)