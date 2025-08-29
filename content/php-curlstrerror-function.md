+++
title = "PHP curl_strerror Function"
date = 2025-08-29T20:05:36.934+01:00
draft = false
description = "PHP curl_strerror function tutorial shows how to get error string descriptions for cURL error codes. Learn curl_strerror with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_strerror Function

last modified April 11, 2025

The PHP curl_strerror function returns a string description of a 
cURL error code. It's useful for translating numeric cURL error codes into 
human-readable messages. This helps in debugging cURL operations.

## Basic Definition

The curl_strerror function takes a cURL error code and returns 
its string description. It's available in PHP 5.5.0 and later versions.

Syntax: curl_strerror(int $error_code): string. The function 
accepts a cURL error code and returns the corresponding error message. 
Error codes are returned by curl_errno().

## Basic Error Handling

This example shows basic error handling with curl_strerror when a request fails.

basic_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://nonexistent.example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $error_code = curl_errno($ch);
    $error_msg = curl_strerror($error_code);
    echo "cURL Error ($error_code): $error_msg";
} else {
    echo $response;
}

curl_close($ch);

This code attempts to connect to a non-existent domain. When the request fails,
we get the error code with curl_errno and translate it to a message using
curl_strerror. This provides more context about what went wrong.

## Handling Common cURL Errors

This example demonstrates handling specific cURL error codes with descriptions.

common_errors.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

// Intentionally cause an error (empty URL)
curl_setopt($ch, CURLOPT_URL, "");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $error_code = curl_errno($ch);
    $error_msg = curl_strerror($error_code);
    
    switch ($error_code) {
        case CURLE_URL_MALFORMAT:
            echo "URL Error: $error_msg";
            break;
        case CURLE_COULDNT_RESOLVE_HOST:
            echo "Host Error: $error_msg";
            break;
        default:
            echo "Error ($error_code): $error_msg";
    }
}

curl_close($ch);

We intentionally cause a URL format error by setting an empty URL. The code
shows how to handle specific error codes with meaningful messages. This helps
create more user-friendly error handling.

## Listing All cURL Error Codes

This example lists all possible cURL error codes with their descriptions.

list_errors.php
  

&lt;?php

declare(strict_types=1);

echo "&lt;h3&gt;cURL Error Codes and Descriptions&lt;/h3&gt;";
echo "&lt;table border='1'&gt;";
echo "&lt;tr&gt;&lt;th&gt;Code&lt;/th&gt;&lt;th&gt;Description&lt;/th&gt;&lt;/tr&gt;";

for ($i = 0; $i &lt; 100; $i++) {
    $error_msg = curl_strerror($i);
    if ($error_msg !== "No error") {
        echo "&lt;tr&gt;&lt;td&gt;$i&lt;/td&gt;&lt;td&gt;$error_msg&lt;/td&gt;&lt;/tr&gt;";
    }
}

echo "&lt;/table&gt;";

This code loops through possible error codes and displays their descriptions.
It skips the "No error" message (code 0). This is useful for understanding
the range of possible cURL errors you might encounter.

## Custom Error Handler with curl_strerror

This example shows how to create a custom error handler using curl_strerror.

custom_handler.php
  

&lt;?php

declare(strict_types=1);

function handleCurlError(int $error_code): string {
    $error_msg = curl_strerror($error_code);
    $timestamp = date('Y-m-d H:i:s');
    
    return "[$timestamp] cURL Error $error_code: $error_msg";
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://invalid.url");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $error_code = curl_errno($ch);
    $log_message = handleCurlError($error_code);
    error_log($log_message);
    echo "An error occurred. Details have been logged.";
}

curl_close($ch);

We create a custom error handler function that formats error messages with
timestamps. The handler uses curl_strerror to get the error description.
This pattern is useful for consistent error logging across an application.

## Comparing curl_error and curl_strerror

This example demonstrates the difference between curl_error and curl_strerror.

compare_errors.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://nonexistent.example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $error_code = curl_errno($ch);
    $error_str = curl_strerror($error_code);
    $error_msg = curl_error($ch);
    
    echo "&lt;p&gt;Error Code: $error_code&lt;/p&gt;";
    echo "&lt;p&gt;curl_strerror: $error_str&lt;/p&gt;";
    echo "&lt;p&gt;curl_error: $error_msg&lt;/p&gt;";
}

curl_close($ch);

This code shows the difference between curl_strerror (generic description)
and curl_error (specific error message). curl_strerror provides consistent
messages, while curl_error may include additional context from the operation.

## Best Practices

- **Always check errors:** Verify curl_exec return value.

- **Use both functions:** Combine curl_strerror and curl_error.

- **Log errors:** Include error codes and descriptions in logs.

- **Handle specific codes:** Create special cases for common errors.

- **Document errors:** Note possible errors in your API docs.

## Source

[PHP curl_strerror Documentation](https://www.php.net/manual/en/function.curl-strerror.php)

This tutorial covered the PHP curl_strerror function with practical
examples showing how to handle cURL errors effectively in your applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).