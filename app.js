// packages
const express = require("express");
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_Var9BwRFsGSVoYhpy4j9qgvS");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

const bodyParser = require("body-parser");
//app is the express method
const app = express();

// set the folder where the server will fetch static files.
// The adress with start with the route on the public ---> ex:  public/something/something
app.use(express.static("public"));

// bodyparser configuration
app.use(bodyParser.urlencoded({ extended: true }))

// server set up
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// listen is a express method
app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
// routes
app.get("/", function (req, res) {
    // res.send("homepage");
    //conection with template
    res.render("index.ejs")
});
app.get("/photos/friend", function (req, res) {

    // console.log(req);
    res.send("Your photos");
});
// : é um placeholder
app.get("/photos/:friend", function (req, res) {
    res.send("hello " + req.params.friend);
});
// payments route
app.post("/payment", function (req, res) {

    // handle payment
    console.log(req.body)
  
    stripe.charges.create({
      amount: "9999",
      currency: "eur",
      description: "some product",
      source: req.body.stripeToken
    }, function(err, charge) {
  
      if(err) {
         
        console.log (err)
        return res.send(err)
      }
      res.send("success!!")
    })
  
  })
// 404 This must be in End, if dont find anything is a default msg
app.get("*", function (req, res) {
    res.send("404 not found :(");
});



