+++
title = "PHP PDOStatement::execute Method"
date = 2025-08-29T20:06:32.721+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::execute Method

last modified April 19, 2025

The PDOStatement::execute method executes a prepared statement in PHP.
It is a crucial part of secure database operations with PDO.

## Basic Definition

PDOStatement::execute runs the prepared statement with bound parameters.
It returns true on success or false on failure.

Syntax: PDOStatement::execute(array $input_parameters = null): bool.
Parameters can be passed as an array or bound separately.

## Basic Execute Example

This shows the simplest usage of PDOStatement::execute with positional parameters.

pdo_execute_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price) VALUES (?, ?)');
    $stmt-&gt;execute(['Laptop', 999.99]);
    
    echo "Product inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This prepares an INSERT statement with two positional placeholders.
The execute method receives values in an array matching the placeholders.

## Named Parameters Example

This demonstrates using named parameters with PDOStatement::execute.

pdo_execute_named.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET email = :email WHERE id = :id');
    $stmt-&gt;execute(['email' =&gt; 'new@example.com', 'id' =&gt; 42]);
    
    echo "User updated successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Named parameters make SQL statements more readable. The execute method
takes an associative array where keys match parameter names.

## Execute with BindParam

This shows binding parameters explicitly before execution.

pdo_execute_bindparam.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM orders WHERE total &gt; :min AND status = :status');
    
    $min = 100;
    $status = 'completed';
    
    $stmt-&gt;bindParam(':min', $min, PDO::PARAM_INT);
    $stmt-&gt;bindParam(':status', $status, PDO::PARAM_STR);
    
    $stmt-&gt;execute();
    
    $orders = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
    print_r($orders);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

bindParam binds variables to parameters by reference. This allows
changing variable values before execute. Parameter types are specified.

## Execute with BindValue

This demonstrates binding values directly to parameters.

pdo_execute_bindvalue.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO logs (message, level, created_at) VALUES (:msg, :lvl, :dt)');
    
    $stmt-&gt;bindValue(':msg', 'System started', PDO::PARAM_STR);
    $stmt-&gt;bindValue(':lvl', 'INFO', PDO::PARAM_STR);
    $stmt-&gt;bindValue(':dt', date('Y-m-d H:i:s'), PDO::PARAM_STR);
    
    $stmt-&gt;execute();
    
    echo "Log entry created";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

bindValue binds specific values to parameters. Unlike bindParam,
the value is fixed at binding time. Useful for constant values.

## Execute with Multiple Rows

This shows executing the same statement with different parameter sets.

pdo_execute_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO colors (name, hex_code) VALUES (?, ?)');
    
    $colors = [
        ['Red', '#FF0000'],
        ['Green', '#00FF00'],
        ['Blue', '#0000FF']
    ];
    
    foreach ($colors as $color) {
        $stmt-&gt;execute($color);
    }
    
    echo "Colors inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The same prepared statement is executed multiple times with different
parameter arrays. This is efficient for batch inserts.

## Execute with Output Parameters

This demonstrates using output parameters with stored procedures.

pdo_execute_output.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('CALL calculate_discount(:price, :discount OUT)');
    
    $price = 100;
    $discount = 0;
    
    $stmt-&gt;bindParam(':price', $price, PDO::PARAM_INT);
    $stmt-&gt;bindParam(':discount', $discount, PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT, 10);
    
    $stmt-&gt;execute();
    
    echo "Original price: $price, Discount: $discount";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This calls a stored procedure with an output parameter. The discount
parameter is modified by the procedure and retrieved after execution.

## Execute with Transactions

This shows using execute within a transaction for atomic operations.

pdo_execute_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt1 = $pdo-&gt;prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?');
    $stmt1-&gt;execute([100, 1]);
    
    $stmt2 = $pdo-&gt;prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?');
    $stmt2-&gt;execute([100, 2]);
    
    $pdo-&gt;commit();
    echo "Funds transferred successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transfer failed: " . $e-&gt;getMessage();
}

This performs a money transfer between accounts. Both execute calls
must succeed or the transaction is rolled back. Ensures data consistency.

## Best Practices

- **Always Use Prepared Statements:** Prevents SQL injection.

- **Specify Parameter Types:** When using bindParam/bindValue.

- **Reuse Statements:** Prepare once, execute multiple times.

- **Error Handling:** Always catch PDOException.

- **Close Cursors:** Call closeCursor() when done.

## Source

[PHP PDOStatement::execute Documentation](https://www.php.net/manual/en/pdostatement.execute.php)

This tutorial covered the PDOStatement::execute method with practical
examples showing different usage scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).