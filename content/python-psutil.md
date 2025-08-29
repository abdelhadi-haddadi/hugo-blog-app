+++
title = "Python psutil"
date = 2025-08-29T20:09:58.243+01:00
draft = false
description = "Python psutil tutorial shows how to use retrieve information on processes and system utilization."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python psutil

last modified September 16, 2024

In this article we show how to retrieve information on processes and system
utilization.

The psutil is a Python module that provides a simple interface to retrieve
information about running processes, system users, networks, disks, and much
more. It's a powerful tool for system monitoring and administration tasks.

The psutil.Process().info() method is used to retrieve detailed
information about a specific process. It returns a dictionary containing various
attributes of the process, such as:

    - pid - Process ID

    - ppid - Parent process ID

    - name - Process name

    - exe - Executable path

    - cmdline - Command line arguments used to start the process

    - status - Process status (e.g., 'running', 'sleeping', 'zombie')

    - create_time - Process creation time

    - user - User name associated with the process

    - nice - Process nice level

    - io_counters - I/O counters (read/write bytes, system calls)

    - cpu_times - CPU times (user, system, idle, etc.)

    - memory_info - Memory usage information (RSS, VMS, etc.)

  

In the examples, we use the argparse module to parse command line 
arguments.

## List memory usage

The example lists processes with memory usage above the given value in MB. 

main.py
  

import psutil
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('memory', help='memory value in MB')

args = parser.parse_args()

mem_limit = int(args.memory) * 1024 * 1024

p_it = psutil.process_iter(['name', 'memory_info'])

large_mem_ps = [{'pid': p.pid, 'name': p.info['name'], 'mem': p.info['memory_info'].rss}
                for p in p_it if p.info['memory_info'].rss &gt; mem_limit]

for p in large_mem_ps:

    print(f'{p['pid']} {p['name']} {(p['mem'] / (1024 * 1024)):.2f}')

The program accepts one positional argument: the memory value in MB. 

p_it = psutil.process_iter(['name', 'memory_info'])

The process_iter function returns a generator yielding a Process
instance for all running processes. We pick the name of the process and
memory_info attributes from the generated data.

large_mem_ps = [{'pid': p.pid, 'name': p.info['name'], 'mem': p.info['memory_info'].rss}
    for p in p_it if p.info['memory_info'].rss &gt; mem_limit]

We select all processes that use memory about our limit.

for p in large_mem_ps:

    print(f'{p['pid']} {p['name']} {(p['mem'] / (1024 * 1024)):.2f}')

We go through the list and print the data.

## CPU usage

The cpu_times attribute provides information about the CPU time
consumed by a process. 

main.py
  

import psutil

processes = [
    {'pid': p.pid, 'name': p.info['name'],
        'sum_cpu_t': sum(p.info['cpu_times'])}
    for p in psutil.process_iter(['name', 'cpu_times'])
]

sorted_ps = sorted(processes, key=lambda p: p['sum_cpu_t'])

# print the last five
for e in sorted_ps[-5:]:
    print(f'pid: {e['pid']} name: {e['name']} cpu time: {e['sum_cpu_t']}')

The program lists top five processes by their CPU usage.

processes = [
    {'pid': p.pid, 'name': p.info['name'],
        'sum_cpu_t': sum(p.info['cpu_times'])}
    for p in psutil.process_iter(['name', 'cpu_times'])
]

We get a list of processes, including their process ids, names, and CPU usage.

sorted_ps = sorted(processes, key=lambda p: p['sum_cpu_t'])

We sort the processes by the sum of their CPU times (user + system).

# print the last five
for e in sorted_ps[-5:]:
    print(f'pid: {e['pid']} name: {e['name']} cpu time: {e['sum_cpu_t']}')

Since the list is sorted in asceding order, we print the last five of them.

## Check log files of processes

The open_files attribute returns a list of file descriptors
associated with the process. Each file descriptor is represented as a tuple
containing the following information:

    - path - The path of the file or device

    - fd - The file descriptor number

    - position - The current position within the file

    - flags - Flags indicating the file access mode (read, write, etc.)

main.py
  

import psutil

for p in psutil.process_iter(['name', 'open_files']):

    for file in p.info['open_files'] or []:

        if file.path.endswith('.log'):
            print(f"{p.pid:&lt;5} {p.info['name']:&lt;20} {file.path}")

The program lists all processes that have opened log files.

## List processes

The following script list processes. We use a third-party rich library to 
display the output in a table on console. 

main.py
  

import psutil
import argparse
from datetime import datetime
from rich import box
from rich.console import Console
from rich.table import Table
from datetime import date

def parse_arguments():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-a', '--all', action='store_true',
                        help='show all processes')
    group.add_argument('-n', '--name', help='show info about process name')
    args = parser.parse_args()
    return args.all, args.name

def list_process(name):
    now = f'{date.today()}'
    table = Table(title=f'Process', box=box.MINIMAL,
                    caption=now, caption_justify='left')
    table.add_column('id', style='cyan')
    table.add_column('process name', style='grey69')
    table.add_column('username')
    table.add_column('create time', style='blue')
    table.add_column('memory', style='green')

    process_count = 0

    for p in psutil.process_iter():

        if name in p.name().lower():
            ctime = datetime.fromtimestamp(p.create_time())
            memory_percent = p.memory_percent()
            table.add_row(f'{p.pid}', p.name(), p.username(),
                            ctime.isoformat(), f'{memory_percent:.2f}')
            process_count += 1

    if process_count &gt; 0:

        console = Console()
        console.print(table, justify='center')
    else:

        print('no such process found')

def list_all_processes():

    now = f'{date.today()}'
    table = Table(title='Processes', box=box.MINIMAL,
                    caption=now, caption_justify='left')
    table.add_column('id', style='cyan')
    table.add_column('process name', style='grey69')

    pnames = []
    for p in psutil.process_iter():
        
        pnames.append(p.name())
        table.add_row(f'[bold]{p.pid}', f'[bold]{p.name()}')

    console = Console()
    console.print(table, justify='center')

    print(len(pnames), 'processes')
    print(len(set(pnames)), 'apps')

all_f, name = parse_arguments()

if all_f:
    list_all_processes()
elif name:
    list_process(name)    

The script takes two options: the -a/-all lists all processes while
the -n/--name shows informatio about a specific process. These
options are mutually exclusive. 

## Source

[The psutil documentation](https://psutil.readthedocs.io/en/latest/)

In this article we have used predicates in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).