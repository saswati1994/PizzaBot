var express = require('express')
const sgMail = require('@sendgrid/mail');
var bodyParser = require('body-parser');
var datapoints = require('./config')
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
  
  var formatedResponse = responseFormator(request,`i have droped a mail to ${request.body.queryResult.parameters.managername} and a cab request is raised for ${request.body.queryResult.parameters.time}`);
  response.send(formatedResponse);

  var mangerName= request.body.queryResult.parameters.managername
  var managerMail;
  datapoints.mailids.forEach(element => {
    if(element.name === mangerName){

      managerMail=element.mail

    }
  });
  sgMail.setApiKey(process.env.key);
  const msg = {
    to: managerMail,
    from: 'saswatidashinfo@gmail.com',
    subject: 'cab request',
    text: 'I want to raise a cab request',
  };
  sgMail.send(msg);
  
}


function responseFormator(request,ResponseText){
  return {

    "fulfillmentText": ResponseText,  
    "source": ResponseText
  }
}






















// facebooResponse={
//   status: "ok",
//   speech: ResponseText,
//   displayText:ResponseText,
//   data: {
//       "facebook":[
//           {
//               "sender_action": "typing_on"
//           },
//           {
//               "text": ResponseText,
//           },
//           {
//               "sender_action": "typing_off"
//           },
//       ]
//   },
//   contextOut: [],
//   source: "boehringer-ingelheim"
// }
