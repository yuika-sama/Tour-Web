const express = require('express');
const router = express.Router();
const { createTourMedia, getTourMediaById, updateTourMedia, deleteTourMedia, getAllTourMedia, getTourMediaByTourId, getTourMediaByUserId } = require('../controllers/tour_media.controller');

router.get('/', getAllTourMedia);
router.get('/tour/:id', getTourMediaByTourId);
router.get('/:id', getTourMediaById);

// POST route
router.post('/', createTourMedia);

// PUT route
router.put('/:id', updateTourMedia);

// DELETE route
router.delete('/:id', deleteTourMedia);
module.exports = router;    