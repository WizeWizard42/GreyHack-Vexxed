import_code("/lib/FileError.gs")

GenericComputerError = new GenericError
GenericComputerError.classID = "GenericComputerError"
GenericComputerError.message = "An error with a computer object has occurred."
GenericComputerError.create = function()
    return new GenericComputerError
end function

ComputerProcError = new GenericComputerError
ComputerProcError.classID = "ComputerProcError"
ComputerProcError.message = "Error killing a process."
ComputerProcError.pid = 0
ComputerProcError.reason = ""
ComputerProcError.create = function(pid = 0, reason = "")
    error = new ComputerProcError
    error.message = "Error killing process: " + pid + ": " + reason
    error.pid = pid
    error.reason = reason
    return error
end function

ComputerUserAddError = new GenericComputerError
ComputerUserAddError.classID = "ComputerUserAddError"
ComputerUserAddError.message = "Error adding a user."
ComputerUserAddError.username = ""
ComputerUserAddError.password = ""
ComputerUserAddError.reason = ""
ComputerUserAddError.create = function(username = "", password = "", reason = "")
    error = new ComputerUserAddError
    error.message = "Error adding user " + username + " with password " + password + ": " + reason
    error.username = username
    error.password = password
    error.reason = reason
    return error
end function

ComputerUserRemoveError = new GenericComputerError
ComputerUserRemoveError.classID = "ComputerUserRemoveError"
ComputerUserRemoveError.message = "Error removing a user."
ComputerUserRemoveError.username = ""
ComputerUserRemoveError.reason = ""
ComputerUserRemoveError.create = function(username = "", reason = "")
    error = new ComputerUserRemoveError
    error.message = "Error removing user " + username + ": " + reason
    error.username = username
    error.reason = reason
    return error
end function

ComputerUserChPassError = new GenericComputerError
ComputerUserChPassError.classID = "ComputerUserChPassError"
ComputerUserChPassError.message = "Error changing a user's password."
ComputerUserChPassError.username = ""
ComputerUserChPassError.password = ""
ComputerUserChPassError.reason = ""
ComputerUserChPassError.create = function(username = "", password = "", reason = "")
    error = new ComputerUserChPassError
    error.message = "Error changing password for user " + username + " to " + password + ": " + reason
    error.username = username
    error.password = password
    error.reason = reason
    return error
end function

ComputerTouchError = new GenericComputerError
ComputerTouchError.classID = "ComputerTouchError"
ComputerTouchError.message = "Error touching a file."
ComputerTouchError.filename = ""
ComputerTouchError.reason = ""
ComputerTouchError.create = function(filename = "", reason = "")
    error = new ComputerTouchError
    error.message = "Error touching file " + filename + ": " + reason
    error.filename = filename
    error.reason = reason
    return error
end function

ComputerMkdirError = new GenericComputerError
ComputerMkdirError.classID = "ComputerMkdirError"
ComputerMkdirError.message = "Error creating a directory."
ComputerMkdirError.directory = ""
ComputerMkdirError.reason = ""
ComputerMkdirError.create = function(directory = "", reason = "")
    error = new ComputerMkdirError
    error.message = "Error creating directory " + directory + ": " + reason
    error.directory = directory
    error.reason = reason
    return error
end function

ComputerInvalidInterfaceError = new GenericComputerError
ComputerInvalidInterfaceError.classID = "ComputerInvalidInterfaceError"
ComputerInvalidInterfaceError.message = "Invalid interface."
ComputerInvalidInterfaceError.interface = ""
ComputerInvalidInterfaceError.create = function(interface = "")
    error = new ComputerInvalidInterfaceError
    error.message = "Invalid interface: " + interface
    error.interface = interface
    return error
end function
