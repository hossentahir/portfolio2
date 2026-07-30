// @route   POST /api/upload
// @desc    Upload an image file and return the URL
// @access  Private/Admin
const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Determine the image URL based on Cloudinary vs Local Storage
    let imageUrl = req.file.path;

    // If local disk storage was used instead of Cloudinary, build relative/full HTTP URL
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: imageUrl,
      public_id: req.file.filename || req.file.public_id || ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
};

module.exports = { uploadImage };
