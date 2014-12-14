/**
 * The handler to manipulate the event notifications of User Login and Logout
 * , received from the Polycom phone.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
 */

module.exports = {
    /**
     * Layout of the notification data packet:
         <UserLoginOutEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <CallLineInfo>
          <LineKeyNum> </LineKeyNum>
          <LineDirNum> </LineDirNum>
          </CallLineInfo>
          <UserLoggedIn> </UserLoggedIn>
          <TimeStamp> </TimeStamp>
         </UserLoginOutEvent>

         <UserLoginOutEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <CallLineInfo>
          <LineKeyNum> </LineKeyNum>
          <LineDirNum> </LineDirNum>
          </CallLineInfo>
          <UserLoggedOut/>
          <TimeStamp> </TimeStamp>
         </UserLoginOutEvent>
     *
     * @param notification
     * @returns {*}
     */
    hanldeUserLoginout: function (notification) {
        console.info('To process the notification packet of UserLoginOutEvent');
        return notification;
    }
}