+++
title = "Linux curl Command"
date = 2025-08-29T20:03:26.168+01:00
draft = false
description = "Linux tutorial on the curl command, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux curl Command

last modified February 25, 2025

The curl command in Linux is a powerful tool for transferring data
to or from a server using various protocols, such as HTTP, HTTPS, FTP, and more.
It is widely used for downloading files, testing APIs, and automating web
requests. This tutorial covers basic and advanced usage of curl
with practical examples.

curl supports a wide range of features, including authentication,
file uploads, and custom headers, making it a versatile tool for developers and
system administrators.

## Basic Usage

This example demonstrates how to download a file from a URL using curl.

basic_usage.sh
  

curl -O https://example.com/file.txt

The -O option saves the file with its original name.

## Downloading with a Different Name

This example shows how to download a file and save it with a custom name.

custom_name.sh
  

curl -o custom_name.txt https://example.com/file.txt

The -o option allows you to specify the output filename.

## Following Redirects

This example demonstrates how to follow redirects using the -L
option.

follow_redirects.sh
  

curl -L https://example.com/redirect

The -L option ensures that curl follows any redirects
to the final destination.

## Using Custom Headers

This example shows how to send custom HTTP headers with a curl
request.

custom_headers.sh
  

curl -H "Authorization: Bearer token" -H "Content-Type: application/json" https://example.com/api

The -H option allows you to add custom headers to the request.

## Uploading Files

This example demonstrates how to upload a file using curl.

upload_file.sh
  

curl -F "file=@/path/to/file.txt" https://example.com/upload

The -F option is used to upload files as form data.

## Testing APIs

This example shows how to test a REST API using curl.

test_api.sh
  

curl -X POST -d '{"key":"value"}' -H "Content-Type: application/json" https://example.com/api

The -X option specifies the HTTP method, and -d sends
data in the request body.

## Advanced: Using Cookies

This example demonstrates how to use cookies with curl.

use_cookies.sh
  

curl -b "cookie_name=cookie_value" https://example.com

The -b option sends cookies with the request.

## Best Practices for curl

- **Use -L for Redirects:** Always use -L to follow redirects when necessary.

- **Secure Transfers:** Use HTTPS instead of HTTP for secure data transfer.

- **Custom Headers:** Use -H to add custom headers for API requests.

- **Test APIs:** Use -X and -d to test REST APIs with different methods and data.

## Source

[curl Manual](https://curl.se/docs/manual.html)

In this article, we have explored various examples of using the curl
command for data transfer, including downloading files, uploading files, testing
APIs, and using custom headers and cookies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).