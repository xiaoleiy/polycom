/**
 * The telnet client implementation which receives manipulated notification and sends to the devices via telnet protocol.
 *
 * Created by idealab on 12/11/2014.
 */
var net = require('net');

module.exports = {
    /**
     * Send the packet in synchronized to the device with given serverip address
     *
     * @param serverip The target device's serverip address where the packet will be sent
     * @param serverport The port on which the target device listen
     * @param packet The packet to be sent
     */
    send: function (serverip, serverport, packet) {
        var client = net.connect(serverport || '23', serverip);
        client.on('data', function (data) {
            console.info('' + data);
//            process.stdin.once('data', function(chunk){
//                client.write(chunk.toString());
//            });
        }).on('connect', function () {
            console.info('Connected to the server ' + serverip + ':' + serverport);
            client.write(packet);
        }).on('error', function (err) {
            console.error(err);
        }).on('timeout', function(){
            client.destroy();
        });
    },

    sendAsync: function (ip, packet) {

    }
};
//
//var client = net.connect('9001', 'localhost');
//client.on('data', function(data) {
//  console.log('' + data);
//  process.stdin.once('data', function (chunk) {
//    client.write(chunk.toString());
//  });
//}).on('connect', function() {
//  console.info('connected to localhost:9001');
//}).on('end', function() {
//  console.log('Disconnected');
//});

