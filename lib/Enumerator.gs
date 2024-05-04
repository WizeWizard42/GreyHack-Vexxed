// Enumerator class. Provides helpful methods for enumerating targets. Nothing much for now, but still good to be modular.
Enumerator = {}

Enumerator.inputMap = {}

Enumerator.inputMap["whois"] = function(objRef, args)
    if args.len > 1 then return Enumerator.whoIs(args[1]) else return "Usage: whois [domain]"
end function

Enumerator.inputMap["smtpdump"] = function(objRef, args)
    if args.len > 2 then return Enumerator.smtpDump(args[1], args[2].to_int) else return "Usage: smtpdump [ip] [port]"
end function

Enumerator.inputMap["info"] = function(objRef, args)
    if args.len > 1 then return Enumerator.fullEnumerate(args[1]) else return "Usage: info [domain/ip]"
end function

Enumerator.whoIs = function(domain)
    address = ""
    if not is_valid_ip(domain) then 
        address = nslookup(domain)
        print("Address: " + address)
    else
        address = domain
    end if
    print(whois(address))
end function

Enumerator.smtpDump = function(ip, port)
    result = session.vexxed["remoteCrypto"].smtp_user_list(ip, port)
    if typeof(result) == "string" then return result
    print("Users found: " + result.join(", "))
end function

Enumerator.fullEnumerate = function(ip)
    print("whois " + ip + ":")
    Enumerator.whoIs(ip)

    if not is_valid_ip(ip) then ip = nslookup(ip)
    router = get_router(ip)
    if router == null then return "Router not found."
    print("\nRouter LAN address: " + router.local_ip)
    print("Router BSSID: " + router.bssid_name)
    print("Router ESSID: " + router.essid_name)
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
        print("\nLAN: " + lan)
        print("Ports detected: ")
        ports = router.device_ports(lan)
        if typeof(ports) == "string" then 
            print(ports)
            continue
        end if
        for port in ports
            print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
        end for
    end for
end function

Enumerator.handleInput = function(input)
    if input.len == 0 or not self.inputMap.hasMethod(input[0]) then return
                    
    func = @self.inputMap[input[0]]
    return func(self, input)
end function
