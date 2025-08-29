+++
title = "Installing Jetty on Linux server"
date = 2025-08-29T19:59:37.975+01:00
draft = false
description = "In this chapter of the Jetty tutorial, we install Jetty on a debian-based Linux system."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../websocket/)

# Installing Jetty on Linux server

last modified January 27, 2024

 

Throughout this tutorial we have been using Jetty on a local computer.
In this chapter we show how to install Jetty on a remote server. 
This gives us a more realistic experience in managing a Jetty server.

We use a debian-based Linux system.

$ sudo apt-get update
$ sudo apt-get upgrade

First, we update the server.

$ sudo apt-get install openjdk-7-jre-headless

Next, we install Java if it is not already present on the system.
We use the OpenJDK implementation. The openjdk-7-jre-headless is 
a minimal Java runtime—the components for executing Java GUI
programs are not needed on servers and are not included in this package.

$ cd /tmp
$ sudo wget http://download.eclipse.org/jetty/stable-9/dist/jetty-distribution
-9.2.3.v20140905.tar.gz
$ sudo tar xzvf jetty-distribution-9.2.3.v20140905.tar.gz

We download and unpack a Jetty distribution inside the /tmp directory.

$ sudo mv jetty-distribution-9.2.3.v20140905 /opt/jetty
$ sudo rm jetty-distribution-9.2.3.v20140905.tar.gz

Jetty is moved to /opt/jetty directory. The archive is removed.

$ sudo rm -rf /opt/jetty/demo-base/

The demo applications that come with Jetty distribution are removed. 

$ sudo vi /etc/environment
$ cat /etc/environment 
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:
/usr/local/games"
JAVA_HOME=/usr/lib/jvm/java-7-openjdk-i386
JETTY_HOME=/opt/jetty
JETTY_BASE=/opt/jetty/mybase

The /etc/environment file is used for system-wide environment variable settings. 
We set JAVA_HOME, JETTY_HOME, and JETTY_BASE 
environment variables there.

$ source /etc/environment
$ echo $JAVA_HOME
/usr/lib/jvm/java-7-openjdk-i386
$ echo $JETTY_HOME
/opt/jetty
$ echo $JETTY_BASE
/opt/jetty/mybase

The source command evaluates the file and sets the variables. We can
now start referring to the new variables.

$ sudo useradd --user-group --shell /bin/false --home-dir /opt/jetty/temp jetty

A new jetty user and group are added to the system. Jetty will run under this user
on the system. Setting the user's shell to /bin/false has the affect of not 
allowing someone to log in under this username.

$ cd /opt
$ sudo mkdir -p web/mybase/
$ sudo mkdir jetty/temp/

New directories are created. The /opt/web/mybase will hold the Jetty base, 
the /opt/jetty/temp will be used for temporary files of Jetty.
According to the Jetty documentation, it is a best practice to create a separate
temporary directory from the standart system /tmp. 
Cleanup scripts may interfere with the Jetty's temporary files.

$ sudo chown -R jetty:jetty /opt/web
$ sudo chown -R jetty:jetty /opt/jetty

We change the user and group ownership for files and directories relevant for Jetty.
The -R option operates recursively on files and directories, which means that the 
ownership is changed for all directories and files under parent directories. 

$ sudo usermod -a -G jetty user_name

We add our user name to the jetty group in order to be able to 
have permissions to operate Jetty.

$ sudo cp /opt/jetty/bin/jetty.sh /etc/init.d/jetty

Next, we enable Jetty as a system service. The services
are kept in the init.d directory.

$ sudo touch /etc/default/jetty
$ sudo vi /etc/default/jetty 
$ cat /etc/default/jetty
JETTY_HOME=/opt/jetty
JETTY_BASE=/opt/web/mybase
TMPDIR=/opt/jetty/temp

The script loads the contents of the /etc/default/jetty file.
Inside the file, we set three environment variables.

$ sudo service jetty start

Jetty is started as a system service.

jano7@core7:~$ service jetty status
Checking arguments to Jetty: 
START_INI      =  /opt/web/mybase/start.ini
JETTY_HOME     =  /opt/jetty
JETTY_BASE     =  /opt/web/mybase
...

With the status parameter, we can check a service's
status.

$ scp dist/first.war user_name@example.com:/opt/web/mybase/webapps

From the development computer, we deploy a simple web application 
by copying a project WAR file to the webapps directory of the 
Jetty base.

$ curl http://example.com:8080/first/
&lt;html&gt; 
&lt;body&gt;
&lt;p&gt;
   Today's date: Sep 14, 2014 12:26:34 PM
&lt;/p&gt;
&lt;/body&gt; 
&lt;/html&gt;

We connect to the web application and receive HTML output.

$ sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

Here we use a packet filter to forward all incoming packets to port 80 
to port 8080.
The default port on which Jetty listens is 8080; it is configured in the
start.ini file.

$ curl http://example.com/first/
&lt;html&gt; 
&lt;body&gt;
&lt;p&gt;
   Today's date: Sep 14, 2014 12:26:34 PM
&lt;/p&gt;
&lt;/body&gt; 
&lt;/html&gt;

Now we can refer to the webpage without the port number.

In this chapter, we have installed Jetty on a remote Linux server, enabled
it as a system service, and deployed a simple web application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../websocket/)