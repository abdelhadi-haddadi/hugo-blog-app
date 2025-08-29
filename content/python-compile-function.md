+++
title = "Python compile Function"
date = 2025-08-29T20:07:49.911+01:00
draft = false
description = "Complete guide to Python's compile function covering source to bytecode compilation, AST generation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python compile Function

Last modified April 11, 2025

This comprehensive guide explores Python's compile function, which
converts source code into bytecode or AST objects. We'll cover syntax modes,
code objects, and practical examples of dynamic code compilation.

## Basic Definitions

The compile function converts source code into a code or AST object
that can be executed by eval or exec. It supports
three modes: exec, eval, and single.

Key parameters: source (string/bytes/AST), filename (for error messages), mode
(exec/eval/single), flags (optimization), dont_inherit (compiler options).
Returns a code object ready for execution.

## Basic Compilation Example

This example shows how to compile a simple expression and statement using
different modes of the compile function.

basic_compile.py
  

# Compile an expression for eval
code_obj = compile('3 + 4 * 2', '&lt;string&gt;', 'eval')
print(eval(code_obj))  # 11

# Compile a statement for exec
code_obj = compile('x = 5\ny = 10\nprint(x + y)', '&lt;string&gt;', 'exec')
exec(code_obj)  # 15

# Compile for single mode (interactive)
code_obj = compile('print("Hello")', '&lt;string&gt;', 'single')
exec(code_obj)  # Hello

The first example compiles an expression for eval, which expects
a single expression. The second compiles multiple statements for exec.

The single mode is for interactive use - it prints expression
results like the Python REPL. Note the different return behaviors of each mode.

## Compiling from a File

This example demonstrates compiling Python code from a file, which is useful
for implementing custom interpreters or pre-processing code.

file_compile.py
  

# Assume test.py contains: print("Hello from file")

with open('test.py', 'r') as f:
    source = f.read()

code_obj = compile(source, 'test.py', 'exec')
exec(code_obj)  # Hello from file

# Inspect the code object
print(f"Co_code: {code_obj.co_code[:20]}...")  # First 20 bytes
print(f"Co_names: {code_obj.co_names}")  # Used names

Here we read Python code from a file and compile it. The filename parameter
helps with error messages. We then execute the compiled code object.

The example also shows inspecting the code object's attributes like co_code
(bytecode) and co_names (variable names used). These are useful
for introspection.

## AST Compilation

This advanced example shows compiling from an Abstract Syntax Tree (AST),
enabling powerful code generation and transformation capabilities.

ast_compile.py
  

import ast

# Create AST for: print("Hello AST")
tree = ast.Module(
    body=[ast.Expr(
        value=ast.Call(
            func=ast.Name(id='print', ctx=ast.Load()),
            args=[ast.Constant(value='Hello AST')],
            keywords=[]
        )
    )],
    type_ignores=[]
)

# Compile and execute AST
code_obj = compile(tree, '&lt;ast&gt;', 'exec')
exec(code_obj)  # Hello AST

# Convert AST back to source
print(ast.unparse(tree))  # print('Hello AST')

We manually construct an AST representing a print statement, then compile and
execute it. This demonstrates Python's full compilation pipeline.

The ast.unparse converts AST back to source code, showing the
round-trip capability. AST manipulation enables powerful metaprogramming.

## Error Handling

This example shows proper error handling when compiling invalid code, including
syntax errors and compilation warnings.

compile_errors.py
  

# Syntax error
try:
    compile('print("Hello)', '&lt;string&gt;', 'exec')  # Missing quote
except SyntaxError as e:
    print(f"SyntaxError: {e}")

# TypeError for wrong mode
try:
    compile('x = 5', '&lt;string&gt;', 'eval')  # 'eval' needs expression
except SyntaxError as e:
    print(f"SyntaxError: {e}")

# Warning example
import warnings
warnings.simplefilter('always')
compile('from __future__ import braces', '&lt;string&gt;', 'exec')

The first case shows handling a syntax error (unclosed string). The second
demonstrates a mode mismatch error (assignment in eval mode).

The last example triggers a SyntaxWarning for invalid future
import. Warnings can be controlled via the warnings module.

## Optimization Flags

This example demonstrates using compilation flags to control optimizations
and future feature behavior.

flags_compile.py
  

from __future__ import annotations
import ast

# With optimizations (constant folding)
code_obj = compile('3 + 4 * 2', '&lt;string&gt;', 'eval', 
                  flags=ast.PyCF_ONLY_AST, optimize=2)
print(ast.dump(code_obj, indent=2))  # Shows optimized AST

# Without optimizations
code_obj = compile('3 + 4 * 2', '&lt;string&gt;', 'eval', optimize=0)
print(eval(code_obj))  # 11

# With future features
code_obj = compile('def foo(x: int) -&gt; None: pass', 
                  '&lt;string&gt;', 'exec', 
                  flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)

The first part shows AST generation with optimizations flag. The second compares
optimized vs unoptimized compilation. The third demonstrates future features.

Optimization level 2 performs constant folding. Future flags enable features
like top-level await. These flags provide fine-grained compilation control.

## Best Practices

- **Security:** Never compile untrusted input without sandboxing

- **Mode selection:** Choose correct mode (exec/eval/single)

- **Error handling:** Always handle SyntaxError and TypeError

- **AST manipulation:** Prefer AST over string manipulation

- **Optimizations:** Use appropriate optimization levels

## Source References

- [Python compile() Documentation](https://docs.python.org/3/library/functions.html#compile)

- [Python ast Module Documentation](https://docs.python.org/3/library/ast.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).