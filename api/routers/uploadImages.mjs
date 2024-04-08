import express from "express";
import multer  from "multer";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname) // we changed ":" To "-" because windows doesn't allow it in names
    }
})

const upload =  multer({storage : storage})


export default upload ;