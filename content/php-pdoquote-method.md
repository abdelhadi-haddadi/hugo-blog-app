+++
title = "PHP PDO::quote Method"
date = 2025-08-29T20:06:29.409+01:00
draft = false
description = "Explore the PHP PDO::quote method for escaping SQL inputs and preventing injection attacks."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::quote Method

last modified April 19, 2025

The PDO::quote method in PHP is used to escape and quote a string for use
in SQL queries. It helps prevent SQL injection when not using prepared
statements.

## Basic Definition

PDO::quote places quotes around a string and escapes special characters
within the input string. It returns a quoted string that is theoretically
safe to include in an SQL statement.

Syntax: public PDO::quote(string $string, int $parameter_type = PDO::PARAM_STR): string|false.
The method returns the quoted string or false on failure.

## Basic Usage Example

This demonstrates the simplest use of PDO::quote to escape a string.

pdo_quote_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $string = "O'Reilly";
    $quoted = $pdo-&gt;quote($string);
    
    echo "Original: $string\n";
    echo "Quoted: $quoted";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This escapes the apostrophe in "O'Reilly" by adding a backslash. The output
will show the properly quoted string that can be safely used in SQL queries.

## Using quote in SQL Query

This shows how to use PDO::quote in a direct SQL query execution.

pdo_quote_query.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $name = "John O'Connor";
    $quotedName = $pdo-&gt;quote($name);
    
    $sql = "SELECT * FROM users WHERE name = $quotedName";
    $stmt = $pdo-&gt;query($sql);
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "User found: {$user['name']}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This safely includes user input in an SQL query by quoting it first. Note
that prepared statements are generally preferred over this approach for
security.

## Quote with Different Parameter Types

PDO::quote can handle different parameter types like strings and integers.

pdo_quote_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    
    // String parameter
    $string = "It's a string";
    $quotedString = $pdo-&gt;quote($string, PDO::PARAM_STR);
    
    // Integer parameter
    $number = 42;
    $quotedNumber = $pdo-&gt;quote($number, PDO::PARAM_INT);
    
    echo "Quoted string: $quotedString\n";
    echo "Quoted number: $quotedNumber";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates quoting different data types. Note that PDO::PARAM_INT
still returns a string with quotes, which may not be suitable for all
database operations.

## Quote for LIKE Clause

Special handling is needed when using PDO::quote with LIKE clauses.

pdo_quote_like.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $search = "%test%";
    $quotedSearch = $pdo-&gt;quote($search);
    
    // Remove outer quotes added by quote()
    $quotedSearch = trim($quotedSearch, "'");
    
    $sql = "SELECT * FROM products WHERE name LIKE '%$quotedSearch%'";
    $stmt = $pdo-&gt;query($sql);
    
    while ($row = $stmt-&gt;fetch()) {
        echo "Product: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows how to handle LIKE wildcards with PDO::quote. We remove the outer
quotes to properly include the wildcard characters in the SQL pattern.

## Quote for Multiple Values

This demonstrates quoting multiple values for use in an IN clause.

pdo_quote_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $values = ["apple", "banana", "cherry"];
    
    $quotedValues = array_map([$pdo, 'quote'], $values);
    $inClause = implode(',', $quotedValues);
    
    $sql = "SELECT * FROM fruits WHERE name IN ($inClause)";
    $stmt = $pdo-&gt;query($sql);
    
    while ($row = $stmt-&gt;fetch()) {
        echo "Fruit: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a safe IN clause by quoting each array element. The array_map
function applies quote to each value, and implode combines them with commas.

## Quote vs Prepared Statements

This compares using PDO::quote with prepared statements for security.

pdo_quote_vs_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $input = "O'Reilly";
    
    // Using quote
    $quoted = $pdo-&gt;quote($input);
    $sql1 = "SELECT * FROM books WHERE author = $quoted";
    
    // Using prepared statement
    $sql2 = "SELECT * FROM books WHERE author = ?";
    $stmt = $pdo-&gt;prepare($sql2);
    $stmt-&gt;execute([$input]);
    
    echo "Query with quote: $sql1\n";
    echo "Prepared statement is generally preferred for security";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

While both methods protect against SQL injection, prepared statements are
generally preferred. They're more secure and often more performant for
repeated queries.

## Database-Specific Behavior

PDO::quote behavior can vary between database drivers as shown here.

pdo_quote_drivers.php
  

&lt;?php

declare(strict_types=1);

$string = "It's a test";

// MySQL
$mysql = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
echo "MySQL: " . $mysql-&gt;quote($string) . "\n";

// SQLite
$sqlite = new PDO('sqlite:test.db');
echo "SQLite: " . $sqlite-&gt;quote($string) . "\n";

// PostgreSQL
$pgsql = new PDO('pgsql:host=localhost;dbname=testdb', 'user', 'password');
echo "PostgreSQL: " . $pgsql-&gt;quote($string) . "\n";

Different database drivers may implement quote differently. Always test with
your specific database to understand the exact behavior of PDO::quote.

## Best Practices

- **Prepared Statements First:** Use them instead of quote when possible.

- **Driver Awareness:** Know your database's quote behavior.

- **Type Safety:** Specify parameter types when quoting.

- **Error Handling:** Always check for quote failures.

- **Performance:** Avoid quote in loops; use prepared statements.

## Source

[PHP PDO::quote Documentation](https://www.php.net/manual/en/pdo.quote.php)

This tutorial covered the PDO::quote method with practical examples showing
its usage in different database scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).