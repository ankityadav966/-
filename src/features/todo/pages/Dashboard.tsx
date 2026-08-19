import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Search, Trash2, Check, Clock, CheckSquare } from 'lucide-react';

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterCompleted, setFilterCompleted] = useState<string>('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { priority: 'MEDIUM' }
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://api.durgagenerator.com/api';

  const { data, isLoading } = useQuery({
    queryKey: ['todos', search, filterPriority, filterCompleted],
    queryFn: async () => {
      let params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterPriority) params.append('priority', filterPriority);
      if (filterCompleted) params.append('completed', filterCompleted);
      
      const res = await axios.get(`${VITE_API_URL}/todos?${params.toString()}`);
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newTodo: TodoFormValues) => {
      const data: any = { ...newTodo };
      if (!data.dueDate) { 
        data.dueDate = undefined as any; 
      } else {
        data.dueDate = new Date(data.dueDate).toISOString();
      }
      
      const res = await axios.post(`${VITE_API_URL}/todos`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.patch(`${VITE_API_URL}/todos/${id}/toggle`, {});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${VITE_API_URL}/todos/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const onSubmit = (data: TodoFormValues) => {
    createMutation.mutate(data);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'LOW': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const todos: Todo[] = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Create Todo Form */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add Public Task</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                {...register('title')}
                placeholder="Task title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <textarea
                {...register('description')}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  {...register('priority')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="date"
                  {...register('dueDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {createMutation.isPending ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
              
              <select
                value={filterCompleted}
                onChange={(e) => setFilterCompleted(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading tasks...</div>
            ) : todos.length === 0 ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <CheckSquare className="mx-auto h-12 w-12 text-gray-400 mb-4 opacity-50" />
                <p>No tasks found. Create your first task to get started.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todos.map((todo) => (
                  <li key={todo.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${todo.completed ? 'opacity-60' : ''}`}>
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleMutation.mutate(todo.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5
                          ${todo.completed 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-300 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400'}`}
                      >
                        {todo.completed && <Check className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-lg font-medium text-gray-900 dark:text-white truncate ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {todo.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                            {todo.priority}
                          </span>
                          {todo.dueDate && (
                            <span className="flex items-center text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this task?')) {
                            deleteMutation.mutate(todo.id);
                          }
                        }}
                        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Delete task"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
