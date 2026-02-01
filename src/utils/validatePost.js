export default function validatePost(post) {
  if (!post) return false;

  const props = ['title', 'content', 'category', 'tags'];

  return props.every(prop => {
    const value = post[prop];

    if (!(prop in post)) return false;

    if (value === null || value === undefined) return false;

    // empty strings
    if (typeof value === 'string' && value.trim() === '') return false;

    // tags array
    if (prop === 'tags' && (!Array.isArray(value) || value.length === 0)) return false;

    return true;
  });
}