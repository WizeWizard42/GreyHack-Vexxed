import_code("/lib/ShellHandler.gs")

// RevShellServer class. Provides methods for working with reverse shells and allows Vexxed to interface with them.
RevShellServer = {}

RevShellServer.clients = []

RevShellServer.getClients = function()
    return metaxploit.rshell_server
end function

RevShellServer.updateClients = function()
    self.clients = self.getClients
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
    if input[0] == "list" then
        self.listClients
    else if input[0] == "refresh" then
        self.updateClients
    else if input[0].to_int isa number and input[0].to_int >= 0 then
        shell = new ShellHandler
        self.setActiveClient(input[0].to_int, shell)

        if shell.getObject then
            SessionManager.addHandler(shell)
        end if
    end if
end function
