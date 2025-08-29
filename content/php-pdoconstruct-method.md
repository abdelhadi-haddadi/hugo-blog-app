+++
title = "PHP PDO::__construct Method"
date = 2025-08-29T20:06:23.882+01:00
draft = false
description = "Master the PHP PDO::__construct method to establish secure and efficient database connections with PDO."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::__construct Method

last modified April 19, 2025

The PDO::__construct method creates a new PDO instance representing
a connection to a database. It is the primary way to establish database
connections in PHP using PDO.

## Basic Definition

PDO::__construct creates a new PHP Data Objects (PDO) instance. This
represents a connection between PHP and a database server. The method
takes a DSN (Data Source Name) parameter.

Syntax: public PDO::__construct(string $dsn, string $username = null, string $password = null, array $options = null).
The DSN contains the database type, host, and database name.

## MySQL Connection Example

This shows how to connect to a MySQL database using PDO::__construct.

pdo_mysql_connect.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'mysql:host=localhost;dbname=testdb;charset=utf8mb4';
$username = 'dbuser';
$password = 'dbpass';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to MySQL successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

This creates a connection to a MySQL database. The DSN specifies the host,
database name, and charset. We set the error mode to exceptions for better
error handling.

## SQLite Connection Example

This demonstrates connecting to an SQLite database file using PDO.

pdo_sqlite_connect.php
  

&lt;?php

declare(strict_types=1);

$databaseFile = 'example.db';

try {
    $pdo = new PDO("sqlite:$databaseFile");
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to SQLite database successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

For SQLite, the DSN is simpler - just the driver and database file path.
No username or password is required for SQLite file databases.

## PostgreSQL Connection Example

This shows how to connect to a PostgreSQL database with PDO.

pdo_pgsql_connect.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'pgsql:host=localhost;port=5432;dbname=testdb';
$username = 'pguser';
$password = 'pgpass';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to PostgreSQL successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

The PostgreSQL DSN includes the host, port, and database name. PostgreSQL
requires authentication with username and password.

## Connection with Options

This demonstrates passing connection options to the PDO constructor.

pdo_options_connect.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'mysql:host=localhost;dbname=testdb';
$username = 'dbuser';
$password = 'dbpass';
$options = [
    PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE =&gt; PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES =&gt; false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Connected with custom options successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

The options array configures PDO behavior. We set error mode, fetch mode,
and disable prepared statement emulation. Options can also be set later
with setAttribute.

## Persistent Connection

This shows how to create a persistent database connection with PDO.

pdo_persistent_connect.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'mysql:host=localhost;dbname=testdb';
$username = 'dbuser';
$password = 'dbpass';
$options = [
    PDO::ATTR_PERSISTENT =&gt; true,
    PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Persistent connection established successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

Persistent connections remain open after script execution, reducing overhead.
Use them carefully as they can lead to too many open connections.

## Connection with SSL

This demonstrates establishing a secure MySQL connection with SSL.

pdo_ssl_connect.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'mysql:host=localhost;dbname=testdb';
$username = 'dbuser';
$password = 'dbpass';
$options = [
    PDO::MYSQL_ATTR_SSL_CA =&gt; '/path/to/ca-cert.pem',
    PDO::MYSQL_ATTR_SSL_CERT =&gt; '/path/to/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_KEY =&gt; '/path/to/client-key.pem',
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT =&gt; false,
    PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Secure SSL connection established successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

This configures SSL for the MySQL connection. The options specify certificate
files and disable server certificate verification (not recommended for production).

## Connection with Custom Attributes

This shows setting custom driver-specific attributes during connection.

pdo_custom_attrs.php
  

&lt;?php

declare(strict_types=1);

$dsn = 'mysql:host=localhost;dbname=testdb';
$username = 'dbuser';
$password = 'dbpass';
$options = [
    PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION,
    PDO::MYSQL_ATTR_INIT_COMMAND =&gt; "SET NAMES utf8mb4",
    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY =&gt; true,
    PDO::ATTR_TIMEOUT =&gt; 5
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Connection with custom attributes established";
} catch (PDOException $e) {
    die("Connection failed: " . $e-&gt;getMessage());
}

This sets MySQL-specific attributes like INIT_COMMAND and USE_BUFFERED_QUERY.
The ATTR_TIMEOUT sets a connection timeout. Different drivers support
different custom attributes.

## Best Practices

- **DSN Format:** Always use the correct DSN format for your database.

- **Error Handling:** Always use try-catch blocks with PDO.

- **Secure Credentials:** Store credentials securely, not in code.

- **Character Set:** Specify charset in DSN or with INIT_COMMAND.

- **Connection Options:** Set important options during connection.

## Source

[PHP PDO::__construct Documentation](https://www.php.net/manual/en/pdo.construct.php)

This tutorial covered the PDO::__construct method with practical examples
showing different database connections and configuration options.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).