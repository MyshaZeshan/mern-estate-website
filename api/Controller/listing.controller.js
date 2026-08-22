import Listing from "../Models/Listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req,res,next) =>{
    try{
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    }catch(error){
        next(error);
    }
}

export const deletelisting= async(req,res,next) =>{
    try {
        const listing = await Listing.findById(req.params.id);
        
        if(!listing){
            next(errorHandler(401,'listing not found'));
        }
        if(req.user.id !== listing.userRef){
        next(errorHandler(401,'not authenticated'));
        }
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json('listing deleted successfully')
        } catch (error) {
            next(error);
    }
}

export const updatelisting = async(req,res,next)=>{
    const listing =  await Listing.findById(req.params.id);
     if(!listing){
            next(errorHandler(401,'listing not found'));
    }
    if(req.user.id !== listing.userRef){
    next(errorHandler(401,'you can only update your own listng'));
    }
    try {
        const updatelisting = await Listing.findByIdAndUpdate(req.params.id,req.body,
            {new:true}
        );
         return res.status(200).json(updatelisting)

    } catch (error) {
        next(error)
    }

}

export const getListing = async(req,res,next) =>{
    try {
        const listing =  await Listing.findById(req.params.id);
        if(!listing){
                next(errorHandler(401,'listing not found'));
        }
         return res.status(200).json(listing)
    } catch (error) {
        next(error);
    }
}

export const getListingforSearch = async (req,res,next) =>{
    try {
        const limit = parseInt(req.query.list) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if(offer === 'undefined' || offer==='false'){
            offer = {$in:[false,true]} //$in means find all values inside the list
        }
        let furnished = req.query.furnished;
        if(furnished === 'undefined' || furnished==='false'){
            furnished = {$in:[false,true]} //$in means find all values inside the list
        }
        let parking = req.query.parking;
        if(parking === 'undefined' || parking==='false'){
            parking = {$in:[false,true]} //$in means find all values inside the list
        }
        let type = req.query.type;
        if(type === 'undefined' || type==='all'){
            type = {$in:['sale','rent']} //$in means find all values inside the list
        }
        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name : {$regex: searchTerm, $options:'i'}, //regex can find any word letter and option means uppercase or lowercase
            offer,
            furnished,
            parking,
            type,
        }).sort({[sort]:order}).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}