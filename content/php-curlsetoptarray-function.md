+++
title = "PHP curl_setopt_array Function"
date = 2025-08-29T20:05:33.639+01:00
draft = false
description = "PHP curl_setopt_array function tutorial shows how to set multiple cURL options in PHP. Learn curl_setopt_array with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_setopt_array Function

last modified April 11, 2025

The PHP curl_setopt_array function sets multiple options for a cURL
session. It's more efficient than setting options individually with
curl_setopt. This function is particularly useful for complex cURL
configurations.

## Basic Definition

The curl_setopt_array function sets multiple options for a cURL
transfer. It takes a cURL handle and an array of options as parameters. Returns
TRUE if all options were set successfully.

Syntax: curl_setopt_array(CurlHandle $handle, array $options): bool.
The handle must be created with curl_init(). The options array
contains key-value pairs of cURL constants and their values.

## Basic GET Request with curl_setopt_array

This example demonstrates a simple GET request using curl_setopt_array.

basic_get_array.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$options = [
    CURLOPT_URL =&gt;  "https://jsonplaceholder.typicode.com/posts/1",
    CURLOPT_RETURNTRANSFER =&gt;  true,
    CURLOPT_HEADER =&gt;  false
];

if (!curl_setopt_array($ch, $options)) {
    throw new Exception("Failed to set cURL options");
}

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

This code fetches a sample post using curl_setopt_array. We define all options
in an array and set them at once. Error handling checks if options were set
correctly. The response is returned as a string.

## POST Request with JSON Data

This example shows a POST request with JSON data using curl_setopt_array.

post_json_array.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$postData = json_encode([
    'title' =&gt;  'New Post',
    'body' =&gt;  'This is the content',
    'userId' =&gt;  1
]);

$options = [
    CURLOPT_URL =&gt;  "https://jsonplaceholder.typicode.com/posts",
    CURLOPT_RETURNTRANSFER =&gt;  true,
    CURLOPT_POST =&gt;  true,
    CURLOPT_POSTFIELDS =&gt;  $postData,
    CURLOPT_HTTPHEADER =&gt;  [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($postData)
    ]
];

if (!curl_setopt_array($ch, $options)) {
    throw new Exception("Failed to set cURL options");
}

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo "Response: " . $response;
}

curl_close($ch);

We create a POST request with JSON data. The options array includes headers and
POST fields. The JSON data is properly encoded and its length is set in headers.
This approach is cleaner than multiple curl_setopt calls.

## Authentication with curl_setopt_array

This example demonstrates HTTP Basic authentication using curl_setopt_array.

auth_request_array.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$options = [
    CURLOPT_URL =&gt;  "https://api.example.com/protected",
    CURLOPT_RETURNTRANSFER =&gt;  true,
    CURLOPT_HTTPAUTH =&gt;  CURLAUTH_BASIC,
    CURLOPT_USERPWD =&gt;  "username:password",
    CURLOPT_SSL_VERIFYPEER =&gt;  true,
    CURLOPT_TIMEOUT =&gt;  30
];

if (!curl_setopt_array($ch, $options)) {
    throw new Exception("Failed to set cURL options");
}

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We configure authentication and security options in one array. The example
includes HTTP Basic auth credentials and SSL verification. A timeout prevents
the request from hanging indefinitely. All options are set at once for clarity.

## File Download with Progress

This example shows how to download a file with progress using curl_setopt_array.

file_download_array.php
  

&lt;?php

declare(strict_types=1);

function progressCallback($resource, $download_size, $downloaded, $upload_size, $uploaded) {
    if ($download_size &gt; 0) {
        $percent = round($downloaded / $download_size * 100);
        echo "Downloaded: $percent%\r";
    }
}

$ch = curl_init();

$file = fopen("download.zip", "w");

$options = [
    CURLOPT_URL =&gt;  "https://example.com/largefile.zip",
    CURLOPT_FILE =&gt;  $file,
    CURLOPT_NOPROGRESS =&gt;  false,
    CURLOPT_PROGRESSFUNCTION =&gt;  'progressCallback',
    CURLOPT_FOLLOWLOCATION =&gt;  true,
    CURLOPT_TIMEOUT =&gt;  300
];

if (!curl_setopt_array($ch, $options)) {
    fclose($file);
    throw new Exception("Failed to set cURL options");
}

$response = curl_exec($ch);

fclose($file);
curl_close($ch);

if ($response === false) {
    echo "Download failed: " . curl_error($ch);
} else {
    echo "\nDownload completed successfully";
}

This code downloads a file while showing progress. We use CURLOPT_FILE to write
directly to disk. The progress callback function displays download percentage.
All file handling and cURL options are configured in one array for clarity.

## Complex API Request with Headers

This example demonstrates a complex API request with multiple headers.

complex_api_array.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$options = [
    CURLOPT_URL =&gt;  "https://api.example.com/v2/data",
    CURLOPT_RETURNTRANSFER =&gt;  true,
    CURLOPT_CUSTOMREQUEST =&gt;  "PUT",
    CURLOPT_POSTFIELDS =&gt;  json_encode(['status' =&gt;  'active']),
    CURLOPT_HTTPHEADER =&gt;  [
        'Authorization: Bearer abc123xyz456',
        'Content-Type: application/json',
        'X-Request-ID: ' . uniqid(),
        'Accept: application/json',
        'Cache-Control: no-cache'
    ],
    CURLOPT_SSL_VERIFYPEER =&gt;  true,
    CURLOPT_SSL_VERIFYHOST =&gt;  2,
    CURLOPT_TIMEOUT =&gt;  30,
    CURLOPT_CONNECTTIMEOUT =&gt;  10
];

if (!curl_setopt_array($ch, $options)) {
    throw new Exception("Failed to set cURL options");
}

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    $data = json_decode($response, true);
    print_r($data);
}

curl_close($ch);

This example shows a PUT request with multiple headers and security options.
We include authentication, content type, and custom headers. SSL verification
and timeouts are configured for security. The response is decoded as JSON.

## Best Practices

- **Option Validation:** Always check curl_setopt_array return value.

- **Error Handling:** Implement proper error handling for requests.

- **Security:** Enable SSL verification for HTTPS requests.

- **Timeouts:** Set reasonable timeout values.

- **Resource Cleanup:** Close handles and files properly.

## Source

[PHP curl_setopt_array Documentation](https://www.php.net/manual/en/function.curl-setopt-array.php)

This tutorial covered the PHP curl_setopt_array function with
practical examples showing its usage for various HTTP request scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).