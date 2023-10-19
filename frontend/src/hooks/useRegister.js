import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { API_URL } from '../api';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async(email, password, name) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(API_URL + '/api/user/register', {
      method: 'POST',
      body: JSON.stringify({email, password, name}),
      headers: {'Content-Type': 'application/JSON'}
    });

    const json = await response.json();
    
    if (!response.ok)
    {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok)
    {
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update auth context
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false);
    }
  }

  return { register, isLoading, error };
};
