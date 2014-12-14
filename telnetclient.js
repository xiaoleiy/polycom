/**
 * The telnet client implementation which receives manipulated notification and sends to the devices via telnet protocol.
 *
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/11/2014.
 */
var net = require('net');

module.exports = {
    /**
     * Send the packet in synchronized to the device with given serverip address
     *
     * @param server The target device where the packet will be sent
     * @param packet The packet to be sent
     */
    send: function (server, packet) {
        var serverip    = server.split(':')[0];
        var serverport  = server.split(':')[1];
        var client = net.connect(serverport, serverip);
        client.on('data', function (data) {
            console.info('' + data);
        }).on('connect', function () {
            console.info('Connected to the server ' + serverip + ':' + serverport);
            client.end(packet);
        }).on('error', function (err) {
            console.error(err);
        }).on('timeout', function(){
            console.info('The connection to server ' + serverip + ':' + serverport + ' timed out!');
            client.destroy();
        });
    },

    sendAsync: function (ip, packet) {

    }
};

