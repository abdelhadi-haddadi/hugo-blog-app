+++
title = "Python sqlite3.Blob.write Method"
date = 2025-08-29T20:10:28.748+01:00
draft = false
description = "Complete guide to Python's sqlite3.Blob.write method covering binary data storage and manipulation in SQLite databases."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Blob.write Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Blob.write method,
used for writing binary data to SQLite BLOB columns. We'll cover basic usage,
parameters, practical examples, and best practices.

## Basic Definitions

The sqlite3.Blob.write method writes binary data to an open BLOB
(Binary Large Object) in an SQLite database. It modifies the BLOB content at the
specified offset.

Key characteristics: it requires an open blob handle, writes bytes-like objects,
and operates within transaction boundaries. The method is essential for efficient
binary data manipulation in SQLite.

## Basic BLOB Writing

This example demonstrates creating a table with a BLOB column and writing data
using the write method.

basic_write.py
  

import sqlite3

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, data BLOB)")
    
    # Insert empty BLOB
    conn.execute("INSERT INTO images (data) VALUES (zeroblob(100))")
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    # Open BLOB for writing
    blob = conn.blobopen('images', 'data', rowid)
    with blob:
        # Write binary data at offset 0
        blob.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR')
    
    # Verify
    data = conn.execute("SELECT substr(data, 1, 16) FROM images WHERE id = ?", (rowid,)).fetchone()[0]
    print(f"First 16 bytes: {data}")

This example creates a table, inserts an empty BLOB of 100 bytes, then writes a
PNG header to it. The blobopen method returns a Blob object.

The write method writes bytes at the current position (offset 0 by
default). Always use Blob objects in with statements for proper
resource management.

## Writing at Specific Offset

The write method can write data at any offset within the BLOB.
This example shows writing at a non-zero offset.

offset_write.py
  

import sqlite3

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY, content BLOB)")
    conn.execute("INSERT INTO documents (content) VALUES (zeroblob(500))")
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    blob = conn.blobopen('documents', 'content', rowid)
    with blob:
        # Move to offset 100
        blob.seek(100)
        # Write data at offset 100
        blob.write(b'CHAPTER 1: Introduction')
        
    # Verify
    excerpt = conn.execute("SELECT substr(content, 100, 22) FROM documents WHERE id = ?", (rowid,)).fetchone()[0]
    print(f"Excerpt: {excerpt}")

This example writes text data starting at offset 100 in a 500-byte BLOB. The
seek method positions the write cursor before writing.

Writing at specific offsets is useful for updating parts of large binary objects
without rewriting the entire content.

## Appending to a BLOB

This example demonstrates how to append data to an existing BLOB by writing at
the end position.

append_write.py
  

import sqlite3

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, entries BLOB)")
    conn.execute("INSERT INTO logs (entries) VALUES (?)", (b'LOG START',))
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    blob = conn.blobopen('logs', 'entries', rowid)
    with blob:
        # Move to end
        blob.seek(0, 2)  # 2 means seek relative to end
        # Append data
        blob.write(b'\nNew log entry at ' + str(int(time.time())).encode())
    
    # Verify
    full_log = conn.execute("SELECT entries FROM logs WHERE id = ?", (rowid,)).fetchone()[0]
    print(f"Full log:\n{full_log.decode()}")

The example appends a timestamped log entry to an existing BLOB. The seek
with mode 2 positions at the end of the BLOB before writing.

Appending is efficient for log files or other sequentially growing binary data
stored in the database.

## Overwriting Partial Content

This example shows how to overwrite part of a BLOB while preserving the
surrounding data.

partial_overwrite.py
  

import sqlite3

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY, settings BLOB)")
    initial_data = b'DEFAULT_CONFIG____VERSION_1.0____'
    conn.execute("INSERT INTO config (settings) VALUES (?)", (initial_data,))
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    blob = conn.blobopen('config', 'settings', rowid)
    with blob:
        # Overwrite version part
        blob.seek(20)
        blob.write(b'2.0')
    
    # Verify
    updated = conn.execute("SELECT settings FROM config WHERE id = ?", (rowid,)).fetchone()[0]
    print(f"Updated config: {updated.decode()}")

The example overwrites just the version number in a configuration BLOB while
keeping the rest of the data intact. The seek positions at the
version number location.

Partial overwrites are efficient for updating specific fields in structured binary
data without rewriting everything.

## Writing Large Binary Data

This example demonstrates writing large binary data in chunks to handle memory
constraints.

chunked_write.py
  

import sqlite3
import os

def generate_large_data(size):
    """Generate dummy binary data of specified size"""
    return os.urandom(size)

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS large_files (id INTEGER PRIMARY KEY, content BLOB)")
    file_size = 5 * 1024 * 1024  # 5MB
    conn.execute("INSERT INTO large_files (content) VALUES (zeroblob(?))", (file_size,))
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    blob = conn.blobopen('large_files', 'content', rowid)
    with blob:
        chunk_size = 1024 * 1024  # 1MB chunks
        for offset in range(0, file_size, chunk_size):
            chunk = generate_large_data(min(chunk_size, file_size - offset))
            blob.seek(offset)
            blob.write(chunk)
    
    # Verify size
    actual_size = conn.execute("SELECT length(content) FROM large_files WHERE id = ?", (rowid,)).fetchone()[0]
    print(f"Written {actual_size} bytes")

The example writes 5MB of data in 1MB chunks to demonstrate handling large BLOBs.
The zeroblob pre-allocates space for efficient writing.

Chunked writing is essential for handling large files while maintaining
reasonable memory usage in the application.

## Error Handling in BLOB Writes

This example shows proper error handling when writing to BLOBs, including
transaction management.

error_handling.py
  

import sqlite3

def write_with_retry(conn, table, column, rowid, data, max_attempts=3):
    for attempt in range(max_attempts):
        try:
            blob = conn.blobopen(table, column, rowid)
            with blob:
                blob.write(data)
            return True
        except sqlite3.OperationalError as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt == max_attempts - 1:
                conn.rollback()
                return False
            continue
    return False

with sqlite3.connect('blobs.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS critical (id INTEGER PRIMARY KEY, payload BLOB)")
    conn.execute("INSERT INTO critical (payload) VALUES (zeroblob(100))")
    rowid = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    
    success = write_with_retry(conn, 'critical', 'payload', rowid, b'IMPORTANT_DATA')
    if success:
        conn.commit()
        print("Write successful")
    else:
        print("All write attempts failed")

The example implements a retry mechanism for BLOB writes that might fail due to
database locks or other transient issues. Each attempt is wrapped in proper error
handling.

Robust error handling is crucial for production applications dealing with critical
binary data storage.

## Best Practices

- **Use context managers:** Always open Blobs in with statements

- **Pre-allocate space:** Use zeroblob for large BLOBs

- **Handle errors:** Implement retry logic for concurrent access

- **Chunk large writes:** Process big BLOBs in manageable pieces

- **Validate offsets:** Ensure writes stay within BLOB bounds

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite BLOB I/O Reference](https://www.sqlite.org/c3ref/blob_open.html)

- [SQLite zeroblob Function](https://www.sqlite.org/lang_expr.html#the_zeroblob_function)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).