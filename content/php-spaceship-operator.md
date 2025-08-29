+++
title = "PHP Spaceship Operator"
date = 2025-08-29T20:04:43.821+01:00
draft = false
description = "PHP Spaceship Operator tutorial explains the <=> operator for comparisons, with examples on sorting and custom objects."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Spaceship Operator

last modified March 20, 2025

Introduced in PHP 7, the spaceship operator &lt;=&gt; compares two values,
returning -1, 0, or 1 if the left is less than, equal to, or greater than the
right. It simplifies sorting and comparisons, unifying numeric, string, and
mixed-type logic. This tutorial explores its use with examples.

## Numeric Comparison

The spaceship operator provides a single expression for comparing values,
returning an integer that reflects their relative order.

basic_spaceship.php
  

&lt;?php

$a = 5;
$b = 8;

echo $a &lt;=&gt; $b . "\n";
echo $b &lt;=&gt; $a . "\n";
echo $a &lt;=&gt; $a . "\n";

$a &lt;=&gt; $b compares 5 and 8: 5 &lt; 8, so -1. $b &lt;=&gt; $a
yields 1 (8 &gt; 5), and $a &lt;=&gt; $a is 0 (5 = 5). This mirrors
strcmp or strncmp but works across types, offering a
concise alternative to multiple conditionals.

## Sorting Strings by Length

The operator excels in sorting arrays via usort, allowing custom
comparisons like string length, with flexible order control.

sort_by_length.php
  

&lt;?php

$words = ['sky', 'water', 'emotion', 'shredder', 
    'anonymous', 'on', 'a', 'copper', 'the', 'elephant'];

usort($words, fn($e1, $e2) =&gt; strlen($e1) &lt;=&gt; strlen($e2));
print_r($words);

usort($words, fn($e1, $e2) =&gt; strlen($e2) &lt;=&gt; strlen($e1));
print_r($words);

strlen($e1) &lt;=&gt; strlen($e2) sorts $words by length
ascending: "a" (1) to "anonymous" (9). strlen($e2) &lt;=&gt; strlen($e1)
reverses it, descending: "anonymous" to "a". The operator's -1, 0, 1 output
drives usort, streamlining custom sorting logic.

## Sorting Custom Objects

With objects, the spaceship operator can sort by properties when used in
usort, mimicking Comparable-like behavior without an
interface.

sort_users.php
  

&lt;?php

class User {
    public $fname;
    public $lname;
    public $occupation;

    public function __construct($fname, $lname, $occupation) {
        $this-&gt;fname = $fname;
        $this-&gt;lname = $lname;
        $this-&gt;occupation = $occupation;
    }

    public function __toString() {
        return "$this-&gt;fname $this-&gt;lname - $this-&gt;occupation";
    }
}

$users = [
    new User('John', 'Doe', 'gardener'),
    new User('Roger', 'Roe', 'driver'),
    new User('Lucia', 'Smith', 'accountant'),
    new User('Paul', 'Newman', 'firefighter'),
    new User('Adam', 'Clapton', 'teacher'),
    new User('Jane', 'Walter', 'pilot')
];

echo implode("\n", $users) . "\n\n";

usort($users, fn($a, $b) =&gt; $a-&gt;lname &lt;=&gt; $b-&gt;lname);
echo implode("\n", $users) . "\n";

$a-&gt;lname &lt;=&gt; $b-&gt;lname sorts $users by last name.
Before sorting, it's unordered; after, it's "Clapton" to "Walter". The operator
compares strings lexicographically, making object sorting straightforward
without requiring a formal comparison interface.

## Comparing Mixed Types

The spaceship operator handles mixed types consistently, applying PHP's type
comparison rules, which makes it useful for heterogeneous arrays.

mixed_types.php
  

&lt;?php

$values = [5, "10", 3.14, "2"];
usort($values, fn($a, $b) =&gt; $a &lt;=&gt; $b);
print_r($values);

$a &lt;=&gt; $b sorts $values. PHP converts strings to
numbers when possible, so "2" becomes 2, "10" becomes 10, yielding [2, 3.14, 5,
10]. This shows the operator's ability to unify type comparisons seamlessly.

## Filtering with Spaceship

The operator's numeric output can filter arrays using array_filter,
selecting values based on a threshold comparison.

filter_spaceship.php
  

&lt;?php

$numbers = [15, 7, 22, 3, 19, 10];
$threshold = 12;
$above = array_filter($numbers, fn($n) =&gt; ($n &lt;=&gt; $threshold) &gt; 0);

print_r(array_values($above));

$n &lt;=&gt; $threshold &gt; 0 keeps numbers &gt; 12. If $n &lt;=&gt;
$threshold is 1, it's included, resulting in [15, 22, 19].
array_values reindexes the array. This leverages the operator's
output for filtering logic efficiently.

## Custom Multi-Property Sort

Chaining spaceship comparisons in usort allows sorting by multiple
criteria, resolving ties with secondary properties.

multi_sort.php
  

&lt;?php

class Product {
    public $name;
    public $price;

    public function __construct($name, $price) {
        $this-&gt;name = $name;
        $this-&gt;price = $price;
    }

    public function __toString() {
        return "$this-&gt;name (\$$this-&gt;price)";
    }
}

$products = [
    new Product("Laptop", 1200),
    new Product("Mouse", 25),
    new Product("Laptop", 800),
    new Product("Keyboard", 50)
];

usort($products, fn($a, $b) =&gt; 
    $a-&gt;name &lt;=&gt; $b-&gt;name ?: $a-&gt;price &lt;=&gt; $b-&gt;price
);

echo implode("\n", $products) . "\n";

$a-&gt;name &lt;=&gt; $b-&gt;name ?: $a-&gt;price &lt;=&gt; $b-&gt;price sorts by name,
then price if names match. "Laptop" sorts to 800, 1200, followed by "Keyboard"
and "Mouse". PHP's ternary-like ?: chains comparisons, showing the
operator's power in multi-level sorting.

## Spaceship in Conditional Logic

The operator's -1, 0, 1 result can drive switch statements, replacing multiple
relational checks with a single comparison.

conditional_spaceship.php
  

&lt;?php

$x = 7;
$y = 10;

$result = match ($x &lt;=&gt; $y) 
{
    -1 =&gt; "less than",
    0  =&gt; "equal to",
    1  =&gt; "greater than"
};

echo "$x is $result $y\n";

$x &lt;=&gt; $y (7 &lt; 10) returns -1, matched to "less than" via
match (PHP 8+). This avoids separate &lt;,
==, &gt; checks, using the operator's output for concise,
readable logic.

## Comparing Dates

The spaceship operator works with DateTime objects, enabling date
comparisons for sorting or validation tasks.

date_comparison.php
  

&lt;?php

$dates = [
    new DateTime('2025-03-20'),
    new DateTime('2024-12-25'),
    new DateTime('2025-01-15')
];

usort($dates, fn($a, $b) =&gt; $a &lt;=&gt; $b);

foreach ($dates as $date) 
{
    echo $date-&gt;format('Y-m-d') . "\n";
}

$a &lt;=&gt; $b sorts DateTime objects chronologically.
PHP's spaceship operator natively supports this, ordering from 2024-12-25 to
2025-03-20. This simplifies date handling without manual timestamp conversions.

## Sorting Associative Arrays by Value

The operator can sort associative arrays by values using uasort,
preserving key-value pairs for structured data.

assoc_sort.php
  

&lt;?php

$scores = [
    'Alice' =&gt; 85,
    'Bob' =&gt; 92,
    'Charlie' =&gt; 78,
    'Dana' =&gt; 95
];

uasort($scores, fn($a, $b) =&gt; $a &lt;=&gt; $b);
print_r($scores);

$a &lt;=&gt; $b sorts $scores by value, keeping names as
keys. It orders from 78 (Charlie) to 95 (Dana). uasort maintains
associations, and the operator ensures numeric ordering, useful for rankings
or reports.

## Source

[PHP Comparison Operators Documentation](https://www.php.net/manual/en/language.operators.comparison.php)

This tutorial covered the PHP spaceship operator &lt;=&gt;, showing its
use in sorting, filtering, and custom comparisons with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all PHP tutorials](/php/).