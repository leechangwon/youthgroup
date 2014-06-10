var fs = require('fs');
//var express = require("express");
var ejs = require("ejs");
var url = require("url");
var enigma = require("./Action/Utils/enigma");
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
	var password = parameter.password;
	var changePW = enigma.make(password);
	console.log("changePW :: " + changePW);
	console.log("originalPW :: " + enigma.get(changePW));
	var data = {};
	data.name = parameter.name;

	callHtml("login.ejs", data, response);	
}

function error(request,response,parameter){
	callHtml("error.ejs", {}, response);
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

exports.index = index;
exports.login = login;
exports.error = error;