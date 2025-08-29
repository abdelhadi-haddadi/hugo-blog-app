+++
title = "Rust match expression"
date = 2025-08-29T20:11:37.517+01:00
draft = false
description = "Rust match expression tutorial shows how to use the match expression in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust match expression

last modified February 19, 2025

In this article we show how to use the match expression in Rust.

## Match expression

The match expression in Rust is a powerful control flow operator that allows you to compare a value against a series of patterns and execute code based on which pattern matches. It is similar to the switch statement in other languages but more powerful and flexible.

The syntax of the match expression is as follows:

match value {
    pattern1 =&gt; expression1,
    pattern2 =&gt; expression2,
    ...
    _ =&gt; default_expression,
}

The match expression checks the value against each pattern in order. If a pattern matches, the corresponding expression is executed. The underscore _ is a catch-all pattern that matches any value, similar to the default case in a switch statement.

## Simple example

The following is a simple Rust example using the match expression.

main.rs
  

fn main() {
    let number = 3;

    match number {
        1 =&gt; println!("One"),
        2 =&gt; println!("Two"),
        3 =&gt; println!("Three"),
        _ =&gt; println!("Other"),
    }
}

The program defines a variable number and uses the
match expression to check its value.

match number {
    1 =&gt; println!("One"),
    2 =&gt; println!("Two"),
    3 =&gt; println!("Three"),
    _ =&gt; println!("Other"),
}

The match expression checks the value of number
against each pattern. If the value matches a pattern, the corresponding code
block is executed. The underscore _ is used as a default case.

$ cargo run -q
Three

## Match guards

The if conditions in the match arms are called match guards. They allow for more
complex matching by adding additional conditional checks to the patterns.

main.rs
  

use rand::Rng;

fn main() {

  let mut rng = rand::thread_rng();
  let r = rng.gen_range(-5..=5);

  match r {
    x if x &gt; 0 =&gt; println!("The number {} is positive", x),
    0 =&gt; println!("The number is zero"),
    _ =&gt; println!("The number {} is negative", r),
  }
}

We use a random number generator to generate a random number r in 
the range -5 to 5.

x if x &gt; 0 =&gt; println!("The number {} is positive", x),

This arm matches any value of r that is greater than 0. The match
guard if x &gt; 0 ensures that this arm only executes when
r is positive. The variable x is bound to the value of
r and printed.

0 =&gt; println!("The number is zero"),

This arm matches the specific value 0 and prints a message indicating that the
number is zero.

_ =&gt; println!("The number {} is negative", r),

This arm matches all other values (i.e., those that do not satisfy the previous
conditions). The underscore _ is a catch-all pattern, and it prints
a message indicating that the number is negative, using the value of
r.

## Multiple options in arms

We can group multiple options with |.

main.rs
  

fn main() {

    let grades = vec!["A", "B", "C", "D", "E", "F", "FX"];

    for grade in grades {
        match grade {
            "A" | "B" | "C" | "D" | "E" | "F" =&gt; println!("passed"),
            "FX" =&gt; println!("failed"),
            _ =&gt; println!("invalid"),
        }
    }
}

Using the | operator, we group grades A through F into one 
arm.

$ cargo run -q
passed
passed
passed
passed
passed
passed
failed

## Matching with enums

The match expression is often used with enums in Rust. Enums allow
you to define a type by enumerating its possible variants.

main.rs
  

enum Direction {
    Up,
    Down,
    Left,
    Right,
}

fn main() {
    let direction = Direction::Up;

    match direction {
        Direction::Up =&gt; println!("Going up!"),
        Direction::Down =&gt; println!("Going down!"),
        Direction::Left =&gt; println!("Going left!"),
        Direction::Right =&gt; println!("Going right!"),
    }
}

In this example, we define an enum Direction with four variants. We
then use the match expression to handle each variant.

match direction {
    Direction::Up =&gt; println!("Going up!"),
    Direction::Down =&gt; println!("Going down!"),
    Direction::Left =&gt; println!("Going left!"),
    Direction::Right =&gt; println!("Going right!"),
}

The match expression checks the value of direction and
executes the corresponding code block based on the variant.

$ cargo run -q
Going up!

## Matching with Option

The Option type in Rust is used to represent a value that can
either be Some (containing a value) or None (no
value). The match expression is commonly used to handle
Option types.

main.rs
  

fn main() {
    let some_value = Some(5);

    match some_value {
        Some(value) =&gt; println!("Got a value: {}", value),
        None =&gt; println!("Got nothing"),
    }
}

In this example, we use the match expression to handle an
Option type.

match some_value {
    Some(value) =&gt; println!("Got a value: {}", value),
    None =&gt; println!("Got nothing"),
}

The match expression checks if some_value is
Some or None and executes the corresponding code
block.

$ cargo run -q
Got a value: 5

## Matching with Result

The Result type in Rust is used for error handling. It can either
be Ok (containing a value) or Err (containing an
error). The match expression is commonly used to handle
Result types.

main.rs
  

fn main() {
    let result: Result&lt;i32, &amp;str&gt; = Ok(10);

    match result {
        Ok(value) =&gt; println!("Success: {}", value),
        Err(error) =&gt; println!("Error: {}", error),
    }
}

In this example, we use the match expression to handle a Result type.

match result {
    Ok(value) =&gt; println!("Success: {}", value),
    Err(error) =&gt; println!("Error: {}", error),
}

The match expression checks if result is
Ok or Err and executes the corresponding code block.

$ cargo run -q
Success: 10

## Matching with patterns

The match expression can also be used with more complex patterns,
such as ranges, tuples, and structs.

main.rs
  

fn main() {
    let pair = (0, -2);

    match pair {
        (0, y) =&gt; println!("First is 0 and y is {}", y),
        (x, 0) =&gt; println!("x is {} and second is 0", x),
        _ =&gt; println!("It doesn't matter what they are"),
    }
}

In this example, we use the match expression to match against a tuple.

match pair {
    (0, y) =&gt; println!("First is 0 and y is {}", y),
    (x, 0) =&gt; println!("x is {} and second is 0", x),
    _ =&gt; println!("It doesn't matter what they are"),
}

The match expression checks the values of the tuple and executes
the corresponding code block based on the pattern.

$ cargo run -q
First is 0 and y is -2

In this article, we have explored the match expression in Rust. We
have seen how to use it with simple values, enums, Option,
Result, and more complex patterns. The match
expression is a powerful tool for control flow in Rust, allowing you to handle
different cases in a clear and concise way.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).