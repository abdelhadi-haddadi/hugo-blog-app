+++
title = "Rust HashMap"
date = 2025-08-29T20:11:36.421+01:00
draft = false
description = "Rust HashMap tutorial shows how to work with HashMaps in Rust. A HashMap is a collection of key-value pairs, where each key is unique."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust HashMap

last modified February 19, 2025

In this article we show how to work with HashMaps in Rust.

A HashMap is a collection of key-value pairs, where each key is unique. 
HashMaps are useful for storing and retrieving data efficiently using keys.

To use HashMaps in Rust, we need to import the HashMap type from the 
std::collections module.

## Rust create HashMap

In the first example, we create and initialize HashMaps in Rust.

main.rs
  

use std::collections::HashMap;

fn main() {

    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("{:?}", scores);

    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];

    let scores2: HashMap&lt;_, _&gt; = teams.into_iter().zip(initial_scores.into_iter()).collect();
    println!("{:?}", scores2);
}

In the example, we create two HashMaps.

let mut scores = HashMap::new();

We create an empty HashMap using HashMap::new(). The mut 
keyword makes the HashMap mutable, allowing us to add key-value pairs later.

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

We insert key-value pairs into the HashMap using the insert method.

let scores2: HashMap&lt;_, _&gt; = teams.into_iter().zip(initial_scores.into_iter()).collect();

We create a HashMap from two vectors using the zip method and 
collect.

λ cargo run -q
{"Blue": 10, "Yellow": 50}
{"Blue": 10, "Yellow": 50}

## Rust access HashMap elements

We can access elements in a HashMap using the get method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&amp;team_name);

    match score {
        Some(s) =&gt; println!("Score for {}: {}", team_name, s),
        None =&gt; println!("Team {} not found", team_name),
    }
}

In the example, we access the value associated with the key "Blue".

let score = scores.get(&amp;team_name);

The get method returns an Option&lt;&amp;V&gt;, which is 
Some if the key exists, or None if it doesn't.

λ cargo run -q
Score for Blue: 10

## Rust update HashMap

We can update the values in a HashMap using the insert method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("Before update: {:?}", scores);

    scores.insert(String::from("Blue"), 25);

    println!("After update: {:?}", scores);
}

In the example, we update the value associated with the key "Blue".

λ cargo run -q
Before update: {"Blue": 10, "Yellow": 50}
After update: {"Blue": 25, "Yellow": 50}

## Using for loop

We can loop over the key-value pairs in a HashMap using a for loop.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    for (key, value) in &amp;scores {
        println!("{}: {}", key, value);
    }
}

In the example, we loop over the HashMap and print each key-value pair.

λ cargo run -q
Blue: 10
Yellow: 50

## Using while loop

We can loop over the key-value pairs in a HashMap using a while
loop.

main.rs
  

use std::collections::HashMap;`

fn main() {
    let mut fruits: HashMap&lt;i32, String&gt; = HashMap::new();
    fruits.insert(1, String::from("Apple"));
    fruits.insert(2, String::from("Banana"));
    fruits.insert(3, String::from("Cherry"));

    let mut iterator = fruits.iter(); // Obtain an iterator

    while let Some((key, value)) = iterator.next() {
        println!("Key: {}, Value: {}", key, value);
    }
}

We loop over the HashMap and print each key-value pair.

let mut iterator = fruits.iter(); // Obtain an iterator

We explicitly create an iterator using fruits.iter .

while let Some((key, value)) = iterator.next() {
    println!("Key: {}, Value: {}", key, value);
}

The while let loop continues as long as the iterator yields a Some
value, (i.e., there are more elements).

The iterator.next retrieves the next key-value pair as an
Option&lt;(key, value)&gt;. The loop destructures the key-value
pair if it exists, printing the key and value.

λ cargo run -q
Key: 2, Value: Banana
Key: 1, Value: Apple
Key: 3, Value: Cherry

## Rust HashMap Remove

We can remove a key-value pair from a HashMap using the
remove method. This method takes a reference to the key that you
want to remove from the HashMap.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Red"), 20);
    scores.insert(String::from("Green"), 40);
    scores.insert(String::from("Blue"), 60);

    println!("Before remove: {:?}", scores);

    scores.remove(&amp;String::from("Green"));

    println!("After remove: {:?}", scores);
}

In this example, we create a mutable HashMap named
scores to store team names and their scores.

scores.insert(String::from("Red"), 20); 
scores.insert(String::from("Green"), 40); 
scores.insert(String::from("Blue"), 60); 
 

We insert three key-value pairs into the HashMap, representing
three teams: "Red" with a score of 20, "Green" with a score of 40, and "Blue"
with a score of 60.

scores.remove(&amp;String::from("Green"));

We use the remove method to remove the key-value pair associated
with the key "Green". The remove method takes a reference to the
key, which is why we use &amp;String::from("Green").

λ cargo run -q
Before remove: {"Red": 20, "Green": 40, "Blue": 60}
After remove: {"Red": 20, "Blue": 60}

## Rust HashMap Keys

We can iterate over the keys stored in a HashMap using the
keys method. This method returns an iterator that yields a
reference to each key in the HashMap.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Red"), 20);
    scores.insert(String::from("Green"), 40);
    scores.insert(String::from("Blue"), 60);

    println!("HashMap: {:?}", scores);

    println!("Keys:");
    for team in scores.keys() {
        println!("{}", team);
    }
}

  In this example, we create a HashMap named
  scores to store team names and their scores.

scores.insert(String::from("Red"), 20);
scores.insert(String::from("Green"), 40);
scores.insert(String::from("Blue"), 60);

We insert three key-value pairs into the HashMap, representing
three teams: "Red" with a score of 20, "Green" with a score of 40, and "Blue"
with a score of 60.

for team in scores.keys() {
    println!("{}", team);
}

We use the keys method to get an iterator over the keys in the
HashMap. The for loop iterates through each key (team
name) and prints it to the console.

λ cargo run -q
HashMap: {"Red": 20, "Green": 40, "Blue": 60}
Keys:
Red
Green
Blue

## Rust HashMap Values

We can iterate over the values stored in a HashMap using the
values method. This method returns an iterator that yields a
reference to each value in the HashMap.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Red"), 20);
    scores.insert(String::from("Green"), 40);
    scores.insert(String::from("Blue"), 60);

    println!("HashMap: {:?}", scores);

    println!("Values:");
    for score in scores.values() {
        println!("{}", score);
    }
}

In this example, we create a HashMap named scores to
store team names and their scores.

scores.insert(String::from("Red"), 20);
scores.insert(String::from("Green"), 40);
scores.insert(String::from("Blue"), 60);

We insert three key-value pairs into the HashMap, representing
three teams: "Red" with a score of 20, "Green" with a score of 40, and "Blue"
with a score of 60.

for score in scores.values() {
    println!("{}", score);
}

We use the values method to get an iterator over the values in the
HashMap. The for loop iterates through each value
(score) and prints it to the console.

λ cargo run -q
HashMap: {"Red": 20, "Green": 40, "Blue": 60}
Values:
20
40
60

## Rust HashMap entry

The entry allows us to check if a key exists and insert a value if
it doesn't.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    scores.entry(String::from("Blue")).or_insert(25);
    scores.entry(String::from("Red")).or_insert(100);

    println!("{:?}", scores);
}

In the example, we use the entry method to insert a value only if
the key does not already exist.

λ cargo run -q
{"Blue": 10, "Yellow": 50, "Red": 100}

## Rust HashMap count elements

We can count the number of key-value pairs in a HashMap using the len method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("Number of elements: {}", scores.len());
}

In the example, we count the number of key-value pairs in the HashMap.

λ cargo run -q
Number of elements: 2

## Rust HashMap check if key exists

We can check if a key exists in a HashMap using the contains_key method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");

    if scores.contains_key(&amp;team_name) {
        println!("{} exists in the HashMap", team_name);
    } else {
        println!("{} does not exist in the HashMap", team_name);
    }
}

In the example, we check if the key "Blue" exists in the HashMap.

λ cargo run -q
Blue exists in the HashMap

## Rust HashMap merge

We can merge two HashMaps using the extend method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores1 = HashMap::new();
    scores1.insert(String::from("Blue"), 10);
    scores1.insert(String::from("Yellow"), 50);

    let mut scores2 = HashMap::new();
    scores2.insert(String::from("Red"), 100);
    scores2.insert(String::from("Green"), 75);

    scores1.extend(scores2);

    println!("{:?}", scores1);
}

In the example, we merge two HashMaps into one.

λ cargo run -q
{"Blue": 10, "Yellow": 50, "Red": 100, "Green": 75}

## Rust HashMap clear

We can clear all key-value pairs from a HashMap using the clear method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("Before clear: {:?}", scores);

    scores.clear();

    println!("After clear: {:?}", scores);
}

In the example, we clear all key-value pairs from the HashMap.

λ cargo run -q
Before clear: {"Blue": 10, "Yellow": 50}
After clear: {}

## Rust HashMap clone

We can clone a HashMap using the clone method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let scores2 = scores.clone();

    println!("Original: {:?}", scores);
    println!("Clone: {:?}", scores2);
}

In the example, we clone a HashMap.

λ cargo run -q
Original: {"Blue": 10, "Yellow": 50}
Clone: {"Blue": 10, "Yellow": 50}

## Rust HashMap iterate and modify

We can iterate over a HashMap and modify its values.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    for (_, value) in &amp;mut scores {
        *value += 10;
    }

    println!("{:?}", scores);
}

In the example, we iterate over the HashMap and increment each value by 10.

λ cargo run -q
{"Blue": 20, "Yellow": 60}

## Rust HashMap from iterator

We can create a HashMap from an iterator of key-value pairs.

main.rs
  

use std::collections::HashMap;

fn main() {
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let scores = vec![10, 50];

    let scores_map: HashMap&lt;_, _&gt; = teams.into_iter().zip(scores.into_iter()).collect();

    println!("{:?}", scores_map);
}

In the example, we create a HashMap from two vectors using the zip method.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap filter

We can filter a HashMap using the retain method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    scores.insert(String::from("Red"), 100);

    scores.retain(|_, &amp;mut v| v &gt; 20);

    println!("{:?}", scores);
}

In the example, we filter the HashMap to retain only key-value pairs where the 
value is greater than 20.

λ cargo run -q
{"Yellow": 50, "Red": 100}

## Rust HashMap sort by key

We can sort a HashMap by its keys using the BTreeMap type.

main.rs
  

use std::collections::BTreeMap;

fn main() {
    let mut scores = BTreeMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    scores.insert(String::from("Red"), 100);

    println!("{:?}", scores);
}

In the example, we use BTreeMap to sort the HashMap by its keys.

λ cargo run -q
{"Blue": 10, "Red": 100, "Yellow": 50}

## Rust HashMap sort by value

We can sort a HashMap by its values by converting it to a vector of tuples.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    scores.insert(String::from("Red"), 100);

    let mut sorted_scores: Vec&lt;_&gt; = scores.into_iter().collect();
    sorted_scores.sort_by(|a, b| a.1.cmp(&amp;b.1));

    println!("{:?}", sorted_scores);
}

In the example, we sort the HashMap by its values.

let mut sorted_scores: Vec&lt;_&gt; = scores.into_iter().collect();

This converts the scores HashMap into a vector of tuples. Each tuple contains a
key and its corresponding value. The into_iter method consumes the
HashMap and produces an iterator, and collect gathers the
iterator's items into a vector.

sorted_scores.sort_by(|a, b| a.1.cmp(&amp;b.1));

This sorts the sorted_scores vector by the values in the tuples. The
sort_by smethod takes a closure that compares the values
(a.1 and b.1) using the cmp method.

λ cargo run -q
[("Blue", 10), ("Yellow", 50), ("Red", 100)]

## Rust HashMap with custom key type

We can use a custom type as a key in a HashMap by implementing the Eq 
and Hash traits.

main.rs
  

use std::collections::HashMap;
use std::hash::{Hash, Hasher};

#[derive(Eq, PartialEq)]
struct CustomKey {
    id: u32,
    name: String,
}

impl Hash for CustomKey {
    fn hash&lt;H: Hasher&gt;(&amp;self, state: &amp;mut H) {
        self.id.hash(state);
        self.name.hash(state);
    }
}

fn main() {
    let mut scores = HashMap::new();

    let key1 = CustomKey { id: 1, name: String::from("Blue") };
    let key2 = CustomKey { id: 2, name: String::from("Yellow") };

    scores.insert(key1, 10);
    scores.insert(key2, 50);

    println!("{:?}", scores.get(&amp;CustomKey { id: 1, name: String::from("Blue") }));
}

In the example, we use a custom type as a key in a HashMap.

λ cargo run -q
Some(10)

## Rust HashMap with custom value type

We can use a custom type as a value in a HashMap.

main.rs
  

use std::collections::HashMap;

#[derive(Debug)]
struct CustomValue {
    score: u32,
    description: String,
}

fn main() {
    let mut scores = HashMap::new();

    let value1 = CustomValue { score: 10, description: String::from("Good") };
    let value2 = CustomValue { score: 50, description: String::from("Excellent") };

    scores.insert(String::from("Blue"), value1);
    scores.insert(String::from("Yellow"), value2);

    println!("{:?}", scores.get(&amp;String::from("Blue")));
}

In the example, we use a custom type as a value in a HashMap.

λ cargo run -q
Some(CustomValue { score: 10, description: "Good" })

## Rust HashMap Default Value

We can provide a default value for a HashMap using the
entry method. This is particularly useful when you want to ensure
that a key always has a value, even if it wasn't explicitly inserted into the
HashMap before. Let's explore how this works in detail with an example.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // Define a team name that doesn't exist in the HashMap
    let team_name = String::from("Red");
    let score = scores.entry(team_name.clone()).or_insert(0);

    println!("{}: {}", team_name, score);
}

In this example, we first create a mutable HashMap named
scores to store team names and their scores. Next, we define a team
name "Red" that doesn't currently exist in the HashMap. We use the
entry to check if the key "Red" exists in the
HashMap. If it doesn't, we insert a default value of 0 using the
or_insert method. This ensures that the HashMap always
has a value for the specified key.

 
scores.insert(String::from("Blue"), 10); 
scores.insert(String::from("Yellow"), 50); 
 

Insert some key-value pairs into the HashMap.

Finally, we print the team name and its score using the println!
macro. Since "Red" didn't exist in the HashMap initially, the
default value of 0 is inserted, and we see the output:

λ cargo run -q
Red: 0

## Rust HashMap with capacity

We can create a HashMap with a specific capacity using the with_capacity method.

main.rs
  

use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::with_capacity(10);

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    println!("Capacity: {}", scores.capacity());
}

In the example, we create a HashMap with a capacity of 10.

λ cargo run -q
Capacity: 10

## Rust HashMap from array

We can create a HashMap from an array of tuples.

main.rs
  

use std::collections::HashMap;

fn main() {
    let scores: HashMap&lt;_, _&gt; = [
        (String::from("Blue"), 10),
        (String::from("Yellow"), 50),
    ].iter().cloned().collect();

    println!("{:?}", scores);
}

In the example, we create a HashMap from an array of tuples.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap from vector

We can create a HashMap from a vector of tuples.

main.rs
  

use std::collections::HashMap;

fn main() {
    let scores: HashMap&lt;_, _&gt; = vec![
        (String::from("Blue"), 10),
        (String::from("Yellow"), 50),
    ].into_iter().collect();

    println!("{:?}", scores);
}

In the example, we create a HashMap from a vector of tuples.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap from iterator

We can create a HashMap from an iterator of key-value pairs.

main.rs
  

use std::collections::HashMap;

fn main() {
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let scores = vec![10, 50];

    let scores_map: HashMap&lt;_, _&gt; = teams.into_iter().zip(scores.into_iter()).collect();

    println!("{:?}", scores_map);
}

In the example, we create a HashMap from an iterator of key-value pairs.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap from slice

We can create a HashMap from a slice of tuples.

main.rs
  

use std::collections::HashMap;

fn main() {
    let scores: HashMap&lt;_, _&gt; = [
        (String::from("Blue"), 10),
        (String::from("Yellow"), 50),
    ].iter().cloned().collect();

    println!("{:?}", scores);
}

In the example, we create a HashMap from a slice of tuples.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap from range

We can create a HashMap from a range of key-value pairs.

main.rs
  

use std::collections::HashMap;

fn main() {
    let scores: HashMap&lt;_, _&gt; = (0..5).map(|i| (i, i * 10)).collect();

    println!("{:?}", scores);
}

In the example, we create a HashMap from a range of key-value pairs.

λ cargo run -q
{0: 0, 1: 10, 2: 20, 3: 30, 4: 40}

## Rust HashMap from iterator of tuples

We can create a HashMap from an iterator of tuples.

main.rs
  

use std::collections::HashMap;

fn main() {
    let scores: HashMap&lt;_, _&gt; = [
        (String::from("Blue"), 10),
        (String::from("Yellow"), 50),
    ].iter().cloned().collect();

    println!("{:?}", scores);
}

In the example, we create a HashMap from an iterator of tuples.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

## Rust HashMap from iterator of key-value pairs

We can create a HashMap from an iterator of key-value pairs.

main.rs
  

use std::collections::HashMap;

fn main() {
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let scores = vec![10, 50];

    let scores_map: HashMap&lt;_, _&gt; = teams.into_iter().zip(scores.into_iter()).collect();

    println!("{:?}", scores_map);
}

In the example, we create a HashMap from an iterator of key-value pairs.

λ cargo run -q
{"Blue": 10, "Yellow": 50}

In this article we have worked with variables in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).