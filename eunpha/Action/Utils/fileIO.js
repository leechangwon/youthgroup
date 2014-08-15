var fs=require('fs');

var fileW= function(id,password){
	fs.writeFile('./memberdata/results.txt', id + "/" +password +'\n' , function(err) {
	  if(err) throw err;
	  console.log('File write completed');
	});
}

var fileR= function(){

	fs.exists('./memberdata/member.txt', function (exists) {
	  console.log(exists ? "it's there" : "no exists!");
	  console.log("1");
	});

	fs.readFile('./memberdata/member.txt', 'utf8', function(err, data) {
	  console.log(data);
	  console.log("2");
	});
}


exports.fileR = fileR;
exports.fileW = fileW;

/*app=function(req,res)
{
 res.writeHead(200,{'Content-Type':'text/plain'})
 var buffer=new Buffer(100)
 var fs=require('fs')
 fs.open('.'+req.url,'r',function(err,fd){
  fs.fstat(fd,function(err, stats){
   var i=0
   var s=stats.size
   console.log('.'+req.url+' '+s)
   for(i=0;i<s;console.log(i)){
    i=i+buffer.length

    fs.read(fd,buffer,0,buffer.length,i,function(e,l,b){
     res.write(b.toString('utf8',0,l))
     console.log(b.toString('utf8',0,l))
    })

   }
   res.end()
   fs.close(fd)
  })
 })
}
*/
