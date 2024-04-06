import_code("/lib/SessionManager.gs")

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
    print(objRef.getFiles)
end function

FileHandler.inputMap["cat"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    print(objRef.readFile(fileName))
end function

FileHandler.inputMap["rm"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    objRef.deleteFile(fileName)
end function

FileHandler.inputMap["cd"] = function(objRef, args)
    if args.len > 1 then command = args[1] else command = "var"

    objRef.changeFile(command)
end function

FileHandler.inputMap["cp"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "system.log"
    if args.len > 2 then filePath = args[2] else filePath = "/var/"
    if args.len > 3 then newName = args[3] else newName = fileName

    objRef.copyFile(fileName, filePath, newName)
end function

FileHandler.inputMap["mv"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "/home/guest/"
    if args.len > 2 then fileName = args[2] else fileName = "newfile"
    if args.len > 3 then newName = args[3] else newName = fileName

    objRef.moveFile(fileName, filePath, newName)
end function

FileHandler.inputMap["getText"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    objRef.getTextFile(fileName)
end function

FileHandler.inputMap["chmod"] = function(objRef, args)
    if args.len > 1 then newPerms = args[1] else newPerms = "o+rwx"
    if args.len > 2 then recursive = args[2].to_int else recursive = 0

    objRef.changePerms(newPerms, recursive)
end function

FileHandler.inputMap["write"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "fstab"
    if args.len > 2 then content = args[2] else content = "rosebud"

    objRef.writeFile(fileName, content)
end function

FileHandler.inputMap["logwipe"] = function(objRef, args)
    objRef.logWipe
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

// Prints out files and folders in File object's directory.
FileHandler.getFiles = function()
    for file in self.fileObject.get_files
        print(file.permissions + " " + file.group + " " + file.owner + " " + file.size + " " + file.name)
    end for
    
    for folder in self.fileObject.get_folders
        print(folder.permissions + " " + folder.group + " " + folder.owner + " " + folder.size + " " + folder.name)
    end for

    return true
end function

// Returns content of specified file. Needs to be in current directory.
FileHandler.readFile = function(fileName)
    return self.fileObject.get_files.first("name", fileName).get_content
end function

FileHandler.writeFile = function(fileName, content)
    return self.fileObject.get_files.first("name", fileName).set_content(content)
end function

// Deletes the file if it exists.
FileHandler.deleteFile = function(fileName)
    if self.fileObject.get_files.first("name", fileName) then
        result = self.fileObject.get_files.first("name", fileName).delete
        if result != "" then print("Error deleting file: " + result)
        return
    end if
    print("File does not exist.")
end function

// Changes directory appropriately. Currently only supports ".." (parent) or directory name.
FileHandler.changeFile = function(command)
    if command == ".." then
        self.fileObject = self.fileObject.parent
    else
        if self.fileObject.get_folders.first("name", command) then
            self.fileObject = self.fileObject.get_folders.first("name", command)
        else
            print("Directory does not exist.")
        end if
    end if

    self.updateFilePath
end function

FileHandler.moveFile = function(fileName, filePath, newName)
    result = self.fileObject.get_files.first("name", fileName).move(filePath, newName)
    if result != true then print("Error moving file: " + result)
end function

FileHandler.copyFile = function(fileName, filePath, newName)
    result = self.fileObject.get_files.first("name", fileName).copy(filePath, newName)
    if result != true then print("Error copying file: " + result)
end function

FileHandler.getTextFile = function(fileName)
    fileText = self.fileObject.get_files.first("name", fileName).get_content
    session.vexxed["homeShell"].host_computer.touch("/root/Loot/", fileName)
    session.vexxed["homeShell"].host_computer.File("/root/Loot/" + fileName).set_content(fileText)
    print("File copied to /root/Loot/" + fileName)
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
        self.changeFile("..")
    end while
end function

FileHandler.changePerms = function(newPerms, recursive = 0)
    result = self.fileObject.chmod(newPerms, recursive)

    if result == "" then
        print("Error changing permissions: " + result)
    else
        print("Success.")
    end if
end function

FileHandler.logWipe = function()
    if self.getPerms != "root" then
        print("Root required to wipe logs.")
        return
    end if
    self.toRoot
    self.changeFile("etc")
    self.writeFile("fstab", "rosebud")
    self.copyFile("fstab", "/var/", "system.log")
    self.writeFile("fstab", "")
    print("Logs wiped.")
end function

// As inputMap is updated in better objects, more commands can be used
FileHandler.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then // Empty input or invalid command?
        return
    end if

    self.inputMap[input[0]](self, input)
end function
