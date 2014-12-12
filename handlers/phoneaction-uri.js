/**
 * The handler to unmarshall data packet of phone actions from the hardwares.
 * Regex matching is recommanded to most of the data unmarshlling.
 * 
 * Created by Xiaolei Y. on 12/11/2014.
 */

module.exports = {
	unmarshall: function(data) {
		// TODO: the code for unmarshalling the provided data is required.
		console.info('The received data from hardwares is unmarshalled:');
		console.info('origin: ' + data);
		console.info('unmarshalled: ' + data);
		
		return data;
	}
};