+++
title = "PHP PDO::beginTransaction Method"
date = 2025-08-29T20:06:22.753+01:00
draft = false
description = "Learn how to use the PHP PDO::beginTransaction method to start SQL transactions for reliable data processing."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::beginTransaction Method

last modified April 19, 2025

The PDO::beginTransaction method initiates a database transaction in PHP.
Transactions allow multiple database operations to be executed as a single unit.

## Basic Definition

PDO::beginTransaction turns off autocommit mode for database operations. All
subsequent queries become part of the transaction until committed or rolled
back.

Syntax: public PDO::beginTransaction(): bool. Returns true on
success. Throws PDOException if a transaction is already active or the driver
doesn't support transactions.

## Simple Transaction Example

This demonstrates a basic transaction with beginTransaction, commit, and rollBack.

basic_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("INSERT INTO orders (product, amount) VALUES ('Laptop', 1)");
    $pdo-&gt;exec("UPDATE inventory SET stock = stock - 1 WHERE product = 'Laptop'");
    
    $pdo-&gt;commit();
    echo "Transaction completed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

This shows a complete transaction flow. The order insertion and inventory update
are atomic. If either fails, both operations are rolled back.

## Nested Transactions Example

PDO doesn't support true nested transactions, but this shows how to simulate them.

nested_transactions.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction(); // Outer transaction
    
    try {
        $pdo-&gt;exec("INSERT INTO logs (message) VALUES ('Starting operation')");
        
        // Simulate nested transaction with savepoints
        $pdo-&gt;exec("SAVEPOINT point1");
        
        $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
        $pdo-&gt;exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
        
        $pdo-&gt;exec("RELEASE SAVEPOINT point1");
        
        $pdo-&gt;commit();
        echo "All operations completed";
    } catch (PDOException $e) {
        $pdo-&gt;exec("ROLLBACK TO SAVEPOINT point1");
        $pdo-&gt;commit(); // Commit the outer transaction
        echo "Partial operation completed with error: " . $e-&gt;getMessage();
    }
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Operation failed: " . $e-&gt;getMessage();
}

This uses savepoints to simulate nested transactions. The outer transaction
commits even if the inner operations fail. Not all databases support savepoints.

## Transaction with Prepared Statements

This combines transactions with prepared statements for secure operations.

transaction_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt1 = $pdo-&gt;prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt1-&gt;execute(['John Doe', 'john@example.com']);
    
    $userId = $pdo-&gt;lastInsertId();
    
    $stmt2 = $pdo-&gt;prepare("INSERT INTO user_roles (user_id, role) VALUES (?, ?)");
    $stmt2-&gt;execute([$userId, 'member']);
    
    $pdo-&gt;commit();
    echo "User created with role successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "User creation failed: " . $pdo-&gt;errorInfo()[2];
}

This creates a user and assigns a role in a transaction. Prepared statements
prevent SQL injection. The transaction ensures both operations succeed or fail.

## Transaction Isolation Levels

This demonstrates setting transaction isolation levels with beginTransaction.

isolation_levels.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Set isolation level before beginning transaction
    $pdo-&gt;exec("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    
    $pdo-&gt;beginTransaction();
    
    // Perform operations that need consistent reads
    $stmt = $pdo-&gt;query("SELECT * FROM accounts WHERE id = 1");
    $account = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    
    // Update based on the read
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 50 WHERE id = 1");
    
    $pdo-&gt;commit();
    echo "Balance updated based on consistent read";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

Isolation levels control transaction visibility to other transactions.
READ COMMITTED prevents dirty reads. Set isolation before beginTransaction.

## Transaction with Error Handling

This shows comprehensive error handling in a transaction context.

transaction_errors.php
  

&lt;?php

declare(strict_types=1);

$pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
$pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE products SET stock = stock - 1 WHERE id = 101");
    
    if ($pdo-&gt;exec("UPDATE orders SET status = 'shipped' WHERE id = 5001") === 0) {
        throw new Exception("No order found with ID 5001");
    }
    
    $pdo-&gt;commit();
    echo "Order processed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Database error: " . $e-&gt;getMessage();
} catch (Exception $e) {
    $pdo-&gt;rollBack();
    echo "Business logic error: " . $e-&gt;getMessage();
}

This handles both database errors and business logic failures. The transaction
rolls back for any type of error. Custom exceptions can trigger rollbacks.

## Transaction Across Multiple Tables

This demonstrates a transaction spanning multiple related tables.

multi_table_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    // Create order
    $stmt = $pdo-&gt;prepare("INSERT INTO orders (customer_id, total) VALUES (?, ?)");
    $stmt-&gt;execute([1, 199.99]);
    $orderId = $pdo-&gt;lastInsertId();
    
    // Add order items
    $items = [
        ['product_id' =&gt; 101, 'quantity' =&gt; 1, 'price' =&gt; 99.99],
        ['product_id' =&gt; 205, 'quantity' =&gt; 2, 'price' =&gt; 50.00]
    ];
    
    $stmt = $pdo-&gt;prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
    
    foreach ($items as $item) {
        $stmt-&gt;execute([$orderId, $item['product_id'], $item['quantity'], $item['price']]);
    }
    
    // Update inventory
    foreach ($items as $item) {
        $pdo-&gt;exec("UPDATE inventory SET stock = stock - {$item['quantity']} WHERE product_id = {$item['product_id']}");
    }
    
    $pdo-&gt;commit();
    echo "Order #$orderId processed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Order processing failed: " . $e-&gt;getMessage();
}

This creates an order with items and updates inventory atomically. The transaction
ensures all related database changes succeed or fail together.

## Transaction with Large Data Sets

This shows handling large data operations efficiently within a transaction.

large_data_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=analytics', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Disable autocommit for better performance with large transactions
    $pdo-&gt;setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
    
    $pdo-&gt;beginTransaction();
    
    // Clear old data
    $pdo-&gt;exec("TRUNCATE TABLE monthly_report");
    
    // Process and insert large dataset
    $stmt = $pdo-&gt;prepare("INSERT INTO monthly_report (metric, value, date) VALUES (?, ?, ?)");
    
    $metrics = ['visitors', 'conversions', 'revenue'];
    $dates = new DatePeriod(new DateTime('first day of last month'), 
        new DateInterval('P1D'), new DateTime('first day of this month'));
    
    foreach ($dates as $date) {
        foreach ($metrics as $metric) {
            $value = rand(100, 1000); // Simulate data
            $stmt-&gt;execute([$metric, $value, $date-&gt;format('Y-m-d')]);
        }
        
        // Commit periodically for large transactions
        if ($date-&gt;format('d') % 7 === 0) {
            $pdo-&gt;commit();
            $pdo-&gt;beginTransaction();
        }
    }
    
    $pdo-&gt;commit();
    echo "Monthly report generated successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Report generation failed: " . $e-&gt;getMessage();
} finally {
    // Re-enable autocommit
    $pdo-&gt;setAttribute(PDO::ATTR_AUTOCOMMIT, 1);
}

For large transactions, consider committing periodically. This prevents
timeouts and excessive memory usage. Always re-enable autocommit afterward.

## Best Practices

- **Keep Transactions Short:** Minimize duration to reduce locking.

- **Handle Errors:** Always implement rollback in error handling.

- **Test Rollbacks:** Verify your application handles failures correctly.

- **Check Support:** Not all databases support all transaction features.

- **Monitor Deadlocks:** Be prepared to retry transactions on deadlocks.

## Source

[PHP PDO::beginTransaction Documentation](https://www.php.net/manual/en/pdo.begintransaction.php)

This tutorial covered the PDO::beginTransaction method with
practical examples showing different transaction scenarios in PHP database
operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).