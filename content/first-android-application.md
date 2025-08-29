+++
title = "First Android application"
date = 2025-08-29T20:03:38.919+01:00
draft = false
description = "In this chapter of the Android tutorial, we create our first Android application."
image = "images/firstapp.png"
imageBig = "images/firstapp.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../intro/)
[Next](../buttons/)

# First Android application

last modified December 5, 2012

In this chapter of the Android development tutorial we will create our first 
Android application. 

The application will just display a message on the screen. 

$ mkdir First
$ cd First/

We create a First directory and make it the current working
directory.

$ android create project --target android-17 --name First \
&gt; --path . --activity MainActivity --package com.zetcode.first
Created directory /home/janbodnar/programming/android/First/src/com/zetcode/first
Added file ./src/com/zetcode/first/MainActivity.java
Created directory /home/janbodnar/programming/android/First/res
Created directory /home/janbodnar/programming/android/First/bin
...

We create a new Android project with the android create project command.
The target option specifies the Android application framework version. The name
option determines the name of the project. The path is the location of our project 
directory. The activity is the name of our default activity. Finally, the
package is the name of the package namespace for our project.
The command creates a Java file for the main activity, several directories, and
XML files. 

$ ls 
AndroidManifest.xml  bin        libs              proguard-project.txt  res
ant.properties       build.xml  local.properties  project.properties    src

These are the files and directories created by the android create project 
command. The AndroidManifest.xml file describes the fundamental characteristics 
of the application. The source files of the application reside in the src directory.
In the res directory, we have the application's resource files. The Android application
archive file will be created in the bin directory. The libs directory is used
to store additional libraries. The ant.properties and build.xml files
are the Ant files used to build the project. Finally, the local.properties and
the project.properties are property files of the Android project. 

AndroidManifest.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.zetcode.first"
      android:versionCode="1"
      android:versionName="1.0"&gt;
   &lt;application android:label="@string/app_name"
                   android:icon="@drawable/ic_launcher"&gt;
       &lt;activity android:name="MainActivity"
                 android:label="@string/app_name"&gt;
           &lt;intent-filter&gt;
               &lt;action android:name="android.intent.action.MAIN" /&gt;
               &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
           &lt;/intent-filter&gt;
       &lt;/activity&gt;
   &lt;/application&gt;
&lt;/manifest&gt;

This is the project manifest file. It describes some basic characteristics of the Android project.
The file provides the package name, which is com.zetcode.com in our case. 
It contains the name of the default activity. The @string/app_name and 
@drawable/ic_launcher are resource values. The string resource values are set 
from the strings.xml file located in the res/values subdirectory. 
The image resources are located in the drawable subdirectories
of the res directory. The &lt;intent-filter&gt; element of the main activity declares 
its capabilities. It specifies what the activity can do. The two intents specify that the 
activity is a main entry point of the application, it can be the initial activity of a task 
and is listed in the top-level application launcher.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;First program&lt;/string&gt;
    &lt;string name="messsage"&gt;First Android program&lt;/string&gt;
&lt;/resources&gt;

In the strings.xml file we have one element which defines the resource value 
referenced from the AndroidManifest.xml file. The file is located in the 
res/values subdirectory. We change the value of the first element 
(from 'MainActivity' to 'First program'). The name of the application is shown in the list
of the applications in the emulator. We add the second element. It 
is referenced from the main.xml file. 

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
&lt;TextView
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="@string/message"
    /&gt;
&lt;/LinearLayout&gt;

This is the main.xml file located in the res/layout subdirectory.
It defines the layout of an Activity. The application loads the layout for an 
Activity in the onCreate() method. In our case we have a 
vertical linear layout with one TextView widget. 

MainActivity.java
  

package com.zetcode.first;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}

This is the MainActivity.java source file. When the activity is first
created the onCreate() method is called. The method loads the activity
layout defined in the main.xml file. 

## Building the application

 

We use the ant tool to build the Android application.

$ ant debug

We execute the ant debug command in the project root directory. 
There are two build targets. Debug and release. We will use the debug build
target. The release build needs some additional work with signing. 

$ ant debug install

It is possible to build and install the application in one step using the
ant debug install command.

$ ls -1 bin
AndroidManifest.xml
AndroidManifest.xml.d
build.prop
classes
classes.dex
classes.dex.d
First.ap_
First.ap_.d
First-debug.apk
First-debug-unaligned.apk
First-debug-unaligned.apk.d
jarlist.cache
proguard.txt
res

The final Android package is created in the bin directory. The name of our 
archive file is First-debug.apk. 

## Running the application

 

We install the application to the emulator and start it from 
it.

$ emulator -avd AVD2 &amp;

The emulator is started with a specific android virtual device.

$ adb install bin/First-debug.apk 

The adb install command installs the application on the emulator.

![firstapp.png](images/firstapp.png)

Figure: First program

We did not use a custom icon, so the built-in icon is used. From the applications list
we select the First program application. The application is launched.

![firstapp2.png](images/firstapp2.png)

Figure: The First program screen

We can see the message that we have specified in the strings.xml file.

This chapter was an introduction Android application development.

[Contents](..)
[Previous](../intro/)
[Next](../buttons/)