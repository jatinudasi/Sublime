const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"please enter first name"]
    },
    last_name:{
        type:String,
        required:[true,"please enter last name"]
    },
    city:{
        type:String,
        required:[true,"please enter city"]
    },
    company:{
        type:String,
        required:[true,"please enter company"]
    }
});

module.exports = mongoose.model("customer",customerSchema);