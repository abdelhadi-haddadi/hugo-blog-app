+++
title = "PHP header_remove Function"
date = 2025-08-29T20:06:16.113+01:00
draft = false
description = "PHP header_remove function tutorial shows how to remove HTTP headers in PHP. Learn header_remove with practical examples for header manipulation."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP header_remove Function

last modified April 4, 2025

The PHP header_remove function removes previously set HTTP headers.
It's useful for modifying response headers before sending to clients.

## Basic Definition

header_remove removes HTTP headers that were set with header().
It can remove specific headers or all headers if no name is provided.

Syntax: header_remove(?string $name = null): void.
Returns nothing. Must be called before any output is sent to browser.

## Removing a Specific Header

This example shows how to remove a specific HTTP header from the response.

remove_specific_header.php
  

&lt;?php

declare(strict_types=1);

header('X-Powered-By: PHP/8.1');
header('X-Custom-Header: Test');

// Remove only the X-Powered-By header
header_remove('X-Powered-By');

// Output remaining headers
header('Content-Type: text/plain');
echo "Headers after removal:\n";
print_r(headers_list());

This code first sets two headers, then removes the X-Powered-By header.
The remaining headers are displayed to show the removal was successful.

## Removing All Headers

This demonstrates removing all previously set HTTP headers at once.

remove_all_headers.php
  

&lt;?php

declare(strict_types=1);

header('X-Powered-By: PHP/8.1');
header('X-Custom-Header: Test');
header('Cache-Control: no-cache');

// Remove all headers
header_remove();

// Output remaining headers
header('Content-Type: text/plain');
echo "Headers after removal:\n";
print_r(headers_list());

This example sets multiple headers then removes them all with one call.
Only headers set after removal will appear in the final response.

## Conditional Header Removal

This shows how to conditionally remove headers based on application logic.

conditional_removal.php
  

&lt;?php

declare(strict_types=1);

$isProduction = false;

header('X-Debug-Info: Enabled');
header('X-Environment: Development');

if ($isProduction) {
    header_remove('X-Debug-Info');
    header_remove('X-Environment');
    header('X-Environment: Production');
}

header('Content-Type: text/plain');
echo "Current headers:\n";
print_r(headers_list());

This removes debug headers in production while keeping them in development.
Conditional removal helps maintain different header sets per environment.

## Removing Content-Type Header

This example demonstrates removing and replacing the Content-Type header.

content_type_removal.php
  

&lt;?php

declare(strict_types=1);

header('Content-Type: text/html');

// Remove the existing Content-Type
header_remove('Content-Type');

// Set a new Content-Type
header('Content-Type: application/json');

echo json_encode(['status' =&gt; 'success', 'message' =&gt; 'Content-Type changed']);

This shows how to completely replace a header by first removing it.
The Content-Type header is special as it affects how browsers interpret content.

## Error Handling with Header Removal

This example shows proper error handling when working with header removal.

error_handling.php
  

&lt;?php

declare(strict_types=1);

// Check if headers were already sent
if (headers_sent()) {
    die('Cannot remove headers - output already started');
}

try {
    header('X-Test-Header: Value');
    header_remove('X-Test-Header');
    
    if (in_array('X-Test-Header', array_map('strtolower', array_keys(headers_list())))) {
        throw new Exception('Header removal failed');
    }
    
    echo "Header successfully removed";
} catch (Exception $e) {
    error_log("Header error: " . $e-&gt;getMessage());
    echo "An error occurred while processing headers";
}

This demonstrates checking for headers_sent() and verifying removal success.
Proper error handling ensures robust header manipulation in production.

## Best Practices

- **Timing:** Call before any output to avoid headers_sent errors

- **Case Sensitivity:** Header names are case-insensitive

- **Verification:** Check headers_list() after removal

- **Performance:** Minimize header manipulation when possible

## Source

[PHP header_remove Documentation](https://www.php.net/manual/en/function.header-remove.php)

This tutorial covered the PHP header_remove function with practical
examples for HTTP header manipulation in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).