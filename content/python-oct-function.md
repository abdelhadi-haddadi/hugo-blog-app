+++
title = "Python oct Function"
date = 2025-08-29T20:09:00.080+01:00
draft = false
description = "Complete guide to Python's oct function covering integer conversion, custom objects, and practical examples of octal representation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python oct Function

Last modified April 11, 2025

This comprehensive guide explores Python's oct function, which
converts integers to their octal (base-8) string representation. We'll cover
integer conversion, custom objects, and practical examples of octal usage.

## Basic Definitions

The oct function converts an integer to an octal string prefixed
with "0o". Octal is a base-8 number system using digits 0-7. Each octal digit
represents three binary digits.

Key characteristics: accepts integers (positive/negative), returns string with
"0o" prefix. For custom objects, looks for __index__ method.

## Basic Integer Conversion

Here's simple usage with different integers showing how oct
handles positive, negative, and zero values.

basic_oct.py
  

# With positive integers
print(oct(10))     # '0o12'
print(oct(64))     # '0o100'

# With negative integers
print(oct(-10))    # '-0o12'
print(oct(-64))    # '-0o100'

# With zero
print(oct(0))      # '0o0'

This example shows oct with different integer values. The output
always starts with "0o" prefix. Negative numbers include a minus sign before
the prefix.

The first conversion shows decimal 10 becomes octal 12 (1×8¹ + 2×8⁰). The
second shows 64 becomes 100 (1×8² + 0×8¹ + 0×8⁰).

## Different Integer Representations

oct works with integers in different representations (binary,
hexadecimal, decimal). This example shows various input formats.

representations.py
  

# Binary literal
print(oct(0b1010))    # '0o12'

# Hexadecimal literal
print(oct(0xA))       # '0o12'

# Decimal literal
print(oct(10))        # '0o12'

# Large number
print(oct(12345678))  # '0o57060516'

The example demonstrates oct works consistently regardless of
input format. Binary 1010, hex A, and decimal 10 all convert to '0o12'.

The large number conversion shows oct handles big integers
correctly, converting 12345678 to its 8-digit octal equivalent.

## Custom Objects with __index__

You can make custom objects work with oct by implementing the
__index__ special method. This example creates a custom class.

custom_oct.py
  

class MyNumber:
    def __init__(self, value):
        self.value = value
    
    def __index__(self):
        return self.value
    
    def __repr__(self):
        return f"MyNumber({self.value})"

num = MyNumber(42)
print(oct(num))  # '0o52'

The MyNumber class implements __index__ to return its value.
When we call oct on an instance, Python uses this method.

This pattern is useful for custom numeric types that should support base
conversion operations like oct, hex, and bin.

## Error Handling

The oct function raises TypeError when used with
non-integer types. This example shows proper error handling.

errors.py
  

try:
    print(oct("hello"))
except TypeError as e:
    print(f"Error: {e}")  # 'str' object cannot be interpreted as an integer

class NoIndex:
    pass

try:
    print(oct(NoIndex()))
except TypeError as e:
    print(f"Error: {e}")  # 'NoIndex' object cannot be interpreted as an integer

These examples demonstrate oct's behavior with unsupported types.
Strings and objects without __index__ raise TypeError.

To make a class work with oct, implement __index__
as shown in the previous example.

## Practical File Permissions Example

This example shows a practical use of octal numbers for representing Unix file
permissions, a common real-world application of octal notation.

permissions.py
  

def describe_permission(octal_perm):
    perm = int(octal_perm, 8)
    owner = (perm &gt;&gt; 6) &amp; 0b111
    group = (perm &gt;&gt; 3) &amp; 0b111
    others = perm &amp; 0b111
    
    def perm_str(p):
        return f"{'r' if p &amp; 4 else '-'}{'w' if p &amp; 2 else '-'}{'x' if p &amp; 1 else '-'}"
    
    return f"Owner: {perm_str(owner)}, Group: {perm_str(group)}, Others: {perm_str(others)}"

print(describe_permission('755'))  # Owner: rwx, Group: r-x, Others: r-x
print(describe_permission('644'))  # Owner: rw-, Group: r--, Others: r--

This function takes an octal permission string (like '755') and converts it to
human-readable format. Each digit represents permissions for owner, group, and
others.

The example demonstrates how octal numbers compactly represent three permission
bits per digit (read=4, write=2, execute=1). This is why octal is commonly used
for file permissions.

## Best Practices

- **Use for readability:** Prefer oct over manual conversion for clarity

- **Implement __index__:** For custom types that should support octal conversion

- **Consider format() alternatives:** For different formatting needs

- **Handle errors:** Catch TypeError when input type is uncertain

- **Document behavior:** Clearly document __index__ implementation

## Source References

- [Python oct() Documentation](https://docs.python.org/3/library/functions.html#oct)

- [Python __index__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__index__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).