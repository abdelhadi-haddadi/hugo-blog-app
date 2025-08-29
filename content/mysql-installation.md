+++
title = "MySQL installation"
date = 2025-08-29T20:03:46.465+01:00
draft = false
description = "In this part of the MySQL tutorial, we show how to install MySQL. We show how to install MySQL with a package manager and from sources."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../firststeps/)

# MySQL installation

last modified January 10, 2023 

In this part of the MySQL tutorial, we are going to cover the
installation of the MySQL database management system. In this chapter, 
we will install MySQL on Linux. 

There are several ways how we can install MySQL on our system. We can install
MySQL from packages, from binaries or from the sources. 

## Installing MySQL from packages

The easiest way to install MySQL is through package system.

$ sudo apt-get install mysql-server

On Ubuntu and other Debian based distributions, we can easily install MySQL 
from packages by using the apt-get tool. This command installs the MySQL 
server and various other packages. While installing the packages, we are 
prompted to enter a password for the MySQL root account.

$ sudo yum install mysql-server

On CentOS, we install MySQL server with the above command.

## Installing MySQL from sources

Installing MySQL from sources gives us the most options to build
MySQL according to our preferences. We can customise installation locations,
various build parameters or compiler optimisations.

### Installing necessary tools

Before we start to build MySQL, we need to install several prerequisites.

$ sudo apt-get install g++

We must install C++ compiler if not present.

$ sudo apt-get install libncurses5-dev

We also need the development version of the Curses library.

$ sudo apt-get install cmake bison
$ which cmake bison perl
/usr/bin/cmake
/usr/bin/bison
/usr/bin/perl

In addition, we need to the following three tools installed on our system: cmake, 
bison, and perl. In our case, we had to install the cmake tool. 
The cmake tool has replaced the configure tool, because it is 
more portable. 

### Installing Boost

We need to install the Boost C++ library. MySQL 5.7.17 requires Boost 1.59.0.

$ wget http://sourceforge.net/projects/boost/files/boost/1.59.0/boost_1_59_0.tar.gz

We download the sources of the Boost library.

$  tar xzvf boost_1_59_0.tar.gz 
$ cd boost_1_59_0/

We decompress the archive and go the the boost_1_59_0 directory.

$ ./bootstrap.sh 
$ sudo ./b2 install

With these two commands, we install Boost.

### Pre-configuration setup

We create a mysql group and user.

$ sudo addgroup --system mysql
$ sudo adduser --system mysql --no-create-home -ingroup mysql

We create a mysql system group and a mysql system user on our computer. 
Each process in Linux is owned by a specific user. The MySQL daemon will 
be owned by user mysql. Note that mysql is not a normal user account; 
it is a system user. 

### Getting MySQL sources

From [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/), we select
the MySQL Community Edition, then MySQL Community Server, and Generally
available MySQL Community Release. From the Select platform combo box, we choose Source Code option. 
We choose the sources targeted for Ubuntu Linux, 64-bit.

$ wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-source_5.7.17-1ubuntu16.10_amd64.deb

After we figured the location of the archive, we can use the wget tool to dowload 
the sources.

$ ls -sh mysql-community-source_5.7.17-1ubuntu16.10_amd64.deb 
136M mysql-community-source_5.7.17-1ubuntu16.10_amd64.deb

We have downloaded MySQL 5.7.17 sources for Ubuntu Linux on 64-bit architecture in a
deb package.

$ md5sum mysql-community-source_5.7.17-1ubuntu16.10_amd64.deb

We verify the sources with the md5sum tool and compare the generated hash 
with the one on the website.

$ expr 0b966bc6434d8a8020b9c4f32c93a1e7 == 0b966bc6434d8a8020b9c4f32c93a1e7
1

We can use the expr command to quickly compare the two hashes.

With the ar tool, we have extracted the data from the deb package.

-->

Now we extract the data.tar.xz file with the tar tool.

-->

We go to the usr/src/mysql directory.

-->

$ sudo dpkg -i mysql-community-source_5.7.17-1ubuntu16.10_amd64.deb

We install the deb package. The files are installed to
the /usr/src/mysql directory.

$ mkdir build_mysql
$ cd build_mysql
$ cp /usr/src/mysql/mysql-community_5.7.17.orig.tar.gz .

We create a build directory, chande to that directory, and copy the sources
into it.

$ tar xzvf mysql-community_5.7.17.orig.tar.gz

Now we decompress the sources.

$ cd mysql-5.7.17/

We go to the mysql-5.7.17 directory, where we have the sources.

$ ls
BUILD            Docs                 libmysqld    README         unittest
client           Doxyfile-perfschema  libservices  regex          VERSION
cmake            extra                man          scripts        vio
CMakeLists.txt   include              mysql-test   sql            win
cmd-line-utils   INSTALL              mysys        sql-common     zlib
config.h.cmake   libbinlogevents      mysys_ssl    storage
configure.cmake  libbinlogstandalone  packaging    strings
COPYING          libevent             plugin       support-files
dbug             libmysql             rapid        testclients

We show the source directory.

$ cmake -L
-- Running cmake version 3.5.1
-- Could NOT find Git (missing:  GIT_EXECUTABLE) 
-- Configuring with MAX_INDEXES = 64U
-- SIZEOF_VOIDP 8
-- MySQL 5.7.17
-- Packaging as: mysql-5.7.17-Linux-x86_64
-- Found /usr/local/include/boost/version.hpp 
-- BOOST_VERSION_NUMBER is #define BOOST_VERSION 105900
-- BOOST_INCLUDE_DIR /usr/local/include
-- Found Curses: /usr/lib/x86_64-linux-gnu/libcurses.so  
-- Looking for tputs in /usr/lib/x86_64-linux-gnu/libcurses.so
-- Looking for tputs in /usr/lib/x86_64-linux-gnu/libcurses.so - found
-- Performing Test HAVE_DECL_TGOTO
-- Performing Test HAVE_DECL_TGOTO - Success
...

The -L option shows some of the default configure options. 
The system is going to be installed to /usr/loca/mysql directory. 
For us it is important to have InnoDB storage engine configured to be included. 

$ cmake .

We configure the build. We leave all the default settings. In case we 
wanted to have also the MySQL embedded system, we would provide 
the -DWITH_EMBEDDED_SERVER=1 option.

$ make
$ sudo make install

We make the system and install it.

### Post-installation setup

Additional steps are required after MySQL was installed on our 
system.

$ cd /usr/local/mysql
$ sudo chown -R mysql .
$ sudo chgrp -R mysql .

We are located in the /usr/local/mysql directory. We change the 
group and owner of all files located in the mentioned directory. The 
-R option means recursive operation. This means that the two 
commands operate on all files and directories and the contents of the directories. 

$ ls -l
total 56
drwxr-xr-x  2 mysql mysql  4096 Jan 26 15:54 bin
-rw-r--r--  1 mysql mysql 17987 Nov 28 14:32 COPYING
drwxr-xr-x  2 mysql mysql  4096 Jan 26 15:53 docs
drwxr-xr-x  3 mysql mysql  4096 Jan 26 15:53 include
drwxr-xr-x  4 mysql mysql  4096 Jan 26 15:54 lib
drwxr-xr-x  4 mysql mysql  4096 Jan 26 15:53 man
drwxr-xr-x 10 mysql mysql  4096 Jan 26 15:55 mysql-test
-rw-r--r--  1 mysql mysql  2478 Nov 28 14:32 README
drwxr-xr-x 28 mysql mysql  4096 Jan 26 15:55 share
drwxr-xr-x  2 mysql mysql  4096 Jan 26 15:55 support-files

We have changed the owners and groups of MySQL files.

$ sudo bin/mysqld --initialize --user=mysql

We initialize MySQL data directory using mysqld. The command
also creates a temporary root password.
Prior to MySQL 5.7.6, this task was accomplished with 
mysql_install_db command.

$ sudo bin/mysql_ssl_rsa_setup

The mysql_ssl_rsa_setup tool creates the SSL certificate and key files 
and RSA key-pair files required to support secure connections using SSL and secure 
password exchange using RSA over unencrypted connections, if those files are missing.

$ sudo chown -R root .
$ sudo chown -R mysql data

We change the owner for all files back to the user root, except for the
data directory. The MySQL server, which is owned by the mysql user, must
have access to the data directory. The database files are stored in this
directory.

### Starting and stopping MySQL server

The following commands can be use to start and stop MySQL server.

$ sudo /usr/local/mysql/support-files/mysql.server start

This command starts MySQL server. 

$ sudo /usr/local/mysql/support-files/mysql.server stop

This command stops MySQL server. 

### Other settings

After we have installed the MySQL on our system and changed a password 
for the root account, there are still some modifications left to do. 

MySQL has a configuration file called my.cnf, which is located 
in the /etc directory. By editing the options in this file, 
we can configure the server to our needs. 

$ sudo cp /usr/local/mysql/support-files/my-default.cnf /etc/my.cnf
$ cp /usr/local/mysql/support-files/my-default.cnf ~/.my.cnf

There are configuration templates in the support-files directory.
In the first command, we create MySQL global configuration file. In the second 
example, we create a personal file in the home directory of the user. 

$ export PATH=$PATH:/usr/local/mysql/bin/
$ export MANPATH=$MANPATH:/usr/local/mysql/man/

Another useful thing to do is to add bin directory to your PATH variable. 
This way we can launch MySQL commands and scripts without specifying the full path. 
In addition, we add the path to the manual pages of the MySQL tools and commands to 
the MANPATH variable. Now we can view MySQL man pages with the man 
command. Place both commands to your shell configuration file. This could be
.bashrc or .profile.

## Changing the root password

Previously, we have been given an expired root password. It is time
to set a new password for the root.

$ /usr/local/mysql/bin/mysql -u root -p

We start the mysql command line tool. (The server must be running.) 
We connect as root.

mysql&gt; SET PASSWORD = PASSWORD('newpassowrd');

We set a new password. 

Using the mysqladmin we change the password for the root account. Note that
command is launched without the sudo. 

-->

## Hardening MySQL

We can use mysql_secure_installation to increase security
our MySQL server.

$ /usr/local/mysql/bin/mysql_secure_installation

We are given the choice to improve the MySQL root password, remove 
anonymous user accounts, disable root logins outside of localhost, 
and remove test databases.

In this part of the MySQL tutorial, we have covered the installation of 
the MySQL database system.

[Contents](..) 
[Previous](../introduction/)
[Next](../firststeps/)