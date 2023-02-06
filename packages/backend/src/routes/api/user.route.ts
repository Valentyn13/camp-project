import { Router } from 'express';
import userController from '../../controllers/user.controllers';
import { responseHandler } from '../../middlewares/response.middleware';
import { tryCatch } from '../../middlewares/ty_catch.milleware';
import { checkAuth } from '../../middlewares/checkAuth.middleware';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  '/register',
  tryCatch(responseHandler(userController.registerUser.bind(userController)))
);
router.post('/login', tryCatch(responseHandler(userController.loginUser.bind(userController))));
router.post('/logout', tryCatch(responseHandler(userController.logoutUser.bind(userController))));
// router.get('/activate/:link');
router.get(
  '/refresh',
  tryCatch(responseHandler(userController.updateRefreshToken.bind(userController)))
);
router.get(
  '/users',
  checkAuth,
  tryCatch(responseHandler(userController.getAllUsers.bind(userController)))
);
export default router;
