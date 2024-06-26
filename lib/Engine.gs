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
	RevShellServer.updateClients(session.vexxed["revMetax"])
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
	if input != "" then // Put the password you want here
		// TODO: Alert me when incorrect password is entered, maybe take other measures
		exit("Wrong password, nice try.")
	end if
end function

Engine.promptUser = function()
    while true
        input = user_input("[" + session.vexxed["session"].currHandler.displayID + ":" + session.vexxed["session"].currHandler.getPubIP + ":" + session.vexxed["session"].currHandler.getLANIP + " " + session.vexxed["session"].sessionStack.len + "] " + session.vexxed["session"].currHandler.fileObject.path + "# ")
        self.handleInput(input.trim)
    end while
end function

Engine.handleInput = function(input)
    if input == "exit" then
        session.vexxed["session"].exitLayer
        exit("Exiting...")
    end if
    if input == "clear" then clear_screen

    input = input.split("\|")
    for command in input
        command = command.trim.split(" ")
        command = command.wherenot("len", 0) // Remove empty strings

        // Check if command is empty
        if command.len == 0 then continue

        if self.checkRepeat then
            interval = user_input("ExploitReport found. Please specify repeat interval in seconds: ")
            if interval.trim == "" then interval = 1 else interval = interval.trim.to_num
        end if
    	
        while true
            self.handleOutput(Enumerator.handleInput(command))
            self.handleOutput(RevShellServer.handleInput(command[1:]))
            self.handleOutput(session.vexxed["exploiter"].handleInput(command))
            self.handleOutput(session.vexxed["session"].handleInput(command))
            self.handleOutput(session.vexxed["session"].currHandler.handleInput(command))

            if self.checkRepeat then
                if typeof(interval) == "string" then
                    print("Invalid interval. Please specify a number.")
                    break
                end if
                wait(interval)
            else
                break
            end if
        end while

        if command[0] == "dumpcob" then
            for i in session.indexes
                print(session[i])
            end for
        end if
    end for
end function

Engine.checkRepeat = function()
    ps = session.vexxed["homeShell"].host_computer.show_procs.split(char(10))[1:]

    for p in ps
        parsed = p.split(" ")
        if parsed[4:5][0].trim == "ExploitReport" then
            return true
        end if
    end for

    return false
end function

Engine.handleOutput = function(output)
    if typeof(output) == "string" then
        print(output)
    else if output != null then
        print(output.toString)
    end if
end function
