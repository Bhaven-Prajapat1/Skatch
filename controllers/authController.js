const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');


module.exports.registerUser =  async function (req, res) {
  try {
    let{email, password, fullname} = req.body;
    
    //check if already user exist
    let user = await userModel.findOne({email:email});

    if(user) 
      return res.status(401).send("You already have an account, please login.")
    
    // this code hash users password
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(password, salt, async function(err, hash){
        if(err) return res.send(err.message);
        else {
          let user = await userModel.create({
            // if we r not using joe we'll not provide any data from this account will created automatically
            email,
            password:hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created successfully");
        }
      })
    })
  } catch (error) {
    console.log(error.message);
  }
  };

  module.exports.loginUser = async function (req, res) {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Password is incorrect");

    bcrypt.compare(password, user.password, function(err, result){
      if(result){
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect('/shop')
      } else{
        res.send("Email or Password is incorrect")
      }
    })
  }

  module.exports.logout = function(req, res){
  res.clearCookie("token");
  res.redirect('/');
  };