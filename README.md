# GD-ecomm - Full-Stack Gundam E-commerce Platform

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Container-blue.svg)](https://www.docker.com/)

A modern, scalable e-commerce platform for Gundam models, built with Spring Boot, React, and deployed with Docker.

---

- **Full-Stack Development**: React frontend with Spring Boot REST API backend
- **Containerized Deployment**: Docker-based deployment for easy scaling and management
- **Microservices Design**: Modular architecture with separate services for products, orders, payments
- **Real-time Features**: Live inventory updates, order tracking, and payment processing
- **Security-First**: JWT authentication, Spring Security, input validation, and SQL injection protection
- **Scalable Infrastructure**: Container orchestration with Docker Compose
- **Payment Integration**: Secure Stripe payment processing with webhook handling
- **Performance Optimized**: Redis caching, database indexing, and optimized queries

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │  Spring Boot    │    │   Database      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│  (MySQL/Redis)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│ • Redux State   │    │ • REST APIs     │    │ • MySQL 8.0     │
│ • Material-UI   │    │ • JPA/Hibernate │    │ • Redis Cache   │
│ • Tailwind CSS  │    │ • Spring Security│   │ • Data Persistence│
│ • Stripe SDK    │    │ • JWT Auth      │    │ • Session Store │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.5 (Java 21)
- **Database**: MySQL 8.0 with JPA/Hibernate
- **Cache**: Redis
- **Security**: Spring Security + JWT
- **Payment**: Stripe API
- **Build**: Maven

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **UI & Styling**: Material-UI & Tailwind CSS
- **HTTP Client**: Axios

### Deployment
- **Containerization**: Docker & Docker Compose

---

## Run with Docker

This project is configured to run seamlessly in a Docker environment. Follow these steps to get started.

### 1. Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (Usually included with Docker Desktop)
- A text editor to create environment files.

### 2. Environment Configuration

You need to configure environment variables for both the backend and frontend.

#### Frontend (`frontend/.env`)
Create a file named `.env` inside the `frontend/` directory with the following content. Replace the placeholder with your actual Stripe **Publishable** Key.

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_FRONTEND_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

#### Backend (`docker-compose.yml`)
Open the `docker-compose.yml` file and update the `environment` section for the `backend` service. Replace placeholders with your actual keys.

- `JWT_SECRET`: A long, random string for signing tokens. You can generate one [here](https://www.uuidgenerator.net/version4).
- `STRIPE_SECRET_KEY`: Your actual Stripe **Secret** Key.

```yaml
# ... in docker-compose.yml
services:
  backend:
    # ...
    environment:
      # ...
      - JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY
      - STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
```

### 3. Database Initialization

This project includes a sample database dump `local_database_backup.sql` to populate the application with initial users and products. The `docker-compose.yml` is already configured to automatically import this file when the database container starts for the first time.

If you want to use your own data, replace `local_database_backup.sql` with your own SQL dump file.

**Sample User Credentials:**
- **Username**: `buyer1`
- **Password**: `123456`
- **Username**: `seller1`
- **Password**: `123456`

### 4. Build and Run the Application

Once the configuration is done, run the following command from the project root directory:

```bash
docker-compose up --build -d
```

The initial startup might take a few minutes as Docker downloads images and builds the project.

### 5. Accessing the Application

After the containers are up and running, you can access the services:
- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Database (for clients)**: `localhost:3306`
- **Redis (for clients)**: `localhost:6379`

### 6. Stopping the Application

To stop all running containers, use:
```bash
docker-compose down
```

---

## API Documentation

### Core Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/products` - Product catalog with filtering
- `POST /api/orders` - Order creation
- `POST /api/payments/create-intent` - Payment processing

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-01T00:00:00Z"
}
```