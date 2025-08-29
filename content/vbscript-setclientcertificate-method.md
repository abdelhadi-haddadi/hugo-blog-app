+++
title = "VBScript SetClientCertificate Method"
date = 2025-08-29T20:15:37.744+01:00
draft = false
description = "Learn about VBScript SetClientCertificate method, including HTTPS client authentication, SSL certificates, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetClientCertificate Method

last modified April 9, 2025

The SetClientCertificate method in VBScript is part of the
MSXML2.XMLHTTP object. It specifies a client certificate to use for
HTTPS requests requiring client authentication. This method enables secure
communication with servers that require certificate-based authentication.

SetClientCertificate is essential for scenarios where mutual TLS
authentication is required. It allows VBScript to present a client certificate
during SSL/TLS handshake. This tutorial covers SetClientCertificate
with practical examples to demonstrate its usage.

## SetClientCertificate Method Overview

The SetClientCertificate method takes a certificate selection string
as parameter. This string identifies which client certificate to use from the
Windows certificate store. The method must be called before sending the HTTP
request.

Certificate selection strings follow the format "Issuer[Subject]". Both issuer
and subject can contain wildcards. The method returns nothing but throws an
error if no matching certificate is found. Understanding this method helps
create secure client-authenticated HTTPS requests.

## Basic Client Certificate Usage

This example demonstrates the simplest use of SetClientCertificate
to make an authenticated HTTPS request. It shows how to specify a client
certificate by subject name. The request will fail if the server requires
certificate authentication.

basic_certificate.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://secure.example.com/api", False
xmlhttp.SetClientCertificate "My Client Certificate"
xmlhttp.Send

WScript.Echo xmlhttp.responseText

Set xmlhttp = Nothing

The script creates an XMLHTTP object and prepares a GET request. 
SetClientCertificate specifies the certificate by subject name.
The request is then sent to the secure endpoint. The response is output to the
console.

## Using Certificate Issuer and Subject

This example shows how to specify both issuer and subject for more precise
certificate selection. The format "Issuer[Subject]" ensures the correct
certificate is selected when multiple matches exist. This is more reliable than
using just the subject.

issuer_subject.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "POST", "https://api.securebank.com/transfer", False
xmlhttp.SetClientCertificate "CN=Bank CA[CN=Client Auth Cert]"
xmlhttp.SetRequestHeader "Content-Type", "application/json"
xmlhttp.Send "{""amount"":100}"

If xmlhttp.Status = 200 Then
    WScript.Echo "Transfer successful"
Else
    WScript.Echo "Error: " &amp; xmlhttp.Status
End If

Set xmlhttp = Nothing

The script specifies both issuer (CN=Bank CA) and subject (CN=Client Auth Cert).
This ensures the exact certificate is selected from the store. The example makes
a POST request with JSON data to a banking API endpoint requiring client auth.

## Wildcard Certificate Selection

This example demonstrates using wildcards in certificate selection strings.
Wildcards allow matching multiple certificates with similar names. The asterisk
(*) matches any sequence of characters in the issuer or subject fields.

wildcard_cert.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://internal.company.com/data", False
xmlhttp.SetClientCertificate "CN=Company CA*[*Auth*]"
xmlhttp.Send

If xmlhttp.Status = 200 Then
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set file = fso.CreateTextFile("response.xml", True)
    file.Write xmlhttp.responseText
    file.Close
    WScript.Echo "Data saved to response.xml"
End If

Set xmlhttp = Nothing

The wildcard pattern "CN=Company CA*[*Auth*]" matches any certificate issued by
"Company CA" with "Auth" in the subject name. The response is saved to a file if
the request succeeds. Wildcards provide flexibility when exact names are unknown.

## Handling Certificate Errors

This example shows how to handle errors when no matching certificate is found.
The script includes error handling to manage cases where the specified
certificate doesn't exist. Proper error handling is crucial for robust
applications.

error_handling.vbs
  

On Error Resume Next

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://secure.service.com/data", False
xmlhttp.SetClientCertificate "Non-Existent Certificate"

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Certificate error: " &amp; Err.Description
    WScript.Quit 1
End If

xmlhttp.Send

If xmlhttp.Status = 200 Then
    WScript.Echo xmlhttp.responseText
Else
    WScript.Echo "Request failed: " &amp; xmlhttp.Status
End If

Set xmlhttp = Nothing

The script attempts to use a non-existent certificate name. The error handler
catches the certificate not found error. Without error handling, the script
would terminate unexpectedly. This approach provides graceful failure handling.

## Multiple Certificate Selection Attempts

This example demonstrates trying multiple certificate selection strings until a
valid one is found. It's useful when the exact certificate name isn't known in
advance. The script attempts different patterns until one succeeds.

multiple_attempts.vbs
  

certificates = Array("My Client Cert", "CN=My CA[Client*]", "*Client*")

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://auth.service.com/info", False

For Each cert In certificates
    On Error Resume Next
    xmlhttp.SetClientCertificate cert
    If Err.Number = 0 Then Exit For
    On Error GoTo 0
Next

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "No valid certificate found"
    WScript.Quit 1
End If

xmlhttp.Send
WScript.Echo xmlhttp.responseText

Set xmlhttp = Nothing

The script tries three different certificate selection patterns. It exits the loop
when a valid certificate is found. If all attempts fail, an error message is
displayed. This approach increases the chances of finding a valid certificate.

## Source

[MSXML2.XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms760148(v=vs.84))

In this article, we have explored the SetClientCertificate method
in VBScript, covering its usage and practical applications. From basic
certificate selection to error handling and wildcard patterns, these examples
demonstrate secure client-authenticated HTTPS requests. With this knowledge, you
can enhance your scripts with robust certificate-based authentication.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).