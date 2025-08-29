+++
title = "PHP PDO::commit Method"
date = 2025-08-29T20:06:22.748+01:00
draft = false
description = "Discover the PHP PDO::commit method to finalize SQL transactions and ensure database consistency."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::commit Method

last modified April 19, 2025

The PDO::commit method in PHP finalizes a transaction, making all changes
permanent in the database. It's used with PDO's transaction capabilities.

## Basic Definition

PDO::commit commits the current transaction. It makes all changes made
since the transaction began permanent. The method returns true on success.

Syntax: public PDO::commit(): bool. It throws a PDOException
if no transaction is active or if the commit fails.

## Simple Transaction Commit Example

This shows a basic transaction with commit.

pdo_commit_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    $pdo-&gt;exec("INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')");
    $pdo-&gt;commit();
    
    echo "Transaction committed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This starts a transaction, inserts a record, and commits it. If any error
occurs, the transaction is rolled back. The commit makes the insert permanent.

## Multiple Operations in Transaction

This demonstrates committing multiple operations as a single transaction.

pdo_commit_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE products SET stock = stock - 5 WHERE id = 101");
    $pdo-&gt;exec("INSERT INTO orders (product_id, quantity) VALUES (101, 5)");
    
    $pdo-&gt;commit();
    echo "Order processed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Order failed: " . $e-&gt;getMessage();
}

This updates product stock and creates an order in one transaction. Both
operations succeed or fail together. The commit applies both changes.

## Commit with Prepared Statements

This shows committing a transaction using prepared statements.

pdo_commit_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt = $pdo-&gt;prepare("INSERT INTO logs (message, created_at) VALUES (?, NOW())");
    $stmt-&gt;execute(['System started']);
    $stmt-&gt;execute(['User logged in']);
    
    $pdo-&gt;commit();
    echo "Log entries committed";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Logging failed: " . $e-&gt;getMessage();
}

This inserts multiple log entries using prepared statements in a transaction.
The commit ensures all inserts are saved together. Prepared statements are safer.

## Conditional Commit

This demonstrates committing only if certain conditions are met.

pdo_commit_conditional.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt = $pdo-&gt;prepare("UPDATE accounts SET balance = balance - ? WHERE id = ?");
    $stmt-&gt;execute([100, 1]);
    
    $balance = $pdo-&gt;query("SELECT balance FROM accounts WHERE id = 1")-&gt;fetchColumn();
    
    if ($balance &gt;= 0) {
        $pdo-&gt;commit();
        echo "Transaction committed";
    } else {
        $pdo-&gt;rollBack();
        echo "Insufficient funds - transaction rolled back";
    }
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This checks account balance before committing. The transaction only commits
if the balance remains positive. Otherwise, it rolls back the changes.

## Nested Transactions with Commit

This shows how PDO handles nested transactions (emulated).

pdo_commit_nested.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction(); // Outer transaction
    
    $pdo-&gt;exec("INSERT INTO events (name) VALUES ('Process started')");
    
    try {
        $pdo-&gt;beginTransaction(); // Inner transaction
        $pdo-&gt;exec("UPDATE counters SET value = value + 1 WHERE name = 'events'");
        $pdo-&gt;commit(); // Commits inner transaction
    } catch (Exception $e) {
        $pdo-&gt;rollBack(); // Rolls back inner transaction
        throw $e;
    }
    
    $pdo-&gt;commit(); // Commits outer transaction
    echo "All transactions committed";
} catch (PDOException $e) {
    $pdo-&gt;rollBack(); // Rolls back outer transaction
    echo "Error: " . $e-&gt;getMessage();
}

PDO doesn't support true nested transactions but emulates them. Each commit
corresponds to its beginTransaction. The outer commit makes all changes permanent.

## Commit with Error Handling

This demonstrates proper error handling around commit operations.

pdo_commit_error_handling.php
  

&lt;?php

declare(strict_types=1);

$pdo = null;

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    $pdo-&gt;exec("DELETE FROM temp_data WHERE created_at &lt; DATE_SUB(NOW(), INTERVAL 1 DAY)");
    
    if (!$pdo-&gt;commit()) {
        throw new Exception("Commit failed");
    }
    
    echo "Old data cleaned successfully";
} catch (PDOException $e) {
    if ($pdo &amp;&amp; $pdo-&gt;inTransaction()) {
        $pdo-&gt;rollBack();
    }
    echo "Database error: " . $e-&gt;getMessage();
} catch (Exception $e) {
    if ($pdo &amp;&amp; $pdo-&gt;inTransaction()) {
        $pdo-&gt;rollBack();
    }
    echo "Error: " . $e-&gt;getMessage();
}

This shows robust error handling around commit. It checks the commit return value
and ensures rollback happens in all error cases. The inTransaction check prevents errors.

## Commit in a Database Class

This demonstrates commit used within a database wrapper class.

pdo_commit_class.php
  

&lt;?php

declare(strict_types=1);

class Database {
    private PDO $pdo;
    
    public function __construct(string $dsn, string $user, string $pass) {
        $this-&gt;pdo = new PDO($dsn, $user, $pass);
        $this-&gt;pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    public function transferFunds(int $from, int $to, float $amount): bool {
        try {
            $this-&gt;pdo-&gt;beginTransaction();
            
            $stmt = $this-&gt;pdo-&gt;prepare("UPDATE accounts SET balance = balance - ? WHERE id = ?");
            $stmt-&gt;execute([$amount, $from]);
            
            $stmt = $this-&gt;pdo-&gt;prepare("UPDATE accounts SET balance = balance + ? WHERE id = ?");
            $stmt-&gt;execute([$amount, $to]);
            
            $this-&gt;pdo-&gt;commit();
            return true;
        } catch (PDOException $e) {
            $this-&gt;pdo-&gt;rollBack();
            return false;
        }
    }
}

$db = new Database('mysql:host=localhost;dbname=testdb', 'user', 'password');
if ($db-&gt;transferFunds(1, 2, 50.00)) {
    echo "Funds transferred successfully";
} else {
    echo "Transfer failed";
}

This encapsulates transaction handling in a class method. The commit happens only
if both updates succeed. The method returns a boolean indicating success.

## Best Practices

- **Always check return value:** Commit can fail silently.

- **Use try-catch:** Handle potential PDOExceptions.

- **Keep transactions short:** Minimize lock duration.

- **Verify inTransaction:** Before commit or rollback.

- **Test error scenarios:** Ensure proper rollback behavior.

## Source

[PHP PDO::commit Documentation](https://www.php.net/manual/en/pdo.commit.php)

This tutorial covered the PDO::commit method with practical examples showing
transaction handling in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).