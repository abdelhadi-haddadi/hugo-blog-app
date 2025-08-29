+++
title = "Visual Basic operators"
date = 2025-08-29T20:03:21.679+01:00
draft = false
description = "This part of the Visual Basic tutorial covers operators in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../strings/)
[Next](../flowcontrol/)

# Visual Basic operators

last modified October 18, 2023

In this part of the Visual Basic tutorial, we talk about operators.

An *operator* is a special symbol which indicates a certain process is
carried out. Operators in programming languages are taken from mathematics.
Programmers work with data. The operators are used to process data.

We have several types of operators:

- Arithmetic operators

- Boolean operators

- Relational operators

- Bitwise operators

An operator may have one or two operands. An *operand* is one of the
inputs (arguments) of an operator. Those operators that work with only one
operand are called *unary operators*. Those who work with two operands
are called *binary operators*.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(2)
        Console.WriteLine(-2)
        Console.WriteLine(2+2)
        Console.WriteLine(2-2)

    End Sub

End Module

The + and - signs can be addition and subtraction operators as well as unary
sign operators. It depends on the situation.

Program.vb
  

Option Strict On

Module Example

    Dim a As Byte

    Sub Main()

        a = 1
        Console.WriteLine(-a)    ' Prints -1
        Console.WriteLine(-(-a)) ' Prints 1

    End Sub

End Module

The plus sign can be used to indicate that we have a positive number. But it is
mostly not used. The minus sign changes the sign of a value.

Program.vb
  

Option Strict On

Module Example

    Dim a As Byte
    Dim b As Byte

    Sub Main()

        a = 3 * 3
        b = 2 + 2

        Console.WriteLine(a) ' Prints 9
        Console.WriteLine(b) ' Print 4

    End Sub

End Module

Multiplication and addition operators are examples of binary operators.
They are used with two operands.

## The assignment operator

The assignment operator = assigns a value to a variable. A
variable is a placeholder for a value. In mathematics, the
= operator has a different meaning. In an equation, the
= operator is an equality operator. The left side of the equation
is equal to the right one.

x = 1
Console.WriteLine(x) ' Prints 1

Here we assign a number to the x variable.

x = x + 1
Console.WriteLine(x)

The previous expression does not make sense in mathematics. But it is legal in
programming. The expression adds 1 to the x variable. The right
side is equal to 2 and 2 is assigned to x.

3 = x

This code example results in syntax error. We cannot assign a value to a
literal.

## Arithmetic operators

The following is a table of arithmetic operators in Visual Basic.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
\Integer Division
ModModulo
^Exponentiation

The following example shows arithmetic operations.

Program.vb
  

Option Strict On

Module Example

    Dim a As Byte
    Dim b As Byte
    Dim c As Byte

    Dim add As Byte
    Dim sb As Byte
    Dim mult As Byte
    Dim div As Byte

    Sub Main()

        a = 10
        b = 11
        c = 12

        add = a + b + c
        sb = c - a
        mult = a * b
        div = CType(c / 3, Byte)

        Console.WriteLine(add)
        Console.WriteLine(sb)
        Console.WriteLine(mult)
        Console.WriteLine(div)

    End Sub

End Module

In the preceding example, we use addition, subtraction, multiplication and
division operations. This is all familiar from the mathematics.

$ dotnet run
33
2
110
4

Next we show the distinction between normal and integer division.

Program.vb
  

Option Strict On

Module Example

    Dim a As Single = 5
    Dim b As Single = 2
    Dim c As Single

    Sub Main()

        c = 5 / 2
        Console.WriteLine(c)

        c = 5 \ 2
        Console.WriteLine(c)

    End Sub

End Module

In the preceding example, we divide two numbers using normal and integer
division operator. Visual Basic has two distinct operators for division.

Dim a As Single = 5

We use floating point data types.

c = 5 / 2
Console.WriteLine(c)

This is floating-point division.

c = 5 \ 2
Console.WriteLine(c)

This is integer division. The result of this operation is always and integer.

$ dotnet run
2.5
2

The last two operators that we mention are modulo operator and exponentiation
operator.

Console.WriteLine(9 Mod 4) ' Prints 1

The Mod operator is called the modulo operator. It finds the
remainder of division of one number by another. 9 Mod 4, 9 modulo 4
is 1, because 4 goes into 9 twice with a remainder of 1. Modulo operator can be
handy for example when we want to check for prime numbers.

Finally, we mention *exponentiation* operator.

Console.WriteLine(9 ^ 2) ' Prints 81

9 ^ 2 = 9 * 9 = 81

## Concatenating strings

In Visual Basic we have two operators for string concatenation. The plus
+ operator and the &amp; ampersand operator.
We can also use the String.Concat method.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("Return " &amp; "of " &amp; "the king")
        Console.WriteLine("Return " + "of " + "the king")
        Console.WriteLine(String.Concat("Return ", "of ", "the king"))

    End Sub

End Module

We join three strings.

$ dotnet run
Return of the king
Return of the king
Return of the king

## Boolean operators

In Visual Basic, we have the following logical operators. Boolean operators are
also called logical.

SymbolName

Andlogical conjunction
AndAlsoshort circuit And
Orlogical inclusion
OrElseshort circuit Or
Xorlogical inclusion
Notnegation

Boolean operators are used to work with truth values.

Program.vb
  

Option Strict On

Module Example

    Dim x As Byte = 3
    Dim y As Byte = 8

    Sub Main()

        Console.WriteLine(x = y)
        Console.WriteLine(y &gt; x)

        If (y &gt; x)
            Console.WriteLine("y is greater than x")
        End If

    End Sub

End Module

Many expressions result in a boolean value. Boolean values are used in
conditional statements.

Console.WriteLine(x = y)
Console.WriteLine(y &gt; x)

Relational operators always result in a Boolean value. These two lines print
False and True.

If (y &gt; x)
    Console.WriteLine("y is greater than x")
End If

The body of the If statement is executed only
if the condition inside the parentheses is met. The
x &gt; y returns True, so the message "y is greater than x"
is printed to the terminal.

Program.vb
  

Option Strict On

Module Example

    Dim a As Boolean
    Dim b As Boolean
    Dim c As Boolean
    Dim d As Boolean

    Sub Main()

        a = (True And True)
        b = (True And False)
        c = (False And True)
        d = (False And False)

        Console.WriteLine(a)
        Console.WriteLine(b)
        Console.WriteLine(c)
        Console.WriteLine(d)

    End Sub

End Module

Example shows the logical And operator. It evaluates to True only
if both operands are True.

$ dotnet run
True
False
False
False

The logical Xor operator evaluates to True, if exactly one of the
operands is True.

Program.vb
  

Option Strict On

Module Example

    Dim a As Boolean
    Dim b As Boolean
    Dim c As Boolean
    Dim d As Boolean

    Sub Main

        a = (True Xor True)
        b = (True Xor False)
        c = (False Xor True)
        d = (False Xor False)

        Console.WriteLine(a)
        Console.WriteLine(b)
        Console.WriteLine(c)
        Console.WriteLine(d)

    End Sub

End Module

The logical Xor evaluates to False if both operands are True or
both False.

$ dotnet run
False
True
True
False

The logical Or operator evaluates to True, if either of the
operands is True.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim a As Boolean = True Or True
        Dim b As Boolean = True Or False
        Dim c As Boolean = False Or True
        Dim d As Boolean = False Or False

        Console.WriteLine(a)
        Console.WriteLine(b)
        Console.WriteLine(c)
        Console.WriteLine(d)

    End Sub

End Module

If one of the sides of the operator is True, the outcome of the operation is
True.

$ dotnet run
True
True
True
False

The *negation* operator Not makes True False and False True.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(Not True)
        Console.WriteLine(Not False)
        Console.WriteLine(Not (4 &lt; 3))

    End Sub

End Module

The example shows the negation operator in action.

$ dotnet run
False
True
True

AndAlso, OrElse operators are short circuit evaluated.
*Short circuit evaluation* means that the second argument is only
evaluated if the first argument does not suffice to determine the value of the
expression: when the first argument of And evaluates to false, the overall value
must be false; and when the first argument of Or evaluates to true, the overall
value must be true. Short circuit evaluation is used mainly to improve
performance.

An example may clarify this a bit more.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("Short circuit")
        If (one AndAlso two)
            Console.WriteLine("Pass")
        End If

        Console.WriteLine("#############")
        If (one And two)
            Console.WriteLine("Pass")
        End If

    End Sub

Function one As Boolean
    Console.WriteLine("Inside one")
    Return False
End Function

Function two As Boolean
    Console.WriteLine("Inside two")
    Return True
End Function

End Module

We have two functions in the example. Functions, unlike subroutines, return
values. This is the main difference between them.

If (one AndAlso two)
    Console.WriteLine("Pass")
End If

The one function returns False. The short circuit AndAlso
does not evaluate the second function. It is not necessary. Once an operand is
False, the result of the logical conclusion is always False. Only "Inside one"
is printed to the console.

Console.WriteLine("#############")
If (one And two)
    Console.WriteLine("Pass")
End If

In the second case, we use the And. In this case, both functions
are called. Even though it is not necessary for the result of the expression.

$ dotnet run
Short circuit
Inside one
#############
Inside one
Inside two

## Relational Operators

Relational operators are used to compare values. These operators always result
in a boolean value.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
=equal to
&lt;&gt;not equal to
Iscompares references

Relational operators are also called comparison operators.

Program.vb
  

Console.WriteLine(3 &lt; 4) ' Prints True
Console.WriteLine(3 = 4) ' Prints False
Console.WriteLine(4 &gt;= 3) ' Prints True

As we already mentioned, the relational operators return boolean values. Note
that in Visual Basic, the comparison operator is =.

Notice that the relational operators are not limited to numbers. We can use them
for other objects as well. Although they might not always be meaningful.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("six" = "six") ' Prints True
        ' Console.WriteLine("a" &gt; 6) this would throw
                                     ' an exception
        Console.WriteLine("a" &lt; "b") ' Prints True

    End Sub

End Module

We can compare string objects too. Comparison operators in a string
context compare the sorting order of the characters.

Console.WriteLine("a" &lt; "b") ' Prints True

What exactly happens here? Computers do not know characters or strings. For
them, everything is just a number. Characters are special numbers stored in
specific tables. Like ASCII.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine("a" &lt; "b")

        Console.WriteLine("a is: {0}",  Asc("a"))
        Console.WriteLine("b is: {0}",  Asc("b"))

    End Sub

End Module

Internally, the a and b characters are numbers. So when we compare two
characters, we compare their stored numbers. The built-in Asc
function returns the ASCII value of a single character.

$ dotnet run
True
a is: 97
b is: 98

In fact, we compare two numbers, 97 with 98.

Program.vb
  

Console.WriteLine("ab" &gt; "aa") ' Prints True

Say we have a string with more characters. If the first characters are equal, we
compare the next ones. In our case, the b character at the second position has a
greater value than the a character. That is why "ab" string is greater than "aa"
string. Comparing strings in such a way does not make much sense, of course. But
it is technically possible.

Finally, we mention the Is operator. The operator checks if two
object references refer to the same object. It does not perform value
comparisons.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim o1 As Object = New Object
        Dim o2 As Object = New Object
        Dim o3 As Object

        o3 = o2

        Console.WriteLine(o1 Is o2)
        Console.WriteLine(o3 Is o2)

    End Sub

End Module

We create three objects and compare them with the Is operator.

Dim o1 As Object = New Object
Dim o2 As Object = New Object

We declare and initialise two Object instances. The Object
class is a base class for all classes in the .NET framework. We describe it
later in more detail.

Dim o3 As Object

The third variable is only declared.

o3 = o2

The o3 now refers to the o2 object. They are two
references to the same object.

Console.WriteLine(o1 Is o2)
Console.WriteLine(o3 Is o2)

In the first case, we get False. The o1 and o2 are two
different objects. In the second case, we get True. The o3
and o2 refer to the same object.

## Bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal, or hexadecimal symbols are only notations of the same
number. Bitwise operators work with bits of a binary number. Bitwise operators
are seldom used in higher level languages like Visual Basic.

SymbolMeaning

Notbitwise negation
Xorbitwise exclusive or
Andbitwise and
Orbitwise or

The *bitwise negation operator* changes each 1 to 0 and 0 to 1.

Program.vb
  

Console.WriteLine(Not 7)  ' Prints -8
Console.WriteLine(Not -8) ' Prints 7

The operator reverts all bits of a number 7. One of the bits also determines,
whether the number is negative or not. If we negate all the bits one more time,
we get number 7 again.

The *bitwise and operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 only if both corresponding bits in
the operands are 1.

      00110
  And 00011
   =  00010

The first number is a binary notation of 6, the second is 3 and the result is 2.

Program.vb
  

Console.WriteLine(6 And 3) ' Prints 2
Console.WriteLine(3 And 6) ' Prints 2

The *bitwise or operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 if either of the corresponding bits
in the operands is 1.

     00110
  Or 00011
   = 00111

The result is 00110 or decimal 7.

Program.vb
  

Console.WriteLine(6 Or 3) ' Prints 7
Console.WriteLine(3 Or 6) ' Prints 7

The *bitwise exclusive or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if one or the other (but
not both) of the corresponding bits in the operands is 1.

      00110
  Xor 00011
   =  00101

The result is 00101 or decimal 5.

Program.vb
  

Console.WriteLine(6 Xor 3) ' Prints 5

## Compound assignment operators

The compound assignment operators consist of two operators. They are shorthand
operators.

Program.vb
  

Option Strict On

Module Example

    Dim a As Integer

    Sub Main

        a = 1
        a = a + 1
        Console.WriteLine(a) ' Prints 2

        a += 1
        Console.WriteLine(a) ' Prints 3

    End Sub

End Module

The += compound operator is one of these shorthand operators.
They are less readable than the full expressions but
experienced programmers often use them.

Other compound operators are:

-=   *=   \=   /=   &amp;=  ^=

## Operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

 3 + 5 * 5

Like in mathematics, the multiplication operator has a higher precedence than
addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses. Expressions inside
parentheses are always evaluated first.

The following list shows common Visual Basic operators ordered by precedence
(highest precedence first):

  
    Operator(s)
    Description
  
  
    ^
    exponentiation
  
  
    + -
    unary identity and negation
  
  
    * /
    multiplication, float division
  
  
    \
    integer division
  
  
    Mod
    modulus
  
  
    + -
    addition, subtraction, string concatenation
  
  
    &amp;
    string concatenation
  
  
    &lt;&lt; &gt;&gt;
    arithmetic bit shift
  
  
    = &lt;&gt; &lt; &gt; &gt;= &lt;= Is IsNot Like TypeOf Is
    All comparison operators
  
  
    Not
    negation
  
  
    And AndAlso
    conjunction
  
  
    Or OrElse
    Inclusive disjunction
  
  
    Xor
    Exclusive disjunction
  

Operators on the same line in the list have the same precedence.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(3 + 5 * 5)
        Console.WriteLine((3 + 5) * 5)

        Console.WriteLine(Not True Or True)
        Console.WriteLine(Not (True Or True))

    End Sub

End Module

In this code example, we show some common expressions. The outcome of each
expression is dependent on the precedence level.

Console.WriteLine(3 + 5 * 5)

This line prints 28. The multiplication operator has a higher precedence than
addition. First the product of 5*5 is calculated. Then 3 is added.

Console.WriteLine(Not True Or True)

In this case, the negation operator has a higher precedence. First, the first
True value is negated to False, than the Or operator combines False and True,
which gives True in the end.

$ dotnet run
28
40
True
False

## Associativity

Sometimes the precedence is not satisfactory to determine the outcome of an
expression. There is another rule called *associativity*. The
associativity of operators determines the order of evaluation of operators with
the *same*
precedence level.

9 / 3 * 3

What is the outcome of this expression? 9 or 1? The multiplication, deletion and
the modulo operator are left to right associated. So the expression is evaluated
this way: (9 / 3) * 3 and the result is 9.

Arithmetic, boolean, relational and bitwise operators are all left
o right associated.

On the other hand, the assignment operator is right associated.

a = b = c = d = 0
Console.WriteLine("{0} {1} {2} {3}", a, b, c, d) ' Prints 0 0 0 0

If the association was left to right, the previous expression
would not be possible.

The compound assignment operators are right to left associated.

j = 0
j *= 3 + 1
Console.WriteLine(j)

You might expect the result to be 1. But the actual result is 0. Because of the
associativity. The expression on the right is evaluated first and than the
compound assignment operator is applied.

## AddressOf operator

The AddressOf operator creates a function delegate that points to
another function. Delegates are type safe function pointers, they are used to
call methods of other objects.

Program.vb
  

Option Strict On

Module Example

    Delegate Sub Display

    Dim msg As New Display(AddressOf Message1)

    Sub Main()

        msg.Invoke()
        msg = New Display(AddressOf Message2)
        msg.Invoke()

    End Sub

    Sub Message1()
        Console.WriteLine("This is message 1")
    End Sub

    Sub Message2()
        Console.WriteLine("This is message 2")
    End Sub

End Module

In the code example, we use the AddressOf operator to point to two
different subroutines.

Delegate Sub Display

We need to declare a delegate.

Dim msg As New Display(AddressOf Message1)

The delegate takes the address of a subroutine using the AddressOf
operator. Now we have a type-safe pointer to the Message1
subroutine.

msg.Invoke()

The Invoke method calls the method, to which the delegate points.

msg = New Display(AddressOf Message2)
msg.Invoke()

Now we give the delegate an address of another subroutine.

$ dotnet run
This is message 1
This is message 2

Both messages are printed to the console.

In this part of the Visual Basic tutorial, we covered the operators.

[Contents](..)
[Previous](../strings/)
[Next](../flowcontrol/)