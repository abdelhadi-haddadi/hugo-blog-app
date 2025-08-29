+++
title = "PHP curl_close Function"
date = 2025-08-29T20:05:25.760+01:00
draft = false
description = "PHP curl_close function tutorial shows how to properly close cURL sessions in PHP. Learn curl_close with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_close Function

last modified April 11, 2025

The PHP curl_close function closes a cURL session and frees all
resources. It's essential for proper resource management when working with
cURL in PHP. Always close cURL handles after completing your requests.

## Basic Definition

The curl_close function terminates a cURL session and frees all
resources associated with it. The function takes a cURL handle as its only
parameter and returns no value.

Syntax: curl_close(CurlHandle $handle): void. The handle must be
a valid cURL handle created with curl_init(). After closing, the
handle cannot be reused for new requests.

## Basic cURL Request with Close

This example demonstrates the proper way to close a cURL handle after a
simple GET request.

basic_close.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo "Request successful";
}

curl_close($ch); // Always close the handle

This code shows a basic cURL request with proper cleanup. The handle is
closed after we finish using it, even if an error occurs. This prevents
resource leaks in your application.

## Closing in a Function

This example shows how to properly handle cURL cleanup when using functions.

function_close.php
  

&lt;?php

declare(strict_types=1);

function fetchData(string $url): ?string {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $result = curl_exec($ch);
    
    if ($result === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new Exception("cURL error: $error");
    }
    
    curl_close($ch);
    return $result;
}

try {
    $data = fetchData("https://api.example.com/data");
    echo $data;
} catch (Exception $e) {
    echo $e-&gt;getMessage();
}

The function creates a cURL handle, executes the request, and ensures the
handle is closed before returning. Even if an error occurs, the handle is
properly cleaned up. This pattern is recommended for reusable functions.

## Closing Multiple Handles

This example demonstrates handling multiple cURL handles and closing them.

multiple_close.php
  

&lt;?php

declare(strict_types=1);

$handles = [];
$urls = [
    "https://api.example.com/users/1",
    "https://api.example.com/posts/1",
    "https://api.example.com/comments/1"
];

foreach ($urls as $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $handles[] = $ch;
}

$multiHandle = curl_multi_init();

foreach ($handles as $handle) {
    curl_multi_add_handle($multiHandle, $handle);
}

do {
    curl_multi_exec($multiHandle, $running);
} while ($running &gt; 0);

foreach ($handles as $handle) {
    curl_multi_remove_handle($multiHandle, $handle);
    curl_close($handle);
}

curl_multi_close($multiHandle);

This code handles multiple concurrent cURL requests. Each individual handle
must be closed after use, along with the multi handle. The example shows
proper cleanup in a more complex scenario.

## Closing with Error Handling

This example demonstrates proper error handling with resource cleanup.

error_handling_close.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

try {
    curl_setopt($ch, CURLOPT_URL, "https://invalid.example");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
    $response = curl_exec($ch);
    
    if ($response === false) {
        throw new RuntimeException(
            "cURL error: " . curl_error($ch)
        );
    }
    
    echo $response;
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
} finally {
    if (is_resource($ch) || $ch instanceof CurlHandle) {
        curl_close($ch);
    }
}

The example uses try-catch-finally to ensure the cURL handle is always
closed, even if an exception occurs. The finally block checks if the
handle is valid before closing it. This is a robust error handling pattern.

## Closing in Object-Oriented Code

This example shows proper cURL handle cleanup in an object-oriented context.

oo_close.php
  

&lt;?php

declare(strict_types=1);

class ApiClient {
    private $ch;
    
    public function __construct() {
        $this-&gt;ch = curl_init();
    }
    
    public function fetch(string $url): string {
        curl_setopt($this-&gt;ch, CURLOPT_URL, $url);
        curl_setopt($this-&gt;ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($this-&gt;ch);
        
        if ($response === false) {
            throw new RuntimeException(
                "cURL error: " . curl_error($this-&gt;ch)
            );
        }
        
        return $response;
    }
    
    public function __destruct() {
        if (isset($this-&gt;ch)) {
            curl_close($this-&gt;ch);
        }
    }
}

$client = new ApiClient();
try {
    $data = $client-&gt;fetch("https://api.example.com/data");
    echo $data;
} catch (RuntimeException $e) {
    echo $e-&gt;getMessage();
}

The class manages the cURL handle as an instance property. The destructor
ensures the handle is closed when the object is destroyed. This pattern
is useful for long-lived cURL handles in object-oriented code.

## Best Practices

- **Always Close:** Close every cURL handle you create.

- **Error Handling:** Close handles even after errors.

- **Object Cleanup:** Use destructors for OOP code.

- **Multiple Handles:** Close all handles in multi requests.

- **Validation:** Check handle validity before closing.

## Source

[PHP curl_close Documentation](https://www.php.net/manual/en/function.curl-close.php)

This tutorial covered the PHP curl_close function with practical
examples showing proper resource cleanup in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).