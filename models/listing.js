import pkg from 'joi';
const { ref } = pkg;

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {Review} from './review.js'


const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
image: { 
  url:String,
  filename:String,
},
  price: {
    type: Number,
    required: true
  },
  country: String,
  location: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
 if(listing){
    await Review.deleteMany({_id :{$in : listing.reviews}});

 }  
});

// module.exports = mongoose.model('Listing', listingSchema);
export const Listing = mongoose.model('Listing', listingSchema);