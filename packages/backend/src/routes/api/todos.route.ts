import { Router } from 'express';

import { idValidator, isExist } from '../../middlewares/common.middlewares';
import { iTodoMiddleware } from '../../middlewares/todo.middleware';
import todoController from '../../controllers/todo.controller';
import { responseHandler } from '../../middlewares/response.middleware';
import { tryCatch } from '../../middlewares/ty_catch.milleware';

const todosRouter: Router = Router();

todosRouter.get(
  '/todos',
  tryCatch(responseHandler(todoController.getAllTodo.bind(todoController)))
);
todosRouter.post(
  '/todos',
  iTodoMiddleware.todoValidate,
  tryCatch(responseHandler(todoController.addTodo.bind(todoController)))
);
todosRouter.use('/todos/:id', idValidator, isExist);
todosRouter.delete(
  '/todos/:id',
  tryCatch(responseHandler(todoController.deleteTodoById.bind(todoController)))
);
todosRouter.get(
  'todos/:id',
  tryCatch(responseHandler(todoController.findTodoById.bind(todoController)))
);
todosRouter.put(
  '/todos/:id',
  iTodoMiddleware.todoValidate,
  tryCatch(responseHandler(todoController.setTodoById.bind(todoController)))
);
export default todosRouter;
