+++
title = "PHP string"
date = 2025-08-29T20:04:46.073+01:00
draft = false
description = "PHP string tutorial shows how to work with strings in PHP. A string is series of characters, where a character is the same as a byte."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP string

last modified February 16, 2025

In this part of the PHP programming tutorial, we work with string data in more
detail.

A string is series of characters, where a character is the same as a byte.

PHP only supports a 256-character set; it does not offer native Unicode support.

## PHP string literal

A *string literal* is the notation for representing a string value within
the text of a computer program. In PHP, strings can be created with single
quotes, double quotes or using the heredoc or the nowdoc syntax.

literals.php
  

&lt;?php

$a = "PHP";
$b = 'PERL';

echo $a, $b;

In this code example, we create two strings and assign them to $a
and $b variables. We print them with the echo keyword.
The first string is created with the double quote delimiters, the second one
with single quotes.

## PHP string heredoc

The heredoc preserves the line breaks and other whitespace (including
indentation) in the text. The heredoc is created with &lt;&lt;&lt;
followed by a delimiting identifier, followed, starting on the next line, by the
text to be quoted, and then closed by the same identifier on its own line.

The closing identifier must not be indented. It can only contain alphanumeric
characters and underscores, and must start with a non-digit character or
underscore.

heredoc.php
  

&lt;?php

$str = &lt;&lt;&lt;TEXT
"That is just as I intended." Vautrin said. "You know quite well what
you are about. Good, my little eaglet! You are born to command, you
are strong, you stand firm on your feet, you are game! I respect you."
TEXT;

echo $str, "\n";

The example prints an example of a direct speech.

$ php heredoc.php
"That is just as I intended." Vautrin said. "You know quite well what
you are about. Good, my little eaglet! You are born to command, you
are strong, you stand firm on your feet, you are game! I respect you."

## PHP string nowdoc

A nowdoc is specified similarly to a heredoc, but no parsing is done
inside a nowdoc. A nowdoc is identified with the same &lt;&lt;&lt;
sequence used for heredocs, but the identifier which follows is enclosed
in single quotes, e.g. &lt;&lt;&lt;'TEXT'.

nowdoc.php
  

&lt;?php

$str = &lt;&lt;&lt;'TEXT'
Fear is among the greatest obstacles which prevent us from enjoying life
to its fullest extent. Since of the most commonly held fears among
people are the fear of heights and the fear of falling from heights.
Rock climbing is a fantastic way to conquer these fears.
TEXT;

echo $str, "\n";

The example prints three sentences using the nowdoc syntax.

$ php nowdoc.php
Fear is among the greatest obstacles which prevent us from enjoying life
to its fullest extent. Since of the most commonly held fears among
people are the fear of heights and the fear of falling from heights.
Rock climbing is a fantastic way to conquer these fears.

## PHP string interpolation

Variables are interpolated in strings enclosed by double quotes.

interpolation.php
  

&lt;?php

$quantity = 5;

echo "There are $quantity roses in the vase\n";

The $quantity variable is replaced with its value in the string
output.

$ php interpolation.php
There are 5 roses in the vase

Curly braces can be used when the variable name is next to another character.

curly_braces.php
  

&lt;?php

$quantity = 5;
$item_name = "rose";

echo "There are $quantity {$item_name}s in the vase\n";

Without the curly braces, the PHP interpreter would look for the $item_names
variable, which does not exist.

$ php curly_braces.php
There are 5 roses in the vase

## PHP string concatenation

PHP uses the dot . operator to concatenate strings.

php &gt; echo "PHP " . "language\n";
PHP language

The example concatenates two strings.

php &gt; $a = "Java ";
php &gt; $a .= "language\n";
php &gt; echo $a;
Java language

PHP also supports the .= compound operator.

## PHP escape characters

An *escape character* is a single character designated to invoke an
alternative interpretation on immediately subsequent characters in a character
sequence.

php&gt; echo "   bbb\raaa";
aaabbb

The carriage return \r is a control character for end of line return
to the beginning of line.

strophe.php
  

&lt;?php
echo "Incompatible, it don't matter though\n'cos someone's bound to hear my cry\n";
echo "Speak out if you do\nYou're not easy to find\n";

The new line is a control characters which begins a new line of text.

$ php strophe.php
Incompatible, it don't matter though
'cos someone's bound to hear my cry
Speak out if you do
You're not easy to find

```
php&gt; echo "Towering\tinferno\n";
Towering        inferno

```

The horizontal tab puts a space between text.

"Johnie's dog"
'Johnie\'s dog'

Single and double quotes can be nested. Or in case we use only single quotes, we
can use the backslash to escape the default meaning of a single quote.

backslash.php
  

&lt;?php

$text = "
\"That is just as I intended.\" Vautrin said. \"You know quite well what
you are about. Good, my little eaglet! You are born to command, you
are strong, you stand firm on your feet, you are game! I respect you.\"
";

echo $text;

In this example, we have a multiline text, which includes direct speech. The
double quotes are escaped with the backslash character.

php&gt; $var = 233;
php&gt; echo "$var";
233
php&gt; echo "\$var is $var";
$var is 233

The dollar sign $ has also a special meaning in PHP; it denotes a
variable. If a variable is used inside a string, it is interpolated, i.e. the
value of the variable is used. To echo a variable name, we escape the
$ character \$.

## PHP string functions

PHP has a large number of useful useful built-in functions that can be used for
working with strings.

echo strlen("Eagle"); # prints 5
echo strtoupper("Eagle"); # prints EAGLE
echo strtolower("Eagle"); # prints eagle

Here we use three functions. The strlen function returns a number
of characters in the string. The strtoupper converts characters to
uppercase letters, and the strtolower converts characters to
lowercase letters.

letters.php
  

&lt;?php

$sentence = "There are 22 apples";

$alphas = 0;
$digits = 0;
$spaces = 0;

$length = strlen($sentence);

for ($i = 0; $i &lt; $length; $i++) {

    $c = $sentence[$i];
    if (ctype_alpha($c)) $alphas++;
    if (ctype_digit($c)) $digits++;
    if (ctype_space($c)) $spaces++;

}

echo "There are $length characters.\n";
echo "There are $alphas alphabetic characters.\n";
echo "There are $digits digits.\n";
echo "There are $spaces spaces.\n";

In our example, we have a string sentence. We calculate the absolute number of
characters, number of alphabetic characters, digits and spaces in the sentence.
To do this, we use the following functions: strlen,
ctype_alpha, ctype_digit, and
ctype_space.

$ php letters.php
There are 19 characters.
There are 14 alphabetic characters.
There are 2 digits.
There are 3 spaces.

Next, we cover the substr function.

echo substr("PHP language", 0, 3); # prints PHP
echo substr("PHP language", -8); # prints language

The function returns a part of a string. The first parameter is the specified
string. The second parameter is the start of the substring. The third parameter
is optional. It is the length of the returned substring. The default is to the
return until the end of the string.

The str_repeat function repeats a string a specified number of
times.

repeat.php
  

&lt;?php

echo str_repeat("#", 18);
echo "\nProject Neurea\n";
echo "Priority high\n";
echo "Security maximum\n";
echo str_repeat("#", 18);
echo "\n";

We use the str_repeat function to create two lines of the
# character.

$ php repeat.php
##################
Project Neurea
Priority high
Security maximum
##################

In the next example, we randomly modify a string.

shuffling.php
  

&lt;?php

$string = "ZetCode";

echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";
echo str_shuffle($string), "\n";

The str_shuffle randomly shuffles a string.

$ php shuffling.php
ZtCeoed
eodtCZe
toZeeCd
oCdeteZ
edtCZoe
tdeCeoZ
oeZdteC

This is a sample output of the shuffling.php script.

The explode function is used to split a string into parts. It
returns an array of split string parts. The implode function 
joins array elements with a string.

expl_impl.php
  

&lt;?php

$nums = "1,2,3,4,5,6,7,8,9,10,11";

$vals = explode(",", $nums);
$len = count($vals);

echo "There are $len numbers in the string\n";

$nums2 = implode(',', $vals);

echo $nums2 . "\n";

We have integers within a string separated by comma character. We count the
number of integers.

$vals = explode(",", $nums);

Here we split the text with the explode function. The function will
cut a string into pieces whenever it finds the dot , character.

$ php expl_impl.php
There are 11 numbers in the string
1,2,3,4,5,6,7,8,9,10,11

teams1.php
  

```
&lt;?php

echo "Ajax Amsterdam" . " - " . "Inter Milano " . "2:3\n";
echo "Real Madridi" . " - " . "AC Milano " . "3:3\n";
echo "Dortmund" . " - " . "Sparta Praha ". "2:1\n";

```

We concatenate strings with the dot operator.

$ php teams1.php
Ajax Amsterdam - Inter Milano 2:3
Real Madridi - AC Milano 3:3
Dortmund - Sparta Praha 2:1

The output is not optimal. We will change it so that it looks neater.

teams2.php
  

&lt;?php

$teams = array(
      array("Ajax Amsterdam", "Inter Milano"),
      array("Real Madrid", "AC Milano"),
      array("Dortmund", "Sparta Praha")
);

$results = array("2:3", "3:3", "2:1");

$i = 0;

foreach ($teams as $team) {
    echo str_pad($team[0], 14);
    echo str_pad("-", 3, " ", STR_PAD_BOTH);
    echo str_pad($team[1], 14);
    echo str_pad($results[$i], 3, " ", STR_PAD_LEFT);
    echo "\n";
    $i++;
}

We improve the output format with the str_pad function. It adds a
specified string (in our case a space) to the left of the string, to the right
or to both sides.

$ php teams2.php
Ajax Amsterdam - Inter Milano  2:3
Real Madrid    - AC Milano     3:3
Dortmund       - Sparta Praha  2:1

We manage to give a nicer formatted output.

## PHP array of chars

A string in PHP is an array of chars.

array_of_chars.php
  

&lt;?php

$site = "zetcode.com";

for ($i=0; $i &lt; strlen($site); $i++) {
    $o = ord($site[$i]);
    echo "$site[$i] has ASCII code $o\n";
}

In the example, we iterate through a string and print each character's ASCII
code.

$site = "zetcode.com";

A string is defined. It contains eleven characters.

for ($i=0; $i &lt; strlen($site); $i++) {
    $o = ord($site[$i]);
    echo "$site[$i] has ASCII code $o\n";
}

We iterate through the string with the for loop. The size of the string is
determined with the strlen function. The ord function
returns the ASCII value of a character. We use the array index notation to get a
character.

$ php array_of_chars.php
z has ASCII code 122
e has ASCII code 101
t has ASCII code 116
c has ASCII code 99
o has ASCII code 111
d has ASCII code 100
e has ASCII code 101
. has ASCII code 46
c has ASCII code 99
o has ASCII code 111
m has ASCII code 109

## PHP string formatting

String formatting or string interpolation is dynamic putting of various values
into a string.

fruits.php
  

&lt;?php

printf("There are %d oranges and %d apples in the basket.\n", 12, 32);

We use the %d formatting specifier. The specifier expects an
integer value to be passed.

$ php fruits.php
There are 12 oranges and 32 apples in the basket.

In the next example, we pass a float and a string value.

height.php
  

&lt;?php

printf("Height: %f %s\n", 172.3, "cm");

The formatting specifier for a float value is %f and for
a string %s.

$ php height.php
Height: 172.300000 cm

We might not like the fact that the number in the previous example has 6 decimal
places by default. We can control the number of the decimal places in the
formatting specifier.

height2.php
  

&lt;?php

printf("Height: %.1f %s\n", 172.3, 'cm');

The decimal point followed by an integer controls the number of decimal places.
In our case, the number has exactly one decimal place.

$ php height2.php
Height: 172.3 cm

The following example shows other formatting options.

formatting.php
  

&lt;?php

# hexadecimal
printf("%x\n", 300);

# octal
printf("%o\n", 300);

# binary
printf("%b\n", 300);

# scientific
printf("%e\n", 300000);

The first format works with hexadecimal numbers. The x character
formats the number in hexadecimal notation. The o character shows
the number in octal format. The e character shows the number in
scientific format.

$ php formatting.php
12c
454
100101100
3.000000e+5

The next example prints three columns of numbers.

columns.php
  

&lt;?php

foreach (range(1,11) as $num) {
    echo $num , " ", $num*$num, " ",
         $num*$num*$num, "\n";
}

The numbers are left justified and the output is not neat.

$ php columns.php
1 1 1
2 4 8
3 9 27
4 16 64
5 25 125
6 36 216
7 49 343
8 64 512
9 81 729
10 100 1000
11 121 1331

To correct this, we use the width specifier. The width specifier defines the
minimal width of the object. If the object is smaller than the width, it is
filled with spaces.

columns2.php
  

&lt;?php

foreach (range(1,11) as $num) {
    printf("%2d %3d %4d\n", $num, $num*$num, $num*$num*$num);
}

Now the output looks OK. Number 2 says that the first column will be 2
characters wide.

$ php columns2.php
 1   1    1
 2   4    8
 3   9   27
 4  16   64
 5  25  125
 6  36  216
 7  49  343
 8  64  512
 9  81  729
10 100 1000
11 121 1331

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have covered PHP strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.