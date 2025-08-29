+++
title = "PHP fgetc Function"
date = 2025-08-29T20:05:43.585+01:00
draft = false
description = "PHP fgetc function tutorial shows how to read characters from files in PHP. Learn fgetc with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fgetc Function

last modified April 3, 2025

The PHP fgetc function reads a single character from a file pointer.
It's useful for processing files character by character rather than line by line.

## Basic Definition

The fgetc function reads one character at a time from an open file.
It takes a file handle as its only parameter and returns the character.

Syntax: fgetc(resource $stream): string|false. The function returns
the character as a string, or false on EOF or error. It's binary-safe.

## Basic fgetc Example

This shows the simplest usage of fgetc to read a file character by
character.

basic_fgetc.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
if ($file === false) {
    die('Error opening file');
}

while (($char = fgetc($file)) !== false) {
    echo $char;
}

fclose($file);

This opens a file and reads it character by character until EOF. Each character
is echoed immediately. The loop continues until fgetc returns false.

## Counting Specific Characters

This example counts how many times a specific character appears in a file.

count_chars.php
  

&lt;?php

declare(strict_types=1);

function countCharInFile(string $filename, string $target): int {
    $file = fopen($filename, 'r');
    if ($file === false) {
        throw new RuntimeException("Could not open file");
    }
    
    $count = 0;
    while (($char = fgetc($file)) !== false) {
        if ($char === $target) {
            $count++;
        }
    }
    
    fclose($file);
    return $count;
}

$count = countCharInFile('example.txt', 'a');
echo "The letter 'a' appears $count times";

This demonstrates using fgetc for character analysis. The function
counts occurrences of a specific character while reading the file sequentially.

## Processing Binary Data

fgetc can read binary files one byte at a time.

binary_read.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('image.png', 'rb');
if ($file === false) {
    die('Error opening file');
}

$header = '';
for ($i = 0; $i &lt; 8; $i++) {
    $char = fgetc($file);
    if ($char === false) break;
    $header .= sprintf('%02X ', ord($char));
}

fclose($file);
echo "PNG header bytes: $header";

This reads the first 8 bytes of a PNG file and displays them as hexadecimal.
The 'rb' mode ensures proper binary reading on all platforms.

## File Comparison Character by Character

This example compares two files character by character using fgetc.

file_compare.php
  

&lt;?php

declare(strict_types=1);

function compareFiles(string $file1, string $file2): bool {
    $handle1 = fopen($file1, 'r');
    $handle2 = fopen($file2, 'r');
    
    if ($handle1 === false || $handle2 === false) {
        throw new RuntimeException("Could not open files");
    }
    
    $pos = 0;
    while (true) {
        $char1 = fgetc($handle1);
        $char2 = fgetc($handle2);
        
        if ($char1 === false &amp;&amp; $char2 === false) {
            break; // Both files ended
        }
        
        if ($char1 !== $char2) {
            fclose($handle1);
            fclose($handle2);
            return false;
        }
        
        $pos++;
    }
    
    fclose($handle1);
    fclose($handle2);
    return true;
}

$result = compareFiles('file1.txt', 'file2.txt');
echo $result ? 'Files are identical' : 'Files differ';

This compares two files character by character. It returns false at the first
difference or true if files are identical. The position counter tracks where
files differ.

## Reading Until Specific Character

This example reads a file until a specific delimiter character is found.

read_until.php
  

&lt;?php

declare(strict_types=1);

function readUntil(string $filename, string $delimiter): string {
    $file = fopen($filename, 'r');
    if ($file === false) {
        throw new RuntimeException("Could not open file");
    }
    
    $result = '';
    while (($char = fgetc($file)) !== false) {
        if ($char === $delimiter) {
            break;
        }
        $result .= $char;
    }
    
    fclose($file);
    return $result;
}

$content = readUntil('data.txt', "\n");
echo "First line: $content";

This reads characters from a file until it encounters the specified delimiter.
It's useful for parsing structured files where sections are separated by special
characters.

## Best Practices

- **Error Handling:** Always check if fopen succeeds.

- **Resource Management:** Close files with fclose when done.

- **Performance:** For large files, consider buffered reading.

- **Binary Safety:** Use 'rb' mode for binary files.

- **Memory:** fgetc is memory efficient for large files.

## Source

[PHP fgetc Documentation](https://www.php.net/manual/en/function.fgetc.php)

This tutorial covered the PHP fgetc function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).