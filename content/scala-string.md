+++
title = "Scala String"
date = 2025-08-29T20:11:42.539+01:00
draft = false
description = "Scala String tutorial shows how to work with strings in Scala. In Scala, a string is a sequence of Unicode characters."
image = ""
imageBig = ""
categories = ["scala"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Scala String

last modified January 10, 2023

In this article, we show how to work with strings in Scala.

## Scala String definition

In Scala, a String is a sequence of Unicode characters. Strings are objects.
There are two basic types for working with strings:

- String

- StringBuilder

String is an immutable sequence of Unicode characters.
StringBuilder is a mutable sequence of Unicode characters.

A *string literal* is a series of characters in the source code that is
enclosed in double quotes. For example, "falcon" is a string literal. 

## Scala String simple example

The first example is a simple Scala string example.

main.scala
  

@main def main() =

    val w = "an old falcon"
    println(w)

    val msg = "an " + "old " + "falcon"
    println(msg)

We define two strings.

val w = "an old falcon"
println(w)

A string literal is bound to the w identifier. A string literal is
enclosed by double quotes. It is printed to the console with
println.

val msg = "an " + "old " + "falcon"

We concatenate three strings into a message with the + operator.

$ scala main.scala
an old falcon
an old falcon

## Scala mutable &amp; immutable strings

The String is a sequence of immutable Unicode characters, while the
StringBuilder is a sequence of mutable Unicode characters. The next
example will show the difference.

main.scala
  

import scala.collection.mutable.StringBuilder

@main def main() =

    val name = "Jane"
    val name2 = name.replace('J', 'K')
    val name3 = name2.replace('n', 't')

    println(name)
    println(name3)

    val sb = StringBuilder("Jane")
    println(sb)

    sb.setCharAt(0, 'K')
    sb.setCharAt(2, 't')

    println(sb)

Both objects have methods for replacing characters in a string.

val name = "Jane"
val name2 = name.replace('J', 'K')
val name3 = name2.replace('n', 't')

Calling the replace method on a String results in
returning a new modified string. The original string is not changed.

sb.setCharAt(0, 'K')
sb.setCharAt(2, 't')

The setCharAt method of a StringBuilder will replace a
character at the given index with a new character. The original string is
modified.

$ scala main.scala
Jane
Kate
Jane
Kate

## Scala multiline String

A multiline string can be created with triple-quotes. To remove leading
whitespace, we use the | character and the stripMargin
method.

main.scala
  

@main def main() =

    val sonnet55 =
        """Not marble nor the gilded monuments
        |Of princes shall outlive this powerful rhyme,
        |But you shall shine more bright in these contents
        |Than unswept stone besmeared with sluttish time.
        |When wasteful war shall statues overturn,
        |And broils root out the work of masonry,
        |Nor Mars his sword nor war's quick fire shall burn
        |The living record of your memory.
        |'Gainst death and all-oblivious enmity
        |Shall you pace forth; your praise shall still find room
        |Even in the eyes of all posterity
        |That wear this world out to the ending doom.
        |So, till the Judgement that yourself arise,
        |You live in this, and dwell in lovers' eyes.""".stripMargin

    println(sonnet55)

We have a verse in a multiline string.

$ scala main.scala
Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
...

## Scala String escape characters

The escape characters are special characters that perform a specific operation.
For instance, the \n characters starts a new line.

main.scala
  

@main def main() =

    println("Three\t bottles of wine")
    println("He said: \"I love ice skating\"")
    println("Line 1:\nLine 2:\nLine 3:")

We have an example with escape characters.

println("Three\t bottles of wine")

The \t escape character inserts a tab.

println("He said: \"I love ice skating\"")

We insert double qoutes into a string literal by escaping them with
\.

println("Line 1:\nLine 2:\nLine 3:")

With \n, we create three lines.

$ scala main.scala 
Three    bottles of wine
He said: "I love ice skating"
Line 1:
Line 2:
Line 3:

## Scala raw String

In raw strings, the escape characters are not interpreted.

main.scala
  

@main def main() = 

    println(raw"snow\tshow\tsnow")
    println("becomes") 
    println("snow\tshow\tsnow")

The example uses a raw string.

$ scala main.scala 
snow\tshow\tsnow
becomes
snow    show    snow

## Scala compare strings

Strings are compared naturally with == and !=
operators.

main.scala
  

@main def main() = 

    val s1 = "Eagle"
    val s2 = "eagle"

    if s1 != s2 then 
        println("1) strings are not equal")

    if s1 == s2.capitalize then 
        println("2) strings are equal")

In the example, we compare two strings.

$ scala main.scala 
1) strings are not equal
2) strings are equal

## Scala indexing string characters

We can retrieve string characters through their index. Indexes  start from zero.

main.scala
  

@main def main() = 

    val w = "and old falcon"

    println(w(0))
    println(w(5))

In the example, we print the first and the sixth character. 

## Scala split String

The split function cuts the string into a list of strings based on
the specified delimiter.

main.scala
  

@main def main() =

    val word = "eagle,falcon,hawk,owl"
    val birds = word.split(",")

    birds.foreach(println)

We have a string consisting of birds delimited by comma. We split the strings to
get all birds separately.

$ scala main.scala
eagle
falcon
hawk
owl

## Scala String startsWith/endsWith

The startsWith method returns true if a string starts with the
specified prefix and the endsWith returns true if a string ends
with the specified character.

main.scala
  

@main def main() =

    val words = List("tank", "boy", "tourist", "ten",
            "pen", "car", "marble", "sonnet", "pleasant",
            "ink", "atom")

    val res = words.filter(e =&gt; startWithT(e))
    println(res)

    val res2 = words.filter(e =&gt; endWithK(e))
    println(res2)

val startWithT = (word: String) =&gt; word.startsWith("t")
val endWithK = (word: String) =&gt; word.endsWith("k")

We have a list of words. We find out which words start with 't' and and with
'k'.

val words = List("tank", "boy", "tourist", "ten",
        "pen", "car", "marble", "sonnet", "pleasant",
        "ink", "atom")

We have a list of words.

val res = words.filter(e =&gt; startWithT(e))
println(res)

val res2 = words.filter(e =&gt; endWithK(e))
println(res2)

The filter functions call a predicate on their elements.

val startWithT = (word: String) =&gt; word.startsWith("t")

The startWithT is a custom predicate function which returns true if
a string starts with 't'.

$ scala main.scala
List(tank, tourist, ten)
List(tank, ink)

## Scala String interpolation

String interpolation is variable substitution with its value inside a string.
Interpolated strings are prefixed with s or f
prefixes.

main.scala
  

@main def main() = 

    val name = "Peter"
    val age = 34

    println(s"$name is $age years old")

    val word = "falcon"

    println(s"The string has ${word.length} characters")

    val item = "beer"
    val price = 4.5

    println(s"The price of $item is $$$price")

In the example, we interpolate strings with s prefix.

val name = "Peter"
val age = 34

println(s"$name is $age years old")

The $name and $age variables are replaced with their
values.

println(s"The string has ${word.length} characters")

With {} braces, we can have expressions inside strings.

println(s"The price of $item is $$$price")

In order to use a dollar sign, we use $$. 

$ scala main.scala 
Peter is 34 years old
The string has 6 characters
The price of beer is $4.5

With the f prefix, we also provide the formatter characters after 
the variable names.

main.scala
  

@main def main() = 

    val name = "Peter"
    val age = 34

    println(f"$name%s is $age%d years old")

We build a string with  f-interpolated string.

## Scala string to integer

We convert a string to integer with toInt.

main.scala
  

@main def main() =

    val vals = List[String | Int]("3", 12, "11", 5, 6, "8")

    val vals2 = vals.map(_.toString.toInt)
    println(vals2.sum)

    var msum = 0

    for e &lt;- vals do
        msum = msum + e.toString.toInt

    println(msum)

We have a list of integers and strings. We calculate the sum of all values.

val vals2 = vals.map(_.toString.toInt)
println(vals2.sum)

Before summing up the values, we need to transform the elements into integers
with map and toInt. We calculate the sum using the
built-in sum function.

var msum = 0

for e &lt;- vals do
    msum = msum + e.toString.toInt

println(msum)

Alterlatively, we use a for loop.

$ scala main.scala
45
45

## Scala String length

For many alphabets, the length function gives the correct number of
characters.

main.scala
  

@main def main() =

    val word = "falcon"
    println(word.length)

    val word2 = "čerešňa"
    println(word2.length)

    val word3 = "ведомство"
    println(word3.length)

    val word4 = "合気道"
    println(word4.length)

In the example, we print the number of characters for English, Slovak, Russian,
and Japanese words.

$ scala main.scala
6
7
9
3

The output is correct.

There are alphabets for which the length provides incorrect
results.

main.scala
  

import java.text.BreakIterator

@main def main() =

    val emojis = "🐜🐬🐄🐘🦂🐫🐑🦍🐯🐞"
    println(emojis.length)

    val it = BreakIterator.getCharacterInstance
    it.setText(emojis)
    var count = 0

    while it.next != BreakIterator.DONE do
        count += 1

    println(count)

    println("--------------------------")

    val word = "नमस्ते"
    println(word.length)

    val it2 = BreakIterator.getCharacterInstance
    it2.setText(word)
    var count2 = 0

    while it2.next != BreakIterator.DONE do
        count2 += 1

    println(count2)

For instance, for emojis and Sanskrit words, the length function
gives wrong numbers. We can get the correct answer for emojis with
BreakIterator. However, for the Sanskrit word, the
BreakIterator is still incorrect.

$ scala main.scala
20
10
--------------------------
6
3

The correct answer is 10 emoji characters and 4 Sanskrit characters.

## Scala String lines

The lines method returns a stream of lines extracted from the
string, separated by line terminators.

main.scala
  

@main def main() =

    val words = """
        |club
        |sky
        |blue
        |cup
        |coin
        |new
        |cent
        |owl
        |falcon
        |brave
        |war
        |ice
        |paint
        |water""".stripMargin

    val wstream = words.lines()

    wstream.forEach(word =&gt;

        if word.length() == 3 then
            println(word)
    )

We have fourteen words in the text block.

var wstream = words.lines()

With the lines method we create a stream of these words.

wstream.forEach(word =&gt;

    if word.length() == 3 then
        println(word)
)

We go over the stream with forEach and print all words having
length of three letters.

$ scala main.scala
sky
cup
new
owl
war
ice

## Scala add strings

There are several ways to add or build strings.

main.scala
  

@main def main() = 

    val w1 = "an"
    val w2 = "old"
    val w3 = "falcon"

    val msg = w1 + " " + w2 + " " + w3
    println(msg)

    println(w1.concat(" ").concat(w2).concat(" ").concat(w3))

    println(s"$w1 $w2 $w3")
    println(f"$w1%s $w2%s $w3%s")
    printf("%s %s %s%n", w1, w2, w3)

In the example, we build strings using the + operator,
concat function, string interpolation, and printf
function.

## Scala String matches

The matches function tells whether the string matches the given
regular expression.

main.scala
  

@main def main() =

    var words = """
            |book
            |bookshelf
            |bookworm
            |bookcase
            |bookish
            |bookkeeper
            |booklet
            |bookmark
            """.stripMargin

    var wstream = words.lines

    wstream.forEach(word =&gt;

        if word.matches("book(worm|mark|keeper)?") then
            println(word)
    )

In the example, we print all the words that satisfy the specified subpatterns.

$ scala main.scala
book
bookworm
bookkeeper
bookmark

## Scala String bytes

We can get the underlying bytes with getBytes.

main.scala
  

@main def main() = 

    val w = "and old falcon"

    println(w.getBytes.mkString(" "))
    println(w.getBytes.map("%02x ".format(_)).mkString)

The example prints the byte values of a string in decimal and hexadecimal
formats.

println(w.getBytes.mkString(" "))

The getBytes returns an array of bytes. We join them into a string 
with mkString; the values are separated with a space.

$ scala main.scala 
97 110 100 32 111 108 100 32 102 97 108 99 111 110
61 6e 64 20 6f 6c 64 20 66 61 6c 63 6f 6e 

## Scala joining strings

We can join a list of strings with mkString.

main.scala
  

@main def main() =

    val words = List("work", "sky", "place", "cup")

    val joined = words.mkString(" ")
    println(joined)

    val joined2 = words.mkString(", ")
    println(joined2)

In the example, we joing a list of strings into one string.

val joined = words.mkString(" ")

The parameter of the mkString method is a delimiter that
is going to separater each string in the final string.

$ scala main.scala
work sky place cup
work, sky, place, cup

In this article we have worked with strings in Scala.