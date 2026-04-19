# To-Do App - Complete Project

This is a fully functional task management application built with React, TypeScript, and Tailwind CSS.

## Features

✅ **User Authentication**
- Sign-up page with username and password validation
- Login system with credential verification
- Secure user account storage

✅ **Task Management**
- Add tasks with name, date, and time
- Modify existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Conditional UI based on task existence

✅ **Date & Time Validation**
- Prevents selecting past dates and times
- Ensures all tasks are scheduled for future dates

✅ **Modern UI**
- Clean, responsive design
- Gradient backgrounds
- Task statistics dashboard
- Organized active and completed task sections

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main application component
│   │   └── components/
│   │       ├── SignUpPage.tsx               # User registration
│   │       ├── LoginPage.tsx                # User login
│   │       ├── ActionSelector.tsx           # Action menu
│   │       ├── TaskForm.tsx                 # Add task form
│   │       ├── ModifyTaskSelector.tsx       # Select task to modify
│   │       ├── ModifyTaskForm.tsx           # Edit task form
│   │       ├── DeleteTaskSelector.tsx       # Delete task interface
│   │       ├── TodoItem.tsx                 # Individual task item
│   │       └── ui/                          # UI components (buttons, forms, etc.)
│   └── styles/
│       ├── fonts.css                        # Font imports
│       ├── index.css                        # Main styles
│       ├── tailwind.css                     # Tailwind configuration
│       └── theme.css                        # Theme tokens
├── package.json                             # Dependencies
├── vite.config.ts                          # Vite configuration
└── postcss.config.mjs                      # PostCSS configuration

```

## Installation & Setup

1. **Extract the archive:**
   ```bash
   tar -xzf todo-app.tar.gz
   cd todo-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

   If you don't have pnpm installed:
   ```bash
   npm install -g pnpm
   ```

3. **Run the development server:**
   ```bash
   pnpm run build
   ```

4. **Access the application:**
   Open your browser and navigate to the local server URL provided by Vite (typically http://localhost:5173)

## Usage

1. **Sign Up**: Create a new account with a unique username and password
2. **Login**: Sign in with your credentials
3. **Add Tasks**: Create new tasks with name, date, and time
4. **Manage Tasks**: Modify or delete existing tasks
5. **Track Progress**: View active and completed tasks

## Technologies Used

- **React 18.3.1** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1.12** - Styling
- **Vite 6.3.5** - Build tool and dev server
- **Lucide React** - Icons
- **Date-fns** - Date utilities
- **Radix UI** - Accessible UI components

## File Size

- Archive size: ~114KB (excluding node_modules)
- After installation with node_modules: ~200MB+

## Notes

- The application stores user data and tasks in local state (no backend)
- Data will be reset when the page is refreshed
- All passwords are stored in plain text in memory (not for production use)

## Future Enhancements

Consider adding:
- Backend integration (Supabase, Firebase, etc.)
- Persistent storage (localStorage or database)
- Password encryption
- Task categories and tags
- Search and filter functionality
- Email notifications for upcoming tasks

---

**Created with:** Figma Make + Claude Code
**Date:** March 12, 2026
