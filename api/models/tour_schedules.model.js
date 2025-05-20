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
   createTourSchedule: async (tourSchedule) => {
    const query = `INSERT INTO tour_schedules (tour_id, day_number, activity) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [tourSchedule.tour_id, tourSchedule.day_number, tourSchedule.activity]);
    return result[0];
   }, 
   getTourScheduleById: async (schedule_id) => {    
    const query = `SELECT * FROM tour_schedules WHERE schedule_id = ?`;
    const [result] = await pool.query(query, [schedule_id]);
    return result[0];
   },
   updateTourSchedule: async (schedule_id, tourSchedule) => {   
    const query = `UPDATE tour_schedules SET day_number = ?, activity = ? WHERE schedule_id = ?`;
    const result = await pool.query(query, [tourSchedule.day_number, tourSchedule.activity, schedule_id]);
    return result[0];
   },
   deleteTourSchedule: async (schedule_id) => {
    const query = `DELETE FROM tour_schedules WHERE schedule_id = ?`;
    const [result] = await pool.query(query, [schedule_id]);
    return result[0];
   },
   getAllTourSchedules: async () => {
    const query = `SELECT * FROM tour_schedules`;
    const [result] = await pool.query(query);
    return result;
   }    
};