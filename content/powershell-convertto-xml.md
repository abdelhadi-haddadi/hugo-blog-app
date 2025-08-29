+++
title = "PowerShell ConvertTo-Xml"
date = 2025-08-29T20:06:48.486+01:00
draft = false
description = "PowerShell ConvertTo-Xml tutorial shows how to convert objects to XML representation."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell ConvertTo-Xml

last modified February 15, 2025

This article covers the ConvertTo-Xml cmdlet in PowerShell. It
converts .NET objects into XML representations. The cmdlet is useful for
data serialization and configuration management.

## XML basics

XML (eXtensible Markup Language) is a structured data format. It uses tags
to define elements and attributes. PowerShell can work with XML through
various cmdlets. ConvertTo-Xml serializes objects to XML format.

## Basic ConvertTo-Xml usage

The simplest way to use ConvertTo-Xml is with a single object.
The cmdlet returns an XML document object. By default, it includes type
information in the output. The XML can be further processed or saved to a file.

xml1.ps1
  

$date = Get-Date
$date | ConvertTo-Xml

This converts a DateTime object to XML. The output shows the object's
properties as XML elements. Type information is included by default.

## Convert process information to XML

You can convert process objects to XML for analysis or storage. This example
gets Notepad processes and converts them. The XML structure preserves the
object hierarchy. This is useful for logging or configuration management.

xml2.ps1
  

Get-Process -Name "notepad" | ConvertTo-Xml

This command retrieves Notepad processes and converts them to XML. Each
process property becomes an XML element. The output can be piped to other
cmdlets.

PS C:\&gt; .\xml2.ps1

Objects

Object
-------
&lt;Objs Version="1.1.0.1" xmlns="http://schemas.microsoft.com/powershell/2004/04"&gt;
  &lt;Obj RefId="0"&gt;
    &lt;TN RefId="0"&gt;
      &lt;T&gt;System.Diagnostics.Process&lt;/T&gt;
      &lt;T&gt;System.ComponentModel.Component&lt;/T&gt;
      &lt;T&gt;System.MarshalByRefObject&lt;/T&gt;
      &lt;T&gt;System.Object&lt;/T&gt;
    &lt;/TN&gt;
    &lt;ToString&gt;System.Diagnostics.Process (notepad)&lt;/ToString&gt;
    &lt;Props&gt;
      &lt;I32 N="Id"&gt;1234&lt;/I32&gt;
      &lt;S N="Name"&gt;notepad&lt;/S&gt;
      ...
    &lt;/Props&gt;
  &lt;/Obj&gt;
&lt;/Objs&gt;

## Save XML to file

The XML output can be saved directly to a file. Use redirection or
Out-File for this purpose. This creates persistent XML
representations of objects. The files can be loaded later with
Import-Clixml.

xml3.ps1
  

Get-Service | ConvertTo-Xml | Out-File "services.xml"

This command saves all service information to an XML file. The file can be
shared or archived. The XML format preserves the object structure.

## Convert custom objects to XML

Custom objects created with New-Object or PSCustomObject
can be converted. This is useful for creating configuration files. The XML
structure will reflect the object's properties. You can control the depth of
conversion.

xml4.ps1
  

$user = [PSCustomObject]@{
    Name = "John Doe"
    Age = 42
    Active = $true
}
$user | ConvertTo-Xml

This creates a custom user object and converts it to XML. Each property
becomes an XML element. The output includes the object's type information.

## Exclude type information

Type information can be excluded using the -NoTypeInformation
parameter. This creates cleaner XML output. The resulting XML is more
compact. It's useful when type details aren't needed.

xml5.ps1
  

Get-Process -Name "powershell" | 
    ConvertTo-Xml -NoTypeInformation

This converts PowerShell processes to XML without type information. The
output is simpler and more focused on data. It's better for interoperability.

## Control XML depth

The -Depth parameter controls how many levels of nested objects
are converted. The default is 2. Increase this for complex objects. Be
careful with very deep structures to avoid performance issues.

xml6.ps1
  

$complexObject = @{
    Level1 = @{
        Level2 = @{
            Level3 = "Value"
        }
    }
}
$complexObject | ConvertTo-Xml -Depth 5

This converts a deeply nested hashtable to XML. The -Depth parameter ensures
all levels are included. Without it, some nested data might be truncated.

## Convert to XML string

To get the XML as a string instead of an XML document object, use the
-As String parameter. This is useful when you need the raw
XML text. The string can be manipulated or sent to web services.

xml7.ps1
  

$services = Get-Service | Select-Object -First 3
$services | ConvertTo-Xml -As String

This converts the first three services to an XML string. The output is
raw XML text rather than an object. This format is better for some APIs.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the ConvertTo-Xml cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).