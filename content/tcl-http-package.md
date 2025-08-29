+++
title = "Tcl http Package"
date = 2025-08-29T20:13:02.414+01:00
draft = false
description = "Tcl http package tutorial shows how to make HTTP requests in Tcl. Learn http with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl http Package

last modified April 21, 2025

The Tcl http package provides functionality for making HTTP
requests. It allows Tcl programs to interact with web servers and APIs.
The package supports GET, POST, and other HTTP methods.

## Basic Definition

The http package is part of Tcl's standard library. It must be
loaded with package require http before use. The package provides
both synchronous and asynchronous request capabilities.

Main commands include ::http::geturl for making requests and
::http::data for accessing response data. The package handles
headers, timeouts, and other HTTP features.

## Simple GET Request

This example demonstrates how to make a basic GET request to fetch a web page.

get_request.tcl
  

package require http

set url "http://example.com"
set token [::http::geturl $url]
set data [::http::data $token]
puts "Response data length: [string length $data]"
::http::cleanup $token

This code fetches the content of example.com. The geturl command
returns a token used to access response data. Always call cleanup
to free resources.

## Handling Response Headers

This example shows how to access HTTP response headers from a request.

response_headers.tcl
  

package require http

set token [::http::geturl "http://example.com"]
set headers [::http::meta $token]

# Print headers (dictionary format)
puts "Headers:"
foreach {key value} $headers {
    puts "$key: $value"
}

::http::cleanup $token

The meta command returns the response headers as a dictionary,
which consists of key-value pairs. We iterate of the pairs with foreach and
display details like content type, server information, and caching directives.

## POST Request with Data

This example demonstrates sending a POST request with form data.

post_request.tcl
  

package require http

set url "http://httpbin.org/post"
set query [::http::formatQuery username testuser password s3cr3t]
set token [::http::geturl $url -method POST -query $query]
puts [::http::data $token]
::http::cleanup $token

formatQuery encodes form data for POST requests. The -method
option specifies POST, and -query provides the data. httpbin.org
echoes back the received data.

## Handling Errors

This example shows proper error handling for HTTP requests.

error_handling.tcl
  

package require http

set url "http://nonexistent.example.com"
if {[catch {::http::geturl $url -timeout 3000} token]} {
    puts "Error: $token"
} else {
    if {[::http::ncode $token] != 200} {
        puts "HTTP error: [::http::code $token]"
    }
    ::http::cleanup $token
}

catch handles connection errors, while ncode checks
the HTTP status code. The -timeout option prevents hanging on
unresponsive servers.

## Asynchronous Request

This example demonstrates making an asynchronous HTTP request.

async_request.tcl
  

package require http

proc callback {token} {
    set data [::http::data $token]
    puts "Received [string length $data] bytes"
    ::http::cleanup $token
}

set url "http://example.com"
set token [::http::geturl $url -command callback]
puts "Request sent, waiting for response..."
vwait forever

The -command option specifies a callback to handle the response
asynchronously. vwait keeps the program running until the
callback completes. This avoids blocking the main thread.

## Setting Request Headers

This example shows how to set custom HTTP headers for a request.

request_headers.tcl
  

package require http

set url "http://httpbin.org/headers"
set headers [list User-Agent "TclHTTPClient/1.0" Accept "application/json"]
set token [::http::geturl $url -headers $headers]
puts [::http::data $token]
::http::cleanup $token

The -headers option takes a list of header-value pairs.
httpbin.org returns the received headers in its response. This is useful for
API authentication and content negotiation.

## HTTPS Request

This example demonstrates making a secure HTTPS request.

https_request.tcl
  

package require http
package require tls

::http::register https 443 ::tls::socket
set token [::http::geturl "https://example.com"]
puts "Status: [::http::status $token]"
puts "Data length: [string length [::http::data $token]]"
::http::cleanup $token

HTTPS requires the tls package. http::register sets
up the TLS handler for HTTPS connections. The rest works like regular HTTP
requests but encrypted.

## Best Practices

- **Cleanup:** Always call http::cleanup after requests.

- **Timeouts:** Set reasonable timeouts for production code.

- **Error Handling:** Check status codes and handle errors.

- **HTTPS:** Use HTTPS for sensitive data and register TLS.

- **Async:** Consider async requests for GUI applications.

This tutorial covered the Tcl http package with practical examples
showing various HTTP operations. The package provides comprehensive web client
functionality.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).