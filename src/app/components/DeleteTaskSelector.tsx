import { ArrowLeft, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dateTime?: string;
}

interface DeleteTaskSelectorProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function DeleteTaskSelector({ todos, onDelete, onBack }: DeleteTaskSelectorProps) {
  const formatDateTime = (dateTimeStr?: string) => {
    if (!dateTimeStr) return 'No date set';
    const date = new Date(dateTimeStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();
    
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (isToday) return `Today, ${timeStr}`;
    if (isTomorrow) return `Tomorrow, ${timeStr}`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-gray-900 mb-6">Select Task to Delete</h2>
      
      {activeTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No tasks available to delete
        </div>
      ) : (
        <div className="space-y-3">
          {activeTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all group"
            >
              <div className="flex-1">
                <div className="text-gray-800">{todo.text}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {formatDateTime(todo.dateTime)}
                </div>
              </div>
              <button
                onClick={() => onDelete(todo.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
