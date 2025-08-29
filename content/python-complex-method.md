+++
title = "Python __complex__ Method"
date = 2025-08-29T20:08:03.823+01:00
draft = false
description = "Complete guide to Python's __complex__ method covering complex number conversion, numeric operations, and custom implementations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __complex__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __complex__ method, the
special method that enables objects to be converted to complex numbers. We'll
cover basic usage, numeric operations, custom implementations, and practical
examples.

## Basic Definitions

The __complex__ method is a special method in Python that defines
how an object should be converted to a complex number. It's called by the
complex() built-in function and during complex number operations.

Key characteristics: it must return a complex number, is used for implicit and
explicit conversions, and enables numeric interoperability. It's part of
Python's numeric protocol along with __int__, __float__.

## Basic __complex__ Implementation

Here's a simple implementation showing how __complex__ enables
conversion to complex numbers. The method should return a built-in complex
number.

basic_complex.py
  

class ComplexNumber:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag
    
    def __complex__(self):
        return complex(self.real, self.imag)

cn = ComplexNumber(3, 4)
print(complex(cn))  # (3+4j)
print(type(complex(cn)))  # &lt;class 'complex'&gt;

This example shows a basic complex number wrapper class. The __complex__
method returns a built-in complex number with the same components. The
complex() built-in calls this method.

The returned value must be a Python complex type. This enables
seamless integration with Python's numeric operations and functions.

## Using __complex__ with Math Operations

__complex__ allows custom objects to participate in complex number
operations. Python automatically converts them when needed.

complex_operations.py
  

class PolarNumber:
    def __init__(self, magnitude, angle):
        self.magnitude = magnitude
        self.angle = angle
    
    def __complex__(self):
        import math
        real = self.magnitude * math.cos(self.angle)
        imag = self.magnitude * math.sin(self.angle)
        return complex(real, imag)

polar = PolarNumber(5, 0.927)  # ~3+4j in rectangular
native_complex = complex(1, 2)
result = polar + native_complex
print(result)  # (4+6j)

This PolarNumber class stores complex numbers in polar form but converts to
rectangular form via __complex__. Python automatically uses this
conversion during the addition operation.

The conversion happens implicitly when the object is used in operations with
built-in complex numbers. This maintains mathematical correctness.

## Implementing Complex Number Parsing

__complex__ can be used to implement custom complex number parsing
from strings or other formats while maintaining compatibility.

complex_parsing.py
  

class StringComplex:
    def __init__(self, complex_str):
        self.str = complex_str
    
    def __complex__(self):
        parts = self.str.split('+')
        real = float(parts[0])
        imag = float(parts[1].rstrip('j'))
        return complex(real, imag)

sc = StringComplex("3.5+4.2j")
native = complex(sc)
print(native)  # (3.5+4.2j)
print(native * 2)  # (7+8.4j)

This class parses complex numbers from strings but provides standard complex
number behavior via __complex__. The conversion enables all complex
operations to work normally.

The implementation handles a specific string format. In practice, you'd want
more robust parsing, but this shows the conversion principle.

## Complex Number Validation

__complex__ can include validation logic to ensure only valid
complex numbers are created from your objects.

complex_validation.py
  

class ValidatedComplex:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag
    
    def __complex__(self):
        if not (isinstance(self.real, (int, float)) and 
                isinstance(self.imag, (int, float))):
            raise ValueError("Components must be numeric")
        return complex(self.real, self.imag)

vc = ValidatedComplex(3, 4)
print(complex(vc))  # OK
# vc_bad = ValidatedComplex("3", "4")  # Raises ValueError

This implementation checks that both components are numeric before conversion.
This prevents invalid complex number creation and provides early error detection.

The validation happens during conversion rather than initialization, allowing
for more flexible usage patterns while maintaining safety.

## Combining __complex__ with Other Numeric Methods

__complex__ often works with other numeric special methods to
provide complete numeric behavior for custom classes.

numeric_integration.py
  

class FullNumeric:
    def __init__(self, value):
        self.value = value
    
    def __complex__(self):
        return complex(self.value)
    
    def __int__(self):
        return int(self.value)
    
    def __float__(self):
        return float(self.value)
    
    def __add__(self, other):
        return FullNumeric(self.value + other)

num = FullNumeric(3.5)
print(complex(num) + 2j)  # (3.5+2j)
print(float(num) + 1.5)   # 5.0
print(int(num) + 2)       # 5

This class supports conversion to all Python numeric types and implements basic
arithmetic. __complex__ integrates with other numeric methods for
complete numeric behavior.

The combination allows objects to be used flexibly in numeric contexts while
maintaining type safety and mathematical correctness.

## Best Practices

- **Return correct type:** Always return a built-in complex number

- **Maintain mathematical correctness:** Ensure conversions are mathematically valid

- **Implement related methods:** Consider adding __float__ and __int__

- **Handle errors gracefully:** Validate data before conversion

- **Document behavior:** Clearly document any special conversion logic

## Source References

- [Python __complex__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__complex__)

- [Python Numeric Types Documentation](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).