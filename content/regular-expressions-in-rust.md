+++
title = "Regular expressions in Rust"
date = 2025-08-29T20:11:38.683+01:00
draft = false
description = "Regular expressions in Rust tutorial shows how to use regular expressions in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Regular expressions in Rust

last modified February 19, 2025

In this article we show how to use regular expressions in Rust.

## Regular expressions

In Rust, regular expressions are patterns used to match character combinations
in strings. They are often used for string searching, replacement, and
validation. Rust provides the regex crate, a library for working with regular
expressions, which is both fast and reliable.

The following table shows a couple of regular expression strings.

    
        Regex
        Meaning
    

    
        .
        Matches any single character.
    
    
        ?
        Matches the preceding element once or not at all.
    
    
        +
        Matches the preceding element once or more times.
    
    
        *
        Matches the preceding element zero or more times.
    
    
        ^
        Matches the starting position within the string.
    
    
        $
        Matches the ending position within the string.
    
    
        |
        Alternation operator.
    
    
        [abc]
        Matches a or b, or c.
    
    
        [a-c]
        Range; matches a or b, or c.
    
    
        [^abc]
        Negation, matches everything except a, or b, or c. 
    
    
        \s
        Matches white space character.
    
    
        \w
        Matches a word character; equivalent to [a-zA-Z_0-9]
    

## The is_match function

The is_match function indicates whether the regular expression
finds a match in the input string.

main.rs
  

use regex::Regex;

fn main() {
    let words = vec!["Seven", "even", "Maven", "Amen", "eleven"];
    let rx = Regex::new(r".even").unwrap();

    for word in &amp;words {
        if rx.is_match(word) {
            println!("{} does match", word);
        } else {
            println!("{} does not match", word);
        }
    }
}

In the example, we have five words in a vector. We check which words match the
.even regular expression.

let rx = Regex::new(r".even").unwrap();

We define the regular expression. The dot character stands for any single
character. The rest are regular letters.

for word in &amp;words {
    if rx.is_match(word) {
        println!("{} does match", word);
    } else {
        println!("{} does not match", word);
    }
}

We go through the list of words. The is_match method returns true
if the word matches the regular expression.

$ cargo run -q
Seven does match
even does not match
Maven does not match
Amen does not match
eleven does match

## Finding occurrences of words

The example finds and prings all occurrences of "fox" or "foxes" in the provided
text, along with their positions.

main.rs
  

use regex::Regex;

fn main() {
    let content = "Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox.";

    // Adding (?i) to the regex pattern to ignore case
    let rx = Regex::new(r"(?i)fox(es)?").unwrap();

    for mat in rx.find_iter(content) {
        println!("{} at index {}", mat.as_str(), mat.start());
    }
}

The  search is case-insensitive.

let rx = Regex::new(r"(?i)fox(es)?").unwrap();

This line creates a new regular expression that matches "fox" or "foxes",
ignoring case.

for mat in rx.find_iter(content) {
    println!("{} at index {}", mat.as_str(), mat.start());
}

The find_iter returns an iterator over all matches of the regular
expression in the content. The mat.as_str returns the pattern 
found and the mat.start its starting index.

$ cargo run -q
Foxes at index 0
Foxes at index 80
Foxes at index 194
fox at index 292
fox at index 307

## Counting matches

The next example counts all occurrences of the given pattern with
count.

main.rs
  

use regex::Regex;

fn main() {
    let content = "Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox.";

    let pattern = r"(?i)fox(es)?";

    let rx = Regex::new(pattern).unwrap();
    let n = rx.find_iter(content).count();

    println!("There are {} matches", n);
}

We find how many times we have fox(es) in the text. The search is
case-insensitive.

## Regex anchors

Anchors match positions of characters inside a given text. In the next example,
we look if a string is located at the beginning of a sentence.

main.rs
  

use regex::Regex;

fn main() {
    let sentences = vec![
        "I am looking for Jane.",
        "Jane was walking along the river.",
        "Kate and Jane are close friends."
    ];

    let rx = Regex::new(r"^Jane").unwrap();

    for sentence in &amp;sentences {
        if rx.is_match(sentence) {
            println!("{} does match", sentence);
        } else {
            println!("{} does not match", sentence);
        }
    }
}

We have three sentences. The search pattern is ^Jane. The pattern
checks if the "Jane" string is located at the beginning of the text.
Jane\.$ would look for "Jane" at the end of the sentence.

## Regex alternations

The alternation operator | enables to create a regular expression
with several choices.

main
  

use regex::Regex;

fn main() {
    let users = vec![
        "Jane", "Thomas", "Robert", "Lucy", "Beky", "John", "Peter", "Andy",
    ];

    for user in &amp;users {
        if rx.is_match(user) {
            println!("{} does match", user);
        } else {
            println!("{} does not match", user);
        }
    }
}

We have nine names in the list.

let rx = Regex::new(r"Jane|Beky|Robert").unwrap();

This regular expression looks for "Jane", "Beky", or "Robert" strings.

## Capturing groups

Round brackets are used to create capturing groups. This allows us to apply a
quantifier to the entire group or to restrict alternation to a part of the
regular expression.

main
  

use regex::Regex;

fn main() {
    let sites = vec!["webcode.me", "zetcode.com", "freebsd.org", "netbsd.org"];

    let rx = Regex::new(r"(\w+)\.(\w+)").unwrap();

    for site in &amp;sites {
        if let Some(caps) = rx.captures(site) {
            println!("{}", &amp;caps[0]); // Whole match
            println!("{}", &amp;caps[1]); // First group
            println!("{}", &amp;caps[2]); // Second group
        }
        println!("*****************");
    }
}

In the example, we divide the domain names into two parts by using groups.

let rx = Regex::new(r"(\w+)\.(\w+)").unwrap();

We define two groups with parentheses.

if let Some(caps) = rx.captures(site)

The condition checks if the site matches the regular expression pattern and
captures the groups.

println!("{}", &amp;caps[0]); // Whole match
println!("{}", &amp;caps[1]); // First group
println!("{}", &amp;caps[2]); // Second group

WE print the matched groups.

$ cargo run -q
webcode.me
webcode
me
*****************
zetcode.com
zetcode
com
*****************
freebsd.org
freebsd
org
*****************
netbsd.org
netbsd
org
*****************

## Regex replace

The replace method is used to replace text.

main.rs
  

use regex::Regex;

fn main() {
    let text = "My name is John Doe.";
    let re = Regex::new(r"John").unwrap();

    let new_text = re.replace(text, "Jane");

    println!("{}", new_text);
}

```
$ cargo run -q
My name is Jane Doe.

```

## Regex split

The split method is used to split text.

main.rs
  

use regex::Regex;

fn main() {
    let text = "My name is John Doe.";
    let re = Regex::new(r"\s").unwrap();

    for part in re.split(text) {
        println!("{}", part);
    }
}

```
$ cargo run -q
My
name
is
John
Doe.

```

## Source

[Crate regex documentation](https://docs.rs/regex/latest/regex/)

In this article, we have used regular expressions in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).