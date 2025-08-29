+++
title = "Arrays in Tcl"
date = 2025-08-29T20:03:13.665+01:00
draft = false
description = "In this part of the Tcl tutorial we cover Tcl arrays. We initiate arrays and read data from them."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../lists/)
[Next](../procedures/)

# Arrays in Tcl

last modified October 18, 2023

In this part of the Tcl programming tutorial, we cover arrays. 
We initiate arrays and read data from them.

A Tcl array is a collection of variables. Each variable may hold any value 
and the array is indexed by arbitrary values. The key-value pairs are unordered.
A Tcl array is an associative array. 

## Creating arrays

Tcl arrays can be created with the set or array set commands.

#!/usr/bin/tclsh

set names(1) Jane
set names(2) Tom
set names(3) Elisabeth
set names(4) Robert
set names(5) Julia
set names(6) Victoria

puts [array exists names]
puts [array size names]

puts $names(1)
puts $names(2)
puts $names(6)

We create an array called names. The numbers are keys and the names are
values of the array. 

set names(1) Jane

In this line we set a value Jane to the array key 1. We can later
refer to the value by the key. 

puts [array exists names]

The array exists command determines whether the provided
argument is an array.

puts [array size names]

We get the size of the array with the array size command. 

puts $names(1)

We access a value from the array by its key. 

$ ./names.tcl
1
6
Jane
Tom
Victoria

In the second example, an array is created with the 
array set command. 

#!/usr/bin/tclsh

array set days {
    1 Monday
    2 Tuesday
    3 Wednesday
    4 Thursday
    5 Friday
    6 Saturday
    7 Sunday
}

set n [array size days]

puts $days(1)
puts "array has $n elements" 

We create a days array. It has 7 key-value pairs. 

$ ./days.tcl 
Monday
array has 7 elements

Example output. 

## Arrays are collections of variables

Unlike in lists or dictionaries, items in arrays are
variables. This means that we can make references to 
them.

#!/usr/bin/tclsh

array set days {
    1 Monday
    2 Tuesday
    3 Wednesday
    4 Thursday
    5 Friday
    6 Saturday
    7 Sunday
}

upvar #0 days(1) mon
upvar #0 days(2) tue
upvar #0 days(3) wed

puts $mon
puts $tue
puts $wed

In the script three variables of the days array 
are referenced with the upvar command.

upvar #0 days(1) mon

The mon variable references the variable indexed with 1.
The first argument of the upvar command is the uplevel, where 
#0 means the toplevel. That is, both the days
array and the mon variable reside in the same global namespace.

puts $mon

Here we refer to an item of the days array via the mon
variable.

$ ./colvar.tcl 
Monday
Tuesday
Wednesday

Example output.

## The array get command

The array get command returns a list containing pairs of elements of
the array.

#!/usr/bin/tclsh

array set days {
    Peter 34
    Jane 17
    Lucy 28
    Mark 43
    Anthony 36
}

puts [array get days]

The example creates an array and prints its key-value pairs with the 
array get command.

$ ./arrayget.tcl 
Peter 34 Anthony 36 Lucy 28 Jane 17 Mark 43

## Traversing arrays

In the following examples, we show how to traverse arrays.

#!/usr/bin/tclsh

array set days {
    1 Monday
    2 Tuesday
    3 Wednesday
    4 Thursday
    5 Friday
    6 Saturday
    7 Sunday
}

foreach {n day} [array get days] {

    puts "$n -&gt; $day"
}

The example creates an array and prints its key-value pairs with the 
array get command.

foreach {n day} [array get days] {

The array get command returns a list
of key, value elements, which can be iterated with the
foreach command. 

$ ./days2.tcl 
4 -&gt; Thursday
5 -&gt; Friday
1 -&gt; Monday
6 -&gt; Saturday
2 -&gt; Tuesday
7 -&gt; Sunday
3 -&gt; Wednesday

Here we have the output of the days2.tcl script.
Note that the pairs of elements are not ordered.

The following script uses the array names command
to traverse an array. 

#!/usr/bin/tclsh

array set nums { a 1 b 2 c 3 d 4 e 5 }

puts [array names nums]

foreach n [array names nums] {

    puts $nums($n)
}

We create a simple nums array and loop through it.

array set nums { a 1 b 2 c 3 d 4 e 5 }

We define a simple array.

puts [array names nums]

The array names returns a list containing 
the names (the keys) of all of the elements in the array. 

foreach n [array names nums] {

    puts $nums($n)
}

We use the keys to get the values. 

$ ./getnames.tcl 
d e a b c
4
5
1
2
3

The previous examples worked with copies of arrays and are therefore
less suitable for handling large arrays. Array search facilities are more efficient.

#!/usr/bin/tclsh

array set days {
    1 Monday
    2 Tuesday
    3 Wednesday
    4 Thursday
    5 Friday
    6 Saturday
    7 Sunday
}

set start [array startsearch days]

while {[array anymore days $start]} {
    set key [array nextelement days $start]

    puts $days($key)
}
 
array donesearch days $start

We use array search commands to iterate a simple array.

set start [array startsearch days]

The array startsearch command references the beginning 
of the array.

while {[array anymore days $start]} {

The array anymore command returns 1 if there are any more elements 
left to be processed in an array search.

set key [array nextelement days $start]

The array nextelement command returns the name of the next element
in the array.

array donesearch days $start

The array donesearch command terminates an array search and destroys all 
the state associated with that search.

## Removing elements

In the last example of this chapter, we show how
to remove elements from the array.

#!/usr/bin/tclsh

set names(1) Jane
set names(2) Tom
set names(3) Elisabeth
set names(4) Robert
set names(5) Julia
set names(6) Victoria

puts [array size names]
unset names(1)
unset names(2)

puts [array size names]

We create a names array. We use the unset command to 
remove items from the array. We check the size of the array before and
after we remove the two items. 

set names(1) Jane

The set command is used to create an item in the
array. 

unset names(1)

We use the unset command to remove an element
with key 1 from the array. 

$ ./removing.tcl 
6
4

In the beginning, there are 6 elements in the array. After removing two elements,
there are 4 elements left.

In this part of the Tcl tutorial, we worked with Tcl arrays. 

[Contents](..) 
[Previous](../lists/)
[Next](../procedures/)