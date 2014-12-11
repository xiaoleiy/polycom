/**
 * Created by idealab on 12/12/2014.
 */

module.exports = {
    /**
     * Layout of the notification data packet in XML:
     *
         <PhoneLockedEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <TimeStamp> </TimeStamp>
         </PhoneLockedEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    phonelockHandler: function (notification) {
        console.info('To process the notification packet of PhoneLockedEvent');
        return notification;
    },

    /**
     * Layout of the notification data packet in XML:
     *
         <PhoneUnlockedEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <TimeStamp> </TimeStamp>
         </PhoneUnlockedEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    phoneunlockHandler: function (notification) {
        console.info('To process the notification packet of PhoneUnlockedEvent');
        return notification;
    }
}