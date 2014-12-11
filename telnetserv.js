/**
 * The telnet server implementation listening on port 23 for incoming packet from the devices.
 * The server will transfer incoming packet to the routers which will interpret and send the packet to Polycom phones.
 *
 * Created by Xiaolei Y. on 12/11/2014.
 */

var net     = require('net'),
    sockets = [];

/*
 * Cleans the input of carriage return, newline
 */
function cleanInput(data) {
    return data.toString().replace(/(\r\n|\n|\r)/gm, "");
}

/*
 * Method executed when data is received from a socket
 */
function receiveData(socket, data) {
    var cleanData = cleanInput(data);
    if (cleanData === "@quit") {
        socket.end('Goodbye!\n');
    }

    for (var i = 0; i < sockets.length; i++) {
        if (sockets[i] === socket) {
            sockets[i].write(data);
        }
    }
}

/*
 * Method executed when a socket ends
 */
function closeSocket(socket) {
    var i = sockets.indexOf(socket);
    if (i != -1) {
        sockets.splice(i, 1);
    }
}

/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket) {
    sockets.push(socket);
    socket.write('Welcome to the Telnet server!\n');
    socket.on('data', function (data) {
        receiveData(socket, data);
        console.log(data.toString());
    });
    socket.on('end', function () {
        closeSocket(socket);
    });
}

// Create a new server and provide a callback for when a connection occurs
var server = net.createServer({allowHalfOpen: true}, newSocket);

// Listen on port 23
server.listen(23);