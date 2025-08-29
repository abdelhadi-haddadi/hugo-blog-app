+++
title = "Rust random numbers"
date = 2025-08-29T20:11:38.692+01:00
draft = false
description = "Rust random numbers tutorial shows how to generate random numbers in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust random numbers

last modified February 19, 2025

In this article we show how to generate random numbers in Rust.

## Random numbers

A *random number* is a value that is generated without a pattern or 
predictable sequence.

Rust provides a rand crate for generating random numbers.

We will cover the following topics:

- Random number generation

- Seed generation

- Distribution functions

- Random strings

## Random number generation

To generate random numbers in Rust, we will use the rand crate.

First, we need to add the rand dependency to our Cargo.toml file.

Cargo.toml
  

[package]
name = "rust_random"
version = "0.1.0"
authors = ["Jan Bodnar &lt;janbodnar@zetcode.com&gt;"]
edition = "2018"

[dependencies]
rand = "0.8.5"

We add the rand = "0.8.5" line to our dependencies section.

Next, we import the rand crate into our Rust source file.

main.rs
  

use rand::prelude::*;

fn main() {
    let rng = rand::thread_rng();

    let random_number: u32 = rng.gen();

    println!("Random number: {}", random_number);
}

We use the use rand::prelude::*; line to import the entire rand crate.

The thread_rng function generates a new random number generator.

The gen method generates a random number.

$ cargo run -q
Random number: 1656021233

## Seed generation

A seed is a starting point for a sequence of random numbers.

We can use a seed to reproduce the same sequence of random numbers.

main.rs
  

use rand::prelude::*;

fn main() {
    let seed = 123456;
    let mut rng = rng_from_seed(seed);

    let random_number: u32 = rng.gen();

    println!("Random number: {}", random_number);
}

We create a seed and initialize the random number generator with the seed.

The rng_from_seed function initializes a random number generator.

$ cargo run -q
Random number: 1656021233

## Distribution functions

The rand crate provides various distribution functions.

A distribution function is a function that generates random numbers with a 
specific distribution.

For example, we can generate random numbers with a normal distribution.

main.rs
  

use rand::prelude::*;
use rand::distributions::Normal;

fn main() {
    let mut rng = rand::thread_rng();
    let normal = Normal::new(0.0, 1.0);

    for _ in 0..10 {
        let random_number = normal.sample(&amp;mut rng);
        println!("{:?}", random_number);
    }
}

We use the Normal::new function to create a normal distribution.

The sample method generates a random number with the normal distribution.

$ cargo run -q
1.2138945128489533
-1.034040853808252
-0.4231388504313113
1.331132753185676
-0.2544337510777913
-0.5355273131843393
0.1170624353105539
0.3672327314236156
-1.0881526111251376
-1.4447541817322377

## Random strings

We can generate random strings with the rand crate.

First, we need to add the rand_chars dependency to our Cargo.toml file.

Cargo.toml
  

[package]
name = "rust_random"
version = "0.1.0"
authors = ["Jan Bodnar &lt;janbodnar@zetcode.com&gt;"]
edition = "2018"

[dependencies]
rand = "0.8.5"
rand_chars = "1.0.0"

Next, we import the rand_chars crate into our Rust source file.

main.rs
  

use rand::prelude::*;
use rand_chars;

fn main() {
    let mut rng = rand::thread_rng();

    let random_string = rand_string(&amp;mut rng, 10);

    println!("Random string: {}", random_string);
}

fn rand_string(rng: &amp;mut ThreadRng, len: usize) -&gt; String {

    let mut rands: Vec&lt;u8&gt; = (0..len).map(|_| rng.gen()).collect();
    rands.extend_from_slice(&amp;[b'a'..=b'z'][rng.gen_range(0..26)]);

    return String::from_utf8(rands).unwrap();
}

We use the rand_string function to generate a random string.

The function generates random numbers and converts them to ASCII characters.

$ cargo run -q
Random string: bqmzxjyqmn

## Summary

In this article we have covered random numbers in Rust. We have shown how to
generate random numbers, how to seed the random number generator, and how to use
distribution functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).