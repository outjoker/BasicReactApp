var express = require('express')
var app = express();
var _ = require('lodash')
var cors = require('cors')
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();
var entityService = require('../mongodb/entities/entityService')
const logger = require('tracer').colorConsole();
const createError = require('http-errors');
var responsedata = [
    {
      id: "1",
      name: "pencil",
      price: 5,
      description: "made up of lead."
    },
    {
      id: "2",
      name: "eraser",
      price: 3,
      description: "can be used to erase what is written by pencil"
    },
    {
      id: "3",
      name: "pen",
      price: 10,
      description: "works on ink. you have to refill"
    }
  ]



router.get('/sampleapi', (req, res)=> {
  console.info("sample api")
  res.json(responsedata)
})

router.post('/signup', async (req,res)=> {
  console.log("printing the request body "+JSON.stringify(req.body));
  try{
  let requestbody =req.body;
  let resp = await entityService.createEvent(requestbody)
  if (_.isEqual(resp, "ok")) {
    console.warn("document already exists in the db")
    throw createError(409, 'Email Id already registered. Try logging in');
  } else {
    res.status(200).json({"message":"Signup succesful"})
  }
} catch (error) {
  logger.error(JSON.stringify(error));
  const message = error.message ? error.message : 'Error Ocurred at Server';
  const code = error.statusCode ? error.statusCode : 500;
  return res.status(code).json({ message }).status(code);
}
})

router.get("/:id/getUserInfo", async (req, res)=>{
  console.log("path params ", req.params.id)
  console.log("getting details from db")
  let userdetail = await entityService.findDbRecordByEmail(req.params.id)
  if(!_.isEmpty(userdetail)){
    console.info("user details "+JSON.stringify(userdetail))
    res.json(userdetail[0])
  }
})


router.get("/signin", async(request, response)=>{
  try {
    const { email } = request.query;
    const resp = await await entityService.findDbRecordByEmail(email);
    if (_.isEmpty(resp)) {
      throw createError(401, 'Invalid Credentials');
    }
    // const token = jwt.sign(resp[0], secret, {
    //   expiresIn: 1008000
    // });
    //resp[0]['token'] = "JWT " + token;
    return response.json(resp[0]).status(200);
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while fetching credentials';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }

})

router.post("/validate", async (req,res)=>{
  let authenticate = (passwordentered, doc) => {
    let isValidUser = false;
    if (passwordentered === doc.data.password) {
      console.log("user validation sucessful");
      req.session.user =doc 
      isValidUser = true;
    }
    return isValidUser;
  }
  console.info("inside the validate API")
  let reqbody = req.body;
  let email = reqbody.email;
  let password = reqbody.password;
  let userinfo = await entityService.findDbRecordByEmail(email);
  if(!_.isEmpty(userinfo) && userinfo.length>0) {
    let obtainedDocument = userinfo[0];
    console.info(JSON.stringify(obtainedDocument))
    if(authenticate(password, obtainedDocument)) {
      res.cookie('cookie', "validuser", { maxAge: 900000, httpOnly: false, path: '/' })
      req.session.user = obtainedDocument;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      console.log(req.session)
      res.end('success')
    } else {
      console.error("invalid password entered.")
      res.status(401).json({"message":"Invalid Password"})
    }
  } else {
    console.warn("document not present in the db.")
    res.status(404).json({"error":"Invalid Username.Signup if not an existing User."})
  }
})

module.exports = router;