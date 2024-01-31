const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = 'Hm58B28yQjc5v5Vs';
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.llzmua2.mongodb.net/?retryWrites=true&w=majority` ,
 {
      useNewUrlParser : true,
      useUnifiedTopology: true,
});

//registrationschema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const Registration = mongoose.model("Registrations",registrationSchema);


// import json and urlencoded separately from body-parser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// use json and urlencoded middlewares separately
app.use(jsonParser);
app.use(urlencodedParser);
app.get("/sucess", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
       try{
              const {name, email , password} = req.body;

              const existinUser = await Registration.findOne({email : email});
              if(!existinUser)
              {
                 const registrationData = new Registration({
                name,
                email,
                password
               });
               await registrationData.save();
               res.redirect("/sucess");
              }
               else{
                console.log("user already exists")
                res.redirect("/sucess")
             }  
       }
       catch (error) {
        console.log("Error in registering user ", error);
         res.redirect("error");
       }
});

app.get("/sucess", (req, res) =>{
    res.sendFile(__dirname+"/pages/sucess.html");
});
app.get("error", (req, res) =>{
    res.sendFile(__dirname+"/pages/error.html");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`); // log port number
 });