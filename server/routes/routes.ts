import express from 'express';
import userController from '../features/user/userController';
import categoryController from '../features/category/categoryController';
import bookController from '../features/book/bookController';
import authorController from '../features/author/authorController';
import authorValidationRules from '../features/author/authorValidator';
import validatorMiddleware from '../validators/validatorMiddleware'

const router = express.Router();

// router.get('/users/:page', userController.list);
// router.post('/user/create', userController.create);
// router.post('/user/:id/edit', userController.edit);
// router.post('/user/:id/delete', userController.remove);
// router.get('/user/:id', userController.show);

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

// router.post('/author/:id/edit', (req, res) => {
//   res.status(500).json({ message: 'Намеренная ошибка!' })
//   // res.status(200).json({ message: 'Успех!' })
// });
router.post('/author/create', authorValidationRules(), validatorMiddleware, authorController.create);
router.post('/author/:id/edit', authorValidationRules(), validatorMiddleware, authorController.edit);
router.delete('/author/:id/delete', authorController.remove);
router.get('/author/:id', authorController.show);
router.get('/authors/search', authorController.search);
router.get('/authors/:page', authorController.list);

export default router;