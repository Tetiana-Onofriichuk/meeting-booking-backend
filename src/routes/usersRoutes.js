import { Router } from 'express';
import { celebrate } from 'celebrate';

import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

import { createUserSchema, updateUserSchema, userIdSchema } from '../validations/userValidation.js';

const router = Router();

router.post('/users', celebrate(createUserSchema, { abortEarly: false }), createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', celebrate(userIdSchema), getUserById);
router.patch(
  '/users/:id',
  celebrate(
    {
      ...userIdSchema,
      ...updateUserSchema,
    },
    { abortEarly: false },
  ),
  updateUser,
);
router.delete('/users/:id', celebrate(userIdSchema), deleteUser);

export default router;
