+++
title = "PHP PDO Class"
date = 2025-08-29T20:06:26.084+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO Class

last modified April 19, 2025

The PHP PDO (PHP Data Objects) class provides a consistent interface for
accessing databases in PHP. It supports multiple database systems with
the same methods.

## Basic Definition

PDO is a database access layer providing a uniform method of access to
multiple databases. It doesn't provide database-specific syntax but allows
prepared statements.

Syntax: new PDO(string $dsn, string $username = null, string $password = null, array $options = null).
The DSN contains the database type, host, and database name.

## PDO Connection Example

This shows how to connect to a MySQL database using PDO.

pdo_connect.php
  

&lt;?php

declare(strict_types=1);

$host = 'localhost';
$dbname = 'testdb';
$user = 'user';
$pass = 'password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e-&gt;getMessage();
}

This creates a connection to a MySQL database. The setAttribute call configures
PDO to throw exceptions on errors. Always use try-catch with PDO operations.

## PDO Query Example

This demonstrates executing a simple SQL query with PDO.

pdo_query.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT * FROM users');
    
    while ($row = $stmt-&gt;fetch()) {
        echo "ID: {$row['id']}, Name: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This executes a SELECT query and fetches results row by row. The query method
returns a PDOStatement object. fetch() retrieves the next row from the result.

## PDO Prepared Statements

Prepared statements protect against SQL injection and improve performance.

pdo_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    $stmt-&gt;execute(['John Doe', 'john@example.com']);
    
    echo "New record created successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses a prepared statement with positional placeholders. The
prepare method creates the statement template. execute
runs it with the provided values.

## PDO Named Parameters

Named parameters make prepared statements more readable and maintainable.

pdo_named_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE email = :email');
    $stmt-&gt;execute(['email' =&gt; 'john@example.com']);
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "User found: {$user['name']}";
    } else {
        echo "User not found";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses named parameters in the prepared statement. The colon prefix
identifies parameters. The execute method takes an associative
array of values.

## PDO Transactions

Transactions ensure multiple operations execute as a single atomic unit.

pdo_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE user_id = 1");
    $pdo-&gt;exec("UPDATE accounts SET balance = balance + 100 WHERE user_id = 2");
    
    $pdo-&gt;commit();
    echo "Transaction completed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

This demonstrates a money transfer transaction. beginTransaction
starts it. commit makes changes permanent. rollBack
undoes changes on failure.

## PDO Fetch Modes

PDO offers different ways to fetch result sets from queries.

pdo_fetch_modes.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Fetch as associative array
    $stmt = $pdo-&gt;query('SELECT * FROM users LIMIT 1');
    $user = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    
    // Fetch all as objects
    $stmt = $pdo-&gt;query('SELECT * FROM users');
    $users = $stmt-&gt;fetchAll(PDO::FETCH_OBJ);
    
    // Fetch column
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    $names = $stmt-&gt;fetchAll(PDO::FETCH_COLUMN);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows different fetch modes. FETCH_ASSOC returns associative arrays.
FETCH_OBJ returns stdClass objects. FETCH_COLUMN gets a single column.

## Best Practices

- **Use Prepared Statements:** Always for user input.

- **Error Handling:** Use exceptions for database errors.

- **Close Connections:** Let PDO handle it automatically.

- **Bind Parameters:** Explicitly for complex queries.

- **Character Set:** Set it in the DSN or after connecting.

## Source

[PHP PDO Documentation](https://www.php.net/manual/en/book.pdo.php)

This tutorial covered the PHP PDO class with practical examples showing
database operations in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).