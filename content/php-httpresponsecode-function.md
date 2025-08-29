+++
title = "PHP http_response_code Function"
date = 2025-08-29T20:06:17.221+01:00
draft = false
description = "PHP http_response_code function tutorial shows how to set HTTP response codes in PHP. Learn http_response_code with practical examples for web development and API responses."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP http_response_code Function

last modified April 4, 2025

The PHP http_response_code function gets or sets the HTTP
response status code. It's essential for proper HTTP communication.

## Basic Definition

http_response_code sets or retrieves the HTTP response code.
It sends proper headers to the client when setting a new status code.

Syntax: http_response_code(int $response_code = null): int|bool.
Returns current code if no parameter, or true/false when setting a code.

## Setting a 404 Not Found Response

This example demonstrates setting a 404 status for missing resources.

not_found.php
  

&lt;?php

declare(strict_types=1);

http_response_code(404);
echo "The requested resource was not found";
exit;

This sets the proper 404 status before outputting content. Browsers and
crawlers understand this means the resource doesn't exist. Always exit
after setting error codes to prevent further execution.

## Getting Current Response Code

This shows how to retrieve the current HTTP response status code.

get_code.php
  

&lt;?php

declare(strict_types=1);

$code = http_response_code();
echo "Current HTTP response code: $code";

When called without parameters, it returns the current status code.
Default is 200 if no code was set. Useful for debugging and logging.

## API Error Response

This example shows proper error handling in a JSON API response.

api_error.php
  

&lt;?php

declare(strict_types=1);

header('Content-Type: application/json');
http_response_code(400);

echo json_encode([
    'error' =&gt; true,
    'message' =&gt; 'Invalid request parameters'
]);
exit;

APIs should use proper HTTP codes with error messages. This sets 400
(Bad Request) with a JSON error payload. Always set content-type header
for APIs.

## Redirect with 301 Status

This demonstrates a permanent redirect using HTTP 301 status code.

redirect.php
  

&lt;?php

declare(strict_types=1);

http_response_code(301);
header('Location: https://new.example.com/page');
exit;

301 redirects tell browsers and search engines the move is permanent.
Must include Location header. Always exit after redirect headers.

## Custom Maintenance Page

This example shows a maintenance page with 503 Service Unavailable status.

maintenance.php
  

&lt;?php

declare(strict_types=1);

http_response_code(503);
header('Retry-After: 3600'); // 1 hour
?&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Maintenance&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Down for Maintenance&lt;/h1&gt;
    &lt;p&gt;We'll be back soon!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

503 indicates temporary unavailability. Retry-After suggests when to check
back. Useful for planned maintenance windows. Can include HTML content.

## Best Practices

- **Early Execution:** Set status codes before any output

- **Termination:** Consider exiting after error codes

- **Validation:** Use standard HTTP status codes

- **Headers:** Combine with other relevant headers

- **Documentation:** Document expected codes in APIs

## Source

[PHP http_response_code Documentation](https://www.php.net/manual/en/function.http-response-code.php)

This tutorial covered the PHP http_response_code function with
practical examples for web development and API responses.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).