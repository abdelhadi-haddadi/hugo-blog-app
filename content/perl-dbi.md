+++
title = "Perl DBI"
date = 2025-08-29T20:03:55.514+01:00
draft = false
description = "Perl DBI tutorial shows how to do database programming in Perl with DBI module. DBI is a database access module for the Perl programming language."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl DBI

last modified August 24, 2023

Perl DBI tutorial shows how to do database programming in Perl with DBI module.

In this article we work with MariaDB database. Most examples should work 
with other databases with little modification. 

**Note: ** While Perl DBI is database independent interface, there 
are a few attributes and SQL statements that are specific to MariaDB.

Some attributes are specific to MariaDB; for instance the 
mariadb_multi_statements attribute which allows to use mutliple
statements in a single query. In addition, there are SQL statements unique to 
MariaDB, such as SELECT VERSION() or USE dbname.

This tutorial presents Perl DBI module with command line examples. Most of them
use automatic error handling provided with DBI. This is fine for scripts, which
for instance, load data from databases to generate reports. On the other hand,
when modifying critical data, working with 24/7 systems and applications that
handle simultaneously thousands of users, the requirements for error handling, 
code correctness and robustness are dramatically different. 

In general, the error messages should not be presented to users. They should 
be written to log files. All possible error messages should be logged; even 
if they are considered harmless. Usernames and passwords should be retrieved 
from configuration files or from environment variables. 

## Perl DBI

The Perl *DBI* (Database Interface) is a database access module for the
Perl programming language. It defines a set of methods, variables and
conventions that provide a standard database interface.

Other languages have created similar universal interfaces for working with
databases. Java has JDBC and PHP has PDO.

The DBI is also responsible for the dynamic loading of drivers, error checking
and handling, providing default implementations for methods, and many other
non-database specific duties. The DBI dispatches method calls to the appropriate
database driver. The *DBD* (Database Driver) is a Perl module which
translates the DBI methods for a specific database engine. The database drivers
are supplied by database vendors.

$ sudo cpanm DBD::MariaDB

In this article we work with the MariaDB database. We install the
DBD::MariaDB module. The module is a MariaDB and MySQL driver for
the Perl5 Database Interface.

drivers.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my @drvs = DBI-&gt;available_drivers;
say join "\n", @drvs;

The example lists all available drivers on our system.

$ ./drivers.pl
DBM
ExampleP
File
Gofer
MariaDB
Mem
Proxy
Sponge
mysql

## Perl common DBI methods

The following table lists some common DBI methods.

Method nameDescription
available_driversReturns a list of all available drivers
connectEstablishes a connection to the requested data source
disconnectDisconnects from the database server
preparePrepares an SQL statement for execution
executeExecutes the prepared statement
doPrepares and executes an SQL statement
bind_paramAssociates a value with a placeholder in a prepared statement
bind_colBinds a Perl variable to an output field of a SELECT statement
begin_workStarts a new transaction
commitWrites the most recent series of uncommitted database changes to the database
rollbackUndoes the most recent series of uncommitted database changes
quoteQuotes a string literal for use as a literal value in an SQL statement
dump_resultsFetches all the rows and prints them
fetchrow_arrayFetches the next row as an array of fields
fetchrow_arrayrefFetches the next row as a reference array of fields
fetchrow_hashrefFetches the next row as a reference to a hashtable
fetchall_arrayrefFetches all data as an array of arrays
finishFinishes a statement and lets the system free resources
rowsReturns the number of rows affected
column_infoProvides information about columns
table_infoProvides information about tables
primary_key_infoProvides information about primary keys in tables
foreign_key_infoProvides information about foreign keys in tables

## Perl DBI conventions

Perl programmers usually use the following variable names when working with Perl
DBI.

Variable nameDescription
$dbhDatabase handle object
$sthStatement handle object
$drhDriver handle object (rarely seen or used in applications)
$hAny of the handle types above ($dbh, $sth, or $drh)
$rcGeneral Return Code  (boolean: true=ok, false=error)
$rvGeneral Return Value (typically an integer)
@aryList of values returned from the database, typically a row of data
$rowsNumber of rows processed (if available, else -1)
$fhA filehandle
undefNULL values are represented by undefined values in Perl
\%attrReference to a hash of attribute values passed to methods

## Perl DBI database connection

The connect method is used to establish a connection to the
database. The disconnect method is used to close the database
connection.

$dbh = DBI-&gt;connect($dsn, $username, $password)
    or die $DBI::errstr;

$dbh = DBI-&gt;connect($dsn, $username, $password, \%attr)
    or die $DBI::errstr;

The connect method establishes a database connection to the
requested data source. It returns a database handle object if the connection
succeeds. We use the disconnect method to terminate the connection.

The $dsn is the data source name. It is a string that tells DBI
what kind of driver it should load and the location of the database to which the
connection is going to be created.

dbi:DriverName:database_name
dbi:DriverName:database_name@hostname:port
dbi:DriverName:database=database_name;host=hostname;port=port

The above strings are examples of data source names in Perl DBI.

dbi:MariaDB:dbname=testdb

The dsn starts always with the dbi: substring. Then we
have the driver name. In our case the driver name is MariaDB. The
third part is the database name. We work with testdb throughout
this tutorial.

The $username and the $password are the user name and
the password that are needed for authentication. The final parameter is a
reference to hash, in which we can set attributes to alter the default settings
of a connection. For example the RaiseError attribute can be used to force
errors to raise exceptions rather than return error codes. The
HandleError attribute can be used to  provide a subroutine which is
called in case of error. The AutoCommit attribute sets or unsets the autocommit
mode.

The $DBI::errstr is a DBI dynamic attribute which returns the
native database engine error message. In case the connection fails, this message
is displayed and the script is aborted.

## Perl DBI ping

The ping method attempts to determine if the database server is
live. It tries to connect to the database in a "reasonably efficient way".

pinging.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:";
my $user = "user7";
my $password = 's$cret';

my $dbh = DBI-&gt;connect($dsn, $user, $password)
    or die "failed to connect to the database $DBI::errstr";

if ($dbh-&gt;ping) {

    say 'database is up';
} else {

    say 'database is down';
}

$dbh-&gt;disconnect;

The example checks if the database server is up using the ping 
method.

my $dsn = "dbi:MariaDB:";

We specify the datasource name. We do not specify the database name, since in
this example we are only checking the availability of the server.

my $dbh = DBI-&gt;connect($dsn, $user, $password)
     or die "failed to connect to the database $DBI::errstr";

The connect method establishes a database connection, or session,
to the requested datasource. It returns a database handle object if the
connection succeeds. At the end we call disconnect to terminate the
connection. If it fails, it returns undef and sets both
$DBI::err and $DBI::errstr. We check the returned 
value with die.

The first parameter is the data source name. In the string we specify the
database driver and the database name. The second parameter is the user name.
The third parameter is the user password.

## Perl DBI get_info

The get_info method returns details about a database.

version.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;
use DBI::Const::GetInfoType;

my $dsn = "dbi:MariaDB:";
my $user = "user7";
my $password = 's$cret';

my $dbh = DBI-&gt;connect($dsn, $user, $password)
    or die "failed to connect to the database $DBI::errstr";

say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_NAME});
say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_VER});

$dbh-&gt;disconnect;

The example prints the name and the version of the database server.

use DBI::Const::GetInfoType;

The use statement imports a %GetInfoType hash which
maps names for GetInfo Type Codes into their corresponding numeric values. 

say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_NAME});
say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_VER});

We get the database server name and version.

$ ./version.pl 
MariaDB
10.03.2400

The next example connects to a PostgreSQL database and gets its version.

$ sudo apt install postgresql-server-dev-13

Before installing the driver, we need to have the PostgreSQL development files
installed.

$ sudo cpanm DBD::Pg

We install the DBD::Pg driver.

version2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;
use DBI::Const::GetInfoType;

my $dsn = "dbi:Pg:dbname=testdb";
my $user = "user7";
my $password = 's$cret';

my $dbh = DBI-&gt;connect($dsn, $user, $password)
    or die "failed to connect to the database $DBI::errstr";

say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_NAME});
say $dbh-&gt;get_info($GetInfoType{SQL_DBMS_VER});

$dbh-&gt;disconnect;

The drivers' name of PostgreSQL is Pg. Unlike the
MariaDB driver, Pg requires the database name in its 
datasource.

$ ./version2.pl 
PostgreSQL
11.00.0500

## Perl DBI DBI_DSN

DBI checks the DBI_DSN environment variable if the DSN parameter 
is undef or empty.

dsn_env.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;
use DBI::Const::GetInfoType;

my $user = "user7";
my $password = 's$cret';

my $dbh = DBI-&gt;connect('', $user, $password)
    or die "failed to connect to the database $DBI::errstr";

my $db_server_name = $dbh-&gt;get_info($GetInfoType{SQL_DBMS_NAME});
say $db_server_name;

In the example, we set the DSN to an empty string. The datasource details 
are retrieved from the DBI_DSN environment variable. 

$ export DBI_DSN=dbi:MariaDB:
$ ./dsn_env.pl 
MariaDB

$ export DBI_DSN=dbi:Pg:dbname=testdb
$ ./dsn_env.pl 
PostgreSQL

## Perl DBI fetch single field

In the next example, we determine the version of the database with the 
SELECT VERSION() statement. This SQL statement is unique to
MariaDB. The statement returns a single data unit.

mariadb_select_version.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:";
my $user = "user7";
my $password = 's$cret';
my %attr = (PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attr)
    or die "failed to connect to the database: $DBI::errstr";

my $sth = $dbh-&gt;prepare("SELECT VERSION()")
    or die "failed to prepare statement $DBI::errstr";

$sth-&gt;execute or die "failed to execute statement $DBI::errstr";

my $row = $sth-&gt;fetch or die "failed to fetch data $DBI::errstr";

say $row-&gt;[0];

$dbh-&gt;disconnect;

The example executes an SQL statement which returns the version of the MariaDB
database. By default, each of the DBI methods returns an error code; we check
the code with the die method.

my $dsn = "dbi:MariaDB:";

For executing the SELECT VERSION() statement, the database name is 
not necessary.

my %attr = (PrintError =&gt; 0);

The PrintError attribute can be used to force errors to generate
warnings (using warn) in addition to returning error codes in the default way. 
We set it to 0 to avoid duplicate error messages. (We are generating our own 
errors with die).

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attr)
     or die "failed to connect to the database: $DBI::errstr";

The connection attributes are passed as the fourth (optional) parameter to the 
connect.

my $sth = $dbh-&gt;prepare("SELECT VERSION()")
     or die "failed to prepare statement $DBI::errstr";

$sth-&gt;execute or die "failed to execute statement $DBI::errstr";

The prepare method prepares an SQL statement for later execution.
The execute method executes the SQL statement.

my $row = $sth-&gt;fetch or die "failed to fetch data $DBI::errstr";

The data is retrieved with fetch; it fetches the next row of data
and returns a reference to an array.

say $row-&gt;[0];

We print first field of the row which contains the version of the database. 
The Perl array dereference syntax is used to get the field.

$dbh-&gt;disconnect;

We close the connection to the database.

$ ./mariadb_select_version.pl
10.3.24-MariaDB-2

## Creating a table

The do method executes an SQL statement. It combines two method 
calls: prepare and execute into one single call. 
The do method is used for non-select statements. 

create_cars.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attr = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attr);

$dbh-&gt;do("DROP TABLE IF EXISTS cars");
$dbh-&gt;do("CREATE TABLE cars(id INT PRIMARY KEY, name VARCHAR(255), price INT)");
$dbh-&gt;do("INSERT INTO cars VALUES(1,'Audi',52642)");
$dbh-&gt;do("INSERT INTO cars VALUES(2,'Mercedes',57127)");
$dbh-&gt;do("INSERT INTO cars VALUES(3,'Skoda',9000)");
$dbh-&gt;do("INSERT INTO cars VALUES(4,'Volvo',29000)");
$dbh-&gt;do("INSERT INTO cars VALUES(5,'Bentley',350000)");
$dbh-&gt;do("INSERT INTO cars VALUES(6,'Citroen',21000)");
$dbh-&gt;do("INSERT INTO cars VALUES(7,'Hummer',41400)");
$dbh-&gt;do("INSERT INTO cars VALUES(8,'Volkswagen',21600)");

$dbh-&gt;disconnect;

say 'table cars created';

The example creates the cars table. It consists of non-select 
statements--all are executed with the do method.

my %attr = (RaiseError =&gt; 1, PrintError =&gt; 0);

Setting the RaiseError to 1 forces the errors to raise exceptions
rather than return error codes. Therefore, we do not use the die
functions for each statement. Now in case of an error, the script is terminated
and the error is printed to the console. 

$ ./create_cars.pl 
table cars created
     
MariaDB [testdb]&gt; SELECT * FROM cars;
+----+------------+--------+
| id | name       | price  |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+
8 rows in set (0.000 sec)

We execute the program and check the data in the table.

## Perl DBI prepared statements

 
*Prepared statements* use placeholders instead of directly writing the
values into the statements. Prepared statements increase security and
performance.

my $id = shift;

my $query1 = "SELECT * FROM cars WHERE id=$id";
my $query2 = "SELECT * FROM cars WHERE id=" . $id;
my $query3 = sprintf "SELECT * FROM cars WHERE id=%s", $id;

These SQL statements are vulnerable to SQL injection attacks. SQL queries should 
never be constructed with string interpolation, formatting or addition. 
To avoid SQL injection attacts, we must use prepared statements where we 
bind variables to predefined placeholders, as demonstrated by the following 
example.

prepared.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attr = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $id1 = shift || 1;
my $id2 = shift || 2;
my $id3 = shift || 3;

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attr);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars WHERE id IN (?, ?, ?)");
$sth-&gt;execute($id1, $id2, $id3);

while (my($id, $name, $price) = $sth-&gt;fetchrow()) {
    
    print "$id $name $price\n";
}

$dbh-&gt;disconnect;

The example selects three rows from the cars table.

my $dsn = "dbi:MariaDB:dbname=testdb";

We are going to create a new database table so we need to provide a database 
name to connect. In our case, the database name is testdb specified 
with the dbname in the datasource.

my $sth = $dbh-&gt;prepare("SELECT * FROM cars WHERE id IN (?, ?, ?)");

We use three placeholders for values which are going to be bound later; the 
placeholders are denoted with question marks (?). 

$sth-&gt;execute($id1, $id2, $id3);

The parameters passed to the execute method are bound the the 
placeholders.

$ ./prepared.pl 
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
$ ./prepared.pl 2 4 7
2 Mercedes 57127
4 Volvo 29000
7 Hummer 41400

An alternative syntax for prepared statements is to use the
bind_param method.

prepared2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attr = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $id1 = shift || 1;
my $id2 = shift || 2;
my $id3 = shift || 3;

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attr);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars WHERE id IN (?, ?, ?)");

$sth-&gt;bind_param(1, $id1);
$sth-&gt;bind_param(2, $id2);
$sth-&gt;bind_param(3, $id3);

$sth-&gt;execute;

while (my($id, $name, $price) = $sth-&gt;fetchrow) {

    say "$id $name $price";
}

$dbh-&gt;disconnect;

In this example, the parameters are not bound by passing them to the
execute method, but are bound with the bind_param
method.

mariadb_change_database.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT DATABASE()");
$sth-&gt;execute;

my $row = $sth-&gt;fetch;
say "$row-&gt;[0]";

$dbh-&gt;do("USE mydb");

$sth = $dbh-&gt;prepare("SELECT DATABASE()");
$sth-&gt;execute;

$row = $sth-&gt;fetch;
say "$row-&gt;[0]";

$dbh-&gt;disconnect;

The example changes and prints the current database.

my $dsn = "dbi:MariaDB:dbname=testdb";

The database to connect to is given with the dbname option.

my $sth = $dbh-&gt;prepare("SELECT DATABASE()");

In MariaDB, the SELECT DATABASE() returns the currently used 
database name. 

$dbh-&gt;do("USE mydb");

We change the current database to mydb with USE 
statement.

$ ./mariadb_change_database.pl 
testdb
mydb
 -->

## Perl DBI error handling

In some cases, proper error handling may require more time and energy than the 
actual work with the data. Automatic error handling provided by Perl DBI is fine 
for command line programs, provided they are run be knowledgeable users.

But when we deal with critical data, systems that run 24/7, or applications that
are simultaneously used by thousands of users, the requirements for error
handling are very different.

In general, errors are never reported directly to the users, but rather written
to log files. Errors should be never ignored, even if they are considered
harmless. Usernames and passwords are not written in programs, but retrieved 
from configuration files or environment variables.

Method nameDescription
$h-&gt;errReturns the native database engine error code from the last driver method called.
$h-&gt;errstrReturns the native database engine error message from the last DBI method called.
$h-&gt;stateReturns a state code in the standard SQLSTATE five character format.

The above three methods deal with error messages.

DBI dynamic attributeDescription
$DBI::errEquivalent to $h-&gt;err
$DBI::errstrEquivalent to $h-&gt;errstr
$DBI::stateEquivalent to $h-&gt;state

The second table gives a list of DBI dynamic attributes, which are related to
error handling. These attributes have a short lifespan. They should be used
immediately after the method that might cause an error. 

By default, Perl DBI reports errors with the warn function. This is
controlled by the PrintError option, which is set to 1. In case of
en error, it effectively does warn("$class $method failed:
$DBI::errstr), where $class is the driver class and
$method is the name of the method that failed.

 

The RaiseError attribute can be used to force errors to raise
exceptions rather than simply return error codes in the default way. It is 0 by
default. When set 1  any method which results in an error will cause the DBI to
effectively do a die("$class $method failed: $DBI::errstr").

The current best practice is to set the RaiseError to 1 and handle 
the errors with the eval method, or by using Try::Tiny
module.

## Perl DBI error subroutines

With the HandleError connection handle attribute, we can set a reference to a
subroutine, which is called when an error is detected. The subroutine is called
with three parameters: the error message string that RaiseError and
PrintError would use, the DBI handle being used, and the first
value being returned by the method that failed (typically undef).

If the subroutine returns a false value then the RaiseError 
or PrintError attributes are checked and acted upon as normal.

The AutoCommit option controlls if each statment is automatically
committed, or the statements are run within a transaction. Each transaction is
then finished with the commit or rollback method.

**Note: **In DBI, the AutoCommit option is set 
to 1 by default.

The begin_work function enables transactions (by turning
AutoCommit off) until the next call to commit or rollback. After
the next commit or rollback, AutoCommit will automatically be
turned on again.

err_sub.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 1, AutoCommit =&gt; 0, 
    HandleError =&gt; \&amp;handle_error);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

$dbh-&gt;do("UPDATE cars SET price=52000 WHERE id=1");
$dbh-&gt;do("UPDATE car SET price=22000 WHERE id=8");

$dbh-&gt;commit;
$dbh-&gt;disconnect;

sub handle_error {
    
    $dbh-&gt;rollback; 

    my $error = shift;

    say "An error occurred in the script";
    say "Message: $error";

    return 1;
}

We have two SQL UPDATE statements; the second statement has an error: the table
name is incorrect. We handle the error inside the handle_error
subroutine.

my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0, AutoCommit =&gt; 0, 
     HandleError =&gt; \&amp;handle_error);

The HandleError attribute provides a reference to a
handle_error subroutine that is called, when an error is detected.
The AutoCommit is turned off, which means that we work with
transactions.

$dbh-&gt;do("UPDATE car SET price=22000 WHERE id=8");

There is an error in the SQL statement: there is no car table. 

sub handle_error {
    
    $dbh-&gt;rollback; 

    my $error = shift;

    say "An error occurred in the script";
    say "Message: $error";

    return 1;
}

This is the handle_error subroutine. We print the error message and
return 1. If we returned 0 instead, additional error messages would appear.
Returning 1 error messages associated with the RaiseError
attribute are supressed.

$ ./err_sub.pl 
An error occurred in the script
Message: DBD::MariaDB::db do failed: Table 'testdb.car' doesn't exist

The program fails with an error. Since both statements were run inside a single
transaction, no row was updated.

## Perl DBI error handling with eval

The eval function executes some Perl code, traps possible errors 
without crashing the program.

eval_error.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;
use DBI qw(:sql_types);

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

eval {

    $dbh-&gt;begin_work;

    $dbh-&gt;do("UPDATE cars SET price=52000 WHERE id=1");
    $dbh-&gt;do("UPDATE cars SET price=22000 WHERE id=8");

    $dbh-&gt;commit;

} or do {

    warn "Database error: $DBI::errstr\n";
    $dbh-&gt;rollback;
};

$dbh-&gt;disconnect;

With begin_work, we put two update statements into a transaction.

eval {

    $dbh-&gt;begin_work;

    $dbh-&gt;do("UPDATE cars SET price=52000 WHERE id=1");
    $dbh-&gt;do("UPDATE cars SET price=22000 WHERE id=8");

    $dbh-&gt;commit;

} or do {
...

The statements are placed into eval block, which traps possible 
errors and prevents script from crashing.

} or do {

    warn "Database error: $DBI::errstr\n";
    $dbh-&gt;rollback;
};

When the eval fails, we rollback the transaction.

## Perl DBI error handling with Try::Tiny

The Try::Tiny module allows us to use try/catch/finally block 
to handle errors. This is the traditional way of handling exceptions in 
languages such as C# or Java.

The module copies the $@ into the $_.

catching.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;
use Try::Tiny;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

try {
    $dbh-&gt;begin_work;

    $dbh-&gt;do("UPDATE cars SET price=52000 WHERE id=1");
    $dbh-&gt;do("UPDATE cars SET price=22000 WHERE id=8");
    
    $dbh-&gt;commit;

} catch {

    $dbh-&gt;rollback;
    warn "failed to update data\n$_";

} finally {

    $dbh-&gt;disconnect;
}

The error prone code is placed into the try block. If an error 
occurrs, the catch block is executed. The finally 
block is always executed, regardles of error. There we place the code that
cleans up resources.

## Perl DBI fetching data

Data is retrieved from the database with the SELECT statement. In
DBI, first we prepare the SQL statement with the prepare
method. The SQL string is sent to the database engine, which checks the
statement validity, syntax and in some databases also the user permissions to
perform certain queries. If all is OK, a reference to the statement handle is
returned.

The next step is the call to the execute method. The method
executes the query within the database. At this moment the result stays in the
database. The Perl script does not contain the data yet. For non-select
statements, the execute method returns the number of rows affected
if known. In the last step the data is fetched from the database. The data is
pulled row by row and populated into the Perl data structures. 

The Perl DBI has several methods to fetch data from database tables. 

MethodDescription
fetchrow_arrayrefFetches the next row of data and returns a reference to an array.
fetchrow_arrayFetches the next row of data and returns it as a list.
fetchrow_hashrefFetches the next row of data and returns it as a reference to a hash.
fetchall_arrayrefFetches all data &amp; returns a reference to an array that has one reference per row.
fetchThe method is an alias for fetchrow_arrayref.
fetchrowThe method is an alias for fetchrow_array.

After the SQL statement was prepared and executed, we call one of the available fetch methods. 

MethodDescription    
selectrow_arrayrefCombines prepare, execute and fetchrow_arrayref into a single call.
selectrow_hashrefCombines prepare, execute and fetchrow_hashref into a single call.
selectrow_arrayCombines prepare, execute and fetchrow_array into a single call.
selectall_arrayrefCombines prepare, execute and fetchall_arrayref into a single call.
selectall_hashrefCombines prepare, execute and fetchall_hashref into a single call.
selectcol_arrayrefCombines prepare, execute and fetching one col from all rows into a single call.

In the second table we have a list of utility methods which combine three
methods into one call. They are convenience methods.

## Perl DBI fetchrow

The fetchrow method gets the next row of data and returns it as 
a list.

fetch_single_row.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:mysql:dbname=mydb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 1);

my $id = shift || 1;

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars WHERE id=?");
$sth-&gt;execute($id);
      
my ($id, $name, $price) = $sth-&gt;fetchrow;
say "$id $name $price";

my $n_fields = $sth-&gt;{NUM_OF_FIELDS};
say "query contains $n_fields field(s)";

my $n_rows = $sth-&gt;rows;
say "We have selected $n_rows row(s)";

$dbh-&gt;disconnect;

The example gets and prints a single row from the cars table.
In addition, we print the number of fields and rows retrieved.

my ($id, $name, $price) = $sth-&gt;fetchrow;
say "$id $name $price";

We get the row as a list and assign them into three variables.

my $n_fields = $sth-&gt;{NUM_OF_FIELDS};

We get the number of retrieved fields with the NUM_OF_FIELDS 
attribute.

my $n_rows = $sth-&gt;rows;

We get the number of retrieved rows with the rows method.

$ ./fetch_single_row.pl 3
3 Skoda 9000
query contains 3 field(s)
We have selected 1 row(s)

In the next example, we get all rows from the table.

fetch_all_rows.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars");
$sth-&gt;execute;

while (my($id, $name, $price) = $sth-&gt;fetchrow) {
    
    say "$id $name $price";
}

$dbh-&gt;disconnect;

The fetchrow is placed inside the while loop to get all the rows. 
It returns false when there are no more rows to read.

while (my @row = $sth-&gt;fetchrow) {

     say "$row[0] $row[1] $row[2]";
}

This is an alternative syntax to get the rows with fetchrow.

$ ./fetch_all_rows.pl 
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## Perl DBI fetchrow_hashref

The fetchrow_hashref method fetches the next row as a reference to
a hashtable.

fetch_all_rows2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars");
$sth-&gt;execute;

while (my $row = $sth-&gt;fetchrow_hashref) {

    say "$row-&gt;{id} $row-&gt;{name} $row-&gt;{price}";
}

$dbh-&gt;disconnect;

The example retrieves all rows with fetchrow_hashref.

while (my $row = $sth-&gt;fetchrow_hashref) {

     say "$row-&gt;{id} $row-&gt;{name} $row-&gt;{price}";
}

We get each row as a reference to a hash. We dereference the fields of the row 
with the arrow operator.

## Perl DBI select_row_array

The select_all_array is one of the convenience methods; it combines
prepare, execute and fetchrow_array into a single call.

select_all_array.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my @rows = $dbh-&gt;selectall_array("SELECT * FROM cars");

foreach my $row (@rows) {
    
    my ($id, $name, $price) = @$row;
    say "$id $name $price";
}

$dbh-&gt;disconnect;

The example retrieves all rows from the cars table using the 
select_all_array method.

## Perl DBI binding columns to variables

Column fields of SELECT statements can be bound to variables with
bind_col and bind_columns methods.

bind_col.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my ($id, $name, $price);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars");
$sth-&gt;execute;

$sth-&gt;bind_col(1, \$id);
$sth-&gt;bind_col(2, \$name);
$sth-&gt;bind_col(3, \$price);

while ($sth-&gt;fetch) {

    say "$id $name $price";
}

$dbh-&gt;disconnect;

In the example, we bind the three columns fields to the $id,
$name, and $price variables with
bind_col.

We can bind all fields in one go with bind_columns.

bind_columns.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars");
$sth-&gt;execute;

$sth-&gt;bind_columns(\my($id, $name, $price));

while ($sth-&gt;fetch) {

    say "$id $name $price";
}

$dbh-&gt;disconnect;

The bind_columns calls the bin_col method for each
column of the SELECT statement. It taks a list of variable references as its
parameter. The number of variable references should match the number of columns
in the SELECT statement. 

## Perl DBI multiple queries

MariaDB allows to execute multiple SQL statements in one query. The feature is
turned off by default; we need to enable it with the 
mariadb_multi_statements option.

multiple_queries.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb;mariadb_multi_statements=1";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $query = qq{
    SELECT * FROM cars WHERE id=1;
    SELECT * FROM cars WHERE id=2;
    SELECT * FROM cars WHERE id=3;
};

my $sth = $dbh-&gt;prepare($query);
$sth-&gt;execute;

do  {

    while (my @row = $sth-&gt;fetchrow)
    {
        say "@row";
    }

} while ($sth-&gt;more_results);

$dbh-&gt;disconnect;

In the example, we execute three SELECT statement in a single query. 

do  {

     while (my @row = $sth-&gt;fetchrow)
     {
          say "@row";
     }
     
} while ($sth-&gt;more_results);

The data is retrieved in a do/while loop. We check if there are additional
result sets with more_results method.

## Perl DBI insert image

In the next example, we insert an image into the table.

CREATE TABLE images(id INT PRIMARY KEY AUTO_INCREMENT, data MEDIUMBLOB);

We create the images table. For the images, we use the
MEDIUMBLOB data type, which stores binary objects. 

insert_image.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $filename = 'sid.jpg';

open(my $fh,  $filename)
  or die "failed not open file $filename $!";

my ($img_data, $buff);

while (read $fh, $buff, 1024) {

    $img_data .= $buff;
}

my $stm = $dbh-&gt;prepare("INSERT INTO images(data) VALUES (?)");
$stm-&gt;bind_param(1, $img_data, DBI::SQL_BLOB);
$stm-&gt;execute;

$fh-&gt;close;
$dbh-&gt;disconnect;

We read image data from a file and write it into the images table. 

$stm-&gt;bind_param(1, $img_data, DBI::SQL_BLOB);

We tell DBI that our data is of DBI::SQL_BLOB in the
bind_param method.

## Perl DBI read image

The next example reads the image back from the database table and stores it 
into a file.

read_image.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $stm = $dbh-&gt;prepare("SELECT data FROM images WHERE id=1");
$stm-&gt;execute;

my $img_data = $stm-&gt;fetch;

my $filename = 'sid2.jpg';

open(my $fh, '&gt;', $filename)
  or die "failed writing to file $!";

print $fh @$img_data;

$fh-&gt;close;
$dbh-&gt;disconnect;

The example uses the SELECT statement to retrieve the binary data. 

## Perl DBI metadata

Metadata is information about the data in the database. Metadata in a database
contains information about the tables and columns in which we store data.
Number of rows affected by an SQL statement is a metadata. Number of rows and
columns returned in a result set belong to metadata as well.

Method nameDescription
column_infoProvides information about columns
table_infoProvides information about tables
primary_key_infoProvides information about primary keys in tables
foreign_key_infoProvides information about foreign keys in tables

The above table lists four Perl DBI methods which are used to retrieve metadata. 

pripary_key_info.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:mysql:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;primary_key_info(undef, "testdb", "cars");
my @ary = $sth-&gt;fetchrow;

say "@ary";

$dbh-&gt;disconnect;

The primary_key_info returns an active statement handle that can be
used to fetch information about columns that make up the primary key for a
table. 

$ ./primary_key_info.pl 
testdb cars id 1 PRIMARY

The table_info method returns an active statement handle that can
be used to fetch information about tables and views that exist in the database.

$sth = $dbh-&gt;table_info($catalog, $schema, $table, $type);

The arguments may accept search patterns using the % character.

list_tables.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;table_info('', 'testdb', '', 'TABLE');

while (my $row = $sth-&gt;fetchrow_hashref) {

  say $row-&gt;{TABLE_NAME};
}

$dbh-&gt;disconnect;

We get all the tables in the testdb database with
table_info.

my $sth = $dbh-&gt;table_info('', 'testdb', '', 'TABLE');

We specify that we want table names in the testdb database.

$ ./list_tables.pl 
cars
cities
countries
friends
images
writers

list_databases.pl
  

```
#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;table_info('', '%', '', '%');

while (my $row = $sth-&gt;fetchrow_hashref) {

  say $row-&gt;{TABLE_SCHEM};
}

$dbh-&gt;disconnect;

```

This example lists all database names.

$ ./list_databases.pl 
information_schema
mydb
mysql
performance_schema
testdb

The last_insert_id returns a value identifying the row just
inserted, if possible. Typically this would be a value assigned by the database
server to a column with an auto_increment or serial type. It returns
undef if the driver does not support the method or can't determine
the value.

last_insert_id.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

$dbh-&gt;do("DROP TABLE IF EXISTS friends");
$dbh-&gt;do("CREATE TABLE friends(id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255))");
$dbh-&gt;do("INSERT INTO friends(name) VALUES ('Tom')");
$dbh-&gt;do("INSERT INTO friends(name) VALUES ('Rebecca')");
$dbh-&gt;do("INSERT INTO friends(name) VALUES ('Jim')");
$dbh-&gt;do("INSERT INTO friends(name) VALUES ('Robert')");
$dbh-&gt;do("INSERT INTO friends(name) VALUES ('Julian')");
    
my $id = $dbh-&gt;last_insert_id('', '', 'friends', '');
say "The last Id of the inserted row is $id";

$dbh-&gt;disconnect;

We create a new table. Then we determine the last inserted id. 

$ ./last_insert_id.pl 
The last Id of the inserted row is 5

In the following example, we print all rows from the cars table
with their column names. 

column_names.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use DBI;

my $dsn = "dbi:MariaDB:dbname=testdb";
my $user = "user7";
my $password = 's$cret';
my %attrs = (RaiseError =&gt; 1, PrintError =&gt; 0);

my $dbh = DBI-&gt;connect($dsn, $user, $password, \%attrs);

my $sth = $dbh-&gt;prepare("SELECT * FROM cars");  
$sth-&gt;execute;

my $headers = $sth-&gt;{NAME};

my ($id, $name, $price) = @$headers;
printf "%s %-10s %s\n", $id, $name, $price;

while (my $row = $sth-&gt;fetchrow_hashref) {

    printf "%d %-10s %d\n", $row-&gt;{id}, $row-&gt;{name}, $row-&gt;{price};
}

$dbh-&gt;disconnect;

The records are aligned with the column names. 

my $headers = $sth-&gt;{NAME};

The NAME statement handle attribute returns a reference to an array
of field names for each column. 

$ ./column_names.pl 
id name       price
 1 Audi       52000
 2 Mercedes   57127
 3 Skoda      9000
 4 Volvo      29000
 5 Bentley    350000
 6 Citroen    21000
 7 Hummer     41400
 8 Volkswagen 22000

In this article we have worked with the Perl DBI module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).