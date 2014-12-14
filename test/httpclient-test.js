/**
 * Created by idealab on 12/14/2014.
 */
var client = require('./../httpclient');

function pushaction(action){
    client.pushaction('127.0.0.1', 'Polycom', '456', action);
}
var action = 'Key:Directories';
var volDown = 'Key:Menu';
var tel = 'tel:\\1234';
var all = 'Key:Menu\nKey:Applications\ntel:\\1234';
pushaction(all);