var rp = require('request-promise');
const fs = require('fs');//,
	//nocrypto = require("./nocrypto.js");


// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
//
// wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);

var traceval = 2;
//eigen code
var today = new Date();
//end eigen code
(function() {
	var notesto = (() => ({

		vn: '0.0.1',
		xPOSTjson: (url,bdy) => {
			return rp({ method:'POST',
				uri:'http://'+url,
				body:bdy,
				json:true,
			}).catch(x=>{throw(Error('notesto.POST('+url+bdy+') resulted in '+x))})
			.then(x => { if (/\*\*ERROR\*\*/.test(x)) {
							throw(Error('notesto.POST('+url+bdy+') resulted in '+x)); } return x; })},
		xPOSTtxt: (url,bdy) => {
			return rp({ method:'POST',
				uri:'http://'+url,
				body:bdy,
				headers: {
					'content-type': 'text/plain'
				}
			}).catch(x=>{throw(Error('notesto.POST('+url+bdy+') resulted in '+x))})
			.then(x => { if (/\*\*ERROR\*\*/.test(x)) {
							throw(Error('notesto.POST('+url+bdy+') resulted in '+x)); } return x; })},
		xGET: (url) =>
			rp({ method:'GET',
				uri:'http://'+url,
			}).catch(x=>{throw(Error('notesto.GET('+url+') resulted in '+x))})
			.then(x => { if (/\*\*ERROR\*\*/.test(x)) {
							throw(Error('notesto.GET('+url+') resulted in '+x)); } return x; }),
		xDELETE: (url) =>
			rp({ method:'DELETE',
				uri:'http://'+url,
			}).then(x => {console.log('DELETE',x); return x;})
			.catch(x=>{throw(Error('notesto.GET('+url+') resulted in '+x))})
			.then(x => { if (/\*\*ERROR\*\*/.test(x)) {
							throw(Error('notesto.GET('+url+') resulted in '+x)); } return x; }),
		expect: (val,msg) => {
			return x => {
				if (val instanceof RegExp ? val.test(x) : x === val) {
					console.log(msg,'OK (',x,')')
				} else {
					throw(Error('notesto.expect('+val+') but got '+x+'(NOT '+msg+')'))
				}
			}
		},
		trace: (n,msg) => {
			if (n<traceval) console.log('***',msg)
		},
		traceIP: (n,msg,ip,country) => {
			if (n<traceval) console.log('***',msg,'IP:',ip,'from',country)
			var log = (msg+' requested by: '+ip+' from '+country)
			notesto.logService(log);
			
		},
		traceLogin:	(ip,country,usrn,idOK)	=>	{
			if (idOK=='KO')
			{
				var log = ('Failed login attempt by: '+usrn+' IP: '+ip+ 'from '+country)
				notesto.logService(log)
			} else {
				var log = ('Succesful login attempt by: '+usrn+' IP: '+ip+ 'from '+country)
				notesto.logService(log)
			}


		},
		getDate: () =>	{
			var today = new Date();
			var day = today.getDate();
			var month = today.getMonth();
			var year = today.getFullYear();
			today = day + "-" + month + "-" + year;
			return today;
		},
		getTime: () => {
			var time = new Date();
			time = "["+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+"]";
			return time;
		},
		logService: (msg) => {
			//create log folder
			fs.mkdir(__dirname+'/logs',(err) => {});
			var stream = fs.createWriteStream(__dirname+'/logs/'+notesto.getDate()+'.log',{flags:'a'});
			stream.write(notesto.getTime()+" "+msg+"\n");
		}

	}))()

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = notesto;
	} else {
		window.notesto = notesto;
	}
})();
