+++
title = "PowerShell Operators and Expressions"
date = 2025-08-29T20:07:09.789+01:00
draft = false
description = "PowerShell operators and expressions tutorial shows how work with operators and expressions."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Operators and Expressions

last modified February 15, 2025

In this article, we discuss operators and expressions in PowerShell.

Operators are special characters or keywords used to perform
operations on values and variables. These operators can be broadly categorized
into several types, such as arithmetic, comparison, logical, and assignment
operators. Arithmetic operators like +, -, *, and / are used for basic
mathematical operations. Comparison operators such as -eq, -ne, -gt, -lt, -ge,
and -le are utilized to compare values. Logical operators like -and, -or, and
-not are employed to perform logical operations on Boolean expressions.
Additionally, assignment operators like = and += are used to assign or modify
the value of variables.

Expressions are combinations of values, variables, and operators that can be
evaluated to produce a result. These expressions can be as simple as a single
value or as complex as a combination of multiple operators and operands. For
example, the expression 2 + 3 * 4 involves both addition and multiplication
operators. PowerShell follows the standard order of operations, also known as
operator precedence, to evaluate such expressions. Parentheses can be used to
explicitly define the order of operations within an expression, ensuring the
desired outcome. Expressions are the building blocks of PowerShell scripts and
commands, allowing users to perform various tasks efficiently and effectively.

## Arithmetic operators

PowerShell supports various arithmetic operators such as addition (+),
subtraction (-), multiplication (*), division (/), modulus (%), and
exponentiation (**).

    
        
            Operator
            Description
            Example
        
    
    
        
            +
            Addition
            5 + 2
        
        
            -
            Subtraction
            5 - 2
        
        
            *
            Multiplication
            5 * 2
        
        
            /
            Division
            5 / 2
        
        
            %
            Modulus (remainder)
            5 % 2
        
    

The table lists arithmetic operators.

arithmetic.ps1
  

$x = 10
$y = 3

Write-Output "Addition: $($x + $y)"
Write-Output "Subtraction: $($x - $y)"
Write-Output "Multiplication: $($x \* $y)"
Write-Output "Division: $($x / $y)"
Write-Output "Modulus: $($x % $y)"
Write-Output "Exponentiation: $($x ** $y)"

In this example, we declare two variables $x and $y, and perform arithmetic
operations on them using the corresponding operators.

PS C:\&gt; .\arithmetic.ps1
Addition: 13
Subtraction: 7
Multiplication: 30
Division: 3.33333333333333
Modulus: 1
Exponentiation: 1000

## Comparison operators

Comparison operators are used to compare two values or variables. PowerShell
supports various comparison operators such as -eq (equal to), -ne (not equal
to), -lt (less than), -le (less than or equal to), -gt (greater than), and -ge
(greater than or equal to).

    
        
            Operator
            Description
            Example
        
    
    
        
            -eq
            Equal to
            5 -eq 2
        
        
            -ne
            Not equal to
            5 -ne 2
        
        
            -gt
            Greater than
            5 -gt 2
        
        
            -lt
            Less than
            5 -lt 2
        
        
            -ge
            Greater than or equal to
            5 -ge 2
        
        
            -le
            Less than or equal to
            5 -le 2
        
    

The table lists comparison operators.

comparison.ps1
  

$x = 10
$y = 3

Write-Output "Equal to: $($x -eq $y)"
Write-Output "Not equal to: $($x -ne $y)"
Write-Output "Less than: $($x -lt $y)"
Write-Output "Less than or equal to: $($x -le $y)"
Write-Output "Greater than: $($x -gt $y)"
Write-Output "Greater than or equal to: $($x -ge $y)"

In this example, we declare two variables $x and $y, and compare them using the comparison operators.

PS C:\&gt; .\comparison.ps1
Equal to: False
Not equal to: True
Less than: False
Less than or equal to: False
Greater than: True
Greater than or equal to: True

## Logical operators

Logical operators are used to combine expressions. PowerShell supports various
logical operators such as -and (and), -or (or), and -not (not).

    
        
            Operator
            Description
            Example
        
    
    
        
            -and
            Logical AND
            $true -and $false
        
        
            -or
            Logical OR
            $true -or $false
        
        
            -not
            Logical NOT
            -not $true
        
    

The table lists logical operators.

logical.ps1
  

$x = 10
$y = 3

Write-Output "And: $($x -gt $y -and $x -lt 20)"
Write-Output "Or: $($x -gt $y -or $x -gt 20)"
Write-Output "Not: $(-not $x -eq 0)"

In this example, we use logical operators to combine expressions.

PS C:\&gt; .\logical.ps1
And: True
Or: True
Not: False

## Assignment operators

Assignment operators are used to assign values to variables. PowerShell supports
various assignment operators such as = (equal to), += (addition assignment), -=
(subtraction assignment), \*= (multiplication assignment), /= (division
assignment), %= (modulus assignment), and **= (exponentiation assignment).

    
        
            Operator
            Description
            Example
        
    
    
        
            =
            Assignment
            $a = 5
        
        
            +=
            Addition assignment
            $a += 2
        
        
            -=
            Subtraction assignment
            $a -= 2
        
        
            *=
            Multiplication assignment
            $a *= 2
        
        
            /=
            Division assignment
            $a /= 2
        
        
            %=
            Modulus assignment
            $a %= 2
        
    

The table lists assignment operators.

assignment.ps1
  

$x = 10
$x += 5
Write-Output "X: $x"

In this example, we declare a variable $x and use the addition assignment
operator to increment its value by 5.

PS C:\&gt; .\assignment.ps1
X: 15

## Special operators

Special operators in PowerShell provide unique capabilities for working with
data and performing operations that go beyond the basic arithmetic, comparison,
and logical operations. 

Here are the special operators:

    
        
            Operator
            Description
            Example
        
    
    
        
            ..
            Range
            1..5
        
        
            -match
            Regular expression match
            "hello" -match "h.*o"
        
        
            -replace
            Replace using regular expressions
            "hello" -replace "l", "y"
        
        
            -contains
            Containment (array)
            @(1,2,3) -contains 2
        
    

The table lists some special operators.

special.ps1
  

$numbers = 1..5
Write-Output "Numbers: $numbers"

$text = "PowerShell is powerful"

if ($text -match "Power.*") {
    Write-Output "The text matches the pattern."
}

$replacedText = $text -replace "powerful", "versatile"
Write-Output "Replaced text: $replacedText"

$users = @("Alice", "Bob", "Charlie")
$userToCheck = "Alice"

if ($users -contains $userToCheck) {
    Write-Output "$userToCheck is in the list."
}

The example demonstrates their usage.

$numbers = 1..5

The range operator generates a sequence of numbers from 1 to 5 and stores them
in the $numbers variable.

$replacedText = $text -replace "powerful", "versatile"

The -match operator checks if the $text string matches
the regular expression pattern Power.*, which looks for "Power" followed by any
characters.

if ($users -contains $userToCheck) {
    Write-Output "$userToCheck is in the list."
}

The -contains operator checks if the $users array
contains the specified item $userToCheck, which is "Alice" in this
case.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have discussed operators and expressions in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).