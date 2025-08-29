+++
title = "PHP pfsockopen Function"
date = 2025-08-29T20:06:19.437+01:00
draft = false
description = "PHP pfsockopen function tutorial shows how to create persistent network connections in PHP. Learn pfsockopen with practical examples for HTTP, SMTP, and custom protocols."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP pfsockopen Function

last modified April 4, 2025

The PHP pfsockopen function opens a persistent Internet or Unix
domain socket connection. It's similar to fsockopen but maintains the
connection between requests.

## Basic Definition

pfsockopen establishes a persistent socket connection to a
specified host and port. The connection remains open across multiple
script executions.

Syntax: pfsockopen(string $hostname, int $port = -1, int &amp;$errno = null,
string &amp;$errstr = null, float $timeout = ini_get("default_socket_timeout")).
Returns a file pointer on success, false on failure.

## Basic HTTP Request

This example demonstrates making a simple HTTP GET request using pfsockopen.

http_request.php
  

&lt;?php

declare(strict_types=1);

$fp = pfsockopen("www.example.com", 80, $errno, $errstr, 30);

if (!$fp) {
    echo "Error: $errstr ($errno)";
} else {
    $out = "GET / HTTP/1.1\r\n";
    $out .= "Host: www.example.com\r\n";
    $out .= "Connection: Close\r\n\r\n";
    
    fwrite($fp, $out);
    
    while (!feof($fp)) {
        echo fgets($fp, 128);
    }
    
    fclose($fp);
}

This connects to example.com on port 80 and sends a basic HTTP GET request.
The response is read line by line and output. The connection is persistent.

## SMTP Email Sending

This example shows how to send an email through SMTP using pfsockopen.

smtp_email.php
  

&lt;?php

declare(strict_types=1);

$smtp = pfsockopen("mail.example.com", 25, $errno, $errstr, 30);

if (!$smtp) {
    die("Error: $errstr ($errno)");
}

function smtp_command($socket, $cmd) {
    fwrite($socket, $cmd . "\r\n");
    return fgets($socket, 512);
}

echo smtp_command($smtp, "EHLO localhost");
echo smtp_command($smtp, "MAIL FROM: &lt;sender@example.com&gt;");
echo smtp_command($smtp, "RCPT TO: &lt;recipient@example.com&gt;");
echo smtp_command($smtp, "DATA");
echo smtp_command($smtp, "Subject: Test\r\n\r\nHello World\r\n.");
echo smtp_command($smtp, "QUIT");

fclose($smtp);

This connects to an SMTP server and sends a basic email. The connection
persists between commands. Each SMTP command gets a response from the server.

## Custom TCP Server Communication

This example demonstrates communication with a custom TCP server.

custom_tcp.php
  

&lt;?php

declare(strict_types=1);

$socket = pfsockopen("tcp://127.0.0.1", 9000, $errno, $errstr, 30);

if (!$socket) {
    die("Error: $errstr ($errno)");
}

fwrite($socket, "PING\r\n");
$response = fgets($socket, 1024);

echo "Server response: $response";

fwrite($socket, "QUIT\r\n");
fclose($socket);

This connects to a local TCP server on port 9000. It sends a PING command
and reads the response. The connection remains open for subsequent requests.

## HTTPS Connection with Context

This example shows how to establish a secure HTTPS connection.

https_connection.php
  

&lt;?php

declare(strict_types=1);

$context = stream_context_create([
    'ssl' =&gt; [
        'verify_peer' =&gt; false,
        'verify_peer_name' =&gt; false
    ]
]);

$fp = pfsockopen('ssl://www.example.com', 443, $errno, $errstr, 30, $context);

if (!$fp) {
    die("Error: $errstr ($errno)");
}

$out = "GET / HTTP/1.1\r\n";
$out .= "Host: www.example.com\r\n";
$out .= "Connection: Close\r\n\r\n";

fwrite($fp, $out);

while (!feof($fp)) {
    echo fgets($fp, 128);
}

fclose($fp);

This establishes a secure HTTPS connection using SSL. The stream context
allows configuration of SSL parameters. The connection persists for reuse.

## Unix Domain Socket Communication

This example demonstrates communication with a Unix domain socket.

unix_socket.php
  

&lt;?php

declare(strict_types=1);

$socket = pfsockopen("unix:///var/run/myservice.sock", 0, $errno, $errstr, 30);

if (!$socket) {
    die("Error: $errstr ($errno)");
}

fwrite($socket, "STATUS\r\n");
$response = fgets($socket, 1024);

echo "Service status: $response";

fclose($socket);

This connects to a Unix domain socket at /var/run/myservice.sock. It sends
a STATUS command and reads the response. The connection remains persistent.

## Best Practices

- **Error Handling:** Always check for connection errors

- **Timeouts:** Set appropriate timeout values

- **Cleanup:** Close connections when done

- **Security:** Validate all input/output

- **Performance:** Reuse connections when possible

## Source

[PHP pfsockopen Documentation](https://www.php.net/manual/en/function.pfsockopen.php)

This tutorial covered the PHP pfsockopen function with practical
examples for various network communication scenarios using persistent connections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).