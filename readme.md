# 📅 Meeting Booking Backend

Backend API for a meeting booking system where clients can book appointments with business users.

The project is built as a test assignment, focusing on clean architecture, validation, and booking logic with time conflict prevention.

---

## 🚀 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Celebrate + Joi (request validation)
- bcrypt (password hashing)
- Morgan (HTTP request logging)

---

## 👥 User Roles

### Client
- Can create bookings
- Can view, update, and cancel own bookings

### Business
- Can receive bookings from clients
- Appears in the list of available businesses

---

## 🔑 Core Features

### Users
- Create, update, delete users
- Separate roles: client and business
- Input validation with Celebrate + Joi

### Business Users
- Retrieve list of users with role `business`

### Bookings
- Create a booking for a business user
- Update (reschedule) a booking
- Cancel a booking
- Prevent time conflicts:  
  - A booking cannot overlap with another active booking for the same business

---

## 🛣️ API Endpoints

### Users
| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| POST   | `/users`       | Create user            |
| GET    | `/users`       | Get all users          |
| GET    | `/users/:id`   | Get user by id         |
| PATCH  | `/users/:id`   | Update user            |
| DELETE | `/users/:id`   | Delete user            |

### Business Users
| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| GET    | `/businesses`    | Get users with role business   |

### Bookings
| Method | Endpoint                         | Description                 |
|--------|----------------------------------|-----------------------------|
| POST   | `/bookings`                      | Create booking              |
| GET    | `/bookings?clientId=...`         | Get bookings by client      |
| GET    | `/bookings?businessId=...`       | Get bookings by business    |
| PATCH  | `/bookings/:id`                  | Reschedule booking          |
| DELETE | `/bookings/:id`                  | Cancel booking              |

---

## 🧾 Example Booking Request

```json
{
  "clientId": "CLIENT_ID",
  "businessId": "BUSINESS_ID",
  "startAt": "2025-01-20T10:00:00.000Z",
  "endAt": "2025-01-20T11:00:00.000Z",
  "notes": "First meeting"
}


