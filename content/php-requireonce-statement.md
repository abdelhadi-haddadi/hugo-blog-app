+++
title = "PHP require_once Statement"
date = 2025-08-29T20:04:42.689+01:00
draft = false
description = "PHP require_once tutorial shows how to use file inclusion in PHP. Learn require_once with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP require_once Statement

last modified April 16, 2025

The PHP require_once statement is used to include and evaluate
a specified file during script execution. It prevents multiple inclusions
of the same file. This is essential for modular PHP programming.

## Basic Definitions

require_once includes and evaluates a file only once. If the file
was previously included, it won't be included again. This prevents function
redefinitions and variable reassignments.

Unlike include, require_once produces a fatal error
if the file cannot be found. It's suitable for files essential to application
functionality. The statement is identical to require except for
the once behavior.

Syntax: require_once 'filename.php';. The path can be absolute or
relative. PHP searches include_path if a relative path is given.

## Basic require_once Usage

This example demonstrates including a configuration file using require_once.

config.php
  

&lt;?php

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'secret');
define('DB_NAME', 'testdb');

index.php
  

```
&lt;?php

require_once 'config.php';

echo "Database host: " . DB_HOST;

```

The code includes config.php which defines database constants. The constants
become available in index.php. Using require_once ensures config is loaded
exactly once. This is a common pattern for configuration files.

## Including Class Definitions

This example shows how to include a class definition file using require_once.

User.php
  

&lt;?php

class User {
    private $name;
    
    public function __construct($name) {
        $this-&gt;name = $name;
    }
    
    public function getName() {
        return $this-&gt;name;
    }
}

app.php
  

```
&lt;?php

require_once 'User.php';

$user = new User('John Doe');
echo $user-&gt;getName();

```

The User class is defined in User.php and included in app.php. This separation
follows the single responsibility principle. require_once prevents multiple
class definitions. This is essential for object-oriented PHP.

## Preventing Multiple Inclusions

This example demonstrates how require_once prevents duplicate inclusions.

functions.php
  

&lt;?php

function greet() {
    return "Hello!";
}

main.php
  

```
&lt;?php

require_once 'functions.php';
require_once 'functions.php'; // Won't include again

echo greet();

```

The functions.php file contains a simple function. Main.php includes it twice
with require_once. The second inclusion is skipped. Without require_once, this
would cause a fatal error for function redefinition.

## Relative vs Absolute Paths

This example compares relative and absolute path usage with require_once.

project/index.php
  

&lt;?php

// Relative path
require_once '../lib/utils.php';

// Absolute path
require_once __DIR__ . '/../lib/utils.php';

Both methods include utils.php from the lib directory. Relative paths depend on
the current working directory. Absolute paths using __DIR__ are more reliable.
This prevents issues when files are moved.

## Conditional File Inclusion

This example shows how to conditionally include files with require_once.

feature.php
  

&lt;?php

if (ENABLE_FEATURE) {
    require_once 'advanced_feature.php';
    // Use advanced functionality
} else {
    require_once 'basic_feature.php';
    // Use basic functionality
}

The code checks a constant before including files. This allows feature toggling.
Each branch uses require_once for its specific implementation file. This pattern
is useful for plugin systems. The files are only loaded when needed.

## Autoloading Classes

This example demonstrates using require_once in a simple autoloader.

autoload.php
  

&lt;?php

spl_autoload_register(function ($class) {
    require_once 'classes/' . $class . '.php';
});

$obj = new MyClass();

The autoloader automatically includes class files when needed. Each class file
is required exactly once. This eliminates manual require_once statements. The
pattern follows PSR-4 autoloading standards.

## Error Handling

This example shows how to handle require_once failures gracefully.

error_handling.php
  

&lt;?php

try {
    require_once 'missing_file.php';
} catch (Throwable $e) {
    error_log("Failed to load file: " . $e-&gt;getMessage());
    require_once 'fallback.php';
}

The code attempts to include a non-existent file. The error is caught and
logged. A fallback file is included instead. This makes the application more
robust. Always handle require_once failures in production code.

## Best Practices

- **Essential Files:** Use require_once for critical dependencies.

- **Absolute Paths:** Prefer __DIR__ for reliable file locations.

- **Autoloading:** Implement autoloaders for class files.

- **Error Handling:** Catch and handle inclusion errors.

- **Performance:** Minimize file inclusions for better performance.

## Source

[PHP require_once Documentation](https://www.php.net/manual/en/function.require-once.php)

This tutorial covered PHP require_once with practical examples showing file
inclusion patterns and best practices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).