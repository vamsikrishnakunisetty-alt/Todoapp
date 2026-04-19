import { Plus, Trash2, Edit } from 'lucide-react';

interface ActionSelectorProps {
  onSelectAction: (action: 'add' | 'delete' | 'modify') => void;
  hasTasks: boolean;
}

export function ActionSelector({ onSelectAction, hasTasks }: ActionSelectorProps) {
  // If no tasks exist, only show Add Task option
  if (!hasTasks) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-gray-900 mb-6 text-center">Get started by adding your first task</h2>
        
        <button
          onClick={() => onSelectAction('add')}
          className="w-full flex flex-col items-center gap-4 p-8 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <Plus className="w-8 h-8 text-blue-600 group-hover:text-white" />
          </div>
          <span className="text-gray-700 group-hover:text-blue-600">Add Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-gray-900 mb-6 text-center">What would you like to do?</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onSelectAction('add')}
          className="flex flex-col items-center gap-4 p-8 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <Plus className="w-8 h-8 text-blue-600 group-hover:text-white" />
          </div>
          <span className="text-gray-700 group-hover:text-blue-600">Add Task</span>
        </button>

        <button
          onClick={() => onSelectAction('modify')}
          className="flex flex-col items-center gap-4 p-8 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
            <Edit className="w-8 h-8 text-green-600 group-hover:text-white" />
          </div>
          <span className="text-gray-700 group-hover:text-green-600">Modify Task</span>
        </button>

        <button
          onClick={() => onSelectAction('delete')}
          className="flex flex-col items-center gap-4 p-8 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all group"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
            <Trash2 className="w-8 h-8 text-red-600 group-hover:text-white" />
          </div>
          <span className="text-gray-700 group-hover:text-red-600">Delete Task</span>
        </button>
      </div>
    </div>
  );
}