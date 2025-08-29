+++
title = "Rust functions"
date = 2025-08-29T20:11:36.400+01:00
draft = false
description = "Rust functions tutorial shows how to use functions in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust functions

last modified February 19, 2025

In this article we show how to use functions in Rust.

## Function

A *function* is a block of code that can be called from other parts of the
program. Functions are used to organize the code and make it more readable.

In Rust, a function is defined with the fn keyword.

A function can take parameters and return values.

## Simple function

The following is a simple Rust function.

main.rs
  

fn main() {
    print_msg();
}

fn print_msg() {
    println!("Hello there!");
}

In the program, we define two functions. The main function calls
the print_msg function.

fn print_msg() {
    println!("Hello there!");
}

The print_msg function prints a message to the console.

$ cargo run -q
Hello there!

## Function with parameters

A function can take parameters.

main.rs
  

fn main() {
    let name = String::from("John Doe");
    let age = 34;

    print_msg(name, age);
}

fn print_msg(name: String, age: i32) {
    println!("{} is {} years old", name, age);
}

In the program, we define a print_msg function that takes two
parameters.

fn print_msg(name: String, age: i32) {
    println!("{} is {} years old", name, age);
}

The function prints the name and the age of a person.

$ cargo run -q
John Doe is 34 years old

## Function with return value

A function can return a value.

main.rs
  

fn main() {
    let name = String::from("John Doe");
    let age = 34;

    let msg = print_msg(name, age);
    println!("{}", msg);
}

fn print_msg(name: String, age: i32) -&gt; String {
    return format!("{} is {} years old", name, age);
}

In the program, we define a print_msg function that returns a
string.

fn print_msg(name: String, age: i32) -&gt; String {
    return format!("{} is {} years old", name, age);
}

The function builds a message, which is returned from the function.

$ cargo run -q
John Doe is 34 years old

## The closure

A *closure* is a function that can capture variables from the environment.

main.rs
  

fn main() {
    let num = 3;

    let add_num = |x| x + num;

    println!("{}", add_num(5));
}

In the program, we define a closure that adds a number to another number.

let num = 3;

let add_num = |x| x + num;

The closure captures the num variable from the environment.

$ cargo run -q
8

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).