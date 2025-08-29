+++
title = "PHP fnmatch Function"
date = 2025-08-29T20:05:50.279+01:00
draft = false
description = "PHP fnmatch function tutorial shows how to match filenames against patterns in PHP. Learn fnmatch with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fnmatch Function

last modified April 3, 2025

The PHP fnmatch function checks if a string matches a shell wildcard
pattern. It's useful for filename matching and pattern validation.

## Basic Definition

The fnmatch function tests if a string matches a given pattern. It
supports wildcards like *, ?, and character ranges like [a-z].

Syntax: fnmatch(string $pattern, string $string, int $flags = 0): bool.
The function returns true if the string matches the pattern, false otherwise.

## Basic fnmatch Example

This shows the simplest usage of fnmatch with a wildcard pattern.

basic_fnmatch.php
  

&lt;?php

declare(strict_types=1);

$result = fnmatch("*.txt", "document.txt");

var_dump($result); // Outputs: bool(true)

This checks if "document.txt" matches the "*.txt" pattern. The * wildcard
matches any sequence of characters, so any .txt file will match.

## Question Mark Wildcard

The ? wildcard matches exactly one character in the pattern.

question_mark.php
  

&lt;?php

declare(strict_types=1);

$result1 = fnmatch("file?.txt", "file1.txt");
$result2 = fnmatch("file?.txt", "file12.txt");

var_dump($result1); // Outputs: bool(true)
var_dump($result2); // Outputs: bool(false)

The first example matches because ? matches the single "1". The second fails
because ? can't match two characters. Each ? must match exactly one character.

## Character Ranges

Square brackets define character ranges that match any single character within.

character_ranges.php
  

&lt;?php

declare(strict_types=1);

$result1 = fnmatch("image_[0-9].jpg", "image_1.jpg");
$result2 = fnmatch("image_[0-9].jpg", "image_a.jpg");

var_dump($result1); // Outputs: bool(true)
var_dump($result2); // Outputs: bool(false)

The [0-9] range matches any single digit. The first example matches because "1"
is in the range. The second fails because "a" isn't a digit.

## Case Insensitive Matching

The FNM_CASEFOLD flag makes the matching case insensitive.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

$result = fnmatch("*.TXT", "document.txt", FNM_CASEFOLD);

var_dump($result); // Outputs: bool(true)

Without the flag, this would return false due to case mismatch. With FNM_CASEFOLD,
the pattern matches regardless of case differences in the filename.

## Directory Matching

fnmatch can match paths with directory separators.

directory_matching.php
  

&lt;?php

declare(strict_types=1);

$result = fnmatch("/var/www/*.php", "/var/www/index.php");

var_dump($result); // Outputs: bool(true)

This checks if the full path matches the pattern. The * wildcard matches the
"index" portion of the path. The function treats / characters literally in
patterns.

## Best Practices

- **Pattern Clarity:** Use simple patterns when possible.

- **Performance:** Complex patterns can be slow on large inputs.

- **Security:** Validate inputs when used in security contexts.

- **Testing:** Test edge cases with unusual filenames.

## Source

[PHP fnmatch Documentation](https://www.php.net/manual/en/function.fnmatch.php)

This tutorial covered the PHP fnmatch function with practical
examples showing pattern matching in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).