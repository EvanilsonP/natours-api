const express = require('express');
const {getAllTours, postTour, getTour, deleteTour, attTour}  = require('./../routes/toursRoutes')

const router = express.Router();

router.route('/').get(getAllTours).post(postTour);
router.route('/:id').get(getTour).patch(attTour).delete(deleteTour);

module.exports = router;

