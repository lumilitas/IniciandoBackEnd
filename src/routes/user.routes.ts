import { response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);

    return response.json({ ok: true });
  }
);

export default usersRouter;