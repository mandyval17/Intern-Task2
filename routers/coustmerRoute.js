const { userAllDevices, createRoom,assignDevice, updateState, logIn, allRooms } = require("../controllers/coustmer");
const router = require("express").Router();
const authToken=require("../auth/jwt")
router.get("/useralldevices",authToken,userAllDevices)
router.post("/login",logIn)
router.post("/createroom",authToken,createRoom)
router.get("/assignroom/:id1/:id2",authToken,assignDevice)
router.post("/updateState/:id",authToken,updateState)
router.get("/allrooms",authToken,allRooms)

module.exports=router