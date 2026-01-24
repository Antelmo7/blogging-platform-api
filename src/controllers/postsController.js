export async function createPost(req, res) {
  try {
    const { title, content, category, tags } = req.body;

    res.status(201).json({
      title,
      content,
      category,
      tags
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving post' });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    res.status(200).json({
      id: parseInt(id),
      title,
      content,
      category,
      tags
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
}

export async function deletePost(req, res) {
  try {
    const { id } = req.params;

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

    res.status(200).json({
      message: `Post with ID: ${id}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
}

export async function getAllPosts(req, res) {
  try {
    const { tag } = req.query;

    res.status(200).json({
      message: `All posts`,
      ...(tag && { tag })
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
}