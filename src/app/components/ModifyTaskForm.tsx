import { useState } from 'react';
import { Calendar, Clock, Save, ArrowLeft } from 'lucide-react';

interface ModifyTaskFormProps {
  taskId: string;
  currentTaskName: string;
  currentDateTime?: string;
  onSubmit: (taskId: string, taskName: string, dateTime: string) => void;
  onBack: () => void;
}

export function ModifyTaskForm({ 
  taskId, 
  currentTaskName, 
  currentDateTime, 
  onSubmit, 
  onBack 
}: ModifyTaskFormProps) {
  const getDateFromISO = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const getTimeFromISO = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5);
  };

  const [taskName, setTaskName] = useState(currentTaskName);
  const [dateValue, setDateValue] = useState(getDateFromISO(currentDateTime));
  const [timeValue, setTimeValue] = useState(getTimeFromISO(currentDateTime));
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      setError('Please enter a task name');
      return;
    }
    
    if (!dateValue) {
      setError('Please select a date');
      return;
    }
    
    if (!timeValue) {
      setError('Please select a time');
      return;
    }

    const selectedDateTime = new Date(`${dateValue}T${timeValue}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      setError('Please select a future date and time');
      return;
    }

    const dateTime = selectedDateTime.toISOString();
    onSubmit(taskId, taskName.trim(), dateTime);
    
    // Reset form
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-gray-900 mb-6">Modify Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="taskName" className="block mb-2 text-gray-700">
            Task Name
          </label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              setError('');
            }}
            placeholder="Enter task name..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-2 text-gray-700">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="date"
              type="date"
              value={dateValue}
              onChange={(e) => {
                setDateValue(e.target.value);
                setError('');
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="time" className="block mb-2 text-gray-700">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="time"
              type="time"
              value={timeValue}
              onChange={(e) => {
                setTimeValue(e.target.value);
                setError('');
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Update Task
        </button>
      </form>
    </div>
  );
}
