const pool = require('../config/db');

const TourMedia = {
    media_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    tour_id: {
        type: Number,
        allowNull: false
    },
    media_type: {
        type: String,
        allowNull: false
    },
    url: {
        type: String,
        allowNull: false
    },
    caption: {
        type: String,
        allowNull: true
    },
    updated_at: {
        type: Date,
        allowNull: false
    }
};

module.exports = {
   createTourMedia: async (tourMedia) => {
    const query = `INSERT INTO tour_media (tour_id, media_type, url, caption, updated_at) VALUES ($1, $2, $3, $4, $5)`;
    const result = await pool.query(query, [tourMedia.tour_id, tourMedia.media_type, tourMedia.url, tourMedia.caption, tourMedia.updated_at]);
    return result.rows[0];
   },
   getTourMediaById: async (tourMediaId) => {
    const query = `SELECT * FROM tour_media WHERE media_id = $1`;
    const result = await pool.query(query, [tourMediaId]);
    return result.rows[0];
   },
   updateTourMedia: async (tourMediaId, tourMedia) => {
    const query = `UPDATE tour_media SET tour_id = $1, media_type = $2, url = $3, caption = $4, updated_at = $5 WHERE media_id = $6`;
    const result = await pool.query(query, [tourMedia.tour_id, tourMedia.media_type, tourMedia.url, tourMedia.caption, tourMedia.updated_at, tourMediaId]);
    return result.rows[0];
   },
   deleteTourMedia: async (tourMediaId) => {
    const query = `DELETE FROM tour_media WHERE media_id = $1`;
    const result = await pool.query(query, [tourMediaId]);
    return result.rows[0];
   },
   getAllTourMedia: async () => {
    const query = `SELECT * FROM tour_media`;
    const result = await pool.query(query);
    return result.rows;
   },
   getTourMediaByTourId: async (tourId) => {
    const query = `SELECT * FROM tour_media WHERE tour_id = $1`;
    const result = await pool.query(query, [tourId]);
    return result.rows;
   },
   getTourMediaByUserId: async (userId) => {
    const query = `SELECT * FROM tour_media WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
   }
}