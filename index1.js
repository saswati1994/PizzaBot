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

  //printing accumulated data
  console.log("Accumulated data: ", request.body.queryResult.parameters);
  
  //storing formated facebook response to send to the user
  var formatedResponse = responseFormator(`i have droped a mail to ${request.body.queryResult.parameters.managername} and a cab request is raised for ${request.body.queryResult.parameters.time}`);
  
  //sending the response to user
  response.send(formatedResponse);

  //storing manger name
  var mangerName= request.body.queryResult.parameters.managername
  var managerMail;
  
  //itterating the config.js file datapoints to get manager's mail id
  datapoints.mailids.forEach(element => {
    if(element.name === mangerName){

      managerMail=element.mail

    }
  });
  //sending mail
  sgMail.setApiKey(process.env.key);
  const msg = {
    to: managerMail,
    from: 'saswatidashinfo@gmail.com',
    subject: 'Cab request',
    text: `Request details: \n Time: ${request.body.queryResult.parameters.time} \n Place: ${request.body.queryResult.parameters.place} \n\n Regards \n Saswati Dash`,
  };
  sgMail.send(msg);
  
}

//function to generate facebook response format 
function responseFormator(ResponseText){
  return {

    "fulfillmentText": ResponseText,  
    "source": "myserver"
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
