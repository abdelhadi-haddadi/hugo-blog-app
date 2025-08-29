+++
title = "Valitron"
date = 2025-08-29T20:04:50.920+01:00
draft = false
description = "PHP Valitron tutorial shows how to validate PHP values with Valitron validation package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Valitron

last modified February 16, 2025

PHP Valitron tutorial shows how to validate PHP values with Valitron validation
package.

## Valitron

*Valitron* is a simple, minimal and elegant stand-alone validation
library with no dependencies. 

## Installation

$ composer require vlucas/valitron
$ composer require tightenco/collect

We install the Valitron package and the Laravel's collection package.

## Simple example

In the first example, we show how to do a very simple validation.

simple.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$validator = new Validator(['name' =&gt; 'John Doe']);
$validator-&gt;rule('required', 'name');

if($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example validates one required value.

use Valitron\Validator;

We include the validator.

$validator = new Validator(['name' =&gt; 'John Doe']);

We create the instance of the Validator and pass it a 
value to be validated.

$validator-&gt;rule('required', 'name');

We specify a required rule with the rule method.

if($validator-&gt;validate()) {

The validation is performed with validate.

$coll = collect($validator-&gt;errors());

$messages = $coll-&gt;flatten();

foreach ($messages as $message) {
    echo $message . "\n";
}

If the validation fails, we get the errors and display them.

$ php simple.php
Validation passed

## Validation rules

Valitron contains a set of predefined rules, such as required, 
email, min, max, or url.

The rules can be combined with the | character.

multiple_rules.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$rules = [
    'required' =&gt; ['name', 'email'],
    'alphaNum' =&gt; 'name',
    'integer' =&gt; 'age',
    'min' =&gt; [['age', 1]],
    'email' =&gt; 'email'
];

$validator = new Validator(['name' =&gt; 'John Doe', 'age' =&gt; 34]);
$validator-&gt;rules($rules);

if ($validator-&gt;validate()) {
    echo "Validation passed";
} else {
    $errors = $validator-&gt;errors();

    foreach ($errors as $arr) {
        foreach ($arr as $error) {
            echo $error . "\n";
        }
    };
}

The example uses several validation rules.

$rules = [
    'required' =&gt; ['name', 'email'],
    'alphaNum' =&gt; 'name',
    'integer' =&gt; 'age',
    'min' =&gt; [['age', 1]],
    'email' =&gt; 'email'
];

We have four validation rules. The name and email
are required.  The name must be alphanumeric value, age 
must be integer and its minimal value is 1. Finally, the email
must be a valid email address.

$ php multiple_rules.php
Email is required
Email is not a valid email address
Name must contain only letters a-z and/or numbers 0-9

The example finished with three validation failures.

## Valitron chaining rules

It is possible to add rules by chaining rule methods.

chaining.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$validator = new Validator(['name' =&gt; 'John Doe', 'email' =&gt; 'johndoe#gmail.com']);
$validator-&gt;rule('required', 'name')-&gt;rule('email', 'email');

if($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example chaines two rules.

$validator-&gt;rule('required', 'name')-&gt;rule('email', 'email');

We add two validation rules by chaining rule methods.

## Validating dates

There are four validation rules for dates: date, dateFormat,
dateBefore and dateAfter.

date_before.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$validator = new Validator(['created_at' =&gt; '2019-03-01']);
$validator-&gt;rule('dateBefore', 'created_at', '2018-10-13');

if ($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example validates two dates using dateBefore rule.

$validator = new Validator(['created_at' =&gt; '2019-03-01']);
$validator-&gt;rule('dateBefore', 'created_at', '2018-10-13');

With the dateBefore rule, we validate that the given date is before some 
other date.

$ php date_before.php
Created At must be date before '2018-10-13'

## Validating IP addresses

IP addresses are validated with the ip rule.

ipaddress.php
  

&lt;?php

require 'vendor/autoload.php';

use Valitron\Validator;

$vals = ['ip1' =&gt; '127.0.0.1', 'ip2' =&gt; 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329',
    'ip3' =&gt; 'FE80::0202:B3FF:FE1E:8329', 'ip4' =&gt; '0.0.1'];

$coll = collect($vals);
$coll-&gt;each(function ($value, $key) {

    $validator = new Validator([$key =&gt; $value]);
    $validator-&gt;rule('ip', $key);

    if ($validator-&gt;validate()) {
        echo "Validation passed for $key with $value" . "\n";
    } else {
        $errs = collect($validator-&gt;errors());

        $messages = $errs-&gt;flatten();
    
        foreach ($messages as $message) {
            echo $message . "\n";
        }
    }
});

The example validates IP v4 IP v6 addresses.

$ php ipaddress.php
Validation passed for ip1 with 127.0.0.1
Validation passed for ip2 with FE80:0000:0000:0000:0202:B3FF:FE1E:8329
Validation passed for ip3 with FE80::0202:B3FF:FE1E:8329
Ip4 is not a valid IP address

## Custom messages

We can provide custom validation messages. The messages are passed with  
message.

custom_message.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$validator = new Validator(['name' =&gt; '']);
$validator-&gt;rule('required', 'name')-&gt;message('{field} is compulsory')-&gt;label("name");
$validator-&gt;rule('lengthMin', 'name', 2)-&gt;message('{field} must have at least 2 characters')
        -&gt;label("name");

if($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example adds custom messages.

$validator-&gt;rule('required', 'name')-&gt;message('{field} is compulsory')-&gt;label("name"); 

Using chained method calls, we add our custom validation message.

$ php custom_message.php
name is compulsory
name must have at least 2 characters

## Validation subsets of values

Subsets of values are validated with the subset rule.

subsets.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$vals = ['colors' =&gt; ['green', 'blue', 'black']];

$validator = new Validator($vals);

$validator-&gt;rule('subset', 'colors', ['red', 'green', 'blue', 'orange', 'yellow']);

if ($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example checks if the $vals variable contains colours from 
the defined subset of colour values.

## Validating GET data

In the following example, we validate GET data.     

get_data.php
  

&lt;?php

require('vendor/autoload.php');

use Valitron\Validator;

$validator = new Validator($_GET);
$validator-&gt;rule('required', ['name', 'email']);
$validator-&gt;rule('email', 'email');

if ($validator-&gt;validate()) {
    echo "Validation passed";
} else {

    $coll = collect($validator-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example validates name and email parameters from a GET request.

$validator = new Validator($_GET);

The global $_GET variable is passed to the Validator.

$ php -S localhost:8000
PHP 7.2.11 Development Server started at Sat Feb 23 17:24:05 2019
Listening on http://localhost:8000
Document root is C:\Users\Jano\Documents\php-progs\valitron
Press Ctrl-C to quit.

We start the built-in web server.

$ curl "localhost:8000/get_data.php?name=John%20Doe&amp;email=john.doe#gmail.com"
Email is not a valid email address

We create a GET request with two parameters with the curl tool.

## Source

[Valitron Github repository](https://github.com/vlucas/valitron)

 

In this article we have used Valitron to validate PHP values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.