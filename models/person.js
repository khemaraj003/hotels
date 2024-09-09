const mongoose=require('mongoose')
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager']
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:Number,
        unique:true
    },
    salery:{
        type:Number,
        unique:true
    }
})


const Person=mongoose.model('person',personSchema);
module.exports=Person;