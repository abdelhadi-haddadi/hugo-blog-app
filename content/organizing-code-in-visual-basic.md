+++
title = "Organizing code in Visual Basic"
date = 2025-08-29T20:03:21.653+01:00
draft = false
description = "This part of the Visual Basic tutorial shows how to organize code using modules, procedures and namespaces."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../procedures/)
[Next](../oopi/)

# Organizing code in Visual Basic

last modified October 18, 2023

In this part of the Visual Basic tutorial we show how to organize code. We cover
modules, procedures and namespaces, and the scope.

Visual Basic statements are organized into blocks, modules, classes and
namespaces. This helps to make the code more maintainable and robust. Correct
code organization prevents from making errors in the code.

The basic building blocks of a Visual Basic program are:

- Assembly

- Namespace

- Modules

- Classes

- Procedures and functions

- Blocks

- Statements

An *assembly* is a DLL or exe file. An assembly is a compiled code
library for use in deployment, versioning and security. A *namespace* is
an abstract container providing context for the items. A *module* is a
reference type available throughout its namespace. Classes are basic building
blocks of an OOP program. A *procedure* is a unit of a program that is
created to do a specific task. A *block* is the lowest level organisation
of Visual Basic statements provided by some keywords like If or
While. A *statement* is an atom in a Visual Basic program, a
smallest unit of code.

Closely related to this topic is the scope and duration of a variable. A
*scope* is the visibility of the declared variable.

ScopeDescription

Block scopeAvailable only within the code block in which it is declared
Procedure scopeAvailable within the procedure in which it is declared
Module scopeAvailable to all code within the module, class, or structure in which it is declared
Namespace scopeAvailable to all code in the namespace in which it is declared

A *lifetime* of a variable is a period of time during which a variable
holds a value. Local variables exists as long as the procedure is executing.
After that, they are not available anymore. However, if we declare a variable to
be Static, the variable continues to exist after the procedure terminates.
Module, Shared and instance variables exist for the lifetime of the application.

## The basic example

First, we cover some basics.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("Simple example")

    End Sub

End Module

In this example, we have a Module called Example. Inside the
example, we have a Main subroutine. The statement that prints some
message to the console is placed within the Main procedure. Event
the most simple Visual Basic programs must be properly organized.

Program.vb
  

Option Strict On

Public Class Example

    Public Shared Sub Main()

        Console.WriteLine("Simple example")

    End Sub

End Class

The exact example, now without the module. We can put the code inside a class
too. The Main procedure must be declared Shared,
because the class is not instantiated. The compiler calls the Main
method without creating an instance of the class. That is why it must be
declared Shared. Java and C# work the same.

## Namespaces

Namespaces are used to organize code at the highest logical level. They classify
and present programming elements that are exposed to other programs and
applications. Within a namespace, we can declare another namespace, a class, an
interface, a structure, an enumeration, or a delegate.

In the following code, we have two files that share the same namespace.

Program.vb
  

Option Strict On

NameSpace ZetCode

    Module Example1

        Public Dim x As Integer = 0

        Sub Init()

            x += 100
            Console.WriteLine(x)

        End Sub

    End Module

End NameSpace

We have a ZetCode namespace. In the namespace, we have a module
Example1.

NameSpace ZetCode

We declare a namespace called ZetCode.

Public Dim x As Integer = 0

In the module, we declare and initialise a x variable.

Sub Init()
    x += 100
    Console.WriteLine(x)
End Sub

We have an Init method, in which we work with the
x variable.

Program.vb
  

Option Strict On

NameSpace ZetCode

    Module Example

        Sub Main()

            Init()
            x += 100
            Console.WriteLine(x)

        End Sub

    End Module

End NameSpace

In the second file, we work with the Init method from the previous
file.

NameSpace ZetCode

We work in the same namespace.

Init()
x += 100
Console.WriteLine(x)

We call the Init procedure and work with the x
variable. Both the procedure and the x variable are defined in a
different file and different module. But they are defined in the same namespace,
so we can use them.

$ dotnet run
100
200

The following code example has two distinct namespaces. We use the
Imports keyword to import elements from a different namespace.

Program.vb
  

Option Strict On

NameSpace MyMath

    Public Class Basic

        Public Shared PI As Double = 3.141592653589

        Public Shared Function GetPi() As Double

            Return Me.PI

        End Function

    End Class

End NameSpace

We have a skeleton of a Math class in a MyMath
namespace. In the Basic class, we define a PI constant and a
GetPi method.

Program.vb
  

Option Strict On

Imports MyMath

NameSpace ZetCode

    Public Class Example

        Public Shared Sub Main()

            Console.WriteLine(Basic.PI)
            Console.WriteLine(Basic.GetPi())

        End Sub

    End Class

End NameSpace

In this file, we use the elements from the MyMath
namespace.

Imports MyMath

We import the elements from the MyMath namespace into our
namespace.

Console.WriteLine(Basic.PI)
Console.WriteLine(Basic.GetPi())

Now we can use those elements. In our case the PI variable and
the GetPi method.

Program.vb
  

Option Strict On

' Imports MyMath

NameSpace ZetCode

    Public Class Example

        Public Shared Sub Main()

            Console.WriteLine(MyMath.Basic.PI)
            Console.WriteLine(MyMath.Basic.GetPi())

        End Sub

    End Class

End NameSpace

Note that we do not need the Imports keyword. In the example, it is
commented out. We can use elements from other namespaces by using fully
qualified names of the elements.

## Modules

A module is used to organize code and wrap up variables, properties, events, and
procedures of similar use. Unlike a class, a module is not a type. A module can
be created in a namespace or in a file. A module cannot be created inside
another module, class, structure, interface or block. All members in a module
are implicitly Shared. Modules have a Friend access. This means that a module is
accessible everywhere in an assembly.

Program.vb
  

Option Strict On

Module First

    Public x As Byte = 11

    Public Sub FirstModule()

        Console.WriteLine("First module")

    End Sub

End Module

Module Second

    Public y As Byte = 22

    Public Sub SecondModule()

        Console.WriteLine("Second module")

    End Sub

End Module

Module Example

    Sub Main()

        Console.WriteLine(x)
        Console.WriteLine(Second.y)
        FirstModule()
        SecondModule()

    End Sub

End Module

We have three modules defined. The first two modules have variables and
procedures. These will be used in the third module.

Module First

    Public x As Byte = 11
...
End Module

We can use access specifiers inside modules too. This way we can control the
accessibility of the elements in the modules.

Console.WriteLine(x)
Console.WriteLine(Second.y)

We print the x and y variables. They are
Public and are accessible from a different module. We may use the
module name to fully specify the variable name.

A *scope* is a visibility of a variable. A variable with a module scope
is available within the module, where it was declared.

Program.vb
  

Option Strict On

Module Example

    Private x As Integer = 0

    Sub Main()

        proc1()
        proc2()
        proc3()

    End Sub

    Sub proc1()

        Console.WriteLine(x)

    End Sub

    Sub proc2()

        x += 100
        Console.WriteLine(x)

    End Sub

    Sub proc3()

        x += 100
        Console.WriteLine(x)

    End Sub

End Module

We have x variable inside the module. The variable is available in
all three procedures.

Private x As Integer = 0

This is a variable with a module scope. It is declared outside any procedure.

Sub proc2()
    x += 100
    Console.WriteLine(x)
End Sub

Inside the proc2 procedure, we increase the x variable
and print its contents to the console. We refer to the x variable
defined in the module.

$ dotnet run
0
100
200

## Procedures

Procedures provide modularity to the code project. They should do only a
specific task.

Program.vb
  

Option Strict On

Module Example

    Dim x As Integer = 0

    Sub Main()

        Console.WriteLine(x)

        proc1()
        proc2()
        proc3()

    End Sub

    Sub proc1()

        Dim x As Integer
        x += 100

        Console.WriteLine(x)

    End Sub

    Sub proc2()

        Dim x As Integer
        x += 100
        Console.WriteLine(x)

    End Sub

    Sub proc3()

        Dim x As Integer
        x += 100
        Console.WriteLine(x)

    End Sub

End Module

In the preceding code example, we have three procedures beside the main
procedure. The three procedures create a local x 
variable and print it to the terminal. The main procedure refers to the
module x variable.

Sub proc1()
    Dim x As Integer
    x += 100
    Console.WriteLine(x)
End Sub

The proc1 procedure creates a local x variable. This
variable *shadows* the one, declared at a module scope.

$ dotnet run
0
100
100
100

The main procedure prints 0. The other procedures print 100 to the terminal.
They create their local x variables, initiate them to 0, increase
by 100.

## Block scope

It is important to understand that variables declared within a block of code
like If/End If or While/End While
have a limited block scope and lifetime. The next example illustrates this.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        If True

            Console.WriteLine("Inside If block")

            Dim x As Integer = 0
            Console.WriteLine(x)

            x += 500
            Console.WriteLine(x)

        End If

        Console.WriteLine("Outside If block")

        Rem Will not compile
        Rem Console.WriteLine(x)

    End Sub

End Module

We have an x variable declared Inside the
If/End If block.

Rem Will not compile
Rem Console.WriteLine(x)

The variable is not available outside the block. If we uncomment the second
line, the example will not compile.

This part of the Visual Basic tutorial was dedicated to organizing code.

[Contents](..)
[Previous](../procedures/)
[Next](../oopi/)