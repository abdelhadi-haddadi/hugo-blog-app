+++
title = "Android Pickers"
date = 2025-08-29T20:03:41.746+01:00
draft = false
description = "In this chapter of the Android tutorial, we will talk about Android Pickers."
image = "images/numberpicker.png"
imageBig = "images/numberpicker.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../listview/)
[Next](../menus/)

# Android Pickers

last modified November 21, 2012

In this chapter of the Android development tutorial we will talk about android
Pickers. Pickers are widgets that enable us to select a single value from a 
set of values.

There are number, date or time pickers. 

## NumberPicker

 

NumberPicker is a widget that allows us to select a number from 
a predefined range of values. The manifest file is not modified in this
example.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    
    &lt;NumberPicker android:id="@+id/npId"
      android:layout_marginTop="5dp"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content" /&gt;

    &lt;TextView
        android:id="@+id/tvId"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp" 
        android:layout_marginLeft="5dp"
        android:text="0"
        android:textSize="30sp" /&gt;      
        
&lt;/LinearLayout&gt;

In the layout file we have a NumberPicker widget and a 
TextView widget. The TextView widget will display the 
selected value of the NumberPicker.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;NumberPicker&lt;/string&gt;
&lt;/resources&gt;

The strings resource file.

MainActivity.java
  

package com.zetcode.numpick;

import android.app.Activity;
import android.os.Bundle;
import android.widget.NumberPicker;
import android.widget.TextView;
import android.widget.NumberPicker.OnValueChangeListener;

public class MainActivity extends Activity
{
    private TextView tv;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        setupUI();
    }

    public void setupUI()
    {
        tv = (TextView) findViewById(R.id.tvId);

        NumberPicker np = (NumberPicker) findViewById(R.id.npId);

        np.setOnValueChangedListener(new OnValueChangeListener()
        {
            public void onValueChange(NumberPicker picker, int oldVal, 
                int newVal)
            {
                tv.setText(String.valueOf(newVal)); 
            }        
        });

        np.setMaxValue(100);
        np.setMinValue(0);
    }
}

Clicking on the plus and minus signs of the NumberPicker we select a new value. 
The currently selected value is displayed in the TextView widget.

NumberPicker np = (NumberPicker) findViewById(R.id.npId);

A reference to the NumberPicker widget is retrieved from 
the main.xml file. 

np.setOnValueChangedListener(new OnValueChangeListener()
{
    public void onValueChange(NumberPicker picker, int oldVal, 
        int newVal)
    {
        tv.setText(String.valueOf(newVal)); 
    }        
});

A OnValueChangeListener is added to the NumberPicker widget.
It will call the onValueChange() method when the value of
the NumberPickeris changed. Inside this method, we set the currently selected
value to the TextView widget. 

np.setMaxValue(100);
np.setMinValue(0);

We set the maximum and minimum value for the NumberPicker.

![numberpicker.png](images/numberpicker.png)

Figure: NumberPicker widget

## TimePicker

 

A TimePicker is a widget for selecting the time of day. It has two modes,
24 hour or AM/PM mode. Selection of the hour and minute digit can be controlled by 
vertical spinners. A DatePicker is a widget for selecting a date. It is
very similar to the TimePicker.

The manifest file is not modified.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    
    &lt;TimePicker android:id="@+id/tpId"
      android:layout_marginTop="5dp"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content" /&gt;

    &lt;TextView
        android:id="@+id/tvId"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp" 
        android:layout_marginLeft="5dp"
        android:textSize="30sp" /&gt;  
        
&lt;/LinearLayout&gt;

In the main.xml file we have a TimePicker and TextView widgets.
The selected time is displayed in the TextView.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;TimePicker&lt;/string&gt;
&lt;/resources&gt;

This is the strings.xml resource file. 

MainActivity.java
  

package com.zetcode.timepicker;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TimePicker;
import android.widget.TextView;
import android.widget.TimePicker.OnTimeChangedListener;

public class MainActivity extends Activity
{
    private TextView tv;
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        setupUI();
    }

    public void setupUI()
    {
        tv = (TextView) findViewById(R.id.tvId);

        TimePicker tp = (TimePicker) findViewById(R.id.tpId);
        displayCurrentTime(tp);

        tp.setOnTimeChangedListener(new OnTimeChangedListener()
        {
            public void onTimeChanged(TimePicker view, int hourOfDay, 
                int minute)
            {
                StringBuilder tm = new StringBuilder();
                tm.append(hourOfDay);
                tm.append(" h "); 
                tm.append(minute);
                tm.append(" m");
                tv.setText(tm); 
            }        
        });
    }

    public void displayCurrentTime(TimePicker tp)
    {
        int h = tp.getCurrentHour();
        int m = tp.getCurrentMinute();

        StringBuilder tm = new StringBuilder();
        tm.append(h);
        tm.append(" h "); 
        tm.append(m);
        tm.append(" m");
        tv.setText(tm);         
    }
}

The TimePicker listens to the OnTimeChangedListener. When the time
is changed, the new time value is set to the TextView inside
the onTimeChanged() method.

tp.setOnTimeChangedListener(new OnTimeChangedListener()
{
    public void onTimeChanged(TimePicker view, int hourOfDay, 
        int minute)
    {
        StringBuilder tm = new StringBuilder();
        tm.append(hourOfDay);
        tm.append(" h "); 
        tm.append(minute);
        tm.append(" m");
        tv.setText(tm); 
    }        
});

Inside an anonymous OnTimeChangedListener class we implement
the onTimeChanged() method. With the StringBuilder we build the
string to be displayed and set it to the TextView widget. 

public void displayCurrentTime(TimePicker tp)
{
    int h = tp.getCurrentHour();
    int m = tp.getCurrentMinute();

    StringBuilder tm = new StringBuilder();
    tm.append(h);
    tm.append(" h "); 
    tm.append(m);
    tm.append(" m");
    tv.setText(tm);         
}

When the activity is first shown, we display the current time.

![timepicker.png](images/timepicker.png)

Figure: TimePicker widget

In this chapter of the Android development tutorial, we have written about Pickers.

[Contents](..)
[Previous](../listview/)
[Next](../menus/)