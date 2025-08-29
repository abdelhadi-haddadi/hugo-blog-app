+++
title = "Visual Basic flow control"
date = 2025-08-29T20:03:19.443+01:00
draft = false
description = "This part of the Visual Basic tutorial covers flow control."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../operators/)
[Next](../arrays/)

# Visual Basic flow control

last modified October 18, 2023

In this part of the Visual Basic tutorial, we talk about the flow control. We
will define several keywords that enable us to control the flow of the Visual
Basic program.

In Visual Basic language there are several keywords that are used to alter the
flow of the program. When the program is run, the statements are executed from
the top of the source file to the bottom. One by one. This flow can be altered
by specific keywords. Statements can be executed multiple times. Some statements
are called conditional statements. They are executed only if a specific
condition is met.

## The If statement

The If statement has the following general form:

If (expression)
    statement
End If

The If keyword is used to check if an expression is true. If it is
true, a statement is then executed. The statement can be a single statement or a
compound statement. A compound statement consists of multiple statements
enclosed by the If/End If block. The parentheses are optional.

Program.vb
  

Option Strict On

Module Example

    Dim num As Byte = 31

    Sub Main()

        If num &gt; 0
            Console.WriteLine("num variable is positive")
        End If

    End Sub

End Module

We have a num variable. It is assigned 31. The If
keyword checks for a boolean expression. The expression is put between
square brackets. The 31 &gt; 0 is true, so the statement inside the
block is executed.

$ dotnet run
num variable is positive

The condition is met and the message is written to the console.

Program.vb
  

Option Strict On

Module Example

    Dim num As Short = 31

    Sub Main()

        If num &gt; 0 Then
            Console.WriteLine("num variable is positive")
            Console.WriteLine($"num variable equals {num}")
        End If

    End Sub

End Module

More statements can be executed inside the block, created by the
If, End If keywords.

If num &gt; 0 Then

Optionally, the If keyword can be terminated with
Then.

We can use the Else keyword to create a simple branch. If the
expression inside the square brackets following the
If keyword evaluates to false, the statement following the
Else keyword is automatically executed.

Program.vb
  

Option Strict On

Module Example

    Dim sex As String

    Sub Main()

        sex = "female"

        If sex = "male"
          Console.WriteLine("It is a boy")
        Else
          Console.WriteLine("It is a girl")
        End If

    End Sub

End Module

We have a sex variable. It has "female" string. The boolean expression evaluates
to false and we get "It is a girl" in the console.

$ dotnet run
It is a girl

We can create multiple branches using the Else If keyword. The
Else If keyword tests for another condition if and only if the
previous condition was not met. Note that we can use multiple
Else If keywords in our tests.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer = 0

    Sub Main()

        If a &lt; 0
          Console.WriteLine("a is negative")
        Else If a = 0
          Console.WriteLine("a equals to zero")
        Else
          Console.WriteLine("a is a positive number")
        End If

    End Sub

End Module

We have a numerical variable and we test it if it is a negative number or
positive or if it equals to zero. The first expression evaluates to false. The
second condition is met. The program prints 'a equals to zero' to the console.
The rest of the branch is skipped.

## Select statement

The Select statement is a selection control flow statement. It
allows the value of a variable or expression to control the flow of program
execution via a multi way branch. It creates multiple branches in a simpler way
than using the combination of If,
Else If statements.

We have a variable or an expression. The Select keyword is used to
test a value from the variable or the expression against a list of values. The
list of values is presented with the Case keyword. If the values
match, the statement following the Case is executed. There is an
optional Case Else statement. It is executed if no other match is
found.

Program.vb
  

Option Strict On

Module Example

    Dim domain As String

    Sub Main()

        domain = Console.ReadLine()

        Select domain
            Case "us"
                Console.WriteLine("United States")
            Case "de"
                Console.WriteLine("Germany")
            Case "sk"
                Console.WriteLine("Slovakia")
            Case "hu"
                Console.WriteLine("Hungary")
            Case Else
                Console.WriteLine("Unknown")
        End Select

    End Sub

End Module

In our program, we have a *domain* variable. We read a value for the
variable from the command line. We use the Case statement to test
for the value of the variable. There are several options. If the value equals
for example to "us" the "United States" string is printed to the console.

$ dotnet run
hu
Hungary

We have entered "hu" string to the console and the program responded with
"Hungary".

The Select keyword enables to validate a range of numerical cases.

Program.vb
  

Option Strict On

Module Example

    Dim age As Byte

    Sub Main()

        Try
            age = Console.ReadLine()
        Catch
            Console.WriteLine("Invalid value")
            End
        End Try

        Select age
            Case 0 To 21
                Console.WriteLine("Junior")
            Case 22 To 60
                Console.WriteLine("Adult")
            Case Else
                Console.WriteLine("Senior")
        End Select

    End Sub

End Module

The preceding program uses range of numerical values to identify an age group of
a person.

Try
    age = Console.ReadLine()
Catch
    Console.WriteLine("Invalid value")
    End
End Try

A value is read from the console. We can use only numerical data. The
Try, Catch, End Try keywords are used for
exception handling. If an exception is thrown, the statements following the
Catch keyword are executed. The End statement
terminates the program.

Case 0 To 21
    Console.WriteLine("Junior")

Here we specify a range of values. If the value entered by the user is in
between 0 and 21, inclusive, then the program prints "Junior" to the console.

$ dotnet run
43
Adult

## The While statement

The While statement is a control flow statement that allows code to
be executed repeatedly based on a given boolean condition.

While (expression)
    statement
End While

The While keyword executes the statements inside the block enclosed
by the While, End While keywords. The statements are
executed each time the expression is evaluated to true.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim i As Integer = 0
        Dim sum As Integer = 0

        While i &lt; 10

            i = i + 1
            sum += i

        End While

        Console.WriteLine(sum)

    End Sub

End Module

In the code example, calculate the sum of values from a range of numbers.

The While loop has three parts: initialization, testing, and
updating. Each execution of the statement is called a cycle.

Dim i As Integer = 0

We initiate the i variable. It is used as a counter.

While i &lt; 10
...
End While

The expression following the While keyword is the second phase, the
testing. The statements in the body are executed, until the expression is
evaluated to false.

i = i + 1

The last, third phase of the While loop. The updating. We increment
the counter. Note that improper handling of the While loops may
lead to endless cycles.

It is possible to run the statement at least once. Even if the condition is not
met. For this, we can use the Do, Loop While keywords.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim count As Integer = 0

        Do
            Console.WriteLine(count)
        Loop While (count &lt;&gt; 0)

    End Sub

End Module

First the iteration is executed and then the truth expression is evaluated.

## The For Next statements

When the number of cycles is know before the loop is initiated, we can use the
For Next statements. In this construct we declare a counter
variable, which is automatically increased or decreased in value during each
repetition of the loop.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        For i As Integer = 0 To 9
            Console.WriteLine(i)
        Next

    End Sub

End Module

In this example, we print numbers 0..9 to the console.

For i As Integer = 0 To 9
    Console.WriteLine(i)
Next

We initiate the counter i to zero. The Next
statement increases the counter by one until the counter equals to 9.

Visual Basic has an optional Step keyword. It controls how the
counter variable is going to be increased or decreased.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        For i As Integer = 9 To 0 Step -1
            Console.WriteLine(i)
        Next

    End Sub

End Module

In the above example, we print numbers 0..9 in the reverse order.

For i As Integer = 9 To 0 Step -1
    Console.WriteLine(i)
Next

The step may be a negative number too. We initiate the counter to 9. Each
iteration the counter is decreased by the step value.

## The For Each statement

The For Each construct simplifies traversing over collections of
data. It has no explicit counter. The For Each statement goes
through the array or collection one by one and the current value is copied to a
variable defined in the construct.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim planets() As String = { "Mercury", "Venus",
            "Earth", "Mars", "Jupiter", "Saturn",
            "Uranus", "Neptune" }

        For Each planet As String In planets
            Console.WriteLine(planet)
        Next

    End Sub

End Module

In this example, we use the For Each statement to go through an
array of planets.

For Each planet As String In planets
    Console.WriteLine(planet)
Next

The usage of the For Each statement is straightforward. The
planets is the array that we iterate through. The
planet is a temporary variable that has the current value
from the array. The For Each statement goes through all the planets
and prints them to the console.

$ dotnet run
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

## The Exit, Continue statements

The Exit statement can be used to terminate block defined by
While, For or Select statements.

Program.vb
  

Option Strict On

Module Example

    Dim val As Integer

    Sub Main

        Randomize

        While True

            val = CType((30 * Rnd), Integer) + 1
            Console.Write(val.ToString &amp; " ")

            If val = 22 Then
                Exit While
            End If

        End While

        Console.Write(vbCrLf)

    End Sub

End Module

We define an endless While loop. There is only one way to jump out
of a such loop. We must use the Exit While statement. We choose a
random value from 1 to 30. We print the value. If the value equals to 22, we
finish the endless while loop.

$ dotnet run
30 12 13 20 19 4 2 9 6 9 22

The Continue statement is used to skip a part of the loop and
continue with the next iteration of the loop. It can be used in combination with
Do, For and While statements.

In the following example, we print a list of numbers that cannot be divided by 2
without a remainder.

Program.vb
  

Option Strict On

Module Example

    Dim num As Integer = 0

    Sub Main()

        While num &lt; 1000

            num = num + 1

            If (num Mod 2) = 0
                Continue While
            End If

            Console.Write($"{num} ")

        End While

        Console.Write(vbCrLf)

    End Sub

End Module

We iterate through numbers 1..999 with the While loop.

If (num Mod 2) = 0
    Continue While
End If

If the expression num Mod 2 returns 0, the number in question can
be divided by 2. The Continue statement is executed and the rest of
the cycle is skipped. In our case, the last statement of the loop is skipped and
the number is not printed to the console. The next iteration is started.

In this part of the Visual Basic tutorial, we were talking about control flow
structures.

[Contents](..)
[Previous](../operators/)
[Next](../arrays/)