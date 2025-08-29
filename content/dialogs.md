+++
title = "Dialogs"
date = 2025-08-29T20:03:37.605+01:00
draft = false
description = "In this chapter of the Android tutorial, we talk about dialogs in Android."
image = "images/alertdialog.png"
imageBig = "images/alertdialog.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menus/)
[Next](../drawing/)

# Dialogs

last modified November 26, 2012

In this chapter of the Android development tutorial we talk about dialogs. 
We discuss the Android AlertDialog.

A dialog is defined as a conversation between two or more persons. In a computer 
application a dialog is a window which is used to "talk" to the application. A dialog 
is used to input data, modify data, change the application settings etc. 

An AlertDialog is a dialog used to display 
information or to receive data. It can display one, two, or three buttons. 
It is created with a Builder subclass.

## Displaying a message

 

We use the AlertDialog to display a message.
In the example, we do not need to modify the manifest file.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    
    &lt;Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dip"
        android:onClick="onClicked"
        android:text="@string/btn_label" /&gt;
        
&lt;/LinearLayout&gt;

In the main.xml layout file, we have a Button widget.
This button displays an AlertDialog. 

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;DisplaySize&lt;/string&gt;
    &lt;string name="btn_label"&gt;Show&lt;/string&gt;
&lt;/resources&gt;

This is strings.xml file.

MainActivity.java
  

package com.zetcode.displaysize;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.graphics.Point;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.WindowManager;
import android.view.Display;

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
        Point p = getDisplaySize();

        AlertDialog ad = new AlertDialog.Builder(this).create();

        ad.setTitle("Display size");
        String msg = String.format("Width:%d, Height:%d", p.x, p.y);
        ad.setMessage(msg);
        ad.setIcon(android.R.drawable.ic_dialog_info);

        ad.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        ad.show();     
    }

    public Point getDisplaySize()
    {
        WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        Display ds = wm.getDefaultDisplay();

        Point p = new Point();
        ds.getSize(p);

        return p;
    }
}

We use the AlertDialog to display the size of the display. 

Point p = getDisplaySize();

In the custom getDisplaySize() method, we determine the size of
the display.

AlertDialog ad = new AlertDialog.Builder(this).create();

An instance of the AlertDialog is created.

ad.setTitle("Display size");
String msg = String.format("Width:%d, Height:%d", p.x, p.y);
ad.setMessage(msg);
ad.setIcon(android.R.drawable.ic_dialog_info);

We set a title, message and an icon for the dialog.

ad.setButton("OK", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int which) {
        dialog.cancel();
    }
});

We add a button to the dialog. When we click on the OK button, the
dialog is closed.

ad.show();

The show() method shows the dialog.

WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
Display ds = wm.getDefaultDisplay();

We get the default display.

Point p = new Point();
ds.getSize(p);

We find out the size of the display with the getSize() method.

![alertdialog.png](images/alertdialog.png)

Figure: AlertDialog showing the size of the display

## Receiving data

 

The second example uses the AlertDialog to receive data from a user. 
The dialog will ask a user for his name. It will then display the input
in a TextView widget.

The manifest file is not modified.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
    
    &lt;Button
        android:id="@+id/btnId"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dip"
        android:onClick="onClicked"
        android:text="@string/btn_label" /&gt;   
        
    &lt;TextView
        android:id="@+id/tvId"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" /&gt;
        
&lt;/LinearLayout&gt;

This is main.xml file. We have a Button widget and a
TextView widget. The button will show the dialog window. The 
TextView will receive the input text from the dialog.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;InputDialog&lt;/string&gt;
    &lt;string name="btn_label"&gt;Show dialog&lt;/string&gt;
&lt;/resources&gt;

This is the strings.xml resource file. 

MainActivity.java
  

package com.zetcode.input;

import android.app.Activity;
import android.os.Bundle;
import android.app.AlertDialog;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.content.DialogInterface;

public class MainActivity extends Activity
{
    private TextView tv;
 
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        tv = (TextView) findViewById(R.id.tvId);
    }

    public void onClicked(View view)
    {
        AlertDialog.Builder ad = new AlertDialog.Builder(this);

        ad.setTitle("Input");
        ad.setMessage("Enter your name");

        final EditText input = new EditText(this);
        ad.setView(input);

        ad.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dlg, int which) {
            String val = input.getText().toString();
            String msg = String.format("Hello %s!", val);
            tv.setText(msg);
          }
        });

        ad.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
          public void onClick(DialogInterface dlg, int which) {
            dlg.cancel();
          }
        });

        ad.show();
    }
}

Clicking on the button widget will display the AlertDialog. It has an 
EditText to receive the input from a user. 

AlertDialog.Builder ad = new AlertDialog.Builder(this);

ad.setTitle("Input");
ad.setMessage("Enter your name");

We set a title and a message for the dialog.

final EditText input = new EditText(this);
ad.setView(input);

We add the EditText widget to the dialog.

ad.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
public void onClick(DialogInterface dlg, int which) {
    String val = input.getText().toString();
    String msg = String.format("Hello %s!", val);
    tv.setText(msg);
    }
});

Clicking on the OK button of the dialog, we get the text from the 
EditText widget. The text used to format a greeting 
which is set to the TextView.

ad.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dlg, int which) {
    dlg.cancel();
    }
});

Clicking on the Cancel button will dismiss the dialog. 

![inputdialog.png](images/inputdialog.png)

Figure: Receiving input

In this chapter of the Android development tutorial, we have shown two 
cases of the AlertDialog.

[Contents](..)
[Previous](../menus/)
[Next](../drawing/)