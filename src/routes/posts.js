import { Router } from "express";
import * as postsController from '../controllers/postsController.js';

const router = Router();

router.post('/', postsController.createPost);
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.get('/:id', postsController.getPostById);
router.get('/', postsController.getAllPosts);

export default router;