import { messagesCollection, addDoc } from './firebase-config.js';

const CONTACT_INFO = {
    name: "Loganathan M",
    title: "AI & Web Developer | BCA Student, DSU Bengaluru",
    email: "contact@loganathanm.in",
    phone: "+91 7010123479",
    whatsappLink: "https://wa.me/917010123479",
    instagram: "@loganathanm.in",
    instagramLink: "https://ig.me/m/loganathanm.in",
    linkedinLink: "https://www.linkedin.com/in/loganathanm-in/",
    githubLink: "https://github.com/LOGANATHAN2008",
    portfolioLink: "https://loganathanm.in",
    city: "Bengaluru, Karnataka",
    faqs: [
        {
            q: "Are you open to freelance projects?",
            a: "Yes, I take freelance web and AI projects. Use the Book a Call section or message me on WhatsApp with your idea."
        },
        {
            q: "Are you available for an internship?",
            a: "Yes, I'm open to internships. Reach me on LinkedIn, email or WhatsApp with the role details."
        },
        {
            q: "What tech stack do you use?",
            a: "HTML, CSS, JavaScript, Python, React, PHP, MySQL, Firebase, Cloudinary and the Gemini API, with Git/GitHub and Figma for design."
        },
        {
            q: "How quickly do you reply?",
            a: "Usually within 24 hours."
        }
    ]
};

const CONFIG = {
    workingHoursIST: { start: 10, end: 20 },
    daysOff: [0], // 0 = Sunday
    calendlyUrl: "", 
};

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // THEME TOGGLE
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    function updateThemeIcon() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }
    updateThemeIcon();
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    // ---------------------------------------------------------
    // COPY TO CLIPBOARD
    // ---------------------------------------------------------
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    handleCopySuccess(btn);
                });
            } else {
                // Fallback
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                document.body.prepend(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    handleCopySuccess(btn);
                } catch (error) {
                    showToast('Failed to copy', 'error');
                } finally {
                    textArea.remove();
                }
            }
        });
    });

    function handleCopySuccess(btn) {
        const icon = btn.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fa-solid fa-check';
        icon.style.color = 'var(--success)';
        showToast('Copied!', 'success');
        setTimeout(() => {
            icon.className = originalClass;
            icon.style.color = '';
        }, 2000);
    }

    // ---------------------------------------------------------
    // SAVE CONTACT (vCard)
    // ---------------------------------------------------------
    document.getElementById('save-vcf').addEventListener('click', () => {
        const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_INFO.name}
TITLE:${CONTACT_INFO.title}
TEL;TYPE=CELL:${CONTACT_INFO.phone}
EMAIL;TYPE=WORK:${CONTACT_INFO.email}
URL:${CONTACT_INFO.portfolioLink}
ADR;TYPE=WORK:;;;${CONTACT_INFO.city};;;India
END:VCARD`;

        const blob = new Blob([vcfData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Loganathan_M.vcf";
        a.click();
        URL.revokeObjectURL(url);
    });

    // ---------------------------------------------------------
    // LOCATION LIVE TIME (IST)
    // ---------------------------------------------------------
    function updateISTTime() {
        const timeEl = document.getElementById('ist-clock');
        if(!timeEl) return;
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
        timeEl.textContent = `IST Time: ${formatter.format(new Date())}`;
    }
    updateISTTime();
    setInterval(updateISTTime, 60000);

    // ---------------------------------------------------------
    // FAQ ACCORDION
    // ---------------------------------------------------------
    const faqContainer = document.getElementById('faq-container');
    CONTACT_INFO.faqs.forEach((faq, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <button class="faq-btn" aria-expanded="false" aria-controls="faq-content-${index}">
                <span>${faq.q}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            <div class="faq-content" id="faq-content-${index}">
                <div class="faq-content-inner">${faq.a}</div>
            </div>
        `;
        faqContainer.appendChild(item);
    });

    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            // Close all others
            document.querySelectorAll('.faq-btn').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.style.maxHeight = null;
            });
            
            // Toggle current
            if (!isExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                const content = btn.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ---------------------------------------------------------
    // MOBILE TABS
    // ---------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.panel-section');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-tab'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-section`).classList.add('active-tab');
        });
    });

    // ---------------------------------------------------------
    // FEATURE 1: CHATBOT
    // ---------------------------------------------------------
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatHint = document.getElementById('chat-hint');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-chat');
    
    let chatHistory = [];
    let messageCount = 0;
    const MAX_MESSAGES = 15;
    let lastMessageTime = 0;

    function addMessageToUI(text, isUser = false) {
        if(chatHint) chatHint.style.display = 'none'; // Hide hint once chat starts

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        let contentHTML = isUser ? text : (window.marked ? marked.parse(text) : text);
        
        const avatarHTML = isUser 
            ? `<div class="avatar"><i class="fa-solid fa-user"></i></div>` 
            : `<div class="avatar"><img src="/assets/loga.jpg" alt="Loga AI" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>'"></div>`;

        msgDiv.innerHTML = `
            ${avatarHTML}
            <div class="bubble">${contentHTML}</div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'message ai-message typing-id';
        div.innerHTML = `
            <div class="avatar"><img src="/assets/loga.jpg" alt="Loga AI" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>'"></div>
            <div class="bubble typing-indicator"><span></span><span></span><span></span></div>
        `;
        chatMessages.appendChild(div);
        chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
        return div;
    }

    async function handleChatSubmit(e, overrideText = null) {
        if (e) e.preventDefault();
        const text = overrideText || chatInput.value.trim();
        if (!text) return;
        
        if (text.length > 500) {
            showToast('Message too long (max 500 characters).', 'error');
            return;
        }

        const now = Date.now();
        if (now - lastMessageTime < 2000) {
            showToast('Please wait a moment before sending another message.', 'error');
            return;
        }

        if (messageCount >= MAX_MESSAGES) {
            showToast('Session limit reached. Please use the form or refresh.', 'error');
            return;
        }

        chatInput.value = '';
        lastMessageTime = now;
        messageCount++;
        
        addMessageToUI(text, true);
        chatHistory.push({ role: 'user', content: text });
        
        const typingEl = showTypingIndicator();
        sendBtn.disabled = true;

        try {
            const context = chatHistory.slice(-10);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: context })
            });

            if (!response.ok) throw new Error('API Error');
            
            const data = await response.json();
            typingEl.remove();
            
            let aiText = data.message || "Sorry, I couldn't process that.";
            
            if (aiText.includes('[OPEN_FORM]')) {
                aiText = aiText.replace('[OPEN_FORM]', '').trim();
                if(!aiText) aiText = "Please fill out this form to contact Loga directly.";
                document.getElementById('fallback-form-container').classList.remove('hidden');
            }
            if (aiText.includes('[OPEN_BOOKING]')) {
                aiText = aiText.replace('[OPEN_BOOKING]', '').trim();
                const bookTabBtn = document.querySelector('.tab-btn[data-tab="book"]');
                if (bookTabBtn && getComputedStyle(bookTabBtn).display !== 'none') {
                    bookTabBtn.click();
                } else {
                    document.getElementById('book-section').scrollIntoView({ behavior: 'smooth' });
                }
            }

            addMessageToUI(aiText, false);
            chatHistory.push({ role: 'assistant', content: aiText });

        } catch (error) {
            console.error("Chat Error:", error);
            typingEl.remove();
            addMessageToUI("API overloaded. <button onclick=\"document.getElementById('fallback-form-container').classList.remove('hidden')\" class='btn btn-primary' style='padding:0.3rem 0.6rem; font-size:0.8rem; margin-top:0.5rem;'>Send a message instead</button>", false);
        } finally {
            sendBtn.disabled = false;
        }
    }

    chatForm.addEventListener('submit', handleChatSubmit);

    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => handleChatSubmit(null, chip.textContent));
    });

    clearBtn.addEventListener('click', () => {
        chatHistory = [];
        messageCount = 0;
        chatMessages.innerHTML = `
            <div class="chat-hint" id="chat-hint">
                <i class="fa-regular fa-lightbulb"></i> You can ask me about: Projects, Skills, Availability, Hiring
            </div>
            <div class="message ai-message">
                <div class="avatar"><img src="/assets/loga.jpg" alt="Loga AI" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>'"></div>
                <div class="bubble"><p>Chat cleared. How can I help you today?</p></div>
            </div>`;
    });

    // Fallback Form Logic
    let lastFallbackTime = 0;
    
    document.getElementById('close-fallback').addEventListener('click', () => {
        document.getElementById('fallback-form-container').classList.add('hidden');
    });

    const contactForm = document.getElementById('direct-contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('fb-submit');
        const text = btn.querySelector('.btn-text');
        const spinner = btn.querySelector('.spinner');
        
        btn.disabled = true;
        text.classList.add('hidden');
        spinner.classList.remove('hidden');

        const data = new FormData(e.target);

        try {
            const response = await fetch(e.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast('Message sent to Loga!', 'success');
                document.getElementById('fallback-form-container').classList.add('hidden');
                contactForm.reset();
            } else {
                const resData = await response.json();
                if (Object.hasOwn(resData, 'errors')) {
                    throw new Error(resData.errors.map(error => error.message).join(", "));
                } else {
                    throw new Error('Oops! There was a problem submitting your form');
                }
            }
        } catch (error) {
            showToast(error.message || 'Failed to send message.', 'error');
        } finally {
            btn.disabled = false;
            text.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    });

    // ---------------------------------------------------------
    // FEATURE 2: SCHEDULER
    // ---------------------------------------------------------
    
    if (CONFIG.calendlyUrl) {
        document.getElementById('custom-scheduler').classList.add('hidden');
        const calDiv = document.getElementById('calendly-embed');
        calDiv.classList.remove('hidden');
        calDiv.innerHTML = `<iframe src="${CONFIG.calendlyUrl}" width="100%" height="100%" frameborder="0"></iframe>`;
        return; 
    }

    let bookingState = {
        type: '',
        duration: 30,
        date: null,
        slotStart: null,
        bookedSlots: []
    };

    function updateProgressIndicator(stepId) {
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active');
            if (step.getAttribute('data-target') === stepId) {
                step.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', () => {
            // Only allow navigating back
            const targetId = step.getAttribute('data-target');
            const currentActive = document.querySelector('.scheduler-step.active').id;
            
            const targetNum = parseInt(targetId.split('-')[1]);
            const currentNum = parseInt(currentActive.split('-')[1]);
            
            // Prevent clicking forward without completing steps, or clicking step 5
            if (targetNum < currentNum && targetNum < 5) {
                navigateToStep(targetId);
            }
        });
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            navigateToStep(target);
        });
    });

    function navigateToStep(stepId) {
        document.querySelectorAll('.scheduler-step').forEach(s => s.classList.remove('active'));
        document.getElementById(stepId).classList.add('active');
        if (stepId !== 'step-5') updateProgressIndicator(stepId);
    }

    // Step 1: Type
    document.querySelectorAll('.call-type-card').forEach(card => {
        card.addEventListener('click', () => {
            bookingState.type = card.getAttribute('data-type');
            bookingState.duration = parseInt(card.getAttribute('data-duration'));
            document.getElementById('summary-type').textContent = bookingState.type;
            renderCalendar();
            navigateToStep('step-2');
        });
    });

    // Step 2: Calendar
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
    });

    function renderCalendar() {
        document.getElementById('current-month-year').textContent = `${months[currentMonth]} ${currentYear}`;
        const grid = document.getElementById('calendar-dates');
        grid.innerHTML = '';
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const twoWeeksFromNow = new Date(today);
        twoWeeksFromNow.setDate(today.getDate() + 14);

        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const cellDate = new Date(currentYear, currentMonth, i);
            const btn = document.createElement('button');
            btn.className = 'date-btn';
            btn.textContent = i;
            
            if (cellDate < today || cellDate > twoWeeksFromNow || CONFIG.daysOff.includes(cellDate.getDay())) {
                btn.disabled = true;
            } else {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    bookingState.date = cellDate;
                    document.getElementById('selected-date-display').textContent = cellDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                    fetchSlotsAndRender();
                    navigateToStep('step-3');
                });
            }
            grid.appendChild(btn);
        }
    }

    // Step 3: Time Slots
    function populateTimezones() {
        const select = document.getElementById('timezone-select');
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const zones = [
            "Asia/Kolkata", "America/New_York", "America/Los_Angeles", "Europe/London", 
            "Europe/Berlin", "Asia/Tokyo", "Australia/Sydney"
        ];
        if (!zones.includes(userTz)) zones.unshift(userTz);

        zones.forEach(tz => {
            const opt = document.createElement('option');
            opt.value = tz;
            opt.textContent = tz;
            if (tz === userTz) opt.selected = true;
            select.appendChild(opt);
        });
        select.addEventListener('change', renderSlots);
    }
    populateTimezones();

    async function fetchSlotsAndRender() {
        const container = document.getElementById('time-slots-container');
        container.innerHTML = '<div class="loading-slots"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading availability...</div>';
        
        try {
            const response = await fetch('/api/book?action=slots');
            if (response.ok) {
                const data = await response.json();
                bookingState.bookedSlots = data.slots || [];
            }
        } catch (error) {
            console.error("Failed to fetch slots", error);
        }
        renderSlots();
    }

    function renderSlots() {
        const container = document.getElementById('time-slots-container');
        container.innerHTML = '';
        
        const tz = document.getElementById('timezone-select').value;
        const slots = [];
        let [istStartH] = [CONFIG.workingHoursIST.start];
        let [istEndH] = [CONFIG.workingHoursIST.end];
        
        const year = bookingState.date.getFullYear();
        const month = bookingState.date.getMonth();
        const date = bookingState.date.getDate();
        
        let currentSlotUTC = Date.UTC(year, month, date, istStartH - 5, (istStartH % 1 === 0 ? 0 : 30) - 30); 
        const endSlotUTC = Date.UTC(year, month, date, istEndH - 5, -30);

        const now = Date.now();

        while (currentSlotUTC < endSlotUTC) {
            const displayTime = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric', minute: '2-digit', timeZone: tz
            }).format(new Date(currentSlotUTC));
            
            const btn = document.createElement('button');
            btn.className = 'slot-btn';
            btn.textContent = displayTime;
            
            if (currentSlotUTC <= now || bookingState.bookedSlots.includes(currentSlotUTC)) {
                btn.disabled = true;
            } else {
                const slotTime = currentSlotUTC;
                
                btn.addEventListener('click', () => {
                    bookingState.slotStart = slotTime;
                    const dtFormat = new Intl.DateTimeFormat('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: '2-digit', timeZone: tz
                    }).format(new Date(slotTime));
                    
                    document.getElementById('summary-datetime').textContent = `${dtFormat} (${tz})`;
                    navigateToStep('step-4');
                });
            }
            container.appendChild(btn);
            currentSlotUTC += 1800000;
        }

        if (container.children.length === 0) {
            container.innerHTML = '<div class="loading-slots">No slots available on this day.</div>';
        }
    }

    // Step 4: Submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('book-submit');
        const text = btn.querySelector('.btn-text');
        const spinner = btn.querySelector('.spinner');
        
        btn.disabled = true;
        text.classList.add('hidden');
        spinner.classList.remove('hidden');

        const data = new FormData(e.target);
        
        const topic = data.get('topic');
        const platform = data.get('platform');
        
        // Append extra booking context to the form data for the email
        data.append("Meeting Type", bookingState.type);
        data.append("Duration (mins)", bookingState.duration);
        const dateStr = new Date(bookingState.slotStart).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        data.append("Requested Time (IST)", dateStr);

        try {
            const res = await fetch(e.target.action, {
                method: bookingForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!res.ok) {
                const resData = await res.json();
                if (Object.hasOwn(resData, 'errors')) {
                    throw new Error(resData.errors.map(error => error.message).join(", "));
                } else {
                    throw new Error('Failed to book via Formspree');
                }
            }
            
            // Generate a fake booking ID for UI satisfaction
            const bookingId = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            
            document.getElementById('conf-id').textContent = bookingId;
            document.getElementById('conf-type').textContent = bookingState.type;
            
            const tz = document.getElementById('timezone-select').value;
            document.getElementById('conf-time-local').textContent = new Intl.DateTimeFormat('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: tz
            }).format(new Date(bookingState.slotStart)) + ` (${tz})`;
            
            document.getElementById('conf-time-ist').textContent = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata'
            }).format(new Date(bookingState.slotStart)) + ` (IST)`;
            
            document.getElementById('conf-platform').textContent = platform;
            
            const startStr = new Date(bookingState.slotStart).toISOString().replace(/-|:|\.\d\d\d/g,"");
            const endStr = new Date(bookingState.slotStart + (bookingState.duration*60000)).toISOString().replace(/-|:|\.\d\d\d/g,"");
            const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Meeting with Loganathan M')}&dates=${startStr}/${endStr}&details=${encodeURIComponent('Topic: ' + topic)}&location=${encodeURIComponent(platform)}`;
            document.getElementById('add-gcal').href = gcalUrl;
            
            document.getElementById('download-ics').onclick = () => {
                const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${startStr}\nDTEND:${endStr}\nSUMMARY:Meeting with Loganathan M\nDESCRIPTION:${topic}\nLOCATION:${platform}\nEND:VEVENT\nEND:VCALENDAR`;
                const blob = new Blob([icsData], { type: 'text/calendar' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "booking.ics";
                a.click();
            };
            
            navigateToStep('step-5');
            // Hide progress on final step
            document.querySelector('.booking-progress').style.display = 'none';
            document.getElementById('booking-form').reset();
            
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            btn.disabled = false;
            text.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    });
    
    document.getElementById('book-another').addEventListener('click', () => {
        document.querySelector('.booking-progress').style.display = 'flex';
        navigateToStep('step-1');
    });

    // ---------------------------------------------------------
    // IMAGE MODAL
    // ---------------------------------------------------------
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const footerLogoImg = document.getElementById('footer-logo-img');
    const closeModal = document.getElementById('close-modal');

    if (footerLogoImg && imageModal && modalImg && closeModal) {
        footerLogoImg.addEventListener('click', () => {
            modalImg.src = footerLogoImg.src;
            imageModal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            imageModal.classList.add('hidden');
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.add('hidden');
            }
        });
    }

    // ---------------------------------------------------------
    // UTILS
    // ---------------------------------------------------------
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);
    }
});
