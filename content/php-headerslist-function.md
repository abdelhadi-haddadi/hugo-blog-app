+++
title = "PHP headers_list Function"
date = 2025-08-29T20:06:15.005+01:00
draft = false
description = "PHP headers_list function tutorial shows how to retrieve HTTP headers in PHP. Learn headers_list with practical examples for header inspection and debugging."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP headers_list Function

last modified April 4, 2025

The PHP headers_list function retrieves the list of response headers
to be sent to the client. It's useful for debugging and header inspection.

## Basic Definition

headers_list returns an array of headers prepared for sending.
These include both PHP-generated and manually set headers using header().

Syntax: headers_list(): array. Returns a numerically indexed array.
Headers are only available after output buffering starts or before output.

## Basic Header Inspection

This example shows how to retrieve and display all response headers.

basic_headers.php
  

&lt;?php

declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('X-Powered-By: PHP/8.1');

$headers = headers_list();
print_r($headers);

This displays all headers set for the response, including Content-Type.
The output shows both system-generated and custom headers.

## Checking for Specific Headers

This demonstrates how to check if a specific header has been set.

check_specific_header.php
  

&lt;?php

declare(strict_types=1);

header('Cache-Control: no-cache');

function has_header(string $name): bool {
    foreach (headers_list() as $header) {
        if (stripos($header, $name) === 0) {
            return true;
        }
    }
    return false;
}

echo has_header('Cache-Control') ? 'Cache header set' : 'No cache header';

This checks if Cache-Control header exists in the response headers.
The function searches for headers starting with the specified name.

## Header Modification Detection

This example shows how to detect if headers have been modified.

header_modification.php
  

&lt;?php

declare(strict_types=1);

$initial_headers = headers_list();

header('X-Custom-Header: Value');
header_remove('X-Powered-By');

$current_headers = headers_list();
$modified = $initial_headers != $current_headers;

echo $modified ? 'Headers changed' : 'Headers unchanged';

This compares headers before and after modifications to detect changes.
Useful for middleware that needs to verify header modifications.

## Content-Type Validation

This shows how to validate the Content-Type header before output.

content_type_check.php
  

&lt;?php

declare(strict_types=1);

function validate_content_type(string $expected): bool {
    foreach (headers_list() as $header) {
        if (stripos($header, 'Content-Type:') === 0) {
            return stripos($header, $expected) !== false;
        }
    }
    return false;
}

header('Content-Type: application/json');
echo validate_content_type('json') ? 'Valid' : 'Invalid';

This ensures the response Content-Type matches expectations before sending.
Particularly useful in API implementations requiring specific formats.

## Header Debugging Tool

This example creates a simple header debugging tool for development.

header_debugger.php
  

&lt;?php

declare(strict_types=1);

header('X-Debug: Enabled');
header('Cache-Control: no-store');

function debug_headers(): string {
    $output = "&lt;h3&gt;Response Headers&lt;/h3&gt;&lt;ul&gt;";
    foreach (headers_list() as $header) {
        $output .= "&lt;li&gt;" . htmlspecialchars($header) . "&lt;/li&gt;";
    }
    return $output . "&lt;/ul&gt;";
}

echo debug_headers();

This creates an HTML list of all response headers for debugging purposes.
Helpful during development to verify header configuration.

## Best Practices

- **Timing:** Call before any output to get complete headers

- **Performance:** Avoid excessive calls in production

- **Security:** Don't expose sensitive headers to end users

- **Testing:** Use for unit testing header configurations

## Source

[PHP headers_list Documentation](https://www.php.net/manual/en/function.headers-list.php)

This tutorial covered the PHP headers_list function with practical
examples for header inspection, validation, and debugging in PHP applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).