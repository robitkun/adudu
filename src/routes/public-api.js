import express from 'express';
import userController from '../controller/userController.js';
import forumController from '../controller/forumController.js';
import auth from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';
import commentController from '../controller/commentController.js';
import eventController from '../controller/eventController.js';
import upload from '../middleware/uploadMiddleware.js';
export const router = express.Router();

// USER
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users', auth, userController.getAllUser);
router.get('/users/me', auth, userController.getMe);
router.get('/users/:id', auth, userController.getUserById);

// FORUM
router.post('/forums/create', auth, forumController.createForum);
router.get('/forums', forumController.getAllForum);
router.get('/forums/:id', forumController.getForumById);
router.delete('/forums/delete/:id', auth, forumController.deleteForum);
router.put('/forums/edit/:id', auth, forumController.editForum);

// COMMENT
router.post('/comment/create', auth, commentController.createComment);
router.delete('/comment/delete/:id', auth, commentController.deleteComment);

// EVENT
router.post(
  '/event/upload',
  auth,
  adminOnly,
  upload.single('image'),
  eventController.createEvent
);
router.put(
  '/event/edit/:id',
  auth,
  adminOnly,
  upload.single('image'),
  eventController.editEvent
);
router.get('/event', eventController.getAllEvent);
router.delete(
  '/event/delete/:id',
  auth,
  adminOnly,
  eventController.deleteEvent
);
router.get('/event/:id', eventController.getDetailEvent);
