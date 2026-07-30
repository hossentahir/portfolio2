const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ''
    },
    liveLink: {
      type: String,
      trim: true,
      default: ''
    },
    githubLink: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Index title for text search and sorting
projectSchema.index({ title: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
