/**
 * Created by idealab on 12/11/2014.
 */

var fs       = require('fs'),
    parsexml = require('xml2js'),
    mappings = require('./utils/mappings'),
    callHandlers = require('./handlers/call-events'),
    hooksHandler = require('./handlers/hook-events'),
    lineRegHandler = require('./handlers/line-reg-events'),
    phoneLockHandler = require('./handlers/phone-lock-events'),
    userLoginHandler = require('./handlers/userlogin-events');

/**
 * All required event handlers which defined at respective javascript files.
 *
 * @type {{IncomingCallEvent: Function, OutgoingCallEvent: Function, OffHookEvent: Function, OnHookEvent: Function, PhoneLockedEvent: Function, PhoneUnlockedEvent: Function, CallStateChangeEvent: Function, LineRegistrationEvent: Function, LineUnregistrationEvent: Function, UserLoginOutEvent: Function}}
 */
var handlers = {
    'IncomingCallEvent': callHandlers.incomingCallHanlder,
    'OutgoingCallEvent': callHandlers.outgoingCallHandler,
    'OffHookEvent': hooksHandler.offhookHanlder,
    'OnHookEvent': hooksHandler.onhookHandler,
    'PhoneLockedEvent': phoneLockHandler.phonelockHandler,
    'PhoneUnlockedEvent': phoneLockHandler.phoneunlockHandler,
    'CallStateChangeEvent': callHandlers.callstateChangeHandler,
    'LineRegistrationEvent': lineRegHandler.lineregHanlder,
    'LineUnregistrationEvent': lineRegHandler.lineUnregHandler,
    'UserLoginOutEvent': userLoginHandler.userLoginoutHandler
};

module.exports = {

    /**
     * The router definition for notification data flow, which comes from Polycom phone and send to the hardware.
     *
     * @param data The notification data in JSON format, which has the same structure with the original XML packet.
     */
    notification: function(data) {
        var notificationBody = data.PolycomIPPhone;
        var eventType = Object.getOwnPropertyNames(notificationBody)[0];
        var handler = handlers[eventType];
        if (!handler) {
            console.error('Received invalid event which could be not processed: ' + eventType);
            return;
        }

        var handledData = hanlder(notificationBody);
        var phoneIP = notificationBody.PhoneIP;
        var receivers = mappings.notification[phoneIP];
        // TODO: to send packet to receivers via telnetclient.js
    },

    /**
     * The router definition for datapush data flow, which comes from the hardware and send to Polycom phones.
     *
     * @param data The notification data in JSON format, which has the same structure with the original XML packet.
     */
    datapush: function(data) {

    }
}