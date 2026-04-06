# Wanderlust 🌍

Wanderlust is a full-stack web application that allows users to discover, list, and book unique accommodations around the world. Inspired by platforms like Airbnb, it provides a seamless experience for both travelers looking for a place to stay and hosts wanting to list their properties.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using Passport.js.
- **Listing Management**: 
  - Create, view, update, and delete travel listings.
  - Upload images for listings via Cloudinary.
  - Categorize listings (e.g., Mountains, Beaches, Farms, etc.).
- **Review System**: Users can leave ratings and comments on listings.
- **Booking System**: Real-time booking functionality for travelers.
- **Responsive Design**: A beautiful, user-friendly interface that works on all devices.
- **Interactive UI**: Flash messages for feedback on user actions.

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- [EJS](https://ejs.co/) (Embedded JavaScript templates)
- [Bootstrap](https://getbootstrap.com/) (Styling)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Passport.js](https://www.passportjs.org/) (Authentication)

**Database:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Database)
- [Mongoose](https://mongoosejs.com/) (ODM)

**Storage:**
- [Cloudinary](https://cloudinary.com/) (Image hosting)

## 📁 Project Structure

```text
apna_project/
├── controllers/    # Route handlers logic
├── models/         # Mongoose schemas
├── public/         # Static assets (CSS, JS, Images)
├── routes/         # Express router files
├── utils/          # Utility functions and custom error classes
├── views/          # EJS templates
├── joiSchema.js    # Data validation schemas
├── index.js        # Main entry point
└── .env            # Environment variables
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mdIrfan4019/wanderlust.git
   cd apna_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_ATLAS_URI=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   SECRET=your_session_secret
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```
   The application will be available at [Wonderlust](https://wanderlust-ruby-six.vercel.app).

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---
Made with ❤️ by [Md Irfan](https://github.com/mdIrfan4019)
