+++
title = "PHP Pitfalls and Corner Cases"
date = 2025-08-29T20:04:37.026+01:00
draft = false
description = "This tutorial covers common PHP pitfalls and corner cases that developers should be aware of."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Pitfalls and Corner Cases

last modified April 2, 2025

This tutorial covers common PHP pitfalls and corner cases that can trip up
developers.

## Floating Point Precision

Floating point arithmetic can produce unexpected results due to precision limits.

float_precision.php
  

&lt;?php

$a = 0.1 + 0.2;
$b = 0.3;

echo $a == $b ? 'Equal' : 'Not equal';
echo "\n";
echo "Actual value: " . $a;

The expression 0.1 + 0.2 doesn't exactly equal 0.3 in floating point. Always
compare floats with a small epsilon value or use BC Math functions for precise
calculations.

## String to Number Conversion

PHP converts strings to numbers by taking the numeric prefix.

string_to_number.php
  

&lt;?php

$str = "123abc";
$num = (int)$str;

echo $num; // 123
echo "\n";

$str = "abc123";
$num = (int)$str;

echo $num; // 0

 If no numeric prefix exists, it returns 0. This silent conversion can lead to
 bugs if not handled properly. Always validate input before conversion.

## Array Key Casting

PHP casts array keys in unexpected ways: strings containing integers become
integers, floats are truncated, and booleans become 0 or 1. 

array_key_casting.php
  

&lt;?php

$arr = [
    "1" =&gt; "a",
    1 =&gt; "b",
    1.5 =&gt; "c",
    true =&gt; "d"
];

print_r($arr);

This can cause unintended key collisions. Be explicit with array keys to avoid
surprises.

## Empty String Comparison

In loose comparison (==), PHP considers 0,
"0", "", and false as equal.

strict_vs_loose.php
  

&lt;?php

$var = 0;

if ($var == "") {
    echo "Equal\n";
} else {
    echo "Not equal\n";
}

// Strict comparison example
if ($var === "") {
    echo "Equal (Strict)\n";
} else {
    echo "Not equal (Strict)\n";
}

Using loose comparison can lead to unintended behaviors, such as treating
0, false, and "" as equivalent during
validations. To avoid these bugs, prefer strict comparison (===),
which checks both value and type.

## Reference Pitfalls

PHP handles references differently for scalars and arrays.

references.php
  

&lt;?php

$a = 1;
$b = &amp;$a;
$b = 2;

echo $a; // 2
echo "\n";

$array1 = [1, 2, 3];
$array2 = $array1;
$array2[0] = 5;

print_r($array1); // unchanged

Assigning an array creates a copy (copy-on-write), while assigning a reference
 (&amp;) creates an alias. This inconsistency can cause confusion when working
 with references.

## Ternary Operator Precedence

The ternary operator has unexpected precedence with string concatenation. 

ternary.php
  

&lt;?php

$condition = true;
$result = $condition ? "true" : "false" . " concatenated";

echo $result; // "true concatenated" or "true"?

The expression is evaluated as ($condition ? "true" : "false") . "
concatenated". Always use parentheses to clarify intent in complex ternary
expressions.

## Variable Variables

Variable variables can make code hard to understand and maintain.

variable_variables.php
  

&lt;?php

$foo = "bar";
$$foo = "baz";

echo $bar; // "baz"
echo "\n";

// More complex example
$var = "hello";
$$var = "world";
$$$var = "universe";

echo $hello; // "world"
echo "\n";
echo $world; // "universe"

They can also introduce security issues if user input is used directly. Avoid
them when possible, or at least document their usage clearly.

## Array Merge vs + Operator

array_merge and the + operator work differently with arrays.

array_merge.php
  

&lt;?php

$arr1 = ['a', 'b'];
$arr2 = ['c', 'd', 'e'];

$merged = array_merge($arr1, $arr2);
$added = $arr1 + $arr2;

print_r($merged);
print_r($added);

array_merge appends values, while + preserves keys and doesn't
overwrite existing elements. This difference is subtle but important when
working with numeric and string keys.

## Increment/Decrement Behavior

PHP's increment/decrement operators have special behaviors.

increment.php
  

&lt;?php

$a = 1;
echo $a++; // 1
echo "\n";
echo ++$a; // 3
echo "\n";

$b = "abc";
$b++;
echo $b; // "abd"

Post-increment returns the value before incrementing. Pre-increment returns the
new value. Also, incrementing strings follows Perl rules ("z" becomes "aa").
Know these edge cases to avoid surprises.

## Type Juggling with switch

The switch statement uses loose comparison (==), which can lead to unexpected
matches. 

switch.php
  

&lt;?php

$var = "0";

switch ($var) {
    case 0:
        echo "Zero\n";
        break;
    case "0":
        echo "String Zero\n";
        break;
    default:
        echo "Other\n";
}

In this example, both cases would match a string "0". Use strict
comparison (===) with if-elseif when type matters, or be aware of this behavior.

## Function Scope

PHP functions don't have access to variables from the parent scope by default.

scope.php
  

&lt;?php

$global = "global";

function test() {
    echo $global; // Undefined variable
    echo "\n";
    
    global $global;
    echo $global; // Now works
}

test();

The global keyword or $GLOBALS array must be used.
This differs from many other languages and can cause confusion. Consider passing
variables as parameters instead of using global.

## Empty Constructs

empty considers 0, "0", "", null, false, and empty arrays as empty.

empty.php
  

&lt;?php

$var = "0";

if (empty($var)) {
    echo "Empty\n";
} else {
    echo "Not empty\n";
}

This is useful but can be surprising. isset checks if a variable
exists and is not null. Know the difference between empty,
isset, and is_null.

## Array Assignment by Value

Arrays are assigned by value (copy-on-write), while objects are assigned by
reference. 

array_copy.php
  

&lt;?php

$arr1 = ['a' =&gt; 1, 'b' =&gt; 2];
$arr2 = $arr1;
$arr2['a'] = 3;

print_r($arr1); // unchanged
print_r($arr2); // changed

// But with objects:
class Obj {}
$obj1 = new Obj();
$obj1-&gt;prop = 1;
$obj2 = $obj1;
$obj2-&gt;prop = 2;

echo $obj1-&gt;prop; // 2

This inconsistency can cause bugs if not understood. Use clone for objects when
you need a copy, or be aware of this behavior.

## Error Suppression

The @ operator suppresses errors but makes debugging difficult and
has a performance cost.

error_suppression.php
  

&lt;?php

@$value = 1/0; // Division by zero suppressed
echo "Script continues\n";

// Better approach:
set_error_handler(function($errno, $errstr) {
    echo "Error handled: $errstr\n";
    return true;
});

$value = 1/0; // Triggers custom handler
echo "Script continues\n";

Instead, use proper error handling with try/catch for exceptions or
set_error_handler() for traditional errors. Make errors visible during
development.

## Variable Scope in Loops

Variables in loop closures capture the final value, not the value at iteration
time. 

loop_scope.php
  

&lt;?php

$funcs = [];
for ($i = 0; $i &lt; 3; $i++) {
    $funcs[] = function() use ($i) {
        return $i;
    };
}

foreach ($funcs as $f) {
    echo $f() . "\n";
}

// Fixed version:
$funcs = [];
for ($i = 0; $i &lt; 3; $i++) {
    $x = $i;
    $funcs[] = function() use ($x) {
        return $x;
    };
}

This is a common gotcha when creating closures in loops. The solution is
to copy the loop variable to a temporary variable inside the loop.

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

This tutorial covered common PHP pitfalls and corner cases that developers
should be aware of.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.