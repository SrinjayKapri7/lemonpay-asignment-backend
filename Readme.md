# Project Overview
This backend service handles user authentication and task management with caching optimizations. JWT tokens are used for authentication and stored in HTTP-only cookies to enhance security. A Redis-based token blacklisting system ensures that logged-out tokens cannot be reused. Task data is cached in Redis for 5 minutes to reduce database load, falling back to MongoDB when cache misses occur.

# Tools, Technologies, and Libraries Used
Node.js

MongoDB

Redis

JSON Web Tokens (JWT)

HTTP-only cookies

Docker

# API Routes and Usage
Authentication Routes:

/api/auth/register — Register a new user

/api/auth/login — Login a user

/api/auth/logout — Logout a user

Task Management Routes:

/api/tasks — Perform create, read on tasks

/api/tasks/:id — Perform update, delete on tasks

## IMP
/clear-cache — Clear all cached task and user data in Redis, it is a post request

User Profile Route:

/api/user/profile — Get details of the authenticated user

# Setup and Run Instructions
Redis Docker Commands:

Build Redis image: docker build -f Dockerfile.redis -t redis-image .

Run Redis container: docker run -d --name redis-server -p 6379:6379 redis-image

Authenticate if needed: AUTH appuser 4518710

Check Redis maxmemory policy: CONFIG GET maxmemory-policy

Backend Docker Commands:

Build backend image: docker build -f Dockerfile -t lemonpay-assignment-backend .

Run backend container: docker run -d --name backend -p 5000:5000 lemonpay-assignment-backend

Local Development:
Run locally using: npm run dev

# Assumptions
Authentication uses only JWT tokens with 1-hour expiry.

Redis is used for blacklisting tokens upon logout to prevent reuse.

Redis is configured with maxmemory 100mb and maxmemory-policy allkeys-lru for LRU eviction.