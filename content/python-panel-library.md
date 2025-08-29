+++
title = "Python Panel Library"
date = 2025-08-29T20:09:50.451+01:00
draft = false
description = "Python Panel library tutorial shows how to use Panel to build interactive dashboards, web applications, and data exploration tools. Includes six practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Panel Library

last modified January 23, 2025

The Panel library is an open-source Python library designed to streamline the
development of robust tools, dashboards, and complex applications entirely
within Python. It is part of the HoloViz ecosystem, which provides a suite of
data exploration tools.

## Installing Panel

You can install the Panel library using pip:

$ pip install panel

## show vs servable

The show and servable methods are two key ways to
display Panel objects.

### The show Method

- **Purpose:** Immediately displays the Panel object in a web browser.

- **Context:** Ideal for local development, quick previews, and Jupyter notebooks.

- **Usage:** Simply call show on your Panel object to open it in the default web browser.

### The servable Method

- **Purpose:** Prepares the Panel object to be served by a Panel server.

- **Context:** Used for deploying applications in a server environment for production use.

- **Usage:** Call servable on your Panel object, then use the panel serve command to serve the application.

In essence, use show for instant, local previews and
servable for deploying applications to be accessed over the web.

## Use Cases

- **Dashboards:** Create interactive and dynamic dashboards to visualize and explore data.

- **Web Applications:** Develop web applications with user interfaces that interact with Python code.

- **Exploratory Data Analysis:** Build tools to quickly explore and analyze data sets interactively.

- **Interactive Reports:** Generate interactive reports that allow users to manipulate data and visualize results.

- **Real-Time Monitoring:** Set up real-time monitoring dashboards to track live data feeds and visualize changes.

- **Custom GUIs:** Create custom graphical user interfaces for scientific computing, financial analysis, and other applications.

## Column Example

The following example demonstrates how to create a column layout with multiple
components using the Panel library.

column.py
  

import panel as pn

pn.extension(design="material")

component = pn.panel("an old falcon")
layout = pn.Column(
    component, pn.widgets.IntSlider(value=2, start=0, end=10, name="Value"),
    pn.pane.HTML("&lt;h1&gt;Title&lt;/h1&gt;")
)
print(layout)
layout.show()

In this example, we import the Panel library and initialize it with the Material
design theme using pn.extension(design="material"). We then create
a column layout with three components: a text panel, an integer slider, and an
HTML pane. The pn.Column function is used to arrange these
components vertically.

## Rows

In the next example, we show how to organize items in rows. We also apply some 
custom CSS in panels

rows.py
  

import panel as pn

#  Apply the custom CSS

custom_css = """
* {
    background-color: #2e2e2e;
    color: white;
}
"""

# Apply the custom CSS
pn.extension(raw_css=[custom_css])

component1 = pn.panel("Panel 1")
component2 = pn.panel("Panel 2")

base = pn.FlexBox(flex_direction='column')

row1 = pn.Row(
    component1, component2,
    pn.pane.HTML("&lt;p&gt;paragraph&lt;/p&gt;"),
    pn.pane.Str(
        'This is a raw string that will not be formatted in any way.',
    )
)

row2 = pn.Row(
    pn.pane.Markdown("""\
# Wind Turbine

A wind turbine is a device that converts the kinetic energy of wind into \
[electrical energy](https://en.wikipedia.org/wiki/Electrical_energy).

Read more [here](https://en.wikipedia.org/wiki/Wind_turbine).
""")
)

base.append(row1)
base.append(row2)

base.show()

Custom CSS is defined to set a dark background color and white text for all
elements. The pn.extension(raw_css=[custom_css]) method applies
this CSS to the entire application. Then, several Panel components are created,
including component1 and component2 as basic panels, an HTML pane with a
paragraph, and a raw string pane. These components are arranged in rows using
pn.Row to create structured layouts.

Row 1 contains component1, component2, an HTML paragraph, and a raw string,
while Row 2 contains a Markdown pane with information about wind turbines. These
rows are added to a pn.FlexBox with a column layout, which serves
as the main container for the application. Finally base.show
launches the application in a web browser. The result is a web application with
a dark theme and organized content that demonstrates the flexibility and styling
capabilities of Panel.

## DataFrame Example

The following example demonstrates how to display a Pandas DataFrame in a Panel
application.

dataframe.py
  

import pandas as pd
import panel as pn

pn.extension()

data = {'A': [1, 2, 3, 4], 'B': [5, 6, 7, 8], 'C': [9, 10, 11, 12]}
df = pd.DataFrame(data)

table = pn.widgets.DataFrame(df, name='DataFrame Viewer')
table.width = 400
table.height = 350

app = pn.Column("# DataFrame Viewer", table)
app.show()

In this example, we import the Panel and Pandas libraries and initialize Panel
with pn.extension. We then create a DataFrame with some sample
data and use the pn.widgets.DataFrame function to create a table
widget. We set the width and height of the table and create a column layout with
a title and the table. Finally, we display the layout using the
show method.

## FloatSlider

This example demonstrates how to create a simple Panel app with a slider and a
text display.

float_slider.py
  

import panel as pn

slider = pn.widgets.FloatSlider(name='Slider', start=0, end=10)
text = pn.pane.Str('Slider value: 0')

def update_text(event):
    text.object = f'Slider value: {event.new}'

slider.param.watch(update_text, 'value')

app = pn.Column(slider, text)
app.show()

The example creates a simple interactive web application with a float slider and
a text display. The FloatSlider widget allows users to select a
value between 0 and 10. Initially, the text pane displays 
"Slider value: 0". The update_text function updates the text pane to show
the current slider value whenever the slider's value changes. 

The watch method attaches the update_text
function to the slider's 'value' parameter, ensuring the text updates
dynamically. Finally, pn.Column organizes the slider and text into
a vertical layout.

The app.show launches the Panel application in a web browser
immediately, displaying the float slider and the text pane.

## Interactive Plot

This example shows how to create an interactive plot using Panel and Matplotlib.

interactive_plot.py
  

import panel as pn
import matplotlib.pyplot as plt
import numpy as np

pn.extension()

def plot_sine(frequency):
    x = np.linspace(0, 2 * np.pi, 100)
    y = np.sin(frequency * x)
    plt.figure()
    plt.plot(x, y)
    plt.title(f'Sine Wave with Frequency {frequency}')
    return plt.gcf()

frequency_slider = pn.widgets.FloatSlider(name='Frequency', start=1, end=10, value=1)
interactive_plot = pn.bind(plot_sine, frequency=frequency_slider)

app = pn.Column(frequency_slider, interactive_plot)
app.servable()

This example demonstrates how to create an interactive web application using the
Panel library to visualize sine waves with varying frequencies. The
plot_sine function generates a sine wave plot based on the provided
frequency using Matplotlib and NumPy. 

A FloatSlider widget named frequency_slider allows
users to adjust the sine wave frequency between 1 and 10. The
pn.bind function binds the slider's value to the plot_sine
function, ensuring that the plot updates dynamically as the slider is adjusted.
The pn.Column
function arranges the slider and the interactive plot vertically

## Interactive Data Fetching and Display

The next example illustrates how to create an interactive web application using
the Panel library to fetch and display data from a provided JSON URL.

data_fetch.py
  

import panel as pn
import requests
import pandas as pd

pn.extension()

def load_data(event):
    url = text_input.value
    response = requests.get(url)
    data = response.json()
    df = pd.DataFrame(data)
    
    table.object = df  

text_input = pn.widgets.TextInput(name='JSON URL', 
    value='https://jsonplaceholder.typicode.com/users')

button = pn.widgets.Button(name='Load Data', button_type='primary')
button.on_click(load_data)

table = pn.pane.DataFrame(pd.DataFrame(), sizing_mode='stretch_width')
app = pn.Column(pn.Row(text_input, button), table)

app.show()

The load_data function retrieves data from the URL entered in the
TextInput widget, converts it to a pandas DataFrame, and updates the table pane.
The application includes a TextInput widget for users to input the
JSON URL, a Button widget to trigger data loading, and a
DataFrame pane to display the fetched data. 

The layout arranges these components in a column format, and
app.show launches the application in a web browser, providing a
user-friendly interface for interacting with remote data.

## Source

[Python Panel Documentation](https://panel.holoviz.org/)

In this article, we have explored the Python Panel library and demonstrated its
capabilities through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).