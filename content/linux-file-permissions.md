+++
title = "Linux File Permissions"
date = 2025-08-29T20:03:27.289+01:00
draft = false
description = "Linux tutorial on file permissions, covering basic and advanced concepts with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux File Permissions

last modified February 25, 2025

Linux file permissions control access to files and directories, ensuring security
and proper resource management. This tutorial covers basic and advanced concepts
of file permissions, including how to view, modify, and manage them using
practical examples.

File permissions in Linux are divided into three categories: **owner**,
**group**, and **others**. Each category has three
types of permissions: **read**, **write**, and
**execute**.

## Understanding Basic Permission Types

The following table outlines the three fundamental permission types in Linux:
read, write, and execute. Each permission has a specific symbol and an
associated octal value, which are essential for configuring file and directory
access.

Basic Permission Types

    Permission
    Symbol
    Octal Value
    Description
    File Example
    Directory Example

    Read
    r
    4
    Allows viewing file contents
    Reading a text file
    Listing directory contents (ls/dir)

    Write
    w
    2
    Allows modifying contents
    Editing a file
    Creating/deleting files in directory

    Execute
    x
    1
    Allows execution
    Running scripts/programs
    Accessing directory (cd)

These basic permissions form the foundation of Linux access control. For files,
'read' allows viewing contents, 'write' enables editing, and 'execute' permits
running the file as a program or script.

For directories, the meanings shift slightly: 'read' lets you list contents,
'write' allows modifications like adding or removing files, and 'execute' is
required to enter the directory with commands like cd.

The octal values (4, 2, 1) are used in numeric notation to combine permissions,
as we'll see later.

## Defining User Classes

This table introduces the three user classes that Linux permissions apply to:
owner, group, and others. Each class is assigned specific permissions to control
access levels.

User Classes

    Class
    Symbol
    Description
    Typical Use Case

    Owner/User
    u
    The file's creator or assigned owner
    Personal files with full control

    Group
    g
    Users in the file's assigned group
    Team-shared files

    Others
    o
    All other system users
    Public access files

In Linux, permissions are assigned separately to these three classes. The
'owner' is typically the user who created the file and often has the most
privileges.

The 'group' consists of users assigned to a specific group (viewable with
ls -l), useful for collaborative work.

'Others' encompasses everyone else on the system, often given minimal access
for security. These distinctions allow fine-grained control, such as giving a
team (group) read access while restricting outsiders (others).

## Exploring Permission Notation Examples

The table below demonstrates how permissions are represented in both symbolic
and octal notation, with examples showing common configurations and their
breakdowns.

Permission Notation Examples

    Type
    Example
    Octal
    Breakdown

    Symbolic
    -rwxr-xr-x
    755
    
        Owner: rwx (7 = 4+2+1)

        Group: r-x (5 = 4+1)

        Others: r-x (5 = 4+1)
    

    Symbolic
    -rw-r--r--
    644
    
        Owner: rw- (6 = 4+2)

        Group: r-- (4)

        Others: r-- (4)
    

    Symbolic
    -rwxrwxrwx
    777
    
        Owner: rwx (7 = 4+2+1)

        Group: rwx (7 = 4+2+1)

        Others: rwx (7 = 4+2+1)
    

Permission notation can be symbolic (e.g., rwxr-xr-x) or numeric
(e.g., 755). The symbolic form uses 'r', 'w', and 'x' for read,
write, and execute, with '-' indicating no permission.

The octal form condenses this into three digits, one for each user class
(owner, group, others), calculated by adding the values of enabled permissions.
For instance, 755 grants the owner full access (7), while group and
others get read and execute (5).

The 777 example shows full access for all, which is rare due to
security risks, while 644 is common for files needing owner
editing and public reading.

## Breaking Down Octal Permission Calculations

This table provides a detailed look at how octal values are calculated from
permission combinations, showing every possible value from 0 to 7 with their
symbolic, binary, and descriptive equivalents.

Octal Permission Calculations

    Octal Value
    Symbolic Notation
    Binary Representation
    Calculation
    Description

    0
    ---
    000
    0
    No permissions

    1
    --x
    001
    1
    Execute only

    2
    -w-
    010
    2
    Write only

    3
    -wx
    011
    2 + 1 = 3
    Write and Execute

    4
    r--
    100
    4
    Read only

    5
    r-x
    101
    4 + 1 = 5
    Read and Execute

    6
    rw-
    110
    4 + 2 = 6
    Read and Write

    7
    rwx
    111
    4 + 2 + 1 = 7
    Read, Write, and Execute (full permissions)

The octal system simplifies permission settings by assigning values to each
permission: read (4), write (2), and execute (1). These are added together to
form a single digit per user class.

The binary representation (e.g., 101 for 5) mirrors this, with each bit
corresponding to a permission (1 for enabled, 0 for disabled). For example,
5 (read and execute) is rare for files but common for directories,
while 6 (read and write) suits editable documents.

This table is a reference for constructing any permission string, like
combining rw- (6) for an owner with r-- (4) for others
in 644.

## Additional Notes

- Octal values are calculated by adding: Read(4) + Write(2) + Execute(1)

- Use chmod command to change permissions (e.g., chmod 755 filename)

- Special permissions exist: SetUID (4), SetGID (2), Sticky Bit (1)

- File type indicator precedes permissions (e.g., '-' for regular file, 'd' for directory)

## Viewing File Permissions

This checks permissions on a config file.

view_permissions.sh
  

ls -l /etc/nginx/nginx.conf

The ls -l command lists detailed info for
/etc/nginx/nginx.conf. Output might be:
-rw-r--r-- 1 root root 1024 Feb 25 12:34 nginx.conf.
The -rw-r--r-- breaks down as: - (file),
rw- (owner read/write), r-- (group read),
r-- (others read). Use ls -ld for directories.
The 1 is the link count, and root root shows owner
and group.

## Changing File Permissions

This makes a script executable.

change_permissions.sh
  

chmod 755 backup.sh

The chmod 755 command sets backup.sh to
rwxr-xr-x: 7 (owner: rwx = 4+2+1),
5 (group: r-x = 4+1), 5 (others: r-x = 4+1).
Numeric mode is absolute—replaces existing perms. Check before with
ls -l backup.sh and after to confirm. Execute (x) is
key for scripts; without it, ./backup.sh fails. Requires owner or
root privileges.

## Symbolic Mode with chmod

This adds write access for a group.

symbolic_mode.sh
  

chmod g+w team_doc.txt

The g+w option adds write permission for the group on
team_doc.txt. Symbolic mode adjusts existing perms:
u (user/owner), g (group), o (others),
+ (add), - (remove), = (set exact).
If it was rw-r--r--, it becomes rw-rw-r--. Use
ls -l to verify. Multiple changes work (e.g.,
chmod u+x,g-w). More flexible than numeric mode.

## Changing File Ownership

This transfers a file to a new user.

change_ownership.sh
  

chown alice:devs project.c

The chown alice:devs command sets project.c's owner to
alice and group to devs. Syntax is
user:group. Use ls -l before (e.g., "bob:coders") and
after to confirm. Requires root or current ownership. Check users with
cat /etc/passwd and groups with cat /etc/group. Use
chown :group for group-only changes. Affects who can modify perms.

## Special Permissions

This sets up special perms on a binary and dir.

special_permissions.sh
  

# Set SUID on a binary
chmod u+s /usr/bin/passwd

# Set SGID on a shared directory
chmod g+s /var/team_data

# Set Sticky Bit on a public folder
chmod +t /tmp

Special permissions tweak behavior: u+s (SUID) on
/usr/bin/passwd runs it as root (e.g., rwsr-xr-x),
letting users change passwords. g+s (SGID) on
/var/team_data ensures new files inherit the team_data
group. +t (Sticky Bit) on /tmp (rwxrwxrwt)
limits deletion to owners/root. Verify with ls -l. Use
find / -perm -4000 to locate SUID files. Apply cautiously—security
risks exist.

## Default Permissions with umask

This sets defaults for new files.

umask.sh
  

umask 022

The umask 022 command subtracts from base perms (666 for files,
777 for dirs), yielding 644 (rw-r--r--) for files and
755 (rwxr-xr-x) for dirs. Run umask alone to check
current value. Test with touch test; ls -l test. Set in
~/.bashrc for persistence. 022 is common—group/others
can't write. Use 002 for group-write (e.g., 664).

## Example: Recursive Permission Change

This updates a directory tree's perms.

recursive_change.sh
  

chmod -R 750 /home/user/docs

The -R option applies 750 (rwxr-x---) recursively to
/home/user/docs and all contents. Owner gets full access, group
read/execute, others none. Check with ls -lR before/after. Use
find /home/user/docs -ls for a detailed view. Careful—overwrites
existing perms. Add -v for verbose output. Ideal for securing
project directories.

## Example: Bulk Ownership Change

This reassigns ownership across files.

bulk_ownership.sh
  

chown -R webadmin:www-data /var/www

The chown -R command sets owner webadmin and group
www-data for /var/www and all subfiles. Common for web
servers. Verify with ls -lR /var/www. Use
find /var/www -user olduser to spot old ownership first. Requires
root. Add --from=olduser:oldgroup to target specific prior owners.
Ensures consistent access for services.

## Example: Find Files by Permission

This locates world-writable files.

find_permissions.sh
  

find / -perm -o+w 2&gt;/dev/null

The find command searches from / for files where
others have write perms (-o+w), like ----r--rw-.
Redirects errors (e.g., permission denied) to /dev/null. Use
-perm 777 for exact matches. Check results with ls -l.
Security audit tool—world-writable files can be risky. Limit scope (e.g.,
/home) to reduce noise.

## Best Practices for File Permissions

- **Use Least Privilege:** Grant only the necessary permissions to users and groups.

- **Regularly Audit Permissions:** Periodically review file and directory permissions to ensure security.

- **Use Groups Effectively:** Assign users to groups and manage permissions at the group level.

- **Avoid Excessive Use of SUID/SGID:** Use SUID and SGID sparingly to minimize security risks.

## Source

[GNU File Permissions Documentation](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)

In this article, we have explored various examples of managing Linux file
permissions, including viewing, changing, and setting special permissions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).