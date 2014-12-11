/**
 * The HTTP server listening for Polycom phone's incoming event notifications.
 *
 * Created by Xiaolei Y. on 12/10/2014.
 */
var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http'),
    request = require('request'),
    parsexml = require('xml2js').parseString,
    routers = require('routers');

http.globalAgent.maxSockets = 100;

http.createServer(function (request, response) {

    /**
     * Finish current session when request other than event notification received
     */
    if (request.method != 'POST' || request.url != '/notification') {
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
}).listen(8000);

//var pushdata = '<PolycomIPPhone>\n'
//    + '<Data priority="Critical"> <h1> Fire Drill at 2pm </h1> Please exit and congregate at your appropriate location outside </Data>\n'
//    + '</PolycomIPPhone>';

//var auth = 'Basic ' + new Buffer('Polycom:456').toString('base64');
//var req = http.request({
//    host: '127.0.0.1',
//    port: 80,
//    path: '/push',
//    method: 'POST',
//    headers: {
//        'content-type': 'application/x-com-polycom-spipx',
//        'Authorization': auth,
//        'user-agent': 'Mozilla/5.0'
//    },
//    agent: {
//        maxSockets: 100
//    }
////    auth: 'Polycom:456'
//
//}, function(response){
//    var str = '';
//
//    //another chunk of data has been recieved, so append it to `str`
//    response.on('data', function (chunk) {
//        str += chunk;
//    });
//
//    //the whole response has been recieved, so we just print it out here
//    response.on('end', function () {
//        console.log(str);
//    });
//});
//
//req.write(pushdata);
//req.end();

//request.post('http://127.0.0.1/push', {
//    auth: {
//        username: 'Polycom',
//        password: '456'
//    },
//    headers: {
//        'Content-Type': 'application/x-com-polycom-spipx'
////        'Content-Length': pushdata.length
//    },
////    encoding: 'utf8',
//    body: pushdata
//}, function (error, response, body) {
//
////    console.dir(response);
//    console.dir(body);
//
//    if (response.statusCode == 201) {
//        console.log('data pushed to the phone: ' + response.statusCode)
//    } else {
//        console.log('error: ' + response.statusCode)
//        console.log(body)
//    }
//});

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