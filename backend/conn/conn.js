const mongoose=require("mongoose")

const conn=async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("mongodb connected sucessfully")
    }
    catch(err)
    {
        console.log("err found",err)
    }
}
conn();
