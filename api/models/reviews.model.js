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
        const query = `INSERT INTO reviews (user_id, tour_id, rating, comment, review_date) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [user_id, tour_id, rating, comment, review_date]);
        return result[0];
    },
    getReviewById: async (reviewId) => {
        const query = `SELECT * FROM reviews WHERE review_id = ?`;
        const [result] = await pool.query(query, [reviewId]);
        return result[0];
    },
    updateReview: async (reviewId, reviewData) => {
        const { user_id, tour_id, rating, comment, review_date } = reviewData;
        const query = `UPDATE reviews SET user_id = ?, tour_id = ?, rating = ?, comment = ?, review_date = ? WHERE review_id = ?`;
        const [result] = await pool.query(query, [user_id, tour_id, rating, comment, review_date, reviewId]);
        return result[0];
    },
    deleteReview: async (reviewId) => {
        const query = `DELETE FROM reviews WHERE review_id = ?`;
        const [result] = await pool.query(query, [reviewId]);
        return result[0];
    },
    getAllReviews: async () => {
        const query = `SELECT * FROM reviews`;  
        const [result] = await pool.query(query);
        return result;
    },
    getReviewsByTourId: async (tourId) => {
        const query = `SELECT * FROM reviews WHERE tour_id = ?`;
        const [result] = await pool.query(query, [tourId]);
        return result;
    },
    getReviewsByUserId: async (userId) => {
        const query = `SELECT * FROM reviews WHERE user_id = ?`;
        const [result] = await pool.query(query, [userId]);
        return result;
    },
    getAverageRatingByTourId: async (tourId) => {
        const query = `SELECT AVG(rating) FROM reviews WHERE tour_id = ?`;
        const [result] = await pool.query(query, [tourId]);
        return result[0].avg;
    },
    countRatingByTourId: async (tourId) => {
        const query = `SELECT COUNT(rating) FROM reviews WHERE tour_id = ?`;
        const [result] = await pool.query(query, [tourId]);
        return result[0].count;
    },   
    getBestRating: async () => {
        const query = `SELECT * FROM reviews ORDER BY rating DESC LIMIT 10`;
        const [result] = await pool.query(query);
        return result[0];
    },       
};