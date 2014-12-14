/**
 * The HTTP server listening for Polycom phone's incoming event notifications.
 *
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/10/2014.
 */
var http     = require('http'),
    xml2js   = require('xml2js'),
    xmlparser = new xml2js.Parser(xml2js.defaults["0.1"]);
    routers  = require('./routers');

http.globalAgent.maxSockets = 100;
http.createServer(function (request, response) {

    console.info('request url: ' + request.url);
    /**
     * Finish current session when request other than event notification received
     */
    if (request.method != 'POST' || request.url != '/notifications') {
        response.writeHead(400);
        response.end();
        return;
    }

    var notification = '';
    request.addListener('data', function(chunk) {
        notification += chunk;
    });

    request.addListener('end', function(){
        if (notification.length === 0) {
            console.error('The notification request contains empty data.');
            return;
        }

        console.info('received notification: \n' + notification);

        xmlparser.parseString(notification, function(err, parsed){
            // TODO: error handling
            if (err) {
                console.error('Failed to parse the incoming notification from XML format to JSON. XML data: \n' + notification);
                return;
            }

            console.dir(parsed);
            routers.phone2device(parsed);
        });
    });
}).listen(9090);
