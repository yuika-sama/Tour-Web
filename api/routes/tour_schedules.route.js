const express = require('express');
const router = express.Router();
const tourScheduleController = require('../controllers/tour_schedules.controller');

router.post('/', tourScheduleController.createTourSchedule);
router.get('/:schedule_id', tourScheduleController.getTourScheduleById);
router.put('/:schedule_id', tourScheduleController.updateTourSchedule);
router.delete('/:schedule_id', tourScheduleController.deleteTourSchedule);
router.get('/', tourScheduleController.getAllTourSchedules);

module.exports = router;
