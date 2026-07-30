const Blog = require('../models/Blog');
const slugify = require('../utils/slugify');

// Helper to generate a unique slug
const generateUniqueSlug = async (title, currentBlogId = null) => {
  let baseSlug = slugify(title);
  if (!baseSlug) baseSlug = 'blog-post';

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Blog.findOne({ slug });
    if (!existing || (currentBlogId && existing._id.toString() === currentBlogId.toString())) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// @route   GET /api/blogs
// @desc    Get published blogs with pagination and tag filtering
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Filter by published status unless explicitly requested by admin
    if (req.query.all !== 'true') {
      query.published = true;
    }

    // Filter by tag if specified
    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      page,
      pages: Math.ceil(total / limit) || 1,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching blogs' });
  }
};

// @route   GET /api/blogs/:slug
// @desc    Get single blog post by slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching blog post' });
  }
};

// @route   POST /api/blogs
// @desc    Create a new blog post with auto-generated slug
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, content, thumbnail, tags, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const slug = await generateUniqueSlug(title);

    const blog = new Blog({
      title,
      slug,
      content,
      thumbnail: thumbnail || '',
      tags: Array.isArray(tags) ? tags : [],
      published: Boolean(published)
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Invalid blog data' });
  }
};

// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const { title, content, thumbnail, tags, published } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (title && title !== blog.title) {
      blog.title = title;
      blog.slug = await generateUniqueSlug(title, blog._id);
    }

    if (content !== undefined) blog.content = content;
    if (thumbnail !== undefined) blog.thumbnail = thumbnail;
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [];
    if (published !== undefined) blog.published = Boolean(published);

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(400).json({ message: error.message || 'Failed to update blog post' });
  }
};

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog post removed successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).json({ message: error.message || 'Failed to delete blog post' });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};
