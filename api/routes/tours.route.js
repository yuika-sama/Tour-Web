const express = require('express');
const router = express.Router();
const {createTour, getTourById, updateTour, deleteTour, getAllTours, searchTourByTitle, searchTourByLocation, searchTourByPrice, searchTourByDuration} = require('../controllers/tours.controller');

router.post('/', createTour);

router.get('/:id', getTourById);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

router.get('/', getAllTours);

router.get('/search/title/:title', searchTourByTitle);

router.get('/search/location/:location', searchTourByLocation);

router.get('/search/price/:price', searchTourByPrice);

router.get('/search/duration/:duration', searchTourByDuration);
module.exports = router;            
