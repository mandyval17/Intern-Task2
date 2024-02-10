const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    State:{
        light:{
            type:Number
        },
        fan:{
            type:Number
        },
        mis:{
            type:Number
        }
        // required:true
    },    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room"
    }
});

const Device = mongoose.model("deviceschema", deviceSchema);
module.exports = Device;
