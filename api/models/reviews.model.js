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
        const [result] = await pool.query('INSERT INTO reviews SET ?', [reviewData]);
        return result.insertId;
    },  
    getReviewById: async (reviewId) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE review_id = ?', [reviewId]);
        return result[0];
    },
    updateReview: async (reviewId, reviewData) => {
        const [result] = await pool.query('UPDATE reviews SET ? WHERE review_id = ?', [reviewData, reviewId]);
        return result.affectedRows;
    },
    deleteReview: async (reviewId) => {
        const [result] = await pool.query('DELETE FROM reviews WHERE review_id = ?', [reviewId]);
        return result.affectedRows;
    },
    getAllReviews: async () => {
        const [result] = await pool.query('SELECT * FROM reviews');
        return result;
    },
    getReviewsByUserId: async (userId) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE user_id = ?', [userId]);
        return result;
    },
    getReviewsByTourId: async (tourId) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE tour_id = ?', [tourId]);
        return result;
    },
    getReviewsByRating: async (rating) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE rating = ?', [rating]);
        return result;
    },
    getReviewsByComment: async (comment) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE comment = ?', [comment]);
        return result;
    },
    getReviewsByReviewDate: async (reviewDate) => {
        const [result] = await pool.query('SELECT * FROM reviews WHERE review_date = ?', [reviewDate]);
        return result;
    }
};