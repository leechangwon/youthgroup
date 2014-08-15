var fs = require('fs');
//var express = require("express");
var ejs = require("ejs");
var url = require("url");
var qs = require("querystring");

var fileIO = require("./Action/Utils/fileIO");
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

	fileIO.fileW(data.name,password);
	fileIO.fileR();

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

var getParam = function(req){

	var parameter;
	if(req.method=="POST") {
		var body="";
		req.on("data", function (data) {
		body +=data;
	   });
		req.on("end",function(){
	   var variables =  qs.parse(body);
	   //var pathname = url.parse(req.url).pathname;
	   console.log(variables);

	   //rest of code - this function is executed when all the variables are received
		});
	  req.on("error",function(e){
	   //console.log('problem with request: ' + e.message);
	});

	 }else{
		parameter = url.parse(req.url,true).query;
	}
	console.log(parameter);
	return parameter;
	
}

/*var bodyString ;

	request.setEncoding("utf8");

	request.on("data",function(data){
		bodyString +=data;
	});

	request.on("end",function(){
		var body = qs.parse(bodyString);
		response.end();
	});*/




/*

	 // ------ condition to chech if call are POST o GET

	  if(req.method=="POST") {

	  var body="";

	  req.on("data", function (data) {

	   body +=data;

	   });

	  req.on("end",function(){

	   var variables =  qs.parse(body);

	   var pathname = url.parse(req.url).pathname;

	   //rest of code - this function is executed when all the variables are received

	   

	  });

	  req.on("error",function(e){

	   //console.log('problem with request: ' + e.message);

	  });

	 }

	 else if(req.method=="GET") {

	  var variables = url.parse(req.url, true).query;

	  var pathname = url.parse(req.url).pathname;

	   //rest of code - We have no wait variables like POST request

	 }

	 

	  // end condition post o get

	  return ;//"ok:

	});
	*/

exports.index = index;
exports.login = login;
exports.error = error;
