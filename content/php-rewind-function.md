+++
title = "PHP rewind Function"
date = 2025-08-29T20:06:04.948+01:00
draft = false
description = "PHP rewind function tutorial shows how to reset file pointers in PHP. Learn rewind with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP rewind Function

last modified April 3, 2025

The PHP rewind function resets a file pointer to the beginning of a
file. It's essential when you need to read a file multiple times or reset
position after operations.

## Basic Definition

The rewind function sets the file position indicator for a file
pointer to the beginning of the file stream. It takes one parameter: the file
pointer resource.

Syntax: rewind(resource $stream): bool. The function returns true on
success or false on failure. It works with files opened with fopen.

## Basic rewind Example

This shows the simplest usage of rewind to reset a file pointer.

basic_rewind.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
fread($file, 10); // Read first 10 bytes
rewind($file); // Reset to beginning
$content = fread($file, filesize('example.txt'));

echo $content;
fclose($file);

This reads 10 bytes, rewinds to start, then reads the entire file. Without
rewind, the second read would start from byte 10. Always close files after use.

## Rewind After Writing

Rewind is useful after writing to read the written content immediately.

rewind_after_write.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('temp.txt', 'w+');
fwrite($file, "Hello World");
rewind($file);
$content = fread($file, filesize('temp.txt'));

echo $content; // Outputs: Hello World
fclose($file);
unlink('temp.txt');

We write to a file, rewind to start, then read what we wrote. The 'w+' mode
allows both read and write operations. Temporary files should be cleaned up.

## Rewind with CSV File

Rewind helps when processing CSV files multiple times without reopening.

rewind_csv.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.csv', 'r');

// First pass: count lines
$lineCount = 0;
while (!feof($file)) {
    fgetcsv($file);
    $lineCount++;
}
rewind($file);

// Second pass: process data
while (($data = fgetcsv($file)) !== false) {
    print_r($data);
}

fclose($file);

This counts lines, rewinds, then processes the CSV data. Without rewind, the
second loop wouldn't run as the pointer would be at EOF. CSV processing often
requires multiple passes.

## Rewind in Large File Processing

Rewind enables efficient processing of large files in chunks.

large_file.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('large.log', 'r');
$chunkSize = 1024; // 1KB chunks

// Process first chunk
$chunk1 = fread($file, $chunkSize);
processChunk($chunk1);

rewind($file);

// Process first chunk again differently
$chunk1a = fread($file, $chunkSize);
processChunkDifferently($chunk1a);

fclose($file);

function processChunk(string $data): void {
    echo "Processing chunk: " . strlen($data) . " bytes\n";
}

function processChunkDifferently(string $data): void {
    echo "Alternative processing: " . strlen($data) . " bytes\n";
}

This demonstrates processing the same chunk multiple ways without reopening.
Rewind is more efficient than closing/reopening for large files. Chunk processing
conserves memory with big files.

## Rewind with Custom Stream Wrapper

Rewind works with custom stream wrappers that implement seek functionality.

stream_wrapper.php
  

&lt;?php

declare(strict_types=1);

class MemoryStream {
    private $position = 0;
    private $data = '';

    public function stream_open(string $path, string $mode, int $options, ?string &amp;$opened_path): bool {
        return true;
    }

    public function stream_read(int $count): string|false {
        $ret = substr($this-&gt;data, $this-&gt;position, $count);
        $this-&gt;position += strlen($ret);
        return $ret;
    }

    public function stream_write(string $data): int {
        $this-&gt;data .= $data;
        return strlen($data);
    }

    public function stream_tell(): int {
        return $this-&gt;position;
    }

    public function stream_eof(): bool {
        return $this-&gt;position &gt;= strlen($this-&gt;data);
    }

    public function stream_seek(int $offset, int $whence): bool {
        switch ($whence) {
            case SEEK_SET:
                $this-&gt;position = $offset;
                return true;
            case SEEK_CUR:
                $this-&gt;position += $offset;
                return true;
            case SEEK_END:
                $this-&gt;position = strlen($this-&gt;data) + $offset;
                return true;
            default:
                return false;
        }
    }
}

stream_wrapper_register('memory', 'MemoryStream');

$file = fopen('memory://test', 'w+');
fwrite($file, "Test data");
rewind($file);
echo fread($file, 4); // Outputs: Test
fclose($file);

This custom stream wrapper demonstrates rewind implementation. The stream_seek
method enables rewind functionality. Custom wrappers must implement seek to
support rewind.

## Best Practices

- **Error Handling:** Check rewind return value for success.

- **Resource Management:** Always close files after use.

- **Position Awareness:** Know your file pointer position.

- **Mode Compatibility:** Ensure file mode supports seeking.

## Source

[PHP rewind Documentation](https://www.php.net/manual/en/function.rewind.php)

This tutorial covered the PHP rewind function with practical
examples showing its usage in different file handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).