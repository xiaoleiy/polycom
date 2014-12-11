/**
 * The telnet client implementation which receives manipulated notification and sends to the devices via telnet protocol.
 *
 * Created by idealab on 12/11/2014.
 */
var telnet = require('telnet-client');

module.exports = {

    /**
     * Send the packet in synchronized to the device with given ip address
     *
     * @param ip The target device's ip address where the packet will be sent
     * @param packet The packet to be sent
     */
    send: function (ip, packet) {
        var connection = new telnet();
        var params = {
          host: ip,
          port: 23,
          shellPrompt: '/ # ',
          timeout: 1500
          // removeEcho: 4
        };

        connection.on('ready', function(prompt) {
          connection.exec(packet, function(response) {
            console.log(response);
          });
        });

        connection.on('timeout', function() {
          console.log('telnet connection to ' + ip + ' timeout!');
          connection.end();
        });

        connection.on('close', function() {
          console.log('telnet connection to ' + ip + ' closed.');
        });

        connection.connect(params);
    },

    sendAsync: function (ip, packet) {

    }
};

