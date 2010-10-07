var net = require('net');
var sys = require('sys');
var linebuffer = require('linebuffer');

var version = "0.1b";


var server = net.createServer(function (stream) {
    stream.setEncoding('utf8');
    stream.on('connect', function () {
	stream.write('cqueue '+version+'\r\n');
	sys.debug("state: connect");	
    });
    stream.on('data', function (data) {
	//stream.write(data)
	sys.debug("data: \n"+data);
	// add, reserve, report, status
	if (data.search(/^add/i) == 0) {
	    sys.debug('ADD');
	}
	if (data.search(/^reserve/i) == 0) {
	    sys.debug('RESERVE');
	}
	if (data.search(/^report/i) == 0) {
	    sys.debug('REPORT');
	}
	if (data.search(/^status/i) == 0) {
	    sys.debug('STATUS');
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


