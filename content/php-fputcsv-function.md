+++
title = "PHP fputcsv Function"
date = 2025-08-29T20:05:51.411+01:00
draft = false
description = "PHP fputcsv function tutorial shows how to write data to CSV files in PHP. Learn fputcsv with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fputcsv Function

last modified April 3, 2025

The PHP fputcsv function formats a line as CSV and writes it to a
file. It handles proper escaping of special characters and delimiters.

## Basic Definition

The fputcsv function writes an array as a CSV line to an open file.
It takes parameters for the file handle, data array, and optional CSV settings.

Syntax: fputcsv(resource $handle, array $fields, string $delimiter = ",",
string $enclosure = '"', string $escape_char = "\\"): int|false.

## Basic fputcsv Example

This shows the simplest usage of fputcsv to write data to a file.

basic_fputcsv.php
  

&lt;?php

declare(strict_types=1);

$data = ['Name', 'Email', 'Phone'];
$file = fopen('contacts.csv', 'w');

if ($file !== false) {
    fputcsv($file, $data);
    fclose($file);
    echo "CSV file created successfully.";
}

This creates a CSV file with a header row. The function automatically handles
quoting and escaping of special characters if needed.

## Writing Multiple Rows

You can write multiple rows by calling fputcsv in a loop.

multiple_rows.php
  

&lt;?php

declare(strict_types=1);

$users = [
    ['John Doe', 'john@example.com', '555-1234'],
    ['Jane Smith', 'jane@example.com', '555-5678']
];

$file = fopen('users.csv', 'w');

if ($file !== false) {
    foreach ($users as $user) {
        fputcsv($file, $user);
    }
    fclose($file);
    echo "User data exported to CSV.";
}

This writes two rows of user data to the CSV file. Each array element becomes
a column in the CSV row.

## Custom Delimiter and Enclosure

You can specify custom delimiters and enclosure characters for special formats.

custom_format.php
  

&lt;?php

declare(strict_types=1);

$data = ['Product', 'Price', 'Stock'];
$products = [
    ['Laptop', '999.99', '15'],
    ['Mouse', '24.95', '42']
];

$file = fopen('inventory.tsv', 'w');

if ($file !== false) {
    fputcsv($file, $data, "\t");
    foreach ($products as $product) {
        fputcsv($file, $product, "\t");
    }
    fclose($file);
    echo "TSV file created with tab delimiter.";
}

This creates a TSV (Tab-Separated Values) file instead of CSV. The third
parameter specifies the tab character as delimiter.

## Handling Special Characters

fputcsv automatically handles fields containing delimiters or quotes.

special_chars.php
  

&lt;?php

declare(strict_types=1);

$problematicData = [
    ['ID', 'Description'],
    [1, 'Item with "quotes"'],
    [2, 'Comma, in description']
];

$file = fopen('special.csv', 'w');

if ($file !== false) {
    foreach ($problematicData as $row) {
        fputcsv($file, $row);
    }
    fclose($file);
    echo "CSV with special characters created.";
}

The function properly escapes quotes and commas in the data. The resulting CSV
will be correctly formatted for parsing.

## Using Different Escape Character

You can specify a custom escape character for special cases.

custom_escape.php
  

&lt;?php

declare(strict_types=1);

$data = [
    ['ID', 'Text'],
    [1, 'This contains "quotes"'],
    [2, 'Back\\slash example']
];

$file = fopen('escape_example.csv', 'w');

if ($file !== false) {
    foreach ($data as $row) {
        fputcsv($file, $row, ',', '"', '/');
    }
    fclose($file);
    echo "CSV with custom escape character created.";
}

Here we use a forward slash as the escape character instead of the default
backslash. This can be useful for specific CSV parsing requirements.

## Best Practices

- **Error Handling:** Always check if file opening succeeded.

- **Resource Cleanup:** Close files with fclose when done.

- **Memory Efficiency:** Process large datasets in chunks.

- **Validation:** Sanitize data before writing to CSV.

- **Headers:** Consider adding column headers first.

## Source

[PHP fputcsv Documentation](https://www.php.net/manual/en/function.fputcsv.php)

This tutorial covered the PHP fputcsv function with practical
examples showing its usage for different CSV writing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).