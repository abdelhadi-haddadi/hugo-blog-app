+++
title = "PHP parse_ini_string Function"
date = 2025-08-29T20:06:01.654+01:00
draft = false
description = "PHP parse_ini_string function tutorial shows how to parse INI configuration strings in PHP. Learn parse_ini_string with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP parse_ini_string Function

last modified April 3, 2025

The PHP parse_ini_string function parses a configuration string in
INI format and returns the settings as an associative array. It's useful for
working with configuration data stored in strings rather than files.

## Basic Definition

The parse_ini_string function processes an INI-style configuration
string. It can parse sections and scalar values, optionally with type conversion.

Syntax: parse_ini_string(string $ini_string, bool $process_sections = false, int $scanner_mode = INI_SCANNER_NORMAL): array|false.
The function returns false on failure.

## Basic parse_ini_string Example

This shows the simplest usage of parse_ini_string with a basic INI string.

basic_parse_ini_string.php
  

&lt;?php

declare(strict_types=1);

$ini_string = "name = John Doe
email = john@example.com
active = true";

$config = parse_ini_string($ini_string);

print_r($config);

This parses a simple INI string without sections. The output will be an
associative array with keys 'name', 'email', and 'active'. Boolean-like
values are converted to strings by default.

## Parsing with Sections

The second parameter enables section processing, creating a multidimensional array.

sections_parse_ini_string.php
  

&lt;?php

declare(strict_types=1);

$ini_string = "[user]
name = John Doe
email = john@example.com

[settings]
theme = dark
notifications = 1";

$config = parse_ini_string($ini_string, true);

print_r($config);

With sections enabled, the function returns a nested array. Each section becomes
a sub-array with its own key-value pairs. This is useful for organized configs.

## Typed Parsing with INI_SCANNER_TYPED

The scanner mode parameter can enable type conversion for values.

typed_parse_ini_string.php
  

&lt;?php

declare(strict_types=1);

$ini_string = "debug = 1
ratio = 3.14
enabled = true
disabled = false";

$config = parse_ini_string($ini_string, false, INI_SCANNER_TYPED);

print_r($config);

Using INI_SCANNER_TYPED converts values to their appropriate PHP types. Integers,
floats, and booleans are detected and converted automatically from their string
representations.

## Handling Arrays in INI Strings

INI format supports array-like structures using square brackets.

array_parse_ini_string.php
  

&lt;?php

declare(strict_types=1);

$ini_string = "colors[] = red
colors[] = green
colors[] = blue

sizes.small = 10
sizes.medium = 20
sizes.large = 30";

$config = parse_ini_string($ini_string);

print_r($config);

The function recognizes both sequential ([]) and associative (dot notation)
arrays. Sequential arrays become indexed PHP arrays, while associative arrays
become nested key-value pairs in the result.

## Error Handling

The function returns false on failure, so proper error checking is important.

error_parse_ini_string.php
  

&lt;?php

declare(strict_types=1);

$ini_string = "name = John Doe
email = john@example.com
= invalid_line";

$config = parse_ini_string($ini_string);

if ($config === false) {
    echo "Failed to parse INI string";
} else {
    print_r($config);
}

This example demonstrates error handling when parsing malformed INI data. The
invalid line causes the function to return false. Always check the return value
before using the parsed configuration.

## Best Practices

- **Validation:** Always validate the return value is not false.

- **Security:** Sanitize INI strings from untrusted sources.

- **Typed Mode:** Use INI_SCANNER_TYPED for proper type conversion.

- **Error Handling:** Implement robust error handling.

- **Performance:** Cache parsed results for frequently used configs.

## Source

[PHP parse_ini_string Documentation](https://www.php.net/manual/en/function.parse-ini-string.php)

This tutorial covered the PHP parse_ini_string function with
practical examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).