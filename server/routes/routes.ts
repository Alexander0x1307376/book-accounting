import express from 'express';
import * as userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import bookController from '../controllers/bookController';
import authorController from '../controllers/authorController';
import authorValidationRules from '../validators/rules/authorRules';
import validatorMiddleware from '../validators/validatorMiddleware'

const router = express.Router();

router.get('/users/:page', userController.list);
router.post('/user/create', userController.create);
router.post('/user/:id/edit', userController.edit);
router.post('/user/:id/delete', userController.remove);
router.get('/user/:id', userController.show);

router.get('/categories/:page', categoryController.list);
router.post('/category/create', categoryController.create);
router.post('/category/:id/edit', categoryController.edit);
router.post('/category/:id/delete', categoryController.remove);
router.get('/category/:id', categoryController.show);

router.get('/books/:page', bookController.list);
router.post('/book/create', bookController.create);
router.post('/book/:id/edit', bookController.edit);
router.post('/book/:id/delete', bookController.remove);
router.get('/book/:id', bookController.show);

router.get('/authors/:page', authorController.list);
router.post('/author/create', authorValidationRules(), validatorMiddleware, authorController.create);
router.post('/author/:id/edit', authorValidationRules(), validatorMiddleware, authorController.edit);
router.delete('/author/:id/delete', authorController.remove);
router.get('/author/:id', authorController.show);

export default router;