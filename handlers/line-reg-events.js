/**
 * Created by idealab on 12/12/2014.
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