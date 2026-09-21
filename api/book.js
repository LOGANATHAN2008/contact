const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin securely using env vars
// Note: You must convert your service account JSON into a base64 string
// and set it as FIREBASE_SERVICE_ACCOUNT in Vercel.
// Example: Buffer.from(JSON.stringify(require('./service-account.json'))).toString('base64')
if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii'));
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
    } catch (e) {
        console.error("Firebase Admin Init Error:", e);
    }
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = async function (req, res) {
    // 1. Handle GET request to fetch booked slots
    if (req.method === 'GET') {
        const { action } = req.query;
        if (action === 'slots') {
            if (!db) return res.status(500).json({ error: 'Database not initialized.' });
            try {
                // Get all bookings from now onwards to reduce payload
                const now = Date.now();
                const snapshot = await db.collection('bookings')
                    .where('slotStart', '>=', now)
                    .get();
                
                const slots = [];
                snapshot.forEach(doc => {
                    slots.push(doc.data().slotStart);
                });
                return res.status(200).json({ slots });
            } catch (error) {
                console.error("Error fetching slots:", error);
                return res.status(500).json({ error: 'Failed to fetch slots' });
            }
        }
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Handle POST request to create a booking
    if (req.method === 'POST') {
        if (!db) return res.status(500).json({ error: 'Database not initialized.' });
        
        try {
            const { name, email, phone, platform, topic, type, duration, slotStart } = req.body;
            
            if (!name || !email || !slotStart) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Check if slot is already booked (double booking prevention)
            const snapshot = await db.collection('bookings')
                .where('slotStart', '==', slotStart)
                .get();

            if (!snapshot.empty) {
                return res.status(409).json({ error: 'Slot is already booked. Please choose another time.' });
            }

            // Generate Booking ID
            const bookingId = 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase();

            // Save to Firestore
            await db.collection('bookings').doc(bookingId).set({
                bookingId,
                name,
                email,
                phone: phone || '',
                platform,
                topic,
                type,
                duration,
                slotStart,
                status: 'pending',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Send Emails via Nodemailer
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail', // Change if using another service
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const dateStr = new Date(slotStart).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                // Email to You
                await transporter.sendMail({
                    from: `"Portfolio Scheduler" <${process.env.EMAIL_USER}>`,
                    to: process.env.EMAIL_USER, // your own email
                    subject: `New Booking: ${type} with ${name}`,
                    html: `
                        <h3>New Booking Request</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Time (IST):</strong> ${dateStr}</p>
                        <p><strong>Platform:</strong> ${platform}</p>
                        <p><strong>Topic:</strong> ${topic}</p>
                        <p><strong>Ref ID:</strong> ${bookingId}</p>
                    `
                });

                // Email to Visitor
                await transporter.sendMail({
                    from: `"Loganathan M" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: `Booking Confirmed: ${type}`,
                    html: `
                        <h3>Hi ${name},</h3>
                        <p>Your request for a <strong>${type}</strong> has been received successfully!</p>
                        <p><strong>Time (IST):</strong> ${dateStr}</p>
                        <p><strong>Platform:</strong> ${platform}</p>
                        <p>I will confirm shortly with the meeting link.</p>
                        <br>
                        <p>Best,<br>Loganathan M</p>
                    `
                });
            }

            return res.status(200).json({ success: true, id: bookingId });

        } catch (error) {
            console.error("Booking Error:", error);
            return res.status(500).json({ error: 'Failed to process booking' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
};
