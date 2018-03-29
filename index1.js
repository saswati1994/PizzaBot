   var express = require('express')

var bodyParser = require('body-parser')

var app = express()
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json());
app.get('/', function(request, response) {
response.send('Hello World!')
})
app.post('/webhook',function(request,response){
where jsondata=JSON.parse(request.body);
console.log(jsondata); 
//console.log(JSON.stringify(request.body));
console.log("WEBHOOK TRIGRED")

})
app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'))
})
