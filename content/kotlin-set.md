+++
title = "Kotlin set"
date = 2025-08-29T20:02:52.936+01:00
draft = false
description = "Kotlin set tutorial shows how to work with sets in Kotlin. A set is a generic unordered collection of elements that does not support duplicate elements."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin set

last modified January 29, 2024

In this article we show how to work with sets in Kotlin. A set is a generic
unordered collection of elements which allows no duplicates.

Kotlin distinguishes between read-only and mutable sets. Read-only sets are
created with setOf and mutable set with
mutableSetOf.

## Kotlin setOf

The setOf method creates a new read-only set in Kotlin.

SetOf.kt
  

package com.zetcode

fun main() {

    val words = setOf("pen", "cup", "dog", "spectacles")
    println("The set contains ${words.size} elements.")
}

The example creates a new set of words with setOf.
The size of the set is determined with the size attribute.

A set cannot contain duplicate elements.

NoDuplicates.kt
  

package com.zetcode

fun main() {

    val words2 = setOf("pen", "cup", "dog", "pen", "spectacles")
    words2.forEach { e -&gt; println(e)}
}

Even though we have added two pens into the setOf, there will be
only one element of pen.

pen
cup
dog
spectacles

## Kotlin Set basics

In the next example, we have a simple Kotlin Set example.

SetBasic.kt
  

package com.zetcode

fun main() {

    val nums = setOf(11, 5, 3, 8, 1, 9, 6, 2)

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

The example creates a set of numbers and computes some statistics.

val nums = setOf(11, 5, 3, 8, 1, 9, 6, 2)

A Kotlin read-only set is created with setOf function.

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

## Kotlin Set indexing

Each element of a set has an index. Kotlin set indexes start from zero. The last
element has len-1 index.

SetIndex.kt
  

package com.zetcode

fun main() {

    val words = setOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles", "cup", "bread")

    val w1 = words.elementAt(0)
    println(w1)

    val i1 = words.indexOf("cup")
    println("The first index of cup is $i1")

    val i2 = words.lastIndexOf("cup")
    println("The last index of cup is $i2")
}

The example presents Kotlin Set indexing operations.

val w1 = words.elementAt(0)

An element is retrieved with the elementAt method. The method takes
an index of the element to be retrieved as a parameter.

val i1 = words.indexOf("cup")

The indexOf returns the index of the first occurrence of the word
in the set.

val i2 = words.lastIndexOf("cup")

The lastIndexOf returns the index of the last occurrence of the
word in the set.

pen
The first index of cup is 1
The last index of cup is 1

## Kotlin Set count

The count method returns the number of elements in the set.

SetCount.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val len = nums.count()
    println("There are $len elements")

    val size = nums.size
    println("The size of the set is $size")

    val n1 = nums.count { e -&gt; e &lt; 0 }
    println("There are $n1 negative values")

    val n2 = nums.count { e -&gt; e % 2 == 0 }
    println("There are $n2 even values")
}

The example returns the number of values in the set, the number of negative
values and the number of even values.

val len = nums.count()
println("There are $len elements")

val size = nums.size
println("The size of the set is $size")

We can use the count method or the size
property to determine the number of elements in the set.

val n1 = nums.count { e -&gt; e &lt; 0 }

The count can take a predicate function as a parameter. In our case
it returns true for values lower than 0.

val n2 = nums.count { e -&gt; e % 2 == 0 }

We get the number of even values in the set.

There are 11 elements
The size of the set is 11
There are 3 negative values
There are 5 even values

## Kotlin Set first and last elements

We have methods to get the first and the last elements of the set.

FirstLast.kt
  

package com.zetcode

fun main() {

    val words = setOf("pen", "cup", "dog", "person",
            "cement", "coal", "donkey", "spectacles")

    val w1 = words.first()
    println(w1)

    val w2 = words.last()
    println(w2)

    val w3 = words.findLast { w -&gt; w.startsWith('d') }
    println(w3)

    val w4 = words.first { w -&gt; w.startsWith('d') }
    println(w4)
}

The example creates a set of words. We get the first and the last elements of
the set.

val w1 = words.first()

We get the first element with first.

val w2 = words.last()

We get the last element with last.

val w3 = words.findLast { w -&gt; w.startsWith('d') }

We retrieve the last element of the set that starts with 'd' with
findLast.

val w4 = words.first { w -&gt; w.startsWith('d') }

We retrieve the first element of the set that starts with 'd' with
first.

pen
spectacles
donkey
dog

## Kotlin Set iterate

Set iteration or Set looping is the process of going through the set
elements one by one.

KotlinSetIterate.kt
  

package com.zetcode

fun main() {

    val words = setOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles")

    words.forEach { e -&gt; print("$e ") }
    println()

    for (word in words) {

        print("$word ")
    }

    println()

    for (i in 0 until words.size) {

        print("${words.elementAt(i)} ")
    }

    println()

    words.forEachIndexed({i, e -&gt; println("$i - $e")})

    val it: Iterator&lt;String&gt; = words.asIterable().iterator()

    while (it.hasNext()) {

        val e = it.next()
        print("$e ")
    }

    println()
}

The example shows five ways of looping over a set in Kotlin.

words.forEach { e -&gt; print("$e ") }

The forEach performs the given action on each set element. We pass
it an anonymous function that prints the current element.

for (word in words) {

    print("$word ")
}

We loop the set with for. The for loop traverses the
set element by element; in each cycle, the word
variable points to the next element in the set.

for (i in 0 until words.size) {

    print("${words.elementAt(i)} ")
}

An alternative for cycle utilizes the size of the set. The
until keyword creates a range of the set indexes.

words.forEachIndexed({i, e -&gt; println("$i - $e")})

With the forEachIndexed method, we loop over the set
having index and value available in each iteration.

val it: Iterator&lt;String&gt; = words.asIterable().iterator()

while (it.hasNext()) {

    val e = it.next()
    print("$e ")
}

The final way is using a Iterator and a while
loop.

pen cup dog person cement coal spectacles
pen cup dog person cement coal spectacles
pen cup dog person cement coal spectacles
0 - pen
1 - cup
2 - dog
3 - person
4 - cement
5 - coal
6 - spectacles
pen cup dog person cement coal spectacles

## Kotlin Set sorting

The following example shows how to sort Set values in Kotlin. Since the sets
created with setOf are read-only, the methods do not alter the set
but return a new modified list.

Sorting.kt
  

package com.zetcode

data class Car(var name: String, var price: Int)

fun main() {

    val nums = setOf(11, 5, 3, 8, 1, 9, 6, 2)

    val sortAsc = nums.sorted()
    println(sortAsc)

    val sortDesc = nums.sortedDescending()
    println(sortDesc)

    val revNums = nums.reversed()
    println(revNums)

    val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val res = cars.sortedBy { car -&gt; car.name }
    res.forEach { e -&gt; println(e) }

    println("*************")

    val res2 = cars.sortedByDescending { car -&gt; car.name }
    res2.forEach { e -&gt; println(e) }
}

The example sorts set values in ascending and descending order, reverses set
elements, and sorts car objects by their name.

val sortAsc = nums.sorted()

The sorted method returns a list of all elements sorted according
to their natural sort order.

val sortDesc = nums.sortedDescending()

The sortedDescending method returns a list of all elements sorted
descending according to their natural sort order.

val revNums = nums.reversed()

The reversed method returns a list with elements in reversed order.

val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

We create a set of car objects. These objects can be sorted by their
name or by their price.

val res = cars.sortedBy { car -&gt; car.name }

With sortedBy, we sort the cars by their names in ascending
order.

val res2 = cars.sortedByDescending { car -&gt; car.name }

With sortedByDescending, we sort the cars by their names in
descending order.

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

## Kotlin Set contains

With the contains method we can check if a set contains
the specified elements.

Contains.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val r = nums.contains(4)

    if (r) println("The set contains 4")
    else println("The set does not contain 4")

    val r2 = nums.containsAll(setOf(1, -1))

    if (r2) println("The set contains -1 and 1")
    else println("The set does not contain -1 and 1")
}

It is possible to check if a set contains one or more elements.

val r = nums.contains(4)

Here we check if the nums set contains 4. The method
returns a boolean value.

val r2 = nums.containsAll(setOf(1, -1))

This line checks if the set contains two values: 1 and -1.

The set contains 4
The set contains -1 and 1

## Kotlin mutable Set

With mutableSetOf, we can create mutable sets in Kotlin.

Mutable.kt
  

package com.zetcode

fun main() {

    val nums = mutableSetOf(3, 4, 5)

    nums.add(6)
    nums.add(7)
    nums.addAll(setOf(8, 9, 10))

    println(nums)

    nums.remove(10)

    println(nums)

    nums.retainAll(setOf(12, 14, 16, 18))

    println(nums)

    nums.clear()

    if (nums.isEmpty()) println("The set is empty")
    else println("The set is not epty")
}

The example creates a mutable set and presents several its methods.

val nums = mutableSetOf(3, 4, 5)

We create a mutable set of three integer elements.

nums.add(6)
nums.add(7)
nums.addAll(setOf(8, 9, 10))

The add adds a new element at the end of the set.
The addAll adds multiple elements at the end of the set.

nums.clear()

The clear method removes all elements from the set.

if (nums.isEmpty()) println("The set is empty")
else println("The set is not epty")

With the isEmpty method we check if the set is empty.

[3, 4, 5, 6, 7, 8, 9, 10]
[3, 4, 5, 6, 7, 8, 9]
[]
The set is empty

## Kotlin Set union

The union operation returns a set containing all distinct elements from both
collections.

Union.kt
  

package com.zetcode

fun main() {

    val nums = setOf(1, 2, 3)
    val nums2 = setOf(3, 4, 5)

    val nums3 = nums.union(nums2)

    println(nums3)
}

In the example, we have two sets of integers. We join the sets with
the union method.

[1, 2, 3, 4, 5]

## Kotlin Set maximum

The following example shows how to find the maximum value of a set.

Max.kt
  

package com.zetcode

data class Car(var name: String, var price: Int)

fun main() {

    val nums = setOf(11, 5, 23, 8, 1, 9, 6, 2)

    println(nums.max())

    val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val car = cars.maxBy { car -&gt; car.price }
    println("The max price is ${car.price} of ${car.name}")
}

The example finds a maximum of a set of integers and a set of car
objects.

val nums = setOf(11, 5, 23, 8, 1, 9, 6, 2)

println(nums.max())

The maximum of a set of integers is easily found with max.

val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

val car = cars.maxBy { car -&gt; car.price }
println("The max price is ${car.price} of ${car.name}")

When we deal with objects, we need to specify the attribute by which we find the
maximum. The maxBy method is given a selector function that chooses
the price attribute of the car.

23
The max price is 18600 of Mercedes

## Kotlin Set filter

Filtering is an opertion where only elements that meet certain criteria pass
through.

Filter.kt
  

package com.zetcode

data class Car(var name: String, var price: Int)

fun main() {

    val words = setOf("pen", "cup", "dog", "person",
            "cement", "coal", "spectacles")

    val words2 = words.filter { e -&gt; e.length == 3 }
    words2.forEach { e -&gt; print("$e ") }

    println()

    val words3 = words.filterNot { e -&gt; e.length == 3 }

    words3.forEach { e -&gt; print("$e ") }

    println()

    val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
            Car("Skoda", 5670), Car("Mercedes", 18600))

    val res = cars.filter { car -&gt; car.price &gt; 10000 }
    res.forEach { e -&gt; println(e) }
}

The example presents the filtering operation on Kotlin sets.

val words2 = words.filter { e -&gt; e.length == 3 }

The filter method takes a predicate function as a parameter.
The predicate gives a condition that the elements must meet.
We filter out words whose length equals to 3.

val words3 = words.filterNot { e -&gt; e.length == 3 }

The filterNot does the opposite: it allows to pass through
elements that do not meet the given criteria.

val cars = setOf(Car("Mazda", 6300), Car("Toyota", 12400),
        Car("Skoda", 5670), Car("Mercedes", 18600))

val res = cars.filter { car -&gt; car.price &gt; 10000 }

These lines filter out the car objects whose price is bigger than 10000.

pen cup dog
person cement coal spectacles
Car(name=Toyota, price=12400)
Car(name=Mercedes, price=18600)

## Kotlin Set map

The mapping operation returns a modified list by applying a transform
function on each element of the set.

MapFun.kt
  

package com.zetcode

fun main() {

    val nums = setOf(1, 2, 3, 4, 5, 6)

    val nums2 = nums.map { e -&gt; e * 2 }
    println(nums2)
}

We have a set of integers. With the map function, we multiply each
set element by 2. The function returs a new list.

[2, 4, 6, 8, 10, 12]

## Kotlin Set reduction

Reduction is a terminal operation that aggregates set values into a
single value. The reduce method applies a function against an
accumulator and each element (from left to right) to reduce it to a single
value.

Reduce.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, 1, 7, 6, 8, 9)

    val sum = nums.reduce { total, next -&gt; total + next }
    println(sum)
}

In the example, we use the reduce operation on a set of integers.

val sum = nums.reduce { total, next -&gt; total + next }

We calculate the sum of values. The total is the accumulator,
the next is the next value in the list.

45

## Kotlin Set fold

The folding operation is similar to the reduction. Folding is a
terminal operation that aggregates set values into a single value. The
difference is that folding starts with an initial value.

Fold.kt
  

package com.zetcode

fun main() {

    val expenses = setOf(20, 40, 80, 15, 25)

    val cash = 550

    val res = expenses.fold(cash) {total, next -&gt; total - next}
    println(res)
}

We have a set of expenses. These expenses are applied on the initial
amount of cash available.

val res = expenses.fold(cash) {total, next -&gt; total - next}

With the fold we deduce all the expenses from the
cash and return the remaining value.

370

This is the amount that we have after subtracting all the expenses on the
available amount of money.

## Kotlin Set chunked

Sometimes we need to work with more elements of a set when doing reductions. We
can use the chunked method to split the set into a list of lists.

Chunked.kt
  

package com.zetcode

fun main() {

    val nums = setOf(1, 2, 3, 4, 5, 6)

    val res = nums.chunked(2).fold(0) { total, next -&gt; total + next[0] * next[1] }

    println(res)
}

In the example, we have a set of six values. We want to achieve the following
operation: 1*2 + 3*4 + 5*6. For this, we need to split the list
into chunks of two values.

val res = nums.chunked(2).fold(0) { total, next -&gt; total + next[0] * next[1] }

We split the set into a list of two-element lists and apply a fold on it. The
next is a list on which we can use the indexing operations.

44

## Kotlin Set partition

The partition operation splits the original collection into pair of lists. The
first list contains elements for which the specified predicate yields true,
while the second list contains elements for which the predicate yields false.

Partition.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, -5, 3, 2, -1, 7, -6, 8, 9)

    val (nums2, nums3) = nums.partition { e -&gt; e &lt; 0 }

    println(nums2)
    println(nums3)
}

We have a set of integers. With the partition method, we split the
set into two sublists; one contains negative, the other one positive values.

val (nums2, nums3) = nums.partition { e -&gt; e &lt; 0 }

Using destructuring declaration, we split the set into two parts in one go.

[-5, -1, -6]
[4, 3, 2, 7, 8, 9]

## Kotlin Set groupBy

The groupBy method groups elements of the original set by the key
returned by the given selector function, applied to each element. It returns a
map where each group key is associated with a list of corresponding elements.

GroupBy.kt
  

package com.zetcode

fun main() {

    val nums = setOf(1, 2, 3, 4, 5, 6, 7, 8)

    val res = nums.groupBy { if (it % 2 == 0) "even" else "odd" }
    println(res)

    val words = setOf("as", "pen", "cup", "doll", "my", "dog", "spectacles")

    val res2 = words.groupBy { it.length }
    println(res2)
}

The example shows how to use the groupBy method.

val nums = setOf(1, 2, 3, 4, 5, 6, 7, 8)

val res = nums.groupBy { if (it % 2 == 0) "even" else "odd" }
println(res)

These lines create a map, which has two keys: "even" and "odd". The "even"
points to a list of even values and the "odd" to a list of odd values.

val words = setOf("as", "pen", "cup", "doll", "my", "dog", "spectacles")

val res2 = words.groupBy { it.length }

Here we create a map with integer keys. Each key groups words that have
a certain length.

{odd=[1, 3, 5, 7], even=[2, 4, 6, 8]}
{2=[as, my], 3=[pen, cup, dog], 4=[doll], 10=[spectacles]}

## Kotlin Set any

The any method returns true if at least one element matches the
given predicate function.

AnyFun.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, -1, 7, 6, 8, 9)

    val r = nums.any { e -&gt; e &gt; 10 }
    if (r) println("There is a value greater than ten")
    else println("There is no value greater than ten")

    val r2 = nums.any { e -&gt; e &lt; 0 }
    if (r2) println("There is a negative value")
    else println("There is no negative value")

The example shows the usage of any.

val r2 = nums.any { e -&gt; e &lt; 0 }

Here we check if the set contains at least one negative value. The method
returns a Boolean value.

## Kotlin Set all

The all returns true if all elements satisfy the given predicate
function.

AllFun.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, -1, 7, 6, 8, 9)
    val nums2 = setOf(-3, -4, -2, -5, -7, -8)

    // testing for positive only values
    val r = nums.all { e -&gt; e &gt; 0 }

    if (r) println("nums set contains only positive values")
    else println("nums set does not contain only positive values")

    // testing for negative only values
    val r2 = nums2.all { e -&gt; e &lt; 0 }

    if (r2) println("nums2 set contains only negative values")
    else println("nums2 set does not contain only negative values")
}

The example shows the usage of all.

// testing for positive only values
val r = nums.all { e -&gt; e &gt; 0 }

Here we test if the nums set contains only positive
values.

## Kotlin Set drop

With the drop operations, we exclude some elements from the set.

Dropping.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val nums2 = nums.drop(3)
    println(nums2)

    val nums3 = nums.sorted().dropWhile { e -&gt; e &lt; 0 }
    println(nums3)

    val nums4 = nums.sorted().dropLastWhile { e -&gt; e &gt; 0 }
    println(nums4)
}

The example shows the usage of different drop operations.

val nums2 = nums.drop(3)

With the drop method, we exclude the first three elements.

val nums3 = nums.sorted().dropWhile { e -&gt; e &lt; 0 }

With the dropWhile method, we exclude the first n
elements that satisfy the given predicate function.

val nums4 = nums.sorted().dropLastWhile { e -&gt; e &gt; 0 }

With the dropLastWhile method, we exclude the last n
elements that satisfy the given predicate function.

[2, 1, -1, 7, 6, -8, 9, -12]
[1, 2, 3, 4, 5, 6, 7, 9]
[-12, -8, -1]

## Kotlin List take

The take operations are complementary to the drop operations. The take methods
form a new list by picking some of the set elements.

Taking.kt
  

package com.zetcode

fun main() {

    val nums = setOf(4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12)

    val nums2 = nums.take(3)
    println(nums2)

    val nums3 = nums.sorted().take(3)
    println(nums3)

    val nums4 = nums.takeWhile { e -&gt; e &gt; 0 }
    println(nums4)

    val nums5 = nums.sortedDescending().takeWhile { e -&gt; e &gt; 0 }
    println(nums5)

    val nums6 = nums.takeIf { e -&gt; e.contains(6) }
    println(nums6)
}

The example shows the usage of various take methods.

val nums2 = nums.take(3)

The take method creates a new list having the first
three elements of the original set.

val nums4 = nums.takeWhile { e -&gt; e &gt; 0 }

The takeWhile takes the first n elements that satisfy
the predicate function.

val nums6 = nums.takeIf { e -&gt; e.contains(6) }

The takeIf methods takes all elements of the set if
the condition in the predicate function is met.

[4, 5, 3]
[-12, -8, -1]
[4, 5, 3, 2, 1]
[9, 7, 6, 5, 4, 3, 2, 1]
[4, 5, 3, 2, 1, -1, 7, 6, -8, 9, -12]

## Source

[Kotlin Set - language reference](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-set/)

In this article we have covered Kotlin sets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).