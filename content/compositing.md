+++
title = "Compositing"
date = 2025-08-29T19:54:39.973+01:00
draft = false
description = "This part of the Cairo graphics tutorial covers compositing."
image = "images/compositing.png"
imageBig = "images/compositing.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transparency/)
[Next](../clippingmasking/)

# Compositing

last modified July 17, 2023

In this part of the Cairo graphics programming tutorial we define compositing
operations.

*Compositing* is the combining of visual elements from separate sources
into single images. They are used to create the illusion that all those elements
are parts of the same scene. Compositing is widely used in film industry to
create crowds, entire new worlds which would be expensive or impossible to
create otherwise. (wikipedia.org)

## Operations

There are several compositing operations. The Cairo graphics library has 
14 different compositing operations.

#include &lt;cairo.h&gt;
#include &lt;gtk/gtk.h&gt;

void do_drawing(cairo_t *cr, gint x, gint w,
    gint h, cairo_operator_t op)
{
  cairo_t *first_cr, *second_cr;
  cairo_surface_t *first, *second;

  first = cairo_surface_create_similar(cairo_get_target(cr),
      CAIRO_CONTENT_COLOR_ALPHA, w, h);

  second = cairo_surface_create_similar(cairo_get_target(cr),
      CAIRO_CONTENT_COLOR_ALPHA, w, h);

  first_cr = cairo_create(first);
  cairo_set_source_rgb(first_cr, 0, 0, 0.4);
  cairo_rectangle(first_cr, x, 20, 50, 50);
  cairo_fill(first_cr);

  second_cr = cairo_create(second);
  cairo_set_source_rgb(second_cr, 0.5, 0.5, 0);
  cairo_rectangle(second_cr, x+10, 40, 50, 50);
  cairo_fill(second_cr);

  cairo_set_operator(first_cr, op);
  cairo_set_source_surface(first_cr, second, 0, 0);
  cairo_paint(first_cr);

  cairo_set_source_surface(cr, first, 0, 0);
  cairo_paint(cr);

  cairo_surface_destroy(first);
  cairo_surface_destroy(second);

  cairo_destroy(first_cr);
  cairo_destroy(second_cr);

}

static gboolean on_draw_event(GtkWidget *widget, cairo_t *cr, 
    gpointer user_data)
{      
  cairo_operator_t oper[] = {
    CAIRO_OPERATOR_DEST_OVER, 
    CAIRO_OPERATOR_DEST_IN, 
    CAIRO_OPERATOR_OUT,
    CAIRO_OPERATOR_ADD, 
    CAIRO_OPERATOR_ATOP,
    CAIRO_OPERATOR_DEST_ATOP,
  };
  
  GtkWidget *win = gtk_widget_get_toplevel(widget);
  
  gint width, height;
  gtk_window_get_size(GTK_WINDOW(win), &amp;width, &amp;height);

  gint i;
  gint x, y;
  for(x=20, y=20, i=0; i &lt; 6; x+=80, i++) {
      do_drawing(cr, x, width, height, oper[i] );
  }

  return FALSE;
}

int main(int argc, char *argv[])
{
  GtkWidget *window;
  GtkWidget *darea;  

  gtk_init(&amp;argc, &amp;argv);

  window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

  darea = gtk_drawing_area_new();
  gtk_container_add(GTK_CONTAINER (window), darea);

  g_signal_connect(G_OBJECT(darea), "draw", 
      G_CALLBACK(on_draw_event), NULL);  
  g_signal_connect(window, "destroy",
      G_CALLBACK(gtk_main_quit), NULL);

  gtk_window_set_position(GTK_WINDOW(window), GTK_WIN_POS_CENTER);
  gtk_window_set_default_size(GTK_WINDOW(window), 510, 120);
  gtk_window_set_title(GTK_WINDOW(window), "Compositing operations");

  gtk_widget_show_all(window);

  gtk_main();

  return 0;
}

In our example we show six different compositing operations on two squares.

first = cairo_surface_create_similar(cairo_get_target(cr),
    CAIRO_CONTENT_COLOR_ALPHA, w, h);

second = cairo_surface_create_similar(cairo_get_target(cr),
    CAIRO_CONTENT_COLOR_ALPHA, w, h);

We create two surfaces.

first_cr = cairo_create(first);
cairo_set_source_rgb(first_cr, 0, 0, 0.4);
cairo_rectangle(first_cr, x, 20, 50, 50);
cairo_fill(first_cr);

We draw a rectangle into the surface.

cairo_set_operator(first_cr, op);
cairo_set_source_surface(first_cr, second, 0, 0);
cairo_paint(first_cr);

We apply the compositing operation on the surfaces.

cairo_set_source_surface(cr, first, 0, 0);
cairo_paint(cr);

Finally we draw the outcome onto the GTK+ window.

cairo_operator_t oper[] = {
  CAIRO_OPERATOR_DEST_OVER, 
  CAIRO_OPERATOR_DEST_IN, 
  CAIRO_OPERATOR_OUT,
  CAIRO_OPERATOR_ADD, 
  CAIRO_OPERATOR_ATOP,
  CAIRO_OPERATOR_DEST_ATOP,
};

In our example, we use these six compositing operations.

![compositing.png](images/compositing.png)

Figure: Compositing operations

This chapter covered Cairo compositing. 

[Contents](..) 
[Previous](../transparency/)
[Next](../clippingmasking/)