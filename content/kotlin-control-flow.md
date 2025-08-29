+++
title = "Kotlin control flow"
date = 2025-08-29T20:02:28.382+01:00
draft = false
description = "Kotlin control flow tutorial covers control flow statements in Kotlin, including if, else, while, and for."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin control flow

last modified January 29, 2024

This article shows how to do control flow in a Kotlin program with 
if, when, while, and for.

Kotlin is a statically-typed programming language that runs on the
Java virtual machine.

Kotlin was created by JetBrains. Kotlin is an object-oriented and functional
programming language. Kotlin was designed to be a pragmatic, concise, safe, and
interoperable programming language.

## Kotlin if condition

The if keyword is used to create simple conditional tests.
It can be used in conjuction with the else keyword. 

kotlin_if.kt
  

package com.zetcode

fun main() {
    
    print("Enter your age: ")
    
    val s_age: String? = readLine()
    
    if (s_age!!.isEmpty()) return
    
    val age:Int = s_age.toInt()
    
    if (age &gt; 18) {
            
        println("You can obtain a driving licence")
    } else {
            
        println("You cannot obtain a driving licence")
    }
}

In the example, we show a prompt to enter user's age. We read the value, convert
it into an integer, and store in a variable.

if (age &gt; 18) {
        
    println("You can obtain a driving licence")
} else {
        
    println("You cannot obtain a driving licence")
}

This condition tests if the age is greater than 18.

## Kotlin if else if

Multiple branches of conditions can be created with if else if syntax.

ifelseif.kt
  

package com.zetcode

fun main() {
    
    val a = 34
    val b = 43
    
    if (a == b) {
            
        println("$a and $b are equal")
    } else if (a &lt; b) {
            
        println("$a is less than $b")
    } else {
            
        println("$b is less than $a")
    }
}

In the example, we use the if else if to determine if two values are equal or
bigger/smaller.

## Kotlin if expression

Kotlin's if is an expression, i.e. it returns a value.

if_expression.kt
  

package com.zetcode

fun main() {
        
    val a = 34
    val b = 43
    
    val max = if (a &gt; b) a else b
    
    println("max of $a and $b is $max")
}

The example uses the if expression to return
the maximum of two values.

## Kotlin when expression

Kotlin's when expression is used to evaluate multiple conditions.
It is a more powerful version of Java's switch statement.

The when keyword matches its argument against all branches
sequentially until some branch condition is satisfied. It can be used either as
an expression or as a statement. 

when_expression.kt
  

package com.zetcode

import java.util.Random

fun main() {
    
    val r:Int = Random().nextInt(10) - 5
    
    when {
        r &lt; 0 -&gt; println("negative value")
        r == 0 -&gt; println("zero")
        r &gt; 0 -&gt; println("positive value")
    }
}

In the example, we generate a random number. Based on the random value, we print
a message to the console.

## Kotlin while loop

The while keyword is used to create a loop. It runs until the given
condition is met.

while_loop.kt
  

package com.zetcode

fun main() {
    
    var i:Int = 0
    
    while(i &lt; 10) {
            
        i++
        println("i is $i")
    }
    
    println(i)
}

The example uses a while loop to print values from one to ten.

while(i &lt; 10) {

The while condition is running as longs as the i
variable is lower than ten.

## Kotlin for loop

With the Kotlin's for loop, we can create loops that 
are often more easier to create than with while.

for_loop.kt
  

package com.zetcode

fun main() {
    
    val seasons = arrayOf("Spring", "Summer", "Autumn", "Winter")
    
    for (season in seasons) {
            
        println(season)
    }
    
    for (i in 1..15) println(i)
}

In the example, we use the for keyword to iterate over an array of
strings and a range of integers.

## Source

[Kotlin control flow - language reference](https://kotlinlang.org/docs/control-flow.html)

In this article we have covered control flow in Kotlin. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).