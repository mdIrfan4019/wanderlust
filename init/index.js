import mongoose from "mongoose";
import { initData } from './data.js';
import { Listing } from "../models/listing.js";


const MONGO_URI = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

const initDB= async () => {
    await Listing.deleteMany({});
    const updatedData = initData.data.map((obj)=>({...obj,owner:"68ac32456be5f771493bc2c7"}));
    await Listing.insertMany(updatedData);
    console.log('Database initialized with sample data');
}
initDB();