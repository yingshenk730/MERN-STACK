const express = require('express')
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')

const requestAuth = require('../middleware/requestAuth')
const router = express.Router()

//require authentication for all routes
router.use(requestAuth)

//get all workouts
router.get('/', getAllWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post a new workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports = router