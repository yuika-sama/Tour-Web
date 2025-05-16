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
    createTour: async (tourData) => {
        const [result] = await pool.query('INSERT INTO tours SET ?', [tourData]);
        return result.insertId;
    },
    getTourById: async (id) => {
        const [result] = await pool.query('SELECT * FROM tours WHERE id = ?', [id]);
        return result[0];
    },
    updateTour: async (id, tourData) => {
        const [result] = await pool.query('UPDATE tours SET ? WHERE id = ?', [tourData, id]);
        return result.affectedRows;
    },
    deleteTour: async (id) => {
        const [result] = await pool.query('DELETE FROM tours WHERE id = ?', [id]);
        return result.affectedRows;
    },
    getAllTours: async () => {
        const [result] = await pool.query('SELECT * FROM tours');
        return result;
    },
    searchTourByTitle: async (title) => {
        const [result] = await pool.query('SELECT * FROM tours WHERE title LIKE ?', [title]);
        return result;
    },
    searchTourByLocation: async (location) => {
        const [result] = await pool.query('SELECT * FROM tours WHERE location LIKE ?', [location]);
        return result;
    },
    searchTourByPrice: async (price) => {
        const [result] = await pool.query('SELECT * FROM tours WHERE price LIKE ?', [price]);
        return result;
    },
    searchTourByDuration: async (duration) => {
        const [result] = await pool.query('SELECT * FROM tours WHERE duration LIKE ?', [duration]);
        return result;
    }
}

