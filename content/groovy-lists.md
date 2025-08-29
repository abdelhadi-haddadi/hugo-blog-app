+++
title = "Groovy Lists"
date = 2025-08-29T19:56:30.163+01:00
draft = false
description = "Groovy Lists tutorial covers basics and operations like sorting, filtering, and modifying with examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Lists

last modified March 20, 2025

Lists in Groovy are dynamic collections that can grow or shrink, unlike
arrays. They're versatile, supporting various operations like adding,
removing, sorting, and filtering. This tutorial explores list creation and
manipulation with practical examples to illustrate each concept.

## Creating a List

Lists are created using square brackets, making them simple to initialize
with values of any type, offering a flexible starting point for data.

CreateList.groovy
  

def nums = [1, 2, 3]
def words = ['cat', 'dog']
println nums
println words

nums holds integers, and words holds strings,
both defined with []. This syntax is intuitive, and lists can
mix types or stay uniform, adapting to your needs without strict typing.

## Empty List

You can start with an empty list and populate it later, useful when data is
added dynamically during program execution.

EmptyList.groovy
  

def list = []
list &lt;&lt; 1
list &lt;&lt; 'two'
println list

[] creates an empty list. The &lt;&lt; operator appends
items, here adding a number and a string. This shows lists' ability to grow
and handle mixed types effortlessly.

## Size/Max/Min

Groovy lists offer methods to find their size and extreme values, with
customizable comparisons using closures for added flexibility.

ListSizeMaxMin.groovy
  

def vals = [-1, 0, 1, 2, 3, 4, 5]

println vals.min()
println vals.max()
println vals.size()

def words = ['sky', 'at', 'storm', 'falcon', 'universe']
println words.min { it.size() }
println words.max { it.size() }

min and max find the smallest and largest
values in vals, -1 and 5. size returns the
count, 7. For words, min { it.size() } finds "at"
(shortest, 2 letters), and max { it.size() } finds "universe"
(longest, 8 letters). Closures let you define what "min" or "max" means,
enhancing Groovy's functionality.

## Avg/Count/Sum

Lists support numerical operations like averaging, counting based on
conditions, and summing, making them handy for data analysis tasks.

ListAvgCountSum.groovy
  

def vals = [-2, -1, 0, 1, 2, 3, 4]

println vals.average()
println vals.count{ it &gt; 0}
println vals.sum()
println vals.grep(it -&gt; it &lt; 0).sum()

average computes the mean (1 here), count{ it &gt; 0}
tallies positives (4), and sum adds all elements (7).
grep(it -&gt; it &lt; 0).sum filters negatives then sums them (-3).
These methods leverage closures and chaining, showing Groovy's concise yet
powerful approach to list processing.

## Clear/Empty

You can check if a list is empty or clear its contents, providing control
over its state during runtime, useful for resetting or validation.

ListClearEmpty.groovy
  

def vals = [-2, -1, 0, 1, 2, 3, 4]

if (vals.empty) {
    println "list is empty"
} else {
    println "list is not empty"
}

vals.clear()

if (vals.isEmpty()) {
    println "list is empty"
} else {
    println "list is not empty"
}

Initially, vals.empty checks if vals is empty
(false, since it has 7 elements). After clear removes all
items, isEmpty confirms it's empty (true). Both
empty and isEmpty work, but
isEmpty is more explicit; clear demonstrates
lists' mutability.

## Type

Groovy lists are instances of java.util.ArrayList by default,
and you can verify their type or check their class for debugging or logic.

ListType.groovy
  

def vals = [2, 3, 4, 5]

println vals.getClass()
println vals instanceof List

getClass returns java.util.ArrayList, the
underlying implementation. instanceof List confirms
vals is a List type (true). This reflects
Groovy's use of Java's collections while adding its own syntactic sugar,
useful for type checking or interoperability.

## First/Last, Head/Tail/Init

Lists provide methods to access their ends or split them into parts,
offering quick ways to grab specific elements or subsections.

ListFirstLast.groovy
  

def vals = [1, 2, 3, 4, 5]

println vals.first()
println vals.head()

println vals.last()

println vals.tail()
println vals.init()

first and head both return 1, the first item.
last returns 5, the last. tail gives all but
the first ([2, 3, 4, 5]), and init gives all but the last
([1, 2, 3, 4]). These methods simplify working with list ends without
indexing, enhancing readability.

## Index/Get

Access list elements via indices or the get method, with
support for ranges and negative indices for flexible retrieval.

ListIndexGet.groovy
  

def vals = [-2, -1, 0, 1, 2, 3, 4, 5]

println vals[0]
println vals[1]
println vals[-1]
println vals[-2]

println '-------------------'

println vals[0..3]
println vals[3..-1]
println vals[0, 2, 5]
println vals[-2..-5]

println '-------------------'

println vals.get(0)
println vals.get(1)
println vals.getAt(-1)
println vals.getAt(-2)

vals[0] gets -2, vals[-1] gets 5 (last),
vals[0..3] slices [-2, -1, 0, 1], and vals[0, 2, 5]
picks specific indices ([-2, 0, 3]). Negative ranges like
-2..-5 count backwards ([4, 3, 2, 1]).
get(0) and getAt(-1) mirror bracket notation but
are method-based, offering alternative syntax for access.

## Add/Remove

Lists are mutable, allowing you to add or remove elements dynamically with
various methods and operators tailored to different needs.

ListAddRemove.groovy
  

def vals = [2, 3, 4, 5]

vals.add(6)
vals &lt;&lt; 7
vals &lt;&lt; 8 &lt;&lt; 9 &lt;&lt; 10

vals.add(0, 1)
vals.add(0, 0)
vals.add(0, -1)

println vals
println "-------------------"

vals.remove(vals.size()-1)
vals.remove(0)

println vals

add(6) appends 6, &lt;&lt; adds 7, then chains 8, 9, 10.
add(0, 1) inserts 1 at index 0, shifting others right.
After adding, remove(size()-1) drops the last (10), and
remove(0) drops the first (-1). The &lt;&lt; operator
is concise, while add offers positional control.

## Chopping

The chop method splits a list into sublists based on specified
sizes, useful for partitioning data into manageable chunks.

ListChopping.groovy
  

def vals = [-2, -1, 0, 0, 1, 1, 2, 3, 4, 4, 4, 5, 6, 4]

println vals.chop(5)
println vals.chop(5, 6)
println vals.chop(2, 3, -1)

chop(5) takes the first 5 elements, leaving the rest.
chop(5, 6) splits into a 5-element list and a 6-element list,
with the remainder separate. chop(2, 3, -1) takes 2, then 3,
then all remaining (-1 means "rest"). This method returns a list of lists,
preserving the original order.

## Modify

Lists can be modified in-place with methods for adding, removing, and
replacing elements, giving you fine-grained control over their contents.

ListModify.groovy
  

def vals = [3, 4, 5, 6, 7]

println vals

vals.add(8)
vals &lt;&lt; 9 &lt;&lt; 10
vals.addAll([11, 12])

println '--------------------------'

vals.pop()
vals.push(0)

println vals

println '--------------------------'

vals[1] = 2

println vals

println '--------------------------'

vals.removeAt(3)
vals.swap(0, vals.size()-1)

println vals

Starting with [3, 4, 5, 6, 7], add, &lt;&lt;, and
addAll extend it. pop removes the last (12),
push(0) adds 0 at the start. vals[1] = 2 replaces
4 with 2. removeAt(3) drops the 4th element, and
swap exchanges the first and last, showing multiple ways to
alter a list dynamically.

## Plus/Minus

The plus and minus operators combine or subtract
elements, creating new lists without altering the original, ideal for
building or filtering.

ListPlusMinus.groovy
  

def vals = [3, 4]
def res = vals.plus(5).plus([6, 7]).plus(8..11)

println vals
println res

def res2 = res.minus(4).minus(5).minus([6, 7]).minus(8..10)

println res2

plus chains additions to vals, appending 5, then
[6, 7], then a range [8, 9, 10, 11], creating a new list.
minus removes 4, 5, [6, 7], and [8, 9, 10] from that result,
leaving [3, 11]. The original vals stays [3, 4], showing these
operations are non-destructive.

## Loop

Iterating over lists can be done with traditional loops or Groovy's
each methods, offering flexibility and options like reversing
the order for varied traversal needs.

ListLoop.groovy
  

def words = ['cup', 'crisp', 'cloud', 'break', 
    'falcon', 'war', 'oil']

for (def word in words) {
    println word
}

println "----------------------"

words.each { word -&gt; println word }

println "----------------------"

words.reverseEach { word -&gt; println word }

The for loop prints each word in order. each does
the same using a closure, offering a functional style.
reverseEach prints them backwards, from "oil" to "cup". These
methods cater to different preferences, with each variants
adding Groovy's modern twist to iteration.

## Sorting

Sorting rearranges list elements, either in-place or with custom logic via
closures, providing control over order and direction for various use cases.

ListSorting.groovy
  

def nums = [ 7, 9, 3, -2, 8, 1, 0 ]
def words = [ "sky", "cloud", "atom", "brown", "den", "kite", "town" ]

nums.sort()
println nums

nums.sort { -it }
println nums

nums.sort { a, b -&gt; a &lt;=&gt; b }
println nums

println "--------------------------------------------"

words.sort()
println words

words.sort { a, b -&gt; b &lt;=&gt; a }
println words

sort on nums orders ascending [-2, 0, 1, 3, 7,
8, 9]. sort { -it } reverses to descending by negating values.
sort { a, b -&gt; a &lt;=&gt; b } uses the spaceship operator for
ascending order explicitly. For words, sort
alphabetizes, and sort { b &lt;=&gt; a } reverses it. Sorting is
in-place, modifying the list directly.

## Reversing

Reversing flips a list's order, with options to create a copy or modify
in-place, giving you flexibility depending on whether you need the original.

ListReversing.groovy
  

def vals = [1, 2, 3, 4, 5, 6]

println vals.reverse()
println vals

println '-----------------------'

vals.reverse(true)
println vals

println '-----------------------'

Collections.reverse(vals)
println vals

reverse returns a new list [6, 5, 4, 3, 2, 1], leaving
vals unchanged. reverse(true) modifies
vals in-place to [6, 5, 4, 3, 2, 1].
Collections.reverse(vals) does the same, flipping it back.
The boolean flag or Java's Collections offer distinct ways to
handle reversal.

## Grep

grep filters a list based on a condition or type, returning a
new list with matching elements, ideal for selective extraction.

ListGrep.groovy
  

def vals = [-2, -1, 0, 1, 2, 3, 4, 5]

def r1 = vals.grep { it &gt; 0 }
println r1

def some = [1, true, -4, "falcon", 3.4]

def r2 = some.grep(Number)
println r2

grep { it &gt; 0 } keeps positives from vals,
returning [1, 2, 3, 4, 5]. In some,
grep(Number) filters for numeric types, yielding [1, -4, 3.4].
grep can use closures or type checks, making it versatile for
both conditional and type-based filtering without altering the original.

## Unique Values

The unique method removes duplicates, either creating a copy
or modifying in-place, useful for cleaning up redundant data.

ListUnique.groovy
  

def vals = [2, 2, -1, -2, 0, 1, 1, 2, -3, 11, 3, 4]

def uniq = vals.unique(false)
println uniq
println vals 

println '-----------------------'

vals.unique(true)
println vals 

unique(false) returns a new list [-2, -1, 0, 1, 2, -3, 11, 3,
4], preserving vals. unique(true) modifies
vals in-place, removing duplicates. The boolean parameter
controls whether the operation is destructive, giving you options based on
your needs.

## Counting

Counting methods tally occurrences of specific values or conditions,
providing quick insights into list contents without manual loops.

ListCounting.groovy
  

def vals = [-2, -1, 0, 0, 1, 1, 2, 3, 4, 4, 4, 5, 6, 4]

println vals.count(0)
println vals.count(4)
println vals.count(6)
println vals.count { it &gt; 0 }
println vals.countBy { it &lt; 0}

count(0) finds 2 zeros, count(4) finds 4 fours,
count(6) finds 1 six. count { it &gt; 0 } counts
positives (8), and countBy { it &lt; 0 } maps counts by condition
(true: 2, false: 12). These methods offer both exact and conditional
counting, enhancing data analysis.

## Shuffle

Shuffling randomizes a list's order, with options to create a copy or
modify in-place, useful for random sampling or reordering tasks.

ListShuffle.groovy
  

def vals = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

def shuffled = vals.shuffled()
println shuffled
println vals

println '---------------------------'

vals.shuffle()
println vals

shuffled returns a new randomized list, leaving vals
intact (order varies per run). shuffle randomizes vals
in-place. Both methods provide randomness, but shuffled preserves
the original, while shuffle alters it directly, suiting different
scenarios.

## Flatten

flatten converts a nested list into a single-level list,
simplifying complex structures for easier processing or display.

ListFlatten.groovy
  

def vals = [1, 2, 3, 4, 5, [6, 7, [8, 9, [10]]]]

println vals
println vals[5]
println vals[5][2]
println vals[5][2][2]
println vals[5][2][2][0]

println vals.flatten()

vals has nested sublists. Indexing like
vals[5][2][2][0] reaches 10, showing depth.
flatten unwraps all levels into [1, 2, 3, 4, 5, 6, 7, 8, 9,
10]. It's non-destructive, returning a new list, and handles arbitrary
nesting, making it powerful for flattening data.

## Execute

The execute method runs a list as a system command, treating
elements as a command and its arguments, useful for shell interactions.

ListExecute.groovy
  

def cmds = ['ls', '-l'].execute()
cmds.waitFor()

println cmds.text

['ls', '-l'].execute runs "ls -l" (Unix dir listing;
use "dir" on Windows). waitFor ensures completion, and
text outputs the result. This bridges Groovy with the OS,
though output varies by system—here, it's a placeholder for Unix-like
behavior.

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy lists with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).