var http = require('http');
var url = require("url");
var requestHandlers = require("./requestHandlers");

var urlPath = new Array();
urlPath["/"] = requestHandlers.index;
urlPath["/login"] = requestHandlers.login;


http.createServer(function (request, response) {
 	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	/* do something */

	/*need*/
	if (pathname != "/favicon.ico") {
		//console.log(response);
		urlPath[pathname](request,response);
	}
	//callHtml(urlPath[pathname], response);
	/*
	if (pathname == "/") {

		callHtml("index.html", response);
	} else if (pathname == "/login") {
		callHtml("login.html", response);
	} else {
	 			
	}
	*/

  	

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.end();
}).listen(8888);
console.log('Server running at http://127.0.0.1:1337/');