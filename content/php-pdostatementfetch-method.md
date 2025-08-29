+++
title = "PHP PDOStatement::fetch Method"
date = 2025-08-29T20:06:33.829+01:00
draft = false
description = "Learn the PHP PDOStatement::fetch method to retrieve query results in various formats efficiently."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::fetch Method

last modified April 19, 2025

The PDOStatement::fetch method retrieves the next row from a result set.
It is a fundamental method for working with database query results in PHP.

## Basic Definition

PDOStatement::fetch fetches a row from a result set associated with a
PDOStatement object. It returns data based on the fetch style parameter.

Syntax: public PDOStatement::fetch(int $mode = PDO::FETCH_DEFAULT, int $cursorOrientation = PDO::FETCH_ORI_NEXT, int $cursorOffset = 0): mixed.
The method returns the next row or false if no more rows exist.

## Basic Fetch Example

This shows the simplest usage of fetch to retrieve rows one by one.

basic_fetch.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    while ($row = $stmt-&gt;fetch()) {
        echo "ID: {$row['id']}, Name: {$row['name']}, Email: {$row['email']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example fetches rows as associative arrays (default mode). The while
loop continues until fetch returns false. Each row contains column values
accessible by column name.

## Fetch with Different Modes

PDO provides several fetch modes to control how data is returned.

fetch_modes.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users LIMIT 1');
    
    // Fetch as associative array
    $rowAssoc = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    print_r($rowAssoc);
    
    // Fetch as numeric array
    $rowNum = $stmt-&gt;fetch(PDO::FETCH_NUM);
    print_r($rowNum);
    
    // Fetch as object
    $rowObj = $stmt-&gt;fetch(PDO::FETCH_OBJ);
    echo $rowObj-&gt;name;
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates three common fetch modes. FETCH_ASSOC returns column
names as keys. FETCH_NUM uses numeric indices. FETCH_OBJ creates an
anonymous object with properties matching column names.

## Fetch with Bound Columns

PDO allows binding columns to PHP variables for direct access.

fetch_bound.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    $stmt-&gt;bindColumn('id', $id);
    $stmt-&gt;bindColumn('name', $name);
    $stmt-&gt;bindColumn('email', $email);
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "ID: $id, Name: $name, Email: $email\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds columns to variables before fetching. FETCH_BOUND updates the
variables with each fetch call. The variables must be passed by reference
to bindColumn.

## Fetch into Existing Object

PDO can fetch data directly into properties of an existing object.

fetch_into.php
  

&lt;?php

declare(strict_types=1);

class User {
    public $id;
    public $name;
    public $email;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $user = new User();
    
    while ($stmt-&gt;fetch(PDO::FETCH_INTO, $user)) {
        echo "User: {$user-&gt;name} ({$user-&gt;email})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a User class and fetches data directly into its properties.
FETCH_INTO reuses the same object for each row, updating its properties.
The object must have properties matching the column names.

## Fetch with Custom Class

PDO can instantiate a class and populate its properties with fetched data.

fetch_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    private $id;
    private $name;
    private $email;
    
    public function getId(): int {
        return $this-&gt;id;
    }
    
    public function getName(): string {
        return $this-&gt;name;
    }
    
    public function getEmail(): string {
        return $this-&gt;email;
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $stmt-&gt;setFetchMode(PDO::FETCH_CLASS, 'User');
    
    while ($user = $stmt-&gt;fetch()) {
        echo "User: {$user-&gt;getName()} ({$user-&gt;getEmail()})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a User class with private properties and getter methods.
setFetchMode configures PDO to instantiate User objects. Each fetch
creates a new User instance with data from the current row.

## Fetch Single Column

When you only need one column from each row, FETCH_COLUMN is efficient.

fetch_column.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    
    while ($name = $stmt-&gt;fetch(PDO::FETCH_COLUMN)) {
        echo "Name: $name\n";
    }
    
    // Alternative using fetchAll
    $names = $stmt-&gt;fetchAll(PDO::FETCH_COLUMN);
    print_r($names);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches only the name column from each row. FETCH_COLUMN returns
a single value per row. The example shows both iterative fetching and
fetchAll for getting all values at once.

## Fetch with Cursor Control

Advanced applications can control the cursor position during fetching.

fetch_cursor.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    // Get first row
    $first = $stmt-&gt;fetch();
    
    // Get last row (requires scrollable cursor)
    $last = $stmt-&gt;fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_LAST);
    
    // Get previous row
    $prev = $stmt-&gt;fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_PRIOR);
    
    echo "First: {$first['name']}, Last: {$last['name']}, Previous: {$prev['name']}";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates cursor control with fetch. FETCH_ORI_LAST moves to the
last row. FETCH_ORI_PRIOR gets the previous row. Note that scrollable
cursors must be requested when preparing the statement.

## Best Practices

- **Choose Appropriate Mode:** Select the fetch mode that best fits your needs.

- **Error Handling:** Always check for false return value.

- **Memory Efficiency:** For large results, fetch rows one by one.

- **Type Safety:** Use strict_types and validate fetched data.

- **Security:** Never trust fetched data without validation.

## Source

[PHP PDOStatement::fetch Documentation](https://www.php.net/manual/en/pdostatement.fetch.php)

This tutorial covered the PDOStatement::fetch method with practical
examples showing different fetch modes and advanced usage scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).