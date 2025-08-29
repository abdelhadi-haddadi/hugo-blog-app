+++
title = "Visual Basic basics"
date = 2025-08-29T20:03:18.267+01:00
draft = false
description = "This part of the Visual Basic tutorial covers the basics of Visual Basic language."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../lexis/)
[Next](../datatypes/)

# Visual Basic basics

last modified October 18, 2023

In this part of the Visual Basic tutorial, we cover basic programming concepts
of the Visual Basic language. We introduce the very basic programs. We work with
variables, constants and basic data types. We read and write to the console; we
mention variable interpolation.

The following is a simple Visual Basic program.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("This is Visual Basic")

    End Sub

End Module

We explain the program line by line.

Option Strict On

Option Strict statement can be either On or Off. The default is
Off, for backward compatibility with Older Visual Basic programs. This statement
is recommended in all your new programs. When the statement is On, the compiler
will detect various bad programming practices.

Module Example
    ...
End Module

Each Visual Basic program should be properly structured. The source code is
placed into modules. Within modules, the code is further divided into procedures
and functions. A properly structured module is easier to maintain and is less
error prone. In our case, we create a module called Example. For this, we use
the Module keyword. A module definition is ended with the End
Module statement.

Sub Main()
    ...
End Sub

With a Sub keyword, we create a procedure. Sub is derived from the
subroutine word. Subroutines and procedures are synonyms. In Visual Basic, the
preferred word is the procedure. A procedure is a block of Visual Basic code.
This is to achieve modularity of the code.

Console.WriteLine("This is Visual Basic")

In this code line, we print the "This is Visual Basic" string literal to the
console. To print a message to the console, we use the WriteLine
method of the Console class. It represents the standard input,
output, and error streams for console applications.

$ dotnet run
This is Visual Basic

We can use a Console class to read values as well.

Program.vb
  

Option Strict On

Module Example

    Dim name As String

    Sub Main()

        Console.WriteLine("Enter your name: ")
        name = Console.ReadLine()
        Console.WriteLine("Hello {0}", name)

    End Sub

End Module

The second program will read a value from a console
and print it.

Dim name As String

The Dim keyword is used to declare a variable. The variable is
called 'name'. Unlike constants, which store only one value during the life of
the program, variables may store various different values. The As
keyword defines the data type of the variable. Our variable
will hold string values.

name = Console.ReadLine()

We read a line from the terminal. When we hit the Enter, the string is assigned
to the name variable.

Console.WriteLine("Hello {0}", name)

We build a message and print it to the console. The {0} characters 
are replaced with the contents of the name variable.

$ dotnet run
Enter your name:
Jan
Hello Jan

## Command line arguments

Visual Basic programs can receive command line arguments. There are several ways
to retrieve arguments from the command line.

Program.vb
  

Option Strict On

Module Example

    Dim cline As String

    Sub Main()

        cline = Command()
        Console.WriteLine(cline)

    End Sub

End Module

In the above program, we get the command line arguments and print them to the
terminal.

cline = Command()

The Command function is used to get the arguments.

Console.WriteLine(cline)

We print the command line arguments to the terminal.

$ dotnet run 1 2 3 4 5 
1 2 3 4 5

Program.vb
  

```
Option Strict On

Module Example

    Dim size As Integer

    Sub Main(ByVal cmdArgs() As String)

        size = cmdArgs.Length

        If size &gt; 0 Then
            For i As Integer = 0 To size - 1
                Console.WriteLine(cmdArgs(i))
            Next
        End If

    End Sub

End Module

```

Command line arguments can be passed to the
Main procedure.

Sub Main(ByVal cmdArgs() As String)

This Main procedure receives a string array of
command line arguments.

size = cmdArgs.Length

We determine the size of the array.

If size &gt; 0 Then
    For i As Byte = 0 To size - 1
        Console.WriteLine(cmdArgs(i))
    Next
End If

We go through the array and print all arguments to the console.
Note that in this case, the name of the program is not included
among the arguments.

$ dotnet run 2 3 5
2
3
5

We provide three numbers as command line arguments and these are
printed to the console.

## Variables and Constants

A *variable* is a place to store data. A variable has a name and a data
type. A data type determines, what values can be assigned to the variable. Over
the time of the program, variables can obtain various values of the same data
type. Variables are always initialized to the default value of their type before
any reference to the variable can be made. 

Variables are declared with the Dim keyword. Unlike variables,
*constants* retain their values. Once initialized, they cannot be
modified. Constants are created with the Const keyword.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim city As String = "New York"

        Dim name As String = "Paul", age As Integer = 35, 
            nationality As String = "American"

        Console.WriteLine(city)
        Console.WriteLine(name)
        Console.WriteLine(age)
        Console.WriteLine(nationality)

        city = "London"
        Console.WriteLine(city)

    End Sub

End Module

In the above example, we work with four variables.

Dim city As String = "New York"

We declare a city variable of the String type and initialize it to the "New
York" value.

Dim name As String = "Paul", age As Integer = 35, 
    nationality As String = "American"

We can declare and initialize more variables with one Dim keyword;
they are separated with a comma character.

Console.WriteLine(city)
Console.WriteLine(name)
Console.WriteLine(age)
Console.WriteLine(nationality)

We print the values of the variables to the terminal.

city = "London"

We assign a new value to the city variable.

As we already said above, constants cannot change their initial values.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Const WIDTH As Integer = 100
        Const HEIGHT As Integer = 150
        Dim var As Integer = 40

        var = 50

        Rem WIDTH = 110

    End Sub

End Module

In this example, we declare two constants and one variable.

Const WIDTH As Integer = 100
Const HEIGHT As Integer = 150

We use the Const keyword to inform the compiler that we declare a
constant. It is a convention to write constants in upper case letters.

Dim var As Integer = 40

var = 50

We declare and initialize a variable. Later, we assign a new value to the
variable.

Rem WIDTH = 110

This is not possible with a constant. If we uncomment this line, we get a
compilation error.

## Variable interpolation

*Variable interpolation* is replacing variables with their values inside
string literals. Another names for variable interpolation are: variable
substitution and variable expansion.

Program.vb
  

Option Strict On

Module Example

    Dim age As Byte = 34
    Dim name As String = "William"
    Dim output As String

    Sub Main()

        output = $"{name} is {age} years old."
        Console.WriteLine(output)

    End Sub

End Module

In Visual Basic, strings are immutable. We cannot modify an existing string.
Variable interpolation happens during string creation.

Dim age As Byte = 34
Dim name As String = "William"
Dim output As String

Here we declare three variables.

output = $"{name} is {age} years old."

Interpolated strings start with the $ character. Variables inside 
curly braces are replaced with their content.

$ dotnet run
William is 34 years old.

This chapter covered some basics of the Visual Basic language.

[Contents](..)
[Previous](../lexis/)
[Next](../datatypes/)