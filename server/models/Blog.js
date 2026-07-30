const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    thumbnail: {
      type: String,
      trim: true,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    },
    published: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying published posts sorted by date
blogSchema.index({ published: 1, createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
