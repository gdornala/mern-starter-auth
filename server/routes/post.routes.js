import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

router.route('/auth/signup').post(AuthController.signupHandler);

router.route('/auth/login').post(AuthController.loginHandler);

export default router;
