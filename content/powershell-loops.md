+++
title = "PowerShell Loops"
date = 2025-08-29T20:07:06.342+01:00
draft = false
description = "PowerShell loops tutorial shows how to use loops in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Loops

last modified February 15, 2025

In this article, we will explore loops in PowerShell.

In PowerShell, loops are control structures that allow you to
execute a block of code repeatedly based on a condition. They are essential for
automating repetitive tasks and processing collections of data. Common types of
loops in PowerShell include for, foreach,
while, and do-while loops. 

The for loop
runs a specified number of times based on an initializer, condition, and
incrementer. The foreach loop iterates over each item in a
collection, such as an array or list. The while loop continues to
execute as long as the specified condition is true, and the
do-while loop ensures the code block runs at least once before
checking the condition. By using loops, you can simplify complex
tasks and enhance the efficiency of your scripts.

## For loop

The for loop is a control flow statement that allows code to be executed repeatedly.

for_loop.ps1
  

for ($i=1; $i -le 5; $i++) {
    Write-Output "Number: $i"
}

In this example, we use a for loop to print the numbers from 1 to 5.

for ($i=1; $i -le 5; $i++) {
    Write-Output "Number: $i"
}

The for loop has three parts: initialization, condition, and increment.

$i=1

We initialize the variable $i to 1.

$i -le 5

We check if the value of $i is less than or equal to 5.

$i++

We increment the value of $i by 1.

PS C:\&gt; .\for_loop.ps1
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5

The output shows the numbers from 1 to 5.

## Foreach loop

The foreach loop is used to iterate over the items in a collection.

foreach_loop.ps1
  

$fruits = @("apple", "banana", "cherry")

foreach ($fruit in $fruits) {
    Write-Output "Fruit: $fruit"
}

In this example, we use a foreach loop to print each fruit in the $fruits array.

$fruits = @("apple", "banana", "cherry")

We create an array $fruits containing three fruit names.

foreach ($fruit in $fruits) {
    Write-Output "Fruit: $fruit"
}

We use a foreach loop to iterate over each item in the $fruits array.

PS C:\&gt; .\foreach_loop.ps1
Fruit: apple
Fruit: banana
Fruit: cherry

The output shows each fruit in the $fruits array.

## While loop

The while loop is a control flow statement that allows code to be executed repeatedly while a certain condition is true.

while_loop.ps1
  

$i = 1

while ($i -le 5) {
    Write-Output "Number: $i"
    $i++
}

In this example, we use a while loop to print the numbers from 1 to 5.

$i = 1

We initialize the variable $i to 1.

while ($i -le 5) {
    Write-Output "Number: $i"
    $i++
}

We check if the value of $i is less than or equal to 5. If it is, we print the value of $i and increment it by 1.

PS C:\&gt; .\while_loop.ps1
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5

The output shows the numbers from 1 to 5.

## Do while loop

The do while loop is a control flow statement that allows code to be executed repeatedly while a certain condition is true.

do_while_loop.ps1
  

$i = 1

do {
    Write-Output "Number: $i"
    $i++
} while ($i -le 5)

In this example, we use a do while loop to print the numbers from 1 to 5.

$i = 1

We initialize the variable $i to 1.

do {
    Write-Output "Number: $i"
    $i++
} while ($i -le 5)

We execute the code block first and then check if the value of $i is less than or equal to 5. If it is, we print the value of $i and increment it by 1.

PS C:\&gt; .\do_while_loop.ps1
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5

The output shows the numbers from 1 to 5.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have explored loops in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).