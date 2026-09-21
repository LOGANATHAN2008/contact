import React, { useState } from 'react';

function Scheduler({ isActive }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNextStep = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <section id="book-section" className={`panel-section glass-card ${isActive ? 'active-tab' : ''}`}>
      <div className="section-header">
        <h2><i className="fa-regular fa-calendar-check" style={{ color: 'var(--success)' }}></i> Book a Call</h2>
      </div>
      
      <div id="custom-scheduler">
        {/* Progress Indicator */}
        <div className="booking-progress">
          <div className={`progress-step ${step === 1 ? 'active' : ''}`}>1 Type</div>
          <div className={`progress-step ${step === 2 ? 'active' : ''}`}>2 Date</div>
          <div className={`progress-step ${step === 3 ? 'active' : ''}`}>3 Time</div>
          <div className={`progress-step ${step === 4 ? 'active' : ''}`}>4 Details</div>
        </div>

        {/* Step 1: Call Type */}
        {step === 1 && (
          <div className="scheduler-step active" id="step-1">
            <h3>1. Choose Call Type</h3>
            <div className="call-types">
              <button className="call-type-card" onClick={() => handleNextStep(2)}>
                <h4>15-min Intro Call</h4>
                <p>Quick chat to meet and greet.</p>
              </button>
              <button className="call-type-card" onClick={() => handleNextStep(2)}>
                <h4>30-min Project</h4>
                <p>Discuss your freelance project needs.</p>
              </button>
              <button className="call-type-card" onClick={() => handleNextStep(2)}>
                <h4>30-min Interview/Mentoring</h4>
                <p>Technical chats or interview rounds.</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date Picker */}
        {step === 2 && (
          <div className="scheduler-step active" id="step-2">
            <div className="step-header">
              <button className="back-btn" onClick={() => handleNextStep(1)}><i className="fa-solid fa-arrow-left"></i></button>
              <h3>2. Pick a Date</h3>
            </div>
            <div className="calendar-container">
              <div className="calendar-header">
                <button className="icon-btn"><i className="fa-solid fa-chevron-left"></i></button>
                <h4>September 2026</h4>
                <button className="icon-btn"><i className="fa-solid fa-chevron-right"></i></button>
              </div>
              <div className="calendar-days-grid">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="calendar-dates-grid">
                <div className="calendar-date available" onClick={() => handleNextStep(3)}>21</div>
                <div className="calendar-date available" onClick={() => handleNextStep(3)}>22</div>
                <div className="calendar-date available" onClick={() => handleNextStep(3)}>23</div>
                <div className="calendar-date available" onClick={() => handleNextStep(3)}>24</div>
                {/* Mock dates */}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Time Slot Picker */}
        {step === 3 && (
          <div className="scheduler-step active" id="step-3">
            <div className="step-header">
              <button className="back-btn" onClick={() => handleNextStep(2)}><i className="fa-solid fa-arrow-left"></i></button>
              <h3>3. Pick a Time</h3>
            </div>
            
            <div className="timezone-selector">
              <i className="fa-solid fa-globe"></i>
              <select defaultValue="Asia/Kolkata">
                <option value="Asia/Kolkata">IST - Asia/Kolkata</option>
              </select>
            </div>
            <p className="selected-date-display">Thu, Sep 21</p>
            <p className="ist-note">Base working hours are in IST (Asia/Kolkata).</p>

            <div className="time-slots-grid">
              <button className="time-slot" onClick={() => handleNextStep(4)}>10:00 AM</button>
              <button className="time-slot" onClick={() => handleNextStep(4)}>11:30 AM</button>
              <button className="time-slot" onClick={() => handleNextStep(4)}>2:00 PM</button>
            </div>
          </div>
        )}

        {/* Step 4: Details Form */}
        {step === 4 && (
          <div className="scheduler-step active" id="step-4">
            <div className="step-header">
              <button className="back-btn" onClick={() => handleNextStep(3)}><i className="fa-solid fa-arrow-left"></i></button>
              <h3>4. Your Details</h3>
            </div>
            
            <div className="booking-summary-card">
              <div>30-min Project Discussion</div>
              <div>Thu, Sep 21 at 10:00 AM (IST)</div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(5); }}>
              <div className="form-group">
                <label>Name <span className="required">*</span></label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Meeting Platform <span className="required">*</span></label>
                <select required defaultValue="Google Meet">
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                </select>
              </div>
              <div className="form-group">
                <label>What do you want to discuss? <span className="required">*</span></label>
                <textarea rows="2" required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-100">
                <span className="btn-text">Confirm Booking</span>
              </button>
            </form>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="scheduler-step active" id="step-5">
            <div className="confirmation-screen">
              <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
              <h3>Booking Confirmed!</h3>
              <p>An email confirmation has been sent to you.</p>
              
              <div className="confirmed-details glass-card">
                <p><strong>Ref ID:</strong> <span>ABC-123</span></p>
                <p><strong>Type:</strong> <span>30-min Project Discussion</span></p>
                <p><strong>Time:</strong> <br/><span>Thu, Sep 21 at 10:00 AM</span></p>
              </div>
              
              <button className="btn btn-secondary w-100 mt-4" onClick={() => handleNextStep(1)}>Book Another Call</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Scheduler;
