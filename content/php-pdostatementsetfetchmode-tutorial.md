+++
title = "PHP PDOStatement::setFetchMode Tutorial"
date = 2025-08-29T20:06:37.158+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::setFetchMode Tutorial

last modified April 19, 2025

The PDOStatement::setFetchMode method controls how PDO returns rows from
a database query. It determines the format of fetched data.

## Basic Definition

PDOStatement::setFetchMode sets the fetch mode for a statement object.
It affects how rows are returned when calling fetch() or fetchAll().

Syntax: public PDOStatement::setFetchMode(int $mode, mixed ...$args): bool.
The mode parameter specifies the fetch style. Optional args provide
additional parameters for some modes.

## FETCH_ASSOC

This example demonstrates fetching rows as associative arrays.

fetch_assoc.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_ASSOC);
    
    while ($row = $stmt-&gt;fetch()) {
        echo "ID: {$row['id']}, Name: {$row['name']}, Email: {$row['email']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_ASSOC returns each row as an array indexed by column name. This
is useful when you need to access columns by their database names.

## FETCH_OBJ

This shows how to fetch rows as stdClass objects.

fetch_obj.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_OBJ);
    
    while ($user = $stmt-&gt;fetch()) {
        echo "ID: {$user-&gt;id}, Name: {$user-&gt;name}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_OBJ returns each row as a stdClass object. Properties correspond
to column names. This provides object-oriented access to result data.

## FETCH_CLASS

This demonstrates fetching rows into instances of a specific class.

fetch_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    public int $id;
    public string $name;
    public string $email;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_CLASS, 'User');
    
    while ($user = $stmt-&gt;fetch()) {
        echo "User: {$user-&gt;name} ({$user-&gt;email})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_CLASS creates instances of the specified class. Column values are
assigned to matching properties. The class must be defined before use.

## FETCH_INTO

This shows how to fetch rows into an existing object instance.

fetch_into.php
  

&lt;?php

declare(strict_types=1);

class User {
    public int $id;
    public string $name;
    public string $email;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    $user = new User();
    $stmt-&gt;setFetchMode(PDO::FETCH_INTO, $user);
    
    while ($stmt-&gt;fetch()) {
        echo "User: {$user-&gt;name} ({$user-&gt;email})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_INTO updates an existing object with each row's data. The same
object is reused for each fetch. This can be more efficient than
creating new objects.

## FETCH_COLUMN

This demonstrates fetching a single column from the result set.

fetch_column.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_COLUMN, 0);
    
    while ($name = $stmt-&gt;fetch()) {
        echo "Name: $name\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_COLUMN returns values from a single column. The second parameter
specifies the column index (0-based). This is useful for simple lists.

## FETCH_KEY_PAIR

This shows how to fetch rows as key-value pairs.

fetch_key_pair.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_KEY_PAIR);
    
    $users = $stmt-&gt;fetchAll();
    
    foreach ($users as $id =&gt; $name) {
        echo "ID $id: $name\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_KEY_PAIR returns rows as key-value pairs. The first column becomes
the key, the second the value. This is useful for creating lookup arrays.

## FETCH_GROUP

This demonstrates grouping rows by a column value.

fetch_group.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT role, name, email FROM users ORDER BY role');
    
    $stmt-&gt;setFetchMode(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);
    
    $groupedUsers = $stmt-&gt;fetchAll();
    
    foreach ($groupedUsers as $role =&gt; $users) {
        echo "Role: $role\n";
        foreach ($users as $user) {
            echo "  - {$user['name']} ({$user['email']})\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

FETCH_GROUP groups rows by the first column's value. Combined with
FETCH_ASSOC, it creates a nested array structure. This is useful
for hierarchical data.

## Best Practices

- **Choose appropriate mode:** Match fetch mode to your data needs.

- **Consistency:** Use same mode throughout application.

- **Performance:** FETCH_COLUMN for single column data.

- **Type safety:** Use FETCH_CLASS with typed properties.

- **Memory:** Use fetch for large result sets.

## Source

[PHP PDOStatement::setFetchMode Documentation](https://www.php.net/manual/en/pdostatement.setfetchmode.php)

This tutorial covered the PDOStatement::setFetchMode method with practical
examples showing different ways to fetch database results in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).