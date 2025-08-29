+++
title = "PHP function"
date = 2025-08-29T20:04:25.441+01:00
draft = false
description = "PHP function tutorial shows how to work with functions in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP function

last modified February 16, 2025

In this article we cover PHP functions.

A function is a block of reusable code that is used to perform a specific
action. The function performs a specific task. The advantages of using functions
are:

    - Reducing duplication of code

    - Decomposing complex problems into simpler pieces

    - Improving clarity of the code

    - Reuse of code

    - Information hiding

There are two basic types of functions. Built-in functions and user defined
ones. The built-in functions are part of the PHP language. Examples are:
phpinfo, round or abs. The user defined
functions are created by application programmers to cover their needs. They are
created with the function keyword. 

## PHP defining functions

A function is created with the function keyword. 

simple.php
  

&lt;?php

function displayVersion() {

    echo "This is PHP " . phpversion();
    echo "\n";
}

displayVersion();

The function keyword is followed by the function name with round brackets. The
body of the function lies between the curly brackets. We say that we 
*call* a function. If we call a function, the statements inside the 
function body are executed.   

displayVersion();

This line of the code calls the function.

$ php simple.php 
This is PHP 8.1.2

## PHP return keyword

The return keyword is used to return a value from the function.
A function may or may not return a value. 

returning.php
  

&lt;?php

function maximum($x, $y) {
    
    if ($x &gt; $y) { 
        
        return $x;
    } else {
        
        return $y;
    }
}

$a = 23;
$b = 32;

$val = maximum($a, $b);
echo "The max of $a and $b is $val \n";

We have a maximum function. It returns a max for two numbers. 
We could not name it max, because there is already a built-in max 
function. This example was created for learning purposes; we would always prefer
the built-in functions in our real-world programs.

if ($x &gt; $y) { 
    
    return $x;
} else {
    
    return $y;
}

If the $x variable is greater than $y, we return 
$x. Otherwise we return $y.

$val = maximum($a, $b);

The value returned by the maximum function is assigned to the 
$val variable.

echo "The max of $a and $b is $val \n";

We print the max value of the two numbers to the console.

## PHP function arguments

Most functions accept arguments. Arguments are values that are sent to 
the function. The functions process the values and possibly return some
outcome.

fahrenheit.php
  

&lt;?php

function FTC($c) {
    
    return $c * 9/5 + 32;
}

echo FTC(100);
echo "\n";
echo FTC(0);
echo "\n";
echo FTC(30);
echo "\n";

In our example, we convert Fahrenheit temperature to Celsius. 
The FTC function accepts one argument $c, 
which is the Celsius temperature.

$ php fahrenheit.php 
212
32
86

## PHP implicit values

The arguments in PHP functions may have implicit values. An implicit value is used 
if no value is provided. 

implicit_value.php
  

&lt;?php

function power($a, $b=2) {

    if ($b == 2) {
    
        return $a * $a;
    }

    $value = 1;

    for ($i = 0; $i &lt; $b; $i++) {
    
        $value *= $a;
    }
    
    return $value;
}

$v1 = power(5);
$v2 = power(5, 4);

echo "5^2 is $v1 \n";
echo "5^4 is $v2 \n";

Here we created a power function. The function has one argument with an implicit value. 
We can call the function with one or two arguments. 

$ php implicit_value.php 
5^2 is 25 
5^4 is 625 

## PHP variable number of arguments

A function may accept variable number of arguments. In other words, sometimes we
do not know how many arguments will be passed to the function. The
func_get_args function returns an array comprising a function's
argument list.

The ... operator available to create variadic functions.

variable_arguments1.php
  

&lt;?php

function sum(...$nums) {
    
    $sum = 0;
    
    foreach ($nums as $n) {
        $sum += $n;
    }
    
    return $sum;
}

echo sum(1, 2, 3) . "\n";
echo sum(1, 2, 3, 4) . "\n";
echo sum(1, 2, 3, 4, 5) . "\n";

We create a sum method which can take variable number of 
arguments. The method calculates the sum of values passed to the method.

$sum = 0;
foreach ($args as $n) {
    $sum += $n;
}

return $sum;

We calculate and return the sum of the values.

echo sum(1, 2, 3) . "\n";
echo sum(1, 2, 3, 4) . "\n";
echo sum(1, 2, 3, 4, 5) . "\n";

We pass three, four, and five values to the sum function.

$ php variable_arguments1.php 
6
10
15

variable_arguments2.php
  

```
&lt;?php

function sum() {
    
    $args = func_get_args();
    
    $sum = 0;
    foreach ($args as $n) {
        $sum += $n;
    }
    
    return $sum;
}

echo sum(1, 2, 3) . "\n";
echo sum(1, 2, 3, 4) . "\n";
echo sum(1, 2, 3, 4, 5) . "\n";

```

Now the same example is created with the func_get_args
function.

## PHP function named parameters

When we use named parameters, then the order of the parameters is not relevant.

named_parameters.php
  

&lt;?php 

function info($name, $occupation) {

    return "$name is a $occupation";
}

echo info(name: 'John Doe', occupation: 'gardener') . "\n";
echo info(occupation: 'gardener', name: 'John Doe') . "\n";

In the example, we call the info twice, passing the parameters in 
different orders. The output is correct since we use named parameters. 

$ php simple.php 
John Doe is a gardener
John Doe is a gardener

## PHP static variables

A *static variable* is a variable that has been allocated statically, 
whose lifetime extends across the entire run of the program. The default local 
variables do not retain their value within consecutive calls 
of the function. 

non_static.php
  

&lt;?php

function nonstatic() {

    $value = 0;
    $value += 1;

    return $value;
}

nonstatic();
nonstatic();
nonstatic();
nonstatic();

echo nonstatic(), "\n";

In the above example, we have a normal, non-static variable. We increment the
variable each time the function is called. We call the function 5 times.
However, non-static variables are initiated for each call of the function. After
5 function calls the $value equals to 1. 

The static variables are initiated only once, when the function is first called. 
They retain their value afterwards. 

static.php
  

&lt;?php

function staticfun() {

    static $value = 0;
    $value += 1;

    return $value;
}

staticfun();
staticfun();
staticfun();
staticfun();

echo staticfun(), "\n";

After 5 consecutive calls, the $value is equal to 5. 

$ php nonstatic.php 
1
$ php static.php 
5

## PHP anonymous functions

Anonymous functions do not have a name. 

anonymous.php
  

&lt;?php

$var = function() {
    
    echo "This is anonymous function\n";
};

$var();

We assign a function body to a variable. It is possible to call
the function only via this variable.

$var = function() {
    
    echo "This is anonymous function\n";
};

Notice the semicolon after the closing curly bracket. It is required because
the construct is an assignment.

$ php anonymous.php 
This is anonymous function

Anonymous functions are often used with array functions.

filter_vals.php
  

&lt;?php 

$vals = [2, -1, 0, -4, -2, 5, 4];

$res = array_filter($vals, function($e) {
    return $e &gt; 0;
});

echo implode(',', $res) . "\n";

In the example, we filter values of an array with array_filter. 
The predicate function is defined with an anonymous function.

$ php filter_vals.php 
2,5,4

## PHP arrow function

Arrow functions provide a more concise syntax for anonymous functions. An 
arrow function is created with the fn keyword and the fat 
arrow operator (=&gt;).

arrow.php
  

$f1 = fn($x) =&gt; $x * $x;
$f2 = fn($x) =&gt; $x * $x * $x;

echo $f1(2) . "\n";
echo $f2(3) . "\n";

In the example, we define two arrow functions.

$ PHP arrow.php
4
27

filter_vals2.php
  

```
&lt;?php 

$vals = [2, -1, 0, -4, -2, 5, 4];

$res = array_filter($vals, fn ($e) =&gt; $e &gt; 0);

echo implode(',', $res) . "\n";

```

With the arrow function, the code is more compact.

## Passing arguments by value and by reference

PHP supports two ways of passing arguments to functions. The default
way is passing arguments by value. When we pass arguments by value, 
the function works only with the copies of the values. This may lead to 
performance overheads when we work with large amounts of data. 

When we pass values by reference, the function receives a reference to the 
actual value. The original values are affected when modified. This way of passing 
values is more time and space efficient. On the other hand, it is more error prone. 

Which way of passing arguments should we use? It depends on the situation. 
Say we have a set of data, salaries of employees. If we want to compute 
some statistics of the data, we do not need to modify them. We pass by values.
If we work with large amounts of data and the speed of computation 
is critical, we pass by reference. If we want to modify
the data, e.g. do some reductions or raises to the salaries, 
we might pass by reference. 

The following two examples cover both concepts. 

swap1.php
  

&lt;?php

function swap($a, $b) {

    $temp = $a;
    $a = $b;
    $b = $temp;
    echo "inside swap function:\n";
    echo "\$a is $a \n";
    echo "\$b is $b \n";
}

$a = 4;
$b = 7;

echo "outside swap function:\n";
echo "\$a is $a \n";
echo "\$b is $b \n";

swap($a, $b);

echo "outside swap function:\n";
echo "\$a is $a \n";
echo "\$b is $b \n";

The swap function swaps the numbers between the $a and $b 
variables. The original variables are not affected. 

$a = 4;
$b = 7;

At the beginning, these two variables are initiated. 

swap($a, $b);

We call the swap function. The function takes $a 
and $b variables as parameters.  

$temp = $a;
$a = $b;
$b = $temp;

Inside the swap function, we change the values. Note that 
the $a and $b variables are defined locally. They are 
valid only inside the swap function. 

$ php swap1.php 
outside swap function:
$a is 4 
$b is 7 
inside swap function:
$a is 7 
$b is 4 
outside swap function:
$a is 4 
$b is 7 

The output shows that the original variables were not affected. 

The next code example passes values to the function by reference. 
The original variables are changed inside the swap function. 

swap2.php
  

&lt;?php

function swap(&amp;$a, &amp;$b) {

    $temp = $a;
    $a = $b;
    $b = $temp;
    echo "Inside the swap function:\n";
    echo "\$a is $a \n";
    echo "\$b is $b \n";
}

$a = 4;
$b = 7;

echo "Outside the swap function:\n";
echo "\$a is $a \n";
echo "\$b is $b \n";

swap($a, $b);

echo "Outside the swap function:\n";
echo "\$a is $a \n";
echo "\$b is $b \n";

We use the &amp; character to pass values by reference. 

function swap(&amp;$a, &amp;$b) {
...  
}

The example is almost identical to the previous one. Except for the
ampersand characters. 

$ php swap2.php 
Outside the swap function:
$a is 4 
$b is 7 
Inside the swap function:
$a is 7 
$b is 4 
Outside the swap function:
$a is 7 
$b is 4 

Here we see that the swap function really changed the values 
of the variables. 

## PHP function recursion

Recursion, in mathematics and computer science, is a method of defining functions 
in which the function being defined is applied within its own definition. 
In other words, a recursive function calls itself to do its job. Recursion is
an alternative to iteration. Recursion is the main approach in functional 
languages.

A typical example is the calculation of the factorial.

recursion.php
  

&lt;?php

function factorial($n) {

    if ($n==0) {
    
        return 1;
    } else {
    
        return $n * factorial($n - 1);
    }
}

echo factorial(4), "\n";
echo factorial(10), "\n";

In this code example, we calculate the factorial of two
numbers. 

return $n * factorial($n - 1);

Inside the body of the factorial function, we call the factorial function
with a modified argument. The function calls itself.

$ php recursion.php 
24
3628800

These are the results.

## PHP global and local variables

Next we talk about the scope of the variables in PHP. A *scope* is the 
range in which a variable can be referenced. When we work with functions, there are 
two basic scopes: the global and the local scope. The local scope is also called 
a function scope. 

scope1.php
  

&lt;?php

$value = 1;

function simple() {
    
    var_dump($value);
}

simple();

A variable defined outside a function body cannot be referenced within
a function.

$ php scope1.php 
PHP Notice:  Undefined variable: value in /home/janbodnar/prog/php/functions/scope1.php on line 7
NULL

The $value variable is NULL in the simple function.

scope2.php
  

&lt;?php

$value = 4;

function simple() {
    $value = 3;
    echo $value, "\n";
}

simple();

echo $value, "\n";

In this example, we have two variables with the same name. 
They do not collide because they exist in different scopes. 

$ php scope2.php 
3
4

The value is 3 inside the function and 4 outside the function.

In the next example, we modify a value inside the
function.

scope3.php
  

&lt;?php

$value = 1;

function simple() {

    global $value;
    $value = 2;
}

echo $value, "\n";
simple();
echo $value, "\n";

We use the global keyword to reference a variable defined outside
the body of the function. 

$ php scope3.php 
1
2

The $value was successfully modified inside the simple
function.

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have covered PHP functions. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.