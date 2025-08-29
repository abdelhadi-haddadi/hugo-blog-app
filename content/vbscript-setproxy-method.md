+++
title = "VBScript SetProxy Method"
date = 2025-08-29T20:15:38.851+01:00
draft = false
description = "Learn about VBScript SetProxy method, including proxy configuration, web requests, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetProxy Method

last modified April 9, 2025

The SetProxy method in VBScript is part of the MSXML2.XMLHTTP
object. It configures proxy server settings for HTTP requests. This method allows
scripts to route web requests through intermediary servers. It's essential for
networking scripts in corporate or restricted environments.

SetProxy supports different proxy configurations including bypass
lists. It enables scripts to work behind firewalls or access restricted
resources. This tutorial covers SetProxy with practical examples to
demonstrate its usage in various scenarios.

## SetProxy Method Overview

The SetProxy method takes parameters for proxy server and bypass
settings. It configures how the XMLHTTP object routes HTTP requests. The method
is available through the MSXML2.XMLHTTP object in VBScript.

Key features include proxy server specification and bypass list configuration.
It supports both authenticated and anonymous proxy connections.
SetProxy is crucial for scripts running in proxy-required
environments. Understanding this method helps create robust web-enabled scripts.

## Basic Proxy Configuration

This example demonstrates the simplest use of SetProxy to configure
a proxy server. It shows how to route all HTTP requests through a specified
proxy. The proxy server address and port are provided as parameters.

basic_proxy.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.SetProxy 2, "proxy.example.com:8080", "&lt;local&gt;"
http.Open "GET", "http://example.com", False
http.Send

WScript.Echo http.responseText

Set http = Nothing

The script creates an XMLHTTP object and configures it to use a proxy server.
The first parameter (2) specifies to use the provided proxy settings. The second
parameter is the proxy address and port. The third parameter is the bypass list.

## Proxy with Bypass List

This example shows how to configure a proxy with a bypass list. The bypass list
specifies addresses that shouldn't use the proxy. This is useful for local
network resources that should be accessed directly.

proxy_bypass.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.SetProxy 2, "corporate-proxy:3128", "*.local;192.168.*"
http.Open "GET", "http://example.com", False
http.Send

WScript.Echo "Status: " &amp; http.status &amp; " " &amp; http.statusText

Set http = Nothing

The script configures a corporate proxy but bypasses it for .local domains and
192.168.* addresses. The bypass list uses semicolons to separate patterns. This
configuration is common in enterprise environments with internal resources.

## Using System Proxy Settings

This example demonstrates how to use the system's default proxy settings. The
script automatically inherits the proxy configuration from Internet Explorer
settings. This is useful when the script should follow corporate policies.

system_proxy.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.SetProxy 1 ' Use system proxy settings
http.Open "GET", "http://example.com/api/data", False
http.Send

If http.status = 200 Then
    WScript.Echo "Request successful"
End If

Set http = Nothing

The script uses parameter value 1 to indicate system proxy settings should be
used. No additional proxy configuration is needed. This approach ensures the
script follows the same proxy rules as other applications on the system.

## Direct Connection (No Proxy)

This example shows how to configure the XMLHTTP object to bypass all proxies.
The script will connect directly to target servers. This is useful when proxies
aren't required or when testing direct connections.

no_proxy.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.SetProxy 0 ' No proxy
http.Open "GET", "http://example.com", False
http.Send

WScript.Echo "Response length: " &amp; Len(http.responseText)

Set http = Nothing

The script uses parameter value 0 to indicate no proxy should be used. All
connections will be made directly to the target servers. This configuration is
typical for scripts running in open network environments.

## Authenticated Proxy Connection

This example demonstrates proxy configuration with authentication. While
SetProxy doesn't handle credentials directly, it works with the
proxy server. The example shows the complete flow including authentication.

auth_proxy.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.SetProxy 2, "auth-proxy:8080"
http.Open "GET", "http://example.com", False
http.setRequestHeader "Proxy-Authorization", "Basic " &amp; Base64Encode("user:pass")
http.Send

If http.status = 407 Then
    WScript.Echo "Proxy authentication required"
Else
    WScript.Echo http.responseText
End If

Set http = Nothing

Function Base64Encode(text)
    Set encoder = CreateObject("MSXML2.DomDocument").createElement("b64")
    encoder.dataType = "bin.base64"
    encoder.nodeTypedValue = Stream_StringToBinary(text)
    Base64Encode = encoder.text
End Function

Function Stream_StringToBinary(text)
    Set stream = CreateObject("ADODB.Stream")
    stream.Type = 2 ' Text
    stream.Open
    stream.WriteText text
    stream.Position = 0
    stream.Type = 1 ' Binary
    stream.Position = 0
    Stream_StringToBinary = stream.Read
End Function

The script configures an authenticated proxy and handles the credentials. The
proxy credentials are sent in the Proxy-Authorization header. Helper functions
encode the credentials in Base64 format. This approach works with basic
authentication proxies.

## Source

[MSXML2.XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760148(v=vs.85))

In this article, we have explored the SetProxy method in VBScript,
covering its usage and practical applications. From basic proxy configuration to
authenticated connections, these examples demonstrate flexible HTTP request
routing. With this knowledge, you can enhance your web-enabled scripts with
robust proxy support.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).