var express = require('express')
const sgMail = require('@sendgrid/mail');
var bodyParser = require('body-parser')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.post('/webhook',function(request,response){
  
  
  console.log("printing message",request.body);
   
  if(request.body.queryResult.intent.displayName=="Cab Request"){
      
    cabrequesthandler(request,response);
      
   }   
  //var jsondata=JSON.parse(request.body.contexts.parameters.Pizza-types);
  //console.log(request.body); 
  //console.log(JSON.stringify(request.body));
  console.log("WEBHOOK TRIGRED")

})

app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'))
})



function cabrequesthandler(request,response){

  console.log("Accumulated data: ", request.body.queryResult.parameters);
  response.send("i have sent a mail to your manager please wait for approval");
  sgMail.setApiKey(process.env.key);
  const msg = {
    to: 'saswatidashinfo@gmail.com',
    from: 'abhishekdash655@gmail.com',
    subject: 'cab request',
    text: 'I want to raise a cab request',
  };
  sgMail.send(msg);
  
}

