+++
title = "PHP extract Function"
date = 2025-08-29T20:05:17.833+01:00
draft = false
description = "PHP extract function tutorial shows how to import variables from an array into the current symbol table. Learn extract with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP extract Function

last modified March 13, 2025

The PHP extract function imports variables from an array into
the current symbol table. It's useful for quickly creating variables from
array keys and values.

## Basic Definition

The extract function takes an associative array and creates
variables for each key-value pair. The variable names match the array keys.

Syntax: extract(array $array, int $flags = EXTR_OVERWRITE, string $prefix = ""): int.
The function returns the number of variables successfully imported.

## Basic extract Example

This demonstrates the simplest usage of extract to create variables.

basic_extract.php
  

&lt;?php

$userData = [
    'username' =&gt; 'johndoe',
    'email' =&gt; 'john@example.com',
    'age' =&gt; 30
];

extract($userData);

echo $username; 
echo $email;   
echo $age;     

This code creates three variables from the array keys. Each variable holds
the corresponding value from the array. The variables are now available in
the current scope.

## Using EXTR_PREFIX_ALL Flag

This example shows how to prefix all extracted variables for safety.

prefix_extract.php
  

&lt;?php

$config = [
    'host' =&gt; 'localhost',
    'port' =&gt; 3306,
    'dbname' =&gt; 'testdb'
];

extract($config, EXTR_PREFIX_ALL, 'db');

echo $db_host;    
echo $db_port;    
echo $db_dbname;  

The EXTR_PREFIX_ALL flag adds the specified prefix to all
variable names. This prevents naming collisions with existing variables.

## Handling Collisions with EXTR_SKIP

Demonstrates how to skip variables that would overwrite existing ones.

skip_extract.php
  

&lt;?php

$existingVar = 'original value';
$data = [
    'existingVar' =&gt; 'new value',
    'newVar' =&gt; 'some data'
];

extract($data, EXTR_SKIP);

echo $existingVar; 
echo $newVar;     

With EXTR_SKIP, the function skips keys that match existing
variable names. The original value of $existingVar is preserved.

## Extracting with EXTR_REFS

Shows how to extract variables as references to array elements.

refs_extract.php
  

&lt;?php

$originalArray = [
    'color' =&gt; 'blue',
    'size' =&gt; 'medium'
];

extract($originalArray, EXTR_REFS);

$color = 'red'; // Modifies the original array

print_r($originalArray);

Using EXTR_REFS creates variables that reference the original
array elements. Changing these variables modifies the original array.

## Complex Array Extraction

Demonstrates extracting variables from a complex, nested array structure.

complex_extract.php
  

&lt;?php

$userProfile = [
    'personal' =&gt; [
        'name' =&gt; 'Alice',
        'birthdate' =&gt; '1990-05-15'
    ],
    'account' =&gt; [
        'username' =&gt; 'alice123',
        'last_login' =&gt; '2023-04-01'
    ]
];

extract($userProfile['personal']);
extract($userProfile['account'], EXTR_PREFIX_ALL, 'acc');

echo $name;          
echo $birthdate;     
echo $acc_username;  
echo $acc_last_login; 

This shows extracting from nested arrays. We extract personal data directly
and prefix account data to avoid naming conflicts between the two sections.

## Best Practices

- **Security:** Never use extract with untrusted input (like $_GET).

- **Prefixing:** Use prefixes to avoid variable collisions.

- **Scope:** Be aware extract creates variables in current scope.

- **Readability:** Consider alternatives when code becomes unclear.

## Source

[PHP Extract Documentation](https://www.php.net/manual/en/function.extract.php)

This tutorial covered the PHP extract function with practical
examples showing its usage for importing variables from arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).