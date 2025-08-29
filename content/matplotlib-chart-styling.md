+++
title = "Matplotlib Chart Styling"
date = 2025-08-29T20:03:36.353+01:00
draft = false
description = "Python tutorial on styling Matplotlib charts, covering line styles, colors, and more with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Chart Styling

last modified March 7, 2025

Matplotlib offers extensive styling options to customize charts, enhancing 
their visual appeal and clarity. This tutorial covers join styles, cap 
styles, line styles, colors, gradients, and more with practical examples.

Styling is key to effective data visualization, making charts more readable 
and engaging. From line patterns to color gradients, Matplotlib provides 
tools to tailor charts to specific needs, such as reports or presentations.

## Join Styles and Cap Styles

This example styles a line chart of temperature with join and cap styles.

join_cap_styles.py
  

import matplotlib.pyplot as plt

# Data: Days and temperature (°C)
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
temp = [15, 17, 16, 18, 20]

# Create a line chart with styling
plt.plot(days, temp, linewidth=5, linestyle="solid", 
         joinstyle="bevel", capstyle="round", color="blue", label="Temp")

# Add labels, title, and legend
plt.xlabel("Day")
plt.ylabel("Temperature (°C)")
plt.title("Temperature (Week of March 3, 2025)")
plt.legend()

# Display the chart
plt.show()

This line chart tracks daily temperatures for a week in March 2025. The 
joinstyle="bevel" parameter sets how line segments connect, 
creating angled joins, while capstyle="round" rounds the ends 
of the line. A linewidth=5 makes these effects visible.

Join styles ("miter", "round", "bevel") affect corners, useful for thick 
lines in technical diagrams. Cap styles ("butt", "round", "projecting") 
define line endpoints, enhancing clarity in sparse data like this weather 
trend, where temperature peaks at 20°C on Friday.

## Line Styles and Markers

This example uses line styles and markers for a chart of website visitors.

line_styles_markers.py
  

import matplotlib.pyplot as plt

# Data: Months and visitors (thousands)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
visitors = [50, 60, 80, 75, 90]

# Create a line chart with styling
plt.plot(months, visitors, linestyle="--", marker="o", markersize=10, 
         linewidth=2, color="purple", label="Visitors")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Visitors (thousands)")
plt.title("Website Visitors in 2025")
plt.legend()

# Display the chart
plt.show()

This chart displays website visitors over five months, styled with a dashed 
line (linestyle="--") and circle markers (marker="o"). 
The markersize=10 and linewidth=2 enhance visibility, 
while "purple" adds a distinct color.

Line styles like "solid", "dashed", "dotted", or "dashdot" differentiate 
trends, and markers (e.g., "o", "s", "^") highlight data points. Here, the 
dashed line with markers emphasizes monthly changes, peaking at 90,000 in 
May, ideal for tracking growth in digital analytics.

## Colors and Gradients

This example applies colors and gradients to a bar chart of sales data.

colors_gradients.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Products and sales (thousands $)
products = ["Laptops", "Phones", "Tablets"]
sales = [40, 60, 30]

# Create a gradient colormap
colors = plt.cm.viridis(np.linspace(0, 1, len(products)))

# Create a bar chart with gradient
bars = plt.bar(products, sales, color=colors, edgecolor="black", linewidth=1.5)

# Add labels and title
plt.xlabel("Product")
plt.ylabel("Sales (thousands $)")
plt.title("Product Sales (March 2025)")

# Display the chart
plt.show()

This bar chart shows sales for three products in March 2025, styled with a 
"viridis" gradient. The plt.cm.viridis function generates a 
color range, applied via the color parameter. Black edges 
(edgecolor="black") with linewidth=1.5 outline bars.

Gradients enhance visual hierarchy—here, Phones (60) stand out with a 
brighter shade. Matplotlib supports colormaps like "plasma", "inferno", or 
solid colors (e.g., "red"). This styling suits sales reports, making data 
comparisons pop while maintaining a professional look.

## Transparency and Fill Styles

This example uses transparency and fill for a line chart with area fill.

transparency_fill.py
  

import matplotlib.pyplot as plt

# Data: Days and stock prices ($)
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
prices = [150, 152, 148, 155, 160]

# Create a line chart with fill
plt.plot(days, prices, linestyle="-", color="darkgreen", linewidth=2, label="Price")
plt.fill_between(days, prices, 145, color="green", alpha=0.3)

# Add labels, title, and legend
plt.xlabel("Day")
plt.ylabel("Price ($)")
plt.title("Stock Price (Week of March 3, 2025)")
plt.legend()

# Display the chart
plt.show()

This chart tracks stock prices over a week, with a solid line and filled 
area below it. The fill_between function fills from a baseline 
(145) to the price line, using alpha=0.3 for light transparency. 
The line is styled dark green with linewidth=2.

Transparency (alpha) softens fills, showing overlap or grid 
lines—here, it highlights price gains above 145. Fill styles can emphasize 
trends, like this stock rising to 160 by Friday, useful in financial 
visualizations where subtle effects matter.

## Custom Grid and Background

This example styles a line chart with a custom grid and background color.

grid_background.py
  

import matplotlib.pyplot as plt

# Data: Months and energy use (GWh)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
energy = [120, 130, 110, 115, 125]

# Create a line chart with styling
plt.plot(months, energy, linestyle="-.", color="orange", linewidth=3, label="Energy")

# Customize grid and background
plt.grid(color="gray", linestyle="--", linewidth=0.5, alpha=0.7)
plt.gca().set_facecolor("#f0f0f0")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Energy Use (GWh)")
plt.title("Energy Consumption in 2025")
plt.legend()

# Display the chart
plt.show()

This chart shows energy consumption over five months, styled with a dash-dot 
line (linestyle="-.") in orange. The grid function 
adds a gray dashed grid with alpha=0.7, and 
set_facecolor sets a light gray background.

Custom grids aid readability—here, they frame energy dips (110 in March) and 
peaks (130 in Feb). Background colors like "#f0f0f0" enhance contrast, 
making this chart suitable for energy reports or presentations where style 
supports data clarity.

## Best Practices for Chart Styling

- **Balance Style and Clarity:** Avoid over-styling that obscures data.

- **Use Contrasting Colors:** Ensure lines, fills, and backgrounds stand out.

- **Test Readability:** Check that styles work for colorblind viewers or print.

- **Keep It Simple:** Limit styles to focus on the data, not decoration.

## Source

[Matplotlib Plot Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

In this article, we explored styling Matplotlib charts, including join and 
cap styles, line styles, colors, gradients, and custom grids, using basic 
line and bar charts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of 
programming experience. I have been writing programming articles since 2007. 
So far, I have written over 1400 articles and 8 e-books. I have over eight 
years of experience in teaching programming.

List [all Python tutorials](/all/#python).