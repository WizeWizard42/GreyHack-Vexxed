// Error class. Provides a way to handle errors in a more structured way.
GenericError = {}

GenericError.classID = "GenericError"
GenericError.message = "An error occurred."
GenericError.create = function(message = "An error occurred.")
    error = new GenericError
    error.message = message
    return error
end function
GenericError.toString = function()
    return self.message
end function

FileNotFoundError = new GenericError
FileNotFoundError.classID = "FileNotFoundError"
FileNotFoundError.message = "File or directory not found."
FileNotFoundError.fileName = ""
FileNotFoundError.create = function(fileName = "")
    error = new FileNotFoundError
    error.message = "File or directory not found: " + fileName
    error.fileName = fileName
    return error
end function

FileReadError = new GenericError
FileReadError.classID = "FileReadError"
FileReadError.message = "Error reading file."
FileReadError.fileName = ""
FileReadError.create = function(fileName = "")
    error = new FileReadError
    error.message = "Error reading file: " + fileName
    error.fileName = fileName
    return error
end function

FileWriteError = new GenericError
FileWriteError.classID = "FileWriteError"
FileWriteError.message = "Error writing file."
FileWriteError.fileName = ""
FileWriteError.reason = ""
FileWriteError.create = function(fileName = "", reason = "")
    error = new FileWriteError
    error.message = "Error writing file: " + fileName
    error.fileName = fileName
    error.reason = reason
    return error
end function

FileDeleteError = new GenericError
FileDeleteError.classID = "FileDeleteError"
FileDeleteError.message = "Error deleting file."
FileDeleteError.fileName = ""
FileDeleteError.reason = ""
FileDeleteError.create = function(fileName = "", reason = "")
    error = new FileDeleteError
    error.message = "Error deleting file: " + fileName
    error.fileName = fileName
    error.reason = reason
    return error
end function

FileCopyError = new GenericError
FileCopyError.classID = "FileCopyError"
FileCopyError.message = "Error copying file."
FileCopyError.fileName = ""
FileCopyError.destination = ""
FileCopyError.reason = ""
FileCopyError.create = function(fileName = "", destination = "", reason = "")
    error = new FileCopyError
    error.message = "Error copying file: " + fileName
    error.fileName = fileName
    error.destination = destination
    error.reason = reason
    return error
end function

FileMoveError = new GenericError
FileMoveError.classID = "FileMoveError"
FileMoveError.message = "Error moving file."
FileMoveError.fileName = ""
FileMoveError.destination = ""
FileMoveError.reason = ""
FileMoveError.create = function(fileName = "", destination = "", reason = "")
    error = new FileMoveError
    error.message = "Error moving file: " + fileName
    error.fileName = fileName
    error.destination = destination
    error.reason = reason
    return error
end function

FileChmodError = new GenericError
FileChmodError.classID = "FileChmodError"
FileChmodError.message = "Error changing file permissions."
FileChmodError.fileName = ""
FileChmodError.permissions = ""
FileChmodError.reason = ""
FileChmodError.create = function(fileName = "", permissions = "", reason = "")
    error = new FileChmodError
    error.message = "Error changing file permissions: " + fileName
    error.fileName = fileName
    error.permissions = permissions
    error.reason = reason
    return error
end function
