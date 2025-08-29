+++
title = "Tcl dict Command"
date = 2025-08-29T20:12:54.593+01:00
draft = false
description = "Tcl dict command tutorial shows how to work with dictionaries in Tcl. Learn dict with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl dict Command

last modified April 3, 2025

The Tcl dict command provides operations for working with dictionary
values. Dictionaries are collections of key-value pairs, similar to arrays.

## Basic Definition

A dictionary is a Tcl value containing an even number of elements. Each pair
consists of a key followed by its associated value. Keys must be unique.

The dict command has multiple subcommands for dictionary
manipulation. These include create, get, set, update, merge, and more.

## Creating a Dictionary

This example shows how to create a basic dictionary with key-value pairs.

dict_create.tcl
  

set user [dict create name "John Doe" age 35 email "john@example.com"]
puts $user

Here we create a dictionary with three key-value pairs. The dict create
command builds the dictionary structure. The entire dictionary is stored in the
user variable.

## Accessing Dictionary Values

Dictionary values can be retrieved using the dict get command.

dict_get.tcl
  

set user [dict create name "John Doe" age 35 email "john@example.com"]
set name [dict get $user name]
puts "User name: $name"

This retrieves the value associated with the "name" key. The dict get
command takes the dictionary variable and the key name as arguments.

## Updating a Dictionary

Dictionary values can be modified using dict set or dict update.

dict_update.tcl
  

set user [dict create name "John Doe" age 35]
dict set user age 36
dict set user email "john@example.com"
puts $user

This updates the age and adds a new email field. The dict set command
modifies the dictionary in place. The first argument is the dictionary variable.

## Dictionary Iteration

The dict for command allows iteration over all key-value pairs.

dict_iterate.tcl
  

set user [dict create name "John Doe" age 35 email "john@example.com"]
dict for {key value} $user {
    puts "$key: $value"
}

This loops through each key-value pair in the dictionary. The loop variables
key and value receive each pair's values in turn.

## Checking Dictionary Contents

The dict exists command checks if a key exists in a dictionary.

dict_exists.tcl
  

set user [dict create name "John Doe" age 35]
if {[dict exists $user email]} {
    puts "Email exists"
} else {
    puts "Email does not exist"
}

This checks for the existence of the "email" key. The command returns 1 if the
key exists, 0 otherwise. It's useful for defensive programming.

## Merging Dictionaries

Dictionaries can be combined using the dict merge command.

dict_merge.tcl
  

set user1 [dict create name "John Doe" age 35]
set user2 [dict create email "john@example.com" city "New York"]
set merged [dict merge $user1 $user2]
puts $merged

This combines two dictionaries into one. If keys overlap, values from the later
dictionary take precedence. The original dictionaries remain unchanged.

## Best Practices

- **Key names:** Use consistent naming conventions for keys.

- **Nesting:** Dictionaries can be nested for complex data.

- **Performance:** Dictionaries are optimized for lookup.

- **Immutable:** Remember that dict commands return new values.

- **Validation:** Check key existence before access.

 

This tutorial covered the Tcl dict command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).