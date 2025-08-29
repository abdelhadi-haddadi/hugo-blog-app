+++
title = "Kotlin data types"
date = 2025-08-29T20:02:30.612+01:00
draft = false
description = "Kotlin data types tutorial covers Kotlin data types, including booleans, numbers, and strings."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin data types

last modified January 29, 2024

This article covers Kotlin data types, including booleans, numbers, and strings.

## Data type

A data type is a set of values and the allowable operations on those
values.

Kotlin is a strongly statically typed programming language. Every variable and
every expression has a type that is known at compile time. Kotlin is also a
strongly typed language because types limit the values that a variable can hold
or that an expression can produce, limit the operations supported on those
values, and determine the meaning of the operations. Strong static typing helps
detect errors at compile time. Kotlin does not feature implicit conversions
between types.

**Note:** Often times, we do not have to explicitly specify the
data type for the variable; Kotlin uses type inference to determine the data
type.

Variables in dynamically typed languages such as Ruby or Python can receive
different data types over the time. In Kotlin, once a variable is declared to be
of a certain data type, it cannot hold values of other data types.

Kotlin has the following basic data types:

- Boolean

- Char

- Byte

- Short

- Int

- Long

- Float

- Double

- Array

There is also a special null type which represents a non-existing value.

## Kotlin Boolean values

There is a duality built in our world. There is a Heaven and Earth, water and
fire, jing and jang, man and woman, love and hatred. In Kotlin the
boolean data type is a primitive data type having one of two
values: true or false.

Say we want to choose a name for a child.

boolean_type.kt
  

package com.zetcode

import kotlin.random.Random

fun main() {

    var name = ""
    val male: Boolean = Random.nextBoolean()

    if (male) {
        name = "Robert"
    }

    if (!male) {
        name = "Victoria"
    }

    println("We will use name $name")

    println(9 &gt; 8)
}

The program uses a random number generator to simulate our case.

var name = ""

We define an empty name variable. We do not specify the data type
explicitly; Kotlin uses type inference to get the appropriate data type.
It is String  in our case.

val male: Boolean = Random.nextBoolean()

The Random class is used to produce random numbers.
The nextBoolean method returns randomly a boolean value.

if (male) {
    name = "Robert"
}

If the boolean variable male equals to true, we set the name
variable to "Robert". The if keyword works with boolean values.

if (!male) {
    name = "Victoria"
}

If the random generator chooses false than we set the name variable
to "Victoria".

println(9 &gt; 8)

Relational operators result in a boolean value. This line prints true
to the console.

## Kotlin integers

Integers are a subset of the real numbers. They are written without a fraction
or a decimal component. Integers fall within a set Z = {..., -2, -1, 0, 1, 2,
...} Integers are infinite.

Computers can practically work only with a subset of integer values, because
computers have finite capacity. Integers are used to count discrete entities. We
can have 3, 4, or 6 humans, but we cannot have 3.33 humans. We can have 3.33
kilograms, 4.564 days, or 0.4532 kilometers.

Type
Size
Range

Byte
8 bits
-128 to 127

Short
16 bits
-32,768 to 32,767

Int
32 bits
-2,147,483,648 to 2,147,483,647

Long
64 bits
-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

Table: Integer types in Kotlin

The usage of integers depends on the type of the task we have. We can then use the
Byte type for a variable that stores the number of children a woman
gave birth to. The oldest verified person died at 122, therefore we would probably
choose at least the Short type for the age variable. This will save
us some memory.

All variables initialized with integer values not exceeding the maximum value of
Int have the inferred type Int. If the initial value
exceeds this value, then the type is Long. To specify the
Long value explicitly, append the suffix L to the value.

When we work with integers, we deal with discrete items. For instance, we can
use integers to count apples.

apples.kt
  

package com.zetcode

fun main() {

    val baskets: Int = 16
    val applesInBasket: Int = 24

    val total = baskets * applesInBasket

    println("There are total of $total apples")
}

In our program, we count the total amount of apples. We use the multiplication
operation.

val baskets: Int = 16
val applesInBasket: Int = 24

The number of baskets and the number of apples in each basket are
integer values.

val total = baskets * applesInBasket

Multiplying those values we get an integer, too.

There are total of 384 apples

Integers can be specified in three different *notations* in
Kotlin: decimal, hexadecimal, and binary. Decimal numbers are used normally as we know
them. Hexadecimal numbers are preceded with 0x characters and
followed by hexadecimal numbers. Binary numbers start with 0b and are
followed by binary numbers (zeroes and ones).

integer_notations.kt
  

package com.zetcode

fun main() {

    val n1 = 31
    val n2 = 0x31
    val n3 = 0b1001

    println(n1)
    println(n2)
    println(n3)
}

We have four integer variables. Each of the variables is assigned a value
with a different integer notation.

val n1 = 31
val n2 = 0x31
val n3 = 0b1001

The first is decimal, the second hexadecimal, and the third is binary.

31
49
9

We see the output of the program.

Big numbers are difficult to read. If we have a number like 245342395423452, we
find it difficult to read it quickly. For this reason, it is possible to
separate integers with an underscore.

The underscore cannot be used at the beginning or end of a number, adjacent
to a decimal point in a floating point literal, and prior to an F or
L suffix.

underscores.kt
  

package com.zetcode

fun main() {

    val a = 23482345629L
    val b = 23_482_345_629L

    println(a == b)
}

This code sample demonstrates the usage of underscores in Kotlin.

val a = 23482345629L
val b = 23_482_345_629L

We have two identical long numbers. In the second one we separate every three digits in
a number. Comparing these two numbers we receive a boolean true. The L
suffix tells the compiler that we have a long number literal.

## Kotlin integer min/max values

The integer data types provide their min and max values as constants.

min_max.kt
  

package com.zetcode

fun main() {

    val a: Byte = Byte.MIN_VALUE
    val b: Byte = Byte.MAX_VALUE
    println("Min byte value: $a")
    println("Max byte value: $b")

    val c: Short = Short.MIN_VALUE
    val d: Short = Short.MAX_VALUE
    println("Min short value: $c")
    println("Max short value: $d")

    val e: Int = Int.MIN_VALUE
    val f: Int = Int.MAX_VALUE
    println("Min integer value: $e")
    println("Max integer value: $f")

    val g: Long = Long.MIN_VALUE
    val h: Long = Long.MAX_VALUE
    println("Min long integer value: $g")
    println("Max long integer value: $h")
}

The example prints the mim and max values for Byte, Short,
Int, and Long types.

Min byte value: -128
Max byte value: 127
Min short value: -32768
Max short value: 32767
Min integer value: -2147483648
Max integer value: 2147483647
Min long integer value: -9223372036854775808
Max long integer value: 9223372036854775807

## Kotlin BigInteger

Byte, Short, Int and Long
types are used do represent *fixed precision* numbers. This means that
they can represent a limited amount of integers. The largest integer number that
a long type can represent is 9223372036854775807. If we deal with even larger
numbers, we have to use the java.math.BigInteger class. It is used
to represent immutable
*arbitrary precision* integers. Arbitrary precision integers are only
limited by the amount of computer memory available.

big_integers.kt
  

package com.zetcode

import java.math.BigInteger

fun main() {

    println(Long.MAX_VALUE)

    val b = BigInteger("92233720368547758071")
    val c = BigInteger("52498235605326345645")

    val a = b.multiply(c)

    println(a)
}

With the help of the java.math.BigInteger class, we multiply
two very large numbers.

println(Long.MAX_VALUE)

We print the largest integer value which can be represented by the
Long type.

val b = BigInteger("92233720368547758071")
val c = BigInteger("52498235605326345645")

We define two BigInteger objects. They both hold larger values that
a Long type can hold.

val a = b.multiply(c)

With the multiply method, we multiply the two numbers. Note that
the BigInteger numbers are immutable. The operation returns a new
value which we assign to a new variable.

println(a)

The computed integer is printed to the console.

9223372036854775807
4842107582663807707870321673775984450795

## Kotlin arithmetic overflow

An *arithmetic overflow* is a condition that occurs when a calculation
produces a result that is greater in magnitude than that which a given register
or storage location can store or represent.

overflow.kt
  

package com.zetcode

fun main() {

    var a: Byte = 126

    println(a)
    a++

    println(a)
    a++

    println(a)
    a++

    println(a)
}

In this example, we try to assign a value beyond the range of a data type. This
leads to an arithmetic overflow.

126
127
-128
-127

When an overflow occurs, the variable is reset to negative upper range value.

## Kotlin floating point numbers

Real numbers measure continuous quantities, like weight, height, or speed.
Floating point numbers represent an approximation of real numbers in computing.
In Kotlin we have two primitive floating point types: Float and Double.
The Float is a single precision type which store numbers in 32 bits.
The Double is a double precision type which store numbers in 64 bits.
These two types have fixed precision and cannot represent exactly all real numbers.
In situations where we have to work with precise numbers, we can use the BigDecimal
class.

For variables initialized with fractional numbers, the compiler infers the
Double type. To explicitly specify the Float type for
a value, add the suffix f or F.

Let's say a sprinter for 100m ran 9.87s. What is his speed in km/h?

sprinter.kt
  

package com.zetcode

fun main() {

    val speed: Float

    val distance = 0.1f
    val time: Float = 9.87f / 3600

    speed = distance / time

    println("The average speed of a sprinter is $speed km/h")
}

In this example, it is necessary to use floating point values. The low precision
of the float data type does not pose a problem in this case.

val distance = 0.1f

100m is 0.1km.

time = 9.87f / 3600;

9.87s is 9.87/60*60h.

val time: Float = 9.87f / 3600

To get the speed, we divide the distance by the time.

The average speed of a sprinter is 36.474163 km/h

A small rounding error in the number does not affect our understanding of the
sprinter's speed.

The float and double types are inexact.

floating_inprecision.kt
  

package com.zetcode

fun main() {

    val a = 0.1 + 0.1 + 0.1
    val b = 0.3

    println(a)
    println(b)

    println(a == b)
}

The code example illustrates the inexact nature of the floating point values.

val a = 0.1 + 0.1 + 0.1
val b = 0.3

We define two Double values.

println(a)
println(b)

Printing them will show a very small difference.

println(a == b)

This line will return false.

0.30000000000000004
0.3
false

There is a small margin error. Therefore, the comparison
operator returns a boolean false.

When we work with money, currency, and generally in business applications,
we need to work with precise numbers. The rounding errors of the basic floating
point types are not acceptable.

counting_money.kt
  

package com.zetcode

fun main() {

    val c = 1.46f
    var sum = 0f

    for (i in 0..99999) {
        sum += c
    }

    println(sum)
}

The 1.46f represents 1 euro and 46 cents. We create a sum from 100000 such
amounts.

for (i in 0..99999) {
    sum += c
}

In this loop, we create a sum from 100000 such amounts of money.

146002.55

The calculation leads to an error of 2 euros and 55 cents.

To avoid this margin error, we utilize the BigDecimal
class. It is used to hold immutable, arbitrary precision signed
decimal numbers.

counting_money2.kt
  

package com.zetcode

import java.math.BigDecimal

fun main() {

    val c = BigDecimal("1.46")
    var sum = BigDecimal("0")

    for (i in 0..99999) {

        sum = sum.add(c)
    }

    println(sum)
}

We do the same operation with the same amount of money.

val c = BigDecimal("1.46")
var sum = BigDecimal("0")

We define two BigDecimal numbers.

for (i in 0..99999) {

    sum = sum.add(c)
}

The BigDecimal number is immutable, therefore a new
object is always assigned to the sum variable in every loop.

146000.00

In this example, we get the precise value.

Kotlin supports the scientific syntax of the floating point values. Also
known as exponential notation, it is a way of writing numbers too large
or small to be conveniently written in standard decimal notation.

scientific_notation.kt
  

package com.zetcode

import java.math.BigDecimal
import java.text.DecimalFormat

fun main() {

    val n = 1.235E10

    val dec = DecimalFormat("#.00")
    println(dec.format(n))

    val bd = BigDecimal("1.212e-19")

    println(bd.toEngineeringString())
    println(bd.toPlainString())
}

We define two floating point values using the scientific notation.

val n = 1.235E10

This is a floating point value of a Double type, written
in scientific notation.

val dec = DecimalFormat("#.00")
println(dec.format(n))

We use the DecimalFormat class to arrange our double
value into standard decimal format.

val bd = BigDecimal("1.212e-19")

println(bd.toEngineeringString())
println(bd.toPlainString())

The BigDecimal class takes a floating point value in a
scientific notation as a parameter. We use two methods of the class
to print the value in the engineering and plain strings.

12350000000.00
121.2E-21
0.0000000000000000001212

## Kotlin explicit conversions

Kotlin supports explicit conversion between numbers. Unlike in Java, there are
not implicit conversions.

Every number type has the following conversion functions:

    - toByte(): Byte

    - toShort(): Short

    - toInt(): Int

    - toLong(): Long

    - toFloat(): Float

    - toDouble(): Double

    - toChar(): Char

explicit_conversion.kt
  

package com.zetcode

fun main() {

    val x:Long = 23_334
    val y:Int = x.toInt()

    println(x)
    println(y)
}

In the example, we convert a Long value to Int.

## Kotlin strings and chars

A String is a data type representing textual data in computer
programs. A string in Kotlin is a sequence of characters. A Char is
a single character. Strings are enclosed by double quotes.

Visit [Kotlin strings tutorial](/kotlin/strings/) to learn more
about strings.

strings_chars.kt
  

package com.zetcode

fun main() {

    val word = "ZetCode"

    val c: Char = word[0]
    val d: Char = word[3]

    println(c)
    println(d)
}

The program prints Z character to the terminal.

val word = "ZetCode"

Here we create a string variable and assign it "ZetCode" value.

val c: Char = word[0]

Using the [] array access notation, we get a character at index
0.

Z
C

The program prints the first and the fourth character of the "ZetCode" string
to the console.

## Kotlin Arrays

Array is a complex data type which handles a collection of elements.
Each of the elements can be accessed by an index. All the elements
of an array must be of the same data type.

Visit [Kotlin arrays tutorial](/kotlin/arrays/) to learn more
about arrays in Kotlin.

arrays.kt
  

package com.zetcode

fun main() {

    val numbers = IntArray(5)

    numbers[0] = 3
    numbers[1] = 2
    numbers[2] = 1
    numbers[3] = 5
    numbers[4] = 6

    val len = numbers.size

    for (i in 0 until len) {

        println(numbers[i])
    }
}

In this example, we declare an array, fill it with data and then print the
contents of the array to the console.

val numbers = IntArray(5)

We create an integer array which can store up to 5 integers. So we have an array
of five elements, with indexes 0..4.

numbers[0] = 3
numbers[1] = 2
numbers[2] = 1
numbers[3] = 5
numbers[4] = 6

Here we assign values to the created array. We can access
the elements of an array by the array access notation. It
consists of the array name followed by square brackets. Inside
the brackets we specify the index to the element that we want.

val len = numbers.size

Each array has a size property which returns the number of elements
in the array.

for (i in 0 until len) {

    println(numbers[i])
}

We traverse the array and print the data to the
console.

3
2
1
5
6

## Source

[Kotlin basic types - language reference](https://kotlinlang.org/docs/basic-types.html)

In this article we have covered Kotlin data types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).