+++
title = "PHP PDOStatement Class"
date = 2025-08-29T20:06:27.190+01:00
draft = false
description = "Understand the PHP PDOStatement class for advanced SQL query preparation and execution with bound parameters."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement Class

last modified April 19, 2025

The PDOStatement class represents a prepared statement and the result set
after execution. It provides methods to bind parameters, execute queries,
and fetch results.

## Basic Definition

PDOStatement is a class that represents a prepared statement and its result. It
is returned by PDO::prepare and PDO::query methods.

The class provides methods for binding parameters, executing statements,
fetching results, and retrieving metadata about result sets.

## Basic Query Execution

This example shows how to execute a simple query using PDOStatement.

pdo_basic_query.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        echo "ID: {$row['id']}, Name: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a PDOStatement object with query. The
fetch method retrieves each row as an associative array. The loop
continues until all rows are processed.

## Prepared Statement with Positional Parameters

This demonstrates using prepared statements with question mark placeholders.

pdo_positional_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price) VALUES (?, ?)');
    $stmt-&gt;execute(['Laptop', 999.99]);
    
    echo "Inserted ID: " . $pdo-&gt;lastInsertId();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The prepare method creates a statement template with placeholders. 
execute binds the values to these placeholders in order. This
prevents SQL injection.

## Named Parameters in Prepared Statements

This shows how to use named parameters for more readable prepared statements.

pdo_named_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET email = :email WHERE id = :id');
    $stmt-&gt;execute([
        'email' =&gt; 'new.email@example.com',
        'id' =&gt; 42
    ]);
    
    echo "Affected rows: " . $stmt-&gt;rowCount();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Named parameters start with a colon and are bound using an associative array.
This makes the code more readable and maintainable than positional parameters.

## Binding Parameters Explicitly

This demonstrates explicit parameter binding with bindValue method.

pdo_bind_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM products WHERE price &gt; :min_price AND stock &gt; 0');
    $stmt-&gt;bindValue(':min_price', 100, PDO::PARAM_INT);
    $stmt-&gt;execute();
    
    $products = $stmt-&gt;fetchAll(PDO::FETCH_OBJ);
    foreach ($products as $product) {
        echo "Product: {$product-&gt;name}, Price: {$product-&gt;price}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

bindValue explicitly binds a value to a parameter with type
specification. This is useful when you need to bind values in separate steps
from execution.

## Fetching Data in Different Formats

This shows various ways to fetch data using PDOStatement methods.

pdo_fetch_formats.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 5');
    
    // Fetch as associative array
    $assoc = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    
    // Fetch all as objects of specific class
    $stmt-&gt;execute();
    $objects = $stmt-&gt;fetchAll(PDO::FETCH_CLASS, 'User');
    
    // Fetch into existing object
    $user = new User();
    $stmt-&gt;fetch(PDO::FETCH_INTO, $user);
    
    // Fetch single column
    $emails = $stmt-&gt;fetchAll(PDO::FETCH_COLUMN, 2);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

PDOStatement offers multiple fetch styles. FETCH_ASSOC returns arrays,
FETCH_CLASS maps to objects, FETCH_INTO populates existing objects,
and FETCH_COLUMN gets single columns.

## Transactions with PDOStatement

This demonstrates using PDOStatement within database transactions.

pdo_transactions.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt1 = $pdo-&gt;prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?');
    $stmt2 = $pdo-&gt;prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?');
    
    $stmt1-&gt;execute([100, 1]);
    $stmt2-&gt;execute([100, 2]);
    
    $pdo-&gt;commit();
    echo "Funds transferred successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

This shows a money transfer between accounts as an atomic transaction. Both
updates must succeed or neither will be applied. beginTransaction
starts it, commit completes it, and rollBack cancels
on failure.

## Handling Large Result Sets

This demonstrates processing large result sets efficiently.

pdo_large_results.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM large_table');
    $stmt-&gt;execute();
    
    // Process rows one at a time
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        processRow($row);
    }
    
    // Alternative method with cursor
    $stmt = $pdo-&gt;prepare('SELECT * FROM large_table', [
        PDO::ATTR_CURSOR =&gt; PDO::CURSOR_SCROLL
    ]);
    $stmt-&gt;execute();
    
    $stmt-&gt;fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_ABS, 0); // First row
    $stmt-&gt;fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_REL, 1); // Next row
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

function processRow(array $row): void {
    // Process individual row
}

For large result sets, fetch rows one at a time instead of using fetchAll().
This reduces memory usage. The cursor approach allows random access to rows.

## Best Practices

- **Always use prepared statements** to prevent SQL injection

- **Specify fetch modes explicitly** for predictable results

- **Close cursors** with closeCursor() when done

- **Use transactions** for multiple related operations

- **Handle errors** with try-catch blocks

## Source

[PHP PDOStatement Documentation](https://www.php.net/manual/en/class.pdostatement.php)

This tutorial covered the PDOStatement class with practical examples showing
database operations in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).