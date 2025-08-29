+++
title = "Matplotlib Area Charts"
date = 2025-08-29T20:03:34.055+01:00
draft = false
description = "Python tutorial on Matplotlib area charts, covering basic and advanced area charts with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Area Charts

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Area charts are useful for visualizing cumulative
data or comparing multiple datasets over time. This tutorial covers how to
create various types of area charts using Matplotlib.

Area charts are ideal for showing trends and cumulative totals, such as revenue
over time or resource usage. Matplotlib provides a flexible and easy-to-use
interface for creating area charts with customizations.

## Basic Area Chart

This example demonstrates how to create a basic area chart using monthly website
traffic data.

basic_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Months and website visitors (in thousands)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
visitors = [50, 60, 80, 75, 90]

# Create an area chart
plt.fill_between(months, visitors, color="skyblue", alpha=0.4)
plt.plot(months, visitors, color="blue", label="Visitors")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Visitors (thousands)")
plt.title("Website Traffic in 2025")
plt.legend()

# Display the chart
plt.show()

In this example, we visualize the number of website visitors over five months in
2025. The plt.fill_between function fills the area under the line,
representing the cumulative visitor count. The alpha=0.4 parameter
sets the transparency, making the fill light enough to distinguish it from the
line while still being visible. The line plot overlays the filled area to
emphasize the trend.

This type of chart is useful for tracking simple metrics over time, such as
website traffic, sales, or temperature changes. Here, the data reflects a
realistic scenario where traffic increases in March, dips slightly in April, and
peaks in May—patterns often seen in real-world analytics due to seasonal trends
or marketing campaigns.

## Stacked Area Chart

This example shows how to create a stacked area chart to compare sales of
different product categories.

stacked_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Months and sales (in thousands of dollars)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
electronics = [30, 35, 40, 45, 50]
clothing = [20, 25, 30, 28, 35]

# Create a stacked area chart
plt.stackplot(months, electronics, clothing, labels=["Electronics", "Clothing"], colors=["skyblue", "lightgreen"])

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Sales (thousands $)")
plt.title("Product Sales in 2025")
plt.legend()

# Display the chart
plt.show()

Here, we use plt.stackplot to create a stacked area chart showing
sales data for two product categories—electronics and clothing—over five months.
The chart stacks the sales values, allowing us to see both the individual
contributions and the total sales trend. The labels parameter names
each dataset, and the colors list assigns distinct colors for
clarity.

This visualization is particularly effective for comparing the relative
performance of multiple categories over time. For instance, electronics
consistently outperform clothing, but both categories show growth, with a
notable increase in March—possibly due to a spring sale. Such insights are
valuable for businesses analyzing revenue streams or planning inventory.

## Area Chart with Negative Values

This example demonstrates how to create an area chart with profit/loss data,
including negative values.

negative_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Months and profit/loss (in thousands of dollars)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
profit_loss = [10, -5, 15, -8, 12]

# Create an area chart with negative values
plt.fill_between(months, profit_loss, color="skyblue", alpha=0.4)
plt.plot(months, profit_loss, color="blue", label="Profit/Loss")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Profit/Loss (thousands $)")
plt.title("Monthly Profit/Loss in 2025")
plt.legend()

# Display the chart
plt.show()

This chart tracks monthly profit and loss for a business, where negative values
indicate losses. The plt.fill_between function automatically
adjusts to fill below the x-axis for negative values, providing a clear visual
distinction between profit and loss periods. The line plot helps highlight the
exact values and trend direction.

In this example, February and April show losses (-5 and -8 thousand dollars,
respectively), while the other months are profitable. This type of chart is
useful for financial analysis, where understanding both gains and setbacks is
critical—such as identifying months affected by unexpected expenses or poor
sales. The transparency ensures readability even with negative regions.

## Area Chart with Gradient Fill

This example shows how to create an area chart with a gradient fill using daily temperature data.

gradient_area_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Days and temperature (in Celsius)
days = np.arange(1, 31)  # 30 days in April
temp = 15 + 5 * np.sin(np.linspace(0, 2 * np.pi, 30))  # Simulated temperature

# Create an area chart with gradient fill
plt.fill_between(days, temp, color="skyblue", alpha=0.4, interpolate=True)
plt.plot(days, temp, color="blue", label="Temperature")

# Add labels, title, and legend
plt.xlabel("Day in April")
plt.ylabel("Temperature (°C)")
plt.title("Daily Temperature in April 2025")
plt.legend()

# Display the chart
plt.show()

This example uses simulated daily temperature data for April 2025, generated
with a sine wave to mimic natural fluctuations. The np.linspace and
np.sin functions create a smooth dataset, and
plt.fill_between with interpolate=True ensures a
seamless gradient fill under the curve. The base temperature is set at 15°C,
with a 5°C variation.

The gradient fill enhances the visual appeal, making it easier to see the
temperature trend over the month. This type of chart could be used in
meteorology or environmental studies to present continuous data in an engaging
way. The smooth interpolation is particularly helpful with dense datasets,
avoiding jagged edges and reflecting realistic daily temperature shifts.

## Area Chart with Multiple Layers

This example demonstrates how to create an area chart with multiple layers using
energy consumption data.

multi_layer_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Months and energy consumption (in GWh)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
residential = [120, 130, 110, 100, 115]
industrial = [200, 210, 220, 215, 230]
commercial = [80, 85, 90, 88, 95]

# Create an area chart with multiple layers
plt.fill_between(months, residential, color="skyblue", alpha=0.4, label="Residential")
plt.fill_between(months, industrial, color="lightgreen", alpha=0.4, label="Industrial")
plt.fill_between(months, commercial, color="orange", alpha=0.4, label="Commercial")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Energy Consumption (GWh)")
plt.title("Energy Consumption by Sector in 2025")
plt.legend()

# Display the chart
plt.show()

This chart displays energy consumption across three sectors—residential,
industrial, and commercial—over five months. Each sector is represented by a
separate plt.fill_between call, creating overlapping layers. The
alpha=0.4 parameter ensures transparency, allowing all layers to be
visible despite overlap, while distinct colors differentiate the sectors.

Unlike a stacked chart, this layered approach doesn't cumulative the values but
shows each dataset independently. Here, industrial use dominates, peaking at 230
GWh in May, while residential and commercial usage show smaller fluctuations.
This visualization is useful for energy analysts comparing absolute consumption
patterns without aggregating totals.

## Area Chart with Baseline Adjustment

This example demonstrates how to create an area chart with an adjusted baseline
using stock price data.

baseline_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Days and stock prices (in dollars)
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
prices = [150, 152, 148, 155, 160]

# Create an area chart with a custom baseline
plt.fill_between(days, prices, 145, color="skyblue", alpha=0.4, label="Price Variation")
plt.plot(days, prices, color="blue", label="Stock Price")

# Add labels, title, and legend
plt.xlabel("Day")
plt.ylabel("Price ($)")
plt.title("Stock Price Variation (Week of March 3, 2025)")
plt.legend()

# Display the chart
plt.show()

This chart tracks a stock's price over a week, with the area filled between the
price line and a baseline of $145. The plt.fill_between function
accepts a baseline value (145 here) as its second argument, filling the area
between this value and the data points. This highlights price variations
relative to a reference point, such as an opening price or average.

In this example, the stock dips below $150 on Wednesday but rises to $160 by
Friday. Setting the baseline at $145 shows gains and losses relative to that
threshold, which could represent a key level for traders. This variation is
useful in financial analysis or any scenario where deviations from a norm are
more insightful than absolute values.

## Area Chart with Dual Y-Axes

This example demonstrates how to create an area chart with dual Y-axes to
compare monthly rainfall and temperature.

dual_axes_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Months, rainfall (mm), and temperature (°C)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
rainfall = [80, 60, 40, 50, 70]
temperature = [15, 16, 18, 20, 22]

# Create figure and twin axes
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()

# Plot rainfall on first axis
ax1.fill_between(months, rainfall, color="skyblue", alpha=0.4, label="Rainfall")
ax1.plot(months, rainfall, color="blue")
ax1.set_xlabel("Month")
ax1.set_ylabel("Rainfall (mm)", color="blue")
ax1.tick_params(axis="y", labelcolor="blue")

# Plot temperature on second axis
ax2.fill_between(months, temperature, color="lightcoral", alpha=0.4, label="Temperature")
ax2.plot(months, temperature, color="red")
ax2.set_ylabel("Temperature (°C)", color="red")
ax2.tick_params(axis="y", labelcolor="red")

# Add title and legend
plt.title("Rainfall and Temperature in 2025")
fig.legend(loc="upper center", bbox_to_anchor=(0.5, -0.05), ncol=2)

# Display the chart
plt.show()

This example uses dual Y-axes to compare monthly rainfall and average
temperature over five months in 2025. The plt.subplots() function
creates a figure and primary axis (ax1), while twinx()
generates a secondary axis (ax2) sharing the same X-axis. Rainfall
is plotted on the left Y-axis in blue, and temperature on the right Y-axis in
red, with matching fill colors and transparency (alpha=0.4).

The dual-axis approach is ideal for visualizing two datasets with different
units or scales, such as weather metrics. Here, rainfall peaks in January (80
mm) and dips in March (40 mm), while temperature steadily rises from 15°C to
22°C. Color-coded labels and ticks enhance readability, and the legend is placed
below the chart for clarity. This chart could help meteorologists or farmers
analyze seasonal patterns effectively.

## Cumulative Area Chart

This example shows how to create a cumulative area chart to track total sales
over time.

cumulative_area_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data: Months and monthly sales (in thousands of dollars)
months = ["Jan", "Feb", "Mar", "Apr", "May"]
monthly_sales = [20, 25, 30, 28, 35]

# Calculate cumulative sales
cumulative_sales = np.cumsum(monthly_sales)

# Create a cumulative area chart
plt.fill_between(months, cumulative_sales, color="skyblue", alpha=0.4)
plt.plot(months, cumulative_sales, color="blue", label="Cumulative Sales")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Cumulative Sales (thousands $)")
plt.title("Cumulative Sales in 2025")
plt.legend()

# Display the chart
plt.show()

In this example, we visualize the cumulative sales of a business over five
months in 2025. The np.cumsum function computes the running total
of monthly sales, transforming [20, 25, 30, 28, 35] into [20, 45, 75, 103, 138].
The plt.fill_between function then fills the area under this
cumulative curve, with a line plot overlaying it to show the growth trajectory.

Cumulative area charts are excellent for tracking progress toward a goal, such
as annual sales targets. Here, sales grow steadily, reaching $138,000 by May,
with the largest monthly increase in March (30). The filled area emphasizes the
total accumulation, making it easy to see how each month contributes to the
overall figure—useful for business owners or financial analysts monitoring
performance.

## Area Chart with Annotations

This example demonstrates how to create an area chart with annotations to
highlight key events in social media follower growth.

annotated_area_chart.py
  

import matplotlib.pyplot as plt

# Data: Weeks and followers (in thousands)
weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]
followers = [10, 12, 18, 20, 25]

# Create an area chart
plt.fill_between(weeks, followers, color="skyblue", alpha=0.4)
plt.plot(weeks, followers, color="blue", label="Followers")

# Add annotations
plt.annotate("Viral Post", xy=("Week 3", 18), xytext=("Week 2", 20),
             arrowprops=dict(facecolor="black", shrink=0.05))
plt.annotate("Campaign Launch", xy=("Week 5", 25), xytext=("Week 4", 27),
             arrowprops=dict(facecolor="black", shrink=0.05))

# Add labels, title, and legend
plt.xlabel("Week")
plt.ylabel("Followers (thousands)")
plt.title("Social Media Follower Growth in 2025")
plt.legend()

# Display the chart
plt.show()

This chart tracks social media follower growth over five weeks, with annotations
marking significant events. The plt.fill_between function fills the
area under the follower count curve, while plt.annotate adds text
labels and arrows pointing to key data points: a viral post in Week 3 (18,000
followers) and a campaign launch in Week 5 (25,000 followers).

Annotations make this chart more informative by explaining sudden
increases—e.g., the jump from 12,000 to 18,000 followers in Week 3 due to a
viral post. The xy parameter sets the annotation's anchor point,
and xytext adjusts its text position, with arrows connecting them.
This variation is perfect for marketing teams or content creators analyzing the
impact of specific actions on audience growth.

## Best Practices for Area Charts

- **Label Axes Clearly:** Always label the X and Y axes to make the chart understandable.

- **Use Legends:** Add legends when plotting multiple datasets to differentiate them.

- **Choose Appropriate Colors:** Use contrasting colors for multiple layers to improve readability.

- **Limit Data Points:** Avoid cluttering the chart with too many data points.

## Source

[Matplotlib Area Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.fill_between.html)

In this article, we have explored various types of area charts using Matplotlib,
including basic, stacked, negative, gradient, multi-layer, and baseline-adjusted area charts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).