+++
title = "HTML Form Types"
date = 2025-08-29T19:57:53.089+01:00
draft = false
description = "HTML Form Types tutorial shows how to create different structural forms in HTML with PHP backend processing, including basic, multi-input, file upload, and more."
image = ""
imageBig = ""
categories = ["html"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# HTML Form Types

last modified March 3, 2025 

HTML Form Types tutorial shows how to create different structural forms in HTML
with simple PHP backend processing using filter_input for sanitization,
including basic, multi-input, file upload, and more.

## HTML Forms

HTML Forms are used to collect user input and send it to a server for
processing. Combined with PHP, forms enable dynamic web applications.

Forms can be structured in various ways depending on the data being collected.
This tutorial covers different form types with PHP scripts using
filter_input to handle submissions.

## HTML Form Types Examples

In the following examples, we explore different form structures with sample PHP
backends. Basic CSS is included in the head for consistent styling. Save each
PHP script in a file (e.g., process.php) in your server directory
to test.

### 1. Basic Text Form

A simple form with a single text input, processed via POST.

HTML: Basic Text Form
  

&lt;form action="process_basic.php" method="post"&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML code defines a basic form with a single text input for a name. The
form uses the POST method to send data to process_basic.php when
the submit button is clicked.

PHP: process_basic.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($name) {
        echo "Hello, $name!";
    } else {
        echo "Invalid input!";
    }
}

This PHP script checks for a POST request, sanitizes the "name" input using
filter_input with FILTER_SANITIZE_SPECIAL_CHARS, and
echoes a greeting if valid, or an error if not.

### 2. Multi-Input Form

A form with multiple input types (text, email, number).

HTML: Multi-Input Form
  

&lt;form action="process_multi.php" method="post"&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name"&gt;
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email"&gt;
    &lt;label for="age"&gt;Age:&lt;/label&gt;
    &lt;input type="number" id="age" name="age"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form collects three pieces of data—name, email, and age—using
different input types. It sends the data to process_multi.php for
processing upon submission.

PHP: process_multi.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
    $age = filter_input(INPUT_POST, 'age', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($name &amp;&amp; $email &amp;&amp; $age) {
        echo "Name: $name, Email: $email, Age: $age";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the name, email, and age inputs using
filter_input, checks if all are present, and displays them if
valid, otherwise shows an error message.

### 3. Form with Select Dropdown

A form with a dropdown menu using &lt;select&gt;.

HTML: Select Form
  

&lt;form action="process_select.php" method="post"&gt;
    &lt;label for="fruit"&gt;Favorite Fruit:&lt;/label&gt;
    &lt;select id="fruit" name="fruit"&gt;
        &lt;option value="apple"&gt;Apple&lt;/option&gt;
        &lt;option value="banana"&gt;Banana&lt;/option&gt;
        &lt;option value="orange"&gt;Orange&lt;/option&gt;
        &lt;option value="grape"&gt;Grape&lt;/option&gt;
    &lt;/select&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form uses a &lt;select&gt; element to offer a dropdown list of
fruits. The selected value is sent to process_select.php when
submitted.

PHP: process_select.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fruit = filter_input(INPUT_POST, 'fruit', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($fruit) {
        echo "You chose: $fruit";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the selected fruit using filter_input,
verifies it's present, and echoes the choice if valid, or an error if not.

### 4. Form with Radio Buttons

A form with radio buttons for single-choice selection.

HTML: Radio Button Form
  

&lt;form action="process_radio.php" method="post"&gt;
    &lt;label&gt;Gender:&lt;/label&gt;
    &lt;input type="radio" id="male" name="gender" value="male"&gt;
    &lt;label for="male"&gt;Male&lt;/label&gt;
    &lt;input type="radio" id="female" name="gender" value="female"&gt;
    &lt;label for="female"&gt;Female&lt;/label&gt;
    &lt;input type="radio" id="other" name="gender" value="other"&gt;
    &lt;label for="other"&gt;Other&lt;/label&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form uses radio buttons to let users select one gender option. The
shared name="gender" ensures only one choice is submitted to
process_radio.php.

PHP: process_radio.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($gender) {
        echo "Gender selected: $gender";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the gender selection with filter_input,
checks its presence, and displays it if valid, or an error if no option is
selected.

### 5. Form with Checkboxes

A form with checkboxes for multiple-choice selection.

HTML: Checkbox Form
  

&lt;form action="process_checkbox.php" method="post"&gt;
    &lt;label&gt;Hobbies:&lt;/label&gt;
    &lt;input type="checkbox" id="reading" name="hobbies[]" value="reading"&gt;
    &lt;label for="reading"&gt;Reading&lt;/label&gt;
    &lt;input type="checkbox" id="gaming" name="hobbies[]" value="gaming"&gt;
    &lt;label for="gaming"&gt;Gaming&lt;/label&gt;
    &lt;input type="checkbox" id="sports" name="hobbies[]" value="sports"&gt;
    &lt;label for="sports"&gt;Sports&lt;/label&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form uses checkboxes with name="hobbies[]" to allow
multiple selections, sent as an array to process_checkbox.php for
processing.

PHP: process_checkbox.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $hobbies = filter_input_array(INPUT_POST, ['hobbies' =&gt; FILTER_SANITIZE_SPECIAL_CHARS])['hobbies'] ?? [];
    if ($hobbies) {
        echo "Selected hobbies: " . implode(", ", $hobbies);
    } else {
        echo "No hobbies selected!";
    }
}

This PHP script uses filter_input_array to sanitize the hobbies
array, checks if any are selected, and joins them into a string if present, or
shows a message if none are chosen.

### 6. Textarea Form

A form with a &lt;textarea&gt; for longer text input.

HTML: Textarea Form
  

&lt;form action="process_textarea.php" method="post"&gt;
    &lt;label for="message"&gt;Message:&lt;/label&gt;
    &lt;textarea id="message" name="message" rows="4" cols="50"&gt;&lt;/textarea&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form includes a &lt;textarea&gt; for multi-line text input,
sized with rows and columns attributes, sending the message to
process_textarea.php.

PHP: process_textarea.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($message) {
        echo "Your message: $message";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the message input with filter_input,
checks its presence, and echoes it if valid, or displays an error if empty or
invalid.

### 7. File Upload Form

A form for uploading files, requiring enctype="multipart/form-data".

HTML: File Upload Form
  

&lt;form action="process_file.php" method="post" enctype="multipart/form-data"&gt;
    &lt;label for="file"&gt;Upload File:&lt;/label&gt;
    &lt;input type="file" id="file" name="file"&gt;
    &lt;button type="submit"&gt;Upload&lt;/button&gt;
&lt;/form&gt;

This HTML form uses a file input and enctype="multipart/form-data"
to handle file uploads, sending the file to process_file.php for
server-side processing.

PHP: process_file.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST" &amp;&amp; isset($_FILES["file"])) {
    $fileName = filter_var($_FILES["file"]["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $fileTmp = $_FILES["file"]["tmp_name"];
    if ($fileName &amp;&amp; move_uploaded_file($fileTmp, "uploads/$fileName")) {
        echo "File uploaded: $fileName";
    } else {
        echo "Upload failed!";
    }
}

This PHP script checks for a file in the POST request, sanitizes the filename
with filter_var, moves it to an "uploads" directory if valid, and
reports success or failure.

### 8. Form with Validation

A form with HTML5 validation attributes (e.g., required).

HTML: Validation Form
  

&lt;form action="process_validation.php" method="post"&gt;
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email" required&gt;
    &lt;label for="phone"&gt;Phone:&lt;/label&gt;
    &lt;input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form enforces validation with required and a phone number
pattern, ensuring correct input before submission to
process_validation.php.

PHP: process_validation.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($email &amp;&amp; $phone) {
        echo "Email: $email, Phone: $phone";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the email and phone inputs with
filter_input, checks their presence post-validation, and displays
them if valid, or an error if not.

### 9. Multi-Step Form (Simplified)

A simplified multi-step form using separate sections (full functionality requires JS).

HTML: Multi-Step Form
  

&lt;form action="process_multistep.php" method="post"&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;Step 1: Personal Info&lt;/legend&gt;
        &lt;label for="name"&gt;Name:&lt;/label&gt;
        &lt;input type="text" id="name" name="name"&gt;
    &lt;/fieldset&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;Step 2: Contact Info&lt;/legend&gt;
        &lt;label for="email"&gt;Email:&lt;/label&gt;
        &lt;input type="email" id="email" name="email"&gt;
    &lt;/fieldset&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form uses &lt;fieldset&gt; tags to group inputs into steps,
though it submits all at once here, sending data to
process_multistep.php.

PHP: process_multistep.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($name &amp;&amp; $email) {
        echo "Name: $name, Email: $email";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the name and email with filter_input,
ensures both are present, and displays them if valid, or an error if either is
missing.

### 10. Form with Hidden Fields

A form with hidden fields for passing data silently.

HTML: Hidden Field Form
  

&lt;form action="process_hidden.php" method="post"&gt;
    &lt;input type="hidden" name="user_id" value="123"&gt;
    &lt;label for="comment"&gt;Comment:&lt;/label&gt;
    &lt;input type="text" id="comment" name="comment"&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

This HTML form includes a hidden input to send a user ID alongside a visible
comment field, submitted to process_hidden.php without user
interaction with the hidden field.

PHP: process_hidden.php
  

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_SPECIAL_CHARS);
    $comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_SPECIAL_CHARS);
    if ($user_id &amp;&amp; $comment) {
        echo "User ID: $user_id, Comment: $comment";
    } else {
        echo "Invalid input!";
    }
}

This PHP script sanitizes the user ID and comment with
filter_input, checks both are present, and displays them if valid,
or an error if either is missing.

In this tutorial, we have explored various structural forms of HTML forms with
PHP backend processing using filter_input for sanitization,
demonstrating how to collect and handle user input.

List [all HTML tutorials](/all/#html).