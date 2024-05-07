// SessionManager class. Handles script state and manages modifications to user session.
// TODO: Method for loading and saving a config file
globals.session = @get_custom_object

SessionManager = {}

SessionManager.currHandler = null

SessionManager.handlerStack = []

SessionManager.sessionStack = []

SessionManager.currLib = {}

SessionManager.inputMap = {}

SessionManager.inputMap["pop"] = function(objRef, args)
    if args.len > 1 then index = args[1] else index = -1
    if objRef.handlerStack.len < 2 or index == 0 then return GenericError.create("Error: cannot pop local shell.")
    objRef.handlerStack.remove(index)
    // If current handler was in stack, update it
    if not objRef.handlerStack.indexOf(objRef.currHandler) then
        objRef.updateCurrHandler(-1)
    end if
end function

SessionManager.inputMap["hstack"] = function(objRef, args)
    for i in range(0, objRef.handlerStack.len - 1)
        handler = objRef.handlerStack[i]
        if handler.UID == objRef.currHandler.UID then
            print(i + "* " + handler.classID + ": " + handler.getPubIP + " " + handler.getLANIP)
        else
            print(i + " " + handler.classID + ": " + handler.getPubIP + " " + handler.getLANIP)
        end if
    end for
end function

SessionManager.inputMap["use"] = function(objRef, args)
    if args.len < 2 then return "Usage: use [index]"
    objRef.addHandler(session.vexxed["exploiter"].resultObjects[session.vexxed["session"].currLib][args[1].to_int])
end function

SessionManager.inputMap["switch"] = function(objRef, args)
    if args.len < 2 then
        print("Error: switch requires a handler index.")
        return
    end if
    objRef.updateCurrHandler(args[1].to_int)
end function

SessionManager.updateCurrHandler = function(index)
    self.currHandler = self.handlerStack[index]
end function

SessionManager.addHandler = function(handler)
    self.handlerStack.push(handler)
    self.updateCurrHandler(-1)
end function

SessionManager.setCurrLib = function(val)
    self.currLib = val
end function

SessionManager.initSession = function() // Call this method with SessionManager, not cob reference. Cob reference is relative to the home system!!!
    globals.aptclient = include_lib(current_path + "/aptclient.so")
    if not aptclient then exit("Could not import aptclient. Exiting.")

    // Update and install metaxploit.so and crypto.so with aptclient
    aptclient.update
    if get_shell.host_computer.File(current_path + "/metaxploit.so") == null or aptclient.check_upgrade(current_path + "/metaxploit.so") == true then aptclient.install("metaxploit.so", current_path)
    if get_shell.host_computer.File(current_path + "/crypto.so") == null or aptclient.check_upgrade(current_path + "/crypto.so") == true then aptclient.install("crypto.so", current_path)
    globals.metaxploit = include_lib(current_path + "/metaxploit.so")
    globals.crypto = include_lib(current_path + "/crypto.so")
    if not metaxploit then exit("Could not import metaxploit. Exiting.")
    if not crypto then exit("Could not import crypto. Exiting.")

    session.vexxed = {}
    session.vexxed["session"] = self
    session.vexxed["exploiter"] = globals.Exploiter
    session.vexxed["homeShell"] = get_shell
    session.vexxed["remoteShell"] = get_shell
    session.vexxed["homeMetax"] = metaxploit
    session.vexxed["revMetax"] = metaxploit
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["homeCrypto"] = crypto
    session.vexxed["remoteCrypto"] = crypto
end function

SessionManager.importSession = function() // Call this method with SessionManager, not cob reference. Cob reference is relative to the home system!!!
    globals.metaxploit = include_lib(current_path + "/metaxploit.so")
    globals.crypto = include_lib(current_path + "/crypto.so")
    if not metaxploit then exit("Could not import metaxploit. Exiting.")
    if not crypto then exit("Could not import crypto. Exiting.")

    sessionLayer = {}
    sessionLayer["remoteMetax"] = session.vexxed["remoteMetax"]
    sessionLayer["remoteCrypto"] = session.vexxed["remoteCrypto"]
    sessionLayer["remoteShell"] = session.vexxed["remoteShell"]
    session.vexxed["session"].sessionStack.push(sessionLayer)
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["remoteCrypto"] = crypto
    session.vexxed["remoteShell"] = get_shell
end function

SessionManager.exitLayer = function()
    if self.sessionStack.len == 0 then
        print("No previous layer to return to. Returning to terminal.")
        return
    end if
    
    // Restore the previous layer's session objects
    sessionLayer = self.sessionStack.pop()
    session.vexxed["remoteMetax"] = sessionLayer["remoteMetax"]
    session.vexxed["remoteCrypto"] = sessionLayer["remoteCrypto"]
    session.vexxed["remoteShell"] = sessionLayer["remoteShell"]
end function

SessionManager.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasMethod(input[0]) then return
                
    func = @self.inputMap[input[0]]
    return func(self, input)
end function
