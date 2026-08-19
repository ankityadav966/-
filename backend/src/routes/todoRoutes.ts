import { Router } from 'express';
import { getTodos, getTodoById, createTodo, updateTodo, toggleTodo, deleteTodo } from '../controllers/todoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;
