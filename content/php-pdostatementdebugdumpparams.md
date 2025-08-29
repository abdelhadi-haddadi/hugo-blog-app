+++
title = "PHP PDOStatement::debugDumpParams"
date = 2025-08-29T20:06:31.609+01:00
draft = false
description = "Learn the PHP PDOStatement::debugDumpParams method to debug bound parameters in SQL queries."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::debugDumpParams

last modified April 19, 2025

The PDOStatement::debugDumpParams method is a debugging tool in PHP's PDO.
It dumps the prepared statement and its bound parameters information.

## Basic Definition

PDOStatement::debugDumpParams displays the SQL prepared statement.
It shows the number of parameters and their types and values.

Syntax: PDOStatement::debugDumpParams(): void.
This method doesn't return anything but outputs directly.

## Simple debugDumpParams Example

This shows basic usage of debugDumpParams with a simple query.

debug_simple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE id = ?');
    $stmt-&gt;bindValue(1, 5, PDO::PARAM_INT);
    $stmt-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This prepares a statement with one parameter and binds a value to it.
debugDumpParams outputs the SQL query and parameter information.
The output helps verify the query and parameter binding.

## debugDumpParams with Named Parameters

This demonstrates debugDumpParams with named parameters.

debug_named.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE name = :name AND status = :status');
    $stmt-&gt;bindValue(':name', 'John', PDO::PARAM_STR);
    $stmt-&gt;bindValue(':status', 'active', PDO::PARAM_STR);
    $stmt-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses named parameters in the prepared statement.
debugDumpParams shows the parameter names and their bound values.
It's useful for verifying complex queries with multiple parameters.

## debugDumpParams Before Binding

This shows debugDumpParams output before binding parameters.

debug_unbound.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price) VALUES (?, ?)');
    $stmt-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates debugDumpParams before any parameters are bound.
The output shows the SQL with placeholders but no parameter values.
This helps verify the query structure before execution.

## debugDumpParams with execute()

This shows debugDumpParams after executing a statement.

debug_executed.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE orders SET status = ? WHERE id = ?');
    $stmt-&gt;execute(['shipped', 42]);
    $stmt-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This executes a statement with parameters passed to execute().
debugDumpParams shows the final parameter values used in execution.
The output helps verify what values were actually used in the query.

## debugDumpParams with Different Parameter Types

This demonstrates debugDumpParams with various parameter types.

debug_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO data (int_val, str_val, bool_val, null_val) VALUES (?, ?, ?, ?)');
    $stmt-&gt;bindValue(1, 123, PDO::PARAM_INT);
    $stmt-&gt;bindValue(2, 'text', PDO::PARAM_STR);
    $stmt-&gt;bindValue(3, true, PDO::PARAM_BOOL);
    $stmt-&gt;bindValue(4, null, PDO::PARAM_NULL);
    $stmt-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds parameters of different types (integer, string, boolean, null).
debugDumpParams shows each parameter's type and value. This helps
verify type handling in prepared statements.

## debugDumpParams in Transaction

This shows debugDumpParams usage within a transaction.

debug_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt = $pdo-&gt;prepare('UPDATE accounts SET balance = balance + ? WHERE user_id = ?');
    $stmt-&gt;bindValue(1, 100.50, PDO::PARAM_STR);
    $stmt-&gt;bindValue(2, 7, PDO::PARAM_INT);
    $stmt-&gt;debugDumpParams();
    
    $pdo-&gt;commit();
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This uses debugDumpParams within a transaction context.
The output helps verify parameter binding before committing changes.
It's useful for debugging complex transactional operations.

## debugDumpParams with Multiple Statements

This demonstrates debugDumpParams with multiple prepared statements.

debug_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt1 = $pdo-&gt;prepare('SELECT * FROM users WHERE id = ?');
    $stmt1-&gt;bindValue(1, 10, PDO::PARAM_INT);
    $stmt1-&gt;debugDumpParams();
    
    $stmt2 = $pdo-&gt;prepare('DELETE FROM logs WHERE created_at &lt; ?');
    $stmt2-&gt;bindValue(1, '2023-01-01', PDO::PARAM_STR);
    $stmt2-&gt;debugDumpParams();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows debugDumpParams output for two different statements.
Each statement's parameters are displayed separately.
This helps debug applications with multiple database operations.

## Best Practices

- **Debugging Only:** Use for development, not production.

- **Parameter Verification:** Check bound values before execution.

- **Type Safety:** Verify parameter types match expectations.

- **Query Structure:** Confirm the prepared SQL is correct.

- **Output Handling:** Be aware it writes directly to output.

## Source

[PHP debugDumpParams Documentation](https://www.php.net/manual/en/pdostatement.debugdumpparams.php)

This tutorial covered the PDOStatement::debugDumpParams method with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).