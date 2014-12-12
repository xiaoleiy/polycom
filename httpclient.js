/**
 * The HTTP client to push data to the Polycom phones.
 * 
 * Created by idealab on 12/11/2014.
 */
var http = require('http');


var pushdata = '<PolycomIPPhone>\n'
    + '<Data priority="Critical">\nKey:Line1\nKey:DailPad0\nKey:DailPad1\n</Data>\n'
    + '</PolycomIPPhone>';

// var auth = 'Basic ' + new Buffer('Polycom:456').toString('base64');
var req = http.request({
    host: '127.0.0.1',
    port: 80,
    path: '/push',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-com-polycom-spipx',
        'Authorization': auth,
        'User-Agent': 'Mozilla/5.0'
    },
    agent: { maxSockets: 100}
    auth: 'Polycom:456'
}, function(response){
    var str = '';

    // another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    // the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        console.log(str);
    });
});

req.write(pushdata);
req.end();

request.post('http://127.0.0.1/push', {
    auth: {
        username: 'Polycom',
        password: '456'
    },
    headers: {
        'Content-Type': 'application/x-com-polycom-spipx'
    },
    encoding: 'utf8',
    body: pushdata
}, function (error, response, body) {

    console.dir(response);
    console.dir(body);

    if (response.statusCode == 201) {
        console.log('data pushed to the phone: ' + response.statusCode)
    } else {
        console.log('error: ' + response.statusCode)
        console.log(body)
    }
});

module.exports = {
	pushAction: function(action) {
		
	}
};