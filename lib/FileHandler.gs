import_code("/lib/FileError.gs")
import_code("/lib/SessionManager.gs")

// FileHandler class. Implements ready-made functions for interacting with the stored File object.
FileHandler = {}

FileHandler.fileObject = null // Underlying File object.

FileHandler.classID = "FileHandler"

FileHandler.displayID = "File"

FileHandler.UID = null

FileHandler.filePath = ["var"]

// Used in Handler's handleInput. Maps user's input in terminal to their respective Handler methods.
FileHandler.inputMap = {}

// objRef is a passed reference to the outer Map, used to bypass scope limitations. Serves as a manual "self".
FileHandler.inputMap["ls"] = function(objRef, args)
    return objRef.getFiles
end function

FileHandler.inputMap["cat"] = function(objRef, args)
    if args.len > 1 then return objRef.readFile(args[1]) else return "Usage: cat [file]"
end function

FileHandler.inputMap["rm"] = function(objRef, args)
    if args.len > 1 then return objRef.deleteFile(args[1]) else return "Usage: rm [file]"
end function

FileHandler.inputMap["cd"] = function(objRef, args)
    if args.len > 1 then return objRef.changeFile(args[1]) else return "Usage: cd [directory]" 
end function

FileHandler.inputMap["cp"] = function(objRef, args)
    if args.len > 3 then return objRef.copyFile(args[1], args[2], args[3]) else return "Usage: cp [file] [path] [newName]"
end function

FileHandler.inputMap["mv"] = function(objRef, args)
    if args.len > 3 then return objRef.moveFile(args[1], args[2], args[3]) else return "Usage: mv [file] [path] [newName]"  
end function

FileHandler.inputMap["gettext"] = function(objRef, args)
    if args.len > 1 then return objRef.getTextFile(args[1]) else return "Usage: gettext [file]"    
end function

FileHandler.inputMap["chmod"] = function(objRef, args)
    if args.len > 3 then return objRef.changePerms(args[1], args[2], args[3].to_int) else return "Usage: chmod [file] [perms] [recursive]"
end function

FileHandler.inputMap["chgrp"] = function(objRef, args)
    if args.len > 3 then return objRef.changeGroup(args[1], args[2], args[3].to_int) else return "Usage: chgrp [file] [group] [recursive]"
end function

FileHandler.inputMap["chown"] = function(objRef, args)
    if args.len > 3 then return objRef.changeOwner(args[1], args[2], args[3].to_int) else return "Usage: chown [file] [owner] [recursive]" 
end function

FileHandler.inputMap["write"] = function(objRef, args)
    if args.len > 2 then return objRef.writeFile(args[1], args[2:].join(" ")) else return "Usage: write [file] [content]"
end function

FileHandler.inputMap["fschk"] = function(objRef, args) // Searches for accessible files and folders in the file system.
    if args.len > 1 then fileName = args[1] else fileName = "/"
    
    return objRef.treeAction(fileName, @objRef.accessCheck)
end function

FileHandler.inputMap["logwipe"] = function(objRef, args)
    return objRef.logWipe
end function

FileHandler.getObject = function()
    return self.fileObject
end function

// Sets stored File object to passed object, and updates stored path.
FileHandler.updateFileObject = function(fileObject)
    self.fileObject = fileObject
    self.genUID
    self.updateFilePath
end function

FileHandler.updateFilePath = function()
    if not self.fileObject then
        self.filePath = [""]
    else
        self.filePath = self.fileObject.path.split("/")
        self.filePath.remove(0)
    end if	
end function

FileHandler.listFile = function(file)
    return file.permissions + " " + file.owner + " " + file.group + " " + file.size + " " + file.name
end function

// Prints out files and folders in File object's directory.
FileHandler.getFiles = function()
    result = ""
    result = result + "Permissions Owner Group Size Name\n"
    result = result + self.fileObject.permissions + " " + self.fileObject.owner + " " + self.fileObject.group + " " + self.fileObject.size + " .\n"
    for file in self.fileObject.get_files
        result = result + self.listFile(file) + "\n"
    end for
    
    for folder in self.fileObject.get_folders
        result = result + self.listFile(folder) + "\n"
    end for

    return format_columns(result)
end function

FileHandler.checkFile = function(fileName)
    if fileName == "." then return self.fileObject
    file = self.fileObject.get_files.first("name", fileName)
    folder = self.fileObject.get_folders.first("name", fileName)
    if file then return file
    if folder then return folder
    return false
end function

FileHandler.accessCheck = function(objRef, file)
    if file.has_permission("r") or file.has_permission("w") or file.has_permission("x") or file.owner == self.getPerms then return objRef.listFile(file) + char(10)
end function

// Recursively applies action to all files and folders in the tree.
FileHandler.treeAction = function(file, action)
    if file == "/" then
        self.toRoot
        file = self.fileObject
    end if
    if typeof(file) != "file" then return "Invalid argument."

    result = ""

    result = result + action(self, file)
    for each in file.get_files
        result = result + action(self, each)
    end for
    for each in file.get_folders
        result = result + self.treeAction(each, @action)
    end for

    return result
end function

// Returns content of specified file. Needs to be in current directory.
FileHandler.readFile = function(fileName)
    file = self.fileObject.get_files.first("name", fileName)
    if not file then return FileNotFoundError.create(fileName)
    result = file.get_content
    if not result then return FileReadError.create(fileName) else return result
end function

FileHandler.writeFile = function(fileName, content)
    file = self.fileObject.get_files.first("name", fileName)
    if not file then return FileNotFoundError.create(fileName)
    result = file.set_content(content)
    if result != true then return FileWriteError.create(fileName, result) else return "Content written."
end function

// Deletes the file if it exists.
FileHandler.deleteFile = function(fileName)
    file = self.checkFile(fileName)
    if not file then return FileNotFoundError.create(fileName)
    result = file.delete
    if result.trim.len != 0 then return FileDeleteError.create(fileName, result) else return "File deleted."
end function

// Changes directory appropriately. Does not support absolute paths.
FileHandler.changeFile = function(command)
    changeQueue = command.split("/")
    for each in changeQueue
        if each.trim.len == 0 or each == "." then continue
        if command == ".." then
            if self.fileObject.parent then
                self.fileObject = self.fileObject.parent
            else
                self.updateFilePath
                return GenericError.create("Cannot go up. If you aren't in /, cwd may have been deleted.")
            end if
        else
            if not self.checkFile(command) then return FileNotFoundError.create(command)
            self.fileObject = self.fileObject.get_folders.first("name", command)
        end if
    end for

    self.updateFilePath
end function

FileHandler.moveFile = function(fileName, filePath, newName)
    file = self.checkFile(fileName)
    if not file then return FileNotFoundError.create(fileName)
    result = file.move(filePath, newName)
    if result != true then return FileMoveError.create(fileName, filePath, result) else return "File moved."
end function

FileHandler.copyFile = function(fileName, filePath, newName)
    file = self.checkFile(fileName)
    if not file then return FileNotFoundError.create(fileName)
    result = file.copy(filePath, newName)
    if result != true then return FileCopyError.create(fileName, filePath, result) else return "File copied."
end function

FileHandler.getTextFile = function(fileName)
    fileText = self.readFile(fileName)
    if fileText isa FileReadError then return fileText
    session.vexxed["homeShell"].host_computer.touch("/root/Loot/", fileName)
    session.vexxed["homeShell"].host_computer.File("/root/Loot/" + fileName).set_content(fileText)
    return "File copied to /root/Loot/" + fileName
end function

FileHandler.getLANIP = function()
    return "N/A"
end function

FileHandler.getPubIP = function()
    return "N/A"
end function

// Tries to return an object's appropriate level of permission.
FileHandler.getPerms = function()
    self.toRoot

    root = self.fileObject.get_folders.first("path", "/root")
    if root and root.has_permission("r") and root.has_permission("w") and root.has_permission("x") then return "root"
    home = self.fileObject.get_folders.first("path", "/home")
    if home then
        users = home.get_folders.wherenot("path", "/home/guest")
        if users then
            for each in users
                if each.has_permission("r") and each.has_permission("w") and each.has_permission("x") then return "user"
            end for
        end if
    end if
    return "guest"
end function

FileHandler.toRoot = function()
    while parent(self.fileObject)
        result = self.changeFile("..")
        if result isa GenericError then return result
    end while
end function

FileHandler.changePerms = function(fileName, newPerms, recursive = 0)
    if fileName == "." then file = self.fileObject else file = self.checkFile(fileName)

    if not file then return FileNotFoundError.create(fileName)
    
    // First, change all permissions to 000.
    result = file.chmod("u-rwx", recursive)
    if result.trim.len != 0 then return FileChmodError.create(fileName, newPerms, result)
    file.chmod("g-rwx", recursive)
    file.chmod("o-rwx", recursive)

    // Then, convert octal to rwx.
    userOctal = newPerms[0].to_int
    groupOctal = newPerms[1].to_int
    otherOctal = newPerms[2].to_int

    // Ternary operators don't exist in this language, so we have to do it the long way.
    userPerms = "u+"
    if bitAnd(userOctal, 4) then userPerms = userPerms + "r"
    if bitAnd(userOctal, 2) then userPerms = userPerms + "w"
    if bitAnd(userOctal, 1) then userPerms = userPerms + "x"

    groupPerms = "g+"
    if bitAnd(groupOctal, 4) then groupPerms = groupPerms + "r"
    if bitAnd(groupOctal, 2) then groupPerms = groupPerms + "w"
    if bitAnd(groupOctal, 1) then groupPerms = groupPerms + "x"

    otherPerms = "o+"
    if bitAnd(otherOctal, 4) then otherPerms = otherPerms + "r"
    if bitAnd(otherOctal, 2) then otherPerms = otherPerms + "w"
    if bitAnd(otherOctal, 1) then otherPerms = otherPerms + "x"

    // Finally, apply the new permissions.
    file.chmod(userPerms, recursive)
    file.chmod(groupPerms, recursive)
    file.chmod(otherPerms, recursive)

    return "Permissions changed."
end function

FileHandler.changeGroup = function(fileName, newGroup, recursive = 0)
    if fileName != "." then file = self.fileObject.get_files.first("name", fileName) else file = self.fileObject

    if not file then return FileNotFoundError.create(fileName)
    result = file.set_group(newGroup, recursive)
    if result.trim.len != 0 then return FileChgrpError.create(fileName, newGroup, result) else return "Group changed."
end function

FileHandler.changeOwner = function(fileName, newOwner, recursive = 0)
    if fileName != "." then file = self.fileObject.get_files.first("name", fileName) else file = self.fileObject

    if not file then return FileNotFoundError.create(fileName)
    result = file.set_owner(newOwner, recursive)
    if result.trim.len != 0 then return FileChownError.create(fileName, newOwner, result) else return "Owner changed."
end function

FileHandler.logWipe = function()
    if self.getPerms != "root" then return "Root permissions required."
    result = self.toRoot
    if result isa GenericError then return result
    result  = self.changeFile("etc")
    if result isa GenericError then return result
    result = self.writeFile("fstab", "rosebud")
    if result isa GenericError then return result
    result = self.copyFile("fstab", "/var/", "system.log")
    if result isa GenericError then return result
    self.writeFile("fstab", "") 
    return "Logs wiped."
end function

FileHandler.genUID = function()
    self.UID = md5(str(rnd + rnd + rnd + rnd)) // Random enough for a UID.
end function

// As inputMap is updated in better objects, more commands can be used
FileHandler.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasMethod(input[0]) then return
                
    func = @self.inputMap[input[0]]
    return func(self, input)
end function
