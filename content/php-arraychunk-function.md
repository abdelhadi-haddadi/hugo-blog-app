+++
title = "PHP array_chunk Function"
date = 2025-08-29T20:04:55.539+01:00
draft = false
description = "PHP array_chunk function tutorial shows how to split arrays into chunks in PHP. Learn array_chunk with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_chunk Function

last modified March 13, 2025

The PHP array_chunk function splits an array into chunks of
smaller arrays. It's useful for processing large arrays in manageable parts.

## Basic Definition

The array_chunk function divides an array into chunks of specified
size. It returns a new multidimensional array containing the chunks.

Syntax: array_chunk(array $array, int $size, bool $preserve_keys = false): array.
The $size determines chunk size. $preserve_keys keeps original keys.

## Basic array_chunk Example

This demonstrates splitting a simple array into chunks of 2 elements each.

basic_array_chunk.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6, 7, 8];
$chunks = array_chunk($numbers, 2);

print_r($chunks);

Output shows the original array divided into 4 chunks, each containing 2
elements. The keys are reindexed starting from 0 in each chunk.

## Preserving Original Keys

This example shows how to maintain original array keys in the chunks.

preserve_keys.php
  

&lt;?php

$assocArray = [
    'a' =&gt; 1,
    'b' =&gt; 2,
    'c' =&gt; 3,
    'd' =&gt; 4
];
$chunks = array_chunk($assocArray, 2, true);

print_r($chunks);

With preserve_keys set to true, the output maintains 'a', 'b',
'c', 'd' keys in their respective chunks instead of reindexing.

## Uneven Chunk Division

When array length isn't divisible by chunk size, the last chunk will be smaller.

uneven_chunks.php
  

&lt;?php

$colors = ['red', 'green', 'blue', 'yellow', 'black'];
$chunks = array_chunk($colors, 2);

print_r($chunks);

This creates 3 chunks: two with 2 colors each and a final chunk with 1 color.
The function handles uneven divisions automatically.

## Processing Large Arrays

Chunking is useful for processing large arrays in batches to manage memory.

batch_processing.php
  

&lt;?php

$bigArray = range(1, 1000);
$batchSize = 100;

foreach (array_chunk($bigArray, $batchSize) as $chunk) {
    // Process 100 elements at a time
    processBatch($chunk);
}

function processBatch(array $batch): void {
    echo "Processing " . count($batch) . " elements\n";
}

This processes 1000 elements in batches of 100, reducing memory usage by
not loading all elements at once. Each iteration handles one chunk.

## Multidimensional Array Chunking

Chunking works with multidimensional arrays, splitting at the top level.

multidimensional.php
  

&lt;?php

$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
];
$chunks = array_chunk($matrix, 2);

print_r($chunks);

The 4x3 matrix is split into two chunks, each containing 2 sub-arrays. The
inner arrays remain intact within their respective chunks.

## Best Practices

- **Memory Management:** Use chunking for large datasets to reduce memory load.

- **Batch Processing:** Process chunks sequentially for better performance.

- **Key Preservation:** Preserve keys when original indexes matter.

- **Chunk Size:** Choose appropriate sizes based on system resources.

## Source

[PHP array_chunk Documentation](https://www.php.net/manual/en/function.array-chunk.php)

This tutorial covered the PHP array_chunk function with practical
examples showing its usage for array processing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).