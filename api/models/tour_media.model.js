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
        type: String, // ENUM: 'image', 'video'
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
        allowNull: false,
        defaultValue: Date.now
    }
};

module.exports = {
    createTourMedia: async (tourMediaData) => {
        const [result] = await pool.execute(
            'INSERT INTO tour_media (tour_id, media_type, url, caption) VALUES (?, ?, ?, ?)',
            [tourMediaData.tour_id, tourMediaData.media_type, tourMediaData.url, tourMediaData.caption]
        )
        return result.insertId
    },
    getTourMediaById: async (id) => {
        const [result] = await pool.execute(
            'SELECT * FROM tour_media WHERE id = ?',
            [id]
        )
        return result[0]
    },
    getAllTourMedia: async() => {
        const [result] = await pool.execute('SELECT * FROM tour_media')
        return result
    },
    updateTourMedia: async(id, updateData) => {
        const [result] = await pool.execute(
            'UPDATE tour_media SET ? WHERE id = ?',
            [updateData, id]
        )
        return result.affectedRows
    },
    deleteTourMedia: async(id) => {
        const [result] = await pool.execute(
            'DELETE FROM tour_media WHERE id = ?',
            [id]
        )
        return result.affectedRows
    }
}