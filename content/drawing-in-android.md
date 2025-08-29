+++
title = "Drawing in Android"
date = 2025-08-29T20:03:38.922+01:00
draft = false
description = "In this chapter of the Android tutorial, we will do some drawing."
image = "images/ovalshape.png"
imageBig = "images/ovalshape.png"
categories = ["mob"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)

# Drawing in Android

last modified October 29, 2012

In this chapter of the Android development tutorial we will do some
drawing. The Android framework API provides 2D drawing API that
allows to render custom graphics. 

We can either draw directly on a Canvas object or to modify
existing Views to customise their look and feel. Drawing
is performed in the onDraw() method. Simple graphics
can be created in the layout XML file too.

We use the Canvas object to perform drawing. A Canvas is 
an object that has drawing methods to do the drawing. Actual drawing
happens in a Bitmap that is placed into a window. 
The Paint class holds the style and colour information about 
how to draw geometries, text and bitmaps. 
A Drawable is an object that can be drawn. Unlike a View, 
a Drawable does not have any facility to receive events or otherwise 
interact with the user.

## Oval shape

 

We are going to draw a circle on a View. The circle is defined in
an XML file. The manifest file does not need to be modified.

oval.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="oval"&gt;
    
   &lt;solid 
       android:color="#666666"/&gt;
   &lt;size 
       android:width="70dp"
       android:height="70dp"/&gt;
&lt;/shape&gt; 

In the oval.xml file we create a circle shape. We define its colour and size.
The oval.xml file is located in the res/drawable 
directory. The directory had to be created.

main.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    &gt;        

&lt;View
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_marginTop="5dp"
    android:background="@drawable/oval"
    /&gt;   
   
&lt;/LinearLayout&gt;

In the main.xml file, we define a View. The background
of this view is filled with our drawable object.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;OvalShape&lt;/string&gt;
&lt;/resources&gt;

Resources file.

MainActivity.java
  

package com.zetcode.ovalshape;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}

The file just loads the defined layout.

![ovalshape.png](images/ovalshape.png)

Figure: Oval Shape

## Drawing a rectangle

 

In the second example, we will draw a rectangle on a View.
It will be drawn in the onDraw() method of the View. 
Since we will be drawing on an existing View, we will
have a predefined Canvas with its Bitmap. We do not need to
worry about them. The manifest file is not modified. In this 
example the main.xml file will not be needed.

strings.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;
    &lt;string name="app_name"&gt;DrawRect&lt;/string&gt;
&lt;/resources&gt;

Resources.

DrawView.java
  

package com.zetcode.drawrect;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

public class DrawView extends View 
{
    Paint paint = new Paint();

    public DrawView(Context context)  
    {
        super(context);
        paint.setColor(Color.GREEN);
    }

    @Override
    public void onDraw(Canvas canvas) 
    {
        canvas.drawRect(30, 30, 100, 100, paint);
    }
}

We have a custom DrawView class. The file is located in
the src/com/zetcode/drawrect/ directory.

public class DrawView extends View 

The custom DrawView class inherits from the base View class. 

Paint paint = new Paint();

An instance of the Paint class is created. It will define a colour
for drawing.

paint.setColor(Color.GREEN);

We will paint in green colour.

@Override
public void onDraw(Canvas canvas) 
{
    canvas.drawRect(30, 30, 100, 100, paint);
}

The drawing is performed in the onDraw() method. The method provides
the Canvas object for us. We call the drawRect() to 
draw the rectangle on the View. 

MainActivity.java
  

package com.zetcode.drawrect;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;

public class MainActivity extends Activity 
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        DrawView drawView = new DrawView(this);
        drawView.setBackgroundColor(Color.WHITE);
        setContentView(drawView);
    }
}

In the MainActivity.java source file we set the custom DrawView
to be the content View of the Activity.

DrawView drawView = new DrawView(this);

We create an instance of the DrawView class.

drawView.setBackgroundColor(Color.WHITE);

We specify the background colour for the View.

setContentView(drawView);

The DrawView becomes the content View of the Activity.

![drawrect.png](images/drawrect.png)

Figure: Rectangle

In this chapter of the Android development tutorial, we did dome basic drawing.

[Contents](..)
[Previous](../dialogs/)