+++
title = "PHP require Statement"
date = 2025-08-29T20:04:41.535+01:00
draft = false
description = "PHP require tutorial shows how to use file inclusion in PHP. Learn require with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP require Statement

last modified April 16, 2025

The PHP require statement is used to include and evaluate
specific files. It's essential for code organization and reusability.
Unlike include, require will halt script execution if the
file is missing. This makes it ideal for critical dependencies.

## Basic Definitions

The require statement includes and evaluates the specified file.
If the file cannot be found, it produces a fatal error and stops execution.

PHP has four file inclusion statements: require,
require_once, include, and include_once.
The *_once variants prevent duplicate inclusions.

Syntax: require 'filename.php'; or require('filename.php');.
The file path can be absolute or relative to the including script.

## Basic require Usage

This example demonstrates the simplest way to use require to include a file.

basic_require.php
  

&lt;?php

declare(strict_types=1);

require 'config.php';

echo "Database host: " . DB_HOST;

The code includes config.php which presumably defines database constants.
After inclusion, we can access DB_HOST defined in config.php. The require
statement makes config.php's contents available in the current scope.

## require vs include

This example shows the difference between require and include when files are missing.

require_vs_include.php
  

&lt;?php

declare(strict_types=1);

// This will produce a warning but continue execution
include 'missing_file.php';

// This will produce a fatal error and stop execution
require 'missing_file.php';

echo "This line won't be reached.";

The include statement allows the script to continue after a missing file.
The require statement stops execution completely for missing files. Use
require for essential components your script cannot run without.

## require_once

This example demonstrates using require_once to prevent duplicate inclusions.

require_once.php
  

&lt;?php

declare(strict_types=1);

require_once 'functions.php';
require_once 'functions.php'; // Won't include again

greetUser('John');

The second require_once call won't include functions.php again. This prevents
function redefinition errors. Use require_once when the same file might be
included multiple times through different paths.

## Including HTML Templates

This example shows how to use require to include HTML template files.

template_include.php
  

&lt;?php

declare(strict_types=1);

$title = "Welcome Page";
$content = "Hello, welcome to our website!";

require 'header.php';
require 'content.php';
require 'footer.php';

The script includes separate header, content, and footer files. This
modular approach makes maintaining large websites easier. Each template
file can access the variables defined before inclusion.

## Relative vs Absolute Paths

This example demonstrates different ways to specify file paths with require.

path_types.php
  

&lt;?php

declare(strict_types=1);

// Relative to current directory
require 'lib/utils.php';

// Relative to parent directory
require '../config/settings.php';

// Absolute path (better for complex projects)
require __DIR__ . '/vendor/autoload.php';

The first uses a relative path, the second goes up one directory level.
The third uses __DIR__ for an absolute path, which is more reliable in
complex directory structures. Absolute paths prevent inclusion errors.

## Conditional require

This example shows how to conditionally require files based on runtime checks.

conditional_require.php
  

&lt;?php

declare(strict_types=1);

if (ENVIRONMENT === 'development') {
    require 'dev_tools.php';
} elseif (ENVIRONMENT === 'production') {
    require 'production_config.php';
} else {
    die('Invalid environment');
}

The code loads different configuration files based on the ENVIRONMENT constant.
This pattern is common for environment-specific settings. The die() function
provides a fallback for invalid environments. Always validate before requiring.

## Autoloading Classes

This example demonstrates using require in a simple class autoloader.

autoloader.php
  

&lt;?php

declare(strict_types=1);

spl_autoload_register(function ($className) {
    $file = __DIR__ . '/classes/' . str_replace('\\', '/', $className) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

$obj = new MyClass();

The autoloader converts class names to file paths and requires them.
This eliminates manual requires for each class. The file_exists check
prevents errors for missing class files. Modern PHP uses Composer instead.

## Best Practices

- **Essential files:** Use require for files your script cannot run without.

- **Path handling:** Prefer absolute paths using __DIR__ for reliability.

- **Security:** Never include files based on unvalidated user input.

- **Organization:** Keep included files in a dedicated directory structure.

- **Performance:** Use opcache in production for better include performance.

## Source

[PHP require Documentation](https://www.php.net/manual/en/function.require.php)

This tutorial covered PHP require statements with practical examples
showing various file inclusion scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).