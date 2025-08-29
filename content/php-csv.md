+++
title = "PHP CSV"
date = 2025-08-29T20:04:17.483+01:00
draft = false
description = "PHP CSV tutorial shows how to work with CSV data in PHP. CSV (Comma Separated Values) is a very popular import and export data format used in spreadsheets and databases."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP CSV

last modified February 16, 2025

PHP CSV tutorial shows how to work with CSV data in PHP.

## CSV

CSV (Comma Separated Values) is a very popular import and export data format
used in spreadsheets and databases. Each line in a CSV file is a data record.
Each record consists of one or more fields, separated by commas. While CSV is a
very simple data format, there can be many differences, such as different
delimiters, new lines, or quoting characters.

The fgetcsv reads a line from the provided file pointer and parses
for CSV fields. It returns an array containing the fields read. The
fputcsv takes an array of data and writes it as a CSV line to the
specified file handle.

The league/csv is a simple PHP library to ease CSV documents
loading as well as writing, selecting and converting CSV records.

## PHP read CSV with fgetcsv

The following example uses the build-in fgetcsv function to read
CSV data.

users.csv
  

John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer

This is the users.csv file.

read_data.php
  

&lt;?php

$f = fopen('users.csv', 'r');

while(!feof($f)) {

    $row = fgetcsv($f);

    if (!empty($row)) {
          echo "$row[0] $row[1] is a(n) $row[2]\n";
    }
}

fclose($f);

We read data from users.csv file.

$f = fopen('users.csv', 'r');

With fopen, we open a file handle to the users.csv
file.

while(!feof($f)) {

In a while loop, we read all lines until the end of the file. The
feof function checks for end-of-file on the file handle.

$row = fgetcsv($f);

We read a line with fgetcsv; the function returns an array of
fields read.

if (!empty($row)) {
    echo "$row[0] $row[1] is a(n) $row[2]\n";
}

If the row is not empty, we output the fields in a message.

fclose($f);

The fclose function closes an open file pointer.

$ php read_data.php
John Doe is a(n) gardener
Lucy Smith is a(n) teacher
Brian Bethamy is a(n) programmer

## PHP write CSV with fputcsv

The following example writes CSV data into a file.

write_data.php
  

&lt;?php

$users = [
    ['John', 'Doe', 'gardener' ],
    ['Lucy', 'Smith', 'teacher'],
    ['Brian', 'Bethamy', 'programmer']
];

$fp = fopen('users.csv', 'w');

foreach ($users as $user) {
    fputcsv($fp, $user);
}

fclose($fp);

We have an array of users. We write the users into a CSV file with
fputcsv.

## PHP CSV different separator

The fgetcsv function allows to read data with a different separator.

users2.csv
  

John|Doe|gardener
Lucy|Smith|teacher
Brian|Bethamy|programmer

We have data separated with the | character.

separator.php
  

&lt;?php

$f = fopen('users2.csv', 'r');

while(!feof($f)) {

    $row = fgetcsv($f, 0, '|');

    if (!empty($row)) {
          echo "$row[0] $row[1] is a(n) $row[2]\n";
    }
}

fclose($f);

The third parameter of the fgetcsv function is the optional
delimiter, which sets the field delimiter (one character only). It is comma by
default.

## PHP send CSV data

The following example sends CSV data as an attachment to the user.

send_data.php
  

&lt;?php

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=users.csv');

$output = fopen('php://output', 'w');

fputcsv($output, ['First name', 'Last name', 'Occupation']);

$f = fopen('users.csv', 'r');

while (!feof($f)) {

    $rows[] = fgetcsv($f);
}

foreach ($rows as $row) {

    fputcsv($output, $row);
}

fclose($f);

The example reads CSV from a file and returns it to the user; the user receives
the file as an attachment.

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=users.csv');

These headers specify the content type and the disposition as attachment.

$output = fopen('php://output', 'w');

We create a file pointer connected to the output stream.

fputcsv($output, ['First name', 'Last name', 'Occupation']);

We send the header fields to the output stream.

$f = fopen('users.csv', 'r');

while (!feof($f)) {

    $rows[] = fgetcsv($f);
}

We read the CSV data into an array.

foreach ($rows as $row) {

    fputcsv($output, $row);
}

The array is written to the output stream.

## PHP league\csv

The league\csv is a PHP library for processing CSV data. 

$ composer require league/csv

The library is installed with the above command.

First, we parse CSV data with League\Csv\Reader for reading. 
The League\Csv\Statement class is a constraint builder for
selecting records from a CSV document created by League\Csv\Reader.
The Statement::process method processes the reader object and
returns the found records as a ResultSet object. We can perform
filtering, interval, or sorting operations on the result set, as in SQL.

We use League\Csv\Writer for writing.

users.csv
  

'First name','Last name','Occupation'
John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer
Lucy,Black,musician
Pau,Novak,teacher

We have this data.

## PHP league\csv count rows

In the first example, we count available rows in the CSV file.

count_rows.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use League\Csv\Reader;
use League\Csv\Statement;

$reader = Reader::createFromPath('users.csv', 'r');
$rows = Statement::create()-&gt;process($reader);
echo count($rows);

We create a reader object with Reader::createFromPath. Then
we create a statement and process the reader object with the
process method. Applying the count function on the
returned result set returns the number of rows.

$ php count_rows.php
6

There are six rows in the file, including the header.

If we do not want to header line, we can use the setHeaderOffset.

skip_header.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use League\Csv\Reader;
use League\Csv\Statement;

$reader = Reader::createFromPath('users.csv', 'r');
$reader-&gt;setHeaderOffset(0);

$rows = Statement::create()-&gt;process($reader);
echo count($rows);

We count the number of lines in the CSV file, excluding the header line.

## PHP league\csv read data

In the following example, we read CSV data with league\csv.

read_data2.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use League\Csv\Reader;

$csv = Reader::createFromPath('users.csv', 'r');
$csv-&gt;setHeaderOffset(0);

$header = $csv-&gt;getHeader();
print_r($header);

$records = $csv-&gt;getRecords();
print_r(iterator_to_array($records));

echo $csv-&gt;getContent();

We read the header and the data from the users.csv file.

$csv = Reader::createFromPath('users.csv', 'r');
$csv-&gt;setHeaderOffset(0);

We create the reader object and set the header position.

$header = $csv-&gt;getHeader();
print_r($header);

We get the header line.

$records = $csv-&gt;getRecords();
print_r(iterator_to_array($records));

The getRecords method returns all the CSV records as an
Iterator object.

echo $csv-&gt;getContent();

The getContent method returns the CSV document as a string.

$ php read_data2.php
Array
(
    [0] =&gt; 'First name'
    [1] =&gt; 'Last name'
    [2] =&gt; 'Occupation'
)
Array
(
    [1] =&gt; Array
        (
            ['First name'] =&gt; John
            ['Last name'] =&gt; Doe
            ['Occupation'] =&gt; gardener
        )

    [2] =&gt; Array
        (
            ['First name'] =&gt; Lucy
            ['Last name'] =&gt; Smith
            ['Occupation'] =&gt; teacher
        )

    [3] =&gt; Array
        (
            ['First name'] =&gt; Brian
            ['Last name'] =&gt; Bethamy
            ['Occupation'] =&gt; programmer
        )

    [4] =&gt; Array
        (
            ['First name'] =&gt; Lucy
            ['Last name'] =&gt; Black
            ['Occupation'] =&gt; musician
        )

    [5] =&gt; Array
        (
            ['First name'] =&gt; Pau
            ['Last name'] =&gt; Novak
            ['Occupation'] =&gt; teacher
        )

)
'First name','Last name','Occupation'
John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer
Lucy,Black,musician
Pau,Novak,teacher

## PHP league/csv fetchColumn

A specific column of data can be selected with fetchColumn.

fetch_column.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use League\Csv\Reader;
use League\Csv\Statement;

$reader = Reader::createFromPath('users.csv', 'r');
$reader-&gt;setHeaderOffset(0);

$records = Statement::create()-&gt;process($reader);

foreach ($records-&gt;fetchColumn(2) as $value) {
    echo $value . "\n";
}

In the example, we fetch the third column from the data.

$ php fetch_column.php
gardener
teacher
programmer
musician
teacher

## PHP CSV in Slim

In the following example, we return CSV data from a Slim application.

$ composer req slim/slim
$ composer req slim/psr7
$ composer req slim/http

We install slim/slim, slim/psr7, and slim/http
packages.

public/index.php
  

&lt;?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Psr7\Stream;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app-&gt;get('/users', function (Request $request, Response $response): Response {

    $csv_file = '../users.csv';
    $fp = fopen($csv_file);
    $stream = new Stream(fopen($csv_file, 'rb'));

    return $response-&gt;withHeader('Content-Type', 'application/octet-stream')
        -&gt;withHeader('Content-Disposition', 'attachment; filename=users.csv')
        -&gt;withHeader('Pragma', 'no-cache')
        -&gt;withBody($stream);
});

$app-&gt;run();

We read the data from the file and send it in the body of the response.

$ php -S localhost:8000 -t public

We start the built-in server.

$ curl localhost:8000/users
"First name","Last name",Occupation
John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer

A GET request is created with curl.

## PHP CSV in Symfony

In the following example, we send a CSV response from a Symfony application.

$ symfony new symcsv
$ cd symcsv

A new project is created.

$ composer req maker --dev
$ composer req annot

We install the maker and annot dependencies.

$ php bin/console make:controller UserController

We create the UserController.

src/Controller/UserController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ContainerParametersHelper;

class UserController extends AbstractController
{
    /**
     * @Route("/users", name="user")
     */
    public function index(): Response
    {
        $rootDir = $this-&gt;getParameter('kernel.project_dir');

        $fp = fopen("$rootDir/var/users.csv", 'r');
        $response = new Response(stream_get_contents($fp));
        fclose($fp);

        $response-&gt;headers-&gt;set('Content-Type', 'text/csv');
        $response-&gt;headers-&gt;set('Pragma', 'no-cache');
        $response-&gt;headers-&gt;set('Content-Disposition',
            'attachment; filename="users.csv"');

        return $response;
    }
}

The users.csv file is located in the var directory.
We read the contents of the file and send it in the response object as an
attachment.

$ symfony serve

We start the web server.

$ curl localhost:8000/users
"First name","Last name",Occupation
John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer

We send a GET request with curl.

## PHP CSV in Laravel

In the following example, we send a CSV response from a Laravel application.

$ laravel new laracsv
$ cd laracsv

A new project is created.

routes/web.php
  

&lt;?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\StreamedResponse;

Route::get('/users', function() : StreamedResponse {

    $headers = [
        "Content-type"        =&gt; "text/csv",
        "Content-Disposition" =&gt; "attachment; filename=users.csv",
        "Pragma"              =&gt; "no-cache",
    ];

    $columns = ['First name', 'Last name', 'Occupation'];
    $fileName = storage_path('users.csv');
    $f = fopen($fileName, 'r');

    while (!feof($f)) {

        $rows[] = fgetcsv($f);
    }

    fclose($f);

    return new StreamedResponse(

        function() use ($rows) {

            $handle = fopen('php://output', 'w');

            foreach ($rows as $row) {

                if (!empty($row)) {
                    fputcsv($handle, $row);
                }
            }

            fclose($handle);
        },
        200,
        [
            'Content-type'        =&gt; 'text/csv',
            'Content-Disposition' =&gt; 'attachment; filename=members.csv'
        ]
    );
});

The users.csv file is located in the storage
directory. We read the contents of the file and send it in the 
response object as an attachment.

$ php artisan serve

We start the web server and locate to localhost:8000/users.

## Source

[The fgetcsv - PHP manual](https://www.php.net/manual/en/function.fgetcsv.php)

In this article we have worked with CSV data in plain PHP, Symfony, Slim, and
Laravel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.