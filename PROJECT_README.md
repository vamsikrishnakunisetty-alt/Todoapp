# 📝 Todo App - Full Stack with MongoDB

A complete full-stack todo application with user authentication, task management, and MongoDB persistence.

![Tech Stack](https://img.shields.io/badge/React-18.3.1-blue)
![Tech Stack](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-green)
![Tech Stack](https://img.shields.io/badge/MongoDB-Database-green)
![Tech Stack](https://img.shields.io/badge/TailwindCSS-4.1-purple)

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login system
- JWT token-based authentication
- Password hashing with bcrypt
- Session persistence

### 📋 Task Management
- Create tasks with name, date, and time
- Update/modify existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Automatic date/time validation
- Prevents scheduling tasks in the past

### 🎨 User Interface
- Modern, clean design
- Gradient backgrounds
- Responsive layout
- Task statistics dashboard
- Conditional UI based on task existence
- Loading states and error handling
- Smooth transitions and animations

### 💾 Data Persistence
- MongoDB database integration
- RESTful API architecture
- Real-time data synchronization
- User-specific task lists
- Secure data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)
- pnpm (or npm)

### Installation

1. **Extract the project:**
```bash
tar -xzf todo-app-mongodb.tar.gz
cd todo-app-mongodb
```

2. **Setup MongoDB:**
   - Follow `MONGODB_SETUP.md` for detailed instructions
   - Get your MongoDB connection string

3. **Configure Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI
```

4. **Install Dependencies:**
```bash
# Backend
cd backend
pnpm install

# Frontend
cd ..
pnpm install
```

5. **Run the Application:**

**Terminal 1 - Backend:**
```bash
cd backend
pnpm start
```

**Terminal 2 - Frontend:**
```bash
pnpm run dev
```

6. **Open in Browser:**
   - Navigate to http://localhost:5173
   - Create an account and start managing tasks!

## 📁 Project Structure

```
todo-app-mongodb/
├── backend/                          # Node.js + Express API
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js                 # User model
│   │   └── Task.js                 # Task model
│   ├── routes/                     # API routes
│   │   ├── auth.js                 # Authentication
│   │   └── tasks.js                # Task CRUD
│   ├── middleware/                 # Custom middleware
│   │   └── auth.js                 # JWT verification
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env                        # Environment config
│
├── src/                            # React Frontend
│   ├── app/
│   │   ├── App.tsx                 # Original (local state)
│   │   ├── AppWithAPI.tsx          # MongoDB version
│   │   └── components/
│   │       ├── LoginPage.tsx           # Auth components
│   │       ├── SignUpPage.tsx
│   │       ├── ActionSelector.tsx      # Main menu
│   │       ├── TaskForm.tsx            # Add task
│   │       ├── ModifyTaskForm.tsx      # Edit task
│   │       ├── ModifyTaskSelector.tsx  # Select task to edit
│   │       ├── DeleteTaskSelector.tsx  # Delete task
│   │       └── TodoItem.tsx            # Task display
│   ├── services/
│   │   └── api.ts                  # API service layer
│   └── styles/                     # CSS styles
│
├── package.json                    # Frontend dependencies
├── vite.config.ts                  # Vite configuration
├── VSCODE_SETUP.md                 # VSCode setup guide
├── MONGODB_SETUP.md                # MongoDB setup guide
└── README.md                       # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4.1** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📚 Documentation

- **VSCODE_SETUP.md** - Complete VSCode setup instructions
- **MONGODB_SETUP.md** - MongoDB installation and configuration
- **backend/README.md** - Backend API documentation

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle completion
- `DELETE /api/tasks/:id` - Delete task

### Health
- `GET /api/health` - Server status

## 🎯 Key Features Explained

### Authentication Flow
1. User signs up → Password is hashed → Stored in MongoDB
2. User logs in → Password verified → JWT token generated
3. Token stored in localStorage → Used for API requests
4. Token expires after 7 days → User must login again

### Task Management Flow
1. User creates task → Validated → Sent to backend
2. Backend verifies JWT → Creates task in MongoDB
3. Task returned to frontend → Added to state
4. Real-time updates reflected immediately

### Data Validation
- Username: 3+ characters
- Password: 6+ characters, hashed
- Task name: Required, max 500 chars
- Date/Time: Must be in the future
- All inputs sanitized and validated

## 🔐 Security Features

- ✅ Password hashing (bcrypt, 10 rounds)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ MongoDB injection prevention
- ✅ CORS enabled
- ✅ Environment variable protection
- ✅ Secure session management

## 🐛 Troubleshooting

### Backend Issues
- **Can't connect to MongoDB:** Check MONGODB_URI in .env
- **Port already in use:** Change PORT in backend/.env
- **Module not found:** Run `pnpm install` in backend/

### Frontend Issues
- **API connection failed:** Ensure backend is running on port 5000
- **CORS errors:** Check backend has `cors` middleware
- **Build errors:** Run `pnpm install` and try again

### MongoDB Issues
- **Authentication failed:** Verify username/password in URI
- **Network error:** Check IP whitelist in MongoDB Atlas
- **Connection timeout:** Verify MongoDB service is running

See **VSCODE_SETUP.md** for detailed troubleshooting.

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  text: String,
  completed: Boolean,
  dateTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Components

- **LoginPage** - User authentication
- **SignUpPage** - New account creation
- **ActionSelector** - Task action menu
- **TaskForm** - Add new tasks
- **ModifyTaskSelector** - Choose task to edit
- **ModifyTaskForm** - Edit task details
- **DeleteTaskSelector** - Choose task to delete
- **TodoItem** - Individual task display

## 📱 Screenshots

### Login Screen
Clean, modern authentication interface with form validation.

### Task Dashboard
View all tasks with statistics, organized by active and completed.

### Add Task
Simple form to create new tasks with date/time validation.

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Create new app
2. Add MongoDB URI as environment variable
3. Deploy from Git repository
4. Update frontend API URL

### Frontend (Vercel/Netlify)
1. Build production version: `pnpm run build`
2. Deploy `dist/` folder
3. Set VITE_API_URL environment variable
4. Configure build command: `pnpm run build`

## 🔄 Development Workflow

1. Make changes in `src/` or `backend/`
2. Frontend hot-reloads automatically
3. Backend requires restart (or use nodemon)
4. Test in browser
5. Check console for errors
6. Commit changes to Git

## 📈 Future Enhancements

- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Due date reminders
- [ ] Email notifications
- [ ] Dark mode
- [ ] Task search and filter
- [ ] Task sorting options
- [ ] Recurring tasks
- [ ] Task sharing between users
- [ ] Mobile app version

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 👨‍💻 Author

Created with Claude Code + Figma Make

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the styling system
- Lucide for the beautiful icons

---

**Need Help?** Check the documentation files:
- `VSCODE_SETUP.md` - Setup instructions
- `MONGODB_SETUP.md` - Database setup
- `backend/README.md` - API documentation

**Happy Task Managing! 🎉**
