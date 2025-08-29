+++
title = "VBScript SetCredentials Method"
date = 2025-08-29T20:15:37.748+01:00
draft = false
description = "Learn about VBScript SetCredentials method, including authentication, security operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetCredentials Method

last modified April 9, 2025

The SetCredentials method in VBScript is used to set authentication
credentials for HTTP requests. It allows scripts to authenticate with web
services or protected resources. This method is part of the
MSXML2.XMLHTTP or WinHttp.WinHttpRequest objects.

SetCredentials specifies username, password, and authentication
type. It supports various authentication schemes like Basic, NTLM, and Digest.
This tutorial covers SetCredentials with practical examples to
demonstrate its usage in different scenarios.

## SetCredentials Method Overview

The SetCredentials method takes three parameters: username,
password, and authentication flags. It must be called before sending the HTTP
request. The method stores credentials for subsequent authentication challenges.

Authentication flags specify the authentication scheme to use. Common flags
include 0 (Basic), 1 (NTLM), and 2 (Digest). The method doesn't validate
credentials immediately. Authentication occurs when the server challenges the
request.

## Basic Authentication Example

This example demonstrates using SetCredentials with Basic
authentication. Basic authentication sends credentials in base64-encoded form.
It's suitable for simple authentication needs over HTTPS.

basic_auth.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/protected", False
http.SetCredentials "user1", "pass123", 0
http.Send

WScript.Echo http.Status &amp; " " &amp; http.StatusText
Set http = Nothing

The script creates an XMLHTTP object and sets Basic authentication (flag 0).
Credentials are sent when the server requests them. The status code indicates
whether authentication succeeded. Always use HTTPS with Basic authentication.

## NTLM Authentication Example

This example shows SetCredentials with NTLM authentication. NTLM
is more secure than Basic as it doesn't send credentials directly. It's commonly
used in Windows environments.

ntlm_auth.vbs
  

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "GET", "http://intranet/resource", False
http.SetCredentials "DOMAIN\user1", "p@ssw0rd", 1
http.Send

WScript.Echo http.ResponseText
Set http = Nothing

The script uses WinHttpRequest with NTLM authentication (flag 1). Note the
domain\username format for domain accounts. NTLM is suitable for internal
network resources. The response contains the protected resource content.

## Preemptive Authentication

This example demonstrates preemptive authentication by setting credentials
before any challenge. Some servers require credentials with the initial request.
The example uses Basic authentication for clarity.

preemptive_auth.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/data", False
http.SetRequestHeader "Authorization", "Basic " &amp; _
    Base64Encode("admin:secret")
http.Send

WScript.Echo http.ResponseText

Function Base64Encode(text)
    Set encoder = CreateObject("MSXML2.DOMDocument").createElement("b64")
    encoder.dataType = "bin.base64"
    encoder.nodeTypedValue = Stream_StringToBinary(text)
    Base64Encode = encoder.text
End Function

Set http = Nothing

Instead of SetCredentials, this manually creates the Basic auth
header. The Base64Encode function converts credentials to base64.
This approach sends credentials immediately rather than waiting for a challenge.

## Multiple Authentication Attempts

This example shows handling multiple authentication attempts with different
credential sets. It demonstrates how to retry requests with new credentials
when authentication fails.

multi_auth.vbs
  

credentials = Array(Array("user1", "pass1"), Array("user2", "pass2"))

For Each cred In credentials
    Set http = CreateObject("MSXML2.XMLHTTP")
    http.Open "GET", "https://secure.example.com", False
    http.SetCredentials cred(0), cred(1), 0
    http.Send
    
    If http.Status = 200 Then
        WScript.Echo "Success with " &amp; cred(0)
        Exit For
    End If
    Set http = Nothing
Next

If http.Status &lt;&gt; 200 Then
    WScript.Echo "All authentication attempts failed"
End If

The script tries multiple credential pairs until success or exhaustion. Each
attempt creates a new request object. The loop exits on successful
authentication (status 200). This pattern is useful for credential rotation.

## Digest Authentication Example

This example demonstrates Digest authentication, which is more secure than
Basic. Digest authentication doesn't send credentials in clear text. It uses a
challenge-response mechanism.

digest_auth.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://secure.example.org/api", False
http.SetCredentials "api_user", "securePass123", 2
http.Send

If http.Status = 200 Then
    WScript.Echo http.ResponseText
Else
    WScript.Echo "Authentication failed: " &amp; http.Status
End If

Set http = Nothing

The script uses Digest authentication (flag 2) for secure credential exchange.
Digest is preferred over Basic when available. The response is only processed
after successful authentication. Status codes indicate success or failure.

## Source

[MSXML XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms760153(v=vs.84))

In this article, we have explored the SetCredentials method in
VBScript, covering its usage and practical applications. From Basic to Digest
authentication, these examples demonstrate secure credential handling. With this
knowledge, you can enhance your scripts with proper authentication mechanisms.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).