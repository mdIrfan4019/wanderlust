import express from "express";
const router = express.Router();

import { Booking } from "../models/booking.js";
import { Listing } from "../models/listing.js";
import { isLoggedIn, isUser } from "../middleware.js";

// CREATE BOOKING
router.post("/", isLoggedIn,isUser, async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
    // 🔥 CHECK: already booked or not
  const existingBooking = await Booking.findOne({
    listing: listingId,
    user: req.user._id
  });

  if (existingBooking) {
    req.flash("error", "You have already booked this listing!");
    return res.redirect(`/listings/${listingId}`);
  }

  const listing = await Listing.findById(listingId);

  // 🧠 Calculate days
  const days = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  if (days <= 0) {
    req.flash("error", "Invalid dates selected!");
    return res.redirect(`/listings/${listingId}`);
  }

  const totalPrice = days * listing.price;

  const newBooking = new Booking({
    listing: listingId,
    user: req.user._id,
    checkIn,
    checkOut,
    totalPrice,
  });

  await newBooking.save();

  req.flash("success", `Booking confirmed for ${days} days!`);
  res.redirect(`/listings/${listingId}`);
});

export default router;