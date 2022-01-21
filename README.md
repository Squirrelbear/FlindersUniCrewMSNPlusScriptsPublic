# Flinders Uni Crew MSN Plus Scripts

A collection of scripts used within Flinders Uni Crew 2011 and prior that made the chat experience via MSN using the MessengerPlus addon more interesting. Scripts are written using MPL Scripting that shares similarities with javascript. MSN Messenger is no longer a thing anymore, and there is no longer a Flinders Uni Crew chat, but people may be interested to see the types of features in this toolset. It was designed to be run on at least my machine, but others interested could install it themselves too and use similar functionality. One of the peers in the group chats modified the "#MARCO" "#POLO" to respond with "#MARCO" to both messages causing an infinite loop in the group chat. The other feature that was very entertaining was allowing remote execution of commands to have your client relay the chat that someone else is sending to you privately. This relay made it appear like you were the one talking when it was someone else in the group chat pretending to be you.

To use these scripts, you would need to package the contents of the source folder into a zip and change the extension to ".plsc". You would need to have MSN Messenger and the 3rd party tool MSN Messenger Plus installed to install the script. 

The script has been modified to remove the email addresses of people who were listed, but the type of data and its functions have been preserved.

# Commands

Most commands were designed to be used specifically in the group chat, but could also be sent in private chats. Commands fall into two types. The first are commands executed by the client, and the other commands are executed by receiving an incoming message from another client. All commands start with a / before them and would be typed directly into a chat window within MSN Messenger. 

* /attachFUC : Searches for the Flinders Uni Crew group chat to attach its process for outputting results to there. Automated on launch but can be used if /unattachFUC is called or, for some reason, the context is lost.
* /unattachFUC : Unlinks the the Flinders Uni Crew group chat, so it is not used for script functions.
* /disableremote : Disables the functionality allowing other allowed users to execute commands on your client remotely.
* /enableremote : Enables other people in the allowed list of "commandUsers" to remotely execute commands.
* /enabledetect : Enables detection of when a user changes their name.
* /disabledetect : Disables detection of when a user changes their name.
* /enablegreeting : Enables automated greeting when people come online
* /enablemarco : Enables automated response to "#MARCO" with a "#POLO" message.
* /disablemarco : Disables the automated "#POLO" response.
* /enableall : Enables all features.
* /disableall : Disables all features.
* /setFUCsecurity : Sets the security level where it is followed by 1, 2, or 3. 1 = no security, 2 = disable remote / execution, 3 = 2 and show who tried to do it.
* /enable : Enables a feature by following it with any of "all", "detect", "greeting", "marco", "remote", "FUConly", "talkas"
* /disable : Disables a feature as listed above.
* /enableFUConly : Makes it so only Flinders Uni Crew members can execute remote commands.
* /disableFUConly : Allows anyone to use remote commands.
* /enabletalkas : Forces text manipulation that only supports "Andy" in this version, but I did create ones for Yoda and others. The Andy text randomly selects words and modifies them creating unpredictable results when sending messages.
* /disabletalkas : Disables the styled talking.
* /greetall : Greets all the members of Flinders Uni Crew who were on.

Remote commands:

* /name : Followed by any text would check that the user was allowed to use the command and either relay it to the group chat as if it was the script runner talking, or give an error message response. 
* #MARCO : would response with "#POLO"