# IRCTC API Documentation

This is the API documentation for the IRCTC system. It provides endpoints for user management, train management, booking system, and related operations.

---

## Table of Contents

1. [Authentication](#authentication)
    - [Register User](#register-user)
    - [Login User](#login-user)
2. [Train Management](#train-management)
    - [Create Train](#create-train)
    - [Get Train Availability](#get-train-availability)
3. [Booking Management](#booking-management)
    - [Book a Seat](#book-a-seat)
    - [Get Booking Details](#get-booking-details)

---

## Authentication

### Register User

**Endpoint**: `POST /auth/register`  
**Description**: Registers a new user with the role of either `general` or `admin`.

**CURL**:
```json
curl --location --request POST 'http://localhost:5000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john_doe",
  "password": "securepassword",
  "role": "admin"
}
'


