+++
title = "PHP headers_sent Function"
date = 2025-08-29T20:06:15.009+01:00
draft = false
description = "PHP headers_sent function tutorial shows how to check if headers were sent in PHP. Learn headers_sent with practical examples for header management and debugging."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP headers_sent Function

last modified April 4, 2025

The PHP headers_sent function checks if HTTP headers were sent.
It helps prevent header-related errors in web applications.

## Basic Definition

headers_sent determines if headers were already sent to client.
Headers must be sent before any output for proper HTTP protocol.

Syntax: headers_sent(string &amp;$file = null, int &amp;$line = null): bool.
Returns true if headers sent, false otherwise. Optional params show where.

## Basic Header Check

This example shows the simplest usage of headers_sent.

basic_check.php
  

&lt;?php

declare(strict_types=1);

if (!headers_sent()) {
    header('Location: https://example.com');
    exit;
}

echo "Headers already sent, cannot redirect";

This checks if headers were sent before attempting a redirect.
If headers were sent, it shows an error message instead.

## Finding Output Location

This demonstrates using headers_sent to find where output started.

find_output.php
  

&lt;?php

declare(strict_types=1);

echo "Some output before headers\n";

if (headers_sent($file, $line)) {
    echo "Headers sent in $file on line $line\n";
}

header('Content-Type: text/plain');

This shows where premature output occurred. The variables capture file and line.
This helps debug header-related issues in larger applications.

## Conditional Header Setting

This example shows how to conditionally set headers based on headers_sent.

conditional_headers.php
  

&lt;?php

declare(strict_types=1);

function safeHeader(string $header): bool {
    if (!headers_sent()) {
        header($header);
        return true;
    }
    return false;
}

safeHeader('X-Custom-Header: Value');

This wrapper function safely sets headers only if possible. It returns success
status. This pattern prevents header-related warnings in applications.

## Output Buffering with headers_sent

This shows how output buffering interacts with headers_sent.

output_buffering.php
  

&lt;?php

declare(strict_types=1);

ob_start();

echo "Content before headers\n";

if (!headers_sent()) {
    header('Content-Type: text/html');
    echo "Headers set successfully\n";
}

ob_end_flush();

Output buffering delays sending headers until buffer flush. This allows setting
headers even after output. The buffer collects output until processed.

## Error Handling with headers_sent

This demonstrates proper error handling when headers are already sent.

error_handling.php
  

&lt;?php

declare(strict_types=1);

echo "Accidental early output\n";

try {
    if (headers_sent($file, $line)) {
        throw new RuntimeException(
            "Headers already sent in $file on line $line"
        );
    }
    
    header('Cache-Control: no-cache');
} catch (RuntimeException $e) {
    error_log($e-&gt;getMessage());
    // Fallback behavior
}

This shows structured error handling for header issues. It logs the error and
provides fallback behavior. This maintains application stability.

## Best Practices

- **Early Checks:** Verify headers_sent before setting headers

- **Output Control:** Use output buffering when needed

- **Error Handling:** Implement graceful fallbacks

- **Debugging:** Use file/line parameters to find issues

- **Structure:** Separate output from business logic

## Source

[PHP headers_sent Documentation](https://www.php.net/manual/en/function.headers-sent.php)

This tutorial covered the PHP headers_sent function with practical
examples for header management and debugging in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).