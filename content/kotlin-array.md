+++
title = "Kotlin array"
date = 2025-08-29T20:02:23.957+01:00
draft = false
description = "Kotlin array tutorial shows how to work with arrays in Kotlin. An array is a collection of a fixed number of values."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin array

last modified January 29, 2024

This article shows how to work with arrays in Kotlin.

An array is a collection of a fixed number of values. The array items are called
elements of the array. Each element can be referred to by an index. Arrays are
zero based.

Kotlin arrays are created with functions such as arrayOf or
intArrayOf, or with classes such as IntArray
or FloatArray.

## Kotlin array initialization

In the first example, we show how we can initialize arrays in Kotlin.

Initialize.kt
  

package com.zetcode

import java.util.Arrays

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5)
    println(Arrays.toString(nums))

    val nums2 = (3..12).toList().toTypedArray()
    println(Arrays.toString(nums2))

    val nums3 = IntArray(5, { i -&gt; i * 2 + 3})
    println(Arrays.toString(nums3))
}

The example creates three arrays.

val nums = arrayOf(1, 2, 3, 4, 5)

An array is created with arrayOf function.

println(Arrays.toString(nums))

We use Arrays' toString method to print
the contents of the array.

val nums2 = (3..12).toList().toTypedArray()

In this line, we create an array from a range of numbers.

val nums3 = IntArray(5, { i -&gt; i * 2 + 3})

This line creates an array with IntArray. It takes the number
of elements and a factory function as parameters.

[1, 2, 3, 4, 5]
[3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
[3, 5, 7, 9, 11]

## Kotlin array indexing

The next example shows the array indexing operations in Kotlin.

Indexing.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(1, 2, 3, 4, 5)

    println(nums[2])

    nums[0] = 11
    println(nums[0])
}

We use the indexing operations to get and modify an array value.

println(nums[2])

We print the value with index 2, i.e. the third element in the array.
The index of an array value is added between a pair of square brackets.

## Kotlin array basic operations

The following example presents some basic operations with Kotlin arrays.

BasicOperations.kt
  

package com.zetcode

import java.util.Arrays

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5)
    println(nums.get(0))

    nums.set(0, 0)
    println(Arrays.toString(nums))

    val nums2 = nums.plus(1)
    println(Arrays.toString(nums2))

    val slice = nums.sliceArray(1..3)
    println(Arrays.toString(slice))

    println(nums.first())
    println(nums.last())
    println(nums.indexOf(5))
}

In the example, we retrieve and modify array elements, create a slice,
and get an index of an element.

println(nums.get(0))

We get an element with index 0 using the get function.

nums.set(0, 0)

The set method sets the array element at the specified
index to the specified value.

val nums2 = nums.plus(1)

We add a new element to the array, creating a new array. (Remember that
arrays are fixed sized; therefore, a new array was created).

val slice = nums.sliceArray(1..3)

With the sliceArray method, we create a slice from
the array. The indexes are both inclusive.

println(nums.first())
println(nums.last())

We get the first and the last element of the array.

println(nums.indexOf(5))

We get the index of the first occurrence of the element 5.

1
[0, 2, 3, 4, 5]
[0, 2, 3, 4, 5, 1]
[2, 3, 4]
0
5
4

## Kotlin array aggregate functions

In the following example, we use some aggregate array functions.

Aggregates.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(1, 2, 3, 4, 5)

    val avg = nums.average()
    println("The average is $avg")

    val nOfValues = nums.count()
    println("There are $nOfValues elements")

    val sumOfValues = nums.sum()
    println("The sum of values is $sumOfValues")

    val maxValue = nums.max()
    println("The maximum is $maxValue")

    val minValue = nums.min()
    println("The minimum is $minValue")
}

The example computes the average, sum, maximum, minimum, and the size of an
array.

val avg = nums.average()

The average function calculates the average of the array values.

val nOfValues = nums.count()

The number of elements is determined with count.

The average is 3.0
There are 5 elements
The sum of values is 15
The maximum is 5
The minimum is 1

## Kotlin array shuffle

The shuffle function randomly rearranges the array elements
in-place.

Shuffling.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5, 6)

    println(nums.joinToString())

    nums.shuffle()
    println(nums.joinToString())

    nums.shuffle()
    println(nums.joinToString())
}

In the example, we shuffle array elements twice. The joinToString
function transforms the array to a string.

1, 2, 3, 4, 5, 6
1, 3, 5, 6, 4, 2
3, 2, 1, 5, 4, 6

## Kotlin array map

The map function returns a list containing the results of applying
the given transform function to each element of the array.

MapFun.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5, 6)

    val res = nums.map { e -&gt; e * 2 }
    println(res)
}

We have a list of integers. With map, we mutiply each integer by 
two.

[2, 4, 6, 8, 10, 12]

## Kotlin array count

The count method counts the elements in the array.

CountFun.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(2, 3, 4, 5, 6, 7)

    println("There are ${nums.count()} elements in the array")

    val nOfEvens = nums.count { it % 2 == 0 }

    println("There are $nOfEvens even values in the array")
}

The example counts the total number of values and the number of even values in
the array.

There are 6 elements in the array
There are 3 even values in the array

## Kotlin random array elements

In the next example, we initialize an array with random integers.

RandomInts.kt
  

package com.zetcode

import kotlin.random.Random

fun main() {

    val vals = Array(10) { Random.nextInt(0, 100)}
    println(vals.joinToString())
}

An array of ten random integers is created. Random integers are produced with
Random.nextInt function. 

## Kotlin array traversal

In the next example, we loop over Kotlin arrays.

Traverse.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5, 6, 7)

    nums.forEach({ e -&gt; print("$e ") })

    println()

    nums.forEachIndexed({i, e -&gt; println("nums[$i] = $e")})

    for (e in nums) {
        print("$e ")
    }

    println()

    val it: Iterator&lt;Int&gt; = nums.iterator()

    while (it.hasNext()) {

        val e = it.next()
        print("$e ")
    }
}

The example loops over an array using four different ways of traversal.

nums.forEach({ e -&gt; print("$e ") })

We traverse the array with forEach. This method applies
an action on each element of the array. It prints it in our case.

nums.forEachIndexed({i, e -&gt; println("nums[$i] = $e")})

The forEachIndexed performs the given action on each
element, providing sequential index with the element.

for (e in nums) {
    print("$e ")
}

We go over the array in a for loop.

val it: Iterator&lt;Int&gt; = nums.iterator()

while (it.hasNext()) {

    val e = it.next()
    print("$e ")
}

Finally, we traverse the array with an iterator and a while loop.

1 2 3 4 5 6 7
nums[0] = 1
nums[1] = 2
nums[2] = 3
nums[3] = 4
nums[4] = 5
nums[5] = 6
nums[6] = 7
1 2 3 4 5 6 7
1 2 3 4 5 6 7

## Sorting arrays in Kotlin

We show how to sort Kotlin arrays.

ArraySort.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(7, 3, 3, 4, 5, 9, 1)

    val sortedNums = nums.sortedArray()
    println(Arrays.toString(sortedNums))

    val sortedNumsDesc = nums.sortedArrayDescending()
    println(Arrays.toString(sortedNumsDesc))
}

The example sorts an array is ascending order with sortedArray
and descending order with sortedArrayDescending. The
methods create new sorted arrays.

[1, 3, 3, 4, 5, 7, 9]
[9, 7, 5, 4, 3, 3, 1]

## Kotlin two-dimensional arrays

In Kotlin, we can create two-dimensional arrays.

ArrayTwoDim.kt
  

package com.zetcode

fun main() {

    val array = arrayOf(intArrayOf(1, 2),
            intArrayOf(3, 4),
            intArrayOf(5, 6, 7))

    println(Arrays.deepToString(array))
}

The example creates a two-dimensional array by nesting
intArrayOf function calls into the
arrayOf function.

[[1, 2], [3, 4], [5, 6, 7]]

## Kotlin filtering arrays

With the filter method, we can filter data in an array.

Filter.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(1, -2, 3, 4, -5, 7)

    nums.filter { e -&gt; e &gt; 0 }.forEach { e -&gt; print("$e ") }
}

The example creates an array of positive and negative integers.
The filter method is used to pick up only positive values.

1 3 4 7

The next example filters an array of users.

Filter2.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val salary: Int)

fun main() {

    val users = arrayOf(

        User("John", "Doe", 1230),
        User("Lucy", "Novak", 670),
        User("Ben", "Walter", 2050),
        User("Robin", "Brown", 2300),
        User("Amy", "Doe", 1250),
        User("Joe", "Draker", 1190),
        User("Janet", "Doe", 980),
        User("Albert", "Novak", 1930)
    )

    users.filter { it.salary &lt; 1000 }.forEach { e -&gt; println(e) }
}

We have an array of users having firstname, lastname, and salary properties.

users.filter { it.salary &lt; 1000 }.forEach { e -&gt; println(e) }

With filter, we find out all users whose salary is below 1000.

## Kotlin array finding elements

We can find elements with find and findLast.

ArrayFind.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9)

    val firstEven = nums.find { it % 2 == 0 }
    println("The first even value is: $firstEven")

    val lastEven = nums.findLast { it % 2 == 0 }
    println("The last even value is: $lastEven")
}

The example looks for the first and last even values in the array.

The first even value is: 2
The last even value is: 8

## Kotlin array reduction

Reduction is a terminal operation that aggregates array values
into a single value. The reduce method applies a function
against an accumulator and each element in the array (from left to right)
to reduce it to a single value.

ArrayReduce.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(2, 3, 4, 5, 6, 7)

    val total = nums.reduce { product, next -&gt; product * next }

    println(total)
}

We use the reduce method to calculate a product from
array elements.

val total = nums.reduce { product, next -&gt; product * next }

The product is the accumulator, the next
is the next value in the array.

5040

## Kotlin array all

The all method returns true if all
elements match the given predicate.

ArrayAll.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9)

    val hasAllEvens = nums.all { it % 2 == 0 }

    if (hasAllEvens) {

        println("The array contains only even values")
    } else {

        println("The array contains odd values")
    }
}

The example checks if the array elements are all even values.

The array contains odd values

The array contains some odd values.

## Kotlin array any

The any method returns true if at least one
of the elements matches the given predicate.

ArrayAny.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9)

    val hasEvenVals = nums.any { it % 2 == 0 }

    if (hasEvenVals) {

        println("The array contains even values")
    } else {

        println("The array does contain even values")
    }
}

The example checks if the array elements contains any even values.

The array contains even values

## Source

[Kotlin arrays - language reference](https://kotlinlang.org/docs/arrays.html)

In this article we have covered Kotlin arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).