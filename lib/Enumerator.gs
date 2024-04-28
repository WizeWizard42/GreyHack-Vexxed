// Enumerator class. Provides helpful methods for enumerating targets. Nothing much for now, but still good to be modular.
Enumerator = {}

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
        for port in router.device_ports(lan)
            print(port.port_number + "  open:" + (not port.is_closed) + "  " + router.port_info(port) + "  " + port.get_lan_ip)
        end for
    end for
end function
