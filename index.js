import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){   
    res.sendFile(__dirname + "/index.html");  
});

mongoose.connect("mongodb://0.0.0.0:27017/PMP", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log("Connected");

const schema = new mongoose.Schema ({
    username: String,
    email: String,
    phonenumber: Number,
    mentor: String,
    coordi: String,
    type: String,
    complaint: String,
    created: Date,
});

const User = mongoose.model("User", schema);

app.post("/", function(req, res){

    var username = req.body.username;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var mentor = req.body.mentor;
    var coordi = req.body.coordi;
    var type = req.body.type;
    var complaint = req.body.complaint;

    if(email === "s@gmail.com"){
        // res.sendFile(__dirname + "/admin.html");

        // app.get("/", function (req, res) {   
        //     User.find().then (function (allDetails) {
        //         res.render("list.ejs", { details: allDetails })
        //     })
        // });

        // app.get("/getdetails", function(req,res){
        //     console.log("Hello");
        // });

        // const nonarr = User.find();

        // const details = Array.from(nonarr);
        
        // // console.log(details);

        // res.render("list", {details: details});

        User.find().then (function (allDetails) {
            res.render("list.ejs", { details: allDetails })
        });

        // if(coordiname == " "){
        //     // const data = User.find();
        //     // res.send(User.find());

        //     User.find({}, {projection: {_id: 0}});

        // }
        // else{
        //     res.send(User.find({coordi: coordiname}));
        // }
    }
    else{
        const user1 = new User({
            username: username,
            email: email,
            phonenumber: phonenumber,
            mentor: mentor,
            coordi: coordi,
            type: type,
            complaint: complaint,
            created: new Date(Date.now())
        });
    
        user1.save();
        // console.log(comp);
        res.sendFile(__dirname + "/submit.html");
    }

    
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
