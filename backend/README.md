# Todo App Backend API

RESTful API backend for Todo App with MongoDB and JWT authentication.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Start server:
```bash
pnpm start
# or for development with auto-reload:
pnpm run dev
```

## API Endpoints

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "username": "john"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "username": "john"
}
```

### Tasks (Protected Routes - Require JWT Token)

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "text": "Buy groceries",
    "completed": false,
    "dateTime": "2026-12-25T10:00:00.000Z",
    "createdAt": "2026-03-12T08:00:00.000Z",
    "updatedAt": "2026-03-12T08:00:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "text": "Buy groceries",
  "dateTime": "2026-12-25T10:00:00.000Z"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "text": "Buy groceries and cook dinner",
  "dateTime": "2026-12-25T11:00:00.000Z"
}
```

#### Toggle Task Completion
```http
PATCH /api/tasks/:id/toggle
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

### Health Check
```http
GET /api/health
```

## Database Models

### User Model
```javascript
{
  username: String (unique, lowercase, 3-30 chars),
  password: String (hashed, min 6 chars),
  timestamps: true
}
```

### Task Model
```javascript
{
  userId: ObjectId (ref: User),
  text: String (required, max 500 chars),
  completed: Boolean (default: false),
  dateTime: Date (required),
  timestamps: true
}
```

## Error Responses

```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Protected routes with middleware
- Input validation
- MongoDB injection prevention
- CORS enabled

## Development

```bash
# Install dependencies
pnpm install

# Start dev server with auto-reload
pnpm run dev

# Start production server
pnpm start
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/todoapp |
| JWT_SECRET | Secret key for JWT signing | random-secure-string-here |
| PORT | Server port | 5000 |

## Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema
│   └── Task.js          # Task schema
├── routes/
│   ├── auth.js          # Auth endpoints
│   └── tasks.js         # Task CRUD endpoints
├── middleware/
│   └── auth.js          # JWT verification
├── server.js            # Express app
├── package.json
└── .env                 # Environment variables
```

## License

MIT
