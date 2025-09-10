import { Listing } from "./models/listing.js";
import { Review } from "./models/review.js";
import ExpressError from './utils/ExpressError.js';
import listingSchema from './joiSchema/joiListingSchema.js';
import reviewSchema from './joiSchema/joiReviewSchema.js'

//to convert schemaValidation into middleware
export const validateListing = async (req, res, next) => {
    try {
        await listingSchema.validateAsync(req.body);
        next();
    } catch (err) {
        next(new ExpressError(400, `${err.name}: ${err.details[0].message}`));
    }
     
};

//to convert reviewSchema into middlewares
export const validateReview = async (req, res, next) => {
    try {
        await reviewSchema.validateAsync(req.body);
        next();
    } catch (err) {
        next(new ExpressError(400, `${err.name}: ${err.details[0].message}`));
        
    }
};

export const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in!");
        return res.redirect('/login');
    }
    next();
}

export const savedRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// export const isOwner = (action = "edit")=>{
// async(req,res,next)=>{
//     const { id } = req.params;
//     let listing = await Listing.findById(id);
//     if(!listing.owner._id.equals(res.locals.currUser._id)){
//         req.flash(`error","You don't have permission to ${action}!`)
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// }
// }

// middleware.js
export const isOwner = (action = "edit") => {
    return async (req, res, next) => {
        const { id } = req.params;
        let listing = await Listing.findById(id);

        if (!listing.owner._id.equals(res.locals.currUser._id)) {
            req.flash("error", `You don't have permission to ${action}!`);
            return res.redirect(`/listings/${id}`);
        }
        next();
    };
};


export const isReviewAuthor = async (req, res, next) => {
        const {id, reviewId } = req.params;
        let review = await Review.findById(reviewId);

        if (!review.author._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to delete");
            return res.redirect(`/listings/${id}`);
        }
        next();
    };



