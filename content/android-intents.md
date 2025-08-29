+++
title = "Android Intents"
date = 2025-08-29T20:03:38.897+01:00
draft = false
description = "In this chapter of the Android tutorial, we talk about Intents."
image = "images/webpage.png"
imageBig = "images/webpage.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../buttons/)
[Next](../layout/)

# Android Intents

last modified November 11, 2012

In this chapter of the Android development tutorial, we will talk about Intents.

According to the Android developer documentation, an Intent is an asynchronous message. 
It is an abstract description of an operation to be performed. Intents are used to navigate through 
activities. Activities, services and broadcast receivers are activated through intents. Intents 
enable loose coupling of code in the application. An Intent is passed to the some method like 
Context.startActivity() or Context.startService() to perform some action.

There are two types of intents: explicit and implicit. In explicit intents you
provide the name of the Activity class. In implicit intents, you tell the
system what to do rather than name the Activity class to launch.

## Implicit Intent

Displaying a web page can be done via an implicit intent. It will start
a default web browser with the specified web page. In the example we will display 
the contents of a web page. The manifest file is not modified.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" &gt;
 
    &lt;Button
        android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        android:onClick="onClicked"
        android:text="@string/btn_title" /&gt;
 
&lt;/LinearLayout&gt;

In the main.xml layout file, we have just a simple button widget.
Clicking on the button will show the web page.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;Url&lt;/string&gt;
    &lt;string name="btn_title"&gt;Visit&lt;/string&gt;
&lt;/resources&gt;

String resources.

MainActivity.java
  

package com.zetcode.url;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.view.View;

public class MainActivity extends Activity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    public void onClicked(View view)
    {
        Intent intent =  new Intent(Intent.ACTION_VIEW, 
            Uri.parse("http://www.google.com"));
        startActivity(intent);        
    }
}

This is the MainActivity.java source file. 

public void onClicked(View view)
{
    Intent intent =  new Intent(Intent.ACTION_VIEW, 
        Uri.parse("http://www.google.com"));
    startActivity(intent);        
}

In the onClicked() method, we create an Intent
object and start a new activity. With this implicit intent,
we tell Android to start a default web browser with google.com
web page opened.

![webpage.png](images/webpage.png)

Figure: Web page in Android emulator

## Explicit intent

 

In explicit intents, we provide the exact class to be run. 

AndroidManifest.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.zetcode.explicit"
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
        
        &lt;activity android:name=".NextActivity"&gt;&lt;/activity&gt;
        
    &lt;/application&gt;
&lt;/manifest&gt;

In the manifest file we register the new activity under the name 
NextActivity. The leading dot is a shorthand for the full 
package name, com.zetcode.explicit in our case.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    &lt;Button
        android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        android:onClick="onClicked"
        android:text="@string/btn_title" /&gt;        
&lt;/LinearLayout&gt;

In the main.xml file we have one button. Clicking on this
button will start a new explicit activity.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;Explicit&lt;/string&gt;
    &lt;string name="btn_title"&gt;Next&lt;/string&gt;
&lt;/resources&gt;

This is the strings.xml resource file. 

$ ls src/com/zetcode/explicit/
MainActivity.java  NextActivity.java

In the src/com/zetcode/explicit subdirectory we have
two source files for two activities.

MainActivity.java
  

package com.zetcode.explicit;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.content.Intent;

public class MainActivity extends Activity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    public void onClicked(View view)
    {
        Intent intent =  new Intent(this, NextActivity.class);
        startActivity(intent);        
    }
}

This is the source for the main activity. In the onClicked() method, we 
start a new explicit intent. 

public void onClicked(View view)
{
    Intent intent =  new Intent(this, NextActivity.class);
    startActivity(intent);        
}

The second parameter of the Intent constructor is the class name 
to be invoked. The activity is started with the startActivity() method.

NextActivity.java
  

package com.zetcode.explicit;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.LinearLayout;

public class NextActivity extends Activity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        initUI();
    }

    public void initUI()
    {
        LinearLayout lay = new LinearLayout(this);
        
        TextView tv = new TextView(this);
        tv.setText("Next screen");
        lay.addView(tv);

        setContentView(lay);
    }
}

This is the NextActivity.java source code. In this activity, we show 
a TextView on the screen. It is programmatically placed into a 
linear layout. 

## Transferring data

 

Intents are used to transfer data from one activity to another.
We use the putExtra() method to add extra data
to an intent. In the following example, we write a name to the
edit text and click on the Send button. We will land on another 
screen where we will see a greeting to the name that we have entered.

$ ls res/layout/
screen1.xml  screen2.xml
$ ls src/com/zetcode/switch2/
FirstScreen.java  SecondScreen.java

In the res/layout directory we have two XML layout files. In the
src/com/zetcode/switch2 we have source files of two activities.

AndroidManifest.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.zetcode.switch2"
      android:versionCode="1"
      android:versionName="1.0"&gt;
    &lt;application android:label="@string/app_name"
                    android:icon="@drawable/ic_launcher"&gt;
        &lt;activity android:name=".FirstScreen"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.MAIN" /&gt;
                &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;
        
        &lt;activity android:name=".SecondScreen"&gt;&lt;/activity&gt;
        
    &lt;/application&gt;
&lt;/manifest&gt;

In the manifest file we define two activities: the FirstScreen and the 
SecondScreen activity. The FirstScreen is the main activity. 

screen1.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
  &lt;EditText android:id="@+id/editId"
          android:layout_width="fill_parent"
          android:layout_height="wrap_content"
          android:layout_marginTop="10dip"
          android:layout_marginBottom="10dip"
          android:hint="@string/etHint" /&gt;    
          
  &lt;Button
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/btn_send" 
          android:onClick="sendMessage" /&gt;      
&lt;/LinearLayout&gt;

The screen1.xml layout file is loaded by the FirstScreen activity. 
It displays an EditText and a Button widget. The android:hint 
attribute shows a default shaded text in the EditText.

screen2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
  &lt;TextView
      android:id="@+id/tvId"
      android:layout_width="fill_parent"
      android:layout_height="wrap_content"
      /&gt;
&lt;/LinearLayout&gt;

In the screen2.xml file we have one TextView widget. 
It will display the text that we will transfer from one screen
to another. It is loaded by the SecondScreen activity.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;Switch&lt;/string&gt;
    &lt;string name="etHint"&gt;Enter your name&lt;/string&gt;
    &lt;string name="btn_send"&gt;Send&lt;/string&gt;
&lt;/resources&gt;

This is the strings.xml resource file. 

FirstScreen.java
  

package com.zetcode.switch2;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.view.View;
import android.widget.EditText;

public class FirstScreen extends Activity
{
    private EditText iname;
 
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        setTitle("First screen");
        setContentView(R.layout.screen1);

        iname = (EditText) findViewById(R.id.editId);
    }

    public void sendMessage(View view) 
    {
        Intent switchTo = new Intent(this, SecondScreen.class);        
        switchTo.putExtra("name", iname.getText().toString());        
        startActivity(switchTo); 
    }
}

The FirstScreen is the main activity. The sendMessage() method
is called, when we click on the button. 

public void sendMessage(View view) 
{
    Intent switchTo = new Intent(this, SecondScreen.class);        
    switchTo.putExtra("name", iname.getText().toString());        
    startActivity(switchTo); 
}

In the sendMessage() method, we create an instance of an Intent.
It will direct us to the SecondScreen activity. With the putExtra() method,
we add data from the EditText to the intent. The first parameter is the name by which
we will refer the data. The second parameter is the data to be transferred. 

SecondScreen.java
  

package com.zetcode.switch2;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.TextView;

public class SecondScreen extends Activity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen2);

        setupUI();
    }

    void setupUI()
    {
        setTitle("Second screen");

        TextView tv = (TextView) findViewById(R.id.tvId);
        
        Intent i = getIntent();
        String name = i.getStringExtra("name");        
        tv.setText("You have entered: " + name);
    }
}

This is the SecondScreen.java source file. It is called by the 
FirstScreen activity.

setupUI();

In the setupUI() method, we set up the user interface of the screen.

setTitle("Second screen");

We give the title to the screen with the setTitle() method.

Intent i = getIntent();
String name = i.getStringExtra("name");        
tv.setText("You have entered: " + name);

The getIntent() method returns the intent that started the
activity. We get the extra data using the getStringExtra()
method. The data is set to the TextView.

In this chapter of the Android development tutorial, we have written about Intents.

[Contents](..)
[Previous](../buttons/)
[Next](../layout/)