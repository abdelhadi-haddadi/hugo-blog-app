+++
title = "VBScript ResponseStream Property"
date = 2025-08-29T20:15:36.643+01:00
draft = false
description = "Learn about VBScript ResponseStream property, including HTTP response handling, binary data processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ResponseStream Property

last modified April 9, 2025

The ResponseStream property in VBScript is part of the
ServerXMLHTTP object. It provides access to the raw binary data
returned from HTTP requests. This property is essential for handling non-text
responses like files, images, or binary data. It allows direct access to the
response body as a stream.

ResponseStream is read-only and available after a successful HTTP
request. It's commonly used with ADODB.Stream for processing binary data. This
tutorial covers ResponseStream with practical examples to
demonstrate its usage.

## ResponseStream Property Overview

The ResponseStream property returns an IStream interface to the
HTTP response body. It's available through the ServerXMLHTTP object
after sending a request. The property provides binary access to response data
regardless of content type.

Key features include direct binary data access and support for large responses.
It doesn't automatically decode or interpret the response content.
ResponseStream works with both text and binary HTTP responses.
Understanding this property helps create robust HTTP clients.

## Basic Text Response Reading

This example demonstrates reading a text response using
ResponseStream. It shows how to convert the binary stream to a
string. The script makes an HTTP GET request and reads the response body.

basic_response.vbs
  

Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "https://example.com", False
http.Send

Set stream = CreateObject("ADODB.Stream")
stream.Type = 1 ' Binary
stream.Open
stream.Write http.ResponseStream
stream.Position = 0

stream.Type = 2 ' Text
responseText = stream.ReadText
WScript.Echo responseText

stream.Close
Set stream = Nothing
Set http = Nothing

The script creates a ServerXMLHTTP object and sends a GET request.
It uses ADODB.Stream to read the ResponseStream. The
binary data is converted to text for display. This approach works for text-based
HTTP responses.

## Downloading Binary File

This example shows how to download a binary file using
ResponseStream. It demonstrates saving the response directly to a
file. The script downloads an image and saves it locally.

download_file.vbs
  

Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "https://example.com/image.jpg", False
http.Send

Set stream = CreateObject("ADODB.Stream")
stream.Type = 1 ' Binary
stream.Open
stream.Write http.ResponseStream
stream.SaveToFile "C:\temp\image.jpg", 2 ' Overwrite

stream.Close
Set stream = Nothing
Set http = Nothing

WScript.Echo "File downloaded successfully"

The script makes a GET request for an image file. The binary response is written
directly to a file using SaveToFile. This method preserves the
original binary data without modification. It's ideal for downloading files.

## Processing Large Responses

ResponseStream is efficient for large responses as it doesn't load
everything into memory. This example shows chunked reading of a large response.
It processes the stream in manageable portions.

large_response.vbs
  

Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "https://example.com/largefile.bin", False
http.Send

Set stream = CreateObject("ADODB.Stream")
stream.Type = 1 ' Binary
stream.Open
stream.Write http.ResponseStream
stream.Position = 0

chunkSize = 4096
Do Until stream.EOS
    chunk = stream.Read(chunkSize)
    ' Process chunk here
    WScript.Echo "Read " &amp; LenB(chunk) &amp; " bytes"
Loop

stream.Close
Set stream = Nothing
Set http = Nothing

The script reads the response in 4KB chunks using a loop. This approach is
memory-efficient for large files. Each chunk can be processed individually
without loading the entire response. The EOS property checks for
end-of-stream.

## Checking Response Availability

This example demonstrates checking if ResponseStream contains data.
It shows proper error handling for empty responses. The script verifies the
response before processing.

check_response.vbs
  

Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "https://example.com/nodata", False
http.Send

If http.Status = 200 Then
    If Not http.ResponseStream Is Nothing Then
        Set stream = CreateObject("ADODB.Stream")
        stream.Type = 1
        stream.Open
        stream.Write http.ResponseStream
        
        If stream.Size &gt; 0 Then
            WScript.Echo "Response contains data"
        Else
            WScript.Echo "Empty response"
        End If
        stream.Close
    Else
        WScript.Echo "No response stream available"
    End If
Else
    WScript.Echo "HTTP error: " &amp; http.Status
End If

Set stream = Nothing
Set http = Nothing

The script checks the HTTP status code first. Then it verifies the
ResponseStream exists. Finally, it checks the stream size for
actual content. This comprehensive checking prevents errors with empty
responses.

## Reading Response Headers with Stream

This example shows how to access response headers while using
ResponseStream. It demonstrates reading both headers and body from
an HTTP response. The script displays headers before processing the body.

headers_with_stream.vbs
  

Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
http.Open "GET", "https://example.com", False
http.Send

' Display all response headers
WScript.Echo "Response Headers:"
WScript.Echo http.getAllResponseHeaders()

' Process response body
Set stream = CreateObject("ADODB.Stream")
stream.Type = 1
stream.Open
stream.Write http.ResponseStream
stream.Position = 0

stream.Type = 2
WScript.Echo "Response Body:"
WScript.Echo stream.ReadText

stream.Close
Set stream = Nothing
Set http = Nothing

The script first displays all response headers using
getAllResponseHeaders. Then it processes the response body through
ResponseStream. This approach allows complete access to both
headers and body content. Headers often contain important metadata about the
response.

## Source

[ServerXMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760305(v=vs.85))

In this article, we have explored the ResponseStream property in
VBScript, covering its usage and practical applications. From text responses to
binary file downloads, these examples demonstrate reliable HTTP response
handling. With this knowledge, you can enhance your HTTP client scripts with
robust response processing.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).