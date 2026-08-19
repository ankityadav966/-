import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import TodoLayout from './features/todo/components/TodoLayout';
import Dashboard from './features/todo/pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
