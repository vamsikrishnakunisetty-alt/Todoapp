import { useState, useEffect } from 'react';
import { CheckCircle2, LogOut } from 'lucide-react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ActionSelector } from './components/ActionSelector';
import { TaskForm } from './components/TaskForm';
import { DeleteTaskSelector } from './components/DeleteTaskSelector';
import { ModifyTaskSelector } from './components/ModifyTaskSelector';
import { ModifyTaskForm } from './components/ModifyTaskForm';
import { TodoItem } from './components/TodoItem';
import { authAPI, tasksAPI } from '../services/api';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dateTime?: string;
}

type AuthView = 'login' | 'signup';
type View = 'action-select' | 'add-task' | 'delete-task' | 'modify-task' | 'modify-task-form';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentView, setCurrentView] = useState<View>('action-select');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');

    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      loadTasks();
    }
  }, []);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasks = await tasksAPI.getAll();
      setTodos(tasks);
      setError('');
    } catch (err: any) {
      console.error('Error loading tasks:', err);
      setError(err.message || 'Failed to load tasks');

      // If session expired, logout
      if (err.message.includes('Session expired')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (newUsername: string, newPassword: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await authAPI.signup(newUsername, newPassword);

      localStorage.setItem('username', response.username);
      setUsername(response.username);
      setIsLoggedIn(true);

      // Load tasks after signup
      await loadTasks();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      throw err; // Re-throw to be handled by SignUpPage
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (inputUsername: string, inputPassword: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await authAPI.login(inputUsername, inputPassword);

      localStorage.setItem('username', response.username);
      setUsername(response.username);
      setIsLoggedIn(true);

      // Load tasks after login
      await loadTasks();

      return true;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err; // Re-throw to be handled by LoginPage
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setTodos([]);
    setCurrentView('action-select');
    setSelectedTaskId(null);
    setError('');
  };

  const handleSelectAction = (action: 'add' | 'delete' | 'modify') => {
    if (action === 'add') {
      setCurrentView('add-task');
    } else if (action === 'delete') {
      setCurrentView('delete-task');
    } else {
      setCurrentView('modify-task');
    }
  };

  const handleAddTask = async (taskName: string, dateTime: string) => {
    try {
      setLoading(true);
      setError('');
      const newTask = await tasksAPI.create(taskName, dateTime);

      setTodos([...todos, newTask]);
      setCurrentView('action-select');
    } catch (err: any) {
      console.error('Error adding task:', err);
      setError(err.message || 'Failed to add task');

      if (err.message.includes('Session expired')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setLoading(true);
      setError('');
      await tasksAPI.delete(id);

      setTodos(todos.filter((todo) => todo.id !== id));
      setCurrentView('action-select');
    } catch (err: any) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Failed to delete task');

      if (err.message.includes('Session expired')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTaskToModify = (id: string) => {
    setSelectedTaskId(id);
    setCurrentView('modify-task-form');
  };

  const handleModifyTask = async (taskId: string, taskName: string, dateTime: string) => {
    try {
      setLoading(true);
      setError('');
      const updatedTask = await tasksAPI.update(taskId, taskName, dateTime);

      setTodos(
        todos.map((todo) =>
          todo.id === taskId ? updatedTask : todo
        )
      );
      setSelectedTaskId(null);
      setCurrentView('action-select');
    } catch (err: any) {
      console.error('Error modifying task:', err);
      setError(err.message || 'Failed to modify task');

      if (err.message.includes('Session expired')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      setError('');
      const updatedTask = await tasksAPI.toggle(id);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTask : todo
        )
      );
    } catch (err: any) {
      console.error('Error toggling task:', err);
      setError(err.message || 'Failed to update task');

      if (err.message.includes('Session expired')) {
        handleLogout();
      }
    }
  };

  const handleBack = () => {
    setCurrentView('action-select');
    setSelectedTaskId(null);
  };

  const handleBackToTaskSelector = () => {
    setCurrentView('modify-task');
    setSelectedTaskId(null);
  };

  // Auth views
  if (!isLoggedIn) {
    if (authView === 'signup') {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setAuthView('login')}
          loading={loading}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignUp={() => setAuthView('signup')}
        loading={loading}
      />
    );
  }

  const activeTodos = todos.filter((todo) => !todo.completed).sort((a, b) => {
    if (!a.dateTime && !b.dateTime) return 0;
    if (!a.dateTime) return 1;
    if (!b.dateTime) return -1;
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
  });
  const completedTodos = todos.filter((todo) => todo.completed);

  const selectedTask = selectedTaskId
    ? todos.find((todo) => todo.id === selectedTaskId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-gray-900">Task Manager</h1>
              <p className="text-gray-600">Welcome, {username}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-lg">
            Loading...
          </div>
        )}

        {/* Main Content */}
        <div className="mb-8">
          {currentView === 'action-select' && (
            <ActionSelector
              onSelectAction={handleSelectAction}
              hasTasks={activeTodos.length > 0}
            />
          )}
          {currentView === 'add-task' && (
            <TaskForm onSubmit={handleAddTask} onBack={handleBack} />
          )}
          {currentView === 'delete-task' && (
            <DeleteTaskSelector
              todos={todos}
              onDelete={handleDeleteTask}
              onBack={handleBack}
            />
          )}
          {currentView === 'modify-task' && (
            <ModifyTaskSelector
              todos={todos}
              onSelectTask={handleSelectTaskToModify}
              onBack={handleBack}
            />
          )}
          {currentView === 'modify-task-form' && selectedTask && (
            <ModifyTaskForm
              taskId={selectedTask.id}
              currentTaskName={selectedTask.text}
              currentDateTime={selectedTask.dateTime}
              onSubmit={handleModifyTask}
              onBack={handleBackToTaskSelector}
            />
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-gray-600 mb-1">Active Tasks</div>
              <div className="text-blue-600">{activeTodos.length}</div>
            </div>
            <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-gray-600 mb-1">Completed</div>
              <div className="text-green-600">{completedTodos.length}</div>
            </div>
          </div>
        )}

        {/* Todo List */}
        {todos.length > 0 && (
          <div className="space-y-3">
            {activeTodos.length > 0 && (
              <>
                <h2 className="text-gray-700 mb-3">Your Tasks</h2>
                {activeTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    dateTime={todo.dateTime}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </>
            )}
            {completedTodos.length > 0 && (
              <>
                <div className="pt-4 pb-2">
                  <h2 className="text-gray-500">Completed</h2>
                </div>
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    dateTime={todo.dateTime}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
