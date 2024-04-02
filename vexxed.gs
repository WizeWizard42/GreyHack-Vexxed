metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then metaxploit = include_lib(current_path + "/metaxploit.so")
if not metaxploit then exit("Could not import metaxploit. Exiting.")

crypto = include_lib("/lib/crypto.so")
if not crypto then crypto = include_lib(current_path + "/crypto.so")
if not crypto then print("Could not import crypto. Continuing.")

session = @get_custom_object

////////////////////////////////////////////////////////////////////////////////////

// File: TypeExtensions.gs
//LinQ lib functionality for greyscript
//By MachaCeleste 20240205
map.first = function(key, value)
    for each in self.indexes
        if self[each][key] == value then return self[each]
    end for
end function
map.where = function(key, value)
    ret = {}
    for each in self.indexes
        if self[each][key] == value then ret.push(self[each])
    end for
    return ret
end function
map.wherenot = function(key, value)
    ret = {}
    for each in self.indexes
        if self[each][key] != value then ret.push(self[each])
    end for
    return ret
end function
list.first = function(key, value)
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each == value then return each
            if key == "contains" and each.is_match(value) then return each
        else if typeof(each) == "file" then
            if key == "name" and each.name == value then return each
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path == value then return each
            if key == "permissions" and each.permissions == value then return each
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c == value then return each
            end if
            if key == "size" and each.size == value then return each
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number == value then return each
            if key == "is_closed" and each.is_closed == value then return each
            if key == "get_lan_ip" and each.get_lan_ip == value then return each
        else if typeof(each) == "map" then
            if each[key] == value then return each
        end if
    end for
end function
list.where = function(key, value)
    ret = []
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each == value then ret.push(each)
            if key == "contains" and each.is_match(value) then ret.push(each)
        else if typeof(each) == "file" then
            if key == "name" and each.name == value then ret.push(each)
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path == value then ret.push(each)
            if key == "permissions" and each.permissions == value then ret.push(each)
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c == value then ret.push(each)
            end if
            if key == "size" and each.size == value then ret.push(each)
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number == value then ret.push(each)
            if key == "is_closed" and each.is_closed == value then ret.push(each)
            if key == "get_lan_ip" and each.get_lan_ip == value then ret.push(each)
        else if typeof(each) == "map" then
            if each[key] == value then ret.push(each)
        end if
    end for
    return ret
end function
list.wherenot = function(key, value)
    ret = []
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each != value then ret.push(each)
            if key == "contains" and not each.is_match(value) then ret.push(each)
        else if typeof(each) == "file" then
            if key == "name" and each.name != value then ret.push(each)
            if key == "namehas" and each.name.is_match(value) then ret.push(each)
            if key == "path" and each.path != value then ret.push(each)
            if key == "permissions" and each.permissions != value then ret.push(each)
            if key == "has_permission" then
                v = value.values
                c = ""
                for p in v
                    if each.has_permission(p) then c = c + p
                end for
                if c != value then ret.push(each)
            end if
            if key == "size" and each.size != value then ret.push(each)
        else if typeof(each) == "port" then
            if key == "port_number" and each.port_number != value then ret.push(each)
            if key == "is_closed" and each.is_closed != value then ret.push(each)
            if key == "get_lan_ip" and each.get_lan_ip != value then ret.push(each)
        else if typeof(each) == "map" then
            if each[key] != value then ret.push(each)
        end if
    end for
    return ret
end function
string.regex_escape = function
    result = self
    for x in "+*?^$.[]{}()|/"
        result = result.replace("\"+x, "\"+x)
    end for
    return result
end function

//Simple string color lib functionality for greyscript
// By MachaCeleste 20240305
string.color = function(hexc)
    return "<color=" + hexc + ">" + self + "</color>"
end function

////////////////////////////////////////////////////////////////////////////////////

// File: SessionManager.gs
// SessionManager class. Handles script state and manages modifications to user session.
// TODO: Method for loading and saving a config file
SessionManager = {}

SessionManager.currHandler = null

SessionManager.handlerStack = []

SessionManager.currLib = {}

SessionManager.inputMap = {}

SessionManager.inputMap["pop"] = function(objRef, args)
    if args.len > 1 then index = args[1] else index = -1
    if objRef.handlerStack.len < 2 or index == 0 then
        print("Error: cannot pop local shell.")
        return
    end if
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
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then // Empty input or invalid command?
        return
    end if

    self.inputMap[input[0]](self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: FileHandler.gs
// FileHandler class. Implements ready-made functions for interacting with the stored File object.
FileHandler = {}

FileHandler.fileObject = null // Underlying File object.

FileHandler.classID = "FileHandler"

FileHandler.displayID = "File"

FileHandler.filePath = ["var"]

// Used in Handler's handleInput. Maps user's input in terminal to their respective Handler methods.
FileHandler.inputMap = {}

// objRef is a passed reference to the outer Map, used to bypass scope limitations. Serves as a manual "self".
FileHandler.inputMap["ls"] = function(objRef, args)
    print(objRef.getFiles)
end function

FileHandler.inputMap["cat"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    print(objRef.readFile(fileName))
end function

FileHandler.inputMap["rm"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "passwd"

    objRef.deleteFile(fileName)
end function

FileHandler.inputMap["cd"] = function(objRef, args)
    if args.len > 1 then command = args[1] else command = "var"

    objRef.changeFile(command)
end function

FileHandler.inputMap["cp"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "system.log"
    if args.len > 2 then filePath = args[2] else filePath = "/var/"
    if args.len > 3 then newName = args[3] else newName = "newfile"

    objRef.copyFile(fileName, filePath, newName)
end function

FileHandler.inputMap["mv"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "/home/guest/"
    if args.len > 2 then fileName = args[2] else fileName = "newfile"

    objRef.moveFile(filePath, fileName)
end function

FileHandler.inputMap["chmod"] = function(objRef, args)
    if args.len > 1 then newPerms = args[1] else newPerms = "o+rwx"
    if args.len > 2 then recursive = args[2].to_int else recursive = 0

    objRef.changePerms(newPerms, recursive)
end function

FileHandler.inputMap["write"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "fstab"
    if args.len > 2 then content = args[2] else content = "rosebud"

    objRef.writeFile(fileName, content)
end function

FileHandler.inputMap["logwipe"] = function(objRef, args)
    objRef.logWipe
end function

FileHandler.getObject = function()
    return self.fileObject
end function

// Sets stored File object to passed object, and updates stored path.
FileHandler.updateFileObject = function(fileObject)
    self.fileObject = fileObject
    self.updateFilePath
end function

FileHandler.updateFilePath = function()
    if not self.fileObject then
        self.filePath = [""]
    else
        self.filePath = self.fileObject.path.split("/")
        self.filePath.remove(0)
    end if	
end function

// Prints out files and folders in File object's directory.
FileHandler.getFiles = function()
    for file in self.fileObject.get_files
        print(file.permissions + " " + file.group + " " + file.owner + " " + file.size + " " + file.name)
    end for
    
    for folder in self.fileObject.get_folders
        print(folder.permissions + " " + folder.group + " " + folder.owner + " " + folder.size + " " + folder.name)
    end for

    return true
end function

// Returns content of specified file. Needs to be in current directory.
FileHandler.readFile = function(fileName)
    return self.fileObject.get_files.first("name", fileName).get_content
end function

FileHandler.writeFile = function(fileName, content)
    return self.fileObject.get_files.first("name", fileName).set_content(content)
end function

// Deletes the file if it exists.
FileHandler.deleteFile = function(fileName)
    if self.fileObject.get_files.first("name", fileName) then
        result = self.fileObject.get_files.first("name", fileName).delete
        if result != "" then print("Error deleting file: " + result)
        return
    end if
    print("File does not exist.")
end function

// Changes directory appropriately. Currently only supports ".." (parent) or directory name.
FileHandler.changeFile = function(command)
    if command == ".." then
        self.fileObject = self.fileObject.parent
    else
        if self.fileObject.get_folders.first("name", command) then
            self.fileObject = self.fileObject.get_folders.first("name", command)
        else
            print("Directory does not exist.")
        end if
    end if

    self.updateFilePath
end function

FileHandler.moveFile = function(filePath, fileName)
    result = self.fileObject.move(filePath, fileName)
    if result != true then print("Error moving file: " + result)
end function

FileHandler.copyFile = function(fileName, filePath, newName)
    file = self.fileObject.get_files.first("name", fileName)
    result = file.copy(filePath, newName)
    if result != true then print("Error copying file: " + result)
end function

FileHandler.getLANIP = function()
    return "N/A"
end function

FileHandler.getPubIP = function()
    return "N/A"
end function

// Tries to return an object's appropriate level of permission.
FileHandler.getPerms = function()
    self.toRoot

    root = self.fileObject.get_folders.first("path", "/root")
    if root and root.has_permission("r") and root.has_permission("w") and root.has_permission("x") then return "root"
    home = self.fileObject.get_folders.first("path", "/home")
    if home then
        users = home.get_folders.wherenot("path", "/home/guest")
        if users then
            for each in users
                if each.has_permission("r") and each.has_permission("w") and each.has_permission("x") then return "user"
            end for
        end if
    end if
    return "guest"
end function

FileHandler.toRoot = function()
    while parent(self.fileObject)
        self.changeFile("..")
    end while
end function

FileHandler.changePerms = function(newPerms, recursive = 0)
    result = self.fileObject.chmod(newPerms, recursive)

    if result == "" then
        print("Error changing permissions: " + result)
    else
        print("Success.")
    end if
end function

FileHandler.logWipe = function()
    if self.getPerms != "root" then
        print("Root required to wipe logs.")
        return
    end if
    self.toRoot
    self.changeFile("etc")
    self.writeFile("fstab", "rosebud")
    self.copyFile("fstab", "/var/", "system.log")
	self.writeFile("fstab", "")
    print("Logs wiped.")
end function

// As inputMap is updated in better objects, more commands can be used
FileHandler.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasIndex(input[0]) then // Empty input or invalid command?
        return
    end if

    self.inputMap[input[0]](self, input)
end function

////////////////////////////////////////////////////////////////////////////////////

// File: ComputerHandler.gs
// ComputerHandler class. Inherits FileHandler methods and implements ready-made methods for stored Computer object.
ComputerHandler = new FileHandler

ComputerHandler.computerObject = null

ComputerHandler.classID = "ComputerHandler"

ComputerHandler.displayID = "Computer"

ComputerHandler.inputMap["ps"] = function(objRef, args)
    print(objRef.getProcesses)
end function

ComputerHandler.inputMap["kill"] = function(objRef, args)
    if args.len > 1 then pid = args[1] else pid = "0"

    objRef.closeProcess(pid.to_int)
end function

ComputerHandler.inputMap["useradd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"

    objRef.userAdd(username, "secretpassword")
end function

ComputerHandler.inputMap["passwd"] = function(objRef, args)
    if args.len > 1 then username = args[1] else username = "user"
    if args.len > 2 then pass = args[2] else pass = "secretpasswd"

    objRef.changePass(username, pass)
end function

ComputerHandler.inputMap["touch"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "file.txt"

    objRef.createFile(objRef.fileObject.path, fileName)
end function

ComputerHandler.inputMap["mkdir"] = function(objRef, args)
    if args.len > 1 then folder = args[1] else folder = "dir"

    objRef.createFolder(objRef.fileObject.path, folder)
end function

ComputerHandler.inputMap["iwlist"] = function(objRef, args)
    if args.len > 1 then interface = args[1] else interface = "wlan0"

    objRef.getWiFiObjects(interface)
end function

ComputerHandler.getObject = function()
    return self.computerObject
end function

// Updates with respective Computer object, then updates File object with respective path.
ComputerHandler.updateComputerObject = function(computerObject)
    self.computerObject = computerObject
    self.updateFileObject(computerObject.File("/" + self.filePath.join("/")))
end function

// Returns all processes running on stored Computer.
ComputerHandler.getProcesses = function()
    return self.computerObject.show_procs
end function

// Kills process by pid.
ComputerHandler.closeProcess = function(pid)
    result = self.computerObject.close_program(pid)
    if result != true then
        print("Error killing process: " + result)
    end if
end function

// Adds a user, using stored Computer.
ComputerHandler.userAdd = function(username, password)
    result = self.computerObject.create_user(username, password)
    if result != true then
        print("Error adding user: " + result)
    end if
end function

ComputerHandler.changePass = function(username, password)
    result = self.computerObject.change_password(username, password)
    if result != true then
        print("Error changing password: " + result)
    end if
end function

// Creates a file, like "touch".
ComputerHandler.createFile = function(path, fileName)
    result = self.computerObject.touch(path, fileName)
    if result != true then
        print("Error creating file: " + result)
    end if
end function

ComputerHandler.createFolder = function(path, folder)
    result = self.computerObject.create_folder(path, folder)
    if result != trie then
        print("Error creating folder: " + result)
    end if
end function

ComputerHandler.getWiFiObjects = function(interface)
    networks = self.computerObject.wifi_networks(interface)
    if networks == null then
        print("Interface does not exist.")
        return
    end if

    info = "BSSID PWR ESSID"
    for network in networks
        info = info + "\n" + network
    end for
    print(format_columns(info))
end function

ComputerHandler.getLANIP = function()
    return self.computerObject.local_ip
end function

ComputerHandler.getPubIP = function()
    return self.computerObject.public_ip
end function

////////////////////////////////////////////////////////////////////////////////////

// File: ShellHandler.gs
// ShellHandler class. Inherits ComputerHandler and implements ready-made methods for stored Shell object.
ShellHandler = new ComputerHandler

ShellHandler.shellObject = null

ShellHandler.classID = "ShellHandler"

ShellHandler.displayID = "Shell"

ShellHandler.inputMap["shell"] = function(objRef, args)
    objRef.dropShell
end function

ShellHandler.inputMap["get"] = function(objRef, args)
    if args.len > 1 then fileName = args[1] else fileName = "system.log"

    objRef.getFile(fileName)
end function

ShellHandler.inputMap["put"] = function(objRef, args)
    if args.len > 1 then filePath = args[1] else filePath = "system.log"

    objRef.putFile(filePath)
end function

ShellHandler.inputMap["build"] = function(objRef, args)
    if args.len > 1 then srcPath = args[1] else srcPath = "/home/guest/dddd.src"
    if args.len > 2 then binPath = args[2] else binPath = "/home/guest"
    if args.len > 3 then canImport = args[3] else canImport = 0

    objRef.buildFile(srcPath, binPath, canImport)
end function

ShellHandler.inputMap["launch"] = function(objRef, args)
	if args.len > 1 then filePath = args[1] else filePath = "/home/guest/dddd"
	if args.len > 2 then launchParams = args[2:].join(" ") else launchParams = ""

	objRef.launchFile(filePath, launchParams)
end function

ShellHandler.inputMap["connect"] = function(objRef, args)
    if args.len > 1 then ip = args[1] else ip = "1.1.1.1"
    if args.len > 2 then port = args[2].to_int else port = "22"
    if args.len > 3 then username = args[3] else username = "root"
    if args.len > 4 then userPass = args[4] else userPass = "root"

    objRef.connectService(ip, port, username, userPass)
end function

ShellHandler.getObject = function()
    return self.shellObject
end function

// Sets stored Shell object to passed object, and calls updateComputerObject with respective Computer.
ShellHandler.updateShellObject = function(shellObject)
    self.shellObject = shellObject
    self.updateComputerObject(self.shellObject.host_computer)
end function

// Drops to a shell, self-explanatory.
ShellHandler.dropShell = function()
    self.shellObject.start_terminal
end function

// Downloads specified file to local Shell.
ShellHandler.getFile = function(fileName)
    remotePath = self.fileObject.path + "/" + fileName
    result = self.shellObject.scp(remotePath, current_path, get_shell)
    if result != true then
        print("Error downloading file: " + result)
    end if
end function

// Uploads specified file to remote Shell.
ShellHandler.putFile = function(filePath)
    result = get_shell.scp(filePath, self.fileObject.path, self.shellObject)
    if result != true then
        print("Error uploading file: " + result)
    end if
end function

ShellHandler.buildFile = function(srcPath, binPath, canImport)
    result = self.shellObject.build(srcPath, binPath, canImport)
    if result != "" then
        print("Error building file: " + result)
    end if
end function

ShellHandler.launchFile = function(filePath, args)
	result = self.shellObject.launch(filePath, args)
	print("Successfuly launched: " + result)
end function

ShellHandler.connectService = function(ip, port, username, userPass)
    result = self.shellObject.connect_service(ip, port, username, userPass)
    if result isa string then 
        print("Error connecting to service: " + result)
    end if

    if typeof(result) == "shell" then
        shell = new ShellHandler
        shell.updateShellObject(result)
        SessionManager.addHandler(shell)
    end if
end function

////////////////////////////////////////////////////////////////////////////////////

// File: Enumerator.gs
// Enumerator class. Provides helpful methods for enumerating targets. Nothing much for now, but still good to be modular.
Enumerator = {}

Enumerator.fullEnumerate = function(ip)
    print("whois " + ip + ":")
    print(whois(ip))
    
    router = get_router(ip)
    print("\nRouter LAN address: " + router.local_ip)
    print("\nPort-forwards detected: ")
    for port in router.used_ports
        print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
    end for
    
    print("\nFirewall rules: ")
    for rule in router.firewall_rules
        print(rule)
    end for
    
    print("\nLocal IPs detected: ")
    for lan in router.devices_lan_ip
        if lan == router.local_ip then continue
        
        print("\nLAN: " + lan)
        print("Ports detected: ")
        for port in router.device_ports(lan)
            print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
        end for
    end for
end function

////////////////////////////////////////////////////////////////////////////////////

// File: Exploiter.gs
// Exploiter class. Handles all the dirty work of storing, loading, finding, and exploiting vulns.
Exploiter = {}

Exploiter.scanResult = {} // {"(libname)-(libversion)": {"(memory)": ["(value)", "(value)", ...], ...}, ...}

Exploiter.metaLibs = {} // {"(libname)-(libversion): metaLib", ...}

// Parses sec values from overflow output as a list.
Exploiter.scanParse = function(results)
	found = false
	payloads = []
	line = results.split(" ")
	line.reverse

	for word in line
		if found == true then
			word = word.remove(".")
			word = word.remove("<b>")
			word = word.remove("</b>")
			payloads.push(word)
			found = false
		end if

		if word == "Buffer" then
            found = true
		end if
	end for

	return payloads
end function

// Loads a local lib specified by path, used in local exploits. Returns a list of metaLib and lib_id.
Exploiter.loadLib = function(filePath)
	metaLib = session.vexxed["remoteMetax"].load(filePath)
	if metaLib then return metaLib

	print("Library was unable to be loaded.")
end function

// Scans provided MetaLib and saves result vulns. Returns lib_id.
Exploiter.scanLib = function(metaLib)
	lib_id = metaLib.lib_name + "-" + metaLib.version
	self.metaLibs[lib_id] = metaLib

	if self.scanResult.hasIndex(lib_id) then return

	self.scanResult[lib_id] = {}

	memories = session.vexxed["homeMetax"].scan(metaLib)
	for memory in memories
		print("Scanning memory: " + memory)
		self.scanResult[lib_id][memory] = self.scanParse(session.vexxed["homeMetax"].scan_address(metaLib, memory))
	end for

	self.saveResult
	return lib_id
end function

// Loads a lib from a remote computer, used in remote exploits. Returns a NetSession object.
Exploiter.loadRemoteLib = function(ip, port)
	netSession = session.vexxed["remoteMetax"].net_use(ip, port)
	if netSession then return netSession.dump_lib
	print("Remote library was unable to be loaded.")
end function

// Scans respective port's MetaLib and returns lib_id, used as an id in other methods.
Exploiter.scanPort = function(ip, port)
	metaLib = self.loadRemoteLib(ip, port)
	if not metaLib then return

	self.scanLib(metaLib)
	return metaLib.lib_name + "-" + metaLib.version
end function

// Saves in-memory vulns to a file, to be parsed later.
Exploiter.saveResult = function()
    c = session.vexxed["homeShell"].host_computer

    if not c.File(current_path + "/payloads.db") then
        c.touch(current_path, "payloads.db")
    end if
    database_file = c.File(current_path + "/payloads.db")

	result_string = ""

    for lib_id in self.scanResult.indexes
		result_string = result_string + lib_id + ":"
		for memory in self.scanResult[lib_id].indexes
			result_string = result_string + memory + ";"
			result_string = result_string + self.scanResult[lib_id][memory].join(",") + "."
		end for
		result_string = result_string + "#"
	end for

	database_file.set_content(result_string)
end function

// Parses payloads.db from current directory and stores in-memory.
Exploiter.loadResult = function()
	c = session.vexxed["homeShell"].host_computer

    if not c.File(current_path + "/payloads.db") then
        self.scanResult = {}
    else
		database_file = c.File(current_path + "/payloads.db")

		entries = database_file.get_content.split("#")
		entries.pop

		for entry in entries
			entry = entry.split(":")
			memory_entries = entry[1].split("\.")
			memory_entries.pop

			self.scanResult[entry[0]] = {}

			for memory_entry in memory_entries
				memory_entry = memory_entry.split(";")
				self.scanResult[entry[0]][memory_entry[0]] = memory_entry[1].split(",")
			end for
		end for
	end if
end function

Exploiter.resultObjects = {}

// Given a library id and optional key, pulls MetaLib from loaded libraries and stores successful attacks.
Exploiter.crackLib = function(lib_id, overflowKey)
    if self.resultObjects.hasIndex(lib_id) then
        return
    end if  

    self.resultObjects[lib_id] = []

    metaLib = self.metaLibs[lib_id]
    lib_vulns = self.scanResult[lib_id]

    for memory in lib_vulns.indexes
        for value in lib_vulns[memory]
            result = metaLib.overflow(memory, value, overflowKey)
            if result and typeof(result) != "number" then
                if typeof(result) == "file" then
                    file = new FileHandler
                    file.updateFileObject(result)
                    self.resultObjects[lib_id].push(file)
                end if
                if typeof(result) == "computer" then
                    computer = new ComputerHandler
                    computer.updateComputerObject(result)
                    self.resultObjects[lib_id].push(computer)
                end if
                if typeof(result) == "shell" then
                    shell = new ShellHandler
                    shell.updateShellObject(result)
                    self.resultObjects[lib_id].push(shell)
                end if 
            end if
        end for
    end for
end function

// Prints all successful attacks for provided library id.
Exploiter.printVulns = function(lib_id)
	print("Listing stored vulns for: " + lib_id)
	info = ""
	for i in range(0, self.resultObjects[lib_id].len - 1, 1)
		info = info + (str(i) + ": " + self.resultObjects[lib_id][i].getPerms + "    " + typeof(self.resultObjects[lib_id][i].getObject).color("blue") + "    " + self.resultObjects[lib_id][i].getLANIP + "\n")
	end for
	print(format_columns(info))
end function

////////////////////////////////////////////////////////////////////////////////////

// File: RevShellServer.gs
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

////////////////////////////////////////////////////////////////////////////////////

// File: Engine.gs
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
    
        if command[0] == "target" and command.len >= 3 then
            overflowKey = "secstream"
            if command.len >= 4 then overflowKey = command[3]

            session.vexxed["session"].setCurrLib(session.vexxed["exploiter"].scanPort(command[1], command[2].to_int))
            
            session.vexxed["exploiter"].crackLib(session.vexxed["session"].currLib, overflowKey)

            session.vexxed["exploiter"].printVulns(session.vexxed["session"]["currLib"])
        end if

        if command[0] == "use" and command.len == 2 then
            session.vexxed["session"].addHandler(session.vexxed["exploiter"].resultObjects[session.vexxed["session"].currLib][command[1].to_int])
        end if

        if command[0] == "enumerate" and command.len == 2 then
            Enumerator.fullEnumerate(command[1])
        end if

        if command[0] == "local" and command.len >= 2 then
            metaLib = session.vexxed["exploiter"].loadLib(command[1])

            if metaLib then
                overflowKey = "secstream"
                if command.len >= 3 then overflowKey = command[2]

                session.vexxed["session"].setCurrLib(session.vexxed["exploiter"].scanLib(metaLib))

                session.vexxed["exploiter"].crackLib(session.vexxed["session"].currLib, overflowKey)

                session.vexxed["exploiter"].printVulns(session.vexxed["session"].currLib)
            end if
        end if
        
		if command[0] == "revshell" then
			RevShellServer.handleInput(command[1:])
			continue
		end if
		
        session.vexxed["session"].handleInput(command)
        session.vexxed["session"].currHandler.handleInput(command)
    end for
end function

////////////////////////////////////////////////////////////////////////////////////

Engine.startEngine
