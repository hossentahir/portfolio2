const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching projects' });
  }
};

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(500).json({ message: error.message || 'Server error fetching project' });
  }
};

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, imageUrl, liveLink, githubLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const project = new Project({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      imageUrl: imageUrl || '',
      liveLink: liveLink || '',
      githubLink: githubLink || ''
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Invalid project data' });
  }
};

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, imageUrl, liveLink, githubLink } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title !== undefined ? title : project.title;
    project.description = description !== undefined ? description : project.description;
    project.techStack = Array.isArray(techStack) ? techStack : project.techStack;
    project.imageUrl = imageUrl !== undefined ? imageUrl : project.imageUrl;
    project.liveLink = liveLink !== undefined ? liveLink : project.liveLink;
    project.githubLink = githubLink !== undefined ? githubLink : project.githubLink;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(400).json({ message: error.message || 'Failed to update project' });
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(500).json({ message: error.message || 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
