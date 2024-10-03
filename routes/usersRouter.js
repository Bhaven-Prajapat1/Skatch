const express = require("express");
const router = express.Router();
const {
      registerUser,
      loginUser,
      logout,
   } = require('../controllers/authController');

router.get("/", function (req, res) {
  res.send('Working....')
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logout );

module.exports = router;






















// error lists
// 1)Error: Cannot find module 'ejs'
// npm i ejs 

//2)
/*
ReferenceError: C:\Users\bhave\OneDrive\Desktop\Backend Projects\Scatch\views\index.ejs:3
    1| <%- include('./partials/header') %>
    2| 
 >> 3|     <% if(error.length>0){ %>
    4|         <div class="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-red-500">
    5|             <span class="inline-block mt-1 mb-1 text-white">
    6|                 <%= error %>error is not defined
    .// changed the file name to main
 */
