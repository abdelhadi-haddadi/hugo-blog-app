+++
title = "Kotlin string"
date = 2025-08-29T20:02:54.112+01:00
draft = false
description = "Kotlin string tutorial shows how to work with strings in Kotlin. The string data type is implemented by the String class, which represents character strings."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin string

last modified January 29, 2024

In this article we show how to work with strings in Kotlin.

A string is a basic data type in a programming language. In Kotlin, the
String class represents character strings. Kotlin string literals
are implemented as instances of this class. Kotlin uses double quotes to create
string literals.

Kotlin has a rich API for working with strings. It contains plenty of methods
for various string operations. Kotlin/Java strings are immutable, which means
that all modification operations create new string instead of modifying a string
in-place.

## Kotlin string example

In the first example, we have a simple Kotlin string example.

StringBasic.kt
  

package com.zetcode

fun main() {

    val s = "Today is a sunny day."
    println(s)

    println("Old " + "bear")

    println("The string has " + s.length + " characters")
}

The example creates a string, uses a string concatenation operation, and
determines the width of the string.

val s = "Today is a sunny day."
println(s)

A string literal is created and passed to the s variable.
The string is printed to the console with println.

println("Old " + "bear")

In Kotlin, strings are concatenated with the + operator.

println("The string has " + s.length + " characters")

The length of a string is determined with the length attribute.

Today is a sunny day.
Old bear
The string has 21 characters

## Kotlin string length

For many alphabets, the length property gives the correct number 
of characters. 

StringLength.kt
  

package com.zetcode

import java.text.BreakIterator

fun main() {

    val word = "falcon"
    println(word.length)

    val word2 = "čerešňa"
    println(word2.length)

    val word3 = "ведомство"
    println(word3.length)

    val word4 = "合気道"
    println(word4.length)
}

In the example, we print the number of characters for English, Slovak, Russian, 
and Japanese words. 

6
7
9
3

The output is correct. 

However, there are alphabets for which the length property gives 
incorrect output.

StringLength2.kt
  

package com.zetcode

import java.text.BreakIterator

fun main() {

    val emojis = "🐜🐬🐄🐘🦂🐫🐑🦍🐯🐞"
    println(emojis.length)

    val it = BreakIterator.getCharacterInstance()
    it.setText(emojis)
    var count = 0

    while (it.next() != BreakIterator.DONE) {
        count++
    }

    println(count)

    println("--------------------------")

    val word = "नमस्ते"
    println(word.length)

    val it2 = BreakIterator.getCharacterInstance()
    it2.setText(word)
    var count2 = 0

    while (it2.next() != BreakIterator.DONE) {
        count2++
    }

    println(count2)
}

For instance, for emojis and Sanskrit words, the length property
gives wrong numbers. We can get the correct answer for emojis with
BreakIterator. However, for the Sanskrit word, the 
BreakIterator is still incorrect.

20
10
--------------------------
6
3

There are 10 emoji characters and 4 Sanskrit characters.

## Kotlin string indexing

A string is a sequence of characters. We can get specific characters
from a string with indexing operations.

StringIndexes.kt
  

package com.zetcode

fun main() {

    val s = "blue sky"

    println(s[0])
    println(s[s.length-1])

    println(s.first())
    println(s.last())
}

The example shows how to get the first and last characters of a string. It uses
indexing operations and alternative string methods.

println(s[0])
println(s[s.length-1])

The indexes start from zero; therefore, the first character has zero index. The
index of the character is placed between square brackets.

println(s.first())
println(s.last())

The first method returns the first and the last
returns the last character of the string.

## Kotlin string interpolation

String interpolation is variable substitution with its value inside a string. In
Kotlin, we use the $ character to interpolate a variable and
${} to interpolate an expression.

Kotlin string formatting is more powerful than basic interpolation.

StringInterpolate.kt
  

package com.zetcode

fun main() {

    val name = "Peter"
    val age = 34

    println("$name is $age years old")

    val msg = "Today is a sunny day"

    println("The string has ${msg.length} characters")
}

The example shows how to do string interpolation in Kotlin.

val name = "Peter"
val age = 34

We have two variables.

println("$name is $age years old")

The two variables are interpolated within the string; i.e. they are 
substituted with their values. 

println("The string has ${msg.length} characters")

Here we get the length of the string. Since it is an expression, we
need to put it inside the {} brackets.

Peter is 34 years old
The string has 20 characters

## Kotlin comparing strings

We can use the == operator and the compareTo
method to compare string content.

CompareStrings.kt
  

package com.zetcode

fun main() {

    val s1 = "Eagle"
    val s2 = "eagle"

    if (s1 == s2) {

        println("Strings are equal")
    }  else {

        println("Strings are not equal")
    }

    println("Ignoring case")

    val res = s1.compareTo(s2, true)

    if (res == 0) {

        println("Strings are equal")
    }  else {

        println("Strings are not equal")
    }
}

In the example, we compare two strings.

if (s1 == s2) {

The == operator compares structural equality, that is, the
content of the two strings.

val res = s1.compareTo(s2, true)

The compareTo method compares two strings 
lexicographically, optionally ignoring case.

## Kotlin string escape characters

The string escaping characters are special characters that perform a specific
operation. For instance, the \n characters starts a new line.

EscapeCharacters.kt
  

package com.zetcode

fun main() {

    println("Three\t bottles of wine")
    println("He said: \"I love ice skating\"")
    println("Line 1:\nLine 2:\nLine 3:")
}

The example presents the character escaping in Kotlin.

println("He said: \"I love ice skating\"")

We insert double qoutes into a string literal by escaping the original
function of double quotes.

println("Line 1:\nLine 2:\nLine 3:")

With \n, we create three lines.

Three    bottles of wine
He said: "I love ice skating"
Line 1:
Line 2:
Line 3:

## Kotlin string case

Kotlin has methods for working with the case of a string characters.

StringCase.kt
  

package com.zetcode

fun main() {

    val s = "young eagle"

    println(s.capitalize())
    println(s.toUpperCase())
    println(s.toLowerCase())

    println("Hornet".decapitalize())
}

The example presents four methods: capitalize, 
toUpperCase, toLowerCase, and 
decapitalize.

Young eagle
YOUNG EAGLE
young eagle
hornet

## Kotlin empty/blank string

Kotlin distinguishes between empty and blank strings. An empty string does not
have any characters, a blank string contains any number of white spaces.

EmptyBlank.kt
  

package com.zetcode

fun main() {

    val s = "\t"

    if (s.isEmpty()) {

        println("The string is empty")
    } else {

        println("The string is not empty")
    }

    if (s.isBlank()) {

        println("The string is blank")
    } else {

        println("The string is not blank")
    }
}

The example tests if a string is bland and empty.

if (s.isEmpty()) {

The isEmpty returns true if the string is empty.

if (s.isBlank()) {

The isBlank returns true if the string is blank.

The string is not empty
The string is blank

## Kotlin string white space stripping

We often need to strip white space characters from a string.

StringTrim.kt
  

package com.zetcode

fun main() {

    val s = " Eagle\t"

    println("s has ${s.length} characters")

    val s1 = s.trimEnd()
    println("s1 has ${s1.length} characters")

    val s2 = s.trimStart()
    println("s2 has ${s2.length} characters")

    val s3 = s.trim()
    println("s2 has ${s3.length} characters")
}

The example presents methods for stripping white spaces from a string.

val s1 = s.trimEnd()

The trimEnd method removes trailing white spaces.

val s2 = s.trimStart()

The trimStart method removes leading white spaces.

val s3 = s.trim()

The trim method removes both trailing and leading white spaces.

## Kotlin string looping

A Kotlin string is a sequence of characters. We can loop this sequence.

StringLoop.kt
  

package com.zetcode

fun main() {

    val phrase = "young eagle"

    for (e in phrase) {

        print("$e ")
    }

    println()

    phrase.forEach { e -&gt; print("%#x ".format(e.toByte())) }

    println()

    phrase.forEachIndexed { idx, e -&gt; println("phrase[$idx]=$e ")  }
}

The example loops over a string using a for loop, forEach loop, and 
forEachIndexed loop.

for (e in phrase) {

    print("$e ")
}

We traverse the string with a for loop and print each of the characters.

phrase.forEach { e -&gt; print("%#x ".format(e.toByte())) }

We traverse over a loop with forEach and print a byte value of each of
the characters.

phrase.forEachIndexed { idx, e -&gt; println("phrase[$idx]=$e ")  }

With forEachIndexed, we print the character with its index.

y o u n g   e a g l e 
0x79 0x6f 0x75 0x6e 0x67 0x20 0x65 0x61 0x67 0x6c 0x65 
phrase[0]=y 
phrase[1]=o 
phrase[2]=u 
phrase[3]=n 
phrase[4]=g 
phrase[5]=  
phrase[6]=e 
phrase[7]=a 
phrase[8]=g 
phrase[9]=l 
phrase[10]=e 

## Kotlin string filtering

The filter method returns a string containing only those 
characters from the original string that match the given predicate.

KotlinStringFilter.kt
  

package com.zetcode

fun main() {

fun Char.isEnglishVowel(): Boolean =  this.toLowerCase() == 'a'
        || this.toLowerCase() == 'e'
        || this.toLowerCase() == 'i'
        || this.toLowerCase() == 'o'
        || this.toLowerCase() == 'u'
        || this.toLowerCase() == 'y'

fun main() {

    val s = "Today is a sunny day."

    val res = s.filter { e -&gt; e.isEnglishVowel()}

    println("There are ${res.length} vowels")
}

The example counts all vowels in the string.

fun Char.isEnglishVowel(): Boolean =  this.toLowerCase() == 'a'
        || this.toLowerCase() == 'e'
        || this.toLowerCase() == 'i'
        || this.toLowerCase() == 'o'
        || this.toLowerCase() == 'u'
        || this.toLowerCase() == 'y'

We create an extension function; it returns true for English vowels.

val res = s.filter { e -&gt; e.isEnglishVowel()}

The extension function is called in the filter method.

## Kotlin string startsWith/endsWith

The startsWith method returns true if a string starts 
with the specified prefix and the endsWith returns true
if a string ends with the specified character.

KotlinStringStartEnd.kt
  

package com.zetcode

fun main() {
    
    val words = listOf("tank", "boy", "tourist", "ten",
            "pen", "car", "marble", "sonnet", "pleasant",
            "ink", "atom")

    val res = words.filter { e -&gt; startWithT(e) }
    println(res)

    val res2 = words.filter { e -&gt; endWithK(e) }
    println(res2)
}

fun startWithT(word: String): Boolean {

    return word.startsWith("t")
}

fun endWithK(word: String): Boolean {

    return word.endsWith("k")
}

In the example, we have a list of words. With the aforementioned methods
we find out which words start with 't' and and with 'k'.

val words = listOf("tank", "boy", "tourist", "ten",
        "pen", "car", "marble", "sonnet", "pleasant",
        "ink", "atom")

With listOf, we define a list of words.

val res = words.filter { e -&gt; startWithT(e) }
println(res)

val res2 = words.filter { e -&gt; endWithK(e) }
println(res2)

We call two custom funcions in the filter method.

fun startWithT(word: String): Boolean {

    return word.startsWith("t")
}

The startWithT is a custom predicate function which
returns true if a string starts with 't'.

[tank, tourist, ten]
[tank, ink]

## Kotlin string replace

The replace method returns a new string obtained by 
replacing all occurrences of the old string with a new string.

KotlinStringReplace.kt
  

package com.zetcode

fun main() {

    val s = "Today is a sunny day."

    val w = s.replace("sunny", "rainy")
    println(w)
}

The example replaces sunny with rainy. A new modified string is returned.
The original string is not modified.

## Kotlin string split

The split function cuts the string into a list of strings based 
on the specified delimiter.

KotlinSplit.kt
  

package com.zetcode

fun main() {

    val word = "eagle,falcon,hawk,owl"

    val birds = word.split(",")

    birds.forEach(::println)
}

We have a string consisting of birds delimited by comma. We split the strings 
to get all birds separately.

eagle
falcon
hawk
owl

## Kotlin toString

The toString method is called when the object is used
in a string context; e.g. it is printed to the console. Its purpose
is to provide a string representation of the object.

KotlinToString.kt
  

package com.zetcode

class City(private var name: String, private var population: Int) {

    override fun toString(): String {
        return "$name has population $population"
    }
}

fun main() {

    val cities = listOf(City("Bratislava", 432000),
            City("Budapest", 1759000),
            City("Prague", 1280000))

    cities.forEach { e -&gt; println(e) }
}

The example creates a list of city objects. We go through the list
and print the objects to the console.

override fun toString(): String {
    return "$name has population $population"
}

We override the default implementation of toString.
It returns a string that a city has the specified population.

Bratislava has population 432000
Budapest has population 1759000
Prague has population 1280000

## Kotlin raw string

A raw string is delimited by triple quotes """. It does no escaping 
and can contain newlines and any other characters.

KotlinRawString.kt
  

package com.zetcode

fun main() {

    val sonnet = """
        Not marble, nor the gilded monuments
        Of princes, shall outlive this powerful rhyme;
        But you shall shine more bright in these contents
        Than unswept stone, besmear'd with sluttish time.
        When wasteful war shall statues overturn,
        And broils root out the work of masonry,
        Nor Mars his sword nor war's quick fire shall burn
        The living record of your memory.
        'Gainst death and all-oblivious enmity
        Shall you pace forth; your praise shall still find room
        Even in the eyes of all posterity
        That wear this world out to the ending doom.
        So, till the judgment that yourself arise,
        You live in this, and dwell in lovers' eyes.
        """

    println(sonnet.trimIndent())
}

In the example we have a multi-line string, which contains a verse.
We strip the indent when the string is printed.

## Kotlin string padding

Kotlin has methods for padding strings with a specified character or space.

StringPad.kt
  

package com.zetcode

fun main() {

    val nums = intArrayOf(657, 122, 3245, 345, 99, 18)

    nums.toList().forEach { e -&gt; println(e.toString().padStart(20, '.')) }
}

The example pads numbers with a dot character using padStart.

.................657
.................122
................3245
.................345
..................99
..................18

## Source

[Kotlin String - language reference](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/)

In this article we have covered Kotlin strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).