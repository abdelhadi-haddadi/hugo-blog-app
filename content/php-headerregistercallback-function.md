+++
title = "PHP header_register_callback Function"
date = 2025-08-29T20:06:16.124+01:00
draft = false
description = "PHP header_register_callback function tutorial shows how to register header callbacks in PHP. Learn header manipulation with practical examples."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP header_register_callback Function

last modified April 4, 2025

The PHP header_register_callback function registers a callback
that will be called when headers are sent. It's useful for header manipulation.

## Basic Definition

header_register_callback registers a function to be called
just before PHP starts sending output. The callback can modify headers.

Syntax: header_register_callback(callable $callback): bool.
Returns true on success, false on failure. Requires output buffering.

## Basic Header Callback Example

This example shows a simple callback that adds a custom header.

basic_callback.php
  

&lt;?php

declare(strict_types=1);

function headerCallback() {
    header('X-Custom-Header: MyValue');
}

header_register_callback('headerCallback');

echo "Content with custom header";

The callback adds an X-Custom-Header before output starts. This demonstrates
the basic usage of header_register_callback. The callback runs automatically.

## Conditional Header Modification

This example conditionally modifies headers based on application logic.

conditional_headers.php
  

&lt;?php

declare(strict_types=1);

function conditionalHeader() {
    if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1') {
        header('X-Debug-Mode: enabled');
    }
}

header_register_callback('conditionalHeader');

echo "Content with conditional headers";

The callback checks the client IP and adds a debug header for localhost.
This shows how to make dynamic header decisions before output begins.

## Multiple Callbacks Example

This demonstrates registering multiple callbacks that execute in order.

multiple_callbacks.php
  

&lt;?php

declare(strict_types=1);

function firstCallback() {
    header('X-First: 1');
}

function secondCallback() {
    header('X-Second: 2');
}

header_register_callback('firstCallback');
header_register_callback('secondCallback');

echo "Content with multiple callbacks";

Callbacks execute in registration order. This example adds two custom headers.
The order of registration determines the execution sequence of callbacks.

## Header Validation Callback

This example validates headers before they're sent using a callback.

header_validation.php
  

&lt;?php

declare(strict_types=1);

function validateHeaders() {
    $headers = headers_list();
    if (!in_array('Content-Type: text/html', $headers)) {
        header('Content-Type: text/html');
    }
}

header_register_callback('validateHeaders');

echo "&lt;html&gt;&lt;body&gt;Validated content&lt;/body&gt;&lt;/html&gt;";

The callback checks existing headers and adds missing ones. This ensures
required headers are present before output starts. Useful for validation.

## Output Buffering with Callback

This shows how output buffering works with header_register_callback.

output_buffering.php
  

&lt;?php

declare(strict_types=1);

ob_start();

function bufferingCallback() {
    header('X-Buffered: yes');
    header_remove('X-Powered-By');
}

header_register_callback('bufferingCallback');

echo "Buffered content with modified headers";

ob_end_flush();

Output buffering must be active for header callbacks to work. This example
shows buffering setup and header modification. Callbacks run before flush.

## Best Practices

- **Output Buffering:** Always use output buffering with this function

- **Single Responsibility:** Keep callbacks focused on one task

- **Order Matters:** Register callbacks in execution order needed

- **Error Handling:** Handle potential callback errors gracefully

## Source

[PHP header_register_callback Documentation](https://www.php.net/manual/en/function.header-register-callback.php)

This tutorial covered the PHP header_register_callback function
with practical examples for header manipulation in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).