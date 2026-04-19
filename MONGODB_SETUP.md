# MongoDB Setup Guide

This guide will help you set up MongoDB for your Todo App.

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create a Cluster
1. After signing in, click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to you)
4. Cluster Name: `TodoAppCluster` (or any name)
5. Click "Create"

### Step 3: Create Database User
1. Security Quickstart will appear
2. Choose "Username and Password"
3. Username: `todouser` (or your choice)
4. Password: Click "Autogenerate Secure Password" (save this!)
5. Click "Create User"

### Step 4: Set Network Access
1. Click "Add IP Address"
2. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: In production, restrict this to your IP only
3. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://todouser:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add your database name before the `?`:
   ```
   mongodb+srv://todouser:yourpassword@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

### Step 6: Update Backend .env
1. Open `backend/.env` file
2. Paste your connection string:
   ```
   MONGODB_URI=mongodb+srv://todouser:yourpassword@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB Compass (GUI) when prompted
5. MongoDB will run as a Windows Service automatically

### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0
```

### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public GPG Key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Update Backend .env for Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/todoapp
```

## Verify MongoDB Connection

### Test with MongoDB Compass (GUI Tool)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. You should see your databases

### Test with Backend Server
1. Make sure MongoDB is running
2. Start your backend server:
   ```bash
   cd backend
   npm start
   ```
3. Look for this message:
   ```
   ✅ Connected to MongoDB successfully
   🚀 Server is running on port 5000
   ```

## Troubleshooting

### Error: "MongoNetworkError"
- Check your internet connection
- Verify IP address is whitelisted in Atlas
- Check firewall settings

### Error: "Authentication failed"
- Verify username and password in connection string
- Make sure you replaced `<password>` with actual password
- Check for special characters (URL encode them)

### Error: "Connection refused" (Local MongoDB)
- Make sure MongoDB service is running
- Check if MongoDB is listening on port 27017:
  ```bash
  sudo lsof -i :27017  # macOS/Linux
  netstat -an | findstr :27017  # Windows
  ```

### Cannot connect from VSCode
- Check backend .env file exists and has correct values
- Restart backend server after changing .env
- Check backend console for error messages

## Security Best Practices

### For Development
- Use strong passwords
- Don't commit .env files to git
- Use environment variables

### For Production
- Restrict IP whitelist to your server's IP only
- Use MongoDB Atlas encryption
- Enable authentication
- Rotate credentials regularly
- Use connection pooling
- Monitor database activity

## MongoDB Basics

### View Data in MongoDB Compass
1. Connect to your database
2. Click on "todoapp" database
3. You'll see two collections:
   - `users` - User accounts
   - `tasks` - Task items

### Manual Data Queries
```javascript
// Find all users
db.users.find()

// Find all tasks for a user
db.tasks.find({ userId: ObjectId("user_id_here") })

// Delete all tasks
db.tasks.deleteMany({})

// Drop entire database (careful!)
db.dropDatabase()
```

## Next Steps
Once MongoDB is connected:
1. ✅ Backend can store user accounts
2. ✅ Backend can store tasks persistently
3. ✅ Data survives server restarts
4. ✅ Multiple users can have separate task lists

Enjoy your fully functional Todo App with MongoDB! 🎉
