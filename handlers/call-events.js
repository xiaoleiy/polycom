/**
 * The handler to manipulate the event notifications of IncomingCall and OutgoingCall 
 * , received from the Polycom phone.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
 */

module.exports = {
    /**
     * Layout of the notification data packet in XML:
     *
         <IncomingCallEvent>
          <PhoneIP>172.24.132.135</PhoneIP>
          <MACAddress>0004f214b89e</MACAddress>
          <CallingPartyName>20701</CallingPartyName>
          <CallingPartyNumber>20701@172.18.186.94</CallingPartyNumber>
          <CalledPartyName>20300</CalledPartyName>
          <CalledPartyNumber>20300</CalledPartyNumber>
          <TimeStamp>2008-07-11T13:19:53-08:00</TimeStamp>
         </IncomingCallEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    incomingCallHanlder: function (notification) {
        console.info('To process the notification packet of IncomingCallEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    },

    /**
     * Layout of the notification data packet in XML:
     *
         <OutgoingCallEvent>
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <CallingPartyName> </CallingPartyName>
          <CallingPartyNumber> </CallingPartyNumber>
          <CalledPartyName> </CalledPartyName>
          <CalledPartyNumber> </CalledPartyNumber>
          <TimeStamp> </TimeStamp>
         </OutgoingCallEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    outgoingCallHandler: function (notification) {
        console.info('To process the notification packet of OutgoingCallEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    },

    /**
     * Layout of the notification data packet in XML:
     *
         <CallStateChangeEvent CallReference=" " CallState=" ">
          <PhoneIP> </PhoneIP>
          <MACAddress> </MACAddress>
          <LineNumber> </LineNumber>
          <TimeStamp> </TimeStamp>
          <CallLineInfo>
          <LineKeyNum> </LineKeyNum>
          <LineDirNum> </LineDirNum>
          <LineState> </LineState>
          <CallInfo>
          <CallState> </CallState>
          <CallType> </CallType>
          <UIAppearanceIndex> </UIAppearanceIndex>
          <CalledPartyName> </CalledPartyName>
          <CalledPartyDirNum> </CalledPartyDirNum>
          <CallingPartyName> </CallingPartyName>
          <CallingPartyDirNum> </CallingPartyDirNum>
          <CallReference> </CallReference>
          <CallDuration> </CallDuration>
          </CallInfo>
          </CallLineInfo>
         </CallStateChangeEvent>
     *
     * @param notification The notification data body in javascript object format
     * @returns {*}
     */
    callstateChangeHandler: function (notification) {
        console.info('To process the notification packet of CallStateChangeEvent');
        // TODO to provide your code to manipulate the incoming notification data
        return notification;
    }
};