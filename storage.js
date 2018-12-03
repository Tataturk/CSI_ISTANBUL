
const fs = require('fs');
var Hapi = require('hapi'),
	nt = require("./notesto.js");


	var data = JSON.parse(fs.readFileSync('data.json'));
	console.log(data);

(function(nt){
	nt.xPOSTjson('localhost:9999/create',
	`{ name: 'storage',
		port: 10006,
		version: 1,
		init: () => { $.trace(1,'storage$init:1')
			$.xPOSTjson('localhost:10000/provide',{port:$.port, srvc:'storage'})
		},

		POST:	{
			save: ($) => {
				$.traceIP(1,'storage$save:1',$.BODY.ip,$.BODY.country);
				var json = $.BODY.text;
				var data = JSON.stringify(json);
				$.writeFileSync('data.json', data);
			},
			give: ($) => {$.traceIP(1,'storage$give:1',$.BODY.ip,$.BODY.country);
			var data = JSON.parse($.readFileSync('data.json'));
			return data;
			}
		},


	}`)
	.then(nt.expect(/^SubServer.*$/,'Start a Subserver'))



	}(nt));
