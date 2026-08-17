# ReliefConnect BD

ReliefConnect BD is a full-stack Bangladesh flood-relief management system for **SE-322: Software Engineering Web Application Lab**. Registered users can donate or request relief; authorized administrators review, update, and delete relief requests.

## Features

- User registration, login, logout, JWT session protection, and password hashing with bcrypt.
- Editable user profile and profile image.
- Donation create/read module with district selection and duplicate transaction-ID protection.
- Relief request create/read module with status tracking.
- Admin dashboard: read all requests, approve/reject them, and permanently delete a request (full CRUD coverage).
- Public, privacy-safe aggregate statistics; no donor personal data is exposed publicly.
- MySQL relational schema with foreign keys and input validation in frontend and backend.

## Technology

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Bootstrap 5, Axios |
| Backend | Node.js, Express, JWT, bcryptjs |
| Database | MySQL / XAMPP, mysql2 |

## Run locally

### 1. Database

Start **MySQL** from XAMPP, open `http://localhost/phpmyadmin`, and import [database/schema.sql](database/schema.sql). If the database existed before the profile-image feature, also run [database/add_profile_image.sql](database/add_profile_image.sql).

### 2. Configure backend

Copy `backend/.env.example` to `backend/.env` and set `DB_*` values for your MySQL database. Use a long random `JWT_SECRET`.

### 3. Launch the application

Double-click [Start-ReliefConnect.bat](Start-ReliefConnect.bat). Keep the opened backend and frontend terminal windows running, then visit `http://localhost:5173`.

The server automatically creates the first administrator account if it is absent:

```text
Email: admin@relief.gov.bd
Password: admin123
```

Change this password before any real deployment.

## API summary

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET/PATCH /api/auth/profile` |
| Donations | `POST /api/donations`, `GET /api/donations/my-history` |
| Relief | `POST /api/relief/apply`, `GET /api/relief/my-requests` |
| Admin | `GET /api/admin/relief-requests`, `PUT /api/admin/relief-requests/:id/status`, `DELETE /api/admin/relief-requests/:id` |
| Public | `GET /api/public/stats`, `/districts`, `/district-donations`, `/district-relief` |

## Submission checklist

- [ ] Import database and test registration, login, donation, relief request, approval/rejection, and deletion.
- [ ] Push the repository to your own GitHub account and share its link with the instructor.
- [ ] Make meaningful commits while continuing your own work.
- [ ] Keep `.env` and `node_modules` private; they are ignored by Git.
