const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname) // we changed ":" To "-" because windows doesn't allow it in names
    }
})

const upload =  multer({storage : storage})


module.exports = upload ;

