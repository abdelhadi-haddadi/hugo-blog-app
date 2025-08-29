+++
title = "F# string"
date = 2025-08-29T19:54:34.027+01:00
draft = false
description = "Learn how to work with strings in F#. This tutorial covers string manipulation, properties, and usage in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# string

last modified May 1, 2025

In this article we show how to work with strings in F#.

In F#, a **string** is a sequence of Unicode characters. Strings
are used to represent text and are a fundamental data type in F#. A string can
store letters, numbers, symbols, and even emoji characters. When a string
appears literally in the source code, it is called a *string literal* and
is enclosed in double quotes, for example: "an old falcon".

Strings in F# are objects and are based on the .NET System.String
type, which is **immutable**. This means that once a string is
created, it cannot be changed; any operation that appears to modify a string
actually creates a new string. For scenarios where you need to build or modify
strings frequently (such as in loops), you can use the
System.Text.StringBuilder class, which is a
**mutable** sequence of characters and is more efficient for
repeated modifications.

    - System.String (immutable, used for most string operations)

    - System.Text.StringBuilder (mutable, used for efficient string manipulation)

The string keyword in F# is an alias for
System.String. You can use either string or
System.String in your code; they refer to the same type.

## F# string simple example

The following is a simple F# string example.

main.fsx
  

let w1 = "an old falcon"
let w2 = "an" + " old" + " falcon"

printfn "%s" w1
printfn "%s" w2

We define a regular string and print it, then we concatenate two strings.

let w1 = "an old falcon"

A string is delimited in two double quotes.

let w2 = "an" + " old" + " falcon"

We concatenate three strings with the + operator.

printfn "%s" w1

The string is prited to the terminal with printf.

λ dotnet fsi main.fsx
an old falcon
an old falcon

## F# string to int

The int  built-in function converts a string to an integer.

main.fsx
  

let vals = ("2", 1, "4", 6, "11")

let a, b, c, d, e = vals
let sum = int a + b + int c + d + int e

printfn "%d" sum

We have a tuple of values: integers and strings. We want to compute the sum of
all values.

let a, b, c, d, e = vals

We destructure the tuple into five variables.

let sum = int a + b + int c + d + int e

We sum the variables; the strings are converted into integers with
int.

λ dotnet fsi main.fsx
24

## F# string repeat

In the next example we show how to repeat a string in F#.

main.fsx
  

printfn "%s" (String.replicate 5 "falcon ")
printfn "%s" (String.concat " " (Array.create 5 "falcon"))

Strings can be repeated with String.replicate or with
Array.create and String.concat.

$ dotnet fsi main.fsx
Name: John Doe, Age: 34

## F# string interpolation

The $ special character prefix identifies a string literal as an interpolated
string. An interpolated string is a string literal that might contain
interpolated expressions.

main.fsx
  

open System

let name = "John Doe"
let occupation = "gardener"

let msg = $"{name} is an {occupation}"
printfn $"{msg}"

printfn $"5 * 8 = {5 * 8}"

let now = DateTime.Now
printfn $"Hello, {name}! Today is {now.DayOfWeek}."

We create a few interpolated strings.

let msg = $"{name} is an {occupation}"
printfn "%s" msg

We build a string that contains the contents of two variables: name
and occupation. They are placed between curly braces.

printfn $"5 * 8 = {5 * 8}"

Interpolated strings can contain expressions.

let now = DateTime.Now
printfn $"Hello, {name}! Today is {now.DayOfWeek}."

We interpolate a DateTime value.

λ dotnet fsi main.fsx
John Doe is an gardener
5 * 8 = 40
Hello, John Doe! Today is Monday.

We can have typed format specifiers to enforce type safety.

main.fsx
  

let name = "John Doe"
let age = 34

printfn $"Name: %s{name}, Age: %d{age}"

The %s specifier is for string and %d is for an
integer.

## F# string escape sequences

Escape characters are special characters that perform a specific operation.
For instance, the \n characters starts a new line.

main.fsx
  

printfn("Three\t bottles of wine")
printfn("He said: \"I love ice skating\"")
printfn("Line 1:\nLine 2:\nLine 3:")

We have an example with escape characters.

printfn("Three\t bottles of wine")

The \t escape character inserts a tab.

printfn("He said: \"I love ice skating\"")

We insert double qoutes into a string literal by escaping them with \.

printfn("Line 1:\nLine 2:\nLine 3:")

With \n, we create three lines.

λ dotnet fsi main.fsx
Three    bottles of wine
He said: "I love ice skating"
Line 1:
Line 2:
Line 3:

## F# string Contains

The Contains method checks if the string contains the given string. 

main.fsx
  

let msg = "an old falcon"

let word = "falcon"
let r = msg.Contains("falcon")

if r then 
    printfn $"The string contains {word}"
else
    printfn $"The string does not contain {word}"

In the program we check if the *an old falcon* string contains the
*falcon* word.

λ dotnet fsi main.fsx
The string contains falcon

## F# string StartsWith/EndsWith

We can check if a string stars/ends with a character with
StartsWith and EndsWith functions.

main.fsx
  

let words = ["sky"; "war"; "water"; "cup"; "cloud"; "warm"; "rock"; "try"]

let res = words |&gt; List.filter (fun e -&gt; e.StartsWith 'w')
printfn "%A" res

let res2 = words |&gt; List.filter (fun e -&gt; e.EndsWith 'r')
printfn "%A" res2

We have a list of words. We pick all words starting with *w* and then 
ending with *r*.

λ dotnet fsi main.fsx
["war"; "water"; "warm"]
["war"; "water"]

## F# verbatim string

Verbatim strings do not interprete escape sequences. They are preceded with the
@ character. We can create multiline strings with them.

main.fsx
  

printfn "%s" @"deep \t forest"
printfn "%s" @"C:\Users\Admin\Documents"

let text = @"
    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time."

printfn "%s" text

In this code example we work with verbatim strings.

printfn "%s" @"deep \t forest"

The \t special character is not interpreted; it is only printed to
the console.

printfn "%s" @"C:\Users\Admin\Documents"

Verbatim strings are convenient when we work with paths.

let text = @"
    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time."

Verbatim strings allow us to create multiline strings.

λ dotnet fsi main.fsx
deep \t forest
C:\Users\Admin\Documents

    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time.

## F# convert an array of ints to string 

In the next example, we convert an array of integers to a string.

main.fsx
  

let nums = [| 2; 4; 6; 8 |]

let output =
    nums
    |&gt; Array.map (sprintf "%i")
    |&gt; String.concat ","

printfn $"{output}"

We map the sprintf function to each of the array elements; then
we pass the string elements to the String.concat function.

λ dotnet fsi main.fsx
2,4,6,8

## F# building/formatting strings

There are several ways how we can build or format strings.

main.fsx
  

open System
open System.Text

let name = "John Doe"
let age = 33

let msg1 = name + " is " + string age + " years old"
printfn $"{msg1}"

let msg2 = sprintf "%s is %d years old" name age
printfn $"{msg2}"

let msg3 = $"{name} is {age} years old"
printfn $"{msg3}"

let msg4 = String.Format("{0} is {1} years old", name, age)
printfn $"{msg4}"

let builder = StringBuilder()
let msg5 = builder.AppendFormat("{0} is {1} years old", name, age)
printfn $"{msg5}"

The example builds five strings.

let msg1 = name + " is " + string age + " years old"
printfn $"{msg1}"

A string can be concatenated with the + operator.

let msg2 = sprintf "%s is %d years old" name age
printfn $"{msg2}"

We can use the sprintf function and its format specifiers.

let msg4 = String.Format("{0} is {1} years old", name, age)
printfn $"{msg4}"

Another option is the .NET String.Format function.

let builder = StringBuilder()
let msg5 = builder.AppendFormat("{0} is {1} years old", name, age)
printfn $"{msg5}"

Finally, we can use the StringBuilder type.

λ dotnet fsi main.fsx
John Doe is 33 years old
John Doe is 33 years old
John Doe is 33 years old
John Doe is 33 years old
John Doe is 33 years old

## F# enumerate runes

The EnumerateRunes method enumerates runes in a string. The
Rune type corresponds exactly to a Unicode scalar value.

main.fsx
  

open System.Text

let text = "🐄🐘🐫🐑🦍🐯";
let runes = text.EnumerateRunes()

for rune in runes do

    printfn $"{rune}"

We go over emojis inside a string literal.

λ dotnet fsi main.fsx
🐄
🐘
🐫
🐑
🦍
🐯

In this article we have worked with strings in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.