+++
title = "PHP parse_ini_file Function"
date = 2025-08-29T20:06:01.624+01:00
draft = false
description = "PHP parse_ini_file function tutorial shows how to parse INI configuration files in PHP. Learn parse_ini_file with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP parse_ini_file Function

last modified April 3, 2025

The PHP parse_ini_file function parses a configuration INI file and
returns its contents as an associative array. It's useful for reading configs.

## Basic Definition

The parse_ini_file function reads an INI file and returns its
settings in an array. It supports sections, arrays, and various value types.

Syntax: parse_ini_file(string $filename, bool $process_sections = false, int $scanner_mode = INI_SCANNER_NORMAL): array|false.

## Basic parse_ini_file Example

This shows the simplest usage of parse_ini_file to read a config.

basic_parse_ini.php
  

&lt;?php

declare(strict_types=1);

$config = parse_ini_file('config.ini');

print_r($config);

This reads "config.ini" and returns its contents as an associative array.
The file must be in the same directory or provide a full path.

## INI File with Sections

When processing sections, the function returns a multidimensional array.

sections_parse_ini.php
  

&lt;?php

declare(strict_types=1);

$config = parse_ini_file('config.ini', true);

print_r($config);

With the second parameter set to true, section names become array keys.
Each section's settings are stored in a sub-array under its name.

## Handling Different Value Types

parse_ini_file automatically converts values to appropriate types.

value_types.php
  

&lt;?php

declare(strict_types=1);

$config = parse_ini_file('types.ini');

var_dump($config);

The function converts "true"/"on"/"yes" to boolean true, and "false"/"off"/"no"
to false. Numbers become integers or floats, others remain strings.

## INI_SCANNER_TYPED Mode

The scanner mode parameter provides more control over type conversion.

scanner_mode.php
  

&lt;?php

declare(strict_types=1);

$config = parse_ini_file('config.ini', false, INI_SCANNER_TYPED);

var_dump($config);

INI_SCANNER_TYPED mode preserves original string values that look like numbers.
This prevents automatic conversion of numeric strings to integers or floats.

## Working with Arrays

INI files can define arrays using square brackets or repeated keys.

array_values.php
  

&lt;?php

declare(strict_types=1);

$config = parse_ini_file('arrays.ini');

print_r($config);

Array values can be defined as key[] = value or key[0] = value.
The function combines these into proper PHP arrays in the result.

## Best Practices

- **Error Handling:** Always check if the file exists first.

- **Security:** Validate INI file paths to prevent directory traversal.

- **Performance:** Cache parsed results for frequently accessed files.

- **Validation:** Verify required settings exist after parsing.

## Source

[PHP parse_ini_file Documentation](https://www.php.net/manual/en/function.parse-ini-file.php)

This tutorial covered the PHP parse_ini_file function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).