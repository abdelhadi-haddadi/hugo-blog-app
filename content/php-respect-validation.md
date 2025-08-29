+++
title = "PHP Respect Validation"
date = 2025-08-29T20:04:42.677+01:00
draft = false
description = "PHP Respect Validation tutorial shows how to validate PHP values with Respect Validation package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Respect Validation

last modified February 16, 2025

PHP Respect Validation tutorial shows how to validate PHP values with Respect
Validation package. 

## Respect Validation

*Respect Validation* is a PHP Standalone Validation Library. 

## Installation

$ composer require respect/validation
$ composer require tightenco/collect

We install the Respect Validation package and the Laravel's collection package.

## Respect Validation simple example

In the first example, we show how to do a very simple validation.

simple.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;

$name = "John Doe";

$r = v::alnum()-&gt;validate($name);

if ($r) {

    echo "Validation passed";
} else {

    echo "Validation failed";
}

The example validates one value.

use Respect\Validation\Validator as v;

We include the validator.

$r = v::alnum()-&gt;validate($name);

The alnum is a validation rule that allows alphanumeric values.
It also allows a space. The validate method validates the rule 
and returns a boolean value indicating failure or success.

if ($r) {

    echo "Validation passed";
} else {

    echo "Validation failed";
}

Based on the returned value, we show the validation message.

$ php simple.php
Validation passed

## Adding a character

We can add a character to a rule. 

add_character.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;

$name = "Vane-Tempest-Stewart";

$r = v::alnum('-')-&gt;validate($name);

if ($r) {

    echo "Validation passed";
} else {

    echo "Validation failed";
}

In the example, we add a dash to the alnum rule. 

$name = "Vane-Tempest-Stewart";

Some names might contain dash characters. 

$r = v::alnum('-')-&gt;validate($name);

We add a dash character to the alnum rule.

## Respect Validation chaining rules

The rules can be chained.     

chaining.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;

$name = "John";

$r = v::alnum()-&gt;length(4, null)-&gt;validate($name);

if ($r) {

    echo "Validation passed";
} else {

    echo "Validation failed";
}

In the example, we have two rules: alnum and length.

$r = v::alnum()-&gt;length(4, null)-&gt;validate($name);

The name must contain only alphanumeric characters and must have at least 
four characters.

## Respect Validation combining rules

The combining of rules is similar to the chaining technique. The Rules\AllOf 
is used to combine multiple rules.   

combine_rules.php
  

&lt;?php
require('vendor/autoload.php');

use Respect\Validation\Validator as v;
use Respect\Validation\Rules;

$name = "John";

$nameValidator = new Rules\AllOf(
    new Rules\Alnum(),
    new Rules\Length(5, 40)
);

$r = $nameValidator-&gt;validate($name);

if ($r) {

    echo "Validation passed";
} else {

    echo "Validation failed";
}

The example combines two validation rules with Rules\AllOf.

## Respect validation assert function

The validate method returns a boolean value. The assert 
method returns a complete validation report.

assert_fun.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

$name = "";

$validator = v::alnum()-&gt;notempty();

try {

    $validator-&gt;assert($name);
} catch(NestedValidationException $ex) {

    $coll = collect($ex-&gt;getMessages());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example uses an assert method on 
a validation rule and shows the error messages.

$validator-&gt;assert($name);

We validate a name value with assert.

$coll = collect($ex-&gt;getMessages());

$messages = $coll-&gt;flatten();

foreach ($messages as $message) {
    echo $message . "\n";
}

With the help of the Laravel's collections, we show the error messages.

$ php assert_fun.php
"" must contain only letters (a-z) and digits (0-9)
"" must not be empty

## Respect Validation between rule

The between rule validates ranges including integers, characters, and 
dates.

between_rule.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;

$age = 34; 

$r = v::intVal()-&gt;between(18, 99)-&gt;validate($age); 

if ($r) {

    echo "Age validation passed\n";
} else {

    echo "Age validation failed\n";
}

$char = 'g'; 

$r = v::stringType()-&gt;between('a', 'c')-&gt;validate($char); 

if ($r) {

    echo "Letter validation passed\n";
} else {

    echo "Letter validation failed\n";
}

$myDate = '2013-01-01';

$r = v::date()-&gt;between('2009-01-01', '2019-01-01')-&gt;validate($myDate);

if ($r) {

    echo "Date validation passed\n";
} else {

    echo "Date validation failed\n";
}

The example uses the between rule.

$r = v::intVal()-&gt;between(18, 99)-&gt;validate($age); 

This rule checks if the $age variable is between 18 and 99.

$r = v::stringType()-&gt;between('a', 'c')-&gt;validate($char); 

This rule checks if the $char variable is between 'a' and 'c' characters.

$r = v::date()-&gt;between('2009-01-01', '2019-01-01')-&gt;validate($myDate);

This rule checks if the $myDate variable is between two specified dates.

## Respect Validation objects

Object attributes are validated with attribute.

user.php
  

&lt;?php

class User {

    private $name;
    private $email;

    public function getName() : string {

        return $this-&gt;name;
    }

    public function setName($name) : void {

        $this-&gt;name = $name;
    }

    public function getEmail() : string {

        return $this-&gt;email;
    }

    public function setEmail($email) : void {

        $this-&gt;email = $email;
    }
}

This is user.php.

validate_object.php
  

&lt;?php

require('vendor/autoload.php');
require_once('user.php');

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

$user = new User();
$user-&gt;setName('Jo');
$user-&gt;setEmail('johndoe#gmail.com');

$userValidator = v::attribute('name', v::alnum()-&gt;length(4, null))
    -&gt;attribute('email', v::email());

try {
    $userValidator-&gt;assert($user);
} catch(NestedValidationException $ex) {

    $coll = collect($ex-&gt;getMessages());

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example validates the attributes of the User class.

$userValidator = v::attribute('name', v::alnum()-&gt;length(4, null))
    -&gt;attribute('email', v::email());

These are rules for the attributes of the user object.

$ php validate_object.php
name must have a length greater than 4
email must be valid email

## Custom message

We can provide custom validation messages.

custom_message.php
  

&lt;?php

require('vendor/autoload.php');

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

$name = "";

$validator = v::alnum()-&gt;notEmpty()-&gt;setName('name');

try {

    $validator-&gt;assert($name);
} catch(NestedValidationException $ex) {

    $errors = $ex-&gt;findMessages([
        'alnum' =&gt; '{{name}} must contain only letters and digits',
        'notEmpty' =&gt; '{{name}} must not be empty'
    ]);

    $coll = collect($errors);

    $messages = $coll-&gt;flatten();

    foreach ($messages as $message) {
        echo $message . "\n";
    }
}

The example adds two custom messages.

$validator = v::alnum()-&gt;notEmpty()-&gt;setName('name');

With the setName method, we set a value for a template placeholder.

$errors = $ex-&gt;findMessages([
    'alnum' =&gt; '{{name}} must contain only letters and digits',
    'notEmpty' =&gt; '{{name}} must not be empty'
]);

Here we provide custom error messages.

$ php custom_message.php
name must contain only letters and digits
name must not be empty

## Source

[The Respect Validation - Github repository](https://github.com/Respect/Validation)

In this article we have used PHP Respect Validation library to validate values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.