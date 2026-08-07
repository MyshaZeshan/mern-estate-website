import User from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//Location / Title: It lives in autgController.js, so it’s a Controller function.
//Role / Job: It handles the incoming request for that specific route, so it’s the Route Handler.
export const signup = async (req,res,next)=>{

    const {username,email,password} = req.body;
    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser  = new User({username,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({success: true , msg: 'user created successfully'});

    }
    catch(error){
        next(error);   
    }
    
}

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials!'));
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
        const {password: pass, ...rest}= validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async(req,res,next)=>{
    try{
        const validUser = await User.findOne({email:req.body.email})
        if(validUser){
            const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = validUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username:req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:hashPassword,
                photo:req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({id : newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = newUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

        }
    }catch(error){
        next(error);
    }
}