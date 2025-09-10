import { Router } from "express";
const router= Router({mergeParams:true});
import { isLoggedIn, validateReview ,isReviewAuthor} from "../middleware.js";
import wrapAsync from '../utils/wrapAsync.js';
import {
    createReview,
    deleteReview
} from '../controllers/review.js';





//Reviews
//post route
router.post("/",isLoggedIn, validateReview, wrapAsync(createReview)
);

//delete route for reviews
router.delete('/:reviewId',isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));

export default router;