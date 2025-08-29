+++
title = "PHP Nullsafe Operators"
date = 2025-08-29T20:04:35.851+01:00
draft = false
description = "PHP Nullsafe Operators tutorial shows how to use nullsafe operators for safe navigation in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Nullsafe Operators

last modified February 15, 2025

In this article, we show how to use nullsafe operators in PHP. 
Nullsafe operators, introduced in PHP 8.0, provide a concise way to handle 
null values in object chains. They allow you to safely navigate through 
potentially null objects without causing errors.

## Main Features of PHP Nullsafe Operators

    Safe Navigation: Nullsafe operators prevent errors when accessing 
    properties or methods on null objects.
    - Concise Syntax: They reduce the need for verbose null checks.

    - Improved Readability: Code becomes cleaner and easier to understand.

    Chaining Support: Nullsafe operators can be used in chained method 
    or property calls.
    Error Prevention: They help avoid runtime errors caused by null 
    references.

Nullsafe operators are represented by the ?-&gt; syntax. They return 
null if the object before the operator is null, 
instead of throwing an error.

## Basic Usage of Nullsafe Operators

The following example demonstrates how to use nullsafe operators in PHP.

main.php
    

&lt;?php

declare(strict_types=1);

class User {
    public ?Address $address = null;
}

class Address {
    public string $city;
}

$user = new User();
echo $user-&gt;address?-&gt;city ?? 'Unknown';

In this program, the User class has a nullable Address 
property. The nullsafe operator ?-&gt; is used to safely access the 
city property. If address is null, 
null is returned, and the ?? operator provides a 
default value.

$ php main.php
Unknown

## Nullsafe Operator with Method Calls

The following example demonstrates how to use nullsafe operators with methods.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public function getBio(): string {
        return "PHP Developer";
    }
}

$user = new User();
echo $user-&gt;profile?-&gt;getBio() ?? 'No bio available';

In this program, the Profile class has a getBio method. 
The nullsafe operator is used to call this method safely. If profile 
is null, the default value is returned.

$ php main.php
No bio available

## Chaining Nullsafe Operators

The following example demonstrates how to chain nullsafe operators.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public ?Address $address = null;
}

class Address {
    public string $city = "New York";
}

$user = new User();
echo $user-&gt;profile?-&gt;address?-&gt;city ?? 'Unknown';

In this program, the nullsafe operator is used to safely navigate through 
multiple levels of potentially null objects. If any object in the chain is 
null, the result is null.

$ php main.php
Unknown

## Nullsafe Operator with Arrays

The following example demonstrates how to use nullsafe operators with arrays.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?array $preferences = null;
}

$user = new User();
echo $user-&gt;preferences?['theme'] ?? 'Default theme';

In this program, the nullsafe operator is used to safely access an array 
element. If preferences is null, the default value 
is returned.

$ php main.php
Default theme

## Nullsafe Operator with Static Methods

The following example demonstrates how to use nullsafe operators with static 
methods.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public static ?string $name = null;
}

echo User::$name?-&gt;toLowerCase() ?? 'Anonymous';

In this program, the nullsafe operator is used to safely call a static method. 
If $name is null, the default value is returned.

$ php main.php
Anonymous

## Nullsafe Operator with Null Coalescing

The following example demonstrates how to combine nullsafe operators with the 
null coalescing operator.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public ?string $bio = null;
}

$user = new User();
echo $user-&gt;profile?-&gt;bio ?? 'No bio available';

In this program, the nullsafe operator is used to safely access the bio 
property. If profile or bio is null, the 
default value is returned.

$ php main.php
No bio available

## Nullsafe Operator with Function Calls

The following example demonstrates how to use nullsafe operators with function 
calls.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public function getBio(): string {
        return "PHP Developer";
    }
}

function displayBio(?User $user): void {
    echo $user?-&gt;profile?-&gt;getBio() ?? 'No bio available';
}

$user = new User();
displayBio($user);

In this program, the nullsafe operator is used within a function to safely 
access the getBio method. If user or profile 
is null, the default value is returned.

$ php main.php
No bio available

## Nullsafe Operator with Nested Objects

The following example demonstrates how to use nullsafe operators with deeply 
nested objects.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public ?Address $address = null;
}

class Address {
    public ?string $city = "New York";
}

$user = new User();
echo $user-&gt;profile?-&gt;address?-&gt;city ?? 'Unknown';

In this program, the nullsafe operator is used to safely navigate through 
multiple levels of potentially null objects. If any object in the chain is 
null, the result is null.

$ php main.php
Unknown

## Nullsafe Operator with Optional Parameters

The following example demonstrates how to use nullsafe operators with optional 
parameters.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public function getBio(?string $default = null): string {
        return $default ?? "PHP Developer";
    }
}

$user = new User();
echo $user-&gt;profile?-&gt;getBio('No bio available') ?? 'Anonymous';

In this program, the nullsafe operator is used to safely call a method with 
optional parameters. If profile is null, the default 
value is returned.

$ php main.php
Anonymous

## Nullsafe Operator with Object Initialization

The following example shows nullsafe operators with an initialized object.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
}

class Profile {
    public string $name = "John Doe";
}

$user = new User();
$user-&gt;profile = new Profile();
echo $user-&gt;profile?-&gt;name ?? 'Unknown';

In this program, the nullsafe operator accesses a property after initializing 
the object. If profile were null, the default applies.

$ php main.php
John Doe

## Nullsafe Operator with Multiple Chains

The following example uses multiple nullsafe chains in one expression.

main.php
  

&lt;?php

declare(strict_types=1);

class User {
    public ?Profile $profile = null;
    public ?Settings $settings = null;
}

class Profile {
    public string $role = "Developer";
}

class Settings {
    public string $mode = "Dark";
}

$user = new User();
echo $user-&gt;profile?-&gt;role . " " . $user-&gt;settings?-&gt;mode ?? 'Unknown';

In this program, two nullsafe chains fetch properties. If either is 
null, the default value is used for the whole expression.

$ php main.php
Unknown

## Source

[PHP Nullsafe Operators - Documentation](https://www.php.net/manual/en/language.oop5.nullsafe.php)

In this article, we have shown how to use nullsafe operators in PHP 
for safe navigation through potentially null objects. Nullsafe operators are a 
powerful tool for writing cleaner and more robust code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).