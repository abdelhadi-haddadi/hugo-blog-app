+++
title = "Rust file reading"
date = 2025-08-29T20:11:38.690+01:00
draft = false
description = "Rust file reading tutorial shows how to read files in Rust language. The tutorial covers file basics, file operations."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust file reading

last modified February 19, 2025

In this article, we will cover how to read files in Rust.

Rust has several ways to read files, including using the
std::fs::File and std::io::Read traits.

## The read_to_string function

The read_to_string function reads the whole file into a
String.

main.rs
  

use std::fs::File;
use std::io::Read;

fn main() {

    let filename = "words.txt";

    let mut file = match File::open(filename) {
        Ok(file) =&gt; file,
        Err(err) =&gt; panic!("Could not open file: {}", err),
    };

    let mut contents = String::new();

    match file.read_to_string(&amp;mut contents) {
        Ok(_) =&gt; println!("File contents: {}", contents),
        Err(err) =&gt; panic!("Could not read file: {}", err),
    }
}

In this example, we open a file called words.txt using the
File::open function and read its contents into a string using the
read_to_string function.

## Using BufReader

Another way to read files in Rust is to use the BufReader type from
the std::io module.

main.rs
  

use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {

    let filename = "words.txt";

    let file = match File::open(filename) {
        Ok(file) =&gt; file,
        Err(err) =&gt; panic!("Could not open file: {}", err),
    };

    let reader = BufReader::new(file);

    for line in reader.lines() {
        match line {
            Ok(line) =&gt; println!("{}", line),
            Err(err) =&gt; panic!("Could not read line: {}", err),
        }
    }
}

In this example, we open a file and create a BufReader instance to
read the file line by line.

## The read_to_end function

 
The read_to_end function reads all bytes until EOF in the source,
placing them into a buffer.

main.rs 
   

use std::fs::File;
use std::io::{self, Read};

fn main() -&gt; io::Result&lt;()&gt; {
    let filename = "words.txt";

    let mut f = File::open(filename)?;
    let mut buffer = Vec::new();

    f.read_to_end(&amp;mut buffer)?;
    let content = String::from_utf8_lossy(&amp;buffer);

    println!("{}", content);

    Ok(())
}

 
In this example, we define a buffer and read the while file into the buffer
with read_to_end. Later we convert the buffer into a string 
and print it to the console.

let mut buffer = Vec::new();

We define a buffer. 

f.read_to_end(&amp;mut buffer)?;

We read the whole file into a buffer.

let content = String::from_utf8_lossy(&amp;buffer);

We convert the buffer to a string.

In this article, we covered the basics of reading files in Rust. We demonstrated
how to open and read files using the std::fs::File and
std::io::Read traits, and how to handle errors that may occur
during the process.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).