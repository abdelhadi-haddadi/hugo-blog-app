+++
title = "PHP curl_pause Function"
date = 2025-08-29T20:05:32.520+01:00
draft = false
description = "PHP curl_pause function tutorial shows how to pause and resume cURL transfers in PHP. Learn curl_pause with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_pause Function

last modified April 11, 2025

The PHP curl_pause function pauses and resumes a cURL transfer. It's
used to temporarily stop ongoing transfers and later resume them. This is useful
for controlling bandwidth or implementing custom transfer logic.

## Basic Definition

The curl_pause function pauses or resumes a cURL transfer. It takes
a cURL handle and a bitmask parameter specifying which transfers to pause. The
function returns error code (CURLE_OK on success).

Syntax: curl_pause(CurlHandle $handle, int $bitmask): int. The
bitmask can combine CURLPAUSE_RECV, CURLPAUSE_SEND, CURLPAUSE_ALL, or
CURLPAUSE_CONT. Always check the return value for errors.

## Basic Pause and Resume

This example demonstrates how to pause and resume a simple download.

basic_pause.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$fp = fopen("download.txt", "w");

curl_setopt($ch, CURLOPT_URL, "https://example.com/largefile");
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_NOPROGRESS, false);
curl_setopt($ch, CURLOPT_PROGRESSFUNCTION, function($resource, $download_size, $downloaded, $upload_size, $uploaded) {
    if ($downloaded &gt; 1024 * 1024) { // After 1MB
        return CURLPAUSE_ALL; // Pause both directions
    }
    return CURLPAUSE_CONT; // Continue normally
});

curl_exec($ch);

// Later resume the transfer
curl_pause($ch, CURLPAUSE_CONT);

curl_close($ch);
fclose($fp);

This code downloads a file but pauses after 1MB. The progress function returns
CURLPAUSE_ALL to pause. Later, we resume with CURLPAUSE_CONT. Note the file
handle remains open during pause.

## Pausing Receive Only

This example shows how to pause only the receive operation while allowing sends.

pause_receive.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.example.com/stream");
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
    static $count = 0;
    $count += strlen($data);
    
    if ($count &gt; 5000) {
        return -1; // Triggers pause
    }
    echo $data;
    return strlen($data);
});

curl_exec($ch);

// Check if paused
if (curl_errno($ch) == CURLE_READ_ERROR) {
    // Pause only receiving
    curl_pause($ch, CURLPAUSE_RECV);
    
    // Later resume receiving
    sleep(5);
    curl_pause($ch, CURLPAUSE_CONT);
}

curl_close($ch);

We use WRITEFUNCTION to process incoming data. Returning -1 pauses the transfer.
We then explicitly pause only receiving with CURLPAUSE_RECV. Sends would still
work during this pause if configured.

## Pausing in Multi cURL

This example demonstrates pausing a specific handle in a multi cURL transfer.

multi_pause.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$ch1 = curl_init("https://api1.example.com/stream");
$ch2 = curl_init("https://api2.example.com/stream");

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    $status = curl_multi_exec($mh, $active);
    
    if ($active) {
        // Check if we should pause ch1
        $info = curl_getinfo($ch1);
        if ($info['size_download'] &gt; 1024 * 512) { // 512KB
            curl_pause($ch1, CURLPAUSE_ALL);
            echo "Paused first transfer\n";
        }
        
        curl_multi_select($mh);
    }
} while ($status == CURLM_OK &amp;&amp; $active);

// Cleanup
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

In a multi handle context, we can pause individual transfers. Here we pause the
first transfer after 512KB while the second continues. The multi interface
keeps running during pauses.

## Rate Limiting with Pause

This example implements simple rate limiting using curl_pause.

rate_limit.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$start_time = microtime(true);
$bytes_received = 0;
$max_rate = 1024 * 50; // 50KB/s

curl_setopt($ch, CURLOPT_URL, "https://example.com/largefile");
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) use (&amp;$bytes_received, $start_time, $max_rate) {
    $bytes_received += strlen($data);
    $elapsed = microtime(true) - $start_time;
    $target_time = $bytes_received / $max_rate;
    
    if ($elapsed &lt; $target_time) {
        $sleep = $target_time - $elapsed;
        usleep((int) ($sleep * 1000000));
        return CURLPAUSE_RECV; // Pause receiving
    }
    
    echo $data;
    return strlen($data);
});

curl_exec($ch);
curl_close($ch);

We calculate the desired transfer rate and pause receiving when we're ahead of
schedule. This creates a simple rate limiter. The WRITEFUNCTION handles both
data processing and rate control.

## Pausing During Upload

This example shows how to pause during an upload operation.

upload_pause.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$data = str_repeat("test data ", 100000); // Large data

curl_setopt($ch, CURLOPT_URL, "https://api.example.com/upload");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_READFUNCTION, function($ch, $fd, $length) {
    static $sent = 0;
    $chunk = substr($GLOBALS['data'], $sent, $length);
    $sent += strlen($chunk);
    
    if ($sent &gt; 1024 * 100) { // After 100KB
        return ''; // Triggers pause
    }
    return $chunk;
});

curl_exec($ch);

// Check if paused
if (curl_errno($ch) == CURLE_READ_ERROR) {
    echo "Upload paused at 100KB\n";
    sleep(2); // Wait 2 seconds
    curl_pause($ch, CURLPAUSE_CONT); // Resume
    curl_exec($ch); // Continue transfer
}

curl_close($ch);

During uploads, the READFUNCTION can trigger a pause by returning an empty
string. We then explicitly resume with curl_pause. Note we need to call
curl_exec again after resuming.

## Best Practices

- **Error Handling:** Always check curl_pause return value.

- **Multi Handle:** Pause works in multi interface contexts.

- **Direction Control:** Pause specific transfer directions.

- **Resource Usage:** Connections remain open during pauses.

- **Timeouts:** Watch for timeouts during long pauses.

## Source

[PHP curl_pause Documentation](https://www.php.net/manual/en/function.curl-pause.php)

This tutorial covered the PHP curl_pause function with practical
examples showing its usage for controlling transfers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).