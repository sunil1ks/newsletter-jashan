

const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const request = require ("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen (3000);

app.get("/", function(req,res){

//
res.sendFile(__dirname + "/newsletter.html");
});


app.post("/", function (req,res){

var mail= req.body.email;
var fName= req.body.firstName;
var lName= req.body.lastName;

var data = {
members: [
  {email_address: mail,
    status: "subscribed"
  }
]

};

var jsonData=JSON.stringify(data);

var options = {
  url: "https://us4.api.mailchimp.com/3.0/lists/ca75788bf0",
  method: "POST",
  headers : {
    "Authorization" : ' anystring a370fa54c90308108eeed022e6933966-us4'
  },
  body: jsonData
}

request (options, function (error,response,body){
if (error)(
  console.log (error)
)
else {
  console.log(response.statusCode);
  console.log(body);
}

})
});
