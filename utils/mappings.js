/**
 * The mappings table specify where to send data for specified phone/devices
 * TODO:
 *      1) to change this javascript filename
 *      2) to change the mappings.xml filename
 *
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/11/2014.
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
    });
}

loadMappings();

/**
 * Reload the mappings file if it is changed
 */
function reloadFileIfRequired() {
    var fstat = fs.statSync(_filepath);
    if (_lastModifiedTime === fstat.mtime) {
        return;
    }

    loadMappings();
    _lastModifiedTime = fstat.mtime;
}

module.exports = {
    phone2device: function(src_ip){
        reloadFileIfRequired();
        return _mappingsPhone2Devices[src_ip];
    }
};
