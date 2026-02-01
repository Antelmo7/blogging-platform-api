import * as postsService from '../services/postsService.js';
import validatePost from '../utils/validatePost.js';

export async function createPost(req, res) {
  try {
    const { title, content, category, tags } = req.body

    if (!validatePost({
      title,
      content,
      category,
      tags
    })) {
      return res.status(400).json({ message: 'Fields missing' });
    }

    const post = await postsService.createPost({
      title,
      content,
      category,
      tags
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error saving post' });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    if (!validatePost({
      title,
      content,
      category,
      tags
    })) {
      return res.status(400).json({ message: 'Fields missing' });
    }

    const post = await postsService.updatePost({
      id,
      title,
      content,
      category,
      tags
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
}

export async function deletePost(req, res) {
  try {
    const { id } = req.params;
    await postsService.deletePost({ id })

    res.status(204).json({
      message: `Post with ID: ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById({ id });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
}

export async function getAllPosts(req, res) {
  try {
    const { term } = req.query;
    const posts = await postsService.getPosts({
      term
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
}