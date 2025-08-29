+++
title = "Golang Regexp.SubexpNames"
date = 2025-08-29T19:55:49.185+01:00
draft = false
description = "Learn how to work with subexpression names using regular expressions in Go. Includes examples of regex subexpression handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.SubexpNames

last modified April 20, 2025

This tutorial explains how to use the Regexp.SubexpNames method
in Go. We'll cover named capture groups and provide practical examples.

A named capture group is a regular expression feature that allows
assigning names to capturing parentheses. This makes patterns more readable.

The Regexp.SubexpNames method returns a slice of names for the
named capture groups in the regular expression. The first element is always
the empty string for the entire match.

## Basic SubexpNames Example

The simplest use of SubexpNames shows the names of capture groups.
Here we examine a pattern with named groups.

basic_names.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;year&gt;\d{4})-(?P&lt;month&gt;\d{2})-(?P&lt;day&gt;\d{2})`)
    names := re.SubexpNames()
    
    for i, name := range names {
        fmt.Printf("%d: %q\n", i, name)
    }
}

We create a date pattern with named groups for year, month, and day.
SubexpNames returns these names in order. Index 0 is always empty.

## Matching with Named Groups

This example shows how to use named groups with FindStringSubmatch.
We can access matches by name or index.

named_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;first&gt;\w+)\s+(?P&lt;last&gt;\w+)`)
    match := "John Doe"
    
    result := re.FindStringSubmatch(match)
    names := re.SubexpNames()
    
    for i, name := range names {
        if i != 0 &amp;&amp; name != "" {
            fmt.Printf("%s: %s\n", name, result[i])
        }
    }
}

The pattern captures first and last names. We use SubexpNames to
get group names and print the matched values with their names.

## Accessing Named Groups Programmatically

We can create a map of named groups for easier access. This makes working with
matches more convenient.

named_map.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;protocol&gt;https?)://(?P&lt;domain&gt;[^/]+)/(?P&lt;path&gt;.*)`)
    url := "https://example.com/path/to/resource"
    
    match := re.FindStringSubmatch(url)
    names := re.SubexpNames()
    
    result := make(map[string]string)
    for i, name := range names {
        if i != 0 &amp;&amp; name != "" {
            result[name] = match[i]
        }
    }
    
    fmt.Printf("Protocol: %s\n", result["protocol"])
    fmt.Printf("Domain: %s\n", result["domain"])
    fmt.Printf("Path: %s\n", result["path"])
}

We parse a URL into components using named groups. The map allows accessing
parts by name instead of numeric index.

## Mixed Named and Unnamed Groups

Patterns can mix named and unnamed groups. SubexpNames shows empty
strings for unnamed groups.

mixed_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+)-(?P&lt;middle&gt;\w+)-(\w+)`)
    input := "first-middle-last"
    
    match := re.FindStringSubmatch(input)
    names := re.SubexpNames()
    
    for i, name := range names {
        if name == "" {
            name = fmt.Sprintf("unnamed%d", i)
        }
        fmt.Printf("%s: %s\n", name, match[i])
    }
}

The pattern has two unnamed groups and one named group. We handle unnamed groups
by creating temporary names for display purposes.

## Validating Group Names

This example checks if specific group names exist in the pattern before using
them. This prevents runtime errors.

validate_names.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;user&gt;\w+)@(?P&lt;domain&gt;\w+\.\w+)`)
    email := "user@example.com"
    
    names := re.SubexpNames()
    required := []string{"user", "domain"}
    
    for _, name := range required {
        found := false
        for _, n := range names {
            if n == name {
                found = true
                break
            }
        }
        if !found {
            panic(fmt.Sprintf("missing required group: %s", name))
        }
    }
    
    match := re.FindStringSubmatch(email)
    fmt.Printf("User: %s\n", match[1])
    fmt.Printf("Domain: %s\n", match[2])
}

We verify that required group names exist in the pattern. This is useful when
working with dynamically created regular expressions.

## Reusing Group Names

When group names are reused in a pattern, SubexpNames reflects
this. Each occurrence gets the same name.

reused_names.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;digit&gt;\d)(?P&lt;digit&gt;\d)`)
    input := "12"
    
    names := re.SubexpNames()
    match := re.FindStringSubmatch(input)
    
    for i, name := range names {
        if name != "" {
            fmt.Printf("%s: %s\n", name, match[i])
        }
    }
}

The pattern reuses the "digit" group name. Both digits are captured, but only
the second appears in the results due to group numbering.

## Complex Pattern with Multiple Groups

This example illustrates the use of SubexpNames in conjunction with
a complex regular expression pattern that contains multiple named capturing
groups. Named groups allow developers to assign a descriptive name to each group
in a regular expression, making the patterns more readable and the extracted
data easier to interpret. The ability to label capturing groups is particularly
useful when working with structured data such as URLs, where each part (e.g.,
scheme, host, path) has a distinct meaning and needs to be extracted in an
organized manner.

    
complex_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `^(?P&lt;scheme&gt;\w+)://` +
        `(?P&lt;host&gt;[^/:]+)` +
        `(?::(?P&lt;port&gt;\d+))?` +
        `(?P&lt;path&gt;/[^?]*)?` +
        `(?:\?(?P&lt;query&gt;[^#]*))?` +
        `(?:#(?P&lt;fragment&gt;.*))?$`
    
    re := regexp.MustCompile(pattern)
    url := "https://example.com:8080/path?query=value#frag"
    
    names := re.SubexpNames()
    match := re.FindStringSubmatch(url)
    
    for i, name := range names {
        if name != "" &amp;&amp; i &lt; len(match) {
            fmt.Printf("%-10s: %s\n", name, match[i])
        }
    }
}

The example defines a comprehensive pattern to parse a URL into its components:
scheme, host, port, path, query, and fragment. The pattern uses named groups
like ?P&lt;scheme&gt; and ?P&lt;host&gt; to label each
part of the URL, ensuring that the match results are meaningful and
self-explanatory. Once compiled using regexp.MustCompile, the
regular expression is used to process the example URL,
"https://example.com:8080/path?query=value#frag", by applying the
FindStringSubmatch function, which returns a slice containing the
full match and all capturing group matches.

The SubexpNames method of the compiled regular expression is then
used to retrieve the names of all capturing groups in the pattern. This method
returns a slice where each element corresponds to the capturing group at the
same index in the match results. By iterating through the slice of names and
match results, the program prints the name of each capturing group along with
its matched value. The combination of SubexpNames and
FindStringSubmatch demonstrates how to efficiently work with named
groups to parse complex inputs and map each match to its corresponding label.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.SubexpNames method in Go with
practical examples of named capture group usage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).