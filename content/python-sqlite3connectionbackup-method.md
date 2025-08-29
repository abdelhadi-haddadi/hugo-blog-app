+++
title = "Python sqlite3.Connection.backup Method"
date = 2025-08-29T20:10:29.861+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.backup method covering database backups, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.backup Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.backup
method for creating SQLite database backups. We'll cover basic usage, parameters,
progress tracking, and practical examples.

## Basic Definitions

The backup method creates a backup copy of an SQLite database. It
performs an online backup, meaning the source database can be in use during the
process.

Key characteristics: it works while the database is in use, supports progress
callbacks, and can backup to memory or disk. The method is atomic and consistent.

## Basic Database Backup

Here's the simplest usage of backup to create a copy of a database.

basic_backup.py
  

import sqlite3

# Connect to source and destination databases
with sqlite3.connect('source.db') as src_conn:
    with sqlite3.connect('backup.db') as dest_conn:
        
        # Perform the backup
        src_conn.backup(dest_conn)
        
        print("Backup completed successfully")

This example creates a complete copy of 'source.db' to 'backup.db'. Both
connections are managed with context managers for automatic cleanup.

The backup is performed in a single transaction, ensuring consistency even if
the source database is being modified during the backup.

## Backup with Progress Callback

The backup method supports a progress callback to monitor the backup process.

progress_callback.py
  

import sqlite3

def progress(status, remaining, total):
    print(f'Copied {total-remaining} of {total} pages...')

with sqlite3.connect('large_db.db') as src_conn:
    with sqlite3.connect('backup_large.db') as dest_conn:
        
        # Backup with progress callback
        src_conn.backup(dest_conn, pages=5, progress=progress)
        
        print("Backup completed with progress tracking")

The callback receives three parameters: status (unused), remaining pages, and
total pages. The 'pages' parameter controls how many pages are copied between
callbacks.

This is useful for large databases where you want to provide user feedback or
implement cancellation logic.

## Partial Database Backup

You can backup specific tables or schemas by using the 'name' parameter.

partial_backup.py
  

import sqlite3

with sqlite3.connect('production.db') as src_conn:
    with sqlite3.connect('backup_customers.db') as dest_conn:
        
        # Backup only the 'customers' table
        src_conn.backup(dest_conn, name='main', 
                       pages=1, name_dest='main')
        
        # Verify the backup
        cursor = dest_conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        print("Tables in backup:", cursor.fetchall())

This example backs up only the main database schema. You can specify different
source and destination schema names if needed.

Partial backups are useful when you only need to preserve specific data or when
working with attached databases.

## Backup to Memory Database

The backup method can copy data to an in-memory database for temporary processing.

memory_backup.py
  

import sqlite3

with sqlite3.connect('important.db') as src_conn:
    with sqlite3.connect(':memory:') as mem_conn:
        
        # Backup to memory database
        src_conn.backup(mem_conn)
        
        # Work with the in-memory copy
        cursor = mem_conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM sensitive_data")
        count = cursor.fetchone()[0]
        print(f"Backup contains {count} records")

This creates a temporary in-memory copy of the database. The memory database
disappears when the connection closes.

Memory backups are useful for sensitive data processing or when you need fast,
temporary access to database contents.

## Backup with Custom Page Size

Control the backup granularity by specifying how many pages to copy at a time.

page_size.py
  

import sqlite3

def progress(status, remaining, total):
    if remaining % 100 == 0:
        print(f'{remaining} pages remaining')

with sqlite3.connect('big_data.db') as src_conn:
    with sqlite3.connect('incremental_backup.db') as dest_conn:
        
        # Backup 100 pages at a time
        src_conn.backup(dest_conn, pages=100, progress=progress)
        
        print("Incremental backup completed")

Smaller page sizes allow more frequent progress updates but may reduce performance.
Larger page sizes are faster but provide less frequent updates.

Choose a page size that balances performance with your need for progress feedback.

## Backup with Error Handling

Implement proper error handling to manage backup failures gracefully.

error_handling.py
  

import sqlite3
import os

try:
    # Remove old backup if exists
    if os.path.exists('backup_fail.db'):
        os.remove('backup_fail.db')
    
    with sqlite3.connect('source.db') as src_conn:
        with sqlite3.connect('backup_fail.db') as dest_conn:
            
            try:
                src_conn.backup(dest_conn)
                print("Backup succeeded")
            except sqlite3.Error as e:
                print("Backup failed:", e)
                if os.path.exists('backup_fail.db'):
                    os.remove('backup_fail.db')
                
except Exception as e:
    print("General error:", e)

This example shows comprehensive error handling, including cleanup of partial
backups if the operation fails.

Always implement error handling for production backups to avoid leaving systems
in inconsistent states.

## Backup with Attached Databases

The backup method can handle databases with attached schemas.

attached_backup.py
  

import sqlite3

with sqlite3.connect('main.db') as conn:
    # Attach another database
    conn.execute("ATTACH DATABASE 'auxiliary.db' AS aux")
    
    with sqlite3.connect('full_backup.db') as backup_conn:
        # Backup both main and attached database
        conn.backup(backup_conn, name='main')
        conn.backup(backup_conn, name='aux')
        
        print("Backup of main and attached databases completed")

This example shows how to backup both a main database and an attached database.
Each schema requires a separate backup call.

When working with attached databases, remember to backup all schemas you need to
preserve.

## Best Practices

- **Verify backups:** Always check backup integrity after creation

- **Use progress callbacks:** For large databases or UI feedback

- **Handle errors:** Clean up failed backups properly

- **Consider timing:** Schedule backups during low-usage periods

- **Test restore process:** Regularly verify backups can be restored

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Online Backup API](https://www.sqlite.org/backup.html)

- [SQLite Transactions](https://www.sqlite.org/lang_transaction.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).