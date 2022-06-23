const jwt = require("jsonwebtoken")
const AuthorModel = require("../models/authorModel")

const auth= async function (req,res,next){
    try{const token =req.headers["x-api-key"]
    if(!token) res.status(400).send({status: false, msg: "token must be present"})
    
    // verifying if the header is valid or not
    let decodedToken = jwt.verify(token, "functionup-radon")

    if(!decodedToken) res.status(400).send({status:false, msg:"Invalid Token"})
    // next();
    }catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}

module.exports.auth=auth