+++
title = "PHP fpassthru Function"
date = 2025-08-29T20:05:51.408+01:00
draft = false
description = "PHP fpassthru function tutorial shows how to output file contents directly in PHP. Learn fpassthru with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fpassthru Function

last modified April 3, 2025

The PHP fpassthru function outputs all remaining data from a file
pointer. It's efficient for streaming large files directly to output.

## Basic Definition

The fpassthru function reads from the current position in a file
until EOF and writes the data to the output buffer. It returns bytes read.

Syntax: fpassthru(resource $stream): int. The function is useful
for binary files and requires an already opened file pointer.

## Basic fpassthru Example

This shows the simplest usage of fpassthru to output a file.

basic_fpassthru.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'rb');
if ($file) {
    fpassthru($file);
    fclose($file);
}

This reads and outputs the entire contents of example.txt. The file is opened in
binary mode for reliable reading across platforms.

## Outputting Image Files

fpassthru is commonly used to output binary files like images.

image_output.php
  

&lt;?php

declare(strict_types=1);

$imagePath = 'photo.jpg';
$file = fopen($imagePath, 'rb');

if ($file) {
    header('Content-Type: image/jpeg');
    fpassthru($file);
    fclose($file);
    exit;
}

This example streams a JPEG image directly to the browser. Proper headers must be
set before calling fpassthru for binary data.

## Partial File Output

You can combine fseek with fpassthru for partial output.

partial_output.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('largefile.bin', 'rb');
if ($file) {
    fseek($file, 1024); // Skip first 1KB
    $bytes = fpassthru($file);
    echo "Output $bytes bytes";
    fclose($file);
}

This skips the first 1KB of the file before outputting the rest. The function
returns the number of bytes output, which can be useful for logging.

## PDF File Download

fpassthru can force file downloads with proper headers.

pdf_download.php
  

&lt;?php

declare(strict_types=1);

$pdfFile = 'document.pdf';
$file = fopen($pdfFile, 'rb');

if ($file) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="downloaded.pdf"');
    fpassthru($file);
    fclose($file);
    exit;
}

This forces a PDF download in the browser. The Content-Disposition header tells
the browser to save rather than display the file.

## Error Handling

Proper error handling is important when working with file operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filePath = 'data.txt';

if (!file_exists($filePath)) {
    die("File not found");
}

$file = fopen($filePath, 'rb');
if (!$file) {
    die("Failed to open file");
}

if (fpassthru($file) === false) {
    die("Error reading file");
}

fclose($file);

This example includes basic error checking for file existence, opening, and
reading. Always verify operations when working with files.

## Best Practices

- **Close Files:** Always close files after using fpassthru.

- **Binary Mode:** Use 'rb' mode for reliable binary reading.

- **Headers First:** Set output headers before fpassthru.

- **Memory Efficiency:** Use for large files to avoid memory issues.

- **Security:** Validate file paths to prevent directory traversal.

## Source

[PHP fpassthru Documentation](https://www.php.net/manual/en/function.fpassthru.php)

This tutorial covered the PHP fpassthru function with practical
examples showing its usage for efficient file output.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).