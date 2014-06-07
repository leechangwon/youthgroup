var fs = require('fs');
//var express = require("express");
var ejs = require("ejs");
var url = require("url");
//var app = express();

function index(request,response,parameter){
	/* do something */
	var data = {};
	data.name = "aa";
	callHtml("index.ejs", data, response);
}

function login(request,response,parameter){
	/* do something */
	//console.log(request);
	//var name = request.param("name");
	//var param = getParam(request);
	//console.log(param);
	var data = {};
	data.name = parameter.name;
	callHtml("login.ejs", data, response);	
}


/* return page */
var callHtml = function (htmlName, dataObj, response) {
	fs.readFile(htmlName, "utf8", function (err, data) {
		if (err) {
    		throw err; 
    	}
    	response.writeHeader(200, {"Content-Type": "text/html"});
    	response.end(ejs.render(data,dataObj));
	});
	/*
	fs.readFile(htmlName, function (err, html) {
    	if (err) {
    		throw err; 
    	}
    	response.writeHeader(200, {"Content-Type": "text/html"});  
    	response.write(html);  
    	response.end();  

	})
	*/
}
/*
var getParam = function(req){
	var parameter

	if(req.method == "POST"){
		console.log("post");
		//console.log(req);
		//console.log(req.prototype);
	}else{
		var parameter = url.parse(req.url,true).query;
		
	}
	return parameter;
}
*/

exports.index = index;
exports.login = login;