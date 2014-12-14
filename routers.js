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
    httpclient       = require('./httpclient'),
    callHandlers 	 = require('./handlers/call-events'),
    hooksHandler 	 = require('./handlers/hook-events'),
    lineRegHandler 	 = require('./handlers/line-reg-events'),
    phoneLockHandler = require('./handlers/phone-lock-events'),
    userLoginHandler = require('./handlers/userlogin-events'),
    msgFormatter     = require('./handlers/message-formatter');

/**
 * All required event handlers which defined at respective javascript files.
 *
 * @type {{IncomingCallEvent: Function, OutgoingCallEvent: Function, OffHookEvent: Function, OnHookEvent: Function, PhoneLockedEvent: Function, PhoneUnlockedEvent: Function, CallStateChangeEvent: Function, LineRegistrationEvent: Function, LineUnregistrationEvent: Function, UserLoginOutEvent: Function}}
 */
var handlers = {
    'IncomingCallEvent': 		callHandlers.handleIncomingCall,
    'OutgoingCallEvent': 		callHandlers.handleOutgoingCall,
    'OffHookEvent': 			hooksHandler.hanldeOffhook,
    'OnHookEvent': 				hooksHandler.hanldeOnhook,
    'PhoneLockedEvent': 		phoneLockHandler.hanldePhonelock,
    'PhoneUnlockedEvent': 		phoneLockHandler.hanldePhoneunlock,
    'CallStateChangeEvent': 	callHandlers.hanldeCallstateChange,
    'LineRegistrationEvent': 	lineRegHandler.hanldeLineReg,
    'LineUnregistrationEvent': 	lineRegHandler.hanldeLineUnreg,
    'UserLoginOutEvent': 		userLoginHandler.hanldeUserLoginout
};

module.exports = {

    /**
     * The router definition for notification data flow, which comes from Polycom phone and send to the hardware.
     *
     * @param inbound The notification data in JSON format, which has the same structure with the original XML packet.
     */
    phone2device: function(inbound) {
        var eventType = Object.getOwnPropertyNames(inbound)[0];
        var handler = handlers[eventType];
        if (!handler) {
            console.error('Received invalid event which could be not processed: ' + eventType);
            return;
        }

        var outbound = handler(inbound);
        var outboundXml = new xml2js.Builder({
            rootName: 'root',
            headless: true
        }).buildObject(outbound);

        var receivers = mappings.phone2device(inbound[eventType].PhoneIP);
        if (!receivers) {
            console.error('The receivers for incoming notifications from phone ' + inbound[eventType].PhoneIP
                + ' are not defined, please check the config/mappings.xml for correction.');
            return;
        }

        // send outbound message the devices configured in mappings.xml
		for (var idx = 0; idx < receivers.length; idx++) {
			var receiver = receivers[idx];
			telnetclient.send(receiver, outboundXml);
		}
    },

    /**
     * The router definition for datapush data flow, which comes from the hardware and send to Polycom phones.
     *
     * @param inbound The notification data in JSON format, which has the same structure with the original XML packet.
     */
    device2phone: function(inbound) {
		var outbound = msgFormatter.format(inbound);
        httpclient.pushaction(outbound.phoneIP, outbound.username, outbound.password, outbound.data);
    }
}