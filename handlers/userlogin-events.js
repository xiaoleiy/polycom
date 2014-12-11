/**
 * Created by idealab on 12/12/2014.
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
    userLoginoutHandler: function (notification) {
        console.info('To process the notification packet of UserLoginOutEvent');
        return notification;
    }
}