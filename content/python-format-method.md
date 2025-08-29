+++
title = "Python __format__ Method"
date = 2025-08-29T20:08:09.440+01:00
draft = false
description = "Complete guide to Python's __format__ method covering string formatting, custom format specifications, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __format__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __format__ method, the
special method that controls how objects are formatted as strings. We'll cover
basic usage, format specifications, custom formatting, and practical examples.

## Basic Definitions

The __format__ method is called by the built-in format()
function and string formatting operations. It returns a string representation of
the object according to a format specification.

Key characteristics: it accepts a format specification string as argument,
returns a formatted string representation, and can be overridden to customize
formatting behavior for custom objects.

## Basic __format__ Implementation

Here's a simple implementation showing how __format__ works with
basic format specifications. It demonstrates the method's basic structure.

basic_format.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __format__(self, format_spec):
        if format_spec == 'f':
            return f"{self.celsius * 9/5 + 32:.2f}°F"
        elif format_spec == 'k':
            return f"{self.celsius + 273.15:.2f}K"
        else:
            return f"{self.celsius:.2f}°C"

temp = Temperature(25)
print(f"Default: {temp}")        # Default: 25.00°C
print(f"Fahrenheit: {temp:f}")   # Fahrenheit: 77.00°F
print(f"Kelvin: {temp:k}")       # Kelvin: 298.15K

This example shows a Temperature class that formats differently based on the
format specification. The __format__ method checks the format_spec
parameter to determine the output format.

The method handles three cases: default Celsius display, Fahrenheit conversion
('f' specifier), and Kelvin conversion ('k' specifier). Each returns a properly
formatted string.

## Implementing Numeric Formatting

The __format__ method can implement numeric formatting similar to
built-in types, supporting alignment, padding, and precision specifications.

numeric_formatting.py
  

class FixedPoint:
    def __init__(self, value, scale=100):
        self.value = value
        self.scale = scale
    
    def __format__(self, format_spec):
        if not format_spec:
            return str(self.value / self.scale)
        
        # Handle format specifications like :.2f
        if format_spec.startswith('.'):
            precision = int(format_spec[1:-1])
            fmt = f"{{:.{precision}f}}"
            return fmt.format(self.value / self.scale)
        
        # Handle width and alignment
        parts = format_spec.split(',')
        num = self.value / self.scale
        if len(parts) == 1:
            return f"{num:{format_spec}}"
        else:
            width, align = parts
            return f"{num:{align}{width}}"

num = FixedPoint(31415)
print(f"Default: {num}")          # Default: 314.15
print(f"Formatted: {num:.2f}")    # Formatted: 314.15
print(f"Aligned: {num:10,.2f}")   # Aligned:     314.15

This FixedPoint class stores values with fixed decimal places. The
__format__ method parses the format specification to provide
flexible formatting options similar to floating-point numbers.

The implementation handles precision specifications (like '.2f'), width, and
alignment. It demonstrates how to parse and apply complex format specifications.

## Custom Format Specification Language

For complex objects, you can define a custom format specification language that
controls different aspects of the string representation.

custom_format_spec.py
  

class Person:
    def __init__(self, name, age, height):
        self.name = name
        self.age = age
        self.height = height
    
    def __format__(self, format_spec):
        if not format_spec:
            return f"{self.name} (age: {self.age}, height: {self.height}cm)"
        
        parts = format_spec.split(':')
        if parts[0] == 'short':
            return self.name
        elif parts[0] == 'long':
            if len(parts) &gt; 1 and parts[1] == 'metric':
                return (f"{self.name}, {self.age} years old, "
                       f"{self.height}cm tall")
            else:
                return (f"{self.name}, {self.age} years old, "
                       f"{self.height / 2.54:.1f} inches tall")
        else:
            return str(self)

person = Person("Alice", 30, 170)
print(f"Default: {person}")               # Default: Alice (age: 30, height: 170cm)
print(f"Short: {person:short}")           # Short: Alice
print(f"Long metric: {person:long:metric}") # Long metric: Alice, 30 years old, 170cm tall

This Person class implements a custom format specification language with 'short'
and 'long' formats, and optional unit specifications. The __format__
method parses these specifications to produce different output formats.

The example shows how to design a domain-specific format language that makes
object formatting more expressive and useful for specific use cases.

## Formatting Composite Objects

The __format__ method can delegate formatting to contained objects,
creating complex formatted output from component parts.

composite_formatting.py
  

class InventoryItem:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def __format__(self, format_spec):
        if format_spec == 'csv':
            return f"{self.name},{self.price:.2f},{self.quantity}"
        elif format_spec == 'json':
            return (f'{{"name": "{self.name}", "price": {self.price:.2f}, '
                   f'"quantity": {self.quantity}}}')
        else:
            return (f"{self.name:20} ${self.price:&gt;7.2f} "
                   f"x{self.quantity:03}")

class InventoryReport:
    def __init__(self, items):
        self.items = items
    
    def __format__(self, format_spec):
        header = "INVENTORY REPORT\n" + "="*40 + "\n"
        footer = "\n" + "="*40 + f"\nTotal items: {len(self.items)}"
        
        if format_spec == 'csv':
            body = "\n".join(f"{item:csv}" for item in self.items)
            return "name,price,quantity\n" + body
        elif format_spec == 'json':
            body = ",\n".join(f"{item:json}" for item in self.items)
            return f'{{"items": [\n{body}\n]}}'
        else:
            body = "\n".join(f"{item}" for item in self.items)
            return header + body + footer

items = [
    InventoryItem("Widget", 12.99, 42),
    InventoryItem("Gadget", 7.50, 13),
    InventoryItem("Thingy", 3.20, 89)
]
report = InventoryReport(items)
print(f"Default report:\n{report}")
print(f"\nCSV report:\n{report:csv}")
print(f"\nJSON report:\n{report:json}")

This example shows a composite InventoryReport class that formats its contained
InventoryItem objects differently based on the format specification. Each class
implements its own __format__ method.

The report can be formatted in different output formats (default, CSV, JSON),
with each format specification being passed down to the contained items for
consistent formatting throughout the object hierarchy.

## Advanced Format Specification Parsing

For maximum flexibility, the __format__ method can implement
complex parsing of format specifications, similar to built-in types.

advanced_format_parsing.py
  

class ScientificNumber:
    def __init__(self, value):
        self.value = value
    
    def __format__(self, format_spec):
        if not format_spec:
            return str(self.value)
        
        # Parse format specification components
        fill = ' '
        align = '&gt;'
        sign = '-'
        width = 0
        precision = 6
        type_char = 'g'
        
        # Simplified parsing - real implementation would be more robust
        if '&gt;' in format_spec or '&lt;' in format_spec or '^' in format_spec:
            align = format_spec[0]
            rest = format_spec[1:]
        else:
            rest = format_spec
        
        if '.' in rest:
            width_part, precision_part = rest.split('.')
            width = int(width_part) if width_part else 0
            precision = int(precision_part[:-1]) if precision_part[:-1] else 6
            type_char = precision_part[-1] if precision_part else 'g'
        else:
            width = int(rest[:-1]) if rest[:-1] else 0
            type_char = rest[-1] if rest else 'g'
        
        # Apply formatting based on parsed specifications
        if type_char == 'e':
            formatted = f"{self.value:.{precision}e}"
        elif type_char == 'f':
            formatted = f"{self.value:.{precision}f}"
        else:  # 'g' - general format
            formatted = f"{self.value:.{precision}g}"
        
        # Apply alignment and width
        if align == '&gt;':
            return formatted.rjust(width, fill)
        elif align == '&lt;':
            return formatted.ljust(width, fill)
        elif align == '^':
            return formatted.center(width, fill)
        elif align == '=':
            # Handle numeric padding between sign and digits
            if formatted[0] in '+-':
                return formatted[0] + formatted[1:].rjust(width-1, fill)
            return formatted.rjust(width, fill)
        else:
            return formatted

num = ScientificNumber(12345.6789)
print(f"Default: {num}")              # Default: 12345.6789
print(f"Scientific: {num:.3e}")       # Scientific: 1.235e+04
print(f"Fixed: {num:10.2f}")          # Fixed:   12345.68
print(f"Centered: {num:^15.4g}")      # Centered:    1.235e+04   

This ScientificNumber class implements advanced format specification parsing
similar to Python's built-in numeric types. It handles alignment, precision,
and type specifications in a single format string.

The example demonstrates how to parse complex format specifications and apply
them to produce different string representations of the same numeric value.

## Best Practices

- **Handle empty format_spec:** Always provide a default format

- **Document your format language:** Clearly specify supported formats

- **Maintain consistency:** Follow similar conventions to built-in types

- **Validate inputs:** Check for unsupported format specifications

- **Delegate when possible:** Use built-in formatting for simple cases

## Source References

- [Python __format__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__format__)

- [Format Specification Mini-Language](https://docs.python.org/3/library/string.html#format-specification-mini-language)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).