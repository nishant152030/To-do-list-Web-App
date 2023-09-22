import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var today_task = [];
var week_task=[];
app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/today", (req,res) => {
    res.render("today.ejs")
});

app.post("/today", (req,res) => {
    var newtask=req.body.addtask;
    today_task.push(newtask);
    res.render("today.ejs",{tasks : today_task});
})

app.get("/week", (req,res) => {
    res.render("week.ejs")
});

app.post("/week", (req,res) => {
    var newtask=req.body.addtask;
    week_task.push(newtask);;
    res.render("week.ejs",{tasks : week_task});
});

app.post("/submit",(req,res) => {
    console.log(req.body);
})

app.listen(3000, () => {
    console.log("listening to 3000...")
})