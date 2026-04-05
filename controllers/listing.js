import {Listing} from "../models/listing.js";
// import { Booking } from "../models/booking.js";

export const index = async (req, res) => {
    let { location, price, category } = req.query;

    let filter = {};

    // Location filter
    if (location) {
        filter.location = { $regex: location, $options: "i" };
    }

    // Price filter
    if (price) {
        filter.price = { $lte: Number(price) };
    }

    // Category filter
    if (category) {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", { allListings, request: req });
};

//new 
export const renderNewForm =(req, res) => {
    res.render("listings/new.ejs");
}

//show individual listings
import { Booking } from "../models/booking.js";

export const showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  let alreadyBooked = false;

  if (req.user) {
    const booking = await Booking.findOne({
      listing: id,
      user: req.user._id
    });

    if (booking) alreadyBooked = true;
  }

  res.render("listings/show.ejs", { listing, alreadyBooked });
};

//create listing
export const createListing =async (req, res) => {    
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect('/listings');
}    

//edit listings
export const editListings =async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
         return res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

//update listings
export const updateListing = async (req, res) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, 'Invalid Listing Data');
    // }
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image ={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated!");

    res.redirect(`/listings/${id}`);
}

//delete listings
export const deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect('/listings');
}