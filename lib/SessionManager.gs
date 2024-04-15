// SessionManager class. Handles script state and manages modifications to user session.
// TODO: Method for loading and saving a config file
SessionManager = {}

SessionManager.currHandler = null

SessionManager.handlerStack = []

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
    for handler in objRef.handlerStack
        if handler == objRef.currHandler then
            print("* " + handler.classID() + ": " + handler.getLANIP())
        else
            print(handler.classID() + ": " + handler.getLANIP())
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

SessionManager.initSession = function()
    session.vexxed = {}
    session.vexxed["session"] = self
    session.vexxed["exploiter"] = globals.Exploiter
    session.vexxed["homeShell"] = get_shell
    session.vexxed["remoteShell"] = get_shell
    session.vexxed["homeMetax"] = metaxploit
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["homeCrypto"] = crypto
end function

SessionManager.importSession = function()
    session.vexxed["remoteMetax"] = metaxploit
    session.vexxed["remoteShell"] = get_shell
end function

SessionManager.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then return
        
    func = @self.inputMap[input[0]]
    if func == null then return
    return func(self, input)
end function
