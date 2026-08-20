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