// ComputerHandler class. Inherits FileHandler methods and implements ready-made methods for stored Computer object.
ComputerHandler = new FileHandler

ComputerHandler.computerObject = null

ComputerHandler.classID = "ComputerHandler"

ComputerHandler.displayID = "Computer"

ComputerHandler.inputMap = new FileHandler.inputMap // Don't just access the prototype, create a new object. Learned that the hard way :(

ComputerHandler.inputMap["ps"] = function(objRef, args)
    return objRef.getProcesses
end function

ComputerHandler.inputMap["ifconfig"] = function(objRef, args)
    return objRef.netInfo
end function

ComputerHandler.inputMap["kill"] = function(objRef, args)
    if args.len > 1 then return objRef.closeProcess(args[1].to_int) else return "Usage: kill [pid]"
end function

ComputerHandler.inputMap["useradd"] = function(objRef, args)
    if args.len > 2 then return objRef.userAdd(args[1], args[2]) else return "Usage: useradd [username] [password]"
end function

ComputerHandler.inputMap["passwd"] = function(objRef, args)
    if args.len > 2 then return objRef.changePass(args[1], args[2]) else return "Usage: passwd [username] [password]"
end function

ComputerHandler.inputMap["touch"] = function(objRef, args)
    if args.len > 1 then return objRef.createFile(objRef.fileObject.path, args[1]) else return "Usage: touch [filename]"
end function

ComputerHandler.inputMap["mkdir"] = function(objRef, args)
    if args.len > 1 then return objRef.createFolder(objRef.fileObject.path, args[1]) else return "Usage: mkdir [foldername]"
end function

ComputerHandler.inputMap["iwlist"] = function(objRef, args)
    if args.len > 1 then return objRef.getWiFiObjects(args[1]) else return "Usage: iwlist [interface]"
end function

ComputerHandler.getObject = function()
    return self.computerObject
end function

// Updates with respective Computer object, then updates File object with respective path.
ComputerHandler.updateComputerObject = function(computerObject)
    self.computerObject = computerObject
    if self.fileObject then self.updateFileObject(computerObject.File(self.fileObject.path)) else self.updateFileObject(computerObject.File("/"))
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

ComputerHandler.netInfo = function()
    return "Local IP: " + self.getLANIP + "\nPublic IP: " + self.getPubIP + "\nActive card: " + self.getActiveCard + "\nInterfaces:\n" + self.getInterfaces
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
