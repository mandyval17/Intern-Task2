const {createUser, allocateDevice, createDevice, allUsers, allDevices}=require("../controllers/admin")
const express=require("express")
const authToken=require("../auth/jwt")
const app=express()
const router = require("express").Router();


router.get("/createuser",createUser)
router.get("/createdevice",createDevice)
router.get("/allocatedevice/:id1/:id2",allocateDevice)
router.get("/allusers",allUsers)
router.get("/alldevices",allDevices)

module.exports=router

