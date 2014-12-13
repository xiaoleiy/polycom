/**
 * The HTTP server listening for Polycom phone's incoming event notifications.
 *
 * Created by Xiaolei Y. on 12/10/2014.
 */
var http = require('http'),
    parsexml = require('xml2js').parseString,
    routers = require('./routers');

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

        parsexml(notification, function(err, parsed){
            // TODO: error handling
            if (err) {
                console.error('Failed to parse the incoming notification from XMl format to JSON.');
                return;
            }

            routers.notification(parsed);
        });
    });

//    var req_params = url.parse(request.url).query;
//    console.info('request url: ' + request.url + '\t params: ' + req_params);
//    var username = querystring.parse(req_params);
//    var username = querystring.parse(req_params)['username'];
}).listen(9090);

//http.createServer(function (request, response) {
//
//    var req_params = url.parse(request.url).query;
//    console.info('request url: ' + request.url + '\t params: ' + req_params);
//
//    var username = querystring.parse(req_params)['username'];
//    if (request.method === 'POST') {
//        var postdata = '';
//        request.addListener('data', function(chunk) {
//            postdata += chunk;
//        });
//
//        request.addListener('end', function(){
//            console.info('all post data: ' + postdata);
//        });
//    }
//
////    var data = fs.readFileSync(__dirname + path.sep + 'test.html');
////    response.writeHead(200, {"Content-Type": 'text/html'});
////    var rs = fs.createReadStream('test.html');
////            util.pump(rs, response);
////    response.write(data);
////    response.redirect('./test.html');
//    var filePath = '.' + request.url;
//    	if (filePath == './')
//    		filePath = './test.html';
//
//    	var extname = path.extname(filePath);
//    	var contentType = 'text/html';
//    	switch (extname) {
//    		case '.js':
//    			contentType = 'text/javascript';
//    			break;
//    		case '.css':
//    			contentType = 'text/css';
//    			break;
//    	}
//
//    	path.exists(filePath, function(exists) {
//
//    		if (exists) {
//    			fs.readFile(filePath, function(error, content) {
//    				if (error) {
//    					response.writeHead(500);
//    					response.end();
//    				}
//    				else {
//    					response.writeHead(200, { 'Content-Type': contentType });
//    					response.end(content, 'utf-8');
//    				}
//    			});
//    		}
//    		else {
//    			response.writeHead(404);
//    			response.end();
//    		}
//    	});
//}).listen(8000);