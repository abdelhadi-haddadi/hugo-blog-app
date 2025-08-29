+++
title = "Linux df Command"
date = 2025-08-29T20:03:26.161+01:00
draft = false
description = "Linux tutorial on the df command, covering basic and advanced disk space usage monitoring with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux df Command

last modified February 25, 2025

The df command in Linux is used to display disk space usage for
file systems. It provides information about the total, used, and available
space on mounted file systems. This tutorial covers basic and advanced usage of
df with practical examples.

df is commonly used for monitoring disk space, identifying full
file systems, and managing storage resources.

## Basic Usage

This checks disk usage across all mounts.

basic_usage.sh
  

df

The df command lists all mounted file systems in a table with
columns: Filesystem, 1K-blocks, Used, Available, Use%, and Mounted on. Output
is in 1KB blocks by default, showing raw numbers. For example, it might list
/dev/sda1 with its usage stats. Use mount to see all
mounts beforehand. If a file system is full, Use% nears 100%.

## Display in Human-Readable Format

This shows disk usage in easy units.

human_readable.sh
  

df -h

The -h (human-readable) option converts sizes to units like MB, GB,
or TB, making it easier to interpret than raw blocks. For instance,
1.2G is clearer than 1234567 blocks. It’s the go-to
option for quick checks. Combine with watch df -h to refresh every
2 seconds. Sizes adjust dynamically based on magnitude.

## Display Specific File System

This checks usage for the root partition.

specific_filesystem.sh
  

df /dev/sda1

The df command targets /dev/sda1, showing only its
usage stats. You can use a device (e.g., /dev/sdb2) or mount point
(e.g., /). Useful for focusing on a specific disk. Run
lsblk or df -h to find device names. If unmounted, it
shows nothing unless specified via a file system path.

## Display Inode Usage

This monitors inode availability.

inode_usage.sh
  

df -i

The -i (inodes) option lists total, used, and free inodes per file
system instead of space. Inodes track file metadata; running out prevents new
files, even with free space. For example, /dev/sda1 might show
"IUsed: 5000, IFree: 10000". Critical for directories with many small files.
Check with ls -li to see inode numbers in a directory.

## Exclude Specific File System Types

This filters out temporary file systems.

exclude_filesystems.sh
  

df -x tmpfs -x devtmpfs

The -x option excludes tmpfs (RAM-based) and
devtmpfs (device files) from the output, focusing on physical
storage. Multiple -x flags stack. Run df -T first to
identify types (e.g., ext4). Useful for ignoring virtual mounts
like /dev or /run. Output still shows blocks unless
-h is added.

## Display File System Type

This identifies file system formats.

filesystem_type.sh
  

df -T

The -T (type) option adds a "Type" column, e.g.,
ext4, ntfs, or btrfs, to the output.
Helps distinguish between local disks and network mounts (e.g.,
nfs). Combine with -h (df -hT) for
readability. Use lsblk -f for a similar view with device details.
Essential for troubleshooting file system-specific issues.

## Advanced: Display Total Disk Space

This sums up usage across all mounts.

total_disk_space.sh
  

df -h --total

The --total option appends a "total" row summing Used, Available,
and Use% across all listed file systems. With -h, it’s in readable
units (e.g., "Total: 500G used, 1T available"). Ignores excluded types if
-x is used. Perfect for an overall storage snapshot. Compare with
du -sh / for directory-specific totals, noting root access might
be needed.

## Example: Filter by Mount Point

This checks space on a specific mount.

mount_point.sh
  

df -h /home

The df -h /home command shows usage for the file system mounted at
/home, like /dev/sdb1 if partitioned separately.
Unlike /dev/sda1, it uses the mount point, not device name. Handy
for user directories or external drives. Run mount | grep /home to
confirm the mount. Output is human-readable, showing GB or TB as needed.

## Example: Sort Output by Usage

This ranks file systems by usage percentage.

sort_usage.sh
  

df -h | sort -k5 -r

This pipes df -h output to sort, ordering by the 5th
column (Use%, e.g., "95%") in reverse (-r)—highest first. Identifies
fullest file systems quickly. The header might sort incorrectly; use
df -h | tail -n +2 | sort -k5 -r to skip it. Add head
to limit results. Useful for spotting space hogs on busy servers.

## Example: Check Space with Threshold

This flags nearly full file systems.

threshold_check.sh
  

df -h | awk '$5+0 &gt;= 90 {print $0}'

This uses awk to filter df -h output, printing lines
where Use% (column 5) is 90% or higher. The +0 strips the "%" for
numeric comparison. For example, /dev/sda1  100G  95G  5G  95% /
would appear. Adjust the threshold (e.g., 80) as needed. Pipe to
mail -s "Disk Full" admin@example.com for alerts. Monitors critical
storage levels.

## Best Practices for df

- **Use -h for Readability:** Always use -h for human-readable output.

- **Monitor Inodes:** Use -i to monitor inode usage, especially on systems with many small files.

- **Exclude Unnecessary File Systems:** Use -x to exclude temporary or virtual file systems.

- **Check Specific File Systems:** Use df with a specific file system path for targeted monitoring.

## Source

[GNU df Manual](https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html)

In this article, we have explored various examples of using the df
command for monitoring disk space usage, including human-readable output, inode
usage, and excluding specific file systems.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).