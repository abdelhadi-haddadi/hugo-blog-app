+++
title = "Procedures & functions in Visual Basic"
date = 2025-08-29T20:03:22.801+01:00
draft = false
description = "This part of the Visual Basic tutorial covers procedures & functions in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../arrays/)
[Next](../organizingcode/)

# Procedures &amp; functions in Visual Basic

last modified October 18, 2023

In this part of the tutorial, you will learn Visual Basic procedures &amp;
functions.

We use procedures and functions to create modular programs. Visual Basic
statements are grouped in a block enclosed by Sub,
Function and matching End
statements. The difference between the two is that functions return
values, procedures do not.

A procedure and function is a piece of code in a larger program. They
perform a specific task. The advantages of using procedures and functions are:

- Reducing duplication of code

- Decomposing complex problems into simpler pieces

- Improving clarity of the code

- Reuse of code

- Information hiding

## Procedures

A procedure is a block of Visual Basic statements inside Sub,
End Sub statements. Procedures do not return values.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        SimpleProcedure()

    End Sub

    Sub SimpleProcedure()
        Console.WriteLine("Simple procedure")
    End Sub

End Module

This example shows basic usage of procedures. In our program, we have two
procedures. The Main procedure and the user defined
SimpleProcedure. As we already know, the Main
procedure is the entry point of a Visual Basic program.

SimpleProcedure()

Each procedure has a name. Inside the Main procedure,
we *call* our user defined SimpleProcedure procedure.

Sub SimpleProcedure()

    Console.WriteLine("Simple procedure")
    
End Sub

Procedures are defined outside the Main procedure. Procedure name
follows the Sub statement. When we call a procedure inside the
Visual Basic program, the control is given to that procedure. Statements inside
the block of the procedure are executed.

Procedures can take optional parameters.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim x As Integer = 55
        Dim y As Integer = 32

        Addition(x, y)

    End Sub

    Sub Addition(ByVal k As Integer, ByVal l As Integer)

        Console.WriteLine(k+l)

    End Sub

End Module

In the above example, we pass some values to the Addition
procedure.

Addition(x, y)

Here we call the Addition procedure and pass two parameters to it.
These parameters are two Integer values.

Sub Addition(ByVal k As Integer, ByVal l As Integer)

    Console.WriteLine(k+l)

End Sub

We define a *procedure signature*. A procedure signature is a way of
describing the parameters and parameter types with which a legal call to the
function can be made. It contains the name of the procedure, its parameters and
their type, and in case of functions also the return value. The
ByVal keyword specifies how we pass the values to the procedure. In
our case, the procedure obtains two numerical values, 55 and 32. These numbers
are added and the result is printed to the console.

## Functions

A function is a block of Visual Basic statements inside Function,
End Function statements. Functions return values.

There are two basic types of functions. Built-in functions and user defined
ones. The built-in functions are part of the Visual Basic language. There are
various mathematical, string or conversion functions.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(Math.Abs(-23))
        Console.WriteLine(Math.Round(34.56))
        Console.WriteLine($"ZetCode has {Len("Zetcode")} characters")

    End Sub

End Module

In the preceding example, we use two math functions and one string function.
Built-in functions help programmers do some common tasks.

In the following example, we have a user defined
function.

Program.vb
  

Option Strict On

Module Example

    Dim x As Integer = 55
    Dim y As Integer = 32

    Dim result As Integer

    Sub Main()

        result = Addition(x, y)
        Console.WriteLine(Addition(x, y))

    End Sub

    Function Addition(ByVal k As Integer, ByVal l As Integer) As Integer

        Return k+l

    End Function

End Module

Two values are passed to the function. We add these two values and return the
result to the Main function.

result = Addition(x, y)

Addition function is called. The function returns a result and this
result is assigned to the result variable.

Function Addition(ByVal k As Integer, ByVal l As Integer) As Integer

    Return k+l

End Function

This is the Addition function signature and its body. It also
includes a return data type, for the returned value. In our
case is is an Integer. Values are returned
to the caller with the Return keyword.

## Passing parameters by value, by reference

Visual Basic supports two ways of passing parameters to functions. By value and
by reference. For this, we have two keywords. ByVal and
ByRef. When we pass arguments by value, the function
works only with the copies of the values. This may lead to performance overheads,
when we work with large amounts of data.

When we pass values by reference, the function receives a reference to the
actual values. The original values are affected, when modified. This way of
passing values is more time and space efficient. On the other hand, it is more
error prone.

Which way of passing arguments should we use? It depends on the situation. Say
we have a set of data, salaries of employees. If we want to compute some
statistics of the data, we do not need to modify them. We pass by values. If we
work with large amounts of data and the speed of computation is critical, we
pass by reference. If we want to modify the data, e.g. do some reductions or
raises to the salaries, we might pass by reference.

The following two examples cover both concepts.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer = 4
    Dim b As Integer = 7

    Sub Main()

        Console.WriteLine("Outside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

        Swap(a, b)

        Console.WriteLine("Outside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

    End Sub

    Sub Swap(ByRef a As Integer, ByRef b As Integer)

        Dim temp As Integer
        temp = a
        a = b
        b = temp

        Console.WriteLine("Inside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

    End Sub

End Module

The Swap procedure swaps the numbers between the
a and b variables. The original variables
are not affected.

Dim a As Integer = 4
Dim b As Integer = 7

At the beginning, these two variables are initiated.

Swap(a, b)

We call the Swap procedure. The procedure takes a
and b variables as parameters.

temp = a
a = b
b = temp

Inside the Swap procedure, we change the values. Note that the
a and b variables are defined locally. They are valid
only inside the Swap procedure.

$ dotnet run
Outside Swap procedure
a is 4
b is 7
Inside Swap procedure
a is 7
b is 4
Outside Swap procedure
a is 4
b is 7

The next code example passes values to the function by reference. The original
variables are changed inside the Swap procedure.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer = 4
    Dim b As Integer = 7

    Sub Main()

        Console.WriteLine("Outside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

        Swap(a, b)

        Console.WriteLine("Outside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

    End Sub

    Sub Swap(ByRef a As Integer, ByRef b As Integer)

        Dim temp As Integer
        temp = a
        a = b
        b = temp

        Console.WriteLine("Inside Swap procedure")
        Console.WriteLine($"a is {a}")
        Console.WriteLine($"b is {b}")

    End Sub

End Module

In this example, calling the Swap procedure will change the
original values.

Sub Swap(ByRef a As Integer, ByRef b As Integer)
 ...
End Sub

Now we use the ByRef keyword to indicate that we pass parameters by
reference.

$ dotnet run
Outside Swap procedure
a is 4
b is 7
Inside Swap procedure
a is 7
b is 4
Outside Swap procedure
a is 7
b is 4

Here we see that the Swap procedure really changed the values of
the variables.

## Recursion

Recursion, in mathematics and computer science, is a method of defining
functions in which the function being defined is applied within its own
definition. In other words, a recursive function calls itself to do its job.
Recursion is a widely used approach to solve many programming tasks.

A typical example is calculation of the factorial.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(Factorial(4))
        Console.WriteLine(Factorial(10))

    End Sub

    Function Factorial(ByVal n As Integer) As Integer

        If n = 0 Then
            Return 1
        Else
            Return n * Factorial(n-1)
        End If

    End Function

End Module

In this code example, we calculate the factorial of two numbers.

Return n * Factorial(n-1)

Inside the body of the factorial function, we call the factorial function with a
modified argument. The function calls itself.

$ dotnet run
24
3628800

## Module scope, procedure scope

A *scope* is the range in which a variable can be referenced. A variable
which is declared inside the procedure has a procedure scope. It is valid only
in this particular procedure. A variable declared inside a module has a module
scope. It is valid everywhere in the module.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer = 2

    Sub Main()

        Dim b As Integer = 3

        Console.WriteLine(a)
        SimpleProcedure()

    End Sub

    Sub SimpleProcedure()
        Console.WriteLine(a)
        ' Console.WriteLine(b)
    End Sub

End Module

In the preceding example, we declare two variables. Variable a has the module
scope, variable b has the procedure scope.

Dim a As Integer = 2

Variable a is declared inside the Example module, outside the two procedures. It
is valid in both procedures.

Sub Main()
    Dim b As Integer = 3
...
End Sub

The variable b is declared in the Main procedure. It is valid only
there. It is not valid in the second procedure.

Sub SimpleProcedure()
    Console.WriteLine(a)
    ' Console.WriteLine(b)
End Sub

The statement printing the b variable is commented. If we
uncommented the line, the example would not compile.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer = 2

    Sub Main()
        Dim a As Integer = 3

        Console.WriteLine(a)

    End Sub

End Module

In the preceding example, we have declared a variable with the same name in two
different scopes. They do not collide. The variable declared inside the
Main procedure overrides the one, declared in the module scope.

$ dotnet run
3

## Static variables

A *static* variable is a variable that has been allocated statically,
whose lifetime extends across the entire run of the program. The default, local
variables do not retain their value within consecutive calls of the function.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        NonStatic()
        NonStatic()
        NonStatic()
        NonStatic()
        Console.WriteLine(NonStatic)

    End Sub

    Function NonStatic() As Integer

        Dim x As Integer = 0
        x += 1
        Return x

    End Function

End Module

In the above example, we have a normal, non-static variable. We increment the
variable each time the function is called. We call the function 5 times.
However, non-static variables are initiated for each call of the function.

$ dotnet run
1

After 5 function calls the x variable equals to 1.

The static variables are initiated only once, when the function is first called.
They retain their value afterwards.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        StaticFunction()
        StaticFunction()
        StaticFunction()
        StaticFunction()
        Console.WriteLine(StaticFunction)

    End Sub

    Function StaticFunction() As Integer

        Dim Static x As Integer = 0
        x += 1
        Return x

    End Function

End Module

After 5 consecutive calls, the x is equal to 5.

Dim Static x As Integer = 0

Static variables are created with the Static
keyword.

$ dotnet run
5

In this part of the Visual Basic tutorial, we covered procedures and functions.

[Contents](..)
[Previous](../arrays/)
[Next](../organizingcode/)