const express = require('express');
const router = express.Router();
const toursController = require('../controllers/tours.controller');

router.post('/', toursController.createTour);
router.get('/', toursController.getAllTours);
router.get('/:tour_id', toursController.getTourById);
router.put('/:tour_id', toursController.updateTour);
router.delete('/:tour_id', toursController.deleteTour);
router.get('/recommended', toursController.getRecommendedTours);
router.get('/search', toursController.searchTours);
router.get('/:tour_id/detail', toursController.getTourDetails);
router.get('/average_rating/:average_rating', toursController.getToursByAverageRating);
router.get('/:tour_id/reviews', toursController.getToursReview);
router.get('/:tour_id/reviews/count/:rating', toursController.countToursReviewByRating);
router.get('/:tour_id/reviews/average', toursController.getAverageToursReview);


module.exports = router;            
