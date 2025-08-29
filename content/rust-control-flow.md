+++
title = "Rust control flow"
date = 2025-08-29T20:11:35.288+01:00
draft = false
description = "Rust control flow tutorial shows how to manage program flow in Rust language. The control flow structures can be used to executed code conditionally or multiple times."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust control flow

last modified February 19, 2025

In this article we show how to control the flow of a Rust program.

The code of a Rust program run from top to bottom. The flow of the program can
be altered with various keywords, including if/else, 
loop, for, while, and match.

The control flow structures are used to executed code conditionally or multiple
times.

[dependencies]
rand = "0.8.5"

For generating random values, we need the rand package.

## The if condition

The if keyword is used to create simple conditional tests. It can
be used in conjuction with the else if and else
keyword.

main.rs
  

use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let n = rng.gen_range(-5..5);

    if n &lt; 0 {
        println!("negative value");
    } else if n == 0 {
        println!("zero");
    } else {
        println!("positive value");
    }
}

We randomly select a value from a range -5..5. Based on the resulting value, we
print a message. There are three possible branches that can be executed.

if n &lt; 0 {
    println!("negative value");
...

If the expression following the if keyword is true, the next
statement is executed. Other branches are not executed.

} else if n == 0 {
    println!("zero");
...

If the previous branch was not true, we try the next branch; the 
else if. If it is true, it's block is executed and the testing is 
finished. If not, we continue to the next branch.

} else {
    println!("positive value");
}

The else branch is always executed when the previous ones fail.

λ cargo run -q
negative value
λ cargo run -q
positive value
λ cargo run -q
zero
λ cargo run -q
positive value

The if conditions are expressions; they can return values.

main.rs
  

use rand::Rng;

fn main() {

    let mut rng = rand::thread_rng();

    let n = rng.gen_range(-5..5);

    let msg = if n &lt; 0 {
        "negative value"
    } else if n == 0 {
        "zero"
    } else {
        "positive value"
    };

    println!("{}", msg);
}

In this example, the if expression returns a result which is later
printed.

## The loop

An infinite loop is created with the loop keyword. The loop is 
terminated with the break keyword.

main.rs
  

fn main() {
    let mut i = 0;

    loop {
        println!("falcon");

        i += 1;
        if i == 5 {
            break;
        }
    }
}

In the example, we print a word five times.

let mut i = 0;

We define a counter; the i is often used as a variable for a
counter.

loop {
    println!("falcon");

    i += 1;
    if i == 5 {
        break;
    }
}

With loop, we start executing the given code block until we break 
the loop.

if i == 5 {
    break;
}

If the condition is met, the loop is terminated with break.

λ cargo run -q
falcon
falcon
falcon
falcon
falcon

## The while loop

The while keyword is used to create a loop. It runs until the
given condition is met.

main.rs
  

fn main() {
    let mut x = 1;

    while x &lt;= 10 {
        println!("{}", x);
        x += 1;
    }

    println!("x: {}", x);
}

In the program, we print numbers 1 through 10. In the end, we print the 
x, which is used as a counter. 

while x &lt;= 10 {
    println!("{}", x);
    x += 1;
}

The while loop is executed while the condition is true; that is, x
is less than 10.

λ cargo run -q
1
2
3
4
5
6
7
8
9
10
x: 11

 
In the next example we use a while loop to calculate a sum of integers.

main.rs
  

use std::vec;

fn main() {
    let vals = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let mut i = 0;
    let mut sum = 0;
    let n = vals.len();

    while i &lt; n {
        sum += vals[i];
        i += 1;
    }

    println!("The sum is: {}", sum);
}

We have a vector of integers. Using while loop, we calculate the sum of the 
elements.

let mut i = 0;
let mut sum = 0;
let n = vals.len();

In order to calculate the sum, we need an index variable, the sum variable, and 
the length of the vector.

while i &lt; n {
    sum += vals[i];
    i += 1;
}

In the while loop, we add the elements to the sum variable.

λ cargo run -q
The sum is: 55

## The for loop

With the for keyword, we iterate over a range or collection of
values.

main.rs
  

fn main() {
    for i in 1..=10 {
        print!("{} ", i);
    }

    println!();

    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for e in vals {
        print!("{} ", e);
    }

    println!();
}

In the program, we iterate over a range of integers and an array of integers.

for i in 1..=10 {
    print!("{} ", i);
}

We go through the integers of a range; in each cycle, the i
variable holds the current value. We print the value in the block.

let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for e in vals {
    print!("{} ", e);
}

We have an array of integers; we go through the array element by element and 
print the values to the terminal.

λ cargo run -q
1 2 3 4 5 6 7 8 9 10 
1 2 3 4 5 6 7 8 9 10 

## Match expressions

Pattern matching is a powerful control flow construct that allows us to compare
a value against a series of patterns and then execute code based on which
pattern matches.

In match expressions, each option that is executed is called an arm.

main.rs
  

fn main() {
    let grades = ["A", "B", "C", "D", "E", "F", "FX"];

    for grade in grades {
        match grade {
            "A" | "B" | "C" | "D" | "E" | "F" =&gt; println!("passed"),
            "FX" =&gt; println!("failed"),
            _ =&gt; println!("unknown")
        }
    }
}

We have an array of grades. We go through the array and print "passed" or
"failed" for each value. This example uses a multiple option arm, which saves a
lot of space. It is much shorter than using several if/else keywords.

$ cargo run -q
passed
passed
passed
passed
passed
passed
failed

In this article we have worked with control flow structures in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).