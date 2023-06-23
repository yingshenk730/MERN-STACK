import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkout } = useWorkoutContext()

  const logout = () => {
    //remove token and user from local storage
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatchWorkout({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }

}