+++
title = "Groovy Arrays"
date = 2025-08-29T19:56:26.700+01:00
draft = false
description = "Groovy Arrays tutorial covers basics and operations like sorting, filtering, and mapping with examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Arrays

last modified March 20, 2025

Arrays in Groovy are fixed-size collections that store elements of the same
type. Unlike lists, their size cannot change after creation. This tutorial
dives into how to create arrays, manipulate them, and perform common tasks
like sorting, filtering, and mapping, all with practical examples to guide
you through the process.

## List vs Array

In Groovy, lists and arrays can look similar when initialized, but they are
distinct. A list is dynamic and can grow or shrink, while an array has a
fixed size. Because of their similar syntax, you must explicitly declare an
array using as or type annotation to avoid creating a list by
default.

ListVsArray.groovy
  

def nums = [1, 2, 3, 4, 5]
println nums.class.name

def nums2 = [1, 2, 3, 4, 5] as int[]
println nums2.class.name

Without the as int[], nums defaults to a
java.util.ArrayList, a type of list. By adding as
int[], nums2 becomes an integer array. You can specify
the array type either on the right with as or on the left with
a type declaration, giving you flexibility in how you define it.

$ groovy ListVsArray.groovy
java.util.ArrayList
int[]

## Array Creation

Groovy offers multiple ways to create arrays, leveraging its concise syntax.
You can use the as keyword with a list-like initializer or the
new keyword with an explicit type and values. Both approaches
are straightforward and commonly used depending on your preference.

ArrayCreation.groovy
  

def vals = [1, 2, 3, 4, 5] as int[]
println vals
println vals.length
println vals.size()

def words = new String[] {'sky', 'cloud', 'pen'}
println words

Here, vals is created using as int[], and
words uses the new String[] syntax. Both
length and size return the number of elements,
offering two ways to check the array’' length. This duality comes from
Groovy's blend of Java compatibility and its own enhancements.

$ groovy ArrayCreation.groovy
[1, 2, 3, 4, 5]
5
5
[sky, cloud, pen]

## Array via Range

Groovy's range operator (..) provides a quick and elegant way
to define an array with sequential values. This is especially useful for
numeric arrays where you want a continuous sequence without listing each
element manually.

RangeArray.groovy
  

int[] nums = -3..2
println nums

The expression -3..2 generates an array from -3 to 2,
inclusive, resulting in six elements. This shorthand is a powerful feature
in Groovy, simplifying array creation for ranges of numbers and making your
code more readable and concise.

$ groovy RangeArray.groovy
[-3, -2, -1, 0, 1, 2]

## Array Operations

Groovy arrays come with built-in methods to perform common operations like
finding size, minimum, maximum, sum, average, and counting occurrences.
These methods make arrays versatile for data manipulation without needing
complex loops or external libraries.

ArrayOps.groovy
  

int[] nums = -4..10
println nums.size()
println nums.min()
println nums.max()
println nums.sum()
println nums.average()
println nums.count(-4)

String[] words = ['sky', 'waterfall', 'superintendent', 'war']
println words.max { it.size() }
println words.min { it.size() }

For numbers, size gives the length, min and
max find extremes, sum adds all elements,
average computes the mean, and count(-4) counts
occurrences of -4. For strings, max and min can
use a closure like { it.size() } to compare based on length,
showing Groovy's flexibility with custom criteria.

$ groovy ArrayOps.groovy
15
-4
10
45
3.0
1
superintendent
sky

## Element Access

You can access array elements using the square bracket operator
([]) or the getAt method, both of which support
positive indices, negative indices, and ranges. This provides multiple ways
to retrieve single elements or slices of the array.

ElementAccess.groovy
  

int[] nums = -3..2
println nums[0]
println nums[1]
println nums.getAt(0)
println nums.getAt(-1)
println nums[-1..1]

String[] words = ['borrow', 'water', 'globe']
println words[0..2]

Index 0 gets the first element, while -1 gets the last. The range
-1..1 extracts a subarray from the end toward the start, and
0..2 gets the first three elements. Negative indices are a
Groovy convenience, counting backwards from the end, making it easier to
work with arrays without calculating offsets manually.

$ groovy ElementAccess.groovy
-3
-2
-3
2
[2, 1, 0, -1]
[borrow, water, globe]

## Iteration

Iterating over arrays in Groovy can be done with a traditional
for loop or the more idiomatic each method, which
supports closures. These options cater to different coding styles and offer
additional features like index tracking.

Iteration.groovy
  

def nums = [1, 2, 3, 4, 5] as int[]
for (def e in nums) {
    println e
}

def words = ['sky', 'blue', 'war'] as String[]
words.each { println it }
words.eachWithIndex { e, i -&gt; println "${i}: ${e}" }

The for loop iterates over each element in nums,
printing them one per line. The each method does the same for
words using a closure, where it is the default
parameter. eachWithIndex adds the index (i),
letting you track position, which is useful for numbered output or when
order matters.

$ groovy Iteration.groovy
1
2
3
4
5
sky
blue
war
0: sky
1: blue
2: war

## Check Element Existence

The contains method checks if a specific element exists in the
array, returning a boolean. This is a simple way to test membership without
writing a loop or complex logic.

Contains.groovy
  

String[] words = ['sky', 'water', 'war', 'pen']
println words.contains('war')
println words.contains('small')

contains('war') returns true because "war" is in
the array, while contains('small') returns false
since "small" isn’t 'resent. This method is case-sensitive and exact,
making it reliable for straightforward checks.

$ groovy Contains.groovy
true
false

## Modify Array

Groovy arrays have a fixed size, so you can’t 'elete elements directly, but
you can modify them or create a new array without certain elements using
the - operator. This reflects arrays' immutable length while
still allowing flexibility.

ModifyArray.groovy
  

String[] words = ['sky', 'water', 'war', 'cup']
def words2 = words - 'war'
println words
println words2

words[0] = 'skylark'
println words

The - operator doesn’' alter words but returns a
new array, words2, excluding "war". The original array remains
intact, showing immutability in size. Assigning words[0] =
'skylark' replaces an element, proving you can update values within
the fixed structure, just not the length.

$ groovy ModifyArray.groovy
[sky, water, war, cup]
[sky, water, cup]
[skylark, water, war, cup]

## Shuffle Elements

The shuffle method randomizes the order of elements in an
array in-place, meaning it modifies the original array directly. This is
useful for tasks like random sampling or testing different sequences.

ShuffleArray.groovy
  

String[] words = ['sky', 'cloud', 'pen']
println words
words.shuffle()
println words
words.shuffle()
println words

Each call to shuffle reorders words randomly.
Since it’s i'-place, the original array changes each time, and the output
varies with each run. This demonstrates Groovy's ability to provide
powerful, mutable operations on arrays despite their fixed size.

$ groovy ShuffleArray.groovy
[sky, cloud, pen]
[cloud, pen, sky]
[pen, sky, cloud]

## Sorting

The sort method arranges array elements in ascending order
in-place, modifying the original array. Combined with reverse,
it offers control over the sort direction, making arrays easy to organize.

SortArray.groovy
  

String[] words = ['sky', 'water', 'war', 'pen']
println words.sort()
println '----------------------------'
println words.reverse()

sort alphabetizes words, changing it from its
initial order to [pen, sky, war, water]. Then, reverse flips
it to descending order. Both operations modify the array directly, showing
how Groovy blends simplicity with direct manipulation for sorting tasks.

$ groovy SortArray.groovy
[pen, sky, war, water]
----------------------------
[water, war, sky, pen]

## Filtering

The grep method filters an array based on a condition defined
in a closure, returning a new array with only the matching elements. This
is a concise way to extract subsets without writing explicit loops.

FilterArray.groovy
  

String[] words = ['sky', 'water', 'war', 'pen']
def res = words.grep { it.startsWith('w') }
println res

Here, grep { it.startsWith('w') } keeps only elements starting
with "w", resulting in a new array with "water" and "war". The original
array isn’t 'hanged, and the closure allows for flexible, custom filtering
criteria, showcasing Groovy's functional programming capabilities.

$ groovy FilterArray.groovy
[water, war]

## Mapping

The collect method applies a transformation to each element,
returning a new array with the results. This is Groovy's way of mapping
data, useful for converting or computing values based on the original
array.

MapArray.groovy
  

int[] nums = -4..10
def res = nums.collect { it * it }
println res

collect { it * it } squares each number in nums,
creating a new array with the results. The original array remains
unchanged, and the closure can include any expression, making
collect a versatile tool for data transformation in Groovy.

$ groovy MapArray.groovy
[16, 9, 4, 1, 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

## Finding Elements

Groovy provides find and findAll to locate
elements matching a condition. find returns the first match,
while findAll returns all matches, both using closures for
flexibility.

FindArray.groovy
  

int[] nums = -4..10
def res = nums.findAll { it % 2 == 0 }
println res
res = nums.find { it &gt; 0 }
println res

findAll { it % 2 == 0 } collects all even numbers into a new
array, while find { it &gt; 0 } returns the first positive number
(1). These methods don’t 'odify the original array and are ideal for
searching or filtering with custom logic, enhancing Groovy's expressiveness.

$ groovy FindArray.groovy
[-4, -2, 0, 2, 4, 6, 8, 10]
1

## Joining Elements

The join method combines array elements into a single string,
using a specified separator. This is handy for creating formatted output or
serializing data without manual concatenation.

JoinArray.groovy
  

String[] words = ['sky', 'water', 'war']
def res = words.join(', ')
println res

join(', ') merges words into a comma-separated
string. The separator can be any string, offering flexibility—use "" for no
separator or something like " - " for a different style. It’s a'simple yet
powerful way to convert arrays to readable text.

$ groovy JoinArray.groovy
sky, water, war

## Any and Every

The any and every methods test conditions across
an array’' elements, returning booleans. any checks if at least
one element satisfies the condition, while every checks if all
do, both using closures.

AnyEveryArray.groovy
  

int[] nums = -4..10
println nums.any { it &gt; 0 }
println nums.every { it &gt; 0 }

any { it &gt; 0 } returns true because some numbers
are positive, while every { it &gt; 0 } returns
false since some are negative or zero. These methods are
efficient for validating properties across an array without needing to
iterate manually.

$ groovy AnyEveryArray.groovy
true
false

## Flatten Array

The flatten method takes a nested array (an array of arrays)
and converts it into a single, flat array. This is useful when working with
multidimensional data that you want to process as a single sequence.

FlattenArray.groovy
  

int[][] nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
println nums
println nums.flatten()

nums starts as a 3x3 array, and flatten turns it
into a single array of nine elements. The original structure is preserved
until flattened, and the result is a new array, leaving nums
unchanged unless reassigned. This simplifies working with nested data.

$ groovy FlattenArray.groovy
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[1, 2, 3, 4, 5, 6, 7, 8, 9]

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy arrays with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).