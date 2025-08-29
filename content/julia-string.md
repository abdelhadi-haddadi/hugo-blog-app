+++
title = "Julia string"
date = 2025-08-29T20:02:21.709+01:00
draft = false
description = "Julia string tutorial shows how to work with strings in Julia. In Julia, a string is a finite sequence of characters."
image = ""
imageBig = ""
categories = ["julia"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Julia string

last modified October 19, 2023

In this article we show how to work with strings in Julia.

In Julia, a string is a finite sequence of characters. It is a data type which
stores a sequence of data values, usually bytes, in which elements usually stand
for characters according to a character encoding. 

The built-in concrete type used for strings is String. It supports
the full range of Unicode characters via the UTF-8 encoding.

When a string appears literally in the source code, it is known as a string
literal. The string literal is delimited by two double quotes 
(e.g. "an old falcon").

Strings in Julia are immutable. 

## Julia string simple example

The following is a simple Julia string example.

main.jl
  

word::String = "falcon"
println(word)

word2 = "hawk"
println(word2)

We define two strings and print them.

word::String = "falcon"
println(word)

We explicitly define the type for the word variable. The type 
follows the :: characters.

word2 = "hawk"
println(word2)

In the second case, the type is inferred by Julia.

$ julia main.jl 
falcon
hawk

## Julia string contatenation

Julia uses the * character to concatenate strings. 

main.jl
  

println("an" * " old " * "falcon")

n = 4
println("There are " * string(n) * " hawks")

In the program, we build two messages by concatenating strings.

println("an" * " old " * "falcon")

The three strings are added together using the * operator.

n = 4
println("There are " * string(n) * " hawks")

In the second case, we also have an integer. The integer is turned into a string 
with the help of the string function.

$ julia main.jl
an old falcon
There are 4 hawks

## Julia string to integer

The int built-in function converts a string to an integer.

main.jl
  

vals = ("2", 1, "4", 6, "11")
a, b, c, d, e = vals

sum = parse(Int16, a) + b + parse(Int16, c) + d + parse(Int16, e)
println(sum)

We have a tuple of values: integers and strings. We want to compute the sum of
all values.

a, b, c, d, e = vals

We destructure the tuple into five variables.

sum = parse(Int16, a) + b + parse(Int16, c) + d + parse(Int16, e)

We sum the variables; the strings are converted into integers with
parse function.

$ julia main.jl
24

## Julia string repeat

In the next example we show how to repeat a string in Julia.

main.jl
  

println(repeat("falcon ", 5))
println(repeat("hawk ", 3))
println(repeat(["hawk", "falcon"], 3))

Strings can be repeated with the repeat function. The function 
takes a string or an array of strings as the first parameter. The second one is 
the count number.

$ julia repeat.jl
falcon falcon falcon falcon falcon 
hawk hawk hawk
["hawk", "falcon", "hawk", "falcon", "hawk", "falcon"]

## Julia string interpolation

An interpolated string is a string literal that might contain interpolated
expressions. The $ special character identifies a variable in a string literal
to be expanded to its value. Expressions are placed within $( )
delimiters.

main.jl
  

name = "John Doe"
age = 34 

msg = "$name is $age years old"
println(msg)

x = 12
y = 11

println("x + y = $(x + y)")

We have two interpolated strings.

msg = "$name is $age years old"

We build a string that contains the contents of two variables: name
and age. They are preceded with the $ character. After
the string is expanded, it contains the values of the two variables.

println("x + y = $(x + y)")

Interpolated strings can contain expressions.

$ julia main.jl
John Doe is 34 years old
x + y = 23

## Julia string escape sequences

Escape characters are special characters that perform a specific operation.
For instance, the \n characters starts a new line.

main.jl
  

println("Three\t bottles of wine")
println("He said: \"I love ice skating\"")
println("Line 1:\nLine 2:\nLine 3:")

We have an example with escape characters.

println("Three\t bottles of wine")

The \t escape character inserts a tab.

println("He said: \"I love ice skating\"")

We insert double qoutes into a string literal by escaping them with \.

println("Line 1:\nLine 2:\nLine 3:")

With \n, we create three lines.

$ julia main.jl
Three    bottles of wine
He said: "I love ice skating"
Line 1:
Line 2:
Line 3:

## Julia verbatim string

Verbatim strings do not interprete escape sequences. They are preceded with the
raw prefix.

main.jl
  

s1 = raw"deep \t forest"
s2 = raw"C:\Users\Admin\Documents"

println(s1)
println(s2)

In this code example we work with verbatim strings.

s1 = raw"deep \t forest"

The \t special character is not interpreted; it is only printed to
the console.

s2 = raw"C:\Users\Admin\Documents"

Verbatim strings are convenient when we work with paths.

$ julia main.jl
deep \t forest
C:\Users\Admin\Documents

## The @sprintf macro

We can format a string using the @sprintf macro. 

main.jl
  

using Printf

name = "John Doe"
occupation = "gardener"

msg = @sprintf("%s is a %s", name, occupation)
println(msg)

The macro is located in the Printf module.

msg = @sprintf("%s is a %s", name, occupation)
println(msg)

We build a message with the @sprintf macro. The %s are 
format specifiers that expect a string value.

$ julia main.jl
John Doe is a gardener

## Source

[Julia Strings documentation](https://docs.julialang.org/en/v1/manual/strings/)

In this article we have worked with strings in Julia.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Julia tutorials](/all/#julia).