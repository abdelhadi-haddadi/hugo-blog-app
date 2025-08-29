+++
title = "PHP header Function"
date = 2025-08-29T20:06:15.023+01:00
draft = false
description = "PHP header function tutorial shows how to manipulate HTTP headers in PHP. Learn header with practical examples for redirects, caching, and content type setting."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP header Function

last modified April 4, 2025

The PHP header function sends raw HTTP headers to the client.
It must be called before any actual output is sent to the browser.

## Basic Definition

header sends HTTP headers to the browser before any content.
Headers control caching, redirects, content types, and more.

Syntax: header(string $header, bool $replace = true, int $response_code = 0): void.
The function must be called before any output is generated.

## Basic Redirect Example

This example demonstrates a simple page redirect using the header function.

redirect.php
  

&lt;?php

declare(strict_types=1);

header("Location: https://www.example.com/newpage.php");
exit;

This sends a 302 redirect header to the browser. The exit statement prevents
further script execution. Always include exit after Location headers.

## Setting Content Type

This shows how to set different content types for various file formats.

content_type.php
  

&lt;?php

declare(strict_types=1);

// For JSON response
header('Content-Type: application/json');

// For plain text
// header('Content-Type: text/plain');

// For XML
// header('Content-Type: application/xml');

echo json_encode(['status' =&gt; 'success', 'message' =&gt; 'Data loaded']);

Setting proper content types ensures browsers interpret responses correctly.
Different APIs require specific content types for proper functionality.

## Forcing File Download

This example forces the browser to download a file instead of displaying it.

force_download.php
  

&lt;?php

declare(strict_types=1);

$filename = 'report.pdf';
$filepath = '/path/to/files/' . $filename;

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
header('Content-Length: ' . filesize($filepath));

readfile($filepath);
exit;

This sends headers to trigger a download dialog. The Content-Disposition header
specifies the filename. Always include Content-Length for large files.

## Setting Cache Control

This demonstrates how to control browser caching with HTTP headers.

cache_control.php
  

&lt;?php

declare(strict_types=1);

// Prevent caching
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Or set future expiration
// header("Cache-Control: public, max-age=86400");
// header("Expires: " . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');

echo "This content has specific caching rules applied";

Cache headers control how browsers store responses. Different scenarios require
different caching strategies for optimal performance.

## Setting HTTP Status Codes

This example shows how to send different HTTP status codes.

status_codes.php
  

&lt;?php

declare(strict_types=1);

// 404 Not Found
header("HTTP/1.0 404 Not Found");

// 500 Internal Server Error
// header("HTTP/1.0 500 Internal Server Error");

// 301 Moved Permanently
// header("HTTP/1.1 301 Moved Permanently");
// header("Location: /new-url.php");

echo "Error: Page not found";
exit;

HTTP status codes communicate request results to clients. Proper status codes
help with SEO and API response handling.

## Best Practices

- **Output Buffering:** Use ob_start() to prevent header errors

- **Early Execution:** Call header() before any output

- **Exit After Redirect:** Always exit after Location headers

- **Content-Type:** Always set appropriate content types

- **Status Codes:** Use correct HTTP status codes

## Source

[PHP header Documentation](https://www.php.net/manual/en/function.header.php)

This tutorial covered the PHP header function with practical
examples for HTTP header manipulation in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).