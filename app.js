import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import ExpressError from './utils/ExpressError.js';
import listingRoutes from './routes/listing.js'  
import reviewRoutes from './routes/review.js' 
import session from 'express-session';
import flash from 'connect-flash'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from './models/user.js';
import userRoutes from './routes/user.js';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import methodOverride from 'method-override';
import { error } from "console";

app.use(methodOverride('_method'));


const MONGO_URI = process.env.MONGO_ATLAS_URI;

main().then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Atlas connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const sessionOption ={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 *60 *60 *1000,
        maxAge:  7 * 24 *60 *60 *1000,
        httpOnly:true,
    },
};


// Basic route
// app.get('/', (req, res) => {
//   res.send('Hello ,I am your server!');
// });

app.use(session(sessionOption));
app.use(flash());

//passport authenticating middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//showing flash messages
app.use((req,res,next)=>{
    res.locals.success  = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//user
// app.get('/demoUser', async(req, res)=>{
//     let fakeUser =new User({
//         email:"student123@gmail.com",
//         username:"delta-student"
//     });
//     let registeredUser =await User.register(fakeUser,"helloworld");
//     console.log(registeredUser);
// });


//router
app.use('/listings',listingRoutes);
app.use('/listings/:id/reviews',reviewRoutes);
app.use('/',userRoutes);

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});

//Error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;
    res.status(status).render('error.ejs', { message });
    // res.status(status).send(message);
    // console.log(err.stack);
}); 


const PORT=process.env.PORT || 8080;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});