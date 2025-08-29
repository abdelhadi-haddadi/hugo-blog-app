+++
title = "PowerShell Hashtables"
date = 2025-08-29T20:07:03.020+01:00
draft = false
description = "PowerShell hashtables tutorial shows how to use hashtables in PowerShell to store and manage data."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Hashtables

last modified February 15, 2025

In this article, we show the basics of PowerShell hashtables, a powerful data structure for storing and managing data in PowerShell.

Hashtables are a collection of key-value pairs.

## Creating a hashtable

In the first example, we demonstrate how to create a hashtable in PowerShell.

hashtable1.ps1
  

$person = @{
    Name = "John Doe"
    Age = 35
}

Write-Output "Name: $($person.Name)"
Write-Output "Age: $($person.Age)"

In this program, we create a hashtable $person containing two key-value pairs.

$person = @{
    Name = "John Doe"
    Age = 35
}

We create a hashtable $person containing two key-value pairs.
The keys are Name and Age.

Write-Output "Name: $($person.Name)"
Write-Output "Age: $($person.Age)"

We use the dot notation to access the values of the hashtable.

PS C:\&gt; .\hashtable1.ps1
Name: John Doe
Age: 35

We run the script and see the output.

## Adding elements

In the next example, we demonstrate how to add elements to a hashtable.

hashtable2.ps1
  

$person = @{
    Name = "John Doe"
    Age = 35
}

$person.City = "New York"

Write-Output "Name: $($person.Name)"
Write-Output "Age: $($person.Age)"
Write-Output "City: $($person.City)"

In this program, we add a new element City to the hashtable.

$person = @{
    Name = "John Doe"
    Age = 35
}

$person.City = "New York"

We create a hashtable $person containing two key-value pairs.
We add a new key-value pair City to the hashtable.

Write-Output "Name: $($person.Name)"
Write-Output "Age: $($person.Age)"
Write-Output "City: $($person.City)"

We use the dot notation to access the values of the hashtable.

PS C:\&gt; .\hashtable2.ps1
Name: John Doe
Age: 35
City: New York

We run the script and see the output.

## Iterating over hashtables

In the following example, we demonstrate how to iterate over a hashtable.

hashtable3.ps1
  

$person = @{
    Name = "John Doe"
    Age = 35
    City = "New York"
}

foreach ($key in $person.Keys) {
    Write-Output "Key: $key, Value: $($person[$key])"
}

In this program, we use a foreach loop to iterate over the hashtable.

$person = @{
    Name = "John Doe"
    Age = 35
    City = "New York"
}

We create a hashtable $person containing three key-value pairs.

foreach ($key in $person.Keys) {
    Write-Output "Key: $key, Value: $($person[$key])"
}

We use a foreach loop to iterate over the hashtable.
We use the Keys property to get a list of keys in the hashtable.
We use the indexing operator [] to access each element in the hashtable.

PS C:\&gt; .\hashtable3.ps1
Key: Name, Value: John Doe
Key: Age, Value: 35
Key: City, Value: New York

We run the script and see the output.

## Removing elements

In the last example, we demonstrate how to remove elements from a hashtable.

hashtable4.ps1
  

$person = @{
    Name = "John Doe"
    Age = 35
    City = "New York"
}

$person.Remove("Age")

foreach ($key in $person.Keys) {
    Write-Output "Key: $key, Value: $($person[$key])"
}

In this program, we remove the Age element from the hashtable.

$person = @{
    Name = "John Doe"
    Age = 35
    City = "New York"
}

$person.Remove("Age")

We create a hashtable $person containing three key-value pairs.
We remove the Age element from the hashtable.

foreach ($key in $person.Keys) {
    Write-Output "Key: $key, Value: $($person[$key])"
}

We use a foreach loop to iterate over the hashtable.
We use the Keys property to get a list of keys in the hashtable.
We use the indexing operator [] to access each element in the hashtable.

PS C:\&gt; .\hashtable4.ps1
Key: Name, Value: John Doe
Key: City, Value: New York

We run the script and see the output.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have worked with PowerShell hashtables.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).