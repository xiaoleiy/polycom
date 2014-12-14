/**
 * The handler to manipulate the event notifications of Line Registration and Unregistration
 * , received from the Polycom phone.
 *
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/11/2014.
 */

module.exports = {
    /**
     * Layout of the notification data packet in XML:
     *
         <LineRegistrationEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress </MACAddress>
          <LineNumber> </LineNumber>
          <TimeStamp> </TimeStamp>
         </LineRegistrationEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    hanldeLineReg: function (notification) {
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    },

    /**
     * Layout of the notification data packet in XML:
     *
         <LineUnregistrationEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <LineNumber> </LineNumber>
          <TimeStamp> </TimeStamp>
         </LineUnregistrationEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    hanldeLineUnreg: function (notification) {
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    }
}