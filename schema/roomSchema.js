const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    deviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Device"
    },
    Name:{
        type:String,
        // required:true
    }
});

const Room = mongoose.model("roomschema", roomSchema);
module.exports = Room;
