+++
title = "Golang strconv.CanBackquote"
date = 2025-08-29T19:56:14.368+01:00
draft = false
description = "Learn how to check if a string can be safely backquoted using strconv.CanBackquote in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.CanBackquote

last modified April 20, 2025

This tutorial explains how to use the strconv.CanBackquote function in Go.
We'll cover string validation basics with practical examples.

The strconv.CanBackquote function checks if a string can be represented
as a raw string literal without escape sequences. It's useful for string validation.

Raw string literals in Go are enclosed in backquotes (`). They can contain any
character except a backquote. This function helps validate strings for such usage.

## Basic strconv.CanBackquote Example

The simplest use of strconv.CanBackquote checks if a string can be
a raw string literal. Here we demonstrate basic validation.

basic_canbackquote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello, World!"
    
    if strconv.CanBackquote(str) {
        fmt.Printf("'%s' can be a raw string literal\n", str)
    } else {
        fmt.Printf("'%s' cannot be a raw string literal\n", str)
    }
}

We check if "Hello, World!" can be a raw string literal. The function returns
true for this string since it contains no backquotes or control characters.

## Checking Strings with Backquotes

strconv.CanBackquote returns false for strings containing backquotes.
This example demonstrates this behavior.

backquote_check.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testStrings := []string{"normal", "with `backquote`", "`", "back`quote"}
    
    for _, s := range testStrings {
        if strconv.CanBackquote(s) {
            fmt.Printf("'%s' can be backquoted\n", s)
        } else {
            fmt.Printf("'%s' cannot be backquoted\n", s)
        }
    }
}

We test various strings containing backquotes. Any string with a backquote
character will cause CanBackquote to return false.

## Checking Control Characters

The function also checks for control characters. This example shows validation
of strings with various control sequences.

control_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{
        "safe",
        "multi\nline",
        "tab\tcharacter",
        "bell\x07",
        "null\x00",
    }
    
    for _, tc := range testCases {
        result := strconv.CanBackquote(tc)
        fmt.Printf("%q: %t\n", tc, result)
    }
}

Strings with control characters like newlines, tabs, or null bytes cannot be
raw string literals. The function detects these and returns false.

## Validating User Input

A practical use case is validating user input for raw string usage. This example
shows how to implement such validation.

user_input.go
  

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Print("Enter text to check: ")
    input, _ := reader.ReadString('\n')
    input = input[:len(input)-1] // Remove newline
    
    if strconv.CanBackquote(input) {
        fmt.Println("This text can be a raw string literal")
        fmt.Println("Raw version:", "`" + input + "`")
    } else {
        fmt.Println("This text cannot be a raw string literal")
        fmt.Println("Reason: contains backquotes or control characters")
    }
}

We read user input and check if it can be a raw string literal. The program
provides feedback and shows the raw string version if validation passes.

## Comparing with IsPrint

This example compares CanBackquote with IsPrint to
show their different validation rules.

compare_isprint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{
        "normal",
        "with `",
        "\t",
        "\n",
        "unicode✓",
    }
    
    for _, tc := range testCases {
        canBackquote := strconv.CanBackquote(tc)
        isPrint := true
        for _, r := range tc {
            if !strconv.IsPrint(r) {
                isPrint = false
                break
            }
        }
        
        fmt.Printf("%q: CanBackquote=%t, IsPrint=%t\n", 
            tc, canBackquote, isPrint)
    }
}

CanBackquote is stricter than IsPrint. It rejects
backquotes and some printable characters that IsPrint accepts.

## Generating Safe SQL Queries

This practical example shows using CanBackquote to validate SQL
query components for safe raw string usage.

sql_safety.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    tableName := "users"
    columnName := "name"
    
    if !strconv.CanBackquote(tableName) || !strconv.CanBackquote(columnName) {
        fmt.Println("Invalid table or column name - potential SQL injection")
        return
    }
    
    query := fmt.Sprintf("SELECT * FROM `%s` WHERE `%s` = ?", 
        tableName, columnName)
    fmt.Println("Safe query:", query)
}

We validate table and column names before using them in a raw SQL query. This
helps prevent SQL injection through malicious identifiers.

## Validating Configuration Strings

This example demonstrates using CanBackquote to validate
configuration values before writing to a file.

config_validation.go
  

package main

import (
    "fmt"
    "strconv"
)

type Config struct {
    AppName string
    Version string
    Secret  string
}

func validateConfig(c Config) error {
    if !strconv.CanBackquote(c.AppName) {
        return fmt.Errorf("invalid AppName")
    }
    if !strconv.CanBackquote(c.Version) {
        return fmt.Errorf("invalid Version")
    }
    if !strconv.CanBackquote(c.Secret) {
        return fmt.Errorf("invalid Secret")
    }
    return nil
}

func main() {
    config := Config{
        AppName: "MyApp",
        Version: "1.0",
        Secret:  "s3cr3t`key", // Invalid because of backquote
    }
    
    if err := validateConfig(config); err != nil {
        fmt.Println("Config validation failed:", err)
    } else {
        fmt.Println("Config is valid")
    }
}

We validate configuration fields to ensure they can be safely written as raw
string literals. The secret field fails validation due to a backquote.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.CanBackquote function in Go with
practical examples of string validation for raw string literals.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).