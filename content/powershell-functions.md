+++
title = "PowerShell Functions"
date = 2025-08-29T20:06:55.122+01:00
draft = false
description = "PowerShell functions tutorial shows how to use functions in PowerShell to automate tasks and manage systems."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Functions

last modified February 15, 2025

In this article, we will explore PowerShell functions, which are
essential components of scripting and automation in PowerShell. Functions are
reusable blocks of code that encapsulate specific tasks or operations, making
them efficient and modular. By using functions, we can break down complex
scripts into smaller, manageable pieces, which enhances the overall structure
and readability of our scripts. This modular approach not only makes our code
easier to understand but also simplifies maintenance and debugging.

Functions can accept parameters, allowing us to pass data and
customize the behavior of the function based on the inputs provided. Parameters
make functions flexible and versatile, enabling us to reuse the same function in
different scenarios with varying inputs. Additionally, functions can return
values, which can be used in other parts of the script or even passed to other
functions. This capability allows us to build complex workflows and automate
intricate processes by chaining functions together and passing data between
them.

By understanding and utilizing PowerShell functions, we can create more
organized, efficient, and maintainable scripts. Functions help us adhere to the
principles of code reuse and modularity, which are key to writing high-quality
PowerShell scripts. Throughout this article, we will delve into the details of
defining and using functions, handling parameters, returning values, and best
practices for creating robust and reusable functions in PowerShell.

    

## PowerShell function

In the first example, we will define and call a simple PowerShell function.

function.ps1
  

function SayHello {
    param (
        [string]$name
    )

    Write-Output "Hello, $name!"
}

SayHello -name "John Doe"

In this program, we define a function called SayHello. It takes one parameter, $name, of type string. The function uses the Write-Output cmdlet to print a greeting to the console.

function SayHello {
    param (
        [string]$name
    )

We define a function called SayHello. The param keyword is used to define the function parameters. The $name parameter is of type string.

Write-Output "Hello, $name!"

We use the Write-Output cmdlet to print a greeting to the console. We use string interpolation to include the value of the $name parameter in the output.

PS C:\&gt; .\function.ps1
Hello, John Doe!

We run the script and see the output.

## PowerShell function with return value

In the next example, we will define a PowerShell function that returns a value.

return.ps1
  

function AddNumbers {
    param (
        [int]$a,
        [int]$b
    )

    $sum = $a + $b
    return $sum
}

$result = AddNumbers -a 3 -b 5
Write-Output "The result is $result"

In this program, we define a function called AddNumbers. It takes two parameters, $a and $b, of type int. The function calculates the sum of the two numbers and returns it.

function AddNumbers {
    param (
        [int]$a,
        [int]$b
    )

    $sum = $a + $b
    return $sum
}

We define a function called AddNumbers. It takes two parameters, $a and $b, of type int. The function calculates the sum of the two numbers and returns it.

PS C:\&gt; .\return.ps1
The result is 8

We run the script and see the output.

## PowerShell function with optional parameter

In the next example, we will define a PowerShell function with an optional parameter.

optional.ps1
  

function GetName {
    param (
        [string]$firstName,
        [string]$lastName = "Doe"
    )

    Write-Output "$firstName $lastName"
}

GetName -firstName "John"
GetName -firstName "Jane" -lastName "Smith"

In this program, we define a function called GetName. It takes two parameters, $firstName and $lastName, of type string. The $lastName parameter has a default value of "Doe".

PS C:\&gt; .\optional.ps1
John Doe
Jane Smith

We run the script and see the output.

## PowerShell function with splatting

In the final example, we will use splatting in a PowerShell function.

splatting.ps1
  

function ProcessParams {
    param (
        [Parameter(Mandatory=$true)]
        [hashtable]$params
    )

    foreach ($key in $params.Keys) {
        Write-Output "${key}: $($params[$key])"
    }
}

$params = @{
    a = 3
    b = 5
}

ProcessParams -params $params

In this program, we define a function called ProcessParams. It
takes one parameter, $params, of type hashtable. The
ProcessParams function uses a foreach loop to iterate
over the key-value pairs in the $params hashtable.

PS C:\&gt; .\splatting.ps1
a: 3
b: 5

We run the script and see the output.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have explored PowerShell functions.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of programming experience. I have been writing programming articles since 2007. So far, I have written over 1400 articles and 8 e-books. I have over eight years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).