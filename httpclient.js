/**
 * The HTTP client to push data to the Polycom phones.
 * 
 * Created by idealab on 12/11/2014.
 */
var request = require('request');
//var _actionTemplate = "<PolycomIPPhone><Data priority=\"Critical\">Key:Directories</Data></PolycomIPPhone>";
var _actionTemplate = "<PolycomIPPhone><Data priority=\"Critical\">_action_</Data></PolycomIPPhone>";

module.exports = {

    /**
     * Push predefined keys to the phone, including Keys, Softkeys and Play actions
     *
     * Refer to document: Web Application Developer’s Guide
     *                      > SoundPoint IP/SoundStation IP/VVX XML API Application Interface
     *                      > Telephone Integration URIs;
     *
     * @param phoneIP The ip address to push action to
     * @param action The predefined action
     * @param username The username to access the phone's push service
     * @param password The password to access the phone's push service
     */
    pushaction: function(phoneIP, username, password, action) {
        request.post('http://' + phoneIP + '/push', {
            'auth': {
                'user': username,
                'pass': password,
                'sendImmediately': false
            },
            headers: {
                'Content-Type': 'application/x-com-polycom-spipx'
            },
            encoding: 'utf8',
            body: _actionTemplate.replace(/_action_/, action)
        }, function (error, response, body) {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log('[' + response.statusCode + '] data pushed to the phone successfully: ');
            } else {
                console.log('[' + response.statusCode + '] failed to push data to the phone with error: ' + body);
            }
        });
	},

    /**
     * Push the HTML content directly to the phone.
     *
     * @param html HTML content
     * @param phoneIP The ip address to push HTML content to
     * @param username The username to access the phone's push service
     * @param password The password to access the phone's push service
     */
    pushhtml: function(phoneIP, username, password, html) {

    },

    /**
     * Push the URL to the phone to display with.
     *
     * @param url The HTML page's URL
     * @param phoneIP The ip address to push URL to
     * @param username The password to access the phone's push service
     * @param password The password to access the phone's push service
     */
    pushurl: function(phoneIP, username, password, url) {

    }
};
