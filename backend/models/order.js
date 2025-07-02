const mongoose=require("mongoose");

const order=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    books:{
        type:mongoose.Types.ObjectId,
        ref:"Books",
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out of delivered","delivered","order cancelled"]
    }

},
{timestamp:true}
);
module.exports=mongoose.model("order",order)