+++
title = 'PHP `echo` 📢'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "PHP Echo for beginners and professionals with examples, php file, php session, php date, php array, php form, functions, time, xml, ajax, php mysql, regex, string, oop"
keywords = "php, tutorial, example, file, session, date, array, functions, time, xml, ajax, mysql, mysql, regex, string, oop"
image = "/images/clean-code-s.webp"
imageBig = "/images/clean-code-b.webp"
categories = ["PHP"]
authors = ["Admin"]
avatar = "/images/avatar.webp"

+++
PHP `echo` is a **language construct**, not a function. This means you **don’t need to use parentheses** with it, though if you want to use multiple parameters, parentheses are required.

### Syntax of PHP `echo`:
```php
void echo ( string $arg1 [, string $... ] )
```

The `echo` statement is used to **print** strings, multi-line strings, escape characters, variables, arrays, etc. Here are some important things you should know about it:

- `echo` is a **statement**, used to display output.
- You can use `echo` **with or without parentheses**: `echo()` and `echo`.
- `echo` **does not return any value**.
- You can pass multiple strings separated by a **comma** (`,`).
- `echo` is **faster** than the `print` statement. ⚡

---

### PHP `echo`: Printing a String 📝

File: `echo1.php`

```php
<?php  
echo "Hello by PHP echo";  
?>  
```

**Output:**

```html
Hello by PHP echo
```

---

### PHP `echo`: Printing a Multi-line String 📃

File: `echo2.php`

```php
<?php  
echo "Hello by PHP echo  
this is multi line  
text printed by   
PHP echo statement  
";  
?>  
```

**Output:**

```html
Hello by PHP echo this is multi line text printed by PHP echo statement
```

Notice how the newlines in the code are ignored by the `echo` statement, and the entire content is printed on a single line. 😅

---

### PHP `echo`: Printing Escape Characters 🧳

File: `echo3.php`

```php
<?php  
echo "Hello escape \"sequence\" characters";  
?>  
```

**Output:**

```html
Hello escape "sequence" characters
```

The escape character `\"` allows you to print the double quotes `"` inside the string. 🎯

---

### PHP `echo`: Printing Variable Values 🏷️

File: `echo4.php`

```php
<?php  
$msg = "Hello JavaTpoint PHP";  
echo "Message is: $msg";    
?>  
```

**Output:**

```html
Message is: Hello JavaTpoint PHP
```

This example demonstrates how `echo` prints the value of a variable. In this case, it outputs the content of the `$msg` variable. 🤖

