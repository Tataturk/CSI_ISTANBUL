var Hapi = require('hapi');
var fs = require('fs');

fs.readFile(__dirname+'/testJson.json', (err, data) =>	{
    var json = JSON.parse(data)
    console.log(JSON.stringify(json))
    console.log(JSON.stringify(json.date))   
    })