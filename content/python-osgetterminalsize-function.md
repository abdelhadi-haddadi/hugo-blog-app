+++
title = "Python os.get_terminal_size Function"
date = 2025-08-29T20:09:20.817+01:00
draft = false
description = "Complete guide to Python's os.get_terminal_size function covering terminal dimension checks, console output formatting, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.get_terminal_size Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.get_terminal_size
function, which retrieves terminal dimensions. We'll cover usage patterns,
fallback values, and practical terminal formatting examples.

## Basic Definitions

The os.get_terminal_size function returns terminal dimensions
as columns (width) and lines (height). It's available in Python 3.3+.

Returns a named tuple os.terminal_size with columns and lines attributes.
If terminal size can't be determined, returns fallback or (80, 24) default.

## Basic Terminal Size Check

The simplest use retrieves current terminal dimensions. This example shows
both attribute and index access to the size values.

basic_size.py
  

import os

# Get terminal size
size = os.get_terminal_size()

# Access via attributes
print(f"Terminal width: {size.columns} columns")
print(f"Terminal height: {size.lines} lines")

# Access via index
print(f"Dimensions: {size[0]}x{size[1]}")

This demonstrates two ways to access the dimensions. The named tuple provides
clear attribute names (columns, lines) and maintains index compatibility.

The output will vary based on your actual terminal window size when running.

## Providing Fallback Values

When terminal size can't be determined (like in non-terminal environments),
you can specify fallback dimensions. This prevents default (80, 24) values.

fallback_size.py
  

import os

# Custom fallback dimensions
fallback_size = os.terminal_size((120, 30))

# Get size with fallback
size = os.get_terminal_size(fallback_size)

print(f"Using dimensions: {size.columns}x{size.lines}")

# Alternative tuple fallback
size = os.get_terminal_size((100, 20))
print(f"Alternative fallback: {size.columns}x{size.lines}")

The first approach uses os.terminal_size for the fallback. The second uses
a simple tuple, which gets converted automatically.

Fallbacks are useful when running in IDEs or redirected output where terminal
size detection fails.

## Dynamic Text Wrapping

Using terminal width, we can implement dynamic text wrapping that adapts to
the current terminal size. This creates better formatted output.

text_wrapping.py
  

import os
import textwrap

def print_wrapped(text):
    width = os.get_terminal_size().columns - 4  # Account for margins
    wrapper = textwrap.TextWrapper(width=width)
    print("\n".join(wrapper.wrap(text)))

long_text = ("This is a long paragraph that needs to be wrapped "
            "according to the current terminal width. The text will "
            "automatically adjust to fit within the available space.")

print_wrapped(long_text)

This calculates available width by subtracting margins from terminal width.
The textwrap module then handles the line breaking at word boundaries.

Resizing the terminal and rerunning will produce different wrapping behavior.

## Progress Bar Width Adjustment

Terminal width is crucial for progress bars. This example shows a dynamic
progress bar that fills available width.

progress_bar.py
  

import os
import time

def show_progress(iteration, total):
    width = os.get_terminal_size().columns - 10
    progress = int(width * iteration / total)
    bar = "[" + "#" * progress + " " * (width - progress) + "]"
    print(f"\r{bar} {iteration}/{total}", end="", flush=True)

# Simulate progress
for i in range(1, 101):
    show_progress(i, 100)
    time.sleep(0.05)
print()  # Newline after completion

The progress bar uses nearly full terminal width, reserving space for the
counter. It updates in-place using carriage return.

The bar width automatically adjusts when terminal is resized during execution.

## Table Column Sizing

Terminal width helps create properly sized tables. This example distributes
columns proportionally based on content and available width.

table_columns.py
  

import os

data = [
    ["ID", "Name", "Description", "Value"],
    [1, "Item A", "First sample item", 42.5],
    [2, "Item B", "Second item with longer description", 127.3],
    [3, "Item C", "Short", 8.99]
]

def print_table(rows):
    term_width = os.get_terminal_size().columns
    col_widths = [
        max(len(str(row[i])) for row in rows)
        for i in range(len(rows[0]))
    ]
    
    # Adjust for terminal width
    total_needed = sum(col_widths) + 3 * (len(col_widths) - 1)
    if total_needed &gt; term_width:
        scale = term_width / total_needed
        col_widths = [int(w * scale) for w in col_widths]
    
    # Print rows
    for row in rows:
        print("  ".join(str(cell).ljust(width) 
              for cell, width in zip(row, col_widths))

print_table(data)

This calculates initial column widths based on content, then scales down if
needed to fit terminal width. Each cell is left-justified in its column.

The table maintains readability while adapting to different terminal sizes.

## Vertical Space Management

Terminal height helps manage vertical output. This example paginates long
content based on available lines.

pagination.py
  

import os

def paginate_content(lines):
    height = os.get_terminal_size().lines - 3  # Reserve space for prompts
    current = 0
    
    while current &lt; len(lines):
        print("\n".join(lines[current:current+height]))
        current += height
        if current &lt; len(lines):
            input("-- Press Enter for more --")

# Generate sample content
content = [f"Line {i}: Sample content..." for i in range(1, 101)]
paginate_content(content)

This displays content one page at a time, pausing when the screen fills.
The height reserve accounts for command prompts and pagination controls.

Users can view long output comfortably without scrolling past content.

## Responsive UI Layout

For terminal applications, responsive layouts adapt to terminal dimensions.
This example shows a multi-panel layout that adjusts to size changes.

responsive_ui.py
  

import os

def draw_layout():
    size = os.get_terminal_size()
    width, height = size.columns, size.lines
    
    # Header
    print("=" * width)
    print("RESPONSIVE TERMINAL UI".center(width))
    print("=" * width)
    
    # Calculate panel sizes
    left_width = width // 3
    right_width = width - left_width - 1  # Account for separator
    
    # Content rows (reserve 4 lines for header/footer)
    for i in range(2, height - 2):
        if i == 3:
            left = "MAIN MENU".ljust(left_width)
            right = f"Terminal: {width}x{height}".ljust(right_width)
        elif i == height // 2:
            left = "SELECTION".ljust(left_width)
            right = "CONTENT AREA".center(right_width)
        else:
            left = "".ljust(left_width)
            right = "".ljust(right_width)
        
        print(left + "|" + right)
    
    # Footer
    print("=" * width)
    print(f"q: quit | r: refresh".ljust(width))

while True:
    draw_layout()
    cmd = input("Command: ")
    if cmd.lower() == 'q':
        break

This creates a two-panel layout that recalculates dimensions on each draw.
The header, footer, and content areas adjust to current terminal size.

Pressing 'r' redraws the layout, showing changes after terminal resizing.

## Common Use Cases

- **Text formatting:** Wrapping text to terminal width

- **UI elements:** Creating responsive terminal interfaces

- **Progress indicators:** Dynamic progress bars

- **Data display:** Tables and grid layouts

- **Pagination:** Managing long content output

## Best Practices

- **Provide fallbacks:** Handle non-terminal environments

- **Account for margins:** Reserve space for UI elements

- **Cache sizes:** For performance in tight loops

- **Handle resizing:** Consider SIGWINCH signals

- **Test edge cases:** Very small/large terminals

## Source References

- [Python os.get_terminal_size Documentation](https://docs.python.org/3/library/os.html#os.get_terminal_size)

- [Linux tty_ioctl man page](https://man7.org/linux/man-pages/man4/tty_ioctl.4.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).