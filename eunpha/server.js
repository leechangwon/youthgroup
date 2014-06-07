var http = require('http');
var url = require("url");
var requestHandlers = require("./requestHandlers");
var qs = require('querystring');

var urlPath = new Array();
urlPath["/"] = requestHandlers.index;
urlPath["/login"] = requestHandlers.login;


http.createServer(function (request, response) {
 	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	/* do something */
	/*need*/
	if (pathname != "/favicon.ico") {
		if(request.method == "POST"){
			console.log("method POST");
			var data = "";
			request.on('data', function(postData){
				data += postData;
			});
			request.on('end', function(postData){
				var parameter = qs.parse(data);
				console.log(parameter);
				urlPath[pathname](request,response,parameter);
			});
		} else {
			console.log("method GET");
			var parameter = url.parse(request.url,true).query;
			urlPath[pathname](request,response,parameter);
		}
	}

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.end();
}).listen(8888);
console.log('Server running at http://127.0.0.1:1337/');