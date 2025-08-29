+++
title = "PowerShell Basics"
date = 2025-08-29T20:06:45.187+01:00
draft = false
description = "PowerShell basics tutorial shows how to use PowerShell to automate tasks and manage systems."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Basics

last modified February 15, 2025

In this article, we show the basics of PowerShell, a powerful automation and
configuration tool for Windows systems. PowerShell is designed to help IT
professionals and system administrators automate repetitive tasks, manage system
configurations, and improve overall efficiency. With its rich set of features
and capabilities, PowerShell has become an essential tool for managing and
automating various tasks in Windows environments.

PowerShell is a cross-platform task automation solution made up of a
command-line shell, a scripting language, and a configuration management
framework. The command-line shell provides an interactive environment for
running commands and scripts, while the scripting language allows users to write
complex scripts for automating tasks. The configuration management framework
enables users to manage and maintain system configurations, ensuring that
systems remain in a desired state.

PowerShell provides full access to the .NET Framework and the Windows Management
Instrumentation (WMI). This integration allows users to leverage the power of
.NET libraries and WMI classes to perform advanced tasks and manage system
components. With PowerShell, users can interact with various system resources,
retrieve information, and execute commands to automate processes and streamline
operations. Additionally, PowerShell supports remote management, allowing
administrators to execute commands and scripts on remote systems, making it a
versatile tool for managing large-scale IT environments.

One of the key features of PowerShell is its extensive library of built-in
cmdlets, which are specialized commands designed to perform specific tasks.
These cmdlets can be combined and pipelined to create complex workflows and
automate intricate processes. Moreover, PowerShell's extensibility allows users
to create custom cmdlets and modules, further enhancing its functionality and
adaptability to meet diverse automation requirements.

## PowerShell variables

In the first example, we demonstrate how to declare and use variables in
PowerShell.

variables.ps1
  

$name = "John Doe"
Write-Output "Hello, $name!"

In this program, we declare a variable $name and assign it the
value "John Doe". We then use the Write-Output cmdlet to print a
greeting to the console.

$name = "John Doe"

We declare a variable $name and assign it the value "John Doe".

Write-Output "Hello, $name!"

We use the Write-Output cmdlet to print a greeting to the console.
We use string interpolation to include the value of the $name
variable in the output.

PS C:\&gt; .\variables.ps1
Hello, John Doe!

We run the script and see the output.

## PowerShell arrays

In the next example, we demonstrate how to create and manipulate arrays in
PowerShell.

arrays.ps1
  

$fruits = @("apple", "banana", "cherry")
Write-Output "The first fruit is $($fruits[0])"

In this program, we create an array $fruits containing three fruit
names. We then use the Write-Output cmdlet to print the first fruit
in the array.

$fruits = @("apple", "banana", "cherry")

We create an array $fruits containing three fruit names.

Write-Output "The first fruit is $($fruits[0])"

We use the Write-Output cmdlet to print the first fruit in the
array. We use the indexing operator [] to access the first element
in the array.

PS C:\&gt; .\arrays.ps1
The first fruit is apple

We run the script and see the output.

## PowerShell loops

PowerShell provides several ways to loop over collections of items.
In this example, we use the for loop.

loops.ps1
  

$fruits = @("apple", "banana", "cherry")

for ($i = 0; $i -lt $fruits.Count; $i++) {
    Write-Output "Fruit ${i}: $($fruits[$i])"
}

In this program, we use a for loop to iterate over the $fruits
array and print each fruit along with its index.

$fruits = @("apple", "banana", "cherry")

We create an array $fruits containing three fruit names.

for ($i = 0; $i -lt $fruits.Count; $i++) {
    Write-Output "Fruit ${i}: $($fruits[$i])"
}

We use a for loop to iterate over the $fruits array.
We use the indexing operator [] to access each element in the array.

PS C:\&gt; .\loops.ps1
Fruit 0: apple
Fruit 1: banana
Fruit 2: cherry

We run the script and see the output.

## PowerShell functions

PowerShell allows you to define custom functions.
In this example, we define a simple function that takes a single argument.

functions.ps1
  

function greet($name) {
    Write-Output "Hello, $name!"
}

greet "John Doe"

In this program, we define a function greet that takes a single
argument $name. We then call the function with the argument "John
Doe".

function greet($name) {
    Write-Output "Hello, $name!"
}

We define a function greet that takes a single argument
$name.

greet "John Doe"

We call the greet function with the argument "John Doe".

PS C:\&gt; .\functions.ps1
Hello, John Doe!

We run the script and see the output.

## PowerShell modules

PowerShell modules allow you to organize and reuse your code.
In this example, we create a simple module.

module.ps1
  

function greet($name) {
    Write-Output "Hello, $name!"
}

Export-ModuleMember -Function greet

In this program, we define a function greet and then use the
Export-ModuleMember cmdlet to export the function as part of the
module.

function greet($name) {
    Write-Output "Hello, $name!"
}

We define a function greet that takes a single argument
$name.

Export-ModuleMember -Function greet

We use the Export-ModuleMember cmdlet to export the
greet function as part of the module.

PS C:\&gt; .\module.ps1
PS C:\&gt; Import-Module .\module.ps1
PS C:\&gt; greet "John Doe"
Hello, John Doe!

We run the script, import the module, and then call the greet
function.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have worked with the basics of PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).