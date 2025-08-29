+++
title = "PHP fgetss Function"
date = 2025-08-29T20:05:44.720+01:00
draft = false
description = "PHP fgetss function tutorial shows how to read files line by line while stripping HTML/PHP tags in PHP. Learn fgetss with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fgetss Function

last modified April 3, 2025

The PHP fgetss function reads a line from a file pointer while
stripping HTML and PHP tags. It's useful for safely processing files with markup.

## Basic Definition

The fgetss function reads a line from an open file and removes any
HTML and PHP tags. It's similar to fgets but with tag stripping.

Syntax: fgetss(resource $handle, int $length = ?, string $allowable_tags = ?): string|false.
The function returns false on failure.

## Basic fgetss Example

This shows the simplest usage of fgetss to read and clean a file.

basic_fgetss.php
  

&lt;?php

declare(strict_types=1);

$handle = fopen("data.txt", "r");
if ($handle) {
    $line = fgetss($handle);
    echo $line;
    fclose($handle);
}

This reads the first line from "data.txt" and removes all HTML/PHP tags. The
file handle is properly closed after reading. Always check if fopen succeeds.

## Reading Entire File with fgetss

This example demonstrates reading an entire file line by line with tag stripping.

read_entire_file.php
  

&lt;?php

declare(strict_types=1);

$handle = fopen("content.html", "r");
if ($handle) {
    while (($line = fgetss($handle)) !== false) {
        echo $line . "&lt;br&gt;";
    }
    fclose($handle);
}

This reads "content.html" line by line, stripping all tags from each line. The
loop continues until fgetss returns false, indicating end of file or error.

## Allowing Specific Tags

The third parameter lets you specify tags that shouldn't be stripped.

allow_tags.php
  

&lt;?php

declare(strict_types=1);

$handle = fopen("formatted.html", "r");
if ($handle) {
    $line = fgetss($handle, 1024, "&lt;b&gt;&lt;i&gt;&lt;u&gt;");
    echo $line;
    fclose($handle);
}

Here we allow &lt;b&gt;, &lt;i&gt;, and &lt;u&gt; tags while stripping all others.
The second parameter (1024) specifies the maximum line length to read.

## Processing CSV with fgetss

This shows how to safely process CSV files that might contain HTML markup.

process_csv.php
  

&lt;?php

declare(strict_types=1);

$handle = fopen("data.csv", "r");
if ($handle) {
    while (($line = fgetss($handle)) !== false) {
        $fields = str_getcsv($line);
        print_r($fields);
    }
    fclose($handle);
}

We read a CSV file while stripping any HTML tags from each line before parsing.
This prevents potential XSS attacks from malicious CSV content.

## Comparing fgets and fgetss

This example highlights the difference between fgets and fgetss.

compare_functions.php
  

&lt;?php

declare(strict_types=1);

$html = "&lt;b&gt;Test&lt;/b&gt; &lt;script&gt;alert('xss')&lt;/script&gt;";
file_put_contents("temp.txt", $html);

$handle = fopen("temp.txt", "r");
if ($handle) {
    echo "fgets: " . fgets($handle) . "&lt;br&gt;";
    rewind($handle);
    echo "fgetss: " . fgetss($handle);
    fclose($handle);
    unlink("temp.txt");
}

fgets preserves all content including the script tag, while fgetss removes it.
The rewind function moves the file pointer back to start for the second read.

## Best Practices

- **Deprecation Note:** fgetss is deprecated as of PHP 7.3.0.

- **Alternative:** Use fgets with strip_tags for new code.

- **Error Handling:** Always check file operations for errors.

- **Security:** Consider context when allowing certain tags.

## Source

[PHP fgetss Documentation](https://www.php.net/manual/en/function.fgetss.php)

This tutorial covered the PHP fgetss function with practical
examples showing its usage for reading files while stripping HTML/PHP tags.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).