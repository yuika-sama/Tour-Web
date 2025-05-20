const pool = require('../config/db');

const Tour = {
    tour_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: String,
        allowNull: false
    },
    description: {
        type: String,
        allowNull: false
    },
    location: {
        type: String,
        allowNull: false
    },
    price: {
        type: Number,
        allowNull: false
    },
    duration: {
        type: Number,
        allowNull: false
    },
    created_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    },
    updated_at: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now
    }
};


module.exports = {
    createTour: async(tour) => {
        const query = `INSERT INTO tours (title, description, location, price, duration, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [tour.title, tour.description, tour.location, tour.price, tour.duration, tour.created_at, tour.updated_at]);
        return result[0];
    },
    getTourById: async(tour_id) => {
        try {
            const query = `SELECT * FROM tours WHERE tour_id = ?`;
            const [result] = await pool.query(query, [tour_id]);
            return result[0];
        } catch (error) {
            console.error('Error getting tour by id:', error);
            throw new Error('Failed to get tour by id');
        }

    },
    updateTour: async(tour_id, tour) => {
        try {
            const query = `UPDATE tours SET title = ?, description = ?, location = ?, price = ?, duration = ?, updated_at = ? WHERE tour_id = ?`;
            const [result] = await pool.query(query, [tour.title, tour.description, tour.location, tour.price, tour.duration, tour.updated_at, tour_id]);
            return result[0];
        } catch (error) {
            console.error('Error updating tour:', error);
            throw new Error('Failed to update tour');
        }

    },
    deleteTour: async(tour_id) => {
        try {
            const query = `DELETE FROM tours WHERE tour_id = ?`;
            const [result] = await pool.query(query, [tour_id]);
            return result[0];
        } catch (error) {
            console.error('Error deleting tour:', error);
            throw new Error('Failed to delete tour');
        }

    },
    getAllTours: async() => {
        try {
            const query = `SELECT * FROM tours`;
            const result = await pool.query(query);
            return result[0];
        } catch (error) {
            console.error('Error getting all tours:', error);
            throw new Error('Failed to get all tours');
        }
    },
    getToursByAverageRating: async(average_rating) => {
        try {
            const query = `SELECT t.*, AVG(r.rating) AS avg_rating FROM tours t JOIN reviews r ON t.tour_id = r.tour_id GROUP BY t.tour_id HAVING AVG(r.rating) = ?`;
            const [result] = await pool.query(query, [average_rating]);
            return result;
        } catch (error) {
            console.error('Error getting tours by average rating:', error);
            throw new Error('Failed to get tours by average rating');
        }
    },
    getToursInforAndMedia: async(tour_id) => {
        try {
            const query = `
            SELECT 
            t.*,
            COALESCE(
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'media_id', m.media_id,
                                'media_type', m.media_type,
                                'url', m.url,
                                'caption', m.caption,
                                'updated_at', m.updated_at
                            )
                        )
                    FROM tour_media m
                    WHERE m.tour_id = t.tour_id
                ), JSON_ARRAY()
            ) AS media,
            COALESCE(
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'day_number', ts.day_number,
                                'activity', ts.activity
                            )
                        )
                    FROM tour_schedules ts
                    WHERE ts.tour_id = t.tour_id
                ), JSON_ARRAY()
            ) AS schedules
        FROM tours t
        WHERE t.tour_id = ?
        `
            const [result] = await pool.query(query, [tour_id]);
            return result[0]; // Trả về 1 tour duy nhất
        } catch (error) {
            console.error('Error getting tours information and media:', error);
            throw new Error('Failed to get tours information and media');
        }

    },

    getRecommendTours: async() => {
        const query = `
            SELECT 
                t.*,
                COALESCE(AVG(r.rating), 0) AS avg_rating,
                (SELECT m.url FROM tour_media m 
                 WHERE m.tour_id = t.tour_id 
                 ORDER BY m.media_id ASC 
                 LIMIT 1) AS first_image
            FROM tours t
            LEFT JOIN reviews r ON t.tour_id = r.tour_id
            GROUP BY t.tour_id
            ORDER BY avg_rating DESC
            LIMIT 10;
            `;
            const [rows] = await pool.query(query);
            return rows;
    },
    getToursReview: async(tourId) => {
        try {
            const query = `SELECT * FROM reviews WHERE reviews.tour_id = ? ORDER BY reviews.rating DESC`;
            const [result] = await pool.query(query, [tourId]);
            return result;
        } catch (error) {
            console.error('Error getting tours review:', error);
            throw new Error('Failed to get tours review');
        }
    },
    countToursReviewByRating: async(tourId, rating) => {
        try {
            const query = `SELECT COUNT(*) as count FROM reviews LEFT JOIN tours ON reviews.tour_id = tours.tour_id WHERE tours.tour_id = ? AND reviews.rating = ?`;
            const [result] = await pool.query(query, [tourId, rating]);
            return result[0].count;
        } catch (error) {
            console.error('Error getting tours review:', error);
            throw new Error('Failed to get tours review');
        }
    },
    getAverageToursReview: async(tourId) => {
        try {
            const query = `SELECT AVG(rating) as avg_rating FROM reviews WHERE tour_id = ?`;
            const [result] = await pool.query(query, [tourId]);
            return result[0];
        } catch (error) {
            console.error('Error getting average tours review:', error);
            throw new Error('Failed to get average tours review');
        }
    },

    searchTours: async(filters) => {
        try {
            const { title, location, min_price, max_price, duration, rating } = filters;
            let query = `
            SELECT 
                t.*,
                (SELECT m.url FROM tour_media m WHERE m.tour_id = t.tour_id ORDER BY m.media_id ASC LIMIT 1) AS first_image 
            FROM tours t 
            WHERE 1=1`;
            const params = [];

            if (title !== null && title !== undefined   ) {
                query += ` AND title LIKE ?`;
                params.push(`%${title}%`);
            }
            if (location !== null && location !== undefined) {
                query += ` AND location LIKE ?`;
                params.push(`%${location}%`);
            }
            if (min_price !== null && min_price !== undefined) {
                query += ` AND CAST(price AS DECIMAL) >= ?`;
                params.push(min_price);
            }
            if (max_price !== null && max_price !== undefined) {
                query += ` AND CAST(price AS DECIMAL) <= ?`;
                params.push(max_price);
            }
            if (duration !== null && duration !== undefined) {
                query += ` AND duration = ?`;
                params.push(duration);
            }
            if (rating !== null && rating !== undefined) {
                query += ` AND rating >= ?`;
                params.push(rating);
            }

            const [result] = await pool.query(query, params);
            return result;
        } catch (error) {
            console.error('Error searching tours:', error);
            throw new Error('Failed to search tours');
        }
    }
}