+++
title = "PHP Faker"
date = 2025-08-29T20:04:20.847+01:00
draft = false
description = "PHP Faker tutorial shows how to generate fake data in PHP with Faker package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Faker

last modified February 16, 2025

PHP Faker tutorial shows how to generate fake data in PHP with Faker package.
We use the fzaninotto/Faker package.

## PHP Faker

Faker is a PHP library that generates fake data. Faka data is often used 
for testing or filling databases with some dummy data. Faker is heavily inspired by 
Perl's Data::Faker, and by Ruby's Faker.

## PHP Faker setup

The package is installed with composer.

$ composer req fzaninotto/faker 

We install the fzaninotto/faker package.

$ composer req symfony/var-dumper

In addition, we install the Symfony Dumper, which provides nicer console 
output when dumping variables.

## Faker factory

With Faker\Factory::create we create and initialize a faker generator.
On the generator, we access the generator properties (called formatters) to generate 
fake data. Internally, Faker delegates the data generation to providers.

The default provider uses the English locale. Faker supports other locales; they differ 
in level of completion.

## Simple Faker example

The following example is a simple demonstration of Faker.

simple.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;name . "\n";
echo $faker-&gt;address . "\n";

The example outputs a fake name and address.

$ php simple.php
Antonia Hahn
355 Mills Light Apt. 722
Krajcikburgh, RI 36330

## Faking names

In the second example, we fake data related to user names.

names.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;name() . "\n";
echo $faker-&gt;name('male') . "\n";
echo $faker-&gt;name('female') . "\n";

echo $faker-&gt;firstName() . "\n";
echo $faker-&gt;firstName($gender='male') . "\n";
echo $faker-&gt;firstName($gender='female') . "\n";

echo $faker-&gt;firstNameMale('female') . "\n";
echo $faker-&gt;firstNameFemale('female') . "\n";

echo $faker-&gt;lastName() . "\n";

The example creates fake full names, first names, last names of males and 
females.

$ php names.php
Darion Walker
Prof. Chet Kessler
Prof. Jaida Greenholt PhD
Cristopher
Reid
Gilda
Wiley
Juanita
Jones

## Faking locale data

The Faker supports localized data to some extent. 
The locale is passed to the factory create method.
Note that the locales are finished to various levels.

localized.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create('sk_SK');

for ($i = 0; $i &lt; 3; $i++) {

    $name = $faker-&gt;name;
    $city = $faker-&gt;cityName;
    $phone = $faker-&gt;phoneNumber;

    echo "$name, $city, $phone\n";
}

The example generates fake data in Slovak language.

$ php localized.php
RNDr. Kvetoslava Zelenayová DSc., Malé Dvorníky, 00421 742 587 664
Agáta Molnárová, Čabalovce, +421 857 627 309
PhDr. Igor Truben, Mokrá Lúka, 00421577302978

This is a sample output. Notice that Slovak language has accents.

## Faking titles

The following example creates fake data for titles.
Faker generates academic and personal titles.

titles.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;title() . "\n";
echo $faker-&gt;title('male'). "\n";
echo $faker-&gt;title('female'). "\n";

echo $faker-&gt;titleMale . "\n";
echo $faker-&gt;titleFemale . "\n"; 
echo $faker-&gt;suffix . "\n"; 

The program generates fake titles for males and females.

$ php titles.php
Ms.
Dr.
Miss
Prof.
Mrs.
DDS

## Faking colours

Faker can create colour names or different colour formats, such as hexadecimal and 
RGB. 

colours.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;hexcolor . "\n";
echo $faker-&gt;rgbcolor . "\n";
dump($faker-&gt;rgbColorAsArray);
echo $faker-&gt;rgbCssColor . "\n";
echo $faker-&gt;safeColorName . "\n";
echo $faker-&gt;colorName . "\n";

The example shows how to create colours with Faker.

$ php colours.php
#662d69
180,149,135
array:3 [
  0 =&gt; 190
  1 =&gt; 115
  2 =&gt; 170
]
rgb(119,164,223)
aqua
LightGreen
DarkGray

## Faking numbers

The Faker allows to generate random digits, integers, or
floating point values.

numbers.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;randomDigit . "\n";
echo $faker-&gt;randomDigitNotNull . "\n"; 

echo $faker-&gt;randomNumber() . "\n";
echo $faker-&gt;randomNumber($nbDigits = 3, $strict = true) . "\n";

echo $faker-&gt;randomFloat() . "\n";
echo $faker-&gt;randomFloat($nbMaxDecimals = 5, $min = 0, $max = 20) . "\n";
echo $faker-&gt;numberBetween($min = 1500, $max = 6000) . "\n";

dump($faker-&gt;shuffle([1, 2, 3, 4, 5, 6]));

The example generates random digits, integers, and floats. It also randomly shuffles 
array values.

$ php numbers.php
6
6
3654715
614
4164
12.29093
2347
array:6 [
  0 =&gt; 3
  1 =&gt; 6
  2 =&gt; 2
  3 =&gt; 5
  4 =&gt; 1
  5 =&gt; 4
]

## Faking unique values

With unique modifier, we can produce unique fake values.

unique_values.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

$vals = [];

for ($i = 0; $i &lt; 6; $i++) {
    
  $vals[] = $faker-&gt;unique()-&gt;randomDigit;
}

dump($vals); 

The example generates an array containing six unique digits.

$ php unique_values.php
array:6 [
  0 =&gt; 0
  1 =&gt; 6
  2 =&gt; 9
  3 =&gt; 1
  4 =&gt; 5
  5 =&gt; 3
]

## Faking optional values

With optional modifier, we can produce optional fake values.
Optional values can be null.

optional_values.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

$vals = [];

for ($i = 0; $i &lt; 6; $i++) {
    
  $vals[] = $faker-&gt;unique()-&gt;randomDigit;
}

dump($vals); 

The example generates an array containing six optional digits.

$ php optional_values.php
array:6 [
  0 =&gt; 7
  1 =&gt; 4
  2 =&gt; null
  3 =&gt; null
  4 =&gt; null
  5 =&gt; 8
]

## Faking internet related data

Faker has several accessors for faking internet related data. 

internet.php
  

&lt;?php

require('vendor/autoload.php');

$faker = Faker\Factory::create();

echo $faker-&gt;email . "\n";
echo $faker-&gt;safeEmail . "\n";
echo $faker-&gt;freeEmail . "\n";
echo $faker-&gt;companyEmail . "\n";
echo $faker-&gt;freeEmailDomain . "\n";
echo $faker-&gt;safeEmailDomain . "\n";
echo $faker-&gt;userName . "\n";
echo $faker-&gt;password . "\n";
echo $faker-&gt;domainName . "\n";
echo $faker-&gt;domainWord . "\n";
echo $faker-&gt;tld . "\n";
echo $faker-&gt;url . "\n";
echo $faker-&gt;slug . "\n";
echo $faker-&gt;ipv4 . "\n";
echo $faker-&gt;localIpv4 . "\n";
echo $faker-&gt;ipv6 . "\n";
echo $faker-&gt;macAddress . "\n";

The example shows various internet related data, including emails, domain 
names, slugs, IP addresses and URLs.

$ php internet.php
johns.ryleigh@rowe.com
merle96@example.com
nyasia.bergnaum@hotmail.com
morar.dylan@champlin.com
gmail.com
example.net
bartoletti.ena
}#)W+OVU&lt;Lgaa.Atp5^
metz.com
blanda
org
http://www.kling.com/
optio-magnam-provident-pariatur-dolores-consequatur-beatae
127.131.186.145
10.135.68.26
ccf1:64a7:d145:98eb:742d:dc60:cf9e:5d4a
C8:31:FD:24:15:06

## Generating XML data with Faker

In the following example, we generate XML data with Faker and Twig 
template. The XML file will contain users.

$ mkdir fakexml
$ cd fakexml
$ mkdir templates
$ composer req fzaninotto/faker
$ composer req twig/twig

We create a new project directory and install Faker and Twig template engine.

User.php
  

&lt;?php

class User
{
    public $firstName;
    public $lastName;
    public $occupation;

    function __construct(string $first, string $last, string $occupation) 
    {
        $this-&gt;firstName = $first;
        $this-&gt;lastName = $last;
        $this-&gt;occupation = $occupation;
    }
}

This is the User.php, which has the following attributes: $firstName, 
$lastName, and $occupation;

fake_xml.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/User.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Faker\Factory;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

$faker = Factory::create();

$users = [];

for ($i = 0; $i &lt; 20; $i++) 
{
    $firstName = $faker-&gt;firstName;
    $lastName = $faker-&gt;lastName;
    $occupation = $faker-&gt;jobTitle;

    $user = new User($firstName, $lastName, $occupation);
    array_push($users, $user);
}

$content = $twig-&gt;render('users.xml.twig', ['users' =&gt; $users]);
file_put_contents('users.xml', $content);

The program generates an array of twenty users. The array is passed to the 
Twig template to be processed. The template is located in the templates
directory. The generated content is written to the users.xml file.

templates/users.xml.twig
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
    {% for user in users %}
    &lt;user id="{{ loop.index }}"&gt;
        &lt;firstname&gt;{{ user.firstName }}&lt;/firstname&gt;
        &lt;lastname&gt;{{ user.lastName }}&lt;/lastname&gt;
        &lt;occupation&gt;{{ user.occupation }}&lt;/occupation&gt;
    &lt;/user&gt;
    {% endfor %}
&lt;/users&gt;

In the template, we use the for directive to process the array 
of users. 

## Source

[The Faker repository](https://github.com/fzaninotto/Faker)

In this article we have used PHP Faker to generate fake data in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.