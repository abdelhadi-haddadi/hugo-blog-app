+++
title = 'How to run PHP code in XAMPP 🚀'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "PHP Example for beginners and professionals with examples, php file, php session, php date, php array, php form, functions, time, xml, ajax, php mysql, regex, string, oop"
keywords = "php, tutorial, example, file, session, date, array, functions, time, xml, ajax, mysql, mysql, regex, string, oop"
image = "/images/clean-code-s.webp"
imageBig = "/images/clean-code-b.webp"
categories = ["PHP"]
authors = ["Admin"]
avatar = "/images/avatar.webp"

+++
Generally, a PHP file contains HTML tags and some PHP scripting code. It's easy to create a simple PHP example. Just create a file, write HTML tags + PHP code, and save it with a `.php` extension. 💻

**Note**: PHP statements end with a semicolon (`;`).  
All PHP code goes between the PHP tag: `<?php` (start) and `?>` (end).

### PHP Tag Syntax:
```php
<?php
    // your code here  
?>
```

### Example: Simple PHP Program 👨‍💻

File: `first.php`

```html
<!DOCTYPE html>  
<html>  
<body>  
<?php  
echo "<h2>Hello First PHP</h2>";  
?>  
</body>  
</html>
```

**Output:**
```html
Hello First PHP
```

---

### How to run PHP programs in XAMPP ⚙️

PHP is a popular backend programming language. You can write PHP programs in any text editor like Notepad, Notepad++, Dreamweaver, etc., and save them with a `.php` extension (e.g., `filename.php`) inside the `htdocs` folder in XAMPP.

For example: `p1.php`.

#### Directory Example:
If you're using Windows and have XAMPP installed on your D drive, the path for the `htdocs` directory will be:  
`D:\xampp\htdocs`.

PHP programs run in a web browser like Chrome, Internet Explorer, Firefox, etc. Below are the steps to run a PHP program.

---

### Steps to Run PHP Code in XAMPP:

#### Step 1: Create a Simple PHP Program like "Hello World!"
```php
<?php      
    echo "Hello World!";  
?>  
```

#### Step 2: Save the file as `hello.php` in the `htdocs` folder (inside the XAMPP folder).

**Note**: Make sure the PHP program is saved in the `htdocs` folder; otherwise, you'll get an error: **Object Not Found**.

#### Step 3: Run the XAMPP Server 🚀 and start Apache and MySQL.

#### Step 4: Open the web browser and type `http://localhost/hello.php` in the browser window.

#### Step 5: The output will display as:

```html
Hello World!
```

---

### Running PHP Code in XAMPP 🖥️

Most of the time, PHP programs run as a web server module. However, PHP can also be executed via the Command Line Interface (CLI).

---

### PHP Case Sensitivity 🔠

In PHP:
- **Keywords** (e.g., `echo`, `if`, `else`, `while`), **functions**, and **user-defined functions** are **NOT case-sensitive**.
- **Variable names** are **case-sensitive**.

#### Example 1: Case-Insensitive Keywords and Functions:

```html
<!DOCTYPE html>  
<html>  
    <body>  
        <?php  
            echo "Hello world using echo </br>";  
            ECHO "Hello world using ECHO </br>";  
            EcHo "Hello world using EcHo </br>";  
        ?>  
    </body>  
</html>
```

**Output:**

```html
Hello world using echo
Hello world using ECHO
Hello world using EcHo
```

#### Example 2: Case-Sensitive Variables:

```html
<html>  
    <body>  
        <?php  
            $color = "black";  
            echo "My car is ". $ColoR ."</br>";  
            echo "My dog is ". $color ."</br>";  
            echo "My Phone is ". $COLOR ."</br>";  
        ?>  
    </body>  
</html>
```

**Output:**

```html
Notice: Undefined variable: ColoR in D:\xampp\htdocs\program\p2.php on line 8
My car is
My dog is black

Notice: Undefined variable: COLOR in D:\xampp\htdocs\program\p2.php on line 10
My Phone is
```

*Only the `$color` variable printed its value, while `$ColoR` and `$COLOR` were treated as undefined variables.* 🚨

---

That's it! Now you're ready to create and run PHP code in XAMPP! 😎
