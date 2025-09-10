import { Router } from "express";
const router= Router();
import { User } from "../models/user.js";
import wrapAsync from '../utils/wrapAsync.js';
import passport from "passport";
import { savedRedirectUrl } from "../middleware.js";
import { 
    signUp,
    renderLoginForm,
    renderSignupForm,
    Logout,
    successFullLogin
} from "../controllers/user.js";

//signup 
router
 .route('/signup')
    .get(renderSignupForm)
    .post(wrapAsync(signUp));



//login
router
.route('/login')
  .get(renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),
    wrapAsync(successFullLogin)
);


//logout
router.get('/logout',Logout);

export default router;