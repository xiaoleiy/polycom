/**
 * The handler to unmarshall data packet of phone actions from the hardwares.
 * Regex matching is recommanded to most of the data unmarshlling.
 * 
 * Created by Xiaolei Y. (yuleibest@gmail.com) on 12/11/2014.
 */

/**
 * The function to decode the inbound data to data in standard data layout:
 * "<actionType>#<ipAddress>#<username>:<password>#<data>"
 *
 * @param inboundData The inbound data sent from different hardware with different data layout.
 * @returns {*} The decoded data which follows the same data convention.
 */
function decode(inboundData) {
    // TODO: to provide code for the inbound data decoding
    return inboundData;
}

/**
 * The function to normalize the decoded data as
 * "PUSH#192.168.1.27#user:bob_pass#default_URL_Internal_URI_Key_Direct_Hard_keys:7\r\n"
 * to object with properties required for data push.
 *
 * The parameter must follow the data layout:
 * <actionType>#<ipAddress>#<username>:<password>#<data>"
 *
 * actionType:
 *      action  =>  The interface to execute predefined actions on the phone.
 *                  Provide valid action keys at the section of <data>, such as Key:Directories
 *      url     =>  The HTTP URL push allows to send asynchronous relative URIs to the phone.
 *                  And the URL will be opened by the browser/microbrowser on the phones.
 *                  Provide valid and relative URL (to the server root URL configured at phone) at the section of <data>
 *      page    =>  The data push allows to send XHTML page content directly to a phone without the overhead of the
 *                  phone having to fetch the XHTML.
 *                  Provide valid HTML page content at the section of <data>, such as <p>hello world!<h3>Welcome</h3></p>
 */
function toObject(decodedData) {
    var decodedSlices = decodedData.split('#');
    if (typeof decodedData === 'undefined' || decodedData === null) {
        return null;
    }

    var crendential = decodedSlices[2].split(':');
    var username = crendential[0];
    var password = crendential[1];

    return {
        actionType: decodedSlices[0],
        phoneIP: decodedSlices[1],
        username: username,
        password: password,
        data: decodedSlices[3]
    }
}

module.exports = {
	format: function(data) {
        var decoded = decode(data);
        var normalized = toObject(decoded);
		console.info('Unmarshall the received data from hardware to normalized data object:');
		console.info('inbound: ' + data);
		console.info('outbound: ' + normalized);
		
		return normalized;
	}
};