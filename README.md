# Contact | Loganathan M

A modern, single-page serverless web application acting as a personal contact hub. Designed for my portfolio, this platform provides a seamless experience for visitors to either chat with my AI assistant or book a meeting directly.

## ✨ Features

* **"Ask Loga's AI" Chatbot**: A custom Gemini 1.5-powered assistant that answers questions about my skills, projects, and availability. Features typing indicators, rate limiting, and smart fallbacks.
* **Custom Booking Scheduler**: A step-by-step calendar interface that allows visitors to book 15-min or 30-min meetings. Generates `.ics` files and Google Calendar links, handles timezone conversions, and checks Firestore to prevent double booking.
* **Glassmorphism UI**: Built with vanilla HTML/CSS featuring a sleek, responsive dark/light mode UI with smooth micro-animations.
* **Quick Contact Cards**: Easily copy contact details to the clipboard or download a `.vcf` vCard to save my contact info natively to your phone.

## 🛠️ Tech Stack

* **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+), Marked.js
* **Backend Framework**: Vercel Serverless Functions (`/api/*`)
* **Database**: Firebase Firestore (for saving bookings and fallback messages securely)
* **AI Integration**: Google Gemini API (`@google/generative-ai`)
* **Email Service**: Nodemailer

## 🚀 Setup and Deployment

This project requires Vercel Serverless Functions to securely run the AI API and database queries. It cannot be run on a standard static file server like GitHub Pages.

For complete, step-by-step instructions on setting up Firebase, Vercel Environment Variables, and deploying this site, please refer to the [DEPLOYMENT.md](DEPLOYMENT.md) guide.

## 💻 Local Development

To test the Serverless API functions locally, you will need the Vercel CLI.

1. Install Vercel CLI: `npm i -g vercel`
2. Create a `.env` file and add your `GEMINI_API_KEY`.
3. Run `vercel dev` in your terminal.
4. Vercel will authenticate your account and spin up a local server at `http://localhost:3000`.

---
*Made with ❤️ by [Loganathan M](https://github.com/LOGANATHAN2008).*
