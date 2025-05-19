const tourScheduleModel = require('../models/tour_schedules.model');

const createTourSchedule = async (req, res) => {
    const tourSchedule = req.body;
    if (!tourSchedule.tour_id || !tourSchedule.day_number || !tourSchedule.activity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    tourSchedule.created_at = new Date();
    tourSchedule.updated_at = new Date();
    const newTourSchedule = await tourScheduleModel.createTourSchedule(tourSchedule);
    res.status(201).json(newTourSchedule);
};

const getTourScheduleById = async (req, res) => {
    const { schedule_id } = req.params;
    const tourSchedule = await tourScheduleModel.getTourScheduleById(schedule_id);
    res.status(200).json(tourSchedule);
};

const updateTourSchedule = async (req, res) => {
    const { schedule_id } = req.params;
    const tourSchedule = req.body;
    if (!tourSchedule.tour_id || !tourSchedule.day_number || !tourSchedule.activity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    tourSchedule.updated_at = new Date();
    const updatedTourSchedule = await tourScheduleModel.updateTourSchedule(schedule_id, tourSchedule);
    res.status(200).json(updatedTourSchedule);
};  

const deleteTourSchedule = async (req, res) => {
    const { schedule_id } = req.params;
    if (!schedule_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const tourSchedule = await tourScheduleModel.deleteTourSchedule(schedule_id);
    res.status(200).json(tourSchedule);
};  

const getAllTourSchedules = async (req, res) => {
    const tourSchedules = await tourScheduleModel.getAllTourSchedules();
    if (!tourSchedules) {
        return res.status(404).json({ error: 'Tour schedules not found' });
    }
    res.status(200).json(tourSchedules);
};  

module.exports = { createTourSchedule, getTourScheduleById, updateTourSchedule, deleteTourSchedule, getAllTourSchedules };