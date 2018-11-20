# Cybersecurity Services Infrastructure (CSI)

CSI is a distributed (service-oriented) infrastructure ***intended solely for 
educational purposes*** (and should never be used in a production environment).

At the core is a generic REST server that accepts server specifications,
which are then executed to start what we call **subservers**.
**IMPORTANT NOTE**: this server accepts and executes executable
JavaScipt code. This approach is suitable in our context of education,
but should never be used in a production environment.

The file launcher.js launches a number of services, including

* YellowPages: a subscription service where services can find eachother
	* provide: here, a server describes a service that it offers.
	* require: here, a server describes all services that it needs.  
		For each required service, the requestor will receive a /fulfill message describing  
		a provider (either immediately or as soon as the service is 'provided')
* IDManager: a service persisting user names and hashed passwords
	* verify: check if the offered credentials are bona fide
* AccessManager: a service which checks access rights/roles
	* verify: checks if a user has the required right/role
* Login: allows users to log in on HTML pages
	* keyexchange: create secure communication (shared secret)
	* login: secure login

## Getting Started

See generic info on cloning a github repo

### Prerequisites

Recent node.js, see [nodejs.org](https://nodejs.org/en/)

e.g. download Win msi, Mac pkg or tarball

### Installing

Step one: start the generic server by `node genericServer.js` (if your `node` is called `node`
Step two: execute launcher by `node launcher.js`
Step three: visit `jsoneditor.html` and press `login`

(currently jsoneditor has dummy data and doesn't do much

## Authors

* **Pum Walters** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License.  
Copyright (c) 2018 Pum Walters, HvA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

This software is created for educational purposes and should 
never be used in a production environment.


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

## Technotes

### Messages

```
jsoneditor
	#login:
		=> keyexchange(sessionID, pubsecr, halfsecr)
		  <= (halfsecret)//sharedsecret
	#connect
		=> login(uname, pw)
		  <= sessionToken
yp
	=> provides(desc)
	=> require([ip], port, srvcs)
idMngr
	=> verify(sid, name, pw)
		<= OK/KO
accessMngr
	=> verify(name, right)
		<= OK/KO
login
	=> fulfill(port, srvc, ...)
	=> keyExchange(sessionID, pubSecr, halfSecr)
	  <= halfSecr
	~=> login(pw, uname)
		=> ID-Mngr
			+=> verify/uname{pw)
	<= token
```	
