+++
title = "Rust variable"
date = 2025-08-29T20:11:40.941+01:00
draft = false
description = "Rust variable tutorial shows how to use variables in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust variable

last modified February 19, 2025

In this article we show how to use variables in Rust.

## Variable

A *variable* is used to store values. It is a label given to a value.
Rust uses the let keyword to define a variable.

In Rust, a variable is immutable by default. To create a mutable variable, 
we use the mut keyword.

Variables can hold values of different data types. A data type is a set of
values and the allowable operations on those values. Rust can infer
the data type from the right side of the assignment.

## Simple example

The following is a simple Rust example with variables.

main.rs
  

fn main() {
    let name: &amp;str = "John Doe";
    let age: i32 = 34;
 
    println!("{name} is {age} years old");
}

The program defines two variables.

let name: &amp;str = "John Doe";

This line defines a string variable. After the colon character, we specify the 
data type of the variable.

let age: i32 = 34;

We define an integer variable.

println!("{name} is {age} years old");

The two variables are used to build a message, which is printed to the console 
with println! macro.

$ cargo run -q
John Doe is 34 years old

## Variable type inference

Rust can infer the data type of a variable from the right side of the
assignment.

main.rs
  

fn main() {
    let name = "John Doe";
    let age = 34;

    println!("{name} is {age} years old");
}

In the program, we omit the data type declaration for our two variables.

## Mutable variable

A mutable variable can change over the course of a program. Mutable variables are 
created with mut.

main.rs
  

fn main() {
    let mut name = String::from("John Doe");
    let mut age = 34;

    println!("{name} is {age} years old");

    name = String::from("Roger Roe");
    age = 54;

    println!("{name} is {age} years old");
}

We define two variables. Later we assign new values to the variables.

let mut name = String::from("John Doe");
let mut age = 34;

Mutable variables are prefixed with the mut keyword.

name = String::from("Roger Roe");
age = 54;

We assign new values to the variables.

λ cargo run -q
John Doe is 34 years old
Roger Roe is 54 years old

## The function parameter

A variable passed to a function is called a parameter or an argument.

main.rs
  

fn main() {
    let name = String::from("John Doe");
    let age = 34;

    let msg = build_msg(name, age);
    println!("{msg}");
}

fn build_msg(name: String, age: i32) -&gt; String {

    return format!("{} is {} years old", name, age);
}

In the program, we define a build_msg function. It takes two
parameters. The parameters are used to build a message, which is returned from 
the function.

let name = String::from("John Doe");
let age = 34;

let msg = build_msg(name, age);

We define two variables and pass them as function arguments.

fn build_msg(name: String, age: i32) -&gt; String {

    return format!("{} is {} years old", name, age);
}

Inside the function, we have two variables. These are valid in the function
block.

let msg = build_msg(name, age);

The build_msg function returns the generated string. It is assigned
to the msg variable.

In this article we have worked with variables in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.