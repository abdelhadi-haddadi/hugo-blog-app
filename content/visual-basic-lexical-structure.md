+++
title = "Visual Basic lexical structure"
date = 2025-08-29T20:03:20.546+01:00
draft = false
description = "This part of the Visual Basic tutorial covers lexical structure of Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../basics/)

# Visual Basic lexical structure

last modified October 18, 2023

Computer languages, like human languages, have a lexical structure. A source
code of a Visual Basic program consists of tokens. Tokens are atomic code
elements. In Visual Basic, we have comments, variables, literals, operators,
delimiters, and keywords.

Visual Basic programs are composed of characters from the Unicode character set.

## Comments

*Comments* are used by humans to clarify the source code. All comments in
Visual Basic follow either the ' character or the
Rem keyword.

Program.vb
  

Option Strict On

' This is comments.vb
' Author: Jan Bodnar
' ZetCode 2022

Module Example

    Rem program starts here
    Sub Main()

        Console.WriteLine("This is comments.vb")

    End Sub

End Module

Comments are ignored by the Visual Basic compiler.

## White space

White space in Visual Basic is used to separate tokens in the source file.
It is used to improve readability of the source code.

Dim i As Integer

White spaces are required in some places. For example between the
Dim keyword and the variable name. In other places, it is
forbidden. It cannot be present in variable identifiers or language keywords.

a=1
b = 2
c  =  3

The amount of space put between tokens is irrelevant for the Visual Basic
compiler.

## Variables

A *variable* is an identifier, which holds a value. In programming we say
that we assign a value to a variable. Technically speaking, a variable is a
reference to a computer memory, where the value is stored. Variable names can
have alphanumerical characters and underscores. An identifier may begin with a
character or an underscore. It may not begin with a number. Variable names are
not case sensitive. This means that Name, name
or NAME refer to the same variable. Variable names also cannot
match language keywords.

Dim name23 As String
Dim col As Integer
Dim birthdate As Date

These are valid Visual Basic identifiers.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim name As String = "Robert"
        Dim Name As String = "Julia"

        Console.WriteLine(name)
        Console.WriteLine(Name)

    End Sub

End Module

This code will not compile because the identifiers are not
case sensitive.

## Literals

A *literal* is a textual representation of a particular value of a type.
Literal types include Boolean, Integer, floating point, string, character, and
date. Technically, a literal will be assigned a value at compile time, while a
variable  will be assigned at runtime.

Dim age As Byte = 29
Dim nationality As String = "Hungarian"

Here we assign two literals to variables. Number 29 and string "Hungarian" are
literals.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim sng As Boolean = True
        Dim name As String = "James"
        Dim job As String = Nothing
        Dim age As Byte = 23
        Dim weight As Single = 68.5
        Dim born As DateTime = DateValue("November 12, 1987")

        Console.WriteLine("His name is {0}", name)

        If sng Then
            Console.WriteLine("He is single")
        Else
            Console.WriteLine("He is in a relationship")
        End If

        Console.WriteLine("His job is {0}", job)
        Console.WriteLine("He weighs {0} kilograms", weight)
        Console.WriteLine("He was born in {0}", Format(born, "yyyy"))

    End Sub

End Module

In the above example, we have other literals. The Boolean literal may have value
True or False. James is a string literal.
The Nothing represents the default value of any data type.
23 is an Integer literal. 68.5 is a floating point
literal. Finally, the November 12, 1987 is a date literal.

$ dotnet run
His name is James
He is single
His job is
He weighs 68.5 kilograms
He was born in 1987

## Operators

An *operator* is a symbol used to perform an action on some value.

+    -    *    /    \    ^     &amp;
=    +=   -=   *=   /=   \=    ^=
&lt;    &gt;    &amp;=  &gt;&gt;=   &lt;&lt;=   &gt;=   &lt;=
&gt;&gt;   &lt;&gt;   &lt;&lt;

These are Visual Basic operators. We talk about operators
later in the tutorial.

## Separators

A *separator* is a sequence of one or more characters used to specify the
boundary between separate, independent regions in plain text or other data
stream.

(   )   {   }   !   #   ,   .   :   :=   ?

These are Visual Basic separators.

Dim language As String = "Visual Basic"

The double characters are used to mark the beginning and the end of a string.

Console.WriteLine("Today is {0}", GetToday)

Parentheses (square brackets) are used to mark the method signature. The
signature consists of method parameters. Curly brackets are used to denote the
evaluated value.

Dim array() As Integer = { 2, 4, 5, 6, 7, 3, 2 }

The curly brackets are also used to create arrays.

## Keywords

A keyword is a reserved word in the Visual Basic language. Keywords are used to
perform a specific task in the computer program. For example, print a value, do
repetitive tasks or perform logical operations. A programmer cannot use a
keyword as an ordinary variable.

Visual Basic is rich in keywords. Many of them will be explained in this
tutorial. The keywords include If, Else,
Dim, For, Date, Double,
Or, Exit
and many others.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim i As Integer

        For i = 0 To 35 Step 5
            Console.WriteLine(i)
        Next

    End Sub
End Module

In the above example, we use the following keywords: Option, On,
Module, Sub, Dim, As, Integer,
For, To, Step, Next, End
are Visual Basic keywords.

In this part of the Visual Basic tutorial, we covered the basic lexis for the
Visual Basic language.

[Contents](..)
[Next](../basics/)