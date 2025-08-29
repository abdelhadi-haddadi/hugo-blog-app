+++
title = "Kotlin lists"
date = 2025-08-29T20:02:42.831+01:00
draft = false
description = "Kotlin list tutorial shows how to work with lists in Kotlin. A list is a generic ordered collection of elements."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin lists

last modified January 29, 2024

This article shows how to work with lists in Kotlin. A list is a generic ordered
collection of elements.

Kotlin distinguishes between read-only and mutable lists. Read-only lists are
created with listOf and mutable lists with
mutableListOf.

## Kotlin listOf

The listOf method creates a new read-only list in Kotlin.

KotlinListOf.kt
  

package com.zetcode

fun main() {

    val words = listOf("pen", "cup", "dog", "spectacles")
    println("The list contains ${words.size} elements.")
}

The example creates a new list of words with listOf.
The size of the list is determined with the size attribute.

## Kotlin List basics

In the next example, we have a simple Kotlin List example.

Basic.kt
  

package com.zetcode

fun main() {

    val nums = listOf(11, 5, 3, 8, 1, 9, 6, 2)

    val len = nums.count()
    val max = nums.max()
    val min = nums.min()
    val sum = nums.sum()
    val avg = nums.average()

    val msg = """
               max: $max, min: $min,
               count: $len, sum: $sum,
               average: $avg
              """
    println(msg.trimIndent())

}

The example creates a list of numbers and computes some statistics.

val nums = listOf(11, 5, 3, 8, 1, 9, 6, 2)

A Kotlin read-only list is created with listOf function.

val len = nums.count()
val max = nums.max()
val min = nums.min()
val sum = nums.sum()
val avg = nums.average()

We compute the number of values, maximum, minimum, sum, and the average
of the values.

max: 11, min: 1,
count: 8, sum: 45,
average: 5.625

## Kotlin List indexing

Each element of a list has an index. Kotlin list indexes start from
zero. The last element has len-1 index.

ListIndex.kt
  

package com.zetcode

fun main() {

    val words = listOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles", "cup", "bread")

    val w1 = words.get(0)
    println(w1)

    val w2 = words[0]
    println(w2)

    val i1 = words.indexOf("cup")
    println("The first index of cup is $i1")

    val i2 = words.lastIndexOf("cup")
    println("The last index of cup is $i2")

    val i3 = words.lastIndex
    println("The last index of the list is $i3")
}

The example presents Kotlin List indexing operations.

val w1 = words.get(0)

An element is retrieved with the get method. The method
takes an index of the element to be retrieved as a parameter.

val w2 = words[0]

We can also use the classic C indexing operation.

val i1 = words.indexOf("cup")

The indexOf returns the index of the first occurrence of
the word in the list.

val i2 = words.lastIndexOf("cup")

The lastIndexOf returns the index of the last occurrence of the
word in the list.

val i3 = words.lastIndex

The lastIndex property returns the index of the last item in the
list or -1 if the list is empty

pen
pen
The first index of cup is 1
The last index of cup is 7
The last index of the list is 8

## Kotlin init with random integers

In the next example, we initialize a list with random integer values.

RandInit.kt
  

package com.zetcode

import kotlin.random.Random

fun main() {

    val nums = List(10) { Random.nextInt(0, 100) }
    println(nums)
}

We use Random.nextInt to initialize a list with ten integers
between 0 and 100.

## Kotlin List count

The count method returns the number of elements
in the list.

ListCount.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val len = nums.count()
    println("There are $len elements")

    val size = nums.size
    println("The size of the list is $size")

    val n1 = nums.count { e -&gt; e &lt; 0 }
    println("There are $n1 negative values")

    val n2 = nums.count { e -&gt; e % 2 == 0 }
    println("There are $n2 even values")
}

The example returns the number of values in the list, the number
of negative values and the number of even values.

val len = nums.count()
println("There are $len elements")

val size = nums.size
println("The size of the list is $size")

We can use the count method or the size
property to determine the number of elements in the list.

val n1 = nums.count { e -&gt; e &lt; 0 }

The count can take a predicate function as a parameter.
In our case it returns true for values lower than 0.

val n2 = nums.count { e -&gt; e % 2 == 0 }

We get the number of even values in the list.

There are 11 elements
The size of the list is 11
There are 3 negative values
There are 5 even values

## Kotlin List first and last elements

We have methods to get the first and the last elements of the list.

FirstLast.kt
  

package com.zetcode

fun main() {

    val words = listOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles")

    val w1 = words.first()
    println(w1)

    val w2 = words.last()
    println(w2)

    val w3 = words.findLast { w -&gt; w.startsWith('c') }
    println(w3)

    val w4 = words.first { w -&gt; w.startsWith('c') }
    println(w4)
}

The example creates a list of words. We get the first and the last
elements of the list.

val w1 = words.first()

We get the first element with first.

val w2 = words.last()

We get the last element with last.

val w3 = words.findLast { w -&gt; w.startsWith('c') }

We retrieve the last element of the list that starts with 'c' with
findLast.

val w4 = words.first { w -&gt; w.startsWith('c') }

We retrieve the first element of the list that starts with 'c' with
first.

pen
spectacles
coal
cup

## Kotlin List iterate

List iteration or list looping is the process of going through the list
elements one by one.

Iterate.kt
  

package com.zetcode

fun main() {

    val words = listOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles")

    words.forEach { e -&gt; print("$e ") }
    println()

    for (word in words) {

        print("$word ")
    }

    println()

    for (i in 0 until words.size) {

        print("${words[i]} ")
    }

    println()

    words.forEachIndexed({i, e -&gt; println("words[$i] = $e")})

    val it: ListIterator&lt;String&gt; = words.listIterator()

    while (it.hasNext()) {

        val e = it.next()
        print("$e ")
    }

    println()
}

The example shows five ways of looping over a list in Kotlin.

words.forEach { e -&gt; print("$e ") }

The forEach performs the given action on each list element.
We pass it an anonymous function that prints the current element.

for (word in words) {

    print("$word ")
}

We loop the list with for. The for loop
traverses the list element by element; in each cycle, the word
variable points to the next element in the list.

for (i in 0 until words.size) {

    print("${words[i]} ")
}

An alternative for cycle utilizes the size of the list.
The until keyword creates a range of the list indexes.

words.forEachIndexed({i, e -&gt; println("words[$i] = $e")})

With the forEachIndexed method, we loop over the list
having index and value available in each iteration.

val it: ListIterator&lt;String&gt; = words.listIterator()

while (it.hasNext()) {

    val e = it.next()
    print("$e ")
}

The final way is using a ListIterator and a while
loop.

pen cup dog person cement coal spectacles
pen cup dog person cement coal spectacles
pen cup dog person cement coal spectacles
words[0] = pen
words[1] = cup
words[2] = dog
words[3] = person
words[4] = cement
words[5] = coal
words[6] = spectacles
pen cup dog person cement coal spectacles

## Kotlin List sorting

The following example shows how to sort List values in Kotlin. Since
the lists created with listOf are read-only, the methods
do not alter the list but return a new modified list.

Sorting.kt
  

package com.zetcode

data class Car(val name: String, val price: Int)

fun main() {

    val nums = listOf(11, 5, 3, 8, 1, 9, 6, 2)

    val sortAsc = nums.sorted()
    println(sortAsc)

    val sortDesc = nums.sortedDescending()
    println(sortDesc)

    val revNums = nums.reversed()
    println(revNums)

    val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val res = cars.sortedBy { car -&gt; car.name }
    res.forEach { e -&gt; println(e) }

    println("*************")

    val res2 = cars.sortedByDescending { car -&gt; car.name }
    res2.forEach { e -&gt; println(e) }
}

The example sorts list values in ascending and descending order,
reverses list elements, and sorts car objects by their name.

val sortAsc = nums.sorted()

The sorted method returns a list of all elements sorted
according to their natural sort order.

val sortDesc = nums.sortedDescending()

The sortedDescending method returns a list of all elements
sorted descending according to their natural sort order.

val revNums = nums.reversed()

The reversed method returns a list with elements
in reversed order.

val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

We create a list of car objects. These objects can be sorted by their
name or by their price.

val res = cars.sortedBy { car -&gt; car.name }

With sortedBy, we sort the cars by their names in ascending
order.

val res2 = cars.sortedByDescending { car -&gt; car.name }

With sortedByDescending, we sort the cars by their names in descending
order.

[1, 2, 3, 5, 6, 8, 9, 11]
[11, 9, 8, 6, 5, 3, 2, 1]
[2, 6, 9, 1, 8, 3, 5, 11]
Car(name=Mazda, price=6300)
Car(name=Mercedes, price=18600)
Car(name=Skoda, price=5670)
Car(name=Toyota, price=12400)
*************
Car(name=Toyota, price=12400)
Car(name=Skoda, price=5670)
Car(name=Mercedes, price=18600)
Car(name=Mazda, price=6300)

## Kotlin List contains

With the contains method we can check if a list contains
the specified elements.

Contains.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val r = nums.contains(4)

    if (r) println("The list contains 4")
    else println("The list does not contain 4")

    val r2 = nums.containsAll(listOf(1, -1))

    if (r2) println("The list contains -1 and 1")
    else println("The list does not contain -1 and 1")
}

It is possible to check if a list contains one or more elements.

val r = nums.contains(4)

Here we check if the nums list contains 4. The method
returns a boolean value.

val r2 = nums.containsAll(listOf(1, -1))

This line checks if the list contains two values: 1 and -1.

The list contains 4
The list contains -1 and 1

## Kotlin mutable List

With mutableListOf, we can create mutable lists in Kotlin.
We can add new elements, delete elements, and modify elements in mutable
lists.

Mutable.kt
  

package com.zetcode

fun main() {

    val nums = mutableListOf(3, 4, 5)

    nums.add(6)
    nums.add(7)
    nums.addAll(listOf(8, 9, 10))
    nums.add(0, 0)
    nums.add(1, 1)
    nums.add(2, 2)

    println(nums)

    nums.shuffle()

    println(nums)

    nums.sort()

    println(nums)

    nums.removeAt(0)
    nums.remove(10)

    println(nums)

    nums.replaceAll { e -&gt; e * 2 }

    println(nums)

    nums.retainAll(listOf(12, 14, 16, 18))

    println(nums)

    nums.fill(0)

    println(nums)

    nums.set(0, 22)
    println(nums[0])

    nums.clear()

    if (nums.isEmpty()) println("The list is empty")
    else println("The list is not epty")
}

The example creates a mutable list and presents several its methods.

val nums = mutableListOf(3, 4, 5)

We create a mutable list of three integer elements.

nums.add(6)
nums.add(7)
nums.addAll(listOf(8, 9, 10))

The add adds a new element at the end of the list.
The addAll adds multiple elements at the end of the list.

nums.shuffle()

The shuffle method randomly rearranges the list elements.
The shuffling happens in-place; i.e. the original list is modified.

nums.sort()

The elements are sorted in their natural ascending order.

nums.removeAt(0)
nums.remove(10)

The removeAt method removes an element at the specified
index. The remove method removes the first occurrence
of the specified element from the list.

nums.replaceAll { e -&gt; e * 2 }

The replaceAll method modifies all elements of the list
with the given function. In our case, we create an anonymous function
that multiplies each element by 2.

nums.retainAll(listOf(12, 14, 16, 18))

The retainAll method retains only elements specified
in the parameter; others are removed.

nums.fill(0)

The fill method replaces all elements with the given
value.

nums.set(0, 22)

The set method replaces the element at the specified
position in the list with the given element.

nums.clear()

The clear method removes all elements from the list.

if (nums.isEmpty()) println("The list is empty")
else println("The list is not epty")

With the isEmpty method we check if the list is empty.

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[2, 3, 6, 1, 8, 0, 7, 5, 10, 9, 4]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[2, 4, 6, 8, 10, 12, 14, 16, 18]
[12, 14, 16, 18]
[0, 0, 0, 0]
22
The list is empty

## Kotlin List slices

A slice is a portion of a list. Slices can be created with the slice
method. The method takes indexes of the elements to be picked up.

Slice.kt
  

package com.zetcode

fun main() {

    val nums = listOf(1, 2, 3, 4, 5, 6)

    val nums2 = nums.slice(1..3)
    println(nums2)

    val nums3 = nums.slice(listOf(3, 4, 5))
    println(nums3)
}

In the example, we create a list of integers. From the list we produce
two slices.

val nums2 = nums.slice(1..3)

We use a range operator to create a list slice with elements having
indexes 1, 2, and 3. All indexes are inclusive.

val nums3 = nums.slice(listOf(3, 4, 5))

In the second example, we explicitly provide a list of indexes.

[2, 3, 4]
[4, 5, 6]

## Kotlin List maximum

The following example deals with finding the maximum value of a list.

ListMax.kt
  

package com.zetcode

data class Car(val name: String, val price: Int)

fun main() {

    val nums = listOf(11, 5, 23, 8, 1, 9, 6, 2)

    println(nums.max())

    val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val car = cars.maxBy { car -&gt; car.price }
    println("The max price is ${car.price} of ${car.name}")
}

The example finds a maximum of a list of integers and a list of car
objects.

val nums = listOf(11, 5, 23, 8, 1, 9, 6, 2)

println(nums.max())

The maximum of a list of integers is easily found with max.

val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

val car = cars.maxBy { car -&gt; car.price }
println("The max price is ${car.price} of ${car.name}")

When we deal with objects, we need to specify the attribute by which we find the
maximum. The maxBy method is given a selector function that chooses
the price attribute of the car.

23
The max price is 18600 of Mercedes

## Kotlin List filter

Filtering is an opertion where only elements that meet certain criteria pass
through.

Filter.kt
  

package com.zetcode

data class Car(val name: String, val price: Int)

fun main() {

    val words = listOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles")

    val words2 = words.filter { e -&gt; e.length == 3 }
    words2.forEach { e -&gt; print("$e ") }

    println()

    val words3 = words.filterNot { e -&gt; e.length == 3 }

    words3.forEach { e -&gt; print("$e ") }

    println()

    val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val res = cars.filter { car -&gt; car.price &gt; 10000 }
    res.forEach { e -&gt; println(e) }
}

The example presents the filtering operation on Kotlin lists.

val words2 = words.filter { e -&gt; e.length == 3 }

The filter method takes a predicate function as a parameter.
The predicate gives a condition that the elements must meet.
We filter out words whose length equals to 3.

val words3 = words.filterNot { e -&gt; e.length == 3 }

The filterNot does the opposite: it allows to pass through
elements that do not meet the given criteria.

val cars = listOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

val res = cars.filter { car -&gt; car.price &gt; 10000 }

These lines filter out the car objects whose price is bigger than 10000.

pen cup dog
person cement coal spectacles
Car(name=Toyota, price=12400)
Car(name=Mercedes, price=18600)

## Kotlin List map

The mapping operation returns a modified list by applying a transform
function on each element of the list.

ListMap.kt
  

package com.zetcode

fun main() {

    val nums = listOf(1, 2, 3, 4, 5, 6)

    val nums2 = nums.map { e -&gt; e * 2 }
    println(nums2)
}

We have a list of integers. With the map method,
we multiply each list element by 2.

[2, 4, 6, 8, 10, 12]

## Kotlin List reduction

Reduction is a terminal operation that aggregates list values
into a single value. The reduce method applies a function
against an accumulator and each element (from left to right) to
reduce it to a single value.

Reduce.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, 1, 7, 6, 8, 9)

    val sum = nums.reduce { total, next -&gt; total + next }
    println(sum)

    val colours = listOf("red", "green", "white", "blue", "black")

    val res = colours.reduceRight { next, total -&gt; "$total-$next" }
    println(res)
}

In the example, we use the reduce operation on a list of integers and
strings.

val sum = nums.reduce { total, next -&gt; total + next }

We calculate the sum of values. The total is the accumulator,
the next is the next value in the list.

val res = colours.reduceRight { next, total -&gt; "$total-$next" }

The reduceRight accumulates value starting with last
element and applying the operation from right to left to each element
and current accumulator value.

45
black-blue-white-green-red

## Kotlin List fold

The folding operation is similar to the reduction. Folding is
a terminal operation that aggregates list values into a single value.
The difference is that folding starts with an initial value.

ListFold.kt
  

package com.zetcode

fun main() {

    val expenses = listOf(20, 40, 80, 15, 25)

    val cash = 550

    val res = expenses.fold(cash) {total, next -&gt; total - next}
    println(res)
}

We have a list of expenses. These expenses are applied on the initial
amount of cash available.

val res = expenses.fold(cash) {total, next -&gt; total - next}

With the fold we deduce all the expenses from the
cash and return the remaining value.

370

This is the amount that we have after subtracting all the expenses
on the available amount of money.

## Kotlin List chunks

Sometimes we need to work with more elements of a list when doing
reductions. We can use the chunked method to split
the list into a list of lists.

ListChunked.kt
  

package com.zetcode

fun main() {

    val nums = listOf(1, 2, 3, 4, 5, 6)

    val res = nums.chunked(2).fold(0) { total, next -&gt; total + next[0] * next[1] }

    println(res)
}

In the example, we have a list of six values. We want to achieve the
following operation: 1*2 + 3*4 + 5*6. For this, we need to
split the list into chunks of two values.

val res = nums.chunked(2).fold(0) { total, next -&gt; total + next[0] * next[1] }

We split the list into a list of two-element lists and apply a fold
on it. The next is a list on which we can use the indexing
operations.

44

## Kotlin List partition

The partition operation splits the original collection into pair of lists.
The first list contains elements for which the specified predicate
yields true, while the second list contains elements for which the
predicate yields false.

ListPartition.kt
  

package com.zetcode

fun main(args: Array&lt;String&gt;) {

    val nums = listOf(4, -5, 3, 2, -1, 7, -6, 8, 9)

    val (nums2, nums3) = nums.partition { e -&gt; e &lt; 0 }
    println(nums2)
    println(nums3)
}

We have a list of integers. With the partition method,
we split the list into two sublists; one contains negative, the other
one positive values.

val (nums2, nums3) = nums.partition { e -&gt; e &lt; 0 }

Using destructuring declaration, we split the list into two parts
in one go.

[-5, -1, -6]
[4, 3, 2, 7, 8, 9]

## Kotlin List group by

The groupBy method groups elements of the original
list by the key returned by the given selector function, applied to each
element. It returns a map where each group key is associated with a
list of corresponding elements.

ListGroupBy.kt
  

package com.zetcode

fun main() {

    val nums = listOf(1, 2, 3, 4, 5, 6, 7, 8)

    val res = nums.groupBy { if (it % 2 == 0) "even" else "odd" }
    println(res)

    val words = listOf("as", "pen", "cup", "doll", "my", "dog", "spectacles")

    val res2 = words.groupBy { it.length }
    println(res2)
}

The example shows how to use the groupBy method.

val nums = listOf(1, 2, 3, 4, 5, 6, 7, 8)

val res = nums.groupBy { if (it % 2 == 0) "even" else "odd" }
println(res)

These lines create a map, which has two keys: "even" and "odd".
The "even" points to a list of even values and the "odd" to a list
of odd values.

val words = listOf("as", "pen", "cup", "doll", "my", "dog", "spectacles")

val res2 = words.groupBy { it.length }

Here we create a map with integer keys. Each key groups words that have
a certain length.

{odd=[1, 3, 5, 7], even=[2, 4, 6, 8]}
{2=[as, my], 3=[pen, cup, dog], 4=[doll], 10=[spectacles]}

## Kotlin List any

The any method returns true if at least one element
matches the given predicate function.

ListAny.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, -1, 7, 6, 8, 9)

    val r = nums.any { e -&gt; e &gt; 10 }
    if (r) println("There is a value greater than ten")
    else println("There is no value greater than ten")

    val r2 = nums.any { e -&gt; e &lt; 0 }
    if (r2) println("There is a negative value")
    else println("There is no negative value")
}

The example shows the usage of any.

val r2 = nums.any { e -&gt; e &lt; 0 }

Here we check if the list contains at least one negative value. The method
returns a Boolean value.

## Kotlin List all

The all returns true if all elements satisfy the given
predicate function.

ListAll.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, -1, 7, 6, 8, 9)
    val nums2 = listOf(-3, -4, -2, -5, -7, -8)

    // testing for positive only values
    val r = nums.all { e -&gt; e &gt; 0 }

    if (r) println("nums list contains only positive values")
    else println("nums list does not contain only positive values")

    // testing for negative only values
    val r2 = nums2.all { e -&gt; e &lt; 0 }

    if (r2) println("nums2 list contains only negative values")
    else println("nums2 list does not contain only negative values")
}

The example shows the usage of all.

// testing for positive only values
val r = nums.all { e -&gt; e &gt; 0 }

Here we test if the nums list contains only positive
values.

## Kotlin List drop

With the drop operations, we exclude some elements from the list.

ListDrop.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val nums2 = nums.drop(3)
    println(nums2)

    val nums3 = nums.dropLast(3)
    println(nums3)

    val nums4 = nums.sorted().dropWhile { e -&gt; e &lt; 0 }
    println(nums4)

    val nums5 = nums.sorted().dropLastWhile { e -&gt; e &gt; 0 }
    println(nums5)
}

The example shows the usage of different drop operations.

val nums2 = nums.drop(3)

With the drop method, we exclude the first three elements.

val nums3 = nums.dropLast(3)

With the dropLast method, we exclude the last three elements.

val nums4 = nums.sorted().dropWhile { e -&gt; e &lt; 0 }

With the dropWhile method, we exclude the first n
elements that satisfy the given predicate function.

val nums5 = nums.sorted().dropLastWhile { e -&gt; e &gt; 0 }

With the dropLastWhile method, we exclude the last n
elements that satisfy the given predicate function.

[2, 1, -1, 7, 6, -8, 9, -12]
[4, 5, 3, 2, 1, -1, 7, 6]
[1, 2, 3, 4, 5, 6, 7, 9]
[-12, -8, -1]

## Kotlin List take

The take operations are complementary to the drop operations.
The take methods form a new list by picking some of the elements.

ListTake.kt
  

package com.zetcode

fun main() {

    val nums = listOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val nums2 = nums.take(3)
    println(nums2)

    val nums3 = nums.takeLast(3)
    println(nums3)

    val nums4 = nums.sorted().take(3)
    println(nums4)

    val nums5 = nums.takeWhile { e -&gt; e &gt; 0 }
    println(nums5)

    val nums6 = nums.sortedDescending().takeWhile { e -&gt; e &gt; 0 }
    println(nums6)

    val nums7 = nums.takeIf { e -&gt; e.contains(6) }
    println(nums7)
}

The example shows the usage of various take methods.

val nums2 = nums.take(3)

The take method creates a new list having the first
three elements of the original list.

val nums3 = nums.takeLast(3)

The takeLast method takes the last elements into the
new list.

val nums5 = nums.takeWhile { e -&gt; e &gt; 0 }

The takeWhile takes the first n elements that satisfy
the predicate function.

val nums7 = nums.takeIf { e -&gt; e.contains(6) }

The takeIf methods takes all elements of the list if
the condition in the predicate function is met.

[4, 5, 3]
[-8, 9, -12]
[-12, -8, -1]
[4, 5, 3, 2, 1]
[9, 7, 6, 5, 4, 3, 2, 1]
[4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12]

## Source

[Kotlin List - language reference](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/)

In this article we have covered Kotlin lists.

List [all Kotlin tutorials](/kotlin/).