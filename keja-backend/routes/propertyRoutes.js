const express = require('express');
const { getProperties, getPropertyById, createProperty, deleteProperty } = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, authorize('landlord'), createProperty);
router.delete('/:id', protect, authorize('landlord'), deleteProperty);

module.exports = router;
