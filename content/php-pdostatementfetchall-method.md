+++
title = "PHP PDOStatement::fetchAll Method"
date = 2025-08-29T20:06:33.815+01:00
draft = false
description = "Discover the PHP PDOStatement::fetchAll method for fetching complete datasets from executed queries."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::fetchAll Method

last modified April 19, 2025

The PDOStatement::fetchAll method retrieves all rows from a result set as an array.
It is a powerful method that offers flexibility in how data is returned from
database queries.

## Basic Definition

PDOStatement::fetchAll returns an array containing all of the remaining rows
in the result set. The array represents each row as either an array or object.

Syntax: PDOStatement::fetchAll(int $mode = PDO::FETCH_DEFAULT, mixed ...$args): array.
The mode parameter determines how rows are returned.

## Basic fetchAll Usage

This demonstrates the simplest use of fetchAll to get all rows as arrays.

fetchall_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    $results = $stmt-&gt;fetchAll();
    
    foreach ($results as $row) {
        echo "ID: {$row['id']}, Name: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example fetches all rows from the users table. By default, fetchAll returns
an array of arrays where each inner array represents a row. The default fetch
mode is PDO::FETCH_BOTH.

## Fetching as Associative Arrays

This shows how to fetch all rows as associative arrays using FETCH_ASSOC.

fetchall_assoc.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $results = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
    
    print_r($results);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Using PDO::FETCH_ASSOC returns only associative arrays without
numeric indices. This is more memory efficient than FETCH_BOTH when
you only need named columns.

## Fetching as Objects

This demonstrates fetching all rows as stdClass objects using FETCH_OBJ.

fetchall_obj.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    $results = $stmt-&gt;fetchAll(PDO::FETCH_OBJ);
    
    foreach ($results as $user) {
        echo "ID: {$user-&gt;id}, Name: {$user-&gt;name}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_OBJ returns each row as a stdClass object with properties matching column
names. This provides object-oriented access to result data.

## Fetching a Single Column

This shows how to fetch just one column from all rows using FETCH_COLUMN.

fetchall_column.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    $names = $stmt-&gt;fetchAll(PDO::FETCH_COLUMN, 0);
    
    echo "User names: " . implode(', ', $names);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_COLUMN returns a simple array containing values from a single column.
The second parameter (0 here) specifies which column to fetch (0-indexed).

## Fetching into a Specific Class

This demonstrates fetching rows directly into custom class instances.

fetchall_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    public int $id;
    public string $name;
    public string $email;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $users = $stmt-&gt;fetchAll(PDO::FETCH_CLASS, 'User');
    
    foreach ($users as $user) {
        echo "User: {$user-&gt;name} ({$user-&gt;email})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_CLASS creates instances of the specified class, setting properties that
match column names. The class must be defined before use and properties must
be public.

## Grouping Results

This shows how to group results by a column using FETCH_GROUP.

fetchall_group.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT department, name, salary FROM employees');
    $grouped = $stmt-&gt;fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);
    
    foreach ($grouped as $dept =&gt; $employees) {
        echo "Department: $dept\n";
        foreach ($employees as $emp) {
            echo "- {$emp['name']}: {$emp['salary']}\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_GROUP returns results grouped by the first column. Combined with
FETCH_ASSOC, it creates a multi-dimensional array keyed by the group column.

## Key-Value Pairs

This demonstrates creating key-value pairs from two columns using FETCH_KEY_PAIR.

fetchall_keypair.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, email FROM users');
    $emailMap = $stmt-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
    
    print_r($emailMap);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_KEY_PAIR creates an associative array where the first column becomes
the key and the second column becomes the value. The query must select exactly
two columns.

## Best Practices

- **Memory Usage:** Be cautious with large result sets.

- **Fetch Mode:** Choose the most appropriate for your needs.

- **Column Selection:** Only select needed columns.

- **Error Handling:** Always use try-catch with PDO.

- **Prepared Statements:** Use with fetchAll for security.

## Source

[PHP fetchAll Documentation](https://www.php.net/manual/en/pdostatement.fetchall.php)

This tutorial covered the PDOStatement::fetchAll method with practical examples
showing different fetch modes and their applications in database operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).