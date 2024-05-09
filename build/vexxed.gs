globals.H=globals
H.EF=true
H.EE=false
H.Dp="string"
H.Dq="is"
H.Dr="contains"
H.Ds="len"
H.Dt="file"
H.Du="name"
H.Dv="namehas"
H.Dw="path"
H.Dx="permissions"
H.Dy="has_permission"
H.EG=""
H.Dz="size"
H.D_="port"
H.EA="port_number"
H.EB="is_closed"
H.EC="get_lan_ip"
H.ED="map"
H.ER=0
H.EJ=1
H.EV="."
H.Ei=10
H.EH=": "
H.EI=" to "
H.EK=null
H.EW=2
H.ES=" "
H.Em="exploiter"
H.EQ="session"
H.EL="/metaxploit.so"
H.EM="/crypto.so"
H.EU="homeShell"
H.EP="remoteShell"
H.Ef="homeMetax"
H.El="revMetax"
H.EN="remoteMetax"
H.Eg="homeCrypto"
H.EO="remoteCrypto"
H.Ec=3
H.ET="/"
H.Eb="\n"
H.EX="r"
H.EY="w"
H.EZ="x"
H.Ed="/root/Loot/"
H.Ea="fstab"
H.Ek="shell"
H.Ej=":"
H.Ee="  "
H.Eh="/root/Vexxed/payloads.db"
map.first=function(R,S)
for T in self.indexes
if self[T][R]==S then
return self[T]
end if
end for
end function
map.where=function(R,S)
U={}
for T in self.indexes
if self[T][R]==S then
U.push(self[T])
end if
end for
return U
end function
map.wherenot=function(R,S)
U={}
for T in self.indexes
if self[T][R]!=S then
U.push(self[T])
end if
end for
return U
end function
map.hasMethod=function(V)
W=self
if W.hasIndex(V) then
return EF
end if
while W.hasIndex("__isa")
W=W["__isa"]
if W.hasIndex(V) then
return EF
end if
end while
return EE
end function
list.first=function(R,S)
for T in self
if typeof(T)==Dp then
if R==Dq and T==S then
return T
end if
if R==Dr and T.is_match(S) then
return T
end if
if R==Ds and T.len==S then
return T
end if
else if typeof(T)==Dt then
if R==Du and T.name==S then
return T
end if
if R==Dv and T.name.is_match(S) then
U.push(T)
end if
if R==Dw and T.path==S then
return T
end if
if R==Dx and T.permissions==S then
return T
end if
if R==Dy then
X=S.values
Y=EG
for Z in X
if T.has_permission(Z) then
Y=Y+Z
end if
end for
if Y==S then
return T
end if
end if
if R==Dz and T.size==S then
return T
end if
else if typeof(T)==D_ then
if R==EA and T.port_number==S then
return T
end if
if R==EB and T.is_closed==S then
return T
end if
if R==EC and T.get_lan_ip==S then
return T
end if
else if typeof(T)==ED then
if T[R]==S then
return T
end if
end if
end for
end function
list.where=function(R,S)
U=[]
for T in self
if typeof(T)==Dp then
if R==Dq and T==S then
U.push(T)
end if
if R==Dr and T.is_match(S) then
U.push(T)
end if
if R==Ds and T.len==S then
U.push(T)
end if
else if typeof(T)==Dt then
if R==Du and T.name==S then
U.push(T)
end if
if R==Dv and T.name.is_match(S) then
U.push(T)
end if
if R==Dw and T.path==S then
U.push(T)
end if
if R==Dx and T.permissions==S then
U.push(T)
end if
if R==Dy then
X=S.values
Y=EG
for Z in X
if T.has_permission(Z) then
Y=Y+Z
end if
end for
if Y==S then
U.push(T)
end if
end if
if R==Dz and T.size==S then
U.push(T)
end if
else if typeof(T)==D_ then
if R==EA and T.port_number==S then
U.push(T)
end if
if R==EB and T.is_closed==S then
U.push(T)
end if
if R==EC and T.get_lan_ip==S then
U.push(T)
end if
else if typeof(T)==ED then
if T[R]==S then
U.push(T)
end if
end if
end for
return U
end function
list.wherenot=function(R,S)
U=[]
for T in self
if typeof(T)==Dp then
if R==Dq and T!=S then
U.push(T)
end if
if R==Dr and not T.is_match(S) then
U.push(T)
end if
if R==Ds and T.len!=S then
U.push(T)
end if
else if typeof(T)==Dt then
if R==Du and T.name!=S then
U.push(T)
end if
if R==Dv and T.name.is_match(S) then
U.push(T)
end if
if R==Dw and T.path!=S then
U.push(T)
end if
if R==Dx and T.permissions!=S then
U.push(T)
end if
if R==Dy then
X=S.values
Y=EG
for Z in X
if T.has_permission(Z) then
Y=Y+Z
end if
end for
if Y!=S then
U.push(T)
end if
end if
if R==Dz and T.size!=S then
U.push(T)
end if
else if typeof(T)==D_ then
if R==EA and T.port_number!=S then
U.push(T)
end if
if R==EB and T.is_closed!=S then
U.push(T)
end if
if R==EC and T.get_lan_ip!=S then
U.push(T)
end if
else if typeof(T)==ED then
if T[R]!=S then
U.push(T)
end if
end if
end for
return U
end function
string.regex_escape=function
a=self
for b in "+*?^$.[]{}()|/"
a=a.replace("\"+b,"\"+b)
end for
return a
end function
string.color=function(c)
return "<color="+c+">"+self+"</color>"
end function
string.to_num=function
d=self
a=ER
e=EE
f=ER
g=EE
if self[ER]=="-" then
g=EF
d=self[EJ:]
end if
for h in range(ER,d.len-EJ)
if d[h]==EV then
if e then
return self
end if
e=EF
else
i=d[h].to_int
if i<ER or i>9 then
return self
end if
if e then
f=f+EJ
a=a+i/(Ei^f)
else
a=(a*Ei)+i
end if
end if
end for
if g then
a=-a
end if
return a
end function
j={}
j.classID="GenericError"
j.message="An error occurred."
j.create=function(l="An error occurred.")
AB=new j
AB.message=l
return AB
end function
j.toString=function
return self.message
end function
o=new j
o.classID="GenericFileError"
o.message="An error occurred with a file."
o.fileName=EG
o.create=function(p="")
AB=new o
AB.message="An error occurred with file: "+p
AB.fileName=p
return AB
end function
q=new o
q.classID="FileNotFoundError"
q.message="File or directory not found."
q.fileName=EG
q.create=function(p="")
AB=new q
AB.message="File or directory not found: "+p
AB.fileName=p
return AB
end function
r=new o
r.classID="FileReadError"
r.message="Error reading file."
r.fileName=EG
r.create=function(p="")
AB=new r
AB.message="Error reading file: "+p
AB.fileName=p
return AB
end function
s=new o
s.classID="FileWriteError"
s.message="Error writing file."
s.fileName=EG
s.reason=EG
s.create=function(p="",t="")
AB=new s
AB.message="Error writing file "+p+EH+t
AB.fileName=p
AB.reason=t
return AB
end function
u=new o
u.classID="FileDeleteError"
u.message="Error deleting file."
u.fileName=EG
u.reason=EG
u.create=function(p="",t="")
AB=new u
AB.message="Error deleting file "+p+EH+t
AB.fileName=p
AB.reason=t
return AB
end function
v=new o
v.classID="FileCopyError"
v.message="Error copying file."
v.fileName=EG
v.destination=EG
v.reason=EG
v.create=function(p="",w="",t="")
AB=new v
AB.message="Error copying file "+p+EI+w+EH+t
AB.fileName=p
AB.destination=w
AB.reason=t
return AB
end function
x=new o
x.classID="FileMoveError"
x.message="Error moving file."
x.fileName=EG
x.destination=EG
x.reason=EG
x.create=function(p="",w="",t="")
AB=new x
AB.message="Error moving file "+p+EI+w+EH+t
AB.fileName=p
AB.destination=w
AB.reason=t
return AB
end function
y=new o
y.classID="FileChmodError"
y.message="Error changing file permissions."
y.fileName=EG
y.permissions=EG
y.reason=EG
y.create=function(p="",permissions="",t="")
AB=new y
AB.message="Error changing file permissions for "+p+EI+permissions+EH+t
AB.fileName=p
AB.permissions=permissions
AB.reason=t
return AB
end function
z=new o
z.classID="FileChgrpError"
z.message="Error changing file group."
z.fileName=EG
z.group=EG
z.reason=EG
z.create=function(p="",group="",t="")
AB=new z
AB.message="Error changing file group for "+p+EI+group+EH+t
AB.fileName=p
AB.group=group
AB.reason=t
return AB
end function
_A=new o
_A.classID="FileChownError"
_A.message="Error changing file owner."
_A.fileName=EG
_A.owner=EG
_A.reason=EG
_A.create=function(p="",owner="",t="")
AB=new _A
AB.message="Error changing file owner for "+p+EI+owner+EH+t
AB.fileName=p
AB.owner=owner
AB.reason=t
return AB
end function
AC=new j
AC.classID="GenericComputerError"
AC.message="An error with a computer object has occurred."
AC.create=function
return new AC
end function
AD=new AC
AD.classID="ComputerProcError"
AD.message="Error killing a process."
AD.pid=ER
AD.reason=EG
AD.create=function(AE=0,t="")
AB=new AD
AB.message="Error killing process: "+AE+EH+t
AB.pid=AE
AB.reason=t
return AB
end function
AF=new AC
AF.classID="ComputerUserAddError"
AF.message="Error adding a user."
AF.username=EG
AF.password=EG
AF.reason=EG
AF.create=function(AG="",AH="",t="")
AB=new AF
AB.message="Error adding user "+AG+" with password "+AH+EH+t
AB.username=AG
AB.password=AH
AB.reason=t
return AB
end function
AI=new AC
AI.classID="ComputerUserRemoveError"
AI.message="Error removing a user."
AI.username=EG
AI.reason=EG
AI.create=function(AG="",t="")
AB=new AI
AB.message="Error removing user "+AG+EH+t
AB.username=AG
AB.reason=t
return AB
end function
AJ=new AC
AJ.classID="ComputerUserChPassError"
AJ.message="Error changing a user's password."
AJ.username=EG
AJ.password=EG
AJ.reason=EG
AJ.create=function(AG="",AH="",t="")
AB=new AJ
AB.message="Error changing password for user "+AG+EI+AH+EH+t
AB.username=AG
AB.password=AH
AB.reason=t
return AB
end function
AK=new AC
AK.classID="ComputerTouchError"
AK.message="Error touching a file."
AK.filename=EG
AK.reason=EG
AK.create=function(AL="",t="")
AB=new AK
AB.message="Error touching file "+AL+EH+t
AB.filename=AL
AB.reason=t
return AB
end function
AM=new AC
AM.classID="ComputerMkdirError"
AM.message="Error creating a directory."
AM.directory=EG
AM.reason=EG
AM.create=function(AN="",t="")
AB=new AM
AB.message="Error creating directory "+AN+EH+t
AB.directory=AN
AB.reason=t
return AB
end function
AO=new AC
AO.classID="ComputerInvalidInterfaceError"
AO.message="Invalid interface."
AO.interface=EG
AO.create=function(AP="")
AB=new AO
AB.message="Invalid interface: "+AP
AB.interface=AP
return AB
end function
H.AQ=@get_custom_object
AR={}
AR.currHandler=EK
AR.handlerStack=[]
AR.sessionStack=[]
AR.currLib={}
AR.inputMap={}
AR.inputMap["pop"]=function(Ae,Af)
if Af.len>EJ then
Ag=Af[EJ]
else
Ag=-EJ
end if
if Ae.handlerStack.len<EW or Ag==ER then
return j.create("Error: cannot pop local shell.")
end if
Ae.handlerStack.remove(Ag)
if not Ae.handlerStack.indexOf(Ae.currHandler) then
Ae.updateCurrHandler(-EJ)
end if
end function
AR.inputMap["hstack"]=function(Ae,Af)
for h in range(ER,Ae.handlerStack.len-EJ)
Ah=Ae.handlerStack[h]
if Ah.UID==Ae.currHandler.UID then
print(h+"* "+Ah.classID+EH+Ah.getPubIP+ES+Ah.getLANIP)
else
print(h+ES+Ah.classID+EH+Ah.getPubIP+ES+Ah.getLANIP)
end if
end for
end function
AR.inputMap["use"]=function(Ae,Af)
if Af.len<EW then
return "Usage: use [index]"
end if
Ae.addHandler(AQ.vexxed[Em].resultObjects[AQ.vexxed[EQ].currLib][Af[EJ].to_int])
end function
AR.inputMap["switch"]=function(Ae,Af)
if Af.len<EW then
print("Error: switch requires a handler index.")
return 
end if
Ae.updateCurrHandler(Af[EJ].to_int)
end function
AR.updateCurrHandler=function(Ag)
self.currHandler=self.handlerStack[Ag]
end function
AR.addHandler=function(Ah)
self.handlerStack.push(Ah)
self.updateCurrHandler(-EJ)
end function
AR.setCurrLib=function(val)
self.currLib=val
end function
AR.initSession=function
H.An=include_lib(current_path+"/aptclient.so")
if not An then
exit("Could not import aptclient. Exiting.")
end if
An.update
if get_shell.host_computer.File(current_path+EL)==EK or An.check_upgrade(current_path+EL)==EF then
An.install("metaxploit.so",current_path)
end if
if get_shell.host_computer.File(current_path+EM)==EK or An.check_upgrade(current_path+EM)==EF then
An.install("crypto.so",current_path)
end if
H.Ao=include_lib(current_path+EL)
H.Ap=include_lib(current_path+EM)
if not Ao then
exit("Could not import metaxploit. Exiting.")
end if
if not Ap then
exit("Could not import crypto. Exiting.")
end if
AQ.vexxed={}
AQ.vexxed[EQ]=self
AQ.vexxed[Em]=H.Aq
AQ.vexxed[EU]=get_shell
AQ.vexxed[EP]=get_shell
AQ.vexxed[Ef]=Ao
AQ.vexxed[El]=Ao
AQ.vexxed[EN]=Ao
AQ.vexxed[Eg]=Ap
AQ.vexxed[EO]=Ap
end function
AR.importSession=function
H.Ao=include_lib(current_path+EL)
H.Ap=include_lib(current_path+EM)
if not Ao then
exit("Could not import metaxploit. Exiting.")
end if
if not Ap then
exit("Could not import crypto. Exiting.")
end if
Ar={}
Ar[EN]=AQ.vexxed[EN]
Ar[EO]=AQ.vexxed[EO]
Ar[EP]=AQ.vexxed[EP]
AQ.vexxed[EQ].sessionStack.push(Ar)
AQ.vexxed[EN]=Ao
AQ.vexxed[EO]=Ap
AQ.vexxed[EP]=get_shell
end function
AR.exitLayer=function
if self.sessionStack.len==ER then
print("No previous layer to return to. Returning to terminal.")
return 
end if
Ar=self.sessionStack.pop
AQ.vexxed[EN]=Ar[EN]
AQ.vexxed[EO]=Ar[EO]
AQ.vexxed[EP]=Ar[EP]
end function
AR.handleInput=function(As)
if As.len==ER or not self.inputMap.hasMethod(As[ER]) then
return 
end if
At=@self.inputMap[As[ER]]
return At(self,As)
end function
Au={}
Au.fileObject=EK
Au.classID="FileHandler"
Au.displayID="File"
Au.UID=EK
Au.inputMap={}
Au.inputMap["ls"]=function(Ae,Af)
return Ae.getFiles
end function
Au.inputMap["cat"]=function(Ae,Af)
if Af.len>EJ then
return Ae.readFile(Af[EJ])
else
return "Usage: cat [file]"
end if
end function
Au.inputMap["rm"]=function(Ae,Af)
if Af.len>EJ then
return Ae.deleteFile(Af[EJ])
else
return "Usage: rm [file]"
end if
end function
Au.inputMap["cd"]=function(Ae,Af)
if Af.len>EJ then
return Ae.changeFile(Af[EJ])
else
return "Usage: cd [directory]"
end if
end function
Au.inputMap["cp"]=function(Ae,Af)
if Af.len>Ec then
return Ae.copyFile(Af[EJ],Af[EW],Af[Ec])
else
return "Usage: cp [file] [path] [newName]"
end if
end function
Au.inputMap["mv"]=function(Ae,Af)
if Af.len>Ec then
return Ae.moveFile(Af[EJ],Af[EW],Af[Ec])
else
return "Usage: mv [file] [path] [newName]"
end if
end function
Au.inputMap["gettext"]=function(Ae,Af)
if Af.len>EJ then
return Ae.getTextFile(Af[EJ])
else
return "Usage: gettext [file]"
end if
end function
Au.inputMap["chmod"]=function(Ae,Af)
if Af.len>Ec then
return Ae.changePerms(Af[EJ],Af[EW],Af[Ec].to_int)
else
return "Usage: chmod [file] [perms] [recursive]"
end if
end function
Au.inputMap["chgrp"]=function(Ae,Af)
if Af.len>Ec then
return Ae.changeGroup(Af[EJ],Af[EW],Af[Ec].to_int)
else
return "Usage: chgrp [file] [group] [recursive]"
end if
end function
Au.inputMap["chown"]=function(Ae,Af)
if Af.len>Ec then
return Ae.changeOwner(Af[EJ],Af[EW],Af[Ec].to_int)
else
return "Usage: chown [file] [owner] [recursive]"
end if
end function
Au.inputMap["write"]=function(Ae,Af)
if Af.len>EW then
return Ae.writeFile(Af[EJ],Af[EW:].join(ES))
else
return "Usage: write [file] [content]"
end if
end function
Au.inputMap["fschk"]=function(Ae,Af)
if Af.len>EJ then
p=Af[EJ]
else
p=ET
end if
return Ae.treeAction(p,@Ae.accessCheck)
end function
Au.inputMap["logwipe"]=function(Ae,Af)
return Ae.logWipe
end function
Au.getObject=function
return self.fileObject
end function
Au.updateFileObject=function(Av)
self.fileObject=Av
self.genUID
end function
Au.listFile=function(BR)
return BR.permissions+ES+BR.owner+ES+BR.group+ES+BR.size+ES+BR.name
end function
Au.getFiles=function
a=EG
a=a+"Permissions Owner Group Size Name\n"
a=a+self.fileObject.permissions+ES+self.fileObject.owner+ES+self.fileObject.group+ES+self.fileObject.size+" .\n"
for BR in self.fileObject.get_files
a=a+self.listFile(BR)+Eb
end for
for BS in self.fileObject.get_folders
a=a+self.listFile(BS)+Eb
end for
return format_columns(a)
end function
Au.checkFile=function(p)
if p==EV then
return self.fileObject
end if
BR=self.fileObject.get_files.first(Du,p)
BS=self.fileObject.get_folders.first(Du,p)
if BR then
return BR
end if
if BS then
return BS
end if
return EE
end function
Au.accessCheck=function(Ae,BR)
if BR.has_permission(EX) or BR.has_permission(EY) or BR.has_permission(EZ) or BR.owner==self.getPerms then
return Ae.listFile(BR)+char(Ei)
end if
end function
Au.treeAction=function(BR,BT)
if BR==ET then
self.toRoot
BR=self.fileObject
end if
if typeof(BR)!=Dt then
return "Invalid argument."
end if
a=EG
a=a+BT(self,BR)
for T in BR.get_files
a=a+BT(self,T)
end for
for T in BR.get_folders
a=a+self.treeAction(T,@BT)
end for
return a
end function
Au.readFile=function(p)
BR=self.fileObject.get_files.first(Du,p)
if not BR then
return q.create(p)
end if
a=BR.get_content
if not a then
return r.create(p)
else
return a
end if
end function
Au.writeFile=function(p,BU)
BR=self.fileObject.get_files.first(Du,p)
if not BR then
return q.create(p)
end if
a=BR.set_content(BU)
if a!=EF then
return s.create(p,a)
else
return "Content written."
end if
end function
Au.deleteFile=function(p)
BR=self.checkFile(p)
if not BR then
return q.create(p)
end if
a=BR.delete
if a.trim.len!=ER then
return u.create(p,a)
else
return "File deleted."
end if
end function
Au.changeFile=function(BV)
BW=BV.split(ET)
if BV[ER]==ET then
self.toRoot
end if
for T in BW
if T.trim.len==ER or T==EV then
continue
end if
if T==".." then
if self.fileObject.parent then
self.fileObject=self.fileObject.parent
else
return j.create("Cannot go up. If you aren't in /, cwd may have been deleted.")
end if
else
if not self.checkFile(T) then
return q.create(T)
end if
self.fileObject=self.fileObject.get_folders.first(Du,T)
end if
end for
end function
Au.moveFile=function(p,BX,BY)
BR=self.checkFile(p)
if not BR then
return q.create(p)
end if
a=BR.move(BX,BY)
if a!=EF then
return x.create(p,BX,a)
else
return "File moved."
end if
end function
Au.copyFile=function(p,BX,BY)
BR=self.checkFile(p)
if not BR then
return q.create(p)
end if
a=BR.copy(BX,BY)
if a!=EF then
return v.create(p,BX,a)
else
return "File copied."
end if
end function
Au.getTextFile=function(p)
BZ=self.readFile(p)
if BZ isa r then
return BZ
end if
AQ.vexxed[EU].host_computer.touch(Ed,p)
AQ.vexxed[EU].host_computer.File(Ed+p).set_content(BZ)
return "File copied to /root/Loot/"+p
end function
Au.getLANIP=function
return "N/A"
end function
Au.getPubIP=function
return "N/A"
end function
Au.getPerms=function
self.toRoot
Ba=self.fileObject.get_folders.first(Dw,"/root")
if Ba and Ba.has_permission(EX) and Ba.has_permission(EY) and Ba.has_permission(EZ) then
return "root"
end if
Bb=self.fileObject.get_folders.first(Dw,"/home")
if Bb then
Bc=Bb.get_folders.wherenot(Dw,"/home/guest")
if Bc then
for T in Bc
if T.has_permission(EX) and T.has_permission(EY) and T.has_permission(EZ) then
return "user"
end if
end for
end if
end if
return "guest"
end function
Au.toRoot=function
while parent(self.fileObject)
a=self.changeFile("..")
if a isa j then
return a
end if
end while
end function
Au.changePerms=function(p,Bd,Be=0)
if p==EV then
BR=self.fileObject
else
BR=self.checkFile(p)
end if
if not BR then
return q.create(p)
end if
a=BR.chmod("u-rwx",Be)
if a.trim.len!=ER then
return y.create(p,Bd,a)
end if
BR.chmod("g-rwx",Be)
BR.chmod("o-rwx",Be)
Bf=Bd[ER].to_int
Bg=Bd[EJ].to_int
Bh=Bd[EW].to_int
Bi="u+"
if bitAnd(Bf,4) then
Bi=Bi+EX
end if
if bitAnd(Bf,EW) then
Bi=Bi+EY
end if
if bitAnd(Bf,EJ) then
Bi=Bi+EZ
end if
Bj="g+"
if bitAnd(Bg,4) then
Bj=Bj+EX
end if
if bitAnd(Bg,EW) then
Bj=Bj+EY
end if
if bitAnd(Bg,EJ) then
Bj=Bj+EZ
end if
Bk="o+"
if bitAnd(Bh,4) then
Bk=Bk+EX
end if
if bitAnd(Bh,EW) then
Bk=Bk+EY
end if
if bitAnd(Bh,EJ) then
Bk=Bk+EZ
end if
BR.chmod(Bi,Be)
BR.chmod(Bj,Be)
BR.chmod(Bk,Be)
return "Permissions changed."
end function
Au.changeGroup=function(p,Bl,Be=0)
if p!=EV then
BR=self.fileObject.get_files.first(Du,p)
else
BR=self.fileObject
end if
if not BR then
return q.create(p)
end if
a=BR.set_group(Bl,Be)
if a.trim.len!=ER then
return z.create(p,Bl,a)
else
return "Group changed."
end if
end function
Au.changeOwner=function(p,Bm,Be=0)
if p!=EV then
BR=self.fileObject.get_files.first(Du,p)
else
BR=self.fileObject
end if
if not BR then
return q.create(p)
end if
a=BR.set_owner(Bm,Be)
if a.trim.len!=ER then
return _A.create(p,Bm,a)
else
return "Owner changed."
end if
end function
Au.logWipe=function
if self.getPerms!="root" then
return "Root permissions required."
end if
a=self.toRoot
if a isa j then
return a
end if
a=self.changeFile("etc")
if a isa j then
return a
end if
a=self.writeFile(Ea,"rosebud")
if a isa j then
return a
end if
a=self.copyFile(Ea,"/var/","system.log")
if a isa j then
return a
end if
self.writeFile(Ea,EG)
return "Logs wiped."
end function
Au.genUID=function
self.UID=md5(str(rnd+rnd+rnd+rnd))
end function
Au.handleInput=function(As)
if As.len==ER or not self.inputMap.hasMethod(As[ER]) then
return 
end if
At=@self.inputMap[As[ER]]
return At(self,As)
end function
Bn=new Au
Bn.computerObject=EK
Bn.classID="ComputerHandler"
Bn.displayID="Computer"
Bn.inputMap=new Au.inputMap
Bn.inputMap["ps"]=function(Ae,Af)
return Ae.getProcesses
end function
Bn.inputMap["ifconfig"]=function(Ae,Af)
return Ae.netInfo
end function
Bn.inputMap["kill"]=function(Ae,Af)
if Af.len>EJ then
return Ae.closeProcess(Af[EJ].to_int)
else
return "Usage: kill [pid]"
end if
end function
Bn.inputMap["useradd"]=function(Ae,Af)
if Af.len>EW then
return Ae.userAdd(Af[EJ],Af[EW])
else
return "Usage: useradd [username] [password]"
end if
end function
Bn.inputMap["passwd"]=function(Ae,Af)
if Af.len>EW then
return Ae.changePass(Af[EJ],Af[EW])
else
return "Usage: passwd [username] [password]"
end if
end function
Bn.inputMap["touch"]=function(Ae,Af)
if Af.len>EJ then
return Ae.createFile(Ae.fileObject.path,Af[EJ])
else
return "Usage: touch [filename]"
end if
end function
Bn.inputMap["mkdir"]=function(Ae,Af)
if Af.len>EJ then
return Ae.createFolder(Ae.fileObject.path,Af[EJ])
else
return "Usage: mkdir [foldername]"
end if
end function
Bn.inputMap["iwlist"]=function(Ae,Af)
if Af.len>EJ then
return Ae.getWiFiObjects(Af[EJ])
else
return "Usage: iwlist [interface]"
end if
end function
Bn.getObject=function
return self.computerObject
end function
Bn.updateComputerObject=function(Bo)
self.computerObject=Bo
if self.fileObject then
self.updateFileObject(Bo.File(self.fileObject.path))
else
self.updateFileObject(Bo.File(ET))
end if
end function
Bn.getProcesses=function
return self.computerObject.show_procs
end function
Bn.closeProcess=function(AE)
a=self.computerObject.close_program(AE)
if a!=EF then
return AD.create(AE,a)
end if
end function
Bn.userAdd=function(AG,AH)
a=self.computerObject.create_user(AG,AH)
if a!=EF then
return AF.create(AG,AH,a)
end if
end function
Bn.changePass=function(AG,AH)
a=self.computerObject.change_password(AG,AH)
if a!=EF then
return B_.create(AG,AH,a)
end if
end function
Bn.createFile=function(path,p)
a=self.computerObject.touch(path,p)
if a!=EF then
return AK.create(path,p,a)
end if
end function
Bn.createFolder=function(path,BS)
a=self.computerObject.create_folder(path,BS)
if a!=EF then
return AM.create(path,BS,a)
end if
end function
Bn.netInfo=function
return "Local IP: "+self.getLANIP+"\nPublic IP: "+self.getPubIP+"\nActive card: "+self.getActiveCard+"\nInterfaces:\n"+self.getInterfaces
end function
Bn.getActiveCard=function
return self.computerObject.active_net_card
end function
Bn.getInterfaces=function
return format_columns(self.computerObject.network_devices)
end function
Bn.getWiFiObjects=function(AP)
CA=self.computerObject.wifi_networks(AP)
if CA==EK then
return AO.create(AP)
end if
CB="BSSID PWR ESSID"
for CC in CA
CB=CB+Eb+CC
end for
return format_columns(CB)
end function
Bn.getLANIP=function
return self.computerObject.local_ip
end function
Bn.getPubIP=function
return self.computerObject.public_ip
end function
CD=new Bn
CD.shellObject=EK
CD.classID="ShellHandler"
CD.displayID="Shell"
CD.inputMap=new Bn.inputMap
CD.inputMap[Ek]=function(Ae,Af)
Ae.dropShell
end function
CD.inputMap["get"]=function(Ae,Af)
if Af.len>EJ then
return Ae.getFile(Af[EJ])
else
return "Usage: get [filename]"
end if
end function
CD.inputMap["put"]=function(Ae,Af)
if Af.len>EJ then
return Ae.putFile(Af[EJ])
else
return "Usage: put [filepath]"
end if
end function
CD.inputMap["build"]=function(Ae,Af)
if Af.len>Ec then
return Ae.buildFile(Af[EJ],Af[EW],Af[Ec])
else
return "Usage: build [srcPath] [binPath] [canImport]"
end if
end function
CD.inputMap["launch"]=function(Ae,Af)
if Af.len==EW then
return Ae.launchFile(Af[EJ],EG)
end if
if Af.len>EW then
return Ae.launchFile(Af[EJ],Af[EW:].join(ES))
else
return "Usage: launch [filePath] [args]"
end if
end function
CD.inputMap["sudo"]=function(Ae,Af)
if Af.len==EJ then
return Ae.trySudo(EG,EG)
end if
if Af.len>EW then
return Ae.trySudo(Af[EJ],Af[EW])
else
return "Usage: sudo [username] [password]"
end if
end function
CD.inputMap["jump"]=function(Ae,Af)
Ae.jumpTo
end function
CD.inputMap["connect"]=function(Ae,Af)
if Af.len>5 then
return Ae.connectService(Af[EJ],Af[EW].to_int,Af[Ec],Af[4],Af[5].to_int)
end if
if Af.len>4 then
return Ae.connectService(Af[EJ],Af[EW].to_int,Af[Ec],Af[4])
else
return "Usage: connect [ip] [port] [username] [password] [isFTP=0]"
end if
end function
CD.getObject=function
return self.shellObject
end function
CD.updateShellObject=function(CE)
self.shellObject=CE
self.updateComputerObject(host_computer(self.shellObject))
end function
CD.dropShell=function
start_terminal(self.shellObject)
end function
CD.getFile=function(p)
CO=self.fileObject.path+ET+p
a=scp(self.shellObject,CO,Ed,AQ.vexxed[EU])
if a!=EF then
return "Error downloading file: "+a
end if
end function
CD.putFile=function(BX)
a=scp(AQ.vexxed[EU],BX,self.fileObject.path,self.shellObject)
if a!=EF then
return "Error uploading file: "+a
end if
end function
CD.trySudo=function(CP,CQ)
if CP.trim.len==ER and CQ.trim.len==ER then
a=get_shell
else
a=get_shell(CP,CQ)
end if
if not a then
return "User/pass combo incorrect. Remember, this only works on the current remoteShell."
end if
CR=new CD
CR.updateShellObject(a)
AQ.vexxed[EQ].addHandler(CR)
end function
CD.buildFile=function(CS,CT,CU)
a=build(self.shellObject,CS,CT,CU)
if a!=EG then
print("Error building file: "+a)
end if
end function
CD.launchFile=function(BX,Af)
a=launch(self.shellObject,BX,Af)
print("Successfuly launched: "+a)
end function
CD.jumpTo=function
self.putFile("/root/Vexxed/vexxed")
self.putFile("/root/Vexxed/metaxploit.so")
self.putFile("/root/Vexxed/crypto.so")
self.launchFile(self.fileObject.path+"/vexxed",EG)
end function
CD.connectService=function(CV,CW,AG,CQ,CX=false)
if CX then
CY="ftp"
else
CY="ssh"
end if
a=connect_service(self.shellObject,CV,CW,AG,CQ,CY)
if a isa string then
print("Error connecting to service: "+a)
end if
if typeof(a)==Ek or typeof(a)=="ftpshell" then
CR=new CD
CR.updateShellObject(a)
AQ.vexxed[EQ].addHandler(CR)
end if
end function
CZ={}
CZ.inputMap={}
CZ.inputMap["whois"]=function(Ae,Af)
if Af.len>EJ then
return CZ.whoIs(Af[EJ])
else
return "Usage: whois [domain]"
end if
end function
CZ.inputMap["smtpdump"]=function(Ae,Af)
if Af.len>EW then
return CZ.smtpDump(Af[EJ],Af[EW].to_int)
else
return "Usage: smtpdump [ip] [port]"
end if
end function
CZ.inputMap["info"]=function(Ae,Af)
if Af.len>EJ then
return CZ.fullEnumerate(Af[EJ])
else
return "Usage: info [domain/ip]"
end if
end function
CZ.whoIs=function(Cd)
Ce=EG
if not is_valid_ip(Cd) then
Ce=nslookup(Cd)
print("Address: "+Ce)
else
Ce=Cd
end if
print(whois(Ce))
end function
CZ.smtpDump=function(CV,CW)
a=AQ.vexxed[EO].smtp_user_list(CV,CW)
if typeof(a)==Dp then
return a
end if
print("Users found: "+a.join(", "))
end function
CZ.fullEnumerate=function(CV)
print("whois "+CV+Ej)
CZ.whoIs(CV)
if not is_valid_ip(CV) then
CV=nslookup(CV)
end if
Cf=get_router(CV)
if Cf==EK then
return "Router not found."
end if
print("\nRouter LAN address: "+Cf.local_ip)
print("Router BSSID: "+Cf.bssid_name)
print("Router ESSID: "+Cf.essid_name)
print("\nPort-forwards detected: ")
for CW in Cf.used_ports
print(CW.port_number+"  open:"+(not CW.is_closed)+Ee+Cf.port_info(CW)+Ee+CW.get_lan_ip)
end for
print("\nFirewall rules: ")
for Cg in Cf.firewall_rules
print(Cg)
end for
print("\nLocal IPs detected: ")
for Ch in Cf.devices_lan_ip
print("\nLAN: "+Ch)
print("Ports detected: ")
Ci=Cf.device_ports(Ch)
if typeof(Ci)==Dp then
print(Ci)
continue
end if
for CW in Ci
print(CW.port_number+"  open:"+(not CW.is_closed)+Ee+Cf.port_info(CW)+Ee+CW.get_lan_ip)
end for
end for
end function
CZ.handleInput=function(As)
if As.len==ER or not self.inputMap.hasMethod(As[ER]) then
return 
end if
At=@self.inputMap[As[ER]]
return At(self,As)
end function
Aq={}
Aq.scanResult={}
Aq.metaLibs={}
Aq.inputMap={}
Aq.inputMap["scan"]=function(Ae,Af)
if Af.len<Ec then
return "Usage: scan [ip] [port]"
end if
Cv=Ae.scanPort(Af[EJ],Af[EW].to_int)
if not Cv then
return "Library was unable to be scanned."
else
return AQ.vexxed[EQ].setCurrLib(Cv)
end if
end function
Aq.inputMap["load"]=function(Ae,Af)
if Af.len<EW then
return "Usage: load [path]"
end if
Cv=Ae.scanLib(Ae.loadLib(Af[EJ]))
if not Cv then
return "Library was unable to be loaded."
else
return AQ.vexxed[EQ].setCurrLib(Cv)
end if
end function
Aq.inputMap["local"]=function(Ae,Af)
if Af.len<Ec then
return "Usage: local [path] [optVal]"
end if
a=Ae.inputMap.load(Ae,Af)
if a then
return a
end if
Ae.crackLib(AQ.vexxed[EQ].currLib,Af[EW])
Ae.printVulns(AQ.vexxed[EQ].currLib)
end function
Aq.inputMap["crack"]=function(Ae,Af)
if Af.len<EW then
return "Usage: crack [hash/file]"
end if
return Ae.crackHash(Af[EJ])
end function
Aq.inputMap["target"]=function(Ae,Af)
if Af.len<4 then
return "Usage: target [ip] [port] [optVal]"
end if
a=Ae.inputMap.scan(Ae,Af)
if a then
return a
end if
Ae.crackLib(AQ.vexxed[EQ].currLib,Af[Ec])
Ae.printVulns(AQ.vexxed[EQ].currLib)
end function
Aq.scanParse=function(Cw)
Cx=EE
Cy=[]
Cz=Cw.split(ES)
Cz.reverse
for C_ in Cz
if Cx==EF then
C_=C_.remove(EV)
C_=C_.remove("<b>")
C_=C_.remove("</b>")
Cy.push(C_)
Cx=EE
end if
if C_=="Buffer" then
Cx=EF
end if
end for
return Cy
end function
Aq.loadLib=function(BX)
DA=AQ.vexxed[EN].load(BX)
if DA then
return DA
end if
print("Library was unable to be loaded.")
end function
Aq.scanLib=function(DA)
Cv=DA.lib_name+"-"+DA.version
self.metaLibs[Cv]=DA
if self.scanResult.hasIndex(Cv) then
return Cv
end if
self.scanResult[Cv]={}
DB=AQ.vexxed[Ef].scan(DA)
for DC in DB
print("Scanning memory: "+DC)
self.scanResult[Cv][DC]=self.scanParse(AQ.vexxed[Ef].scan_address(DA,DC))
end for
self.saveResult
return Cv
end function
Aq.crackHash=function(hash)
BR=AQ.vexxed[EQ].currHandler.checkFile(hash)
if not BR then
return AQ.vexxed[Eg].decipher(hash)
end if
if BR.is_folder then
return j.create("Error: cannot crack a folder.")
end if
a=BR.get_content
if not a then
return r.create(p)
end if
DD=a.split(char(Ei))
CB="User Password"
for DE in DD
DE=DE.trim
if DE.len<33 then
continue
end if
DF=DE.split(Ej)
DG=decipher(AQ.vexxed[Eg],DF[EJ])
CB=CB+Eb+DF[ER]+ES+DG
end for
return format_columns(CB)
end function
Aq.loadRemoteLib=function(CV,CW)
DH=AQ.vexxed[EN].net_use(CV,CW)
if DH then
return DH.dump_lib
end if
print("Remote library was unable to be loaded.")
end function
Aq.scanPort=function(CV,CW)
DA=self.loadRemoteLib(CV,CW)
if not DA then
return 
end if
self.scanLib(DA)
return DA.lib_name+"-"+DA.version
end function
Aq.saveResult=function
Y=AQ.vexxed[EU].host_computer
if not Y.File(Eh) then
Y.touch("/root/Vexxed","payloads.db")
end if
DI=Y.File(Eh)
DJ=EG
for Cv in self.scanResult.indexes
DJ=DJ+Cv+"|"
DK=[]
for DC in self.scanResult[Cv].indexes
values=self.scanResult[Cv][DC].join(",")
DK.push(DC+Ej+values)
end for
DJ=DJ+DK.join("|")+char(Ei)
end for
DI.set_content(DJ)
end function
Aq.loadResult=function
Y=AQ.vexxed[EU].host_computer
if not Y.File(Eh) then
self.scanResult={}
else
BU=Y.File(Eh).get_content
if BU.len==ER then
self.scanResult={}
else
DL=BU.split(char(Ei))
for Cz in DL
if Cz.trim.len==ER then
continue
end if
DM=Cz.split("\|")
Cv=DM[ER]
DN=DM[EJ:]
self.scanResult[Cv]={}
for DO in DN
DK=DO.split(Ej)
DC=DK[ER]
values=DK[EJ].split(",")
self.scanResult[Cv][DC]=values
end for
end for
end if
end if
end function
Aq.resultObjects={}
Aq.crackLib=function(Cv,DP)
self.resultObjects[Cv]=[]
DA=self.metaLibs[Cv]
DQ=self.scanResult[Cv]
for DC in DQ.indexes
for S in DQ[DC]
a=DA.overflow(DC,S,DP)
if a and typeof(a)!="number" then
if typeof(a)==Dt then
BR=new Au
BR.updateFileObject(a)
self.resultObjects[Cv].push(BR)
end if
if typeof(a)=="computer" then
DR=new Bn
DR.updateComputerObject(a)
self.resultObjects[Cv].push(DR)
end if
if typeof(a)==Ek then
CR=new CD
CR.updateShellObject(a)
self.resultObjects[Cv].push(CR)
end if
end if
end for
end for
end function
Aq.printVulns=function(Cv)
print("Listing stored vulns for: "+Cv)
CB=EG
for h in range(ER,self.resultObjects[Cv].len-EJ,EJ)
CB=CB+(str(h)+EH+self.resultObjects[Cv][h].getPerms+"    "+typeof(self.resultObjects[Cv][h].getObject)+"    "+self.resultObjects[Cv][h].getLANIP+Eb)
end for
print(format_columns(CB))
end function
Aq.handleInput=function(As)
if As.len==ER or not self.inputMap.hasMethod(As[ER]) then
return 
end if
At=@self.inputMap[As[ER]]
return At(self,As)
end function
DS={}
DS.clients=[]
DS.inputMap={}
DS.inputMap["list"]=function(Ae,Af)
Ae.listClients
end function
DS.inputMap["refresh"]=function(Ae,Af)
Ae.updateClients(get_custom_object.vexxed[El])
end function
DS.inputMap["use"]=function(Ae,Af)
if Af.len<EW then
print("Usage: revshell use [index]")
return 
end if
CR=new CD
Ae.setActiveClient(Af[EJ].to_int,CR)
if CR.getObject then
AQ.vexxed[EQ].addHandler(CR)
end if
end function
DS.inputMap["install"]=function(Ae,Af)
Ae.installServer
end function
DS.inputMap["connect"]=function(Ae,Af)
if Af.len<Ec then
print("Usage: revshell connect [ip] [port] [proc=Terminal.exe]")
return 
end if
if not Af.hasIndex(Ec) then
Af.push("Terminal.exe")
end if
Ae.startClient(Af[EJ],Af[EW].to_int,Af[Ec])
end function
DS.inputMap["setlib"]=function(Ae,Af)
Ae.setServerLib
end function
DS.getClients=function(Db)
return Db.rshell_server
end function
DS.updateClients=function(Db)
self.clients=self.getClients(Db)
if self.clients isa list then
print("Clients updated successfully.")
else
print(self.clients)
end if
end function
DS.listClients=function
if self.clients.len==ER or self.clients isa string then
print("No shells connected.")
return 
end if
for h in range(ER,self.clients.len-EJ)
print("\n<b>Shell ("+(h)+")</b>\nPublic IP: "+self.clients[h].host_computer.public_ip+"\nLocal IP: "+self.clients[h].host_computer.local_ip)
end for
end function
DS.setActiveClient=function(Ag,Dc)
if self.clients[Ag] and self.clients isa list then
Dc.updateShellObject(self.clients[Ag])
else
print("Shell at index "+Ag+" does not exist.")
end if
end function
DS.setServerLib=function
AQ.vexxed[El]=AQ.vexxed[EN]
print("Server library set to remote Metaxploit.")
end function
DS.installServer=function
AQ.vexxed[EQ].currHandler.putFile("/root/VulnLibs/librshell.so")
AQ.vexxed[EQ].currHandler.moveFile("librshell.so","/lib/","librshell.so")
Dd=include_lib("/lib/librshell.so")
if not Dd then
print("Failed to install reverse shell server.")
return 
end if
a=Dd.install_service
if a!=EF then
print("Error installing rshell: "+a)
end if
end function
DS.startClient=function(CV,CW,De)
AQ.vexxed[El].rshell_client(CV,CW,De)
end function
DS.handleInput=function(As)
if As.len==ER or not self.inputMap.hasMethod(As[ER]) then
return 
end if
At=@self.inputMap[As[ER]]
return At(self,As)
end function
I={}
I.startEngine=function
self.printSplash
self.promptPassword
self.loadSession
AQ.vexxed[Em].loadResult
CR=new CD
CR.updateShellObject(get_shell)
AQ.vexxed[EQ].addHandler(CR)
DS.updateClients(AQ.vexxed[El])
self.promptUser
end function
I.loadSession=function
if get_custom_object.hasIndex("vexxed") then
print("Session found. Importing objects...")
AR.importSession
return 
end if
print("No session found or running from home. Creating new session...")
AR.initSession
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
As=user_input("Password: ",EJ)
if As!=EG then
exit("Wrong password, nice try.")
end if
end function
I.promptUser=function
while EF
As=user_input("["+AQ.vexxed[EQ].currHandler.displayID+Ej+AQ.vexxed[EQ].currHandler.getPubIP+Ej+AQ.vexxed[EQ].currHandler.getLANIP+ES+AQ.vexxed[EQ].sessionStack.len+"] "+AQ.vexxed[EQ].currHandler.fileObject.path+"# ")
self.handleInput(As.trim)
end while
end function
I.handleInput=function(As)
if As=="exit" then
AQ.vexxed[EQ].exitLayer
exit("Exiting...")
end if
if As=="clear" then
clear_screen
end if
As=As.split("\|")
for BV in As
BV=BV.trim.split(ES)
BV=BV.wherenot(Ds,ER)
if BV.len==ER then
continue
end if
if self.checkRepeat then
Dl=user_input("ExploitReport found. Please specify repeat interval in seconds: ")
if Dl.trim==EG then
Dl=EJ
else
Dl=Dl.trim.to_num
end if
end if
while EF
self.handleOutput(CZ.handleInput(BV))
self.handleOutput(DS.handleInput(BV[EJ:]))
self.handleOutput(AQ.vexxed[Em].handleInput(BV))
self.handleOutput(AQ.vexxed[EQ].handleInput(BV))
self.handleOutput(AQ.vexxed[EQ].currHandler.handleInput(BV))
if self.checkRepeat then
if typeof(Dl)==Dp then
print("Invalid interval. Please specify a number.")
break
end if
wait(Dl)
else
break
end if
end while
if BV[ER]=="dumpcob" then
for h in AQ.indexes
print(AQ[h])
end for
end if
end for
end function
I.checkRepeat=function
Dm=AQ.vexxed[EU].host_computer.show_procs.split(char(Ei))[EJ:]
for Z in Dm
Dn=Z.split(ES)
if Dn[4:5][ER].trim=="ExploitReport" then
return EF
end if
end for
return EE
end function
I.handleOutput=function(Do)
if typeof(Do)==Dp then
print(Do)
else if Do!=EK then
print(Do.toString)
end if
end function
I.startEngine