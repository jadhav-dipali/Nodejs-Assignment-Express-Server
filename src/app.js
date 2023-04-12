const express = require("express")
const app = express();
require("dotenv").config();
require("./db/connection")
const User = require("./model/userSchema")
const methodOverride = require('method-override')
const port =process.env.PORT;


app.use(methodOverride('_method'))

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:true}))

app.get("/" ,async(req,res)=>{
    try {
        const readData = await User.find();
        res.render("home" ,{readData})
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put("/users/:id" , async(req,res)=>{
    try {
       let _id = req.params.id;
       let data = await User.findOne({_id})
       if(data.isPromoted){
        let updateData = await User.findByIdAndUpdate(_id,{isPromoted:false}, {new:true}) 
       }else{
        let updateData = await User.findByIdAndUpdate(_id,{isPromoted:true}, {new:true})
       }
       res.redirect("/")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete("/users/:id" , async(req,res)=>{
    try{
       let deleteData = await User.findByIdAndDelete(req.params.id) 
       res.redirect("/")
    }catch(err){
        res.status(400).send(err)
    }
})

app.get("/form" , (req,res)=>{
    res.render("form")
})

app.post("/" ,async(req,res)=>{
try {
    const data = new User(req.body)
    const createdata = await data.save();
    res.redirect("/")
} catch (error) {
    res.status(400).send(error)
}
})

app.listen(port, ()=>{
    console.log(`listening port ${port}`)
})
