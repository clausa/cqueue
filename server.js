var net = require('net');
var sys = require('sys');
var linebuffer = require('linebuffer');

var version = "0.1b";
var state = 0;

var server = net.createServer(function (stream) {
    stream.setEncoding('utf8');
    stream.on('connect', function () {
	stream.write('cqueue '+version+'\r\n');
	sys.debug("state: connect");	
    });
    stream.on('data', function (data) {
	//stream.write(data)
	sys.debug("data: \n"+data);

	if (state == 0) {
	    var command = data.split(" ");
	    switch(command[0].trim().toUpperCase()) {
	    case "ADD":
		sys.debug('ADD '+ command.slice(-2));
		state=1
		break;
	    case "RESERVE":
		sys.debug('RESERVE');
		break;
	    case "REPORT":
		sys.debug('REPORT');
		break;
	    case "STATUS":
		sys.debug('STATUS');
		break;
	    default:
		stream.write('ERR, Unknown command\r\n');
		sys.debug('UNKNOWN');
	    }
	} else {
	    sys.debug('DATA: '+data );
	    state=0;
	}
    });
});
 
server.listen(8000);

/*
* Display upload form
*/
function display_form(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
            '<input type="file" name="upload-file">'+
            '<input type="submit" value="Upload">'+
            '</form>'
    );
    res.end();
}

function show(req, res, data) {
    sys.debug("REQ: "+data+"");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Got "+data+" request!");
    res.write("<form action=/ method=post><input type=text name=q></form>");
    res.end();
}


