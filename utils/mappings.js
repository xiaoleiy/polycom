/**
 * The mappings table specify where to send data for specified phone/devices
 * TODO:
 *      1) to change this javascript filename
 *      2) to change the mappings.xml filename
 *
 * Created by Xiaolei Y. on 12/11/2014.
 */

var fs = require('fs'),
    path = require('path'),
    parsexml = require('xml2js').parseString;

var _mappingsFilepath     = './' + path.sep + 'config' + path.sep + 'mappings.xml',
    _mappingsNotification = _mappingsNotification || {},
    _mappingsDatapush     = _mappingsDatapush || {},
    lastModifiedTime      = 0;

function loadMappings() {
    var mappingsXml = fs.readFileSync(_mappingsFilepath);
    parsexml(mappingsXml, function(err, parsed){
        // TODO: to handle the error
        if (err) {
            console.error('The config ' + _mappingsFilepath + ' is invalid XML. Mappings will not be available for routers.')
            return;
        }

        var notificationSender = parsed.root.notification[0].sender[0],
            notificationReceivers = parsed.root.notification[0].receivers[0].receiver;
        _mappingsNotification[notificationSender] = notificationReceivers;

        var datapushSender = parsed.root.datapush[0].sender[0],
            datapushReceivers = parsed.root.datapush[0].receivers[0].receiver;
        _mappingsDatapush[datapushSender] = datapushReceivers;
    });
}

/**
 * Determine whether the mappings file changed
 *
 * @returns {boolean}
 */
function isMappingsChanged() {
    var filestat = fs.statSync(_mappingsFilepath);
    if (lastModifiedTime != filestat.mtime) {
        lastModifiedTime = filestat.mtime;
    }

    return false;
}

module.exports = {
    notification: function(src_ip){
        if (isMappingsChanged()) {
            loadMappings();
        }
        return _mappingsNotification[src_ip];
    },

    datapush: function(src_ip) {
        if (isMappingsChanged()) {
            loadMappings();
        }
        return _mappingsDatapush[src_ip];
    }
};
