import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
      setLoading(false)
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      //dispatch the user to the reducer
      dispatch({ type: 'LOGIN', payload: data })
      setLoading(false)
    }
  }
  return { error, loading, login }
}