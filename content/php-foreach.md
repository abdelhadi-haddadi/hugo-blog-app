+++
title = "PHP foreach"
date = 2025-08-29T20:04:24.322+01:00
draft = false
description = "PHP foreach tutorial shows how to loop over array elements and object properties in PHP with foreach statement."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP foreach

last modified February 16, 2025

PHP foreach tutorial shows how to loop over array elements and object properties 
in PHP with foreach statement.

## PHP foreach statement

The foreach statement simplifies traversing over collections of data. The
foreach statement goes through the array elements or object properties one by
one and the current value is copied to a variable defined in the construct.

## PHP foreach example

The following example loops over array elements. 

planets.php
  

&lt;?php

$planets = [ "Mercury", "Venus", "Earth", "Mars", "Jupiter", 
                 "Saturn", "Uranus", "Neptune" ];

foreach ($planets as $item) {
    
    echo "$item ";
}

echo "\n";

We have an array of planets. With the foreach statement we go 
through elements and print them one by one. 

$ php planets.php 
Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune

## PHP foreach example II

The next example loops over an array/dictionary.

dictionary.php
  

&lt;?php 

$benelux =  [ 'be' =&gt; 'Belgium',
              'lu' =&gt; 'Luxembourgh',
              'nl' =&gt; 'Netherlands' ];

foreach ($benelux as $key =&gt; $value) {
    
    echo "$key is $value\n";
}

The example prints the key/value pairs of the array.

$ php dictionary.php 
be is Belgium
lu is Luxembourgh
nl is Netherlands

## PHP foreach alternative syntax

PHP supports an alternative syntax with  foreach and endforeach;.

altsyn.php
  

&lt;?php

$planets = [ "Mercury", "Venus", "Earth", "Mars", "Jupiter", 
                 "Saturn", "Uranus", "Neptune" ];

foreach ($planets as $planet): 
    
    echo "$planet ";
endforeach;

echo "\n";

In the example, we loop over the array using the alternative syntax.

## PHP foreach multidimensional array

We can use multiple foreach statements to loop over multidimensional
arrays.

multidim.php
  

&lt;?php

$vals = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ];

foreach ($vals as $nested) {

    foreach ($nested as $val) {

        echo $val . ' ';
    }

    echo "\n";
}

In the example, we use two foreach statements to go over 
a two-dimensional array of integers.

$ php multidim.php 
1 2 3 
4 5 6 
7 8 9 

## PHP foreach modify array elements

By using the ampersand operator (&amp;), the foreach statement works
with a reference to the array element. 

modify.php
  

&lt;?php
 
$vals = [1, 2, 3, 4, 5];

foreach ($vals as &amp;$val) {

     $val *= 2;
}
 
print_r($vals); 

In the example, we go through the array of integers and multiply each element
by two.

$ php modify_array.php 
Array
(
    [0] =&gt; 2
    [1] =&gt; 4
    [2] =&gt; 6
    [3] =&gt; 8
    [4] =&gt; 10
)

    

The array has been modified.

## PHP foreach object properties

The following example iterates over object properties.

object.php
  

&lt;?php
 
class User
{
    public $name;
    public $occupation;
 
    public function __construct($name, $occupation) {
        $this-&gt;name = $name;
        $this-&gt;occupation = $occupation;
    }
}
 
$user = new User('John Doe', 'gardener');
 
foreach ($user as $propName =&gt; $propValue) {
    echo "$propName: $propValue\n";
}

The user object has two properties: $name and $occupation. 
We loop over those properties with foreach.

$ php object.php 
name: John Doe
occupation: gardener

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have presented the PHP foreach statement.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.