+++
title = "Android ProgressBar widget"
date = 2025-08-29T20:03:41.723+01:00
draft = false
description = "In this chapter of the Android tutorial, we present the ProgressBar widget."
image = "images/progbar1.png"
imageBig = "images/progbar1.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../seekbar/)
[Next](../listview/)

# Android ProgressBar widget

last modified November 29, 2012

In this chapter of the Android development tutorial we will present the ProgressBar 
widget. A ProgressBar is a widget that shows visually a progress of some task.
The widget comes in two basic modes. There is a circular bar and a horizontal bar.

We will have two examples to demonstrate both of them.

## ProgressBar I

 

We have a horizontal ProgressBar widget and a TextView 
widget that shows the percentage of the task completed. The manifest file is
left untouched.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
&lt;ProgressBar 
    android:id="@+id/pbId"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    style="?android:attr/progressBarStyleHorizontal"
    android:layout_margin="10dp"
    /&gt;       
&lt;TextView
    android:id="@+id/tvId"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:layout_margin="10dp"
    /&gt;
&lt;/LinearLayout&gt;

In the main.xml layout file, we have a ProgressBar and 
a TextView. The style="?android:attr/progressBarStyleHorizontal" style
makes the ProgressBar horizontal. The default mode of the ProgressBar
is the circular mode.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;ProgBar&lt;/string&gt;
&lt;/resources&gt;

String resource file.

MainActivity.java
  

package com.zetcode.progbar2;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.util.Log;

public class MainActivity extends Activity
{
    ProgressBar pb;
    TextView tv;
    int prg = 0;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        pb = (ProgressBar) findViewById(R.id.pbId);
        tv = (TextView) findViewById(R.id.tvId);
 
        new Thread(myThread).start();
    }

    private Runnable myThread = new Runnable()
    { 
        @Override
        public void run() 
        {
            while (prg &lt; 100)
            {
                try
                {
                    hnd.sendMessage(hnd.obtainMessage());
                    Thread.sleep(100);
                }
                catch(InterruptedException e) 
                {  
                    Log.e("ERROR", "Thread was Interrupted");
                }
            }

            runOnUiThread(new Runnable() { 
                public void run() {
                    tv.setText("Finished");
                }
            });          
        }
    
        Handler hnd = new Handler()
        {    
            @Override
            public void handleMessage(Message msg) 
            {
                prg++;
                pb.setProgress(prg);

                String perc = String.valueOf(prg).toString();
                tv.setText(perc+"% completed");
            }
        };
    };
}

We create a thread to control the progress of a ProgressBar.

new Thread(myThread).start();

A new thread is started. In Android, lengthy tasks should by performed
inside a thread to prevent the application from appearing unresponsive.
A thread ends by returning from its main() method, or by an exception.

@Override
public void run() 
{
    while (prg &lt; 100)
    {
        try
        {
            hnd.sendMessage(hnd.obtainMessage());
            Thread.sleep(100);
        }
        catch(InterruptedException e) 
        {  
            Log.e("ERROR", "Thread was Interrupted");
        }
    }

    runOnUiThread(new Runnable() { 
        public void run() {
            tv.setText("Finished");
        }
    });          
}

The code in a thread is placed in the run() method. We will simulate a
lengthy task by calling the Thread.sleep() method. This forces us to handle
the InterruptedException. Android application runs in a single-thread model. 
All components of the main activity are created in the main thread. These components
cannot be manipulated in other threads. To work around this, we use either the Handler
object or call the runOnUiThread() method.

runOnUiThread(new Runnable() { 
    public void run() {
        tv.setText("Finished");
    }
});   

Only the original thread that created a view hierarchy can touch its views.
Here we are modifying the TextView widget. Therefore we have put the code
into the runOnUiThread() method, which runs the code in the
main, UI thread, where the widget was created.

Handler hnd = new Handler()
{    
    @Override
    public void handleMessage(Message msg) 
    {
        prg++;
        pb.setProgress(prg);

        String perc = String.valueOf(prg).toString();
        tv.setText(perc+"% completed");
    }
};

Another way to touch widgets from another thread is to use the Handler object.
It is used to enqueue an action to be performed on a different thread than its own.
We update the progress bar and set a percentage of the task completed to the 
text view.

![progbar1.png](images/progbar1.png)

Figure: ProgressBar widget

## ProgressBar II

 

In the second example, we show the usage of the ProgressBar in a circular
mode. The manifest file does not need to be modified.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;
&lt;ProgressBar 
    android:id="@+id/pbId"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    /&gt;    
&lt;TextView
    android:id="@+id/tvId"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="@string/msg"
    /&gt;        
&lt;/LinearLayout&gt;

In the main.xml file we have a ProgressBar and a 
TextView. The ProgressBar has the default style, 
which is the circular style. This is the same as if we have used the 
style="?android:attr/progressBarStyle" attribute.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;CirProgBar&lt;/string&gt;
    &lt;string name="msg"&gt;Please wait...&lt;/string&gt;
&lt;/resources&gt;

We have two string resources in the strings.xml file.

MainActivity.java
  

package com.zetcode.progbar;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.view.View;
import android.util.Log;

public class MainActivity extends Activity
{
    ProgressBar pb;
    TextView tv;
    int prg = 0;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        pb = (ProgressBar) findViewById(R.id.pbId);
        tv = (TextView) findViewById(R.id.tvId);
 
        new Thread(myThread).start();
    }

    private Runnable myThread = new Runnable()
    { 
        @Override
        public void run() 
        {
            while (prg &lt; 100)
            {
                try
                {
                    hnd.sendMessage(hnd.obtainMessage());
                    Thread.sleep(100);
                }
                catch(InterruptedException e) 
                {  
                    Log.e("ERROR", "Thread was Interrupted");
                }
            }

            runOnUiThread(new Runnable() { 
                public void run() {
                    tv.setText("Finished");
                    pb.setVisibility(View.GONE); 
                }
            });          
        }
    
        Handler hnd = new Handler()
        {    
            @Override
            public void handleMessage(Message msg) 
            {
                prg++;
                pb.setProgress(prg);
            }
        };
    };
}

The code is similar to the first example with a few modifications.

runOnUiThread(new Runnable() { 
    public void run() {
        tv.setText("Finished");
        pb.setVisibility(View.GONE); 
    }
}); 

After the task was completed, we hide the ProgressBar using the
setVisibility() method. The circle itself is an endless animation, 
so after the task was finished, we need to hide the widget.

![progbar2.png](images/progbar2.png)

Figure: Circular ProgressBar widget

In this chapter of the Android development tutorial, we have mentioned
ProgressBar widget. 

[Contents](..)
[Previous](../seekbar/)
[Next](../listview/)