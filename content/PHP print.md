+++
title = 'PHP `print` 🖨️'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "PHP print for beginners and professionals with examples, php file, php session, php date, php array, php form, functions, time, xml, ajax, php mysql, regex, string, oop"
keywords = "php, tutorial, example, file, session, date, array, functions, time, xml, ajax, mysql, mysql, regex, string, oop"
image = "/images/clean-code-s.webp"
imageBig = "/images/clean-code-b.webp"
categories = ["PHP"]
authors = ["Admin"]
avatar = "/images/avatar.webp"

+++
Like **PHP `echo`**, **PHP `print`** is a **language construct**. You **don't need to use parentheses** with it, though you can use them if you prefer.

### Syntax of PHP `print`:
```phtml
int print(string $arg)
```

The `print` statement can be used to print strings, multi-line strings, escape characters, variables, arrays, etc. Here are some important points to know:

- `print` is a **statement**, often used as an alternative to `echo` for displaying output.
- `print` can be used **with or without parentheses**: `print` and `print()`.
- **`print` always returns an integer value**, specifically **1**.
- With `print`, you **cannot pass multiple arguments** (unlike `echo`).
- `print` is **slower** than `echo`. 🐢

---

### PHP `print`: Printing a String 📝

File: `print1.php`

```phtml
<?php  
print "Hello by PHP print ";  
print ("Hello by PHP print()");  
?>  
```

**Output:**

```html
Hello by PHP print Hello by PHP print()
```

Both `print` and `print()` can be used without any difference in behavior. ✅

---

### PHP `print`: Printing a Multi-line String 📃

File: `print2.php`

```phtml
<?php  
print "Hello by PHP print  
this is multi line  
text printed by   
PHP print statement  
";  
?>  
```

**Output:**

```html
Hello by PHP print this is multi line text printed by PHP print statement
```

Just like `echo`, `print` ignores newlines in the code, printing everything on a single line. 😆

---

### PHP `print`: Printing Escape Characters 🧳

File: `print3.php`

```phtml
<?php  
print "Hello escape \"sequence\" characters by PHP print";  
?>  
```

**Output:**

```html
Hello escape "sequence" characters by PHP print
```

The escape character `\"` lets you print the double quotes `"` inside the string. 🎯

---

### PHP `print`: Printing Variable Values 🏷️

File: `print4.php`

```phtml
<?php  
$msg = "Hello print() in PHP";  
print "Message is: $msg";    
?>  
```

**Output:**

```html
Message is: Hello print() in PHP
```

This shows how `print` can be used to display the value of a variable, just like `echo`. 🎉

---

### Key Differences Between `echo` and `print` 🥇
- **Multiple Arguments**: `echo` allows multiple arguments, while `print` can only handle one argument.
- **Return Value**: `print` always returns **1**, while `echo` does not return any value.
- **Performance**: `echo` is faster than `print`, making it a better choice for larger outputs.
