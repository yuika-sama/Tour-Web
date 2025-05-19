const pool = require('../config/db');

const Review = {
    review_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Number,
        allowNull: false
    },
    tour_id: {
        type: Number,
        allowNull: false
    },
    rating: {
        type: Number,
        allowNull: false
    },
    comment: {
        type: String,
        allowNull: true
    },
    review_date: {
        type: Date,
        allowNull: false
    }
};

module.exports = {
    createReview: async (reviewData) => {
        const { user_id, tour_id, rating, comment, review_date } = reviewData;
        reviewData.created_at = new Date();
        reviewData.updated_at = new Date();
        const query = `INSERT INTO reviews (user_id, tour_id, rating, comment, review_date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await pool.query(query, [user_id, tour_id, rating, comment, review_date, reviewData.created_at, reviewData.updated_at]);
        return result.rows[0];
    },
    getReviewById: async (reviewId) => {
        const query = `SELECT * FROM reviews WHERE review_id = $1`;
        const result = await pool.query(query, [reviewId]);
        return result.rows[0];
    },
    updateReview: async (reviewId, reviewData) => {
        const { user_id, tour_id, rating, comment, review_date } = reviewData;
        reviewData.updated_at = new Date();
        const query = `UPDATE reviews SET user_id = $1, tour_id = $2, rating = $3, comment = $4, review_date = $5, updated_at = $6 WHERE review_id = $7`;
        const result = await pool.query(query, [user_id, tour_id, rating, comment, review_date, reviewData.updated_at, reviewId]);
        return result.rows[0];
    },
    deleteReview: async (reviewId) => {
        const query = `DELETE FROM reviews WHERE review_id = $1`;
        const result = await pool.query(query, [reviewId]);
        return result.rows[0];
    },
    getAllReviews: async () => {
        const query = `SELECT * FROM reviews`;  
        const result = await pool.query(query);
        return result.rows;
    },
    getReviewsByTourId: async (tourId) => {
        const query = `SELECT * FROM reviews WHERE tour_id = $1`;
        const result = await pool.query(query, [tourId]);
        return result.rows;
    },
    getReviewsByUserId: async (userId) => {
        const query = `SELECT * FROM reviews WHERE user_id = $1`;
        const result = await pool.query(query, [userId]);
        return result.rows;
    },
    getAverageRatingByTourId: async (tourId) => {
        const query = `SELECT AVG(rating) FROM reviews WHERE tour_id = $1`;
        const result = await pool.query(query, [tourId]);
        return result.rows[0].avg;
    },
    countRatingByTourId: async (tourId) => {
        const query = `SELECT COUNT(rating) FROM reviews WHERE tour_id = $1`;
        const result = await pool.query(query, [tourId]);
        return result.rows[0].count;
    },   
    getBestRating: async () => {
        const query = `SELECT * FROM reviews ORDER BY rating DESC LIMIT 10`;
        const result = await pool.query(query);
        return result.rows[0];
    },       
};