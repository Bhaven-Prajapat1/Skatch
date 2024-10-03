const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next){
if(!req.cookies.token){
  req.flash("error", "You need to login first");
  return res.redirect('/');
}

try {
  let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  const user = await userModel
  .findOne({email: decoded.email})// collecting the data of user based on the email
  .select("-password"); // by  this password field will not be selected

  req.user = user;
  next();
} catch (err) {
  req.flash("error", 'something went wrong.');
  res.redirect('/');
}
};