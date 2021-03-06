/********************
* FUCScripts - v1.11
* By Peter Mitchell
* For FUC by FUC
********************/

// contains the list of all FUC members
var contacts = new Array();
// contains the list of all commands and who is allowed to use them
var commandWhitelist = new Array();
var commandUser = new Array();
whitelistEnabled = false;
// Greeting that is sent to a non-listed member
var MessageAll = "sup o/";
// Pointer to the FUCCHAT window
var FUCCHAT = null;

// *** Option variables ***
// remotechat enables people to talk as you
var remotechat = null;

// determines whether the greeting should be shown
// occurs when people connect
var enablegreeting = false;

// modify this function to alter the way a greeting is displayed if desired
// @Param Contact - the array element from contact that is the person
// @Return - the greeting message
function getGreeting(Contact)
{
	// sample of how to alter for specific people
	//if(Contact.Name == "Nhut") {
	//	return "special message for Nhut";
	//}

	if(Contact.Nick.length > 0) {
		return "sup " + Contact.Nick + " o/";
	} else {
		return "sup " + Contact.Name + " o/";
	}
}

// determines whether name change detections
// are displayed in chat
var enabledetect = false;

// determines whether replies to #MARCO will be done
var enablemarco = true;

// determines the mode of security
// 1 = none
// 2 = disable remote "/" command execution
// 3 = 2 && show who is speaking as you
var securitymode = 3;

// only allow FUC members to use the #say[name] command
var securityFUConly = true;

// allow the talking as a particular person
var talkAs = null;

// init function - generates database and configures remote setup.
function OnEvent_Initialize(MessengerStart)
{
	// Email: contact email, unique identifier

	// generate the list of all contacts
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Andy", PM: "sup Andy o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@live.com", Name: "Leon", PM: "sup Leon o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Ben", PM: "sup Ben o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@gmail.com", Name: "Karlos", PM: "sup Karlos o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Darius", PM: "sup Darius o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Josh", PM: "sup Josh o/ (inb4 you disconnect)", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Troy", PM: "sup Troy o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Nhut", PM: "sup CHOOOT o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Aaron", PM: "sup Aaron o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Chad", PM: "sup Chad o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Kane", PM: "sup Kane o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Ken", PM: "sup Ken o/ (inb4 hi all)", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Alex", PM: "sup Alex o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Paul", PM: "sup Paul o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@live.com", Name: "Perry", PM: "sup Perry o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Suraj", PM: "sup Suraj o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Aloy", PM: "sup Aloy o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Seth", PM: "sup Seth o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Peter", PM: "sup me o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@internode.on.net", Name: "Phil", PM: "sup Phil o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@gmail.com", Name: "Jason", PM: "sup Jason o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Chrissy", PM: "sup WG2 o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Aidan", PM: "sup Aidan o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL@hotmail.com", Name: "Dawid", PM: "sup Dawid o/", Enabled: true, DName: "", Nick: ""};
	contacts[contacts.length] = {Email: "NOT_REAL_EMAIL.0@hotmail.com", Name: "Curtis", PM: "sup Curtis o/", Enabled: true, DName: "", Nick: ""};

	commandWhitelist[commandWhitelist.length] = "/name";
	commandUser[commandUser.length] = "Chrissy";
	commandUser[commandUser.length] = "Andy";
	commandUser[commandUser.length] = "Ben";
	
	// setup remote chat
	setupRemote();
	
	// attempt to connec to FUC
	// this will normally not succeed here
	findFuc();
}

// this function searches all chat windows to try and find the
// chat that is FUC chat
function findFuc()
{
	if(FUCCHAT != null) return;

	var wnds = Messenger.CurrentChats;
	j = new Enumerator(wnds);
	for(; !j.atEnd(); j.moveNext())
	{
		var ChatWnd = j.item();
		
		var count = 0;
		var Contacts = ChatWnd.Contacts;
		var e = new Enumerator(Contacts);
		for(; !e.atEnd(); e.moveNext())
		{
			var Contact = e.item();
			var found = false;
			for(var i = 0; i < contacts.length; i++) {
				if(Contact.Email == contacts[i].Email) {
					count++;
					found = true;
				}
			}
			
			if(!found) {
				count = 0;
				break;
			}
		}
	
		if(count > 1) {
			FUCCHAT = ChatWnd;
			updateDNames();
			return;
		}
	}	
}

// setup the remotechat variable
function setupRemote()
{
	for(var i = 0; i < contacts.length; i++) {
		if(Messenger.MyEmail == contacts[i].Email && contacts[i].Enabled == true) {
			remotechat = "#say" + contacts[i].Name;
		}
	}
}

function OnEvent_Uninitialize(MessengerExit)
{
}

String.prototype.replaceAt=function(index, char) {
	return this.substr(0,index) + char + this.substr(index+char.length);
}

// handle commands that may be used
function OnEvent_ChatWndSendMessage(ChatWnd, Message)
{
	if(Message.substring(0,10) == "/attachFUC") {
		findFuc();
		//FUCCHAT = ChatWnd;
		return "";
	} else if(Message.substring(0,12) == "/unattachFUC") {
		FUCCHAT = null;
		return "";
	} else if(Message.substring(0,7) == "/enable") {
		if(Message.length < 7) return;
		
		var str = "";
		if(Message.charAt(7) == " ") {
			str = Message.substring(8,Message.length);
		} else {
			str = Message.substring(7,Message.length);
		}
		
		if(str == "all") {
			findFuc();
			enabledetect = true;
			enablegreeting = true;
			enablemarco = true;
			securityFUConly = true;
			securitymode = 1;
			setupRemote();
		} else if(str == "detect") {
			enabledetect = true;
		} else if(str == "greeting") {
			enablegreeting = true;
		} else if(str == "marco") {
			enablemarco = true;
		} else if(str == "remote") {
			findFuc();
			setupRemote();
		} else if(str == "FUConly") {
			securityFUConly = true;
		} else if(str == "talkas") {
			//var s = Message.split(" ");
			//talkas = s[s.length-1];
			talkAs = "Andy";
		} else {
			return "invalid command";
		}
		
		return "";
	} else if(Message.substring(0,8) == "/disable") {
		if(Message.length < 8) return;
		
		var str = "";
		if(Message.charAt(8) == " ") {
			str = Message.substring(9,Message.length);
		} else {
			str = Message.substring(8,Message.length);
		}
		
		if(str == "all") {
			FUCCHAT = null;
			enabledetect = false;
			enablegreeting = false;
			enablemarco = false;
			securityFUConly = false;
			remotechat = null;
			talkas = null;
		} else if(str == "detect") {
			enabledetect = false;
		} else if(str == "greeting") {
			enablegreeting = false;
		} else if(str == "marco") {
			enablemarco = false;
		} else if(str == "remote") {
			remotechat = null;
		} else if(str == "FUConly") {
			securityFUConly = false;
		} else if(str == "talkas") {
			talkAs = null;
		} else {
			return "invalid command";
		}
		
		return "";
	} else if(Message.substring(0,15) == "/setFUCsecurity") {
		if(Message.length < 16 || Message.charAt(16) < '1' || Message.charAt(16) > '3') return;
		
		var num = Message.charAt(16) + "";
		securitymode = parseInt(num);
		
		return ""; 
	} else if(Message.substring(0,9) == "/greetall") { 
		if(FUCCHAT == null || ChatWnd != FUCCHAT) return "";
		
		var msg = "";
		
		var Contacts = FUCCHAT.Contacts;
		e = new Enumerator(Contacts);
		for(; !e.atEnd(); e.moveNext())
		{
			var contact = e.item();
		
			for(var i = 0; i < contacts.length; i++) {
				if(contact.Email == contacts[i].Email) {
					msg += getGreeting(contacts[i]) + "\n";
				}
			}
		}
		
		return msg;
	} else if(talkAs != null && Message.substring(0,1) != "/") {
		if(talkAs == "Andy") {
			var str = Message.split(" ");
			var change = new Array(str.length);
			for(var i = 0; i < str.length; i++) {
				change[i] = 0;
			}
			
			var changes = Math.floor(Math.random()* (str.length * 2));
			
			for(;changes > 0; changes--) {
				var word = Math.floor(Math.random() * (str.length-2)) + 1;
				Debug.Trace(word + " " + change[word]);
				if(str[word].length > 2 && change[word] < str[word].length / 2) {
					if(Math.floor(Math.random() * 2) == 0) {
						var letter = Math.floor(Math.random() * str[word].length);
						var letter2 = Math.floor(Math.random() * str[word].length);	
						//Debug.Trace("Letter: " + letter + " " + letter2 + " " + tmp);
						
						var tmp = str[word].substring(letter, letter+1);
						str[word] = str[word].replaceAt(letter, str[word].substring(letter2, letter2 + 1));
						str[word] = str[word].replaceAt(letter2, tmp);
					} else {
						var letter = Math.floor(Math.random() * (str[word].length-2))+1;
						str[word] = str[word].substring(0,letter) + str[word].substring(letter+1,str[word].length);
						change[word]++;
					}
				}
			}
			
			var result = "";
			for(var i = 0; i < str.length; i++) {
				result += str[i] + " ";	
			}
			//Debug.Trace(result);
			return result;
		}
	}
}

// handle incomming messages
function OnEvent_ChatWndReceiveMessage(ChatWnd, Origin, Message, MsgKind)
{
	if(remotechat != null && Message.substring(0,remotechat.length) == remotechat && FUCCHAT != null) {
		if(Message.length > remotechat.length && (Message.charAt(remotechat.length) != '/' || securitymode == 1)) {
			if(Message.charAt(remotechat.length) == '/') {
				var foundcommand = false;
				//Debug.Trace(Message.substring(remotechat.length,remotechat.length+commandWhitelist[0].length));
				for(var i = 0; i < commandWhitelist.length; i++) {
				//	Debug.Trace(Message.substring(remotechat.length,remotechat.length+commandWhitelist[i].length));
					if(Message.substring(remotechat.length,remotechat.length+commandWhitelist[i].length) == commandWhitelist[i]) {
						if(whitelistEnabled) {
							for(var j = 0; j < contacts.length; j++) {
								for(var k = 0; k < commandUser.length; k++) {
									if(contacts[j].DName == Origin && contacts[j].Name == commandUser[k]) { 
										foundcommand = true;
										break;
									}
								}
								
								if(foundcommand) break;
							}
						} else {
							foundcommand = true;
						} 
						
						if(foundcommand) break;
					}
				}
				
				if(!foundcommand) {
					ChatWnd.SendMessage("That command is not allowed -_-!!!");
					return Message;
				}
			}
			
			if(securityFUConly) {
				var found = false;
				for(var i = 0; i < contacts.length; i++) {
					if(contacts[i].DName == Origin) {
						found = true;
						break;
					}
				}
				
				if(!found) return Message;
			}
			
			var pretext = "";
			if(securitymode == 3) {
				pretext = "Someone else said: ";
				
				var found = false;
				for(var i = 0; i < contacts.length; i++) { 
					if(contacts[i].Email != Messenger.MyEmail && contacts[i].DName == Origin) {
						pretext = contacts[i].Name + " said: ";
						
						found = true;
						break;
					}
				}
				
				if(!found && Origin == Messenger.MyName) {
					pretext = "";
				}
			}
			
			FUCCHAT.SendMessage(pretext + Message.substring(remotechat.length, Message.length));
			return Message;
		} else {
			ChatWnd.SendMessage("STOP TRYING TO HACK ME!!!");
			return Message;
		}
	} else if(Message.substring(0,6) == "#MARCO") {
		if(Messenger.MyName == Origin || !enablemarco) return;
		if(FUCCHAT == null || remotechat == null) {
			ChatWnd.SendMessage("#NONPOLO :(");
		} else {
			FUCCHAT.SendMessage("#POLO");
		}
	} else if(Message.substring(0,3) == "nou" && Messenger.MyName != Origin && ChatWnd == FUCCHAT) {
		if(false) FUCCHAT.SendMessage("nou");
	}
}

// handle a new contact appearing
function OnEvent_ChatWndContactAdded(ChatWnd, Email)
{
	if(!enablegreeting || ChatWnd != FUCCHAT) return; 
	
	var found = false;
	for(var i = 0; i < contacts.length; i++) {
		if(Email == contacts[i].Email && contacts[i].Enabled == true) { 
			contacts[i].DName = Messenger.MyContacts.GetContact(Email).Name;	
		
			ChatWnd.SendMessage(getGreeting(contacts[i]));
			return;
		}
	}
	
	ChatWnd.SendMessage(MessageAll);	
}

// handle a name change
function OnEvent_ContactNameChange(Email, NewName)
{
	for(var i = 0; i < contacts.length; i++) {
		if(Email == contacts[i].Email && contacts[i].Enabled == true) {
			if(FUCCHAT != null) {
				//contacts[i].DName = NewName;
				updateDNames();
				
				if(!enabledetect) return;
				FUCCHAT.SendMessage(contacts[i].Name + " has changed their name to " + NewName);
			}
			return;
		}
	}
}

// update the current name list
function updateDNames()
{
	if(FUCCHAT == null) return;
		
	var Contacts = FUCCHAT.Contacts;
	e = new Enumerator(Contacts);
	for(; !e.atEnd(); e.moveNext())
	{
		var contact = e.item();
		
		for(var i = 0; i < contacts.length; i++) {
			if(contact.Email == contacts[i].Email) {
				contacts[i].DName = contact.Name;
				i = contacts.length;
			}
		}
	}
}

// check if the FUC chat is now available
function OnEvent_ChatWndCreated(ChatWnd)
{
	if(FUCCHAT == null) findFuc();
}

// handle destroyed FUC chat
function OnEvent_ChatWndDestroyed(ChatWnd)
{
	if(FUCCHAT == ChatWnd) FUCCHAT = null;
}