const User=require("../schema/createUserSchema")
const Device=require("../schema/deviceSchema")
const { findByIdAndUpdate } = require("../schema/roomSchema")
const Room=require("../schema/roomSchema")
JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk"
const jwt = require("jsonwebtoken");
const userAllDevices=async(req,res)=>{
    const id=req.user.id
    const data=await User.findById({_id:id})
    let datafinal=[]
    if(data==null){
        return res.status(404).json({msg:"No data Found"})
    }
    for(const element of data.Device){
        datafinal.push(await Device.findById({_id:element}))
    }
    res.json(datafinal)
}
const createRoom=async(req,res)=>{
    console.log(req.body)
    const data=await Room.create({Name:req.body.Name,userId:req.user.id});
    res.json([data])
}

const assignDevice=async(req,res)=>{
    const roomId=req.params.id1
    const deviceId=req.params.id2
    console.log(roomId,deviceId)
    if(Room.deviceId==null){
        console.log(req.params)
        const data=await Room.findByIdAndUpdate({_id:roomId},{deviceId:deviceId},{new:true})
        await Device.findByIdAndUpdate({_id:deviceId},{roomId:roomId})
        res.json(data)
    }else{
        res.send("Already assigned")
    }
}

const updateState=async(req,res)=>{
    const deviceId=req.params.id
    const task=req.body
    console.log(task)
    const data=await Device.findByIdAndUpdate({_id:deviceId},{State:task},{new:true})
    res.send(data)
}

const logIn=async(req,res)=>{
    const {Name,Password}=req.body;
    console.log(req.body)
    const data=await User.findOne({Name:Name,Password:Password})
    console.log(data)
    if(data==null){
        res.json("Invalid username/passowrd").status(404)
    }else{
        const token = jwt.sign(
            {
                id:data._id,
                name:Name
            },
            JWT_SECRET
        );
        res.json({Token:token,data})
    }
}
const allRooms=async(req,res)=>{    
    const data=await Room.find({userId:req.user.id})
    res.json(data)
}


module.exports={userAllDevices,createRoom,assignDevice,updateState,logIn,allRooms}