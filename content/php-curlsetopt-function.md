+++
title = "PHP curl_setopt Function"
date = 2025-08-29T20:05:33.635+01:00
draft = false
description = "PHP curl_setopt function tutorial shows how to configure cURL options in PHP. Learn curl_setopt with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_setopt Function

last modified April 11, 2025

The PHP curl_setopt function sets an option for a cURL transfer. 
It's essential for configuring cURL handles before execution. Options control 
various aspects like URLs, headers, and transfer behavior.

## Basic Definition

The curl_setopt function sets an option on the given cURL session 
handle. It returns TRUE on success or FALSE on failure. The function takes 
three parameters: handle, option, and value.

Syntax: curl_setopt(CurlHandle $handle, int $option, mixed $value): bool. 
The handle must be created with curl_init(). Hundreds of options 
are available to customize cURL behavior.

## Setting Basic Options

This example demonstrates setting fundamental cURL options for a GET request.

basic_options.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

// Set the target URL
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/data");

// Return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Set timeout to 30 seconds
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Follow redirects
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

This code configures essential options for a reliable HTTP request. 
CURLOPT_RETURNTRANSFER makes curl_exec return the response. 
CURLOPT_TIMEOUT prevents hanging, and 
CURLOPT_FOLLOWLOCATION handles redirects.

## POST Request with JSON Data

This example shows how to configure a POST request with JSON payload.

post_json.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$data = [
    'name' =&gt;  'John Doe',
    'email' =&gt;  'john@example.com'
];

$jsonData = json_encode($data);

curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo "Response: " . $response;
}

curl_close($ch);

We configure a POST request with JSON data. CURLOPT_POST sets the 
method, and CURLOPT_POSTFIELDS contains the JSON payload. 
Headers specify the content type and length for proper API communication.

## Custom Request Headers

This example demonstrates setting custom HTTP headers for API authentication.

custom_headers.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$headers = [
    'Authorization: Bearer abc123xyz456',
    'X-API-Version: 2.0',
    'Accept: application/json',
    'Cache-Control: no-cache'
];

curl_setopt($ch, CURLOPT_URL, "https://api.example.com/protected");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HEADER, true); // Include headers in output

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We set multiple custom headers including an authorization token. 
CURLOPT_HTTPHEADER accepts an array of header strings. 
CURLOPT_HEADER includes response headers in the output for 
debugging purposes.

## File Download with Progress

This example shows how to download a file with progress callback.

file_download.php
  

&lt;?php

declare(strict_types=1);

function progressCallback($download_size, $downloaded, $upload_size, $uploaded) {
    if ($download_size &gt; 0) {
        $percent = round($downloaded / $download_size * 100);
        echo "Downloaded: $percent% ($downloaded/$download_size bytes)\n";
    }
}

$ch = curl_init();

$file = fopen("download.zip", 'w');

curl_setopt($ch, CURLOPT_URL, "https://example.com/largefile.zip");
curl_setopt($ch, CURLOPT_FILE, $file);
curl_setopt($ch, CURLOPT_NOPROGRESS, false);
curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, 'progressCallback');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$result = curl_exec($ch);

fclose($file);

if ($result === false) {
    echo "Download failed: " . curl_error($ch);
} else {
    echo "Download completed successfully";
}

curl_close($ch);

This code downloads a file while showing progress. CURLOPT_FILE 
writes directly to a file handle. The progress callback function receives 
download statistics. This is efficient for large files as it avoids memory 
issues.

## SSL Certificate Verification

This example demonstrates proper SSL certificate verification settings.

ssl_verification.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://secure.example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Enable SSL verification (recommended for production)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

// Specify CA bundle path
curl_setopt($ch, CURLOPT_CAINFO, "/path/to/cacert.pem");

// For debugging SSL issues (remove in production)
// curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "SSL Error: " . curl_error($ch);
} else {
    echo "Secure connection established";
    // Process $response...
}

curl_close($ch);

This configuration ensures proper SSL certificate verification. 
CURLOPT_SSL_VERIFYPEER verifies the peer's certificate. 
CURLOPT_SSL_VERIFYHOST checks the certificate's name against 
the host. Always use proper verification in production environments.

## Best Practices

- **Error Handling:** Always check curl_setopt return values.

- **Cleanup:** Close handles with curl_close after use.

- **SSL Security:** Enable verification for HTTPS requests.

- **Timeouts:** Set reasonable timeout values.

- **Memory:** Use CURLOPT_FILE for large downloads.

## Source

[PHP curl_setopt Documentation](https://www.php.net/manual/en/function.curl-setopt.php)

This tutorial covered the PHP curl_setopt function with practical
examples showing its usage for various HTTP request configurations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).