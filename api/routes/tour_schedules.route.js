const express = require('express');
const router = express.Router();
const { createTourSchedule, getTourScheduleById, updateTourSchedule, deleteTourSchedule, getAllTourSchedules } = require('../controllers/tour_schedules.controller');

// GET routes
router.get('/', getAllTourSchedules);
router.get('/:schedule_id', getTourScheduleById);

// POST route
router.post('/', createTourSchedule);

// PUT route
router.put('/:schedule_id', updateTourSchedule);

// DELETE route
router.delete('/:schedule_id', deleteTourSchedule);

module.exports = router;
