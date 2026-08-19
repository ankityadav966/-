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
          
          {/* Primary Route: /ankityadav */}
          <Route path="/ankityadav" element={<TodoLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Fallback routes */}
          <Route path="/todos" element={<TodoLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ankityadav" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
