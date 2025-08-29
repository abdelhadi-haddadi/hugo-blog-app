+++
title = "Visual Basic data types"
date = 2025-08-29T20:03:19.432+01:00
draft = false
description = "This part of the Visual Basic tutorial covers Visual Basic data types."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../basics/)
[Next](../strings/)

# Visual Basic data types

last modified October 18, 2023

In this part of the Visual Basic tutorial, we talk about data types.

Computer programs work with data. Tools to work with various data types are
essential part of a modern computer language. According to the Wikipedia
definition, a data type is a set of values, and the allowable
operations on those values.

The two fundamental data types in Visual Basic are value types and reference
types. Primitive types (except strings), enumerations, and structures are value
types. Classes, strings, standard modules, interfaces, arrays, and delegates are
reference types. Every type has a default value.

*Reference types* are created on the Heap. The lifetime of the reference
type is managed by the .NET framework. The default value for reference types is
null reference. Assignment to a variable of a reference type creates a copy of
the reference rather than a copy of the referenced value.

*Value types* are created on the stack. The lifetime is determined by the
lifetime of the variable. Assignment to a variable of a value type creates a
copy of the value being assigned. Value types have different default values. For
example, boolean default value is False, decimal 0, string an empty string "".

## Boolean values

There is a duality built in our world. There is a Heaven and Earth, water and fire,
jing and jang, man and woman, love and hatred. In Visual Basic the
Boolean data type is a primitive data type having one of two
values: True or False. This is a fundamental data type. Very common in computer
programs.

Happy parents are waiting a child to be born. They have chosen a name for both
possibilities. If it is going to be a boy, they have chosen John. If it is going
to be a girl, they have chosen Jessica.

Program.vb
  

Option Strict On

Module Example

    Dim num As Byte
    Dim male As Boolean

    Sub Main()

        Randomize()
        num = CType(Math.Round(Rnd()), Byte)

        If num = 0 Then
            male = True
        Else
            male = False
        End If

        If male = True Then
            Console.WriteLine("We use name John")
        Else
            Console.WriteLine("We use name Jessica")
        End If

    End Sub

End Module

The program uses a random number generator to simulate our case.

Dim num As Byte

The num variable has a Byte data type. This is important. Byte data
types may have integer values 0..255.

Randomize()
num = CType(Math.Round(Rnd()), Byte)

These two lines pick up randomly 0 or 1. The Rnd function returns a
random value less than 1, but greater than or equal to zero. We use the
Round method to round the number. Random values greater than 0.5
are rounded to 1. All other random values are rounded to 0.

The Double data type is converted into Byte using the
CType function. So the num variable is assigned 0 or
1. The Randomize function initializes a random-number generator
with a seed based on the system timer.

If num = 0 Then
    male = True
Else
    male = False
End If

Depending on the num variable, the Boolean male
variable is set to True or False.

If male = True Then
    Console.WriteLine("We use name John")
Else
    Console.WriteLine("We use name Jessica")
End If

If the male variable is set to True, we choose name John.
Otherwise, we choose name Jessica. Control structures like
If/Else statements work with Boolean values.

## Integers

Integers are a subset of the real numbers. They are written without a
fraction or a decimal component. Integers fall within a set Z = {..., -2, -1, 0, 1, 2, ...}
Integers are infinite.

In computer languages, integers are primitive data types. Computers can
practically work only with a subset of integer values, because computers have
finite capacity. Integers are used to count discrete
entities. We can have 3, 4, 6 humans, but we cannot have 3.33 humans. We can
have 3.33 kilograms.

    VB Alias
    .NET Type
    Size
    Range

    SByte
    System.SByte
    1 byte
    -128 to 127

    Byte
    System.Byte
    1 byte
    0 to 255

    Short
    System.Int16
    2 bytes
    -32,768 to 32,767

    UShort
    System.UInt16
    2 bytes
    0 to 65,535

    Integer
    System.Int32
    4 bytes
    -2,147,483,648 to 2,147,483,647

    UInteger
    System.UInt32
    4 bytes
    0 to 4,294,967,295

    Long
    System.Int64
    8 bytes
    -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

    ULong
    System.UInt64
    8 bytes
    0 to 18,446,744,073,709,551,615

These integer types may be used according to our needs. No one, (except perhaps
for some biblical people), can be older than 120, 130 years. We can then use the
Byte type for age variable in our program. This will save some
memory.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim a As Byte = 254

        Console.WriteLine(a)
        a += Cbyte(1)
        Console.WriteLine(a)
        
        a += Cbyte(1)
        Console.WriteLine(a)

    End Sub

End Module

In this example, we try to assign a value beyond the range of a data type. The
compiler ends with System.OverflowException: Arithmetic operation resulted in an
overflow.

a += Cbyte(1)

The strict option disallows to add integers to a Byte. (The number literals are
Integer data types.) Therefore, we use the Cbyte function, which
converts the Integer data type to a Byte.

Integers can be specified in four different *notations* in Visual Basic:
decimal, hexadecimal, octal, and binary. Octal values are preceded by
&amp;o, hexadecimal by &amp;h, and binary by
&amp;B.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim num1 As Integer = 31
        Dim num2 As Integer = &amp;o31
        Dim num3 As Integer = &amp;h1A
        Dim num4 As Integer = &amp;B01001001

        Console.WriteLine(num1)
        Console.WriteLine(num2)
        Console.WriteLine(num3)
        Console.WriteLine(num4)

    End Sub

End Module

We assign 31 to three variables using three notations. And we print them to the
console.

$ dotnet run 
31
25
26
73

The default notation is the decimal. The program shows these four numbers in
decimal.

If we work with integers, we deal with discrete entities. We would use
integers to count apples.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Rem number of baskets
        Dim baskets As Short = 16

        Rem number of apples in each basket
        Dim applesinbasket As Short = 24

        Rem total number of apples
        Dim total As Short = baskets * applesinbasket

        Console.WriteLine($"There are total of {total} apples")

    End Sub

End Module

In our program, we count the total amount of apples. We use the multiplication
operation.

Dim total As Short = baskets * applesinbasket

The Short data type is big enough to count our apples.

$ dotnet run
There are total of 384 apples

## Floating point numbers

Floating point numbers represent real numbers in computing. Real numbers
measure continuous quantities, like weight, height, or speed. In Visual Basic
we have three important floating point types: Single,
Double, and Decimal.

    VB Alias
    .NET Type
    Size
    Precision
    Range

    Single
    System.Single
    4 bytes
    7 digits
    1.5 x 10-45 to 3.4 x 1038

    Double
    System.Double
    8 bytes
    15-16 digits
    5.0 x 10-324 to 1.7 x 10308

    Decimal
    System.Decimal
    16 bytes
    28-29 decimal places
    1.0 x 10-28 to 7.9 x 1028

The above table gives the characteristics of the floating
point types.

We can use various syntax to create floating point values.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim n1 As Single = 1.234
        Dim n2 As Single = 1.2e-3
        Dim n3 As Single = 1 / 3

        Console.WriteLine(n1)
        Console.WriteLine(n2)
        Console.WriteLine(n3)

    End Sub

End Module

We have three ways to create floating point values. The first is the 'normal'
way using a decimal point. The second uses scientific notation. And the last one
as a result of a numerical operation.

$ dotnet run
1.234
0.0012
0.3333333

Program.vb
  

```
Option Strict On

Module Example

    Sub Main()

        Dim n1 As Single = 1 / 3
        Dim n2 As Double = 1 / 3

        If n1 = n2 Then
            Console.WriteLine("Numbers are equal")
        Else
            Console.WriteLine("Numbers are not equal")
        End If

    End Sub

End Module

```

Single and Double values are stored with different
precision. Caution should be exercised when comparing floating point values.

$ dotnet run
Numbers are not equal

And the numbers are not equal.

Let's say a sprinter for 100 m ran 9.87 s. What is his speed in km/h?

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim distance As Single
        Dim time As Single
        Dim speed As Single

        Rem 100m is 0.1 km

        distance = 0.1

        Rem 9.87s is 9.87/60*60 h

        time = 9.87 / 3600

        speed = distance / time

        Console.WriteLine("The average speed of a sprinter is {0} km/h", speed)

    End Sub

End Module

In this example, it is necessary to use floating point values.

speed = distance / time

To get the speed, we divide the distance by the time.

$ dotnet run
The average speed of a sprinter is 36.47416 km/h

## Enumerations

Enumerated type (also called enumeration or enum)
is a data type consisting of a set of named values.
A variable that has been declared as having an enumerated type can
be assigned any of the enumerators as a value. Enumerations make
the code more readable.

Program.vb
  

Option Strict On

Module Example

    Enum Days
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
    End Enum

    Sub Main()

        Dim day As Days = Days.Monday

        If day = Days.Monday
            Console.WriteLine("It is Monday")
        End If

        Console.WriteLine(day)

    End Sub

End Module

In our code example, we create an enumeration for week days.

Program.vb
  

Enum Days
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
End Enum

The enumeration is created with a Enum keyword.
The Monday, Tuesday ... barewords store in fact numbers 0..6.

Dim day As Days = Days.Monday

We have a variable called day, which is of enumerated type Days.
It is initialized to Monday.

If day = Days.Monday
    Console.WriteLine("It is Monday")
End If

This code is more readable than if comparing
a day variable to some number.

Console.WriteLine(day)

This line prints 0 to the console. For a computer,
an enum is a number.

We further work with enumerations.

Program.vb
  

Option Strict On

Module Example

    Enum Seasons As Byte
        Spring = 1
        Summer = 2
        Autumn = 3
        Winter = 4
    End Enum

    Sub Main()

        Dim s1 As Seasons = Seasons.Spring
        Dim s2 As Seasons = Seasons.Autumn

        Console.WriteLine(s1)
        Console.WriteLine(s2)

    End Sub

End Module

Seasons can be easily used as enums. We can specify
the underlying type for the enum plus we can give exact
values for them.

Enum Seasons As Byte
    Spring = 1
    Summer = 2
    Autumn = 3
    Winter = 4
End Enum

With the As keyword we specify the
underlying type for the enum. We also give each member a
specific number.

Console.WriteLine(s1)
Console.WriteLine(s2)

These two lines print 1, 3 to the console.

## Strings and chars

String is a data type representing textual data
in computer programs. A string in Visual Basic is a sequence of
Unicode characters. A Char is a single Unicode character.
Strings are enclosed by single or double quotes.

Since strings are very important in every programming language, we
will dedicate a whole chapter to them.
Here we only drop a small example.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim word As String = "ZetCode"

        Dim c As Char = CType(word.SubString(0, 1), Char)

        Console.WriteLine(c)

    End Sub

End Module

The program prints Z character to the terminal.

Dim word As String = "ZetCode"

Here we create a string variable and assign it "ZetCode" value.

Dim c As Char = CType(word.SubString(0, 1), Char)

The SubString method is used to return a substring
from a string. The method return type is a String. We want
to retrieve and assign a single character. This is the reason why we
need to convert a String to a Char with the
CType function. The character is later printed to the terminal.

## Arrays

Array is a complex data type which handles a collection of elements.
Each of the elements can be accessed by an index. All the elements of
an array must be of the same data type.

We dedicate a whole chapter to arrays, here we show only a small example.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim array(5) As Integer

        array(0) = 3
        array(1) = 2
        array(2) = 1
        array(3) = 5
        array(4) = 6

        For i As Integer = 0 To array.Length-1
            Console.WriteLine(i)
        Next

    End Sub

End Module

In this example, we declare an array, fill it with data
and then print the contents of the array to the console.

Dim array(5) As Integer

We declare an integer array, which can store up to 5
integers.

array(0) = 3
array(1) = 2
array(2) = 1
array(3) = 5
array(4) = 6

Here we assign values to the created array.

For i As Integer = 0 To array.Length-1
    Console.WriteLine(i)
Next

We traverse the array and print the data to the
console. The Length property
of the array gives us the length of the array in question.

## Date

A Date is value type, which contain date values,
time values, or date and time values.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim today As Date

        today = Now()

        System.Console.WriteLine(today)
        System.Console.WriteLine(today.ToShortDateString())
        System.Console.WriteLine(today.ToShortTimeString())

    End Sub

End Module

We show today's date in three different formats. Date &amp; time,
date, and time.

Dim today As Date

We declare a variable of Date datatype.

today = Now()

Returns the current date and time, uses the computer's system
date and time.

System.Console.WriteLine(today)

This line prints the date in full format.

System.Console.WriteLine(today.ToShortDateString())
System.Console.WriteLine(today.ToShortTimeString())

The ToShortDateString
returns a short date string format, the ToShortTimeString
returns a short time string format.

$ dotnet run
9/3/2022 1:27:35 PM
9/3/2022
1:27 PM

## Type casting

We often work with multiple data types at once. Converting one data type to
another one is a common job in programming. *Type conversion* or
*typecasting* refers to changing an entity of one data type into another.
There are two types of conversion. Implicit and explicit. Implicit type
conversion, also known as coercion, is an automatic type conversion by the
compiler.

Program.vb
  

Rem Option Strict On

Module Example

    Sub Main()

        Dim val As Byte

        val = 0.54

        Console.WriteLine(val)
        Console.WriteLine(12 + 12.5)
        Console.WriteLine("12" + 12)
        Console.WriteLine("12" &amp; 12)

    End Sub

End Module

In this example, we have an bunch of implicit conversions.

Rem Option Strict On

Some of the implicit conversions are not possible when the Option Strict
statement is On. 

val = 0.54

A floating point value is assigned to the variable of a
Byte data type. It is an integer
data type. The value is rounded to 1; some precision is lost.
This is a *narrowing* implicit conversion.

Console.WriteLine(12 + 12.5)

We add two values. One integer and one floating point value.
The result is a floating point value. It is a *widening* implicit conversion.

Console.WriteLine("12" + 12)

The result is 24. The string is implicitly converted to a number.

Console.WriteLine("12" &amp; 12)

The result is 1212. An integer is converted to a string and
the two strings are added.

Next we show some explicit conversions in Visual Basic.

    FunctionConverts to

    CBoolBoolean

    CByteByte

    CCharUnicode character

    CDateDate

    CDb1Double

    CDecDecimal

    ClntInteger

    CLngLong

    CObjObject

    CShortShort

    CSngSingle

    CStrString

We have several functions to perform explicit conversions.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Console.WriteLine(CByte(0.4))
        Console.WriteLine(CByte(0.9))

        Console.WriteLine(CShort(12 + 12.5))

        Console.WriteLine(Val("1071 Fifth Avenue"))

    End Sub

End Module

In the program we perform three types of conversions.

Console.WriteLine(CByte(0.4))
Console.WriteLine(CByte(0.9))

These two lines perform a narrowing explicit conversion.
The first number is rounded to 0, the second to 1.

Console.WriteLine(Val("1071 Fifth Avenue"))

The Val function returns the numbers
contained in a string. In our case 1071.

$ dotnet run
0
1
24
1071

In this part of the Visual Basic tutorial, we covered data types and
their conversions.

[Contents](..)
[Previous](../basics/)
[Next](../strings/)