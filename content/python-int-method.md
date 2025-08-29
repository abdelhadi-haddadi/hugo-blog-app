+++
title = "Python __int__ Method"
date = 2025-08-29T20:08:15.007+01:00
draft = false
description = "Complete guide to Python's __int__ method covering type conversion, numeric operations, and custom implementations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __int__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __int__ method, the
special method responsible for integer conversion. We'll cover basic usage,
custom implementations, numeric operations, and practical examples.

## Basic Definitions

The __int__ method is a special method that defines how an object
should be converted to an integer. It is called by the built-in int()
function when converting an object to an integer.

Key characteristics: it takes no arguments (except self), must return an integer,
and enables objects to participate in integer contexts. It's part of Python's
numeric protocol alongside __float__ and __index__.

## Basic __int__ Implementation

Here's a simple class implementing __int__ to demonstrate how
objects can define their own integer conversion behavior.

basic_int.py
  

class Distance:
    def __init__(self, meters):
        self.meters = meters
    
    def __int__(self):
        return int(self.meters)

d = Distance(3.7)
print(int(d))  # Output: 3

This example shows a Distance class that converts to integer by truncating its
meter value. The int() function calls __int__ when
applied to a Distance instance.

The implementation simply delegates to Python's built-in int()
conversion of the meters attribute. This is a common pattern for wrapper classes.

## Custom Numeric Conversion

__int__ can implement custom conversion logic when simple attribute
conversion isn't sufficient. Here we convert a temperature object.

temperature.py
  

class Celsius:
    def __init__(self, temperature):
        self.temperature = temperature
    
    def __int__(self):
        return round(self.temperature)

temp = Celsius(36.6)
print(int(temp))  # Output: 37

This Celsius class rounds the temperature when converting to integer. The
__int__ method provides control over how the conversion happens.

Rounding is often more appropriate than truncation for measurements where
precision matters. The method can implement any conversion logic needed.

## Currency Conversion Example

For financial applications, __int__ can convert currency objects
to their integer value in smallest units (like cents).

currency.py
  

class Dollar:
    def __init__(self, amount):
        self.amount = amount
    
    def __int__(self):
        return int(self.amount * 100)

price = Dollar(4.99)
cents = int(price)
print(cents)  # Output: 499

This Dollar class converts dollar amounts to cents when cast to integer. The
__int__ method multiplies by 100 before conversion.

Financial applications often need this type of conversion for precise arithmetic
operations that avoid floating-point rounding errors.

## Fraction to Integer Conversion

The __int__ method can implement mathematical operations during
conversion, like converting fractions to whole numbers.

fraction.py
  

class Fraction:
    def __init__(self, numerator, denominator):
        self.numerator = numerator
        self.denominator = denominator
    
    def __int__(self):
        return self.numerator // self.denominator

half = Fraction(1, 2)
print(int(half))  # Output: 0
three_halves = Fraction(3, 2)
print(int(three_halves))  # Output: 1

This Fraction class implements integer division when converting to integer. The
// operator performs floor division to get the whole number part.

This matches Python's behavior for built-in numeric types where int()
truncates towards zero. The method could implement other rounding if needed.

## Custom Object with Multiple Attributes

For complex objects, __int__ can combine multiple attributes into
a single integer value based on domain-specific logic.

complex_object.py
  

class RGBColor:
    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue
    
    def __int__(self):
        return (self.red &lt;&lt; 16) | (self.green &lt;&lt; 8) | self.blue

color = RGBColor(255, 128, 0)
print(int(color))  # Output: 16744448 (0xFF8000)

This RGBColor class combines three 8-bit color channels into a single 24-bit
integer value. Bit shifting combines the components into the standard RGB format.

The __int__ method enables the color to be used in contexts
expecting a numeric color value, like some graphics libraries or databases.

## Best Practices

- **Return proper integers:** Always return an actual int, not another type

- **Implement related methods:** Consider also implementing __float__ if applicable

- **Handle edge cases:** Decide how to handle None or invalid states

- **Document behavior:** Clearly document the conversion logic

- **Maintain consistency:** Ensure __int__ matches other numeric methods

## Source References

- [Python __int__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__int__)

- [Python Numbers ABC](https://docs.python.org/3/library/numbers.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).