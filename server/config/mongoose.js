const mongoose = require("mongoose")



const connectdb = ()=>{
    try{
        mongoose.connect("mongodb+srv://ashrafadnan959:hCy65qyAgC1AvYU2@cluster0.pyvqrsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database Connected");
    }
    catch(err){
        console.log(err)
    }}

module.exports = connectdb;