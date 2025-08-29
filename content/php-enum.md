+++
title = "PHP enum"
date = 2025-08-29T20:04:19.697+01:00
draft = false
description = "PHP enum tutorial shows how to use enumerations in PHP. Learn enums with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP enum

last modified April 16, 2025

The PHP enum keyword introduces enumerations, a special kind of
class. Enums represent a fixed set of possible values, making code more
readable and type-safe. They were added in PHP 8.1.

## Basic Definitions

An enum defines a custom type with a limited set of possible
values. Each possible value is called a "case". Enums can have methods and
implement interfaces like regular classes.

There are two types of enums: pure enums (without values) and backed enums
(with scalar values). Backed enums must declare their value type (int or
string).

Syntax: enum EnumName { case Case1; case Case2; } for pure enums.
For backed enums: enum EnumName: type { case Case1 = value; }.

## Basic Enum Declaration

This example demonstrates a simple pure enum representing HTTP methods.

basic_enum.php
  

&lt;?php

declare(strict_types=1);

enum HttpMethod {
    case GET;
    case POST;
    case PUT;
    case DELETE;
}

$method = HttpMethod::POST;

if ($method === HttpMethod::POST) {
    echo "This is a POST request.";
}

The code defines an enum with four HTTP method cases. We create an enum
variable and compare it with a case. Enums provide type safety over using
strings or integers. Each case is an instance of the enum type.

## Backed Enum

This example shows a backed enum with string values for status codes.

backed_enum.php
  

&lt;?php

declare(strict_types=1);

enum Status: string {
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}

$status = Status::APPROVED;

echo "Status: " . $status-&gt;value;

The enum declares string values for each case. We access the value with the
value property. Backed enums must declare all cases with values.
The values must be unique within the enum.

## Enum Methods

This example demonstrates adding methods to an enum.

enum_methods.php
  

&lt;?php

declare(strict_types=1);

enum Direction {
    case NORTH;
    case SOUTH;
    case EAST;
    case WEST;
    
    public function opposite(): self {
        return match($this) {
            self::NORTH =&gt; self::SOUTH,
            self::SOUTH =&gt; self::NORTH,
            self::EAST =&gt; self::WEST,
            self::WEST =&gt; self::EAST,
        };
    }
}

$dir = Direction::NORTH;
$opposite = $dir-&gt;opposite();

echo "Opposite of NORTH is " . $opposite-&gt;name;

The enum defines an opposite method that returns another enum
case. We use pattern matching with match to determine the
opposite direction. Methods can access the current case via $this.

## Enum Implementing Interface

This example shows an enum implementing an interface.

enum_interface.php
  

&lt;?php

declare(strict_types=1);

interface Colorful {
    public function color(): string;
}

enum Suit: string implements Colorful {
    case HEARTS = 'H';
    case DIAMONDS = 'D';
    case CLUBS = 'C';
    case SPADES = 'S';
    
    public function color(): string {
        return match($this) {
            self::HEARTS, self::DIAMONDS =&gt; 'Red',
            self::CLUBS, self::SPADES =&gt; 'Black',
        };
    }
}

$card = Suit::DIAMONDS;
echo "Card color: " . $card-&gt;color();

The enum implements the Colorful interface with a color
method. Each case must implement the interface methods. This allows enums to
participate in type hierarchies. The method returns different colors based on
the suit.

## Enum in Switch Statement

This example demonstrates using an enum in a switch statement.

enum_switch.php
  

&lt;?php

declare(strict_types=1);

enum UserRole {
    case ADMIN;
    case EDITOR;
    case SUBSCRIBER;
    case GUEST;
}

function getPermissions(UserRole $role): string {
    switch ($role) {
        case UserRole::ADMIN:
            return "All permissions";
        case UserRole::EDITOR:
            return "Edit content";
        case UserRole::SUBSCRIBER:
            return "View premium content";
        default:
            return "Basic viewing";
    }
}

echo getPermissions(UserRole::EDITOR);

The function takes an enum parameter and switches on its value. Each case
handles a different enum value. The default case handles any unspecified
values. Enums work naturally with switch statements for control flow.

## Enum Static Methods

This example shows static methods in an enum for creation and validation.

enum_static.php
  

&lt;?php

declare(strict_types=1);

enum Size: int {
    case SMALL = 1;
    case MEDIUM = 2;
    case LARGE = 3;
    
    public static function fromValue(int $value): self {
        return match($value) {
            1 =&gt; self::SMALL,
            2 =&gt; self::MEDIUM,
            3 =&gt; self::LARGE,
            default =&gt; throw new ValueError("Invalid size value"),
        };
    }
    
    public static function isValid(int $value): bool {
        return $value &gt;= 1 &amp;&amp; $value &lt;= 3;
    }
}

$size = Size::fromValue(2);
echo "Size: " . $size-&gt;name;

echo "Is 4 valid? " . (Size::isValid(4) ? 'Yes' : 'No');

The enum provides static methods for creating instances from values and
validating values. fromValue throws an exception for invalid
values. Static methods are called on the enum class itself, not instances.

## Enum with Attributes

This example demonstrates using PHP attributes with enum cases.

enum_attributes.php
  

&lt;?php

declare(strict_types=1);

#[Attribute]
class Description {
    public function __construct(public string $text) {}
}

enum LogLevel {
    #[Description("Debug-level messages")]
    case DEBUG;
    
    #[Description("Informational messages")]
    case INFO;
    
    #[Description("Warning conditions")]
    case WARNING;
    
    #[Description("Error conditions")]
    case ERROR;
}

$reflection = new ReflectionEnum(LogLevel::class);
$case = $reflection-&gt;getCase('DEBUG');
$attrs = $case-&gt;getAttributes(Description::class);

foreach ($attrs as $attr) {
    echo $attr-&gt;newInstance()-&gt;text;
}

The code defines a custom attribute and applies it to enum cases. We use
reflection to read the attribute values at runtime. Attributes provide
metadata about enum cases. This pattern is useful for documentation or
framework integration.

## Best Practices

- **Naming:** Use singular nouns for enum names (Status not Statuses).

- **Values:** Prefer pure enums unless you need scalar values.

- **Comparisons:** Always use strict comparisons (===) with enums.

- **Methods:** Keep enum methods focused on the enum's domain.

- **Cases:** Document each case's purpose when not obvious.

## Source

[PHP Enumerations Documentation](https://www.php.net/manual/en/language.enumerations.php)

This tutorial covered PHP enumerations with practical examples showing enum
declaration, methods, interfaces, and advanced features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).