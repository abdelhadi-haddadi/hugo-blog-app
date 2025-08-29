+++
title = "Kotlin operators"
date = 2025-08-29T20:02:46.133+01:00
draft = false
description = "Operators in Kotlin tutorial explains Kotlin operators. We show how to use operators to create expressions."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin operators

last modified January 29, 2024

In this article we cover Kotlin operators. We show how to use operators to
create expressions.

An *operator* is a special symbol which indicates
a certain process is carried out. Operators in programming languages are
taken from mathematics. Programmers work with data. The operators are used
to process data. An *operand* is one of the inputs
(arguments) of an operator.

Expressions are constructed from operands and operators. The operators of
an expression indicate which operations to apply to the operands.
The order of evaluation of operators in an expression is determined by the
*precedence* and *associativity* of the operators.

An operator usually has one or two operands. Those operators that work
with only one operand are called *unary operators*.
Those who work with two operands are called *binary operators*.

Certain operators may be used in different contexts. For instance the +
operator can be used in different cases: it adds numbers, concatenates strings, or
indicates the sign of a number. We say that the operator is *overloaded*.

## Kotlin sign operators

There are two sign operators: + and -. They are used to
indicate or change the sign of a value.

sign_operators.kt
  

package com.zetcode

fun main() {

    println(2)
    println(+2)
    println(-2)
}

The + and - signs indicate the sign of a value.
The plus sign can be used to signal that we have a positive number. It
can be omitted and it is in most cases done so.

minus_sign.kt
  

package com.zetcode

fun main() {

    val a = 1

    println(-a)
    println(-(-a))
}

The minus sign changes the sign of a value.

## Kotlin assignment operator

The assignment operator = assigns a value to a variable. A *variable*
is a placeholder for a value. In mathematics, the = operator has a different
meaning. In an equation, the = operator is an equality operator. The left
side of the equation is equal to the right one.

val x = 1

Here we assign a number to the x variable.

x = x + 1

This expression does not make sense in mathematics, but it is legal in programming.
The expression adds 1 to the x variable. The right side is equal to 2 and 2 is
assigned to x.

3 = x

This code line results in syntax error. We cannot assign a value to a literal.

## Kotlin augmented assignment operators

Augmented assignment operators are shorthand operators which
consist of two operators. Augmented assignment operators are also called
compound assignment operatos in other programming languages.

a = a + 3
a += 3

The += compound operator is one of these shorthand operators.
The above two expressions are equal. Value 3 is added to the
a variable.

The Kotlin augmented assignment operators are:

+=  -=   *=   /=   %=

The following example uses two compound operators.

augmented_assignment_operators.kt
  

package com.zetcode

fun main() {

    var a = 1
    a = a + 1

    println(a)

    a += 5
    println(a)

    a *= 3
    println(a)
}

We use the += and *= compound operators.

var a = 1
a = a + 1

The a variable is initiated to one. Value 1 is added to the
variable using the non-shorthand notation.

a += 5

Using a += compound operator, we add 5 to the a variable.
The statement is equal to a = a + 5.

a *= 3

Using the *= operator, the a is multiplied by 3. The statement
is equal to a = a * 3.

2
7
21

## Kotlin concatenating strings

In Kotlin the + operator is also used to concatenate strings.

concatenate_strings.kt
  

package com.zetcode

fun main() {

    println("Return " + "of " + "the king.")
    println("Return".plus(" of").plus(" the king."))
}

We join three strings together.

println("Return " + "of " + "the king.")

Strings are joined with the + operator.

println("Return".plus(" of").plus(" the king."))

An alternative method for concatenating strings is the plus
method.

## Kotlin increment and decrement operators

Incrementing or decrementing a value by one is a common task in
programming. Kotlin has two convenient operators for this: ++
and --.

x++
x = x + 1
...
y--
y = y - 1

The above two pairs of expressions do the same.

inc_dec.kt
  

package com.zetcode

fun main() {

    var x = 6

    x++
    x++

    println(x)

    x--
    println(x)
}

In the above example, we demonstrate the usage of both
operators.

int x = 6

x++
x++

We initiate the x variable to 6. Then we increment
x two times. Now the variable equals to 8.

x--

We use the decrement operator. Now the variable equals to 7.

## Kotlin arithmetic operators

The following is a table of arithmetic operators in Kotlin.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
%Remainder

The following example shows arithmetic operations.

arithmetic_operators.kt
  

package com.zetcode

fun main() {

    val a = 10
    val b = 11
    val c = 12

    val add = a + b + c
    val sb = c - a
    val mult = a * b
    val div = c / 3
    val rem = c % a

    println(add)
    println(sb)
    println(mult)
    println(div)
    println(rem)
}

In the preceding example, we use addition, subtraction, multiplication,
division, and remainder operations. This is all familiar from the mathematics.

val rem = c % a

The % operator is called the remainder or the modulo operator.
It finds the remainder of division of one number by another. For example,
9 % 4, 9 modulo 4 is 1, because 4 goes into 9 twice with a
remainder of 1.

There is a distinction between integer and floating point division.

division_operator.kt
  

package com.zetcode

fun main() {

    val c = 5 / 2
    println(c)

    val d = 5 / 2.0
    println(d)
}

In the preceding example, we divide two numbers.

val c = 5 / 2

In this code, we have done integer division. The returned value
of the division operation is an integer. When we divide two integers
the result is an integer.

val d = 5 / 2.0

If one of the values is a double or a float, we perform a
floating point division. In our case, the second operand
is a double so the result is a double.

2
2.5

We see the result of the program.

## Kotlin Boolean operators

In Kotlin we have three logical operators.

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators are also called logical.

boolean_exp.kt
  

package com.zetcode

fun main() {

    val x = 3
    val y = 8

    println(x == y)
    println(y &gt; x)

    if (y &gt; x) {

        println("y is greater than x")
    }
}

Many expressions result in a boolean value. For instance, boolean values are used
in conditional statements.

println(x == y)
println(y &gt; x)

Relational operators always result in a boolean value. These two lines
print false and true.

if (y &gt; x) {

    println("y is greater than x")
}

The body of the if statement is executed only if the condition
inside the parentheses is met. The y &gt; x returns true, so the message
"y is greater than x" is printed to the terminal.

The true and false keywords represent
boolean literals in Kotlin.

and_operator.kt
  

package com.zetcode

fun main() {

    val a = true &amp;&amp; true
    val b = true &amp;&amp; false
    val c = false &amp;&amp; true
    val d = false &amp;&amp; false

    println(a)
    println(b)
    println(c)
    println(d)
}

The code example shows the logical and (&amp;&amp;) operator.
It evaluates to true only if both operands are true.

true
false
false
false

Only one expression results in true.

The logical or (||) operator evaluates to true
if either of the operands is true.

or_operator.kt
  

package com.zetcode

fun main() {

    val a = true || true
    val b = true || false
    val c = false || true
    val d = false || false

    println(a)
    println(b)
    println(c)
    println(d)
}

If one of the sides of the operator is true, the outcome of
the operation is true.

true
true
true
false

Three of four expressions result in true.

The negation operator ! makes true false and false true.

negation_operator.kt
  

package com.zetcode

fun main() {

    println(! true)
    println(! false)
    println(! (4 &lt; 3))
}

The example shows the negation operator in action.

false
true
true

## Kotlin comparison operators

Comparison operators are used to compare values. These operators always
result in a boolean value.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to

comparison operators are also called relational operators.

comparison_operators.kt
  

package com.zetcode

fun main() {

    println(3 &lt; 4);
    println(3 == 4);
    println(4 &gt;= 3);
    println(4 != 3);
}

In the code example, we have four expressions. These expressions compare
integer values. The result of each of the expressions is either true or false.
In Kotlin we use the == to compare numbers. (Some languages like
Ada, Visual Basic, or Pascal use = for comparing numbers.)

## Kotlin bitwise operations

Unlike in Java, there are no bitwise operators in Kotlin. Kotlin has
named functions that perform bitwise operations.

- shl(bits) – signed shift left (Java's &lt;&lt;)

- shr(bits) – signed shift right (Java's &gt;&gt;)

- ushr(bits) – unsigned shift right (Java's &gt;&gt;&gt;)

- and(bits) – bitwise and

- or(bits) – bitwise or

- xor(bits) – bitwise xor

- inv() – bitwise inversion

These functions are available for Int and Long
types only.

The *bitwise and operation* performs bit-by-bit comparison between two numbers.
The result for a bit position is 1 only if both corresponding bits in the operands are 1.

      00110
   &amp;  00011
   =  00010

The first number is a binary notation of 6, the second is 3 and the result is 2.

println(6 and 3) // prints 2
println(3 and 6) // prints 2

The *bitwise or operation* performs bit-by-bit comparison between
two numbers. The result for a bit position is 1 if either of the
corresponding bits in the operands is 1.

     00110
   | 00011
   = 00111

The result is 00110 or decimal 7.

println(6 or 3) // prints 7
println(3 or 6) // prints 7

## Kotlin is operator

To check whether an object conforms to a given type at runtime we can
use the is operator or its negated form !is.

is_operator.kt
  

package com.zetcode

open class Base
class Derived : Base()

fun main() {

    val b = Base()
    val d = Derived()

    println(d is Base)
    println(b is Derived)
    println(d is Any)
}

In the example, we have two classes: one base and one derived from
the base.

println(d is Base)

This line checks if the variable d points to the class that
is an instance of the Base class. Since the Derived
class inherits from the Base class, it is also an instance of the
Base class too. The line prints true.

println(b is Derived)

The b object is not an instance of the Derived class.
This line prints false.

println(d is Any)

Every class has Any as a superclass. Therefore, the d
object is also an instance of the Any class.

true
false
true

## Kotlin lambda operator

Kotlin has lambda operator (-&gt;). It separates the parameters and
body of a lambda expression.

lambda_operator.kt
  

package com.zetcode

import java.util.Arrays

fun main() {

    val words = arrayOf("kind", "massive", "atom", "car", "blue")

    Arrays.sort(words) { s1: String, s2: String -&gt; s1.compareTo(s2) }

    println(Arrays.toString(words))
}

In the example, we define an array of strings. The array is sorted using
the Arrays.sort method and a lambda expression.

[atom, blue, car, kind, massive]

## Kotlin double colon operator

The double colon operator (::) is used to create a class or a function
reference.

double_colon_operator.kt
  

package com.zetcode

fun main() {

    val c = String::class

    c.supertypes.forEach { e -&gt; println(e) }

    val words = listOf("car", "forest", "Bible")
    println(words.map(String::length))
}

In the code example, we create a reference to a class and to a function
with the double colon operator.

val c = String::class

c.supertypes.forEach { e -&gt; println(e) }

With the double colon operator, we refer to the String class.
We print all its ancestors.

val words = listOf("car", "forest", "Bible")
println(words.map(String::length))

Here we apply the length function on all words of a list.

kotlin.Comparable&lt;kotlin.String&gt;
kotlin.CharSequence
java.io.Serializable
kotlin.Any
[3, 6, 5]

## Kotlin range operator

The Kotlin range operator (..) allows to create ranges of values.

range_operator.kt
  

package com.zetcode

fun main() {

    for (i in 1..14 step 3) {

        println(i)
    }
}

The example uses the range operator to create a sequence of integers in
a for loop.

1
4
7
10
13

## Non-null assertion operator

The non-null assertion operator (!!) converts any value to a non-null
type and throws an exception if the value is null.

nonnull_assertion_operator.kt
  

package com.zetcode

fun main() {

//    val words = listOf("forest", null, "Bible", "sky")
    val words = listOf("forest", "Bible", "sky")

    var nOfChars: Int = 0

    for (word in words) {

        val n = word!!.length
        nOfChars += n
    }

    println("There are ${nOfChars} characters in the list")
}

The example counts the number of characters in the list of words.
If the list contains a null value, a KotlinNullPointerException
it thrown.

## Kotlin Elvis operator

The Elvis operator ?: returns its first expression if it is not null,
otherwise it returns the second expression.

elvis_operator.kt
  

package com.zetcode

fun main() {

    val words = listOf("forest", null, "Bible", "sky")

    for (word in words) {

        val n = word?.length ?: 0

        println("${word} has ${n} letters")
    }
}

In the example we check for null values in the list with the Elvis
operator.

val n = word?.length ?: 0

The ?: returns 0 if the variable word contains null.

forest has 6 letters
null has 0 letters
Bible has 5 letters
sky has 3 letters

## Kotlin null-safety operator

Kotlin's null-safety operator ?. provides a safe method call—a
method is called only if the object is not null.

null_safety_operator.kt
  

package com.zetcode

fun main() {

    val words = listOf("forest", null, "Bible", "sky")

    for (word in words) {

        println(word?.toUpperCase())
}

In the example, we convert strings to uppercase; we use null-safety
operator. For the null value, the method is not called.

FOREST
null
BIBLE
SKY

## Kotlin index access operator

Kotlin index access operator is used to get a obtain a value from
an array.

index_access_operator.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(3, 2, 1, 4, 5, 6, 7)

    val v1 = nums[0]
    val v2 = nums[3]

    println(v1)
    println(v2)
}

In the example, we retrieve two values from an array with the
[] operator.

## Kotlin referential equality operator

Kotlin differentiates between structural and referential equality.
Structural equality operator (==) checks if two objects
have the same content. Referential equality operator (===)
checks if variables point to the same object in memory.

referential_equality_operator.kt
  

package com.zetcode

data class Item(var name: String, var color: String)

fun main() {

    val i1 = Item("coin", "brown")
    val i2 = i1

    println("Output: ${i1 == i2}")
    println("Output: ${i1 === i2}")

    val i3 = Item("coin", "brown")
    val i4 = Item("coin", "brown")

    println("Output: ${i3 == i4}")
    println("Output: ${i3 === i4}")
}

The example demonstrates the difference between == and
=== operators.

Output: true
Output: true
Output: true
Output: false

## Kotlin operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher
precedence than addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses.
Expressions inside parentheses are always evaluated first.
The result of the above expression is 40.

operator_precedence.kt
  

package com.zetcode

fun main() {

    println(3 + 5 * 5)
    println((3 + 5) * 5)

    println(!true or true)
    println(!(true or true))
}

In this code example, we show a few expressions.
The outcome of each expression is dependent on the precedence level.

println(3 + 5 * 5)

This line prints 28. The multiplication operator has a higher precedence
than addition. First, the product of 5 * 5 is calculated,
then 3 is added.

println((3 + 5) * 5)

The evaluation of the expression can be altered by using round brackets. In this
case, the 3 + 5 is evaluated and later the value is multiplied by
5. This line prints 40.

println(!true or true)

In this case, the negation operator has a higher precedence than the bitwise or.
First, the initial true value is negated to false, then the
| operator combines false and true, which gives true in the end.

28
40
true
false

## Associativity rule

Sometimes the precedence is not satisfactory to determine the outcome
of an expression. There is another rule called
*associativity*. The associativity of operators determines
the order of evaluation of operators with the same precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication,
deletion, and the modulo operator are left to right associated.
So the expression is evaluated this way: (9 / 3) * 3
and the result is 9.

Arithmetic, boolean and relational operators are left to right
associated. The ternary operator, increment, decrement, unary plus
and minus, negation, bitwise not, type cast, object creation operators
are right to left associated.

associativity_rule.kt
  

package com.zetcode

fun main() {

    var j = 0

    j *= 3 + 1

    println(j)
}

In the example, we the associativity rule determines the outcome of
the expression.

var j = 0

j *= 3 + 1

The enhanced assignment operators are right to left associated.
We might expect the result to be 1. But the actual result is 0.
Because of the associativity. The expression on the right is
evaluated first and then the compound assignment operator is applied.

## Calculating prime numbers

In the following example, we are going to calculate prime numbers.

prime_numbers.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28)

    print("Prime numbers: ")

    for (num in nums) {

        if (num == 0 || num == 1) {
            continue
        }

        if (num == 2 || num == 3) {

            print(num.toString() + " ")
            continue
        }

        var i = Math.sqrt(num.toDouble()).toInt()

        var isPrime = true

        while (i &gt; 1) {

            if (num % i == 0) {

                isPrime = false
            }

            i--
        }

        if (isPrime) {

            print(num.toString() + " ")
        }
    }

    print('\n')
}

In the above example, we deal with several operators. A prime
number (or a prime) is a natural number that has exactly two distinct
natural number divisors: 1 and itself. We pick up a number and divide
it by numbers from 1 to the selected number. Actually, we do not have
to try all smaller numbers; we can divide by numbers up to the square
root of the chosen number. The formula will work. We use the remainder
division operator.

val nums = intArrayOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28)

We will calculate primes from these numbers.

if (num == 0 || num == 1) {
    continue
}

Values 0 and 1 are not considered to be primes.

if (num == 2 || num == 3) {

    print(num.toString() + " ")
    continue
}

We skip the calculations for 2 and 3. They
are primes. Note the usage of the equality and conditional or
operators. The == has a higher precedence than the
|| operator. So we do not need to use parentheses.

var i = Math.sqrt(num.toDouble()).toInt()

We are OK if we only try numbers smaller than the square root of
a number in question.

while (i &gt; 1) {
    ...
    i--
}

This is a while loop. The i is the calculated square root
of the number. We use the decrement operator to decrease i
by one each loop cycle. When i is smaller than 1, we terminate the loop.
For example, we have number 9. The square root of 9 is 3. We will divide
the 9 number by 3 and 2. This is sufficient for our calculation.

if (num % i == 0) {

    isPrime = false
}

If the remainder division operator returns 0 for any of the i values,
then the number in question is not a prime.

## Source

[Kotlin keywords and operators - language reference](https://kotlinlang.org/docs/keyword-reference.html)

In this article we covered Kotlin operators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).