+++
title = "Tcl lists"
date = 2025-08-29T20:03:16.012+01:00
draft = false
description = "In this chapter of the Tcl tutorial we cover Tcl lists and list related commands, including llength, lappend, linsert, lreplace, lsort, lassign, lrange, and lsearch."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../strings/)
[Next](../arrays/)

# Tcl lists

last modified October 18, 2023

In this part of the Tcl tutorial, we talk about lists.

Computer programs work with data. Working with groups of data is a basic programming 
operation. In Tcl, a *list* is a basic data structure. It is an ordered 
collection of value items. Items in lists are separated by white space. 

Every item of the list is identified by its index. Lists do not
have a fixed length. List elements can be strings, numbers, variables,
files or other lists. We can nest lists into other lists to any
depth. 

## Creating lists

There are several ways how we can create lists in Tcl.

#!/usr/bin/tclsh

set l1 { 1 2 3 }
set l2 [list one two three]
set l3 [split "1.2.3.4" .]

puts $l1
puts $l2
puts $l3

Three lists are created and their elements are printed to the console. 

set l1 { 1 2 3 }

The basic way to create a list is to put elements of the list
inside the curly brackets. List elements are separated by space.

set l2 [list one two three]

Another way to create a list is to use the list
command.

set l3 [split "1.2.3.4" .]

Some Tcl commands return a list as a result. In the above
code line, the split command returns a list of
numbers generated from a string. 

$ ./createlists.tcl
 1 2 3 
one two three
1 2 3 4

## The llength command

The llength command counts the number of elements in a list.

#!/usr/bin/tclsh

puts [llength { 1 2 3 4 }]
puts [llength {}]
puts [llength { 1 2 {3 4} }]
puts [llength { 1 2 {} 3 4 }]

The script counts the length of four lists.

puts [llength { 1 2 3 4 }]

This list has four elements, therefore, 4 is printed to the console.

puts [llength {}]

This list is empty; the llength command returns 0.

puts [llength { 1 2 {3 4} }]

This list cointains one inner list—{3 4}. An inner list counts for one
element.

puts [llength { 1 2 {} 3 4 }]

An empty list counts for one element too.

$ ./list_length.tcl 
4
0
3
5

## Retrieving elements

There are three basic commands for list element retrieval: lindex,
lrange, and lassign.

#!/usr/bin/tclsh

set vals { 2 4 6 8 10 12 14 }

puts [lindex $vals 0]
puts [lindex $vals 3]
puts [lindex $vals end]
puts [lindex $vals end-2]

The code example uses the lindex command to retrieve an element 
from a list at the specified index.

puts [lindex $vals 0]
puts [lindex $vals 3]

A Tcl list indexing starts with 0. The above commands print the elements of the list
at positions 1 and 4.

puts [lindex $vals end]
puts [lindex $vals end-2]

The end string represents the last element's index. It is also possible to
substract an integer from it.

$ ./retrieving.tcl 
2
8
14
10

The next code example explains the lrange and the lassign
commands.

#!/usr/bin/tclsh

puts [lrange { a b c d e } 2 4]
puts [lrange { a b c d e } 1 end]

lassign { a b c } x y z
puts "$x $y $z"

The lrange command returns a portion of a list specified
by two indexes. The lassign command assigns values from a 
list to specified variables. 

puts [lrange { a b c d e } 2 4]
puts [lrange { a b c d e } 1 end]

Here we print two sublists of a list.

lassign { a b c } x y z
puts "$x $y $z"

With the lassign command, we assign list elements to
three variables.

$ ./retrieving2.tcl 
c d e
b c d e
a b c

## Traversing lists

Now that we have defined lists and basic list operations, 
we want to go traverse the list elements. We show several ways how 
to go through the list items.

#!/usr/bin/tclsh

foreach item {1 2 3 4 5 6 7 8 9} {

    puts $item
}

We go through list elements with the foreach
command. Each loop cycle the item variable has the next value from 
the list of numbers. 

$ ./traverse1.tcl
1
2
3
4
5
6
7
8
9

Ouput of the example.

In the second example we go through names of days 
using the while loop.

#!/usr/bin/tclsh

set days [list Monday Tuesday Wednesday Thursday \
    Friday Saturday Sunday]
set n [llength $days]

set i 0

while {$i &lt; $n} {

    puts [lindex $days $i]
    incr i
}

We traverse the list using a while loop. When working with 
a while loop, we also need a counter and the number of 
items in the list. 

set days [list Monday Tuesday Wednesday Thursday \
    Friday Saturday Sunday]

The list command is used to create a list of days. 

set n [llength $days]

The length of the list is determined with the llength
command. 

set i 0

This is a counter. 

while {$i &lt; $n} {

    puts [lindex $days $i]
    incr i
}

The while loop executes the commands in the body until
the counter is equal to the number of elements in the list. 

puts [lindex $days $i]

The lindex returns a value from the list pointed to
by the counter.

incr i

The counter is increased.

$ ./traverse2.tcl
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

## The lmap command

It is possible to go through the list's elements with the lmap command. 
It is a functional command. The lmap command iterates over all elements 
in one or more lists and collects results. 

#!/usr/bin/tclsh

set vals { 1 2 3 4 5 6 }

puts [lmap a $vals {expr {$a ** 2}}]

The example applies the lmap on a list of integers.

puts [lmap a $vals {expr {$a ** 2}}]

The functional lmap command applies the expression in its body
on each of the elements of the vals list. The result, containing a new
list of squared integers, is returned.

$ ./lmap_cmd.tcl 
1 4 9 16 25 36

## Inserting elements

The next example will insert elements into a Tcl list.
The lappend command appends an element at the end of a list;
it modifies the original list. The linsert command 
inserts an element at the specified index; it does not modify the
original list but returns a new one.

#!/usr/bin/tclsh

set nums {4 5 6}
puts $nums

lappend nums 7 8 9
puts $nums

puts [linsert $nums 0 1 2 3]
puts $nums

We have a list of three numbers. 

lappend nums 7 8 9

The lappend appends data to the list. The original list is changed.

puts [linsert $nums 0 1 2 3]

The linsert inserts elements at a given 
index. The first number is the index. The remaining values
are numbers to be inserted into the list. The command creates a new list
and returns it; It does not modify the original list. 

$ ./inserting.tcl 
4 5 6
4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
4 5 6 7 8 9

In the following example, we concatenate lists, search
for items and replace items in lists. 

#!/usr/bin/tclsh

set animals1 { lion eagle elephant dog cat }
set animals2 { giraffe tiger horse dolphin }

set animals [concat $animals1 $animals2]

puts $animals

puts [lsearch -exact $animals eagle]
puts [lreplace $animals 3 4 buffalo crocodile]

We define two animal lists. We introduce three new commands. 

set animals [concat $animals1 $animals2]

The concat command is used to concatenate (add) two
lists. The above line joins two lists and the new list is set to
the animals variable. 

puts [lsearch -exact $animals eagle]

With the lsearch command we look for an eagle in the
list. With the -exact option we look for an exact match. 
The command returns the index of the first matching element, 
or -1 if there is no match. 

puts [lreplace $animals 3 4 buffalo crocodile]

The lreplace command replaces dog and cat with
buffalo and crocodile. 

$ ./operations2.tcl
lion eagle elephant dog cat giraffe tiger horse dolphin
1
lion eagle elephant buffalo crocodile giraffe tiger horse dolphin

## Sorting items

In this section, we show how we can sort 
items in Tcl lists. 

#!/usr/bin/tclsh

set names { John Mary Lenka Veronika Julia Robert }
set nums { 1 5 4 3 6 7 9 2 11 0 8 2 3 }

puts [lsort $names]
puts [lsort -ascii $names]
puts [lsort -ascii -decreasing $names]
puts [lsort -integer -increasing $nums]
puts [lsort -integer -decreasing $nums]
puts [lsort -integer -unique $nums]

To sort list elements, we can use the sort command.
The command does not modify the original list. It returns a new
sorted list of elements. 

set names { John Mary Lenka Veronika Julia Robert }
set nums { 1 5 4 3 6 7 9 2 11 0 8 2 3 }

We have two lists. In the first we have strings, in the second
numbers. 

puts [lsort $names]
puts [lsort -ascii $names]

The default sorting is the ASCII sorting. The elements are sorted
by their positions in the ASCII table. 

puts [lsort -integer -increasing $nums]
puts [lsort -integer -decreasing $nums]

We treat the values as integers and sort them in 
increasing and decreasing orders. 

puts [lsort -integer -unique $nums]

We sort the elements of the list in 
a numerical context in increasing order.
Duplicates will be removed. 

$ ./sorting.tcl
John Julia Lenka Mary Robert Veronika
John Julia Lenka Mary Robert Veronika
Veronika Robert Mary Lenka Julia John
0 1 2 2 3 3 4 5 6 7 8 9 11
11 9 8 7 6 5 4 3 3 2 2 1 0
0 1 2 3 4 5 6 7 8 9 11

## Nested lists

In Tcl there can be nested lists—list in other lists. 

#!/usr/bin/tclsh

set nums {1 2 {1 2 3 4} {{1 2} {3 4}} 3 4}

puts [llength $nums]
puts [llength [lindex $nums 2]]

puts [lindex $nums 0]
puts [lindex [lindex $nums 2] 1]
puts [lindex [lindex [lindex $nums 3] 1] 1]

This is a simple example with nested lists in Tcl. 

set nums {1 2 {1 2 3 4} {{1 2} {3 4}} 3 4}

The nums is a list with two nested lists. The second nested 
list has two additional inner nested lists. 

puts [llength $nums]

We determine the size of the list. A nested list is counted
as one element.

puts [llength [lindex $nums 2]]

In this line, we determine the size of the first nested list, which
is the third element of the main list.

puts [lindex $nums 0]

Here we print the first element of the main list. 

puts [lindex [lindex $nums 2] 1]

In the above line, we get the second element of the
first nested list. 

puts [lindex [lindex [lindex $nums 3] 1] 1]

Here we get the second element of the second inner list
of the inner list located at the 4th position of the main list.
In other words: the inner most command is executed first. 
The [lindex $nums 3] returns {{1 2} {3 4}}. 
Now the second command operates on this returned list. 
The [lindex {{1 2} {3 4}} 1] expression returns {3 4}. 
Finally, the last command [lindex {3 4} 1] returns 4, 
which is printed to the terminal. 

$ ./nestedlists.tcl
6
4
1
2
4

It is possible to use a simpler syntax to retrieve elements of nested lists.

#!/usr/bin/tclsh

set nums { 1 2 {1 2 3 {4 5}} 3 4 }

puts [lindex $nums 0]
puts [lindex $nums 2 1]
puts [lindex $nums 2 3 1]

The indexes follow the first argument of the lindex command, 
starting with the index to the outermost list.

$ ./nestedlists2.tcl 
1
2
5

In this part of the Tcl tutorial, we covered Tcl lists.

[Contents](..) 
[Previous](../strings/)
[Next](../arrays/)