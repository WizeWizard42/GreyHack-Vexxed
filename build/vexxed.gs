globals.H=globals
H.Dz=true
H.EU=false
H.Dg="string"
H.Dh="is"
H.Di="contains"
H.Dj="len"
H.Dk="file"
H.Dl="name"
H.Dm="namehas"
H.Dn="path"
H.Do="permissions"
H.Dp="has_permission"
H.Dw=""
H.Dq="size"
H.Dr="port"
H.Ds="port_number"
H.Dt="is_closed"
H.Du="get_lan_ip"
H.Dv="map"
H.Dx=": "
H.Dy=" to "
H.EJ=0
H.D_=null
H.EG=1
H.EL=2
H.EH=" "
H.Ec="exploiter"
H.EF="session"
H.EA="/metaxploit.so"
H.EB="/crypto.so"
H.EK="homeShell"
H.EE="remoteShell"
H.EW="homeMetax"
H.Eb="revMetax"
H.EC="remoteMetax"
H.EX="homeCrypto"
H.ED="remoteCrypto"
H.ES=3
H.EI="/"
H.ER="\n"
H.EP="."
H.EM="r"
H.EN="w"
H.EO="x"
H.ET="/root/Loot/"
H.EQ="fstab"
H.Ea="shell"
H.EZ=":"
H.EV="  "
H.EY="/root/Vexxed/payloads.db"
map.first=function(Q,R)
for S in self.indexes
if self[S][Q]==R then
return self[S]
end if
end for
end function
map.where=function(Q,R)
T={}
for S in self.indexes
if self[S][Q]==R then
T.push(self[S])
end if
end for
return T
end function
map.wherenot=function(Q,R)
T={}
for S in self.indexes
if self[S][Q]!=R then
T.push(self[S])
end if
end for
return T
end function
map.hasMethod=function(U)
V=self
if V.hasIndex(U) then
return Dz
end if
while V.hasIndex("__isa")
V=V["__isa"]
if V.hasIndex(U) then
return Dz
end if
end while
return EU
end function
list.first=function(Q,R)
for S in self
if typeof(S)==Dg then
if Q==Dh and S==R then
return S
end if
if Q==Di and S.is_match(R) then
return S
end if
if Q==Dj and S.len==R then
return S
end if
else if typeof(S)==Dk then
if Q==Dl and S.name==R then
return S
end if
if Q==Dm and S.name.is_match(R) then
T.push(S)
end if
if Q==Dn and S.path==R then
return S
end if
if Q==Do and S.permissions==R then
return S
end if
if Q==Dp then
W=R.values
X=Dw
for Y in W
if S.has_permission(Y) then
X=X+Y
end if
end for
if X==R then
return S
end if
end if
if Q==Dq and S.size==R then
return S
end if
else if typeof(S)==Dr then
if Q==Ds and S.port_number==R then
return S
end if
if Q==Dt and S.is_closed==R then
return S
end if
if Q==Du and S.get_lan_ip==R then
return S
end if
else if typeof(S)==Dv then
if S[Q]==R then
return S
end if
end if
end for
end function
list.where=function(Q,R)
T=[]
for S in self
if typeof(S)==Dg then
if Q==Dh and S==R then
T.push(S)
end if
if Q==Di and S.is_match(R) then
T.push(S)
end if
if Q==Dj and S.len==R then
T.push(S)
end if
else if typeof(S)==Dk then
if Q==Dl and S.name==R then
T.push(S)
end if
if Q==Dm and S.name.is_match(R) then
T.push(S)
end if
if Q==Dn and S.path==R then
T.push(S)
end if
if Q==Do and S.permissions==R then
T.push(S)
end if
if Q==Dp then
W=R.values
X=Dw
for Y in W
if S.has_permission(Y) then
X=X+Y
end if
end for
if X==R then
T.push(S)
end if
end if
if Q==Dq and S.size==R then
T.push(S)
end if
else if typeof(S)==Dr then
if Q==Ds and S.port_number==R then
T.push(S)
end if
if Q==Dt and S.is_closed==R then
T.push(S)
end if
if Q==Du and S.get_lan_ip==R then
T.push(S)
end if
else if typeof(S)==Dv then
if S[Q]==R then
T.push(S)
end if
end if
end for
return T
end function
list.wherenot=function(Q,R)
T=[]
for S in self
if typeof(S)==Dg then
if Q==Dh and S!=R then
T.push(S)
end if
if Q==Di and not S.is_match(R) then
T.push(S)
end if
if Q==Dj and S.len!=R then
T.push(S)
end if
else if typeof(S)==Dk then
if Q==Dl and S.name!=R then
T.push(S)
end if
if Q==Dm and S.name.is_match(R) then
T.push(S)
end if
if Q==Dn and S.path!=R then
T.push(S)
end if
if Q==Do and S.permissions!=R then
T.push(S)
end if
if Q==Dp then
W=R.values
X=Dw
for Y in W
if S.has_permission(Y) then
X=X+Y
end if
end for
if X!=R then
T.push(S)
end if
end if
if Q==Dq and S.size!=R then
T.push(S)
end if
else if typeof(S)==Dr then
if Q==Ds and S.port_number!=R then
T.push(S)
end if
if Q==Dt and S.is_closed!=R then
T.push(S)
end if
if Q==Du and S.get_lan_ip!=R then
T.push(S)
end if
else if typeof(S)==Dv then
if S[Q]!=R then
T.push(S)
end if
end if
end for
return T
end function
string.regex_escape=function
Z=self
for a in "+*?^$.[]{}()|/"
Z=Z.replace("\"+a,"\"+a)
end for
return Z
end function
string.color=function(b)
return "<color="+b+">"+self+"</color>"
end function
c={}
c.classID="GenericError"
c.message="An error occurred."
c.create=function(e="An error occurred.")
u=new c
u.message=e
return u
end function
c.toString=function
return self.message
end function
h=new c
h.classID="GenericFileError"
h.message="An error occurred with a file."
h.fileName=Dw
h.create=function(Ab="")
u=new h
u.message="An error occurred with file: "+Ab
u.fileName=Ab
return u
end function
j=new h
j.classID="FileNotFoundError"
j.message="File or directory not found."
j.fileName=Dw
j.create=function(Ab="")
u=new j
u.message="File or directory not found: "+Ab
u.fileName=Ab
return u
end function
k=new h
k.classID="FileReadError"
k.message="Error reading file."
k.fileName=Dw
k.create=function(Ab="")
u=new k
u.message="Error reading file: "+Ab
u.fileName=Ab
return u
end function
l=new h
l.classID="FileWriteError"
l.message="Error writing file."
l.fileName=Dw
l.reason=Dw
l.create=function(Ab="",m="")
u=new l
u.message="Error writing file "+Ab+Dx+m
u.fileName=Ab
u.reason=m
return u
end function
n=new h
n.classID="FileDeleteError"
n.message="Error deleting file."
n.fileName=Dw
n.reason=Dw
n.create=function(Ab="",m="")
u=new n
u.message="Error deleting file "+Ab+Dx+m
u.fileName=Ab
u.reason=m
return u
end function
o=new h
o.classID="FileCopyError"
o.message="Error copying file."
o.fileName=Dw
o.destination=Dw
o.reason=Dw
o.create=function(Ab="",p="",m="")
u=new o
u.message="Error copying file "+Ab+Dy+p+Dx+m
u.fileName=Ab
u.destination=p
u.reason=m
return u
end function
q=new h
q.classID="FileMoveError"
q.message="Error moving file."
q.fileName=Dw
q.destination=Dw
q.reason=Dw
q.create=function(Ab="",p="",m="")
u=new q
u.message="Error moving file "+Ab+Dy+p+Dx+m
u.fileName=Ab
u.destination=p
u.reason=m
return u
end function
r=new h
r.classID="FileChmodError"
r.message="Error changing file permissions."
r.fileName=Dw
r.permissions=Dw
r.reason=Dw
r.create=function(Ab="",permissions="",m="")
u=new r
u.message="Error changing file permissions for "+Ab+Dy+permissions+Dx+m
u.fileName=Ab
u.permissions=permissions
u.reason=m
return u
end function
s=new h
s.classID="FileChgrpError"
s.message="Error changing file group."
s.fileName=Dw
s.group=Dw
s.reason=Dw
s.create=function(Ab="",group="",m="")
u=new s
u.message="Error changing file group for "+Ab+Dy+group+Dx+m
u.fileName=Ab
u.group=group
u.reason=m
return u
end function
t=new h
t.classID="FileChownError"
t.message="Error changing file owner."
t.fileName=Dw
t.owner=Dw
t.reason=Dw
t.create=function(Ab="",owner="",m="")
u=new t
u.message="Error changing file owner for "+Ab+Dy+owner+Dx+m
u.fileName=Ab
u.owner=owner
u.reason=m
return u
end function
v=new c
v.classID="GenericComputerError"
v.message="An error with a computer object has occurred."
v.create=function
return new v
end function
w=new v
w.classID="ComputerProcError"
w.message="Error killing a process."
w.pid=EJ
w.reason=Dw
w.create=function(x=0,m="")
u=new w
u.message="Error killing process: "+x+Dx+m
u.pid=x
u.reason=m
return u
end function
y=new v
y.classID="ComputerUserAddError"
y.message="Error adding a user."
y.username=Dw
y.password=Dw
y.reason=Dw
y.create=function(z="",_A="",m="")
u=new y
u.message="Error adding user "+z+" with password "+_A+Dx+m
u.username=z
u.password=_A
u.reason=m
return u
end function
AB=new v
AB.classID="ComputerUserRemoveError"
AB.message="Error removing a user."
AB.username=Dw
AB.reason=Dw
AB.create=function(z="",m="")
u=new AB
u.message="Error removing user "+z+Dx+m
u.username=z
u.reason=m
return u
end function
AC=new v
AC.classID="ComputerUserChPassError"
AC.message="Error changing a user's password."
AC.username=Dw
AC.password=Dw
AC.reason=Dw
AC.create=function(z="",_A="",m="")
u=new AC
u.message="Error changing password for user "+z+Dy+_A+Dx+m
u.username=z
u.password=_A
u.reason=m
return u
end function
AD=new v
AD.classID="ComputerTouchError"
AD.message="Error touching a file."
AD.filename=Dw
AD.reason=Dw
AD.create=function(AE="",m="")
u=new AD
u.message="Error touching file "+AE+Dx+m
u.filename=AE
u.reason=m
return u
end function
AF=new v
AF.classID="ComputerMkdirError"
AF.message="Error creating a directory."
AF.directory=Dw
AF.reason=Dw
AF.create=function(AG="",m="")
u=new AF
u.message="Error creating directory "+AG+Dx+m
u.directory=AG
u.reason=m
return u
end function
AH=new v
AH.classID="ComputerInvalidInterfaceError"
AH.message="Invalid interface."
AH.interface=Dw
AH.create=function(AI="")
u=new AH
u.message="Invalid interface: "+AI
u.interface=AI
return u
end function
H.AJ=@get_custom_object
AK={}
AK.currHandler=D_
AK.handlerStack=[]
AK.sessionStack=[]
AK.currLib={}
AK.inputMap={}
AK.inputMap["pop"]=function(AX,AY)
if AY.len>EG then
AZ=AY[EG]
else
AZ=-EG
end if
if AX.handlerStack.len<EL or AZ==EJ then
return c.create("Error: cannot pop local shell.")
end if
AX.handlerStack.remove(AZ)
if not AX.handlerStack.indexOf(AX.currHandler) then
AX.updateCurrHandler(-EG)
end if
end function
AK.inputMap["hstack"]=function(AX,AY)
for Aa in range(EJ,AX.handlerStack.len-EG)
Ac=AX.handlerStack[Aa]
if Ac.UID==AX.currHandler.UID then
print(Aa+"* "+Ac.classID+Dx+Ac.getPubIP+EH+Ac.getLANIP)
else
print(Aa+EH+Ac.classID+Dx+Ac.getPubIP+EH+Ac.getLANIP)
end if
end for
end function
AK.inputMap["use"]=function(AX,AY)
if AY.len<EL then
return "Usage: use [index]"
end if
AX.addHandler(AJ.vexxed[Ec].resultObjects[AJ.vexxed[EF].currLib][AY[EG].to_int])
end function
AK.inputMap["switch"]=function(AX,AY)
if AY.len<EL then
print("Error: switch requires a handler index.")
return 
end if
AX.updateCurrHandler(AY[EG].to_int)
end function
AK.updateCurrHandler=function(AZ)
self.currHandler=self.handlerStack[AZ]
end function
AK.addHandler=function(Ac)
self.handlerStack.push(Ac)
self.updateCurrHandler(-EG)
end function
AK.setCurrLib=function(val)
self.currLib=val
end function
AK.initSession=function
H.Ai=include_lib(current_path+"/aptclient.so")
if not Ai then
exit("Could not import aptclient. Exiting.")
end if
Ai.update
if get_shell.host_computer.File(current_path+EA)==D_ or Ai.check_upgrade(current_path+EA)==Dz then
Ai.install("metaxploit.so",current_path)
end if
if get_shell.host_computer.File(current_path+EB)==D_ or Ai.check_upgrade(current_path+EB)==Dz then
Ai.install("crypto.so",current_path)
end if
H.Aj=include_lib(current_path+EA)
H.Ak=include_lib(current_path+EB)
if not Aj then
exit("Could not import metaxploit. Exiting.")
end if
if not Ak then
exit("Could not import crypto. Exiting.")
end if
AJ.vexxed={}
AJ.vexxed[EF]=self
AJ.vexxed[Ec]=H.Al
AJ.vexxed[EK]=get_shell
AJ.vexxed[EE]=get_shell
AJ.vexxed[EW]=Aj
AJ.vexxed[Eb]=Aj
AJ.vexxed[EC]=Aj
AJ.vexxed[EX]=Ak
AJ.vexxed[ED]=Ak
end function
AK.importSession=function
H.Aj=include_lib(current_path+EA)
H.Ak=include_lib(current_path+EB)
if not Aj then
exit("Could not import metaxploit. Exiting.")
end if
if not Ak then
exit("Could not import crypto. Exiting.")
end if
Am={}
Am[EC]=AJ.vexxed[EC]
Am[ED]=AJ.vexxed[ED]
Am[EE]=AJ.vexxed[EE]
AJ.vexxed[EF].sessionStack.push(Am)
AJ.vexxed[EC]=Aj
AJ.vexxed[ED]=Ak
AJ.vexxed[EE]=get_shell
end function
AK.exitLayer=function
if self.sessionStack.len==EJ then
print("No previous layer to return to. Returning to terminal.")
return 
end if
Am=self.sessionStack.pop
AJ.vexxed[EC]=Am[EC]
AJ.vexxed[ED]=Am[ED]
AJ.vexxed[EE]=Am[EE]
end function
AK.handleInput=function(An)
if An.len==EJ or not self.inputMap.hasMethod(An[EJ]) then
return 
end if
Ao=@self.inputMap[An[EJ]]
return Ao(self,An)
end function
Ap={}
Ap.fileObject=D_
Ap.classID="FileHandler"
Ap.displayID="File"
Ap.UID=D_
Ap.inputMap={}
Ap.inputMap["ls"]=function(AX,AY)
return AX.getFiles
end function
Ap.inputMap["cat"]=function(AX,AY)
if AY.len>EG then
return AX.readFile(AY[EG])
else
return "Usage: cat [file]"
end if
end function
Ap.inputMap["rm"]=function(AX,AY)
if AY.len>EG then
return AX.deleteFile(AY[EG])
else
return "Usage: rm [file]"
end if
end function
Ap.inputMap["cd"]=function(AX,AY)
if AY.len>EG then
return AX.changeFile(AY[EG])
else
return "Usage: cd [directory]"
end if
end function
Ap.inputMap["cp"]=function(AX,AY)
if AY.len>ES then
return AX.copyFile(AY[EG],AY[EL],AY[ES])
else
return "Usage: cp [file] [path] [newName]"
end if
end function
Ap.inputMap["mv"]=function(AX,AY)
if AY.len>ES then
return AX.moveFile(AY[EG],AY[EL],AY[ES])
else
return "Usage: mv [file] [path] [newName]"
end if
end function
Ap.inputMap["gettext"]=function(AX,AY)
if AY.len>EG then
return AX.getTextFile(AY[EG])
else
return "Usage: gettext [file]"
end if
end function
Ap.inputMap["chmod"]=function(AX,AY)
if AY.len>ES then
return AX.changePerms(AY[EG],AY[EL],AY[ES].to_int)
else
return "Usage: chmod [file] [perms] [recursive]"
end if
end function
Ap.inputMap["chgrp"]=function(AX,AY)
if AY.len>ES then
return AX.changeGroup(AY[EG],AY[EL],AY[ES].to_int)
else
return "Usage: chgrp [file] [group] [recursive]"
end if
end function
Ap.inputMap["chown"]=function(AX,AY)
if AY.len>ES then
return AX.changeOwner(AY[EG],AY[EL],AY[ES].to_int)
else
return "Usage: chown [file] [owner] [recursive]"
end if
end function
Ap.inputMap["write"]=function(AX,AY)
if AY.len>EL then
return AX.writeFile(AY[EG],AY[EL:].join(EH))
else
return "Usage: write [file] [content]"
end if
end function
Ap.inputMap["fschk"]=function(AX,AY)
if AY.len>EG then
Ab=AY[EG]
else
Ab=EI
end if
return AX.treeAction(Ab,@AX.accessCheck)
end function
Ap.inputMap["logwipe"]=function(AX,AY)
return AX.logWipe
end function
Ap.getObject=function
return self.fileObject
end function
Ap.updateFileObject=function(Aq)
self.fileObject=Aq
self.genUID
end function
Ap.listFile=function(BM)
return BM.permissions+EH+BM.owner+EH+BM.group+EH+BM.size+EH+BM.name
end function
Ap.getFiles=function
Z=Dw
Z=Z+"Permissions Owner Group Size Name\n"
Z=Z+self.fileObject.permissions+EH+self.fileObject.owner+EH+self.fileObject.group+EH+self.fileObject.size+" .\n"
for BM in self.fileObject.get_files
Z=Z+self.listFile(BM)+ER
end for
for BN in self.fileObject.get_folders
Z=Z+self.listFile(BN)+ER
end for
return format_columns(Z)
end function
Ap.checkFile=function(Ab)
if Ab==EP then
return self.fileObject
end if
BM=self.fileObject.get_files.first(Dl,Ab)
BN=self.fileObject.get_folders.first(Dl,Ab)
if BM then
return BM
end if
if BN then
return BN
end if
return EU
end function
Ap.accessCheck=function(AX,BM)
if BM.has_permission(EM) or BM.has_permission(EN) or BM.has_permission(EO) or BM.owner==self.getPerms then
return AX.listFile(BM)+char(10)
end if
end function
Ap.treeAction=function(BM,BO)
if BM==EI then
self.toRoot
BM=self.fileObject
end if
if typeof(BM)!=Dk then
return "Invalid argument."
end if
Z=Dw
Z=Z+BO(self,BM)
for S in BM.get_files
Z=Z+BO(self,S)
end for
for S in BM.get_folders
Z=Z+self.treeAction(S,@BO)
end for
return Z
end function
Ap.readFile=function(Ab)
BM=self.fileObject.get_files.first(Dl,Ab)
if not BM then
return j.create(Ab)
end if
Z=BM.get_content
if not Z then
return k.create(Ab)
else
return Z
end if
end function
Ap.writeFile=function(Ab,BP)
BM=self.fileObject.get_files.first(Dl,Ab)
if not BM then
return j.create(Ab)
end if
Z=BM.set_content(BP)
if Z!=Dz then
return l.create(Ab,Z)
else
return "Content written."
end if
end function
Ap.deleteFile=function(Ab)
BM=self.checkFile(Ab)
if not BM then
return j.create(Ab)
end if
Z=BM.delete
if Z.trim.len!=EJ then
return n.create(Ab,Z)
else
return "File deleted."
end if
end function
Ap.changeFile=function(BQ)
BR=BQ.split(EI)
if BQ[EJ]==EI then
self.toRoot
end if
for S in BR
if S.trim.len==EJ or S==EP then
continue
end if
if S==".." then
if self.fileObject.parent then
self.fileObject=self.fileObject.parent
else
return c.create("Cannot go up. If you aren't in /, cwd may have been deleted.")
end if
else
if not self.checkFile(S) then
return j.create(S)
end if
self.fileObject=self.fileObject.get_folders.first(Dl,S)
end if
end for
end function
Ap.moveFile=function(Ab,BS,BT)
BM=self.checkFile(Ab)
if not BM then
return j.create(Ab)
end if
Z=BM.move(BS,BT)
if Z!=Dz then
return q.create(Ab,BS,Z)
else
return "File moved."
end if
end function
Ap.copyFile=function(Ab,BS,BT)
BM=self.checkFile(Ab)
if not BM then
return j.create(Ab)
end if
Z=BM.copy(BS,BT)
if Z!=Dz then
return o.create(Ab,BS,Z)
else
return "File copied."
end if
end function
Ap.getTextFile=function(Ab)
BU=self.readFile(Ab)
if BU isa k then
return BU
end if
AJ.vexxed[EK].host_computer.touch(ET,Ab)
AJ.vexxed[EK].host_computer.File(ET+Ab).set_content(BU)
return "File copied to /root/Loot/"+Ab
end function
Ap.getLANIP=function
return "N/A"
end function
Ap.getPubIP=function
return "N/A"
end function
Ap.getPerms=function
self.toRoot
BV=self.fileObject.get_folders.first(Dn,"/root")
if BV and BV.has_permission(EM) and BV.has_permission(EN) and BV.has_permission(EO) then
return "root"
end if
BW=self.fileObject.get_folders.first(Dn,"/home")
if BW then
BX=BW.get_folders.wherenot(Dn,"/home/guest")
if BX then
for S in BX
if S.has_permission(EM) and S.has_permission(EN) and S.has_permission(EO) then
return "user"
end if
end for
end if
end if
return "guest"
end function
Ap.toRoot=function
while parent(self.fileObject)
Z=self.changeFile("..")
if Z isa c then
return Z
end if
end while
end function
Ap.changePerms=function(Ab,BY,BZ=0)
if Ab==EP then
BM=self.fileObject
else
BM=self.checkFile(Ab)
end if
if not BM then
return j.create(Ab)
end if
Z=BM.chmod("u-rwx",BZ)
if Z.trim.len!=EJ then
return r.create(Ab,BY,Z)
end if
BM.chmod("g-rwx",BZ)
BM.chmod("o-rwx",BZ)
Ba=BY[EJ].to_int
Bb=BY[EG].to_int
Bc=BY[EL].to_int
Bd="u+"
if bitAnd(Ba,4) then
Bd=Bd+EM
end if
if bitAnd(Ba,EL) then
Bd=Bd+EN
end if
if bitAnd(Ba,EG) then
Bd=Bd+EO
end if
Be="g+"
if bitAnd(Bb,4) then
Be=Be+EM
end if
if bitAnd(Bb,EL) then
Be=Be+EN
end if
if bitAnd(Bb,EG) then
Be=Be+EO
end if
Bf="o+"
if bitAnd(Bc,4) then
Bf=Bf+EM
end if
if bitAnd(Bc,EL) then
Bf=Bf+EN
end if
if bitAnd(Bc,EG) then
Bf=Bf+EO
end if
BM.chmod(Bd,BZ)
BM.chmod(Be,BZ)
BM.chmod(Bf,BZ)
return "Permissions changed."
end function
Ap.changeGroup=function(Ab,Bg,BZ=0)
if Ab!=EP then
BM=self.fileObject.get_files.first(Dl,Ab)
else
BM=self.fileObject
end if
if not BM then
return j.create(Ab)
end if
Z=BM.set_group(Bg,BZ)
if Z.trim.len!=EJ then
return s.create(Ab,Bg,Z)
else
return "Group changed."
end if
end function
Ap.changeOwner=function(Ab,Bh,BZ=0)
if Ab!=EP then
BM=self.fileObject.get_files.first(Dl,Ab)
else
BM=self.fileObject
end if
if not BM then
return j.create(Ab)
end if
Z=BM.set_owner(Bh,BZ)
if Z.trim.len!=EJ then
return t.create(Ab,Bh,Z)
else
return "Owner changed."
end if
end function
Ap.logWipe=function
if self.getPerms!="root" then
return "Root permissions required."
end if
Z=self.toRoot
if Z isa c then
return Z
end if
Z=self.changeFile("etc")
if Z isa c then
return Z
end if
Z=self.writeFile(EQ,"rosebud")
if Z isa c then
return Z
end if
Z=self.copyFile(EQ,"/var/","system.log")
if Z isa c then
return Z
end if
self.writeFile(EQ,Dw)
return "Logs wiped."
end function
Ap.genUID=function
self.UID=md5(str(rnd+rnd+rnd+rnd))
end function
Ap.handleInput=function(An)
if An.len==EJ or not self.inputMap.hasMethod(An[EJ]) then
return 
end if
Ao=@self.inputMap[An[EJ]]
return Ao(self,An)
end function
Bi=new Ap
Bi.computerObject=D_
Bi.classID="ComputerHandler"
Bi.displayID="Computer"
Bi.inputMap=new Ap.inputMap
Bi.inputMap["ps"]=function(AX,AY)
return AX.getProcesses
end function
Bi.inputMap["ifconfig"]=function(AX,AY)
return AX.netInfo
end function
Bi.inputMap["kill"]=function(AX,AY)
if AY.len>EG then
return AX.closeProcess(AY[EG].to_int)
else
return "Usage: kill [pid]"
end if
end function
Bi.inputMap["useradd"]=function(AX,AY)
if AY.len>EL then
return AX.userAdd(AY[EG],AY[EL])
else
return "Usage: useradd [username] [password]"
end if
end function
Bi.inputMap["passwd"]=function(AX,AY)
if AY.len>EL then
return AX.changePass(AY[EG],AY[EL])
else
return "Usage: passwd [username] [password]"
end if
end function
Bi.inputMap["touch"]=function(AX,AY)
if AY.len>EG then
return AX.createFile(AX.fileObject.path,AY[EG])
else
return "Usage: touch [filename]"
end if
end function
Bi.inputMap["mkdir"]=function(AX,AY)
if AY.len>EG then
return AX.createFolder(AX.fileObject.path,AY[EG])
else
return "Usage: mkdir [foldername]"
end if
end function
Bi.inputMap["iwlist"]=function(AX,AY)
if AY.len>EG then
return AX.getWiFiObjects(AY[EG])
else
return "Usage: iwlist [interface]"
end if
end function
Bi.getObject=function
return self.computerObject
end function
Bi.updateComputerObject=function(Bj)
self.computerObject=Bj
if self.fileObject then
self.updateFileObject(Bj.File(self.fileObject.path))
else
self.updateFileObject(Bj.File(EI))
end if
end function
Bi.getProcesses=function
return self.computerObject.show_procs
end function
Bi.closeProcess=function(x)
Z=self.computerObject.close_program(x)
if Z!=Dz then
return w.create(x,Z)
end if
end function
Bi.userAdd=function(z,_A)
Z=self.computerObject.create_user(z,_A)
if Z!=Dz then
return y.create(z,_A,Z)
end if
end function
Bi.changePass=function(z,_A)
Z=self.computerObject.change_password(z,_A)
if Z!=Dz then
return Bv.create(z,_A,Z)
end if
end function
Bi.createFile=function(path,Ab)
Z=self.computerObject.touch(path,Ab)
if Z!=Dz then
return AD.create(path,Ab,Z)
end if
end function
Bi.createFolder=function(path,BN)
Z=self.computerObject.create_folder(path,BN)
if Z!=Dz then
return AF.create(path,BN,Z)
end if
end function
Bi.netInfo=function
return "Local IP: "+self.getLANIP+"\nPublic IP: "+self.getPubIP+"\nActive card: "+self.getActiveCard+"\nInterfaces:\n"+self.getInterfaces
end function
Bi.getActiveCard=function
return self.computerObject.active_net_card
end function
Bi.getInterfaces=function
return format_columns(self.computerObject.network_devices)
end function
Bi.getWiFiObjects=function(AI)
Bw=self.computerObject.wifi_networks(AI)
if Bw==D_ then
return AH.create(AI)
end if
Bx="BSSID PWR ESSID"
for By in Bw
Bx=Bx+ER+By
end for
return format_columns(Bx)
end function
Bi.getLANIP=function
return self.computerObject.local_ip
end function
Bi.getPubIP=function
return self.computerObject.public_ip
end function
Bz=new Bi
Bz.shellObject=D_
Bz.classID="ShellHandler"
Bz.displayID="Shell"
Bz.inputMap=new Bi.inputMap
Bz.inputMap[Ea]=function(AX,AY)
AX.dropShell
end function
Bz.inputMap["get"]=function(AX,AY)
if AY.len>EG then
return AX.getFile(AY[EG])
else
return "Usage: get [filename]"
end if
end function
Bz.inputMap["put"]=function(AX,AY)
if AY.len>EG then
return AX.putFile(AY[EG])
else
return "Usage: put [filepath]"
end if
end function
Bz.inputMap["build"]=function(AX,AY)
if AY.len>ES then
return AX.buildFile(AY[EG],AY[EL],AY[ES])
else
return "Usage: build [srcPath] [binPath] [canImport]"
end if
end function
Bz.inputMap["launch"]=function(AX,AY)
if AY.len==EL then
return AX.launchFile(AY[EG],Dw)
end if
if AY.len>EL then
return AX.launchFile(AY[EG],AY[EL:].join(EH))
else
return "Usage: launch [filePath] [args]"
end if
end function
Bz.inputMap["sudo"]=function(AX,AY)
if AY.len==EG then
return AX.trySudo(Dw,Dw)
end if
if AY.len>EL then
return AX.trySudo(AY[EG],AY[EL])
else
return "Usage: sudo [username] [password]"
end if
end function
Bz.inputMap["jump"]=function(AX,AY)
AX.jumpTo
end function
Bz.inputMap["connect"]=function(AX,AY)
if AY.len>5 then
return AX.connectService(AY[EG],AY[EL].to_int,AY[ES],AY[4],AY[5].to_int)
end if
if AY.len>4 then
return AX.connectService(AY[EG],AY[EL].to_int,AY[ES],AY[4])
else
return "Usage: connect [ip] [port] [username] [password] [isFTP=0]"
end if
end function
Bz.getObject=function
return self.shellObject
end function
Bz.updateShellObject=function(B_)
self.shellObject=B_
self.updateComputerObject(host_computer(self.shellObject))
end function
Bz.dropShell=function
start_terminal(self.shellObject)
end function
Bz.getFile=function(Ab)
CJ=self.fileObject.path+EI+Ab
Z=scp(self.shellObject,CJ,ET,AJ.vexxed[EK])
if Z!=Dz then
return "Error downloading file: "+Z
end if
end function
Bz.putFile=function(BS)
Z=scp(AJ.vexxed[EK],BS,self.fileObject.path,self.shellObject)
if Z!=Dz then
return "Error uploading file: "+Z
end if
end function
Bz.trySudo=function(CK,CL)
if CK.trim.len==EJ and CL.trim.len==EJ then
Z=get_shell
else
Z=get_shell(CK,CL)
end if
if not Z then
return "User/pass combo incorrect. Remember, this only works on the current remoteShell."
end if
CM=new Bz
CM.updateShellObject(Z)
AJ.vexxed[EF].addHandler(CM)
end function
Bz.buildFile=function(CN,CO,CP)
Z=build(self.shellObject,CN,CO,CP)
if Z!=Dw then
print("Error building file: "+Z)
end if
end function
Bz.launchFile=function(BS,AY)
Z=launch(self.shellObject,BS,AY)
print("Successfuly launched: "+Z)
end function
Bz.jumpTo=function
self.putFile("/root/Vexxed/vexxed")
self.putFile("/root/Vexxed/metaxploit.so")
self.putFile("/root/Vexxed/crypto.so")
self.launchFile(self.fileObject.path+"/vexxed",Dw)
end function
Bz.connectService=function(CQ,CR,z,CL,CS=false)
if CS then
CT="ftp"
else
CT="ssh"
end if
Z=connect_service(self.shellObject,CQ,CR,z,CL,CT)
if Z isa string then
print("Error connecting to service: "+Z)
end if
if typeof(Z)==Ea or typeof(Z)=="ftpshell" then
CM=new Bz
CM.updateShellObject(Z)
AJ.vexxed[EF].addHandler(CM)
end if
end function
CU={}
CU.inputMap={}
CU.inputMap["whois"]=function(AX,AY)
if AY.len>EG then
return CU.whoIs(AY[EG])
else
return "Usage: whois [domain]"
end if
end function
CU.inputMap["smtpdump"]=function(AX,AY)
if AY.len>EL then
return CU.smtpDump(AY[EG],AY[EL].to_int)
else
return "Usage: smtpdump [ip] [port]"
end if
end function
CU.inputMap["info"]=function(AX,AY)
if AY.len>EG then
return CU.fullEnumerate(AY[EG])
else
return "Usage: info [domain/ip]"
end if
end function
CU.whoIs=function(CY)
CZ=Dw
if not is_valid_ip(CY) then
CZ=nslookup(CY)
print("Address: "+CZ)
else
CZ=CY
end if
print(whois(CZ))
end function
CU.smtpDump=function(CQ,CR)
Z=AJ.vexxed[ED].smtp_user_list(CQ,CR)
if typeof(Z)==Dg then
return Z
end if
print("Users found: "+Z.join(", "))
end function
CU.fullEnumerate=function(CQ)
print("whois "+CQ+EZ)
CU.whoIs(CQ)
if not is_valid_ip(CQ) then
CQ=nslookup(CQ)
end if
Ca=get_router(CQ)
if Ca==D_ then
return "Router not found."
end if
print("\nRouter LAN address: "+Ca.local_ip)
print("Router BSSID: "+Ca.bssid_name)
print("Router ESSID: "+Ca.essid_name)
print("\nPort-forwards detected: ")
for CR in Ca.used_ports
print(CR.port_number+"  open:"+(not CR.is_closed)+EV+Ca.port_info(CR)+EV+CR.get_lan_ip)
end for
print("\nFirewall rules: ")
for Cb in Ca.firewall_rules
print(Cb)
end for
print("\nLocal IPs detected: ")
for Cc in Ca.devices_lan_ip
print("\nLAN: "+Cc)
print("Ports detected: ")
Cd=Ca.device_ports(Cc)
if typeof(Cd)==Dg then
print(Cd)
continue
end if
for CR in Cd
print(CR.port_number+"  open:"+(not CR.is_closed)+EV+Ca.port_info(CR)+EV+CR.get_lan_ip)
end for
end for
end function
CU.handleInput=function(An)
if An.len==EJ or not self.inputMap.hasMethod(An[EJ]) then
return 
end if
Ao=@self.inputMap[An[EJ]]
return Ao(self,An)
end function
Al={}
Al.scanResult={}
Al.metaLibs={}
Al.inputMap={}
Al.inputMap["scan"]=function(AX,AY)
if AY.len<ES then
return "Usage: scan [ip] [port]"
end if
Cq=AX.scanPort(AY[EG],AY[EL].to_int)
if not Cq then
return "Library was unable to be scanned."
else
return AJ.vexxed[EF].setCurrLib(Cq)
end if
end function
Al.inputMap["load"]=function(AX,AY)
if AY.len<EL then
return "Usage: load [path]"
end if
Cq=AX.scanLib(AX.loadLib(AY[EG]))
if not Cq then
return "Library was unable to be loaded."
else
return AJ.vexxed[EF].setCurrLib(Cq)
end if
end function
Al.inputMap["local"]=function(AX,AY)
if AY.len<ES then
return "Usage: local [path] [optVal]"
end if
Z=AX.inputMap.load(AX,AY)
if Z then
return Z
end if
AX.crackLib(AJ.vexxed[EF].currLib,AY[EL])
AX.printVulns(AJ.vexxed[EF].currLib)
end function
Al.inputMap["crack"]=function(AX,AY)
if AY.len<EL then
return "Usage: crack [hash/file]"
end if
return AX.crackHash(AY[EG])
end function
Al.inputMap["target"]=function(AX,AY)
if AY.len<4 then
return "Usage: target [ip] [port] [optVal]"
end if
Z=AX.inputMap.scan(AX,AY)
if Z then
return Z
end if
AX.crackLib(AJ.vexxed[EF].currLib,AY[ES])
AX.printVulns(AJ.vexxed[EF].currLib)
end function
Al.scanParse=function(Cr)
Cs=EU
Ct=[]
Cu=Cr.split(EH)
Cu.reverse
for Cv in Cu
if Cs==Dz then
Cv=Cv.remove(EP)
Cv=Cv.remove("<b>")
Cv=Cv.remove("</b>")
Ct.push(Cv)
Cs=EU
end if
if Cv=="Buffer" then
Cs=Dz
end if
end for
return Ct
end function
Al.loadLib=function(BS)
Cw=AJ.vexxed[EC].load(BS)
if Cw then
return Cw
end if
print("Library was unable to be loaded.")
end function
Al.scanLib=function(Cw)
Cq=Cw.lib_name+"-"+Cw.version
self.metaLibs[Cq]=Cw
if self.scanResult.hasIndex(Cq) then
return Cq
end if
self.scanResult[Cq]={}
Cx=AJ.vexxed[EW].scan(Cw)
for Cy in Cx
print("Scanning memory: "+Cy)
self.scanResult[Cq][Cy]=self.scanParse(AJ.vexxed[EW].scan_address(Cw,Cy))
end for
self.saveResult
return Cq
end function
Al.crackHash=function(hash)
BM=AJ.vexxed[EF].currHandler.checkFile(hash)
if not BM then
return AJ.vexxed[EX].decipher(hash)
end if
if BM.is_folder then
return c.create("Error: cannot crack a folder.")
end if
Z=BM.get_content
if not Z then
return k.create(Ab)
end if
Cz=Z.split(char(10))
Bx="User Password"
for C_ in Cz
C_=C_.trim
if C_.len<33 then
continue
end if
DA=C_.split(EZ)
DB=decipher(AJ.vexxed[EX],DA[EG])
Bx=Bx+ER+DA[EJ]+EH+DB
end for
return format_columns(Bx)
end function
Al.loadRemoteLib=function(CQ,CR)
DC=AJ.vexxed[EC].net_use(CQ,CR)
if DC then
return DC.dump_lib
end if
print("Remote library was unable to be loaded.")
end function
Al.scanPort=function(CQ,CR)
Cw=self.loadRemoteLib(CQ,CR)
if not Cw then
return 
end if
self.scanLib(Cw)
return Cw.lib_name+"-"+Cw.version
end function
Al.saveResult=function
X=AJ.vexxed[EK].host_computer
if not X.File(EY) then
X.touch("/root/Vexxed","payloads.db")
end if
DD=X.File(EY)
DE=Dw
for Cq in self.scanResult.indexes
DE=DE+Cq+"|"
DF=[]
for Cy in self.scanResult[Cq].indexes
values=self.scanResult[Cq][Cy].join(",")
DF.push(Cy+EZ+values)
end for
DE=DE+DF.join("|")+char(10)
end for
DD.set_content(DE)
end function
Al.loadResult=function
X=AJ.vexxed[EK].host_computer
if not X.File(EY) then
self.scanResult={}
else
BP=X.File(EY).get_content
if BP.len==EJ then
self.scanResult={}
else
DG=BP.split(char(10))
for Cu in DG
if Cu.trim.len==EJ then
continue
end if
DH=Cu.split("\|")
Cq=DH[EJ]
DI=DH[EG:]
self.scanResult[Cq]={}
for DJ in DI
DF=DJ.split(EZ)
Cy=DF[EJ]
values=DF[EG].split(",")
self.scanResult[Cq][Cy]=values
end for
end for
end if
end if
end function
Al.resultObjects={}
Al.crackLib=function(Cq,DK)
self.resultObjects[Cq]=[]
Cw=self.metaLibs[Cq]
DL=self.scanResult[Cq]
for Cy in DL.indexes
for R in DL[Cy]
Z=Cw.overflow(Cy,R,DK)
if Z and typeof(Z)!="number" then
if typeof(Z)==Dk then
BM=new Ap
BM.updateFileObject(Z)
self.resultObjects[Cq].push(BM)
end if
if typeof(Z)=="computer" then
DM=new Bi
DM.updateComputerObject(Z)
self.resultObjects[Cq].push(DM)
end if
if typeof(Z)==Ea then
CM=new Bz
CM.updateShellObject(Z)
self.resultObjects[Cq].push(CM)
end if
end if
end for
end for
end function
Al.printVulns=function(Cq)
print("Listing stored vulns for: "+Cq)
Bx=Dw
for Aa in range(EJ,self.resultObjects[Cq].len-EG,EG)
Bx=Bx+(str(Aa)+Dx+self.resultObjects[Cq][Aa].getPerms+"    "+typeof(self.resultObjects[Cq][Aa].getObject)+"    "+self.resultObjects[Cq][Aa].getLANIP+ER)
end for
print(format_columns(Bx))
end function
Al.handleInput=function(An)
if An.len==EJ or not self.inputMap.hasMethod(An[EJ]) then
return 
end if
Ao=@self.inputMap[An[EJ]]
return Ao(self,An)
end function
DN={}
DN.clients=[]
DN.inputMap={}
DN.inputMap["list"]=function(AX,AY)
AX.listClients
end function
DN.inputMap["refresh"]=function(AX,AY)
AX.updateClients(get_custom_object.vexxed[Eb])
end function
DN.inputMap["use"]=function(AX,AY)
if AY.len<EL then
print("Usage: revshell use [index]")
return 
end if
CM=new Bz
AX.setActiveClient(AY[EG].to_int,CM)
if CM.getObject then
AJ.vexxed[EF].addHandler(CM)
end if
end function
DN.inputMap["install"]=function(AX,AY)
AX.installServer
end function
DN.inputMap["connect"]=function(AX,AY)
if AY.len<ES then
print("Usage: revshell connect [ip] [port] [proc=Terminal.exe]")
return 
end if
if not AY.hasIndex(ES) then
AY.push("Terminal.exe")
end if
AX.startClient(AY[EG],AY[EL].to_int,AY[ES])
end function
DN.inputMap["setlib"]=function(AX,AY)
AX.setServerLib
end function
DN.getClients=function(DW)
return DW.rshell_server
end function
DN.updateClients=function(DW)
self.clients=self.getClients(DW)
if self.clients isa list then
print("Clients updated successfully.")
else
print(self.clients)
end if
end function
DN.listClients=function
if self.clients.len==EJ or self.clients isa string then
print("No shells connected.")
return 
end if
for Aa in range(EJ,self.clients.len-EG)
print("\n<b>Shell ("+(Aa)+")</b>\nPublic IP: "+self.clients[Aa].host_computer.public_ip+"\nLocal IP: "+self.clients[Aa].host_computer.local_ip)
end for
end function
DN.setActiveClient=function(AZ,DX)
if self.clients[AZ] and self.clients isa list then
DX.updateShellObject(self.clients[AZ])
else
print("Shell at index "+AZ+" does not exist.")
end if
end function
DN.setServerLib=function
AJ.vexxed[Eb]=AJ.vexxed[EC]
print("Server library set to remote Metaxploit.")
end function
DN.installServer=function
AJ.vexxed[EF].currHandler.putFile("/root/VulnLibs/librshell.so")
AJ.vexxed[EF].currHandler.moveFile("librshell.so","/lib/","librshell.so")
DY=include_lib("/lib/librshell.so")
if not DY then
print("Failed to install reverse shell server.")
return 
end if
Z=DY.install_service
if Z!=Dz then
print("Error installing rshell: "+Z)
end if
end function
DN.startClient=function(CQ,CR,DZ)
AJ.vexxed[Eb].rshell_client(CQ,CR,DZ)
end function
DN.handleInput=function(An)
if An.len==EJ or not self.inputMap.hasMethod(An[EJ]) then
return 
end if
Ao=@self.inputMap[An[EJ]]
return Ao(self,An)
end function
I={}
I.startEngine=function
self.printSplash
self.promptPassword
self.loadSession
AJ.vexxed[Ec].loadResult
CM=new Bz
CM.updateShellObject(get_shell)
AJ.vexxed[EF].addHandler(CM)
DN.updateClients(AJ.vexxed[Eb])
self.promptUser
end function
I.loadSession=function
if get_custom_object.hasIndex("vexxed") then
print("Session found. Importing objects...")
AK.importSession
return 
end if
print("No session found or running from home. Creating new session...")
AK.initSession
end function
I.printSplash=function
print("\n ___      ___  _______  ___  ___  ___  ___  _______  ________   ")
print("|""  \    /""  |/""     ""||""  \/""  ||""  \/""  |/""     ""||""      ""\  ")
print(" \   \  //  /(: ______) \   \  /  \   \  /(: ______)(.  ___  :) ")
print("  \\  \/. ./  \/    |    \\  \/    \\  \/  \/    |  |: \   ) || ")
print("   \.    //   // ___)_   /\.  \    /\.  \  // ___)_ (| (___\ || ")
print("    \\   /   (:      ""| /  \   \  /  \   \(:      ""||:       :) ")
print("     \__/     \_______)|___/\___||___/\___|\_______)(________/  ")
end function
I.promptPassword=function
An=user_input("Password: ",EG)
if An!=Dw then
exit("Wrong password, nice try.")
end if
end function
I.promptUser=function
while Dz
An=user_input("["+AJ.vexxed[EF].currHandler.displayID+EZ+AJ.vexxed[EF].currHandler.getPubIP+EZ+AJ.vexxed[EF].currHandler.getLANIP+EH+AJ.vexxed[EF].sessionStack.len+"] "+AJ.vexxed[EF].currHandler.fileObject.path+"# ")
self.handleInput(An.trim)
end while
end function
I.handleInput=function(An)
if An=="exit" then
AJ.vexxed[EF].exitLayer
exit("Exiting...")
end if
if An=="clear" then
clear_screen
end if
An=An.split("\|")
for BQ in An
BQ=BQ.trim.split(EH)
BQ=BQ.wherenot(Dj,EJ)
if BQ.len==EJ then
continue
end if
self.handleOutput(CU.handleInput(BQ))
self.handleOutput(DN.handleInput(BQ[EG:]))
self.handleOutput(AJ.vexxed[Ec].handleInput(BQ))
self.handleOutput(AJ.vexxed[EF].handleInput(BQ))
self.handleOutput(AJ.vexxed[EF].currHandler.handleInput(BQ))
if BQ[EJ]=="dumpcob" then
for Aa in AJ.indexes
print(AJ[Aa])
end for
end if
end for
end function
I.handleOutput=function(Df)
if typeof(Df)==Dg then
print(Df)
else if Df!=D_ then
print(Df.toString)
end if
end function
I.startEngine