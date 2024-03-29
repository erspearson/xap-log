# xap-log

A command line message logger for xAP home automation using xap-framework

## Install and run

* Compiled code and dependencies can be installed from npmjs: ``[sudo] npm install [-g] xap-log``
* Run from the command line: ``xap-log [<options>]`` if installed globally  
otherwise ``node ./lib/xap-log.js [<options>]`` or ``npm start [-- <options>]``
* Stops on receiving SIGINT, ctrl-C.

## Options

* --source \<source-regex> - show only messages with a source address matching a regular expression
* --class \<class-regex> - show only messages with a message class matching a regular expression
* --level <1,2> - verbosity: 1 (default) messages, 2 messages and heartbeats
* --dump - show the message content (by default only a summary line is shown)
* --heartbeat \<seconds> - heartbeat interval for the logger's own heartbeat (default 300)

## Dependencies

xap-log uses:

* xap-framework for all network communication and message manipulation.

The code is a useful example of simple use of xap-framework.

## Bugs

There is almost no command line option checking.

## Family

xap-log is part of a family of modules for xAP  
![xAP family diagram](/img/xap-family-log.png?raw=true)
