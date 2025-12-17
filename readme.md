📅 Meeting Booking Backend

Backend API for a meeting booking system where clients can book appointments with business users.

The project is built as a test assignment, focusing on clean architecture, validation, and booking logic with time conflict prevention.


🚀 Tech Stack

Node.js

Express

MongoDB + Mongoose

Celebrate + Joi (request validation)

bcrypt (password hashing)

Morgan (HTTP request logging)

👥 User Roles

Client

Can create bookings

Can view, update, and cancel own bookings

Business

🔑 Core Features
Users

Create, update, delete users

Separate roles: client and business

Input validation with celebrate + joi

Business Users

Retrieve list of users with role business

Bookings

Create a booking for a business user

Update (reschedule) a booking

Cancel a booking

Prevent time conflicts:

A booking cannot overlap with another active booking for the same business

Users
POST    /users
GET     /users
GET     /users/:id
PATCH   /users/:id
DELETE  /users/:id

Business Users
GET /businesses

Bookings
POST    /bookings
GET     /bookings?clientId=...
GET     /bookings?businessId=...
PATCH   /bookings/:id
DELETE  /bookings/:id

🧾 Example Booking Request
{
  "clientId": "CLIENT_ID",
  "businessId": "BUSINESS_ID",
  "startAt": "2025-01-20T10:00:00.000Z",
  "endAt": "2025-01-20T11:00:00.000Z",
  "notes": "First meeting"
}

Appears in the list of available businesses

Can receive bookings from clients


⚙️ Environment Variables

Create a .env file in the root directory:

PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/meeting-booking

▶️ Running the Project Locally
npm install
npm run dev


Server will start on:

http://localhost:4000
