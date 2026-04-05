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

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // ❌ Invalid date check
  if (end <= start) {
    req.flash("error", "Invalid date selection!");
    return res.redirect(`/listings/${listingId}`);
  }

  // 🔥 CHECK OVERLAP
  const overlappingBooking = await Booking.findOne({
    listing: listingId,
    $or: [
      {
        checkIn: { $lt: end },
        checkOut: { $gt: start }
      }
    ]
  });

  if (overlappingBooking) {
    req.flash("error", "Selected dates are already booked!");
    return res.redirect(`/listings/${listingId}`);
  }

  // ✅ Calculate days
  const days = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = days * listing.price;

  const newBooking = new Booking({
    listing: listingId,
    user: req.user._id,
    checkIn: start,
    checkOut: end,
    totalPrice,
  });

  await newBooking.save();

  req.flash("success", "Booking confirmed!");
  res.redirect(`/listings/${listingId}`);
});

router.get("/my", isLoggedIn, isUser, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("bookings/index.ejs", { bookings });
});

router.delete("/:id", isLoggedIn, isUser, async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);

  //  check
  if (!booking || !booking.user.equals(req.user._id)) {
    req.flash("error", "Unauthorized action!");
    return res.redirect("/bookings/my");
  }

  await Booking.findByIdAndDelete(id);

  req.flash("success", "Booking cancelled!");
  res.redirect("/bookings/my");
});

export default router;