+++
title = "PHP fsockopen Function"
date = 2025-08-29T20:06:10.607+01:00
draft = false
description = "PHP fsockopen function tutorial shows how to create network sockets in PHP. Learn fsockopen with practical examples for HTTP, SMTP and custom protocols."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fsockopen Function

last modified April 4, 2025

The PHP fsockopen function opens a network socket connection.
It enables low-level network communication with various protocols.

## Basic Definition

fsockopen initiates a socket connection to a specified host.
It works with TCP/IP sockets for both IPv4 and IPv6 addresses.

Syntax: fsockopen(string $hostname, int $port, int &amp;$errno, string &amp;$errstr, float $timeout = ini_get("default_socket_timeout")): resource|false.
Returns a file pointer on success, false on failure.

## Basic HTTP Request

This example demonstrates making a simple HTTP GET request using fsockopen.

http_request.php
  

&lt;?php

declare(strict_types=1);

$fp = fsockopen("www.example.com", 80, $errno, $errstr, 30);

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

This connects to example.com on port 80 (HTTP), sends a GET request,
and reads the response. The connection is properly closed afterward.

## SMTP Email Sending

This shows how to send an email through SMTP using raw socket communication.

smtp_email.php
  

&lt;?php

declare(strict_types=1);

$smtp = fsockopen("smtp.example.com", 25, $errno, $errstr, 30);

if (!$smtp) {
    die("Error: $errstr ($errno)");
}

$commands = [
    "EHLO localhost\r\n",
    "MAIL FROM: &lt;sender@example.com&gt;\r\n",
    "RCPT TO: &lt;recipient@example.com&gt;\r\n",
    "DATA\r\n",
    "Subject: Test\r\n\r\nHello World\r\n.\r\n",
    "QUIT\r\n"
];

foreach ($commands as $cmd) {
    fwrite($smtp, $cmd);
    echo fgets($smtp, 256);
}

fclose($smtp);

This connects to an SMTP server and sends a basic email by issuing SMTP
commands directly. Each command receives a response from the server.

## Port Scanner

This example creates a simple port scanner to check open ports on a host.

port_scanner.php
  

&lt;?php

declare(strict_types=1);

function scanPort($host, $port, $timeout = 1) {
    $fp = @fsockopen($host, $port, $errno, $errstr, $timeout);
    if ($fp) {
        fclose($fp);
        return true;
    }
    return false;
}

$host = "example.com";
$ports = [21, 22, 25, 80, 443];

foreach ($ports as $port) {
    $status = scanPort($host, $port) ? "open" : "closed";
    echo "Port $port is $status\n";
}

The function attempts to connect to each port with a short timeout.
If connection succeeds, the port is open. This is a basic security tool.

## Custom TCP Client

This demonstrates a custom TCP client that sends and receives data.

tcp_client.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("tcp://127.0.0.1", 9000, $errno, $errstr, 30);

if (!$socket) {
    die("Error: $errstr ($errno)");
}

fwrite($socket, "Hello Server!\n");
echo "Server says: " . fgets($socket, 1024);

fclose($socket);

This connects to a local TCP server on port 9000, sends a message,
and reads the response. Useful for custom protocol implementations.

## HTTPS Connection

This shows how to establish a secure HTTPS connection using fsockopen.

https_request.php
  

&lt;?php

declare(strict_types=1);

$host = "www.example.com";
$port = 443;
$timeout = 30;

$fp = fsockopen("ssl://$host", $port, $errno, $errstr, $timeout);

if (!$fp) {
    die("Error: $errstr ($errno)");
}

$out = "GET / HTTP/1.1\r\n";
$out .= "Host: $host\r\n";
$out .= "Connection: Close\r\n\r\n";

fwrite($fp, $out);
while (!feof($fp)) {
    echo fgets($fp, 128);
}
fclose($fp);

This connects to port 443 (HTTPS) using the ssl:// protocol prefix.
The rest works like HTTP but with encrypted transport layer security.

## Best Practices

- **Error Handling:** Always check for connection errors

- **Timeouts:** Set appropriate timeout values

- **Resource Cleanup:** Always close connections with fclose

- **Security:** Validate all input to prevent injection

- **Performance:** Reuse connections when possible

## Source

[PHP fsockopen Documentation](https://www.php.net/manual/en/function.fsockopen.php)

This tutorial covered the PHP fsockopen function with practical
examples for various network communication scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).