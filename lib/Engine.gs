import_code("/lib/ShellHandler.gs")
import_code("/lib/Enumerator.gs")
import_code("/lib/Exploiter.gs")
import_code("/lib/RevShellServer.gs")

// Engine class. Forwards input to appropriate methods in different classes and serves as the main program logic.
Engine = {}

Engine.startEngine = function()
    self.printSplash
    self.promptPassword
    Exploiter.loadResult
    shell = new ShellHandler
    shell.updateShellObject(get_shell)
    SessionManager.addHandler(shell)
	RevShellServer.updateClients
    self.promptUser
end function

Engine.printSplash = function()
    print("\n ___      ___  _______  ___  ___  ___  ___  _______  ________   ")
    print("|""  \    /""  |/""     ""||""  \/""  ||""  \/""  |/""     ""||""      ""\  ")
    print(" \   \  //  /(: ______) \   \  /  \   \  /(: ______)(.  ___  :) ")
    print("  \\  \/. ./  \/    |    \\  \/    \\  \/  \/    |  |: \   ) || ")
    print("   \.    //   // ___)_   /\.  \    /\.  \  // ___)_ (| (___\ || ")
    print("    \\   /   (:      ""| /  \   \  /  \   \(:      ""||:       :) ")
    print("     \__/     \_______)|___/\___||___/\___|\_______)(________/  ")
end function

Engine.promptPassword = function()
    input = user_input("Password: ", 1)
	if input != "qr8HTwSQJkG14Ij9YQOFA6d1!z2$uj4q" then
		// TODO: Alert me when incorrect password is entered, maybe take other measures
		exit("Wrong password, nice try.")
	end if
end function

Engine.promptUser = function()
    while true
        input = user_input("[" + SessionManager.currHandler.displayID + ":" + SessionManager.currHandler.getPubIP + ":" + SessionManager.currHandler.getLANIP + "] " + SessionManager.currHandler.fileObject.path + "# ")
        self.handleInput(input)
    end while
end function

Engine.handleInput = function(input)
    if input == "exit" then
        exit("Exiting program.")
    end if

    input = input.split("\|")
    for command in input
        command = command.trim.split(" ")
    
        if command[0] == "target" and command.len >= 3 then
            overflowKey = "secstream"
            if command.len >= 4 then overflowKey = command[3]

            SessionManager.setCurrLib(Exploiter.scanPort(command[1], command[2].to_int))
            
            Exploiter.crackLib(SessionManager.currLib, overflowKey)

            Exploiter.printVulns(SessionManager["currLib"])
        end if

        if command[0] == "use" and command.len == 2 then
            SessionManager.addHandler(Exploiter.resultObjects[SessionManager.currLib][command[1].to_int])
        end if

        if command[0] == "enumerate" and command.len == 2 then
            Enumerator.fullEnumerate(command[1])
        end if

        if command[0] == "local" and command.len >= 2 then
            metaLib = Exploiter.loadLib(command[1])

            if metaLib then
                overflowKey = "secstream"
                if command.len >= 3 then overflowKey = command[2]

                SessionManager.setCurrLib(Exploiter.scanLib(metaLib))

                Exploiter.crackLib(SessionManager.currLib, overflowKey)

                Exploiter.printVulns(SessionManager.currLib)
            end if
        end if

		if command[0] == "revshell" and command.len >= 2 then
			RevShellServer.handleInput(command[1:])
		end if

        SessionManager.handleInput(command)
        SessionManager.currHandler.handleInput(command)
    end for
end function
