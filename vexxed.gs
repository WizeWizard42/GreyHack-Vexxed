metaxploit = include_lib(current_path + "/metaxploit.so")
if not metaxploit then metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then exit("Could not import metaxploit. Exiting.")

crypto = include_lib(current_path + "/crypto.so")
if not crypto then crypto = include_lib("/lib/crypto.so")
if not crypto then print("Could not import crypto. Continuing.")

session = @get_custom_object

////////////////////////////////////////////////////////////////////////////////////

// File: TypeExtensions.gs
//LinQ lib functionality for greyscript
//By MachaCeleste 20240205
map.first = function(key, value)
    for each in self.indexes
        if self[each][key] == value then return self[each]
    end for
end function
map.where = function(key, value)
    ret = {}
    for each in self.indexes
        if self[each][key] == value then ret.push(self[each])
    end for
    return ret
end function
map.wherenot = function(key, value)
    ret = {}
    for each in self.indexes
        if self[each][key] != value then ret.push(self[each])
    end for
    return ret
end function
list.first = function(key, value)
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each == value then return each
            if key == "contains" and each.is_match(value) then return each
            if key == "len" and each.len == value then return each
        else if typeof(each) == "file" then
            if key == "name" and each.name == value then return each
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path == value then return each
            if key == "permissions" and each.permissions == value then return each
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c == value then return each
            end if
            if key == "size" and each.size == value then return each
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number == value then return each
            if key == "is_closed" and each.is_closed == value then return each
            if key == "get_lan_ip" and each.get_lan_ip == value then return each
        else if typeof(each) == "map" then
            if each[key] == value then return each
        end if
    end for
end function
list.where = function(key, value)
    ret = []
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each == value then ret.push(each)
            if key == "contains" and each.is_match(value) then ret.push(each)
            if key == "len" and each.len == value then ret.push(each)
        else if typeof(each) == "file" then
            if key == "name" and each.name == value then ret.push(each)
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path == value then ret.push(each)
            if key == "permissions" and each.permissions == value then ret.push(each)
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c == value then ret.push(each)
            end if
            if key == "size" and each.size == value then ret.push(each)
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number == value then ret.push(each)
            if key == "is_closed" and each.is_closed == value then ret.push(each)
            if key == "get_lan_ip" and each.get_lan_ip == value then ret.push(each)
        else if typeof(each) == "map" then
            if each[key] == value then ret.push(each)
        end if
    end for
    return ret
end function
list.wherenot = function(key, value)
    ret = []
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each != value then ret.push(each)
            if key == "contains" and not each.is_match(value) then ret.push(each)
            if key == "len" and each.len != value then ret.push(each)
        else if typeof(each) == "file" then
            if key == "name" and each.name != value then ret.push(each)
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path != value then ret.push(each)
            if key == "permissions" and each.permissions != value then ret.push(each)
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c != value then ret.push(each)
            end if
            if key == "size" and each.size != value then ret.push(each)
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number != value then ret.push(each)
            if key == "is_closed" and each.is_closed != value then ret.push(each)
            if key == "get_lan_ip" and each.get_lan_ip != value then ret.push(each)
        else if typeof(each) == "map" then
            if each[key] != value then ret.push(each)
        end if
    end for
    return ret
end function
string.regex_escape = function
    result = self
    for x in "+*?^$.[]{}()|/"
        result = result.replace("\"+x, "\"+x)
    end for
    return result
end function

//Simple string color lib functionality for greyscript
// By MachaCeleste 20240305
string.color = function(hexc)
    return "<color=" + hexc + ">" + self + "</color>"
end function

////////////////////////////////////////////////////////////////////////////////////

// File: FileError.gs
// Error class. Provides a way to handle errors in a more structured way.
GenericError = {}

GenericError.classID = "GenericError"
GenericError.message = "An error occurred."
GenericError.create = function(message = "An error occurred.")
    error = new GenericError
    error.message = message
    return error
end function
GenericError.toString = function()
    return self.message
end function

GenericFileError = new GenericError
GenericFileError.classID = "GenericFileError"
GenericFileError.message = "An error occurred with a file."
GenericFileError.fileName = ""
GenericFileError.create = function(fileName = "")
    error = new GenericFileError
    error.message = "An error occurred with file: " + fileName
    error.fileName = fileName
    return error
end function

FileNotFoundError = new GenericFileError
FileNotFoundError.classID = "FileNotFoundError"
FileNotFoundError.message = "File or directory not found."
FileNotFoundError.fileName = ""
FileNotFoundError.create = function(fileName = "")
    error = new FileNotFoundError
    error.message = "File or directory not found: " + fileName
    error.fileName = fileName
    return error
end function

FileReadError = new GenericFileError
FileReadError.classID = "FileReadError"
FileReadError.message = "Error reading file."
FileReadError.fileName = ""
FileReadError.create = function(fileName = "")
    error = new FileReadError
    error.message = "Error reading file: " + fileName
    error.fileName = fileName
    return error
end function

FileWriteError = new GenericFileError
FileWriteError.classID = "FileWriteError"
FileWriteError.message = "Error writing file."
FileWriteError.fileName = ""
FileWriteError.reason = ""
FileWriteError.create = function(fileName = "", reason = "")
    error = new FileWriteError
    error.message = "Error writing file " + fileName + ": " + reason
    error.fileName = fileName
    error.reason = reason
    return error
end function

FileDeleteError = new GenericFileError
FileDeleteError.classID = "FileDeleteError"
FileDeleteError.message = "Error deleting file."
FileDeleteError.fileName = ""
FileDeleteError.reason = ""
FileDeleteError.create = function(fileName = "", reason = "")
    error = new FileDeleteError
    error.message = "Error deleting file " + fileName + ": " + reason
    error.fileName = fileName
    error.reason = reason
    return error
end function

FileCopyError = new GenericFileError
FileCopyError.classID = "FileCopyError"
FileCopyError.message = "Error copying file."
FileCopyError.fileName = ""
FileCopyError.destination = ""
FileCopyError.reason = ""
FileCopyError.create = function(fileName = "", destination = "", reason = "")
    error = new FileCopyError
    error.message = "Error copying file " + fileName + " to " + destination + ": " + reason
    error.fileName = fileName
    error.destination = destination
    error.reason = reason
    return error
end function

FileMoveError = new GenericFileError
FileMoveError.classID = "FileMoveError"
FileMoveError.message = "Error moving file."
FileMoveError.fileName = ""
FileMoveError.destination = ""
FileMoveError.reason = ""
FileMoveError.create = function(fileName = "", destination = "", reason = "")
    error = new FileMoveError
    error.message = "Error moving file " + fileName + " to " + destination + ": " + reason
    error.fileName = fileName
    error.destination = destination
    error.reason = reason
    return error
end function

FileChmodError = new GenericFileError
FileChmodError.classID = "FileChmodError"
FileChmodError.message = "Error changing file permissions."
FileChmodError.fileName = ""
FileChmodError.permissions = ""
FileChmodError.reason = ""
FileChmodError.create = function(fileName = "", permissions = "", reason = "")
    error = new FileChmodError
    error.message = "Error changing file permissions for " + fileName + " to " + permissions + ": " + reason
    error.fileName = fileName
    error.permissions = permissions
    error.reason = reason
    return error
end function

FileChgrpError = new GenericFileError
FileChgrpError.classID = "FileChgrpError"
FileChgrpError.message = "Error changing file group."
FileChgrpError.fileName = ""
FileChgrpError.group = ""
FileChgrpError.reason = ""
FileChgrpError.create = function(fileName = "", group = "", reason = "")
    error = new FileChgrpError
    error.message = "Error changing file group for " + fileName + " to " + group + ": " + reason
    error.fileName = fileName
    error.group = group
    error.reason = reason
    return error
end function

FileChownError = new GenericFileError
FileChownError.classID = "FileChownError"
FileChownError.message = "Error changing file owner."
FileChownError.fileName = ""
FileChownError.owner = ""
FileChownError.reason = ""
FileChownError.create = function(fileName = "", owner = "", reason = "")
    error = new FileChownError
    error.message = "Error changing file owner for " + fileName + " to " + owner + ": " + reason
    error.fileName = fileName
    error.owner = owner
    error.reason = reason
    return error
end function

////////////////////////////////////////////////////////////////////////////////////

// File: ComputerError.gs
GenericComputerError = new GenericError
GenericComputerError.classID = "GenericComputerError"
GenericComputerError.message = "An error with a computer object has occurred."
GenericComputerError.create = function()
    return new GenericComputerError
end function

ComputerProcError = new GenericComputerError
ComputerProcError.classID = "ComputerProcError"
ComputerProcError.message = "Error killing a process."
ComputerProcError.pid = 0
ComputerProcError.reason = ""
ComputerProcError.create = function(pid = 0, reason = "")
    error = new ComputerProcError
    error.message = "Error killing process: " + pid + ": " + reason
    error.pid = pid
    error.reason = reason
    return error
end function

ComputerUserAddError = new GenericComputerError
ComputerUserAddError.classID = "ComputerUserAddError"
ComputerUserAddError.message = "Error adding a user."
ComputerUserAddError.username = ""
ComputerUserAddError.password = ""
ComputerUserAddError.reason = ""
ComputerUserAddError.create = function(username = "", password = "", reason = "")
    error = new ComputerUserAddError
    error.message = "Error adding user " + username + " with password " + password + ": " + reason
    error.username = username
    error.password = password
    error.reason = reason
    return error
end function

ComputerUserRemoveError = new GenericComputerError
ComputerUserRemoveError.classID = "ComputerUserRemoveError"
ComputerUserRemoveError.message = "Error removing a user."
ComputerUserRemoveError.username = ""
ComputerUserRemoveError.reason = ""
ComputerUserRemoveError.create = function(username = "", reason = "")
    error = new ComputerUserRemoveError
    error.message = "Error removing user " + username + ": " + reason
    error.username = username
    error.reason = reason
    return error
end function

ComputerUserChPassError = new GenericComputerError
ComputerUserChPassError.classID = "ComputerUserChPassError"
ComputerUserChPassError.message = "Error changing a user's password."
ComputerUserChPassError.username = ""
ComputerUserChPassError.password = ""
ComputerUserChPassError.reason = ""
ComputerUserChPassError.create = function(username = "", password = "", reason = "")
    error = new ComputerUserChPassError
    error.message = "Error changing password for user " + username + " to " + password + ": " + reason
    error.username = username
    error.password = password
    error.reason = reason
    return error
end function

ComputerTouchError = new GenericComputerError
ComputerTouchError.classID = "ComputerTouchError"
ComputerTouchError.message = "Error touching a file."
ComputerTouchError.filename = ""
ComputerTouchError.reason = ""
ComputerTouchError.create = function(filename = "", reason = "")
    error = new ComputerTouchError
    error.message = "Error touching file " + filename + ": " + reason
    error.filename = filename
    error.reason = reason
    return error
end function

ComputerMkdirError = new GenericComputerError
ComputerMkdirError.classID = "ComputerMkdirError"
ComputerMkdirError.message = "Error creating a directory."
ComputerMkdirError.directory = ""
ComputerMkdirError.reason = ""
ComputerMkdirError.create = function(directory = "", reason = "")
    error = new ComputerMkdirError
    error.message = "Error creating directory " + directory + ": " + reason
    error.directory = directory
    error.reason = reason
    return error
end function

ComputerInvalidInterfaceError = new GenericComputerError
ComputerInvalidInterfaceError.classID = "ComputerInvalidInterfaceError"
ComputerInvalidInterfaceError.message = "Invalid interface."
ComputerInvalidInterfaceError.interface = ""
ComputerInvalidInterfaceError.create = function(interface = "")
    error = new ComputerInvalidInterfaceError
    error.message = "Invalid interface: " + interface
    error.interface = interface
    return error
end function

////////////////////////////////////////////////////////////////////////////////////

// File: SessionManager.gs
// SessionManager class. Handles script state and manages modifications to user session.
// TODO: Method for loading and saving a config file
SessionManager = {}

SessionManager.currHandler = null

SessionManager.handlerStack = []

SessionManager.currLib = {}

SessionManager.inputMap = {}

SessionManager.inputMap["pop"] = function(objRef, args)
    if args.len > 1 then index = args[1] else index = -1
    if objRef.handlerStack.len < 2 or index == 0 then return GenericError.create("Error: cannot pop local shell.")
    objRef.handlerStack.remove(index)
    // If current handler was in stack, update it
    if not objRef.handlerStack.indexOf(objRef.currHandler) then
        objRef.updateCurrHandler(-1)
    end if
end function

SessionManager.inputMap["hstack"] = function(objRef, args)
    for handler in objRef.handlerStack
        if handler == objRef.currHandler then
            print("* " + handler.classID() + ": " + handler.getLANIP())
        else
            print(handler.classID() + ": " + handler.getLANIP())
        end if
    end for
end function

SessionManager.inputMap["use"] = function(objRef, args)
    if args.len < 2 then return "Usage: use [index]"
    objRef.addHandler(session.vexxed["exploiter"].resultObjects[session.vexxed["session"].currLib][args[1].to_int])
end function

SessionManager.inputMap["switch"] = function(objRef, args)
    if args.len < 2 then
        print("Error: switch requires a handler index.")
        return
    end if
    objRef.updateCurrHandler(args[1].to_int)
end function

SessionManager.updateCurrHandler = function(index)
    self.currHandler = self.handlerStack[index]
end function

SessionManager.addHandler = function(handler)
    self.handlerStack.push(handler)
    self.updateCurrHandler(-1)
end function

SessionManager.setCurrLib = function(val)
    self.currLib = val
end function

SessionManager.initSession = function()
    session.vexxed = {}
    session.vexxed["session"] = self
    session.vexxed["exploiter"] = globals.Exploiter
    session.vexxed["homeShell"] = get_shell
    session.vexxed["remoteShell"] = get_shell
    session.vexxed["homeMetax"] = metaxploit
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["homeCrypto"] = crypto
end function

SessionManager.importSession = function()
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["remoteShell"] = get_shell
end function

SessionManager.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
        
    func = @self.inputMap[input[0]]
    if @func == null then return
    return func(self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: FileHandler.gs
// FileHandler class. Implements ready-made functions for interacting with the stored File object.
FileHandler = {}

FileHandler.fileObject = null // Underlying File object.

FileHandler.classID = "FileHandler"

FileHandler.displayID = "File"

FileHandler.filePath = ["var"]

// Used in Handler's handleInput. Maps user's input in terminal to their respective Handler methods.
FileHandler.inputMap = {}

// objRef is a passed reference to the outer Map, used to bypass scope limitations. Serves as a manual "self".
FileHandler.inputMap["ls"] = function(objRef, args)
    return objRef.getFiles
end function

FileHandler.inputMap["cat"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    return objRef.readFile(fileName)
end function

FileHandler.inputMap["rm"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    return objRef.deleteFile(fileName)
end function

FileHandler.inputMap["cd"] = function(objRef, args)
    if args.len > 1 then command = args[1] else command = "var"

    return objRef.changeFile(command)
end function

FileHandler.inputMap["cp"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "system.log"
    if args.len > 2 then filePath = args[2] else filePath = "/var/"
    if args.len > 3 then newName = args[3] else newName = fileName

    return objRef.copyFile(fileName, filePath, newName)
end function

FileHandler.inputMap["mv"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "/home/guest/"
    if args.len > 2 then fileName = args[2] else fileName = "newfile"
    if args.len > 3 then newName = args[3] else newName = fileName

    return objRef.moveFile(fileName, filePath, newName)
end function

FileHandler.inputMap["getText"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    return objRef.getTextFile(fileName)
end function

FileHandler.inputMap["chmod"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "."
    if args.len > 2 then newPerms = args[2] else newPerms = "777"
    if args.len > 3 then recursive = args[3].to_int else recursive = 0

    return objRef.changePerms(fileName, newPerms, recursive)
end function

FileHandler.inputMap["chgrp"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "."
    if args.len > 2 then newGroup = args[2] else newGroup = "guest"
    if args.len > 3 then recursive = args[3].to_int else recursive = 0

    return objRef.changeGroup(fileName, newGroup, recursive)
end function

FileHandler.inputMap["chown"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "."
    if args.len > 2 then newOwner = args[2] else newOwner = "guest"
    if args.len > 3 then recursive = args[3].to_int else recursive = 0

    return objRef.changeOwner(fileName, newOwner, recursive)
end function

FileHandler.inputMap["write"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "fstab"
    if args.len > 2 then content = args[2] else content = "rosebud"

    return objRef.writeFile(fileName, content)
end function

FileHandler.inputMap["fschk"] = function(objRef, args) // Searches for readables and writables
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
    if not self.checkFile(fileName) then return FileNotFoundError.create(fileName)
    result = self.fileObject.get_files.first("name", fileName).get_content
    if not result then return FileReadError.create(fileName) else return result
end function

FileHandler.writeFile = function(fileName, content)
    if not self.checkFile(fileName) then return FileNotFoundError.create(fileName)
    result = self.fileObject.get_files.first("name", fileName).set_content(content)
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
        if each.trim.len == 0 then continue
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

// As inputMap is updated in better objects, more commands can be used
FileHandler.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
    
    func = @self.inputMap[input[0]]
    if @func == null then return
    return func(self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: ComputerHandler.gs
// ComputerHandler class. Inherits FileHandler methods and implements ready-made methods for stored Computer object.
ComputerHandler = new FileHandler

ComputerHandler.computerObject = null

ComputerHandler.classID = "ComputerHandler"

ComputerHandler.displayID = "Computer"

ComputerHandler.inputMap["ps"] = function(objRef, args)
    return objRef.getProcesses
end function

ComputerHandler.inputMap["kill"] = function(objRef, args)
    if args.len > 1 then pid = args[1] else pid = 0

    return objRef.closeProcess(pid.to_int)
end function

ComputerHandler.inputMap["useradd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"

    return objRef.userAdd(username, "secretpassword")
end function

ComputerHandler.inputMap["passwd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"
    if args.len > 2 then pass = args[2] else pass = "secretpasswd"

    return objRef.changePass(username, pass)
end function

ComputerHandler.inputMap["touch"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "file.txt"

    return objRef.createFile(objRef.fileObject.path, fileName)
end function

ComputerHandler.inputMap["mkdir"] = function(objRef, args)
    if args.len > 1 then folder = args[1] else folder = "dir"

    return objRef.createFolder(objRef.fileObject.path, folder)
end function

ComputerHandler.inputMap["iwlist"] = function(objRef, args)
    if args.len > 1 then interface = args[1] else interface = "wlan0"

    return objRef.getWiFiObjects(interface)
end function

ComputerHandler.getObject = function()
    return self.computerObject
end function

// Updates with respective Computer object, then updates File object with respective path.
ComputerHandler.updateComputerObject = function(computerObject)
    self.computerObject = computerObject
    self.updateFileObject(computerObject.File("/" + self.filePath.join("/")))
end function

// Returns all processes running on stored Computer.
ComputerHandler.getProcesses = function()
    return self.computerObject.show_procs
end function

// Kills process by pid.
ComputerHandler.closeProcess = function(pid)
    result = self.computerObject.close_program(pid)
    if result != true then return ComputerProcError.create(pid, result)
end function

// Adds a user, using stored Computer.
ComputerHandler.userAdd = function(username, password)
    result = self.computerObject.create_user(username, password)
    if result != true then return ComputerUserAddError.create(username, password, result)
end function

ComputerHandler.changePass = function(username, password)
    result = self.computerObject.change_password(username, password)
    if result != true then return ComputerChPassError.create(username, password, result)
end function

// Creates a file, like "touch".
ComputerHandler.createFile = function(path, fileName)
    result = self.computerObject.touch(path, fileName)
    if result != true then return ComputerTouchError.create(path, fileName, result)
end function

ComputerHandler.createFolder = function(path, folder)
    result = self.computerObject.create_folder(path, folder)
    if result != true then return ComputerMkdirError.create(path, folder, result)
end function

ComputerHandler.getActiveCard = function()
    return self.computerObject.active_net_card
end function

ComputerHandler.getInterfaces = function()
    return format_columns(self.computerObject.network_devices)
end function

ComputerHandler.getWiFiObjects = function(interface)
    networks = self.computerObject.wifi_networks(interface)
    if networks == null then return ComputerInvalidInterfaceError.create(interface)

    info = "BSSID PWR ESSID"
    for network in networks
        info = info + "\n" + network
    end for
    return format_columns(info)
end function

ComputerHandler.getLANIP = function()
    return self.computerObject.local_ip
end function

ComputerHandler.getPubIP = function()
    return self.computerObject.public_ip
end function

////////////////////////////////////////////////////////////////////////////////////

// File: ShellHandler.gs
// ShellHandler class. Inherits ComputerHandler and implements ready-made methods for stored Shell object.
ShellHandler = new ComputerHandler

ShellHandler.shellObject = null

ShellHandler.classID = "ShellHandler"

ShellHandler.displayID = "Shell"

ShellHandler.inputMap["shell"] = function(objRef, args)
    objRef.dropShell
end function

ShellHandler.inputMap["get"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "system.log"

    objRef.getFile(fileName)
end function

ShellHandler.inputMap["put"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "system.log"

    objRef.putFile(filePath)
end function

ShellHandler.inputMap["build"] = function(objRef, args)
    if args.len > 1 then srcPath = args[1] else srcPath = "/home/guest/dddd.src"
    if args.len > 2 then binPath = args[2] else binPath = "/home/guest"
    if args.len > 3 then canImport = args[3].to_int else canImport = 0

    objRef.buildFile(srcPath, binPath, canImport)
end function

ShellHandler.inputMap["launch"] = function(objRef, args)
	if args.len > 1 then filePath = args[1] else filePath = "/home/guest/dddd"
	if args.len > 2 then launchParams = args[2:].join(" ") else launchParams = ""

	objRef.launchFile(filePath, launchParams)
end function

ShellHandler.inputMap["sudo"] = function(objRef, args)
    if args.len > 1 then userName = args[1] else userName = ""
    if args.len > 2 then userPass = args[2] else userPass = ""

    objRef.trySudo(userName, userPass)
end function

ShellHandler.inputMap["connect"] = function(objRef, args)
    if args.len > 1 then ip = args[1] else ip = "1.1.1.1"
    if args.len > 2 then port = args[2].to_int else port = "22"
    if args.len > 3 then username = args[3] else username = "root"
    if args.len > 4 then userPass = args[4] else userPass = "root"

    objRef.connectService(ip, port, username, userPass)
end function

ShellHandler.getObject = function()
    return self.shellObject
end function

// Sets stored Shell object to passed object, and calls updateComputerObject with respective Computer.
ShellHandler.updateShellObject = function(shellObject)
    self.shellObject = shellObject
    self.updateComputerObject(self.shellObject.host_computer)
end function

// Drops to a shell, self-explanatory.
ShellHandler.dropShell = function()
    self.shellObject.start_terminal
end function

// Downloads specified file to local Shell.
ShellHandler.getFile = function(fileName)
    remotePath = self.fileObject.path + "/" + fileName
    result = self.shellObject.scp(remotePath, "/root/Loot/", session.vexxed["homeShell"])
    if result != true then
        print("Error downloading file: " + result)
    end if
end function

// Uploads specified file to remote Shell.
ShellHandler.putFile = function(filePath)
    result = session.vexxed["homeShell"].scp(filePath, self.fileObject.path, self.shellObject)
    if result != true then
        print("Error uploading file: " + result)
    end if
end function

ShellHandler.trySudo = function(userName, userPass)

    if userName.trim.len == 0 and userPass.trim.len == 0 then result = get_shell else result = get_shell(userName, userPass)
    if not result then
        print("User/pass combo incorrect. Remember, this only works on the current remoteShell.")
        return
    end if

    shell = new ShellHandler
    shell.updateShellObject(result)
    session.vexxed["session"].addHandler(shell)
    session.vexxed["remoteShell"] = result
end function

ShellHandler.buildFile = function(srcPath, binPath, canImport)
    result = self.shellObject.build(srcPath, binPath, canImport)
    if result != "" then
        print("Error building file: " + result)
    end if
end function

ShellHandler.launchFile = function(filePath, args)
	result = self.shellObject.launch(filePath, args)
	print("Successfuly launched: " + result)
end function

ShellHandler.connectService = function(ip, port, username, userPass)
    result = self.shellObject.connect_service(ip, port, username, userPass)
    if result isa string then 
        print("Error connecting to service: " + result)
    end if

    if typeof(result) == "shell" then
        shell = new ShellHandler
        shell.updateShellObject(result)
        session.vexxed["session"].addHandler(shell)
    end if
end function

////////////////////////////////////////////////////////////////////////////////////

// File: Enumerator.gs
// Enumerator class. Provides helpful methods for enumerating targets. Nothing much for now, but still good to be modular.
Enumerator = {}

Enumerator.fullEnumerate = function(ip)
    print("whois " + ip + ":")
    print(whois(ip))
    
    router = get_router(ip)
    print("\nRouter LAN address: " + router.local_ip)
    print("Router BSSID: " + router.bssid_name)
    print("Router ESSID: " + router.essid_name)
    print("\nPort-forwards detected: ")
    for port in router.used_ports
        print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
    end for
    
    print("\nFirewall rules: ")
    for rule in router.firewall_rules
        print(rule)
    end for
    
    print("\nLocal IPs detected: ")
    for lan in router.devices_lan_ip
        if lan == router.local_ip then continue
        
        print("\nLAN: " + lan)
        print("Ports detected: ")
        for port in router.device_ports(lan)
            print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
        end for
    end for
end function

////////////////////////////////////////////////////////////////////////////////////

// File: Exploiter.gs
// Exploiter class. Handles all the dirty work of storing, loading, finding, and exploiting vulns.
Exploiter = {}

Exploiter.scanResult = {} // {"(libname)-(libversion)": {"(memory)": ["(value)", "(value)", ...], ...}, ...}

Exploiter.metaLibs = {} // {"(libname)-(libversion): metaLib", ...}

Exploiter.inputMap = {}

Exploiter.inputMap["scan"] = function(objRef, args)
	if args.len < 3 then return "Usage: scan [ip] [port]"

	lib_id = objRef.scanPort(args[1], args[2].to_int)
	if not lib_id then return "Library was unable to be scanned." else return session.vexxed["session"].setCurrLib(lib_id)
end function

Exploiter.inputMap["load"] = function(objRef, args)
	if args.len < 2 then return "Usage: load [path]"

	lib_id = objRef.scanLib(objRef.loadLib(args[1]))
	if not lib_id then return "Library was unable to be loaded." else return session.vexxed["session"].setCurrLib(lib_id)
end function

Exploiter.inputMap["local"] = function(objRef, args)
	if args.len < 3 then return "Usage: local [path] [optVal]"

	result = objRef.inputMap.load(objRef, args)
	if result then return result
	objRef.crackLib(session.vexxed["session"].currLib, args[2])
	objRef.printVulns(session.vexxed["session"].currLib)
end function

Exploiter.inputMap["target"] = function(objRef, args)
	if args.len < 4 then return "Usage: target [ip] [port] [optVal]"

	result = objRef.inputMap.scan(objRef, args)
	if result then return result
	objRef.crackLib(session.vexxed["session"].currLib, args[3])
	objRef.printVulns(session.vexxed["session"].currLib)
end function

// Parses sec values from overflow output as a list.
Exploiter.scanParse = function(results)
	found = false
	payloads = []
	line = results.split(" ")
	line.reverse

	for word in line
		if found == true then
			word = word.remove(".")
			word = word.remove("<b>")
			word = word.remove("</b>")
			payloads.push(word)
			found = false
		end if

		if word == "Buffer" then
            found = true
		end if
	end for

	return payloads
end function

// Loads a local lib specified by path, used in local exploits. Returns a list of metaLib and lib_id.
Exploiter.loadLib = function(filePath)
	metaLib = session.vexxed["remoteMetax"].load(filePath)
	if metaLib then return metaLib

	print("Library was unable to be loaded.")
end function

// Scans provided MetaLib and saves result vulns. Returns lib_id.
Exploiter.scanLib = function(metaLib)
	lib_id = metaLib.lib_name + "-" + metaLib.version
	self.metaLibs[lib_id] = metaLib

	if self.scanResult.hasIndex(lib_id) then return lib_id

	self.scanResult[lib_id] = {}

	memories = session.vexxed["homeMetax"].scan(metaLib)
	for memory in memories
		print("Scanning memory: " + memory)
		self.scanResult[lib_id][memory] = self.scanParse(session.vexxed["homeMetax"].scan_address(metaLib, memory))
	end for

	self.saveResult
	return lib_id
end function

// Loads a lib from a remote computer, used in remote exploits. Returns a NetSession object.
Exploiter.loadRemoteLib = function(ip, port)
	netSession = session.vexxed["remoteMetax"].net_use(ip, port)
	if netSession then return netSession.dump_lib
	print("Remote library was unable to be loaded.")
end function

// Scans respective port's MetaLib and returns lib_id, used as an id in other methods.
Exploiter.scanPort = function(ip, port)
	metaLib = self.loadRemoteLib(ip, port)
	if not metaLib then return

	self.scanLib(metaLib)
	return metaLib.lib_name + "-" + metaLib.version
end function

// Saves in-memory vulns to a file, to be parsed later.
Exploiter.saveResult = function()
    c = session.vexxed["homeShell"].host_computer

    if not c.File("/root/payloads.db") then
        c.touch("/root", "payloads.db")
    end if
    database_file = c.File("/root/payloads.db")

	result_string = ""

    for lib_id in self.scanResult.indexes
        result_string = result_string + lib_id + "|"
        
        memory_values = []
        for memory in self.scanResult[lib_id].indexes
            values = self.scanResult[lib_id][memory].join(",")
            memory_values.push(memory + ":" + values)
        end for
        
        result_string = result_string + memory_values.join("|") + char(10)
    end for

    database_file.set_content(result_string)
end function

// Parses payloads.db from current directory and stores in-memory.
Exploiter.loadResult = function()
c = session.vexxed["homeShell"].host_computer

if not c.File("/root/payloads.db") then
	self.scanResult = {}
else
	content = c.File("/root/payloads.db").get_content

	if content.len == 0 then
		self.scanResult = {}
	else
		lines = content.split(char(10))

		for line in lines
			if line.trim.len == 0 then continue

			parts = line.split("\|")
			lib_id = parts[0]
			memory_values_pairs = parts[1:]

			self.scanResult[lib_id] = {}

			for pair in memory_values_pairs
				memory_values = pair.split(":")
				memory = memory_values[0]
				values = memory_values[1].split(",")
				self.scanResult[lib_id][memory] = values
			end for
		end for
	end if
end if
end function

Exploiter.resultObjects = {}

// Given a library id and optional key, pulls MetaLib from loaded libraries and stores successful attacks.
Exploiter.crackLib = function(lib_id, overflowKey)
    self.resultObjects[lib_id] = []

    metaLib = self.metaLibs[lib_id]
    lib_vulns = self.scanResult[lib_id]

    for memory in lib_vulns.indexes
        for value in lib_vulns[memory]
            result = metaLib.overflow(memory, value, overflowKey)
            if result and typeof(result) != "number" then
                if typeof(result) == "file" then
                    file = new FileHandler
                    file.updateFileObject(result)
                    self.resultObjects[lib_id].push(file)
                end if
                if typeof(result) == "computer" then
                    computer = new ComputerHandler
                    computer.updateComputerObject(result)
                    self.resultObjects[lib_id].push(computer)
                end if
                if typeof(result) == "shell" then
                    shell = new ShellHandler
                    shell.updateShellObject(result)
                    self.resultObjects[lib_id].push(shell)
                end if 
            end if
        end for
    end for
end function

// Prints all successful attacks for provided library id.
Exploiter.printVulns = function(lib_id)
	print("Listing stored vulns for: " + lib_id)
	info = ""
	for i in range(0, self.resultObjects[lib_id].len - 1, 1)
		info = info + (str(i) + ": " + self.resultObjects[lib_id][i].getPerms + "    " + typeof(self.resultObjects[lib_id][i].getObject).color("blue") + "    " + self.resultObjects[lib_id][i].getLANIP + "\n")
	end for
	print(format_columns(info))
end function

Exploiter.handleInput = function(input)
	if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
		
	func = @self.inputMap[input[0]]
	if @func == null then return
	return func(self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: RevShellServer.gs
// RevShellServer class. Provides methods for working with reverse shells and allows Vexxed to interface with them.
RevShellServer = {}

RevShellServer.clients = []

RevShellServer.inputMap = {}

RevShellServer.inputMap["list"] = function(objRef, args)
    objRef.listClients
end function

RevShellServer.inputMap["refresh"] = function(objRef, args)
    objRef.updateClients(get_custom_object.vexxed["remoteMetax"])
end function

RevShellServer.inputMap["use"] = function(objRef, args)
    if args.len < 2 then
        print("Usage: use <index>")
        return
    end if

    shell = new ShellHandler
    objRef.setActiveClient(args[1].to_int, shell)
    if shell.getObject then session.vexxed["session"].addHandler(shell)
end function

RevShellServer.inputMap["install"] = function(objRef, args)
    objRef.installServer
end function

RevShellServer.inputMap["connect"] = function(objRef, args)
    if args.len < 3 then
        print("Usage: connect <ip> <port> <proc=Terminal.exe>")
        return
    end if
    if not args.hasIndex(3) then args[3] = "Terminal.exe"
    objRef.startClient(args[1], args[2].to_int, args[3])
end function

RevShellServer.getClients = function(metaxLib)
    return metaxLib.rshell_server
end function

RevShellServer.updateClients = function(metaxLib)
    self.clients = self.getClients(metaxLib)
    if self.clients isa list then
        print("Clients updated successfully.")
    else
        print(self.clients)
    end if
end function

RevShellServer.listClients = function()
    if self.clients.len == 0 or self.clients isa string then
        print("No shells connected.")
        return
    end if
    for i in range(0, self.clients.len - 1)
		print("\n<b>Shell (" + (i) + ")</b>\nPublic IP: " + self.clients[i].host_computer.public_ip + "\nLocal IP: " + self.clients[i].host_computer.local_ip)
	end for
end function

RevShellServer.setActiveClient = function(index, shellObj)
    if self.clients[index] and self.clients isa list then
        shellObj.updateShellObject(self.clients[index])
    else 
        print("Shell at index " + index + " does not exist.")
    end if
end function

RevShellServer.installServer = function()
    SessionManager.currHandler.putFile("/root/VulnLibs/librshell.so")
    rshelld = include_lib(current_path + "librshell.so")
    if not rshelld then 
        print("Failed to install reverse shell server.")
        return
    end if

    result = rshelld.install_service
    if result != true then
        print("Error installing rshell: " + result)
    end if
end function

RevShellServer.startClient = function(ip, port, proc)
    session.vexxed["remoteMetax"].rshell_client(ip, port, proc)
end function

RevShellServer.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
            
    func = @self.inputMap[input[0]]
    if @func == null then return
    return func(self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: Engine.gs
// Engine class. Forwards input to appropriate methods in different classes and serves as the main program logic.
Engine = {}

Engine.startEngine = function()
    self.printSplash
    self.promptPassword
    self.loadSession
    session.vexxed["exploiter"].loadResult
    shell = new ShellHandler
    shell.updateShellObject(get_shell)
    session.vexxed["session"].addHandler(shell)
	RevShellServer.updateClients(session.vexxed["remoteMetax"])
    self.promptUser
end function

Engine.loadSession = function()
    if get_custom_object.hasIndex("vexxed") then
        print("Session found. Importing objects...")
        SessionManager.importSession
        return
    end if

    print("No session found or running from home. Creating new session...")
    SessionManager.initSession
end function

Engine.printSplash = function()
    print("\n ___      ___  _______  ___  ___  ___  ___  _______  ________   ")
    print("|""  \    /""  |/""     ""||""  \/""  ||""  \/""  |/""     ""||""      ""\  ")
    print(" \   \  //  /(: ______) \   \  /  \   \  /(: ______)(.  ___  :) ")
    print("  \\  \/. ./  \/    |    \\  \/    \\  \/  \/    |  |: \   ) || ")
    print("   \.    //   // ___)_   /\.  \    /\.  \  // ___)_ (| (___\ || ")
    print("    \\   /   (:      ""| /  \   \  /  \   \(:      ""||:       :) ")
    print("     \__/     \_______)|___/\___||___/\___|\_______)(________/  ")
end function

Engine.promptPassword = function()
    input = user_input("Password: ", 1)
	if input != "qr8HTwSQJkG14Ij9YQOFA6d1!z2$uj4q" then
		// TODO: Alert me when incorrect password is entered, maybe take other measures
		exit("Wrong password, nice try.")
	end if
end function

Engine.promptUser = function()
    while true
        input = user_input("[" + session.vexxed["session"].currHandler.displayID + ":" + session.vexxed["session"].currHandler.getPubIP + ":" + session.vexxed["session"].currHandler.getLANIP + "] " + session.vexxed["session"].currHandler.fileObject.path + "# ")
        self.handleInput(input)
    end while
end function

Engine.handleInput = function(input)
    if input == "exit" then
        exit("Exiting program.")
    end if

    input = input.split("\|")
    for command in input
        command = command.trim.split(" ")
        command = command.wherenot("len", 0) // Remove empty strings

        if command[0] == "enumerate" and command.len == 2 then
            Enumerator.fullEnumerate(command[1])
        end if
        
		if command[0] == "revshell" then
			RevShellServer.handleInput(command[1:])
			continue
		end if
		
        self.handleOutput(session.vexxed["exploiter"].handleInput(command))
        self.handleOutput(session.vexxed["session"].handleInput(command))
        self.handleOutput(session.vexxed["session"].currHandler.handleInput(command))

        if command[0] == "dumpcob" then
            for i in session.indexes
                print(session[i])
            end for
        end if 
    end for
end function

Engine.handleOutput = function(output)
    if typeof(output) == "string" then
        print(output)
    else if output != null then
        print(output.toString)
    end if
end function

////////////////////////////////////////////////////////////////////////////////////

Engine.startEngine
