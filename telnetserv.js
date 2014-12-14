/**
 * The telnet server implementation listening on port 23 for incoming packet from the devices.
 * The server will transfer incoming packet to the routers which will interpret and send the packet to Polycom phones.
 *
 * Created by Xiaolei Y. on 12/11/2014.
 */

var net     = require('net'),
	routers = require('./routers'),
    sockets = [],
    regexpCmd = new RegExp(/^pushaction.*(\r\n|\n|\r)$/gm);

/*
 * Cleans the input of carriage return, newline
 */
function cleanInput(data) {
    return data.toString().replace(/(\r\n|\n|\r)/gm, "");
}

/*
 * Method executed when a socket ends
 */
function closeSocket(socket) {
    var idx = sockets.indexOf(socket);
    if (idx != -1) {
        socket.end();
        socket.destroy();
        sockets.splice(i, 1);
    }
}

/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket) {
    var welcome = 'Welcome to the telnet server!';
    socket.write(welcome);
    socket.write('');
    sockets.push(socket);
    socket.on('data', function (data) {
    	var cleanData = cleanInput(data);
		if (cleanData === "quit") { socket.end('Goodbye!\n'); }
		if (regexpCmd.test()) {
			sockets[i].attached += cleanData;
			routers.device2phone(sockets[i].attached);
			sockets[i].attached = '';
			return;
		} else if (data.test(/(\r\n|\n|\r)$/gm)) {
			var usage = 'invalid syntax for pushing data to Polycom phones.\nusage: \n\tpushaction <action_uri_key>\n';
			sockets[i].write(usage);
			sockets[i].attached = '';
		}
        
		for (var i = 0; i < sockets.length; i++) {
			if (sockets[i] === socket) {
				// sockets[i].write(data);
				sockets[i].attached += cleanData;
				break;
			}
		}
        console.log(data.toString());
    });
    
    socket.on('end', function () {
        closeSocket(socket);
    });
}

// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);

server.listen(9023);
console.info('Started telnet server on port 9023.');