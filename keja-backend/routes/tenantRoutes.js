const express = require('express');
const { houseFound, resetSearch } = require('../controllers/tenantController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/house-found', protect, authorize('tenant'), houseFound);
router.post('/reset-search', protect, authorize('tenant'), resetSearch);

module.exports = router;
