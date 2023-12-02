// SessionManager class. Handles script state and manages modifications to user session.
// TODO: Method for loading and saving a config file
SessionManager = {}

SessionManager.currHandler = null

SessionManager.handlerStack = []

SessionManager.currLib = {}

SessionManager.inputMap = {}

SessionManager.inputMap["pop"] = function(objRef, args)
    if objRef.handlerStack.len > 1 then
        objRef.handlerStack = objRef.handlerStack[:-1]
        objRef.updateCurrHandler()
    else
        print("Error: cannot pop local shell.")
    end if
end function

SessionManager.inputMap["hstack"] = function(objRef, args)
    for handler in objRef.handlerStack
        print(handler.classID() + ": " + handler.getLANIP())
    end for
end function

SessionManager.updateCurrHandler = function()
    self.currHandler = self.handlerStack[-1]
end function

SessionManager.addHandler = function(handler)
    self.handlerStack.push(handler)
    self.updateCurrHandler()
end function

SessionManager.setCurrLib = function(val)
    self.currLib = val
end function

SessionManager.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then // Empty input or invalid command?
        return
    end if

    self.inputMap[input[0]](self, input)
end function
