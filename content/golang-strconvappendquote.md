+++
title = "Golang strconv.AppendQuote"
date = 2025-08-29T19:56:10.936+01:00
draft = false
description = "Learn how to append quoted strings to byte slices using strconv.AppendQuote in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuote

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuote function in Go.
We'll cover string quoting basics with practical examples of appending quoted strings.

The strconv.AppendQuote function appends a double-quoted Go string literal
to a byte slice. It properly escapes special characters according to Go syntax rules.

This function is useful when building byte slices that need to contain quoted strings.
It's more efficient than creating strings first and then converting to bytes.

## Basic strconv.AppendQuote Example

The simplest use of strconv.AppendQuote appends a quoted string to a
byte slice. Here we demonstrate basic usage with different string inputs.

basic_appendquote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Prefix: ")
    buf = strconv.AppendQuote(buf, "Hello, World!")
    
    fmt.Println(string(buf))
    
    buf = []byte{}
    buf = strconv.AppendQuote(buf, "Go\"lang")
    fmt.Println(string(buf))
}

We start with a byte slice containing "Prefix: " and append a quoted string.
The second example shows quoting a string containing a double quote character.

## Appending Multiple Quoted Strings

strconv.AppendQuote can be used multiple times to build complex byte
slices. This example demonstrates building a JSON-like structure.

multiple_append.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("{")
    buf = append(buf, '\n')
    
    buf = append(buf, "  name: "...)
    buf = strconv.AppendQuote(buf, "John Doe")
    buf = append(buf, ',', '\n')
    
    buf = append(buf, "  email: "...)
    buf = strconv.AppendQuote(buf, "john@example.com")
    buf = append(buf, '\n', '}')
    
    fmt.Println(string(buf))
}

We build a structured byte slice by interleaving AppendQuote with
regular append operations. The result is a properly formatted output with quotes.

## Handling Special Characters

strconv.AppendQuote automatically escapes special characters. This
example shows how it handles various special cases in the input string.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    tests := []string{
        "Line\nBreak",
        "Tab\tHere",
        "Back\\Slash",
        "Quote\"Mark",
        "Non-ASCII: 日本語",
    }
    
    for _, s := range tests {
        buf := strconv.AppendQuote([]byte{}, s)
        fmt.Printf("%-20s → %s\n", s, string(buf))
    }
}

The function properly escapes newlines, tabs, backslashes, and quotes. It also
handles non-ASCII characters correctly by including them as-is in the output.

## Performance Comparison

This example compares the performance of AppendQuote versus
alternative methods of creating quoted strings.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
    "time"
)

func main() {
    const iterations = 1000000
    testStr := "The quick brown fox jumps over the lazy dog"
    
    // Benchmark AppendQuote
    start := time.Now()
    buf := make([]byte, 0, 100)
    for i := 0; i &lt; iterations; i++ {
        buf = strconv.AppendQuote(buf[:0], testStr)
    }
    fmt.Println("AppendQuote duration:", time.Since(start))
    
    // Benchmark Quote + conversion
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        _ = []byte(strconv.Quote(testStr))
    }
    fmt.Println("Quote+conversion duration:", time.Since(start))
    
    // Benchmark fmt.Sprintf
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        _ = []byte(fmt.Sprintf("%q", testStr))
    }
    fmt.Println("fmt.Sprintf duration:", time.Since(start))
}

AppendQuote is significantly faster than alternatives when building
byte slices directly. It avoids intermediate string allocations and conversions.

## Building CSV Data

This practical example shows using AppendQuote to build CSV data
with proper quoting of fields containing special characters.

csv_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    records := [][]string{
        {"Name", "Email", "Phone"},
        {"John Doe", "john@example.com", "123-456-7890"},
        {"Jane \"The Boss\" Smith", "jane@example.com", "987-654-3210"},
        {"Bob, Jr.", "bob@example.com", "555-123-4567"},
    }
    
    var csvData []byte
    for _, record := range records {
        for i, field := range record {
            if i &gt; 0 {
                csvData = append(csvData, ',')
            }
            csvData = strconv.AppendQuote(csvData, field)
        }
        csvData = append(csvData, '\n')
    }
    
    fmt.Println(string(csvData))
}

We build a CSV file by properly quoting each field. Fields containing commas or
quotes are automatically escaped, producing valid CSV output.

## Custom JSON Encoding

This example demonstrates a simplified JSON encoder using AppendQuote
for string values in the JSON output.

json_encoder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    data := map[string]string{
        "name":    "Alice",
        "address": "123 \"Main\" St",
        "city":    "New York",
    }
    
    var jsonBuf []byte
    jsonBuf = append(jsonBuf, '{', '\n')
    
    first := true
    for k, v := range data {
        if !first {
            jsonBuf = append(jsonBuf, ',', '\n')
        }
        first = false
        
        jsonBuf = strconv.AppendQuote(jsonBuf, k)
        jsonBuf = append(jsonBuf, ':', ' ')
        jsonBuf = strconv.AppendQuote(jsonBuf, v)
    }
    
    jsonBuf = append(jsonBuf, '\n', '}')
    fmt.Println(string(jsonBuf))
}

We build a JSON object by quoting both keys and values. Special characters in
the input strings are properly escaped in the JSON output.

## Appending to Existing Buffers

This example shows how to efficiently reuse buffers when repeatedly calling
AppendQuote in performance-sensitive code.

buffer_reuse.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    messages := []string{
        "First message",
        "Second message with \"quotes\"",
        "Third message\nwith newline",
    }
    
    // Pre-allocate buffer with capacity
    buf := make([]byte, 0, 256)
    
    for _, msg := range messages {
        // Reset buffer length while keeping capacity
        buf = buf[:0]
        
        buf = append(buf, "-&gt; "...)
        buf = strconv.AppendQuote(buf, msg)
        buf = append(buf, '\n')
        
        fmt.Print(string(buf))
    }
}

We reuse the same buffer for each iteration, resetting its length but keeping
the allocated capacity. This reduces memory allocations in tight loops.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuote function in Go with
practical examples of building byte slices with quoted strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).