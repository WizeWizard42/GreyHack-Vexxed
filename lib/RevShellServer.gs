import_code("/lib/ShellHandler.gs")

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
