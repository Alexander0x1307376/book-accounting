import express from 'express';
import userController from '../features/user/userController';
import categoryController from '../features/category/categoryController';
import bookController from '../features/book/bookController';
import authorController from '../features/author/authorController';
import authorValidationRules from '../features/author/authorValidator';
import validatorMiddleware from '../middlewares/validatorMiddleware'
import authController from '../features/auth/authController';
import authMiddleware from '../features/auth/authMiddleware';

const router = express.Router();


router.post('/registration', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refreshToken);



router.get('/users/:page', userController.list);
router.post('/user/create', userController.create);
router.post('/user/:id/edit', userController.edit);
router.post('/user/:id/delete', userController.remove);
router.get('/user/:id', userController.show);



router.get('/categories/root', categoryController.root);
router.get('/categories/search', categoryController.search);
router.get('/categories/:page', categoryController.list);
router.post('/category/create', categoryController.create);
router.post('/category/:id/edit', categoryController.edit);
router.delete('/category/:id/delete', categoryController.remove);
router.get('/category/:id/books', categoryController.categoryWithBooks);
router.get('/category/:id/children', categoryController.categoryChildren);
router.get('/category/:id', categoryController.show);



router.get('/books/:page', bookController.list);
router.post('/book/create', bookController.create);
router.post('/book/:id/edit', bookController.edit);
router.delete('/book/:id/delete', bookController.remove);
router.get('/book/:id', bookController.show);



router.post('/author/create', 
  authorValidationRules(), 
  validatorMiddleware, 
  authMiddleware,
  authorController.create
);
router.post('/author/:id/edit', 
  authorValidationRules(), 
  validatorMiddleware, 
  authMiddleware,
  authorController.edit
);
router.delete('/author/:id/delete', 
  authMiddleware,
  authorController.remove
);
router.get('/author/:id',
  authMiddleware, 
  authorController.show
);
router.get('/authors/search', 
  authMiddleware,
  authorController.search
);
router.get('/authors/:page', 
  authMiddleware,
  authorController.list
);



export default router;