import { Router, Request, Response } from 'express';
import { CreateTaskController } from './app/controllers/CreateTaskController';
import { CreateUserController } from './app/controllers/CreateUserController';
import { FindAllTasksController } from './app/controllers/FindAllTasksController';
import { UpdateTaskController } from './app/controllers/UpdateTaskController';
import { SessionController } from './app/controllers/SessionController';
import { UpdateUserController } from './app/controllers/UpdateUserController';

import authMiddleware from "./app/middlewares/auth";
import { GetAllTasksController } from './app/controllers/GetAllTasksController';
import { DeleteTaskController } from './app/controllers/DeleteTaskController';

const routes = Router();

const sessionController = new SessionController;

const createUserController = new CreateUserController;
const updateUserController = new UpdateUserController;

const createTaskController = new CreateTaskController;
const findAllTasksController = new FindAllTasksController;
const updateTaskController = new UpdateTaskController;
const getAllTasksController = new GetAllTasksController;
const deleteTaskController = new DeleteTaskController;

routes.post('/user', createUserController.handle);
routes.post('/session', sessionController.handle);

// essa rota so existe pq to em ambiente de testes, ela so existiria num dashboard e com validação de adm
routes.get('/all_tasks', getAllTasksController.handle)

// todas as rotas a partir daqui terão esse middleware
routes.use(authMiddleware);

routes.put('/user', updateUserController.handle);

routes.get('/task', findAllTasksController.handle);
routes.post('/task', createTaskController.handle);
routes.put('/task/:id', updateTaskController.handle);
routes.delete('/task/:id', deleteTaskController.handle);

export default routes;
