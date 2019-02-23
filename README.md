# xap-log
A command line message logger for xAP home automation using xap-framework

## Install and run
* Compiled code and dependencies can be installed from npmjs: ``npm install xap-log`
* Run from the command line: ``node ./lib/xap-log.js [<options>]`` or ``npm start [-- <options>]``
* Stops on receiving SIGINT, ctrl-C.

## Options
* --source <source-regex> - show only messages with a source address matching a regular expression
* --class <class-regex> - show only messages with a message class matching a regular expression
* --level <1,2> - verbosity: 1 (default) messages, 2 messages and heartbeats
* --dump - show the message content (by default only a summary line is shown)
* --heartbeat <seconds> - heartbeat interval for the logger's own heartbeat (default 300)

## Dependencies
xap-hub uses:
* xap-framework for all network communication and message manipulation.

## Bugs
There is almost no command line option checking,

## Family
xap-log is part of a family of modules for xAP  
![xAP family diagram](/img/xap-family-log.png?raw=true)
