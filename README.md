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
curl --location --request GET 'http://localhost:5000/bookings/details?bookingId=1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODE2OTk4NiwiZXhwIjoxNzM4MTczNTg2fQ.aW7-uZLbc0CZEZQ9mpu7g9n0YeFXkTOktVcuDVg2z04'


