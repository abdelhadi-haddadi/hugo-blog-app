+++
title = "PHP tmpfile Function"
date = 2025-08-29T20:06:07.195+01:00
draft = false
description = "PHP tmpfile function tutorial shows how to create temporary files in PHP. Learn tmpfile with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP tmpfile Function

last modified April 3, 2025

The PHP tmpfile function creates a temporary file with a unique name
in read-write (w+) mode. The file is automatically deleted when closed or when
the script ends.

## Basic Definition

The tmpfile function creates a temporary file and returns a file
handle. The file is created with unique name in the system's temp directory.

Syntax: tmpfile(): resource|false. Returns file handle on success
or false on failure. The file is removed when fclose() is called or script ends.

## Basic tmpfile Example

This shows the simplest usage of tmpfile to create a temp file.

basic_tmpfile.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tmpfile();

if ($tempFile === false) {
    die("Failed to create temporary file");
}

fwrite($tempFile, "Hello, temporary file!");
rewind($tempFile);
echo fread($tempFile, 1024);

fclose($tempFile); // File is automatically deleted

This creates a temp file, writes to it, reads back the content, then closes it.
The file is deleted when fclose() is called or when the script terminates.

## Writing Structured Data

Temporary files can store structured data like JSON or serialized PHP.

structured_data.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tmpfile();
$data = ['name' =&gt; 'John', 'age' =&gt; 30, 'city' =&gt; 'New York'];

fwrite($tempFile, json_encode($data));
rewind($tempFile);

$content = fread($tempFile, 1024);
$decoded = json_decode($content, true);

print_r($decoded);
fclose($tempFile);

This example stores an array as JSON in a temp file, then reads it back. Temp
files are useful for intermediate data processing without permanent storage.

## Stream Operations

Temporary files support all standard stream operations like fseek and ftell.

stream_operations.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tmpfile();
fwrite($tempFile, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

fseek($tempFile, 10, SEEK_SET);
echo fread($tempFile, 5); // Outputs: KLMNO

echo "\nCurrent position: " . ftell($tempFile); // 15
fclose($tempFile);

This demonstrates seeking within the temp file and reading from a specific
position. The file pointer position can be tracked with ftell().

## Error Handling

Proper error handling is important when working with temporary files.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$tempFile = @tmpfile();

if ($tempFile === false) {
    $error = error_get_last();
    echo "Error creating temp file: " . $error['message'];
    exit(1);
}

try {
    if (fwrite($tempFile, "Test data") === false) {
        throw new RuntimeException("Write failed");
    }
    // Process file...
} finally {
    if (is_resource($tempFile)) {
        fclose($tempFile);
    }
}

This shows robust error handling for temp file creation and operations. The
finally block ensures the file is properly closed even if an error occurs.

## Multiple Temp Files

You can create and manage multiple temporary files in a single script.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$file1 = tmpfile();
$file2 = tmpfile();

fwrite($file1, "Data for file 1");
fwrite($file2, "Data for file 2");

rewind($file1);
rewind($file2);

echo "File 1: " . fread($file1, 1024) . "\n";
echo "File 2: " . fread($file2, 1024) . "\n";

fclose($file1);
fclose($file2);

This creates two independent temp files with different content. Each temp file
gets a unique name and can be managed separately before being automatically
deleted.

## Best Practices

- **Error Checking:** Always verify tmpfile() doesn't return false.

- **Resource Management:** Close files explicitly when done.

- **Memory Efficiency:** Use for large data instead of memory.

- **Security:** Temp files are more secure than fixed names.

- **Cleanup:** Rely on automatic deletion but verify if needed.

## Source

[PHP tmpfile Documentation](https://www.php.net/manual/en/function.tmpfile.php)

This tutorial covered the PHP tmpfile function with practical
examples showing its usage for temporary data storage and processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).