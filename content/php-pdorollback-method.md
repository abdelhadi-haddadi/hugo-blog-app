+++
title = "PHP PDO::rollBack Method"
date = 2025-08-29T20:06:29.393+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::rollBack Method

last modified April 19, 2025

The PDO::rollBack method is used to undo changes made during a transaction.
It reverts the database to its state before the transaction began.

## Basic Definition

PDO::rollBack rolls back the current transaction. It only works if the
database supports transactions and autocommit is turned off.

Syntax: public PDO::rollBack(): bool. Returns true on success
or false on failure. Throws PDOException if no active transaction exists.

## Basic Transaction Rollback Example

This shows the simplest usage of rollBack when an error occurs.

basic_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("INSERT INTO users (name, email) VALUES ('John', 'john@example.com')");
    
    // Simulate an error
    throw new Exception("Something went wrong");
    
    $pdo-&gt;commit();
} catch (Exception $e) {
    $pdo-&gt;rollBack();
    echo "Transaction rolled back: " . $e-&gt;getMessage();
}

This starts a transaction, inserts a record, then simulates an error.
The catch block calls rollBack to undo the insert. The database remains unchanged.

## Nested Transactions with Rollback

This demonstrates rollBack behavior with nested transactions.

nested_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Outer transaction
    $pdo-&gt;beginTransaction();
    $pdo-&gt;exec("INSERT INTO logs (message) VALUES ('Starting process')");
    
    try {
        // Inner transaction
        $pdo-&gt;beginTransaction();
        $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
        
        // Simulate error in inner transaction
        throw new Exception("Transfer failed");
        
        $pdo-&gt;commit();
    } catch (Exception $e) {
        $pdo-&gt;rollBack(); // Rolls back only the inner transaction
        echo "Inner transaction failed: " . $e-&gt;getMessage();
    }
    
    $pdo-&gt;commit(); // Commits the outer transaction
    echo "Outer transaction completed";
} catch (PDOException $e) {
    $pdo-&gt;rollBack(); // Rolls back everything if outer transaction fails
    echo "Error: " . $e-&gt;getMessage();
}

This shows nested transactions. The inner rollBack only undoes the inner
operations. The outer transaction can still commit successfully.

## Conditional Rollback Example

This demonstrates using rollBack based on business logic conditions.

conditional_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=bank', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    // Withdraw from account 1
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 200 WHERE id = 1");
    
    // Check if balance went negative
    $stmt = $pdo-&gt;query("SELECT balance FROM accounts WHERE id = 1");
    $balance = $stmt-&gt;fetchColumn();
    
    if ($balance &lt; 0) {
        $pdo-&gt;rollBack();
        echo "Transaction rolled back due to insufficient funds";
    } else {
        // Deposit to account 2
        $pdo-&gt;exec("UPDATE accounts SET balance = balance + 200 WHERE id = 2");
        $pdo-&gt;commit();
        echo "Transaction completed successfully";
    }
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This performs a conditional rollback if an account balance goes negative.
The business logic determines whether to commit or rollback the transaction.

## Rollback with Savepoints

This shows using savepoints for partial transaction rollbacks.

savepoint_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    // First operation
    $pdo-&gt;exec("INSERT INTO orders (product, quantity) VALUES ('Laptop', 1)");
    $pdo-&gt;exec("SAVEPOINT point1");
    
    // Second operation
    $pdo-&gt;exec("UPDATE inventory SET stock = stock - 1 WHERE product = 'Laptop'");
    
    // Check stock level
    $stmt = $pdo-&gt;query("SELECT stock FROM inventory WHERE product = 'Laptop'");
    $stock = $stmt-&gt;fetchColumn();
    
    if ($stock &lt; 0) {
        $pdo-&gt;exec("ROLLBACK TO SAVEPOINT point1");
        echo "Partial rollback performed, order kept but inventory not updated";
    }
    
    $pdo-&gt;commit();
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This creates a savepoint after the first operation. If the second operation
fails a check, it rolls back to the savepoint rather than the full transaction.

## Rollback in Batch Processing

This demonstrates using rollBack when processing batches of records.

batch_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $records = [
        ['name' =&gt; 'Alice', 'email' =&gt; 'alice@example.com'],
        ['name' =&gt; 'Bob', 'email' =&gt; 'bob@example.com'],
        ['name' =&gt; '', 'email' =&gt; 'invalid'], // Invalid record
        ['name' =&gt; 'Charlie', 'email' =&gt; 'charlie@example.com']
    ];
    
    $pdo-&gt;beginTransaction();
    $stmt = $pdo-&gt;prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    
    foreach ($records as $record) {
        if (empty($record['name']) || empty($record['email'])) {
            $pdo-&gt;rollBack();
            throw new Exception("Invalid record found, rolling back entire batch");
        }
        
        $stmt-&gt;execute([$record['name'], $record['email']]);
    }
    
    $pdo-&gt;commit();
    echo "Batch processed successfully";
} catch (Exception $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This processes multiple records in a transaction. If any record is invalid,
it rolls back the entire batch. This ensures data consistency.

## Rollback with Multiple Databases

This shows handling rollback across multiple database connections.

multi_db_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    // First database connection
    $pdo1 = new PDO('mysql:host=localhost;dbname=db1', 'user', 'password');
    $pdo1-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Second database connection
    $pdo2 = new PDO('mysql:host=localhost;dbname=db2', 'user', 'password');
    $pdo2-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo1-&gt;beginTransaction();
    $pdo2-&gt;beginTransaction();
    
    try {
        $pdo1-&gt;exec("INSERT INTO orders (product) VALUES ('Phone')");
        $orderId = $pdo1-&gt;lastInsertId();
        
        $pdo2-&gt;exec("INSERT INTO shipments (order_id) VALUES ($orderId)");
        
        // Simulate error
        throw new Exception("Shipping service unavailable");
        
        $pdo1-&gt;commit();
        $pdo2-&gt;commit();
    } catch (Exception $e) {
        $pdo1-&gt;rollBack();
        $pdo2-&gt;rollBack();
        echo "Distributed transaction rolled back: " . $e-&gt;getMessage();
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This coordinates transactions across two databases. If any operation fails,
both transactions are rolled back. This maintains consistency across systems.

## Rollback with Error Logging

This demonstrates logging errors when rolling back a transaction.

logging_rollback.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE products SET stock = stock - 5 WHERE id = 101");
    $pdo-&gt;exec("INSERT INTO order_items (product_id, quantity) VALUES (101, 5)");
    
    // Check if product exists
    $stmt = $pdo-&gt;query("SELECT COUNT(*) FROM products WHERE id = 101");
    if ($stmt-&gt;fetchColumn() == 0) {
        $pdo-&gt;rollBack();
        
        // Log the error
        $errorMsg = "Attempted to order non-existent product 101";
        $pdo-&gt;exec("INSERT INTO error_log (message) VALUES ('$errorMsg')");
        
        throw new Exception($errorMsg);
    }
    
    $pdo-&gt;commit();
    echo "Order processed successfully";
} catch (Exception $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This rolls back the main transaction but logs the error to a separate table.
The error logging happens after rollback to ensure it's always recorded.

## Best Practices for rollBack

- **Error Handling:** Always use try-catch with transactions.

- **Transaction Scope:** Keep transactions as short as possible.

- **Validation:** Validate data before starting transactions.

- **Nested Transactions:** Understand database-specific behavior.

- **Testing:** Test rollback scenarios thoroughly.

## Source

[PHP PDO::rollBack Documentation](https://www.php.net/manual/en/pdo.rollback.php)

This tutorial covered the PDO::rollBack method with practical examples showing
different scenarios where transaction rollback is necessary.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).