var Hapi = require('hapi'),
	nt = require("./notesto.js");
(function(nt){

	nt.xPOSTjson('localhost:9999/create',
	`{ name: '[name]',
		port: [port number],
		version: [number],
		init: () => { $.trace(1,'[name]$init:1')
		$.xPOSTjson('localhost:10000/provide',{port:$.port, srvc:'[service name]'})
		$.[variable that is made when the module starts]
		},
		[Type of request]:	{
			[service name]: ($) => {
				[code]
			},
			[service name]: ($) => {
				[code]
			}
		},


	}`)
	.then(nt.expect(/^SubServer.*$/,'Start a Subserver'))



	}(nt));
