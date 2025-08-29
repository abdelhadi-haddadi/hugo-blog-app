+++
title = "PHP filesystem functions"
date = 2025-08-29T20:04:20.857+01:00
draft = false
description = "This article convers file system functions in PHP. We work with files and directories, determine file permissions and available disk space, and read and write to files."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP filesystem functions

last modified February 16, 2025

In this article we cover file system functions in PHP. We work with files and
directories, determine file permissions and available disk space, and read and
write to files. For our examples, we use PHP CLI. PHP
tutorial is a concise tutorial of PHP language on ZetCode.

PHP has a rich set of functions for working with files and directories.
PHP contains both low-level and high-level filesystem functions.
The fopen function is an example of a low-level function; it
is a thin wrapper of a similar C function. The file function
is an example of a high-level PHP filesystem function.

## PHP file size and type

The filesize function returns the size of the
given file. The size is specified in bytes.

get_filesize.php
  

&lt;?php

$filename = "fruits.txt";

$fsize = filesize($filename);

echo "The file size is: $fsize bytes\n";

In the example, we determine the size of the fruits.txt
file. The file is located in the current working directory, that is,
in the same directory as the PHP script.

$ php get_filesize.php
The file size is: 40 bytes

The size of the fruits.txt file is 40 bytes.

The filetype function gets the type of a file.
The possible return values are: fifo, char,
dir, block, link, file,
socket and unknown.

file_types.php
  

&lt;?php

echo filetype("myfile") . PHP_EOL;
echo filetype(".") . PHP_EOL;
echo filetype("/dev/tty1") . PHP_EOL;
echo filetype("/var/run/cups/cups.sock") . PHP_EOL;

The script determines the types of four files.

$ php file_types.php
file
dir
char
socket

The four files are a regular file, directory, character device, and socket.

## PHP check file existence

It may happen that we want to work with a file that does
not exist. The file_exists function can be
used to prevent this.

file_existence.php
  

&lt;?php

if ($argc != 2) {

    exit("Usage: file_existence.php filename\n");
}

$filename = $argv[1];

$r = file_exists($filename);

if (!$r) {

    exit("Cannot determine the size of the file; the file does not exist\n");
}

$fsize = filesize($filename);

echo "The file size is: $fsize bytes\n";

This script checks for the existence of a given file before
it computes its size.

if ($argc != 2) {

    exit("Usage: file_existence.php filename\n");
}

The $argc is a special variable which contains the number of
arguments passed to script. We expect two arguments: a script name and
another filename passed as a parameter.

$filename = $argv[1];

The $argv is an array of arguments passed to the script.
We get the second element.

$r = file_exists($filename);

if (!$r) {

    exit("Cannot determine the size of the file; the file does not exist\n");
}

We check if the file exists with the file_exists function.
If it does not exist, we terminate the script with a message.

$ php file_existence.php fruits.txt
The file size is: 40 bytes

This is a sample output of the file_existence.php script.

In the following example we create a new file, delete it, and
check for its existence. The touch function sets access and
modification time of a file. If the file does not exist, it is created.
The unlink function deletes a file.

file_existence2.php
  

&lt;?php

$filename = "newfile.txt";

if (file_exists($filename)) {

    echo "The file $filename exists\n";

} else {

    echo "The file $filename does not exist\n";

    $r = touch($filename);

    if (!$r) {

        exit("Failed to touch $filename file\n");
    } else {

        echo "The file $filename has been created\n";
    }
}

$r = unlink($filename);

if ($r) {

    echo "The file $filename was deleted\n";
} else {

    exit("Failed to delete $filename file\n");
}

if (file_exists($filename)) {

    echo "The file $filename exists\n";
} else {

    echo "The file $filename does not exist\n";
}

In the code example, we utilize all the three functions: file_exists,
touch, and unlink.

$r = touch($filename);

The touch function is used to create a new file
called newfile.txt.

if (!$r) {

    exit("Failed to touch $filename file\n");
} else {

    echo "The file $filename has been created\n";
}

An error message is printed if the touch function
fails. Many PHP functions return a false value when
they fail.

$r = unlink($filename);

The unlink function deletes the file.

$ php file_existence2.php
The file newfile.txt does not exist
The file newfile.txt has been created
The file newfile.txt was deleted
The file newfile.txt does not exist

This is the output of the file_existence2.php.

## PHP copy and rename files

The copy function copies a file, and the rename
renames a file. If the destination file already exists, it will be overwritten.

copy_file.php
  

&lt;?php

$r = copy("myfile.txt", "myfile2.txt");

if ($r) {

    echo "Successfully copied file\n";
} else {

    exit("Failed to copy file\n");
}

The script copies a file.

rename_file.php
  

&lt;?php

$r = rename("myfile2.txt", "myfile_back.txt");

if ($r) {

    echo "Successfully renamed file\n";
} else {

    exit("Failed to rename file\n");
}

In this script, we rename the myfile2.txt file to
myfile_back.txt with the rename function.

## E_WARNING

Some of the filesystem functions issue an E_WARNING on failure.
It is a run-time warning (non-fatal error). The execution of the script
is not halted.

PHP is not consistent in this area; not all filesystem functions issue
this warning—most functions only return an error value when they fail.

custom_error_handler.php
  

&lt;?php

set_error_handler("mywarning_handler", E_WARNING);

$r = unlink('image1.png');

if ($r) {

    echo "File successfully deleted\n";
}

function mywarning_handler($errno, $errstr) {

    echo "Failed to delete file\n";
    echo "$errstr: $errno\n";
}

In the script, we delete a file and provide a custom error
handler.

set_error_handler("mywarning_handler", E_WARNING);

A custom error handler is set with the set_error_handler
function.

function mywarning_handler($errno, $errstr) {

    echo "Failed to delete file\n";
    echo "$errstr: $errno\n";
}

The handler receives an error number and an error string
as parameters.

$ php custom_error_handler.php
Failed to delete file
unlink(image1.png): No such file or directory: 2

The custom_error_handler.php gives this output when there
is no image1.png to delete.

## PHP directories

The dirname function returns the parent directory's path.
Since PHP 7, we can provide an optional levels parameter which tells
the number of parent directories to go up.

parent_directories.php
  

&lt;?php

$home_dir = getenv("HOME");

echo dirname($home_dir). PHP_EOL;
echo dirname("/etc/") . PHP_EOL;
echo dirname(".") . PHP_EOL;
echo dirname("/usr/local/lib", 2) . PHP_EOL;

In the script, we print the parent directory of four directories.

$home_dir = getenv("HOME");

We use the getenv function to get the current user's
home directory.

echo dirname($home_dir). PHP_EOL;

This line prints the parent directory of the user's home directory.

echo dirname(".") . PHP_EOL;

Here, we print the parent directory of the current working directory.

echo dirname("/usr/local/lib", 2) . PHP_EOL;

In this line we print the second parent directory of the
/usr/local/lib directory.

$ php parent_directories.php
/home
/
.
/usr

This is the output of the parent_directories.php.

The getcwd function returns the current working
directory, and the chdir function changes the
current working directory to a new directory.

current_directory.php
  

&lt;?php

$cd = getcwd();

echo "Current directory:" . $cd . PHP_EOL;

chdir("..");

$cd2 = getcwd();

echo "Current directory:" . $cd2 . PHP_EOL;

The script works with getcmd and chdir
functions.

$ php current_directory.php
Current directory:/home/janbodnar/prog/phpfiles
Current directory:/home/janbodnar/prog

## PHP listing directories

In the following five examples, we list the contents of
directories. There are several approaches to do this task.

list_dir1.php
  

&lt;?php

$folder = '/home/janbodnar/prog';
$fh = opendir($folder);

if ($fh === false) {

    exit("Cannot open directory\n");
}

while (false !== ($entry = readdir($fh))) {
    echo "$entry\n";
}

closedir($fh);

The opendir function opens a directory handle. The
readdir function reads an entry from the directory handle.
The handle of the directory is closed with the closedir
function at the end of the script.

The is_dir function tells whether the filename is a directory,
and the is_file function tells whether the filename is a file.

list_dir2.php
  

&lt;?php

$folder = '/home/janbodnar/prog/';

$fh = opendir($folder);

if ($fh === false) {

    exit("Cannot open directory\n");
}

$dirs = [];
$files = [];

while (false !== ($entry = readdir($fh))) {

    if (is_dir($folder . '/' . $entry)) {

        array_push($dirs, $entry);
    }

    if (is_file($folder . '/' . $entry)) {

        array_push($files, $entry);
    }
}

echo "Directories:\n";

foreach ($dirs as $dr) {
    echo "$dr\n";
}

echo "Files:\n";

foreach ($files as $myfile) {
    echo "$myfile\n";
}

closedir($fh);

In the second example we divide the entries into subdirectories and files.
The script first prints the subdirectories and then the files of the
examined directory.

if (is_dir($folder . '/' . $entry)) {

    array_push($dirs, $entry);
}

It is necessary to provide the full path of the directory
to the is_dir function.

The glob function finds pathnames matching a pattern.

list_dir3.php
  

&lt;?php

foreach (glob('/home/janbodnar/*', GLOB_ONLYDIR) as $dir) {

    echo "$dir\n";
}

With the GLOB_ONLYDIR flag, the glob function returns
only directory entries which match the pattern.

The scandir is a high-level function to list files and directories
inside the specified path. The function returns an array of files and directories
from the directory.

list_dir4.php
  

&lt;?php

$files = scandir('.', SCANDIR_SORT_DESCENDING);

print_r($files);

The script prints the array of files and subdirectories of
the current working directory. The SCANDIR_SORT_DESCENDING
flag sorts the entries in descending alphabetical order.

In the previous examples, we have listed only the contents of one directory;
we did not include the elements of the subdirectories.
With the RecursiveDirectoryIterator and RecursiveIteratorIterator
classes we can easily iterate over filesystem directories using recursion. In other words,
we iterate over all subdirectories until all items in the directory
tree are listed.

list_dir5.php
  

&lt;?php

$folder = '/home/janbodnar/prog/';

$rdi = new RecursiveDirectoryIterator($folder);
$rii = new RecursiveIteratorIterator($rdi);

foreach ($rii as $filename) {

    echo "$filename\n";
}

The script prints all items of the given directory for
all levels of depth.

## PHP paths

A path is the fully specified name of a computer file, including the position
of the file in the file system's directory structure. The realpath
function returns a canonical absolute pathname, and the basename
function returns the trailing name component of the path.

paths.php
  

&lt;?php

echo realpath("myfile.txt") . PHP_EOL;

echo basename("/home/janbodnar/prog/phpfiles/myfile.txt") . PHP_EOL;
echo basename("/home/janbodnar/prog/phpfiles/myfile.txt", ".txt") . PHP_EOL;

This script uses the realpath and the basename
functions.

echo basename("/home/janbodnar/prog/phpfiles/myfile.txt", ".txt") . PHP_EOL;

If we specify the second parameter, the suffix name, it will be also removed
from the path name.

$ php paths.php
/home/janbodnar/prog/phpfiles/myfile.txt
myfile.txt
myfile

This is the output of the paths.php example.

The pathinfo function returns information about a file path.

path_info.php
  

&lt;?php

$path_parts = pathinfo('myfile.txt');

echo $path_parts['dirname'] . PHP_EOL;
echo $path_parts['basename'] . PHP_EOL;
echo $path_parts['extension'] . PHP_EOL;
echo $path_parts['filename'] . PHP_EOL;

The function returns an associative array containing the following elements:
dirname, basename, extension (if any), and filename.

$ php path_info.php
.
myfile.txt
txt
myfile

## PHP create file

The fopen function opens a file or an URL.
The first parameter of the function is the file name and
the second is the mode in which we open the window. For instance,
the 'r' mode opens for reading only and
'w' for writing only. If we open a file in a 'w'
mode and it does not exist, it is created. The list of modes can be found at
[PHP manual for fopen()](http://php.net/manual/en/function.fopen.php).

The fopen returns a handle to the file. This is an object
that is used to manipulate the file; for instance, we pass it to the
fwrite function to write to the file.

create_file.php
  

&lt;?php

$filename = "names.txt";

if (file_exists($filename)) {

    exit("The file already exists\n");
}

$fh = fopen($filename, 'w');

if ($fh === false) {

    exit("Cannot create file\n");
}

echo "Successfully created file\n";

fclose($fh);

The example creates a new file called names.txt.

if (file_exists($filename)) {

    exit("The file already exists\n");
}

First, we check if the file exists.

$fh = fopen('names.txt', 'w');

The names.txt file is created and a handle to this file is
returned.

fclose($fh);

We close the file handle with the fclose function.

## PHP read file

In the next examples, we will read file contents.

The fread reads up to length bytes from the
file pointer referenced by handle. Reading stops as soon as the length
bytes have been read or the EOF (end of file) is reached.

read_file.php
  

&lt;?php

$fh = fopen('balzac.txt', 'r');

if ($fh === false) {

    exit("Cannot open file for reading\n");
}

while (!feof($fh)) {

    $chunk = fread($fh, 1024);

    if ($chunk === false) {

        exit("Cannot read from file\n");
    }

    echo $chunk;
}

fclose($fh);

The example reads the entire file with the fread function
and outputs it into the console.

while (!feof($fh)) {

    $chunk = fread($fh, 1024);

    if ($chunk === false) {

        exit("Cannot read from file\n");
    }

    echo $chunk;
}

The feof tests for end-of-file on a file pointer.
The fread reads the file per 1 KB chunk until the
EOF is reached.

$ php read_file.php balzac.txt
Honoré de Balzac, (born Honoré Balzac, 20 May 1799 – 18 August 1850)
was a French novelist and playwright. His magnum opus was a sequence
of short stories and novels collectively entitled La Comédie Humaine,
which presents a panorama of French life in the years after the 1815
Fall of Napoleon Bonaparte.

This is the output of the read_file.php example.

In the second example, we utilize the fgets function,
which reads one line from the file handle.

read_file2.php
  

&lt;?php

$fh = fopen('balzac.txt', 'r');

if ($fh === false) {

    exit("Cannot open file for reading\n");
}

while (!feof($fh)) {

    $line = fgets($fh);

    if ($line === false) {

        exit("Cannot read from file\n");
    }

    echo $line;
}

fclose($fh);

The example reads the contents of the balzac.txt file
one by line.

The file is a high-level function which reads
an entire file into an array.

read_file3.php
  

&lt;?php

$lines = file('balzac.txt');

if ($lines === false) {

    exit("Cannot read file\n");
}

foreach ($lines as $line) {

    echo $line;
}

In this example, we read the whole file in one shot
with the file function. We traverse
the returned array with a foreach loop.

The file_get_contents is another high-level
function which reads the entire file into a string.

read_file4.php
  

&lt;?php

$content = file_get_contents('balzac.txt');

if ($content === false) {

    exit("Cannot read file\n");
}

echo "$content";

The example reads the entire file in one shot with the
file_get_contents function. It returns
the data in a string.

## PHP reading formatted data

The fscanf function parses input from a file according
to a format. Each call to fscanf reads one line from the file.

$ cat items.txt
coins 5
pens 6
chairs 12
books 20

We are going to parse the items.txt file.

read_formatted_data.php
  

&lt;?php

$fh = fopen("items.txt", "r");

if ($fh === false) {

    exit("Cannot read file\n");
}

while ($data = fscanf($fh, "%s %d")) {

    list($item, $quantity) = $data;
    echo "$item: $quantity\n";
}

fclose($fh);

The fscanf function takes format specifiers
to read a string and a number.

## PHP reading web page

The PHP filesystem functions can be also used to read web pages.

read_page.php
  

&lt;?php

$ph = fopen("https://webcode.me", "r");

if ($ph === false) {

    exit("Failed to open stream to URL\n");
}

while (!feof($ph)) {

    $buf = fread($ph, 1024);

    if ($buf === false) {

        exit("Cannot read page\n");
    }

    echo $buf;
}

fclose($ph);

We read a page from a small website wecode.me.

$ph = fopen("http://webcode.me", "r");

With the fopen function, we open a handle to a web page.

while (!feof($ph)) {

    $buf = fread($ph, 1024);

    if ($buf === false) {

        exit("Cannot read page\n");
    }

    echo $buf;
}

We read the web page until its end; the feof is used to
test the end of the web page. The page is read in 1 KB chunks with
the fread function.

$ php read_page.php
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;

    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the output of the read_page.php script.

The following example uses a high-level function to read the
same web page.

read_page2.php
  

&lt;?php

$page = file_get_contents('http://webcode.me');

if ($page === false) {

    exit("Cannot read page\n");
}

echo $page;

The file_get_contents reads the whole web page
in one shot.

The fgetss function reads a line from a file handle
and strips HTML tags.

read_page3.php
  

&lt;?php

$ph = fopen("http://webcode.me", "r");

if ($ph === false) {

    exit("Failed to open stream to URL\n");
}

while (!feof($ph)) {

    $buf = fgetss($ph, 1024);

    if ($buf === false) {

        exit("Cannot read from page\n");
    }

    echo trim($buf);
}

fclose($ph);

We read the contents of the webcode.me web page and strip
its HTML tags.

echo trim($buf);

The trim function removes the leading and trailing spaces.

$ php read_page3.php
My html pageToday is a beautiful day. We go swimming and fishing.Hello there. How are you?

This is the output of the example; the output contains the title
and the text in the body of the page.

## PHP write to file

The fwrite function writes a string to a file
referenced by a file handle.

write_file.php
  

&lt;?php

$fh = fopen('names.txt', 'w');

if ($fh === false) {

    exit("Cannot open file\n");
}

$r = fwrite($fh, 'Jane' . PHP_EOL);
check_retval($r);

$r = fwrite($fh, 'Lucy' . PHP_EOL);
check_retval($r);

$r = fwrite($fh, 'Mark' . PHP_EOL);
check_retval($r);

$r = fwrite($fh, 'Lubos' . PHP_EOL);
check_retval($r);

fclose($fh);

function check_retval($val) {

    if ($val === false) {

        exit("Cannot write to file\n");
    }
}

We open a names.txt in the write mode and
write four lines into it.

$fh = fopen('names.txt', 'w');

The fopen function opens the file in the
write mode. If the file does not exist, it is automatically
created.

$r = fwrite($fh, 'Jane' . PHP_EOL);

With the fwrite function we write a line to the file.
The function takes the file handle as its first parameter.

$ php write_file.php
$ cat names.txt
Jane
Lucy
Mark
Lubos

We write to the names.txt file and check its contents.

We can write a string to a file in one shot with the high-level
file_put_contents method.

write_file2.php
  

&lt;?php

$filename = "names.txt";

$buf = file_get_contents($filename);

if ($buf === false) {

    exit("Cannot get file contents\n");
}

$buf .= "John\nPaul\nRobert\n";

$r = file_put_contents($filename, $buf);

if ($r === false) {

    exit("Cannot write to file\n");
}

In the example, we read the contents of the names.txt file
with the file_get_contents function and append new
string with the file_put_contents function.

## PHP readable, writable, executable file

The is_readable, is_writable, and is_executable
functions check if the file is readable, writable, and executable.

rwe.php
  

&lt;?php

$filename = "myfile.txt";

echo get_current_user() . PHP_EOL;

if (is_readable($filename)) {

    echo "The file can be read\n";
} else {

    echo "Cannot read file\n";
}

if (is_writable($filename)) {

    echo "The file can be written to\n";
} else {

    echo "Cannot write to file\n";
}

if (is_executable($filename)) {

    echo "The file can be executed\n";
} else {

    echo "Cannot execute file\n";
}

We run the three functions on the myfile.txt file.
The script check these attributes for the current user.

$ php rwe.php
janbodnar
The file can be read
The file can be written to
Cannot execute file

The file can be read and written to but not executed for
the janbodnar user.

## PHP file times

There are three kinds of file times on Linux: last access time,
last change time, and last modification time. The following PHP
functions determine these times: fileatime, filectime, and
filemtime.

file_times.php
  

&lt;?php

$filename = "myfile.txt";

$atime =  fileatime($filename);
$ctime =  filectime($filename);
$mtime =  filemtime($filename);

echo date("F d, Y H:i:s\n", $atime);
echo date("F d, Y H:i:s\n", $ctime);
echo date("F d, Y H:i:s\n", $mtime);

The script prints the file times for the myfile.txt file.

$ php file_times.php
April 20, 2016 17:52:54
April 20, 2016 17:53:33
April 20, 2016 17:52:29

This is a sample output of the file_times.php script.

## PHP file permissions

Filesystems enforce permissions on files for different users and groups
of users. The fileperms function gets file permissions;
it returns the file's permissions as a numeric mode.

file_permissions.php
  

&lt;?php

$perms = fileperms("myfile.txt");

echo decoct($perms &amp; 0777) . PHP_EOL;

$info .= (($perms &amp; 0x0100) ? 'r' : '-');
$info .= (($perms &amp; 0x0080) ? 'w' : '-');
$info .= (($perms &amp; 0x0040) ?
            (($perms &amp; 0x0800) ? 's' : 'x' ) :
            (($perms &amp; 0x0800) ? 'S' : '-'));

$info .= (($perms &amp; 0x0020) ? 'r' : '-');
$info .= (($perms &amp; 0x0010) ? 'w' : '-');
$info .= (($perms &amp; 0x0008) ?
            (($perms &amp; 0x0400) ? 's' : 'x' ) :
            (($perms &amp; 0x0400) ? 'S' : '-'));

$info .= (($perms &amp; 0x0004) ? 'r' : '-');
$info .= (($perms &amp; 0x0002) ? 'w' : '-');
$info .= (($perms &amp; 0x0001) ?
            (($perms &amp; 0x0200) ? 't' : 'x' ) :
            (($perms &amp; 0x0200) ? 'T' : '-'));

echo "$info\n";

The script determines the file permissions for myfile.txt.
The permissions are printed to the console in the Unix style.

echo decoct($perms &amp; 0777) . PHP_EOL;

The permissions on Unix are traditionally written in octal representation.
The decoct function translates decimal representation to octal.

$info .= (($perms &amp; 0x0100) ? 'r' : '-');

In this line, we check if the file permissions allow the owner of the file
to read it.

$ php file_permissions.php
660
rw-rw----

This is a sample output of the file_permissions.php script.

File permissions can be changed with the chmod function.

file_permissions2.php
  

&lt;?php

$perms1 = fileperms("myfile.txt");

echo decoct($perms1 &amp; 0777) . PHP_EOL;

$r = chmod("myfile", 0660);

if ($r) {

    echo "File mode successfully changed\n";
} else {

    exit("Failed to change file mode\n");
}

$perms2 = fileperms("myfile");

echo decoct($perms2 &amp; 0777) . PHP_EOL;

The script changes the permissions for the myfile.txt
file.

$r = chmod("myfile", 0660);

The chmod function accepts permissions as an octal value
in its second parameter. Octal values are preceded with 0.

$ php file_permissions2.php
664
File mode successfully changed
660

The permissions of the file were changed from 664 to 660.

## PHP CSV file format

The fgetcsv function reads one line from a CSV (comma-separated value)
file; it returns an indexed array containing the fields read.
The fputcsv function formats one line as CSV and writes it to a file.

csv_output.php
  

&lt;?php

$nums = [1, 2, 5, 3, 2, 6, 4, 2, 4,
    8, 7, 3, 8, 5, 4, 3];

$fh = fopen('numbers.csv', 'w');

if ($fh === false) {

    exit("Failed to open file\n");
}

$r = fputcsv($fh, $nums);

if ($r === false) {

    exit("Failed to write values\n");
}

echo "The values have been successfully written\n";

fclose($fh);

This script writes numbers from an array into a CSV file.

$ php csv_output.php
The values have been successfully written
$ cat numbers.csv
1,2,5,3,2,6,4,2,4,8,7,3,8,5,4,3

We run the script and check the file contents.

In the following example, we read data from a CSV file.

csv_input.php
  

&lt;?php

$fh = fopen('numbers.csv', 'r');

if ($fh === false) {

    exit("Failed to open file\n");
}

while (($data = fgetcsv($fh)) !== false) {

    $num = count($data);

    for ($i=0; $i &lt; $num; $i++) {

        echo "$data[$i] ";
    }
}

echo "\n";

fclose($fh);

The script reads values from the numbers.csv file
using the fgetcsv and prints them into the console.

$ php csv_input.php
1 2 5 3 2 6 4 2 4 8 7 3 8 5 4 3

This is the output of the csv_input.php script.

## PHP disk space

The disk_total_space function returns the total size of a filesystem
or disk partition in bytes, and the disk_total_space function returns
available space on filesystem or disk partition in bytes.

disk_space.php
  

&lt;?php

const BYTES_IN_GIGABYTE = 1073741824;

$total_space_bytes = disk_total_space("/");

if ($total_space_bytes === false) {

    exit("The disk_total_space() failed\n");
}

$free_space_bytes = disk_free_space("/");

if ($free_space_bytes === false) {

    exit("The disk_free_space() failed\n");
}

$total_space_gb = floor($total_space_bytes / BYTES_IN_GIGABYTE);
$free_space_gb = floor($free_space_bytes / BYTES_IN_GIGABYTE);

echo "Total space: $total_space_gb GB\n";
echo "Free space: $free_space_gb GB\n";

The script computes the total and free space on a root partition.
The space is translated into gigabytes.

$ php disk_space.php
Total space: 289 GB
Free space: 50 GB

## Source

[PHP Filesystem Functions - PHP manual](https://www.php.net/manual/en/ref.filesystem.php)

In this article we have presented PHP filesystem functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.