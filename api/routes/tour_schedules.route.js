const express = require('express');
const router = express.Router();
const { createTourSchedule, getTourScheduleById, updateTourSchedule, deleteTourSchedule, getAllTourSchedules } = require('../controllers/tour_schedules.controller');

router.post('/', createTourSchedule);
router.get('/:schedule_id', getTourScheduleById);
router.put('/:schedule_id', updateTourSchedule);
router.delete('/:schedule_id', deleteTourSchedule);
router.get('/', getAllTourSchedules);

module.exports = router;
