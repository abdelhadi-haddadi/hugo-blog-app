+++
title = "PHP flow control"
date = 2025-08-29T20:04:23.218+01:00
draft = false
description = "PHP flow control tutorial shows how to control the flow of the program in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP flow control

last modified February 16, 2025

In this article we show ho to control the flow of the program in PHP.

## PHP if statement

The if keyword is used to check if an expression is true. If it is
true, a statement is then executed. The statement can be a single statement or a
compound statement. A compound statement consists of multiple statements
enclosed by curly brackets.

ifstatement.php
  

&lt;?php

$num = 31;

if ($num &gt; 0) {

    echo "\$num variable is positive\n";
}

We have a $num variable. It is assigned value 31. The
if keyword checks for a boolean expression. The expression is put
between square brackets. The expression 31 &gt; 0 is true, so the next
statement is executed. Curly brackets are optional if there is only one
statement to execute.

$ php ifstatement.php
$num variable is positive

If we intend to execute more than one statement, we have to put them inside
square brackets. If we did not use them, only the first statement would be
executed. Curly brackets form the *body* of the if
statement.

ifstatement2.php
  

&lt;?php

$num = 31;

if ($num &gt; 0) {

    echo "\$num variable is positive\n";
    echo "\$num variable equals to $num\n";
}

We can use the else keyword to create a simple branch. If the
expression inside the square brackets following the if keyword evaluates to
false, the statement inside the else body is automatically executed.

boyorgirl.php
  

&lt;?php

$sex = "female";

if ($sex == "male") {

   echo "It is a boy\n";
} else {

   echo "It is a girl\n";
}

We have a $sex variable. It has "female" string. The boolean
expression evaluates to false and we get "It is a girl" in the console.

$ php boyorgirl.php
It is a girl

We can create multiple branches using the elseif keyword. The
elseif keyword tests for another condition if and only if the
previous condition was not met. Note that we can use multiple
elseif
keywords in our tests.

ifelsestm.php
  

&lt;?php

echo "Enter a number: ";

$a = intval(fgets(STDIN));

if ($a &lt; 0) {

    printf("%d is a negative number\n", $a);
} elseif ($a == 0) {

    printf("%d is a zero\n", $a);
} elseif ($a &gt; 0) {

    printf("%d is a positive number\n", $a);
}

We read a value from the user using the fgets function. The value
is tested if it is a negative number or positive or if it equals to zero.

$ php ifelsestm.php
Enter a number: 4
4 is a positive number
$ php ifelsestm.php
Enter a number: -3
-3 is a negative number

## PHP switch statement

The switch statement is a selection control flow statement. It
allows the value of a variable or expression to control the flow of program
execution via a multiway branch. It creates multiple branches in a simpler way
than using the if, elseif statements.

The switch statement works with two other keywords:
case and break. The case keyword is used
to test a label against a value from the round brackets. If the label equals to
the value, the statement following the case is executed. The break
keyword is used to jump out of the switch statement. There is an
optional default statement. If none of the labels equals the value,
the default statement is executed.

domains.php
  

&lt;?php

$domain = 'sk';

switch ($domain) {

    case 'us':
        echo "United States\n";
    break;
    case 'de':
        echo "Germany\n";
    break;
    case 'sk':
        echo "Slovakia\n";
    break;
    case 'hu':
        echo "Hungary\n";
    break;
    default:
        echo "Unknown\n";
    break;
}

In our script, we have a *$domains* variable. It has the 'sk' string. We
use the switch statement to test for the value of the variable.
There are several options. If the value equals to 'us' the 'United States'
string is printed to the console.

$ php domains.php
Slovakia

We get 'Slovakia'. If we changed the *$domains* variable to 'rr', we would
get 'Unknown' string.

## PHP match expression

The match expression is a more powerful selection statement. Its
compares values with strict identity check (===) rather than the weaker
equality check (==).

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

## PHP while loop

The while is a control flow statement that allows code to be
executed repeatedly based on a given boolean condition.

The while loop executes the statement when the expression is
evaluated to true. The statement is a simple statement terminated by a semicolon
or a compound statement enclosed in curly brackets.

whilestm.php
  

&lt;?php

$i = 0;

while ($i &lt; 5) {

    echo "PHP language\n";
    $i++;
}

In the code example, we repeatedly print "PHP language" string to the console.

The while loop has three parts: initialization, testing, and
updating. Each execution of the statement is called a cycle.

$i = 0;

We initiate the $i variable. It is used as a counter in our script.

while ($i &lt; 5) {
   ...
}

The expression inside the square brackets is the second phase, the testing. The
while loop executes the statements in the body until the expression is evaluated
to false.

$i++;

The last, third phase of the while loop is the updating; a counter
is incremented. Note that improper handling of the while loop may
lead to endless cycles.

$ php whilestm.php
PHP language
PHP language
PHP language
PHP language
PHP language

The program prints a message five times to the console.

The do while loop is a version of the while loop. The
difference is that this version is guaranteed to run at least once.

dowhile.php
  

&lt;?php

$count = 0;

do {
    echo "$count\n";
} while ($count != 0)

First the iteration is executed and then the truth expression is evaluated.

The while loop is often used with the
list and each functions.

seasons.php
  

&lt;?php

$seasons = ["Spring", "Summer", "Autumn", "Winter"];

while (list($idx , $val) = each($seasons)) {
    echo "$val\n";
}

We have four seasons in a $seasons array. We go through all the
values and print them to the console. The each function returns the
current key and value pair from an array and advances the array cursor. When the
function reaches the end of the array, it returns false and the loop is
terminated. 

The each function returns an array. There must be an array on the
left side of the assignment too. We use the list function to create
an array from two variables.

$ php seasons.php
Spring
Summer
Autumn
Winter

## PHP for keyword

The for loop does the same thing as the while loop.
Only it puts all three phases, initialization, testing and updating into one
place, between the round brackets. It is mainly used when the number of
iteration is know before entering the loop.

Let's have an example with the for loop.

forloop.php
  

&lt;?php

$days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday", "Sunday" ];

$len = count($days);

for ($i = 0; $i &lt; $len; $i++) {

    echo $days[$i], "\n";
}

We have an array of days of a week. We want to print all these days from
this array.

$len = count($days);

Or we can programmatically figure out the number of items in an array.

for ($i = 0; $i &lt; $len; $i++) {
   echo $days[$i], "\n";
}

Here we have the for loop construct. The three phases are divided
by semicolons. First, the $i counter is initiated. The initiation
part takes place only once. Next, the test is conducted. If the result of the
test is true, the statement is executed. Finally, the counter is incremented.
This is one cycle. The for loop iterates until the test expression
is false.

$ php forloop.php
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

## PHP foreach statement

The foreach construct simplifies traversing over collections of
data. It has no explicit counter. The foreach statement goes
through the array one by one and the current value is copied to a variable
defined in the construct. In PHP, we can use it to traverse over an array.

foreachstm.php
  

&lt;?php

$planets = [ "Mercury", "Venus", "Earth", "Mars", "Jupiter",
                 "Saturn", "Uranus", "Neptune" ];

foreach ($planets as $item) {
    echo "$item ";
}

echo "\n";

In this example, we use the foreach statement to go through an
array of planets.

foreach ($planets as $item) {
    echo "$item ";
}

The usage of the foreach statement is straightforward. The
$planets is the array that we iterate through. The
$item
is the temporary variable that has the current value from the array. The
foreach statement goes through all the planets and prints them to
the console.

$ php foreachstm.php
Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune

Running the above PHP script gives this output.

There is another syntax of the foreach statement. It is used with
maps.

foreachstm2.php
  

&lt;?php

$benelux =  [ 'be' =&gt; 'Belgium',
              'lu' =&gt; 'Luxembourgh',
              'nl' =&gt; 'Netherlands' ];

foreach ($benelux as $key =&gt; $value) {

    echo "$key is $value\n";
}

In our script, we have a $benelux map. It contains domain names
mapped to the benelux states. We traverse the array and print both keys and
their values to the console.

$ php foreachstm2.php
be is Belgium
lu is Luxembourgh
nl is Netherlands

## PHP break, continue statements

The break statement is used to terminate the loop. The
continue statement is used to skip a part of the loop and continue
with the next iteration of the loop.

testbreak.php
  

&lt;?php

while (true) {

    $val = rand(1, 30);
    echo $val, " ";

    if ($val == 22) break;
}

echo "\n";

We define an endless while loop. There is only one way to jump out
of a such loop—using the break statement. We choose a random value
from 1 to 30 and print it. If the value equals to 22, we finish the endless
while loop.

$ php testbreak.php
6 11 13 5 5 21 9 1 21 22

We might get something like this.

In the following example, we print a list of numbers that cannot be divided by
2 without a remainder.

testcontinue.php
  

&lt;?php

$num = 0;

while ($num &lt; 1000) {

    $num++;
    if (($num % 2) == 0) continue;

    echo "$num ";

}

echo "\n";

We iterate through numbers 1..999 with the while loop.

if (($num % 2) == 0) continue;

If the expression $num % 2 returns 0, the number in question can be
divided by 2. The continue statement is executed and the rest of
the cycle is skipped. In our case, the last statement of the loop is skipped and
the number is not printed to the console. The next iteration is started.

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we covered PHP's flow control.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.