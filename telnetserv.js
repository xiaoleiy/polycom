/**
 * The telnet server implementation listening on port 23 for incoming packet from the devices.
 * The server will transfer incoming packet to the routers which will interpret and send the packet to Polycom phones.
 *
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/11/2014.
 */

var telnet = require('telnet'),
    routers = require('./routers');
var regexpCmd = new RegExp(/^pushaction\s.*$/gm),
    isEnter = new RegExp(/(\r\n|\n|\r)/gm),
    isValid = new RegExp(/[a-zA-Z0-9\s:#_-]+/),
    usage = '\nInvalid syntax for pushing data to Polycom phones.\nusage: pushaction <action_uri_key>\n';

telnet.createServer(function (client) {

    client.stringBuf = '';

    // make unicode characters work properly
    client.do.transmit_binary();

    // make the client emit 'window size' events
    client.do.window_size();

    // listen for the actual data from the client
    client.on('data', function (b) {
        client.write(b);

        var input = b.toString('utf8');
//        if (!isValid.test(input)) { //valid string
//            return;
//        }

        if (isEnter.test(input)) { //is enter
            if (!regexpCmd.test(client.stringBuf)) { // is valid command
                client.write(usage);
                console.error(client.stringBuf + ' is invalid message.');
                client.stringBuf = '';
                return;
            }

            console.info('The message will be sent: ' + client.stringBuf);
            client.write('\nThe message will be sent: ' + client.stringBuf + '\n');
            client.write('\n');
            routers.device2phone(client.stringBuf.split(/\s/)[1]);
            client.stringBuf = '';
            return;
        }

        client.stringBuf += input;
//        console.info('client.stringBuf: ' + client.stringBuf);
    });

    client.on('error', function (e) {
        if (e.code === "ECONNRESET") {
            console.log("Client quit unexpectedly; ignoring exception.");
        } else {
            console.log("Exception encountered:");
            console.log(e.code);
            process.exit(1);
        }
    });

    client.write('\nConnected to Telnet server!\n')

}).listen(9023);
console.info('Started telnet server on port 9023.');