Overview

EcoTrack is a digital tool that allows users to log daily activities, calculate their carbon emissions, and track sustainability progress through a modern dashboard.
The platform converts actions such as transport usage, electricity consumption, and waste generation into CO₂-equivalent values, empowering individuals to make environmentally conscious decisions.

EcoTrack is designed as an educational and behavioural-change solution that promotes climate literacy and personal accountability.

🎯 Project Objectives

Help users understand and reduce their daily carbon footprint

Provide a clean and intuitive interface for activity logging

Offer data-driven insights using charts and aggregated analytics

Support global climate action through awareness and behavioural nudges

Demonstrate full-stack development skills using modern technologies

⚙️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

Recharts (for charts & data visualization)

Backend

Node.js + Express

PostgreSQL

Prisma / Sequelize ORM

RESTful API Design

Middleware for validation, error handling & authentication

🗂️ Project Features
✔ Activity Logging

Users can submit activities in categories such as transport, electricity, and waste.

Each activity is automatically assigned a CO₂ emission value based on predefined factors.

✔ Dashboard & Analytics

Displays:

Daily and weekly emissions

Category breakdowns

Trends and historical data

Total CO₂ emitted

✔ Emission Factor Engine

Uses scientifically validated emission multipliers

Supports dynamic updates and category expansion

✔ Future Enhancements

Gamification (badges, eco-goals, streaks)

Community dashboards

AI sustainability recommendations

Mobile version (React Native)

🧱 System Architecture
React UI  →  Express API  →  PostgreSQL Database


High-level workflow:

User logs in / logs activity

Frontend sends request to Express server

Server validates request & applies emission factor

Data stored in PostgreSQL

Dashboard requests aggregated summaries

Results displayed through charts & cards

Database Schema (ERD)
Users
---------
id (PK)
name
email
password
created_at

Categories
---------
id (PK)
name
description

EmissionFactors
---------
id (PK)
category_id (FK)
value_per_unit
unit

Activities
---------
id (PK)
user_id (FK)
category_id (FK)
quantity
calculated_co2
created_at


Relationships:

A user → many activities

A category → many activities

A category → one emission factor

🚀 Getting Started
Clone the repository
git clone https://github.com/yourusername/EcoTrack.git
cd EcoTrack

🖥️ Backend Setup
cd server
npm install


Create a .env file:

DATABASE_URL=your_postgres_url
PORT=5000
JWT_SECRET=your_secret


Run migrations & seeds:

npx prisma migrate dev
npm run seed


Start development server:

npm run dev

💻 Frontend Setup
cd client
npm install
npm run dev

📈 API Endpoints (Summary)
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login & return token
GET	/api/activities	Fetch user activities
POST	/api/activities	Log new activity
GET	/api/dashboard/summary	Aggregated dashboard data
📦 Folder Structure
Server
/server
  /config
  /controllers
  /routes
  /migrations
  /seeders
  /middleware
  /utils

Client
/client
  /src
    /pages
    /components
    /hooks
    /utils

📜 License

This project is licensed under the MIT License.

🧑‍💻 Author

Sihle Wandile Mzimela
Full-Stack Developer | DevOps Learner
South Africa
