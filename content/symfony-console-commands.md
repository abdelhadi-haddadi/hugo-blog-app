+++
title = "Symfony Console Commands"
date = 2025-08-29T20:12:41.231+01:00
draft = false
description = "Symfony Commands tutorial shows how to create commands in Symfony."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Console Commands

last modified July 5, 2020 

Symfony Console Commands tutorial shows how to create console commands in Symfony.
We are going to create a couple of commands in a console application.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework 
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the Spring Framework.

## Symfony Console Component

Symfony Console component allows us to create command-line commands. The
console commands can be used for creating cronjobs, imports, batch jobs, or
some supportive tasks. Symfony console commands can be used in a Symfony console
application or in a web application. In this tutorial, we will create commnads 
for a console application.

## Symfony Console Command example

In the following example, we create Symfony console application using the 
Symfony Console component. 

$ mkdir commands
$ cd commands

We create a project directory and locate into it.

$ composer require symfony/console

We install the console package.

composer.json
  

{
    "name": "Symfony command application",
    "description": 
    "This application demonstrates the usage of a Symfony command in a console application",
    "require": {
        "symfony/console": "^4.2"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src"
        }
    }
}

We update the composer.json file. We enable autoloading of PHP 
classes located in the src directory under the App 
namespace. 

$ composer dump-autoload -o

After the files are created, we need to call the composer dump-autoload -o
command, which creates a file that maps classes to PHP files.

In the application, we are going to have five commands:    

    - TimeCommand - shows current date and time

    - MessageCommand - shows message from user input

    - ColorCommand - shows messages in color

    - BooksCommand - shows a list of books in a table

    - AskNameCommand - interactively asks user name

The commands are created in the src/Command directory.
A commnad must extend Symfony\Component\Console\Command and 
implement its configure() and execute() methods.

Later, the command is added to a Symfony\Component\Console\Application
with add().

src/Command/TimeCommand.php
  

&lt;?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TimeCommand extends Command 
{
    protected function configure()
    {
        $this-&gt;setName('time')
        -&gt;setDescription('Shows current date and time')
        -&gt;setHelp('This command prints the current date and time');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $now = date('c');
        $message = sprintf("Current date and time: %s", $now);

        $output-&gt;writeln($message);
    }
}

The TimeCommand shows the current date and time.

protected function configure()
{
    $this-&gt;setName('time')
    -&gt;setDescription('Shows current date and time')
    -&gt;setHelp('This command prints the current date and time');
}

In the configure(), we set a name for the command with setName().
The name will be shown in the list of available commands. We also add description and 
help for the command.

protected function execute(InputInterface $input, OutputInterface $output)
{
    $now = date('c');
    $message = sprintf("Current date and time: %s", $now);

    $output-&gt;writeln($message);
}

The InputInterface is used for getting input from users and 
OutputInterface for displaying output. In our case, we 
get the current date and time with date() in standard ISO format and
output it with writeln() to the console.

src/Command/MessageCommand.php
  

&lt;?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;

class MessageCommand extends Command
{
    protected function configure()
    {
        $this-&gt;setName('msg')
            -&gt;setDescription('Prints a user provided message')
            -&gt;setHelp('This command prints a message provided by the user')
            -&gt;addArgument('msg', InputArgument::REQUIRED, 'Pass a message');
    }
 
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $message = sprintf('The message is: %s', $input-&gt;getArgument('msg'));
        $output-&gt;writeln($message);
    }
}

The MessageCommand prints the message retrieved from user's argument
and outputs it to the console.

$this-&gt;setName('msg')
    -&gt;setDescription('Prints a user provided message')
    -&gt;setHelp('This command prints a message provided by the user')
    -&gt;addArgument('msg', InputArgument::REQUIRED, 'Pass a message');

The argument can be either required or optional. The InputArgument::REQUIRED
value makes the argument mandatory.

$message = sprintf('The message is: %s', $input-&gt;getArgument('msg'));
$output-&gt;writeln($message);

We retrieve the argument with getArgument() from the input
and write it to the console with writeln().

src/Command/ColorCommand.php
  

&lt;?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;

class ColorCommand extends Command
{
    protected function configure()
    {
        $this-&gt;setName('colc')
            -&gt;setDescription('Shows output in color')
            -&gt;setHelp('This command shows output in color');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $output-&gt;writeln("&lt;info&gt;Today is a windy day&lt;/info&gt;");

        $outputStyle = new OutputFormatterStyle('red');
        $output-&gt;getFormatter()-&gt;setStyle('redt', $outputStyle);

        $output-&gt;writeln('&lt;redt&gt;Tomorrow will be snowing&lt;/redt&gt;');
    }
}

The ColorCommand outputs text in color.

$output-&gt;writeln("&lt;info&gt;Today is a windy day&lt;/info&gt;");

In this case, we use a built-in info format style.

$outputStyle = new OutputFormatterStyle('red');
$output-&gt;getFormatter()-&gt;setStyle('redt', $outputStyle);

$output-&gt;writeln('&lt;redt&gt;Tomorrow will be snowing&lt;/redt&gt;');

We can also create custom output styles with OutputFormatterStyle.
Our redt shows text in red color.

src/Command/BooksCommand.php
  

&lt;?php

namespace App\Command;

use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class BooksCommand extends Command
{
    protected function configure() 
    {
        $this-&gt;setName('books')
            -&gt;setDescription('Shows books in a table')
            -&gt;setHelp('This command demonstrates the usage of a table helper');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $table = new Table($output);
        
        $table-&gt;setHeaderTitle('Books')
            -&gt;setHeaders(['Title', 'ISBN', 'Author', 'Publisher'])
            -&gt;setRows([
                ['Java Language Features', '978-1-4842-3347-4', 'Kishori Sharan', 'Apress' ],
                ['Python Testing with pytest', '978-1-68-050-240-4', 'Brian Okken', 'The Pragmatic Programmers' ],
                ['Deep Learning with Python', '978-1-61729-443-3', 'Francois Chollet', 'Manning' ],
                ['Laravel up &amp; Running', '978-1-491-93698-5', 'Matt Stauffer', 'O\'Reilly' ],
                ['Sams Teach Yourself TCP/IP', '978-0-672-33789-5', 'Joe Casad', 'SAMS' ]
            ]);

          $table-&gt;render();
    }   
}

The BooksCommand uses a table helper to output data in a table format.

$table = new Table($output);

We create an instance of a Table helper.

$table-&gt;setHeaderTitle('Books')
    -&gt;setHeaders(['Title', 'ISBN', 'Author', 'Publisher'])
    -&gt;setRows([
        ['Java Language Features', '978-1-4842-3347-4', 'Kishori Sharan', 'Apress' ],
        ['Python Testing with pytest', '978-1-68-050-240-4', 'Brian Okken', 'The Pragmatic Programmers' ],
        ['Deep Learning with Python', '978-1-61729-443-3', 'Francois Chollet', 'Manning' ],
        ['Laravel up &amp; Running', '978-1-491-93698-5', 'Matt Stauffer', 'O\'Reilly' ],
        ['Sams Teach Yourself TCP/IP', '978-0-672-33789-5', 'Joe Casad', 'SAMS' ]
    ]);

We build the table. A table header title is specified with setHeaderTitle().
The header names are specified with setHeaders(). Finally, 
the data are added with setRows().

$table-&gt;render();

The table is rendered with render().

src/Command/AskNameCommand.php
  

&lt;?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AskNameCommand extends Command
{
    protected function configure() 
    {
        $this-&gt;setName('ask')
            -&gt;setDescription('Interactively asks name from the user')
            -&gt;setHelp('This command asks a user name interactively and prints it');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $helper = $this-&gt;getHelper('question');
        $question = new Question("Enter your name: ", "guest");

        $name = $helper-&gt;ask($input, $output, $question);
        $message = sprintf("Hello %s!", $name);

        $output-&gt;writeln($message);
    }
}

The AskNameCommand uses the question helper to 
ask for user input.

$helper = $this-&gt;getHelper('question');

A question helper is created with getHelper().

$question = new Question("Enter your name: ", "guest");

A new Question question is created. The second parameter is 
the default value.

$name = $helper-&gt;ask($input, $output, $question);

The question is activate with ask(). The user input is stored
in the $name variable.

$message = sprintf("Hello %s!", $name);

We build a message from the user input with sprintf().

$output-&gt;writeln($message);

Finally, the message is shown in the terminal with writeln().

A new Symfony application is created with Symfony\Component\Console\Application.

Application.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use App\Command\TimeCommand;
use App\Command\BooksCommand;
use App\Command\ColorCommand;
use App\Command\AskNameCommand;
use App\Command\MessageCommand;
use Symfony\Component\Console\Application;

$app = new Application();

$app-&gt;add(new MessageCommand());
$app-&gt;add(new TimeCommand());
$app-&gt;add(new AskNameCommand());
$app-&gt;add(new BooksCommand());
$app-&gt;add(new ColorCommand());

$app-&gt;run();

We create a Symfony console application with five commands.

$app = new Application();

A new console application is created.

$app-&gt;add(new MessageCommand());
$app-&gt;add(new TimeCommand());
$app-&gt;add(new AskNameCommand());
$app-&gt;add(new BooksCommand());
$app-&gt;add(new ColorCommand());

We add commands to the application.

$app-&gt;run();

The application is started with run().

$ php application.php list
Console Tool
...
Available commands:
    ask    Interactively asks name from the user
    books  Shows books in a table
    colc   Shows output in color
    help   Displays help for a command
    list   Lists commands
    msg    Prints a user provided message
    time   Shows current date and time

We can get a list of our commands.

$ php application.php books
+----------------------------+--------------- Books -----------------+---------------------------+
| Title                      | ISBN               | Author           | Publisher                 |
+----------------------------+--------------------+------------------+---------------------------+
| Java Language Features     | 978-1-4842-3347-4  | Kishori Sharan   | Apress                    |
| Python Testing with pytest | 978-1-68-050-240-4 | Brian Okken      | The Pragmatic Programmers |
| Deep Learning with Python  | 978-1-61729-443-3  | Francois Chollet | Manning                   |
| Laravel up &amp; Running       | 978-1-491-93698-5  | Matt Stauffer    | O'Reilly                  |
| Sams Teach Yourself TCP/IP | 978-0-672-33789-5  | Joe Casad        | SAMS                      |
+----------------------------+--------------------+------------------+---------------------------+

We run the books command.

$ php application.php time
Current date and time: 2018-12-20T23:27:16+01:00

We run the time command.

In this tutorial, we have create five console commands in a Symfony console
application.

$ php application.php ask
Enter your name: Peter
Hello Peter!

We run the ask command.

In this tutorial, we have create five console commands in a Symfony console
application.

List [all Symfony](/all/#symfony) tutorials.