+++
title = "Python os.mkfifo Function"
date = 2025-08-29T20:09:25.272+01:00
draft = false
description = "Complete guide to Python's os.mkfifo function covering named pipe creation, interprocess communication, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.mkfifo Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.mkfifo function,
which creates named pipes (FIFOs) for interprocess communication. We'll cover
FIFO creation, permissions, and practical IPC examples.

## Basic Definitions

The os.mkfifo function creates a named pipe (FIFO) in the
filesystem. FIFOs allow unrelated processes to communicate with each other.

Key parameters: path (FIFO location), mode (permission bits, default 0o666).
On Unix-like systems, FIFOs appear as special files but don't store data.

## Creating a Basic FIFO

The simplest use of os.mkfifo creates a named pipe with default
permissions. This example demonstrates basic FIFO creation and cleanup.

basic_fifo.py
  

import os
import sys

fifo_path = "/tmp/my_fifo"

try:
    # Create FIFO with default permissions (0o666)
    os.mkfifo(fifo_path)
    print(f"Created FIFO at {fifo_path}")
    
    # FIFO exists now - could open and use it here
    
except FileExistsError:
    print(f"FIFO {fifo_path} already exists", file=sys.stderr)
except OSError as e:
    print(f"Error creating FIFO: {e}", file=sys.stderr)
finally:
    # Clean up
    if os.path.exists(fifo_path):
        os.unlink(fifo_path)
        print(f"Removed {fifo_path}")

This example creates a FIFO, handles potential errors, and ensures cleanup.
The FIFO is removed after creation to demonstrate proper resource management.

Note that FIFOs persist until explicitly removed, even if the creating process
exits. Always clean up FIFOs when no longer needed.

## Setting Custom Permissions

The mode parameter controls FIFO permissions. This example shows how to set
specific permissions and verify them with os.stat.

fifo_permissions.py
  

import os
import stat

fifo_path = "/tmp/secure_fifo"
permissions = 0o600  # Read/write for owner only

try:
    # Create FIFO with restricted permissions
    os.mkfifo(fifo_path, mode=permissions)
    print(f"Created secure FIFO at {fifo_path}")
    
    # Verify permissions
    st = os.stat(fifo_path)
    actual_mode = stat.S_IMODE(st.st_mode)
    print(f"Requested permissions: {oct(permissions)}")
    print(f"Actual permissions: {oct(actual_mode)}")
    
    if actual_mode == permissions:
        print("Permissions match")
    else:
        print("Warning: Permissions don't match request")
        
finally:
    if os.path.exists(fifo_path):
        os.unlink(fifo_path)

This creates a FIFO with 600 permissions (read/write for owner only). The
actual permissions are verified using os.stat to ensure they match.

Note that the umask affects final permissions. The actual mode will be
mode &amp; ~umask. Use os.umask() to control this if needed.

## Simple IPC with FIFO

This example demonstrates basic interprocess communication using a FIFO.
One process writes to the FIFO while another reads from it.

simple_ipc.py
  

import os
import sys
from multiprocessing import Process

fifo_path = "/tmp/ipc_fifo"

def writer():
    try:
        os.mkfifo(fifo_path)
        print("Writer: FIFO created")
        
        with open(fifo_path, "w") as fifo:
            print("Writer: Sending message...")
            fifo.write("Hello from writer!")
            fifo.flush()
            
    finally:
        if os.path.exists(fifo_path):
            os.unlink(fifo_path)

def reader():
    try:
        print("Reader: Waiting for message...")
        with open(fifo_path, "r") as fifo:
            message = fifo.read()
            print(f"Reader received: {message}")
            
    except FileNotFoundError:
        print("Reader: FIFO not found yet")

if __name__ == "__main__":
    # Start reader first (it will block waiting for writer)
    reader_proc = Process(target=reader)
    reader_proc.start()
    
    # Start writer after a short delay
    import time
    time.sleep(1)
    writer_proc = Process(target=writer)
    writer_proc.start()
    
    # Wait for processes to complete
    writer_proc.join()
    reader_proc.join()

The writer creates the FIFO, sends a message, then exits. The reader blocks
until data is available in the FIFO. Multiprocessing simulates separate processes.

Note that opening a FIFO for reading blocks until another process opens it for
writing, and vice versa. This is normal FIFO behavior.

## Non-blocking FIFO Operations

This example shows how to perform non-blocking operations on a FIFO using
os.O_NONBLOCK flag. Useful when you don't want to wait for the other end.

nonblocking_fifo.py
  

import os
import errno

fifo_path = "/tmp/nonblock_fifo"

try:
    os.mkfifo(fifo_path)
    
    # Open FIFO in non-blocking mode
    fd = os.open(fifo_path, os.O_RDONLY | os.O_NONBLOCK)
    try:
        # Try to read - will raise ENXIO if no writers
        try:
            data = os.read(fd, 1024)
            print(f"Read: {data.decode()}")
        except OSError as e:
            if e.errno == errno.ENXIO:
                print("No writers connected to FIFO")
            else:
                raise
                
    finally:
        os.close(fd)
        
finally:
    if os.path.exists(fifo_path):
        os.unlink(fifo_path)

This opens a FIFO in non-blocking mode for reading. If no writer is connected,
the read operation fails with ENXIO instead of blocking.

Non-blocking mode is useful for checking FIFO status without waiting, but
requires careful error handling for proper operation.

## Bidirectional Communication

This example demonstrates bidirectional communication using two FIFOs - one
for each direction. Common pattern for request-response protocols.

bidirectional_fifo.py
  

import os
import sys
from multiprocessing import Process

request_fifo = "/tmp/request_fifo"
response_fifo = "/tmp/response_fifo"

def server():
    try:
        os.mkfifo(request_fifo)
        os.mkfifo(response_fifo)
        print("Server: FIFOs created")
        
        with open(request_fifo, "r") as req, open(response_fifo, "w") as resp:
            print("Server: Waiting for request...")
            message = req.read()
            print(f"Server received: {message}")
            
            resp.write(f"Response to: {message}")
            resp.flush()
            
    finally:
        for fifo in [request_fifo, response_fifo]:
            if os.path.exists(fifo):
                os.unlink(fifo)

def client():
    try:
        with open(request_fifo, "w") as req, open(response_fifo, "r") as resp:
            print("Client: Sending request...")
            req.write("Client request")
            req.flush()
            
            response = resp.read()
            print(f"Client received: {response}")
            
    except FileNotFoundError:
        print("Client: FIFOs not ready yet")

if __name__ == "__main__":
    server_proc = Process(target=server)
    server_proc.start()
    
    import time
    time.sleep(1)  # Give server time to create FIFOs
    
    client_proc = Process(target=client)
    client_proc.start()
    
    server_proc.join()
    client_proc.join()

The server creates two FIFOs - one for requests and one for responses. The
client sends a request and waits for a response through separate pipes.

This pattern is common in client-server architectures where both sides need
to send and receive data independently.

## FIFO with Multiple Writers

This example shows how multiple processes can write to the same FIFO, with
the reader receiving all messages sequentially.

multi_writer_fifo.py
  

import os
import sys
from multiprocessing import Process
import time

fifo_path = "/tmp/multi_writer_fifo"

def writer(id):
    try:
        with open(fifo_path, "w") as fifo:
            for i in range(3):
                msg = f"Writer {id} message {i}"
                fifo.write(msg + "\n")
                fifo.flush()
                time.sleep(0.5)
    except FileNotFoundError:
        print(f"Writer {id}: FIFO not found")

def reader():
    try:
        print("Reader: Waiting for messages...")
        with open(fifo_path, "r") as fifo:
            while True:
                line = fifo.readline()
                if not line:
                    break
                print(f"Reader got: {line.strip()}")
    except FileNotFoundError:
        print("Reader: FIFO not found")

if __name__ == "__main__":
    try:
        os.mkfifo(fifo_path)
        
        reader_proc = Process(target=reader)
        reader_proc.start()
        
        writers = []
        for i in range(3):
            writer_proc = Process(target=writer, args=(i,))
            writers.append(writer_proc)
            writer_proc.start()
            time.sleep(0.2)
            
        for w in writers:
            w.join()
            
        # Send EOF to reader
        with open(fifo_path, "w") as fifo:
            pass
            
        reader_proc.join()
        
    finally:
        if os.path.exists(fifo_path):
            os.unlink(fifo_path)

Three writer processes send messages to a single FIFO. The reader receives all
messages in the order they were written. Each writer sends three messages.

Note that FIFOs preserve message boundaries when writes are smaller than
PIPE_BUF (typically 4096 bytes on Linux). Larger writes may be interleaved.

## FIFO with Select

This advanced example demonstrates using select.select() to monitor multiple
FIFOs for readability. Useful for multiplexing I/O operations.

select_fifo.py
  

import os
import select
import sys
from multiprocessing import Process

fifo1 = "/tmp/select_fifo1"
fifo2 = "/tmp/select_fifo2"

def writer(fifo_path, messages):
    try:
        os.mkfifo(fifo_path)
        with open(fifo_path, "w") as f:
            for msg in messages:
                f.write(msg + "\n")
                f.flush()
                import time
                time.sleep(1)
    finally:
        if os.path.exists(fifo_path):
            os.unlink(fifo_path)

def reader():
    try:
        os.mkfifo(fifo1)
        os.mkfifo(fifo2)
        
        # Open FIFOs in non-blocking mode
        fd1 = os.open(fifo1, os.O_RDONLY | os.O_NONBLOCK)
        fd2 = os.open(fifo2, os.O_RDONLY | os.O_NONBLOCK)
        
        try:
            while True:
                # Wait for data on either FIFO
                rlist, _, _ = select.select([fd1, fd2], [], [], 5.0)
                
                if not rlist:
                    print("Timeout waiting for data")
                    break
                    
                for fd in rlist:
                    if fd == fd1:
                        data = os.read(fd1, 1024)
                        print(f"FIFO1: {data.decode().strip()}")
                    elif fd == fd2:
                        data = os.read(fd2, 1024)
                        print(f"FIFO2: {data.decode().strip()}")
                        
        finally:
            os.close(fd1)
            os.close(fd2)
            
    finally:
        for fifo in [fifo1, fifo2]:
            if os.path.exists(fifo):
                os.unlink(fifo)

if __name__ == "__main__":
    reader_proc = Process(target=reader)
    reader_proc.start()
    
    import time
    time.sleep(1)  # Let reader create FIFOs
    
    writer1 = Process(target=writer, args=(fifo1, ["A1", "A2", "A3"]))
    writer2 = Process(target=writer, args=(fifo2, ["B1", "B2", "B3"]))
    
    writer1.start()
    writer2.start()
    
    writer1.join()
    writer2.join()
    reader_proc.join()

The reader monitors two FIFOs simultaneously using select(). Each writer sends
messages to its respective FIFO. The reader processes messages as they arrive.

Select is efficient for monitoring multiple file descriptors. The timeout
parameter prevents indefinite blocking if no data arrives.

## Security Considerations

- **Permission control:** Set restrictive permissions on sensitive FIFOs

- **Cleanup:** Always remove FIFOs when no longer needed

- **Location:** Create FIFOs in secure directories like /tmp

- **Race conditions:** Be aware of TOCTOU issues with FIFO creation

- **Platform limits:** FIFOs may have size limits on some systems

## Best Practices

- **Error handling:** Always handle FileExistsError and other exceptions

- **Resource management:** Use context managers for FIFO file objects

- **Cleanup:** Implement proper cleanup in finally blocks

- **Permissions:** Set appropriate permissions using the mode parameter

- **Non-blocking operations:** Consider non-blocking mode for responsive applications

- **Message boundaries:** Keep writes smaller than PIPE_BUF to avoid interleaving

- **Monitoring:** Use select() or similar for handling multiple FIFOs efficiently

## Source References

- [Python os.mkfifo Documentation](https://docs.python.org/3/library/os.html#os.mkfifo)

- [Linux mkfifo(3) man page](https://man7.org/linux/man-pages/man3/mkfifo.3.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).