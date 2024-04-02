import_code("/lib/ShellHandler.gs")

// RevShellServer class. Provides methods for working with reverse shells and allows Vexxed to interface with them.
RevShellServer = {}

RevShellServer.clients = []

RevShellServer.inputMap = {}

RevShellServer.inputMap["list"] = function(objRef, input)
    objRef.listClients
end function

RevShellServer.inputMap["refresh"] = function(objRef, input)
    objRef.updateClients(get_custom_object.vexxed["remoteMetax"])
end function

RevShellServer.inputMap["use"] = function(objRef, input)
    if input.len < 2 then
        print("Usage: use <index>")
        return
    end if

    shell = new ShellHandler
    objRef.setActiveClient(input[1].to_int, shell)
    if shell.getObject then SessionManager.addHandler(shell)
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

RevShellServer.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
    self.inputMap[input[0]](self, input)
end function
