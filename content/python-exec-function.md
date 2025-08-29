+++
title = "Python exec Function"
date = 2025-08-29T20:08:28.452+01:00
draft = false
description = "Complete guide to Python's exec function covering dynamic code execution, variable scope, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python exec Function

Last modified April 11, 2025

This comprehensive guide explores Python's exec function, which
executes dynamically created code. We'll cover syntax, scope handling,
security considerations, and practical examples of dynamic execution.

## Basic Definitions

The exec function executes Python code dynamically from a string
or code object. It can modify the current namespace and execute complex code
blocks.

Key characteristics: takes source code as string, executes in given namespaces,
returns None, and can affect local/global variables based on context.

## Basic String Execution

Here's simple usage showing how exec can execute Python code from
a string and modify the current namespace.

basic_exec.py
  

code = """
x = 10
y = 20
print(x + y)
"""

exec(code)  # Outputs: 30

# Variables are now in the namespace
print(x)    # 10
print(y)    # 20

This example shows exec executing a multi-line code string. The
code creates variables and performs operations that affect the current scope.

After execution, the variables x and y are available in the current namespace,
demonstrating exec's ability to modify the environment.

## Controlling Scope with Namespaces

exec can execute code in specific namespaces to control variable
access and modification. This example shows how to use custom dictionaries.

scope_control.py
  

global_ns = {}
local_ns = {}

code = """
a = 1
b = 2
print(a + b)
"""

exec(code, global_ns, local_ns)

print("Global:", global_ns)  # Contains builtins
print("Local:", local_ns)    # Contains a and b

This executes code in isolated namespaces. The global namespace contains
built-ins, while the local namespace contains the executed code's variables.

This technique is useful for sandboxing or when you need to control which
variables are modified by the executed code.

## Dynamic Function Creation

exec can dynamically create functions at runtime. This example
shows how to generate and use a function from a string.

dynamic_function.py
  

func_code = """
def dynamic_multiply(x, y):
    return x * y
"""

exec(func_code)

result = dynamic_multiply(5, 7)
print(result)  # 35

The code string defines a function, which exec makes available
in the current namespace. We can then call it like any regular function.

This demonstrates how exec can be used for metaprogramming and
runtime code generation scenarios.

## Security Considerations

This example demonstrates the dangers of unsanitized input with exec
and how to mitigate risks.

security.py
  

# Dangerous example (never do this with user input!)
user_input = "__import__('os').system('rm -rf /')"
try:
    exec(user_input)
except:
    print("Prevented dangerous operation")

# Safer alternative with restricted globals
safe_globals = {'__builtins__': None}
exec("print('Safe code')", safe_globals)

The first part shows how exec could execute dangerous code if
fed untrusted input. The second part demonstrates safer execution with
restricted globals.

Always validate and sanitize input when using exec, or avoid it
altogether for user-provided code.

## Template Processing

exec can be used for simple template processing by injecting
variables into code strings.

templates.py
  

template = """
for i in range({count}):
    print(f"Item {i+1}/{count}")
"""

context = {'count': 3}
exec(template.format(**context))

This example shows a basic templating system where we inject a variable into
a code template before execution. The formatted string becomes valid Python.

While not recommended for complex templates (use dedicated libraries instead),
this demonstrates exec's flexibility for code generation.

## Best Practices

- **Avoid user input:** Never exec untrusted code without proper sandboxing

- **Use namespaces:** Control variable access with custom globals/locals

- **Consider alternatives:** Often eval() or ast.literal_eval() are safer

- **Document thoroughly:** Clearly document any exec usage in your code

- **Limit scope:** Restrict builtins access when possible

## Source References

- [Python exec() Documentation](https://docs.python.org/3/library/functions.html#exec)

- [Python Execution Model](https://docs.python.org/3/reference/executionmodel.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).