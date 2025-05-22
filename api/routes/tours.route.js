const express = require('express');
const router = express.Router();
const { createTour, getAllTours, getTourById, updateTour, deleteTour, getRecommendedTours, searchTours, getTourDetails, getToursByAverageRating, getToursReview, countToursReview, countToursReviewByRating, getAverageToursReview } = require('../controllers/tours.controller');

router.get('/recommended', getRecommendedTours);  
router.get('/search', searchTours);
router.get('/:tour_id/details', getTourDetails);
router.get('/average_rating/:average_rating', getToursByAverageRating);
router.get('/:tour_id/reviews', getToursReview);
router.get('/:tour_id/reviews/count', countToursReview);
router.get('/:tour_id/reviews/count/:rating', countToursReviewByRating);
router.get('/:tour_id/reviews/average', getAverageToursReview);
router.get('/:tour_id', getTourById);
router.put('/:tour_id', updateTour);
router.delete('/:tour_id', deleteTour);
router.get('/', getAllTours);
router.post('/', createTour);

module.exports = router;            
