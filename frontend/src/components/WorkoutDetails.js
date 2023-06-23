import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    //if user is null then return
    if (!user) {
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data })
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>

    </div>
  )
}


export default WorkoutDetails