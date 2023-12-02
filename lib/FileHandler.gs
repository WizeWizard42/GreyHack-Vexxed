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

FileHandler.inputMap["mv"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "/home/guest"
    if args.len > 2 then fileName = args[2] else fileName = "newfile"

    objRef.moveFile(filePath, fileName)
end function

FileHandler.inputMap["chmod"] = function(objRef, args)
    if args.len > 1 then newPerms = args[1] else newPerms = "o+rwx"
    if args.len > 2 then recursive = args[2].to_int else recursive = 0

    objRef.changePerms(newPerms, recursive)
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
    for file in self.fileObject.get_files
        if file.name == fileName then
            return file.get_content
        end if
    end for
end function

// Deletes the file if it exists.
FileHandler.deleteFile = function(fileName)
    for file in self.fileObject.get_files
        if file.name == fileName then
            file.delete
            return
        end if
    end for
end function

// Changes directory appropriately. Currently only supports ".." (parent) or directory name.
FileHandler.changeFile = function(command)
    if command == ".." then
        self.fileObject = self.fileObject.parent
    else
        for folder in self.fileObject.get_folders
            if folder.name == command then
                self.fileObject = folder
                break
            end if		
        end for
    end if

    self.updateFilePath
end function

FileHandler.moveFile = function(filePath, fileName)
    result = self.fileObject.move(filePath, fileName)
    if result isa string then
        print("Error moving file: " + result)
    end if
end function

FileHandler.getLANIP = function()
    return "N/A"
end function

FileHandler.getPubIP = function()
    return "N/A"
end function

// Tries to return an object's appropriate level of permission.
FileHandler.getPerms = function()
    while self.filePath != [""]
        self.changeFile("..")
    end while
    self.changeFile("var")
    for file in self.fileObject.get_files
        if file.name == "system.log" then
            if file.has_permission("w") then
                return "root"
            end if

            if file.has_permission("r") then
                return "user"
            end if

            return "guest"
        end if
    end for
    return "guest"
end function

FileHandler.changePerms = function(newPerms, recursive = 0)
    result = self.fileObject.chmod(newPerms, recursive)

    if result == "" then
        print("Error changing permissions: " + result)
    else
        print("Success.")
    end if
end function

// As inputMap is updated in better objects, more commands can be used
FileHandler.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then // Empty input or invalid command?
        return
    end if

    self.inputMap[input[0]](self, input)
end function
