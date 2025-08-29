+++
title = "Rust strings"
date = 2025-08-29T20:11:39.777+01:00
draft = false
description = "Rust strings tutorial shows how to work with strings in Rust language. The tutorial covers string basics, string methods and operations."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust strings

last modified February 19, 2025

In this article we show how to work with strings in Rust.

In Rust, strings can be represented in two ways: as string slices and as owned
strings. A string slice (&amp;str ) is an immutable reference to a
portion of a string. It is typically used for borrowed string data, such as
string literals or parts of a String object. String slices are
efficient and lightweight because they don't involve copying the data, making
them ideal for read-only operations. They are often used when passing strings as
function parameters to avoid unnecessary allocations and copying.

An owned string String, on the other hand, is a growable, mutable
string type that owns its data. It is created using methods like
String::from and can be modified by appending characters or other
strings. The String type is suitable for situations where we need
to build, modify, or own string data dynamically. Stringprovides
various methods for manipulation, such as push,
push_str, concat, and format.
Understanding the differences between &amp;str and the
String is crucial for writing efficient and effective Rust code, as
each type serves different purposes depending on the context.

## Creating strings

In Rust, strings can be represented in two ways: as string slices and as 
owned strings.

main.rs
  

fn main() {
    let word1: &amp;str = "falcon";
    let word2 = String::from("eagle");

    println!("{}", word1);
    println!("{}", word2);
}

In this example, we have two strings: a string slice and an owned string.

let word1: &amp;str = "falcon";

This line creates a string slice named word1 with the value
"falcon". A string slice (&amp;str) is a reference to a part of a
string, typically used for immutable string data.

let world = String::from("eagle");

This line creates a String object named world with the value
"there!". String is a growable, mutable string type in Rust, and
String::from is used to create a String from a string literal.

λ cargo run -q
falcon
eagle

## Iterating Over Characters

This example shows how to iterate over the characters in a
String using the chars method.

main.rs
  

fn main() {
    let phrase = String::from("an old falcon");

    for ch in phrase.chars() {
        println!("{}", ch);
    }
}

We iterate over each character in the phrase string and print them
individually.

## Pushing characters

Rust strings have various methods that can be used to manipulate the strings.

main.rs
  

fn main() {
    let mut str = String::from("Hello, Rust");

    println!("Before: {}", str);
    str.push('!');
    println!("After: {}", str);
}

The push method is used to add a character to the end of the string.

λ cargo run -q
Before: Hello, Rust
After: Hello, Rust!

## String concatenation

Rust strings can be concatenated with the + operator and with 
the format! macro.

main.rs
  

fn main() {
    let s1 = String::from("an old");
    let s2 = String::from("falcon");

    let res = s1.clone() + " " + &amp;s2; 
    println!("{}", res);

    let res = format!("{} {}", s1, s2);
    println!("{}", res);
}

The example performs two contatenation operations.

let res = s1.clone() + " " + &amp;s2; 
println!("{}", res);

The s1.clone creates a copy of s1 because the
+ operator takes ownership of the string on its left-hand side. The
" " is a string slice that adds a space between s1 and
s2. The &amp;s2 is a reference to s2, 
allowing the + operator to concatenate without taking ownership.
The resulting string "an old falcon" is assigned to res.
The println!("{}", res) prints the concatenated string.

let res = format!("{} {}", s1, s2);
println!("{}", res);

The format! macro takes multiple arguments and formats them into a
single string. The "{} {}" is the format string, where
{} are placeholders for the variables s1 and
s2. The resulting string "an old falcon" is assigned
to res.

λ cargo run -q
an old falcon
an old falcon

## Slicing Strings

This example demonstrates how to create string slices from a String.

main.rs
  

fn main() {
    let phrase = String::from("an old falcon");

    let w1 = &amp;phrase[3..6];
    let w2 = &amp;phrase[7..13];

    println!("{}", w1);
    println!("{}", w2);
}

We create slices w1 and w2 from the
phrase string, extracting "old" and "falcon".

let w1 = &amp;phrase[3..6];
let w2 = &amp;phrase[7..13];

These lines create string slices w1 and w2 from the
phrase string. In Rust, string slices are references to a portion of a string,
denoted by the syntax &amp;[start..end], where start
is the starting index (inclusive) and end is the ending index
(exclusive).

## Splitting a String

The split_whitespace function splits a string slice by whitespace.

main.rs
  

fn main() {
    let text = String::from("Rust is awesome!");

    let words: Vec&lt;&amp;str&gt; = text.split_whitespace().collect();
    for word in words {
        println!("{}", word);
    }
}

The text.split_whitespace splits the text string at each whitespace
character, creating an iterator over the substrings. The collect
gathers these substrings into a Vec&lt;&amp;str&gt;, a vector of
string slices. The type annotation Vec&lt;&amp;str&gt; explicitly
specifies that the vector contains string slices.

## Trimming Whitespace

The trim method removes leading and trailing whitespace from a
string.

main.rs
  

fn main() {
    let text = String::from("\t\tan old falcon   ");

    println!("The string size: {}", text.len());

    let trimmed = text.trim();
    println!("Trimmed: '{}'", trimmed);

    println!("The string size: {}", text.len());
    println!("The string size: {}", trimmed.len());
}

We remove whitespace characters from the text String.

let trimmed = text.trim();

The trim function creates a new string slice (&amp;str) 
that references the portion of the original string without leading or trailing
whitespace.

λ cargo run -q
The string size: 18
Trimmed: 'an old falcon'
The string size: 18
The string size: 13

## Checking for Substrings

The contains method returns true if the given pattern matches a
sub-slice of this string slice.

main.rs

fn main() {
    let text = String::from("Rust programming is fun.");

    // Check if the string contains a substring
    if text.contains("Rust") {
        println!("The text contains 'Rust'.");
    } else {
        println!("The text does not contain 'Rust'.");
    }
}

The example checks of the text string contains the word "Rust".

λ cargo run -q
The text contains 'Rust'.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).