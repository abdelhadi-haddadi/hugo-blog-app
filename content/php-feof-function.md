+++
title = "PHP feof Function"
date = 2025-08-29T20:05:42.490+01:00
draft = false
description = "PHP feof function tutorial shows how to detect end of file in PHP. Learn feof with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP feof Function

last modified April 3, 2025

The PHP feof function checks if the end of a file has been reached.
It's essential for reading files sequentially in PHP. The function returns true
when the file pointer is at EOF.

## Basic Definition

The feof function tests for end-of-file on a file pointer. It takes
one parameter: the file pointer resource. Returns true if EOF is reached.

Syntax: feof(resource $stream): bool. The function is commonly used
with file reading functions like fgets or fread.

## Basic feof Example

This shows the simplest usage of feof to read a file line by line.

basic_feof.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "r");

if ($file) {
    while (!feof($file)) {
        $line = fgets($file);
        echo $line;
    }
    fclose($file);
}

This reads "example.txt" until EOF. The loop continues while feof
returns false. Always close files with fclose after reading.

## Reading Binary File

feof works with binary files using fread.

binary_file.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("image.jpg", "rb");
$buffer = "";

if ($file) {
    while (!feof($file)) {
        $buffer .= fread($file, 8192);
    }
    fclose($file);
}

// Process binary data in $buffer

This reads a binary file in 8KB chunks until EOF. The rb mode
ensures proper binary reading on all platforms. Buffer size can be adjusted.

## Error Handling

Proper error handling is important when using feof.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";
$file = @fopen($filename, "r");

if ($file === false) {
    die("Cannot open file: $filename");
}

while (!feof($file)) {
    $line = fgets($file);
    if ($line === false) {
        break; // Handle read error
    }
    echo $line;
}

fclose($file);

This shows proper file opening checks and read error handling. The @
suppresses warnings, but we explicitly check for failure. Always verify file ops.

## CSV File Processing

feof can be used with CSV file processing.

csv_processing.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.csv", "r");

if ($file) {
    while (!feof($file)) {
        $row = fgetcsv($file);
        if ($row === false) {
            continue; // Skip empty lines
        }
        print_r($row);
    }
    fclose($file);
}

This reads a CSV file until EOF. fgetcsv returns false on empty
lines or errors, so we skip them. Always handle potential CSV parsing issues.

## Network Stream Example

feof works with network streams too.

network_stream.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);
if ($socket) {
    fwrite($socket, "GET / HTTP/1.0\r\nHost: www.example.com\r\n\r\n");
    
    while (!feof($socket)) {
        echo fgets($socket);
    }
    fclose($socket);
}

This reads an HTTP response until the server closes the connection. Network
streams may behave differently than files. Timeouts and errors need handling.

## Common Pitfalls

- **Premature EOF:** Check for read errors before assuming EOF.

- **Memory Usage:** Reading large files needs chunked processing.

- **Stream States:** Some streams may not properly signal EOF.

- **Performance:** Avoid calling feof in tight loops.

## Source

[PHP feof Documentation](https://www.php.net/manual/en/function.feof.php)

This tutorial covered the PHP feof function with practical
examples showing its usage with different file types and streams.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).