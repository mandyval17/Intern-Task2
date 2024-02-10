const jwt = require("jsonwebtoken");
JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk"

const authToken = async (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers['x-auth-token'];
    console.log(token)
    if (!token) {
        return res.status(401).json({
        errors: [
            {
                msg: "Token not found",
            },
        ],
        });
    } 
    try {
        console.log("je")
        try {
            
        } catch (error) {
            console.log(error.message)
        }
        const user = jwt.verify(token,JWT_SECRET);
        console.log("herer")
        req.user=user   
        next();
    }catch (error) {
        return res.status(403).json({
        errors: [
            {
                msg: "Invalid token",
            },
        ],
        });
    }
};

module.exports = authToken;