+++
title = "PHP http_get_last_response_headers Function"
date = 2025-08-29T20:06:17.235+01:00
draft = false
description = "PHP http_get_last_response_headers function tutorial shows how to get HTTP response headers in PHP. Learn with practical examples for web scraping and API interactions."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP http_get_last_response_headers Function

last modified April 4, 2025

The PHP http_get_last_response_headers function retrieves HTTP
response headers from the last request. It's useful for debugging and
processing web responses.

## Basic Definition

http_get_last_response_headers returns an array of response
headers from the most recent HTTP request. Works with HTTP extension
functions.

Syntax: http_get_last_response_headers(): array|null.
Returns associative array of headers or null if no request was made.
Requires pecl_http extension.

## Basic Header Retrieval

This example shows how to fetch and display all response headers from
a simple HTTP request.

basic_headers.php
  

&lt;?php

declare(strict_types=1);

http_get("https://example.com");
$headers = http_get_last_response_headers();

print_r($headers);

This makes a GET request to example.com then retrieves all response
headers. The headers are printed in an array format showing keys
and values.

## Checking Specific Header

This demonstrates checking for a specific header (Content-Type) in
the response.

content_type_check.php
  

&lt;?php

declare(strict_types=1);

http_get("https://example.com");
$headers = http_get_last_response_headers();

if (isset($headers['Content-Type'])) {
    echo "Content-Type: " . $headers['Content-Type'];
} else {
    echo "Content-Type header not found";
}

This checks if the Content-Type header exists in the response.
Content-Type indicates the media type of the returned resource.

## Processing All Headers

This example processes all headers from a response in a foreach loop.

process_headers.php
  

&lt;?php

declare(strict_types=1);

http_get("https://example.com");
$headers = http_get_last_response_headers();

foreach ($headers as $name =&gt; $value) {
    echo "$name: $value\n";
}

This iterates through all response headers displaying each name-value
pair. Useful for debugging or logging complete header information.

## Checking Response Status

This shows how to verify the HTTP status code from the response headers.

status_check.php
  

&lt;?php

declare(strict_types=1);

http_get("https://example.com");
$headers = http_get_last_response_headers();

if (isset($headers['Status'])) {
    echo "Response status: " . $headers['Status'];
} else {
    echo "Status header not found";
}

The Status header contains the HTTP response status code. This helps
determine if the request was successful or encountered an error.

## Header Case Sensitivity

This example demonstrates header name case sensitivity in PHP.

header_case.php
  

&lt;?php

declare(strict_types=1);

http_get("https://example.com");
$headers = http_get_last_response_headers();

$contentType1 = $headers['Content-Type'] ?? 'Not found';
$contentType2 = $headers['content-type'] ?? 'Not found';

echo "Content-Type: $contentType1\n";
echo "content-type: $contentType2\n";

Header names are case-insensitive in HTTP but PHP preserves the original
case. This shows how to handle both cases when checking headers.

## Best Practices

- **Error Handling:** Always check if headers exist before access

- **Performance:** Make requests only when headers are needed

- **Security:** Sanitize header values before processing

- **Compatibility:** Verify pecl_http extension is installed

## Source

[PHP http_get_last_response_headers Documentation](https://www.php.net/manual/en/function.http-get-last-response-headers.php)

This tutorial covered the PHP http_get_last_response_headers
function with practical examples for HTTP header processing in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).