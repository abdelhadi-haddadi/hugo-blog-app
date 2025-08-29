+++
title = "PHP Rakit Validation"
date = 2025-08-29T20:04:40.387+01:00
draft = false
description = "PHP Rakit Validation tutorial shows how to validate PHP values with Rakit Validation package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Rakit Validation

last modified February 16, 2025

PHP Rakit Validation tutorial shows how to validate PHP values with Rakit
Validation package.

## Rakit Validation

*Rakit Validation* is a PHP Standalone Validation Library. It was
inspired by Laravel's Illuminate\Validation.

## Installation

$ composer require rakit/validation
$ composer require tightenco/collect

We install the Rakit Validation package and the Laravel's collection package.

## Simple example

In the first example, we show how to do a very simple validation.

simple.php
  

&lt;?php

require('vendor/autoload.php');

use Rakit\Validation\Validator;

$validator = new Validator;

$vals = ['name' =&gt; ''];
$rules = ['name' =&gt; 'required'];

$validation = $validator-&gt;make($vals, $rules);

$validation-&gt;validate();

if ($validation-&gt;fails()) {

    $coll = collect($validation-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
} else {

    echo "Validation passed";
}

The example validates one required value.

use Rakit\Validation\Validator;

We include the validator.

$validator = new Validator;

We create the instance of the Validator.

$vals = ['name' =&gt; ''];
$rules = ['name' =&gt; 'required'];

The $vals contains the values to be validated. The
$rules contains the validation rules. In our case, the 
name value is required.

$validation = $validator-&gt;make($vals, $rules);

With the make method we prepare the validation; we pass the values
and the rules.

$validation-&gt;validate();

We perform the validation with validate.

if ($validation-&gt;fails()) {

With fails we check if the validation failed.

$coll = collect($validation-&gt;errors());

$messages = $coll-&gt;flatten();

foreach ($messages as $message) {
    echo $message . "\n";
}

We use the Laravel's collections to parse the errors.

$ php simple.php
The Name is required

## Validation rules

Rakit Validation contains a set of predefined rules, such as required,
email, min, max, or url.

The rules can be combined with the | character.

rules.php
  

&lt;?php

require 'vendor/autoload.php';

use Rakit\Validation\Validator;

$validator = new Validator;

$vals = ['name' =&gt; 'John Doe', 'email' =&gt; 'johndoe#gmail.com',
    'password' =&gt; '12345', 'confirm_password' =&gt; '23456'];

$rules = ['name' =&gt; 'required',
    'email' =&gt; 'required|email',
    'password' =&gt; 'required|min:6',
    'confirm_password' =&gt; 'required|same:password'];

$validation = $validator-&gt;make($vals, $rules);

$validation-&gt;validate();

if ($validation-&gt;fails()) {

    $coll = collect($validation-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
} else {

    echo "Validation passed";
}

The example uses several validation rules.

$rules = ['name' =&gt; 'required',
    'email' =&gt; 'required|email',
    'password' =&gt; 'required|min:6',
    'confirm_password' =&gt; 'required|same:password'];

We have four validation rules. The email is required must be a
valid email address. The password is required and must have at
least six characters. The confirm_password must be the same as the
password.

$ php rules.php
The Email is not valid email
The Password minimum is 6
The Confirm password must be same with password

The example finished with three validation failures.

## Validating dates

The next example shows how to validate dates.

dates.php
  

&lt;?php

require('vendor/autoload.php');

use Rakit\Validation\Validator;

$validator = new Validator;

$vals = ['born' =&gt; '2000-03-30', 'meetingDate' =&gt; '2010-12-31'];
$rules = ['born' =&gt; 'before:2018-12-31', 'meetingDate' =&gt; 'after:2019-02-02'];

$validation = $validator-&gt;make($vals, $rules);

$validation-&gt;validate();

if ($validation-&gt;fails()) {

    $coll = collect($validation-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {

        echo $message . "\n";
    }
} else {

    echo "Validation passed";
}

The example validates two dates.

$vals = ['born' =&gt; '2000-03-30', 'meetingDate' =&gt; '2010-12-31'];
$rules = ['born' =&gt; 'before:2018-12-31', 'meetingDate' =&gt; 'after:2019-02-02'];

With the before rule, we validate that the given date is before some
date and with the after rule, we validate that the given date is after
some date.

$ php dates.php
The MeetingDate must be a date after 2019-02-02.

## Custom messages

We can provide custom validation messages. The messages are passed as the third
parameter to the make method.

custom_message.php
  

&lt;?php

require('vendor/autoload.php');

use Rakit\Validation\Validator;

$validator = new Validator;

$vals = ['name' =&gt; ''];
$rules = ['name' =&gt; 'required'];
$msgs = ['name' =&gt; 'The name is compulsory'];

$validation = $validator-&gt;make($vals, $rules, $msgs);

$validation-&gt;validate();

if ($validation-&gt;fails()) {

    $coll = collect($validation-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {

        echo $message . "\n";
    }
} else {

    echo "Validation passed";
}

The example adds a custom message.

$msgs = ['name' =&gt; 'The name is compulsory'];

This is our custom message.

$validation = $validator-&gt;make($vals, $rules, $msgs);

The messages are passed to the make method.

$ php custom_message.php
The name is compulsory

## Validating GET data

In the following example, we validate GET data.

get_data.php
  

&lt;?php

require('vendor/autoload.php');

use Rakit\Validation\Validator;

$validator = new Validator;

$rules = ['name' =&gt; 'required', 'email' =&gt; 'required|email'];
$validation = $validator-&gt;make($_GET, $rules);

$validation-&gt;validate();

if ($validation-&gt;fails()) {

    $coll = collect($validation-&gt;errors());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        
        echo $message . "\n";
    }
} else {

    echo "Validation passed";
}

The example validates name and email parameters from a GET request.

$rules = ['name' =&gt; 'required', 'email' =&gt; 'required|email'];
$validation = $validator-&gt;make($_GET, $rules);

The make method takes the global $_GET variable
as the first parameter.

$ php -S localhost:8000
[Wed Jul 13 15:08:56 2022] PHP 8.1.2 Development Server (http://localhost:8000) started

We start the built-in web server.

$ curl "localhost:8000/get_data.php?name=John%20Doe&amp;email=john.doe#gmail.com"
The Email is not valid email

We create a GET request with two parameters with the curl tool.

## Source

[Rakit Validation Github reference](https://github.com/rakit/validation)

In this article we have used Rakit Validation to validate PHP values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.