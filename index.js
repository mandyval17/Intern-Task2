const express=require("express")
const app=express();
const adminRouters=require("./routers/adminRoute")
const coustmerRouters=require("./routers/coustmerRoute")
const dbconnect=require("./mongo")
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(adminRouters)
app.use(coustmerRouters)


const port=3001
const url = "mongodb://localhost:27017/intern2";
const start = async () => {
    try {
      await dbconnect(url);
      app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
    }
};

start();