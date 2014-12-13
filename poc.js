/**
 * Created by idealab on 12/14/2014.
 */
var xml2js = require('xml2js');
var parser = new xml2js.Parser(xml2js.defaults["0.1"]);

var xml = '<root><IncomingCallEvent> <PhoneIP>172.24.132.135</PhoneIP> <MACAddress>0004f214b89e</MACAddress> </IncomingCallEvent></root>';
var parseString = require('xml2js').parseString;
parser.parseString(xml, function (err, result) {
    console.dir(result);
});