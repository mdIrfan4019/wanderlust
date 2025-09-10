import { User } from "../models/user.js";


export const renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

export const signUp =  async(req,res)=>{
    try {
    let {username,email,password} =req.body;
    const newUser = new User({email,username,});
    const registeredUser = await User.register(newUser,password);
    // console.log(registeredUser);
    //login after signup
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect('/listings');
    });
    
    } catch (error) {
        req.flash("error",error.message);
        res.redirect('/signup');
    }
}

//login 
export const renderLoginForm =(req,res)=>{
    res.render('./users/login.ejs');
}

export const successFullLogin = async(req,res) => {
       req.flash("success","Welcome Back to Wanderlust");
       let redirectUrl =res.locals.redirectUrl || "/listings" ;
       res.redirect(redirectUrl);
}

export const Logout =(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect('/listings');
    });
}