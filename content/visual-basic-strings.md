+++
title = "Visual Basic strings"
date = 2025-08-29T20:03:22.834+01:00
draft = false
description = "This part of the Visual Basic tutorial covers strings. A string is a sequences of unsigned 16-bit code points."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datatypes/)
[Next](../operators/)

# Visual Basic strings

last modified October 18, 2023

In this part of the Visual Basic tutorial, we work with string data type.

A string is a sequences of unsigned 16-bit code points that range in value from
0 through 65535.

## First example

A *string literal* is the notation for representing a string value within
the text of a computer program. In Visual Basic string literals are enclosed by
double quotes. A string in Visual Basic is a sequence of Unicode characters.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim str1 As String = "There are 10"
        Dim str2 As String = " apples"

        Console.WriteLine(str1 + str2)

        Console.WriteLine("The length of the first string is " +
             str1.Length.ToString() + " characters")

    End Sub

End Module

In the preceding example, we create two string variables. Then we add them and
compute the length of the first string.

Dim str1 As String = "There are 10"

A string variable is declared and initiated.

Console.WriteLine(str1 + str2)

Two strings are concatenated. We use the + operator
to add two strings.

Console.WriteLine("The length of the first string is " +
    str1.Length.ToString() + " characters")

The Length property is used to
determine the length of the string.

$ dotnet run
There are 10 apples
The length of the first string is 12 characters

## Using quotes

Double quotes are used to create a string literal in Visual Basic. What if we
wanted to display quotes, for example in a direct speech? To print a double
quote, it must be preceded by another double quote.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("There are many stars.")
        Console.WriteLine("He said, ""Which one is your favourite?""")

    End Sub

End Module

When printing double quotes to the console, they must be preceded by another
double quote.

Console.WriteLine("He said, ""Which one is your favourite?""")

Here we show, how to print a direct speech to the console. If we did not use two
double quotes, the compiler would be misled. It would see two consecutive
strings.

$ dotnet run
There are many stars.
He said, "Which one is your favourite?"

## Multiline strings

It is possible to create a multiline string in Visual Basic.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim multiLine As String = "Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword nor war's quick fire shall burn
The living record of your memory.
'Gainst death and all-oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the Judgement that yourself arise,
You live in this, and dwell in lovers' eyes."

        Console.WriteLine(multiLine)

    End Sub

End Module

The example creates a string that spans several lines. Since Visual Basic 14, 
it is possible to use single quotes to create multiline strings as well.

$ dotnet run 
Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
...

## Comparing strings

Strings can be compared with the numeric comparison operators and the 
Like operator.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim str As String = "Quebec"

        Console.WriteLine(str = "Quebec")
        Console.WriteLine(str Is "Quebec")
        Console.WriteLine(str Is str)

        Dim str2 As String = str.Clone

        Console.WriteLine(str2)
        Console.WriteLine(str = str2)
        Console.WriteLine(str Is str2)

    End Sub

End Module

If you know C/C++ and languages influenced by them,
like Java, C#, Javascript etc, notice that we do not
compare equality with the popular == operator
but with the = operator.

Dim str As String = "Quebec"

We create and initiate a string variable.

Console.WriteLine(str = "Quebec")
Console.WriteLine(str Is "Quebec")
Console.WriteLine(str Is str)

All these return True. The = operator compares the
contents, while the *Is* operator
compares the references. A String in Visual Basic is a
reference data type. The Is operator simply checks if two
references point into the same place on the Heap.

Dim str2 As String = str.Clone

We create a clone of the string using the
*Clone* method.

Console.WriteLine(str = str2)

This line prints True to the console.
It is logical, since the contents of the original
string and the cloned one are the same.

Console.WriteLine(str Is str2)

This also returns True. However, this is unexpected.
The str and str2 are two references. One would expect that
they point to two different strings (althougn with the same value)
on the Heap. The explanation is the compiler optimalization. Compilers
optimize their code by throwing away duplicate values. Since strings
are immutable data types, it is reasonable to believe that nothing
bad will happen.

-->

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("12" = "12") 'Returns True
        Console.WriteLine("17" &lt; "9") ' Returns True
        Console.WriteLine("aa" &gt; "ab") ' Returns False

    End Sub

End Module

Comparison operators work differently in a string context.

Console.WriteLine("17" &lt; "9") 'Returns True

Value 17 is not smaller than 9. But when applying &lt; on two strings, we do not
compare numbers. We compare the sorting order of the characters. 1 is before 9
and is therefore has a 'lower position' and the comparison returns True.

Console.WriteLine("aa" &gt; "ab") ' Returns False

If the first two characters are equal, the operation continues on the following
ones. The a character is before the b, and the comparison operation returns
False.

The String.Compare compares two specified strings and returns an
integer that indicates their relative position in the sort order. If the
returned value is less than zero, the first string is less than the second. If
it returns zero, both strings are equal. Finally, if the returned value is
greater than zero, the first string is greater than the second.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim str1 As String = "Visual Basic"
        Dim str2 As String = "visual basic"

        Console.WriteLine(String.Compare(str1, str2, True))
        Console.WriteLine(String.Compare(str1, str2, False))

    End Sub

End Module

There is an optional third ignoreCase argument that determines if the case
should be honoured.

Console.WriteLine(String.Compare(str1, str2, True))

Compare two strings and ignore the case. This line prints 0
to the console.

The Like operator can be used for simple regular expression
matching.

Program.vb
  

Option Strict On

Module Example

    Dim words() As String = {"Seven", "even", "Maven", "Amen", "Leven"}

    Sub Main()

        For Each word As String In words
            If word Like "?*even" Then
                Console.WriteLine("{0} matches the pattern", word)
            Else
                Console.WriteLine("{0} does not match the pattern", word)
            End If
        Next

    End Sub

End Module

We have an array of words. We test these words against the regex pattern.
We print a message to the console if the words matches or not.

Dim words() As String = {"Seven", "even", "Maven", "Amen", "Leven"}

This is an array of five words.

For Each word As String In words
    ...
Next

We use the For Each loop to traverse the array.
The current word is stored in the word variable.

If word Like ".*even" Then
    Console.WriteLine("{0} matches the pattern", word)
Else
    Console.WriteLine("{0} does not match the pattern", word)
End If

The "?*even" is a simple regular expression pattern. The ?
matches any single character, the * zero or more characters.
We print a message to inform if the word matches the pattern or not.

## String functions

Visual Basic has useful built-in functions that
can be used for working with strings.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim str As String = "Visual Basic"

        Dim n As Integer = Len(str)
        Dim l As String = Left(str, 6)
        Dim r As String = Right(str, 5)
        Dim repl As String = Replace(str, "Basic", "form")

        Console.WriteLine("The string has {0} characters", n)
        Console.WriteLine("The Left function returns {0}", l)
        Console.WriteLine("The Right function returs {0}", r)
        Console.WriteLine("The Replace function returns {0}", repl)

    End Sub

End Module

We introduce four string functions in Visual Basic.

Dim n As Integer = Len(str)

The Len function returns the number of
characters in a string.

Dim l As String = Left(str, 6)

This call of the Left function returns
6 characters from the left of the string. In our case, "Visual".

Dim r As String = Right(str, 5)

Here we get 5 characters from the right.

Dim repl As String = Replace(str, "Basic", "form")

Strings are immutable in Visual Basic. When we use the
Replace function, we return a new
modified string, in which the first string is replaced with
the second one.

$ dotnet run
The string has 12 characters
The Left function returns Visual
The Right function returs Basic
The Replace function returns Visual form

The Join and Split functions are very handy functions.

Program.vb
  

Option Strict On

Imports System

Module Example

    Sub Main()

        Dim items() As String = {"C#", "Visual Basic", "Java", "Perl"}

        Dim langs As String = Join(items, ",")
        Console.WriteLine(langs)

        Dim ls() As String = Split(langs, ",")

        For Each lang As String In ls
            Console.WriteLine(lang)
        Next

    End Sub

End Module

In our program, we join and split strings with these two functions.

Dim langs As String = Join(items, ",")

All words from the array are joined. We build one string from them.
There will be a comma character between each two words.

Dim ls() As String = Split(langs, ",")

As a reverse operation, we split the langs string. The
Split function returns an array of
words, delimited by a character. In our case it is a
comma character.

For Each lang As String In ls
    Console.WriteLine(lang)
Next

We go through the array and print its elements.

$ dotnet run
C#,Visual Basic,Java,Perl
C#
Visual Basic
Java
Perl

## String methods

Apart from string functions, there are several string methods.
Some of them provide the same functionality. As we have already
mentioned, strings are not primitive data types. They are
reference types. They are objects and these objects have methods,
which can do some work.

Program.vb
  

Option Strict On

Imports System

Module Example

    Sub Main()

        Dim str As String = "Determination"

        Console.WriteLine(str.Contains("e"))
        Console.WriteLine(str.IndexOf("e"))
        Console.WriteLine(str.LastIndexOf("i"))

        Console.WriteLine(str.ToUpper)
        Console.WriteLine(str.ToLower)

    End Sub

End Module

We introduce five string methods in the above example.

Console.WriteLine(str.Contains("e"))

The Contains method returns True
if the string contains a specific character.

Console.WriteLine(str.IndexOf("e"))

The IndexOf returns the first index
of a letter in the string.

Console.WriteLine(str.LastIndexOf("i"))

The LastIndexOf methods
returns the last index of a letter in a string.

Console.WriteLine(str.ToUpper)
Console.WriteLine(str.ToLower)

Letters of the string are converted to uppercase with
the ToUpper method and to lowercase
with the ToLower method.

$ dotnet run
True
1
10
DETERMINATION
determination

## Copy vs Clone

The Copy method creates a new instance of String with the same
value as a specified String. The Clone method returns a reference
to the string, which is being cloned. It is not an independent copy of the
string on the heap; it is another reference on the same string.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim str As String = "Visual Basic"

        Dim cloned As String = CType(str.Clone(), String)
        Dim copied As String = String.Copy(str)

        Console.WriteLine(str = cloned) ' Prints True
        Console.WriteLine(str = copied) ' Prints True

        Console.WriteLine(str Is cloned) ' Prints True
        Console.WriteLine(str Is copied) ' Prints False

    End Sub

End Module

Our example demonstrates the difference between the two methods.

Dim cloned As String = CType(str.Clone(), String)
Dim copied As String = String.Copy(str)

The string value is cloned and copied.

Console.WriteLine(str = cloned) ' Prints True
Console.WriteLine(str = copied) ' Prints True

The contents of all three strings are the same.

Console.WriteLine(str Is cloned) ' Prints True
Console.WriteLine(str Is copied) ' Prints False

The Is operator compares
the two reference objects. Therefore comparing a
copied string to the original string returns False.
Because they are two distinct objects.

## Formatting strings

In the next examples, we format strings. The .NET
Framework has a feature called *composite formatting*.
It is supported by Format and
WriteLine methods. A method takes
a list of objects and a composite format string as input.
The format string consists of fixed string plus some format items.
These format items are indexed placeholders which correspond to the objects
in the list.

The format item has the following syntax:

{index[,length][:formatString]}

The index component is mandatory. It is a number starting from 0 that refers
to an item from the list of objects. Multiple items can refer to the same element
of the list of objects. An object is ignored if it is not referenced by a format
item. If we refer outside the bounds of the list of objects, a runtime exception
is thrown.

The length component is optional. It is the minimum number of characters in
the string representation of the parameter. If positive, the parameter is
right-aligned; if negative, it is left-aligned. If it is specified,
there must by a colon separating the index and the length.

The formatString is optional. It is a string that formats a value is a
specific way. It can be used to format dates, times, numbers, or enumerations.

Here we show, how to work with length component of the
format items. We print three columns of numbers to the terminal.
Left, middle and right aligned.

Program.vb
  

Option Strict On

Imports System

Module Example

    Dim oranges As Byte = 2
    Dim apples As Byte = 4
    Dim bananas As Byte = 3

    Sub Main()

        Dim str1 As String = "There are {0} oranges, {1} apples and " +
            "{2} bananas"

        Dim str2 As String = "There are {1} oranges, {2} bananas and " +
            "{0} apples"

        Console.WriteLine(str1, oranges, apples, bananas)
        Console.WriteLine(str2, apples, oranges, bananas)

    End Sub

End Module

We print a simple message to the console. We use only index component of the
format item.

Dim str1 As String = "There are {0} oranges, {1} apples and " +
    "{2} bananas"

The {0}, {1}, and {2} are format items. We specify the index component. Other
components are optional.

Console.WriteLine(str1, oranges, apples, bananas)

Now we put together the composite formatting. We have the string and the list of
objects (oranges, apples, bananas). The {0} format item refers to
the oranges. The WriteLine method replaces the {0}
format item with the contents of the oranges variable.

Dim str2 As String = "There are {1} oranges, {2} bananas and " +
    "{0} apples"

The order of the format items referring to the objects is notation
important.

$ dotnet run
There are 2 oranges, 4 apples and 3 bananas
There are 2 oranges, 3 bananas and 4 apples

Program.vb
  

```
Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("{0}  {1, 12}", "Decimal", "Hexadecimal")

        Console.WriteLine("{0:D}  {1,8:X}", 502, 546)
        Console.WriteLine("{0:D}  {1,8:X}", 345, 765)
        Console.WriteLine("{0:D}  {1,8:X}", 320, 654)
        Console.WriteLine("{0:D}  {1,8:X}", 120, 834)
        Console.WriteLine("{0:D}  {1,8:X}", 620, 454)

    End Sub

End Module

```

We print numbers in a decimal and hexadecimal
format. We also align the numbers using the length
component.

Console.WriteLine("{0:D}  {1,8:X}", 502, 546)

The {0:D} format item specifies, the first item from the list of
supplied objects will be taken and formatted in the decimal format. The
{1,8:X} format item takes the second item. Formats it in the
hexadecimal format (:X). And the string length will be 8 characters
,8. Because the number has only three characters, it is right
aligned and padded with empty strings.

$ dotnet run
Decimal   Hexadecimal
502       222
345       2FD
320       28E
120       342
620       1C6

The last two examples format numeric and date data.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(String.Format("Number: {0:N}", 126))
        Console.WriteLine(String.Format("Scientific: {0:E}", 126))
        Console.WriteLine(String.Format("Currency: {0:C}", 126))
        Console.WriteLine(String.Format("Percent: {0:P}", 126))
        Console.WriteLine(String.Format("Hexadecimal: {0:X}", 126))

    End Sub

End Module

The example demonstrates the standard formatting specifiers for numbers. Number
126 is printed in five different formats; normal, scientific, currency, percent,
and hexadecimal.

$ dotnet run
Number: 126.000
Scientific: 1.260000E+002
Currency: $126.00
Percent: 12,600.000%
Hexadecimal: 7E

Finally, we format date and time data.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim today As DateTime = DateTime.Now()

        Console.WriteLine(String.Format("Short date: {0:d}", today))
        Console.WriteLine(String.Format("Login date: {0:D}", today))
        Console.WriteLine(String.Format("Short time: {0:t}", today))
        Console.WriteLine(String.Format("Long time: {0:T}", today))
        Console.WriteLine(String.Format("Month: {0:M}", today))
        Console.WriteLine(String.Format("Year: {0:Y}", today))

    End Sub

End Module

The preceding example demonstrates the standard
formatting specifiers for dates.

$ dotnet run
Short date: 9/3/2022
Login date: Saturday, September 3, 2022
Short time: 12:05 PM
Long time: 12:05:02 PM
Month: September 3
Year: September 2022

This part of the Visual Basic tutorial covered strings.

[Contents](..)
[Previous](../datatypes/)
[Next](../operators/)