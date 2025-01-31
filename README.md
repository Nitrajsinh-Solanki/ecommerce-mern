
# Adaa Jaipur E-commerce Platform

<div align="left" style="display: flex; flex-direction: column; gap: 40px; align-items: flex-start;">
  
  <!-- Deployed Site Link -->
  <a href="https://ecommerce-mern-stack-cagniskvz-amars-projects-fbd95eb7.vercel.app" 
     style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
    <img src="https://img.icons8.com/?size=100&id=9PoVNxKE41f4&format=png&color=000000" 
         alt="Shop Logo" width="50">
   
  </a>

  <!-- Video Link -->
  <a href="https://youtu.be/zoa6rps8TLo" 
     style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
    <img src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" 
         alt="YouTube Logo" width="50">
   
  </a>

</div>

  


## Overview

Adaa Jaipur is a modern, full-stack e-commerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack.  This project delivers a seamless and enjoyable online shopping experience, featuring a sleek user interface, robust security with authentication, and powerful backend services.  From browsing product listings to managing orders and processing payments, Adaa Jaipur provides a comprehensive e-commerce solution.

---

## 🚀 Live Website

[Adaa Jaipur E-commerce Platform](https://ecommerce-mern-stack-cagniskvz-amars-projects-fbd95eb7.vercel.app)

## 🎥 Video Walkthrough

[Watch on YouTube](https://youtu.be/zoa6rps8TLo)

---

## 🛠️ Setup Instructions

### 🧰 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Version 14.x or higher
- **MongoDB:** Version 4.x or higher
- **npm:** Version 6.x or higher
- **Git:**  For version control

### ⚙️ Backend Setup

#### 1. Clone the repository:

```bash
git clone https://github.com/Nitrajsinh-Solanki/ecommerce-mern
cd MERN_Stack_Project_Adaa_Jaipur_Ecommerce/server
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Configure environment variables:

Create a `.env` file in the `server` directory and populate it with your credentials:

```env
PORT=8000
DATABASE=mongodb://localhost:27017/Ecommerce
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
EMAIL_USER=your_email
EMAIL_PASS=your_16_digit_email_app_password
```

#### 4. Start the server:

```bash
npm run start:dev
```

### 💻 Frontend Setup

#### 1. Navigate to the client directory:

```bash
cd ../client
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Run the client application:

```bash
npm start
```

---

## ✨ Key Features

* **🔒 User Authentication:** Secure login and registration with email verification.
* **📦 Product Management:**  Admins can easily add, edit, and delete product listings.
* **📝 Order Management:** Admins have full control over order viewing and management, including status updates.
* **💳 Payment Processing:** Integrated Braintree payment gateway for secure and seamless transactions.
* **❤️ Wishlist:** Users can save their favorite items to a personalized wishlist.
* **📱 Responsive Design:**  A fully responsive frontend ensures a consistent experience across all devices.

---

## 💻 Tech Stack

### Frontend

* **React.js:**  For building the user interface.
* **Redux:**  For efficient state management.
* **Axios:**  For making API calls to the backend.
* **TailwindCSS:**  For styling the application.

### Backend

* **Node.js:**  The runtime environment.
* **Express.js:**  The web framework.
* **MongoDB:**  The database for storing data.
* **Mongoose:**  For MongoDB object modeling.
* **Bcrypt:**  For secure password hashing.
* **JWT:**  For authentication and authorization.
* **Multer:**  For handling file uploads.

### Deployment

* **Render:**  For backend deployment.
* **Vercel:**  For frontend deployment.

---

## Troubleshooting

### ⚠️ Backend Sleeping Issue (Render Free Tier)

On Render's free tier, the backend server may go to sleep after inactivity, causing delays.  Here are some solutions:

* **Keep-Alive Service:** Use a service like UptimeRobot to regularly ping your server and prevent it from sleeping.
* **Image Optimization:** Optimize images for faster loading. Consider tools like ImageMagick or cloud-based solutions like Cloudinary.
* **Preload Images:** Use the `<link rel="preload" href="/path/to/image.jpg" as="image">` tag in your HTML to preload critical images.

### 💡 General Troubleshooting Tips

* **Verify Environment Variables:** Double-check that all environment variables are correctly set in the `.env` file.
* **Clear Browser Cache:** Clearing your browser cache can sometimes resolve resource loading issues.
* **Examine Logs:** Use `npm run start:dev` to run the server in development mode and check the console for errors.
* **Check Database Connection:** Ensure MongoDB is running and the connection string is accurate.

---

