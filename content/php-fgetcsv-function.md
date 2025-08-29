+++
title = "PHP fgetcsv Function"
date = 2025-08-29T20:05:43.598+01:00
draft = false
description = "PHP fgetcsv function tutorial shows how to read and parse CSV files in PHP. Learn fgetcsv with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fgetcsv Function

last modified April 3, 2025

The PHP fgetcsv function reads a line from a file pointer and parses
it as CSV data. It's essential for working with comma-separated values files.

## Basic Definition

The fgetcsv function parses a line from an open file as CSV format.
It returns an array containing the fields read or false on failure.

Syntax: fgetcsv(resource $stream, int $length = 0, string $separator = ",",
string $enclosure = '"', string $escape = "\\"): array|false. The function
handles various CSV formats with customizable delimiters.

## Basic fgetcsv Example

This shows the simplest usage of fgetcsv to read a CSV file.

basic_fgetcsv.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.csv', 'r');

if ($file !== false) {
    while (($row = fgetcsv($file)) !== false) {
        print_r($row);
    }
    fclose($file);
}

This reads and parses each line of data.csv. Each row becomes a numerically
indexed array. The function automatically handles quoted fields and commas.

## Custom Delimiter Example

fgetcsv can work with different field separators, not just commas.

custom_delimiter.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('pipe_delimited.txt', 'r');

if ($file !== false) {
    while (($row = fgetcsv($file, 0, '|')) !== false) {
        print_r($row);
    }
    fclose($file);
}

Here we parse a pipe-delimited file by specifying '|' as the separator. The
second parameter (0) means no length limit. Other common delimiters include tabs.

## Handling Headers

This example demonstrates reading a CSV with headers and processing data rows.

csv_with_headers.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('users.csv', 'r');

if ($file !== false) {
    $headers = fgetcsv($file);
    
    while (($data = fgetcsv($file)) !== false) {
        $row = array_combine($headers, $data);
        print_r($row);
    }
    fclose($file);
}

We first read the header row, then combine it with each data row using
array_combine. This creates associative arrays with header names as keys.

## Custom Enclosure Character

This shows how to handle CSV files with different enclosure characters.

custom_enclosure.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('quoted_data.csv', 'r');

if ($file !== false) {
    while (($row = fgetcsv($file, 0, ',', "'")) !== false) {
        print_r($row);
    }
    fclose($file);
}

Here we specify a single quote as the enclosure character instead of the default
double quote. This is useful for files where fields are enclosed in single quotes.

## Processing Large Files

This example demonstrates memory-efficient processing of large CSV files.

large_file_processing.php
  

&lt;?php

declare(strict_types=1);

function processLargeCsv(string $filename): void {
    $file = fopen($filename, 'r');
    
    if ($file === false) {
        throw new RuntimeException("Failed to open file: $filename");
    }

    try {
        while (($row = fgetcsv($file)) !== false) {
            // Process each row without loading entire file
            processRow($row);
        }
    } finally {
        fclose($file);
    }
}

function processRow(array $row): void {
    // Implementation of row processing
    echo implode(', ', $row) . PHP_EOL;
}

This approach reads and processes one row at a time, making it memory-efficient
for large files. The try-finally block ensures the file handle is always closed.

## Edge Cases

fgetcsv has specific behaviors with various edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('edge_cases.csv', 'r');

if ($file !== false) {
    // Empty line
    $empty = fgetcsv($file);
    
    // Line with only delimiters
    $delims = fgetcsv($file);
    
    // Quoted fields with embedded delimiters
    $quoted = fgetcsv($file);
    
    print_r($empty);   // array(1) { [0]=&gt; NULL }
    print_r($delims);  // array with empty strings
    print_r($quoted);  // properly parsed fields
    
    fclose($file);
}

Empty lines return an array with a single NULL element. Lines with only delimiters
return empty strings. Embedded delimiters in quoted fields are handled correctly.

## Best Practices

- **Error Handling:** Always check if file opening succeeded.

- **Resource Cleanup:** Use try-finally or close files promptly.

- **Memory Efficiency:** Process line by line for large files.

- **Validation:** Validate CSV structure and data types.

- **Encoding:** Handle character encoding properly.

## Source

[PHP fgetcsv Documentation](https://www.php.net/manual/en/function.fgetcsv.php)

This tutorial covered the PHP fgetcsv function with practical
examples showing its usage in different CSV processing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).