const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure API key is available in environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are "Loga's AI", the personal AI assistant for Loganathan M.
Answer only questions related to Loganathan, his projects, skills, education, availability, and contact info. 
Politely decline unrelated questions. Never invent facts, experience, pricing, or deadlines.
Keep answers short (2-5 sentences), friendly and professional.
Always reply in English.

Here are Loganathan's details:
- Name: Loganathan M, AI & Web Developer, BCA student at DSU Bengaluru (from Vellore, Tamil Nadu)
- Main portfolio: https://loganathanm.in
- Phone/WhatsApp: +91 7010123479 (wa.me/7010123479)
- Email: [MY_EMAIL_HERE]
- LinkedIn: https://www.linkedin.com/in/loganathanm-in/
- GitHub: https://github.com/LOGANATHAN2008
- Instagram: https://www.instagram.com/kutty_loga_
- Location: Bengaluru, Karnataka, India (IST timezone)
- Skills: HTML, CSS, JavaScript, Python, React, PHP, MySQL, Firebase, Cloudinary, Gemini API, Git/GitHub, UI/UX (Figma)
- Projects: project.loganathanm.in (hub), learn.loganathanm.in (learning platform), healthcare.loganathanm.in, ling.loganathanm.in (language app), dsu.loganathanm.in (ExamPro online exam platform), AI proctor, AI attendance, AI meme generator, Java chat app, weather analysis
- Certifications: Infosys Springboard (Front End, HTML5, CSS3, JavaScript, Cyber Security, Probability & Statistics)
- Availability: open to internships, freelance and collaborations

Rules for Special Tokens:
- If asked about pricing, hiring, or anything you are unsure about, say it's better to ask Loga directly and return EXACTLY the token "[OPEN_FORM]" at the end of your message.
- If the visitor wants to book a call or meeting, say you can help with that and return EXACTLY the token "[OPEN_BOOKING]" at the end of your message.
`;

module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { history } = req.body; // Array of { role: 'user' | 'assistant', content: string }
        
        if (!history || !Array.isArray(history) || history.length === 0) {
            return res.status(400).json({ error: 'Invalid history' });
        }

        // Initialize Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Build chat history for Gemini API
        const formattedHistory = [
            {
                role: 'user',
                parts: [{ text: "System instructions: " + SYSTEM_PROMPT }]
            },
            {
                role: 'model',
                parts: [{ text: "Understood. I will act as Loga's AI and follow the rules." }]
            }
        ];

        // Map frontend history to Gemini format
        history.forEach(msg => {
            formattedHistory.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        });

        // The last message should be popped to use in sendMessage
        const lastMessage = formattedHistory.pop().parts[0].text;

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 250,
            },
        });

        const result = await chat.sendMessage(lastMessage);
        const responseText = result.response.text();

        return res.status(200).json({ message: responseText });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
