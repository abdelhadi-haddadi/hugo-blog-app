+++
title = "VBScript GetAllResponseHeaders Method"
date = 2025-08-29T20:15:34.375+01:00
draft = false
description = "Learn about VBScript GetAllResponseHeaders method, including HTTP header retrieval, web requests, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetAllResponseHeaders Method

last modified April 9, 2025

The GetAllResponseHeaders method in VBScript is part of the
XMLHTTP object. It retrieves all HTTP response headers as a single
string. This includes status lines, content-type, server info, and other
headers. It's commonly used in web scraping and API interaction scripts.

GetAllResponseHeaders returns headers in name:value pairs separated
by CRLF. The method provides valuable debugging and inspection capabilities. This
tutorial covers GetAllResponseHeaders with practical examples to
demonstrate its usage.

## GetAllResponseHeaders Method Overview

The GetAllResponseHeaders method requires a successful HTTP request
first. It returns all headers as a string with each header on a new line. The
method is available through the XMLHTTP or ServerXMLHTTP
objects in VBScript.

Key features include complete header visibility and simple string output format.
It doesn't modify or filter the headers in any way. GetAllResponseHeaders
works after the request completes successfully. Understanding this method helps
debug web requests and process server responses.

## Basic Header Retrieval

This example demonstrates the simplest use of GetAllResponseHeaders
to fetch headers from a web request. It shows how to make a basic HTTP request
and then retrieve all response headers. The headers are displayed in their raw
format.

basic_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send

allHeaders = http.GetAllResponseHeaders()
WScript.Echo allHeaders

Set http = Nothing

The script creates an XMLHTTP object and makes a synchronous GET
request. After sending the request, it calls GetAllResponseHeaders.
The output shows all HTTP headers returned by the server. Each header appears on
a new line in the format "Name: Value".

## Parsing Specific Headers

This example shows how to extract specific headers from the complete header
string. It demonstrates processing the header data to find particular values.
The script searches for the Content-Type and Server headers.

specific_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send

allHeaders = http.GetAllResponseHeaders()
headersArray = Split(allHeaders, vbCrLf)

For Each header In headersArray
    If InStr(header, "Content-Type:") &gt; 0 Then
        WScript.Echo "Content Type: " &amp; Mid(header, 14)
    End If
    If InStr(header, "Server:") &gt; 0 Then
        WScript.Echo "Server: " &amp; Mid(header, 8)
    End If
Next

Set http = Nothing

The script splits the header string into an array using CRLF as delimiter. It
then searches for specific headers and extracts their values. This approach
allows processing individual headers from the complete response. The output
shows only the targeted header information.

## Comparing Headers Between Requests

This example demonstrates comparing headers from two different requests. It shows
how GetAllResponseHeaders can help analyze server behavior. The
script fetches headers from two URLs and displays them side by side.

compare_headers.vbs
  

Set http1 = CreateObject("MSXML2.XMLHTTP")
Set http2 = CreateObject("MSXML2.XMLHTTP")

http1.Open "GET", "https://example.com", False
http2.Open "GET", "https://example.org", False

http1.Send
http2.Send

WScript.Echo "Example.com headers:" &amp; vbCrLf &amp; http1.GetAllResponseHeaders()
WScript.Echo vbCrLf &amp; "Example.org headers:" &amp; vbCrLf &amp; http2.GetAllResponseHeaders()

Set http1 = Nothing
Set http2 = Nothing

The script creates two HTTP requests to different domains. After receiving
responses, it retrieves and displays headers from both. This comparison helps
identify differences in server configurations. The output clearly separates
headers from each response for easy analysis.

## Handling Redirect Headers

This example shows how to detect redirects using response headers. It
demonstrates checking for Location headers that indicate redirects. The script
follows redirects manually by examining header values.

redirect_headers.vbs
  

url = "http://example.com" ' Some URL that redirects
Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", url, False
http.Send

allHeaders = http.GetAllResponseHeaders()
If InStr(allHeaders, "Location:") &gt; 0 Then
    WScript.Echo "Redirect detected to: " &amp; http.getResponseHeader("Location")
Else
    WScript.Echo "No redirect, final URL: " &amp; url
End If

WScript.Echo "All headers:" &amp; vbCrLf &amp; allHeaders

Set http = Nothing

The script checks the headers for a Location header indicating a redirect. If
found, it displays the target URL; otherwise, it shows the original URL. This
technique helps understand and debug HTTP redirect behavior. The complete
headers are also displayed for reference.

## Logging Headers to File

This example demonstrates saving response headers to a log file. It shows how to
persist header information for later analysis. The script writes headers along
with timestamp to a text file.

log_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
Set fso = CreateObject("Scripting.FileSystemObject")

http.Open "GET", "https://example.com", False
http.Send

logFile = "headers_log.txt"
Set file = fso.OpenTextFile(logFile, 8, True) ' 8 = ForAppending

file.WriteLine "=== Headers at " &amp; Now &amp; " ===")
file.WriteLine http.GetAllResponseHeaders()
file.WriteLine "=== End of Headers ===" &amp; vbCrLf)
file.Close

WScript.Echo "Headers logged to " &amp; logFile

Set http = Nothing
Set fso = Nothing

The script appends headers to a log file with timestamps for each request. This
creates a historical record of server responses. The FileSystemObject handles
file operations while XMLHTTP manages the web request. The output confirms
successful logging of the headers.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms534106(v=vs.84))

In this article, we have explored the GetAllResponseHeaders method
in VBScript, covering its usage and practical applications. From basic header
retrieval to advanced logging and analysis, these examples demonstrate the
method's versatility. With this knowledge, you can enhance your web scripting
capabilities with detailed header inspection.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).