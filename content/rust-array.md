+++
title = "Rust array"
date = 2025-08-29T20:11:35.294+01:00
draft = false
description = "Rust array tutorial shows how to work with arrays in Rust. An array is a fixed collection of elements of the same type."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust array

last modified February 19, 2025

In this article we show how to work with arrays in Rust.

An array is a fixed collection of elements of the same type. Each
element can be referred to by an index. The indexes are zero-based. (The index
of the first element is zero.)

Arrays are created with a pair of [] brackets. 

The array type is [T; length].

## Array initialization

In the first example, we initialize arrays in Rust.

main.rs
  

fn main() {

    let vals: [i32; 5] = [1, 2, 3, 4, 5];
    println!("{:?}", vals);

    let words = ["soup", "falcon", "water", "tree"];
    println!("{:?}", words);

    let vals2: [i32; 10] = [3; 10];
    println!("{:?}", vals2);

    let vals3 = [0; 5];
    println!("{:?}", vals3);
}

In the example, we define four arrays.

let vals: [i32; 5] = [1, 2, 3, 4, 5];

We define an array of five i32 integers. We explicitly specify 
the array type with [i32; 5]. On the right side of the assignment, 
we specify the array elements insice a pair of [] brackets. The 
elements are separated with a comma character.

println!("{:?}", vals);

We print the contents of the array to the console.

let words = ["soup", "falcon", "water", "tree"];

We define an array of strings. The type declaration is omitted; Rust will
automatically infer the type from the right side of the assignment.

let vals2: [i32; 10] = [3; 10];

Here we define an array of ten integers of the same value; in our case, all 
spots in the array are filled with number 3.

let vals3 = [0; 5];
println!("{:?}", vals3);

The second syntax also allows to omit the type declaration.

λ cargo run -q
[1, 2, 3, 4, 5]
["soup", "falcon", "water", "tree"]
[3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
[0, 0, 0, 0, 0]

## Array length

The length of an array can be determined with len function.

main.rs
  

fn main() {
    let vals = [1, 2, 3, 4, 5];
    let n = vals.len();
    println!("The length of the array is {n}");

    let words = ["soup", "falcon", "water", "tree"];
    let n2 = words.len();
    println!("The length of the array is {n2}");
}

In the example, we determine the size of two arrays. 

λ cargo run -q
The length of the array is 5
The length of the array is 4

## Accessing array elements

Arrays elements are accessed with the array access notation [i].

main.rs
  

fn main() {
    let vals = [1, 2, 3, 4, 5];

    let n = vals.len();

    println!("The first element is: {}", vals[0]);
    println!("The second element is: {}", vals[1]);
    println!("The last element is: {}", vals[n-1]);

    println!("-----------------------");

    println!("The first element is: {}", vals.first().unwrap());
    println!("The last element is: {}", vals.last().unwrap());
}

To access an array element, we specify the array name followed by a pair of 
[] brackets in which we put the index of the element.

println!("The first element is: {}", vals[0]);

We print the first element.

println!("The last element is: {}", vals[n-1]);

The last element is returned by calculating the lenght of the array and
subtracting 1.

println!("The first element is: {}", vals.first().unwrap());
println!("The last element is: {}", vals.last().unwrap());

There are also convenient first and last functions.

λ cargo run -q
The first element is: 1
The second element is: 2
The last element is: 5
-----------------------
The first element is: 1
The last element is: 5

## Rust array get

The get function returns a reference to an element or subslice.

main.rs
  

fn main() {
    let vals = [1, 2, 3, 4, 5];

    let first = vals.get(0).unwrap();
    let first_two = vals.get(0..2).unwrap();

    println!("The first element is: {}", first);
    println!("The first two elemetns: {:?}", first_two);
}

In the example, we use the get function to retrieve the first and 
then the first two elements.

let first_two = vals.get(0..2).unwrap();

We get a subslice if we pass a range to the get.

λ cargo run -q
The first element is: 1
The first two elemetns: [1, 2]

## Modificaion of array elements

In the next example, we modify elements of an array.

main.rs
  

fn main() {
    let mut vals: [i32; 5] = [0; 5];

    println!("{:?}", vals);

    vals[0] = 5;
    vals[1] = 6;
    vals[2] = 7;
    vals[3] = 8;
    vals[4] = 9;

    println!("{:?}", vals);
}

We define a mutable array of integers. Later, we modify the elements to new
values.

let mut vals: [i32; 5] = [0; 5];

A mutable array of five zeros is defined.

vals[0] = 5;
vals[1] = 6;
vals[2] = 7;
vals[3] = 8;
vals[4] = 9;

The elements are modified through the array index notation. There are five
elements in the array; the first has index 0, the fifth 4.

λ cargo run -q
[0, 0, 0, 0, 0]
[5, 6, 7, 8, 9]

## Array loop

With a for loop, we can easily loop over the elements of the array.

main.rs
  

fn main() {
    let vals = [1, 2, 3, 4, 5];

    for e in vals {
        println!("{e}");
    }

    let n = vals.len();

    for i in 0..n {
        println!("{} -&gt; {}", i, vals[i]);
    }

    for e in vals.iter().enumerate() {
        let (i, x) = e;
        println!("vals[{i}] = {x}");
    }
}

The program goes through the elements of the array three times.

for e in vals {
    println!("{e}");
}

In the first case, we simply go over the elements one by one. In each for cycle, 
the e contains the current element.

let n = vals.len();

for i in 0..n {
    println!("{} -&gt; {}", i, vals[i]);
}

In the second case, we loop over the array by creating a range of array index 
values.

for e in vals.iter().enumerate() {
    let (i, x) = e;
    println!("vals[{i}] = {x}");
}

The enumerate function creates an iterator which gives the current
index and the current value.

λ cargo run -q
1
2
3
4
5
0 -&gt; 1
1 -&gt; 2
2 -&gt; 3
3 -&gt; 4
4 -&gt; 5
vals[0] = 1
vals[1] = 2
vals[2] = 3
vals[3] = 4
vals[4] = 5

## Filtering arrays

We can filter arrays with the filter function.

main.rs
  

fn main() {
    let vals = [1, -2, -3, 4, 5];

    let res: Vec&lt;_&gt; = vals.iter().filter(|&amp;e| *e &gt; 0).collect();
    println!("{:?}", res);
}

In the program, we define an array of integers. We filter out all positive
values.

λ cargo run -q
[1, 4, 5]

## Sorting arrays

In the next example, we sort arrays. The sorting is stable and desctructive.

main.rs
  

fn main() {
    let mut vals = [5, -2, -3, 4, 1, 2];

    vals.sort();
    println!("{:?}", vals);

    let mut words = ["war", "atom", "be", "it", "cup", "forest", "book"];

    words.sort_by(|e1, e2| e1.len().cmp(&amp;e2.len()));
    println!("{:?}", words);
}

The program sorts an array of integers and an array of strings. 

vals.sort();

With sort, we sort the integers in-place. 

words.sort_by(|e1, e2| e1.len().cmp(&amp;e2.len()));

In the second case, we sort the strings by their length.

λ cargo run -q
[-3, -2, 1, 2, 4, 5]
["be", "it", "war", "cup", "atom", "book", "forest"]

In this article we have worked with arrays in Rust.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).