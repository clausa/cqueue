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
