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
    xmlparser   = new xml2js.Parser(xml2js.defaults["0.1"]);

var _mappingsFilepath     = './' + path.sep + 'config' + path.sep + 'mappings.xml',
    _mappingsNotification = _mappingsNotification || {},
    _mappingsDatapush     = _mappingsDatapush || {},
    lastModifiedTime      = 0;

function loadMappings() {
    var mappingsXml = fs.readFileSync(_mappingsFilepath);
    xmlparser.parseString(mappingsXml, function(err, parsed){
        // TODO: to handle the error
        if (err) {
            console.error('The config ' + _mappingsFilepath + ' is invalid XML. Mappings will not be available for routers.')
            return;
        }

        var notificationSender = parsed.root.notification.sender,
            notificationReceivers = parsed.root.notification.receivers.receiver;
        _mappingsNotification[notificationSender] = notificationReceivers;

        var datapushSender = parsed.root.datapush.sender,
            datapushReceivers = parsed.root.datapush.receivers.receiver;
        _mappingsDatapush[datapushSender] = datapushReceivers;
    });
}

loadMappings();

/**
 * Reload the mappings file if it is changed
 */
function reloadFileIfNeeded() {
    var filestat = fs.statSync(_mappingsFilepath);
    if (lastModifiedTime === filestat.mtime) {
        return;
    }

    loadMappings();
    lastModifiedTime = filestat.mtime;
}

module.exports = {
    phone2device: function(src_ip){
        reloadFileIfNeeded();
        return _mappingsNotification[src_ip];
    },

    device2phone: function(src_ip) {
        reloadFileIfNeeded();
        return _mappingsDatapush[src_ip];
    }
};
