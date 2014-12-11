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
    parsexml = require('xml2js');

var _mappingsFilename     = 'mappings.xml',
    _mappingsFilepath     = '..' + path.sep + 'config' + path.sep + _mappingsFilename,
    _mappingsNotification = _mappingsNotification || {},
    _mappingsDatapush     = _mappingsDatapush || {},
    lastModifiedTime      = 0;

function loadMappings() {
    var mappingsXml = fs.readFileSync();
    parsexml(mappingsXml, function(err, parsed){
        // TODO: to handle the error
        if (err) {
            console.error('The config ' + _mappingsFilename + ' is invalid XML. Mappings will not be available for routers.')
            return;
        }

        // TODO: to assign the relation to variables.
        var ntfSender = parsed.root.notification.sender,
            ntfReceivers = parsed.root.notification.receivers;
        _mappingsNotification[ntfSender] = ntfReceivers;

        var datapushSender = parsed.root.datapush.sender,
            datapushReceivers = parsed.root.datapush.receivers;
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
    notification: function(){
        if (isMappingsChanged()) {
            loadMappings();
        }
        return _mappingsNotification;
    },

    datapush: function() {
        if (isMappingsChanged()) {
            loadMappings();
        }
        return _mappingsDatapush;
    }
}