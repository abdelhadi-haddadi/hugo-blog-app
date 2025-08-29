+++
title = "Progress Tracking in Python"
date = 2025-08-29T20:11:05.854+01:00
draft = false
description = "Complete guide to progress tracking in Python covering multiple methods including tqdm, manual progress bars, and GUI integration."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Progress Tracking in Python

last modified April 1, 2025

Tracking progress is essential for long-running operations in Python. This
tutorial covers various methods to implement progress tracking, from simple
console indicators to advanced GUI progress bars.

We'll explore multiple approaches including the popular tqdm library, manual
progress bars, callback-based tracking, and integration with different Python
frameworks. Each method has its strengths for different use cases.

## Basic Console Progress

Simple progress tracking can be implemented with print statements.

basic_progress.py
  

import time

total = 100
for i in range(total):
    # Process item here
    time.sleep(0.1)  # Simulate work
    
    # Update progress
    progress = (i + 1) / total * 100
    print(f"\rProgress: {progress:.1f}%", end="")

print("\nDone!")

This example shows the simplest way to track progress in console applications.
The \r carriage return moves the cursor to the start of the line, allowing
progress updates on the same line. The end="" parameter prevents newlines.

While basic, this method works everywhere and requires no dependencies. It's
ideal for simple scripts where you just need to show completion percentage.
The sleep call simulates processing time for demonstration purposes.

## Using tqdm for Progress Bars

The tqdm library provides advanced progress bars with minimal code.

tqdm_progress.py
  

from tqdm import tqdm
import time

# Basic progress bar
for i in tqdm(range(100)):
    time.sleep(0.02)  # Simulate work

# With description and unit
items = ["apple", "banana", "cherry", "date"]
for item in tqdm(items, desc="Processing", unit="item"):
    time.sleep(0.5)

tqdm automatically displays a progress bar with estimated time remaining,
iterations per second, and more. The desc parameter adds a description, while
unit specifies what's being processed.

The library handles all formatting and updates automatically. It works in
Jupyter notebooks and regular consoles. tqdm is the go-to solution for most
progress tracking needs in Python.

## Manual Progress Bar

For custom requirements, you can build your own progress bar.

manual_bar.py
  

import sys
import time

def draw_progress(progress, width=50):
    filled = int(width * progress)
    bar = "[" + "=" * filled + " " * (width - filled) + "]"
    sys.stdout.write(f"\r{bar} {progress*100:.1f}%")
    sys.stdout.flush()

total = 200
for i in range(total):
    time.sleep(0.02)
    draw_progress((i + 1) / total)
    
print("\nComplete!")

This implementation gives full control over the progress bar appearance. The
draw_progress function creates a bar of specified width, filled proportionally
to the current progress.

Using sys.stdout.write with flush ensures smooth updates. This approach is
useful when you need custom formatting or when external libraries aren't
available.

## Progress Tracking for File Operations

Track progress during file operations using callbacks.

file_progress.py
  

import shutil
import os

def copy_with_progress(src, dst):
    total = os.path.getsize(src)
    copied = 0
    
    def callback(chunk):
        nonlocal copied
        copied += len(chunk)
        progress = copied / total * 100
        print(f"\rCopying: {progress:.1f}%", end="")
    
    shutil.copyfileobj(
        open(src, "rb"),
        open(dst, "wb"),
        callback=callback
    )
    print("\nDone!")

copy_with_progress("large_file.dat", "copy.dat")

This example demonstrates progress tracking during file copy operations. The
callback function receives chunks of data being copied and updates the progress
display accordingly.

The method works with any file-like object, making it versatile for network
transfers or custom data processing pipelines. The nonlocal keyword allows
modifying the copied counter from the nested function.

## Threaded Progress Updates

For background tasks, use threads to update progress separately.

threaded_progress.py
  

import threading
import time
import random

class ProgressTracker:
    def __init__(self, total):
        self.progress = 0
        self.total = total
        self.running = True
        
    def update(self):
        while self.running and self.progress &lt; self.total:
            self.progress += random.randint(1, 5)
            time.sleep(0.1)
    
    def display(self):
        while self.running and self.progress &lt; self.total:
            pct = self.progress / self.total * 100
            print(f"\rProgress: {pct:.1f}%", end="")
            time.sleep(0.05)
        print("\nDone!")

tracker = ProgressTracker(100)
worker = threading.Thread(target=tracker.update)
display = threading.Thread(target=tracker.display)

worker.start()
display.start()
worker.join()
tracker.running = False
display.join()

This pattern separates the work and progress display into different threads. The
ProgressTracker class coordinates between them with a shared progress variable.

The running flag ensures clean shutdown. This approach is ideal for GUI
applications or when the work being done can't easily report progress itself.

## Progress Tracking in Jupyter

Jupyter notebooks support rich progress displays.

jupyter_progress.ipynb
  

from IPython.display import display
import ipywidgets as widgets
import time

progress = widgets.FloatProgress(
    value=0, min=0, max=100, description = "Loading:"
)
display(progress)

for i in range(100):
    time.sleep(0.05)
    progress.value = i + 1

IPython provides special widgets for interactive progress tracking. The
FloatProgress widget creates a visual bar that updates in real-time.

This method creates professional-looking progress indicators in notebooks. The
widgets integrate seamlessly with Jupyter's display system and support
additional features like styling and multiple progress bars.

## Progress Tracking with Multiprocessing

Track progress across multiple processes using shared memory.

multiprocessing_progress.py
  

import multiprocessing
import time

def worker(shared_progress, total_work):
    for i in range(total_work):
        time.sleep(0.1)
        with shared_progress.get_lock():
            shared_progress.value += 1

def display_progress(shared_progress, total):
    while True:
        with shared_progress.get_lock():
            current = shared_progress.value
        progress = current / total * 100
        print(f"\rProgress: {progress:.1f}%", end="")
        if current &gt;= total:
            break
        time.sleep(0.1)

if __name__ == "__main__":
    total_tasks = 100
    progress = multiprocessing.Value("i", 0)
    
    processes = []
    for _ in range(4):
        p = multiprocessing.Process(
            target=worker,
            args=(progress, total_tasks//4)
        )
        processes.append(p)
        p.start()
    
    display_progress(progress, total_tasks)
    
    for p in processes:
        p.join()
    print("\nAll tasks completed!")

This example demonstrates progress tracking across multiple worker processes. A
shared Value coordinates progress updates between processes.

The get_lock() context manager ensures thread-safe updates. This pattern is
essential for CPU-bound tasks distributed across multiple cores while still
providing progress feedback.

## GUI Progress Bars with Tkinter

Create graphical progress bars for desktop applications.

tkinter_progress.py
  

import tkinter as tk
from tkinter import ttk
import threading
import time

class ProgressApp:
    def __init__(self, root):

        self.root = root
        self.progress = ttk.Progressbar(
            root, orient="horizontal",
            length=300, mode="determinate"
        )

        self.progress.pack(pady=20)
        
        self.button = tk.Button(
            root, text="Start Task",
            command=self.start_task
        )

        self.button.pack()
    
    def start_task(self):

        self.button.config(state="disabled")
        thread = threading.Thread(target=self.run_task)
        thread.start()
        self.monitor(thread)
    
    def run_task(self):

        for i in range(100):
            time.sleep(0.05)
            self.progress["value"] = i + 1
    
    def monitor(self, thread):
    
        if thread.is_alive():
            self.root.after(100, lambda: self.monitor(thread))
        else:
            self.button.config(state="normal")

root = tk.Tk()
app = ProgressApp(root)
root.mainloop()

This Tkinter application shows a professional progress bar that updates during a
background task. The threading prevents GUI freezing during long operations.

The monitor method periodically checks the thread status. This pattern ensures
responsive UIs while providing visual feedback for operations that take time to
complete.

## Web Progress Tracking with Flask

Implement progress tracking in web applications.

flask_progress.py
  

from flask import Flask, jsonify, render_template_string
import time
import threading

app = Flask(__name__)

progress_data = {"value": 0, "total": 100}

def long_running_task():
    for i in range(progress_data["total"]):
        time.sleep(0.1)
        progress_data["value"] = i + 1

@app.route("/")
def index():
    return render_template_string("""
        &lt;h1&gt;Progress Demo&lt;/h1&gt;
        &lt;div id="progress"&gt;0%&lt;/div&gt;
        &lt;button onclick="startTask()"&gt;Start&lt;/button&gt;
        &lt;script&gt;
        function startTask() {
            fetch("/start").then(() =&gt; pollProgress());
        }
        function pollProgress() {
            fetch("/progress").then(r =&gt; r.json())
                .then(data =&gt; {
                    document.getElementById("progress").innerHTML = 
                        data.value + "%";
                    if (data.value &lt; 100) {
                        setTimeout(pollProgress, 500);
                    }
                });
        }
        &lt;/script&gt;
    """)

@app.route("/start")
def start():
    thread = threading.Thread(target=long_running_task)
    thread.start()
    return "Started"

@app.route("/progress")
def progress():
    return jsonify({
        "value": progress_data["value"],
        "total": progress_data["total"]
    })

if __name__ == "__main__":
    app.run(threaded=True)

This Flask application demonstrates web-based progress tracking. The frontend
polls the backend for progress updates while the task runs in a background
thread.

The template_string shows a minimal HTML interface. In production, you'd
separate templates and add error handling. The threaded=True option allows
Flask to handle concurrent requests.

## Best Practices

**Choose the right method:** Use tqdm for CLI, widgets for Jupyter

**Update frequency:** Don't update too often (100ms minimum)

**Thread safety:** Protect shared progress variables with locks

**Error handling:** Ensure progress stops on errors

**User experience:** Provide clear labels and completion messages

## Source References

[tqdm GitHub Repository](https://github.com/tqdm/tqdm)

[IPython Widgets Documentation](https://ipywidgets.readthedocs.io/)

[Python Threading Docs](https://docs.python.org/3/library/threading.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).