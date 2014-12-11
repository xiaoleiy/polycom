/**
 * Created by idealab on 12/12/2014.
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
    offhookHanlder: function (notification) {
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
    onhookHandler: function (notification) {
        console.info('To process the notification packet of OnHookEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    }
};