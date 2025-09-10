import { Router } from "express";
const router= Router();
import wrapAsync from '../utils/wrapAsync.js';
import {
    index,
    renderNewForm,
    showListing,
    createListing,
    editListings,
    updateListing,
    deleteListing,
} from "../controllers/listing.js";
import {isLoggedIn,isOwner,validateListing} from '../middleware.js'

import multer from "multer";
import { storage, cloudinary } from "../cloudConfig.js";
const upload=multer({storage});


router
.route('/')
.get(wrapAsync(index))//index route
.post(
    isLoggedIn, 
    upload.single('image'), 
    validateListing,
    wrapAsync(createListing)
);//create route


  
  
//New route
router.get('/new', isLoggedIn, renderNewForm);


router
.route('/:id')
.get(wrapAsync(showListing))//show route
.put(
    isLoggedIn,
    isOwner("update"),
    upload.single('image'), 
    validateListing, 
    wrapAsync(updateListing)
)//update route
.delete(
    isLoggedIn, 
    isOwner("delete"),
    wrapAsync(deleteListing)
);//delete route

//Edit route
router.get(
    '/:id/edit',
    isLoggedIn,
    isOwner("edit"), 
    wrapAsync(editListings)
);


export default router;