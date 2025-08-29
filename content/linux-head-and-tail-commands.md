+++
title = "Linux head and tail Commands"
date = 2025-08-29T20:03:28.414+01:00
draft = false
description = "Linux tutorial on the head and tail commands, covering basic and advanced file viewing with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux head and tail Commands

last modified February 25, 2025

The head and tail commands in Linux are used to view
the beginning and end of files, respectively. They are essential tools for
quickly inspecting file contents without opening the entire file. This tutorial
covers basic and advanced usage of head and tail with
practical examples.

head and tail are commonly used for log file analysis,
debugging, and monitoring file changes in real-time.

## View the Beginning of a File

This shows the top of a system log file.

head_basic.sh
  

head /var/log/syslog

The head command outputs the first 10 lines of
/var/log/syslog by default. This is useful for checking initial
log entries, like system startup messages. If the file has fewer than 10 lines,
it shows all contents. Use wc -l /var/log/syslog to check total
lines. No options mean it’s quick and simple for a first glance.

## View a Specific Number of Lines

This displays the first few lines of a CSV file.

head_lines.sh
  

head -n 5 data.csv

The -n 5 option limits head to the first 5 lines of
data.csv. Perfect for inspecting headers or sample data in large
files without loading everything. You can use any number (e.g., -n
3). Older syntax like head -5 works too. If the file is
shorter, it shows what’s available. Check with ls -lh for file size.

## View the End of a File

This checks recent entries in an error log.

tail_basic.sh
  

tail /var/log/error.log

The tail command shows the last 10 lines of
/var/log/error.log by default. Ideal for spotting recent issues,
like application crashes. If the file is small, it displays all lines. Unlike
head, it starts from the end, making it efficient for large files.
Use ls -l to confirm the file exists and has content.

## View a Specific Number of Lines from the End

This views the last few transactions in a log.

tail_lines.sh
  

tail -n 5 transactions.log

The -n 5 option tells tail to output the last 5 lines
of transactions.log. Great for reviewing recent activity without
scrolling through a full file. Adjust the number as needed (e.g., -n
20). Older style tail -5 is equivalent. If fewer lines
exist, it shows all. Pair with wc -l to count total lines first.

## Monitor File Changes in Real-Time

This watches a web server log as it updates.

tail_follow.sh
  

tail -f /var/log/apache2/access.log

The -f (follow) option keeps tail running, showing
new lines added to /var/log/apache2/access.log. Essential for
live monitoring, like tracking website hits. Press Ctrl+C to stop.
If the file isn’t updating, nothing new appears. Use -n 20 -f to
start with the last 20 lines. Check permissions with ls -l if
empty.

## View Multiple Files

This compares starts or ends of two logs.

multiple_files.sh
  

head auth.log app.log
tail auth.log app.log

The head command shows the first 10 lines of
auth.log then app.log, with headers like
==&gt; auth.log &lt;==. tail does the same for the last 10
lines. Useful for side-by-side checks. Add -n 5 to adjust lines.
If a file is missing, it skips with a warning. Use ls to verify
files exist beforehand.

## Advanced: Combine head and tail

This extracts a middle section of a report.

combine_head_tail.sh
  

head -n 50 report.txt | tail -n 10

This pipes the first 50 lines of report.txt from
head to tail, which then outputs the last 10 of
those—lines 41-50. Handy for targeting specific ranges in large files. Adjust
numbers (e.g., head -n 100 | tail -n 20) for different sections.
If the file has fewer lines than the head limit, tail
adjusts. Test with wc -l for file length.

## Example: View Bytes Instead of Lines

This shows the first or last bytes of a file.

bytes_view.sh
  

head -c 100 binary.dat
tail -c 50 binary.dat

The -c 100 option makes head show the first 100 bytes
of binary.dat, while tail -c 50 shows the last 50.
Useful for binary files or precise data chunks (e.g., headers). Units like
-c 1k (1KB) work too. Output may include non-printable characters;
pipe to od or hexdump for readability. Check size with
ls -lh.

## Example: Skip Lines from the Start

This skips the header of a CSV file.

skip_lines.sh
  

tail -n +2 data.csv

The -n +2 option tells tail to start from line 2 of
data.csv, skipping the first line (e.g., a header). Use
+N to begin at line N. Perfect for data processing where headers
aren’t needed. If the file has fewer lines, it shows from the start. Combine
with head (e.g., tail -n +2 | head -n 5) for a range.
Verify with cat -n.

## Example: Filter with Other Commands

This finds errors in recent log entries.

filter_combo.sh
  

tail -n 50 error.log | grep "ERROR"

This takes the last 50 lines of error.log with tail
and pipes them to grep to show only lines with "ERROR". Ideal for
debugging recent issues. Adjust -n for scope; add -f
to tail for real-time filtering. Case-insensitive search? Use
grep -i. Check log size with wc -l error.log to set a
sensible range.

## Best Practices for head and tail

- **Use for Quick Inspections:** Use head and tail for quick file inspections without opening the entire file.

- **Monitor Logs:** Use tail -f to monitor log files in real-time.

- **Combine with Other Commands:** Use head and tail with commands like grep for advanced filtering.

- **Check File Sizes:** Use head and tail to verify file contents before processing large files.

## Source

[GNU head Manual](https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html)

[GNU tail Manual](https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html)

In this article, we have explored various examples of using the head
and tail commands for viewing file contents, including real-time
monitoring and combining both commands for advanced file inspection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).