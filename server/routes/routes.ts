import express from 'express';
import userController from '../features/user/userController';
import categoryController from '../features/category/categoryController';
import bookController from '../features/book/bookController';
import authorController from '../features/author/authorController';
import authorValidationRules from '../features/author/authorValidator';
import validatorMiddleware from '../middlewares/validatorMiddleware'
import authController from '../features/auth/authController';
import authMiddleware from '../features/auth/authMiddleware';
import upload from '../features/fileUploader/uploadMiddleware';
import imageController from '../features/image/imageController';


const router = express.Router();



router.post('/upload-image', upload.single('image'), imageController.upload);



router.post('/registration', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refreshToken);



router.get('/users/:page', authMiddleware, userController.list);
router.post('/user/create', authMiddleware, userController.create);
router.put('/user/:id/edit', authMiddleware, userController.edit);
router.delete('/user/:id/delete', authMiddleware, userController.remove);
router.get('/user/:id', authMiddleware, userController.show);


// #region Категории
router.get('/categories/root', 
  authMiddleware,
  categoryController.root
);
router.get('/categories/search', 
  authMiddleware, 
  categoryController.search
);
router.get('/categories/:page', 
  authMiddleware,
  categoryController.list
);
router.post('/category/create', 
  authMiddleware,
  categoryController.create
);
router.put('/category/:id/edit', 
  authMiddleware,
  categoryController.edit
);
router.delete('/category/:id/delete', 
  authMiddleware,
  categoryController.remove
);
router.get('/category/:id/books', 
  authMiddleware,
  categoryController.categoryWithBooks
);
router.get('/category/:id/children', 
  authMiddleware,
  categoryController.categoryChildren
);
router.get('/category/:id', 
  authMiddleware,
  categoryController.show
);
// #endregion


// #region Книги
router.get('/books/:page', 
  bookController.list,
  authMiddleware,
);
router.post('/book/create', 
  upload.single('image'),
  authMiddleware, 
  bookController.create
);
router.post('/book/:id/edit', 
  authMiddleware, 
  bookController.edit
);
router.delete('/book/:id/delete', 
  authMiddleware, 
  bookController.remove
);
router.get('/book/:id', 
  authMiddleware, 
  bookController.show
);
// #endregion


// #region Акторы
router.post('/author/create', 
  authorValidationRules(), 
  validatorMiddleware, 
  authMiddleware,
  authorController.create
);
router.put('/author/:id/edit', 
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
// #endregion


export default router;