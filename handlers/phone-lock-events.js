/**
 * The handler to manipulate the event notifications of Line Phone Locked and Unlocked
 * , received from the Polycom phone.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
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