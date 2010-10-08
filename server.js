var net = require('net');
var sys = require('sys');
var linebuffer = require('linebuffer');

var version = "0.1b";
var state = 0;
var bytes;

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
		var queue = command[1].trim();
		bytes = parseInt(command[2].trim());
		uuid = uuid();
		sys.debug('ADD '+ queue +" "+ bytes +" "+ uuid);
		state=1
		stream.write('OK\r\n'+uuid+'\r\n');
		var reason = "invalid number of arguments";
		stream.write('ERR, '+reason+'\r\n');
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
	    sys.debug(bytes);
	    state=0;
	}
    });
});
 
server.listen(8000);


function uuid()
{
    var chars = '0123456789abcdef'.split('');
    var uuid = [], rnd = Math.random, r;
    
    for (var i = 0; i < 8; i++)
    {
	if (!uuid[i])
	{
            r = 0 | rnd()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
	}
    }
    return uuid.join('');
}
