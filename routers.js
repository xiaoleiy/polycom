/**
 * The central routers for data flow of events notifying & data push.
 * For the dataflow of events notifying, handlers for incoming notification are required.
 * For the dataflow of data push, data unmarshalling is required to push to the Polycom phones.
 * 
 * Created by idealab on 12/11/2014.
 */

var fs       		 = require('fs'),
    xml2js 			 = require('xml2js'),
    telnetclient 	 = require('./telnetclient'),
    mappings 		 = require('./utils/mappings'),
    callHandlers 	 = require('./handlers/call-events'),
    hooksHandler 	 = require('./handlers/hook-events'),
    lineRegHandler 	 = require('./handlers/line-reg-events'),
    phoneLockHandler = require('./handlers/phone-lock-events'),
    userLoginHandler = require('./handlers/userlogin-events'),
    actionUriHandler = require('./handlers/phoneaction-uri.js');

/**
 * All required event handlers which defined at respective javascript files.
 *
 * @type {{IncomingCallEvent: Function, OutgoingCallEvent: Function, OffHookEvent: Function, OnHookEvent: Function, PhoneLockedEvent: Function, PhoneUnlockedEvent: Function, CallStateChangeEvent: Function, LineRegistrationEvent: Function, LineUnregistrationEvent: Function, UserLoginOutEvent: Function}}
 */
var handlers = {
    'IncomingCallEvent': 		callHandlers.incomingCallHanlder,
    'OutgoingCallEvent': 		callHandlers.outgoingCallHandler,
    'OffHookEvent': 			hooksHandler.offhookHanlder,
    'OnHookEvent': 				hooksHandler.onhookHandler,
    'PhoneLockedEvent': 		phoneLockHandler.phonelockHandler,
    'PhoneUnlockedEvent': 		phoneLockHandler.phoneunlockHandler,
    'CallStateChangeEvent': 	callHandlers.callstateChangeHandler,
    'LineRegistrationEvent': 	lineRegHandler.lineregHanlder,
    'LineUnregistrationEvent': 	lineRegHandler.lineUnregHandler,
    'UserLoginOutEvent': 		userLoginHandler.userLoginoutHandler
};

module.exports = {

    /**
     * The router definition for notification data flow, which comes from Polycom phone and send to the hardware.
     *
     * @param data The notification data in JSON format, which has the same structure with the original XML packet.
     */
    notification: function(data) {
        var inboundData = data.PolycomIPPhone;
        var eventType = Object.getOwnPropertyNames(inboundData)[0];
        var handler = handlers[eventType];
        if (!handler) {
            console.error('Received invalid event which could be not processed: ' + eventType);
            return;
        }

        var outboundData = handler(inboundData);

        // TODO: to confirm the data format with Alexander, is it in XML format?
        var outboundDataXml = new xml2js.Builder({
            rootName: 'root',
            headless: true
        }).buildObject(outboundData);

        var receivers = mappings.notification(inboundData.PhoneIP);
        // TODO: to send packet to receivers via telnetclient.js

		for (var idx = 0; idx < receivers.length; idx++) {
			var receiver = receivers[idx];
			telnetclient.send(receiver, outboundDataXml);
		}
    },

    /**
     * The router definition for datapush data flow, which comes from the hardware and send to Polycom phones.
     *
     * @param data The notification data in JSON format, which has the same structure with the original XML packet.
     */
    datapush: function(inboundData) {
		var outboundData = actionUriHandler.unmarshall(inboundData);
		phoneActionUriHandler.pushaction(outboundData.ipAddress, outboundData);
    }
}