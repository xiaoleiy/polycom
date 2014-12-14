/**
 * Created by idealab on 12/14/2014.
 */
var telnet = require('telnet');
var regexpCmd = new RegExp(/^pushaction\s.*$/gm),
    isEnter = new RegExp(/(\r\n|\n|\r)/gm),
    isValid = new RegExp(/[a-zA-Z0-9\s]+/),
    usage = '\nInvalid syntax for pushing data to Polycom phones.\nusage: pushaction <action_uri_key>\n';

telnet.createServer(function (client) {

    client.txtBuff = new Buffer(256);
    client.buffLen = 0;
    client.stringBuf = '';

    // make unicode characters work properly
    client.do.transmit_binary();

    // make the client emit 'window size' events
    client.do.window_size();

    // listen for the window size events from the client
    client.on('window size', function (e) {
        if (e.command === 'sb') {
            console.log('telnet window resized to %d x %d', e.width, e.height)
        }
    });

    // listen for the actual data from the client
    client.on('data', function (b) {
        client.write(b);

        var input = b.toString('utf8');
        if (!isValid.test(input)) { //valid string
            return;
        }

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
            client.stringBuf = '';
            return;
        }

        client.stringBuf += input;
        console.info('client.stringBuf: ' + client.stringBuf);
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