+++
title = "Rust int to string"
date = 2025-08-29T20:11:36.402+01:00
draft = false
description = "Rust int to string tutorial shows how to convert integers to strings in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust int to string

last modified February 19, 2025

In this article we show how to convert integers to strings in Rust.

Integer to string conversion is a type conversion or type casting, where an
entity of integer data type is changed into string one.

## Using to_string

The to_string function converts the integer value to a string.

main.rs
  

fn main() {

    let val = 4;
    let s1 = String::from("There are "); 
    let s2 = String::from(" hawks");
    
    let msg = s1 + &amp;val.to_string() + &amp;s2;

    println!("{}", msg)
}

In the program, we build a message from two strings and an integers. The integer 
is converted to a string with to_string. 

λ rustc main.rs  
λ ./main.exe
There are 4 hawks

We compile and run the program.

## Using format!

We can do the conversion with the format! macro. It creates a
String using interpolation of runtime expressions.

main.rs
  

fn main() {

    let val = 4;
    let msg = format!("There are {val} hawks");

    println!("{}", msg)
}

We build the message with the format! macro. 

In this article we have performed int to string conversion in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).