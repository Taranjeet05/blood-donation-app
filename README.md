# Blood Donation App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### User Registration
- **Create**: Users can easily sign up and create profiles by entering their personal details (name, contact number, blood type, etc.).
- **Read**: Users can view their profiles and donation history.
- **Update**: Users can modify their profile information as needed.
- **Delete**: Users can delete their accounts if they no longer wish to use the app.

### Donor Search
- **Search**: Users can find patients in need of blood by filtering based on blood type, location, and urgency.
- **View Details**: Patient requests are displayed as cards, showing essential information (name, blood type, hospital, urgency).

### Donation Tracking
- **Track**: Users can view their recent donations, including dates and types of blood donated.
- **Eligibility Check**: The app calculates and displays eligibility for the next donation based on blood donation intervals.
- **Timer**: Users receive reminders about their next eligible donation date.

### Notifications for Blood Requests
- **Alerts**: Users receive real-time notifications via SMS and email when there are urgent blood requests in their area or reminders for upcoming donation events.

### QR Code Generation
- **Generate**: Users can create a QR code containing their medical information, making it easy for hospitals to access vital details during emergencies.

### Profile Management
- **Manage**: Users can view, update, and manage their profiles, including medical reports and donation history.

### Gamification
- **Rewards**: Users earn badges and rewards based on the number of successful donations, encouraging continued participation in blood donation.

### Request Blood for Yourself, Family Members, Friends, or Others in Need
- **Blood Requests**: Users can easily submit blood requests not only for themselves but also for family members, friends, or anyone in urgent need of blood. This feature streamlines the process of finding suitable donors and ensures timely help during emergencies.

## User Stories

### User Registration
- As a user, I want to sign up so that I can create a personalized profile and track my donations.
- As a user, I want to view my profile to see my donation history and eligibility.

### Donor Search
- As a user, I want to search for patients needing blood so that I can help those in urgent need.
- As a user, I want to view patient details on cards to understand their needs quickly.

### Donation Tracking
- As a user, I want to track my donations so that I can monitor my contributions over time.
- As a user, I want to receive reminders about my next eligible donation date to ensure I donate regularly.

### Notifications for Blood Requests
- As a user, I want to receive alerts when blood is needed nearby, so I can act quickly to help.

### QR Code Generation
- As a user, I want to generate a QR code with my medical information for easy access during emergencies.

### Gamification
- As a user, I want to earn rewards for my donations, motivating me to contribute more often.

### Request Blood for Yourself, Family Members, Friends, or Others in Need
- As a user, I want to request blood for myself, my family members, friends, or anyone in need, making the process simple and efficient to get timely support.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- **Frontend**: Next.js for a responsive and interactive user interface.
- **Backend**: Node.js with Express for server-side functionality.
- **Database**: MongoDB for storing user profiles, donation records, and patient requests.
- **Authentication**: JWT (JSON Web Tokens) for secure user sessions.
- **Notifications**: Twilio for SMS alerts and Nodemailer for email notifications.
- **Google Maps API**: For displaying patient locations on the map.
- **QR Code Library**: For generating QR codes containing medical information.
