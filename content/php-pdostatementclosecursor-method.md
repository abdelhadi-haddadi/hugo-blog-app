+++
title = "PHP PDOStatement::closeCursor Method"
date = 2025-08-29T20:06:31.626+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::closeCursor Method

last modified April 19, 2025

The PDOStatement::closeCursor method frees up the connection to the server.
This allows other SQL statements to be executed while the current statement
still has unfetched rows.

## Basic Definition

PDOStatement::closeCursor clears the result set of a PDOStatement object.
This is useful when you need to execute another query before finishing with
the current result set.

Syntax: public PDOStatement::closeCursor(): bool. The method
returns true on success or false on failure. It's particularly important
for databases that don't support multiple active statements.

## Basic Usage

This shows the simplest use case of closeCursor to free database resources.

close_cursor_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT * FROM large_table');
    
    // Process some rows
    for ($i = 0; $i &lt; 10; $i++) {
        $row = $stmt-&gt;fetch();
        echo "Row {$i}: {$row['id']}\n";
    }
    
    // Free up the connection
    $stmt-&gt;closeCursor();
    
    // Execute another query
    $pdo-&gt;query('UPDATE stats SET processed = 1');
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example fetches 10 rows from a large result set then calls closeCursor.
This allows the subsequent UPDATE query to execute without waiting for all
rows to be fetched.

## Multiple Statements

Demonstrates using closeCursor when executing multiple statements on the
same connection.

close_cursor_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    
    // First query
    $stmt1 = $pdo-&gt;query('SELECT * FROM users WHERE active = 1');
    while ($user = $stmt1-&gt;fetch()) {
        echo "Active user: {$user['name']}\n";
    }
    $stmt1-&gt;closeCursor();
    
    // Second query
    $stmt2 = $pdo-&gt;query('SELECT * FROM products WHERE stock &lt; 10');
    while ($product = $stmt2-&gt;fetch()) {
        echo "Low stock: {$product['name']}\n";
    }
    $stmt2-&gt;closeCursor();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows proper resource cleanup between two queries. Each statement is
closed before moving to the next one. This prevents potential "Commands
out of sync" errors in MySQL.

## With Unfetched Results

Shows how closeCursor can be used when not all results are fetched.

close_cursor_unfetched.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT * FROM large_dataset');
    
    // Only process first 100 rows
    $count = 0;
    while ($row = $stmt-&gt;fetch() &amp;&amp; $count++ &lt; 100) {
        processRow($row);
    }
    
    // Close cursor even though more rows exist
    $stmt-&gt;closeCursor();
    
    // Execute another query
    $pdo-&gt;exec('DELETE FROM temp_data');
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

function processRow($row) {
    // Process row data
}

Here we intentionally don't fetch all rows from the result set. closeCursor
is called to free resources before executing another statement. This prevents
memory leaks with large result sets.

## In Transactions

Demonstrates using closeCursor within a database transaction.

close_cursor_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;beginTransaction();
    
    // First operation
    $stmt1 = $pdo-&gt;query('SELECT * FROM accounts WHERE balance &gt; 1000');
    $richAccounts = $stmt1-&gt;fetchAll();
    $stmt1-&gt;closeCursor();
    
    // Second operation
    $stmt2 = $pdo-&gt;prepare('UPDATE accounts SET flagged = 1 WHERE id = ?');
    foreach ($richAccounts as $account) {
        $stmt2-&gt;execute([$account['id']]);
    }
    
    $pdo-&gt;commit();
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This example shows proper cursor management within a transaction. The first
query's cursor is closed before processing the results and executing updates.
This maintains clean transaction boundaries.

## With Prepared Statements

Shows closeCursor usage with prepared statements that are executed multiple
times.

close_cursor_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;prepare('SELECT * FROM orders WHERE customer_id = ?');
    
    $customerIds = [5, 8, 12];
    foreach ($customerIds as $id) {
        $stmt-&gt;execute([$id]);
        $orders = $stmt-&gt;fetchAll();
        processOrders($orders);
        $stmt-&gt;closeCursor();
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

function processOrders($orders) {
    // Process customer orders
}

This demonstrates proper cursor cleanup when reusing a prepared statement.
After each execution and result processing, closeCursor is called to reset
the statement for the next execution.

## Error Handling

Shows how to handle errors when using closeCursor.

close_cursor_error.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('SELECT * FROM products');
    
    // Process some rows
    while ($row = $stmt-&gt;fetch()) {
        echo "Product: {$row['name']}\n";
    }
    
    // Attempt to close cursor
    if (!$stmt-&gt;closeCursor()) {
        throw new Exception('Failed to close cursor');
    }
    
    // Execute another query
    $pdo-&gt;exec('UPDATE inventory SET checked = NOW()');
} catch (PDOException $e) {
    echo "Database error: " . $e-&gt;getMessage();
} catch (Exception $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example checks the return value of closeCursor and throws an exception
if it fails. Proper error handling ensures you're aware of any cursor cleanup
issues.

## With Stored Procedures

Demonstrates closeCursor usage when calling stored procedures that return
multiple result sets.

close_cursor_procedure.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $stmt = $pdo-&gt;query('CALL get_sales_report()');
    
    // Process first result set
    echo "Daily Sales:\n";
    while ($row = $stmt-&gt;fetch()) {
        echo "{$row['day']}: {$row['amount']}\n";
    }
    
    $stmt-&gt;closeCursor();
    
    // Move to next result set
    if ($stmt-&gt;nextRowset()) {
        echo "\nMonthly Sales:\n";
        while ($row = $stmt-&gt;fetch()) {
            echo "{$row['month']}: {$row['amount']}\n";
        }
    }
    
    $stmt-&gt;closeCursor();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows proper cursor management with stored procedures that return multiple
result sets. closeCursor is called between processing each result set to
ensure clean transitions.

## Best Practices

- **Always Use:** Call closeCursor when done with a result set.

- **Before New Queries:** Clean up previous statements first.

- **With Large Results:** Essential for memory management.

- **In Loops:** Close cursors when reusing statements.

- **Error Handling:** Check return values for problems.

## Source

[PHP PDOStatement::closeCursor Documentation](https://www.php.net/manual/en/pdostatement.closecursor.php)

This tutorial covered the PDOStatement::closeCursor method with practical
examples showing its importance in database operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).