/**
 * Created by Xiaolei Y. on 12/10/2014.
 */
var app = require('express').createApplication();

app.get('/', function(req, res){
   res.send('<h2>Hello World!</h2>');
});

app.listen(8888, function(){
    console.log('Listening on port 3000');
});