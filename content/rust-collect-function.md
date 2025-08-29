+++
title = "Rust collect function"
date = 2025-08-29T20:11:35.297+01:00
draft = false
description = "Rust collect function tutorial shows how to use the collect function in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust collect function

last modified February 19, 2025

In this article we show how to use the collect function in Rust.

## The collect function

The collect function is used to transform an iterator into a collection.

## Simple example

The following is a simple Rust example with the collect function.

main.rs
  

fn main() {
    let v = vec![1, 2, 3];
    let sum: i32 = v.into_iter().sum();

    println!("The sum is: {sum}");
}

In the example, we have a vector of integers. We use the into_iter 
method to get an iterator over the vector. We use the sum method to 
calculate the sum of the integers.

$ cargo run -q
The sum is: 6

## Transforming an iterator into a hash map

We can transform an iterator into a hash map with the collect function.

main.rs
  

fn main() {
    let v = vec![("John Doe", 34), ("Roger Roe", 54)];
    let mut h = std::collections::HashMap::new();
    h.extend(v.into_iter());

    println!("{h:#?}");
}

In the example, we have a vector of tuples. We use the into_iter 
method to get an iterator over the vector. We use the extend method 
to populate a hash map.

$ cargo run -q
HashMap {
    "John Doe": 34,
    "Roger Roe": 54,
}

## Transforming an iterator into a vector

We can transform an iterator into a vector with the collect function.

main.rs
  

fn main() {
    let v = vec![1, 2, 3];
    let vv: Vec = v.into_iter().filter(|x| x % 2 == 0).collect();

    println!("{vv:?}");
}

In the example, we have a vector of integers. We use the into_iter 
method to get an iterator over the vector. We use the filter method to 
filter out the odd numbers. We use the collect method to populate a 
new vector.

$ cargo run -q
[2, 3]

## The fold method

The fold method is a generalization of the reduce method.

main.rs
  

fn main() {
    let v = vec![1, 2, 3];
    let sum: i32 = v.into_iter().fold(0, |acc, x| acc + x);

    println!("The sum is: {sum}");
}

In the example, we use the fold method to calculate the sum of 
the integers.

$ cargo run -q
The sum is: 6

## The author

My name is Jan Bodnar and I am a passionate programmer with many years of 
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Rust tutorials](/all/#rust).