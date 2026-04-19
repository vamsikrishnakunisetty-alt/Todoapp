import { useState } from 'react';
import { CheckCircle2, LogOut } from 'lucide-react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ActionSelector } from './components/ActionSelector';
import { TaskForm } from './components/TaskForm';
import { DeleteTaskSelector } from './components/DeleteTaskSelector';
import { ModifyTaskSelector } from './components/ModifyTaskSelector';
import { ModifyTaskForm } from './components/ModifyTaskForm';
import { TodoItem } from './components/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dateTime?: string;
}

interface UserAccount {
  username: string;
  password: string;
}

type AuthView = 'login' | 'signup';
type View = 'action-select' | 'add-task' | 'delete-task' | 'modify-task' | 'modify-task-form';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentView, setCurrentView] = useState<View>('action-select');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSignUp = (newUsername: string, newPassword: string) => {
    const newUser: UserAccount = {
      username: newUsername.toLowerCase(),
      password: newPassword,
    };
    setUsers([...users, newUser]);
    setUsername(newUsername);
    setIsLoggedIn(true);
    setAuthView('login');
  };

  const validateCredentials = (inputUsername: string, inputPassword: string): boolean => {
    const user = users.find(
      (u) => u.username === inputUsername.toLowerCase() && u.password === inputPassword
    );
    return !!user;
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCurrentView('action-select');
    setSelectedTaskId(null);
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

  const handleAddTask = (taskName: string, dateTime: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: taskName,
      completed: false,
      dateTime,
    };

    setTodos([...todos, newTodo]);
    setCurrentView('action-select');
  };

  const handleDeleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCurrentView('action-select');
  };

  const handleSelectTaskToModify = (id: string) => {
    setSelectedTaskId(id);
    setCurrentView('modify-task-form');
  };

  const handleModifyTask = (taskId: string, taskName: string, dateTime: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId
          ? { ...todo, text: taskName, dateTime }
          : todo
      )
    );
    setSelectedTaskId(null);
    setCurrentView('action-select');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
          existingUsernames={users.map((u) => u.username)}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignUp={() => setAuthView('signup')}
        validateCredentials={validateCredentials}
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
              <h1 className="text-gray-900">TO-DO</h1>
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
