const express = require('express');
const { stkPush, verifyMpesa } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/stkpush', protect, stkPush);
router.post('/verify', protect, verifyMpesa);

module.exports = router;
