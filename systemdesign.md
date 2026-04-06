# Wanderlust - System Design 🏗️

Wanderlust follows a structured architectural pattern to ensure scalability, maintainability, and a clear separation of concerns. This document outlines the core components and data structures that power the application.

## 🏛️ High-Level Architecture

The project is built on the **MVC (Model-View-Controller)** design pattern:

- **Model**: Mongoose schemas that define the data structure and interact with MongoDB.
- **View**: EJS templates that render the user interface dynamically based on data from the controller.
- **Controller**: Business logic that processes requests, interacts with the model, and returns views or data.
- **Routing**: Express Router handles endpoint management and delegates requests to the appropriate controllers.

---

## 📊 Data Models

The application utilizes four primary data models to manage information:

### 1. User Model
- **Username**: Unique identifier for login.
- **Email**: Unique email for communication.
- **Role**: Defines user permissions (`user` or `lister`). Default is `user`.
- **Passport-Local-Mongoose**: Handles password hashing, salt, and authentication.

### 2. Listing Model
- **Title**: Name of the property.
- **Description**: Detailed info about the listing.
- **Image**: An object containing the image URL and filename (stored in Cloudinary).
- **Price**: Nightly rate.
- **Location**: City or area.
- **Country**: Country where the property is located.
- **Reviews**: Array of ObjectIds referencing the Review model.
- **Owner**: ObjectId referencing the User model.

### 3. Review Model
- **Comment**: User's textual feedback.
- **Rating**: Numeric rating (1-5 stars).
- **CreatedAt**: Timestamp of the review.
- **Author**: ObjectId referencing the User model.

### 4. Booking Model (Planned/Implemented)
- **Listing**: Reference to the booked property.
- **User**: Reference to the traveler who booked.
- **Check-in/Check-out**: Dates for the stay.

---

## 🔒 Security & Role-Based Access Control (RBAC)

- **Authentication**: Passport.js middleware ensures only authenticated users can access protected routes.
- **Role-Based Access**:
  - `isLister`: Restricts certain actions (like creating or editing listings) to users with the `lister` role.
  - `isUser`: Restricts specific actions (like booking or reviewing) to users with the `user` role.
- **Authorization (Ownership)**: 
  - `isOwner`: Checks if the current user is the owner of a listing before allowing modifications.
  - `isReviewAuthor`: Checks if the user is the author of a review before allowing deletion.
- **Data Validation**: [Joi](https://joi.dev/) is used for schema-based validation of incoming request bodies.
- **Flash Messages**: `connect-flash` provides real-time feedback for permission errors and status updates.

---

## ☁️ Image Upload Workflow

1. User selects an image in the "New Listing" or "Edit Listing" form.
2. `multer` (with `multer-storage-cloudinary`) intercepts the file upload.
3. The image is uploaded directly to **Cloudinary**.
4. Cloudinary returns a secure URL and filename.
5. The URL and filename are saved in the MongoDB document for that listing.

---

## 🚀 Key Middleware

- `isLoggedIn`: Checks if a user is authenticated.
- `isOwner`: Checks if the user has permission to modify a listing.
- `isReviewAuthor`: Checks if the user has permission to delete a review.
- `validateListing` / `validateReview`: Uses Joi schemas to validate form data.

---

## 📈 Future Enhancements

- **Real-time Notifications**: Notify owners when someone books their listing.
- **Payment Gateway**: Integrate Stripe or Razorpay for secure payments.
- **Map Integration**: Use Mapbox or Google Maps to show listing locations.
- **Advanced Filtering**: Filter listings by amenities, price range, and availability.

---
© 2026 Wanderlust Team
