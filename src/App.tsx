import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import TodoLayout from './features/todo/components/TodoLayout';
import Dashboard from './features/todo/pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Support /todos */}
          <Route path="/todos" element={<TodoLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Support /ankit & /ankit/yadav */}
          <Route path="/ankit" element={<TodoLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="yadav" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
