/**
 * The handler to manipulate the event notifications of OffHook and OnHook 
 * , received from the Polycom phone.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
 */

module.exports = {
    /**
     * Layout of the notification data packet in XML:
     *
         <OffHookEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <TimeStamp> </TimeStamp>
         </OffHookEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    hanldeOffhook: function (notification) {
        console.info('To process the notification packet of OffHookEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    },

    /**
     * Layout of the notification data packet in XML:
     *
         <OnHookEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <TimeStamp> </TimeStamp>
         </OnHookEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    hanldeOnhook: function (notification) {
        console.info('To process the notification packet of OnHookEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    }
};