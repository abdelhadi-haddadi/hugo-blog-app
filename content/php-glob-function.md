+++
title = "PHP glob Function"
date = 2025-08-29T20:05:54.743+01:00
draft = false
description = "PHP glob function tutorial shows how to find pathnames matching patterns in PHP. Learn glob with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP glob Function

last modified April 3, 2025

The PHP glob function searches for files matching a pattern. It's
similar to shell-style wildcards but works across different platforms.

## Basic Definition

The glob function returns an array of filenames matching a specified
pattern. It takes two parameters: the pattern string and optional flags.

Syntax: glob(string $pattern, int $flags = 0): array|false. The
function returns false on failure or an array of matched files/directories.

## Basic glob Example

This shows the simplest usage of glob to find PHP files.

basic_glob.php
  

&lt;?php

declare(strict_types=1);

$files = glob("*.php");

foreach ($files as $file) {
    echo $file . "\n";
}

This finds all PHP files in the current directory. The pattern uses the wildcard
* which matches any characters. Each filename is printed on a new line.

## Recursive Directory Search

Using the GLOB_BRACE flag allows more complex pattern matching.

recursive_glob.php
  

&lt;?php

declare(strict_types=1);

$files = glob("{*.php,*.txt}", GLOB_BRACE);

foreach ($files as $file) {
    echo $file . "\n";
}

This finds both PHP and text files in one operation. The curly braces {} create
a set of patterns to match. GLOB_BRACE enables this extended syntax.

## Directory Listing

glob can list directories using the GLOB_ONLYDIR flag.

directory_listing.php
  

&lt;?php

declare(strict_types=1);

$dirs = glob("*", GLOB_ONLYDIR);

foreach ($dirs as $dir) {
    echo $dir . "\n";
}

This lists all directories in the current folder. The * pattern matches any name,
but GLOB_ONLYDIR filters to only directories. Each directory name is output.

## Case Insensitive Search

The GLOB_NOCASE flag makes pattern matching case insensitive.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

$files = glob("*.{PHP,Php,pHp}", GLOB_BRACE | GLOB_NOCASE);

foreach ($files as $file) {
    echo $file . "\n";
}

This finds PHP files regardless of their extension case. The flags are combined
with the | operator. Both pattern variations and case are handled.

## Absolute Path Search

glob can search with absolute paths and return full paths.

absolute_path.php
  

&lt;?php

declare(strict_types=1);

$files = glob("/var/www/html/images/*.jpg");

foreach ($files as $file) {
    echo $file . "\n";
}

This searches for JPG files in a specific absolute directory. The returned array
contains full paths to each matching file. This is useful for exact locations.

## Edge Cases

glob has some special behaviors worth noting.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// No matches returns empty array
$empty = glob("nonexistent*");
var_dump($empty);

// Dot files require explicit pattern
$hidden = glob(".*");
var_dump($hidden);

When no matches are found, glob returns an empty array, not false.
Hidden files (starting with .) require explicit patterns to be matched.

## Best Practices

- **Error Handling:** Check return value for false on errors.

- **Performance:** Avoid overly broad patterns on large dirs.

- **Security:** Validate patterns when using user input.

- **Portability:** Be aware of filesystem case sensitivity.

- **Memory:** Large result sets may consume significant memory.

## Source

[PHP glob Documentation](https://www.php.net/manual/en/function.glob.php)

This tutorial covered the PHP glob function with practical
examples showing its pattern matching capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).