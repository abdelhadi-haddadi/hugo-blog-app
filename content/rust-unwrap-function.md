+++
title = "Rust unwrap function"
date = 2025-08-29T20:11:39.782+01:00
draft = false
description = "Rust unwrap function tutorial shows how to handle Option and Result types using unwrap."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust unwrap function

last modified February 19, 2025

In this Rust tutorial, we will cover the unwrap function and how it
is used to handle Option and Result types.

## Option and Result types

In Rust, functions can return a value of two types: Option and
Result.

The Option type represents the presence or absence of a value. It
is typically used in cases where a value may or may not be present.

The Result type represents the success or failure of a computation.
It is typically used in cases where a computation may or may not succeed.

## The unwrap function

The unwrap function is used to extract a value from an Option or
Result type. If the Option or Result type contains a value, unwrap
returns that value. If it does not contain a value, unwrap will
panic.

## unwrap example

The following is an example of using the unwrap function with an Option type.

main.rs
  

fn main() {
    let option = Some(10);

    match option {
        Some(value) =&gt; println!("{}", value),
        None =&gt; println!("No value present"),
    }

    let value = option.unwrap();

    println!("{}", value);
}

In this example, we define an Option type that contains a value. We then use a
match statement to handle the Option type. If the Option type contains a value,
we print it. If it does not, we print a message.

We then use the unwrap function to extract the value from the
Option type. We print the extracted value.

## The unwrap_or function

The unwrap_or function is used to extract a value from an Option
type. If the Option type contains a value, unwrap_or returns that
value. If it does not contain a value, it returns a default value.

main.rs
  

fn main() {
    let option = None;
    let value = option.unwrap_or(0);

    println!("{}", value);
}

In this example, we define an Option type that does not contain a value. We then
use the unwrap_or function to extract a value from the Option type.
If the Option type does not contain a value, it returns the default value of 0.

## Using unwrap with Result

The following is an example of using the unwrap function with a
Result type.

main.rs
  

use std::fs::File;
use std::io::Error;

fn main() {
    let result = File::open("foo.txt");

    match result {
        Ok(file) =&gt; println!("File opened successfully"),
        Err(error) =&gt; println!("Error: {}", error),
    }

    let file = result.unwrap();

    println!("File opened successfully");
}

In this example, we define a Result type that represents the success or failure
of opening a file. We then use a match statement to handle the Result type. If
the Result type is successful, we print a message. If it is not, we print an
error message.

We then use the unwrap function to extract the file from the Result
type. We print a message indicating that the file was opened successfully.

## The unwrap_or_else function

The unwrap_or_else function is used to extract a value from a
Result type. If the Result type is successful, unwrap_or_else
returns that value. If it is not successful, it calls a closure to produce a
default value.

## unwrap_or_else example

The following is an example of using the unwrap_or_else function
with a Result type.

main.rs
  

use std::fs::File;
use std::io::Error;

fn main() {
    let result = File::open("foo.txt");

    let file = result.unwrap_or_else(|error| {
        println!("Error: {}", error);
        File::open("bar.txt").unwrap()
    });

    println!("File opened successfully");
}

In this example, we define a Result type that represents the success or failure
of opening a file. We then use the unwrap_or_else function to
extract a file from the Result type. If the Result type is not successful, it
calls a closure to produce a default value.

In the closure, we print an error message and then open a different file. We
then print a message indicating that the file was opened successfully.

In this article, we have covered the unwrap function and how it is
used to handle Option and Result types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).