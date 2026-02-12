# AI-Powered Appointment Management System for Healthcare Professionals

A full-stack, **AI-enhanced** web platform designed to streamline appointment scheduling in healthcare settings. The system helps reduce no-shows, optimize provider schedules, improve patient experience, and minimize administrative workload using intelligent features like no-show prediction, smart slot recommendations, automated reminders, and real-time notifications.

**Final Year Project (FYP)** — Bachelor of Science in Computer Science (2022–2025)  
**Students**: Muhammad Hassan Faisal (2221108), Taimoor Anjum (2221023)  
**Supervisor**: Dr. Fahad Ahmad  
**Institution**: National College of Business Administration & Economics (NCBA&E)

## ✨ Key Features

### For Patients
- Register and securely log in
- Browse healthcare providers and their real-time availability
- Book, reschedule, or cancel appointments with AI-suggested optimal time slots
- Receive automated email confirmations and reminders
- View appointment history

### For Doctors / Healthcare Providers
- Manage availability, working hours, and services
- View optimized schedule with AI-driven recommendations
- Approve, reject, reschedule, or cancel appointments
- Receive real-time notifications for new bookings/changes
- Access basic analytics (no-show rates, utilization)

### Admin Features
- User management (patients, doctors, staff)
- System-wide appointment oversight
- Basic reporting & statistics

## 🛠️ Tech Stack

- **Frontend**: React.js (with Next.js likely used for SSR / performance)
- **Backend**: Python + **FastAPI** (modern, high-performance API framework)
- **Database**: PostgreSQL (relational, scalable, secure for healthcare data)
- **Authentication**: Firebase Authentication / OAuth2 + JWT
- **AI/ML**: LangGraph (for orchestration), custom ML models for no-show prediction & scheduling optimization
- **Notifications**: SMTP (email confirmations & reminders)
**Other**: Git for version control

FYP-Appointment-Scheduling-Platform/
├── backend/                # FastAPI backend + AI logic
│   ├── ...                 # routes, models, services, ML components
│   └── requirements.txt
├── frontend/               # React client application
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
├── README.md
