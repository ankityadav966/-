import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import TodoLayout from './features/todo/components/TodoLayout';
import Login from './features/todo/pages/Login';
import Register from './features/todo/pages/Register';
import Dashboard from './features/todo/pages/Dashboard';
import { AuthProvider } from './features/todo/contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
