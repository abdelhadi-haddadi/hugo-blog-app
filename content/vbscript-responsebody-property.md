+++
title = "VBScript ResponseBody Property"
date = 2025-08-29T20:15:35.490+01:00
draft = false
description = "Learn about VBScript ResponseBody property, including HTTP response handling, binary data processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ResponseBody Property

last modified April 9, 2025

The ResponseBody property in VBScript is part of the
XMLHTTP object. It contains the response entity body as an array of
unsigned bytes. This property is essential for handling binary data from HTTP
responses. It's commonly used in web automation and API interactions.

ResponseBody provides raw access to the response data before any
character conversion. It's particularly useful for downloading files or
processing binary content. This tutorial covers ResponseBody with
practical examples to demonstrate its usage.

## ResponseBody Property Overview

The ResponseBody property returns a byte array containing the
response data. It's available after a successful HTTP request using
XMLHTTP. The property works with both text and binary responses.

Key features include direct access to raw response bytes and compatibility with
binary data. It doesn't perform any character encoding conversion.
ResponseBody is read-only and requires proper request execution.
Understanding this property helps create robust web interaction scripts.

## Basic Text Response Handling

This example demonstrates the simplest use of ResponseBody to
retrieve text content. It shows how to convert the byte array to a string. The
script makes a GET request and processes the response body.

basic_responsebody.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send

' Convert byte array to string
responseText = BytesToString(http.ResponseBody)
WScript.Echo responseText

Function BytesToString(bytes)
    Set stream = CreateObject("ADODB.Stream")
    stream.Type = 1 ' Binary
    stream.Open
    stream.Write bytes
    stream.Position = 0
    stream.Type = 2 ' Text
    stream.CharSet = "utf-8"
    BytesToString = stream.ReadText
    stream.Close
End Function

The script creates an XMLHTTP object and makes a synchronous GET
request. The BytesToString function converts the byte array to a
string. This approach preserves the original response encoding.

## Downloading Binary Files

This example shows how to use ResponseBody to download binary
files. It demonstrates saving an image from a URL to a local file. The script
handles the binary data directly from the response.

download_file.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/image.jpg", False
http.Send

' Save binary data to file
Set stream = CreateObject("ADODB.Stream")
stream.Type = 1 ' Binary
stream.Open
stream.Write http.ResponseBody
stream.SaveToFile "C:\temp\image.jpg", 2 ' Overwrite
stream.Close

WScript.Echo "File downloaded successfully"

The script downloads an image file and saves it locally. The
ResponseBody byte array is written directly to a file stream. This
method works for any binary file type including images, PDFs, and executables.

## Handling JSON Responses

This example demonstrates processing JSON responses using
ResponseBody. It shows proper conversion of the byte array to a
string. The script then parses the JSON content for data extraction.

json_response.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/data.json", False
http.Send

' Process JSON response
jsonText = BytesToString(http.ResponseBody)
Set json = ParseJson(jsonText)

WScript.Echo "User: " &amp; json("user") &amp; ", Status: " &amp; json("status")

Function BytesToString(bytes)
    Set stream = CreateObject("ADODB.Stream")
    stream.Type = 1
    stream.Open
    stream.Write bytes
    stream.Position = 0
    stream.Type = 2
    stream.CharSet = "utf-8"
    BytesToString = stream.ReadText
    stream.Close
End Function

Function ParseJson(jsonText)
    ' Simple JSON parsing (for demonstration)
    Set dict = CreateObject("Scripting.Dictionary")
    ' Actual implementation would parse the JSON properly
    dict.Add "user", "john_doe"
    dict.Add "status", "active"
    Set ParseJson = dict
End Function

The script retrieves JSON data from an API endpoint. The
BytesToString function converts the response to text. A JSON parser
would then process the string into usable data structures.

## Checking Response Size

This example shows how to determine the size of a response using
ResponseBody. It demonstrates accessing the byte array properties.
The script provides feedback about the downloaded content size.

response_size.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/largefile.zip", False
http.Send

responseSize = UBound(http.ResponseBody) + 1 ' Byte array size
WScript.Echo "Downloaded " &amp; responseSize &amp; " bytes"

If responseSize &gt; 1048576 Then ' 1MB
    WScript.Echo "This is a large file (" &amp; Round(responseSize/1048576, 2) &amp; " MB)"
End If

The script calculates the response size by examining the byte array bounds. This
information helps manage memory usage and storage requirements. The example also
demonstrates basic size-based conditional logic.

## Processing Binary Data

This advanced example demonstrates working directly with binary data from
ResponseBody. It shows how to examine and manipulate individual
bytes. The script performs a simple checksum calculation.

binary_processing.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/data.bin", False
http.Send

' Calculate simple checksum
checksum = 0
For i = 0 To UBound(http.ResponseBody)
    checksum = checksum + http.ResponseBody(i)
    ' Ensure checksum stays within byte range
    checksum = checksum Mod 256
Next

WScript.Echo "Checksum: " &amp; checksum

The script downloads binary data and processes each byte individually. It
calculates a simple checksum by summing all bytes modulo 256. This demonstrates
low-level binary data manipulation possible with ResponseBody.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757030(v=vs.84))

In this article, we have explored the ResponseBody property in
VBScript, covering its usage and practical applications. From text processing
to binary file handling, these examples demonstrate robust HTTP response
handling. With this knowledge, you can enhance your web interaction scripts
with proper response processing.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).