# IRCTC API_WorkIndia

Deployed at: ``` link https://irctc-api-qzs4.onrender.com  ```

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
```bash
curl --location --request POST 'http://localhost:5000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john_doe",
  "password": "securepassword",
  "role": "admin"
}
'
```
### Login User
Endpoint: POST /auth/login
Description: Logs in a user and returns a JWT token.

**Endpoint**: `POST /auth/login`  

```bash
curl --location --request POST 'http://localhost:5000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john_doe",
  "password": "securepassword"
}
'
```
### Creat Train
Description: Creates a new train. This endpoint is only accessible by admin users.
**Endpoint**: `POST /trains/create`  
```bash
curl --location --request POST 'http://localhost:5000/trains/create' \
--header 'Authorization: Bearer <your_jwt_token>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "trainName": "Train A",
  "source": "City A",
  "destination": "City B",
  "departureTime": "09:00",
  "arrivalTime": "14:00",
  "seats": 120
}'
```

### Get Train Availability

Endpoint: `GET /trains/availability?source=City A&destination=City B`
Description: Fetches all the trains between the specified source and destination along with their seat availability.

Query Parameters:

source: Source city name (e.g., "City A").
destination: Destination city name (e.g., "City B").

```bash
curl --location --request GET 'http://localhost:5000/trains/availability?source=City A&destination=City B' \
--header 'Authorization: Bearer <your_jwt_token>'
```

### Book a Seat
Endpoint: `POST /bookings/book`
Description: Books seats on a train for a user. A JWT token is required to authenticate the user.

```bash
curl --location --request POST 'http://localhost:5000/bookings/book' \
--header 'Authorization: Bearer <your_jwt_token>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "trainId": "1",
  "seatCount": 2
}'
```

### Get Booking Details
Endpoint: `GET /bookings/details?bookingId=1`
Description: Retrieves the details of a booking based on the booking ID.

Query Parameters:

bookingId: The booking ID.

```bash
curl --location --request GET 'http://localhost:5000/bookings/details?bookingId=1' \
--header 'Authorization: Bearer <your_jwt_token>'
```

