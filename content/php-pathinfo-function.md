+++
title = "PHP pathinfo Function"
date = 2025-08-29T20:06:01.651+01:00
draft = false
description = "PHP pathinfo function tutorial shows how to parse path information in PHP. Learn pathinfo with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP pathinfo Function

last modified April 3, 2025

The PHP pathinfo function returns information about a file path. 
It can extract the directory name, filename, and extension components.

## Basic Definition

The pathinfo function parses a path and returns an associative 
array or string with the components. It takes two parameters: the path and 
optional flags.

Syntax: pathinfo(string $path, int $flags = PATHINFO_ALL): mixed. 
The flags parameter determines which components to return.

## Basic pathinfo Example

This shows the simplest usage of pathinfo to get all components.

basic_pathinfo.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/index.php";
$info = pathinfo($path);

print_r($info);

This returns an array with all path components. The dirname is the 
directory, basename is the full filename, and extension 
is the file extension.

## Getting Specific Components

You can request specific components using the flags parameter.

specific_components.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/index.php";

$dirname = pathinfo($path, PATHINFO_DIRNAME);
$basename = pathinfo($path, PATHINFO_BASENAME);
$extension = pathinfo($path, PATHINFO_EXTENSION);
$filename = pathinfo($path, PATHINFO_FILENAME);

echo "Dir: $dirname\n";       // /var/www/html
echo "Base: $basename\n";     // index.php
echo "Ext: $extension\n";     // php
echo "File: $filename\n";     // index

Each flag returns just one component as a string. This is more efficient than 
getting the full array when you only need one part.

## Windows Path Example

pathinfo works with Windows paths using backslashes.

windows_path.php
  

&lt;?php

declare(strict_types=1);

$path = "C:\\Windows\\System32\\kernel32.dll";
$info = pathinfo($path);

print_r($info);

The function correctly handles Windows-style paths. It returns components 
regardless of the directory separator style used in the input.

## URL Path Example

pathinfo can also parse URL paths to extract components.

url_path.php
  

&lt;?php

declare(strict_types=1);

$url = "https://example.com/images/logo.png";
$info = pathinfo($url);

print_r($info);

This extracts components from the URL path. Note that pathinfo 
doesn't validate URLs - it processes them as strings.

## Files Without Extensions

The function handles files without extensions correctly.

no_extension.php
  

&lt;?php

declare(strict_types=1);

$path = "/home/user/docs/README";
$info = pathinfo($path);

print_r($info);

For files without extensions, the extension key is not present 
in the array. The filename and basename are identical.

## Edge Cases

pathinfo has some interesting behaviors with edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

$path1 = "/var/www/html/";
$path2 = "/var/www/html";
$path3 = "filename.txt";

print_r(pathinfo($path1));
print_r(pathinfo($path2));
print_r(pathinfo($path3));

With directory paths, basename returns the directory name. For 
simple filenames, it returns just the filename. Trailing slashes are ignored.

## Best Practices

- **Validate Input:** Check paths exist before processing.

- **Handle Encoding:** Be aware of character encoding in paths.

- **Security:** Sanitize input when using in filesystem operations.

- **Performance:** Use flags when you only need specific components.

- **Cross-platform:** Works with both Unix and Windows paths.

## Source

[PHP pathinfo Documentation](https://www.php.net/manual/en/function.pathinfo.php)

This tutorial covered the PHP pathinfo function with practical 
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).