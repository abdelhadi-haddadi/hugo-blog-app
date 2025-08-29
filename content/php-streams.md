+++
title = "PHP Streams"
date = 2025-08-29T20:04:44.941+01:00
draft = false
description = "PHP streams tutorial shows how to work with streams in PHP. Learn to handle files, network communication, and custom stream wrappers with examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Streams

last modified March 13, 2025

Streams in PHP provide a unified way to handle input and output operations, such
as reading from files, writing to network sockets, or processing data from
external sources. This tutorial covers the basics of PHP streams, including
file handling, network communication, and custom stream wrappers.

## Basic File Streams

PHP provides functions like fopen, fread, and
fclose to work with file streams. These functions allow you to
read from and write to files.

basic_file_stream.php
  

&lt;?php

$logFile = fopen("app_logs.txt", "a");

if ($logFile) {

    $timestamp = date("Y-m-d H:i:s");
    fwrite($logFile, "[$timestamp] User logged in\n");
    fclose($logFile);
    echo "Log entry added.\n";
} else {
    echo "Failed to open log file.\n";
}

This example simulates appending a log entry to a file in an application. The
fopen function opens app_logs.txt in append mode
("a"), creating the file if it doesn't exist. This is a common
task in systems that track user activity or errors.

If the stream opens successfully, a timestamped message is written using
fwrite, and the stream is closed with fclose to free
resources. The output confirms the action. This practical use of streams
demonstrates basic file I/O in a real-world logging scenario.

## Reading from a File Stream

You can read data from a file stream using fread or
fgets.

read_file_stream.php
  

&lt;?php

$configFile = fopen("config.ini", "r");

if ($configFile) {

    $settings = [];

    while (($line = fgets($configFile)) !== false) {

        $trimmed = trim($line);

        if ($trimmed &amp;&amp; strpos($trimmed, "=") !== false) {
            [$key, $value] = explode("=", $trimmed, 2);
            $settings[$key] = $value;
        }
    }

    fclose($configFile);
    print_r($settings);
} else {
    echo "Failed to open config file.\n";
}

This example reads a configuration file (config.ini) to parse
key-value pairs, a common task in application setup. Assume
config.ini contains lines like host=localhost and
port=8080. The file is opened in read mode ("r").

The fgets function reads each line, and the code skips empty lines
or those without an equals sign. Each valid line is split into a key and value,
stored in an array. After closing the stream, the settings are printed. This
shows how streams handle structured file reading practically.

## Network Streams

PHP streams can also be used for network communication, such as reading from
a remote URL or connecting to a socket.

network_stream.php
  

&lt;?php

$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&amp;appid=YOUR_API_KEY";
$weatherStream = fopen($apiUrl, "r");

if ($weatherStream) {

    $response = stream_get_contents($weatherStream);
    $data = json_decode($response, true);
    echo "Temperature in London: " . ($data["main"]["temp"] - 273.15) . "°C\n";
    fclose($weatherStream);
} else {
    echo "Failed to fetch weather data.\n";
}

This example fetches weather data from the OpenWeatherMap API, a practical use
of network streams. The fopen function opens a stream to the API
URL (replace YOUR_API_KEY with a valid key). This mimics real-world
integration with external services.

If successful, stream_get_contents reads the entire JSON response,
which is decoded into an array. The temperature (in Kelvin) is converted to
Celsius and displayed. The stream is then closed. This demonstrates streams
handling HTTP requests, a common requirement in web applications.

## Stream Contexts

Stream contexts allow you to configure options for streams, such as HTTP headers
or SSL settings.

stream_context.php
  

&lt;?php

$options = [
    "http" =&gt; [
        "method" =&gt; "POST",
        "header" =&gt; "Content-Type: application/json\r\n",
        "content" =&gt; json_encode(["user_id" =&gt; 123, "action" =&gt; "login"])
    ]
];

$context = stream_context_create($options);
$endpoint = "https://api.example.com/auth";
$stream = fopen($endpoint, "r", false, $context);

if ($stream) {
    $response = stream_get_contents($stream);
    echo "Server response: $response\n";
    fclose($stream);
} else {
    echo "Failed to send request.\n";
}

This example sends a POST request to an authentication API, a realistic
scenario for user login systems. The stream context configures the HTTP method,
headers, and JSON payload using stream_context_create. This
customization is key for interacting with modern APIs.

The fopen function uses the context to open the stream, and
stream_get_contents retrieves the server's response (e.g., a
token). The stream is closed afterward. This illustrates how contexts enhance
streams for network communication, providing flexibility beyond simple GET
requests.

## Custom Stream Wrappers

PHP allows you to create custom stream wrappers to handle custom protocols or
data sources.

custom_wrapper.php
  

&lt;?php

class MemoryLogger {
    private array $logs = [];
    private int $position = 0;

    public function stream_open(string $path, string $mode): bool {
        return true;
    }

    public function stream_write(string $data): int {
        $this-&gt;logs[] = $data;
        return strlen($data);
    }

    public function stream_read(int $count): string {
        if ($this-&gt;stream_eof()) {
            return "";
        }
        $data = implode("", $this-&gt;logs);
        $ret = substr($data, $this-&gt;position, $count);
        $this-&gt;position += strlen($ret);
        return $ret;
    }

    public function stream_eof(): bool {
        return $this-&gt;position &gt;= strlen(implode("", $this-&gt;logs));
    }
}

stream_wrapper_register("memorylog", "MemoryLogger");

$logger = fopen("memorylog://debug", "w+");
fwrite($logger, "Error: Invalid input\n");
rewind($logger);
echo fread($logger, 1024);
fclose($logger);

This example defines a MemoryLogger custom stream wrapper for
in-memory logging, useful for debugging without file I/O. The wrapper stores
log messages in an array, simulating a stream-like interface. It's registered
as memorylog://.

The stream_write method appends data, while
stream_read reads from the concatenated logs, tracking position.
After writing an error message, rewind resets the position, and
fread retrieves it. This practical wrapper shows how streams can
extend beyond traditional files or networks.

## Stream Filters

Stream filters allow you to process data as it passes through a stream. PHP
provides built-in filters like string.toupper and
string.tolower.

stream_filter.php
  

&lt;?php
$file = fopen("user_data.csv", "r");

if ($file) {
    stream_filter_append($file, "convert.iconv.UTF-8/ISO-8859-1");
    $header = fgets($file); // e.g., "name,email"
    while (($line = fgets($file)) !== false) {
        echo "Processed: $line";
    }
    fclose($file);
} else {
    echo "Failed to open CSV file.\n";
}

This example processes a CSV file (user_data.csv) with a character
encoding filter, a practical need when importing data from diverse sources.
Assume the file is in UTF-8, and we convert it to ISO-8859-1 for compatibility
with an older system.

The convert.iconv.UTF-8/ISO-8859-1 filter is appended to the
stream, transforming data as it's read. The header is read first, then each
line is processed and echoed. This demonstrates how filters handle data
on-the-fly, avoiding manual conversion steps.

## Stream Metadata

You can retrieve metadata about a stream using the stream_get_meta_data
function.

stream_metadata.php
  

&lt;?php

$backupFile = fopen("backup.tar.gz", "rb");

if ($backupFile) {
    $metadata = stream_get_meta_data($backupFile);
    echo "Stream wrapper: " . $metadata["wrapper_type"] . "\n";
    echo "File size: " . filesize("backup.tar.gz") . " bytes\n";
    fclose($backupFile);
} else {
    echo "Failed to open backup file.\n";
}

This example examines metadata for a compressed backup file
(backup.tar.gz), opened in binary read mode ("rb").
This is useful for validating streams in archival or transfer tasks.

The stream_get_meta_data function returns details like the wrapper
type (e.g., plainfile) and mode. Here, we display the wrapper type
and complement it with filesize for context. Closing the stream
ensures resource cleanup. This shows how metadata aids stream management.

## Writing to a Compressed Stream

PHP supports compressed streams via wrappers like compress.zlib.

compress_stream.php
  

&lt;?php

$archive = fopen("compress.zlib://data.gz", "wb");

if ($archive) {
    fwrite($archive, "Sensitive data: User IDs and emails\n");
    fclose($archive);
    echo "Data compressed and saved.\n";
} else {
    echo "Failed to open compressed stream.\n";
}

This example writes to a gzip-compressed file using the
compress.zlib wrapper, a practical approach for storing logs or
data efficiently. The file data.gz is opened in binary write mode
("wb"), compressing data as it's written.

If the stream opens, fwrite adds a string, which is automatically
compressed, and fclose finalizes the file. The result is a smaller
file than plain text, ideal for backups or transfers. This leverages streams
for built-in compression without external tools.

## Streaming Large Files

Streams efficiently handle large files by reading or writing in chunks.

large_file_stream.php
  

&lt;?php

$source = fopen("large_video.mp4", "rb");
$dest = fopen("video_copy.mp4", "wb");

if ($source &amp;&amp; $dest) {

    while (!feof($source)) {
        $chunk = fread($source, 8192); // 8KB chunks
        fwrite($dest, $chunk);
    }
    fclose($source);
    fclose($dest);
    echo "Video file copied successfully.\n";
} else {
    echo "Failed to open files.\n";
}

This example copies a large video file (large_video.mp4) to a new
file, a common task in media processing. Both source and destination are
opened in binary mode ("rb" and "wb") to preserve
data integrity.

The while (!feof($source)) loop reads 8KB chunks with
fread, writing each to the destination stream. This avoids loading
the entire file into memory, making it efficient for gigabyte-sized files.
After completion, both streams are closed, and success is confirmed.

## Socket Streams

Streams can handle socket communication for real-time applications.

socket_stream.php
  

&lt;?php

$socket = stream_socket_client("tcp://localhost:8080", $errno, $errstr, 30);

if ($socket) {

    fwrite($socket, "GET /status HTTP/1.1\r\nHost: localhost\r\n\r\n");
    $response = stream_get_contents($socket);
    echo "Server response: $response\n";
    fclose($socket);
} else {
    echo "Failed to connect: $errstr ($errno)\n";
}

This example connects to a local TCP server on port 8080, simulating a simple
client in a networked application (e.g., a status check). The
stream_socket_client function establishes the socket stream,
with a 30-second timeout.

If successful, an HTTP GET request is sent via fwrite, and
stream_get_contents reads the response (assume the server replies
with a status). The stream is closed afterward. This demonstrates streams in
real-time communication, a key feature for chat or monitoring systems.

## Best Practices for Streams

**Use Stream Contexts:** Configure streams using contexts for
advanced options like HTTP headers or SSL settings.
**Handle Errors:** Always check if a stream was successfully
opened before performing operations.
**Close Streams:** Use fclose to close streams
and free resources.
**Use Filters:** Apply stream filters to process data on the
fly without modifying the source.

## Source

[PHP Streams Documentation](https://www.php.net/manual/en/book.stream.php)

In this tutorial, we explored how to work with streams in PHP, including file
handling, network communication, custom stream wrappers, and stream filters.
Streams provide a powerful and flexible way to handle input and output in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all PHP tutorials](/php/).