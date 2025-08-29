+++
title = "Rust writing to files"
date = 2025-08-29T20:11:40.924+01:00
draft = false
description = "Rust writing to files tutorial shows how to write to files in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust writing to files

last modified February 19, 2025

In this article we show how to write to files in Rust.

## File

A *file* is a named location for storing data. Rust provides the std::fs module for working with files.

## Opening a file

To write to a file, we must first open it. The File::create method creates a new file or truncates an existing one.

main.rs
  

use std::fs::File;
use std::io::Error;

fn main() -&gt; Result&lt;(), Error&gt; {
    let file = File::create("test.txt")?;
    Ok(())
}

The program creates a new file called test.txt.

let file = File::create("test.txt")?;

We create a file and store it in a variable.

The ? operator is used to handle errors. If the method returns an error, the program terminates.

## Writing to a file

To write data to a file, we use the write! macro.

main.rs
  

use std::fs::File;
use std::io::{Error, Write};

fn main() -&gt; Result&lt;(), Error&gt; {
    let mut file = File::create("test.txt")?;
    writeln!(file, "This is a test file.")?;
    Ok(())
}

The program writes a string to the file.

writeln!(file, "This is a test file.")?;

We use the writeln! macro to write a line to the file.

## Reading and writing to a file

A file can be opened for both reading and writing. The File::open method opens a file for reading.

main.rs
  

use std::fs::File;
use std::io::{Error, Read, Write};
use std::io::prelude::*;

fn main() -&gt; Result&lt;(), Error&gt; {
    let mut file = File::open("test.txt")?;

    let mut contents = String::new();
    file.read_to_string(&amp;mut contents)?;

    println!("{contents}");

    file.write_all(b"This is a test file.")?;

    Ok(())
}

The program reads the contents of the file and writes new data to it.

let mut file = File::open("test.txt")?;

We open the file for reading.

let mut contents = String::new();
file.read_to_string(&amp;mut contents)?;

We read the contents of the file into a string.

file.write_all(b"This is a test file.")?;

We write new data to the file.

## Closing a file

It is important to close a file after we are done with it. The File::drop method is used for closing a file.

main.rs
  

use std::fs::File;
use std::io::{Error, Read, Write};
use std::io::prelude::*;

fn main() -&gt; Result&lt;(), Error&gt; {
    let mut file = File::open("test.txt")?;

    let mut contents = String::new();
    file.read_to_string(&amp;mut contents)?;

    println!("{contents}");

    file.write_all(b"This is a test file.")?;

    file.drop();

    Ok(())
}

The program closes the file after writing to it.

file.drop();

The drop method is called on the file variable.

In this article we have covered writing to files in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).