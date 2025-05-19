const tourModel = require('../models/tours.model');

const createTour = async (req, res) => {
    try {
        const { title, description, location, price, duration } = req.body;
        if (!title || !description || !location || !price || !duration) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const tour = await tourModel.createTour({
            title,
            description,
            location,
            price,
            duration,
            created_at: new Date(),
            updated_at: new Date()
        });
        
        res.status(201).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTourById = async (req, res) => {
    try {
        const { tour_id } = req.params;
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        
        const tour = await tourModel.getTourById(tour_id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTour = async (req, res) => {
    try {
        const { tour_id } = req.params;
        const { title, description, location, price, duration } = req.body;
        
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        
        const updatedTour = await tourModel.updateTour(tour_id, {
            title,
            description,
            location,
            price,
            duration,
            updated_at: new Date()
        });
        
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTour = async (req, res) => {
    try {
        const { tour_id } = req.params;
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        
        await tourModel.deleteTour(tour_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTours = async (req, res) => {
    try {
        const tours = await tourModel.getAllTours();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToursReview = async (req, res) => {
    try {
        const { tour_id } = req.params;
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        const reviews = await tourModel.getToursReview(tour_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const countToursReviewByRating = async (req, res) => {
    try {
        const { tour_id, rating } = req.params;
        if (!tour_id || !rating) {
            return res.status(400).json({ message: 'Tour ID and rating are required' });
        }
        const count = await tourModel.countToursReviewByRating(tour_id, rating);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAverageToursReview = async (req, res) => {
    try {
        const { tour_id } = req.params;
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        const averageRating = await tourModel.getAverageToursReview(tour_id);
        res.status(200).json(averageRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTourDetails = async (req, res) => {
    try {
        const { tour_id } = req.params;
        if (!tour_id) {
            return res.status(400).json({ message: 'Tour ID is required' });
        }
        
        const tour = await tourModel.getToursInforAndMedia(tour_id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchTours = async (req, res) => {
    try {
        const filters = {
            title: req.query.title,
            location: req.query.location,
            min_price: req.query.min_price ? parseFloat(req.query.min_price) : null,
            max_price: req.query.max_price ? parseFloat(req.query.max_price) : null,
            duration: req.query.duration ? parseInt(req.query.duration) : null,
            rating: req.query.rating ? parseFloat(req.query.rating) : null
        };

        const tours = await tourModel.searchTours(filters);
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecommendedTours = async (req, res) => {
    try {
        const tours = await tourModel.getRecommendedTours();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToursByAverageRating = async (req, res) => {
    try {
        const { average_rating } = req.params;
        const tours = await tourModel.getToursByAverageRating(average_rating);
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTour,
    getTourById,
    updateTour,
    deleteTour,
    getAllTours,
    getTourDetails,
    searchTours,
    getRecommendedTours,
    getToursByAverageRating,
    getToursReview,
    countToursReviewByRating,
    getAverageToursReview
};
