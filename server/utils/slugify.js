const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars
    .replace(/[\s_-]+/g, '-')   // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
};

module.exports = slugify;
