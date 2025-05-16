const tourScheduleModel = require('../models/tour_schedules.model');

const createTourSchedule = async (req, res) => {
    const tourScheduleData = req.body;
    const tourSchedule = await tourScheduleModel.createTourSchedule(tourScheduleData);
    res.status(201).json(tourSchedule);
}   

const getTourScheduleById = async (req, res) => {
    const { schedule_id } = req.params;
    const tourSchedule = await tourScheduleModel.getTourScheduleById(schedule_id);
    res.status(200).json(tourSchedule);
}   

const updateTourSchedule = async (req, res) => {
    const { schedule_id } = req.params;
    const tourScheduleData = req.body;
    const tourSchedule = await tourScheduleModel.updateTourSchedule(schedule_id, tourScheduleData);
    res.status(200).json(tourSchedule);
}   

const deleteTourSchedule = async (req, res) => {
    const { schedule_id } = req.params;
    const tourSchedule = await tourScheduleModel.deleteTourSchedule(schedule_id);
    res.status(200).json(tourSchedule);
}   

const getAllTourSchedules = async (req, res) => {
    const tourSchedules = await tourScheduleModel.getAllTourSchedules();
    res.status(200).json(tourSchedules);
}   

module.exports = { createTourSchedule, getTourScheduleById, updateTourSchedule, deleteTourSchedule, getAllTourSchedules };      
