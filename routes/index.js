const express = require("express");
const router = express.Router();
const isloggedIn = require('../middlewares/isLoggedIn');
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
let error = req.flash("error");
res.render('front', {error, loggedin: false});
});

router.get("/shop", isloggedIn, async function(req, res){
   let products = await productModel.find();
   res.render('shop', { products });
});

router.get("/logout", isloggedIn, function(req, res){
   res.redirect('/')
});


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
