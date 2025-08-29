+++
title = "Python eval Function"
date = 2025-08-29T20:08:27.332+01:00
draft = false
description = "Complete guide to Python's eval function covering syntax, security considerations, and practical examples of expression evaluation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python eval Function

Last modified April 11, 2025

This comprehensive guide explores Python's eval function, which
evaluates expressions dynamically. We'll cover syntax, security risks,
practical applications, and best practices for safe evaluation.

## Basic Definitions

The eval function parses and evaluates a string as a Python
expression. It returns the result of the evaluated expression. The function
can optionally take globals and locals dictionaries for variable scope.

Key characteristics: evaluates strings as code, supports expression-only
evaluation (not statements), and can be dangerous with untrusted input.
Always validate input before using eval in production code.

## Basic Expression Evaluation

Here's simple usage showing how eval can evaluate mathematical
expressions and basic Python operations from strings.

basic_eval.py
  

# Simple arithmetic
result = eval("2 + 3 * 4")
print(result)  # 14

# With variables
x = 10
y = 5
print(eval("x + y"))  # 15

# Boolean expressions
print(eval("10 &gt; 5 and 3 &lt; 4"))  # True

This example shows eval evaluating different expression types.
It can handle arithmetic, variable references, and boolean logic when the
variables are in scope.

The function returns the result of the evaluated expression, allowing dynamic
code execution based on string input. Note that only expressions work, not
statements like assignments or loops.

## Using globals and locals

eval can take optional globals and locals dictionaries to control
variable access. This example demonstrates restricted evaluation.

scope_eval.py
  

# Restricted namespace
safe_dict = {'x': 5, 'y': 10}
result = eval("x + y", safe_dict)
print(result)  # 15

# Missing variables
try:
    eval("z + 5", safe_dict)
except NameError as e:
    print(f"Error: {e}")  # name 'z' is not defined

# Built-ins disabled
try:
    eval("len('test')", {'__builtins__': None})
except NameError as e:
    print(f"Error: {e}")  # name 'len' is not defined

This shows how to control variable access in eval. The first
example uses a custom dictionary for variables. The others demonstrate
restricted access to undefined variables and built-ins.

Restricting globals and locals is crucial for security when evaluating
untrusted input. Always limit available namespaces when possible.

## Mathematical Expression Evaluator

This practical example creates a safe calculator that evaluates mathematical
expressions while preventing dangerous operations.

calculator.py
  

import math

def safe_eval(expr):
    allowed_names = {
        k: v for k, v in math.__dict__.items() 
        if not k.startswith('_')
    }
    allowed_names.update({'abs': abs, 'round': round})
    
    try:
        return eval(expr, {'__builtins__': None}, allowed_names)
    except (SyntaxError, NameError, TypeError) as e:
        return f"Error: {e}"

print(safe_eval("sqrt(16) + log10(100)"))  # 6.0
print(safe_eval("__import__('os').system('ls')"))  # Error: name '__import__' is not defined

This calculator allows only specific math functions while blocking dangerous
operations. It demonstrates how to create a safe evaluation environment.

The function whitelists math operations and catches potential errors. The
second example shows how it prevents malicious code execution attempts.

## Template String Evaluation

eval can be used for simple template evaluation where expressions
need to be dynamically inserted into strings.

template_eval.py
  

def eval_template(template, context):
    try:
        return eval(f'f"""{template}"""', {'__builtins__': None}, context)
    except Exception as e:
        return f"Template error: {e}"

user = {'name': 'Alice', 'age': 30}
template = "Hello {name}, you are {age} years old. Next year: {age+1}"
print(eval_template(template, user))
# Hello Alice, you are 30 years old. Next year: 31

This example shows how to use eval with f-strings for dynamic
template evaluation. The context dictionary provides the variables.

While powerful, this approach should only be used with trusted templates.
Consider alternatives like string.Template for untrusted input.

## JSON Configuration with Expressions

This advanced example demonstrates evaluating JSON configurations that contain
simple expressions, useful for dynamic settings.

config_eval.py
  

import json
import math

def eval_config(config_str):
    config = json.loads(config_str)
    context = {
        'math': math,
        'env': {'width': 1024, 'height': 768}
    }
    
    if 'formula' in config:
        try:
            config['value'] = eval(
                config['formula'],
                {'__builtins__': None},
                context
            )
        except Exception as e:
            config['error'] = str(e)
    
    return config

config_json = '''{
    "name": "display",
    "formula": "math.sqrt(env['width']**2 + env['height']**2)"
}'''

result = eval_config(config_json)
print(result['value'])  # 1280.0 (diagonal of 1024x768 display)

This shows how to safely evaluate expressions in JSON configurations. The
formula calculates the diagonal length using the Pythagorean theorem.

The example maintains security by restricting built-ins while allowing
specific math operations and environment variables through a context dict.

## Best Practices

- **Avoid untrusted input:** Never eval raw user input directly

- **Restrict namespaces:** Always provide limited globals/locals

- **Use alternatives:** Consider ast.literal_eval for simple needs

- **Validate input:** Sanitize expressions before evaluation

- **Document risks:** Clearly warn about security implications

## Source References

- [Python eval() Documentation](https://docs.python.org/3/library/functions.html#eval)

- [Python ast.literal_eval Documentation](https://docs.python.org/3/library/ast.html#ast.literal_eval)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).