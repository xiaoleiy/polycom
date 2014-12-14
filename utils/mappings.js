/**
 * The mappings table specify where to send data for specified phone/devices
 * TODO:
 *      1) to change this javascript filename
 *      2) to change the mappings.xml filename
 *
 * Created by Xiaolei Y. on 12/11/2014.
 */

var fs          = require('fs'),
    path        = require('path'),
    xml2js 		= require('xml2js'),
    xmlparser   = new xml2js.Parser(xml2js.defaults["0.1"]),
    _filepath   = './' + path.sep + 'config' + path.sep + 'mappings.xml',
    _mappingsPhone2Devices = _mappingsPhone2Devices || {},
    _lastModifiedTime      = 0;

function loadMappings() {
    var mappingsXml = fs.readFileSync(_filepath);
    xmlparser.parseString(mappingsXml, function(err, parsed){
        // TODO: to handle the error
        if (err) {
            console.error('The config ' + _filepath + ' is invalid XML. Mappings will not be available for routers.')
            return;
        }

        var mappings = parsed.phone2devices.mapping;
        for (var idx = 0; idx < mappings.length; idx++) {
            var mapping = mappings[idx];
            var phone = mapping.phone;
            _mappingsPhone2Devices[phone] = mapping.devices.device;
        }

//        var datapushSender = parsed.datapush.sender,
//            datapushReceivers = parsed.datapush.receivers.receiver;
//        _mappingsDatapush[datapushSender] = datapushReceivers;
    });
}

loadMappings();

/**
 * Reload the mappings file if it is changed
 */
function reloadFileIfNeeded() {
    var fstat = fs.statSync(_filepath);
    if (_lastModifiedTime === fstat.mtime) {
        return;
    }

    loadMappings();
    _lastModifiedTime = fstat.mtime;
}

module.exports = {
    phone2device: function(src_ip){
        reloadFileIfNeeded();
        return _mappingsPhone2Devices[src_ip];
    }

    /*device2phone: function(src_ip) {
        reloadFileIfNeeded();
        return _mappingsDatapush[src_ip];
    }*/
};
