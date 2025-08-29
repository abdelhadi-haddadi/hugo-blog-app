+++
title = "PHP array"
date = 2025-08-29T20:04:08.033+01:00
draft = false
description = "PHP array tutorial shows how to work with arrays in PHP. A PHP array is a collection which is used both as a list and a map."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array

last modified February 16, 2025

In this article we show how to work with arrays in PHP.

 

## PHP array definition

Arrays are collections of data. A variable can hold only one item at
a time. Arrays can hold multiple items.

**Note: ** a PHP array is a collection which is used both as a list
and a map.

PHP has plenty of functions to modify, sort, merge, slice, shuffle the data
inside the arrays. There are specific database handling functions for populating
arrays from database queries. Several other functions return arrays.

## PHP array initialization

Arrays can be initialized with a pair of [] brackets of with the
array function.

init1.php
  

&lt;?php

$names = ["Jane", "Lucy", "Timea", "Beky", "Lenka"];

print_r($names);

We create a $names array, which stores five female names.
The print_r function prints a human readable information
about the variable.

$ php init1.php
Array
(
    [0] =&gt; Jane
    [1] =&gt; Lucy
    [2] =&gt; Timea
    [3] =&gt; Beky
    [4] =&gt; Lenka
)

From the output we can see the names and their indexes by which we
can access them.

Traditionally, arrays have been initialized with the array
function. In its simplest form, the function takes an arbitrary number of comma
separated values.

init2.php
  

&lt;?php

$names = array("Jane", "Lucy", "Timea", "Beky", "Lenka");

print_r($names);

Same array of female names is created with the array function.

Arrays can be initialized by assigning values to array indexes.

init3.php
  

&lt;?php

$continents[0] = "America";
$continents[1] = "Africa";
$continents[2] = "Europe";
$continents[3] = "Asia";
$continents[4] = "Antarctica";
$continents[5] = "Australia";

print_r($continents);

We create the $continents array by assigning values to array
indexes. "America" has index 0, "Europe" has index 2 etc.

init4.php
  

&lt;?php

$continents = [ 1 =&gt; "America", 2 =&gt; "Africa",
    3 =&gt; "Europe", 4 =&gt; "Asia", 5 =&gt; "Antarctica",
    6 =&gt; "Australia" ];

print_r($continents);

In this example, we create the $continents array with
the indexes specified. By default, the first index is zero. In
our case, we start with 1.

$ php init4.php
Array
(
    [1] =&gt; America
    [2] =&gt; Africa
    [3] =&gt; Europe
    [4] =&gt; Asia
    [5] =&gt; Antarctica
    [6] =&gt; Australia
)

Now we have an array of continents with indexes that
we have chosen.

The indexes do not have to be consecutive numbers.

init5.php
  

&lt;?php

$languages[10] = "PHP";
$languages[20] = "Python";
$languages[30] = "Ruby";
$languages[40] = "PERL";
$languages[50] = "Java";

print_r($languages);

In the example, we have chosen numbers 10, 20, 30, 40, and 50 to be the indexes
for the $languages array.

When we do assignment initialization of a PHP array, we can omit
the indexes. PHP automatically creates the indexes for us.

init6.php
  

&lt;?php

$actors[] = "Philip Seymour Hoffman";
$actors[] = "Tom Cruise";
$actors[] = "Bill Paxton";
$actors[] = "Adrien Brody";
$actors[] = "Daniel Craig";

print_r($actors);

An array of actors is created. No specific indexes are set.

$ php init6.php
Array
(
    [0] =&gt; Philip Seymour Hoffman
    [1] =&gt; Tom Cruise
    [2] =&gt; Bill Paxton
    [3] =&gt; Adrien Brody
    [4] =&gt; Daniel Craig
)

The PHP interpreter has created consecutive indexes starting from zero.

init7.php
  

&lt;?php

$novels[10] = "Doctor Zhivago";
$novels[11] = "War and Peace";
$novels[] = "In Cold Blood";
$novels[20] = "Crime and Punishment";
$novels[] = "Catch XII";

print_r($novels);

In this script, we have omitted two indexes. The PHP will add them. It will
create index 12 and index 21.

$ php init5.php
Array
(
    [10] =&gt; Doctor Zhivago
    [11] =&gt; War and Peace
    [12] =&gt; In Cold Blood
    [20] =&gt; Crime and Punishment
    [21] =&gt; Catch XII
)

PHP has automatically created indexes 12 and 21.

The keys of an array can be strings too.

init8.php
  

&lt;?php

$countries = [
    "de" =&gt; "Germany", "sk" =&gt; "Slovakia",
    "us" =&gt; "United States", "ru" =&gt; "Russia",
    "hu" =&gt; "Hungaria", "pl" =&gt; "Poland" ];

echo $countries["de"] . "\n";
echo $countries["sk"] . "\n";

We create a $countries array with string indexes.

$ php init8.php
Germany
Slovakia

## PHP array element types

A PHP array can contain elements of various types.

types.php
  

&lt;?php 

$vals = ['sky', true, -4, [1, 2, 3, 4]];

foreach ($vals as $val) {
    
    $t = gettype($val);

    $res = match($t) {

        'string' =&gt; 'value is a string',
        'integer' =&gt; 'value is an integer',
        'boolean' =&gt; 'value is a boolean', 
        'array' =&gt; 'value is an array',
        default =&gt; 'unknown type'
    };

    echo "$res\n";

}

In the example, we have an array with elements of different types. With the 
match expression and the gettype function, we get the type of each 
element.

$ php types.php 
value is a string
value is a boolean
value is an integer
value is an array

## PHP perusing arrays

Next we read the contents of the arrays. There are several ways how we can
display data from an array.

peruse1.php
  

&lt;?php

$languages[10] = "PHP";
$languages[20] = "Python";
$languages[30] = "Ruby";
$languages[40] = "PERL";
$languages[50] = "Java";

echo $languages[10], "\n";
echo $languages[20], "\n";
echo $languages[30], "\n";
echo $languages[40], "\n";
echo $languages[50], "\n";

We can access data from an array by their index.

$ php peruse1.php
PHP
Python
Ruby
PERL
Java

We have printed all five languages to the console.

peruse2.php
  

&lt;?php

$continents = [ "America", "Africa", "Europe",
    "Asia", "Australia", "Antarctica" ];

$len = count($continents);

for ($i = 0; $i &lt; $len; $i++) {
    echo $continents[$i], "\n";
}

In this example, we use the for statement to peruse a
$continents array.

$len = count($continents);

First, we count the number of elements in the array with the count
function.

for ($i = 0; $i &lt; $len; $i++) {
    echo $continents[$i], "\n";
}

The for loop prints elements from the
array by indexes 0..$len-1.

peruse3.php
  

&lt;?php

$continents = [ "America", "Africa", "Europe", "Asia",
    "Australia", "Antarctica" ];

foreach ($continents as $continent) {
    echo $continent, "\n";
}

The easiest way to peruse an array is to use the foreach
statement. The statement goes through the array one by one and puts a current
element to the temporary $continent variable. It accesses data
without using their index or key.

walk.php
  

&lt;?php

$countries = [ "de" =&gt; "Germany", "sk" =&gt; "Slovakia",
    "us" =&gt; "United States", "ru" =&gt; "Russia",
    "hu" =&gt; "Hungaria", "pl" =&gt; "Poland" ];

function show_values($value, $key) {

    echo "The $key stands for the $value\n";
}

array_walk($countries, 'show_values');

In the last example, we use the array_walk function to
peruse an array. It applies a user function to every member of an array.
The user function takes the key and the value of the item as parameters.

$ php walk.php
The de stands for the Germany
The sk stands for the Slovakia
The us stands for the United States
The ru stands for the Russia
The hu stands for the Hungary
The pl stands for the Poland

We print both the key and the value to the console in the sentence.

## PHP array sort

First we are going to sort an arrays.

sort.php
  

&lt;?php

$names = [ "Jane", "Rebecca", "Lucy", "Lenka", "Ada" ];

echo "Unsorted: \n";

foreach ($names as $name) {
    echo "$name ";
}

echo "\n";

sort($names);

echo "Sorted: \n";

foreach ($names as $name) {
    echo "$name ";
}

echo "\n";

In the above script, we have a $names array. We use the
sort function to sort the contents of the array.

$ php sort.php
Unsorted:
Jane Rebecca Lucy Lenka Ada
Sorted:
Ada Jane Lenka Lucy Rebecca

The output of the script shows unsorted and sorted female names.

The rsort function sorts an array in reverse order.

sort2.php
  

&lt;?php

$numbers = [ 12, 3, 5, 1, 6, 7, 10, 0, 9, 8, 11];

sort($numbers);

echo "Ascending order: \n";

foreach ($numbers as $n) {
    echo "$n ";
}

echo "\n";

rsort($numbers);

echo "Descending order: \n";

foreach ($numbers as $n) {
    echo "$n ";
}

echo "\n";

There is an array of integers. It is sorted in ascending and descending
order.

sort($numbers);

The sort function sorts the integers in ascending order.

rsort($numbers);

The rsort function sorts the integers in descending order.

$ php sort2.php
Ascending order:
0 1 3 5 6 7 8 9 10 11 12
Descending order:
12 11 10 9 8 7 6 5 3 1 0

In the following example, we show how to sort accented characters.

locale_sort.php
  

&lt;?php

setlocale(LC_ALL, 'sk_SK.utf8');

$words = [ "ďateľ", "auto", "železo", "byt", "kocka", "dáma",
    "zem", "autor", "ceduľa", "čižma"];

sort($words, SORT_LOCALE_STRING);

echo "Ascending order: \n";

foreach ($words as $w) {
    echo "$w ";
}

echo "\n";

rsort($words, SORT_LOCALE_STRING);

echo "Descending order: \n";

foreach ($words as $w) {
    echo "$w ";
}

echo "\n";

We have an array of Slovak words which contain specific accents.

setlocale(LC_ALL, 'sk_SK.utf8');

We set the Slovak locale using the setlocale function.
A locale  represents a specific geographical, political, or cultural region.

$words = [ "ďateľ", "auto", "železo", "byt", "kocka", "dáma",
    "zem", "autor", "ceduľa", "čižma"];

The $words is an array of accented Slovak words.

sort($words, SORT_LOCALE_STRING);

We sort the array in ascending order with the sort function. We
pass the SORT_LOCALE_STRING flag to the function, which tells
sort to take the locale into account.

$ php locale_sort.php
Ascending order:
auto autor byt ceduľa čižma dáma ďateľ kocka zem železo
Descending order:
železo zem kocka ďateľ dáma čižma ceduľa byt autor auto

The words are correctly sorted according to the Slovak standards.

Sometimes we need to perform custom sorting. For custom sorting,
we have the usort function in PHP.

custom_sorting.php
  

&lt;?php

$names = [ "Michael Brown", "Albert Einstein", "Gerry Miller",
    "Tom Willis", "Michael Gray", "Luke Smith" ];

function sort_second_names($a, $b) {

    $name1 = explode(" ", $a);
    $name2 = explode(" ", $b);

    return strcmp($name1[1], $name2[1]);
}

usort($names, 'sort_second_names');

foreach ($names as $name) {
    echo "$name\n";
}

echo "\n";

We have an array of full names. The sort function would sort these
strings according to the first names, because they precede the second names. We
create a solution to sort these names according to their second names.

function sort_second_names($a, $b) {

    $name1 = explode(" ", $a);
    $name2 = explode(" ", $b);

    return strcmp($name1[1], $name2[1]);
}

We have a custom sorting function. The names are split by the
explode function and the second names are compared with the
strcmp function.

usort($names, 'sort_second_names');

The usort function accepts the comparing function as its second
parameter.

$ php custom_sorting.php
Michael Brown
Albert Einstein
Michael Gray
Gerry Miller
Luke Smith
Tom Willis

The names are correctly sorted according to their second names.

## PHP counting values in arrays

The count function counts the number of elements in the array. The
array_sum function calculates the sum of all values. The
array_product function calculates the product of values in the
array.

counting.php
  

&lt;?php

$numbers = [ 1, 2, 4, 5, 2, 3, 5, 2 ];

$len = count($numbers);
$sum = array_sum($numbers);
$prod = array_product($numbers);

echo "In the array, there are $len numbers\n";
echo "The sum of the numbers is $sum\n";
echo "The product of the numbers is $prod\n";

In the example, we have an array of numbers. We apply the above defined
functions on the array.

$ php counting.php
In the array, there are 8 numbers
The sum of the numbers is 24
The product of the numbers is 2400

## PHP unique values

In the following example, we find out unique values
in an array.

unique.php
  

&lt;?php

$numbers = array(3, 4, 4, 3, 2, 4);
$count_values = array_count_values($numbers);

print_r($count_values);

$unique = array_unique($numbers);

print_r($unique);

In this script, we have duplicates in the array. The
array_count_values function returns an array with the number of
occurrences for each value. The array_unique function returns an
array without duplicates.

$ php unique.php
Array
(
    [3] =&gt; 2
    [4] =&gt; 3
    [2] =&gt; 1
)
Array
(
    [0] =&gt; 3
    [1] =&gt; 4
    [4] =&gt; 2
)

The first array says that 3 is present twice, 4 three times, and 2 once. The
second array says that there are three values present in the array: 3, 4, and 2.
Value 3 has index 0, 4 has index 1 and 2 has index 4. The
array_unique function keeps the indexes untouched.

## PHP slicing arrays

The array_slice function returns a sequence of elements from an
array as specified by its offset and length parameters.

slicing.php
  

&lt;?php

$nums = range(1, 20);

$slice1 = array_slice($nums, 0, 3);

echo "Slice1:\n";

foreach ($slice1 as $s) {

    echo "$s ";
}

echo "\n";

$slice2 = array_slice($nums, -3);

echo "Slice2:\n";

foreach ($slice2 as $s) {

    echo "$s ";
}

echo "\n";

In the example, we create two slices of an array of integers.

$slice1 = array_slice($nums, 0, 3);

We create a slice starting from the first element; the length
of the slice is three elements.

$slice2 = array_slice($nums, -3);

By giving a negative offset, the slice is created from the end
of the array.

$ php slicing.php
Slice1:
1 2 3
Slice2:
18 19 20

## PHP array pointer

PHP has an internal array pointer. In the following example, we present
functions that manipulate this pointer.

array_pointer.php
  

&lt;?php

$continents = [ "America", "Africa", "Europe", "Asia", "Australia",
    "Antarctica" ];

$item1 = current($continents);
$item2 = next($continents);
$item3 = next($continents);
$item4 = end($continents);
$item5 = prev($continents);

echo "$item1, $item2, $item3, $item4, $item5\n";

reset($continents);

while(list($idx, $val) = each($continents)) {

    echo "Index: $idx, Value: $val\n";
}

In this example, we traverse the array using the functions that move the
internal array pointer.

$item1 = current($continents);
$item2 = next($continents);
$item3 = next($continents);
$item4 = end($continents);
$item5 = prev($continents);

The current function returns the current element in the array. At
the beginning, it is the first element of the array. The next
function advances the pointer by one position. The end function
returns the last element. The prev element returns the element, one
position before the current one. In our case it is the next to the last element.

reset($continents);

while(list($idx, $val) = each($continents)) {

    echo "Index: $idx, Value: $val\n";
}

Here we use the reset function to set the internal pointer to the
first element again and peruse the $continents array one more time.

$ php array_pointer.php
America, Africa, Europe, Antarctica, Australia
Index: 0, Value: America
Index: 1, Value: Africa
Index: 2, Value: Europe
Index: 3, Value: Asia
Index: 4, Value: Australia
Index: 5, Value: Antarctica

## PHP merging arrays

The array_merge function merges arrays.

merge.php
  

&lt;?php

$names1 = [ "Jane", "Lucy", "Rebecca" ];
$names2 = [ "Lenka", "Timea", "Victoria" ];

$names = array_merge($names1, $names2);

foreach ($names as $name) {

    echo "$name ";
}

echo "\n";

In this example, we have two arrays: $names1 and $names2.
We use the array_merge function to create $names array by
merging the previous two arrays.

$ php merge.php
Jane Lucy Rebecca Lenka Timea Victoria

The new array has six names.

## PHP modifying arrays

It is possible to modify PHP arrays with array_push, 
array_pop, array_shift, or array_unshift
functions.

modify.php
  

&lt;?php

$numbers = [ 1, 2, 3, 4 ];

array_push($numbers, 5, 6);

foreach ($numbers as $num) {
    echo $num, " ";
}

echo "\n";

array_pop($numbers);

foreach ($numbers as $num) {
    echo $num, " ";
}

echo "\n";

array_unshift($numbers, -1, 0);

foreach ($numbers as $num) {
    echo $num, " ";
}

echo "\n";

array_shift($numbers);

foreach ($numbers as $num) {
    echo $num, " ";
}

echo "\n";

In the above script, we use functions that modify the contents of an array.
We have a $numbers array that has 4 numbers: 1, 2, 3, and 4.

array_push($numbers, 5, 6);

The array_push function inserts one or more items to the end
of the array. Our array now contains values 1, 2, 3, 4, 5, and 6.

array_pop($numbers);

The array_pop function removes the last item from the array.
Our array stores now numbers 1, 2, 3, 4, and 5.

array_unshift($numbers, -1, 0);

The array_unshift function adds -1 and 0 to the beginning
of the array. The array contains values -1, 0, 1, 2, 3, 4, and 5.

array_shift($numbers);

Finally, the array_shift function removes the first item
from the array. Now we have values 0, 1, 2, 3, 4, and 5 in the array.

$ php modify.php
1 2 3 4 5 6
1 2 3 4 5
-1 0 1 2 3 4 5
0 1 2 3 4 5

## PHP range function

The range function simplifies array creation by automatically
creating a sequence of elements. It accepts three parameters: start of sequence,
end of sequence, and an optional increment, which defaults to 1.

range.php
  

&lt;?php

$numbers1 = range(1, 15);

foreach ($numbers1 as $num) {
    echo "$num ";
}

echo "\n";

$numbers2 = range(15, 1, -1);

foreach ($numbers2 as $num) {
    echo "$num ";
}

echo "\n";

The range function enables us to create a list of consecutive
numbers easily.

$numbers1 = range(1, 15);

An array with numbers 1, 2, ... 15 is created.

$numbers2 = range(15, 1, -1);

It is possible to create a descending sequence of values
by specifying a negative increment.

$ php range.php
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

## PHP randomizing array values

The array_rand function picks one or more random entries from an
array. The shuffle function randomizes the order of the elements in
an array.

randomize.php
  

&lt;?php

$nums = range(1, 20);

echo ($nums[array_rand($nums)]) . "\n";

$r = array_rand($nums, 2);
echo $nums[$r[0]] . "\n";
echo $nums[$r[1]] . "\n";

shuffle($nums);

foreach ($nums as $n) {
    echo "$n ";
}

echo "\n";

In the example, we pick random values from the array and randomize its order of
elements.

echo ($nums[array_rand($nums)]) . "\n";

The array_rand function returns a random key from the
$num array.

$r = array_rand($nums, 2);

In this case, the array_rand function returns an array of two
random keys.

$ php randomize.php
4
2
19
13 19 4 3 17 11 20 16 10 9 8 14 15 12 18 2 6 5 1 7

This is a sample output of the randomize.php program.

## PHP in_array function

The in_array function checks if a specific element
is inside an array.

inarray.php
  

&lt;?php

$names = [ "Jane", "Adriana", "Lucy", "Rebecca" ];

if (in_array("Jane", $names)) {
    echo "Jane is in the array\n";
} else {
    echo "Jane is not in the array\n";
}

if (in_array("Monica", $names)) {
    echo "Monica is in the array\n";
} else {
    echo "Monica is not in the array\n";
}

Our script checks if 'Jane' and 'Monica' is in the $names array.

$ php inarray.php
Jane is in the array
Monica is not in the array

'Jane is in the array, but 'Monica' is not.

## PHP array keys and values

PHP array is an associative array which consists of key and value pairs.

keysvalues.php
  

&lt;?php

$domains = [ "sk" =&gt; "Slovakia", "de" =&gt; "Germany",
    "hu" =&gt; "Hungary", "ru" =&gt; "Russia" ];

$keys = array_keys($domains);
$values = array_values($domains);

foreach ($keys as $key) {
    echo "$key ";
}

echo "\n";

foreach ($values as $value) {
    echo "$value ";
}

echo "\n";

The array_keys function returns all the keys of an array. The
array_values function returns all the values of an array.

$ php keysvalues.php
sk de hu ru
Slovakia Germany Hungary Russia

The first line consists of top level domain names. These were the keys of the
$domains array. The second line are the names of the corresponding
countries. These were the values of the array.

## PHP array_walk function

The array_walk function applies a user defined function to
every member of the array.

array_walk.php
  

&lt;?php

$countries = [ "de" =&gt; "Germany", "sk" =&gt; "Slovakia",
    "us" =&gt; "United States", "ru" =&gt; "Russia",
    "hu" =&gt; "Hungaria", "pl" =&gt; "Poland" ];

function show_values($value, $key) {

    echo "The $key stands for the $value\n";
}

array_walk($countries, 'show_values');

We have a $countries array. We apply the 
show_values function to each element of the array. The function
simply prints the key and the value for each element.

$ php array_walk.php
The de stands for the Germany
The sk stands for the Slovakia
The us stands for the United States
The ru stands for the Russia
The hu stands for the Hungaria
The pl stands for the Poland

## Source

[PHP array - language reference](https://www.php.net/manual/en/language.types.array.php)

In this article we have covered PHP arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.