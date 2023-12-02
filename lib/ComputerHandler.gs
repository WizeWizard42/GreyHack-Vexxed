import_code("/lib/FileHandler.gs")

// ComputerHandler class. Inherits FileHandler methods and implements ready-made methods for stored Computer object.
ComputerHandler = new FileHandler

ComputerHandler.computerObject = null

ComputerHandler.classID = "ComputerHandler"

ComputerHandler.displayID = "Computer"

ComputerHandler.inputMap["ps"] = function(objRef, args)
    print(objRef.getProcesses)
end function

ComputerHandler.inputMap["kill"] = function(objRef, args)
    if args.len > 1 then pid = args[1] else pid = "0"

    objRef.closeProcess(pid.to_int)
end function

ComputerHandler.inputMap["useradd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"

    objRef.userAdd(username, "secretpassword")
end function

ComputerHandler.inputMap["passwd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"
    if args.len > 2 then pass = args[2] else pass = "secretpasswd"

    objRef.changePass(username, pass)
end function

ComputerHandler.inputMap["touch"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "file.txt"

    objRef.createFile(objRef.fileObject.path, fileName)
end function

ComputerHandler.inputMap["mkdir"] = function(objRef, args)
    if args.len > 1 then folder = args[1] else folder = "dir"

    objRef.createFolder(objRef.fileObject.path, folder)
end function

ComputerHandler.inputMap["iwlist"] = function(objRef, args)
    if args.len > 1 then interface = args[1] else interface = "wlan0"

    objRef.getWiFiObjects(interface)
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
    if result isa string then
        print("Error killing process: " + result)
    end if
end function

// Adds a user, using stored Computer.
ComputerHandler.userAdd = function(username, password)
    result = self.computerObject.create_user(username, password)
    if result isa string then
        print("Error adding user: " + result)
    end if
end function

ComputerHandler.changePass = function(username, password)
    result = self.computerObject.change_password(username, password)
    if result isa string then
        print("Error changing password: " + result)
    end if
end function

// Creates a file, like "touch".
ComputerHandler.createFile = function(path, fileName)
    result = self.computerObject.touch(path, fileName)
    if result isa string then
        print("Error creating file: " + result)
    end if
end function

ComputerHandler.createFolder = function(path, folder)
    result = self.computerObject.create_folder(path, folder)
    if result isa string then
        print("Error creating folder: " + result)
    end if
end function

ComputerHandler.getWiFiObjects = function(interface)
    networks = computer.wifi_networks(interface)
    if networks == null then
        print("Interface does not exist.")
        return
    end if

    info = "BSSID PWR ESSID"
    for network in networks
        info = info + "\n" + network
    end for
    print(format_columns(info))
end function

ComputerHandler.getLANIP = function()
    return self.computerObject.local_ip
end function

ComputerHandler.getPubIP = function()
    return self.computerObject.public_ip
end function
