+++
title = "Kotlin tailrec Keyword"
date = 2025-08-29T20:02:56.478+01:00
draft = false
description = "Kotlin tailrec keyword tutorial shows how to optimize recursive functions in Kotlin. Learn about tail recursion optimization with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin tailrec Keyword

last modified April 19, 2025

Kotlin's tailrec keyword enables tail recursion optimization for
recursive functions. This optimization prevents stack overflow errors by
converting recursion to iteration. This tutorial explores the tailrec
keyword in depth with practical examples.

## Basic Definitions

Tail recursion is a special form of recursion where the recursive call is the
last operation in the function. The tailrec modifier tells the
Kotlin compiler to optimize this recursion into an efficient loop. This avoids
stack overflow for deep recursion.

## Basic tailrec Example

The simplest example of tail recursion is calculating factorial. However,
factorial isn't naturally tail recursive. Here's a tail recursive version using
an accumulator.

Factorial.kt
  

package com.zetcode

fun factorial(n: Int): Int {
    tailrec fun fact(n: Int, acc: Int): Int {
        return if (n == 0) acc else fact(n - 1, n * acc)
    }
    return fact(n, 1)
}

fun main() {
    println(factorial(5)) // Output: 120
}

This example shows a nested tail recursive function. The recursive call to
fact is the last operation. The compiler optimizes this to use
constant stack space. The accumulator holds intermediate results.

## Sum of Numbers

Calculating the sum of numbers from 1 to n is a classic tail recursive problem.
Here's how to implement it with tailrec.

Sum.kt
  

package com.zetcode

fun sum(n: Int): Int {
    tailrec fun sumTail(n: Int, acc: Int): Int {
        return if (n == 0) acc else sumTail(n - 1, acc + n)
    }
    return sumTail(n, 0)
}

fun main() {
    println(sum(100)) // Output: 5050
}

The sumTail function accumulates the sum in the acc
parameter. Each recursive call adds the current number to the accumulator. The
recursion stops when n reaches 0.

## Fibonacci Sequence

The Fibonacci sequence can be implemented efficiently with tail recursion. This
avoids the exponential time complexity of naive recursive implementations.

Fibonacci.kt
  

package com.zetcode

fun fibonacci(n: Int): Int {
    tailrec fun fib(n: Int, a: Int, b: Int): Int {
        return if (n == 0) a else fib(n - 1, b, a + b)
    }
    return fib(n, 0, 1)
}

fun main() {
    println(fibonacci(10)) // Output: 55
}

This implementation uses two accumulators (a and b) to hold the previous two
Fibonacci numbers. The recursive call shifts these values and calculates the next
number. This runs in O(n) time with constant space.

## List Operations

Tail recursion works well with list operations. Here's how to reverse a list
using tail recursion.

ReverseList.kt
  

package com.zetcode

fun &lt;T&gt; reverseList(list: List&lt;T&gt;): List&lt;T&gt; {
    tailrec fun reverseTail(remaining: List&lt;T&gt;, acc: List&lt;T&gt;): List&lt;T&gt; {
        return if (remaining.isEmpty()) acc 
               else reverseTail(remaining.drop(1), listOf(remaining.first()) + acc)
    }
    return reverseTail(list, emptyList())
}

fun main() {
    println(reverseList(listOf(1, 2, 3, 4, 5))) // Output: [5, 4, 3, 2, 1]
}

The reverseTail function builds the reversed list in the accumulator.
Each recursive call takes the first element of the remaining list and prepends it
to the accumulator. This efficiently reverses the list.

## GCD Calculation

The Euclidean algorithm for calculating greatest common divisor (GCD) is naturally
tail recursive. Here's the Kotlin implementation.

Gcd.kt
  

package com.zetcode

fun gcd(a: Int, b: Int): Int {
    tailrec fun gcdTail(a: Int, b: Int): Int {
        return if (b == 0) a else gcdTail(b, a % b)
    }
    return gcdTail(a, b)
}

fun main() {
    println(gcd(48, 18)) // Output: 6
}

The gcdTail function implements the Euclidean algorithm. The
recursive call is the last operation, making it tail recursive. The compiler
optimizes this to use constant stack space.

## Power Calculation

Calculating powers can be done efficiently with tail recursion using the
exponentiation by squaring method.

Power.kt
  

package com.zetcode

fun power(base: Int, exponent: Int): Int {
    tailrec fun powerTail(base: Int, exponent: Int, acc: Int): Int {
        return when {
            exponent == 0 -&gt; acc
            exponent % 2 == 1 -&gt; powerTail(base, exponent - 1, acc * base)
            else -&gt; powerTail(base * base, exponent / 2, acc)
        }
    }
    return powerTail(base, exponent, 1)
}

fun main() {
    println(power(2, 10)) // Output: 1024
}

This implementation efficiently calculates powers in O(log n) time. The
accumulator holds the intermediate result. The function handles both odd and even
exponents differently to optimize the calculation.

## Binary Search

Binary search can be implemented with tail recursion, though it's typically done
iteratively. Here's the tail recursive version.

BinarySearch.kt
  

package com.zetcode

fun binarySearch(list: List&lt;Int&gt;, target: Int): Int? {
    tailrec fun search(low: Int, high: Int): Int? {
        if (low &gt; high) return null
        val mid = (low + high) / 2
        return when {
            list[mid] == target -&gt; mid
            list[mid] &lt; target -&gt; search(mid + 1, high)
            else -&gt; search(low, mid - 1)
        }
    }
    return search(0, list.size - 1)
}

fun main() {
    val list = listOf(1, 3, 5, 7, 9, 11, 13)
    println(binarySearch(list, 7)) // Output: 3
}

The search function implements binary search recursively. The
recursive calls are tail calls, so the compiler optimizes them. This maintains
the O(log n) time complexity of binary search.

## Best Practices for tailrec

**Ensure tail position:** The recursive call must be the last
operation in the function.
**Use accumulators:** Often needed to make functions tail
recursive.
**Check optimization:** Verify the compiler is optimizing by
examining bytecode.
**Consider readability:** Sometimes iterative solutions may be
more readable.
**Test edge cases:** Especially important for recursive
functions.

## Source

[Kotlin Tail Recursion Documentation](https://kotlinlang.org/docs/functions.html#tail-recursive-functions)

This tutorial covered Kotlin's tailrec keyword in depth, showing how
to optimize recursive functions. We explored various scenarios including
mathematical operations, list processing, and searching algorithms. Proper use
of tail recursion can make your recursive functions more efficient and safe.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).