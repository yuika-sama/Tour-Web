const express = require('express');
const router = express.Router();
const { createTourMedia, getTourMediaById, updateTourMedia, deleteTourMedia, getAllTourMedia } = require('../controllers/tour_media.controller');

router.post('/', createTourMedia);

router.get('/:id', getTourMediaById);

router.put('/:id', updateTourMedia);

router.delete('/:id', deleteTourMedia);

router.get('/', getAllTourMedia);

module.exports = router;    