+++
title = "PHP PDO::errorInfo Method"
date = 2025-08-29T20:06:23.877+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::errorInfo Method

last modified April 19, 2025

The PDO::errorInfo method in PHP provides detailed error information about
the last operation performed by a PDO database handle. It returns an array.

## Basic Definition

PDO::errorInfo fetches extended error information associated with the last
operation on the database handle. It returns an array of error information.

Syntax: public PDO::errorInfo(): array. The array contains three
fields: SQLSTATE error code, driver-specific error code, and error message.

## Basic errorInfo Example

This shows a simple example of using errorInfo after a failed query.

pdo_errorinfo_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;query('SELECT * FROM non_existent_table');
    
    if ($stmt === false) {
        $error = $pdo-&gt;errorInfo();
        echo "SQLSTATE: {$error[0]}\n";
        echo "Driver Code: {$error[1]}\n";
        echo "Error Message: {$error[2]}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example attempts to query a non-existent table. With ERRMODE_SILENT,
errors don't throw exceptions. errorInfo provides detailed error information.

## errorInfo with Prepared Statements

This demonstrates using errorInfo with prepared statement execution errors.

pdo_errorinfo_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    $result = $stmt-&gt;execute(['John Doe', 'invalid-email']);
    
    if ($result === false) {
        $error = $stmt-&gt;errorInfo();
        echo "Error: {$error[2]}\n";
        echo "SQLSTATE: {$error[0]}\n";
    } else {
        echo "Record inserted successfully\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows errorInfo usage with a prepared statement. If execute fails,
errorInfo provides details. Note we use the statement's errorInfo method.

## Comparing errorInfo and errorCode

This example compares errorInfo with the simpler errorCode method.

pdo_errorinfo_vs_errorcode.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $result = $pdo-&gt;exec('DELETE FROM non_existent_table');
    
    if ($result === false) {
        echo "errorCode: " . $pdo-&gt;errorCode() . "\n";
        
        $errorInfo = $pdo-&gt;errorInfo();
        echo "Full error info:\n";
        print_r($errorInfo);
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows the difference between errorCode and errorInfo. errorCode returns
just the SQLSTATE while errorInfo provides complete error details in an array.

## errorInfo with Transactions

This demonstrates using errorInfo when a transaction fails.

pdo_errorinfo_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;beginTransaction();
    
    $result1 = $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE user_id = 1");
    $result2 = $pdo-&gt;exec("UPDATE non_existent_table SET balance = balance + 100 WHERE user_id = 2");
    
    if ($result1 === false || $result2 === false) {
        $pdo-&gt;rollBack();
        $error = $pdo-&gt;errorInfo();
        echo "Transaction failed: {$error[2]}\n";
    } else {
        $pdo-&gt;commit();
        echo "Transaction completed successfully\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows errorInfo usage in a transaction context. When one query fails,
we roll back and use errorInfo to get details about what went wrong.

## Database-Specific Error Codes

This example shows how errorInfo returns driver-specific error codes.

pdo_errorinfo_driver_codes.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    // Attempt to violate a unique constraint
    $result = $pdo-&gt;exec("INSERT INTO users (email) VALUES ('duplicate@example.com')");
    
    if ($result === false) {
        $error = $pdo-&gt;errorInfo();
        echo "MySQL Error Code: {$error[1]}\n";
        echo "Error Message: {$error[2]}\n";
        
        // MySQL specific error code for duplicate entry
        if ($error[1] == 1062) {
            echo "Duplicate entry detected!\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates how to use the driver-specific error code (array index 1)
to detect specific error conditions like duplicate entries in MySQL.

## errorInfo with Different Databases

This shows how errorInfo works with SQLite versus MySQL.

pdo_errorinfo_multidb.php
  

&lt;?php

declare(strict_types=1);

// MySQL example
try {
    $mysql = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $mysql-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $result = $mysql-&gt;exec("INVALID SQL");
    if ($result === false) {
        echo "MySQL Error:\n";
        print_r($mysql-&gt;errorInfo());
    }
} catch (PDOException $e) {
    echo "MySQL Error: " . $e-&gt;getMessage();
}

// SQLite example
try {
    $sqlite = new PDO('sqlite:/path/to/database.sqlite');
    $sqlite-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $result = $sqlite-&gt;exec("INVALID SQL");
    if ($result === false) {
        echo "\nSQLite Error:\n";
        print_r($sqlite-&gt;errorInfo());
    }
} catch (PDOException $e) {
    echo "SQLite Error: " . $e-&gt;getMessage();
}

This shows how errorInfo works across different database systems. While the
array structure is consistent, the specific codes and messages vary by driver.

## Best Practices for errorInfo

- **Check for Errors:** Always verify operations succeeded before calling errorInfo.

- **Use with ERRMODE_SILENT:** errorInfo is most useful in silent error mode.

- **Statement vs Connection:** Call errorInfo on the appropriate object (statement or connection).

- **Log Full Details:** For debugging, log the entire errorInfo array.

- **User-Friendly Messages:** Don't expose raw errorInfo to users.

## Source

[PHP PDO::errorInfo Documentation](https://www.php.net/manual/en/pdo.errorinfo.php)

This tutorial covered the PDO::errorInfo method with practical examples showing
how to retrieve and interpret database error information in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).