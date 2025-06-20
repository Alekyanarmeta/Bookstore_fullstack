const mongoose=require("mongoose");

const order=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    books:{
        type:mongoose.Types.ObjectId,
        ref:"books",
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out of delivered","delivered"]
    }

},
{timestamp:true}
);
module.exports=mongoose.model("order",order)