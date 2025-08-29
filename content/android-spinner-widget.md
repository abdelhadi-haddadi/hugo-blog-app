+++
title = "Android Spinner widget"
date = 2025-08-29T20:03:43.106+01:00
draft = false
description = "In this chapter of the Android tutorial, we present spinner widgets."
image = "images/spinner.png"
imageBig = "images/spinner.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../layout/)
[Next](../seekbar/)

# Android Spinner widget

last modified October 29, 2012

In this chapter of the Android development tutorial we will present a spinner 
widget. 

A spinner widget enables a user to select an item from a list of options. 
In the normal state it shows the currently selected item. Clicking on the
spinner widget shows a dropdown menu with all available items. The
user can choose a new one from the list. The Spinner class is 
used to create a spinner widget. 

The Spinner widget can be populated in the XML file. Or it can be programmatically
filled. In the latter case we need an Adapter class to populate the 
Spinner widget. An adapter is a bridge between a Spinner and its data.

## Spinner I

 

In the first example we have a Spinner widget whose items are defined 
in an XML file.

AndroidManifest.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.zetcode.finish"
      android:versionCode="1"
      android:versionName="1.0"&gt;
 &lt;application android:label="@string/app_name" android:icon="@drawable/ic_launcher"&gt;
    &lt;activity android:name="MainActivity"
                android:label="@string/app_name"&gt;
        &lt;intent-filter&gt;
            &lt;action android:name="android.intent.action.MAIN" /&gt;
            &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
        &lt;/intent-filter&gt;
    &lt;/activity&gt;
 &lt;/application&gt;
&lt;/manifest&gt;

This is the manifest file for the program.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
   &lt;Spinner
        android:id="@+id/spn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:entries="@array/dlangs"
        android:layout_marginTop="10dip"
        android:prompt="@string/spn_title" /&gt;

   &lt;TextView
      android:id="@+id/tvId"
      android:layout_width="fill_parent"
      android:layout_height="wrap_content" 
      android:layout_marginTop="10dip"
      /&gt;        
        
&lt;/LinearLayout&gt;

In the main.xml layout file, we have a Spinner and a TextView. 
The android:entries="@array/dlangs" attribute defines a XML resource 
that provides an array of strings. The strings are written in the strings.xml
file. 

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;Spinner&lt;/string&gt;
    &lt;string name="spn_title"&gt;Choose a language&lt;/string&gt;
    
    &lt;string-array name="dlangs"&gt;
        &lt;item&gt;Python&lt;/item&gt;
        &lt;item&gt;PHP&lt;/item&gt;
        &lt;item&gt;Perl&lt;/item&gt;
        &lt;item&gt;Tcl&lt;/item&gt;
        &lt;item&gt;Ruby&lt;/item&gt;
    &lt;/string-array&gt;    
    
&lt;/resources&gt;

In the strings.xml file we have the elements of the string array. 
These are displayed when we click on the Spinner widget. 

MainActivity.java
  

package com.zetcode.spinner;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Spinner;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;

public class MainActivity extends Activity implements OnItemSelectedListener 
{
    private TextView tv;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        tv = (TextView) findViewById(R.id.tvId);

        Spinner spn = (Spinner) findViewById(R.id.spn);
        spn.setOnItemSelectedListener(this);
    }

    @Override
    public void onItemSelected(AdapterView&lt;?&gt; parent, View v, int pos, long id) 
    {
      String item = parent.getItemAtPosition(pos).toString();
      tv.setText(item);
    }

    @Override
    public void onNothingSelected(AdapterView&lt;?&gt; arg0) 
    {      
      tv.setText("");
    }
}

The selected item from the Spinner widget is displayed in the 
TextView widget. 

public class MainActivity extends Activity implements OnItemSelectedListener 

The MainActivity class implements the OnItemSelectedListener. 
The class must now implement two methods. The onItemSelected() 
and onNothingSelected() methods.

Spinner spn = (Spinner) findViewById(R.id.spn);
spn.setOnItemSelectedListener(this);

These two lines get the reference to the Spinner widget and set
the OnItemSelectedListener for it.

@Override
public void onItemSelected(AdapterView&lt;?&gt; parent, View v, int pos, long id) 
{
    String item = parent.getItemAtPosition(pos).toString();
    tv.setText(item);
}

In the onItemSelected() method we get the currently selected Spinner item
with the getItemAtPosition(). The item is transformed to a string and set 
to the TextView.

![spinner.png](images/spinner.png)

Figure: Spinner widget

## Spinner II

 

In the second spinner example, we will define our list of spinner elements
programmatically. For this we will use the ArrayAdapter in conjunction with
the ArrayList. 

An Adapter design pattern is used by Android platform to work with the 
Spinner widget. The ArrayAdapter is an intermediary 
between the data source and the data view. In this case the data source is the 
ArrayList and the view is the Spinner
widget. Using an adapter we are decoupling our code. 

AndroidManifest.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.zetcode.toast"
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

This is the manifest file.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    
  &lt;Spinner
      android:id="@+id/spnId"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginTop="10dip" 
      android:prompt="@string/spn_title" /&gt;    
      
  &lt;TextView
    android:id="@+id/tvId"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="10dip"  /&gt;
    
&lt;/LinearLayout&gt;

In the main.xml file we have two widgets. The Spinner
and the TextView widget. This time we do not define the
array data entries for the Spinner.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;Spinner2&lt;/string&gt;
    &lt;string name="spn_title"&gt;Choose a language&lt;/string&gt;
&lt;/resources&gt;

This is the strings.xml resource file. 

MainActivity.java
  

package com.zetcode.spinner2;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Spinner;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;

public class MainActivity extends Activity implements OnItemSelectedListener
{
    private TextView tv;
    private Spinner spn;
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        setup();
    }

    public void setup()
    {
        tv = (TextView) findViewById(R.id.tvId);
   
        spn = (Spinner) findViewById(R.id.spnId);
        fillSpinner(spn);
        spn.setOnItemSelectedListener(this);
    }

    public void fillSpinner(Spinner spn) 
    {
        List&lt;String&gt; lst = new ArrayList&lt;String&gt;();
        lst.add("Python");
        lst.add("PHP");
        lst.add("Perl");
        lst.add("Tcl");
        lst.add("Ruby");
        
        ArrayAdapter&lt;String&gt; da = new ArrayAdapter&lt;String&gt;(this,
                android.R.layout.simple_spinner_item, lst);
        da.setDropDownViewResource(android.R.layout.simple_spinner_item);

        spn.setAdapter(da);
    }

    @Override
    public void onItemSelected(AdapterView&lt;?&gt; parent, View v, int pos, long id) 
    {
      String item = parent.getItemAtPosition(pos).toString();
      tv.setText(item);
    }

    @Override
    public void onNothingSelected(AdapterView&lt;?&gt; arg0) 
    {      
      tv.setText("");
    }
}

In the MainActivity.java source file we fill the Spinner widget 
with data and implement the OnItemSelectedListener for the widget.

spn = (Spinner) findViewById(R.id.spnId);
fillSpinner(spn);

We get the reference to the Spinner widget and call the fillSpinner() method
to populate it with data. 

List&lt;String&gt; lst = new ArrayList&lt;String&gt;();
lst.add("Python");
lst.add("PHP");
lst.add("Perl");
lst.add("Tcl");
lst.add("Ruby");

An ArrayList is created and filled with strings. 

ArrayAdapter&lt;String&gt; da = new ArrayAdapter&lt;String&gt;(this,
        android.R.layout.simple_spinner_item, lst);

The instance of the ArrayAdapter is created. It takes the ArrayList
as a parameter. 

da.setDropDownViewResource(android.R.layout.simple_spinner_item);

This line determines the look of the dropdown menu of the Spinner widget.
This one is a dropdown without radio buttons. A spinner with the
android.R.layout.simple_spinner_dropdown_item defined has
radio buttons in its rows. 

spn.setAdapter(da);

The adapter is set for the Spinner widget.

![spn_dropdown.png](images/spn_dropdown.png)

Figure: Spinner dropdown menu

In this chapter of the Android development tutorial, we have written about
a spinner widget. 

[Contents](..)
[Previous](../layout/)
[Next](../seekbar/)