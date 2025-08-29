+++
title = "Java Pitfalls and Corner Cases"
date = 2025-08-29T20:00:06.303+01:00
draft = false
description = "This tutorial covers common Java pitfalls and corner cases that developers should be aware of."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pitfalls and Corner Cases

last modified April 2, 2025

Java is a powerful and widely-used programming language, but it comes with its
own set of challenges. Developers often encounter subtle issues or overlooked
behaviors that can lead to bugs, inefficiencies, or unexpected program behavior.
This tutorial highlights common pitfalls and tricky corner cases in Java,
helping you navigate these challenges and write cleaner, more reliable code.

## Integer Caching

Java's Integer caching behavior can lead to surprising results when using the
== operator for comparison. This optimization is often
misunderstood by developers coming from other languages.

IntegerCache.java
  

void main() {

    Integer a = 127;
    Integer b = 127;
    System.out.println(a == b); // true

    Integer c = 128;
    Integer d = 128;
    System.out.println(c == d); // false
}

Java caches Integer values between -128 and 127. When comparing with ==, these
cached instances will be equal, but values outside this range will not. Always
use .equals() for value comparison of objects.

## String Comparison

String comparison in Java is a common source of bugs, especially for developers
who are new to the language. Understanding the difference between
== and equals is crucial.

StringComparison.java
  

void main() {

    String s1 = "hello";
    String s2 = "hello";
    String s3 = new String("hello");

    System.out.println(s1 == s2); // true
    System.out.println(s1 == s3); // false
    System.out.println(s1.equals(s3)); // true
}

Due to string interning, literal strings with the same value may refer to the
same object. However, new String() creates a new object. Always use
equals for string content comparison.

## Floating Point Precision

Floating-point arithmetic in Java often produces unexpected results due to the
way numbers are stored and processed internally. Java uses the IEEE 754 standard
for representing floating-point numbers, which encodes them in a binary format.
This binary representation introduces approximation errors because many decimal
numbers cannot be represented exactly in binary. For example, values like
0.1 and 0.2 are approximations in binary, so
operations involving these numbers may yield results that are slightly off from
the expected value. These rounding errors can accumulate and lead to surprising
outcomes.

FloatingPoint.java
  

void main() {

    System.out.println(0.1 + 0.2); // 0.30000000000000004
    System.out.println(1.03 - 0.42); // 0.6100000000000001
    
    double a = 0.0;
    System.out.println(a == -a); // true
}

In the provided examples, 0.1 + 0.2 results in
0.30000000000000004 instead of an exact 0.3 due to the
inability to represent 0.1 and 0.2 precisely in
binary. 

Similarly, the subtraction 1.03 - 0.42 yields
0.6100000000000001, showing another case where binary approximation
impacts the result. Furthermore, the expression a == -a evaluates
to true when a is 0.0 because positive
and negative zero are treated as equivalent in IEEE 754 arithmetic.

## Iteration and Removal in ArrayList

When iterating through an ArrayList and removing elements,
developers can run into unexpected behavior such as
ConcurrentModificationException. Understanding safe methods for
removal is crucial to avoid such issues.

ArrayListIteration.java
  

void main() {

    ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);

    // Unsafe removal - causes ConcurrentModificationException
    for (Integer num : list) {
        if (num % 2 == 0) {
            list.remove(num);
        }
    }

    // Safe removal using Iterator
    Iterator&lt;Integer&gt; iterator = list.iterator();

    while (iterator.hasNext()) {
        Integer num = iterator.next();
        if (num % 2 == 0) {
            iterator.remove();
        }
    }

    System.out.println("Updated List: " + list);
}

Removing elements directly during iteration with for-each loops
causes ConcurrentModificationException because the
ArrayList modification invalidates the iterator. 

Always use Iterator.remove for safe removal during iteration or 
utilize the removeIf method.

## Autoboxing and NullPointerException

Java's autoboxing feature can lead to subtle NullPointerExceptions when
converting between primitive types and their object wrapper counterparts.

Autoboxing.java
  

void main() {

    Integer a = null;
    int b = a; // NullPointerException
    
    Map&lt;String, Integer&gt; map = new HashMap&lt;&gt;();
    int value = map.get("nonexistent"); // NullPointerException
}

When unboxing null Integer objects to primitive int, a NullPointerException
occurs. Be cautious with collections that may contain null values when working
with primitives.

## Array Initialization

Java array initialization syntax can be confusing, especially when combined with
variable arguments. The subtle differences in syntax can lead to unexpected
behavior.

ArrayInitialization.java
  

void main() {

    int[] a = {1, 2, 3};
    int[] b = new int[]{1, 2, 3};
    // int[] c = new int[3]{1, 2, 3}; // Compile error
    
    printNumbers(new int[]{1, 2, 3}); // OK
    // printNumbers({1, 2, 3}); // Compile error
}

void printNumbers(int... numbers) {

    for (int n : numbers) {
        System.out.println(n);
    }
}

Array initialization syntax is strict in Java. The concise form {1,2,3} only
works in variable declarations, not in method arguments or assignments.

## Equals and HashCode Contract

The relationship between equals and hashCode is often
misunderstood, leading to subtle bugs when objects are used in collections like
HashSet or HashMap.

EqualsHashCode.java
  

class Person {

    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {

            return true;
        }

        if (o == null || getClass() != o.getClass()) {

            return false;
        }

        Person person = (Person) o;
        return age == person.age &amp;&amp; name.equals(person.name);
    }

    // Missing hashCode() implementation
}

void main() {

    Set&lt;Person&gt; people = new HashSet&lt;&gt;();
    people.add(new Person("Alice", 25));
    
    System.out.println(people.contains(new Person("Alice", 25))); // false
}

If two objects are equal according to equals, they must have the
same hashCode. Violating this contract can cause collections to
malfunction.

## Finalizer Pitfalls

The finalize method is often misused and misunderstood. Its
behavior can be unpredictable and it comes with significant performance
overhead.

Finalizer.java
  

class Resource {
 
    @Override
    protected void finalize() throws Throwable {
 
        System.out.println("Finalizing");
        super.finalize();
    }
}

void main() {

    var res = new Resource();
    System.gc(); // Finalizer may or may not run
}

Finalizers are not guaranteed to run promptly or at all. For resource cleanup,
use try-with-resources or implement AutoCloseable instead.

## Static Initialization Order

The order of static initialization in Java can lead to subtle and hard-to-diagnose bugs, especially when static fields across different classes depend on each other. Static initialization in Java occurs in the order in which the fields are declared in the source code, known as textual order. This means that even if static fields from different classes reference each other, the initialization happens sequentially, one field at a time, following their appearance in the code. This behavior can create circular dependencies, leading to unexpected results.

StaticInitialization.java
  

static class A {
    static int value = B.value + 1;
}

static class B {
    static int value = A.value + 1;
}

static void main() {

    System.out.println("A: " + A.value); // A: 2
    System.out.println("B: " + B.value); // B: 1
}

In the example above, the static fields A.value and
B.value reference each other, creating a circular dependency. When
the program starts and the main method is executed, the following
sequence occurs:

The static field A.value is accessed first through
the call to A.value in the System.out.println
statement. This triggers the initialization of A.value.

During the initialization of A.value, its value is calculated as
B.value + 1. However, since B.value has not yet been
initialized, it takes its default value of 0.

After calculating A.value as 0 + 1 (resulting in
1), B.value is then initialized. Its value is
calculated as A.value + 1, where A.value is now
1. This results in B.value being set to
2.

Finally, the updated values of A.value and B.value
are printed. Since B.value was updated after A.value
was first calculated, the printed results are A: 2 and B: 1.

This illustrates how circular dependencies between static fields can lead to
unexpected results, as the final values depend on the order in which the fields
are initialized. To avoid such issues, it is best practice to design classes to
minimize or eliminate dependencies between static fields across different
classes. Refactoring the code to initialize static fields explicitly in a
well-defined order can help ensure predictable behavior.

## Method Overloading with Autoboxing and Varargs

Java's method overloading allows multiple methods with the same name but
different parameter types. When combined with autoboxing and varargs, method
resolution can become increasingly complex, leading to ambiguous method calls or
unexpected behavior at compile time. This happens because the compiler must
decide which method to invoke based on several layers of rules, including type
specificity and compatibility with varargs.

OverloadingWithVarargs.java
  

static void print(int i) {
    System.out.println("int");
}

static void print(Integer i) {
    System.out.println("Integer");
}

static void print(long l) {
    System.out.println("long");
}

static void print(Object o) {
    System.out.println("Object");
}

static void print(int... values) {
    System.out.println("varargs");
}

static void main() {

    print(1); // int
    print(Integer.valueOf(1)); // Integer
    print((Integer) null); // Integer (resolved by explicit casting)
    print(1, 2, 3); // varargs
}

In this example, the method print has five overloaded versions that
accept different parameter types, including one using varargs of type
int. The following scenarios demonstrate how the compiler resolves
method calls:

When print(1) is called, the argument 1 is a primitive
int. The compiler selects the print(int i) method
because it matches the argument exactly. The output is "int".

When print(Integer.valueOf(1)) is called, the argument is an
Integer object. The compiler invokes the print(Integer
i) method, as it matches the argument's type precisely. The output is
"Integer".

For print((Integer) null), the ambiguity that arises from the
addition of the varargs method is resolved through explicit casting. By
explicitly casting null to Integer, the compiler knows
to call the print(Integer i) method. The output is "Integer".

When print(1, 2, 3) is called, the varargs method
print(int... values) is invoked. This is because no other method
matches multiple int arguments, and the varargs method is
specifically designed to handle a variable number of arguments. The output is
"varargs".

Without the explicit cast, a call like print(null) would cause a
compilation error because both the print(Integer) and
print(int...) methods are valid candidates, and the compiler cannot
decide which one to choose. This highlights how varargs, combined with
autoboxing and overloaded methods, can lead to ambiguous behavior.

To avoid such ambiguity, it is best practice to carefully design overloaded
methods by using distinct parameter types or adding explicit casts where
necessary. Additionally, consider avoiding overloading methods with similar
parameter types when varargs and autoboxing are involved, as these can
complicate the compiler's decision-making process and lead to unexpected
results.

## Generics Type Erasure

Java's generics are implemented using a mechanism known as type erasure. At
compile time, generics ensure type safety by preventing invalid assignments or
operations based on the specified types. However, at runtime, all generic type
information is removed, and the objects are treated as raw types. This allows
generics to maintain backward compatibility with older versions of Java but can
lead to surprising behavior when generic types are improperly handled.

Generics.java
  

void main() { 

    List&lt;String&gt; strings = new ArrayList&lt;&gt;();
    List&lt;Integer&gt; integers = new ArrayList&lt;&gt;();
    
    System.out.println(strings.getClass() == integers.getClass()); // true
    
    // strings.add(1); // Compile error
    addToList(strings, 1); // Runtime error only when accessing
    System.out.println(strings.get(0)); // ClassCastException
}

void addToList(List list, Object o) {

    list.add(o);
}

In the example above, the use of type erasure is highlighted in several
scenarios. First, two lists are created: one of type
List&lt;String&gt; and another of type
List&lt;Integer&gt;. At compile time, these lists are treated as
strongly typed collections that can only accept objects of their respective
types. However, because of type erasure, their runtime Class
representations are identical, leading to the equality check
strings.getClass() == integers.getClass() returning
true. This demonstrates that type information for generics is not
retained at runtime.

Another point of interest is the method addToList, which accepts a
raw List without type parameters. Using raw types bypasses the
compile-time type safety provided by generics, allowing objects of any type to
be added to the list. In this case, addToList(strings, 1)
successfully adds an integer to a list declared as
List&lt;String&gt;. This does not raise a compilation error because
raw types disable type checking.

However, when accessing the first element of the list with
strings.get(0), a ClassCastException occurs. This is
because the runtime type of the object (an Integer) does not match
the expected type (String), leading to an error when the object is
cast to String.

Type erasure is designed to ensure backward compatibility with pre-generics Java
code. While it provides compile-time type safety, it does not enforce type
constraints at runtime. Developers must be cautious when using raw types and
avoid bypassing generic type checks to prevent runtime errors such as
ClassCastException.

To avoid these issues, follow best practices for generics:

Always use parameterized types instead of raw types in your code. Avoid
methods or variables that use raw collections such as List without
specifying a generic type.

For methods that manipulate collections, consider using generics with proper
type parameters in the method signature. For example, redefine
addToList to use a type parameter:

void addToList(List&lt;T&gt; list, T item) { list.add(item); }

Test your generic code thoroughly to ensure it works as expected at runtime,
particularly when working with legacy code that might mix raw and parameterized
types.

Understanding the implications of type erasure and adhering to these best
practices can help you write safer, more reliable generic code in Java.

## Try-With-Resources Scope

The try-with-resources statement in Java simplifies resource management by
ensuring that resources implementing the AutoCloseable interface
are automatically closed after the try block, regardless of whether an exception
occurs. This eliminates the need for explicit finally blocks to
manage resources, making code more concise and robust. 

However, the scope of resources declared in a try-with-resources block is
limited to the try block itself, which can lead to compile-time errors when
attempting to access resources outside of their defined scope.

TryWithResources.java
  

class Resource implements AutoCloseable {
    void use() {
        System.out.println("Using resource");
    }

    @Override
    public void close() {
        System.out.println("Closing");
    }
}

void main(String[] args) {

    try (Resource r = new Resource()) {
        r.use();
        throw new RuntimeException("Problem");
    } catch (Exception e) {
        System.out.println("Caught: " + e.getMessage());
        // r.use(); // Compile error - r is out of scope
    }
}

In this example, the Resource class implements the
AutoCloseable interface, allowing it to be used with
try-with-resources. The use method performs some operation with
the resource, and the close method is automatically invoked at
the end of the try block to release the resource. When the try block throws a
RuntimeException, the resource is still closed before the exception
is passed to the catch block.

The scoping rules of try-with-resources are demonstrated by the line
r.use within the catch block, which causes a compile-time error.
This happens because the resource r is only accessible within the
try block where it is declared. After the try block ends, the resource is out of
scope, ensuring it cannot be misused or accessed unexpectedly. This scoping
mechanism prevents issues like accessing partially closed resources or
unintentionally leaking them.

Even if an exception occurs during the execution of the try block, the
close method is guaranteed to be called, making
try-with-resources particularly useful for handling resources such as files,
sockets, or database connections. This automatic cleanup mechanism ensures that
resources are consistently released without requiring additional code in a
finally block.

To avoid scoping issues, ensure that any operations involving the resource are
performed within the try block itself. If you need information from the resource
in the catch block, retrieve it and store it in a separate variable before the
resource goes out of scope. Understanding and adhering to these scoping rules
helps ensure proper resource management and reduces the risk of errors in your
programs.

## Optional Misuse

Java's Optional type was introduced to help developers avoid
null references and reduce the likelihood of
NullPointerException. While Optional provides elegant
ways to handle potentially absent values, it is often misused, leading to overly
complicated code or runtime inefficiencies. Proper understanding of
Optional's intended usage can help developers write clearer and
more efficient code.

Main.java
  

void main() {

    // Bad practices
    Optional&lt;String&gt; opt = Optional.ofNullable(getString());

    if (opt.isPresent()) {
        System.out.println(opt.get()); // Avoid .get()
    }

    // Better
    opt.ifPresent(System.out::println);

    // Worst
    Optional.ofNullable(getString())
            .orElse(computeExpensiveFallback()); // Evaluated eagerly!
}

String getString() {
    return null;
}

String computeExpensiveFallback() {
    
    System.out.println("Computing...");
    return "fallback";
}

The above code demonstrates several common mistakes and best practices for using
Optional. First, the bad practice involves calling
opt.get() after checking opt.isPresent().

While this pattern technically works, it is cumbersome and defeats the purpose
of Optional, which is meant to eliminate such manual checks.
Instead, Optional provides a functional approach with methods like
ifPresent, which allows you to specify behavior for when the value
is present without requiring additional checks.

A second issue arises from the use of orElse with an expensive
operation like computeExpensiveFallback. The orElse
method evaluates its fallback value eagerly, even if the Optional
contains a value and the fallback is not needed. This can lead to unnecessary
resource consumption and performance overhead. To address this,
orElseGet should be used instead, as it evaluates its fallback
value lazily only when the Optional is empty:

Optional.ofNullable(getString()) .orElseGet(() -&gt; computeExpensiveFallback());
// Lazily evaluated

Another common misuse of Optional is using it as a field or method
parameter. Optional is designed for return types to signal the
possible absence of a value. Using it in fields or parameters complicates the
code unnecessarily and goes against its intended purpose. Instead, design your
API to handle optional data appropriately, using null or overloaded
methods where needed.

Understanding these best practices can help you leverage Optional
effectively:

Avoid calling get directly. Use methods like
ifPresent, orElse, or orElseGet to handle
values safely.

Use orElseGet instead of orElse for expensive
fallback computations to avoid unnecessary evaluations.

Limit Optional to return types only. Avoid using it for fields
or method parameters, as it adds unnecessary complexity.

By following these guidelines, developers can make better use of
Optional, reducing complexity and improving the readability and
efficiency of their code.

## Source

[Java Language Specification](https://docs.oracle.com/javase/specs/)

This tutorial covered common Java pitfalls and corner cases that developers
should be aware of.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java](/all/#java) tutorials.