import_code("/lib/ComputerHandler.gs")

// ShellHandler class. Inherits ComputerHandler and implements ready-made methods for stored Shell object.
ShellHandler = new ComputerHandler

ShellHandler.shellObject = null

ShellHandler.classID = "ShellHandler"

ShellHandler.displayID = "Shell"

ShellHandler.inputMap = new ComputerHandler.inputMap // Again, don't just access the prototype, create a new object.

ShellHandler.inputMap["shell"] = function(objRef, args)
    objRef.dropShell
end function

ShellHandler.inputMap["get"] = function(objRef, args)
    if args.len > 1 then return objRef.getFile(args[1]) else return "Usage: get [filename]"
end function

ShellHandler.inputMap["put"] = function(objRef, args)
    if args.len > 1 then return objRef.putFile(args[1]) else return "Usage: put [filepath]"
end function

ShellHandler.inputMap["build"] = function(objRef, args)
    if args.len > 3 then return objRef.buildFile(args[1], args[2], args[3]) else return "Usage: build [srcPath] [binPath] [canImport]"
end function

ShellHandler.inputMap["launch"] = function(objRef, args)
    if args.len == 2 then return objRef.launchFile(args[1], "")
	if args.len > 2 then return objRef.launchFile(args[1], args[2:].join(" ")) else return "Usage: launch [filePath] [args]"
end function

ShellHandler.inputMap["sudo"] = function(objRef, args)
    if args.len > 2 then return objRef.trySudo(userName, userPass) else return "Usage: sudo [username] [password]"
end function

ShellHandler.inputMap["connect"] = function(objRef, args)
    if args.len > 4 then return objRef.connectService(ip, port, username, userPass) else return "Usage: connect [ip] [port] [username] [password]"
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
