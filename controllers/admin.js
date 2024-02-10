const User=require("../schema/createUserSchema")
const Device=require("../schema/deviceSchema")

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
const createUser=async(req,res)=>{
    const data=await User.create({Name:makeid(10),Password:makeid(7)})
    res.json([data])
}
const createDevice=async(req,res)=>{
    const data=await Device.create({State:{light:0,fan:0,mis:0}})
    res.json([data])
}
const allocateDevice=async(req,res)=>{
    const deviceId=req.params.id1
    const userId=req.params.id2
    const deviceData=await Device.findById({_id:deviceId})
    if(deviceData.userId==null){
        try {
            const data=await User.findByIdAndUpdate(
                {_id:userId},
                {
                    $push: {
                        Device: deviceId,
                    },
                },
                {new:true})
            await Device.findByIdAndUpdate({_id:deviceId},{userId:userId},{new:true})
            console.log(data)
            res.json(data)
        } catch (error) {
            console.log(error)
        }
        // console.log("new")
    }else{
        return res.json("Device already allocated")
    }
}

const allUsers=async(req,res)=>{
    const users=await User.find()
    res.json(users)
}
const allDevices=async(req,res)=>{
    const users=await Device.find()
    res.json(users)
}



module.exports={createUser,createDevice,allocateDevice,allUsers,allDevices}