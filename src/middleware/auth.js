const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandling/errorHandling");
const userModel = require('../models/userModel')
//<-------------------------------------< Authentication >------------------------------------->//
const authentication = async function (req, res, next) {
  try {
    let bearerHeader = req.headers.authorization;
    let userId =req.params.userId
    const checkId = await userModel.findOne({ _id :userId })
    if(checkId == null)
    {
      return res.status(400).send({ status : false , msg : "there is no user with this userid"})
    }
    if (typeof bearerHeader == "undefined")
      return res
        .status(400)
        .send({
          status: false,
          message: "Token is missing, please enter a token",
        });

    let bearerToken = bearerHeader.split(" ");

    let token = bearerToken[1];

    jwt.verify(token, "project-5-Products_Management");
    next();
  } catch (err) {
    return errorHandler(err, res);
  }
};

const authorization = async function ( req, res, next) {
  try{
    let userId= req.params.userId    
    if (userId  == req.decode.userId ) return next();
    else return res.status(403).send({ status: false, msg: "you are not authorised" });
    
  }catch(error){
    return res.status(500).send({msg: error.message})
  }
}
//<------------------------------< Exports : router >----------------------------------------->//
module.exports={authentication,authorization}
