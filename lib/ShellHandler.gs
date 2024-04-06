import_code("/lib/ComputerHandler.gs")

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
    if args.len > 3 then canImport = args[3] else canImport = 0

    objRef.buildFile(srcPath, binPath, canImport)
end function

ShellHandler.inputMap["launch"] = function(objRef, args)
	if args.len > 1 then filePath = args[1] else filePath = "/home/guest/dddd"
	if args.len > 2 then launchParams = args[2:].join(" ") else launchParams = ""

	objRef.launchFile(filePath, launchParams)
end function

ShellHandler.inputMap["sudo"] = function(objRef, args)
    if args.len > 1 then userName = args[1] else userName = "root"
    if args.len > 2 then userPass = args[2] else userPass = "root"

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
    result = get_shell(userName, userPass)
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
