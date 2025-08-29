+++
title = "Python os.makedirs Function"
date = 2025-08-29T20:09:24.143+01:00
draft = false
description = "Complete guide to Python's os.makedirs function covering recursive directory creation, exist_ok parameter, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.makedirs Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.makedirs function,
which creates directories recursively. We'll cover basic usage, the exist_ok
parameter, permission handling, and practical directory creation examples.

## Basic Definitions

The os.makedirs function creates directories recursively,
including all necessary parent directories. It's similar to mkdir -p in Unix.

Key parameters: name (path to create), mode (permissions, default 0o777),
exist_ok (suppress errors if exists, default False). Raises OSError on failure.

## Basic Directory Creation

The simplest use of os.makedirs creates a single directory or
nested directory structure. This example demonstrates both scenarios.

basic_creation.py
  

import os

# Create a single directory
os.makedirs("my_directory")
print("Created my_directory")

# Create nested directories
os.makedirs("parent/child/grandchild")
print("Created parent/child/grandchild structure")

# Verify creation
print(os.listdir("parent/child"))

This creates a single directory and a nested structure. The function handles
all intermediate directory creation automatically.

If any directory in the path exists (without exist_ok=True), it raises
FileExistsError. The default mode (0o777) may be modified by umask.

## Using exist_ok Parameter

The exist_ok parameter prevents errors when directories already exist.
When True, it silently continues if the target directory exists.

exist_ok.py
  

import os

path = "existing_dir/subdir"

# First creation (works)
os.makedirs(path)
print(f"Created {path}")

# Second attempt (fails without exist_ok)
try:
    os.makedirs(path)
    print("This won't print")
except FileExistsError:
    print(f"{path} already exists")

# With exist_ok=True
os.makedirs(path, exist_ok=True)
print(f"Success with exist_ok=True")

The first attempt succeeds, the second fails with FileExistsError, and the
third succeeds due to exist_ok=True. This is useful for idempotent operations.

Note that exist_ok only suppresses errors when the target directory exists.
Other errors (like permission issues) will still raise exceptions.

## Setting Directory Permissions

The mode parameter controls directory permissions. On Unix-like systems,
this is modified by the process's umask. This example shows permission setting.

permissions.py
  

import os
import stat

path = "private_dir"

# Create with restrictive permissions (700)
os.makedirs(path, mode=0o700)
print(f"Created {path} with 700 permissions")

# Verify permissions
st = os.stat(path)
print(f"Actual permissions: {oct(st.st_mode &amp; 0o777)}")

# Create with different permissions
path2 = "shared_dir"
os.makedirs(path2, mode=0o755)
print(f"Created {path2} with 755 permissions")

This creates directories with specific permissions. The first is only
accessible by the owner (700), the second allows group/others to read/execute.

The actual permissions are mode &amp; ~umask. Use os.umask() to control the mask
if precise permissions are required.

## Handling Symbolic Links

When creating directories through symbolic links, behavior depends on the
system. This example demonstrates potential scenarios and outcomes.

symlinks.py
  

import os

# Setup: create target and symlink
os.makedirs("target_dir")
os.symlink("target_dir", "symlink_dir")

try:
    # Attempt to create through symlink
    os.makedirs("symlink_dir/new_dir")
    print("Created through symlink")
except FileExistsError:
    print("Failed to create through symlink")

# Create a broken symlink
os.symlink("nonexistent", "broken_link")

try:
    # Attempt to create through broken symlink
    os.makedirs("broken_link/new_dir")
    print("Created through broken link")
except OSError as e:
    print(f"Failed: {e}")

The behavior varies by system. Some follow symlinks, others don't. Broken
links typically fail unless the full path is created.

For predictable behavior, use os.path.realpath() to resolve links before
directory creation or avoid symlinks in target paths.

## Error Handling

os.makedirs can raise several exceptions. This example shows
common error scenarios and proper handling techniques.

error_handling.py
  

import os
import errno

paths = [
    "/root/protected_dir",  # Permission denied
    "valid/new_dir",       # Should work
    "invalid/chars|here",  # Invalid characters
    ""                     # Empty path
]

for path in paths:
    try:
        os.makedirs(path)
        print(f"Created {path}")
    except PermissionError:
        print(f"Permission denied for {path}")
    except OSError as e:
        if e.errno == errno.EEXIST:
            print(f"{path} already exists")
        elif e.errno == errno.EINVAL:
            print(f"Invalid path: {path}")
        else:
            print(f"Failed to create {path}: {e}")

This demonstrates handling various error cases: permission issues, invalid
paths, and existing directories. Specific errno values help identify problems.

For robust code, catch specific exceptions rather than generic OSError when
you need different handling for different failure modes.

## Creating Temporary Directories

Combining os.makedirs with tempfile creates secure temporary
directory structures. This example shows a practical implementation.

temp_dirs.py
  

import os
import tempfile

# Create a secure temp directory structure
try:
    temp_root = tempfile.mkdtemp()
    print(f"Created temp root: {temp_root}")
    
    # Create nested structure
    nested_path = os.path.join(temp_root, "level1", "level2")
    os.makedirs(nested_path, mode=0o700)
    print(f"Created nested structure at {nested_path}")
    
    # Verify
    print(os.listdir(os.path.join(temp_root, "level1")))
    
finally:
    # Cleanup (in real code, use shutil.rmtree)
    print(f"Would remove {temp_root} here")
    # os.rmdir(temp_root)  # Would fail with nested content

This creates a temporary root directory with secure permissions, then builds
a nested structure inside it. The example includes cleanup considerations.

In production code, use tempfile.TemporaryDirectory or shutil.rmtree for
proper cleanup of nested temporary directories.

## Windows-Specific Considerations

- **Path separators:** Windows accepts both / and \

- **Permissions:** Mode parameter works differently than Unix

- **Long paths:** May require \\?\ prefix for very long paths

- **Reserved names:** Avoid CON, PRN, etc. as directory names

- **Case sensitivity:** Windows paths are case-insensitive

## Best Practices

- **Use exist_ok=True:** For idempotent directory creation

- **Set explicit modes:** Don't rely on default permissions

- **Handle errors:** Catch specific exceptions appropriately

- **Clean up:** Remove temporary directories when done

- **Prefer pathlib:** For newer code, consider Path.mkdir

## Source References

- [Python os.makedirs Documentation](https://docs.python.org/3/library/os.html#os.makedirs)

- [Linux mkdir(2) man page](https://man7.org/linux/man-pages/man2/mkdir.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).