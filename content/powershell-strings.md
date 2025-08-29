+++
title = "PowerShell Strings"
date = 2025-08-29T20:07:20.013+01:00
draft = false
description = "PowerShell strings tutorial shows how to use PowerShell to manipulate and format strings."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Strings

last modified February 15, 2025

In this article, we will cover strings in PowerShell.

## String creation

We can create strings in PowerShell using single or double quotes.

strings1.ps1
  

$str1 = 'This is a string.'
$str2 = "This is also a string."

In this program, we create two strings, $str1 and $str2.

PS C:\&gt; .\strings1.ps1

We run the script and see no output. Strings are displayed when we explicitly
ask for it.

## String display

We can display the contents of a string using the Write-Output
cmdlet.

strings2.ps1
  

$str1 = 'This is a string.'
Write-Output $str1

```
PS C:\&gt; .\strings2.ps1
This is a string.

```

## String concatenation

We can concatenate strings using the + operator.

strings3.ps1
  

$str1 = 'This is a string.'
$str2 = 'This is another string.'

$str3 = $str1 + ' ' + $str2
Write-Output $str3

```
PS C:\&gt; .\strings3.ps1
This is a string. This is another string.

```

## String interpolation

String interpolation is a feature that allows us to embed expressions
inside string literals for evaluation.

strings4.ps1
  

$name = 'John Doe'
Write-Output "Hello, $name!"

```
PS C:\&gt; .\strings4.ps1
Hello, John Doe!

```

## String manipulation

PowerShell provides a number of methods for manipulating strings.

strings5.ps1
  

$str = 'This is a string.'

# Length
Write-Output $str.Length

# Uppercase
Write-Output $str.ToUpper()

# Lowercase
Write-Output $str.ToLower()

# Trim
Write-Output $str.Trim()

```
PS C:\&gt; .\strings5.ps1
21
THIS IS A STRING.
this is a string.
This is a string.

```

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered strings in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).