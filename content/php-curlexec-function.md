+++
title = "PHP curl_exec Function"
date = 2025-08-29T20:05:28.001+01:00
draft = false
description = "PHP curl_exec function tutorial shows how to execute cURL requests in PHP. Learn curl_exec with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_exec Function

last modified April 11, 2025

The PHP curl_exec function executes a cURL session. It's used to
perform HTTP requests and fetch data from remote servers. cURL supports various
protocols like HTTP, HTTPS, FTP, and more.

## Basic Definition

The curl_exec function executes the given cURL session. It returns
the result on success, FALSE on failure. The function takes a cURL handle as
its only parameter.

Syntax: curl_exec(CurlHandle $handle): mixed. The handle must be
created with curl_init() and configured before execution. Always
close the handle with curl_close() after use.

## Basic GET Request

This example demonstrates a simple GET request to fetch data from a URL.

basic_get.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

This code fetches a sample post from JSONPlaceholder API. We set the URL and
RETURNTRANSFER option to get the response as a string. Error
handling is included to catch potential issues.

## POST Request with Data

This example shows how to send a POST request with form data.

post_request.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$postData = [
    'title' =&gt; 'New Post',
    'body' =&gt; 'This is the content',
    'userId' =&gt; 1
];

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo "Response: " . $response;
}

curl_close($ch);

We create a POST request with form data. The CURLOPT_POST option
sets the method, and CURLOPT_POSTFIELDS contains the data to send.
The API returns the created resource as JSON.

## Handling JSON Response

This example demonstrates proper handling of a JSON API response.

json_response.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/users/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json'
]);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    $user = json_decode($response, true);
    echo "User name: " . $user['name'];
}

curl_close($ch);

We fetch a user object and decode the JSON response. The Accept header
specifies we want JSON. After decoding, we can access the data as an
associative array.

## Setting Custom Headers

This example shows how to set custom HTTP headers for a request.

custom_headers.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$headers = [
    'Authorization: Bearer abc123',
    'Content-Type: application/json',
    'X-Custom-Header: value'
];

curl_setopt($ch, CURLOPT_URL, "https://api.example.com/protected");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We set multiple custom headers including an authorization token. Headers are
passed as an array to CURLOPT_HTTPHEADER. This is common for APIs requiring
authentication or specific content types.

## Handling HTTPS with SSL Verification

This example demonstrates proper SSL certificate verification for HTTPS.

ssl_verification.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://secure.example.com/api");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_CAINFO, "/path/to/cacert.pem");

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We configure cURL to verify the SSL certificate. CURLOPT_SSL_VERIFYPEER
enables peer verification, and CURLOPT_SSL_VERIFYHOST checks the hostname.
For production, always use proper certificate verification.

## Best Practices

- **Error Handling:** Always check curl_exec return value.

- **Resource Cleanup:** Close handles with curl_close.

- **SSL Security:** Enable verification for HTTPS.

- **Timeouts:** Set CURLOPT_TIMEOUT to avoid hanging.

- **Memory:** Use CURLOPT_FILE for large downloads.

## Source

[PHP curl_exec Documentation](https://www.php.net/manual/en/function.curl-exec.php)

This tutorial covered the PHP curl_exec function with practical
examples showing its usage for various HTTP request scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).