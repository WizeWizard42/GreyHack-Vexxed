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
map.hasMethod = function(method)
    ref = self
    if ref.hasIndex(method) then return true
    while ref.hasIndex("__isa")
        ref = ref["__isa"]
        if ref.hasIndex(method) then return true
    end while
    return false
end function
list.first = function(key, value)
    for each in self
        if typeof(each) == "string" then
            if key == "is" and each == value then return each
            if key == "contains" and each.is_match(value) then return each
            if key == "len" and each.len == value then return each
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
            if key == "len" and each.len == value then ret.push(each)
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
            if key == "len" and each.len != value then ret.push(each)
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