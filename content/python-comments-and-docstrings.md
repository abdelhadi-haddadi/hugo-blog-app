+++
title = "Python Comments and Docstrings"
date = 2025-08-29T20:07:49.993+01:00
draft = false
description = "Complete guide to Python comments and docstrings covering syntax, best practices, and documentation generation"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Comments and Docstrings

last modified April 2, 2025

Comments and docstrings are essential for documenting Python code. Comments 
explain implementation details, while docstrings describe usage and 
functionality. This guide covers all aspects from basic syntax to documentation 
generation. Proper documentation improves code maintainability and enables 
auto-generated documentation tools. Learn to write clear, effective comments 
and docstrings following Python best practices.

## Single-Line Comments

Single-line comments start with the # symbol and continue to the 
end of the line. They are used for brief explanations and in-line notes. This 
example demonstrates proper single-line comment usage. Effective comments 
explain why, not what - the code itself shows what is being done.

single_line.py
# Calculate circle area (single-line comment before code)
def circle_area(radius):
    return 3.14159 * radius ** 2  # Using approximate value of π

# Bad example: Redundant comment
x = x + 1  # Increment x by 1

# Good example: Explains non-obvious logic
# Adjust for edge case when divisor is near zero
if abs(divisor) &lt; 1e-10:
    result = float('inf')

# Additional example: Commented-out code (use sparingly)
# old_value = calculate_old_way()  # Deprecated 2024-01-15
new_value = calculate_new_way()

# Additional example: End-of-line comments
names = ["Alice", "Bob", "Charlie"]  # List of user names

The first comment explains the purpose of the function, while the in-line 
comment notes the approximation of π. Avoid redundant comments that simply 
repeat what the code obviously does. Instead, document the reasoning behind 
non-obvious implementations.

Commented-out code should generally be removed (use version control instead), 
but when temporarily kept, include a deprecation note. End-of-line comments 
should be short and only used when truly helpful to understand that specific 
line.

## Multi-Line Comments

Python doesn't have true multi-line comment syntax, but consecutive single-line 
comments or triple-quoted strings are used for longer explanations. This 
example shows both approaches. Multi-line explanations are useful for complex 
algorithms or module-level documentation.

multi_line.py
"""
This is technically a string, not a comment,
but often used for module-level documentation.
It can span multiple lines and is ignored when
not assigned to a variable.
"""

# This is the preferred way for actual comments
# that span multiple lines in Python. Each line
# starts with a # and the comment is clearly
# distinguished from docstrings.

def complex_algorithm(data):
    # Phase 1: Data preprocessing
    # - Normalize input values
    # - Handle missing data
    # - Convert categorical variables
    
    # Phase 2: Core calculation
    # Uses the Smith-Waterman algorithm
    # with custom modifications for our use case
    
    pass

# Additional example: Block comment before code
###########################################
# Database Connection Handler             #
# Manages connection pooling and retries  #
###########################################
class DatabaseHandler:
    pass

The triple-quoted string at the top is actually a string literal, but when not 
assigned to a variable, it works like a comment. For actual multi-line 
comments, consecutive single-line comments are preferred as they're 
unambiguously comments.

The complex_algorithm function shows how to structure detailed 
explanations of multi-phase processes. Section headers (like the database 
handler example) can help organize large code files when used judiciously.

## Function Docstrings

Docstrings are string literals that appear as the first statement in modules, 
functions, classes, and methods. They follow PEP 257 conventions and describe 
the object's purpose and usage. This example demonstrates proper function 
docstring formatting. Good docstrings enable auto-generated documentation and 
help tools like help() and IDEs.

function_docstrings.py
def calculate_interest(principal, rate, years):
    """Calculate compound interest.
    
    Args:
        principal (float): Initial investment amount
        rate (float): Annual interest rate (e.g., 0.05 for 5%)
        years (int): Investment period in years
    
    Returns:
        float: Final amount after compound interest
    
    Examples:
        &gt;&gt;&gt; calculate_interest(1000, 0.05, 10)
        1628.894626777442
    """
    return principal * (1 + rate) ** years

# Additional example: One-line docstring
def greet(name):
    """Return a greeting string for the given name."""
    return f"Hello, {name}!"

# Additional example: Multi-class function
def process_data(data, verbose=False):
    """Process input data with optional verbosity.
    
    Performs data cleaning, normalization, and feature extraction
    in a single pipeline.
    
    Parameters:
        data (DataFrame): Input dataset
        verbose (bool): If True, print progress messages
    
    Raises:
        ValueError: If data contains invalid values
    
    Note:
        This function modifies the input DataFrame in place.
    """
    # Implementation here
    pass

The calculate_interest docstring follows the popular Google style, 
with clear sections for arguments, returns, and examples. One-line docstrings 
are appropriate for simple functions. Multi-class functions deserve more 
detailed docstrings covering all parameters, return values, exceptions, and 
special notes.

Docstrings should focus on what the function does (its interface), not how it 
works (implementation). They become part of the function's __doc__ 
attribute and are accessible via help().

## Class Docstrings

Class docstrings describe the class's purpose, attributes, and usage patterns. 
They appear immediately after the class definition and before any methods. This 
example shows comprehensive class documentation. Well-documented classes are 
easier to use and maintain.

class_docstrings.py
class BankAccount:
    """A class representing a basic bank account.
    
    Attributes:
        account_number (str): Unique account identifier
        balance (float): Current account balance
        owner (str): Account holder's name
    """
    
    def __init__(self, account_number, owner, balance=0.0):
        """Initialize a new bank account.
        
        Args:
            account_number (str): Account identifier
            owner (str): Account holder name
            balance (float, optional): Initial balance. Defaults to 0.0.
        """
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

# Additional example: Detailed class with methods
class Vector:
    """A mathematical vector in 2D space.
    
    Supports basic vector operations: addition, scalar multiplication,
    dot product, and magnitude calculation.
    
    Examples:
        &gt;&gt;&gt; v1 = Vector(1, 2)
        &gt;&gt;&gt; v2 = Vector(3, 4)
        &gt;&gt;&gt; v1 + v2
        Vector(4, 6)
    """
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def magnitude(self):
        """Calculate the vector's magnitude.
        
        Returns:
            float: The vector's length
        """
        return (self.x**2 + self.y**2)**0.5

The BankAccount docstring describes the class's purpose and lists 
its attributes. The Vector class shows more detailed 
documentation including usage examples. Class docstrings should provide enough 
information for someone to use the class without reading its implementation.

Method docstrings within classes follow the same principles as function 
docstrings. The magnitude method demonstrates a simple but clear 
docstring. Together, these form comprehensive class documentation.

## Module Docstrings

Module docstrings appear at the top of Python files and describe the module's 
purpose, contents, and usage. They should be triple-quoted strings before any 
imports or code. This example shows a properly documented module. Module 
docstrings help users understand the file's role in the larger system.

module_docstring.py
"""Financial calculations module.

Provides functions for common financial calculations including
interest, annuities, and investment returns.

Example:
    &gt;&gt;&gt; from financial import calculate_interest
    &gt;&gt;&gt; calculate_interest(1000, 0.05, 10)
    1628.894626777442

Copyright (c) 2025 Financial Tools Inc.
License: MIT
"""

import math
from datetime import date

# Additional example: Detailed module docstring
"""Image processing utilities.

This module contains functions for common image manipulation tasks:
- Color space conversions
- Filter applications
- Feature detection
- Image I/O operations

The implementation uses NumPy for efficient array operations and
supports both RGB and grayscale images.

Note:
    For advanced computer vision tasks, consider using OpenCV
    instead of these basic functions.
"""

The financial module docstring describes its purpose, contents, and includes a 
quick example. Copyright and license information often appears in module 
docstrings. The image processing example shows more detailed documentation 
including implementation notes and recommendations.

Module docstrings should be comprehensive enough to let users understand what 
the module offers without reading all its code. They become the module's 
__doc__ attribute and are used by documentation generators.

## Docstring Formats

Several docstring formats exist in Python, each with its own conventions. The 
most common are Google style, NumPy/SciPy style, and reStructuredText. This 
example compares these formats. Consistent docstring style improves codebase 
readability.

formats.py
# Google Style
def google_style(a, b):
    """Compute the sum of two numbers.
    
    Args:
        a (int or float): First operand
        b (int or float): Second operand
    
    Returns:
        int or float: Sum of a and b
    
    Examples:
        &gt;&gt;&gt; google_style(2, 3)
        5
    """
    return a + b

# NumPy/SciPy Style
def numpy_style(a, b):
    """Compute the sum of two numbers.
    
    Parameters
    ----------
    a : int or float
        First operand
    b : int or float
        Second operand
    
    Returns
    -------
    int or float
        Sum of a and b
    
    Examples
    --------
    &gt;&gt;&gt; numpy_style(2, 3)
    5
    """
    return a + b

# reStructuredText Style
def rst_style(a, b):
    """Compute the sum of two numbers.
    
    :param a: First operand
    :type a: int or float
    :param b: Second operand
    :type b: int or float
    :return: Sum of a and b
    :rtype: int or float
    :example:
        &gt;&gt;&gt; rst_style(2, 3)
        5
    """
    return a + b

Google style is compact and readable, popular for general Python code. NumPy 
style uses section headers with underlines, common in scientific Python. 
reStructuredText is more verbose but works well with Sphinx documentation 
tools. All three formats are valid - the key is consistency within a project.

Each format includes the same basic information: parameters, return values, and 
examples. Choose based on your project's conventions and documentation tooling. 
Many IDEs can generate docstring stubs in your preferred format.

## Documentation Generation

Python docstrings can be automatically converted to documentation using tools 
like Sphinx, pdoc, and mkdocs. This example shows docstrings formatted for 
Sphinx. Properly formatted docstrings enable professional documentation with 
minimal extra effort.

sphinx_docs.py
def sphinx_ready(a, b):
    """Compute the product of two numbers.
    
    This function multiplies two numbers with proper type checking.
    It serves as an example of Sphinx-compatible docstrings.
    
    :param a: First factor
    :type a: int or float
    :param b: Second factor
    :type b: int or float
    :return: Product of a and b
    :rtype: int or float
    :raises TypeError: If either argument isn't numeric
    
    .. note::
       This function doesn't handle complex numbers.
    
    .. warning::
       Floating-point multiplication may have precision issues.
    
    Example:
        .. code-block:: python
        
           result = sphinx_ready(3, 4)
           print(result)  # 12
    """
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Numeric arguments required")
    return a * b

Sphinx docstrings use reStructuredText syntax with special directives like 
.. note:: and .. warning::. The :param:, 
:type:, :return:, and :raises: tags 
create structured documentation. Code examples use .. code-block:: 
directives.

When processed by Sphinx, these docstrings generate nicely formatted HTML/PDF 
documentation with proper cross-references. Many open-source Python projects 
use this approach for their official documentation.

## Best Practices

Write docstrings for all public modules, functions, classes, and methods. Keep 
comments and docstrings up-to-date when code changes. Use docstrings to 
document interface (what), comments to explain implementation (how). Follow 
PEP 8 and PEP 257 style guidelines. Choose a docstring format and stick with 
it consistently throughout your project.

## Source References

Learn more from these resources: 
[PEP 257 Docstring Conventions](https://www.python.org/dev/peps/pep-0257/),
[Google Python Style Guide](https://google.github.io/styleguide/pyguide.html),
and [Sphinx Documentation](https://www.sphinx-doc.org/).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).