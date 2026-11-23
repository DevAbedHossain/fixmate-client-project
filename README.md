# FixMate – Smart Device & Home Appliance Repair Platform

FixMate is a full-stack repair service booking platform that connects customers with skilled technicians for reliable device and home-appliance repairs. Customers can explore repair services, book technicians, track service progress, and make secure payments after the repair is completed.

🌐 **Live Website:** https://fixmate-client-project.vercel.app/

---

## 📌 Project Overview

FixMate simplifies the process of finding trusted repair professionals. Whether someone needs a smartphone repaired, an AC serviced, or electrical work completed, FixMate provides a convenient platform to connect with technicians.

The platform supports three types of users:

- **Customer:** Browse services, request repairs, track bookings, and pay after completion.
- **Technician:** Create repair service listings, manage requests, update repair statuses, and set final service amounts.
- **Admin:** Approve service listings, manage users and roles, monitor bookings, and track payment revenue.

## ✨ Key Features

### 👤 Customer Features
- Browse all available repair services.
- Explore services by category.
- View detailed service information and technician profiles.
- Request repair services with preferred dates and addresses.
- Track booking and repair progress.
- Cancel eligible bookings.
- Make secure payments after service completion.

### 🔧 Technician Features
- Create and manage repair service listings.
- Upload service images.
- Set service prices and estimated durations.
- Choose between Home Visit and Shop Drop-off services.
- Manage incoming service requests.
- Accept or reject repair requests.
- Update job progress.
- Submit the final repair amount.

### 🛡️ Admin Features
- Manage customers and technicians.
- Assign and manage user roles.
- Review and approve technician service listings.
- Manage platform services and bookings.
- Monitor payment transactions and revenue.

### 🚀 General Features
- Secure authentication and role-based authorization.
- Responsive design for desktop, tablet, and mobile.
- Dynamic service listings.
- Service category filtering.
- Image uploads using ImgBB.
- Stripe payment integration.
- MongoDB database integration.
- Interactive dashboards for different user roles.

## 🔄 How FixMate Works

1. **Find a Service:** Customers browse available admin-approved repair services.
2. **Send a Request:** Customers submit their repair requirements, address, and preferred date.
3. **Technician Accepts:** A technician reviews and accepts the request.
4. **Repair in Progress:** The technician performs the required repair and updates its status.
5. **Complete the Job:** The technician marks the repair as completed and provides the final amount.
6. **Make Payment:** Customers complete their payment securely after the service is finished.

## 🧰 Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT Authentication

### Payment & Image Upload
- Stripe – Secure payment processing
- ImgBB – Service image hosting

### Deployment
- Vercel – Frontend deployment
- Backend deployment – Configured separately


## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- npm
- MongoDB account or local MongoDB server
- Stripe account
- ImgBB API key

### 1. Clone the Frontend Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd fixmate-client-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Add any additional authentication and Stripe public configuration variables required by your application.

### 4. Start the Frontend Development Server

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

### 5. Backend Setup

Clone your backend repository and navigate to its directory.

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
BETTER_AUTH_MONGO_DB_URL=your_mongodb_connection_string
```

Configure the remaining authentication, JWT, and Stripe secret variables according to your backend configuration.

Start the backend server:

```bash
npm run dev
```

## 🗃️ Database

FixMate uses MongoDB to store application data.

Main data entities include:

- Users
- Services
- Bookings
- Payments

Service listings contain information such as:

- Service title and description
- Service category
- Service image
- Base price
- Estimated duration
- Service area
- Technician information
- Approval status
- Availability

## 📋 Service Categories

FixMate supports the following repair categories:

- Smartphone
- Laptop & PC
- AC
- Refrigerator
- TV
- Washing Machine
- Electrical

**Available Service Modes:**
- Home Visit
- Shop Drop-off

## 🔐 Authentication & Authorization

FixMate uses Better Auth and JWT-based authentication to manage secure user access.

The platform provides role-based access control for:

- Customers
- Technicians
- Administrators

Each user receives access to the dashboard and operations associated with their assigned role.

## 💳 Payment System

FixMate integrates Stripe to provide secure online payments.

The payment workflow is designed around the platform's pay-after-completion model:

1. Customer submits a repair request.
2. Technician completes the repair.
3. Technician provides the final amount.
4. Customer proceeds with payment.
5. Payment information is recorded in the system.

## 🎯 Project Goals

- Simplify the repair service booking experience.
- Connect customers with skilled repair technicians.
- Provide transparent service pricing.
- Improve repair request management.
- Ensure secure authentication and payments.
- Create a reliable and scalable repair service marketplace.

## 🔮 Future Improvements

- Real-time notifications for booking updates.
- Live chat between customers and technicians.
- Advanced technician ratings and reviews.
- Improved location-based technician discovery.
- Booking calendar and availability management.
- Detailed analytics and reporting dashboards.

## 👨‍💻 Developer

**Abed Hossain**

Full-Stack Web Developer

- GitHub: https://github.com/DevAbedHossain
- Live URL: https://fixmate-client-project.vercel.app/

## 📄 License

This project is developed for educational and portfolio purposes.

---

<p align="center">
  **FixMate – Repair Made Simple.**
  <br />
  Find trusted technicians. Get reliable repairs. Pay after completion.
</p>