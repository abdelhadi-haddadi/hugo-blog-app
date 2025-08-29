+++
title = "PHP PDOStatement::nextRowset Method"
date = 2025-08-29T20:06:36.036+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::nextRowset Method

last modified April 19, 2025

The PDOStatement::nextRowset method allows working with multiple result sets
from stored procedures or batch queries. It advances to the next result set.

## Basic Definition

PDOStatement::nextRowset moves the cursor to the next result set when a
statement returns multiple result sets. This is common with stored procedures.

Syntax: public PDOStatement::nextRowset(): bool. Returns true on
success or false if no more result sets exist. Throws PDOException on failure.

## Simple nextRowset Example

This demonstrates basic usage of nextRowset with a stored procedure.

nextrowset_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("CALL get_multiple_results()");
    
    // Process first result set
    while ($row = $stmt-&gt;fetch()) {
        echo "User: {$row['name']}\n";
    }
    
    // Move to next result set
    if ($stmt-&gt;nextRowset()) {
        while ($row = $stmt-&gt;fetch()) {
            echo "Product: {$row['product_name']}\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This calls a stored procedure that returns two result sets. We process the
first set, then use nextRowset to access the second set. Always check the
return value of nextRowset.

## Handling Multiple Result Sets

This shows how to process an unknown number of result sets from a query.

nextrowset_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("SELECT * FROM users; SELECT * FROM products;");
    
    $resultSetNumber = 1;
    do {
        echo "Result Set #$resultSetNumber:\n";
        while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
            print_r($row);
        }
        echo "\n";
        $resultSetNumber++;
    } while ($stmt-&gt;nextRowset());
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This executes two SELECT statements in one query. The do-while loop processes
each result set until nextRowset returns false. Each iteration handles one set.

## Combined INSERT and SELECT

This example shows using nextRowset with a combined INSERT and SELECT query.

nextrowset_insert_select.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("
        INSERT INTO logs (message) VALUES ('Test log entry');
        SELECT * FROM logs ORDER BY created_at DESC LIMIT 5;
    ");
    
    echo "Insert completed\n";
    
    if ($stmt-&gt;nextRowset()) {
        echo "Recent log entries:\n";
        while ($row = $stmt-&gt;fetch()) {
            echo "{$row['created_at']}: {$row['message']}\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This executes an INSERT followed by a SELECT. The INSERT doesn't return rows,
so we use nextRowset to skip to the SELECT result set. This pattern is useful
for audit logging.

## Stored Procedure with Output Parameters

This demonstrates nextRowset with a stored procedure that has output params.

nextrowset_output_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("CALL get_user_stats(?, @total_users, @avg_age)");
    $stmt-&gt;execute(['active']);
    
    // First result set - user data
    while ($row = $stmt-&gt;fetch()) {
        echo "User: {$row['name']}, Age: {$row['age']}\n";
    }
    
    // Move to next result set - output parameters
    if ($stmt-&gt;nextRowset()) {
        $output = $pdo-&gt;query("SELECT @total_users AS total_users, @avg_age AS avg_age")-&gt;fetch();
        echo "Total users: {$output['total_users']}\n";
        echo "Average age: {$output['avg_age']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This calls a stored procedure that returns user data first, then output params.
We process the user data, then use nextRowset before accessing the output.
Output parameters require a separate query after the procedure call.

## Error Handling with nextRowset

This shows proper error handling when working with multiple result sets.

nextrowset_error_handling.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("
        SELECT * FROM valid_table;
        SELECT * FROM non_existent_table;
    ");
    
    // Process first result set
    echo "First result set:\n";
    while ($row = $stmt-&gt;fetch()) {
        print_r($row);
    }
    
    // Attempt to move to next result set
    try {
        if (!$stmt-&gt;nextRowset()) {
            echo "No more result sets\n";
        } else {
            echo "Second result set:\n";
            while ($row = $stmt-&gt;fetch()) {
                print_r($row);
            }
        }
    } catch (PDOException $e) {
        echo "Error moving to next result set: " . $e-&gt;getMessage();
    }
} catch (PDOException $e) {
    echo "Query error: " . $e-&gt;getMessage();
}

This shows nested try-catch blocks for handling errors. The second query fails
but we catch the exception from nextRowset. Always wrap nextRowset calls in
try-catch when working with untrusted queries.

## SQL Server Multiple Result Sets

This example demonstrates nextRowset with SQL Server's multiple result sets.

nextrowset_sqlserver.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('sqlsrv:Server=localhost;Database=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("
        SELECT * FROM customers WHERE region = 'North';
        SELECT * FROM orders WHERE order_date &gt; '2023-01-01';
        SELECT COUNT(*) AS product_count FROM products;
    ");
    
    $resultNumber = 1;
    do {
        echo "Result Set #$resultNumber:\n";
        $rows = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
        print_r($rows);
        $resultNumber++;
    } while ($stmt-&gt;nextRowset());
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

SQL Server commonly returns multiple result sets. This executes three queries
and processes all results. fetchAll retrieves all rows from each result set.
The loop continues until nextRowset returns false.

## Combining nextRowset with Column Count

This shows how to use columnCount with nextRowset to handle dynamic results.

nextrowset_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query("
        SELECT id, name FROM users LIMIT 2;
        SELECT product_id, product_name, price FROM products LIMIT 3;
    ");
    
    $setNumber = 1;
    do {
        $colCount = $stmt-&gt;columnCount();
        echo "Result Set #$setNumber ($colCount columns):\n";
        
        if ($colCount &gt; 0) {
            while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
                print_r($row);
            }
        } else {
            echo "No columns in this result set\n";
        }
        
        $setNumber++;
    } while ($stmt-&gt;nextRowset());
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This checks columnCount for each result set before processing. Some result sets
might have no columns (like after INSERTs). The example handles both data-
returning and non-data-returning queries in a batch.

## Best Practices

- **Check Return Value:** Always verify nextRowset's boolean return.

- **Error Handling:** Wrap in try-catch as it can throw exceptions.

- **Resource Cleanup:** Close statements when done with all sets.

- **Performance:** Avoid unnecessary result sets in queries.

- **Documentation:** Clearly document multi-result procedures.

## Source

[PHP nextRowset Documentation](https://www.php.net/manual/en/pdostatement.nextrowset.php)

This tutorial covered the PDOStatement::nextRowset method with practical
examples showing different database scenarios and proper error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).