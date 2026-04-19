import { Trash2, Calendar, Clock } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  dateTime?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, text, completed, dateTime, onToggle, onDelete }: TodoItemProps) {
  const formatDateTime = (dateTimeStr?: string) => {
    if (!dateTimeStr) return null;
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

  const isPast = dateTime && new Date(dateTime) < new Date();

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <div className="flex-1 cursor-pointer" onClick={() => onToggle(id)}>
        <span
          className={`block ${
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {text}
        </span>
        {dateTime && (
          <div className={`flex items-center gap-1 mt-1 ${
            isPast && !completed ? 'text-red-500' : 'text-gray-500'
          }`}>
            <Calendar className="w-3 h-3" />
            <span className="text-sm">{formatDateTime(dateTime)}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-md"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}