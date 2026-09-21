# Deployment & Setup Instructions (Chatbot & Scheduler)

This project uses Vercel Serverless Functions to handle AI Chat (`/api/chat`) and Booking logic (`/api/book`). 

## 1. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project**, name it (e.g., "portfolio-contact").
3. Go to **Build > Firestore Database** and click **Create database**. Start in **production mode**.
4. Go to the **Rules** tab in Firestore and replace the rules with the contents of the `firestore.rules` file in this directory:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{messageId} { allow create: if true; allow read, update, delete: if false; }
       match /bookings/{bookingId} { allow read, write: if false; }
     }
   }
   ```
   *(Note: The bookings are read and written strictly by the Vercel backend using the Admin SDK, so public access is false).*

5. **Frontend Config**: Go to Project Overview > **Project settings**. Add a web app, copy the `firebaseConfig` object, and paste it into `firebase-config.js`.
6. **Backend Admin Credentials**: In Project settings, go to **Service accounts**. Click **Generate new private key**. This downloads a JSON file.
   - You must encode this JSON file to base64. 
   - You can do this in your terminal or use an online tool (e.g., [Base64 Encode](https://www.base64encode.org/)).
   - Save this long base64 string. You will need it for Vercel.

## 2. Update Placeholders

Open `index.html` and replace all instances of `[MY_EMAIL_HERE]` with your actual email address.
Open `api/chat.js` and verify the `SYSTEM_PROMPT` contains your accurate details.

## 3. Vercel Deployment & Environment Variables

1. Initialize a Git repository in this folder, commit your code, and push it to a new GitHub repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Click **Add New > Project** and import your GitHub repository.
4. **CRITICAL STEP**: Before clicking Deploy, expand the **Environment Variables** section and add the following keys:
   
   - `GEMINI_API_KEY`: Your API key from Google AI Studio.
   - `FIREBASE_SERVICE_ACCOUNT`: The base64 string of your Firebase Service Account JSON (from Step 1.6).
   - `EMAIL_USER`: Your email address for sending notifications (e.g., `youremail@gmail.com`).
   - `EMAIL_PASS`: Your email app password (If using Gmail, go to Google Account Security > 2-Step Verification > App Passwords).

5. Click **Deploy**.

## 4. Custom Subdomain (contact.loganathanm.in)

1. In your Vercel project dashboard, go to **Settings > Domains**.
2. Add `contact.loganathanm.in` as a domain.
3. Vercel will give you a CNAME record (usually `cname.vercel-dns.com`).
4. Go to your domain registrar's DNS Management settings.
5. Add a new **CNAME** record:
   - **Host/Name**: `contact`
   - **Value/Target**: `cname.vercel-dns.com`
6. Save the record and wait for propagation. Vercel will issue an SSL cert automatically.
