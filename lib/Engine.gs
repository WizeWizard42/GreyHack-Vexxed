import_code("/lib/ShellHandler.gs")
import_code("/lib/Enumerator.gs")
import_code("/lib/Exploiter.gs")
import_code("/lib/RevShellServer.gs")

// Engine class. Forwards input to appropriate methods in different classes and serves as the main program logic.
Engine = {}

Engine.startEngine = function()
    self.printSplash
    self.promptPassword
    self.loadSession
    session.vexxed["exploiter"].loadResult
    shell = new ShellHandler
    shell.updateShellObject(get_shell)
    session.vexxed["session"].addHandler(shell)
	RevShellServer.updateClients(session.vexxed["remoteMetax"])
    self.promptUser
end function

Engine.loadSession = function()
    if get_custom_object.hasIndex("vexxed") then
        print("Session found. Importing objects...")
        SessionManager.importSession
        return
    end if

    print("No session found or running from home. Creating new session...")
    SessionManager.initSession
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
        input = user_input("[" + session.vexxed["session"].currHandler.displayID + ":" + session.vexxed["session"].currHandler.getPubIP + ":" + session.vexxed["session"].currHandler.getLANIP + "] " + session.vexxed["session"].currHandler.fileObject.path + "# ")
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
        command = command.wherenot("len", 0) // Remove empty strings

        if command[0] == "enumerate" and command.len == 2 then
            Enumerator.fullEnumerate(command[1])
        end if
        
		if command[0] == "revshell" then
			RevShellServer.handleInput(command[1:])
			continue
		end if
		
        self.handleOutput(session.vexxed["exploiter"].handleInput(command))
        self.handleOutput(session.vexxed["session"].handleInput(command))
        self.handleOutput(session.vexxed["session"].currHandler.handleInput(command))

        if command[0] == "dumpcob" then
            for i in session.indexes
                print(session[i])
            end for
        end if 
    end for
end function

Engine.handleOutput = function(output)
    if typeof(output) == "string" then
        print(output)
    else if output != null then
        print(output.toString)
    end if
end function
