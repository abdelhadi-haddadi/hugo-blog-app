+++
title = "SeekBar widget"
date = 2025-08-29T20:03:43.029+01:00
draft = false
description = "In this chapter of the Android tutorial, we present the SeekBar widget."
image = "images/seekbar.png"
imageBig = "images/seekbar.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../spinner/)
[Next](../prgbar/)

# SeekBar widget

last modified November 5, 2012

In this chapter of the Android development tutorial we will present the SeekBar
widget.

The SeekBar widget is used to select a value from a range of values.
The user drags a thumb of the widget to select a specific value. 
To process the SeekBar events, we implement the 
SeekBar.OnSeekBarChangeListener listener.

## SeekBar example

 

We have a SeekBar widget and a TextView widget. The current value from
the SeekBar is displayed in the TextView. Android manifest file is 
left untouched.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;  
&lt;SeekBar
   android:id="@+id/sbId"
   android:layout_width="fill_parent"
   android:layout_height="wrap_content"
   android:layout_margin="10dp"
   android:max="100"
   android:progress="50"
   /&gt;
&lt;TextView
    android:id="@+id/tvId"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:layout_marginLeft="10dp"
    /&gt;     
&lt;/LinearLayout&gt;

In the main.xml layout file, we have two widgets defined. The SeekBar 
widget and the TextView widget. 

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;SeekBar&lt;/string&gt;
    &lt;string name="init_tv_value"&gt;50&lt;/string&gt;
&lt;/resources&gt;

This is strings.xml resource file. The init_tv_value is the
initial value of the TextView widget. 

MainActivity.java
  

package com.zetcode.seekbar;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.SeekBar;
import android.widget.SeekBar.OnSeekBarChangeListener;

public class MainActivity extends Activity implements 
    OnSeekBarChangeListener
{
    TextView tv;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        SeekBar sb = (SeekBar) findViewById(R.id.sbId);
        sb.setOnSeekBarChangeListener(this);

        tv = (TextView) findViewById(R.id.tvId);
        String val = this.getString(R.string.init_tv_value);
        tv.setText(val);
    }

   @Override
   public void onProgressChanged(SeekBar seekBar, int progress,
     boolean fromUser) 
   {
       tv.setText(String.valueOf(progress));
   }

   @Override
   public void onStartTrackingTouch(SeekBar seekBar) 
   {
       // not implemented 
   }

   @Override
   public void onStopTrackingTouch(SeekBar seekBar) 
   {
       // not implemented 
   }
}

The current value from the SeekBar is set to the TextView widget. 

public class MainActivity extends Activity implements 
    OnSeekBarChangeListener

The MainActivity class implements the OnSeekBarChangeListener. 
We need to define three abstract methods. The onProgressChanged(), 
the onStartTrackingTouch() and the onStopTrackingTouch() method.
The last two methods are not implemented. They are related to touch
gestures. We provide only empty methods.

SeekBar sb = (SeekBar) findViewById(R.id.sbId);
sb.setOnSeekBarChangeListener(this);

We get the reference to the SeekBar widget and set a listener for it.

tv = (TextView) findViewById(R.id.tvId);
String val = this.getString(R.string.init_tv_value);
tv.setText(val);

We get the reference to the TextView widget. We retrieve the
init_tv_value from the string resources and set 
it to the TextView.

@Override
public void onProgressChanged(SeekBar seekBar, int progress,
    boolean fromUser) 
{
    tv.setText(String.valueOf(progress));
}

When we move the thumb of the SeekBar, the onProgressChanged()
method is called. The progress parameter is the current value of the SeekBar.
The default range is 0..100. We set the current value of the 
SeekBar to the TextView widget. 

![seekbar.png](images/seekbar.png)

Figure: SeekBar widget

In this chapter of the Android development tutorial, we have written about
the SeekBar widget. 

[Contents](..)
[Previous](../spinner/)
[Next](../prgbar/)