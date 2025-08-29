+++
title = "Python __call__ Method"
date = 2025-08-29T20:08:02.705+01:00
draft = false
description = "Complete guide to Python's __call__ method covering callable objects, function-like classes, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __call__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __call__ method, which
makes instances callable like functions. We'll cover basic usage, stateful
functions, decorators, and practical examples.

## Basic Definitions

The __call__ method enables instances to be called like functions.
When defined, you can use the instance with parentheses and arguments.

Key characteristics: it makes objects behave like functions, maintains state
between calls, and is essential for creating functors (function objects).
The method receives the instance as self plus any call arguments.

## Basic __call__ Implementation

Here's a simple class implementing __call__ to demonstrate the
basic functionality. The instance becomes callable like a function.

basic_call.py
  

class Greeter:
    def __init__(self, greeting):
        self.greeting = greeting
    
    def __call__(self, name):
        return f"{self.greeting}, {name}!"

hello = Greeter("Hello")
print(hello("Alice"))  # "Hello, Alice!"
print(hello("Bob"))    # "Hello, Bob!"

This example shows how __call__ makes instances behave like
functions. The Greeter instance remembers its greeting
state between calls.

The hello object can be called with parentheses and arguments,
just like a regular function, but maintains its own state.

## Stateful Function Objects

__call__ is perfect for creating stateful function objects that
remember information between calls, unlike regular functions.

counter.py
  

class Counter:
    def __init__(self):
        self.count = 0
    
    def __call__(self):
        self.count += 1
        return self.count

counter = Counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3

This Counter class maintains state between calls. Each call
increments the count and returns the new value, demonstrating stateful behavior.

Unlike closure-based solutions, this approach provides a clean object-oriented
way to maintain state between function calls with full class capabilities.

## Creating Decorators with __call__

Class-based decorators often use __call__ to implement the
decorator logic while maintaining state between decorated function calls.

decorator.py
  

class Trace:
    def __init__(self, func):
        self.func = func
        self.calls = 0
    
    def __call__(self, *args, **kwargs):
        self.calls += 1
        print(f"Call {self.calls} to {self.func.__name__}")
        return self.func(*args, **kwargs)

@Trace
def square(x):
    return x * x

print(square(5))  # Prints trace info and returns 25
print(square(3))  # Prints trace info and returns 9

This Trace decorator logs each call to the decorated function.
The __call__ method handles the actual function invocation.

The decorator maintains state (call count) across multiple calls to the
decorated function, demonstrating a key advantage of class-based decorators.

## Memoization with __call__

The __call__ method can implement memoization by caching function
results to avoid repeated calculations for the same inputs.

memoize.py
  

class Memoize:
    def __init__(self, func):
        self.func = func
        self.cache = {}
    
    def __call__(self, *args):
        if args not in self.cache:
            self.cache[args] = self.func(*args)
        return self.cache[args]

@Memoize
def fibonacci(n):
    if n in (0, 1):
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 55 (cached results speed up calculation)

This memoization decorator caches Fibonacci sequence results to dramatically
improve performance. The cache is maintained in the instance dictionary.

Each call first checks the cache before computing, storing new results for
future use. This pattern works well for expensive pure functions.

## Callable Objects for Configuration

__call__ can create flexible configuration objects that behave
differently based on call arguments while maintaining configuration state.

configurator.py
  

class Configurator:
    def __init__(self, default_mode="standard"):
        self.mode = default_mode
        self.settings = {}
    
    def __call__(self, mode=None, **options):
        if mode:
            self.mode = mode
        self.settings.update(options)
        return self
    
    def get_setting(self, key):
        return self.settings.get(key, f"default_{key}")

config = Configurator()
config(mode="debug", timeout=100, retries=3)
print(config.mode)          # "debug"
print(config.get_setting("timeout"))  # 100

This Configurator class provides a fluent interface for
configuration. The __call__ method updates settings and returns
self for chaining.

The object maintains configuration state and can be called multiple times to
adjust settings, offering a flexible alternative to configuration files.

## Best Practices

- **Maintain callable semantics:** Make __call__ behave like a function

- **Document call signature:** Clearly document expected arguments

- **Consider functools.wraps:** For decorators, preserve function metadata

- **Keep state clean:** Manage instance state carefully between calls

- **Prefer simple functions:** Only use __call__ when state is needed

## Source References

- [Python __call__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__call__)

- [Python Callable Definition](https://docs.python.org/3/glossary.html#term-callable)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).