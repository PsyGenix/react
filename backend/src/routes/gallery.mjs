import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // For file deletion
import Image from '../models/Image.mjs';

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public/uploads');
    console.log('Multer saving to:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log('Multer filename:', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Upload image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    console.log('Received upload:', { title, category, filename: req.file?.filename });
    const image = new Image({
      title,
      category,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error('Fetch images error:', err.message);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    console.log('Deleting image with ID:', imageId);
    const image = await Image.findById(imageId);
    if (!image) {
      console.log('Image not found:', imageId);
      return res.status(404).json({ error: 'Image not found' });
    }
    // Delete file from filesystem
    const filePath = path.join(process.cwd(), 'public', image.path);
    console.log('Deleting file at:', filePath);
    await fs.unlink(filePath).catch(err => {
      console.error('File deletion error:', err.message);
      // Continue with database deletion even if file deletion fails
    });
    // Delete from database
    await Image.findByIdAndDelete(imageId);
    console.log('Image deleted from database:', imageId);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Image deletion failed' });
  }
});

export default router;
