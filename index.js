import express, { response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Lists", { useNewUrlParser: true});
        console.log("connected");

        const taskSchema = new mongoose.Schema( {
            inputtask:String
        });
        const todayTask = mongoose.model("todayTask",taskSchema);
        const weekTask = mongoose.model("weekTask",taskSchema);

        app.get("/today", (req,res) => {
            todayTask.find().then((tasks,err) => {
                if(err){
                    console.log(err)
                }else{  
                    res.render("today.ejs",{tasks : tasks});
                }
            })
        });

        app.post("/today", (req,res) => {
            var newtask=req.body.addtask;
            const addedtask = new todayTask( {
                inputtask: newtask
            })
            addedtask.save();
            res.redirect("/today");
        })
        
        app.get("/Week", (req,res) => {
            weekTask.find().then((tasks,err) => {
                if(err){
                    console.log(err)
                }else{  
                    res.render("week.ejs",{tasks : tasks});
                }
            })
        });
        
        app.post("/Week", (req,res) => {
            var newtask=req.body.addtask;
            const addedtask = new weekTask( {
                inputtask: newtask
            })
            addedtask.save();
            res.redirect("/Week");
        });

        app.post("/delete", (req,res) => {
            const id = req.body["checkbox"];
            const url = req.body["url"];
            if(url === "today"){
                todayTask.findByIdAndDelete(id).then((response,err) => {
                    if(!err){
                        console.log("element deleted successfully!")
                        res.redirect("/today")
                    }
                })
                
            }else{
                weekTask.findByIdAndDelete(id).then((response,err) => {
                    if(!err){
                        console.log("element deleted successfully!")
                        res.redirect("/Week")
                    }
                })
            }
        })

    } catch (error) {
        console.log("Failed to connect to database!",error)
    }
}

connectDB();

app.listen(3000, () => {
    console.log("listening to 3000...")
})