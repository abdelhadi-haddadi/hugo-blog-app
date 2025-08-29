+++
title = "PHP match"
date = 2025-08-29T20:04:31.014+01:00
draft = false
description = "PHP match expression tutorial shows how to do flow control in PHP with match. A match expression appeared first in PHP 8."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP match

last modified February 16, 2025

PHP match expression tutorial shows how to do flow control in PHP with match.

A *match expression* is a powerful control flow construct, in which we
compare values against multiple alternatives. It is similar to the switch
expression. 

A match expression returns a value. It must be terminated with a semicolon. A
match arm compares values strictly (===). Match arms  do not fall-through to
later cases. The default keyword is used for all other options 
not included in the arms.

In if/else or switch statements, each individual condition is called a branch;
in pattern matching, the term arm is used instead. 

## PHP match integer literals

In the first example, we match against integer literals. 

main.php
  

&lt;?php

$menu = &lt;&lt;&lt;MENU
Select option
1 - start
2 - slow down
3 - accelerate
4 - pause
5 - terminate
MENU;

echo "$menu\n";

$opt = intval(trim(fgets(STDIN)));

$res = match ($opt) {

    1 =&gt; 'start',
    2 =&gt; 'slow down',
    3 =&gt; 'accelerate',
    4 =&gt; 'pause',
    5 =&gt; 'terminate',
    default =&gt; 'unknown'
};

echo "your option: $res\n";

We have a menu of options; each option is represented by an integer.

$opt = intval(trim(fgets(STDIN)));

We read a value from a command line. 

$res = match ($opt) {

    1 =&gt; 'start',
    2 =&gt; 'slow down',
    3 =&gt; 'accelerate',
    4 =&gt; 'pause',
    5 =&gt; 'terminate',
    default =&gt; 'unknown'
};

The match expression matches the selected option against a list of values. Each
arm is separated by comma. For all other options, we have the
default keyword.

echo "your option: $res\n";

We print the chosen option.

## PHP match string literals

In the second example, we match against string literals.

main.php
  

&lt;?php

$langs = ['russian', 'slovak', 'german',
         'swedish', 'hungarian', 'french', 'spanish'];

echo("say hello\n");

foreach ($langs as $lang) {

    $res = match ($lang) {
        'russian' =&gt; 'привет',
        'hungarian' =&gt; 'szia',
        'french' =&gt; 'salut',
        'spanish' =&gt; 'hola',
        'slovak' =&gt; 'ahoj',
        'german' =&gt; 'hallo',
        'swedish' =&gt; 'Hallå'
    };

    echo "$res\n";
}

We have a list of languages. We go through the list and say hello for each
language. 

$ php main.php 
say hello
привет
ahoj
hallo
Hallå
szia
salut
hola

## PHP match multiple options

Multiple options in one arm are separated with a comma.

main.php
  

&lt;?php 

$grades = ['A', 'B', 'C', 'D', 'E', 'F', 'FX'];

foreach ($grades as $grade) {

    $res = match ($grade) {
        'A' , 'B' , 'C' , 'D' , 'E' , 'F' =&gt; 'passed',
        'FX' =&gt; 'failed'
    };

    echo "$res\n";
}

We have a list of grades. For A throug F grades, we pass the example. For the FX
grade, we fail the exam. 

$ php main.php 
passed
passed
passed
passed
passed
passed
failed

## PHP match conditional arms

In the next example, we have conditions in the match arms.

main.php
  

&lt;?php 

$r = rand(-5, 5);

$res = match (true) {
    $r &lt; 0 =&gt; "${r}: negative value",
    $r === 0 =&gt; "${r}: zero",
    $r &gt; 0  =&gt; "${r}: positive value"
};

echo "$res\n";

The example chooses a random integer. With match we determine, if the value
is negative, zero, or positive. 

$r &lt; 0 =&gt; "${r}: negative value",

This arm is executed if the $r is less than zero. 

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have presented the PHP match expression.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.