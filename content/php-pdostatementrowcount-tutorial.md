+++
title = "PHP PDOStatement::rowCount Tutorial"
date = 2025-08-29T20:06:36.023+01:00
draft = false
description = "Discover the PHP PDOStatement::rowCount method to count rows affected by SQL queries."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::rowCount Tutorial

last modified April 19, 2025

The PDOStatement::rowCount method returns the number of rows affected by
the last SQL statement. It's useful for checking the impact of operations.

## Basic Definition

PDOStatement::rowCount returns the number of rows affected by the last
DELETE, INSERT, or UPDATE statement. For SELECT statements, behavior varies.

Syntax: public PDOStatement::rowCount(): int. Returns the number
of rows as an integer. Not all databases support row counts for SELECT.

## Counting Affected Rows After UPDATE

This shows how to get the number of rows modified by an UPDATE statement.

pdo_rowcount_update.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET active = 1 WHERE last_login &gt; ?');
    $stmt-&gt;execute([strtotime('-30 days')]);
    
    $count = $stmt-&gt;rowCount();
    echo "Updated $count user records";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This updates user records and shows how many were modified. The rowCount
method returns the number of rows changed by the UPDATE operation.

## Counting Deleted Rows

Demonstrates using rowCount after a DELETE operation to verify deletions.

pdo_rowcount_delete.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('DELETE FROM temp_sessions WHERE expires &lt; ?');
    $stmt-&gt;execute([time()]);
    
    $deleted = $stmt-&gt;rowCount();
    echo "Deleted $deleted expired sessions";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This deletes expired sessions and reports how many were removed. rowCount
accurately reflects the number of deleted rows in this case.

## Counting Inserted Rows

Shows how to verify the number of rows inserted with a single statement.

pdo_rowcount_insert.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO log_entries (message) VALUES (?), (?), (?)');
    $stmt-&gt;execute(['Startup', 'Initialization', 'Ready']);
    
    $inserted = $stmt-&gt;rowCount();
    echo "Inserted $inserted log entries";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This inserts multiple rows with one statement. rowCount returns the total
number of rows inserted, which is 3 in this example.

## SELECT Statement Behavior

Demonstrates the inconsistent behavior of rowCount with SELECT statements.

pdo_rowcount_select.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT * FROM products WHERE stock &gt; 0');
    $rows = $stmt-&gt;fetchAll();
    
    echo "Fetched " . count($rows) . " products\n";
    echo "rowCount reports: " . $stmt-&gt;rowCount() . " products";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

With MySQL, rowCount may not return the SELECT result count. Always use
fetchAll or similar methods to count SELECT results reliably.

## Transactions and rowCount

Shows how rowCount works within transactions before committing changes.

pdo_rowcount_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt = $pdo-&gt;prepare('UPDATE accounts SET balance = balance - ? WHERE user_id = ?');
    $stmt-&gt;execute([100, 1]);
    $affected = $stmt-&gt;rowCount();
    
    echo "Temporarily affected $affected rows (not committed yet)";
    
    $pdo-&gt;commit();
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

rowCount reports affected rows immediately, even in transactions. The count
reflects changes that would occur if committed, but aren't permanent yet.

## Multiple Statements

Demonstrates rowCount behavior when executing multiple statements.

pdo_rowcount_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt1 = $pdo-&gt;prepare('UPDATE products SET views = views + 1 WHERE id = ?');
    $stmt1-&gt;execute([5]);
    echo "Updated " . $stmt1-&gt;rowCount() . " product\n";
    
    $stmt2 = $pdo-&gt;prepare('DELETE FROM cart_items WHERE session_id = ?');
    $stmt2-&gt;execute(['old_session']);
    echo "Deleted " . $stmt2-&gt;rowCount() . " cart items";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Each statement maintains its own row count. The counts are specific to
each PDOStatement object and don't interfere with each other.

## Zero Rows Affected

Shows how rowCount behaves when no rows match the operation criteria.

pdo_rowcount_zero.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET status = ? WHERE user_id = ?');
    $stmt-&gt;execute(['inactive', 9999]);
    
    if ($stmt-&gt;rowCount() === 0) {
        echo "No user with ID 9999 exists";
    } else {
        echo "Updated user status";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

When no rows match the operation criteria, rowCount returns 0. This can
be used to detect when operations don't affect any database rows.

## Best Practices

- **Use for DML:** Best with INSERT, UPDATE, DELETE.

- **SELECT caution:** Behavior varies by database driver.

- **Error checking:** Verify operations affected expected rows.

- **Transactions:** Counts reflect uncommitted changes.

- **Performance:** No significant overhead for rowCount.

## Source

[PHP rowCount Documentation](https://www.php.net/manual/en/pdostatement.rowcount.php)

This tutorial covered the PDOStatement::rowCount method with practical
examples showing its usage in different database operation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).