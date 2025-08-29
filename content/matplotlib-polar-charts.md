+++
title = "Matplotlib Polar Charts"
date = 2025-08-29T20:03:35.144+01:00
draft = false
description = "Python tutorial on Matplotlib polar charts, covering basic and advanced polar charts with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Polar Charts

last modified March 7, 2025

Matplotlib is a versatile Python library for creating a wide range of
visualizations, including polar charts. Polar charts, also known as radial or
circular charts, plot data in a circular coordinate system, making them ideal
for displaying cyclic or directional data. This tutorial explores how to create
various types of polar charts using Matplotlib.

Polar charts are particularly useful for visualizing periodic phenomena, such as
wind directions, daily activity patterns, or seasonal trends. Matplotlib's polar
plotting capabilities allow for flexible customization, enabling users to
represent data in an intuitive and visually appealing way.

## Basic Polar Chart

This example demonstrates how to create a basic polar chart showing wind speed
by direction.

basic_polar_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Directions (degrees) and wind speed (m/s)
theta = np.radians([0, 90, 180, 270, 360])  # N, E, S, W, N
wind_speed = [5, 8, 6, 7, 5]

# Create a polar chart
ax = plt.subplot(111, projection="polar")
ax.plot(theta, wind_speed, color="blue", label="Wind Speed")
ax.fill_between(theta, 0, wind_speed, color="skyblue", alpha=0.4)

# Customize the chart
ax.set_theta_zero_location("N")  # North at top
ax.set_theta_direction(-1)  # Clockwise
ax.set_title("Wind Speed by Direction (March 2025)")
ax.set_xlabel("Direction")
ax.legend()

# Display the chart
plt.show()

In this example, we plot wind speed across cardinal directions (North, East,
South, West) for a day in March 2025. The np.radians function
converts degrees to radians, as Matplotlib's polar plots use radians. The
subplot function with projection="polar" sets up the
circular coordinate system. The fill_between method fills the area
from the center (0) to the wind speed values, creating a radial effect.

The chart is customized with set_theta_zero_location("N") to align
North at the top and set_theta_direction(-1) for clockwise
rotation, mimicking a compass. Wind speed peaks at 8 m/s from the East,
providing a clear visual of directional variation—useful for meteorologists or
renewable energy analysts studying wind patterns.

## Polar Bar Chart

This example shows how to create a polar bar chart to display daily activity hours.

polar_bar_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Hours of the day and activity duration (hours)
theta = np.linspace(0, 2 * np.pi, 24, endpoint=False)  # 24 hours
activity = [1, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 2, 3, 4, 5, 4, 3, 2, 1, 1]

# Create a polar bar chart
ax = plt.subplot(111, projection="polar")
width = 2 * np.pi / 24  # Width of each bar
bars = ax.bar(theta, activity, width=width, color="skyblue", alpha=0.7)

# Customize the chart
ax.set_theta_zero_location("N")
ax.set_theta_direction(-1)
ax.set_title("Daily Activity Hours (March 7, 2025)")
ax.set_xlabel("Time of Day")

# Display the chart
plt.show()

This polar bar chart represents a person's activity duration across 24 hours on
March 7, 2025. The np.linspace function divides the circle into 24
equal segments (one per hour), and ax.bar creates bars radiating
from the center, with heights corresponding to activity hours. The
width parameter ensures bars span one hour each, and
alpha=0.7 adds slight transparency.

Activity peaks between 9 AM and 5 PM (up to 6 hours), likely reflecting work or
exercise, and tapers off at night. The polar layout naturally conveys the
cyclical nature of a day, making it ideal for time-based data like sleep
patterns, energy usage, or traffic flow. The chart's compass-like orientation
enhances its intuitive appeal.

## Polar Area Chart with Multiple Datasets

This example demonstrates how to create a polar area chart comparing sales by
product category across seasons.

multi_polar_area_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Angles (seasons) and sales (thousands $)
theta = np.radians([0, 90, 180, 270, 360])  # Winter, Spring, Summer, Fall, Winter
electronics = [30, 35, 40, 45, 30]
clothing = [25, 20, 15, 30, 25]

# Create a polar chart
ax = plt.subplot(111, projection="polar")
ax.fill_between(theta, electronics, color="skyblue", alpha=0.4, label="Electronics")
ax.fill_between(theta, clothing, color="lightgreen", alpha=0.4, label="Clothing")

# Customize the chart
ax.set_theta_zero_location("N")
ax.set_theta_direction(-1)
ax.set_xticks(theta[:-1])  # Exclude the last tick to avoid overlap
ax.set_xticklabels(["Winter", "Spring", "Summer", "Fall"])
ax.set_title("Seasonal Sales by Category (2025)")
ax.legend()

# Display the chart
plt.show()

This chart compares seasonal sales for electronics and clothing in 2025. Two
fill_between calls create overlapping filled areas, with
alpha=0.4 ensuring visibility of both datasets. The angles
represent seasons, converted to radians, and custom xticklabels
replace numerical ticks with season names for clarity.

Electronics sales peak in Summer (40) and Fall (45), possibly due to tech
releases, while clothing sales spike in Fall (30) and Winter (25), reflecting
seasonal demand. This visualization highlights cyclical trends and comparisons,
making it valuable for retail analysis or marketing strategy planning.

## Polar Scatter Chart with Size Variation

This example shows how to create a polar scatter chart with varying point sizes
to represent earthquake magnitudes by direction.

polar_scatter_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Directions (degrees), distances (km), and magnitudes
theta = np.radians([45, 135, 225, 315])  # NE, SE, SW, NW
distances = [50, 80, 60, 70]  # Distance from epicenter
magnitudes = [4.5, 6.0, 5.2, 4.8]  # Richter scale

# Create a polar scatter chart
ax = plt.subplot(111, projection="polar")
scatter = ax.scatter(theta, distances, s=np.array(magnitudes) * 50, color="red", alpha=0.6, label="Earthquakes")

# Customize the chart
ax.set_theta_zero_location("N")
ax.set_theta_direction(-1)
ax.set_title("Earthquake Magnitudes by Direction (March 2025)")
ax.set_xlabel("Direction from Epicenter")
ax.set_ylabel("Distance (km)")
ax.legend()

# Display the chart
plt.show()

This polar scatter chart maps earthquakes around an epicenter in March 2025,
with directions in degrees, distances in kilometers, and magnitudes on the
Richter scale. The scatter function plots points, where
s=np.array(magnitudes) * 50 scales point sizes by magnitude for
visual impact. The alpha=0.6 parameter adds transparency to
overlapping points.

The largest quake (6.0) occurs 80 km southeast, while the smallest (4.5) is 50
km northeast. This chart type excels at showing spatial relationships and
intensity, useful for seismologists or emergency planners assessing quake
distribution relative to a central point.

## Best Practices for Polar Charts

- **Set Clear Directions:** Use set_theta_zero_location and set_theta_direction to orient the chart intuitively.

- **Label Axes:** Provide meaningful labels for angles and radii to aid interpretation.

- **Use Transparency:** Apply alpha for overlapping areas or points to maintain visibility.

- **Simplify Data:** Limit the number of categories or points to avoid clutter in the circular layout.

## Source

[Matplotlib Polar Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.polar.html)

In this article, we have explored various types of polar charts using
Matplotlib, including basic polar charts, polar bar charts, multi-dataset area
charts, and scatter charts with size variation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).