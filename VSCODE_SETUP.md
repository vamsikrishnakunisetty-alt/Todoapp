# VSCode Setup Guide - Todo App with MongoDB

Complete setup instructions for running your Todo App in VSCode with MongoDB backend.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **VSCode** - [Download](https://code.visualstudio.com/)
- **pnpm** (package manager) - Install with: `npm install -g pnpm`
- **MongoDB** - See MONGODB_SETUP.md for installation

## 🚀 Quick Start (5 Steps)

### Step 1: Extract and Open in VSCode
```bash
# Extract the archive
tar -xzf todo-app-mongodb.tar.gz

# Open in VSCode
cd todo-app-mongodb
code .
```

### Step 2: Setup MongoDB
Follow the **MONGODB_SETUP.md** guide to:
- Install MongoDB (Atlas or local)
- Get your connection string

### Step 3: Configure Backend
```bash
# Navigate to backend folder
cd backend

# Create .env file from example
cp .env.example .env

# Edit .env file and add your MongoDB URI
# Use VSCode or any text editor
code .env
```

Update `.env` with your details:
```env
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/todoapp

JWT_SECRET=change-this-to-a-random-secure-string
PORT=5000
```

### Step 4: Install Dependencies
```bash
# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ..
pnpm install
```

### Step 5: Run the Application
Open **2 terminals** in VSCode:

**Terminal 1 - Backend:**
```bash
cd backend
pnpm start
# You should see: ✅ Connected to MongoDB successfully
```

**Terminal 2 - Frontend:**
```bash
pnpm run dev
# You should see: Local: http://localhost:5173
```

Open http://localhost:5173 in your browser 🎉

## 📁 Project Structure

```
todo-app-mongodb/
├── backend/                      # Node.js + Express + MongoDB
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── tasks.js             # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env                     # Environment variables (create this)
│
├── src/                         # React Frontend
│   ├── app/
│   │   ├── App.tsx              # Main app (local state - original)
│   │   ├── AppWithAPI.tsx       # Main app (MongoDB version)
│   │   └── components/
│   │       ├── LoginPage.tsx         # Original login
│   │       ├── LoginPageAPI.tsx      # MongoDB login
│   │       ├── SignUpPage.tsx        # Original signup
│   │       ├── SignUpPageAPI.tsx     # MongoDB signup
│   │       ├── ActionSelector.tsx
│   │       ├── TaskForm.tsx
│   │       ├── ModifyTaskForm.tsx
│   │       ├── ModifyTaskSelector.tsx
│   │       ├── DeleteTaskSelector.tsx
│   │       └── TodoItem.tsx
│   ├── services/
│   │   └── api.ts               # API service layer
│   └── styles/
│
├── package.json                 # Frontend dependencies
├── vite.config.ts              # Vite configuration
├── .env.example                # Environment template
├── MONGODB_SETUP.md            # MongoDB setup guide
└── README.md                   # Project documentation
```

## 🔄 Switching Between Local and MongoDB Versions

### Use MongoDB Version (Recommended)
1. Rename `src/app/App.tsx` to `src/app/AppLocal.tsx`
2. Rename `src/app/AppWithAPI.tsx` to `src/app/App.tsx`
3. Do the same for Login and SignUp components:
   - Rename `LoginPage.tsx` → `LoginPageLocal.tsx`
   - Rename `LoginPageAPI.tsx` → `LoginPage.tsx`
   - Rename `SignUpPage.tsx` → `SignUpPageLocal.tsx`
   - Rename `SignUpPageAPI.tsx` → `SignUpPage.tsx`

### Use Local Version (No Backend Needed)
Keep the original file names. Data will be stored in browser memory only.

## 🛠️ VSCode Recommended Extensions

Install these extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **ESLint**
3. **Prettier - Code formatter**
4. **MongoDB for VS Code**
5. **Thunder Client** (for API testing)
6. **Auto Rename Tag**
7. **Path Intellisense**

## 🧪 Testing the API

### Using VSCode Thunder Client Extension

1. Install Thunder Client extension
2. Create a new request
3. Test endpoints:

**Sign Up:**
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Get Tasks (needs token):**
```
GET http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Create Task:**
```
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "text": "Test Task",
  "dateTime": "2026-12-31T10:00:00.000Z"
}
```

## 📝 Available Scripts

### Backend
```bash
cd backend
pnpm start     # Start backend server
pnpm run dev   # Start with nodemon (auto-restart)
```

### Frontend
```bash
pnpm run dev   # Start development server
pnpm run build # Build for production
```

## 🐛 Troubleshooting

### Backend won't start
**Error:** "Cannot find module 'express'"
```bash
cd backend
rm -rf node_modules
pnpm install
```

**Error:** "MongoDB connection error"
- Check your MONGODB_URI in backend/.env
- Verify MongoDB is running (local) or accessible (Atlas)
- Check firewall and network settings
- See MONGODB_SETUP.md

### Frontend won't connect to backend
**Error:** "Failed to fetch" or "Network Error"
- Make sure backend is running on port 5000
- Check backend console for errors
- Verify VITE_API_URL in frontend .env
- Check browser console for CORS errors

### Port already in use
**Error:** "Port 5000 is already in use"
```bash
# Find and kill the process
lsof -i :5000    # macOS/Linux
kill -9 PID      # Replace PID with process ID

# Or use a different port in backend/.env
PORT=3001
```

### CORS errors
If you see CORS errors in browser:
- Make sure `cors` is installed in backend
- Backend should have `app.use(cors())`
- Check backend console logs

### JWT Token issues
**Error:** "Invalid token" or "Token expired"
- Token expires after 7 days
- Logout and login again
- Clear localStorage in browser DevTools

### MongoDB authentication failed
- Double-check username and password
- Make sure you replaced `<password>` in connection string
- Special characters in password need URL encoding

## 🔐 Security Notes

### Development
- .env files are gitignored automatically
- JWT tokens are stored in localStorage
- Passwords are hashed with bcrypt

### Before Production
- [ ] Change JWT_SECRET to a strong random string
- [ ] Restrict MongoDB IP whitelist
- [ ] Use HTTPS for frontend
- [ ] Add rate limiting
- [ ] Add input sanitization
- [ ] Enable MongoDB encryption
- [ ] Use environment-specific configs
- [ ] Add logging and monitoring

## 📊 Database Management

### View Data in VSCode
1. Install "MongoDB for VS Code" extension
2. Click MongoDB icon in sidebar
3. Click "Add Connection"
4. Paste your MongoDB URI
5. Browse collections

### View Data in MongoDB Compass
1. Download MongoDB Compass
2. Connect with your URI
3. Browse `todoapp` database
4. See `users` and `tasks` collections

### Clear All Data
```javascript
// In MongoDB Compass or VSCode MongoDB extension
// WARNING: This deletes everything!

// Delete all tasks
db.tasks.deleteMany({})

// Delete all users
db.users.deleteMany({})

// Or drop entire database
use todoapp
db.dropDatabase()
```

## ✨ Features

✅ User Authentication (JWT)
✅ Password Hashing (bcrypt)
✅ Persistent Data Storage (MongoDB)
✅ RESTful API
✅ Real-time Task Management
✅ Date/Time Validation
✅ Session Management
✅ Responsive UI
✅ Error Handling

## 🎯 Next Steps

After successful setup:
1. Create an account on the app
2. Add some tasks
3. Close the browser
4. Open again - your data is still there!
5. Try logging in from a different browser
6. Explore the MongoDB database

## 💡 Tips

- Use `Ctrl+C` to stop servers in terminal
- Use `Ctrl+` ` to open terminal in VSCode
- Use `Ctrl+Shift+P` for VSCode command palette
- Keep both terminals visible (split view)
- Check backend console for API logs
- Check browser console for frontend logs

## 📚 Learn More

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Introduction](https://jwt.io/introduction)

---

Need help? Check the error messages in:
1. Backend terminal
2. Frontend terminal
3. Browser console (F12)
4. MongoDB logs

Happy coding! 🚀
