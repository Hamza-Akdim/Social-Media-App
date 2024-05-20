    const mongoose = require("mongoose");
    const Joi = require("joi");
    const { User } = require("./user.js");


    // Create Post Schema
    const PostSchema = new mongoose.Schema({
        userId : {
            type : mongoose.Schema.Types.ObjectID,
            ref : User,  // model reference
            required : true,
        },
        description : {
            type : String,
            default : ""
        },
        postPicture: {
            data: {
                type : Buffer, // Binary data of the image
            },
            contentType: {
                type : String,
                default : "" ,
            } // MIME type of the image (e.g., image/jpeg, image/png)
        },
        likes: {
            type: Map,
            of: Boolean,
            default : {}
        },
    },
    {
        timestamps : true,
    })

    // Create Post Model
    const Post =  mongoose.model("Post",PostSchema);

    // Validation Add Post
    function addPostValidation(obj){
        const schema = Joi.object({
            userId : Joi.required(),
            description : Joi.string(),
            postPicture : Joi.object({
                data: Joi.binary(),
                contentType: Joi.string().default(""),
            }).optional().default(),
            likes: Joi.object().pattern(Joi.string(), Joi.boolean()).default({})
        });
        return schema.validate(obj);
    }

    // Validation Update Post
    function updatePostValidation(obj){
        const schema = Joi.object({
            description : Joi.string(),
            postPicture : Joi.object({
                data: Joi.binary(),
                contentType: Joi.string().default(""),
            }).optional().default(),
        });
        return schema.validate(obj);
    }

    module.exports = {
        addPostValidation,
        updatePostValidation,
        Post
    }