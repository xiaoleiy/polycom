/**
 * The handler to manipulate the event notifications of Line Registration and Unregistration
 * , received from the Polycom phone.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
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
    lineregHanlder: function (notification) {
        console.info('To process the notification packet of LineRegistrationEvent');
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
    lineUnregHandler: function (notification) {
        console.info('To process the notification packet of LineUnregistrationEvent');
        return notification;
    }
}