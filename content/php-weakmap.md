+++
title = "PHP WeakMap"
date = 2025-08-29T20:04:52.240+01:00
draft = false
description = "PHP WeakMap tutorial shows how to use WeakMap for managing object references in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP WeakMap

last modified March 11, 2025

In this article, we explore the WeakMap in PHP. A
WeakMap is a special type of map that allows objects to be used as
keys without preventing them from being garbage collected. This is useful for
managing object references without causing memory leaks.

## Main Features of PHP WeakMap

    - Object Keys: WeakMap allows objects to be used as keys.

    - Garbage Collection: Objects used as keys in a WeakMap do not prevent garbage collection.

    - Memory Efficiency: WeakMap helps in managing memory efficiently by not holding strong references to objects.

    - Dynamic Key Removal: When an object key is garbage collected, it is automatically removed from the WeakMap.

WeakMap is particularly useful in scenarios where you need to associate metadata
with objects without affecting their lifecycle.

## Basic Usage of WeakMap

The following example shows how to cache user session data with WeakMap.

main.php
    

&lt;?php

declare(strict_types=1);

$sessionCache = new WeakMap();

$userSession = new stdClass();
$userSession-&gt;id = "sess123";
$sessionCache[$userSession] = ["last_login" =&gt; "2025-03-11"];

var_dump($sessionCache[$userSession]); // Shows cached session data

In this practical example, we use a WeakMap to store session data
for a user session object. The session object acts as the key, and an array
containing metadata (like the last login time) is the value.

This approach is useful in web applications where you might want to temporarily
cache data tied to a session without keeping the session alive indefinitely.
When the session object is no longer referenced elsewhere, it's garbage collected,
and the WeakMap entry disappears automatically.

$ php main.php
array(1) { ["last_login"]=&gt; string(10) "2025-03-11" }

## Garbage Collection with WeakMap

This example tracks temporary database connections with WeakMap.

main.php
  

&lt;?php

declare(strict_types=1);

$connectionMap = new WeakMap();

function createConnection(): stdClass {
    $conn = new stdClass();
    $conn-&gt;id = "conn" . rand(1000, 9999);
    global $connectionMap;
    $connectionMap[$conn] = ["opened" =&gt; time()];
    return $conn;
}

$conn = createConnection();
var_dump($connectionMap[$conn]); // Shows connection metadata

unset($conn); // Connection is eligible for garbage collection
var_dump($connectionMap); // Empty WeakMap after GC

Here, we simulate a database connection manager using a WeakMap to
track connection metadata, such as when it was opened. The connection object is
created inside a function and stored in the WeakMap.

When we call unset($conn), the connection object loses its last
strong reference. PHP's garbage collector can then reclaim it, and because
WeakMap uses weak references, the entry is automatically removed.
This is ideal for managing resources that should clean up naturally when no
longer needed.

In a real application, this could help track database connections or API clients
without risking memory leaks if connections are abandoned.

$ php main.php
array(1) { ["opened"]=&gt; int(1741742400) }
object(WeakMap)#1 (0) {}

## Using WeakMap with Multiple Objects

This example manages multiple loggers tied to request objects.

main.php
  

&lt;?php

declare(strict_types=1);

$logMap = new WeakMap();

$request1 = new stdClass();
$request1-&gt;id = "req1";
$request2 = new stdClass();
$request2-&gt;id = "req2";

$logMap[$request1] = ["log" =&gt; "Request 1 started"];
$logMap[$request2] = ["log" =&gt; "Request 2 started"];

var_dump($logMap[$request1]); // Shows log for request 1
var_dump($logMap[$request2]); // Shows log for request 2

unset($request1); // Request 1 can be garbage collected
var_dump($logMap); // Only request 2 remains

In this scenario, we use a WeakMap to associate log entries with
HTTP request objects. Each request object is a key, and its value is an array
containing a log message.

When unset($request1) is called, the first request object becomes
eligible for garbage collection. The WeakMap automatically drops
its entry, leaving only the second request's log. This demonstrates how
WeakMap can handle multiple objects dynamically.

This is practical in web frameworks where you might want to log request-specific
data without tying the log's lifecycle to the request's existence.

$ php main.php
array(1) { ["log"]=&gt; string(16) "Request 1 started" }
array(1) { ["log"]=&gt; string(16) "Request 2 started" }
object(WeakMap)#1 (1) { ... }

## WeakMap with Custom Objects

This example caches user permissions using a custom User class.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(public string $name) {}
}

$permissionMap = new WeakMap();

$user = new User("Jane Doe");
$permissionMap[$user] = ["role" =&gt; "admin", "access" =&gt; ["read", "write"]];

var_dump($permissionMap[$user]); // Shows user permissions

unset($user); // User object is garbage collected
var_dump($permissionMap); // Empty after GC

Here, we define a User class with a public name
property and use it as a key in a WeakMap. The value is an array
representing the user's permissions, including their role and access rights.

This is a practical use case for permission caching in an authentication system.
When the $user object is unset, it's garbage collected, and the
WeakMap removes the entry. This ensures that permission data
doesn't linger in memory after the user object is no longer needed.

$ php main.php
array(2) { ["role"]=&gt; string(5) "admin" ["access"]=&gt; array(2) { [0]=&gt; string(4) "read" [1]=&gt; string(5) "write" } }
object(WeakMap)#1 (0) {}

## WeakMap with Iteration

This example iterates over a WeakMap to log active sessions.

main.php
  

&lt;?php

declare(strict_types=1);

$sessionMap = new WeakMap();

$session1 = new stdClass();
$session1-&gt;id = "sess1";
$session2 = new stdClass();
$session2-&gt;id = "sess2";

$sessionMap[$session1] = ["ip" =&gt; "192.168.1.1"];
$sessionMap[$session2] = ["ip" =&gt; "10.0.0.1"];

foreach ($sessionMap as $session =&gt; $data) {
    echo "Session {$session-&gt;id}: IP {$data['ip']}\n";
}

In this example, we use a WeakMap to store IP addresses for active
sessions. The foreach loop iterates over the map, printing each
session's ID and IP address.

This is useful for debugging or monitoring active sessions in a server
application. Iteration works as long as the session objects are still
referenced. If a session were unset before the loop, it wouldn't appear, thanks
to WeakMap's automatic cleanup.

$ php main.php
Session sess1: IP 192.168.1.1
Session sess2: IP 10.0.0.1

## WeakMap for Resource Tracking

This example tracks file handles opened by a file processor.

main.php
  

&lt;?php

declare(strict_types=1);

class FileProcessor {
    public function __construct(public string $filename) {}
}

$resourceMap = new WeakMap();

$processor = new FileProcessor("data.txt");
$resourceMap[$processor] = ["handle" =&gt; fopen($processor-&gt;filename, "r")];

var_dump($resourceMap[$processor]); // Shows file handle resource

unset($processor); // Processor and handle can be garbage collected
var_dump($resourceMap); // Empty after GC

In this scenario, we use a WeakMap to associate a file handle with
a FileProcessor object. The processor object represents a file
being worked on, and the map stores the open file resource as metadata.

This is practical for resource management in file-processing applications.
When $processor is unset, it's garbage collected, and the
WeakMap entry is removed. In a real app, you'd close the file handle
explicitly, but this shows how WeakMap avoids keeping dead
references.

$ php main.php
array(1) { ["handle"]=&gt; resource(5) of type (stream) }
object(WeakMap)#1 (0) {}

## WeakMap with Object Pool

This example uses WeakMap to manage a pool of reusable database connections.

main.php
  

&lt;?php

declare(strict_types=1);

class DbConnection {
    public function __construct(public string $dsn) {}
}

$poolMap = new WeakMap();

function getConnection(string $dsn): DbConnection {
    $conn = new DbConnection($dsn);
    global $poolMap;
    $poolMap[$conn] = ["active" =&gt; true, "last_used" =&gt; time()];
    return $conn;
}

$conn1 = getConnection("mysql:host=localhost");
$conn2 = getConnection("mysql:host=remote");

var_dump($poolMap[$conn1]); // Shows connection 1 metadata
unset($conn2); // Connection 2 is removed from pool
var_dump(count($poolMap)); // Only 1 connection remains

Here, we simulate a database connection pool using a WeakMap. Each
DbConnection object is a key, and its value tracks its status and
last-used time. The getConnection function creates and registers
connections.

This is a practical use case for managing a pool of resources like database
connections or API clients. When $conn2 is unset, it's eligible for
garbage collection, and the WeakMap shrinks accordingly. This
ensures the pool only holds active connections.

In a production system, you'd add logic to reuse connections or limit the pool
size, but this illustrates how WeakMap helps manage temporary
object references without manual cleanup.

$ php main.php
array(2) { ["active"]=&gt; bool(true) ["last_used"]=&gt; int(1741742400) }
int(1)

## Source

[PHP WeakMap - Documentation](https://www.php.net/manual/en/class.weakmap.php)

In this article, we have shown how to use WeakMap in PHP for
managing object references. WeakMap is a powerful tool for associating metadata
with objects without affecting their lifecycle.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).