const pool = require('../config/db');   

const TourSchedule = {
    schedule_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    tour_id: {
        type: Number,
        allowNull: false
    },
    day_number: {
        type: Number,
        allowNull: false
    },
    activity: {
        type: String,
        allowNull: false
    }
};

module.exports = {
    createTourSchedule: async (tourScheduleData) => {
        const [result] = await pool.query('INSERT INTO tour_schedules (tour_id, day_number, activity) VALUES (?, ?, ?)', [tourScheduleData.tour_id, tourScheduleData.day_number, tourScheduleData.activity]);
        return result.insertId;
    },
    getTourScheduleById: async (schedule_id) => {
        const [result] = await pool.query('SELECT * FROM tour_schedules WHERE schedule_id = ?', [schedule_id]);
        return result[0];
    },
    updateTourSchedule: async (schedule_id, tourScheduleData) => {
        const [result] = await pool.query('UPDATE tour_schedules SET tour_id = ?, day_number = ?, activity = ? WHERE schedule_id = ?', [tourScheduleData.tour_id, tourScheduleData.day_number, tourScheduleData.activity, schedule_id]);
        return result.affectedRows;
    },
    deleteTourSchedule: async (schedule_id) => {
        const [result] = await pool.query('DELETE FROM tour_schedules WHERE schedule_id = ?', [schedule_id]);
        return result.affectedRows;
    },
    getAllTourSchedules: async () => {
        const [result] = await pool.query('SELECT * FROM tour_schedules');
        return result;
    }
};