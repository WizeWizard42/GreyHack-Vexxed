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
    if args.len > 1 then fileName = args[1] else fileName = "system.log"

    objRef.putFile(fileName)
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
    result = self.shellObject.scp(remotePath, current_path, get_shell)
    if result isa string then
        print("Error downloading file: " + result)
    end if
end function

// Uploads specified file in "/root/UploadFiles" to remote Shell.
ShellHandler.putFile = function(fileName)
    localPath = "/root/UploadFiles" + "/" + fileName
    result = get_shell.scp(localPath, self.fileObject.path, self.shellObject)
    if result isa string then
        print("Error uploading file: " + result)
    end if
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
        SessionManager.addHandler(shell)
    end if
end function
