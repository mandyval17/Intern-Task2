const mongoose = require("mongoose");

const userreateSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Device:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Devices"
            },
        ]
    
});

const User = mongoose.model("createuser", userreateSchema);
module.exports = User;
