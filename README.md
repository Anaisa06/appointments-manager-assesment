# Medical Appointments Management for Hospitals

This project is an application designed to manage medical appointments, doctors, and patients for hospitals with multiple specialties. It allows users to register, log in, schedule, modify, and cancel appointments, and uses **WebSockets** for real-time notifications.

## Features

- Manage medical appointments: schedule, modify, and cancel.
- Support for multiple specialties and doctors.
- Real-time notifications using **WebSockets**.
- Automatically generated documentation with **Swagger**.
- Database integration using **TypeORM** with PostgreSQL.

---

## Technologies Used

- [NestJS](https://nestjs.com/) as the main framework.
- [TypeORM](https://typeorm.io/) for database management.
- [Socket.IO](https://socket.io/) for WebSocket communication.
- [Swagger](https://swagger.io/) for API documentation.
- PostgreSQL as the database.

---

## Prerequisites

Before starting, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (recommended v18 or higher).
2. [PostgreSQL](https://www.postgresql.org/) properly configured.
3. A `.env` file with the following structure:

```plaintext
DB_PASSWORD=password
DB_HOSPITAL_NAME=name
DB_HOST=host
DB_PORT=5432
DB_USER=user
JWT_SECRET=secret
```

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Anaisa06/appointments-manager-assesment.git
   cd appointments-manager-assesment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by filling in the `.env` file with your database and JWT credentials.

4. Start the application:
   ```bash
   npm run start
   ```

---

## Usage

- **Register/Login**: Create a user account and log in.
- **Appointments Management**: 
  - Schedule a new appointment.
  - Modify existing appointments.
  - Cancel appointments.
- **Real-Time Notifications**:
  - Notifications are sent via WebSockets when appointments are scheduled, modified, or canceled.

You can use tools like Postman to test the WebSocket functionality.

---

## API Documentation

The API is documented using **Swagger**. Once the application is running, visit the following endpoint to access the documentation:

```
http://localhost:3000/api/v1/docs#/
```
If you want to check the deployed version, follow this link:
```
http://143.198.186.60:3007/api/v1/docs#/
```

---

## Scripts

- `npm run start`: Start the application.
- `npm run start:dev`: Start the application in development mode with live reload.
- `npm run build`: Build the application for production.
- `npm test`: Run unit tests.
- `npm run test:e2e`: Run end-to-end tests.

---

## Dependencies

Key dependencies include:

- `@nestjs/websockets`: WebSocket support in NestJS.
- `typeorm`: ORM for PostgreSQL.
- `socket.io`: Real-time bidirectional communication.
- `@nestjs/swagger`: API documentation generator.
- `bcrypt`: Password hashing for user authentication.
- `pg`: PostgreSQL client.

For a full list of dependencies, see the [package.json](./package.json).

---
