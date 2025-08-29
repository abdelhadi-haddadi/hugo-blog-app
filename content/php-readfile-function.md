+++
title = "PHP readfile Function"
date = 2025-08-29T20:06:02.737+01:00
draft = false
description = "PHP readfile function tutorial shows how to read files and output their contents in PHP. Learn readfile with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP readfile Function

last modified April 3, 2025

The PHP readfile function reads a file and writes it to the output
buffer. It's efficient for file downloads and serving static files directly.

## Basic Definition

The readfile function reads a file and writes it to the output
buffer. It returns the number of bytes read or false on failure.

Syntax: readfile(string $filename, bool $use_include_path = false, 
resource $context = ?): int|false. The function is binary-safe.

## Basic readfile Example

This shows the simplest usage of readfile to output a file's contents.

basic_readfile.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$bytes = readfile($file);

echo "\nRead $bytes bytes";

This reads "example.txt" and outputs its contents. The function returns the
number of bytes read, which we display after the file contents.

## File Download Example

readfile is commonly used for file downloads with proper headers.

file_download.php
  

&lt;?php

declare(strict_types=1);

$file = "document.pdf";
header("Content-Type: application/pdf");
header("Content-Disposition: attachment; filename=\"" . basename($file) . "\"");

readfile($file);
exit;

This sends PDF file as a download with appropriate headers. The browser will
prompt the user to save the file rather than displaying it.

## Checking File Existence

It's good practice to check if the file exists before attempting to read it.

file_exists.php
  

&lt;?php

declare(strict_types=1);

$file = "data.txt";

if (file_exists($file)) {
    readfile($file);
} else {
    echo "File not found";
}

This checks for file existence first, preventing warnings if the file is missing.
The file_exists function is used for the check.

## Using include_path

The second parameter allows searching for files in the include path.

include_path.php
  

&lt;?php

declare(strict_types=1);

$file = "config.ini";
$bytes = readfile($file, true);

if ($bytes === false) {
    echo "Failed to read file";
}

When true, the second parameter makes PHP search for the file in the include path.
This is useful for files that might be in different locations.

## Stream Context Example

The third parameter allows using a custom stream context for special operations.

stream_context.php
  

&lt;?php

declare(strict_types=1);

$context = stream_context_create([
    "http" =&gt; [
        "method" =&gt; "GET",
        "header" =&gt; "Accept-language: en\r\n"
    ]
]);

$file = "http://example.com/data.txt";
$bytes = readfile($file, false, $context);

if ($bytes !== false) {
    echo "\nSuccessfully read $bytes bytes";
}

This demonstrates reading a remote file with custom HTTP headers. The stream
context modifies how the file is accessed, adding language preferences.

## Best Practices

- **Security:** Validate file paths to prevent directory traversal.

- **Memory:** Use for large files as it doesn't load entire file into memory.

- **Headers:** Set appropriate Content-Type for proper handling.

- **Error Handling:** Always check the return value for errors.

- **Permissions:** Ensure PHP has read access to target files.

## Source

[PHP readfile Documentation](https://www.php.net/manual/en/function.readfile.php)

This tutorial covered the PHP readfile function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).